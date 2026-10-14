/** Local owner-only deck panel for stage-one Predictor. Uses DNDPredictor and
 * autoSaveCurrentCharacter; holds no separate character/deck state. Effects are
 * intentionally unavailable. Opened via DNDPredictorUI.open from the class sheet.
 * Network sessions are blocked until private hand transport is implemented.
 */
(function(g){
  'use strict';
  var panel=null,openedHero=null;
  function networkActive(){return !!(g.dndNetwork&&g.dndNetwork.state&&g.dndNetwork.state.connected);}
  function button(parent,text,fn,disabled){var b=document.createElement('button');b.type='button';b.className='btn-action';b.textContent=text;b.style.cssText='min-height:44px;margin:4px;';b.disabled=!!disabled;b.onclick=fn;parent.appendChild(b);}
  function paragraph(text){var p=document.createElement('p');p.textContent=text;panel.appendChild(p);}
  function close(){if(panel)panel.remove();panel=null;openedHero=null;}
  function save(){if(typeof g.autoSaveCurrentCharacter!=='function')throw Error('Сохранение профиля недоступно.');g.autoSaveCurrentCharacter();}
  function change(fn){if(openedHero!==g.currentChar||networkActive()){close();return;}var r=fn();if(!r.ok){g.alert(r.reason);return;}save();render();}
  function render(){
    if(!panel||openedHero!==g.currentChar){close();return;}panel.replaceChildren();button(panel,'Закрыть',close);
    var a=g.DNDPredictor,h=openedHero,r=a.inspect(h);if(!r.ok){paragraph(r.reason);return;}
    var s=r.state;paragraph('Предсказатель — колоды. Эффекты карт пока недоступны.');
    paragraph('Рука: '+s.hand.length+' / '+(r.capacity===null?'выберите подкласс':r.capacity)+'. Ресурс Старших: '+r.majorCurrent+' / '+r.majorMax+'.');
    paragraph('В колодах: '+s.decks.minor.length+' Младших, '+s.decks.major.length+' Старших (включая ещё не открытые). В сбросе: '+(s.discard.minor.length+s.discard.major.length)+'.');
    var names={};a.cards.forEach(function(c){names[c.id]=c.name;});
    if(s.blind){paragraph('Обязательная слепая карта: '+names[s.blind.card]+'. Результат сохранён. Исполнение ожидает утверждённого обработчика эффекта.');return;}
    if(!s.hand.length)paragraph('Рука пока пуста.');s.hand.forEach(function(id){paragraph(names[id]);});
    if(s.offer){paragraph('Выберите карту. Невыбранная вернётся в колоду, которая перемешается.');s.offer.cards.forEach(function(id){button(panel,names[id],function(){change(function(){return a.choose(h,id);});});});return;}
    if(!s.window){button(panel,'Заполнить стартовую руку',function(){change(function(){return a.beginInitial(h);});},r.capacity===null);return;}
    paragraph('Осталось добора: '+s.window.remaining+'. После отдыха выбирайте колоду для каждого места.');
    var mode=a.rules.choiceMode;if(!mode){paragraph('Способ открытого добора ещё уточняется. Получение новых карт временно недоступно.');return;}
    ['minor','major'].forEach(function(deck){button(panel,deck==='minor'?'Добрать Младшую':'Добрать Старшую',function(){change(function(){return mode==='always'||(mode==='initial'&&s.window.kind==='initial')?a.offer(h,deck):a.draw(h,deck);});},r.capacity===null||s.hand.length>=r.capacity||s.window.remaining<1);});
  }
  function open(){
    close();if(networkActive()){g.alert('Первый этап доступен вне сетевой сессии: приватная передача руки ещё не реализована.');return;}
    var h=g.currentChar,a=g.DNDPredictor;if(!h||!a)return;var r=a.initialize(h);if(!r.ok){g.alert(r.reason);return;}openedHero=h;save();
    panel=document.createElement('section');panel.setAttribute('role','dialog');panel.setAttribute('aria-label','Колоды Предсказателя');panel.style.cssText='position:fixed;inset:4%;z-index:10020;background:#211f1b;color:#eee;padding:16px;overflow:auto;border:2px solid #a88c50;border-radius:12px;';document.body.appendChild(panel);render();
  }
  g.DNDPredictorUI={open:open,close:close,refresh:render};
  if(g.addEventListener)g.addEventListener('dnd-character-rendered',function(){if(panel)render();});
})(window);
