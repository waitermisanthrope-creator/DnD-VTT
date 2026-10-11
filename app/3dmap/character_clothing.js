/* First fitted clothing set; regenerated from the current deformed body, not camera frames. */
(function(g){'use strict';
var slots=[{id:'underwearBottom',name:'Трусы',underwear:true},{id:'underwearTop',name:'Лифчик / топ',female:true,underwear:true},{id:'top',name:'Верх'},{id:'bottom',name:'Низ'},{id:'socks',name:'Носки'},{id:'feet',name:'Обувь'},{id:'outer',name:'Верхняя одежда'},{id:'hands',name:'Перчатки'},{id:'head',name:'Голова'},{id:'shoulders',name:'Наплечники'},{id:'waist',name:'Пояс'},{id:'back',name:'Плащ'},{id:'neck',name:'Шея / аксессуары'}];
var items={briefs_male:{slot:'underwearBottom',name:'Мужские трусы-боксеры',gender:'male',region:[.38,.61,'lower'],color:[.17,.23,.32,1],layer:1},briefs_female:{slot:'underwearBottom',name:'Женские трусы-шортики',gender:'female',region:[.38,.61,'lower'],color:[.29,.20,.33,1],layer:1},bra:{slot:'underwearTop',name:'Базовый лифчик-топ',gender:'female',region:[.65,.815,'torso'],color:[.29,.20,.33,1],layer:1},shirt:{slot:'top',name:'Футболка',region:[.55,.835,'upper'],color:[.22,.39,.43,1],layer:3},trousers:{slot:'bottom',name:'Штаны',region:[.045,.61,'lower'],color:[.17,.22,.29,1],layer:2},skirt:{slot:'bottom',name:'Юбка',region:[.31,.61,'lower'],color:[.37,.20,.25,1],layer:2,skirt:true},boots:{slot:'feet',name:'Базовые сапоги',region:[0,.17,'feet'],color:[.24,.16,.11,1],layer:4}};
items.socks={slot:'socks',name:'Базовые носки',region:[0,.12,'feet'],color:[.65,.64,.58,1],layer:1};items.jacket={slot:'outer',name:'Базовая кофта',region:[.53,.835,'upperLong'],color:[.32,.25,.18,1],layer:5};items.gloves={slot:'hands',name:'Базовые перчатки',region:[0,1,'hands'],color:[.22,.15,.1,1],layer:4};items.cap={slot:'head',name:'Базовая шапка',region:[.94,1,'head'],color:[.31,.25,.22,1],layer:3};
items.pauldrons={slot:'shoulders',name:'Базовые наплечники',region:[.745,.84,'shoulders'],color:[.44,.46,.49,1],layer:9};items.belt={slot:'waist',name:'Кожаный пояс',region:[.592,.62,'torso'],color:[.20,.12,.07,1],layer:9,skirt:true};items.cape={slot:'back',name:'Базовый плащ',region:[.32,.82,'torso'],color:[.24,.18,.32,1],layer:8,noHide:true,cape:true};items.scarf={slot:'neck',name:'Шарф',region:[.80,.91,'neck'],color:[.53,.25,.17,1],layer:7};
var atlas='./app/3dmap/assets/clothing/fantasy-materials.webp';
var materialCells={briefs_male:1,briefs_female:2,bra:2,shirt:4,trousers:1,skirt:15,socks:14,boots:8,jacket:5,gloves:9,cap:5,pauldrons:10,belt:9,cape:7,scarf:15};
Object.keys(materialCells).forEach(function(id){items[id].texture=atlas;items[id].tile=materialCells[id];});
items.briefs_male_linen=Object.assign({},items.briefs_male,{name:'Льняные боксеры',tile:0});
items.briefs_male_dark=Object.assign({},items.briefs_male,{name:'Тёмные боксеры',tile:1});
items.briefs_female_linen=Object.assign({},items.briefs_female,{name:'Льняные трусы-шортики',tile:0});
items.briefs_female_silk=Object.assign({},items.briefs_female,{name:'Шёлковые трусы с вышивкой',tile:2});
items.bra_linen=Object.assign({},items.bra,{name:'Льняной лифчик-топ',tile:0});
items.bra_silk=Object.assign({},items.bra,{name:'Шёлковый лифчик-топ',tile:2});
items.shirt_linen=Object.assign({},items.shirt,{name:'Льняная футболка',tile:0});
items.shirt_elven=Object.assign({},items.shirt,{name:'Эльфийская футболка',tile:3});
items.shirt_runic=Object.assign({},items.shirt,{name:'Футболка с серебряной вышивкой',tile:4});
items.jacket_wool=Object.assign({},items.jacket,{name:'Кофта из светлой шерсти',tile:6});
items.jacket_elven=Object.assign({},items.jacket,{name:'Эльфийская кофта',tile:3});
items.jacket_brocade=Object.assign({},items.jacket,{name:'Парчовая кофта',tile:7});
items.skirt_linen=Object.assign({},items.skirt,{name:'Льняная юбка',tile:0});
items.skirt_elven=Object.assign({},items.skirt,{name:'Эльфийская юбка',tile:3});
items.skirt_brocade=Object.assign({},items.skirt,{name:'Парчовая юбка',tile:7});
items.pauldrons_bronze=Object.assign({},items.pauldrons,{name:'Бронзовые наплечники',tile:11});
items.pauldrons_chain=Object.assign({},items.pauldrons,{name:'Кольчужные наплечники',tile:12});
items.stockings={slot:'socks',name:'Тёмные чулки',region:[0,.44,'legs'],color:[1,1,1,1],layer:1,texture:atlas,tile:13,hosiery:true};items.stockings_ivory=Object.assign({},items.stockings,{name:'Светлые чулки',tile:14});items.tights={slot:'socks',name:'Тёмные колготки',region:[0,.61,'lower'],color:[1,1,1,1],layer:1,texture:atlas,tile:13,hosiery:true,tights:true};items.tights_ivory=Object.assign({},items.tights,{name:'Светлые колготки',tile:14});
function normalize(input,gender){input=input&&typeof input==='object'?input:{};var out={},female=gender==='female';slots.forEach(function(s){var id=input[s.id],item=items[id];out[s.id]=s.underwear&&id==='none'?'none':item&&item.slot===s.id&&(!item.gender||item.gender===(female?'female':'male'))?id:'';});if(!out.underwearBottom)out.underwearBottom=female?'briefs_female':'briefs_male';if(!out.underwearTop&&female)out.underwearTop='bra';return out;}
function list(slot,gender){return Object.keys(items).filter(function(id){var i=items[id];return i.slot===slot&&(!i.gender||i.gender===(gender==='female'?'female':'male'));}).map(function(id){return Object.assign({id:id},items[id]);});}
function weight(m,i,group,h){return group==='legs'?m.leg[i]+m.foot[i]:group==='shoulders'?m.arm[i]:group==='neck'?m.neck[i]:group==='torso'?m.torso[i]:group==='upper'?m.torso[i]+m.arm[i]*(h==null?1:Math.max(0,Math.min(1,(h-.68)/.035))):group==='upperLong'?m.torso[i]+m.arm[i]:group==='hands'?m.hand[i]:group==='head'?m.head[i]:group==='feet'?1:m.torso[i]+m.leg[i];}
function clip(poly,field,limit,above){var out=[];for(var i=0;i<poly.length;i++){var a=poly[i],b=poly[(i+1)%poly.length],av=a[field]-limit,bv=b[field]-limit,ain=above?av>=0:av<=0,bin=above?bv>=0:bv<=0;if(ain)out.push(a);if(ain!==bin){var t=av/(av-bv),v={p:[],n:[],h:a.h+(b.h-a.h)*t,w:a.w+(b.w-a.w)*t};for(var k=0;k<3;k++){v.p[k]=a.p[k]+(b.p[k]-a.p[k])*t;v.n[k]=a.n[k]+(b.n[k]-a.n[k])*t;}out.push(v);}}return out;}
function mesh(points,normal,anchors,item,id){if(!points.length)return null;var v=new Float32Array(points),indices=new Uint32Array(points.length/3);for(var i=0;i<indices.length;i++)indices[i]=i;return {positions:v,__ceShapedPositions:v,__ceNormals:new Float32Array(normal),anchorPositions:new Float32Array(anchors||points),indices:indices,material:-1,clothing:true,clothingId:id,color:item.texture?[1,1,1,1]:item.color,texture:item.texture,textureTile:item.tile};}
function shell(part,m,b,item,id){var src=part.__ceShapedPositions,n=part.__ceNormals,points=[],normal=[],anchors=[],r=item.region,offset=.004+item.layer*.003;
 for(var i=0;i<part.indices.length;i+=3){var poly=[];for(var k=0;k<3;k++){var v=part.indices[i+k],at=v*3;poly.push({p:[src[at],src[at+1],src[at+2]],n:[n[at],n[at+1],n[at+2]],h:(src[at+1]-b.min[1])/b.size[1],w:weight(m,v,r[2],(src[at+1]-b.min[1])/b.size[1])});}poly=clip(poly,'h',r[0],true);poly=clip(poly,'h',r[1],false);poly=clip(poly,'w',.5,true);
  for(var j=1;j+1<poly.length;j++)[poly[0],poly[j],poly[j+1]].forEach(function(v){var len=Math.hypot.apply(null,v.n)||1;for(var k=0;k<3;k++){var nk=v.n[k]/len;anchors.push(v.p[k]);normal.push(nk);points.push(v.p[k]+nk*offset);}});
 }return mesh(points,normal,anchors,item,id);
}
function skirt(part,m,b,item,id){var src=part.__ceShapedPositions,lo=item.region[0],hi=item.region[1],points=[],rings=12,segments=64;
 function section(h){var samples=[],min=[Infinity,Infinity],max=[-Infinity,-Infinity];for(var i=0;i<src.length;i+=3){var t=(src[i+1]-b.min[1])/b.size[1];if(Math.abs(t-h)>.012||weight(m,i/3,'lower')<.5)continue;samples.push([src[i],src[i+2]]);min[0]=Math.min(min[0],src[i]);max[0]=Math.max(max[0],src[i]);min[1]=Math.min(min[1],src[i+2]);max[1]=Math.max(max[1],src[i+2]);}if(!samples.length)throw Error('Не найдена посадка юбки');var cx=(min[0]+max[0])/2,cz=(min[1]+max[1])/2,rx=Math.max(.001,(max[0]-min[0])/2),rz=Math.max(.001,(max[1]-min[1])/2),expand=1;samples.forEach(function(v){expand=Math.max(expand,Math.hypot((v[0]-cx)/rx,(v[1]-cz)/rz));});return {cx:cx,cz:cz,rx:rx*expand+(item.slot==='waist'?.035:.006),rz:rz*expand+(item.slot==='waist'?.035:.006)};}
 var hip=section(.48),verts=[];for(var row=0;row<=rings;row++){var t=row/rings,h=hi+(lo-hi)*t,shape=h>=.48?section(h):hip,flare=h>=.48?1:1+(.48-h)*.9;for(var j=0;j<segments;j++){var angle=j/segments*Math.PI*2;verts.push([shape.cx+shape.rx*flare*Math.cos(angle),b.min[1]+b.size[1]*h,shape.cz+shape.rz*flare*Math.sin(angle)]);}}
 for(var row=0;row<rings;row++)for(var j=0;j<segments;j++){var a=row*segments+j,bb=row*segments+(j+1)%segments,c=a+segments,d=bb+segments;[a,c,bb,bb,c,d].forEach(function(v){points.push.apply(points,verts[v]);});}var v=new Float32Array(points),n=g.DNDCharacterBodyGeometry.normals(v,null),out=mesh(points,Array.from(n),points,item,id);out.fitWaist=section(hi);return out;
}

function boots(part,m,b,item,id){var src=part.__ceShapedPositions,points=[],segments=48;
 for(var side=0;side<2;side++){
  function range(lo,hi){var min=[Infinity,Infinity],max=[-Infinity,-Infinity];for(var i=0;i<src.length;i+=3){var h=(src[i+1]-b.min[1])/b.size[1];if(h<lo||h>hi||weight(m,i/3,'feet')<.3||(src[i]<b.center[0]?0:1)!==side)continue;min[0]=Math.min(min[0],src[i]);max[0]=Math.max(max[0],src[i]);min[1]=Math.min(min[1],src[i+2]);max[1]=Math.max(max[1],src[i+2]);}if(!isFinite(min[0]))return null;return {cx:(min[0]+max[0])/2,cz:(min[1]+max[1])/2,rx:(max[0]-min[0])/2+.013,rz:(max[1]-min[1])/2+.013};}
  var foot=range(0,.075),ankle=range(.075,.17);if(!foot||!ankle)continue;var rows=[{h:.002,shape:foot},{h:.025,shape:foot},{h:.045,shape:foot},{h:.065,shape:range(.04,.075)||foot},{h:.085,shape:range(.075,.095)||ankle},{h:.11,shape:range(.10,.12)||ankle},{h:.14,shape:range(.13,.15)||ankle},{h:.17,shape:range(.16,.18)||ankle}],v=[];
  rows.forEach(function(row){for(var j=0;j<segments;j++){var a=j/segments*Math.PI*2,c=Math.cos(a),s=Math.sin(a);v.push([row.shape.cx+row.shape.rx*Math.sign(c)*Math.pow(Math.abs(c),.70),b.min[1]+row.h*b.size[1],row.shape.cz+row.shape.rz*Math.sign(s)*Math.pow(Math.abs(s),.70)]);}});
  for(var row=0;row<rows.length-1;row++)for(var j=0;j<segments;j++){var a=row*segments+j,bb=row*segments+(j+1)%segments,c=a+segments,d=bb+segments;[a,c,bb,bb,c,d].forEach(function(ix){points.push.apply(points,v[ix]);});}
  for(var j=1;j+1<segments;j++)[0,j,j+1].forEach(function(ix){points.push.apply(points,v[ix]);});
 }var n=g.DNDCharacterBodyGeometry.normals(new Float32Array(points),null);return mesh(points,Array.from(n),points,item,id);
}

function cape(part,m,b,item,id){var src=part.__ceShapedPositions,rows=24,cols=16,verts=[],points=[],last=null;
 function section(h){var left=Infinity,right=-Infinity,back=Infinity;for(var i=0;i<src.length;i+=3){var t=(src[i+1]-b.min[1])/b.size[1];if(Math.abs(t-h)>.025||m.torso[i/3]<.5)continue;left=Math.min(left,src[i]);right=Math.max(right,src[i]);back=Math.min(back,src[i+2]);}return isFinite(back)?{cx:(left+right)/2,radius:(right-left)/2,z:back-.024}:null;}
 var shoulder=section(.80);if(!shoulder)throw Error('Не найдена спина для плаща');
 for(var r=0;r<=rows;r++){var t=r/rows,h=.80-.48*t,shape=h>=.50?section(h):null;if(shape)last=shape;shape=shape||last||shoulder;var flare=h<.50?(.50-h)*b.size[1]*.08:0;
 for(var c=0;c<=cols;c++){var u=c/cols*2-1;verts.push([shape.cx+u*(r===0?shoulder.radius*.72:shape.radius*.90+flare),b.min[1]+h*b.size[1],shape.z-flare-.065*Math.max(0,1-Math.abs(h-.61)/.10)+Math.cos(u*Math.PI*5)*.004*t]);}}
 for(var r=0;r<rows;r++)for(var c=0;c<cols;c++){var a=r*(cols+1)+c,d=a+cols+1;[a,a+1,d,a+1,d+1,d].forEach(function(v){points.push.apply(points,verts[v]);});}
 var result=mesh(points,Array.from(g.DNDCharacterBodyGeometry.normals(new Float32Array(points),null)),points,item,id);result.attachmentGap=.024;return result;
}

function fabricSurface(body){if(body.__ceFabricSource===body.__ceShapedPositions&&body.__ceFabricSurface)return body.__ceFabricSurface;
 var original=body.__ceShapedPositions,base=body.basePositions||original,indices=body.indices,count=original.length/3,groups=new Map(),ids=new Uint32Array(count),unique=[],numbers=[];
 // UV-seam duplicates must move together, otherwise smoothing tears the garment.
 for(var i=0;i<count;i++){var key=base[i*3].toFixed(6)+','+base[i*3+1].toFixed(6)+','+base[i*3+2].toFixed(6),id=groups.get(key);if(id==null){id=numbers.length;groups.set(key,id);unique.push(0,0,0);numbers.push(0);}ids[i]=id;numbers[id]++;for(var k=0;k<3;k++)unique[id*3+k]+=original[i*3+k];}
 for(var i=0;i<numbers.length;i++)for(var k=0;k<3;k++)unique[i*3+k]/=numbers[i];var src=new Float32Array(unique);
 for(var pass=0;pass<8;pass++){var sums=new Float32Array(src.length),weights=new Uint32Array(numbers.length);for(var i=0;i<indices.length;i+=3){var a=ids[indices[i]],b=ids[indices[i+1]],c=ids[indices[i+2]];for(var k=0;k<3;k++){sums[a*3+k]+=src[b*3+k]+src[c*3+k];sums[b*3+k]+=src[a*3+k]+src[c*3+k];sums[c*3+k]+=src[a*3+k]+src[b*3+k];}weights[a]+=2;weights[b]+=2;weights[c]+=2;}var out=new Float32Array(src);for(var i=0;i<numbers.length;i++)if(weights[i])for(var k=0;k<3;k++)out[i*3+k]=src[i*3+k]*.4+sums[i*3+k]/weights[i]*.6;src=out;}
 var positions=new Float32Array(original.length);for(var i=0;i<count;i++)for(var k=0;k<3;k++)positions[i*3+k]=src[ids[i]*3+k];body.__ceFabricSource=original;body.__ceFabricSurface={indices:indices,basePositions:base,__ceShapedPositions:positions,__ceNormals:g.DNDCharacterBodyGeometry.normals(positions,indices,base)};return body.__ceFabricSurface;
}

function fit(asset,body,appearance,b){var m=g.DNDCharacterBodyGeometry.masks(asset,body),clothing=normalize(appearance.clothing,appearance.gender),parts=[],visible=[],src=body.__ceShapedPositions,selected=Object.keys(clothing).map(function(k){return {id:clothing[k],item:items[clothing[k]]};}).filter(function(v){return v.item;});selected.forEach(function(v){if(v.item.hosiery&&clothing.feet)v.item=Object.assign({},v.item,{region:[.17,v.item.region[1],v.item.region[2]]});if((v.item.slot==='top'||v.item.slot==='outer')&&items[clothing.bottom]&&items[clothing.bottom].skirt)v.item=Object.assign({},v.item,{region:[.61,v.item.region[1],v.item.region[2]]});if(v.item.slot!=='head')return;var min=Infinity,max=-Infinity;for(var i=0;i<src.length;i+=3)if(m.head[i/3]>.5){min=Math.min(min,src[i+1]);max=Math.max(max,src[i+1]);}var lower=(min+(max-min)*.66-b.min[1])/b.size[1];v.item=Object.assign({},v.item,{region:[lower,1,'head']});});
 var surface=fabricSurface(body);selected.forEach(function(v){if(v.item.slot==='underwearBottom'&&(clothing.bottom||(items[clothing.socks]&&items[clothing.socks].tights))||v.item.slot==='underwearTop'&&(clothing.top||clothing.outer)||v.item.slot==='top'&&clothing.outer||v.item.slot==='socks'&&((clothing.feet&&!v.item.hosiery)||clothing.bottom==='trousers'))return;var p=v.item.cape?cape(body,m,b,v.item,v.id):v.item.skirt?skirt(body,m,b,v.item,v.id):v.id==='boots'?boots(body,m,b,v.item,v.id):shell(surface,m,b,v.item,v.id);if(p)parts.push(p);});
 for(var i=0;i<body.indices.length;i+=3){var covered=selected.some(function(v){if(v.item.noHide)return false;var r=v.item.region;for(var k=0;k<3;k++){var ix=body.indices[i+k],h=(src[ix*3+1]-b.min[1])/b.size[1];if(h<r[0]||h>r[1]||weight(m,ix,r[2],h)<.5)return false;}return true;});if(!covered)visible.push(body.indices[i],body.indices[i+1],body.indices[i+2]);}
 return {parts:parts,indices:new body.indices.constructor(visible),clothing:clothing};
}
g.DNDCharacterClothing={slots:slots,items:items,normalize:normalize,list:list,fit:fit};
})(window);
