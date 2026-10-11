/* First fitted clothing set; regenerated from the current deformed body, not camera frames. */
(function(g){'use strict';
var slots=[{id:'underwearBottom',name:'Трусы',required:true},{id:'underwearTop',name:'Лифчик / топ',female:true,required:true},{id:'top',name:'Верх'},{id:'bottom',name:'Низ'},{id:'feet',name:'Обувь'}];
var items={briefs_male:{slot:'underwearBottom',name:'Мужские трусы-боксеры',gender:'male',region:[.38,.61,'lower'],color:[.17,.23,.32,1],layer:1},briefs_female:{slot:'underwearBottom',name:'Женские трусы-шортики',gender:'female',region:[.38,.61,'lower'],color:[.29,.20,.33,1],layer:1},bra:{slot:'underwearTop',name:'Базовый лифчик-топ',gender:'female',region:[.65,.815,'torso'],color:[.29,.20,.33,1],layer:1},shirt:{slot:'top',name:'Футболка',region:[.55,.835,'upper'],color:[.22,.39,.43,1],layer:3},trousers:{slot:'bottom',name:'Штаны',region:[.045,.61,'lower'],color:[.17,.22,.29,1],layer:2},skirt:{slot:'bottom',name:'Юбка',region:[.31,.61,'lower'],color:[.37,.20,.25,1],layer:2,skirt:true},boots:{slot:'feet',name:'Базовые сапоги',region:[0,.17,'feet'],color:[.24,.16,.11,1],layer:4}};
function normalize(input,gender){input=input&&typeof input==='object'?input:{};var out={},female=gender==='female';slots.forEach(function(s){var id=input[s.id],item=items[id];out[s.id]=item&&item.slot===s.id&&(!item.gender||item.gender===(female?'female':'male'))?id:'';});if(!out.underwearBottom)out.underwearBottom=female?'briefs_female':'briefs_male';out.underwearTop=female?'bra':'';return out;}
function list(slot,gender){return Object.keys(items).filter(function(id){var i=items[id];return i.slot===slot&&(!i.gender||i.gender===(gender==='female'?'female':'male'));}).map(function(id){return Object.assign({id:id},items[id]);});}
function weight(m,i,group,h){return group==='torso'?m.torso[i]:group==='upper'?m.torso[i]+m.arm[i]*(h==null?1:Math.max(0,Math.min(1,(h-.68)/.035))):group==='feet'?1:m.torso[i]+m.leg[i];}
function clip(poly,field,limit,above){var out=[];for(var i=0;i<poly.length;i++){var a=poly[i],b=poly[(i+1)%poly.length],av=a[field]-limit,bv=b[field]-limit,ain=above?av>=0:av<=0,bin=above?bv>=0:bv<=0;if(ain)out.push(a);if(ain!==bin){var t=av/(av-bv),v={p:[],n:[],h:a.h+(b.h-a.h)*t,w:a.w+(b.w-a.w)*t};for(var k=0;k<3;k++){v.p[k]=a.p[k]+(b.p[k]-a.p[k])*t;v.n[k]=a.n[k]+(b.n[k]-a.n[k])*t;}out.push(v);}}return out;}
function mesh(points,normal,anchors,item,id){if(!points.length)return null;var v=new Float32Array(points),indices=new Uint32Array(points.length/3);for(var i=0;i<indices.length;i++)indices[i]=i;return {positions:v,__ceShapedPositions:v,__ceNormals:new Float32Array(normal),anchorPositions:new Float32Array(anchors||points),indices:indices,material:-1,clothing:true,clothingId:id,color:item.color};}
function shell(part,m,b,item,id){var src=part.__ceShapedPositions,n=part.__ceNormals,points=[],normal=[],anchors=[],r=item.region,offset=.004+item.layer*.003;
 for(var i=0;i<part.indices.length;i+=3){var poly=[];for(var k=0;k<3;k++){var v=part.indices[i+k],at=v*3;poly.push({p:[src[at],src[at+1],src[at+2]],n:[n[at],n[at+1],n[at+2]],h:(src[at+1]-b.min[1])/b.size[1],w:weight(m,v,r[2],(src[at+1]-b.min[1])/b.size[1])});}poly=clip(poly,'h',r[0],true);poly=clip(poly,'h',r[1],false);poly=clip(poly,'w',.5,true);
  for(var j=1;j+1<poly.length;j++)[poly[0],poly[j],poly[j+1]].forEach(function(v){var len=Math.hypot.apply(null,v.n)||1;for(var k=0;k<3;k++){var nk=v.n[k]/len;anchors.push(v.p[k]);normal.push(nk);points.push(v.p[k]+nk*offset);}});
 }return mesh(points,normal,anchors,item,id);
}
function skirt(part,m,b,item,id){var src=part.__ceShapedPositions,cx=b.center[0],cz=b.center[2],rx=.01,rz=.01,lo=item.region[0],hi=item.region[1],points=[],normals=[];
 for(var i=0;i<src.length;i+=3){var h=(src[i+1]-b.min[1])/b.size[1];if(h>.43&&h<hi+.02&&weight(m,i/3,'lower')>.5){rx=Math.max(rx,Math.abs(src[i]-cx));rz=Math.max(rz,Math.abs(src[i+2]-cz));}}
 // Rounded rectangular cross-section encloses hips without tracing intimate anatomy.
 var rings=8,segments=64,verts=[];for(var row=0;row<=rings;row++){var t=row/rings,y=b.min[1]+b.size[1]*(hi+(lo-hi)*t),flare=1+t*.3;for(var j=0;j<segments;j++){var angle=j/segments*Math.PI*2,c=Math.cos(angle),s=Math.sin(angle);verts.push([cx+(rx+.015)*flare*Math.sign(c)*Math.pow(Math.abs(c),.5),y,cz+(rz+.015)*flare*Math.sign(s)*Math.pow(Math.abs(s),.5)]);}}
 for(var row=0;row<rings;row++)for(var j=0;j<segments;j++){var a=row*segments+j,bb=row*segments+(j+1)%segments,c=a+segments,d=bb+segments;[a,c,bb,bb,c,d].forEach(function(v){points.push.apply(points,verts[v]);});}var v=new Float32Array(points),n=g.DNDCharacterBodyGeometry.normals(v,null);return mesh(points,Array.from(n),points,item,id);
}
function boots(part,m,b,item,id){var src=part.__ceShapedPositions,points=[],segments=48;
 for(var side=0;side<2;side++){
  function range(lo,hi){var min=[Infinity,Infinity],max=[-Infinity,-Infinity];for(var i=0;i<src.length;i+=3){var h=(src[i+1]-b.min[1])/b.size[1];if(h<lo||h>hi||weight(m,i/3,'feet')<.3||(src[i]<b.center[0]?0:1)!==side)continue;min[0]=Math.min(min[0],src[i]);max[0]=Math.max(max[0],src[i]);min[1]=Math.min(min[1],src[i+2]);max[1]=Math.max(max[1],src[i+2]);}if(!isFinite(min[0]))return null;return {cx:(min[0]+max[0])/2,cz:(min[1]+max[1])/2,rx:(max[0]-min[0])/2+.013,rz:(max[1]-min[1])/2+.013};}
  var foot=range(0,.075),ankle=range(.075,.17);if(!foot||!ankle)continue;var rows=[{h:.002,shape:foot},{h:.06,shape:foot},{h:.085,shape:ankle},{h:.17,shape:ankle}],v=[];
  rows.forEach(function(row){for(var j=0;j<segments;j++){var a=j/segments*Math.PI*2,c=Math.cos(a),s=Math.sin(a);v.push([row.shape.cx+row.shape.rx*Math.sign(c)*Math.pow(Math.abs(c),.5),b.min[1]+row.h*b.size[1],row.shape.cz+row.shape.rz*Math.sign(s)*Math.pow(Math.abs(s),.5)]);}});
  for(var row=0;row<rows.length-1;row++)for(var j=0;j<segments;j++){var a=row*segments+j,bb=row*segments+(j+1)%segments,c=a+segments,d=bb+segments;[a,c,bb,bb,c,d].forEach(function(ix){points.push.apply(points,v[ix]);});}
  for(var j=1;j+1<segments;j++)[0,j,j+1].forEach(function(ix){points.push.apply(points,v[ix]);});
 }var n=g.DNDCharacterBodyGeometry.normals(new Float32Array(points),null);return mesh(points,Array.from(n),points,item,id);
}

function fabricSurface(body){if(body.__ceFabricSource===body.__ceShapedPositions&&body.__ceFabricSurface)return body.__ceFabricSurface;
 var original=body.__ceShapedPositions,base=body.basePositions||original,indices=body.indices,count=original.length/3,groups=new Map(),ids=new Uint32Array(count),unique=[],numbers=[];
 // UV-seam duplicates must move together, otherwise smoothing tears the garment.
 for(var i=0;i<count;i++){var key=base[i*3].toFixed(6)+','+base[i*3+1].toFixed(6)+','+base[i*3+2].toFixed(6),id=groups.get(key);if(id==null){id=numbers.length;groups.set(key,id);unique.push(0,0,0);numbers.push(0);}ids[i]=id;numbers[id]++;for(var k=0;k<3;k++)unique[id*3+k]+=original[i*3+k];}
 for(var i=0;i<numbers.length;i++)for(var k=0;k<3;k++)unique[i*3+k]/=numbers[i];var src=new Float32Array(unique);
 for(var pass=0;pass<8;pass++){var sums=new Float32Array(src.length),weights=new Uint32Array(numbers.length);for(var i=0;i<indices.length;i+=3){var a=ids[indices[i]],b=ids[indices[i+1]],c=ids[indices[i+2]];for(var k=0;k<3;k++){sums[a*3+k]+=src[b*3+k]+src[c*3+k];sums[b*3+k]+=src[a*3+k]+src[c*3+k];sums[c*3+k]+=src[a*3+k]+src[b*3+k];}weights[a]+=2;weights[b]+=2;weights[c]+=2;}var out=new Float32Array(src);for(var i=0;i<numbers.length;i++)if(weights[i])for(var k=0;k<3;k++)out[i*3+k]=src[i*3+k]*.4+sums[i*3+k]/weights[i]*.6;src=out;}
 var positions=new Float32Array(original.length);for(var i=0;i<count;i++)for(var k=0;k<3;k++)positions[i*3+k]=src[ids[i]*3+k];body.__ceFabricSource=original;body.__ceFabricSurface={indices:indices,basePositions:base,__ceShapedPositions:positions,__ceNormals:g.DNDCharacterBodyGeometry.normals(positions,indices,base)};return body.__ceFabricSurface;
}

function fit(asset,body,appearance,b){var m=g.DNDCharacterBodyGeometry.masks(asset,body),clothing=normalize(appearance.clothing,appearance.gender),parts=[],visible=[],src=body.__ceShapedPositions,selected=Object.keys(clothing).map(function(k){return {id:clothing[k],item:items[clothing[k]]};}).filter(function(v){return v.item;});
 var surface=fabricSurface(body);selected.forEach(function(v){if(v.item.slot==='underwearBottom'&&clothing.bottom||v.item.slot==='underwearTop'&&clothing.top)return;var p=v.item.skirt?skirt(body,m,b,v.item,v.id):v.id==='boots'?boots(body,m,b,v.item,v.id):shell(surface,m,b,v.item,v.id);if(p)parts.push(p);});
 for(var i=0;i<body.indices.length;i+=3){var covered=selected.some(function(v){var r=v.item.region;for(var k=0;k<3;k++){var ix=body.indices[i+k],h=(src[ix*3+1]-b.min[1])/b.size[1];if(h<r[0]||h>r[1]||weight(m,ix,r[2],h)<.5)return false;}return true;});if(!covered)visible.push(body.indices[i],body.indices[i+1],body.indices[i+2]);}
 return {parts:parts,indices:new body.indices.constructor(visible),clothing:clothing};
}
g.DNDCharacterClothing={slots:slots,items:items,normalize:normalize,list:list,fit:fit};
})(window);
