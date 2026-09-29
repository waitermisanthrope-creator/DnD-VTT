/* UI для Extra-класса «Паразит доктора Вальтера». */
(function(g){
  'use strict';

  function esc(v){
    return String(v==null?'':v).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function render(hero){
    var panel=document.getElementById('walterParasitePanel');
    var classField=document.getElementById('charClass');
    if(!panel && classField){
      panel=document.createElement('div');
      panel.id='walterParasitePanel';
      panel.style.cssText='margin:10px 0;padding:12px;border:1px solid #6b8f8f;border-radius:8px;background:#172322;color:#eee;';
      classField.insertAdjacentElement('afterend',panel);
    }
    if(!panel)return;

    var isWalter=hero && hero.extraClassType==='walter_parasite';
    if(!isWalter){
      panel.style.display='none';
      return;
    }
    panel.style.display='block';

    var api=g.WALTER_PARASITE_EXTRA;
    if(!api)return;
    api.normalizeCharacter(hero);
    var summary=api.getClassSummary(hero);
    var meta=api.STAT_META;
    var organs=summary.activeCharacteristics.map(function(k){
      return '<button class="btn-action" style="margin:3px;padding:6px 8px;" onclick="useWalterDominantOrgan(\\''+k+'\\')">'+esc(meta[k].label)+': '+esc(meta[k].ability)+'</button>';
    }).join('');

    var muts=summary.mutations.length?summary.mutations.map(esc).join(', '):'нет';
    panel.innerHTML=
      '<div style="font-weight:bold;font-size:1.05em;margin-bottom:6px;">🧬 Паразит доктора Вальтера</div>'+
      '<div style="font-size:.9em;line-height:1.45;">'+
        '<b>Тело:</b> '+esc(summary.bodyName||'нет')+'<br>'+
        '<b>HP тела:</b> '+summary.bodyHP+' / '+summary.bodyMaxHP+'<br>'+
        '<b>Максимальные характеристики:</b> '+summary.activeCharacteristics.map(function(k){return esc(meta[k].label);}).join(', ')+'<br>'+
        '<b>Активные органы:</b> '+summary.activeOrgans.map(esc).join(', ')+'<br>'+
        '<b>Мутации:</b> '+muts+
      '</div>'+
      '<div style="margin-top:7px;"><b>Органы максимальной характеристики:</b><br>'+organs+'</div>';
  }

  g.renderWalterParasitePanel=render;

  g.useWalterDominantOrgan=function(key){
    var hero=g.currentCharacter||g.currentChar;
    if(!hero || hero.extraClassType!=='walter_parasite')return;
    var api=g.WALTER_PARASITE_EXTRA;
    if(!api)return;
    var target=null;
    if(key==='int'){
      var name=prompt('Название/цель для «Жгутиков» (можно оставить пустым):','');
      target=name?{name:name}:null;
    }
    var result=api.useDominantOrgan(hero,key,target);
    if(!result.ok){
      alert(result.reason||'Орган не сработал.');
      return;
    }
    if(key==='str'){
      alert('Костяной хлыст-жало\\nАтака: +'+result.attackBonus+'\\nУрон: '+result.damageDice+' '+result.damageType+'\\nСл спасброска: '+result.saveDC);
    }else if(key==='dex'){
      alert('Пластичность: '+result.durationSeconds+' сек.\\nПреимущество на спасброски Ловкости, протискивание и движение без атак по возможности.');
    }else if(key==='con'){
      alert('Наросты: '+result.durationMinutes+' мин.\\nКД +'+result.acBonus+', ответный урон '+result.thornsDice+'.');
    }else if(key==='int'){
      alert('Жгутики активированы на '+(target&&target.name?target.name:'выбранную цель')+'.\\nКонцентрация до 1 минуты.');
    }else if(key==='wis'){
      alert('Кистевые органы зрения: слепое зрение '+result.blindsight+' футов на 10 минут.');
    }else if(key==='cha'){
      alert('Феромоны: красный туман в радиусе '+result.radius+' футов. Сл спасброска '+result.saveDC+'.');
    }
    if(typeof g.autoSaveCurrentCharacter==='function')g.autoSaveCurrentCharacter();
    render(hero);
  };
})(window);
