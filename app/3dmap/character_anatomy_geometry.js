/* Neutral resting exterior anatomy: a boundary-preserving replacement skin patch. */
(function(g){'use strict';
function clamp(x,a,b){return Math.max(a,Math.min(b,x));}
function smooth(a,b,x){var t=clamp((x-a)/(b-a),0,1);return t*t*(3-2*t);}
function key(a,b,c){return [a,b,c].sort(function(x,y){return x-y;}).join(':');}
function edge(a,b){return a<b?a+':'+b:b+':'+a;}
function supported(c){return !!g.DNDCharacterAnatomy&&g.DNDCharacterAnatomy.family(c)==='humanoid';}
function mode(c){var a=g.DNDCharacterAnatomy.normalize(c.anatomy).external;return a.mode==='auto'?(c.gender==='female'?'female':'male'):a.mode;}
function mixInfluences(a,b){var w={};[a,b].forEach(function(v){for(var k=0;k<4;k++)w[v.j[k]]=(w[v.j[k]]||0)+v.w[k]*.5;});var ids=Object.keys(w).map(Number).sort(function(a,b){return w[b]-w[a]||a-b;}).slice(0,4),sum=ids.reduce(function(s,i){return s+w[i];},0)||1,count=ids.length;while(ids.length<4)ids.push(0);return {j:ids,w:ids.map(function(i,k){return k<count?(w[i]||0)/sum:0;})};}
function landmarks(asset,body,geo){
 var b=geo.bounds([body],'__ceShapedPositions'),H=b.size[1],p=body.__ceShapedPositions,n=body.__ceNormals,m=geo.masks(asset,body),lowest=Infinity;
 for(var i=0;i<p.length;i+=3){var h=(p[i+1]-b.min[1])/H;if(Math.abs(p[i]-b.center[0])<H*.009&&h>.40&&h<.58&&n[i+2]>.15&&(m.torso[i/3]+m.leg[i/3])>.25)lowest=Math.min(lowest,p[i+1]);}
 if(!isFinite(lowest))throw Error('Не найдена поверхность крепления анатомии');
 return {H:H,cx:b.center[0],floor:b.min[1],lowest:lowest,centerY:lowest+H*.020};
}
function sampleDepth(vertices,x,y){var near=vertices.map(function(v){return {v:v,d:Math.pow(v.p[0]-x,2)+Math.pow(v.p[1]-y,2)};}).sort(function(a,b){return a.d-b.d;}).slice(0,8),sum=0,z=0;near.forEach(function(q){var w=1/Math.max(q.d,1e-12);sum+=w;z+=q.v.p[2]*w;});return z/sum;}
function refined(vertices,faces,boundary,maxFaces,selected,registry){
 var middles={},out=[];
 function midpoint(a,b){var k=edge(a,b);if(boundary.has(k)||selected&&!selected.has(edge(vertices[a].weld,vertices[b].weld)))return null;if(middles[k]!=null)return middles[k];var A=vertices[a],B=vertices[b],influence=mixInfluences(A,B),weldKey='m:'+edge(A.weld,B.weld);if(registry.ids[weldKey]==null)registry.ids[weldKey]=registry.next++;var v={p:A.p.map(function(x,i){return (x+B.p[i])*.5;}),uv:A.uv.map(function(x,i){return (x+B.uv[i])*.5;}),j:influence.j,w:influence.w,weld:registry.ids[weldKey],source:null,boundary:false};middles[k]=vertices.length;vertices.push(v);return middles[k];}
 faces.forEach(function(f){var a=f[0],b=f[1],c=f[2],ab=midpoint(a,b),bc=midpoint(b,c),ca=midpoint(c,a),bits=(ab!=null?1:0)+(bc!=null?2:0)+(ca!=null?4:0);
  if(bits===0)out.push(f);else if(bits===1)out.push([a,ab,c],[ab,b,c]);else if(bits===2)out.push([b,bc,a],[bc,c,a]);else if(bits===4)out.push([c,ca,b],[ca,a,b]);else if(bits===3)out.push([b,bc,ab],[a,ab,bc],[a,bc,c]);else if(bits===5)out.push([a,ab,ca],[b,c,ca],[b,ca,ab]);else if(bits===6)out.push([c,ca,bc],[a,b,bc],[a,bc,ca]);else out.push([a,ab,ca],[ab,b,bc],[ca,bc,c],[ab,bc,ca]);
 });if(out.length>maxFaces)throw Error('Anatomy refinement exceeds budget');return out;
}
function femalePoint(p,f,a){
 var H=f.H,x=(p[0]-f.cx)/H,y=(p[1]-f.lowest)/H,k=a.variant==='compact'?.80:a.variant==='full'?1.20:1,s=a.scale*k,span=.023*a.length*s,cy=.014;
 var envelope=Math.exp(-Math.pow((y-cy)/span,4)),sep=.0048*a.width*s,outerWidth=.0034*a.width*s;
 var outer=Math.exp(-Math.pow((Math.abs(x)-sep)/outerWidth,2))*envelope;
 var inner=Math.exp(-Math.pow((Math.abs(x)-.0018*a.width*s)/(.0012*a.width*s),2))*Math.exp(-Math.pow((y-.014)/(.017*a.length*s),4));
 var cleft=Math.exp(-Math.pow(x/.0008,2))*Math.exp(-Math.pow((y-.013)/(.017*a.length*s),4));
 var hood=Math.exp(-Math.pow(x/(.0024*s),2)-Math.pow((y-.033)/(.0035*s),2));
 return [p[0],p[1],p[2]+H*a.projection*s*(.0058*outer+.0028*inner-.0012*cleft+.0028*hood)];
}
function malePoint(p,f,a){
 var H=f.H,k=a.variant==='compact'?.80:a.variant==='full'?1.20:1,s=a.scale*k,rootY=f.rootY,x=(p[0]-f.rootX)/H,y=(p[1]-rootY)/H;
 var bagY=-.016,bagWidth=.0115*a.width*s,bagHeight=.014*s;
 var l=Math.pow((x+.0065*s)/bagWidth,2)+Math.pow((y-bagY)/bagHeight,2),r=Math.pow((x-.0065*s)/bagWidth,2)+Math.pow((y-bagY)/bagHeight,2),bag=Math.pow(Math.max(0,1-Math.min(l,r)),2);
 var base=[p[0],p[1]-H*.023*s*bag,p[2]+H*.017*s*a.projection*Math.pow(bag,.65)];
 var radius=.0105*a.width*s,rr=Math.hypot(x,y)/radius;if(rr>=1)return base;
 var angle=Math.atan2(x,y),t=rr<.45?1-rr/.45:0,L=H*.052*a.length*s;
 var dz=H*(.010+.014*t+.007*Math.sin(t*Math.PI*.5))*a.projection,derivative=H*(.014+.007*Math.PI*.5*Math.cos(t*Math.PI*.5))*a.projection,n=Math.hypot(L,derivative),ny=derivative/n,nz=L/n;
 var shaftRadius=H*.0064*a.width*s*(.95-.06*t+.26*Math.exp(-Math.pow((t-.84)/.13,2)));
 if(t>.90)shaftRadius*=Math.sqrt(Math.max(0,1-Math.pow((t-.90)/.10,2)));
 var q=[f.rootX+shaftRadius*Math.sin(angle),rootY-L*t+shaftRadius*Math.cos(angle)*ny,f.rootZ+dz+shaftRadius*Math.cos(angle)*nz];
 var blend=rr>.45?1-smooth(.45,1,rr):1;return q.map(function(v,i){return base[i]+(v-base[i])*blend;});
}
function inverse(a){var m=a.slice(),out=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];for(var i=0;i<4;i++){var pivot=i;for(var r=i+1;r<4;r++)if(Math.abs(m[r*4+i])>Math.abs(m[pivot*4+i]))pivot=r;if(Math.abs(m[pivot*4+i])<1e-12)throw Error('Singular anatomy skin bind');for(var c=0;c<4;c++){var v=m[i*4+c];m[i*4+c]=m[pivot*4+c];m[pivot*4+c]=v;v=out[i*4+c];out[i*4+c]=out[pivot*4+c];out[pivot*4+c]=v;}var d=m[i*4+i];for(var c=0;c<4;c++){m[i*4+c]/=d;out[i*4+c]/=d;}for(var r=0;r<4;r++)if(r!==i){var d=m[r*4+i];for(var c=0;c<4;c++){m[r*4+c]-=d*m[i*4+c];out[r*4+c]-=d*out[i*4+c];}}}return out;}
function multiply(a,b){var out=new Array(16);for(var r=0;r<4;r++)for(var c=0;c<4;c++){var value=0;for(var k=0;k<4;k++)value+=a[k*4+r]*b[c*4+k];out[c*4+r]=value;}return out;}
function palette(asset,world){var skin=asset.character.skins[0];return skin.joints.map(function(id,i){return multiply(world[id],skin.inverseBindMatrices[i]);});}
function skinPositions(part,asset,world){var matrices=palette(asset,world),out=new Float32Array(part.bindPositions.length);for(var i=0;i<out.length;i+=3){var p=part.bindPositions;for(var k=0;k<4;k++){var w=part.weights[i/3*4+k],m=matrices[part.joints[i/3*4+k]];if(!w)continue;out[i]+=(m[0]*p[i]+m[4]*p[i+1]+m[8]*p[i+2]+m[12])*w;out[i+1]+=(m[1]*p[i]+m[5]*p[i+1]+m[9]*p[i+2]+m[13])*w;out[i+2]+=(m[2]*p[i]+m[6]*p[i+1]+m[10]*p[i+2]+m[14])*w;}}return out;}
function build(asset,body,c){
 var api=g.DNDCharacterAnatomy,geo=g.DNDCharacterBodyGeometry,a=api.normalize(c.anatomy).external,type=mode(c);
 if(!supported(c)||type==='none'||api.covered('pubic',c.clothing))return {parts:[],removed:new Set(),boundary:[]};
 if(!body.joints||!body.weights||!body.uv||!asset.character||asset.parts.length!==1)throw Error('Несовместимый skin для анатомического модуля');
 var f=landmarks(asset,body,geo),H=f.H,src=body.__ceShapedPositions,n=body.__ceNormals,indices=body.indices,ids={},vertices=[],faces=[],removed=new Set(),counts={},registry={ids:{},next:0};
 function vertex(id){if(ids[id]!=null)return ids[id];ids[id]=vertices.length;var original=Array.from((body.basePositions||src).slice(id*3,id*3+3)).map(function(v){return v.toFixed(6);}).join(','),weldKey='v:'+original;if(registry.ids[weldKey]==null)registry.ids[weldKey]=registry.next++;vertices.push({p:Array.from(src.slice(id*3,id*3+3)),uv:Array.from(body.uv.slice(id*2,id*2+2)),j:Array.from(body.joints.slice(id*4,id*4+4)),w:Array.from(body.weights.slice(id*4,id*4+4)),weld:registry.ids[weldKey],source:id,boundary:false});return ids[id];}
 for(var i=0;i<indices.length;i+=3){var tri=[indices[i],indices[i+1],indices[i+2]],x=0,y=0,z=0;tri.forEach(function(id){x+=src[id*3]/3;y+=src[id*3+1]/3;z+=n[id*3+2]/3;});var ellipse=Math.pow((x-f.cx)/(H*.043),2)+Math.pow((y-f.centerY)/(H*.054),2);if(ellipse>1||z<.05)continue;var face=tri.map(vertex);faces.push(face);removed.add(key(tri[0],tri[1],tri[2]));[edge(vertices[face[0]].weld,vertices[face[1]].weld),edge(vertices[face[1]].weld,vertices[face[2]].weld),edge(vertices[face[2]].weld,vertices[face[0]].weld)].forEach(function(e){counts[e]=(counts[e]||0)+1;});}
 if(faces.length<8)throw Error('Недостаточно геометрии для анатомического крепления');
 var weldedBoundary=new Set(Object.keys(counts).filter(function(e){return counts[e]===1;})),boundaryEdges=new Set(),boundary=[];faces.forEach(function(face){[[face[0],face[1]],[face[1],face[2]],[face[2],face[0]]].forEach(function(pair){if(weldedBoundary.has(edge(vertices[pair[0]].weld,vertices[pair[1]].weld)))boundaryEdges.add(edge(pair[0],pair[1]));});});
 boundaryEdges.forEach(function(e){e.split(':').forEach(function(id){vertices[Number(id)].boundary=true;});});var boundaryWelds=new Set(vertices.filter(function(v){return v.boundary;}).map(function(v){return v.weld;}));vertices.forEach(function(v){if(boundaryWelds.has(v.weld))v.boundary=true;});vertices.forEach(function(v,i){if(v.boundary)boundary.push({local:i,source:v.source});});
 var rootSurface=vertices.filter(function(v){return !v.boundary;}).sort(function(A,B){function distance(v){return Math.pow((v.p[0]-f.cx)*4,2)+Math.pow(v.p[1]-(f.lowest+H*.028),2);}return distance(A)-distance(B);})[0];f.rootX=rootSurface.p[0];f.rootY=rootSurface.p[1];f.rootZ=rootSurface.p[2];
 var desired=a.quality==='low'?2:a.quality==='high'?5:4,maxFaces=a.quality==='low'?4000:a.quality==='high'?20000:12000,level=0;
 for(var pass=0;pass<desired;pass++){
  var selected=null;if(pass>0){selected=new Set();faces.forEach(function(face){var x=0,y=0;face.forEach(function(id){x+=vertices[id].p[0]/3;y+=vertices[id].p[1]/3;});var focus=type==='male'?Math.abs(x-f.rootX)<H*.020&&y>f.rootY-H*.032&&y<f.rootY+H*.018:Math.abs(x-f.cx)<H*.013&&y>f.lowest-H*.003&&y<f.lowest+H*.041;if(focus)[[face[0],face[1]],[face[1],face[2]],[face[2],face[0]]].forEach(function(pair){selected.add(edge(vertices[pair[0]].weld,vertices[pair[1]].weld));});});}
  var oldLength=vertices.length;try{var next=refined(vertices,faces,boundaryEdges,maxFaces,selected,registry);faces=next;level++;}catch(error){if(error.message!=='Anatomy refinement exceeds budget')throw error;vertices.length=oldLength;break;}
 }
 var seamGroups={};vertices.forEach(function(v){(seamGroups[v.weld]||(seamGroups[v.weld]=[])).push(v);});Object.keys(seamGroups).forEach(function(id){var group=seamGroups[id];if(group.length<2||group.some(function(v){return v.boundary;}))return;var mean=[0,0,0];group.forEach(function(v){for(var k=0;k<3;k++)mean[k]+=v.p[k]/group.length;});group.forEach(function(v){v.p=mean.slice();});});var pole=vertices.filter(function(v){return v.source===rootSurface.source;})[0];f.rootX=pole.p[0];f.rootY=pole.p[1];f.rootZ=pole.p[2];
 var positions=[],uv=[],joints=[],weights=[];vertices.forEach(function(v){var p=v.boundary?v.p:(type==='female'?femalePoint(v.p,f,a):malePoint(v.p,f,a));positions.push.apply(positions,p);uv.push.apply(uv,v.uv);joints.push.apply(joints,v.j);weights.push.apply(weights,v.w);});
 var p=new Float32Array(positions),ix=new Uint16Array(faces.flat()),normals=geo.normals(p,ix,p);
 boundary.forEach(function(v){normals.set(body.__ceNormals.slice(v.source*3,v.source*3+3),v.local*3);});
 var part={positions:p,__ceShapedPositions:p,__ceNormals:normals,indices:ix,uv:new Float32Array(uv),joints:new Uint16Array(joints),weights:new Float32Array(weights),skin:body.skin,material:body.material,headAccessory:'externalAnatomy',anatomySkin:true,__ceHeadFrame:body.__ceHeadFrame,anatomyType:type,anatomyVariant:a.variant,anatomyLevel:level,boundary:boundary,frame:f,bindPositions:new Float32Array(p.length)};
 var matrices=palette(asset,asset.character.worldMatrices);
 for(var i=0;i<p.length;i+=3){var blended=new Array(16).fill(0);for(var k=0;k<4;k++){var matrix=matrices[part.joints[i/3*4+k]],w=part.weights[i/3*4+k];for(var d=0;d<16;d++)blended[d]+=matrix[d]*w;}/* Convert the blended column-major matrix to row-major for inversion. */
  var inv=inverse(Array.from({length:16},function(_,d){return blended[(d%4)*4+Math.floor(d/4)];}));part.bindPositions[i]=inv[0]*p[i]+inv[1]*p[i+1]+inv[2]*p[i+2]+inv[3];part.bindPositions[i+1]=inv[4]*p[i]+inv[5]*p[i+1]+inv[6]*p[i+2]+inv[7];part.bindPositions[i+2]=inv[8]*p[i]+inv[9]*p[i+1]+inv[10]*p[i+2]+inv[11];
 }
 if(vertices.length>=65536||p.some(function(v){return !isFinite(v);}))throw Error('Некорректная геометрия анатомии');
 return {parts:[part],removed:removed,boundary:boundary};
}
function exclude(indices,removed){if(!removed.size)return indices;var out=[];for(var i=0;i<indices.length;i+=3)if(!removed.has(key(indices[i],indices[i+1],indices[i+2])))out.push(indices[i],indices[i+1],indices[i+2]);return new Uint32Array(out);}
g.DNDCharacterAnatomyGeometry={VERSION:1,supported:supported,mode:mode,build:build,exclude:exclude,skinPositions:skinPositions};
})(window);
