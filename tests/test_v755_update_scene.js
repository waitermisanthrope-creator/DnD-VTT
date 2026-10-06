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
assert(manager.includes('setTimeout(async function ()')&&manager.includes('scene.onApply'),'startup update must auto-apply only through the rendered scene API');
assert(manager.includes('await nextPaint()'),'startup update must yield for a first WebView paint before staging');
assert(manager.includes("global.__dndUpdateCheckRunning = null"),'startup flow must keep a single lifecycle lock');
assert(manager.includes('runSceneTest'),'update scene test must be exposed by updater module');
assert(manager.includes("settingsModal")&&manager.includes("devMenuModal"),'scene test must hide parent debug/settings modals');
assert(manager.includes("Тест окна обновления не запустился"),'scene test must report runtime failures instead of silently doing nothing');
assert(manager.includes("navigator.onLine === false")===false,'updater must not hard-block checks on navigator.onLine');
assert(manager.includes('dnd:splash-complete'),'updater must retry after splash completion');
assert(manager.includes('waitermisanthrope-creator.github.io/DnD-VTT/updates/stable.json'),'updater must use GitHub Pages manifest as primary endpoint');
assert(manager.includes('FALLBACK_MANIFEST_URL'),'updater must have raw GitHub manifest fallback');
assert(manager.includes('bytesDone')&&manager.includes('bytesTotal'),'JS updater must expose byte progress');
assert(bridge.includes('readBytesWithProgress'),'native updater must report byte progress');
assert(bridge.includes('bytesDone')&&bridge.includes('bytesTotal'),'native progress payload missing byte fields');
assert(bridge.includes('hasPendingUpdate'),'native bridge must expose pending-update health state');
assert(bridge.includes('rollbackPending'),'native bridge must support rollback after failed WebView boot');
assert(bridge.includes('previous'),'native updater must retain a rollback version while update is pending');
assert(bridge.includes('activity::recreate'),'native apply/rollback lifecycle must recreate Activity explicitly');
assert(index.includes('__DND_APP_BOOT_READY') || fs.readFileSync(path.join(__dirname,'..','app','app.js'),'utf8').includes('__DND_APP_BOOT_READY'),'web app must expose an explicit boot health marker');
const sceneAssets=[
  'forest_green.jpg','forest_burned.jpg','fire_front.png','dragon.png','dragon_fire.png',
  'update_scene_smoke.svg','update_scene_embers.svg','update_scene_ash.svg'
];
sceneAssets.forEach(name=>assert(
  fs.existsSync(path.join(__dirname,'..','app','assets','ui',name)),
  'required V755 scene asset missing from repository: '+name
));
console.log('PASS V755 layered forest-fire update contract');
