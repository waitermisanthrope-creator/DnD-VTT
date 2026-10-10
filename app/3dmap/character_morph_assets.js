/* Verified sparse targets, attached atomically to the exact shipped topology. */
(function(g){'use strict';
function hash(bytes){if(!g.crypto||!g.crypto.subtle)return Promise.reject(Error('Проверка 3D-ассетов недоступна'));return g.crypto.subtle.digest('SHA-256',bytes).then(function(b){return Array.prototype.map.call(new Uint8Array(b),function(v){return ('0'+v.toString(16)).slice(-2);}).join('');});}
function fetchOK(url,kind){return fetch(url).then(function(r){if(!r.ok)throw Error('Не удалось загрузить морфы тела');return kind==='json'?r.json():r.arrayBuffer();});}
function attach(asset,url){
 if(!url)return Promise.resolve(asset);if(asset.__editorMorphUrl===url)return Promise.resolve(asset);if(asset.__editorMorphPending)return asset.__editorMorphPending;
 var pending=fetchOK(url,'json').then(function(meta){
  var part=asset.parts&&asset.parts[0],base=part&&(part.basePositions||part.positions);
  if(meta.schema!==1||!base||asset.parts.length!==1||base.length!==meta.vertexCount*3||!Array.isArray(meta.targets)||!meta.channels||meta.binary!=='editor-morphs.bin')throw Error('Несовместимая топология морфов');
  return hash(new Uint8Array(base.buffer,base.byteOffset,base.byteLength)).then(function(h){if(h!==meta.basePositionsSha256)throw Error('Морфы не соответствуют модели');return fetchOK(url.split('?')[0].replace(/[^/]+$/,'')+meta.binary+'?v='+meta.binarySha256.slice(0,12),'binary');}).then(function(raw){
   if(raw.byteLength!==meta.bytes)throw Error('Неполный файл морфов');return hash(raw).then(function(h){if(h!==meta.binarySha256)throw Error('Повреждён файл морфов');
    var view=new DataView(raw),names=part.morphNames.slice(),targets=part.morphTargets.slice(),weights=(part.meshWeights||[]).slice();
    meta.targets.forEach(function(t){if(typeof t.name!=='string'||names.indexOf(t.name)>=0||!Number.isInteger(t.offset)||!Number.isInteger(t.count)||t.offset<0||t.count<=0||t.offset+t.count*16>raw.byteLength)throw Error('Некорректный target');var delta=new Float32Array(base.length),previous=-1;for(var i=0;i<t.count;i++){var at=t.offset+i*16,id=view.getUint32(at,true);if(id<=previous||id>=meta.vertexCount)throw Error('Некорректный индекс target');previous=id;for(var k=0;k<3;k++){var v=view.getFloat32(at+4+k*4,true);if(!isFinite(v))throw Error('Некорректная дельта target');delta[id*3+k]=v;}}names.push(t.name);targets.push({POSITION:delta});weights.push(0);});
    Object.keys(meta.channels).forEach(function(axis){var rule=meta.channels[axis];if(names.indexOf(rule.positive)<0||names.indexOf(rule.negative)<0||!isFinite(rule.scale)||rule.scale<0)throw Error('Некорректный канал target');});
    part.morphNames=names;part.morphTargets=targets;part.meshWeights=weights;asset.character.morphChannels=Object.assign({},asset.character.morphChannels,meta.channels);asset.__editorMorphUrl=url;asset.editorMorphMetadata=meta;return asset;
   });
  });
 });
 asset.__editorMorphPending=pending;return pending.then(function(a){delete asset.__editorMorphPending;return a;},function(e){delete asset.__editorMorphPending;throw e;});
}
g.DNDCharacterMorphAssets={attach:attach};
})(window);
