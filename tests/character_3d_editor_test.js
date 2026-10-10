/* Runtime regression: real editor code, DOM/WebGL boundary mocked (no GPU required). */
const fs=require('fs'),vm=require('vm'),assert=require('assert'),path=require('path');
const code=name=>fs.readFileSync(path.join(__dirname,'../app/3dmap/'+name+'.js'),'utf8');
const elements={},contexts=[],images=[];
class Element {
 constructor(tag){this.tag=tag;this.style={};this.children=[];this.classList={toggle(){}};}
 set innerHTML(html){this.html=html;for(const match of html.matchAll(/id="([^"]+)"/g)){const e=new Element(match[1]==='ceGL'?'canvas':'div');e.id=match[1];elements[e.id]=e;this.children.push(e);}if(html.includes('<input '))this.input=new Element('input');if(html.includes('<output>'))this.output=new Element('output');}
 appendChild(e){this.children.push(e);if(e.id)elements[e.id]=e;}
 querySelector(s){return s==='input'?this.input:s==='output'?this.output:null;}
 remove(){this.children.forEach(c=>c.remove());if(elements[this.id]===this)delete elements[this.id];}
 setAttribute(k,v){this[k]=v;} addEventListener(n,f){this.events=this.events||{};this.events[n]=f;} getBoundingClientRect(){return{width:480,height:320};}
 getContext(){if(!this.gl){this.gl=makeGL();contexts.push(this.gl);}return this.gl;}
}
function makeGL(){
 const gl={calls:[],draws:[],attrs:{},uniforms:{},next:0};
 for(const key of ['ARRAY_BUFFER','ELEMENT_ARRAY_BUFFER','STATIC_DRAW','DYNAMIC_DRAW','FLOAT','TEXTURE0','TEXTURE_2D','RGBA','UNSIGNED_BYTE','UNSIGNED_SHORT','UNSIGNED_INT','TEXTURE_MIN_FILTER','TEXTURE_MAG_FILTER','TEXTURE_WRAP_S','TEXTURE_WRAP_T','LINEAR','NEAREST','CLAMP_TO_EDGE','REPEAT','MIRRORED_REPEAT','NEAREST_MIPMAP_NEAREST','LINEAR_MIPMAP_NEAREST','NEAREST_MIPMAP_LINEAR','LINEAR_MIPMAP_LINEAR','UNPACK_FLIP_Y_WEBGL','UNPACK_PREMULTIPLY_ALPHA_WEBGL','UNPACK_COLORSPACE_CONVERSION_WEBGL','MAX_TEXTURE_SIZE','NONE','NO_ERROR','TRIANGLES','VERTEX_SHADER','FRAGMENT_SHADER','COMPILE_STATUS','LINK_STATUS','DEPTH_TEST','COLOR_BUFFER_BIT','DEPTH_BUFFER_BIT'])gl[key]=key;
 const resource=()=>({owner:gl,id:++gl.next});
 gl.getExtension=()=>gl.uint32?{}:null;gl.createBuffer=gl.createTexture=gl.createProgram=gl.createShader=resource;
 gl.bindBuffer=(t,b)=>{assert(b.owner===gl&&!b.deleted,'buffer from a closed/different WebGL context');gl.boundBuffer=b;};
 gl.uploads=0;gl.bufferData=(t,data)=>{gl.uploads++;gl.boundBuffer.data=Array.from(data);};
 gl.vertexAttribPointer=(loc)=>{gl.attrs[loc]=gl.boundBuffer;};
 gl.getAttribLocation=(p,n)=>n;gl.getUniformLocation=(p,n)=>n;
 gl.uniform4f=(n,...v)=>{gl.uniforms[n]=v;};gl.uniform1i=gl.uniform1f=(n,v)=>{gl.uniforms[n]=v;};
 gl.bindTexture=(t,tex)=>{assert(tex.owner===gl&&!tex.deleted);gl.texture=tex;};
 gl.texImage2D=(...args)=>{if(args.length===6)gl.texture.src=args[5].src;};
 gl.pixelStorei=(...args)=>gl.calls.push(args);gl.texParameteri=(...args)=>gl.calls.push(args);
 gl.getShaderParameter=gl.getProgramParameter=()=>true;gl.getParameter=()=>4096;gl.getError=()=>gl.NO_ERROR;
 gl.deleteBuffer=gl.deleteTexture=gl.deleteProgram=r=>{r.deleted=true;};
 const draw=(count)=>{assert(gl.attrs.p.data.length>=count*3);assert(gl.attrs.uv.data.length>=count*2,'UV buffer shorter than expanded geometry');gl.draws.push({uv:gl.attrs.uv.data.slice(),col:gl.uniforms.col.slice(),useTex:gl.uniforms.useTex,positions:gl.attrs.p.data.slice(),src:gl.texture&&gl.texture.src});};
 gl.uniformMatrix4fv=(n,transpose,value)=>{gl.matrix=Array.from(value);};gl.drawArrays=(mode,first,count)=>draw(count);gl.drawElements=(mode,count)=>draw(3);
 for(const n of ['viewport','clearColor','clear','enable','shaderSource','compileShader','attachShader','linkProgram','useProgram','enableVertexAttribArray','disableVertexAttribArray','vertexAttrib2f','uniformMatrix3fv','activeTexture','generateMipmap'])gl[n]=()=>{};
 return gl;
}
const document={createElement:tag=>new Element(tag),getElementById:id=>elements[id]||null,body:new Element('body')};
const part={positions:new Float32Array([0,0,0,1,0,0,0,1,0,1,1,0]),indices:new Uint32Array([0,2,1]),uv:new Float32Array([0,0,1,0,0,1,1,1]),material:0};
part.basePositions=part.positions;part.morphNames=['shoulder-grow','shoulder-shrink'];part.morphTargets=[{POSITION:new Float32Array([.1,0,0,0,0,0,0,0,0,0,0,0])},{POSITION:new Float32Array([-.1,0,0,0,0,0,0,0,0,0,0,0])}];
part.morphNames.push('human-female');part.morphTargets.push({POSITION:new Float32Array([.2,-.1,0,.2,-.1,0,.2,-.1,0,.2,-.1,0])});
const asset={gltf:{extras:{dndMorphChannels:{shoulders:{positive:'shoulder-grow',negative:'shoulder-shrink'}}}},buffers:[],parts:[part],materials:[{baseColorFactor:[.48,.51,.54,1]}],bounds:{min:[0,0,0],max:[1,1,1]}};
const storage=new Map();const win={localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},confirm:()=>true,addEventListener(){},devicePixelRatio:1,DNDGLTF:{load:()=>Promise.resolve(asset)}};
function Image(){this.width=2048;this.height=2048;images.push(this);}
const ctx={window:win,document,Image,console,Float32Array,Uint32Array,Uint16Array,Uint8Array};
vm.runInNewContext(code('gltf_character_pipeline'),ctx);win.DNDGLTFCharacterPipeline.install();vm.runInNewContext(code('character_system'),ctx);vm.runInNewContext(code('character_appearance_store'),ctx);vm.runInNewContext(code('character_body_geometry'),ctx);vm.runInNewContext(code('character_editor_3d'),ctx);
const api=win.DNDCharacterEditor3D,sys=win.DNDCharacter3D,flush=()=>new Promise(resolve=>setImmediate(resolve));
(async()=>{
 assert(api&&api.VERSION===2);const c=sys.createCharacter({raceId:'human'});api.open(c);await flush();
 const gl=contexts[0];assert.strictEqual(images.length,1);assert(images[0].src.endsWith('young_lightskinned_male_diffuse.png'));
 images[0].onload();let last=gl.draws.at(-1);
 assert.strictEqual(last.useTex,1);assert.deepStrictEqual(last.col,[1,1,1,1],'gray GLB factor must not tint skin');
 assert.deepStrictEqual(last.uv,[0,0,0,1,1,0],'uint32 fallback must expand UV with the same indices as positions');
 assert(gl.calls.some(c=>c[0]===gl.UNPACK_FLIP_Y_WEBGL&&c[1]===false),'glTF texture must not be flipped');
 assert.strictEqual(asset.materials[0].baseColorFactor[0],.48,'shared GLB must not be mutated');
 elements.ceAxis_shoulders.oninput.call({value:'1'});assert(Math.abs(gl.draws.at(-1).positions[0]-.1)<1e-6,'morph must reach WebGL without procedural shoulder scaling');
 elements.ceAxis_shoulders.oninput.call({value:'0'});assert.strictEqual(gl.draws.at(-1).positions[0],0,'reset must reach WebGL');
 const malePositions=gl.draws.at(-1).positions.slice(),bodyBefore=JSON.stringify(api.getState().body),initialId=api.getState().id;
 assert.strictEqual(elements.ceGender.value,'male');assert(api.setGender('female'));assert.strictEqual(elements.ceGender.value,'female');assert.strictEqual(api.getState().gender,'female');
 assert(Math.abs(gl.draws.at(-1).positions[0]-.2)<1e-6,'female morph must reach WebGL vertex buffer');assert.strictEqual(JSON.stringify(api.getState().body),bodyBefore,'gender must preserve sliders');
 assert.strictEqual(api.getState().skinId,'human_young_male','chosen skin remains independent');assert.strictEqual(api.getState().id,initialId);assert.strictEqual(api.setGender('invalid'),false);
 assert(api.setGender('male'));assert.deepStrictEqual(gl.draws.at(-1).positions,malePositions,'male toggle restores exact vertex buffer');
 api.setAxis('height',1);api.setAxis('width',.8);api.setAxis('chest',.6);
 assert.strictEqual(api.getState().body.height,1);assert(api.metrics().width>1);
 api.setArmor(true);assert.strictEqual(api.getState().equipment.body,'editor_plate');
 assert(api.setSkin('human_young_female'));assert(images[1].src.endsWith('young_lightskinned_female_diffuse.png'));
 images[1].onload();assert.strictEqual(gl.draws.at(-1).useTex,1);
 assert.strictEqual(sys.deserialize(api.exportJSON()).skinId,'human_young_female');assert.strictEqual(api.setSkin('bad-id'),false);
 assert.strictEqual(api.getState().gender,'male','skin choice must not change gender');assert(api.setGender('female'));assert.strictEqual(sys.deserialize(api.exportJSON()).gender,'female');
 const oldBuffer=part.__ceBuf;const saved=api.getState();api.close();assert(oldBuffer.deleted);
 api.open(saved);await flush();assert.strictEqual(contexts.length,2);assert.notStrictEqual(part.__ceBuf,oldBuffer);assert.strictEqual(contexts[1].draws.at(-1).useTex,0);
 assert.strictEqual(api.getState().gender,'female');assert.strictEqual(elements.ceGender.value,'female');
 images[2].onerror();assert(elements.ceGLStatus.textContent.includes('Ошибка текстуры'));api.setAxis('width',0);elements.ceAxis_height.oninput.call({value:'.2'});assert(elements.ceGLStatus.textContent.includes('Ошибка текстуры'),'error must survive redraw');
 const late=images[2];api.close();api.open(c);late.onload();await flush();assert.strictEqual(contexts.length,3);assert.strictEqual(contexts[2].draws.at(-1).useTex,0,'stale image callback must not affect new context');
 images.at(-1).width=1500;images.at(-1).height=2000;images.at(-1).onload();assert(contexts[2].calls.some(c=>c[1]===contexts[2].TEXTURE_MIN_FILTER&&c[2]===contexts[2].LINEAR),'NPOT fallback must use non-mipmap filtering');
 assert(api.setGender('female'));assert(api.setSkin('human_young_female'));api.setAxis('hips',.8);api.setArmor(true);const beforeReset=api.getState(),resetBuffer=part.__ceBuf;elements.ceReset.onclick();await flush();
 const reset=api.getState();assert.strictEqual(part.__ceBuf,resetBuffer,'body reset reuses buffers');assert.strictEqual(reset.gender,'female');assert.strictEqual(reset.skinId,'human_young_female');assert.strictEqual(reset.id,beforeReset.id);assert(Object.values(reset.body).every(v=>v===0));assert.strictEqual(reset.equipment.body,'editor_plate');assert.strictEqual(elements.ceGender.value,'female');
 assert(Math.abs(contexts.at(-1).draws.at(-1).positions[0]-.2)<1e-6,'reset keeps female anatomical base');

 const names=part.morphNames;part.morphNames=['shoulder-grow','shoulder-shrink'];api.setGender('male');api.setGender('female');assert(elements.ceGLStatus.textContent.includes('Женская форма недоступна'));part.morphNames=names;
 api.setGender('male');const before=api.diagnostics(),uploads=contexts.at(-1).uploads,matrix=contexts.at(-1).matrix.slice();
 elements.cePlus.onclick();assert(Math.abs(contexts.at(-1).matrix[0]/matrix[0]-1.2)<1e-6);assert(Math.abs(contexts.at(-1).matrix[5]/matrix[5]-1.2)<1e-6);
 for(let i=0;i<30;i++){elements.ceSide.onclick();elements.ceFront.onclick();}
 assert.strictEqual(api.diagnostics().geometryBuilds,before.geometryBuilds,'camera must not rebuild body');assert.strictEqual(contexts.at(-1).uploads,uploads,'camera must not upload geometry');
 const canvas=elements.ceGL,evt=(id,x,y)=>({pointerId:id,clientX:x,clientY:y,preventDefault(){}});canvas.events.pointerdown(evt(1,10,10));canvas.events.pointerdown(evt(2,20,10));const m0=contexts.at(-1).matrix[0];canvas.events.pointermove(evt(2,25,10));assert(Math.abs(contexts.at(-1).matrix[0]/m0-1.5)<1e-6,'pinch must change X scale');canvas.events.lostpointercapture(evt(1,10,10));canvas.events.lostpointercapture(evt(2,25,10));const m1=contexts.at(-1).matrix.slice();canvas.events.pointermove(evt(1,80,80));assert.deepStrictEqual(contexts.at(-1).matrix,m1,'lost capture stops rotation');
 const initial=api.getState().body.width;api.setAxis('width',.3);api.undo();assert.strictEqual(api.getState().body.width,initial);api.redo();assert.strictEqual(api.getState().body.width,.3);
 win.confirm=()=>false;assert.strictEqual(api.close(),false);assert(api.getState());win.confirm=()=>true;api.close();
 win.currentCharacterId='hero';storage.set('dnd_multi_characters_v2',JSON.stringify([{id:'hero',name:'Hero',hp:9}]));api.open();await flush();api.setAxis('height',.6);assert(api.save());assert.strictEqual(JSON.parse(storage.get('dnd_multi_characters_v2'))[0].appearance3d.body.height,.6);api.open();await flush();assert.strictEqual(api.getState().body.height,.6);api.close();
 console.log('CHARACTER_3D_EDITOR_TEST_OK: gender geometry/toggle/reset/reopen, skins, serialization, uint32 UV fallback, glTF orientation, errors, reopen, async isolation, NPOT');
})().catch(e=>{console.error(e);process.exitCode=1;});
