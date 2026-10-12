/* Adult anatomy state and regional body hair. External modules are not yet rendered. */
(function(g){'use strict';
var regions={pubic:'Лобковая область',abdomen:'Живот',chest:'Грудь',backUpper:'Верх спины',backLower:'Поясница',buttocks:'Ягодицы',armpitL:'Левая подмышка',armpitR:'Правая подмышка',upperArmL:'Левое плечо',upperArmR:'Правое плечо',forearmL:'Левое предплечье',forearmR:'Правое предплечье',thighL:'Левое бедро',thighR:'Правое бедро',shinL:'Левая голень',shinR:'Правая голень',handL:'Тыльная сторона левой кисти',handR:'Тыльная сторона правой кисти',footL:'Верх левой стопы',footR:'Верх правой стопы'};
var budgets={low:300,medium:1200,high:2400};
function own(o,k){return Object.prototype.hasOwnProperty.call(o,k);}
function number(v,d,a,b){v=v==null?d:Number(v);return isFinite(v)?Math.max(a,Math.min(b,v)):d;}
function color(v){return typeof v==='string'&&/^#[0-9a-f]{6}$/i.test(v)?v.toLowerCase():'#594331';}
function normalize(value){
 value=value&&typeof value==='object'?value:{};
 if(value.version!=null&&value.version!==1)throw Error('Неподдерживаемая версия анатомии');
 if(value.maturity!=null&&value.maturity!=='adult')throw Error('Эта база предназначена только для взрослых персонажей');
 var hair=value.hair&&typeof value.hair==='object'?value.hair:{},input=hair.regions||{},out={version:1,maturity:'adult',external:{mode:'auto',variant:'standard'},hair:{shaved:hair.shaved===true,quality:own(budgets,hair.quality)?hair.quality:'medium',regions:{}}};
 var external=value.external||{};out.external.mode=['auto','male','female','none'].indexOf(external.mode)>=0?external.mode:'auto';out.external.variant=['standard','compact','full'].indexOf(external.variant)>=0?external.variant:'standard';
 Object.keys(regions).forEach(function(id){var r=input[id]&&typeof input[id]==='object'?input[id]:{};out.hair.regions[id]={enabled:r.enabled===true,density:number(r.density,.5,0,1),length:number(r.length,.3,0,1),color:color(r.color)};});
 return out;
}
function family(character){
 var id=character.originRaceId||character.raceId||'human';
 if(['ghost','parasite','walter_parasite','swarm_rats','swarm_beetles','swarm_bats'].indexOf(character.raceId)>=0)return 'nonHumanoid';
 if(['warforged','autognome'].indexOf(id)>=0)return 'construct';
 if(id==='plasmoid')return 'gel';if(id==='myconid')return 'fungal';
 if(['dragonborn','kobold','lizardfolk','tortle','yuan_ti'].indexOf(id)>=0)return 'reptilian';
 if(['kenku','owlin','aarakocra'].indexOf(id)>=0)return 'avian';
 if(['tabaxi','harengon','bugbear','hadozee','satyr','minotaur','loxodon','shifter','centaur'].indexOf(id)>=0)return 'mammalian';
 return 'humanoid';
}
function descriptor(character){var state=normalize(character.anatomy),f=family(character);return {maturity:'adult',family:f,bodyPreset:character.gender==='female'?'female':'male',externalGeometryReady:false,requestedExternal:state.external.mode==='auto'?(character.gender==='female'?'female':'male'):state.external.mode,regionalHairSupported:f==='humanoid'||f==='mammalian',hairRibbonBudget:budgets[state.hair.quality]};}
/* Existing garment masks remain authoritative; these extra region guards are
 * conservative around open/tailored garments until triangle collision fitting. */
function covered(id,clothing){var c=clothing||{},api=g.DNDCharacterClothing;function worn(slot){return !!(api&&api.items[c[slot]]);}
 if(id==='pubic'||id==='buttocks')return worn('underwearBottom')||worn('bottom')||worn('dress');
 if(id==='chest')return worn('underwearTop')||worn('top')||worn('outer')||worn('corset')||worn('dress');
 if(['abdomen','backUpper','backLower','armpitL','armpitR','upperArmL','upperArmR','forearmL','forearmR'].indexOf(id)>=0)return worn('top')||worn('outer')||worn('dress')||worn('corset');
 if(/^thigh|^shin/.test(id))return worn('bottom')||worn('dress')||worn('socks');
 if(/^hand/.test(id))return worn('hands');if(/^foot/.test(id))return worn('feet')||worn('socks');return false;
}
function regionMask(asset,part,id,geo){
 var src=part.__ceShapedPositions,n=part.__ceNormals;
 if(part.__adultHairMaskSource!==src){part.__adultHairMaskSource=src;part.__adultHairMasks={};}
 if(part.__adultHairMasks[id])return part.__adultHairMasks[id];
 var b=geo.bounds([part],'__ceShapedPositions'),H=Math.max(b.size[1],.001),m=geo.masks(asset,part),skin=asset.character&&asset.character.skins[part.skin],nodes=asset.gltf.nodes||[],names=skin?skin.joints.map(function(i){return (nodes[i].name||'').toLowerCase();}):[],world=asset.character&&asset.character.worldMatrices||[],left=names.indexOf('upperarm_l'),leftMatrix=skin&&world[skin.joints[left]],leftSign=leftMatrix&&leftMatrix[12]<b.center[0]?-1:1;
 var mask=new Uint8Array(src.length/3),isLeft=/L$/.test(id),isRight=/R$/.test(id);
 for(var i=0;i<mask.length;i++){
  var at=i*3,h=(src[at+1]-b.min[1])/H,x=(src[at]-b.center[0])/H,front=n[at+2]>.15,back=n[at+2]<-.15,side=x*leftSign>=0;
  if((isLeft&&!side)||(isRight&&side))continue;
  var upper=0,lower=0,thigh=0,calf=0;
  for(var k=0;k<4;k++){var name=names[part.joints&&part.joints[i*4+k]]||'',w=part.weights&&part.weights[i*4+k]||0;if(/^upperarm/.test(name))upper+=w;if(/^lowerarm/.test(name))lower+=w;if(/^thigh/.test(name))thigh+=w;if(/^calf/.test(name))calf+=w;}
  var yes=id==='pubic'?front&&h>.465&&h<.55&&Math.abs(x)<.060&&(m.torso[i]+m.leg[i])>.25:
   id==='abdomen'?front&&h>.55&&h<.68&&m.torso[i]>.4:
   id==='chest'?front&&h>.68&&h<.815&&m.torso[i]>.4:
   id==='backUpper'?back&&h>.66&&h<.84&&m.torso[i]>.4:
   id==='backLower'?back&&h>.55&&h<.66&&m.torso[i]>.4:
   id==='buttocks'?back&&h>.45&&h<.55&&(m.torso[i]+m.leg[i])>.4:
   /^armpit/.test(id)?h>.695&&h<.775&&Math.abs(x)>.095&&Math.abs(x)<.17&&(m.torso[i]+m.arm[i])>.3&&(n[at]*(side?leftSign:-leftSign)<-.10||n[at+1]<-.20):
   /^upperArm/.test(id)?upper>.35:
   /^forearm/.test(id)?lower>.35:
   /^thigh/.test(id)?thigh>.4&&h<.50:
   /^shin/.test(id)?calf>.4:
   /^hand/.test(id)?m.hand[i]>.45&&back:
   /^foot/.test(id)?m.foot[i]>.4&&n[at+1]>.25:false;
  mask[i]=yes?1:0;
 }
 part.__adultHairMasks[id]=mask;return mask;
}
function hairParts(asset,part,character,geo){
 if(!character.anatomy||!descriptor(character).regionalHairSupported)return [];
 var a=normalize(character.anatomy),h=a.hair;if(h.shaved)return [];
 var enabled=Object.keys(regions).filter(function(id){var r=h.regions[id];return r.enabled&&r.density>0&&!covered(id,character.clothing);});if(!enabled.length)return [];
 var quota=Math.max(1,Math.floor(budgets[h.quality]/enabled.length)),out=[];
 enabled.forEach(function(id){var r=h.regions[id],c=Object.assign({},character,{head:Object.assign({},character.head,{furProfile:'patches',furAmount:1,furDensity:r.density,furLength:r.length})}),mask=regionMask(asset,part,id,geo);
  geo.furParts(asset,part,c,{role:'regional',bodyH:geo.bounds([part],'__ceShapedPositions').size[1],vertexMask:mask,maxStrands:quota}).forEach(function(p){p.headAccessory='bodyHair';p.bodyHairRegion=id;p.bodyHairColor=r.color;out.push(p);});
 });return out;
}
g.DNDCharacterAnatomy={VERSION:1,regions:regions,budgets:budgets,normalize:normalize,family:family,descriptor:descriptor,regionMask:regionMask,hairParts:hairParts,covered:covered};
})(window);
