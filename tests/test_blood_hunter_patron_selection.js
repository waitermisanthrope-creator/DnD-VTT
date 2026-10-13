const assert=require('assert');
const {runtime,hero}=require('./helpers/class_runtime_harness');
const g=runtime(),C=g.DNDClassFeatures,H=g.DNDBloodHunter;
function hunter(level=3){
  const h=hero('Кровавый охотник',level,'Орден осквернённых душ');
  h.id='profane-'+level;C.buildFeatureSet(h);return h;
}
let h=hunter();
assert(H,'Blood Hunter runtime must be registered');
assert(H.renderControls(h).includes('Потусторонний покровитель'));
assert(H.renderControls(h).includes('не выбран'));
let r=C.useFeature(h,'riteFocus',{className:H.CLASS});
assert.strictEqual(r.ok,false,'An unimplemented focus must not pretend to have executed');
assert.strictEqual(h.classFeaturesState.profanePatron,undefined);
r=C.useFeature(h,'otherworldlyPatron',{className:H.CLASS,patron:'celestial'});
assert.strictEqual(r.ok,true,'The actual declared feature ID must select the patron');
assert.strictEqual(h.classFeaturesState.profanePatron,'celestial');
assert(H.renderControls(h).includes('Небожитель'));
const snapshot=JSON.parse(JSON.stringify(h));
C.buildFeatureSet(snapshot);
assert.strictEqual(snapshot.classFeaturesState.profanePatron,'celestial','Patron must survive save/load');
assert.strictEqual(C.useFeature(h,'otherworldlyPatron',{className:H.CLASS,patron:'fiend'}).ok,false,'Patron cannot silently change');
assert.strictEqual(h.classFeaturesState.profanePatron,'celestial');
assert.strictEqual(C.useFeature(h,'otherworldlyPatron',{className:H.CLASS,patron:'invalid'}).ok,false);
for(const id of ['riteFocus','mysticFrenzy','revealedArcana','brandSappingScar','unsealedArcana']){
  const high=hunter(20);
  assert.strictEqual(C.useFeature(high,'otherworldlyPatron',{className:H.CLASS,patron:'archfey'}).ok,true);
  const before=JSON.stringify(high.resources);
  const result=C.useFeature(high,id,{className:H.CLASS});
  assert.strictEqual(result.ok,false,id+' must not return descriptor-only success');
  assert.strictEqual(JSON.stringify(high.resources),before,id+' must not silently spend resources');
}
assert.strictEqual(C.useFeature(hunter(2),'otherworldlyPatron',{className:H.CLASS,patron:'fiend'}).ok,false);
console.log('PASS: Blood Hunter patron selection, Russian UI, save/load and fail-closed unfinished effects');
