/* UI для Extra-класса «Призрак». */
(function(g){
  'use strict';
  function esc(v){return String(v==null?'':v).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
  function render(hero){
    var field=document.getElementById('charClass');
    var panel=document.getElementById('ghostExtraPanel');
    if(!panel&&field){
      panel=document.createElement('div'); panel.id='ghostExtraPanel';
      panel.style.cssText='margin:10px 0;padding:12px;border:1px solid #65768c;border-radius:8px;background:#161c24;color:#eee;';
      field.insertAdjacentElement('afterend',panel);
    }
    if(!panel)return;
    if(!hero||hero.extraClassType!=='ghost'){panel.style.display='none';return;}
    var api=g.GHOST_EXTRA;if(!api)return;
    api.normalizeCharacter(hero);
    var s=api.getSummary(hero);
    panel.style.display='block';
    panel.innerHTML='<div style="font-weight:bold;font-size:1.05em;">👻 Призрак</div>'+
      '<div style="margin-top:6px;line-height:1.5;">'+
      '<b>Форма:</b> '+esc(s.form)+'<br>'+
      '<b>Оболочка:</b> '+esc(s.shellName||'нет')+'<br>'+
      '<b>HP оболочки:</b> '+s.shellHP+' / '+s.shellMaxHP+'<br>'+
      '<b>Духовное ядро:</b> '+s.spiritHP+' / '+s.spiritMaxHP+'<br>'+
      '<span style="opacity:.8;">⚠ HP мёртвой оболочки не восстанавливаются лечением или отдыхом.</span></div>'+
      '<div style="margin-top:7px;">'+
      '<button class="btn-action" onclick="ghostLeaveShell()">Покинуть оболочку</button> '+
      '<button class="btn-action" onclick="ghostReturnShell()">Вернуться в оболочку</button></div>';
  }
  g.renderGhostExtraPanel=render;
  g.ghostLeaveShell=function(){
    var h=g.currentCharacter||g.currentChar;if(!h||!g.GHOST_EXTRA)return;
    var r=g.GHOST_EXTRA.enterSpiritForm(h);if(!r.ok)alert(r.reason||'Не удалось отделиться.');else{if(g.autoSaveCurrentCharacter)g.autoSaveCurrentCharacter();render(h);}
  };
  g.ghostReturnShell=function(){
    var h=g.currentCharacter||g.currentChar;if(!h||!g.GHOST_EXTRA)return;
    var r=g.GHOST_EXTRA.returnToShell(h);if(!r.ok)alert(r.reason||'Не удалось вернуться.');else{if(g.autoSaveCurrentCharacter)g.autoSaveCurrentCharacter();render(h);}
  };
})(window);
