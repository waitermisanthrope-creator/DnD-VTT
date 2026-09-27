/** First-launch guided tour + main-menu FAQ. Mobile-first, dependency-free. */
(function(g){
'use strict';
var FAQ=[
 ['Начало','Что это за приложение?','Это офлайн-ориентированный менеджер персонажей и VTT-инструментов для D&D. Здесь можно создать героя, вести характеристики, инвентарь, заклинания, черты, заметки, ремесла, бестиарий и боевые сцены. Проект рассчитан на WebView/Android, поэтому основные данные хранятся локально в браузерном хранилище устройства.'],
 ['Начало','Что делать после первого запуска?','Нажмите «Новый персонаж», выберите расу, класс и предысторию, распределите характеристики и сохраните героя. Если вы новичок, пошаговое обучение проведёт вас по главному меню. Обучение можно открыть повторно кнопкой «Обучение».'],
 ['D&D','Что такое D&D?','D&D — настольная ролевая игра: игроки описывают действия своих персонажей, а ведущий управляет миром и противниками. Когда результат не очевиден, правила используют броски кубиков и модификаторы характеристик.'],
 ['D&D','Что такое d20?','d20 — двадцатигранный кубик. Большинство проверок, атак и спасбросков используют d20: бросок + соответствующий модификатор + бонус мастерства, если персонаж владеет нужным навыком/инструментом.'],
 ['Персонаж','Что такое характеристики?','Сила, Ловкость, Телосложение, Интеллект, Мудрость и Харизма описывают базовые возможности героя. Их значение превращается в модификатор; чем выше характеристика, тем чаще она помогает в связанных действиях.'],
 ['Персонаж','Что такое раса/происхождение?','Раса определяет врождённые особенности, скорость, размеры и специальные черты. В проекте также есть предыстории, которые задают навыки, инструменты и сюжетную основу героя.'],
 ['Персонаж','Что такое класс?','Класс — основной набор боевых и приключенческих возможностей героя. Он определяет здоровье, ключевые способности, прогрессию уровней, владения и во многих случаях магию.'],
 ['Персонаж','Что такое подкласс?','Подкласс специализирует класс. Например, у Kibbles-классов выбор Presence/Bond/Technique задаёт уникальный стиль игры и открывает дополнительные способности на определённых уровнях.'],
 ['Персонаж','Можно ли сделать необычный класс?','Да. В проекте расширенный слой Kibbles позволяет экспериментировать с Псиоником, Военачальником, Стражем и Заклинателем клинка. Их исходные названия/ID сохранены для совместимости, но игроку они показываются по-русски.'],
 ['Kibbles','Какие классы Kibbles добавлены?','Псионик — гибкая псионика; Военачальник — командование группой; Страж — танк и контроль через первобытные силы; Заклинатель клинка — полубоец, связывающий магию и оружие через Spellstrike.'],
 ['Kibbles','Откуда взяты способности?','Структура классов сверялась с публичными материалами KibblesTasty и открытыми структурированными источниками. Для Warlord, Warden и Spellblade автор отдельно указывает Kibbles Reference Document/бесплатный контент; для Psion использован публичный справочный источник класса. В приложение не встраивается целиком текст платных книг.'],
 ['Kibbles','Можно ли менять выборы?','Да, где правила класса предусматривают выбор, проект хранит его как отдельный выбор персонажа. Для Стража особенно важны первобытные проявления: это набор модульных опций, которые позволяют собирать разные версии одного класса.'],
 ['Уровни','Что происходит при повышении уровня?','Движок обновляет уровень класса, применяет прогрессию, открывает способности и, если положено, предлагает подкласс, улучшение характеристик/черту или другой выбор. Для мультикласса новый класс проверяется по требованиям характеристик.'],
 ['Мультикласс','Как работает мультикласс?','Можно сочетать классы, если выполнены их требования. Для Kibbles: Псионик требует Интеллект 13; Военачальник — Сила 13 и Харизма 13; Страж — Сила 13 и Мудрость 13; Заклинатель клинка — Ловкость 13 и Интеллект 13.'],
 ['Черты','Что такое черты?','Черта — отдельная способность персонажа, которую в соответствующих точках прогрессии можно выбрать вместо обычного повышения характеристик, если это разрешено правилами вашей игры. Движок содержит каталог черт и runtime-механику для ряда эффектов.'],
 ['Бой','Как проходит бой?','Вы выбираете сцену/цель, действие, бросок атаки или спасбросок. Боевой движок учитывает AC, сопротивления, уязвимости, иммунитеты, урон, эффекты и ресурсы способностей. На мобильном устройстве управление рассчитано на touch/pointer.'],
 ['Магия','Как работают заклинания?','Заклинания имеют уровень, дальность, время накладывания, компоненты и эффект. Ресурсы восстанавливаются по правилам соответствующего класса. Для мультикласса движок учитывает источники магии и ячейки.'],
 ['Инвентарь','Как пользоваться инвентарём?','Предметы можно добавлять, удалять, экипировать и размещать по контейнерам. Вес, броня, владение и валюта учитываются отдельно. Контейнеры позволяют моделировать сумки, сундуки и другие вложенные структуры.'],
 ['Заметки','Можно ли хранить сюжетные записи?','Да. Заметки предназначены для квестов, NPC, подсказок и личных записей. Текст проходит экранирование перед выводом, чтобы пользовательский ввод не превращался в HTML.'],
 ['Библиотека','Что есть в библиотеке?','Библиотека объединяет справочные материалы приложения: правила, заклинания, черты, классы, подклассы, бестиарий и расширения. Конкретный набор зависит от подключённых модулей проекта.'],
 ['Ремесло','Есть ли профессии и крафт?','Да. В проекте есть профессии, опыт профессий, специализации, рецепты, ресурсы, алхимия и расширенные системы крафта. Некоторые системы являются авторскими расширениями и могут включаться отдельно.'],
 ['Данные','Где хранятся персонажи?','Основные данные сохраняются локально в хранилище приложения/браузера. Для переноса между устройствами используйте экспорт резервной копии. Перед очисткой WebView или переустановкой APK сделайте экспорт.'],
 ['Данные','Как сделать резервную копию?','Откройте «Настройки» → раздел резервного копирования → «Сохранить». Для восстановления используйте «Загрузить». После восстановления рекомендуется перезапустить экран персонажей.'],
 ['Мобильная версия','Будет ли это работать в APK?','Проект использует относительные локальные пути и рассчитан на WebView/Capacitor-подобную упаковку. После сборки APK особенно важно проверять регистр имён файлов, touch-события, локальное хранилище и импорт/экспорт файлов.'],
 ['Отладка','Где режим разработчика?','В «Настройки» можно включить режим отладки. В обычном запуске отладочные элементы скрыты; это сделано, чтобы production-сборка не вызывала отсутствующие debug-функции.'],
 ['Помощь','Как повторить обучение?','На главном экране нажмите «Обучение». Первый запуск определяется локальным флагом. Кнопка позволяет пройти тур повторно после сброса или обновления интерфейса.'],
 ['Источники','Где смотреть первоисточники Kibbles?','В FAQ указан сайт KibblesTasty и раздел Kibbles Reference Document. Там же размещены сведения о свободном контенте и актуальных версиях. Ссылки открываются во внешнем браузере устройства.']
];
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]);});}
function openFaq(){var m=document.getElementById('dndFaqModal');if(!m)return;m.style.display='flex';var inp=document.getElementById('dndFaqSearch');if(inp){inp.value='';inp.focus();}renderFaq('');}
g.openDndFaq=openFaq;
function closeFaq(){var m=document.getElementById('dndFaqModal');if(m)m.style.display='none';}
g.closeDndFaq=closeFaq;
function renderFaq(q){var root=document.getElementById('dndFaqBody');if(!root)return;q=(q||'').trim().toLowerCase();var groups={};FAQ.forEach(function(x){if(q && x.join(' ').toLowerCase().indexOf(q)<0)return;(groups[x[0]]=groups[x[0]]||[]).push(x);});root.innerHTML=Object.keys(groups).map(function(cat){return '<section class="dnd-faq-section"><h3>'+esc(cat)+'</h3>'+groups[cat].map(function(x){return '<h4>'+esc(x[1])+'</h4><p>'+esc(x[2])+'</p>';}).join('')+'</section>';}).join('') || '<div class="dnd-faq-section"><h3>Ничего не найдено</h3><p>Попробуйте другой запрос.</p></div>';}
function addMainButtons(){var screen=document.getElementById('characterSelectScreen');if(!screen||document.getElementById('dndFaqButton'))return;var faq=document.createElement('button');faq.id='dndFaqButton';faq.className='dnd-main-faq';faq.textContent='📖 FAQ';faq.onclick=openFaq;screen.appendChild(faq);var help=document.createElement('button');help.id='dndHelpButton';help.className='dnd-main-help';help.textContent='➡️ Обучение';help.onclick=function(){startTour(true);};screen.appendChild(help);}
function buildFaq(){if(document.getElementById('dndFaqModal'))return;var m=document.createElement('div');m.id='dndFaqModal';m.innerHTML='<div class="dnd-faq-card"><div class="dnd-faq-head"><h2>📖 FAQ — D&D VTT / менеджер персонажей</h2><button class="dnd-faq-close" onclick="closeDndFaq()">✕</button></div><div class="dnd-faq-tools"><input id="dndFaqSearch" placeholder="Поиск по FAQ…" oninput="window._dndFaqRender(this.value)"><button onclick="document.getElementById(\'dndFaqSearch\').value=\'\';window._dndFaqRender(\'\')">Сбросить</button></div><div class="dnd-faq-body" id="dndFaqBody"></div></div>';m.addEventListener('click',function(e){if(e.target===m)closeFaq();});document.body.appendChild(m);g._dndFaqRender=renderFaq;renderFaq('');}
var steps=[
 ['Добро пожаловать','Это короткая экскурсия по приложению. Нажимайте «Далее», а стрелка покажет, куда смотреть.',''],
 ['Список персонажей','Здесь появятся ваши герои. Можно создать несколько персонажей и переключаться между ними.','#characterList'],
 ['Создание героя','Начните с этой кнопки. Далее приложение проведёт вас через имя, расу, класс, предысторию и характеристики.','button[onclick*="createNewCharacter"]'],
 ['Настройки','Здесь находятся тема, шрифт, обои, аудио, резервные копии и режим отладки.','#characterSelectScreen button[onclick*="openSettingsModal"]'],
 ['Онлайн/сетевая игра','Эта кнопка открывает сетевой режим и показывает текущий статус соединения.','#characterSelectScreen button[onclick*="openDndNetworkModal"]'],
 ['FAQ','В FAQ собраны базовые правила D&D, описание функций приложения, резервные копии, мобильная сборка и информация о расширенных классах.','#dndFaqButton'],
 ['Готово','Теперь можно создать первого героя. Если вы забудете что-то, откройте FAQ или повторите обучение.','']
];
var idx=0,focusEl=null;
function clearTour(){var o=document.getElementById('dndOnboardingOverlay');if(!o)return;var f=o.querySelector('.dnd-ob-focus');if(f)f.remove();var a=o.querySelector('.dnd-ob-arrow');if(a)a.remove();}
function positionTour(){var o=document.getElementById('dndOnboardingOverlay');if(!o)return;clearTour();var sel=steps[idx][2],el=sel?document.querySelector(sel):null;focusEl=el;if(!el)return;var r=el.getBoundingClientRect();var f=document.createElement('div');f.className='dnd-ob-focus';f.style.left=Math.max(4,r.left-5)+'px';f.style.top=Math.max(4,r.top-5)+'px';f.style.width=Math.max(20,r.width+10)+'px';f.style.height=Math.max(20,r.height+10)+'px';o.appendChild(f);var card=o.querySelector('.dnd-ob-card');if(!card)return;var cr=card.getBoundingClientRect();var x=Math.min(window.innerWidth-cr.width-10,Math.max(10,r.left));var y=r.bottom+16;if(y+cr.height>window.innerHeight-10)y=Math.max(10,r.top-cr.height-16);card.style.left=x+'px';card.style.top=y+'px';var ar=document.createElement('div');ar.className='dnd-ob-arrow';ar.style.left=Math.max(10,Math.min(window.innerWidth-30,r.left+r.width/2-13))+'px';ar.style.top=(y>r.bottom?r.bottom+1:Math.max(4,r.top-20))+'px';if(y<=r.top)ar.style.transform='rotate(180deg)';o.appendChild(ar);}
function renderTour(){var o=document.getElementById('dndOnboardingOverlay');if(!o)return;var s=steps[idx];o.querySelector('.dnd-ob-title').textContent=s[0];o.querySelector('.dnd-ob-text').textContent=s[1];o.querySelector('.dnd-ob-count').textContent=(idx+1)+' / '+steps.length;o.querySelector('.dnd-ob-back').style.display=idx?'inline-block':'none';o.querySelector('.dnd-ob-next').textContent=idx===steps.length-1?'Завершить':'Далее';positionTour();}
function startTour(force){if(!force && localStorage.getItem('dnd_v71_onboarding_done')==='1')return;idx=0;var o=document.getElementById('dndOnboardingOverlay');if(!o)return;o.style.display='block';renderTour();window.addEventListener('resize',positionTour);}
g.startDndOnboarding=function(){startTour(true);};
function finishTour(){var o=document.getElementById('dndOnboardingOverlay');if(o)o.style.display='none';localStorage.setItem('dnd_v71_onboarding_done','1');window.removeEventListener('resize',positionTour);}
function buildTour(){if(document.getElementById('dndOnboardingOverlay'))return;var o=document.createElement('div');o.id='dndOnboardingOverlay';o.innerHTML='<div class="dnd-ob-dim"></div><div class="dnd-ob-card"><div class="dnd-ob-count" style="font-size:.72rem;color:#aaa;margin-bottom:5px"></div><h2 class="dnd-ob-title"></h2><p class="dnd-ob-text"></p><div class="dnd-ob-actions"><button class="dnd-ob-back" onclick="window._dndTourBack()">Назад</button><button onclick="window._dndTourSkip()">Пропустить</button><button class="primary dnd-ob-next" onclick="window._dndTourNext()">Далее</button></div></div>';document.body.appendChild(o);g._dndTourNext=function(){if(idx>=steps.length-1)finishTour();else{idx++;renderTour();}};g._dndTourBack=function(){if(idx>0){idx--;renderTour();}};g._dndTourSkip=finishTour;}
function init(){
  buildFaq();
  buildTour();
  addMainButtons();

  // Обучение стартует только после полного завершения заставки.
  // Раньше таймер 700 мс запускал тур прямо поверх красивой картинки.
  var launchTour = function () {
    setTimeout(function () { startTour(false); }, 120);
  };
  if (g.dndSplashFinished === true) {
    launchTour();
  } else {
    g.addEventListener('dnd:splash-complete', launchTour, { once: true });
  }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})(window);
