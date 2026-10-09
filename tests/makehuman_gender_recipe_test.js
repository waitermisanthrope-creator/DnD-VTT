const assert=require('assert'),fs=require('fs'),os=require('os'),path=require('path'),zlib=require('zlib');
const recipe=require('../tools/prepare_makehuman_gender'),bridge=require('../tools/build_makehuman_morphs'),{readGlb}=require('./makehuman_morph_bridge');
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'mh-gender-'));
try{
 const config={macrotargets:{}};
 for(const [key,low,high] of [['gender','female','male'],['age','child','young'],['muscle','minmuscle','averagemuscle'],['weight','minweight','averageweight'],['proportions','','idealproportions']])config.macrotargets[key]={parts:[{lowest:0,highest:1,low,high}]};
 const macros={gender:.8,age:.7,muscle:.6,weight:.5,proportions:.4,height:.5,cupsize:.5,firmness:.5,race:{caucasian:1,asian:0,african:0}};
 const old=recipe.stack(macros,config),female=recipe.stack({...macros,gender:.2},config),terms=recipe.difference(old,female);
 /* Compare against independently hand-computed MPFB Cartesian weights. */
 assert(Math.abs(old.get('caucasian-male-young')-.56)<1e-12);
 assert(Math.abs(old.get('universal-male-young-averagemuscle-averageweight')-.168)<1e-12);
 assert(Math.abs(old.get('proportions/male-young-averagemuscle-averageweight-idealproportions')-.0672)<1e-12);
 const term=terms.find(t=>t.name==='caucasian-male-young');assert(Math.abs(term.weight-(-.42))<1e-12,'must subtract exported male stack');
 assert(terms.some(t=>t.weight>0)&&terms.some(t=>t.weight<0));assert.deepStrictEqual(recipe.difference(old,old),[]);
 assert.throws(()=>recipe.stack({...macros,height:.8},config),/Only neutral/);
 assert.throws(()=>recipe.readMacros({json:{nodes:[{mesh:0,extras:{}}]}}),/exported macro/);
 const meta={};for(const key of ['gender','age','muscle','weight','proportions','height','cupsize','firmness'])meta['MPFB_HUM_'+key]=macros[key];for(const [key,value] of Object.entries(macros.race))meta['MPFB_HUM_'+key]=value;
 assert.deepStrictEqual(recipe.readMacros({json:{nodes:[{mesh:0,extras:meta}]}}),macros);
 const data=path.join(dir,'data');fs.mkdirSync(path.join(data,'targets/macrodetails'),{recursive:true});fs.mkdirSync(path.join(data,'3dobjs'),{recursive:true});
 fs.writeFileSync(path.join(data,'3dobjs/base.obj'),'v 0 0 0\nv 1 0 0\nv 0 1 0\nvt 0 0\nvt 1 0\nvt 0 1\ng body\nf 1/1 2/2 3/3\n');
 for(const [name,text] of [['female','0 3 4 5\n1 1 2 3\n'],['male','0 1 1 1\n1 2 3 4\n']])fs.writeFileSync(path.join(data,'targets/macrodetails',name+'.target.gz'),zlib.gzipSync(text));
 const sources=[{folder:'macrodetails',name:'female',weight:1},{folder:'macrodetails',name:'male',weight:-1}],hashes={};
 const d=bridge.composeTarget(data,sources,3,hashes);assert.deepStrictEqual(Array.from(d),[2,3,4,-1,-1,-1,0,0,0]);assert.strictEqual(Object.keys(hashes).length,2);assert(Object.values(hashes).every(h=>/^[a-f0-9]{64}$/.test(h)));
 assert.throws(()=>bridge.composeTarget(data,[{folder:'../..',name:'x',weight:1}],3,{}),/escapes/);
 assert.throws(()=>bridge.composeTarget(data,[{folder:'macrodetails',name:'male',weight:NaN}],3,{}),/Invalid/);
 assert.throws(()=>bridge.composeTarget(data,[{folder:'macrodetails',name:'missing',weight:1}],3,{}),/ENOENT/);
 /* Exercise packing and UV transfer, including signed deltas and units. */
 const pos=new Float32Array([0,0,0,1,0,0,0,1,0]),uv=new Float32Array([0,1,1,1,0,0]),bin=Buffer.concat([Buffer.from(pos.buffer),Buffer.from(uv.buffer)]),json={asset:{version:'2.0'},buffers:[{byteLength:bin.length}],bufferViews:[{buffer:0,byteOffset:0,byteLength:pos.byteLength},{buffer:0,byteOffset:pos.byteLength,byteLength:uv.byteLength}],accessors:[{bufferView:0,componentType:5126,type:'VEC3',count:3},{bufferView:1,componentType:5126,type:'VEC2',count:3}],meshes:[{primitives:[{attributes:{POSITION:0,TEXCOORD_0:1}}]}],nodes:[{mesh:0,extras:meta}],scenes:[{nodes:[0]}],scene:0};
 function glb(file,j,b){const jb=Buffer.from(JSON.stringify(j)),jp=Buffer.concat([jb,Buffer.alloc((4-jb.length%4)%4,32)]),h=Buffer.alloc(12),jh=Buffer.alloc(8),bh=Buffer.alloc(8);h.write('glTF');h.writeUInt32LE(2,4);h.writeUInt32LE(28+jp.length+b.length,8);jh.writeUInt32LE(jp.length);jh.writeUInt32LE(0x4e4f534a,4);bh.writeUInt32LE(b.length);bh.writeUInt32LE(0x004e4942,4);fs.writeFileSync(file,Buffer.concat([h,jh,jp,bh,b]));}
 const input=path.join(dir,'source.glb'),output=path.join(dir,'built.glb'),channels=path.join(dir,'channels.json');glb(input,json,bin);fs.writeFileSync(channels,JSON.stringify({'human-female':{target:'human-female',sources}}));
 bridge.build(data,input,output,channels);const built=readGlb(output),mesh=built.json.meshes[0],a=built.json.accessors[mesh.primitives[0].targets[0].POSITION],view=built.json.bufferViews[a.bufferView],delta=new Float32Array(built.bin.buffer,built.bin.byteOffset+view.byteOffset,a.count*3);
 assert.strictEqual(built.bytes.readUInt32LE(8),built.bytes.length);assert.deepStrictEqual(built.json.nodes,json.nodes);assert.deepStrictEqual(mesh.extras.targetNames,['human-female']);assert.deepStrictEqual(mesh.weights,[0]);
 for(let i=0;i<delta.length;i++)assert(Math.abs(delta[i]-d[i]*.1)<1e-7,'signed native deltas must transfer with meter scale');
 assert.deepStrictEqual(built.json.extras.dndMorphSource.compositions['human-female'],sources);
 assert(built.bin.subarray(0,bin.length).equals(bin),'base attributes must remain unchanged');
 console.log('MAKEHUMAN_GENDER_RECIPE_TEST_OK: exported macros, weighted stacks, signed subtraction, preserved GLB base, provenance, UV transfer, invalid inputs');
}finally{fs.rmSync(dir,{recursive:true,force:true});}
