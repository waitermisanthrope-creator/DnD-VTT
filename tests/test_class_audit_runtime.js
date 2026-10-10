const assert=require('assert');
const {runtime,hero}=require('./helpers/class_runtime_harness');
const g=runtime(),D=g.DNDContent,C=g.DNDClassFeatures;
let called=0;
function pack(name,id,level){return {name,id,source:'test',features:[{id:'collision',name:'Проверка',level}],subclasses:[],hooks:{useFeature(){called++;return {ok:true};}}};}
D.registerClass(pack('Другой класс','audit-other',1));D.registerClass(pack('Проверяемый класс','audit-selected',5));
assert.equal(D.getFeature('collision'),null,'ambiguous IDs never pick another class');
assert.equal(D.getFeature('collision','missing-pack'),null,'scoped lookup cannot fall back');
let h=hero('Проверяемый класс',1);
assert.equal(C.featureAvailableForCurrentBuild(h,'collision'),false);
assert.equal(C.useFeature(h,'collision',{}).ok,false);assert.equal(called,0);
h=hero('Проверяемый класс',5);assert.equal(C.useFeature(h,'collision',{}).ok,true);assert.equal(called,1);
D.setEnabled('audit-selected',false);assert.equal(C.useFeature(h,'collision',{}).ok,false);assert.equal(D.availableFeatures(h,h.classes[0].name).length,0);assert.equal(called,1);
D.setEnabled('audit-selected',true);D.registerClass({...pack('Проверяемый класс','audit-selected',1),features:[{id:'replacement',name:'Новая'}]});
assert.equal(D.getFeature('collision','audit-selected'),null,'replacement removes stale features');
h=hero('Кровавый охотник',10,'Орден ликантропов');
assert.equal(C.featureAvailableForCurrentBuild(h,'crimsonRite'),true);
const before=h.hpCurrent;assert.equal(C.useFeature(h,'crimsonRite',{riteType:'fire'}).ok,true);assert(h.hpCurrent<before);assert.equal(h.hp.current,h.hpCurrent);
assert.equal(h.classFeaturesState.hemocraftSaveDC,15,'canonical INT score and proficiency contribute to DC');
assert.equal(C.attackModifiers(h,{}).extraAttacks,2);
assert.equal(C.useFeature(h,'fightingStyle',{style:'Стрельба'}).ok,true);
assert.equal(C.attackModifiers(h,{rangedAttack:true}).bonusAttack,2);
const low=hero('Кровавый охотник',1,'Орден ликантропов');assert.equal(C.useFeature(low,'crimsonRite',{}).ok,false);assert.equal(C.useFeature(low,'hybridTransformation',{}).ok,false);
const wrong=hero('Кровавый охотник',10,'Орден мутантов');assert.equal(C.useFeature(wrong,'hybridTransformation',{}).ok,false);
h=hero('Кровавый охотник',11,'Орден ликантропов');assert.equal(C.useFeature(h,'hybridTransformation',{}).ok,true);h.hpCurrent=5;C.resetTurn(h);assert.equal(h.hpCurrent,8,'turn-start regeneration reaches real runtime');
const original=h.resources.hybridTransformation.current;assert.equal(C.useFeature(h,'hybridTransformation',{}).ok,true);assert.equal(h.resources.hybridTransformation.current,original,'ending the form does not spend another charge');
h=hero('Кровавый охотник',2);h.hpCurrent=0;assert.equal(C.useFeature(h,'crimsonRite',{}).ok,false);assert.equal(h.hpCurrent,0,'zero HP is not replaced by a stale alternate field');
h=hero('Воин',1);h.hp=30;h.hpCurrent=5;assert.equal(C.useFeature(h,'secondWind',{}).ok,true);assert.equal(h.hpCurrent,7);assert.equal(h.hp.current,7,'mixed HP schema is normalized before healing');
assert.equal(D.getClass('Пугилист').id,'sv-pugilist','full Pugilist survives later legacy registration');
assert.equal(D.getClass('Pugilist'),D.getClass('Пугилист'),'English saved class resolves to the same pack');
for(let level=1;level<=20;level++){h=hero('Пугилист',level,'Благородное искусство');assert.doesNotThrow(()=>g.applyClassProgression(h,'Пугилист',level));C.buildFeatureSet(h);C.resetTurn(h);C.onTurnEnd(h);C.restore(h,'short');C.restore(h,'long');C.buildFeatureSet(JSON.parse(JSON.stringify(h)));}
h=hero('Пугилист',2);C.buildFeatureSet(h);assert.equal(C.useFeature(h,'braceUp',{}).ok,true);assert.equal(h.tempHp,5);assert.equal(C.useFeature(h,'knockOut',{target:hero('Enemy')}).ok,false);
h=hero('Пугилист',17,'Благородное искусство');const clubIds=C.buildFeatureSet(h);assert(clubIds.includes('knockOut'));assert(!clubIds.includes('signatureMove'),'other club features never leak into selected club');assert.equal(C.attackModifiers(h,{unarmedAttack:true}).unarmedDie,'1d12');assert.equal(C.attackModifiers(h,{}).criticalRange,19);
assert.equal(C.useFeature(h,'signatureMove',{target:hero('Enemy')}).ok,false,'wrong club is rejected before spending');
h=hero('Пугилист',3);C.buildFeatureSet(h);assert.equal(C.useFeature(h,'chooseFightClub',{club:'sweetScience'}).ok,true);assert.equal(h.classes[0].subclass,'sweetScience');assert(C.buildFeatureSet(h).includes('crossCounter'));
h=hero('Пугилист',18);h.hpCurrent=0;C.buildFeatureSet(h);assert.equal(C.useFeature(h,'fightingSpirit',{}).ok,true);assert.equal(h.hpCurrent,20);assert.equal(C.useFeature(h,'fightingSpirit',{}).ok,false);C.restore(h,'long');assert.equal(h.resources.pugilistFightingSpirit.current,1);
h=hero('Pugilist',2);assert(C.buildFeatureSet(h).includes('braceUp'));assert.equal(C.useFeature(h,'braceUp',{}).ok,true,'English save aliases retain actions');
assert.equal(D.getClass('Иллиригер').features[0].id,'balefulInterdict');assert.equal(D.getClass('Иллирригер'),D.getClass('Иллиригер'));
h=hero('Иллиригер',5,'Архитектор разрушения');C.buildFeatureSet(h);assert.equal(C.attackModifiers(h,{}).extraAttacks,2);const sealTarget=hero('Enemy');sealTarget.id='seal-target';
const seals=h.resources.illriggerSeals.current;assert.equal(C.useFeature(h,'balefulInterdict',{target:sealTarget,turnId:1}).ok,true);assert.equal(h.resources.illriggerSeals.current,seals-1);
assert.equal(C.useFeature(h,'balefulInterdict',{target:sealTarget,turnId:1}).ok,false,'one seal per turn');
const sealedHp=sealTarget.hpCurrent;assert.equal(C.useFeature(h,'burnSeal',{target:sealTarget,count:1,sourceId:'ally'}).ok,true);assert(sealTarget.hpCurrent<sealedHp);assert.equal(h.resources.illriggerSeals.current,seals-1,'burning does not pay twice');
assert.equal(C.useFeature(h,'burnSeal',{target:sealTarget,count:1,sourceId:'ally'}).ok,false);
h=hero('Иллиригер',3,'Говорящий с Адом');const illIds=C.buildFeatureSet(h);assert(illIds.some(id=>id.startsWith('hellspeaker')));assert(!illIds.includes('architectSpellblade'));assert.equal(h.classFeaturesState.illriggerContract,'hellspeaker');
for(let level=1;level<=20;level++){h=hero('Иллиригер',level);assert(C.buildFeatureSet(h).includes('balefulInterdict'));assert.doesNotThrow(()=>g.applyClassProgression(h,'Иллиригер',level));C.restore(h,'short');}
h=hero('Воин',5);h.hpTemp=5;let damage=g.DNDCombat.applyDamage(h,3,'огонь');assert.equal(h.hpCurrent,30);assert.equal(h.hpTemp,2);assert.equal(damage.tempAbsorbed,3);damage=g.DNDCombat.applyDamage(h,7,'огонь');assert.equal(h.hpCurrent,25);assert.equal(h.hp.current,25);assert.equal(h.hpTemp,0);assert.equal(damage.hpDamage,5);
h=hero('Пугилист',18);h.hpCurrent=1;C.buildFeatureSet(h);g.DNDCombat.applyDamage(h,2,'огонь');assert.equal(h.hpCurrent,20,'combat damage activates Fighting Spirit on the canonical character shape');assert.equal(h.hp.current,20);
assert.equal(D.getClass('Оккультист').id,'kibbles-occultist-v11');assert.equal(D.getClass('Оккультист').subclasses.length,3);
h=hero('Оккультист',3);let occultIds=C.buildFeatureSet(h);assert(occultIds.includes('occultist-chooseTradition'));assert.equal(C.useFeature(h,'occultist-chooseTradition',{tradition:'Шаман'}).ok,true);assert.equal(h.classes[0].subclass,'Шаман');
occultIds=C.buildFeatureSet(h);assert(occultIds.includes('occultist-tr-Шаман-1'));assert(!occultIds.includes('occultist-tr-Ведьма-0'));
assert.equal(C.useFeature(h,'occultist-tr-Шаман-1',{type:'fire'}).ok,true);assert(h.classFeaturesState.occultistSpirit.manifested);
const slotBefore=h.classFeaturesState.occultistSlots[0];assert.equal(C.useFeature(h,'occultist-tr-Шаман-2',{slot:1}).ok,true);assert.equal(h.classFeaturesState.occultistSlots[0],slotBefore-1);C.buildFeatureSet(h);assert.equal(h.classFeaturesState.occultistSlots[0],slotBefore-1,'ordinary sync never restores spent occult slots');
assert.equal(C.useFeature(h,'occultist-chooseRite',{rite:'Защитные метки'}).ok,true,'rite capacity carries across intermediate levels');
assert.equal(C.useFeature(h,'occultist-oldWays',{}).ok,false);assert.equal(C.useFeature(h,'occultist-tr-Ведьма-0',{}).ok,false);
C.restore(h,'long');assert.equal(h.classFeaturesState.occultistSlots[0],slotBefore,'long rest restores occult slots');
for(let level=1;level<=20;level++){h=hero('Оккультист',level,'Шаман');assert(C.buildFeatureSet(h).length>0);g.applyClassProgression(h,'Оккультист',level);C.restore(h,'short');C.restore(h,'long');}
assert.equal(D.getClass('Псионик').id,'kibbles-psion');assert.equal(g.getClassData('Псионик').hitDie,6);assert.equal(g.getAvailableSubclasses('Псионик').length,7);assert(g.getAvailableSubclasses('Псионик').every(sc=>sc.pickLevel===1));
assert.equal(g.getAvailableSubclasses('Пугилист').length,7);assert.equal(g.getAvailableSubclasses('Иллиригер').length,5);assert.equal(g.getAvailableSubclasses('Оккультист').length,3);
h=hero('Псионик',5,'Пробуждённый разум');C.buildFeatureSet(h);assert.equal(h.classFeaturesState.psionArchetype,'awakened');assert(h.classFeaturesState.psionDisciplines.includes('telepathy'));assert.equal(h.resources.psiPoints.max,5);assert.equal(C.useFeature(h,'usePsi',{psi:2}).ok,true);assert.equal(h.resources.psiPoints.current,3);C.restore(h,'short');assert.equal(h.resources.psiPoints.current,5);
h=hero('Псионик',1);C.buildFeatureSet(h);assert.equal(C.useFeature(h,'chooseArchetype',{archetype:'unleashed'}).ok,true);assert.equal(h.classes[0].subclass,'unleashed');assert(C.buildFeatureSet(h).includes('unshackledPower'));assert.equal(C.useFeature(h,'chooseDiscipline',{discipline:'telepathy'}).ok,false);
h=hero('Псионик',11,'Пробуждённый разум');C.buildFeatureSet(h);h.classFeaturesState.psionInnateChoices[6]='Тест';assert.equal(C.useFeature(h,'innatePsionics',{spellLevel:6}).ok,true);C.restore(h,'short');assert.equal(C.useFeature(h,'innatePsionics',{spellLevel:6}).ok,false,'daily innate use survives short rest');C.restore(h,'long');assert.equal(C.useFeature(h,'innatePsionics',{spellLevel:6}).ok,true);
for(let level=1;level<=20;level++){h=hero('Псионик',level,'Пробуждённый разум');assert(C.buildFeatureSet(h).includes('psionicPower'));g.applyClassProgression(h,'Псионик',level);C.resetTurn(h);C.restore(h,'short');C.restore(h,'long');}
assert.equal(D.registry.registrationErrors.length,0);assert(D.getClass('Бистхарт').authoritativeSubclasses);assert.equal(g.getAvailableSubclasses('Бистхарт').length,5);
h=hero('Бистхарт',7,'Свирепый союз');g.currentChar=h;h.initiativeTracker={round:1,activeIndex:0,combatants:[],battlefield:{cols:10,rows:10,tokens:{},entities:{}}};C.buildFeatureSet(h);assert.equal(h.classFeaturesState.primalExploitSaveDC,13);assert.equal(h.classFeaturesState.companionBond,'ferocious');
let companion=C.useFeature(h,'chooseCompanion',{companion:'worg'});assert.equal(companion.ok,true);const companionId=companion.companion.id;assert.equal(companion.companion.ownerId,h.id);assert(g.DNDSecondaryEntities.get(companionId));assert(h.initiativeTracker.battlefield.tokens['bt_'+companionId]);
assert.equal(C.useFeature(h,'startTurn',{hostilesWithin5:1}).ok,true);const ferocity=h.resources.beastheartFerocity.current;assert(ferocity>0);assert.equal(C.useFeature(h,'primalExploit',{cost:-5}).ok,false);assert.equal(h.resources.beastheartFerocity.current,ferocity);assert.equal(C.useFeature(h,'primalExploit',{cost:1}).ok,true);assert.equal(g.DNDSecondaryEntities.get(companionId).resources.ferocity,ferocity-1);
assert.equal(C.useFeature(h,'chooseCompanion',{companion:'invalid'}).ok,false);assert(g.DNDSecondaryEntities.get(companionId),'failed replacement preserves old companion');
g.DNDSecondaryEntities.get(companionId).hp=10;g.BeastheartRuntime.gainFerocity(h,5);assert.equal(C.useFeature(h,'rejuvenatingFerocity',{amount:2}).ok,true);assert.equal(g.DNDSecondaryEntities.get(companionId).hp,12);h.classFeaturesState.rejuvenatingFerocityUses=2;C.restore(h,'long');assert.equal(h.classFeaturesState.rejuvenatingFerocityUses,0);C.restore(h,'encounter');assert.equal(h.resources.beastheartFerocity.current,4);
for(let level=1;level<=20;level++){const b=hero('Бистхарт',level);assert(C.buildFeatureSet(b).includes('chooseCompanion'));g.applyClassProgression(b,'Бистхарт',level);}
assert.equal(D.getClass('Ведьма').id,'mh-witch');assert.equal(g.getAvailableSubclasses('Ведьма').length,4);assert(D.getClass('Ведьма').features.every(f=>/[А-Яа-яЁё]/.test(f.name)));
assert.doesNotThrow(()=>C.restore(hero('Ведьма',1),'long'),'rest works before any prior sync');
h=hero('Ведьма',3,'Белое ремесло');h.stats.charisma=10;C.buildFeatureSet(h);assert.equal(h.classFeaturesState.witchCraft,'White');assert.equal(h.classFeaturesState.witchSaveDC,10,'score 10 means a zero ability modifier');const ally=hero('Enemy');ally.hpCurrent=5;assert.equal(C.useFeature(h,'remedy',{target:ally}).ok,true);assert.equal(ally.hpCurrent,9);assert.equal(C.useFeature(h,'decay',{target:ally}).ok,false,'wrong craft action blocked');
h=hero('Ведьма',3);C.buildFeatureSet(h);assert.equal(C.useFeature(h,'chooseCraft',{craft:'Black'}).ok,true);assert.equal(h.classes[0].subclass,'black');assert(C.buildFeatureSet(h).includes('decay'));
for(let level=1;level<=20;level++){h=hero('Ведьма',level,'Белое ремесло');assert(C.buildFeatureSet(h).includes('hex'));g.applyClassProgression(h,'Ведьма',level);C.resetTurn(h);C.onTurnEnd(h);C.restore(h,'short');C.restore(h,'long');C.buildFeatureSet(JSON.parse(JSON.stringify(h)));}
console.log('Class audit integrated runtime: PASS (real index order, framework and seven classes; level/subclass/disabled gates, canonical effects/resources and lifecycle 1–20)');
