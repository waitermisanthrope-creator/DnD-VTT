/* V70.26.3 — live global error console for developer mode. */
(function(global){
  'use strict';
  var ROOT='dndErrorLogV709',MAX=300,state={open:false,entries:[]},installed=false;
  function s(v){if(v==null)return '';if(v instanceof Error)return v.message+(v.stack?'\n'+v.stack:'');if(typeof v==='object'){try{return JSON.stringify(v)}catch(e){return String(v)}}return String(v)}
  function add(type,message,meta){
    var e={ts:Date.now(),at:new Date().toISOString(),type:type,message:s(message),meta:meta||{}};
    var last=state.entries[state.entries.length-1];
    if(last&&last.type===e.type&&last.message===e.message&&e.ts-last.ts<500)return;
    state.entries.push(e);if(state.entries.length>MAX)state.entries.splice(0,state.entries.length-MAX);
    if(state.open)render();
  }
  function install(){
    if(installed)return;installed=true;
    global.addEventListener('error',function(ev){
      var t=ev.target;
      if(t&&t!==global&&t.tagName){add('resource-error','Не удалось загрузить '+String(t.tagName).toLowerCase()+': '+(t.src||t.href||''),{source:t.src||t.href||'',tag:t.tagName});return;}
      add('runtime-error',ev.message||'JavaScript error',{source:ev.filename||'',line:ev.lineno||0,column:ev.colno||0,stack:ev.error&&ev.error.stack||''});
    },true);
    global.addEventListener('unhandledrejection',function(ev){var r=ev.reason;add('unhandled-rejection',r&&r.message||r,{stack:r&&r.stack||''});});
    ['error','warn'].forEach(function(level){
      var original=console[level];if(!original||original.__dndV709Wrapped)return;
      var wrapped=function(){var a=Array.prototype.slice.call(arguments);add('console-'+level,a.map(s).join(' '),{});return original.apply(console,a);};
      wrapped.__dndV709Wrapped=true;console[level]=wrapped;
    });
  }
  function esc(v){return s(v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  function render(){
    var root=document.getElementById(ROOT);if(!root)return;root.style.display=state.open?'block':'none';if(!state.open)return;
    var rows=state.entries.slice().reverse().map(function(e){
      var cls=e.type.indexOf('error')>=0||e.type==='unhandled-rejection'?'#ff8a80':e.type.indexOf('warn')>=0?'#ffd180':'#b0bec5';
      var meta=Object.keys(e.meta||{}).length?'\n'+JSON.stringify(e.meta,null,2):'';
      return '<div style="padding:8px 4px;border-bottom:1px solid #333;word-break:break-word;color:'+cls+'"><div style="font-size:.72em;color:#888">'+esc(e.at)+' · '+esc(e.type)+'</div><div style="white-space:pre-wrap;margin-top:3px">'+esc(e.message)+esc(meta)+'</div></div>';
    }).join('');
    root.innerHTML='<div style="min-height:100%;box-sizing:border-box;padding:calc(12px + env(safe-area-inset-top)) 10px calc(20px + env(safe-area-inset-bottom));font-family:system-ui,sans-serif;color:#fff;">'+
      '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px"><div><b>🐞 Ошибки здесь и сейчас</b><div style="font-size:.7em;color:#999">Runtime, rejected promises, console.error/warn и ошибки загрузки ресурсов</div></div><button class="btn-action" onclick="dndV709Close()" style="padding:7px 10px">✕</button></div>'+
      '<div style="display:flex;gap:6px;margin:10px 0;position:sticky;top:0;background:#050505;padding:5px 0;z-index:2"><button class="btn-action" onclick="dndV709Refresh()" style="flex:1">↻ Обновить</button><button class="btn-action" onclick="dndV709Copy()" style="flex:1">📋 Скопировать</button><button class="btn-action" onclick="dndV709Clear()" style="flex:1">🧹 Очистить</button></div>'+
      '<div style="font-size:.75em;color:#aaa;margin-bottom:6px">Записей: '+state.entries.length+'</div>'+
      '<div style="background:#111;border:1px solid #444;border-radius:9px;padding:8px;max-width:1000px;margin:auto">'+(rows||'<div style="color:#777;padding:20px;text-align:center">Ошибок пока не зафиксировано.</div>')+'</div></div>';
  }
  function copy(){
    var payload=state.entries.map(function(e){return '['+e.at+'] '+e.type+'\\n'+e.message+(Object.keys(e.meta||{}).length?'\\n'+JSON.stringify(e.meta,null,2):'');}).join('\\n\\n');
    if(!payload)payload='Ошибок в дебаг-логе не зафиксировано.';
    function done(){try{var b=document.querySelector('#'+ROOT+' [data-copy-status]');if(b){b.textContent='✓ Скопировано';setTimeout(function(){b.textContent='';},1400);}}catch(_){} }
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(payload).then(done).catch(function(){fallback(payload,done);});}else fallback(payload,done);
  }
  function fallback(payload,done){try{var ta=document.createElement('textarea');ta.value=payload;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.focus();ta.select();document.execCommand('copy');ta.remove();done();}catch(e){try{alert('Не удалось скопировать лог: '+e.message);}catch(_){} }}
  function build(){if(document.getElementById(ROOT))return;var d=document.createElement('div');d.id=ROOT;d.style.cssText='display:none;position:fixed;inset:0;z-index:100060;background:rgba(3,3,3,.995);color:#fff;overflow:auto;box-sizing:border-box;touch-action:pan-y;';document.body.appendChild(d);render();}
  function open(){build();state.open=true;render()} function close(){state.open=false;render()} function clear(){state.entries=[];render()} function refresh(){render()}
  install();
  global.dndV709Open=open;global.dndV709Close=close;global.dndV709Clear=clear;global.dndV709Refresh=refresh;global.dndV709Copy=copy;
  global.DNDErrorLogV709={VERSION:'70.26.3',open:open,close:close,clear:clear,entries:function(){return state.entries.slice()}};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build,{once:true});else build();
})(window);
