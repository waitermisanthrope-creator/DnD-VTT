/** V2 cinematic updater contract test. */
const fs=require('fs'), path=require('path');
const root=path.join(__dirname,'..');
const scene=fs.readFileSync(path.join(root,'app','update_scene_v2.js'),'utf8');
const manager=fs.readFileSync(path.join(root,'app','update_manager_v2.js'),'utf8');
const index=fs.readFileSync(path.join(root,'index.html'),'utf8');
const settings=fs.readFileSync(path.join(root,'app','Settings.js'),'utf8');
const bridge=fs.readFileSync(path.join(root,'android','app','src','main','java','com','dndvtt','app','DndUpdateBridge.java'),'utf8');
function assert(c,m){if(!c)throw new Error(m);}
new Function(scene); new Function(manager);
assert(index.includes('./app/update_scene_v2.js'),'v2 scene must be loaded');
assert(index.includes('./app/update_manager_v2.js'),'v2 manager must be loaded');
assert(!index.includes('./app/update_scene_v755.js'),'legacy scene must not be loaded');
assert(!index.includes('./app/update_manager.js'),'legacy manager must not be loaded');
['forest_green.jpg','forest_burned.jpg','fire_front.png','dragon.png','dragon_fire.png','update_scene_smoke.svg','update_scene_embers.svg'].forEach(function(name){
  assert(fs.existsSync(path.join(root,'app','assets','ui',name)),'missing visual asset: '+name);
});
['DND_UPDATE_SCENE_V2','finish','enableApply','setProgress','runSceneTest'].forEach(function(token){assert(scene.includes(token),'scene API/visual contract missing: '+token);});
['70.34.0','DND_UPDATE_SCENE_V2','runSceneTest','checkAndStage','applyStaged','autoCheckForUpdates'].forEach(function(token){assert(manager.includes(token),'manager v2 contract missing: '+token);});
assert(manager.includes('dndNative'),'manager must use native bridge');
assert(manager.includes('SHA-256'),'manager must verify hashes');
assert(manager.includes('cache: \'no-store\''),'manifest/file requests must bypass stale cache');
assert(settings.includes('window.DND_UPDATE_MANAGER.runSceneTest'),'settings test must call updater v2');
assert(!settings.includes("window.DND_UPDATE_SCENE.create"),'settings must not call legacy scene directly');
assert(!settings.includes("app/update_manager.js"),'settings must not reference legacy updater');
assert(!settings.includes("app/update_scene_v755.js"),'settings must not reference legacy scene');
assert(bridge.includes('hasPendingUpdate'),'native rollback health contract must remain');
assert(bridge.includes('rollbackPending'),'native rollback implementation must remain');
console.log('PASS updater v2 cinematic scene contract');
