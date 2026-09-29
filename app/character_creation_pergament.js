/* 70.25.89 creation buckets: classic / DLC-homebrew / extra + burn-scroll back button */
/* Character creation parchment flow v2 — ordinary/extra sheets, progressive reveal, signature transition. */
(function(){
'use strict';
var ROOT='./';
var SIGNATURE=ROOT+'1790622252250.png';
var CHARACTER_CREATION_MODE=null;
var BYPASS_PARCHMENT_ONCE=false;
/* Creation content buckets: classic = core 5e + Artificer; homebrew = every non-core option; extra stays isolated. */
var CLASSIC_CLASS_NAMES=['Варвар','Бард','Жрец','Друид','Воин','Монах','Паладин','Следопыт','Плут','Чародей','Колдун','Волшебник','Изобретатель'];
var CLASSIC_RACE_IDS=['human','human_variant','elf_high','elf_wood','elf_drow','dwarf_hill','dwarf_mountain','halfling_lightfoot','halfling_stout','dragonborn','gnome_rock','gnome_forest','half_elf','half_orc','tiefling'];
var CLASSIC_BACKGROUND_NAMES=['Прислужник','Шарлатан','Преступник','Артист','Народный герой','Гильдийский ремесленник','Отшельник','Благородный','Дикарь','Мудрец','Мореход','Солдат','Беспризорник'];
var EXTRA_TYPES=['Рой','Призрак','Паразит','Паразит доктора Вальтера'];
function isClassicMode(){return CHARACTER_CREATION_MODE==='classic';}
function isHomebrewMode(){return CHARACTER_CREATION_MODE==='homebrew';}
function isExtraMode(){return CHARACTER_CREATION_MODE==='extra';}
function classRecords(){
 var base=Array.isArray(window.DND_CLASSES_LIST)?window.DND_CLASSES_LIST:[];
 var out=base.slice();
 var ref=window.CLASSES_REFERENCE||{};
 Object.keys(ref).forEach(function(name){
  if(!out.some(function(c){return c.name===name;}))out.push({name:name,displayName:name,hitDie:ref[name].hitDie});
 });
 return out;
}
function creationClassItems(){
 var all=classRecords();
 if(isClassicMode())return CLASSIC_CLASS_NAMES.map(function(name){
  var c=all.find(function(x){return x.name===name;})||{name:name,displayName:name};
  return {value:c.name,label:c.displayName||c.name};
 });
 return all.filter(function(c){return CLASSIC_CLASS_NAMES.indexOf(c.name)===-1 && !EXTRA_TYPES.includes(c.name) && c.name!=='Гайст';}).map(function(c){return {value:c.name,label:c.displayName||c.name};});
}
function creationRaceItems(){
 var races=typeof getAllRaces==='function'?getAllRaces():[];
 if(isClassicMode())return races.filter(function(r){return CLASSIC_RACE_IDS.indexOf(r.id)!==-1;}).map(function(r){return {value:r.id,label:r.name};});
 if(isHomebrewMode())return races.filter(function(r){return CLASSIC_RACE_IDS.indexOf(r.id)===-1;}).map(function(r){return {value:r.id,label:r.name};});
 return [{value:'Призрак',label:'Призрак'},{value:'Паразит',label:'Паразит'},{value:'Рой',label:'Рой'}];
}
function creationBackgroundItems(){
 var bgs=typeof getAllBackgrounds==='function'?getAllBackgrounds():(Array.isArray(window.dndBackgrounds)?window.dndBackgrounds:[]);
 if(isClassicMode())return bgs.filter(function(b){return CLASSIC_BACKGROUND_NAMES.indexOf(b.nameRu||b.name)!==-1;});
 if(isHomebrewMode())return bgs.filter(function(b){return CLASSIC_BACKGROUND_NAMES.indexOf(b.nameRu||b.name)===-1;});
 return bgs;
}
var CLASS_TOKEN_ART={
 'Иллирригер':'./app/data/classes/Illigger.png','Аккурсд':'./app/data/classes/accursed.png','Алхимик':'./app/data/classes/alchemist.png',
 'Бистхарт':'./app/data/classes/beasthart.png','Кровавый охотник':'./app/data/classes/blood hunter.png','Гайст':'./app/data/classes/geist.png',
 'Призрак':'./app/data/classes/geist.png','Мученик':'./app/data/classes/martyr.png','Некромант':'./app/data/classes/necromancer.png',
 'Оккультист':'./app/data/classes/occultist.png','Паразит':'./app/data/classes/parasite.png','Псионик':'./app/data/classes/psion.png',
 'Пугилист':'./app/data/classes/pugilist.png','Рунный хранитель':'./app/data/classes/rune keeper.png','Савант':'./app/data/classes/savant.png',
 'Шифтер':'./app/data/classes/shifter.png','Рой':'./app/data/classes/the swam.png','Сосуд':'./app/data/classes/vessel.png',
 'Страж':'./app/data/classes/warden.png','Военачальник':'./app/data/classes/warlord.png','Ведьма':'./app/data/classes/witch.png',
 'Изобретатель':'./app/data/classes/ARTIFICER.png','Варвар':'./app/data/classes/BARBARIAN.png','Бард':'./app/data/classes/Bard.png',
 'Жрец':'./app/data/classes/CLERIC.png','Друид':'./app/data/classes/DRUID.png','Воин':'./app/data/classes/FIGHTER.png','Монах':'./app/data/classes/Monk.png',
 'Паладин':'./app/data/classes/PALADIN.png','Следопыт':'./app/data/classes/RANGER.png','Плут':'./app/data/classes/Rogue.png','Чародей':'./app/data/classes/SORCERER.png','Колдун':'./app/data/classes/WARLOCK.png','Волшебник':'./app/data/classes/Wizard.png'
};
function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]})}
function el(id){return document.getElementById(id)}
function classes(){
 var list=Array.isArray(window.DND_CLASSES_LIST)?window.DND_CLASSES_LIST:[];
 if(list.length)return list;
 var ref=window.CLASSES_REFERENCE||{};
 return Object.keys(ref).map(function(name){return{name:name,displayName:name}});
}
function classArt(name){return CLASS_TOKEN_ART[name]||''}
var EXTRA_DESCRIPTIONS={'Рой':'Не оставляет после себя свидетелей: эта живая масса окружает жертву со всех сторон, давит числом и продолжает двигаться даже после самых тяжёлых ран.','Призрак':'Его появление означает, что кто-то уже умер. Он не торгуется, не отступает и не оставляет тех, кого считает своей добычей.','Паразит':'Он превращает живое тело в убежище и оружие. Чем дольше его не остановить, тем меньше шансов, что носитель останется собой.'};
function extraDescriptionHtml(){var type=el('pc_race')?el('pc_race').value:'';if(type&&EXTRA_DESCRIPTIONS[type])return '<strong>'+esc(type)+':</strong> '+esc(EXTRA_DESCRIPTIONS[type]);return '';}
function setModeClass(){
 var stage=el('parchmentStage');if(!stage)return;
 stage.classList.toggle('is-extra',isExtraMode());
 stage.classList.toggle('is-classic',isClassicMode());
 stage.classList.toggle('is-homebrew',isHomebrewMode());
}
function fillSelect(id,items,placeholder){
 var e=el(id);if(!e)return;
 e.innerHTML='<option value="">'+esc(placeholder)+'</option>';
 items.forEach(function(x){var o=document.createElement('option');o.value=x.value;o.textContent=x.label;e.appendChild(o)});
 fitSelect(e);
}
function fitSelect(e){
 if(!e)return;
 var txt=e.options[e.selectedIndex]?e.options[e.selectedIndex].text:e.getAttribute('data-placeholder')||'выбрать';
 var canvas=fitSelect.canvas||(fitSelect.canvas=document.createElement('canvas'));
 var ctx=canvas.getContext('2d');ctx.font=getComputedStyle(e).font||'700 16px Georgia';
 var w=Math.ceil(ctx.measureText(txt).width)+34;
 e.style.width=Math.min(Math.max(w,80),Math.max(130,window.innerWidth*0.72))+'px';
}
function reveal(id,yes){var e=el(id);if(!e)return;e.closest('.parchment-step')?.classList.toggle('step-hidden',!yes)}
function setupProgression(){
 var classicSteps=[['pc_name',function(){var e=el('pc_name');return e&&String(e.value||'').trim().length>0}],['pc_origin',function(){var e=el('pc_origin');return e&&String(e.value||'').trim().length>0}],['pc_class',function(){var e=el('pc_class');return e&&String(e.value||'').length>0}],['pc_gender',function(){var e=el('pc_gender');return e&&String(e.value||'').length>0}],['pc_race',function(){var e=el('pc_race');return e&&String(e.value||'').length>0}],['pc_age',function(){var e=el('pc_age');return e&&String(e.value||'').trim().length>0}],['pc_background',function(){var e=el('pc_background');return e&&String(e.value||'').length>0}],['pc_profession',function(){var e=el('pc_profession');return e&&String(e.value||'').length>0}]];
 var extraSteps=[['pc_name',function(){var e=el('pc_name');return e&&String(e.value||'').trim().length>0}],['pc_race',function(){var e=el('pc_race');return e&&String(e.value||'').length>0}]];
 var steps=isExtraMode()?extraSteps:classicSteps;
 var allFields=['pc_name','pc_origin','pc_class','pc_gender','pc_race','pc_age','pc_background','pc_profession'];
 function findStep(field){var n=field;while(n&&(!n.classList||!n.classList.contains('parchment-step')))n=n.parentNode;return n;}
 function update(){var firstIncomplete=steps.length;for(var i=0;i<steps.length;i++){if(!steps[i][1]()){firstIncomplete=i;break;}}var activeIds={};steps.forEach(function(x){activeIds[x[0]]=true});allFields.forEach(function(id){var field=el(id);if(!field)return;var step=findStep(field);if(isExtraMode()&&!activeIds[id]){if(step)step.classList.add('step-hidden');field.disabled=true;return;}var idx=-1;for(var k=0;k<steps.length;k++){if(steps[k][0]===id){idx=k;break;}}var visible=idx>=0&&idx<=firstIncomplete;if(step)step.classList.toggle('step-hidden',!visible);field.disabled=idx<0||idx>firstIncomplete;if(field.tagName==='SELECT')fitSelect(field);});var complete=firstIncomplete===steps.length;var warning=el('pcWarning'),tax=el('pcTax'),reward=el('pcReward');if(isExtraMode()){if(warning)warning.classList.toggle('step-hidden',!el('pc_race')||!String(el('pc_race').value||'').trim());if(tax)tax.classList.add('step-hidden');if(reward)reward.classList.toggle('step-hidden',!complete);}else{if(tax)tax.classList.toggle('step-hidden',!complete);if(warning)warning.classList.toggle('step-hidden',!complete);if(reward)reward.classList.toggle('step-hidden',!complete);}var sign=el('pc_signButton');if(sign){sign.disabled=!complete;sign.classList.toggle('is-ready',complete);sign.style.display=complete?'block':'none';}var reason=el('pc_extraReason');if(reason&&CHARACTER_CREATION_MODE==='extra')reason.innerHTML=extraDescriptionHtml();}
 var stage=el('parchmentStage');if(stage&&!stage.dataset.progressBound){stage.dataset.progressBound='1';stage.addEventListener('input',function(ev){if(ev.target&&ev.target.classList&&ev.target.classList.contains('parchment-field'))update();});stage.addEventListener('change',function(ev){var t=ev.target;if(!t)return;if(t.id==='pc_class'||t.id==='pc_gender'||t.id==='pc_race'||t.id==='pc_background'||t.id==='pc_profession'){if(t.tagName==='SELECT')fitSelect(t);update();if(t.id==='pc_class')renderClassArt();}else if(t.classList&&t.classList.contains('parchment-field'))update();});}
 window.__refreshParchmentProgress=update;window.__updateParchmentProgress=update;update();
}
function renderClassArt(){
 var extra=isExtraMode(), homebrew=isHomebrewMode();var name=extra?(el('pc_race')?el('pc_race').value:''):(el('pc_class')?el('pc_class').value:'');var img=el('pc_classArt'),label=el('pc_classLabel');
 if(label)label.textContent=extra?'':(name||'');var raceLead=el('pcRaceLead');if(raceLead)raceLead.textContent=extra?'Выберите Extra-класс':'По внешним признакам относится к расе';
 if(extra){if(img){var extraArt=(name==='Паразит доктора Вальтера'?'./1790718758545.png':'');if(extraArt&&img.getAttribute('data-art')!==extraArt){var ep=new Image();ep.onload=function(){img.src=extraArt;img.setAttribute('data-art',extraArt);img.alt='Паразит доктора Вальтера';img.classList.add('token-ready');};ep.onerror=function(){console.warn('Extra art not found:',extraArt);};ep.src=extraArt;}else if(!extraArt){img.removeAttribute('src');img.removeAttribute('data-art');img.classList.remove('token-ready');}}}else if(img){
  var art=classArt(name);
  if(!art){
   img.removeAttribute('src');img.removeAttribute('data-art');img.classList.remove('token-ready');img.alt='Жетон появится после выбора класса';
  }else if(img.getAttribute('data-art')!==art){
   /* Preload the new token first. If it is missing, keep the old token visible. */
   var requestedName=name, requestedArt=art;
   var pending=new Image();
   pending.onload=function(){
    var currentName=el('pc_class')?el('pc_class').value:'';
    if(currentName!==requestedName||classArt(currentName)!==requestedArt)return;
    img.src=requestedArt;img.setAttribute('data-art',requestedArt);img.alt='Жетон класса: '+requestedName;img.classList.add('token-ready');
   };
   pending.onerror=function(){console.warn('Token not found:',requestedArt);};
   pending.src=requestedArt;
  }
 }
 var title=el('pcTitle'),sub=el('pcSubtitle'),tax=el('pcTax'),warn=el('pcWarning'),reward=el('pcReward');
 if(title)title.textContent=extra?'ЛИСТ ЛИКВИДАЦИИ':homebrew?'АРХИВНЫЙ ЛИСТ — ДОПОЛНИТЕЛЬНЫЕ МАТЕРИАЛЫ':'РОЗЫСКНОЙ ЛИСТ';
 if(sub)sub.textContent=extra?'Разыскивается исключительно мёртвым. Любая попытка задержания живым считается нарушением приказа гарнизона.':homebrew?'В закрытом архиве обнаружены сведения о тех, кто не вписывается в обычные реестры. Лист составлен по разрозненным донесениям и требует отдельной проверки.':'По подозрению в неуплате налогов, славному городу Енотовиллю, для допроса разыскивается гуманоид';
 if(tax)tax.style.display=(extra||homebrew)?'none':'';
 var originField=el('pc_origin'),genderField=el('pc_gender'),raceField=el('pc_race'),ageField=el('pc_age'),bgField=el('pc_background'),profField=el('pc_profession');
 var stepText=el('parchmentStage');
 if(homebrew&&stepText){
  var originText=originField&&originField.closest('.parchment-step')?.querySelector('.parchment-text');
  var genderText=genderField&&genderField.closest('.parchment-step')?.querySelector('.parchment-text');
  var raceText=raceField&&raceField.closest('.parchment-step')?.querySelector('.parchment-text');
  var ageText=ageField&&ageField.closest('.parchment-step')?.querySelector('.parchment-text');
  var bgText=bgField&&bgField.closest('.parchment-step')?.querySelector('.parchment-text');
  var profText=profField&&profField.closest('.parchment-step')?.querySelector('.parchment-text');
  if(originText)originText.innerHTML='По архивной записи считается, что след ведёт в <input id="pc_origin" class="parchment-field" type="text" placeholder="место" autocomplete="off">.';
  if(genderText)genderText.innerHTML='В старых донесениях фигурант описан как <select id="pc_gender" class="parchment-select"></select>.';
  if(raceText)raceText.innerHTML='Свидетели утверждают, что перед нами существо рода <select id="pc_race" class="parchment-select"></select>.';
  if(ageText)ageText.innerHTML='По состоянию архивной записи ему приблизительно <input id="pc_age" class="parchment-field" type="number" min="1" max="999" placeholder="лет"> лет.';
  if(bgText)bgText.innerHTML='В прошлом за ним числится путь: <select id="pc_background" class="parchment-select"></select>.';
  if(profText)profText.innerHTML='Среди известных занятий значится <select id="pc_profession" class="parchment-select"></select>.';
  fillSelect('pc_gender',[{value:'мужчина',label:'мужчина'},{value:'женщина',label:'женщина'}],'выбрать пол');
  fillSelect('pc_race',creationRaceItems(),'выбрать расу');
  fillSelect('pc_background',creationBackgroundItems().map(function(b){var n=b.nameRu||b.name||'';return{value:n,label:n}}),'выбрать предысторию');
  fillSelect('pc_profession',getProfessionItems(),'выбрать профессию');
 }
 if(warn)warn.innerHTML=extra?'ОСОБАЯ ПРИМЕТА И ПРИЧИНА РОЗЫСКА: <span id="pc_extraReason">выберите Extra-класс</span>':homebrew?'ПОМЕТКА ХРАНИТЕЛЯ АРХИВА: сведения не подтверждены обычными реестрами. Проверять происхождение, способности и связи отдельно.':'СТЫД ТЕБЕ, ПРОЧИТАВШИЙ ЭТО, РОЗЫСКИВАЕМЫЙ <span id="pc_professionText">—</span>.';
 if(reward)reward.innerHTML=extra?'Доставить исключительно мёртвым.<br>Награда <strong>30 золотых монет</strong>.':homebrew?'Материал признан редким и передан в особый архив.<br>Награда за доставку не назначена. Досье подлежит сохранению.':'Доставить исключительно живым и с кошельком.<br>Награда 10 серебряных монет и кружка хорошего пива.';
 var sign=el('pc_signButton');if(sign)sign.innerHTML='расписаться<span class="parchment-sign-hint">закончить создание</span>';
 if(typeof window.__updateParchmentProgress==='function')window.__updateParchmentProgress();
}
function getProfessionItems(){
 var p=window.DND_CRAFT_PROFESSION_PROGRESS;
 if(p&&typeof p.professionIds==='function'){
  return p.professionIds().map(function(id){return{value:id,label:typeof p.professionLabel==='function'?p.professionLabel(id):id}});
 }
 var base=window.DND_CRAFT_PROFESSIONS_V38&&window.DND_CRAFT_PROFESSIONS_V38.PROFESSIONS;
 return base?Object.keys(base).map(function(id){return{value:id,label:base[id].name||id}}):[];
}
function resetParchmentFields(){
 ['pc_name','pc_origin','pc_age'].forEach(function(id){var e=el(id);if(e)e.value='';});
 ['pc_class','pc_gender','pc_race','pc_background','pc_profession'].forEach(function(id){var e=el(id);if(e)e.value='';});
 var art=el('pc_classArt');if(art){art.removeAttribute('src');art.removeAttribute('data-art');art.classList.remove('token-ready');}
}
function initParchment(){
 resetParchmentFields();
 setModeClass();
 var isExtra=isExtraMode();
 if(isExtra){fillSelect('pc_class',[],'не используется');}else{fillSelect('pc_class',creationClassItems(),'выбрать класс');}
 fillSelect('pc_race',creationRaceItems(),isExtra?'выбрать заглушку':'выбрать расу');
 fillSelect('pc_background',creationBackgroundItems().map(function(b){var n=b.nameRu||b.name||'';return{value:n,label:n}}),'выбрать предысторию');
 fillSelect('pc_gender',[{value:'мужчина',label:'мужчина'},{value:'женщина',label:'женщина'}],'выбрать пол');
 fillSelect('pc_profession',getProfessionItems(),'выбрать профессию');
 setupProgression();
 renderClassArt();
}
function syncToClassic(){
 var name=el('pc_name').value.trim(),origin=el('pc_origin')?el('pc_origin').value.trim():'',age=el('pc_age')?el('pc_age').value.trim():'',cls=el('pc_class')?el('pc_class').value:'',gender=el('pc_gender')?el('pc_gender').value:'',race=el('pc_race').value,bg=el('pc_background')?el('pc_background').value:'',profession=el('pc_profession')?.value||'';
 var isExtraDraft=CHARACTER_CREATION_MODE==='extra';window.__parchmentCharacterDraft={name:name,origin:origin,age:age,className:isExtraDraft?race:cls,gender:gender,raceId:isExtraDraft?'':race,background:bg,profession:profession,extra:isExtraDraft,extraType:isExtraDraft?race:'',creationMode:CHARACTER_CREATION_MODE};
 function set(id,val){var e=el(id);if(e)e.value=val}
 set('cc_name',name);set('cc_age',age);set('cc_race',race);set('cc_background',bg);set('cc_profession',profession);set('cc_class',isExtraDraft?(race?(race==='Призрак'?'Гайст':race)+' 1':''):(cls?(cls==='Призрак'?'Гайст':cls)+' 1':''));set('cc_gender',gender);set('cc_origin',origin);
 if(typeof window.updateClassDescription==='function')window.updateClassDescription();
 if(typeof window.updateRaceDescription==='function')window.updateRaceDescription();
 if(typeof window.updateBackgroundDescription==='function')window.updateBackgroundDescription();
 var pt=el('pc_professionText'),p=window.DND_CRAFT_PROFESSION_PROGRESS;
 if(pt)pt.textContent=profession&&p&&typeof p.professionLabel==='function'?p.professionLabel(profession):(profession||'без профессии');
}
function chooser(){
 var old=el('characterCreationTypeChooser');if(old)return old;
 var m=document.createElement('div');m.id='characterCreationTypeChooser';
 m.style.cssText='display:none;position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.88);align-items:center;justify-content:center;padding:18px;box-sizing:border-box';
 m.innerHTML='<div class="creation-type-card"><div class="creation-type-icon">📜</div><h2>Какого персонажа создаём?</h2><p>Сначала выберите тип листа.</p><button id="ccTypeClassic">Обычный персонаж</button><button id="ccTypeHomebrew">DLC / Хоумбрю</button><button id="ccTypeExtra">Экстра</button><button id="ccTypeCancel">Отмена</button></div>';
 document.body.appendChild(m);
 m.querySelector('#ccTypeClassic').onclick=function(){m.style.display='none';CHARACTER_CREATION_MODE='classic';openParchmentSheet()};
 m.querySelector('#ccTypeHomebrew').onclick=function(){m.style.display='none';CHARACTER_CREATION_MODE='homebrew';openParchmentSheet()};
 m.querySelector('#ccTypeExtra').onclick=function(){m.style.display='none';CHARACTER_CREATION_MODE='extra';openParchmentSheet()};
 m.querySelector('#ccTypeCancel').onclick=function(){m.style.display='none';if(typeof window.showCharacterSelect==='function')window.showCharacterSelect()};
 return m;
}
function openParchmentSheet(){
 var a=el('characterSelectScreen'),b=el('characterCreationScreen'),p=el('parchmentCreationScreen');
 if(a)a.style.display='none';if(b)b.style.display='none';if(p)p.style.display='block';
 initParchment();
}
window.openParchmentCreation=function(){chooser().style.display='flex'};
window.closeParchmentCreation=function(){var p=el('parchmentCreationScreen');if(p)p.style.display='none';if(typeof window.showCharacterSelect==='function')window.showCharacterSelect()};
window.burnParchment=function(){window.closeParchmentCreation();};
window.finishParchmentCreation=function(){
 var ids=isExtraMode()?['pc_name','pc_race']:['pc_name','pc_origin','pc_class','pc_gender','pc_race','pc_age','pc_background','pc_profession'];
 var missing=ids.some(function(id){var e=el(id);return !e||!String(e.value||'').trim()});
 if(missing){alert('Заполните все открытые поля по порядку.');return}
 syncToClassic();
 var draft=window.__parchmentCharacterDraft||{};
 var p=el('parchmentCreationScreen'),s=el('parchmentSignatureLayer'),bo=el('parchmentBlackout');
 if(p)p.style.display='block';
 if(s){s.classList.remove('show','cinematic');void s.offsetWidth;s.classList.add('show','cinematic')}
 if(bo){bo.classList.remove('show','cinematic-hold');void bo.offsetWidth;bo.classList.add('show','cinematic-hold')}
 setTimeout(function(){
  if(bo)bo.classList.remove('show','cinematic-hold');
  if(s)s.classList.remove('show','cinematic');
  if(p)p.style.display='none';
  var builder=window.CharacterBuilderV2;
  if(builder&&typeof builder.startCreateFromParchment==='function'){
    builder.startCreateFromParchment(draft);
  }
 },6000);
};
function hook(){
 if(typeof window.createNewCharacter!=='function'){setTimeout(hook,50);return}
 if(window.createNewCharacter.__parchmentHooked)return;
 var original=window.createNewCharacter;
 var wrapped=function(){
  if(BYPASS_PARCHMENT_ONCE){BYPASS_PARCHMENT_ONCE=false;return original.apply(this,arguments)}
  return window.openParchmentCreation();
 };
 wrapped.__parchmentHooked=true;window.createNewCharacter=wrapped;
 var save=window.saveNewCreatedCharacter;
 if(typeof save==='function'&&!save.__parchmentHooked){
  var sw=function(){
   var draft=window.__parchmentCharacterDraft||{};save.apply(this,arguments);
   if(Array.isArray(window.allCharacters)&&window.allCharacters.length){
    var c=window.allCharacters[window.allCharacters.length-1];
    if(c){c.origin=draft.origin||'';c.gender=draft.gender||'';c.creationDocument='parchment';c.creationMode=draft.creationMode||(draft.extra?'extra':'classic');c.extraType=draft.extraType||'';c.wantedStatus=draft.extra?'dead_only':(draft.creationMode==='homebrew'?'archive_review':'alive_only');c.wantedReward=draft.extra?'30 золотых монет':(draft.creationMode==='homebrew'?'не назначена':'10 серебряных монет и кружка хорошего пива');if(typeof window.saveAllCharacters==='function')window.saveAllCharacters();}
   }
  };
  sw.__parchmentHooked=true;window.saveNewCreatedCharacter=sw;
 }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',hook);else hook();
})();