/* UI для разумного Extra-класса «Паразит». */
(function(g){
  'use strict';
  function esc(v){return String(v==null?'':v).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
  function render(hero){
    var field=document.getElementById('charClass');
    var panel=document.getElementById('parasiteExtraPanel');
    if(!panel&&field){
      panel=document.createElement('div');panel.id='parasiteExtraPanel';
      panel.style.cssText='margin:10px 0;padding:12px;border:1px solid #557b69;border-radius:8px;background:#14221c;color:#eee;';
      field.insertAdjacentElement('afterend',panel);
    }
    if(!panel)return;
    if(!hero||hero.extraClassType!=='parasite'){panel.style.display='none';return;}
    var api=g.PARASITE_EXTRA;if(!api)return;
    api.normalizeCharacter(hero);
    var p=hero.parasite||{},h=api.getBody(hero),l=api.getLarva(hero),tier=api.getSymbiosisTier(hero);
    panel.style.display='block';
    panel.innerHTML=
      '<div style="font-weight:bold;font-size:1.05em;">🦠 Паразит — симбионт</div>'+
      '<div style="margin-top:6px;line-height:1.5;">'+
      '<b>Состояние:</b> '+esc(p.stage||'—')+'<br>'+
      '<b>Тело:</b> '+esc(h?h.sourceName:'личинка')+'<br>'+
      '<b>HP:</b> '+(h?h.currentHP+' / '+h.maxHP:(l?l.currentHP+' / '+l.maxHP:'0 / 0'))+'<br>'+
      '<b>Биомасса:</b> '+(p.biomass||0)+' / '+(p.biomassMax||0)+'<br>'+
      '<b>Симбиоз:</b> '+(p.symbiosis||0)+'/100 — '+esc(tier.name)+
      '</div>'+
      '<div style="display:flex;gap:5px;flex-wrap:wrap;margin-top:8px;">'+
      (h?'<button class="btn-action" onclick="parasiteDetach()">Отделиться</button>':'<button class="btn-action" onclick="parasiteTransfer()">Переселиться</button>')+
      '<button class="btn-action" onclick="parasiteFeed()">Поглотить труп</button>'+
      '<button class="btn-action" onclick="parasiteHeal()">Восстановить тело</button>'+
      '<button class="btn-action" onclick="parasiteMutation()">Мутация</button>'+
      '</div>';
  }
  function hero(){return g.currentCharacter||g.currentChar;}
  function save(){if(typeof g.autoSaveCurrentCharacter==='function')g.autoSaveCurrentCharacter();}
  g.renderParasiteExtraPanel=render;
  g.parasiteDetach=function(){
    var h=hero();if(!h||!g.PARASITE_EXTRA)return;
    var r=g.PARASITE_EXTRA.voluntarilyDetach(h);
    if(!r.ok)alert(r.reason||'Не удалось отделиться.');else{save();render(h);}
  };
  g.parasiteFeed=function(){
    var h=hero();if(!h||!g.PARASITE_EXTRA)return;
    var size=(prompt('Размер трупа: tiny / small / medium / large / huge / gargantuan','medium')||'medium').toLowerCase();
    var r=g.PARASITE_EXTRA.feedOnCorpse(h,{size:size});
    alert(r.ok?'Получено биомассы: '+r.biomassGained+'. Всего: '+r.biomass:'Биомасса не получена: запас заполнен.');
    save();render(h);
  };
  g.parasiteHeal=function(){
    var h=hero();if(!h||!g.PARASITE_EXTRA)return;
    var n=Number(prompt('Сколько HP восстановить?','4'));if(!isFinite(n)||n<=0)return;
    var r=g.PARASITE_EXTRA.restoreBody(h,n);
    alert(r.ok?'Восстановлено '+r.healed+' HP за '+r.cost+' биомассы.':'Не удалось восстановить тело: '+r.reason);
    save();render(h);
  };
  g.parasiteTransfer=function(){
    var h=hero();if(!h||!g.PARASITE_EXTRA)return;
    var name=prompt('Имя нового хозяина:','Новый хозяин');if(!name)return;
    var stats={};
    ['str','dex','con'].forEach(function(k){stats[k]=Number(prompt(k.toUpperCase()+' хозяина:',String(h.stats&&h.stats[k]||10)))||10;});
    var target={id:'manual_host_'+Date.now(),name:name,size:'Средний',stats:stats,hpMax:Number(prompt('Максимум HP тела:','20'))||20,hpCurrent:Number(prompt('Текущие HP тела:','20'))||20,ac:Number(prompt('КД тела:','10'))||10,speed:'30 футов'};
    var r=g.PARASITE_EXTRA.captureHost(h,target);
    if(!r.ok)alert(r.reason||'Переселение не удалось.');else{save();render(h);}
  };
  g.parasiteMutation=function(){
    var h=hero();if(!h||!g.PARASITE_EXTRA)return;
    var names=Object.keys(g.PARASITE_EXTRA.mutations||{});
    var name=prompt('Название мутации:\n'+names.join(', '),names[0]||'');
    if(!name)return;
    var r=g.PARASITE_EXTRA.recordMutation(h,name);
    alert(r.ok?'Мутация добавлена: '+name:r.reason||'Не удалось выбрать мутацию.');
    save();render(h);
  };
})(window);
