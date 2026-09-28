/* Пергаментное создание персонажа: этап 1 + переход к существующему механическому созданию. */
(function(){
'use strict';
var ROOT='./', SIGNATURE=ROOT+'1790622252250.png';
function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]})}
function getClasses(){return Array.isArray(window.DND_CLASSES_LIST)?window.DND_CLASSES_LIST:[]}
function isExtraClass(name){return ['Оккультист','Ведьма','Некромант','Мученик','Сосуд','Шифтер','Аккурсд','Рунный хранитель','Савант','Иллирригер','Бистхарт','Пугилист','Кровавый охотник','Псионик','Военачальник','Страж','Заклинатель клинка'].indexOf(name)!==-1}
function classArt(name){var list=getClasses(),idx=-1;for(var i=0;i<list.length;i++)if(list[i].name===name){idx=i;break}return ROOT+(idx>=0?idx+1:1)+'.png'}
function fillSelect(id,items,placeholder){var el=document.getElementById(id);if(!el)return;el.innerHTML='<option value="">'+esc(placeholder)+'</option>';items.forEach(function(x){var o=document.createElement('option');o.value=x.value;o.textContent=x.label;el.appendChild(o)})}
function renderClassArt(){var name=document.getElementById('pc_class')?.value||'',img=document.getElementById('pc_classArt'),label=document.getElementById('pc_classLabel'),stage=document.getElementById('parchmentStage');if(label)label.textContent=name||'класс не указан';if(stage)stage.classList.toggle('is-extra',isExtraClass(name));if(img){img.src=classArt(name);img.onerror=function(){this.src=ROOT+'1.png'}}}
function initParchment(){
var classes=getClasses();fillSelect('pc_class',classes.map(function(c){return{value:c.name,label:c.name}}),'выбрать класс');
var races=typeof getAllRaces==='function'?getAllRaces():[];fillSelect('pc_race',races.map(function(r){return{value:r.id,label:r.name}}),'выбрать расу');
var bgs=typeof getAllBackgrounds==='function'?getAllBackgrounds():(Array.isArray(window.dndBackgrounds)?window.dndBackgrounds:[]);fillSelect('pc_background',bgs.map(function(b){var n=b.nameRu||b.name||'';return{value:n,label:n}}),'выбрать предысторию');
fillSelect('pc_gender',[{value:'мужчина',label:'мужчина'},{value:'женщина',label:'женщина'}],'выбрать пол');
var oldClass=document.getElementById('cc_class');if(oldClass&&oldClass.value)document.getElementById('pc_class').value=oldClass.value.split(' ')[0];
renderClassArt();document.getElementById('pc_class').onchange=renderClassArt;
}
function syncToClassic(){
var name=document.getElementById('pc_name').value.trim(),origin=document.getElementById('pc_origin').value.trim(),age=document.getElementById('pc_age').value.trim(),cls=document.getElementById('pc_class').value,gender=document.getElementById('pc_gender').value,race=document.getElementById('pc_race').value,bg=document.getElementById('pc_background').value;
window.__parchmentCharacterDraft={name:name,origin:origin,age:age,className:cls,gender:gender,raceId:race,background:bg,extra:isExtraClass(cls)};
function set(id,val){var e=document.getElementById(id);if(e)e.value=val;return e}
set('cc_name',name);set('cc_age',age);set('cc_race',race);set('cc_background',bg);var cs=set('cc_class',cls?cls+' 1':'');set('cc_gender',gender);set('cc_origin',origin);
if(cs&&typeof window.updateClassDescription==='function')window.updateClassDescription();if(typeof window.updateRaceDescription==='function')window.updateRaceDescription();if(typeof window.updateBackgroundDescription==='function')window.updateBackgroundDescription();
}
window.openParchmentCreation=function(){var a=document.getElementById('characterSelectScreen'),b=document.getElementById('characterCreationScreen'),c=document.getElementById('characterSheetScreen'),p=document.getElementById('parchmentCreationScreen');if(a)a.style.display='none';if(c)c.style.display='none';if(b)b.style.display='none';if(p){p.style.display='block';p.scrollTop=0;initParchment()}};
window.closeParchmentCreation=function(){var p=document.getElementById('parchmentCreationScreen');if(p)p.style.display='none';if(typeof window.showCharacterSelect==='function')window.showCharacterSelect()};
window.finishParchmentCreation=function(){
var name=document.getElementById('pc_name').value.trim(),cls=document.getElementById('pc_class').value,race=document.getElementById('pc_race').value,bg=document.getElementById('pc_background').value;
if(!name){alert('Разыскиваемый должен иметь имя.');return}if(!cls){alert('Необходимо указать класс.');return}if(!race){alert('Необходимо указать расу.');return}if(!bg){alert('Необходимо указать предысторию.');return}
syncToClassic();var p=document.getElementById('parchmentCreationScreen'),s=document.getElementById('parchmentSignatureLayer'),bo=document.getElementById('parchmentBlackout');if(p)p.style.display='none';if(s){s.classList.add('show');setTimeout(function(){s.classList.remove('show')},900)}setTimeout(function(){if(bo)bo.classList.add('show');setTimeout(function(){if(bo)bo.classList.remove('show');var classic=document.getElementById('characterCreationScreen');if(classic){classic.style.display='block';classic.scrollTop=0}},700)},700)
};
function hook(){if(typeof window.createNewCharacter!=='function'){setTimeout(hook,50);return}if(window.createNewCharacter.__parchmentHooked)return;
var original=window.createNewCharacter;var wrapped=function(){original.apply(this,arguments);window.openParchmentCreation()};wrapped.__parchmentHooked=true;window.createNewCharacter=wrapped;
var classic=document.getElementById('characterCreationScreen');if(classic&&!document.getElementById('cc_origin')){var o=document.createElement('input');o.type='hidden';o.id='cc_origin';classic.appendChild(o);var g=document.createElement('input');g.type='hidden';g.id='cc_gender';classic.appendChild(g)}
if(typeof window.saveNewCreatedCharacter==='function'&&!window.saveNewCreatedCharacter.__parchmentHooked){var oldSave=window.saveNewCreatedCharacter;var saveWrapped=function(){var draft=window.__parchmentCharacterDraft||{};oldSave.apply(this,arguments);if(Array.isArray(window.allCharacters)&&window.allCharacters.length){var c=window.allCharacters[window.allCharacters.length-1];if(c){c.origin=draft.origin||'';c.gender=draft.gender||'';c.creationDocument='parchment';c.wantedStatus=draft.extra?'dead_only':'alive_only';c.wantedReward=draft.extra?'30 золотых монет':'10 серебряных монет и кружка хорошего пива';if(typeof window.saveAllCharacters==='function')window.saveAllCharacters()}}};saveWrapped.__parchmentHooked=true;window.saveNewCreatedCharacter=saveWrapped}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',hook);else hook();
})();