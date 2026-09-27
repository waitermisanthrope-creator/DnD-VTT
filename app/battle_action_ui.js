/**
 * battle_action_ui.js
 * ------------------------------------------------------------------
 * ЧТО ЭТО ЗА ФАЙЛ:
 * VTT-панель действий персонажа. Она связывает классовые способности
 * с боевым полем: выбор способности -> выбор цели на карте -> проверка
 * дальности/LOS -> предпросмотр -> подтверждение -> расход ресурса.
 *
 * КАК РАБОТАЕТ:
 * - battle_board.js открывает панель для выбранного токена;
 * - способности с целью не используют prompt: открывается список реальных
 *   боевых токенов и подсвечивается выбранная цель;
 * - перед подтверждением проверяются дальность и линия видимости, если они
 *   заданы правилами способности;
 * - только после подтверждения вызывается DNDClassFeatures.useFeature().
 *
 * ОСНОВНЫЕ ПЕРЕМЕННЫЕ:
 * panel, actionTokenId, pendingFeature, pendingTargetId, pendingContext.
 *
 * НЕ ИЗМЕНЯЕТ Wallpapers.js/Ambiences.js.
 * ------------------------------------------------------------------
 */
(function(global){
  'use strict';
  var panel=null, actionTokenId=null, pendingFeature=null, pendingTargetId=null, pendingContext={};

  function hero(){return global.currentChar||global.currentCharacter||null;}
  function combat(){var h=hero();return h&&h.initiativeTracker||null;}
  function token(){return global.DNDBattleBoard&&global.DNDBattleBoard.findToken&&actionTokenId?global.DNDBattleBoard.findToken(actionTokenId):null;}
  function combatantByToken(t){var c=combat();return t&&c&&Array.isArray(c.combatants)?c.combatants.find(function(x){return String(x.id)===String(t.sourceId);}):null;}
  function combatant(){return combatantByToken(token());}
  function isPlayer(){return !!(global.dndNetwork&&global.dndNetwork.state&&global.dndNetwork.state.role==='player');}
  function canUse(){var t=token(),c=combatant();if(!t||!c)return false;if(isPlayer())return c.ownerPeerId===global.dndNetwork.state.clientId;return true;}
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(x){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x];});}

  // Какие способности требуют выбора цели на VTT. rangeFt=0 означает контакт.
  var TARGET_RULES={
    bardicInspiration:{kind:'ally',rangeFt:60,los:true,label:'Выберите союзника'},
    layOnHands:{kind:'ally',rangeFt:5,los:true,label:'Выберите союзника'},
    preserveLife:{kind:'ally',rangeFt:30,los:true,label:'Выберите союзника'},
    vowOfEnmity:{kind:'enemy',rangeFt:10,los:true,label:'Выберите врага'},
    huntersPrey:{kind:'enemy',rangeFt:120,los:true,label:'Выберите врага'},
    huntersMark:{kind:'enemy',rangeFt:90,los:true,label:'Выберите врага'},
    feyPresence:{kind:'enemy',rangeFt:10,los:true,label:'Выберите врага'},
    hurlThroughHell:{kind:'enemy',rangeFt:120,los:true,label:'Выберите врага'},
    darkDelirium:{kind:'enemy',rangeFt:60,los:true,label:'Выберите врага'},
    quiveringPalm:{kind:'enemy',rangeFt:5,los:true,label:'Выберите врага'},
    openHandTechnique:{kind:'enemy',rangeFt:5,los:true,label:'Выберите врага'},
    stunningStrike:{kind:'enemy',rangeFt:5,los:true,label:'Выберите врага'},
    divineSmite:{kind:'enemy',rangeFt:5,los:true,label:'Выберите врага'},
    deflectMissiles:{kind:'self',rangeFt:0,los:false,label:'Нет цели'},
    reckless:{kind:'self',rangeFt:0,los:false,label:'Нет цели'},
    rage:{kind:'self',rangeFt:0,los:false,label:'Нет цели'},
    secondWind:{kind:'self',rangeFt:0,los:false,label:'Нет цели'},
    actionSurge:{kind:'self',rangeFt:0,los:false,label:'Нет цели'},
    indomitable:{kind:'self',rangeFt:0,los:false,label:'Нет цели'},
    flurry:{kind:'self',rangeFt:0,los:false,label:'Нет цели'},
    patientDefense:{kind:'self',rangeFt:0,los:false,label:'Нет цели'},
    stepWind:{kind:'self',rangeFt:0,los:false,label:'Нет цели'},
    wildShape:{kind:'self',rangeFt:0,los:false,label:'Нет цели'},
    flashOfGenius:{kind:'ally',rangeFt:30,los:true,label:'Выберите союзника'},
    guidedStrike:{kind:'self',rangeFt:0,los:false,label:'Подготовить для следующей атаки'},
    sacredWeapon:{kind:'self',rangeFt:0,los:false,label:'Нет цели'},
    shadowStep:{kind:'cell',rangeFt:60,los:false,label:'Выберите клетку'},
    eldritchCannon:{kind:'self',rangeFt:0,los:false,label:'Нет цели'},
    explosiveCannon:{kind:'enemy',rangeFt:60,los:true,label:'Выберите цель'},
    darkOnesLuck:{kind:'self',rangeFt:0,los:false,label:'Нет цели'},
    bendLuck:{kind:'self',rangeFt:0,los:false,label:'Подготовить реакцию'},
    bloodMaledict:{kind:'enemy',rangeFt:30,los:true,label:'Выберите цель Blood Curse'},
    brandOfCastigation:{kind:'enemy',rangeFt:30,los:true,label:'Выберите цель для бренда'},
    brandOfTethering:{kind:'enemy',rangeFt:30,los:true,label:'Выберите цель для бренда'},
    crimsonRite:{kind:'self',rangeFt:0,los:false,label:'Выберите тип Crimson Rite'},
    hybridTransformation:{kind:'self',rangeFt:0,los:false,label:'Нет цели'},
    mutagencraft:{kind:'self',rangeFt:0,los:false,label:'Выберите мутаген'},
    profanePactMagic:{kind:'self',rangeFt:0,los:false,label:'Нет цели'}
  };

  function openFor(id){actionTokenId=id;pendingFeature=null;pendingTargetId=null;pendingContext={};ensure();render();panel.style.display='block';}
  function close(){pendingFeature=null;pendingTargetId=null;pendingContext={};if(global.DNDBattleBoard&&global.DNDBattleBoard.setPlanPreview)global.DNDBattleBoard.setPlanPreview(null);if(panel)panel.style.display='none';}
  function planner(mode){var c=combatant();if(!c)return;close();if(global.dndTurnPlannerQuick)global.dndTurnPlannerQuick(String(c.id),'',mode);else if(global.dndTurnPlannerOpen){global.dndTurnPlannerOpen();if(global.dndTurnPlannerActor)global.dndTurnPlannerActor(String(c.id));}}
  function attack(){planner('ATTACK');}
  function spell(){planner('CAST_SPELL');}
  function move(){planner('ATTACK');setTimeout(function(){if(global.dndTurnPlannerPickMove)global.dndTurnPlannerPickMove();},30);}
  function ready(){planner('ATTACK');}

  function classFeatureCandidates(){
    var h=hero();if(!h||!global.DNDClassFeatures)return [];
    var ids=global.DNDClassFeatures.buildFeatureSet?global.DNDClassFeatures.buildFeatureSet(h):[];
    return ids.map(function(id){return global.DNDClassFeatures.FEATURE_DEFS[id];}).filter(Boolean).filter(function(f){
      if(f.action==='on-hit')return false;
      return ['rage','reckless','secondWind','actionSurge','indomitable','cunningAction','flurry','patientDefense','stepWind','bardicInspiration','metamagic','layOnHands','channelDivinity','turnUndead','wildShape','huntersMark','flashOfGenius','divineSmite','deflectMissiles','uncannyDodge','strokeOfLuck','guidedStrike','preserveLife','warPriest','vowOfEnmity','sacredWeapon','shadowStep','frenzy','retaliation','totemSpirit','openHandTechnique','wholenessOfBody','quiveringPalm','cuttingWords','combatInspiration','battleMagic','feyPresence','mistyEscape','darkOnesBlessing','darkOnesOwnLuck','fiendishResilience','hurlThroughHell','bendLuck','eldritchCannon','explosiveCannon','restorativeReagents','combatWildShape','elementalWildShape','holyNimbus','soulOfVengeance','avengingAngel','huntersPrey','defensiveTactics','beastCompanion','bestialFury','dragonWings','draconicPresence','wildMagicSurge','overchannel','arcaneWard'].indexOf(f.id)>=0 || !!(global.DNDContent&&global.DNDContent.getFeature&&global.DNDContent.getFeature(f.id));
    });
  }

  function targetRule(id){return TARGET_RULES[id]||{kind:'self',rangeFt:0,los:false,label:'Без выбора цели'};}
  function tokensForRule(rule){
    var source=token(), list=global.DNDBattleBoard&&global.DNDBattleBoard.tokenList?global.DNDBattleBoard.tokenList():[];
    return list.filter(function(t){
      if(!source||String(t.id)===String(source.id))return rule.kind==='self';
      if(rule.kind==='self'||rule.kind==='cell')return false;
      if(rule.kind==='ally'&&t.type!=='hero')return false;
      if(rule.kind==='enemy'&&t.type==='hero')return false;
      var dist=global.DNDBattleBoard.distanceFt(source,t);if(rule.rangeFt&&dist>rule.rangeFt)return false;
      if(rule.los&&global.DNDBattleBoard.lineOfSight){var los=global.DNDBattleBoard.lineOfSight(source,t);if(!los.clear)return false;}
      return true;
    });
  }
  function targetStatus(t,rule){
    var source=token();if(!source||!t)return 'нет цели';
    var dist=global.DNDBattleBoard.distanceFt(source,t), ok=(!rule.rangeFt||dist<=rule.rangeFt);
    var los=rule.los&&global.DNDBattleBoard.lineOfSight?global.DNDBattleBoard.lineOfSight(source,t):{clear:true,cover:0};
    return (ok&&los.clear?'✓ ':'✕ ')+dist+' фт'+(rule.los?' • '+(los.clear?'LOS':'LOS заблокирована'):'');
  }
  function chooseFeature(id){pendingFeature=id;pendingTargetId=null;pendingContext={};render();}
  function chooseTarget(id){pendingTargetId=id;pendingContext={target:combatantByToken(global.DNDBattleBoard.findToken(id))};if(global.DNDBattleBoard&&global.DNDBattleBoard.setPlanPreview){global.DNDBattleBoard.setPlanPreview({actorId:token().sourceId,targetId:id,featureId:pendingFeature});}render();}
  function cancelFeature(){pendingFeature=null;pendingTargetId=null;pendingContext={};if(global.DNDBattleBoard&&global.DNDBattleBoard.setPlanPreview)global.DNDBattleBoard.setPlanPreview(null);render();}

  function cloneFeatureContext(ctx){var out={};Object.keys(ctx||{}).forEach(function(k){if(k==='target'||k==='targetToken')return;out[k]=ctx[k];});return out;}
  function executeFeature(){
    var h=hero(),actor=combatant();if(!h||!actor||!pendingFeature)return;
    var rule=targetRule(pendingFeature), source=token(), target=pendingTargetId&&global.DNDBattleBoard.findToken(pendingTargetId);
    if(rule.kind!=='self'&&!target){alert('Выберите цель на поле.');return;}
    if(target){var dist=global.DNDBattleBoard.distanceFt(source,target);if(rule.rangeFt&&dist>rule.rangeFt){alert('Цель вне дальности: '+dist+' фт.');return;}if(rule.los){var los=global.DNDBattleBoard.lineOfSight(source,target);if(!los.clear){alert('Линия видимости заблокирована.');return;}}pendingContext.target=combatantByToken(target);pendingContext.targetToken=target;}
    if(pendingFeature==='bloodMaledict'){var cs=document.getElementById('dndBloodCurseSelect'),ca=document.getElementById('dndBloodCurseAmplify');pendingContext.curse=cs?cs.value:'binding';pendingContext.amplify=!!(ca&&ca.checked);}
    if(pendingFeature==='crimsonRite'){var rt=document.getElementById('dndRiteType');pendingContext.riteType=rt?rt.value:'огонь';}
    if(pendingFeature==='mutagencraft'){var mg=document.getElementById('dndMutagen');pendingContext.mutagen=mg?mg.value:'celerity';}
    if(isPlayer()){
      if(!global.dndNetwork||!global.dndNetwork.playerAction){alert('Нет соединения с мастером.');return;}
      var payload=cloneFeatureContext(pendingContext);payload.featureId=pendingFeature;if(pendingTargetId)payload.targetId=String(pendingTargetId);
      global.dndNetwork.playerAction('USE_FEATURE',payload);
      pendingFeature=null;pendingTargetId=null;pendingContext={};if(global.DNDBattleBoard&&global.DNDBattleBoard.setPlanPreview)global.DNDBattleBoard.setPlanPreview(null);render();return;
    }
    var r=global.DNDClassFeatures.useFeature(h,pendingFeature,pendingContext);
    if(!r||!r.ok){alert(r&&r.reason||'Способность недоступна.');return;}
    if(typeof global.autoSaveCurrentCharacter==='function')global.autoSaveCurrentCharacter();
    var msg=r.message||'Готово.';pendingFeature=null;pendingTargetId=null;pendingContext={};if(global.DNDBattleBoard&&global.DNDBattleBoard.setPlanPreview)global.DNDBattleBoard.setPlanPreview(null);render();alert(msg);
  }

  function useBattleFeature(id){chooseFeature(id);}
  global.dndBattleUseFeature=useBattleFeature;
  global.dndBattleFeatureChooseTarget=chooseTarget;
  global.dndBattleFeatureConfirm=executeFeature;
  global.dndBattleFeatureCancel=cancelFeature;

  function renderTargetPicker(){
    var f=global.DNDClassFeatures.FEATURE_DEFS[pendingFeature],rule=targetRule(pendingFeature),items=tokensForRule(rule);
    var html='<div style="margin-top:8px;border-top:1px solid #444;padding-top:7px"><div style="color:#d4af37;font-size:.78em">🎯 '+esc(rule.label)+'</div>';
    if(pendingFeature==='bloodMaledict'){html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;margin:5px 0"><select id="dndBloodCurseSelect" style="background:#111;color:#fff;border:1px solid #444;padding:6px"><option value="binding">Binding</option><option value="bloody">Bloody</option><option value="bloatedAgony">Bloated Agony</option><option value="eyeless">Eyeless</option><option value="fallenPuppet">Fallen Puppet</option><option value="marked">Marked</option></select><label style="font-size:.75em;padding:6px"><input id="dndBloodCurseAmplify" type="checkbox"> Amplify</label></div>';}
    if(pendingFeature==='crimsonRite'){html+='<select id="dndRiteType" style="width:100%;background:#111;color:#fff;border:1px solid #444;padding:6px;margin:5px 0"><option>огонь</option><option>холод</option><option>молния</option><option>кислота</option><option>некротический</option><option>излучение</option></select>';}
    if(pendingFeature==='mutagencraft'){html+='<select id="dndMutagen" style="width:100%;background:#111;color:#fff;border:1px solid #444;padding:6px;margin:5px 0"><option value="celerity">Celerity</option><option value="precision">Precision</option><option value="cruelty">Cruelty</option><option value="mobility">Mobility</option></select>';}
    if(rule.kind==='self'){html+='<div style="color:#aaa;font-size:.75em;margin:5px 0">Эта способность применяется к вашему персонажу.</div>';}else if(!items.length){html+='<div style="color:#e57373;font-size:.75em;margin:5px 0">Нет доступных целей в радиусе/LOS.</div>';}else{html+='<div style="display:grid;grid-template-columns:1fr;gap:4px;margin-top:5px">'+items.map(function(t){var selected=String(t.id)===String(pendingTargetId);return '<button class="btn-action" style="padding:6px;text-align:left;'+(selected?'outline:2px solid #d4af37;':'')+'" onclick="dndBattleFeatureChooseTarget(\''+esc(t.id)+'\')">'+esc(t.name)+' <span style="color:#aaa;font-size:.75em">'+esc(targetStatus(t,rule))+'</span></button>';}).join('')+'</div>';} 
    html+='<div style="display:flex;gap:5px;margin-top:6px"><button class="btn-action" style="flex:1;background:#4caf50" onclick="dndBattleFeatureConfirm()">✓ Подтвердить</button><button class="btn-action" onclick="dndBattleFeatureCancel()">Отмена</button></div></div>';
    return html;
  }

  function render(){
    if(!panel)return;var t=token(),c=combatant();if(!t||!c){panel.style.display='none';return;}
    var owner=canUse(),role=isPlayer()?'Игрок':'Мастер',feats=classFeatureCandidates();
    var featureHtml='';
    if(pendingFeature)featureHtml=renderTargetPicker();
    else if(feats.length){featureHtml='<div style="margin-top:8px;border-top:1px solid #444;padding-top:7px"><div style="font-size:.75em;color:#d4af37;margin-bottom:5px">✨ Классовые способности</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:5px">'+feats.slice(0,16).map(function(f){return '<button class="btn-action" style="padding:5px;font-size:.72em" onclick="dndBattleUseFeature(\''+esc(f.id)+'\')">'+esc(f.name)+'</button>';}).join('')+'</div></div>';}
    panel.innerHTML='<div style="display:flex;align-items:center;gap:7px"><strong style="color:#d4af37">⚔️ '+esc(c.name||t.name)+'</strong><span style="flex:1"></span><button class="btn-action" style="padding:4px 8px" onclick="dndBattleActionClose()">✕</button></div><div style="font-size:.76em;color:#aaa;margin:4px 0 7px">'+role+' • '+Number(c.hp||0)+'/'+Number(c.maxHp||0)+' HP • Скорость '+Number(c.speed||t.speed||30)+' фт.</div>'+(owner?'<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px"><button class="btn-action" onclick="dndBattleQuickAttack()">🎯 Атака</button><button class="btn-action" onclick="dndBattleQuickSpell()">✨ Заклинание</button><button class="btn-action" onclick="dndBattleQuickMove()">🏃 Движение</button><button class="btn-action" onclick="dndBattleQuickReady()">⏳ Подготовить</button><button class="btn-action" style="grid-column:1/-1;background:#6a1b9a" onclick="dndBattleQuickAttack()">📋 Спланировать на поле</button></div>'+featureHtml:'<div style="color:#888;font-size:.78em">Только владелец персонажа или мастер может создать его план.</div>');
  }

  function ensure(){
    if(panel)return;panel=document.createElement('div');panel.id='dndBattleActionPanel';panel.style.cssText='display:none;position:absolute;left:8px;bottom:8px;width:min(360px,calc(100% - 16px));max-height:70%;overflow:auto;background:rgba(18,18,18,.98);border:1px solid #555;border-radius:10px;padding:9px;z-index:20;box-shadow:0 8px 30px #000;box-sizing:border-box;';var wrap=document.getElementById('battleBoardCanvasWrap');if(wrap)wrap.appendChild(panel);else document.body.appendChild(panel);
  }
  global.dndBattleActionOpen=openFor;global.dndBattleActionClose=close;global.dndBattleQuickAttack=attack;global.dndBattleQuickSpell=spell;global.dndBattleQuickMove=move;global.dndBattleQuickReady=ready;
})(window);
