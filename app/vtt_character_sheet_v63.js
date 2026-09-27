/**
 * vtt_character_sheet_v63.js
 * Mobile character sheet overlay for the existing currentCharacter/currentChar state.
 * Uses existing rulesEngine calculations and never creates a second character engine.
 * Public API: DNDCharacterSheetV63, dndV63Open, dndV63Close, dndV63Refresh.
 */
(function(global){'use strict';
  var VERSION='63.0.0', state={open:false};
  function hero(){return global.currentCharacter||global.currentChar||null;}
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function n(v,d){var x=Number(v);return isFinite(x)?x:(d||0);}
  function calc(h){
    var stats=h&&h.stats||{}, out={};
    ['str','dex','con','int','wis','cha'].forEach(function(k){var v=n(stats[k],n(h&&k,10));out[k]=Math.floor((v-10)/2);});
    var rb=global.DNDRules;
    return {ac:rb&&rb.getAC?n(rb.getAC(h),10):n(h&&h.ac,10),speed:n(h&&h.speed,30),prof:rb&&rb.profBonus?n(rb.profBonus(h),2):Math.floor((n(h&&h.level,1)-1)/4)+2,stats:out};
  }
  function render(){var root=document.getElementById('dndCharacterSheetV63');if(!root)return;var h=hero();root.style.display=state.open?'block':'none';if(!h){root.innerHTML='<div style="padding:16px;color:#aaa">Персонаж не выбран.</div>';return;}var c=calc(h),hp=n(h.hpCurrent,n(h.hp,n(h.hpMax,0))),max=n(h.hpMax,n(h.maxHp,n(h.hp,0))),name=h.name||h.characterName||'Персонаж',cls=h.class||h.className||((h.classes||[])[0]||{}).name||'—';var stats=['str','dex','con','int','wis','cha'].map(function(k){return '<div style="padding:7px;border:1px solid #444;border-radius:9px;text-align:center"><b>'+k.toUpperCase()+'</b><div style="font-size:1.15em">'+(c.stats[k]>=0?'+':'')+c.stats[k]+'</div></div>';}).join('');root.innerHTML='<div style="padding:11px;max-width:720px;margin:auto"><div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><div><b style="font-size:1.1em">'+esc(name)+'</b><div style="font-size:.78em;color:#aaa">'+esc(cls)+' • уровень '+n(h.level,1)+'</div></div><button class="btn-action" onclick="dndV63Close()">✕</button></div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:9px"><div style="padding:8px;background:#252525;border-radius:8px">❤ HP<br><b>'+hp+'/'+max+'</b></div><div style="padding:8px;background:#252525;border-radius:8px">🛡 КД<br><b>'+c.ac+'</b></div><div style="padding:8px;background:#252525;border-radius:8px">🏃 Скорость<br><b>'+c.speed+' фт.</b></div></div><div style="margin-top:9px;font-size:.8em;color:#aaa">Бонус мастерства: <b style="color:#fff">+'+c.prof+'</b></div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:8px">'+stats+'</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:9px"><button class="btn-action" onclick="dndV64Open()">⚔️ Действия</button><button class="btn-action" onclick="dndV65Open()">🎲 Броски</button></div></div>';}
  function open(){state.open=true;render();}
  function close(){state.open=false;render();}
  function init(){if(document.getElementById('dndCharacterSheetV63'))return;var e=document.createElement('div');e.id='dndCharacterSheetV63';e.style.cssText='display:none;position:fixed;inset:0;z-index:29800;background:rgba(12,12,12,.97);color:#fff;overflow:auto;padding:calc(10px + env(safe-area-inset-top)) 8px calc(10px + env(safe-area-inset-bottom));box-sizing:border-box;touch-action:manipulation;';document.body.appendChild(e);}
  global.dndV63Open=open;global.dndV63Close=close;global.dndV63Refresh=render;global.DNDCharacterSheetV63={VERSION:VERSION,open:open,close:close,refresh:render,snapshot:function(){var h=hero();return {version:VERSION,open:state.open,name:h&&h.name||null,hp:h&&h.hpCurrent,maxHp:h&&h.hpMax};}};
  if(global.addEventListener)global.addEventListener('DOMContentLoaded',function(){init();});
})(window);
