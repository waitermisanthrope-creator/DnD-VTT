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
 return EXTRA_TYPES.map(function(name){return {value:name,label:name};});
}
function extraNeedsHost(name){return name==='Призрак'||name==='Паразит'||name==='Паразит доктора Вальтера';}
function creationHostItems(){
 var races=typeof getAllRaces==='function'?getAllRaces():[];
 return races.map(function(r){return {value:r.id,label:r.name};});
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
 'Изобретатель':'./app/data/classes/ARTIFICER.png','Паразит доктора Вальтера':'./1790718758545.png','Варвар':'./app/data/classes/BARBARIAN.png','Бард':'./app/data/classes/Bard.png',
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
var EXTRA_DESCRIPTIONS={
 'Рой':'Существо, состоящее из множества живых особей, действующих как единый организм. Отдельную особь уничтожить почти невозможно, но весь рой уязвим к массовому воздействию и огню.',
 'Призрак':'Нематериальная сущность, сохранившая волю после смерти. Привязанный к миру живых призрак может вселяться в мёртвые оболочки и использовать их как временное тело.',
 'Паразит':'Живой организм, превращающий носителя в убежище и оружие. Паразит сохраняет сознание и постепенно перестраивает тело хозяина под собственные потребности.',
 'Паразит доктора Вальтера':'Экспериментальный вид, созданный в лаборатории безумного доктора Вальтера. Несколько особей были выращены в строго контролируемой среде, однако часть из них сумела покинуть лабораторию и исчезла. Их способности, пределы развития и причина агрессивного поведения до сих пор неизвестны. В связи с этим городские власти объявили особый розыск: за уничтоженную особь или доставленный мёртвый экземпляр выплачивается 30 золотых, за живой и неповреждённый экземпляр — 300 золотых. Живой экземпляр считается чрезвычайно ценным для изучения и одновременно потенциально опасным.'
};
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
 var extraSteps=[['pc_name',function(){var e=el('pc_name');return e&&String(e.value||'').trim().length>0}],['pc_race',function(){var e=el('pc_race');return e&&String(e.value||'').length>0}],['pc_extraHost',function(){var type=el('pc_race')?el('pc_race').value:'';if(!extraNeedsHost(type))return true;var e=el('pc_extraHost');return e&&String(e.value||'').length>0}]];
 var steps=isExtraMode()?extraSteps:classicSteps;
 var allFields=['pc_name','pc_origin','pc_class','pc_gender','pc_race','pc_extraHost','pc_age','pc_background','pc_profession'];
 function saveState(){
   window.__parchmentFieldState=window.__parchmentFieldState||{};
   allFields.forEach(function(id){var e=el(id);if(e)window.__parchmentFieldState[id]=e.value;});
 }
 function restoreState(){
   var state=window.__parchmentFieldState||{};
   allFields.forEach(function(id){var e=el(id);if(e&&Object.prototype.hasOwnProperty.call(state,id)&&state[id]!==undefined)e.value=state[id];});
 }
 function findStep(field){var n=field;while(n&&(!n.classList||!n.classList.contains('parchment-step')))n=n.parentNode;return n;}
 function update(){
   saveState();
   var firstIncomplete=steps.length;
   for(var i=0;i<steps.length;i++){if(!steps[i][1]()){firstIncomplete=i;break;}}
   var activeIds={};steps.forEach(function(x){activeIds[x[0]]=true});
   allFields.forEach(function(id){
     var field=el(id);if(!field)return;
     var step=findStep(field);
     if(isExtraMode()&&id==='pc_extraHost'&&!extraNeedsHost(el('pc_race')?el('pc_race').value:'')){
       if(step)step.classList.add('step-hidden');
       field.disabled=true;field.value='';
       return;
     }
     if(isExtraMode()&&!activeIds[id]){if(step)step.classList.add('step-hidden');field.disabled=true;return;}
     var idx=-1;for(var k=0;k<steps.length;k++){if(steps[k][0]===id){idx=k;break;}}
     var visible=idx>=0&&idx<=firstIncomplete;
     if(step)step.classList.toggle('step-hidden',!visible);
     /* Completed fields are never disabled. This makes the parchment monotonic:
        once revealed, a completed choice cannot vanish because another field changed. */
     field.disabled=idx<0||idx>firstIncomplete;
     if(idx>=0&&idx<=firstIncomplete)field.disabled=false;
     if(field.tagName==='SELECT')fitSelect(field);
   });
   restoreState();
   var complete=firstIncomplete===steps.length;
   var warning=el('pcWarning'),tax=el('pcTax'),reward=el('pcReward');
   if(isExtraMode()){
     if(warning)warning.classList.toggle('step-hidden',!el('pc_race')||!String(el('pc_race').value||'').trim());
     if(tax)tax.classList.add('step-hidden');
     if(reward)reward.classList.toggle('step-hidden',!complete);
   }else{
     if(tax)tax.classList.toggle('step-hidden',!complete);
     if(warning)warning.classList.toggle('step-hidden',!complete);
     if(reward)reward.classList.toggle('step-hidden',!complete);
   }
   var sign=el('pc_signButton');
   if(sign){sign.disabled=!complete;sign.classList.toggle('is-ready',complete);sign.style.display=complete?'block':'none';}
   var reason=el('pc_extraReason');
   if(reason&&CHARACTER_CREATION_MODE==='extra')reason.innerHTML=extraDescriptionHtml();
   saveState();
 }
 var stage=el('parchmentStage');
 if(stage&&!stage.dataset.progressBound){
   stage.dataset.progressBound='1';
   stage.addEventListener('input',function(ev){
     if(ev.target&&ev.target.classList&&ev.target.classList.contains('parchment-field'))update();
   });
   stage.addEventListener('change',function(ev){
     var t=ev.target;if(!t)return;
     if(t.id==='pc_class'||t.id==='pc_gender'||t.id==='pc_race'||t.id==='pc_extraHost'||t.id==='pc_background'||t.id==='pc_profession'){
       saveState();
       if(t.tagName==='SELECT')fitSelect(t);
       update();
       if(t.id==='pc_class'||t.id==='pc_race')renderClassArt();
     }else if(t.classList&&t.classList.contains('parchment-field'))update();
   });
 }
 window.__refreshParchmentProgress=update;window.__updateParchmentProgress=update;update();
}
function renderClassArt(){
 var extra=isExtraMode(), homebrew=isHomebrewMode();
 var name=extra?(el('pc_race')?el('pc_race').value:''):(el('pc_class')?el('pc_class').value:'');
 var img=extra?el('pc_extraClassArt'):el('pc_classArt');
 var extraToken=el('pcExtraToken');
 var classStep=el('pc_classArt')&&el('pc_classArt').closest('.parchment-step');
 var label=el('pc_classLabel');
 if(label)label.textContent=extra?'':(name||'');
 var raceLead=el('pcRaceLead');
 if(raceLead)raceLead.textContent=extra?'Выберите Extra-класс':'По внешним признакам относится к расе';
 var hostLead=el('pcExtraHostLead');
 if(hostLead&&extra){
   var selectedExtra=el('pc_race')?el('pc_race').value:'';
   hostLead.textContent=selectedExtra==='Призрак'?'Укажите мёртвую оболочку':selectedExtra==='Паразит доктора Вальтера'?'Укажите тело, в которое будет внедрён паразит':'Укажите тело / хозяина';
 }
 if(extra){
   if(classStep)classStep.classList.add('step-hidden');
   if(extraToken)extraToken.style.display=name?'flex':'none';
   var extraTokenArt={
     'Рой':'./app/data/classes/the swam.png',
     'Паразит':'./app/data/classes/parasite.png',
     'Паразит доктора Вальтера':'./1790718758545.png',
     'Призрак':'./app/data/classes/geist.png'
   };
   var extraArt=extraTokenArt[name]||'';
   if(img){
     if(extraArt){
       /* Extra tokens are displayed directly; do not rely on the parchment CSS
          preloader class, because Android WebView can retain display:none. */
       if(extraToken)extraToken.style.display='flex';
       img.style.display='block';
       img.style.visibility='visible';
       img.style.opacity='1';
       img.onerror=function(){
         console.error('Extra token not found: '+extraArt);
         img.classList.remove('token-ready');
         img.style.display='none';
         if(extraToken)extraToken.style.display='none';
       };
       img.onload=function(){
         img.classList.add('token-ready');
         img.style.display='block';
         img.style.visibility='visible';
         img.style.opacity='1';
       };
       img.src=extraArt;
       img.setAttribute('data-art',extraArt);
       img.alt='Жетон Extra: '+name;
       img.classList.add('token-ready');
     }else{
       img.removeAttribute('src');img.removeAttribute('data-art');img.classList.remove('token-ready');
       img.style.display='none';
     }
   }
 }else{
   if(extraToken)extraToken.style.display='none';
   if(classStep)classStep.classList.remove('step-hidden');
   img=el('pc_classArt');
   if(img){
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
 }
 var title=el('pcTitle'),sub=el('pcSubtitle'),tax=el('pcTax'),warn=el('pcWarning'),reward=el('pcReward');
 if(title)title.textContent=extra?'ЛИСТ ЛИКВИДАЦИИ':homebrew?'АРХИВНЫЙ ЛИСТ — ДОПОЛНИТЕЛЬНЫЕ МАТЕРИАЛЫ':'РОЗЫСКНОЙ ЛИСТ';
 if(sub)sub.textContent=extra?'Разыскивается исключительно мёртвым. Любая попытка задержания живым считается нарушением приказа гарнизона.':homebrew?'В закрытом архиве обнаружены сведения о тех, кто не вписывается в обычные реестры. Лист составлен по разрозненным донесениям и требует отдельной проверки.':'По подозрению в неуплате налогов, славному городу Енотовиллю, для допроса разыскивается гуманоид';
 if(tax)tax.style.display=(extra||homebrew)?'none':'';
 var originField=el('pc_origin'),genderField=el('pc_gender'),raceField=el('pc_race'),ageField=el('pc_age'),bgField=el('pc_background'),profField=el('pc_profession');
 var stepText=el('parchmentStage');
 if(homebrew&&stepText){
  /* Homebrew перерисовывает текстовые блоки при смене класса/расы.
     Сначала сохраняем значения полей, иначе замена innerHTML уничтожает место
     и последующий update() принимает пустое поле за новый незаполненный шаг. */
  var preservedState=window.__parchmentFieldState||{};
  ['pc_name','pc_origin','pc_class','pc_gender','pc_race','pc_extraHost','pc_age','pc_background','pc_profession'].forEach(function(id){
    var oldField=el(id);
    if(oldField)preservedState[id]=oldField.value;
  });
  window.__parchmentFieldState=preservedState;
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
  /* innerHTML выше создал новые DOM-элементы. Вернуть сохранённые значения
     до запуска прогрессии, чтобы homebrew не сбрасывал уже пройденные шаги. */
  var restoredState=window.__parchmentFieldState||{};
  ['pc_name','pc_origin','pc_class','pc_gender','pc_race','pc_extraHost','pc_age','pc_background','pc_profession'].forEach(function(id){
    var field=el(id);
    if(field&&Object.prototype.hasOwnProperty.call(restoredState,id))field.value=restoredState[id];
  });
 }
 if(warn)warn.innerHTML=extra?'ОСОБАЯ ПРИМЕТА И ПРИЧИНА РОЗЫСКА: <span id="pc_extraReason">выберите Extra-класс</span>':homebrew?'ПОМЕТКА ХРАНИТЕЛЯ АРХИВА: сведения не подтверждены обычными реестрами. Проверять происхождение, способности и связи отдельно.':'СТЫД ТЕБЕ, ПРОЧИТАВШИЙ ЭТО, РОЗЫСКИВАЕМЫЙ <span id="pc_professionText">—</span>.';
 if(reward){
   if(extra&&el('pc_race')&&el('pc_race').value==='Паразит доктора Вальтера')
     reward.innerHTML='Доставить экземпляр живым или мёртвым.<br><strong>Мёртвый: 30 золотых.</strong> &nbsp; <strong>Живой: 300 золотых.</strong>';
   else
     reward.innerHTML=extra?'Доставить исключительно мёртвым.<br>Награда <strong>30 золотых монет</strong>.':homebrew?'Материал признан редким и передан в особый архив.<br>Награда за доставку не назначена. Досье подлежит сохранению.':'Доставить исключительно живым и с кошельком.<br>Награда 10 серебряных монет и кружка хорошего пива.';
 }
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
 ['pc_classArt','pc_extraClassArt'].forEach(function(id){var art=el(id);if(art){art.removeAttribute('src');art.removeAttribute('data-art');art.classList.remove('token-ready');}});
 var extraToken=el('pcExtraToken');if(extraToken)extraToken.style.display='none';
}
function initParchment(){
 resetParchmentFields();
 setModeClass();
 var isExtra=isExtraMode();
 if(isExtra){fillSelect('pc_class',[],'не используется');}else{fillSelect('pc_class',creationClassItems(),'выбрать класс');}
 fillSelect('pc_race',creationRaceItems(),isExtra?'выбрать Extra-класс':'выбрать расу');
 fillSelect('pc_extraHost',creationHostItems(),'выбрать тело / хозяина');
 fillSelect('pc_background',creationBackgroundItems().map(function(b){var n=b.nameRu||b.name||'';return{value:n,label:n}}),'выбрать предысторию');
 fillSelect('pc_gender',[{value:'мужчина',label:'мужчина'},{value:'женщина',label:'женщина'}],'выбрать пол');
 fillSelect('pc_profession',getProfessionItems(),'выбрать профессию');
 setupProgression();
 renderClassArt();
}
function buildParchmentDraft(){
 var name=el('pc_name')?el('pc_name').value.trim():'';
 var origin=el('pc_origin')?el('pc_origin').value.trim():'';
 var age=el('pc_age')?el('pc_age').value.trim():'';
 var cls=el('pc_class')?el('pc_class').value:'';
 var gender=el('pc_gender')?el('pc_gender').value:'';
 var race=el('pc_race')?el('pc_race').value:'';
 var extraHost=el('pc_extraHost')?el('pc_extraHost').value:'';
 var bg=el('pc_background')?el('pc_background').value:'';
 var profession=el('pc_profession')?el('pc_profession').value:'';
 var isExtraDraft=CHARACTER_CREATION_MODE==='extra';
 var hostId=isExtraDraft&&extraNeedsHost(race)?extraHost:'';
 return {name:name,origin:origin,age:age,className:isExtraDraft?race:cls,gender:gender,raceId:isExtraDraft?hostId:race,hostRaceId:isExtraDraft?hostId:'',background:bg,profession:profession,extra:isExtraDraft,extraType:isExtraDraft?race:'',creationMode:CHARACTER_CREATION_MODE};
}
function syncToClassic(){
 var draft=buildParchmentDraft();
 window.__parchmentCharacterDraft=draft;
 // Legacy UI остаётся только как совместимость. Ошибка старого экрана
 // не должна блокировать переход в Builder V2.
 try{
  var name=draft.name,origin=draft.origin,age=draft.age,cls=draft.className,gender=draft.gender,race=draft.raceId,bg=draft.background,profession=draft.profession;
  function set(id,val){var e=el(id);if(e)e.value=val}
  set('cc_name',name);set('cc_age',age);set('cc_race',race);set('cc_background',bg);set('cc_profession',profession);
  set('cc_class',cls?(cls==='Призрак'?'Гайст':cls)+' 1':'');set('cc_gender',gender);set('cc_origin',origin);
 }catch(err){console.warn('Legacy creation bridge skipped:',err);}
 var pt=el('pc_professionText'),p=window.DND_CRAFT_PROFESSION_PROGRESS;
 if(pt)pt.textContent=draft.profession&&p&&typeof p.professionLabel==='function'?p.professionLabel(draft.profession):(draft.profession||'без профессии');
}
function chooser(){
 var old=el('characterCreationTypeChooser');if(old)return old;
 var m=document.createElement('div');m.id='characterCreationTypeChooser';
 m.style.cssText='display:none;position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.88);align-items:center;justify-content:center;padding:18px;box-sizing:border-box';
 m.innerHTML='<div class="creation-type-card"><div class="creation-type-icon">📜</div><h2>Какого персонажа создаём?</h2><p>Сначала выберите тип листа.</p><button id="ccTypeClassic">Обычный персонаж</button><button id="ccTypeHomebrew">DLC / Хоумбрю</button><button id="ccTypeExtra">Экстра</button><button id="ccTypeConstructor" style="background:#6b5414;border-color:#d4af37;">⚡ Конструктор</button><button id="ccTypeCancel">Отмена</button></div>';
 document.body.appendChild(m);
 m.querySelector('#ccTypeClassic').onclick=function(){m.style.display='none';CHARACTER_CREATION_MODE='classic';openParchmentSheet()};
 m.querySelector('#ccTypeHomebrew').onclick=function(){m.style.display='none';CHARACTER_CREATION_MODE='homebrew';openParchmentSheet()};
 m.querySelector('#ccTypeExtra').onclick=function(){m.style.display='none';CHARACTER_CREATION_MODE='extra';openParchmentSheet()};
  m.querySelector('#ccTypeConstructor').onclick=function(){
    m.style.display='none';
    if(window.CharacterBuilderV2&&typeof window.CharacterBuilderV2.startCreateDirect==='function'){
      return window.CharacterBuilderV2.startCreateDirect();
    }
    var src='./app/character_builder_v2.js?direct_builder=7026082';
    var s=document.createElement('script');s.async=false;s.src=src;
    s.onload=function(){if(window.CharacterBuilderV2&&typeof window.CharacterBuilderV2.startCreateDirect==='function')window.CharacterBuilderV2.startCreateDirect();else alert('Конструктор не загрузился.');};
    s.onerror=function(){alert('Не удалось загрузить конструктор.');};
    document.head.appendChild(s);
  };
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
 var ids=isExtraMode()?['pc_name','pc_race'].concat(extraNeedsHost(el('pc_race')?el('pc_race').value:'')?['pc_extraHost']:[]):['pc_name','pc_origin','pc_class','pc_gender','pc_race','pc_age','pc_background','pc_profession'];
 var missing=ids.some(function(id){var e=el(id);return !e||!String(e.value||'').trim()});
 if(missing){alert('Заполните все открытые поля по порядку.');return}
 var draft=buildParchmentDraft();
 window.__parchmentCharacterDraft=draft;
 // Пытаемся синхронизировать старую форму, но это больше не является частью
 // критического пути: Builder V2 должен открыться даже если legacy-функция сломана.
 try{syncToClassic();}catch(err){console.warn('Parchment legacy sync failed:',err);}
 var p=el('parchmentCreationScreen'),s=el('parchmentSignatureLayer'),bo=el('parchmentBlackout');
 if(p)p.style.display='block';
 if(s){s.classList.remove('show','cinematic');void s.offsetWidth;s.classList.add('show','cinematic')}
 if(bo){bo.classList.remove('show','cinematic-hold');void bo.offsetWidth;bo.classList.add('show','cinematic-hold')}
 function showBuilderModuleFatal(reason){
  var root=el('cbv2Screen');
  if(!root){
    root=document.createElement('div');
    root.id='cbv2Screen';
    document.body.appendChild(root);
  }
  root.style.cssText='position:fixed;inset:0;z-index:99990;display:block;background:#111;color:#fff;overflow:auto;box-sizing:border-box;';
  root.innerHTML='<div style="max-width:720px;margin:0 auto;padding:18px;color:#fff;font-family:system-ui"><h2>⚠️ Builder V2 не загрузился</h2><p>Файл мастера не зарегистрировал <code>window.CharacterBuilderV2</code>.</p><pre style="white-space:pre-wrap;word-break:break-word;color:#ffb4ab;background:#171717;padding:12px;border-radius:8px;">'+String(reason||'Неизвестная ошибка загрузки')+'</pre><button onclick="dndV709Open()" style="padding:10px 14px">🐞 Открыть ошибки</button></div>';
 }
 function loadBuilderModule(done){
  if(window.CharacterBuilderV2&&typeof window.CharacterBuilderV2.startCreateFromParchment==='function'){done(true);return;}
  if(window.__CBV2_BOOT_LOADING){
    var n=0,wait=function(){if(window.CharacterBuilderV2&&typeof window.CharacterBuilderV2.startCreateFromParchment==='function'){done(true);return;}if(++n>=20){done(false,'Builder V2 не появился после динамической загрузки.');return;}setTimeout(wait,100);};wait();return;
  }
  window.__CBV2_BOOT_LOADING=true;
  var src='./app/character_builder_v2.js?v=70.26.82';
  var existing=document.querySelector('script[data-cbv2-bootstrap="1"]');
  var s=existing||document.createElement('script');
  s.async=false;
  s.setAttribute('data-cbv2-bootstrap','1');
  s.onload=function(){
    var ok=!!(window.CharacterBuilderV2&&typeof window.CharacterBuilderV2.startCreateFromParchment==='function');
    window.__CBV2_BOOT_LOADING=false;
    if(ok)done(true);else done(false,'Файл загрузился, но window.CharacterBuilderV2 не зарегистрирован. Возможна синтаксическая/стартовая ошибка. URL: '+src);
  };
  s.onerror=function(){
    window.__CBV2_BOOT_LOADING=false;
    done(false,'Не удалось загрузить '+src);
  };
  if(!existing){s.src=src;document.head.appendChild(s);}
 }
 function launchBuilder(attempt){
  var builder=window.CharacterBuilderV2;
  console.warn('Parchment → Builder V2: attempt '+attempt, builder?'module loaded':'module NOT loaded');
  if(builder&&typeof builder.startCreateFromParchment==='function'){
   try{
    var result=builder.startCreateFromParchment(draft);
    if(result)return;
    if(window.__CBV2_LAST_ERROR)return;
    throw new Error('CharacterBuilderV2.startCreateFromParchment() не вернул Wizard.');
   }catch(err){
    console.error('Builder V2 launch failed:',err);
    var root=el('cbv2Screen');
    if(!root){
      root=document.createElement('div');
      root.id='cbv2Screen';
      root.style.cssText='position:fixed;inset:0;z-index:99990;display:block;background:#111;color:#fff;overflow:auto;';
      document.body.appendChild(root);
    }
    root.innerHTML='<div style="max-width:720px;margin:0 auto;padding:18px;color:#fff;font-family:system-ui"><h2>⚠️ Не удалось открыть Builder V2</h2><pre style="white-space:pre-wrap;word-break:break-word;color:#ffb4ab;background:#171717;padding:12px;border-radius:8px;">'+String(err&&err.stack||err)+'</pre><button onclick="dndV709Open()" style="padding:10px 14px">🐞 Открыть ошибки</button></div>';
    return;
   }
  }
  /* If the early <script> was blocked, retry the actual file once instead of
     silently waiting for ten identical missing globals. */
  if(!window.__CBV2_RETRY_STARTED){
   window.__CBV2_RETRY_STARTED=true;
   var retry=document.createElement('script');
   retry.src='./app/character_builder_v2.js?cbv2_retry=7026082';
   retry.async=false;
   retry.onload=function(){setTimeout(function(){launchBuilder(attempt+1);},0);};
   retry.onerror=function(){
    console.error('Builder V2 script load failed on retry:',retry.src);
    launchBuilder(10);
   };
   document.head.appendChild(retry);
   return;
  }
  if(attempt<10){setTimeout(function(){launchBuilder(attempt+1);},250);return;}
  var reason=window.__CBV2_LAST_ERROR||window.__CBV2_SCRIPT_ERROR||'Файл character_builder_v2.js не создал window.CharacterBuilderV2.';
  console.error('Builder V2 module unavailable after retry:',reason);
  var root=el('cbv2Screen');
  if(!root){
   root=document.createElement('div');
   root.id='cbv2Screen';
   document.body.appendChild(root);
  }
  root.style.cssText='position:fixed;inset:0;z-index:99990;display:block;background:#111;color:#fff;overflow:auto;box-sizing:border-box;';
  root.innerHTML='<div style="max-width:720px;margin:0 auto;padding:18px;color:#fff;font-family:system-ui"><h2>⚠️ Builder V2 не загрузился</h2><p>Мастер создания не был найден после повторной загрузки скрипта.</p><pre style="white-space:pre-wrap;word-break:break-word;color:#ffb4ab;background:#171717;padding:12px;border-radius:8px;">'+String(reason)+'</pre><button onclick="dndV709Open()" style="padding:10px 14px">🐞 Открыть ошибки</button></div>';
 } setTimeout(function(){
  if(bo)bo.classList.remove('show','cinematic-hold');
  if(s)s.classList.remove('show','cinematic');
  if(p)p.style.display='none';
  launchBuilder(0);
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