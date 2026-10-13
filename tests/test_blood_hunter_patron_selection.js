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

// The Fiend's flame-rite rerolls run in the actual typed damage callback.
// A player can keep the original die; the automatic policy keeps the better die.
let fiend=hunter(3);fiend.weapons=[{id:'blade',name:'Клинок',damageDice:'1d6',rangeFt:5}];
assert.strictEqual(C.useFeature(fiend,'otherworldlyPatron',{className:H.CLASS,patron:'fiend'}).ok,true);
assert.strictEqual(C.useFeature(fiend,'chooseCrimsonRites',{className:H.CLASS,rites:['flame']}).ok,true);
assert.strictEqual(C.useFeature(fiend,'crimsonRite',{className:H.CLASS,weaponId:'blade',riteType:'flame'}).ok,true);
g.Math.random=()=>0.9999;
let dice={rolls:[1,2,3],total:6};
H.adjustRiteDamage(fiend,dice,{weapon:fiend.weapons[0],weaponAttack:true});
assert.strictEqual(dice.total,11);
assert.deepStrictEqual(Array.from(dice.rolls),[4,4,3]);
let noRiteDice={rolls:[1,2,3],total:6};
H.adjustRiteDamage(fiend,noRiteDice,{weapon:{id:'other'},weaponAttack:true});
assert.strictEqual(noRiteDice.total,6);

// Celestial healing is a real bonus action, expends exactly one curse use,
// and modifies the selected actor's canonical HP.
let celestial=hunter(3);celestial.id='celestial-hero';
celestial.weapons=[{id:'blade',name:'Клинок',damageDice:'1d6',rangeFt:5}];
assert.strictEqual(C.useFeature(celestial,'otherworldlyPatron',{className:H.CLASS,patron:'celestial'}).ok,true);
assert.strictEqual(C.useFeature(celestial,'chooseCrimsonRites',{className:H.CLASS,rites:['flame']}).ok,true);
g.Math.random=()=>0;
assert.strictEqual(C.useFeature(celestial,'crimsonRite',{className:H.CLASS,weaponId:'blade',riteType:'flame'}).ok,true);
C.resetTurn(celestial);
let patient=hero('Воин',1);patient.id='celestial-patient';patient.hpCurrent=10;patient.hpMax=40;
const prior=celestial.resources.bloodMaledict.current;
assert.strictEqual(C.useFeature(celestial,'riteFocus',{className:H.CLASS,target:patient,distanceFt:70}).ok,false);
assert.strictEqual(celestial.resources.bloodMaledict.current,prior);
let healed=C.useFeature(celestial,'riteFocus',{className:H.CLASS,target:patient,distanceFt:30});
assert.strictEqual(healed.ok,true);
assert.strictEqual(patient.hpCurrent,14);
assert.strictEqual(celestial.resources.bloodMaledict.current,prior-1);
assert.strictEqual(celestial.turnResources.bonusAction,false);
assert.strictEqual(C.useFeature(celestial,'riteFocus',{className:H.CLASS,target:patient,distanceFt:30}).ok,false);
assert.strictEqual(patient.hpCurrent,14);
console.log('PASS: Blood Hunter patron selection, Russian UI, save/load and fail-closed unfinished effects');
