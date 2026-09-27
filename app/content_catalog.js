/**
 * content_catalog.js
 * ------------------------------------------------------------------
 * ЧТО ЭТО ЗА ФАЙЛ:
 * Большой каталог вариантов персонажей и контент-паков. Показывает
 * игроку происхождение, статус, состав и источник контента и позволяет
 * включать/выключать установленные сторонние паки.
 *
 * КАК РАБОТАЕТ:
 * - объединяет Core-классы, runtime-паки DNDContent и метаданные
 *   DNDContentManifest;
 * - фильтрует по категории и статусу;
 * - для установленных паков показывает реальные подклассы;
 * - planned-паки отображаются как дорожная карта и не попадают в runtime.
 *
 * ОСНОВНЫЕ ПЕРЕМЕННЫЕ:
 * catalogState.search, catalogState.filter, catalogState.status,
 * CORE_CLASSES, DNDContent, DNDContentManifest.
 *
 * НЕ ИЗМЕНЯЕТ Wallpapers.js/Ambiences.js.
 * ------------------------------------------------------------------
 */
(function(global){
  'use strict';
  var CORE_CLASSES=[['Кровавый охотник','Third-party · Matt Mercer'],['Варвар','Core 5e'],['Бард','Core 5e'],['Воин','Core 5e'],['Волшебник','Core 5e'],['Друид','Core 5e'],['Жрец','Core 5e'],['Монах','Core 5e'],['Паладин','Core 5e'],['Плут','Core 5e'],['Следопыт','Core 5e'],['Чародей','Core 5e'],['Колдун','Core 5e'],['Изобретатель','Core 5e']];
  var catalogState={search:'',filter:'all',status:'all',expanded:null};
  var CATEGORY={official:'🏛️ Официальный',thirdparty:'✨ Сторонний',homebrew:'🧪 Homebrew',experimental:'🧬 Экспериментальный'};
  var STATUS={installed:'Установлен',planned:'В планах'};
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function manifest(){return global.DNDContentManifest&&DNDContentManifest.list?DNDContentManifest.list():[];}
  function allRows(){
    var rows=manifest().map(function(m){return {id:m.id,name:m.name,source:m.source,license:m.license,category:m.category,status:m.status,version:m.version,content:m.content||[],installed:m.status==='installed'};});
    var runtime={};
    if(global.DNDContent&&DNDContent.listAllClasses)DNDContent.listAllClasses().forEach(function(x){runtime[x.id]=x;});
    return rows.map(function(r){
      if(r.id==='core-5e-2014'){r.core=true;r.installed=true;r.status='installed';return r;}
      var hit=runtime[r.id];
      if(hit){r.installed=true;r.enabled=hit.enabled;r.runtimeName=hit.name;r.status='installed';}
      else if(r.status==='installed'){r.status='planned';r.installed=false;}
      return r;
    });
  }
  function filtered(){var q=catalogState.search.trim().toLowerCase();return allRows().filter(function(r){if(catalogState.filter!=='all'&&r.category!==catalogState.filter)return false;if(catalogState.status!=='all'&&r.status!==catalogState.status)return false;if(!q)return true;return (r.name+' '+r.source+' '+r.license+' '+(r.content||[]).join(' ')).toLowerCase().indexOf(q)>=0;});}
  function subclassesFor(r){if(!r.installed||!global.DNDContent||!DNDContent.getClass)return[];var p=DNDContent.getClass(r.runtimeName||r.name);return p&&p.subclasses?p.subclasses:[];}
  function render(){
    var box=document.getElementById('dndContentCatalogList');if(!box)return;
    var rows=filtered();
    if(!rows.length){box.innerHTML='<div class="cc-empty">Ничего не найдено. Попробуй другой запрос.</div>';updateSummary([]);return;}
    box.innerHTML=rows.map(function(r){
      var subs=subclassesFor(r),expanded=catalogState.expanded===r.id;
      var subHtml=subs.length?'<div class="cc-subs">'+subs.map(function(s){return '<span class="cc-sub">'+esc(s.name)+'</span>';}).join('')+'</div>':'';
      var toggle='';
      if(r.installed&&!r.core){toggle='<label class="cc-toggle" onclick="event.stopPropagation()"><input type="checkbox" '+(r.enabled?'checked':'')+' onchange="DNDContentCatalog.toggle(\''+esc(r.id)+'\',this.checked)"><span></span>'+ (r.enabled?'Включён':'Отключён')+'</label>';}
      var statusClass=r.status==='installed'?'cc-installed':'cc-planned';
      return '<div class="cc-card '+statusClass+' '+(!r.enabled&&r.installed&&!r.core?'cc-disabled':'')+'" onclick="DNDContentCatalog.expand(\''+esc(r.id)+'\')">'+
        '<div class="cc-top"><div><div class="cc-name">'+(r.core?'🏛️ ':'✨ ')+esc(r.name)+'</div><div class="cc-source">'+esc(r.source)+' · '+esc(CATEGORY[r.category]||r.category)+'</div></div><div class="cc-actions">'+toggle+'<span class="cc-status">'+esc(STATUS[r.status]||r.status)+'</span><span class="cc-chevron">'+(expanded?'▴':'▾')+'</span></div></div>'+
        (expanded?'<div class="cc-detail"><div class="cc-badges"><span>Категория: '+esc(CATEGORY[r.category]||r.category)+'</span><span>Версия: '+esc(r.version)+'</span></div><div><b>Источник:</b> '+esc(r.license)+'</div><div><b>Содержимое:</b> '+esc((r.content||[]).join(' · '))+'</div>'+subHtml+(r.status==='planned'?'<div class="cc-note">Этот пак пока не активен. Он находится в дорожной карте и не меняет правила игры.</div>':(r.core?'<div class="cc-note">Базовый слой проекта нельзя отключить.</div>':'<div class="cc-note">Выключенный пак остаётся установленным, но его классы и способности не участвуют в runtime.</div>'))+'</div>':'')+
        '</div>';
    }).join('');
    updateSummary(rows);
  }
  function updateSummary(rows){var el=document.getElementById('dndContentCatalogSummary');if(!el)return;var installed=rows.filter(function(r){return r.status==='installed';}).length,planned=rows.filter(function(r){return r.status==='planned';}).length,enabled=rows.filter(function(r){return r.enabled!==false;}).length;el.textContent='Показано: '+rows.length+' · установлено: '+installed+' · включено: '+enabled+' · в планах: '+planned;}
  function open(){var m=document.getElementById('dndContentCatalogModal');if(!m)return;m.style.display='flex';render();}
  function close(){var m=document.getElementById('dndContentCatalogModal');if(m)m.style.display='none';}
  function toggle(id,on){if(global.DNDContent&&DNDContent.setEnabled)DNDContent.setEnabled(id,on);render();try{if(global.renderCombatAbilities)global.renderCombatAbilities();}catch(e){}}
  function expand(id){catalogState.expanded=catalogState.expanded===id?null:id;render();}
  function search(v){catalogState.search=v||'';render();}
  function filter(v){catalogState.filter=v||'all';render();}
  function status(v){catalogState.status=v||'all';render();}
  function init(){
    var style=document.createElement('style');style.textContent='.cc-modal{display:none;position:fixed;inset:0;background:rgba(0,0,0,.92);z-index:28000;justify-content:center;align-items:center;padding:12px;box-sizing:border-box}.cc-panel{width:100%;max-width:820px;max-height:94vh;overflow:auto;background:#171717;color:#eee;border:1px solid #444;border-radius:14px;box-shadow:0 18px 50px #000}.cc-head{display:flex;justify-content:space-between;align-items:center;padding:16px 18px;border-bottom:1px solid #333}.cc-head h3{margin:0;color:#d4af37}.cc-controls{padding:12px;border-bottom:1px solid #333;display:grid;grid-template-columns:1fr 160px 140px;gap:8px}.cc-input,.cc-select{width:100%;box-sizing:border-box;background:#242424;color:#fff;border:1px solid #555;border-radius:7px;padding:10px}.cc-summary{padding:8px 12px;color:#999;font-size:.75em;border-bottom:1px solid #292929}.cc-list{padding:12px}.cc-card{background:#222;border:1px solid #383838;border-radius:10px;margin-bottom:8px;cursor:pointer}.cc-card.cc-disabled{opacity:.55}.cc-card.cc-planned{border-style:dashed}.cc-top{display:flex;justify-content:space-between;gap:10px;align-items:center;padding:12px}.cc-name{font-size:1.05em;font-weight:bold}.cc-source{color:#aaa;font-size:.82em;margin-top:3px}.cc-actions{display:flex;align-items:center;gap:8px}.cc-toggle{font-size:.75em;color:#bbb;display:flex;align-items:center;gap:5px;white-space:nowrap}.cc-toggle input{accent-color:#4caf50}.cc-status{font-size:.7em;padding:4px 6px;border-radius:5px;background:#302b1e;color:#d9cda8;white-space:nowrap}.cc-chevron{color:#d4af37}.cc-detail{padding:0 12px 12px;color:#bbb;font-size:.84em;line-height:1.55}.cc-badges{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:6px}.cc-badges span{background:#242424;border:1px solid #3c3c3c;border-radius:5px;padding:4px 7px}.cc-subs{display:flex;flex-wrap:wrap;gap:5px;margin-top:7px}.cc-sub{background:#302b1e;border:1px solid #5b5138;border-radius:5px;padding:4px 7px;color:#e1d2a4}.cc-note{margin-top:9px;padding:8px;background:#191919;border-radius:6px;color:#888}.cc-empty{padding:25px;text-align:center;color:#888}@media(max-width:680px){.cc-controls{grid-template-columns:1fr}.cc-actions{flex-wrap:wrap;justify-content:flex-end}.cc-status{display:none}}';document.head.appendChild(style);
  }
  global.DNDContentCatalog={open:open,close:close,toggle:toggle,expand:expand,search:search,filter:filter,status:status,render:render,init:init};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})(window);
