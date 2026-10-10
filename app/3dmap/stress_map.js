/* Deterministic editor stress map: all registered assets and surface materials. */
(function(g){'use strict';
function create(){
 var M=g.DNDMapModel,R=g.DNDMapRenderer2D||{},assets=Object.entries(g.DND3DAssetCatalog||{}),floorTypes=Object.keys(R.FLOOR||{}),wallTypes=Object.keys(R.WALL||{});
 var width=72,height=72,map=M.normalize(M.clone(M.DEFAULT));map.name='СТРЕСС-ТЕСТ 72×72 · все ресурсы';map.width=width;map.height=height;map.currentFloor=0;map.showAbove=false;map.showBelow=false;map.showCeilings=false;map.lighting={darkness:.4};map.floors=[];
 var floors=Math.max(3,Math.ceil(assets.length/240));
 for(var fi=0;fi<floors;fi++){
  var f={id:fi,name:'Тест · этаж '+(fi+1),height:4,tiles:{},walls:{},objects:[],zones:[]};map.floors.push(f);
  for(var y=0;y<height;y++)for(var x=0;x<width;x++){
   // Deliberate floorless 5×5 patches in all four corners on EVERY floor.
   if((x<5||x>=width-5)&&(y<5||y>=height-5))continue;
   f.tiles[x+','+y]=floorTypes.length?floorTypes[(Math.floor(x/4)+Math.floor(y/4)*9+fi)%floorTypes.length]:'floor_stone_tile_dark';
  }
  // Wall gallery: every material, each with a long enough visible section.
  for(var wi=0;wi<wallTypes.length;wi++){
   var wx=7+(wi%10)*6,wy=8+Math.floor(wi/10)*6;
   f.walls[wx+','+wy]={n:true,nTexture:wallTypes[wi],e:true,eTexture:wallTypes[wi]};
  }
  // Diagonal walls are authored in the same wall record, consumed by wallSegments.
  for(var d=0;d<12;d++){
   var dx=7+d*5,dy=29+fi*2;
   f.walls[dx+','+dy]={slash:true,slashTexture:wallTypes[d%Math.max(1,wallTypes.length)]||'wall_stone_dark'};
   f.walls[dx+','+(dy+3)]={backslash:true,backslashTexture:wallTypes[(d+5)%Math.max(1,wallTypes.length)]||'wall_stone_dark'};
  }
  // Stairs on every floor, with upward and downward connectors.
  var stairs=assets.filter(function(entry){return /stair|steps|ladder/i.test(entry[0]+' '+entry[1].name);});
  for(var si=0;si<2;si++){
   var x=9+si*7,y=66,found=stairs[si%Math.max(1,stairs.length)];
   f.objects.push({id:'stress_stairs_'+fi+'_'+si,x:x,y:y,type:found?'model':'box',name:si?'Лестница вниз / переход':'Лестница вверх / переход',assetId:found?found[0]:'',model:found?found[1].path:'',w:2,d:3,h:3,scale:1,rotation:si?180:0,stairFrom:fi,stairTo:si?Math.max(0,fi-1):Math.min(floors-1,fi+1)});
  }
  for(var li=0;li<12;li++)f.objects.push({id:'stress_light_'+fi+'_'+li,type:'light',name:'Свет '+(li+1),x:8+(li%6)*11,y:15+Math.floor(li/6)*30,z:2.5,radius:10,intensity:1});
 }
 assets.forEach(function(entry,i){
  var fi=i%floors,f=map.floors[fi],j=Math.floor(i/floors),x=7+(j%24)*2.5,y=37+Math.floor(j/24)*1.55;
  // Keep galleries off stairs and within map boundaries.
  if(y>=68){y=37+(Math.floor(j/24)%18)*1.55;}
  var a=entry[1];f.objects.push({id:'stress_asset_'+i,type:'model',assetId:entry[0],model:a.path,name:a.nameRus||a.name||entry[0],x:x,y:y,z:0,w:a.w||1,d:a.d||1,h:a.h||1,scale:a.scale||1,rotation:0});
 });
 map.library.description='Полы и стены всех типов; все модели каталога; диагональные стены; лестницы и свет на каждом этаже; пустые углы.';
 return M.normalize(map);
}
g.DNDStressMap={create:create};
})(window);
