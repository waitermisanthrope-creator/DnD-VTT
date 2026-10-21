// Export contracts from the reviewed main helper, not a reimplementation.
const fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto');
const source=fs.readFileSync('app/cloud_sync.js','utf8');
const code=source.slice(source.indexOf('  function copyProfile('),source.indexOf('  function list(raw)'));
const scope={};vm.runInNewContext('const clone=v=>JSON.parse(JSON.stringify(v));const uuid=()=>"copy";'+code+';globalThis.copy=copyProfile;',scope);
const profiles=[
 {id:'self',name:'Linked hero',sourceId:'self',targetId:'other',unknown:{text:'self',id:'unchanged'},effects:[{ownerId:'self',casterId:'other'}]},
 {id:'self',name:'Initiative hero',initiativeTracker:{combatants:[{id:'self'},{id:'other'}],ownTurnId:'initiative:self:2',turnIds:['initiative:self:2','initiative:other:2'],tarotDamageTotals:{self:17,other:5},battlefield:{tokens:{bt_self:{id:'bt_self',x:3},other:{id:'other'}}}},tarotKnowledge:{self:{known:true},other:{known:false}},resources:{tarotLastStartedTurn:'initiative:self:2'}},
 {id:'self',name:'No self actor',initiativeTracker:{combatants:[{id:'other'}],ownTurnId:'initiative:self:2'},source:'self',external:{name:'self'}}
];
fs.writeFileSync('unity/ContentSources~/cloud-copy-contracts.json',JSON.stringify({sourceSha256:crypto.createHash('sha256').update(source).digest('hex'),cases:profiles.map(input=>({input,identity:'copy',expected:scope.copy(input,'copy')}))},null,2)+'\n');
