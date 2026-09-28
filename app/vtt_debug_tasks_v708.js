/* V70.25.68 — persistent QA task checklist for debug builds. */
(function(g){
  'use strict';

  var STORAGE_KEY='dnd_debug_tasks_v708';
  var TASKS=[
    ['debug','Debug / логи','Проверить: Debug Mode включается, все debug-кнопки появляются, Combat Log открывается и логи собираются.'],
    ['combat-overlay','Бой','Исправить: боевой overlay не должен перекрывать другие окна и модалки.'],
    ['network-active','Сеть','Исправить: network_gameplay.js — ошибка «active is not a function».'],
    ['proficiency','Владения','Проверить: взятие оружия в руку не вызывает Proficienciescheck.js / undefined.map; вернуть проверку владения оружием и бронёй.'],
    ['armor-ac','Броня','Исправить: экипированная броня должна корректно добавлять AC.'],
    ['weapon-stats','Оружие','Проверить: экипированное оружие корректно влияет на боевые показатели и владение.'],
    ['market','Рынок','Исправить: рынок не должен исчезать/появляться вместе с вкладкой «Оружие»; убрать дублирование монет из Market.'],
    ['junk-container','Хлам','Решить судьбу кнопки «Создать контейнер» во вкладке «Хлам»: восстановить понятное назначение или удалить мёртвую кнопку.'],
    ['weight','Вес','Исправить расчёт веса для всех типов пользовательских/кастомных предметов.'],
    ['dice-ui','Кубы','Разделить обычное окно бросков и технический боевой движок; DM-only инструменты не должны торчать обычному игроку.'],
    ['lore-notes','Лор','Добавить игрокам кнопку/механику принятия заметок, отправленных мастером.'],
    ['hero-readonly','Герой','Проверить: «Предыстория» read-only; добавить read-only «Профессия» под Расой/Предысторией.'],
    ['hero-saves','Герой','Проверить дублирование спасбросков в окне Героя и убрать только если они уже отображаются в другом месте.'],
    ['level-up','Level Up','Проверить: повышение текущего класса не требует условий мультикласса; мультикласс по-прежнему требует свои характеристики.'],
    ['classes-descriptions','Классы','Добавить полноценные красивые описания для всех классических и добавленных классов, включая ХБ.'],
    ['crafting','Крафт','Проверить панель крафта и переименовать «Материалы» в «Материалы и крафт».']
  ];

  function read(){
    try{
      var raw=localStorage.getItem(STORAGE_KEY);
      var obj=raw?JSON.parse(raw):{};
      return obj&&typeof obj==='object'?obj:{};
    }catch(e){return {};}
  }
  function write(obj){
    try{localStorage.setItem(STORAGE_KEY,JSON.stringify(obj));}catch(e){}
  }
  function open(){
    var m=document.getElementById('dndDebugTasksModal');
    if(!m){build();m=document.getElementById('dndDebugTasksModal');}
    if(!m)return;
    m.style.display='flex';
    render();
  }
  function close(){
    var m=document.getElementById('dndDebugTasksModal');
    if(m)m.style.display='none';
  }
  function render(){
    var root=document.getElementById('dndDebugTasksBody');
    var count=document.getElementById('dndDebugTasksCount');
    if(!root)return;
    var state=read();
    var done=0;
    root.innerHTML=TASKS.map(function(t){
      var checked=state[t[0]]===true;
      if(checked)done++;
      return '<label class="dnd-debug-task-row">'+
        '<input type="checkbox" data-task-id="'+esc(t[0])+'" '+(checked?'checked':'')+'>'+
        '<span><strong>'+esc(t[1])+'</strong><small>'+esc(t[2])+'</small></span>'+
      '</label>';
    }).join('');
    root.querySelectorAll('input[data-task-id]').forEach(function(input){
      input.addEventListener('change',function(){
        var s=read();s[this.getAttribute('data-task-id')]=this.checked;write(s);render();
      });
    });
    if(count)count.textContent=done+' / '+TASKS.length+' проверено';
  }
  function reset(){
    write({});
    render();
  }
  function build(){
    if(document.getElementById('dndDebugTasksModal'))return;
    var m=document.createElement('div');
    m.id='dndDebugTasksModal';
    m.style.cssText='display:none;position:fixed;inset:0;z-index:20030;background:rgba(0,0,0,.86);align-items:center;justify-content:center;padding:15px;box-sizing:border-box;';
    m.innerHTML='<div style="background:#1a1a1a;color:#fff;width:100%;max-width:620px;max-height:90vh;overflow:auto;border:1px solid #607d8b;border-radius:12px;padding:18px;box-sizing:border-box;box-shadow:0 18px 60px #000;">'+
      '<div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #444;padding-bottom:10px;margin-bottom:12px;">'+
        '<div><div style="color:#90caf9;font-size:.75em;text-transform:uppercase;letter-spacing:.08em;">V70.25.68 Debug</div><h3 style="margin:2px 0 0;">☑️ Задачи</h3></div>'+
        '<button onclick="dndV708Close()" style="background:#e53935;color:#fff;border:0;border-radius:6px;padding:6px 10px;font-weight:bold;">✕</button>'+
      '</div>'+
      '<div style="display:flex;justify-content:space-between;align-items:center;color:#aaa;font-size:.82em;margin-bottom:10px;"><span>Известные проблемы проекта</span><strong id="dndDebugTasksCount" style="color:#90caf9;"></strong></div>'+
      '<div id="dndDebugTasksBody" style="display:flex;flex-direction:column;gap:7px;"></div>'+
      '<div style="display:flex;gap:8px;margin-top:14px;">'+
        '<button onclick="dndV708Reset()" class="btn-action" style="flex:1;background:#4a3030;padding:9px;">↺ Сбросить галочки</button>'+
        '<button onclick="dndV708Close()" class="btn-action" style="flex:1;background:#444;padding:9px;">Закрыть</button>'+
      '</div>'+
    '</div>';
    document.body.appendChild(m);
    m.addEventListener('click',function(e){if(e.target===m)close();});
  }
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]);});}
  g.dndV708Open=open;
  g.dndV708Close=close;
  g.dndV708Reset=reset;
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);else build();
})(window);
