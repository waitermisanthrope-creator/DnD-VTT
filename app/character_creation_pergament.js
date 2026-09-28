/* Пергаментное создание персонажа: этап 1 + переход к существующему механическому созданию. */
(function(){
'use strict';
var ROOT='./', SIGNATURE=ROOT+'1790622252250.png';
// Временные маршруты листов: classic = обычный персонаж, extra = экстра.
// Если будущий отдельный файл/лист ещё отсутствует, используется встроенная заглушка,
// чтобы можно было полностью проверить выбор типа и создание персонажа уже сейчас.
var CHARACTER_CREATION_MODE = null;
var EXTRA_SHEET_STUB = 'extra';
function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]})}
function getClasses(){return Array.isArray(window.DND_CLASSES_LIST)?window.DND_CLASSES_LIST:[]}
function isExtraClass(name){return ['Оккультист','Ведьма','Некромант','Мученик','Сосуд','Шифтер','Аккурсд','Рунный хранитель','Савант','Иллирригер','Бистхарт','Пугилист','Кровавый охотник','Псионик','Военачальник','Страж','Заклинатель клинка'].indexOf(name)!==-1}
function classArt(name){var list=getClasses(),idx=-1;for(var i=0;i<list.length;i++)if(list[i].name===name){idx=i;break}return ROOT+(idx>=0?idx+1:1)+'.png'}
function fillSelect(id,items,placeholder){var el=document.getElementById(id);if(!el)return;el.innerHTML='<option value="">'+esc(placeholder)+'</option>';items.forEach(function(x){var o=document.createElement('option');o.value=x.value;o.textContent=x.label;el.appendChild(o)})}
function renderClassArt(){var name=document.getElementById('pc_class')?.value||'',img=document.getElementById('pc_classArt'),label=document.getElementById('pc_classLabel'),stage=document.getElementById('parchmentStage'),extra=isExtraClass(name);if(label)label.textContent=name||'класс не указан';if(stage)stage.classList.toggle('is-extra',extra);var title=document.getElementById('pcTitle'),warn=document.getElementById('pcWarning'),reward=document.getElementById('pcReward'),tax=document.getElementById('pcTax'),sub=document.getElementById('pcSubtitle');if(title)title.textContent=extra?'ЛИСТ ЛИКВИДАЦИИ':'РОЗЫСКНОЙ ЛИСТ';if(sub)sub.textContent=extra?'Разыскивается исключительно мёртвым. Любая попытка задержания живым считается нарушением приказа гарнизона.':'По подозрению в неуплате налогов, славному городу Енотовиллю, для допроса разыскивается гуманоид';if(tax)tax.style.display=extra?'none':'';if(warn)warn.innerHTML=extra?'ОСОБАЯ ПРИМЕТА И ПРИЧИНА РОЗЫСКА: <span id="pc_extraReason">[описание будет добавлено]</span>':'СТЫД ТЕБЕ, ПРОЧИТАВШИЙ ЭТО, РОЗЫСКИВАЕМЫЙ <span id="pc_professionText">—</span>.';if(reward)reward.innerHTML=extra?'Доставить исключительно мёртвым.<br>Награда <strong>30 золотых монет</strong>.':'Доставить исключительно живым и с кошельком.<br>Награда 10 серебряных монет и кружка хорошего пива.';var sign=document.getElementById('pc_signButton');if(sign)sign.innerHTML=(extra?'подтвердить розыск':'расписаться')+'<span class="parchment-sign-hint">завершить создание</span>';if(img){img.src=classArt(name);img.onerror=function(){this.src=ROOT+'1.png'}}}
function initParchment(){
var classes=getClasses();fillSelect('pc_class',classes.map(function(c){return{value:c.name,label:c.name}}),'выбрать класс');
var races=typeof getAllRaces==='function'?getAllRaces():[];fillSelect('pc_race',races.map(function(r){return{value:r.id,label:r.name}}),'выбрать расу');
var bgs=typeof getAllBackgrounds==='function'?getAllBackgrounds():(Array.isArray(window.dndBackgrounds)?window.dndBackgrounds:[]);fillSelect('pc_background',bgs.map(function(b){var n=b.nameRu||b.name||'';return{value:n,label:n}}),'выбрать предысторию');
fillSelect('pc_gender',[{value:'мужчина',label:'мужчина'},{value:'женщина',label:'женщина'}],'выбрать пол');
var pids=window.DND_CRAFT_PROFESSION_PROGRESS&&typeof window.DND_CRAFT_PROFESSION_PROGRESS.professionIds==='function'?window.DND_CRAFT_PROFESSION_PROGRESS.professionIds():[];fillSelect('pc_profession',pids.map(function(id){return{value:id,label:typeof window.DND_CRAFT_PROFESSION_PROGRESS.professionLabel==='function'?window.DND_CRAFT_PROFESSION_PROGRESS.professionLabel(id):id}}),'выбрать профессию');
var oldClass=document.getElementById('cc_class');if(oldClass&&oldClass.value)document.getElementById('pc_class').value=oldClass.value.split(' ')[0];
renderClassArt();document.getElementById('pc_class').onchange=renderClassArt;
}
function syncToClassic(){
var name=document.getElementById('pc_name').value.trim(),origin=document.getElementById('pc_origin').value.trim(),age=document.getElementById('pc_age').value.trim(),cls=document.getElementById('pc_class').value,gender=document.getElementById('pc_gender').value,race=document.getElementById('pc_race').value,bg=document.getElementById('pc_background').value,profession=document.getElementById('pc_profession')?.value||'';
window.__parchmentCharacterDraft={name:name,origin:origin,age:age,className:cls,gender:gender,raceId:race,background:bg,profession:profession,extra:isExtraClass(cls)};
function set(id,val){var e=document.getElementById(id);if(e)e.value=val;return e}
set('cc_name',name);set('cc_age',age);set('cc_race',race);set('cc_background',bg);set('cc_profession',profession);var cs=set('cc_class',cls?cls+' 1':'');set('cc_gender',gender);set('cc_origin',origin);
if(cs&&typeof window.updateClassDescription==='function')window.updateClassDescription();if(typeof window.updateRaceDescription==='function')window.updateRaceDescription();if(typeof window.updateBackgroundDescription==='function')window.updateBackgroundDescription();var pt=document.getElementById('pc_professionText');if(pt){var ps=window.DND_CRAFT_PROFESSION_PROGRESS;if(profession&&ps&&typeof ps.professionLabel==='function')pt.textContent=ps.professionLabel(profession);else pt.textContent='без профессии';}
}
function ensureCreationTypeChooser(){
var old=document.getElementById('characterCreationTypeChooser');
if(old)return old;
var modal=document.createElement('div');
modal.id='characterCreationTypeChooser';
modal.style.cssText='display:none;position:fixed;inset:0;z-index:90000;background:rgba(0,0,0,.92);align-items:center;justify-content:center;padding:20px;box-sizing:border-box;';
modal.innerHTML='<div style="width:100%;max-width:430px;background:#171717;border:1px solid #66552b;border-radius:14px;padding:22px;color:#fff;box-shadow:0 15px 45px rgba(0,0,0,.7);text-align:center;">'+
'<div style="font-size:42px;margin-bottom:8px;">📜</div>'+
'<h2 style="margin:0 0 8px;color:#d4af37;">Какого персонажа создаём?</h2>'+
'<p style="color:#aaa;line-height:1.45;margin:0 0 20px;">Выберите тип листа. Это решение определит, в какой редактор будет отправлен персонаж.</p>'+
'<div style="display:grid;gap:12px;">'+
'<button id="ccTypeClassic" class="btn-action" style="padding:16px;background:#4caf50;font-size:1.05em;font-weight:bold;">🧙 Обычный персонаж<div style="font-size:.78em;font-weight:normal;margin-top:5px;opacity:.85;">Стандартный лист и обычная подпись</div></button>'+
'<button id="ccTypeExtra" class="btn-action" style="padding:16px;background:#8b1e1e;font-size:1.05em;font-weight:bold;">☠️ Экстра<div style="font-size:.78em;font-weight:normal;margin-top:5px;opacity:.85;">Особый лист — пока временная заглушка</div></button>'+
'<button id="ccTypeCancel" class="btn-action" style="padding:11px;background:#444;">Отмена</button>'+
'</div></div>';
document.body.appendChild(modal);
modal.querySelector('#ccTypeClassic').onclick=function(){modal.style.display='none';CHARACTER_CREATION_MODE='classic';openClassicCreationSheet()};
modal.querySelector('#ccTypeExtra').onclick=function(){modal.style.display='none';CHARACTER_CREATION_MODE='extra';openExtraCreationStub()};
modal.querySelector('#ccTypeCancel').onclick=function(){modal.style.display='none';if(typeof window.showCharacterSelect==='function')window.showCharacterSelect()};
return modal;
}
function openClassicCreationSheet(){
var a=document.getElementById('characterSelectScreen'),b=document.getElementById('characterCreationScreen'),c=document.getElementById('characterSheetScreen'),p=document.getElementById('parchmentCreationScreen'),x=document.getElementById('extraCharacterCreationStub');
if(a)a.style.display='none';if(c)c.style.display='none';if(x)x.style.display='none';if(b)b.style.display='none';
if(p){p.style.display='block';p.scrollTop=0;initParchment()}
}
function openExtraCreationStub(){
var a=document.getElementById('characterSelectScreen'),b=document.getElementById('characterCreationScreen'),c=document.getElementById('characterSheetScreen'),p=document.getElementById('parchmentCreationScreen');
if(a)a.style.display='none';if(c)c.style.display='none';if(p)p.style.display='none';if(b)b.style.display='none';
var x=document.getElementById('extraCharacterCreationStub');
if(!x){
x=document.createElement('div');x.id='extraCharacterCreationStub';x.style.cssText='display:block;position:fixed;inset:0;z-index:80000;background:#111;color:#fff;overflow:auto;padding:20px;box-sizing:border-box;';
x.innerHTML='<div style="max-width:620px;margin:0 auto;padding:20px;background:#1b1b1b;border:1px solid #6d2b2b;border-radius:14px;">'+
'<div style="font-size:44px;text-align:center;">☠️</div>'+
'<h2 style="color:#e05a5a;text-align:center;margin:8px 0;">ЭКСТРА — ВРЕМЕННЫЙ ЛИСТ</h2>'+
'<p style="color:#aaa;line-height:1.5;text-align:center;">Отдельный лист «Экстра» ещё находится в разработке. Эта заглушка нужна только для проверки маршрутизации создания персонажей.</p>'+
'<div style="background:#241818;border:1px solid #5a2929;border-radius:8px;padding:12px;margin:16px 0;color:#ddd;">'+
'<strong>Маршрут подтверждён.</strong><br>Вы выбрали тип: <b>Экстра</b>. Будущий файл листа можно подключить сюда без изменения главного меню.</div>'+
'<label>Имя персонажа</label><input id="extraStubName" type="text" style="width:100%;box-sizing:border-box;padding:11px;margin:6px 0 12px;background:#222;color:#fff;border:1px solid #555;border-radius:6px;">'+
'<label>Класс</label><select id="extraStubClass" style="width:100%;box-sizing:border-box;padding:11px;margin:6px 0 12px;background:#222;color:#fff;border:1px solid #555;border-radius:6px;"></select>'+
'<div style="display:grid;grid-template-columns:1fr 1fr;gap:9px;"><button class="btn-action" id="extraStubContinue" style="background:#8b1e1e;padding:12px;">Продолжить создание</button><button class="btn-action" id="extraStubBack" style="background:#444;padding:12px;">Назад</button></div>'+
'</div>';
document.body.appendChild(x);
var sel=x.querySelector('#extraStubClass');getClasses().forEach(function(cl){var o=document.createElement('option');o.value=cl.name;o.textContent=cl.name;sel.appendChild(o)});
x.querySelector('#extraStubBack').onclick=function(){x.style.display='none';ensureCreationTypeChooser().style.display='flex'};
x.querySelector('#extraStubContinue').onclick=function(){
var name=x.querySelector('#extraStubName').value.trim(),cls=sel.value;
if(!name){alert('Укажите имя персонажа.');return}
if(!cls){alert('Выберите класс.');return}
var pc=document.getElementById('parchmentCreationScreen');
x.style.display='none';
if(pc){pc.style.display='block';initParchment();var pn=document.getElementById('pc_name'),pcn=document.getElementById('pc_class');if(pn)pn.value=name;if(pcn){pcn.value=cls;renderClassArt()}}
};
}
x.style.display='block';
}
window.openParchmentCreation=function(){
var chooser=ensureCreationTypeChooser();
chooser.style.display='flex';
};
window.closeParchmentCreation=function(){var p=document.getElementById('parchmentCreationScreen');if(p)p.style.display='none';if(typeof window.showCharacterSelect==='function')window.showCharacterSelect()};
window.finishParchmentCreation=function(){
if(CHARACTER_CREATION_MODE==='extra'){
var stub=document.getElementById('extraCharacterCreationStub');if(stub)stub.style.display='none';
}

var name=document.getElementById('pc_name').value.trim(),cls=document.getElementById('pc_class').value,race=document.getElementById('pc_race').value,bg=document.getElementById('pc_background').value;
if(!name){alert('Разыскиваемый должен иметь имя.');return}if(!cls){alert('Необходимо указать класс.');return}if(!race){alert('Необходимо указать расу.');return}if(!bg){alert('Необходимо указать предысторию.');return}
syncToClassic();var p=document.getElementById('parchmentCreationScreen'),s=document.getElementById('parchmentSignatureLayer'),bo=document.getElementById('parchmentBlackout');if(p)p.style.display='none';if(s){s.classList.add('show');setTimeout(function(){s.classList.remove('show')},900)}setTimeout(function(){if(bo)bo.classList.add('show');setTimeout(function(){if(bo)bo.classList.remove('show');var classic=document.getElementById('characterCreationScreen');if(classic){classic.style.display='block';classic.scrollTop=0}},700)},700)
};
function hook(){if(typeof window.createNewCharacter!=='function'){setTimeout(hook,50);return}if(window.createNewCharacter.__parchmentHooked)return;
var original=window.createNewCharacter;var wrapped=function(){original.apply(this,arguments);window.openParchmentCreation()};wrapped.__parchmentHooked=true;window.createNewCharacter=wrapped;
var classic=document.getElementById('characterCreationScreen');if(classic&&!document.getElementById('cc_origin')){var o=document.createElement('input');o.type='hidden';o.id='cc_origin';classic.appendChild(o);var g=document.createElement('input');g.type='hidden';g.id='cc_gender';classic.appendChild(g)}
if(typeof window.saveNewCreatedCharacter==='function'&&!window.saveNewCreatedCharacter.__parchmentHooked){var oldSave=window.saveNewCreatedCharacter;var saveWrapped=function(){var draft=window.__parchmentCharacterDraft||{};oldSave.apply(this,arguments);if(Array.isArray(window.allCharacters)&&window.allCharacters.length){var c=window.allCharacters[window.allCharacters.length-1];if(c){c.origin=draft.origin||'';c.gender=draft.gender||'';c.creationDocument=CHARACTER_CREATION_MODE==='extra'?'extra-stub':'parchment';c.creationMode=CHARACTER_CREATION_MODE||'classic';c.wantedStatus=(CHARACTER_CREATION_MODE==='extra'||draft.extra)?'dead_only':'alive_only';c.wantedReward=draft.extra?'30 золотых монет':'10 серебряных монет и кружка хорошего пива';if(typeof window.saveAllCharacters==='function')window.saveAllCharacters()}}};saveWrapped.__parchmentHooked=true;window.saveNewCreatedCharacter=saveWrapped}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',hook);else hook();
})();