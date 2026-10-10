/* Anatomy follows skin weights, never fixed heights on the opposite gender. */
(function(g){'use strict';
function masks(asset,part){
 if(part.__bodyMasks)return part.__bodyMasks;var count=part.positions.length/3,skin=asset.character&&asset.character.skins[part.skin],nodes=asset.gltf.nodes||[],names=skin?skin.joints.map(function(id){return (nodes[id].name||'').toLowerCase();}):[],out={torso:new Float32Array(count),arm:new Float32Array(count),leg:new Float32Array(count),head:new Float32Array(count),neck:new Float32Array(count)};
 for(var i=0;i<count;i++)for(var k=0;k<4;k++){var w=part.weights&&part.weights[i*4+k]||0,n=names[part.joints&&part.joints[i*4+k]]||'',group=/^(spine|pelvis)/.test(n)?'torso':/^(upperarm|lowerarm|clavicle)/.test(n)?'arm':/^(thigh|calf)/.test(n)?'leg':/^head/.test(n)?'head':/^neck/.test(n)?'neck':null;if(group)out[group][i]+=w;}
 part.__bodyMasks=out;return out;
}
function bounds(parts,key){var min=[Infinity,Infinity,Infinity],max=[-Infinity,-Infinity,-Infinity];parts.forEach(function(p){var v=p[key]||p.positions;for(var i=0;i<v.length;i+=3)for(var k=0;k<3;k++){min[k]=Math.min(min[k],v[i+k]);max[k]=Math.max(max[k],v[i+k]);}});return {min:min,max:max,size:max.map(function(v,k){return v-min[k];}),center:max.map(function(v,k){return (v+min[k])/2;})};}
function shape(asset,part,body,reference){
 var src=part.deformedPositions||part.positions,out=new Float32Array(src),m=masks(asset,part),cx=reference.center[0],cz=reference.center[2],floor=reference.min[1],height=reference.size[1],width=Number(body.width)||0,muscle=Number(body.muscle)||0,fat=Number(body.fat)||0;
 /* Local limb centres use the current gender's rest geometry at each height.
  * Two passes are only needed on body changes, never on camera movement. */
 var slices=32,centres={};['arm','leg'].forEach(function(group){var sums=new Float64Array(slices*2*3);for(var i=0;i<src.length;i+=3){var w=m[group][i/3];if(w<.01)continue;var bin=Math.max(0,Math.min(slices-1,Math.floor((src[i+1]-floor)/height*slices))),side=src[i]<cx?0:1,at=(side*slices+bin)*3;sums[at]+=src[i]*w;sums[at+1]+=src[i+2]*w;sums[at+2]+=w;}centres[group]=sums;});
 function radial(group,i,amount){var w=m[group][i/3];if(!w||!amount)return;var bin=Math.max(0,Math.min(slices-1,Math.floor((src[i+1]-floor)/height*slices))),side=src[i]<cx?0:1,s=centres[group],at=(side*slices+bin)*3;if(!s[at+2])return;out[i]+=(src[i]-s[at]/s[at+2])*amount*w;out[i+2]+=(src[i+2]-s[at+1]/s[at+2])*amount*w;}
 for(var i=0;i<src.length;i+=3){var vertex=i/3,torso=m.torso[vertex]*(1-Math.min(1,m.head[vertex]+m.neck[vertex])),h=(src[i+1]-floor)/Math.max(.001,height),belly=Math.max(0,1-Math.abs(h-.58)/.18),sx=1+torso*(muscle*.065+fat*(.04+belly*.07)),sz=1+torso*(muscle*.035+fat*(.055+belly*.09));out[i]=cx+(src[i]-cx)*sx;out[i+2]=cz+(src[i+2]-cz)*sz;
  radial('arm',i,muscle*.13+fat*.06);radial('leg',i,muscle*.1+fat*.08);
  out[i]=cx+(out[i]-cx)*(1+width*.10);out[i+2]=cz+(out[i+2]-cz)*(1+width*.06);out[i+1]=floor+(out[i+1]-floor)*(1+(Number(body.height)||0)*.12);
 }
 return out;
}
function normals(positions,indices,base){var out=new Float32Array(positions.length),count=indices?indices.length:positions.length/3;for(var i=0;i+2<count;i+=3){var a=(indices?indices[i]:i)*3,b=(indices?indices[i+1]:i+1)*3,c=(indices?indices[i+2]:i+2)*3,ux=positions[b]-positions[a],uy=positions[b+1]-positions[a+1],uz=positions[b+2]-positions[a+2],vx=positions[c]-positions[a],vy=positions[c+1]-positions[a+1],vz=positions[c+2]-positions[a+2],x=uy*vz-uz*vy,y=uz*vx-ux*vz,z=ux*vy-uy*vx;[a,b,c].forEach(function(at){out[at]+=x;out[at+1]+=y;out[at+2]+=z;});}if(base){var seams=new Map(),keys=[];for(var i=0;i<base.length;i+=3){var key=base[i].toFixed(6)+','+base[i+1].toFixed(6)+','+base[i+2].toFixed(6),sum=seams.get(key)||[0,0,0];for(var k=0;k<3;k++)sum[k]+=out[i+k];seams.set(key,sum);keys.push(key);}for(var i=0;i<out.length;i+=3){var sum=seams.get(keys[i/3]);out[i]=sum[0];out[i+1]=sum[1];out[i+2]=sum[2];}}for(var i=0;i<out.length;i+=3){var len=Math.hypot(out[i],out[i+1],out[i+2])||1;out[i]/=len;out[i+1]/=len;out[i+2]/=len;}return out;}
function armor(asset,part,reference){
 var src=part.__ceShapedPositions,n=part.__ceNormals,m=masks(asset,part),indices=part.indices;if(!indices||!src||!n)return null;
 var points=[],anchors=[],normal=[],floor=reference.min[1],height=reference.size[1];
 function clip(poly,field,limit,above){var out=[];if(!poly.length)return out;for(var i=0;i<poly.length;i++){var a=poly[i],b=poly[(i+1)%poly.length],av=field(a)-limit,bv=field(b)-limit,ain=above?av>=0:av<=0,bin=above?bv>=0:bv<=0;if(ain)out.push(a);if(ain!==bin){var t=av/(av-bv),v={p:[],n:[],torso:a.torso+(b.torso-a.torso)*t,neck:a.neck+(b.neck-a.neck)*t};for(var k=0;k<3;k++){v.p[k]=a.p[k]+(b.p[k]-a.p[k])*t;v.n[k]=a.n[k]+(b.n[k]-a.n[k])*t;}out.push(v);}}return out;}
 for(var i=0;i<indices.length;i+=3){var poly=[];for(var k=0;k<3;k++){var v=indices[i+k],at=v*3;poly.push({p:[src[at],src[at+1],src[at+2]],n:[n[at],n[at+1],n[at+2]],torso:m.torso[v],neck:m.head[v]+m.neck[v]});}
  poly=clip(poly,function(v){return v.p[1];},floor+height*.57,true);poly=clip(poly,function(v){return v.p[1];},floor+height*.82,false);poly=clip(poly,function(v){return v.torso;},.78,true);poly=clip(poly,function(v){return v.neck;},.05,false);
  for(var j=1;j+1<poly.length;j++)[poly[0],poly[j],poly[j+1]].forEach(function(v){var length=Math.hypot(v.n[0],v.n[1],v.n[2])||1;for(var k=0;k<3;k++){var nk=v.n[k]/length;anchors.push(v.p[k]);normal.push(nk);points.push(v.p[k]+nk*.012);}});
 }
 if(!points.length)return null;var positions=new Float32Array(points),index=new Uint32Array(points.length/3);for(var i=0;i<index.length;i++)index[i]=i;
 return {positions:positions,__ceShapedPositions:positions,__ceNormals:new Float32Array(normal),anchorPositions:new Float32Array(anchors),indices:index,material:-1,armor:true};
}
g.DNDCharacterBodyGeometry={masks:masks,bounds:bounds,shape:shape,normals:normals,armor:armor};
})(window);
