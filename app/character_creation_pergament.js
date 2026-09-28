/* Character creation parchment flow v2 — ordinary/extra sheets, progressive reveal, signature transition. */
(function(){
'use strict';
var ROOT='./';
var SIGNATURE=ROOT+'1790622252250.png';
var CHARACTER_CREATION_MODE=null;
var BYPASS_PARCHMENT_ONCE=false;
var CLASS_TOKEN_ART={
 'Иллирригер':'./app/data/classes/Illigger.jpg','Аккурсд':'./app/data/classes/accursed.jpg','Алхимик':'./app/data/classes/alchemist.jpg',
 'Бистхарт':'./app/data/classes/beasthart.jpg','Кровавый охотник':'./app/data/classes/blood hunter.jpg','Гайст':'./app/data/classes/geist.jpg',
 'Призрак':'./app/data/classes/geist.jpg','Мученик':'./app/data/classes/martyr.jpg','Некромант':'./app/data/classes/necromancer.jpg',
 'Оккультист':'./app/data/classes/occultist.jpg','Паразит':'./app/data/classes/parasite.jpg','Псионик':'./app/data/classes/psion.jpg',
 'Пугилист':'./app/data/classes/pugilist.jpg','Рунный хранитель':'./app/data/classes/rune keeper.jpg','Савант':'./app/data/classes/savant.jpg',
 'Шифтер':'./app/data/classes/shifter.jpg','Рой':'./app/data/classes/the swam.jpg','Сосуд':'./app/data/classes/vessel.jpg',
 'Страж':'./app/data/classes/warden.jpg','Военачальник':'./app/data/classes/warlord.jpg','Ведьма':'./app/data/classes/witch.jpg',
 'Изобретатель':'./app/data/classes/ARTIFICER.png','Варвар':'./app/data/classes/BARBARIAN.png','Бард':'./app/data/classes/Bard.png',
 'Жрец':'./app/data/classes/CLERIC.png','Друид':'./app/data/classes/DRUID.png','Воин':'./app/data/classes/FIGHTER.png','Монах':'./app/data/classes/Monk.png',
 'Паладин':'./app/data/classes/PALADIN.png','Следопыт':'./app/data/classes/RANGER.png','Плут':'./app/data/classes/Rogue.png','Чародей':'./app/data/classes/SORCERER.png','Колдун':'./app/data/classes/WARLOCK.png','Волшебник':'./app/data/classes/Wizard.png'
};
function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]})}
function el(id){return document.getElementById(id)}
function classes(){return Array.isArray(window.DND_CLASSES_LIST)?window.DND_CLASSES_LIST:[]}
function classArt(name){return CLASS_TOKEN_ART[name]||''}
function prepareTransparentToken(img){if(!img||!img.src||img.dataset.transparentReady==='1')return;img.dataset.transparentReady='1';var src=img.src,work=new Image();work.onload=function(){try{var c=document.createElement('canvas');c.width=work.naturalWidth||work.width;c.height=work.naturalHeight||work.height;var ctx=c.getContext('2d',{willReadFrequently:true});ctx.drawImage(work,0,0);var d=ctx.getImageData(0,0,c.width,c.height),p=d.data;for(var i=0;i<p.length;i+=4){var r=p[i],g=p[i+1],b=p[i+2],a=p[i+3],mx=Math.max(r,g,b),mn=Math.min(r,g,b);if(mx<48){p[i+3]=0;continue;}if(mx<90&&mx-mn<22)p[i+3]=Math.round(a*((mx-48)/42));}ctx.putImageData(d,0,0);img.src=c.toDataURL('image/png');img.classList.add('token-ready');}catch(e){img.classList.add('token-ready');}};work.onerror=function(){img.classList.remove('token-ready');};work.src=src;}
function setModeClass(){
 var stage=el('parchmentStage');if(!stage)return;
 stage.classList.toggle('is-extra',CHARACTER_CREATION_MODE==='extra');
 stage.classList.toggle('is-classic',CHARACTER_CREATION_MODE==='classic');
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
 var steps=[['pc_name',function(){return el('pc_name').value.trim().length>0}],['pc_origin',function(){return el('pc_origin').value.trim().length>0}],['pc_class',function(){return !!el('pc_class').value}],['pc_gender',function(){return !!el('pc_gender').value}],['pc_race',function(){return !!el('pc_race').value}],['pc_age',function(){return !!el('pc_age').value}],['pc_background',function(){return !!el('pc_background').value}],['pc_profession',function(){return !!el('pc_profession').value}]];
 function update(){
  var ok=true;
  steps.forEach(function(pair,i){
   var id=pair[0],valid=pair[1](),field=el(id);
   reveal(id,ok);
   if(field)field.disabled=!ok;
   if(ok && !valid)ok=false;
   if(field && field.tagName==='SELECT')fitSelect(field);
  });
  var sign=el('pc_signButton');if(sign)sign.disabled=!ok;
  renderClassArt();
 }
 steps.forEach(function(pair){
  var e=el(pair[0]);if(!e)return;
  e.addEventListener('input',update);e.addEventListener('change',update);
 });
 update();
}
function renderClassArt(){
 var name=el('pc_class')?.value||'',img=el('pc_classArt'),label=el('pc_classLabel');
 if(label)label.textContent=name||'';
 if(img){img.classList.remove('token-ready');var art=classArt(name);if(!art){img.removeAttribute('src');img.alt='Жетон появится после выбора класса';}else{img.src=art;img.alt='Жетон класса: '+name;img.onerror=function(){this.removeAttribute('src');this.classList.remove('token-ready');};img.onload=function(){prepareTransparentToken(this);};}}
 var title=el('pcTitle'),sub=el('pcSubtitle'),tax=el('pcTax'),warn=el('pcWarning'),reward=el('pcReward');
 var extra=CHARACTER_CREATION_MODE==='extra';
 if(title)title.textContent=extra?'ЛИСТ ЛИКВИДАЦИИ':'РОЗЫСКНОЙ ЛИСТ';
 if(sub)sub.textContent=extra?'Разыскивается исключительно мёртвым. Любая попытка задержания живым считается нарушением приказа гарнизона.':'По подозрению в неуплате налогов, славному городу Енотовиллю, для допроса разыскивается гуманоид';
 if(tax)tax.style.display=extra?'none':'';
 if(warn)warn.innerHTML=extra?'ОСОБАЯ ПРИМЕТА И ПРИЧИНА РОЗЫСКА: <span id="pc_extraReason">описание будет добавлено</span>':'СТЫД ТЕБЕ, ПРОЧИТАВШИЙ ЭТО, РОЗЫСКИВАЕМЫЙ <span id="pc_professionText">—</span>.';
 if(reward)reward.innerHTML=extra?'Доставить исключительно мёртвым.<br>Награда <strong>30 золотых монет</strong>.':'Доставить исключительно живым и с кошельком.<br>Награда 10 серебряных монет и кружка хорошего пива.';
 var sign=el('pc_signButton');if(sign)sign.innerHTML='расписаться<span class="parchment-sign-hint">закончить создание</span>';
}
function getProfessionItems(){
 var p=window.DND_CRAFT_PROFESSION_PROGRESS;
 if(p&&typeof p.professionIds==='function'){
  return p.professionIds().map(function(id){return{value:id,label:typeof p.professionLabel==='function'?p.professionLabel(id):id}});
 }
 var base=window.DND_CRAFT_PROFESSIONS_V38&&window.DND_CRAFT_PROFESSIONS_V38.PROFESSIONS;
 return base?Object.keys(base).map(function(id){return{value:id,label:base[id].name||id}}):[];
}
function initParchment(){
 setModeClass();
 var all=classes();
 var isExtra=CHARACTER_CREATION_MODE==='extra';
 var allowedExtra=['Рой','Призрак','Паразит'];
 var classItems=all.map(function(c){return{value:c.name,label:c.displayName||c.name}});
 if(isExtra){
  classItems=allowedExtra.map(function(n){return{value:n,label:n}});
 }
 fillSelect('pc_class',classItems,'выбрать класс');
 var races=typeof getAllRaces==='function'?getAllRaces():[];
 fillSelect('pc_race',races.map(function(r){return{value:r.id,label:r.name}}),'выбрать расу');
 var bgs=typeof getAllBackgrounds==='function'?getAllBackgrounds():(Array.isArray(window.dndBackgrounds)?window.dndBackgrounds:[]);
 fillSelect('pc_background',bgs.map(function(b){var n=b.nameRu||b.name||'';return{value:n,label:n}}),'выбрать предысторию');
 fillSelect('pc_gender',[{value:'мужчина',label:'мужчина'},{value:'женщина',label:'женщина'}],'выбрать пол');
 fillSelect('pc_profession',getProfessionItems(),'выбрать профессию');
 ['pc_class','pc_gender','pc_race','pc_background','pc_profession'].forEach(function(id){var e=el(id);if(e)e.addEventListener('change',function(){fitSelect(e);renderClassArt()})});
 setupProgression();
 renderClassArt();
}
function syncToClassic(){
 var name=el('pc_name').value.trim(),origin=el('pc_origin').value.trim(),age=el('pc_age').value.trim(),cls=el('pc_class').value,gender=el('pc_gender').value,race=el('pc_race').value,bg=el('pc_background').value,profession=el('pc_profession')?.value||'';
 window.__parchmentCharacterDraft={name:name,origin:origin,age:age,className:cls,gender:gender,raceId:race,background:bg,profession:profession,extra:CHARACTER_CREATION_MODE==='extra'};
 function set(id,val){var e=el(id);if(e)e.value=val}
 set('cc_name',name);set('cc_age',age);set('cc_race',race);set('cc_background',bg);set('cc_profession',profession);set('cc_class',(cls==='Призрак'?'Гайст':cls)+' 1');set('cc_gender',gender);set('cc_origin',origin);
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
 m.innerHTML='<div class="creation-type-card"><div class="creation-type-icon">📜</div><h2>Какого персонажа создаём?</h2><p>Сначала выберите тип листа.</p><button id="ccTypeClassic">Обычный персонаж</button><button id="ccTypeExtra">Экстра</button><button id="ccTypeCancel">Отмена</button></div>';
 document.body.appendChild(m);
 m.querySelector('#ccTypeClassic').onclick=function(){m.style.display='none';CHARACTER_CREATION_MODE='classic';openParchmentSheet()};
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
window.finishParchmentCreation=function(){
 var ids=['pc_name','pc_origin','pc_class','pc_gender','pc_race','pc_age','pc_background','pc_profession'];
 var missing=ids.some(function(id){var e=el(id);return !e||!String(e.value||'').trim()});
 if(missing){alert('Заполните все открытые поля по порядку.');return}
 syncToClassic();
 var p=el('parchmentCreationScreen'),s=el('parchmentSignatureLayer'),bo=el('parchmentBlackout');
 if(p)p.style.display='none';
 if(s){s.classList.remove('show');void s.offsetWidth;s.classList.add('show')}
 setTimeout(function(){
  if(bo){bo.classList.remove('show');void bo.offsetWidth;bo.classList.add('show')}
  setTimeout(function(){
   if(bo)bo.classList.remove('show');
   if(s)s.classList.remove('show');
   BYPASS_PARCHMENT_ONCE=true;
   var classic=el('characterCreationScreen');
   if(classic){classic.style.display='block';classic.scrollTop=0}
   if(typeof window.initCharacterCreationScreen==='function')window.initCharacterCreationScreen();
   syncToClassic();
  },650);
 },1200);
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
    if(c){c.origin=draft.origin||'';c.gender=draft.gender||'';c.creationDocument='parchment';c.creationMode=draft.extra?'extra':'classic';c.wantedStatus=draft.extra?'dead_only':'alive_only';c.wantedReward=draft.extra?'30 золотых монет':'10 серебряных монет и кружка хорошего пива';if(typeof window.saveAllCharacters==='function')window.saveAllCharacters();}
   }
  };
  sw.__parchmentHooked=true;window.saveNewCreatedCharacter=sw;
 }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',hook);else hook();
})();