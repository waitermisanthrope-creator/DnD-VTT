const fs=require('fs'),vm=require('vm'),assert=require('assert');
const data=new Map(),g={localStorage:{getItem:k=>data.get(k)||null,setItem:(k,v)=>data.set(k,v)}};
vm.runInNewContext(fs.readFileSync(__dirname+'/../app/3dmap/character_appearance_store.js','utf8'),{window:g});
const store=g.DNDCharacterAppearanceStore,key='dnd_multi_characters_v2',a={body:{height:.7},gender:'female'};
const draft=store.open();assert.strictEqual(draft.targetId,null);store.save(draft,a);assert.deepStrictEqual(JSON.parse(JSON.stringify(store.open().appearance)),a);
data.set(key,JSON.stringify([{id:1,name:'A',hp:10,classes:[{name:'Fighter'}]},{id:2,name:'B',hp:20}]));g.currentCharacterId=1;g.currentChar={id:1,hp:10};g.allCharacters=[g.currentChar,{id:2}];
const session=store.open();g.currentCharacterId=2;g.currentChar=g.allCharacters[1];
// A different screen/session has saved newer sheet fields while the editor was open.
data.set(key,JSON.stringify([{id:1,name:'Renamed',hp:3,classes:[{name:'Wizard'}]},{id:2,name:'B',hp:20}]));store.save(session,a);
let result=JSON.parse(data.get(key));assert.strictEqual(result[0].hp,3);assert.strictEqual(result[0].name,'Renamed');assert.strictEqual(result[0].classes[0].name,'Wizard');assert.deepStrictEqual(result[0].appearance3d,a);assert(!result[1].appearance3d);assert(g.allCharacters[0].appearance3d);assert(!g.currentChar.appearance3d);
const memory=JSON.stringify(g.allCharacters),saved=data.get(key);g.localStorage.setItem=()=>{throw Error('quota');};assert.throws(()=>store.save(session,{body:{height:-1}}),/quota/);assert.strictEqual(JSON.stringify(g.allCharacters),memory);assert.strictEqual(data.get(key),saved);
g.localStorage.setItem=(k,v)=>data.set(k,v);data.set(key,JSON.stringify([{id:2}]));assert.throws(()=>store.save(session,a),/удалён/);assert.strictEqual(data.get(key),'[{"id":2}]');
g.currentCharacterId=2;data.set(key,JSON.stringify({version:7,characters:[{id:2,hp:5}],other:'keep'}));store.save(store.open(),a);result=JSON.parse(data.get(key));assert.strictEqual(result.version,7);assert.strictEqual(result.other,'keep');assert.strictEqual(result.characters[0].hp,5);
data.set(key,'broken');assert.throws(()=>store.open());console.log('CHARACTER_APPEARANCE_STORE_TEST_OK: draft, pinned recipient, fresh sheet, quota, deletion, wrapped records');
