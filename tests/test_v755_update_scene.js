/** V755 — layered forest-fire update scene contract test. */
const fs=require('fs'), path=require('path'), vm=require('vm');
const scene=fs.readFileSync(path.join(__dirname,'..','app','update_scene_v755.js'),'utf8');
const manager=fs.readFileSync(path.join(__dirname,'..','app','update_manager.js'),'utf8');
const index=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8');
const bridge=fs.readFileSync(path.join(__dirname,'..','android','app','src','main','java','com','dndvtt','app','DndUpdateBridge.java'),'utf8');
function assert(c,m){if(!c)throw new Error(m);}
new Function(scene);
new Function(manager);
assert(index.indexOf('update_scene_v755.js')<index.indexOf('update_manager.js'),'scene renderer must load before updater');
assert(scene.includes('forest_green.jpg'),'green forest asset missing');
assert(scene.includes('forest_burned.jpg'),'burned forest asset missing');
assert(scene.includes('fire_front.png'),'fire front asset missing');
assert(scene.includes('DND_UPDATE_SCENE'),'scene API missing');
assert(scene.includes('testMode'),'scene must support safe debug test mode');
assert(scene.includes('Закрыть тест'),'test mode must never expose real apply action');
const settings=fs.readFileSync(path.join(__dirname,'..','app','Settings.js'),'utf8');
assert(settings.includes('runDndUpdateSceneTest'),'debug menu must expose update scene test');
assert(settings.includes('🔥 Тест окна обновления'),'settings must show a visible update-scene test button');
assert(manager.includes('setTimeout(function ()')&&manager.includes('scene.__sceneApi.onApply'),'startup update must auto-apply after verified staging');
assert(manager.includes('bytesDone')&&manager.includes('bytesTotal'),'JS updater must expose byte progress');
assert(bridge.includes('readBytesWithProgress'),'native updater must report byte progress');
assert(bridge.includes('bytesDone')&&bridge.includes('bytesTotal'),'native progress payload missing byte fields');
console.log('PASS V755 layered forest-fire update contract');
