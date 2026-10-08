/* Настоящий перспективный WebGL-рендер карты. */
(function(g){'use strict';
function clamp(v,a,b){return Math.max(a,Math.min(b,v));}
function sub(a,b){return[a[0]-b[0],a[1]-b[1],a[2]-b[2]];}
function norm(a){var l=Math.hypot(a[0],a[1],a[2])||1;return[a[0]/l,a[1]/l,a[2]/l];}
function cross(a,b){return[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];}
function lookAt(eye,center,up){var z=norm(sub(eye,center)),x=norm(cross(up,z)),y=cross(z,x);return[x[0],y[0],z[0],0,x[1],y[1],z[1],0,x[2],y[2],z[2],0,-(x[0]*eye[0]+x[1]*eye[1]+x[2]*eye[2]),-(y[0]*eye[0]+y[1]*eye[1]+y[2]*eye[2]),-(z[0]*eye[0]+z[1]*eye[1]+z[2]*eye[2]),1];}
function perspective(fov,aspect,near,far){var f=1/Math.tan(fov/2),nf=1/(near-far);return[f/aspect,0,0,0,0,f,0,0,0,0,(far+near)*nf,-1,0,0,(2*far*near)*nf,0];}
function mul(a,b){var o=new Array(16);for(var c=0;c<4;c++)for(var r=0;r<4;r++)o[c*4+r]=a[r]*b[c*4]+a[4+r]*b[c*4+1]+a[8+r]*b[c*4+2]+a[12+r]*b[c*4+3];return o;}
function floorBase(m,i){var y=0;for(var q=0;q<i;q++)y+=Number(m.floors[q].height)||3;return y;}
function cameraState(m,cam){var yaw=Number(cam.yaw)||0,pitch=clamp(Number(cam.pitch)||0,-1.35,1.35),pos=cam.position||[m.width/2,2,m.height/2],target=cam.target||[pos[0],pos[1],pos[2]-1];return{pos:pos,target:target,yaw:yaw,pitch:pitch};}
function project(m,cam,x,y,z){var c=cameraState(m,cam),dx=x-c.pos[0],dy=y-c.pos[1],dz=z-c.pos[2],cy=Math.cos(-c.yaw),sy=Math.sin(-c.yaw),cx=Math.cos(-c.pitch),sx=Math.sin(-c.pitch),rx=dx*cy-dz*sy,rz=dx*sy+dz*cy,ry=dy*cx-rz*sx,rz2=dy*sx+rz*cx;if(rz2>=-.05)return[999,999];var f=1/Math.tan((cam.fov||70)*Math.PI/360);return[(rx/-rz2)*f,(ry/-rz2)*f];}
function draw(c,m,cam){
  var st=c.__dnd3dState;
  if(!st){
    var gl=c.getContext('webgl',{antialias:false,alpha:true,depth:true,stencil:true,powerPreference:'high-performance'})||c.getContext('experimental-webgl',{antialias:false,alpha:true,depth:true,stencil:true});
    if(!gl){
      c.style.background='#252525';
      var e=c.parentElement&&c.parentElement.querySelector('[data-webgl-error]');
      if(!e&&c.parentElement){e=document.createElement('div');e.setAttribute('data-webgl-error','1');e.style.cssText='position:absolute;left:10px;top:55px;z-index:20;padding:8px 10px;background:#5b2020;color:#fff;border:1px solid #a55;border-radius:8px;font:12px Arial';e.textContent='3D: WebGL недоступен в WebView';c.parentElement.appendChild(e);}
      return false;
    }
    var fragHighp=gl.getShaderPrecisionFormat&&gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER,gl.HIGH_FLOAT),
        fragPrec=fragHighp&&fragHighp.precision>0?'highp':'mediump',
        vs='precision highp float;attribute vec3 p;attribute vec4 col;attribute vec2 uv;uniform mat4 vp;uniform mat4 model;varying vec4 v;varying vec2 vu;void main(){gl_Position=vp*model*vec4(p,1.0);v=col;vu=uv;}',
        fs='precision '+fragPrec+' float;varying vec4 v;varying vec2 vu;uniform sampler2D tex;uniform float useTex;uniform float alphaMode;uniform float alphaCutoff;void main(){if(useTex>0.5){vec4 t=texture2D(tex,vu);if(alphaMode>1.5){if(t.a<alphaCutoff)discard;gl_FragColor=vec4(t.rgb,1.0);}else if(alphaMode>0.5){if(t.a<0.01)discard;gl_FragColor=t;}else{gl_FragColor=vec4(t.rgb,1.0);}}else{gl_FragColor=v;}}';
    function sh(t,x){var q=gl.createShader(t);gl.shaderSource(q,x);gl.compileShader(q);if(!gl.getShaderParameter(q,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(q)||'shader');return q;}
    var prog=gl.createProgram();gl.attachShader(prog,sh(gl.VERTEX_SHADER,vs));gl.attachShader(prog,sh(gl.FRAGMENT_SHADER,fs));gl.linkProgram(prog);
    if(!gl.getProgramParameter(prog,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(prog)||'program');
    st={gl:gl,prog:prog,pl:gl.getAttribLocation(prog,'p'),cl:gl.getAttribLocation(prog,'col'),
      uvLoc:gl.getAttribLocation(prog,'uv'),vpLoc:gl.getUniformLocation(prog,'vp'),
      modelLoc:gl.getUniformLocation(prog,'model'),texLoc:gl.getUniformLocation(prog,'tex'),
      useTexLoc:gl.getUniformLocation(prog,'useTex'),alphaModeLoc:gl.getUniformLocation(prog,'alphaMode'),alphaCutoffLoc:gl.getUniformLocation(prog,'alphaCutoff'),base:null,loaded:Object.create(null),
      loading:Object.create(null),textures:Object.create(null)};
    c.__dnd3dState=st;
  }
  var gl=st.gl,prog=st.prog;
  if(gl.isContextLost&&gl.isContextLost())return false;
  gl.viewport(0,0,c.width,c.height);
  gl.useProgram(prog);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.disable(gl.CULL_FACE);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
  gl.clearDepth(1);
  gl.clearColor(.025,.025,.03,1);
  gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);

  var identity=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
      f=g.DNDMapModel.current(m),verts=[],cols=[],texBatches=Object.create(null),objs=f.objects||[],
      dark=clamp(Number((m.lighting||{}).darkness)||0,0,1),
      by=floorBase(m,m.currentFloor),fh=Number(f.height)||3;

  function illum(x,z){
    if(dark<=0)return 1;
    var best=0;
    for(var i=0;i<objs.length;i++){
      var l=objs[i];if(l.type!=='light')continue;
      var dist=Math.hypot((l.x+.5)-x,(l.y+.5)-z),rad=Math.max(.1,Number(l.radius)||4),
          power=clamp(Number(l.intensity==null?1:l.intensity),0,1);
      if(dist<rad)best=Math.max(best,(1-dist/rad)*power);
    }
    return clamp(1-dark*(1-best),.12,1);
  }
  function baseColor(t){return t==='wood'?[.36,.23,.13]:t==='grass'?[.20,.38,.20]:t==='water'?[.12,.30,.42]:[.48,.50,.54];}
  function tileCol(t,x,z){var b=baseColor(t),q=illum(x,z);return[b[0]*q,b[1]*q,b[2]*q,1];}
  function quad(a,b,d,e,col){
    verts.push(a[0],a[1],a[2],b[0],b[1],b[2],e[0],e[1],e[2],a[0],a[1],a[2],e[0],e[1],e[2],d[0],d[1],d[2]);
    for(var i=0;i<6;i++)cols.push(col[0],col[1],col[2],col[3]);
  }
  function texQuad(name,a,b,d,e){
    if(!name)return;
    var q=texBatches[name]||(texBatches[name]={v:[],u:[]}),uv=[0,0,1,0,0,1,0,0,0,1,1,1];
    q.v.push(a[0],a[1],a[2],b[0],b[1],b[2],e[0],e[1],e[2],a[0],a[1],a[2],e[0],e[1],e[2],d[0],d[1],d[2]);
    for(var j=0;j<uv.length;j++)q.u.push(uv[j]);
  }
  // Поверхность должна рисоваться либо базовым цветом, либо текстурой,
  // но никогда обоими слоями одновременно. Это полностью исключает
  // z-fighting между двумя копиями одного пола/стены на мобильном WebGL.
  function hasReadyTexture(name){
    var t=st.textures[name+'.png'];
    return !!(t&&t._ready);
  }
  function floorTex(t){
    if(t==='stone')return 'floor_stone_tile_dark';
    if(t==='wood')return 'floor_wood_light';
    if(t==='grass')return 'floor_grass';
    if(t==='water')return 'floor_ceramic_tile_light';
    return t;
  }

  for(var y=0;y<m.height;y++)for(var x=0;x<m.width;x++){
    var t=f.tiles[x+','+y];if(t){
      var ft=floorTex(t);
      if(!hasReadyTexture(ft))quad([x,by,y],[x+1,by,y],[x,by,y+1],[x+1,by,y+1],tileCol(t,x+.5,y+.5));
      texQuad(ft,[x,by,y],[x+1,by,y],[x,by,y+1],[x+1,by,y+1]);
    }
  }
  var walls=f.walls||{};
  Object.keys(walls).forEach(function(k){
    var p=k.split(','),x=+p[0],z=+p[1],w=walls[k]||{};
    if(w.n){var wn=w.nTexture||m.selectedWallTexture||'wall_stone_dark';if(!hasReadyTexture(wn))quad([x,by,z],[x+1,by,z],[x,by+fh,z],[x+1,by+fh,z],[.38,.38,.42,1]);texQuad(wn,[x,by,z],[x+1,by,z],[x,by+fh,z],[x+1,by+fh,z]);}
    if(w.s){var ws=w.sTexture||m.selectedWallTexture||'wall_stone_dark';if(!hasReadyTexture(ws))quad([x,by,z+1],[x+1,by,z+1],[x,by+fh,z+1],[x+1,by+fh,z+1],[.34,.34,.38,1]);texQuad(ws,[x,by,z+1],[x+1,by,z+1],[x,by+fh,z+1],[x+1,by+fh,z+1]);}
    if(w.w){var ww=w.wTexture||m.selectedWallTexture||'wall_stone_dark';if(!hasReadyTexture(ww))quad([x,by,z],[x,by,z+1],[x,by+fh,z],[x,by+fh,z+1],[.36,.36,.40,1]);texQuad(ww,[x,by,z],[x,by,z+1],[x,by+fh,z],[x,by+fh,z+1]);}
    if(w.e){var we=w.eTexture||m.selectedWallTexture||'wall_stone_dark';if(!hasReadyTexture(we))quad([x+1,by,z],[x+1,by,z+1],[x+1,by+fh,z],[x+1,by+fh,z+1],[.32,.32,.36,1]);texQuad(we,[x+1,by,z],[x+1,by,z+1],[x+1,by+fh,z],[x+1,by+fh,z+1]);}
  });
  for(var oi=0;oi<objs.length;oi++){
    var o=objs[oi],ox=o.x||0,oz=o.y||0,oy=by+(o.z||0),
        ow=Math.max(.25,o.w||1),od=Math.max(.25,o.d||1),oh=Math.max(.15,o.h||1),
        cc=o.id===m.selectedObjectId?[.95,.65,.15,1]:o.type==='light'?[1,.78,.25,1]:[.72,.48,.22,1];
    if(o.type==='light'){
      var ls=.18;
      quad([ox+.5-ls,oy+.1,oz+.5-ls],[ox+.5+ls,oy+.1,oz+.5-ls],[ox+.5-ls,oy+.5,oz+.5-ls],[ox+.5+ls,oy+.5,oz+.5-ls],cc);
    }else{
      quad([ox,oy,oz],[ox+ow,oy,oz],[ox,oy+oh,oz],[ox+ow,oy+oh,oz],cc);
      quad([ox,oy,oz+od],[ox+ow,oy,oz+od],[ox,oy+oh,oz+od],[ox+ow,oy+oh,oz+od],cc);
      quad([ox,oy,oz],[ox,oy,oz+od],[ox,oy+oh,oz],[ox,oy+oh,oz+od],cc);
      quad([ox+ow,oy,oz],[ox+ow,oy,oz+od],[ox+ow,oy+oh,oz],[ox+ow,oy+oh,oz+od],cc);
      quad([ox,oy+oh,oz],[ox+ow,oy+oh,oz],[ox,oy+oh,oz+od],[ox+ow,oy+oh,oz+od],cc);
    }
  }

  var cs=cameraState(m,cam),
      vp=mul(perspective((cam.fov||70)*Math.PI/180,c.width/Math.max(1,c.height),.1,Math.max(100,Math.hypot(m.width,m.height)*3+20)),lookAt(cs.pos,cs.target,[0,1,0]));
  gl.uniformMatrix4fv(st.vpLoc,false,new Float32Array(vp));
  gl.uniformMatrix4fv(st.modelLoc,false,new Float32Array(identity));
  gl.uniform1i(st.texLoc,0);
  gl.activeTexture(gl.TEXTURE0);

  if(!st.base)st.base={ctx:gl,pos:gl.createBuffer(),col:gl.createBuffer()};
  gl.bindBuffer(gl.ARRAY_BUFFER,st.base.pos);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(verts),gl.DYNAMIC_DRAW);
  gl.enableVertexAttribArray(st.pl);gl.vertexAttribPointer(st.pl,3,gl.FLOAT,false,0,0);
  gl.bindBuffer(gl.ARRAY_BUFFER,st.base.col);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(cols),gl.DYNAMIC_DRAW);
  gl.enableVertexAttribArray(st.cl);gl.vertexAttribPointer(st.cl,4,gl.FLOAT,false,0,0);
  gl.uniform1f(st.useTexLoc,0);
  gl.drawArrays(gl.TRIANGLES,0,verts.length/3);

  function modelMatrix(o,asset){
    var base=Number(o.scale)||1,b=asset&&asset.bounds,fit=1;
    if(b){var md=Math.max(b.size[0],b.size[1],b.size[2]);if(md>2.5)fit=2.5/md;}
    var sx=base*fit,sy=(Number(o.scaleY)||base)*fit,sz=(Number(o.scaleZ)||base)*fit,
        cx=b?b.center[0]:0,cy=b?b.min[1]:0,cz=b?b.center[2]:0,
        ox=(o.x||0)+.5-cx*sx,oz=(o.y||0)+.5-cz*sz,oy=by+(o.z||0)-cy*sy;
    return[sx,0,0,0,0,sy,0,0,0,0,sz,0,ox,oy,oz,1];
  }
  function getTex(url){
    if(!url)return null;
    if(st.textures[url])return st.textures[url];
    var t=gl.createTexture();t._ready=false;
    var im=new Image();
    im.onload=function(){
      if(gl.isContextLost&&gl.isContextLost())return;
      gl.bindTexture(gl.TEXTURE_2D,t);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,false);
      gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,im);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
      t._ready=true;draw(c,m,cam);
    };
    im.onerror=function(){if(window.console)console.warn('Texture:',url);};
    im.src=url.indexOf('./')===0?url:'./'+url.replace(/^\//,'');st.textures[url]=t;return t;
  }
  // Текстуры пола/стен больше не накладываются на цветные копии.
  // Поэтому polygonOffset здесь не нужен и только маскировал проблему.
  gl.disable(gl.POLYGON_OFFSET_FILL);
  gl.depthMask(true);
  gl.uniform1f(st.alphaModeLoc,0);gl.uniform1f(st.alphaCutoffLoc,0.5);gl.enable(gl.BLEND);
  Object.keys(texBatches).forEach(function(name){
    var q=texBatches[name],tt=getTex(name+'.png');
    if(!tt||!tt._ready)return;
    var pb=gl.createBuffer(),ub=gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,pb);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(q.v),gl.STATIC_DRAW);
    gl.vertexAttribPointer(st.pl,3,gl.FLOAT,false,0,0);gl.enableVertexAttribArray(st.pl);
    gl.bindBuffer(gl.ARRAY_BUFFER,ub);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(q.u),gl.STATIC_DRAW);
    gl.vertexAttribPointer(st.uvLoc,2,gl.FLOAT,false,0,0);gl.enableVertexAttribArray(st.uvLoc);
    gl.uniformMatrix4fv(st.modelLoc,false,new Float32Array(identity));
    gl.uniform1f(st.useTexLoc,1);gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,tt);
    gl.drawArrays(gl.TRIANGLES,0,q.v.length/3);
  });
  gl.depthMask(true);
  gl.disable(gl.POLYGON_OFFSET_FILL);
  function matColor(asset,part){
    var mm=(asset.materials||[])[part.material||0],fc=mm&&mm.baseColorFactor;
    return fc?[fc[0],fc[1],fc[2],fc[3]==null?1:fc[3]]:[.72,.48,.22,1];
  }
  function drawLoadedModel(o,asset){
    for(var pi=0;pi<asset.parts.length;pi++){
      var part=asset.parts[pi],key='__gpu3d',buf=part[key];
      if(!buf||buf.ctx!==gl){
        buf={ctx:gl,pos:gl.createBuffer(),idx:part.indices?gl.createBuffer():null,
          count:part.indices?part.indices.length:part.positions.length/3,
          indexType:part.indices?(part.indices.constructor===Uint32Array?gl.UNSIGNED_INT:part.indices.constructor===Uint16Array?gl.UNSIGNED_SHORT:gl.UNSIGNED_BYTE):null};
        gl.bindBuffer(gl.ARRAY_BUFFER,buf.pos);gl.bufferData(gl.ARRAY_BUFFER,part.positions,gl.STATIC_DRAW);
        if(buf.idx){gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,buf.idx);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,part.indices,gl.STATIC_DRAW);}
        part[key]=buf;
      }
      gl.bindBuffer(gl.ARRAY_BUFFER,buf.pos);gl.vertexAttribPointer(st.pl,3,gl.FLOAT,false,0,0);gl.enableVertexAttribArray(st.pl);
      gl.uniformMatrix4fv(st.modelLoc,false,new Float32Array(modelMatrix(o,asset)));
      var cc=matColor(asset,part);gl.disableVertexAttribArray(st.cl);gl.vertexAttrib4f(st.cl,cc[0],cc[1],cc[2],cc[3]);
      var mm=asset.materials&&asset.materials[part.material||0],tt=mm&&mm.baseColorTexture?getTex(mm.baseColorTexture):null;
      var am=mm&&mm.alphaMode==='BLEND'?1:mm&&mm.alphaMode==='MASK'?2:0;
      gl.uniform1f(st.alphaModeLoc,am);gl.uniform1f(st.alphaCutoffLoc,mm&&mm.alphaCutoff!=null?mm.alphaCutoff:0.5);
      if(am===1)gl.enable(gl.BLEND);else gl.disable(gl.BLEND);
      gl.uniform1f(st.useTexLoc,tt&&tt._ready?1:0);
      if(tt&&tt._ready){gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,tt);}
      if(part.uv){
        var ub=part.__uv_gpu3d;
        if(!ub||ub.ctx!==gl){ub={ctx:gl,buf:gl.createBuffer()};gl.bindBuffer(gl.ARRAY_BUFFER,ub.buf);gl.bufferData(gl.ARRAY_BUFFER,part.uv,gl.STATIC_DRAW);part.__uv_gpu3d=ub;}
        gl.bindBuffer(gl.ARRAY_BUFFER,ub.buf);gl.vertexAttribPointer(st.uvLoc,2,gl.FLOAT,false,0,0);gl.enableVertexAttribArray(st.uvLoc);
      }else{gl.disableVertexAttribArray(st.uvLoc);gl.vertexAttrib2f(st.uvLoc,0,0);}
      if(buf.idx){gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,buf.idx);gl.drawElements(part.mode,buf.count,buf.indexType,0);}
      else gl.drawArrays(part.mode,0,buf.count);
    }
  }

  for(var mi=0;mi<objs.length;mi++){
    var mo=objs[mi];if(!mo.model)continue;
    if(st.loaded[mo.model])drawLoadedModel(mo,st.loaded[mo.model]);
    else if(!st.loading[mo.model]&&g.DNDGLTF){
      st.loading[mo.model]=true;
      (function(o,path){
        g.DNDGLTF.load(path).then(function(asset){
          st.loaded[path]=asset;delete st.loading[path];draw(c,m,cam);
        }).catch(function(err){
          delete st.loading[path];if(window.console)console.warn('glTF:',path,err);draw(c,m,cam);
        });
      })(mo,mo.model);
    }
  }
  gl.uniformMatrix4fv(st.modelLoc,false,new Float32Array(identity));
  gl.enable(gl.BLEND);
  gl.uniform1f(st.alphaModeLoc,0);gl.uniform1f(st.alphaCutoffLoc,0.5);
  return true;
}
function hitTest(c,m,cam,clientX,clientY){var r=c.getBoundingClientRect(),mx=(clientX-r.left)/r.width*2-1,my=1-(clientY-r.top)/r.height*2,objs=g.DNDMapModel.current(m).objects||[],best=null,bd=999;for(var i=0;i<objs.length;i++){var o=objs[i],p=project(m,cam,(o.x||0)+.5,floorBase(m,m.currentFloor)+(o.z||0)+.8,(o.y||0)+.5),d=Math.hypot(mx-p[0],my-p[1]);if(d<.12&&d<bd){bd=d;best=o.id;}}return best;}
g.DNDMapRenderer3D={draw:draw,hitTest:hitTest,projectPoint:function(m,cam,x,y,z){return project(m,cam,x,floorBase(m,m.currentFloor)+z,y);}};})(window);
// 3D texture z-fighting fix
// V70.37.69: preserve alpha cutouts for glTF furniture textures.
