/**
 * dnd_tools.js
 * ------------------------------------------------------------------
 * ЧТО ЭТО ЗА ФАЙЛ:
 * Дополнительные игровые трекеры мобильного листа: компаньоны и инициатива.
 * Также содержит быстрые действия для короткого/длинного отдыха.
 *
 * КАК РАБОТАЕТ:
 * - renderDndTools() вставляет интерфейс в существующую вкладку «Дайсы»;
 * - companions хранится в currentChar.companions;
 * - initiativeTracker хранит round, activeIndex и combatants;
 * - все изменения сразу сохраняются через autoSaveCurrentCharacter().
 *
 * ПЕРЕМЕННЫЕ:
 * currentChar/currentCharacter, currentChar.companions,
 * currentChar.initiativeTracker, currentChar.hpCurrent/hpMax.
 *
 * Не зависит от Wallpapers.js/Ambiences.js.
 * ------------------------------------------------------------------
 */

function ensureDndToolsState() {
  if (!currentChar) return;
  if (!Array.isArray(currentChar.companions)) currentChar.companions = [];
  if (!currentChar.initiativeTracker || !Array.isArray(currentChar.initiativeTracker.combatants)) {
    currentChar.initiativeTracker = { round: 1, activeIndex: 0, combatants: [] };
  }
}

function _dndSave() {
  if (typeof autoSaveCurrentCharacter === 'function') autoSaveCurrentCharacter();
  else if (typeof saveAllCharacters === 'function') saveAllCharacters();
}

function renderDndTools() {
  if (!currentChar) return;
  ensureDndToolsState();
  var tab = document.getElementById('tabDice');
  if (!tab) return;

  tab.innerHTML = `
    <div class="card">
      <h3>⚔️ Инициатива</h3>
      <div style="display:flex;gap:6px;align-items:center;margin-bottom:8px;">
        <button class="btn-action" onclick="addInitiativeCombatant('Герой', true)">➕ Герой</button>
        <button class="btn-action" onclick="addInitiativeCombatant('', false)">➕ Участник</button>
        <button class="btn-action" style="background:#555;" onclick="clearInitiativeTracker()">Очистить</button>
      </div>
      <div id="initiativeTrackerList"></div>
    </div>

    <div class="card">
      <h3>🐾 Компаньоны</h3>
      <div id="companionsList"></div>
      <button class="btn-action" style="margin-top:8px;background:#4CAF50;" onclick="addCompanion()">+ Компаньон</button>
    </div>

    <div class="card">
      <h3>🛌 Отдых</h3>
      <div style="display:flex;gap:6px;">
        <button class="btn-action" style="flex:1;" onclick="shortRestCharacter()">☕ Короткий отдых</button>
        <button class="btn-action" style="flex:1;background:#2196F3;" onclick="longRestCharacter()">🌙 Длинный отдых</button>
      </div>
    </div>
  `;
  renderInitiativeTracker();
  renderCompanions();
}

function addCompanion() {
  ensureDndToolsState();
  var c = {
    id: 'cmp_' + Date.now(),
    name: 'Новый компаньон',
    hp: 10,
    maxHp: 10,
    ac: 10,
    initiative: 0,
    notes: '',
    conditions: ''
  };
  currentChar.companions.push(c);
  _dndSave();
  renderCompanions();
}

function updateCompanion(id, field, value) {
  ensureDndToolsState();
  var c = currentChar.companions.find(function(x){ return x.id === id; });
  if (!c) return;
  c[field] = (field === 'hp' || field === 'maxHp' || field === 'ac' || field === 'initiative') ? (Number(value) || 0) : value;
  _dndSave();
}

function deleteCompanion(id) {
  if (!confirm('Удалить компаньона?')) return;
  currentChar.companions = (currentChar.companions || []).filter(function(c){ return c.id !== id; });
  _dndSave();
  renderCompanions();
}

function renderCompanions() {
  var box = document.getElementById('companionsList');
  if (!box || !currentChar) return;
  ensureDndToolsState();
  if (!currentChar.companions.length) {
    box.innerHTML = '<div style="color:#777;text-align:center;">Компаньонов пока нет</div>';
    return;
  }
  box.innerHTML = currentChar.companions.map(function(c) {
    return `<div style="background:#252525;border:1px solid #444;border-radius:6px;padding:8px;margin-bottom:8px;">
      <div style="display:flex;gap:6px;">
        <input value="${escapeDndHtml(c.name)}" placeholder="Имя" oninput="updateCompanion('${c.id}','name',this.value)" style="flex:2;">
        <button class="btn-del" onclick="deleteCompanion('${c.id}')">✕</button>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:5px;margin-top:5px;">
        <label style="font-size:.75em;color:#aaa;">HP<input type="number" value="${Number(c.hp)||0}" oninput="updateCompanion('${c.id}','hp',this.value)"></label>
        <label style="font-size:.75em;color:#aaa;">Макс<input type="number" value="${Number(c.maxHp)||0}" oninput="updateCompanion('${c.id}','maxHp',this.value)"></label>
        <label style="font-size:.75em;color:#aaa;">КД<input type="number" value="${Number(c.ac)||0}" oninput="updateCompanion('${c.id}','ac',this.value)"></label>
      </div>
      <label style="font-size:.75em;color:#aaa;">Инициатива<input type="number" value="${Number(c.initiative)||0}" oninput="updateCompanion('${c.id}','initiative',this.value)"></label>
      <textarea placeholder="Заметки/условия..." oninput="updateCompanion('${c.id}','notes',this.value)">${escapeDndHtml(c.notes || '')}</textarea>
      <button class="btn-action" style="width:100%;margin-top:5px;" onclick="addInitiativeCombatant(decodeURIComponent('${encodeURIComponent(c.name || '')}'),false,${Number(c.initiative)||0},${Number(c.hp)||0},${Number(c.maxHp)||0},${Number(c.ac)||0},'companion')">⚔️ В инициативу</button>
    </div>`;
  }).join('');
}

function syncDndNetworkInitiative(reason) {
  var net = window.dndNetwork;
  if (net && net.state && net.state.role === 'host' && net.commitHostEvent && window.currentChar && window.currentChar.initiativeTracker) {
    try { net.commitHostEvent('COMBAT_CHANGED', JSON.parse(JSON.stringify(window.currentChar.initiativeTracker)), 'master'); } catch (e) {}
  }
}

function addInitiativeCombatant(name, isHero, initiative, hp, maxHp, ac, type) {
  ensureDndToolsState();
  if (isHero) {
    name = currentChar.name || 'Герой';
    initiative = getStatModNum('dex');
    hp = Number(currentChar.hpCurrent) || 0;
    maxHp = Number(currentChar.hpMax) || hp;
    ac = Number(currentChar.ac) || 10;
    type = 'hero';
  } else {
    name = name || 'Участник';
    initiative = Number(initiative) || (Math.floor(Math.random() * 20) + 1);
  }
  currentChar.initiativeTracker.combatants.push({
    id: 'init_' + Date.now() + '_' + Math.random().toString(36).slice(2,6),
    name: name,
    initiative: Number(initiative) || 0,
    hp: Number(hp) || 0,
    maxHp: Number(maxHp) || 0,
    ac: Number(ac) || 10,
    type: type || 'enemy',
    stats: (isHero && currentChar && currentChar.stats) ? JSON.parse(JSON.stringify(currentChar.stats)) : {},
    notes: '',
    turnResources: { action: true, bonusAction: true, reaction: true, movement: 30, movementUsed: 0 },
    concentration: { active: false, spellId: null, spellName: '' }
  });
  sortInitiativeTracker();
  _dndSave();
  renderInitiativeTracker();
  syncDndNetworkInitiative('add');
}

function updateInitiativeCombatant(id, field, value) {
  ensureDndToolsState();
  var c = currentChar.initiativeTracker.combatants.find(function(x){ return x.id === id; });
  if (!c) return;
  c[field] = (field === 'initiative' || field === 'hp' || field === 'maxHp' || field === 'ac') ? (Number(value) || 0) : value;
  if (field === 'initiative') sortInitiativeTracker();
  _dndSave();
  renderInitiativeTracker();
  syncDndNetworkInitiative('update');
}

function sortInitiativeTracker() {
  ensureDndToolsState();
  currentChar.initiativeTracker.combatants.sort(function(a,b){ return (Number(b.initiative)||0) - (Number(a.initiative)||0); });
  if (currentChar.initiativeTracker.activeIndex >= currentChar.initiativeTracker.combatants.length) {
    currentChar.initiativeTracker.activeIndex = 0;
  }
}

function nextInitiativeTurn() {
  ensureDndToolsState();
  var t = currentChar.initiativeTracker;
  if (!t.combatants.length) return;
  var previousActive = t.combatants[t.activeIndex];
  if (previousActive && previousActive.entityId && window.DNDSummoning && typeof window.DNDSummoning.endTurn === 'function') window.DNDSummoning.endTurn(previousActive);
  t.activeIndex = (t.activeIndex + 1) % t.combatants.length;
  if (t.activeIndex === 0) t.round = (Number(t.round) || 1) + 1;
  var activeNow = t.combatants[t.activeIndex];
  if (activeNow) activeNow.turnResources = { action: true, bonusAction: true, reaction: true, movement: Number(activeNow.speed) || 30, movementUsed: 0 };
  if (activeNow && activeNow.entityId && window.DNDSummoning && typeof window.DNDSummoning.startTurn === 'function') window.DNDSummoning.startTurn(activeNow);
  _dndSave();
  renderInitiativeTracker();
  syncDndNetworkInitiative('next');
}

function previousInitiativeTurn() {
  ensureDndToolsState();
  var t = currentChar.initiativeTracker;
  if (!t.combatants.length) return;
  if (t.activeIndex === 0) {
    t.activeIndex = t.combatants.length - 1;
    t.round = Math.max(1, (Number(t.round) || 1) - 1);
  } else {
    t.activeIndex--;
  }
  _dndSave();
  renderInitiativeTracker();
  syncDndNetworkInitiative('previous');
}

function removeInitiativeCombatant(id) {
  ensureDndToolsState();
  var t = currentChar.initiativeTracker;
  var idx = t.combatants.findIndex(function(x){ return x.id === id; });
  if (idx < 0) return;
  t.combatants.splice(idx,1);
  if (t.activeIndex >= t.combatants.length) t.activeIndex = Math.max(0,t.combatants.length-1);
  _dndSave();
  renderInitiativeTracker();
  syncDndNetworkInitiative('remove');
}

function clearInitiativeTracker() {
  if (!confirm('Очистить весь трекер инициативы?')) return;
  currentChar.initiativeTracker = { round: 1, activeIndex: 0, combatants: [] };
  _dndSave();
  renderInitiativeTracker();
  syncDndNetworkInitiative('clear');
}

function renderInitiativeTracker() {
  var box = document.getElementById('initiativeTrackerList');
  if (!box || !currentChar) return;
  ensureDndToolsState();
  var t = currentChar.initiativeTracker;
  var html = `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
    <strong>Раунд ${Number(t.round)||1}</strong>
    <span style="display:flex;gap:5px;"><button class="btn-action" onclick="previousInitiativeTurn()">◀</button><button class="btn-action" onclick="nextInitiativeTurn()">▶ Следующий ход</button></span>
  </div>`;
  if (!t.combatants.length) html += '<div style="color:#777;text-align:center;padding:8px;">Добавьте героя, компаньона или противника.</div>';
  else html += t.combatants.map(function(c,i){
    var active = i === t.activeIndex;
    return `<div style="padding:7px;margin-bottom:5px;border:1px solid ${active ? '#d4af37' : '#444'};background:${active ? '#302a18' : '#252525'};border-radius:6px;">
      <div style="display:flex;gap:5px;align-items:center;">
        <strong style="min-width:28px;">${Number(c.initiative)||0}</strong>
        <input value="${escapeDndHtml(c.name)}" oninput="updateInitiativeCombatant('${c.id}','name',this.value)" style="flex:1;">
        <button class="btn-del" onclick="removeInitiativeCombatant('${c.id}')">✕</button>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:5px;margin-top:4px;">
        <label style="font-size:.7em;color:#aaa;">Иници.<input type="number" value="${Number(c.initiative)||0}" oninput="updateInitiativeCombatant('${c.id}','initiative',this.value)"></label>
        <label style="font-size:.7em;color:#aaa;">HP<input type="number" value="${Number(c.hp)||0}" oninput="updateInitiativeCombatant('${c.id}','hp',this.value)"></label>
        <label style="font-size:.7em;color:#aaa;">КД<input type="number" value="${Number(c.ac)||0}" oninput="updateInitiativeCombatant('${c.id}','ac',this.value)"></label>
      </div>
    </div>`;
  }).join('');
  box.innerHTML = html;
}

function shortRestCharacter() {
  if (!currentChar) return;
  if (window.dndNetwork && window.dndNetwork.state && window.dndNetwork.state.role === 'player' && window.dndNetwork.state.connected) { window.dndNetwork.playerAction('SHORT_REST', {}); alert('Короткий отдых отправлен мастеру.'); return; }
  // Pact Magic refreshes on a short rest. Keep both legacy and current schemas
  // synchronized because older saves may contain either one.
  if (currentChar.pactMagicData) currentChar.pactMagicData.used = 0;
  if (currentChar.pactMagic) currentChar.pactMagic.used = 0;
  if (typeof window.restorePactMagic === 'function') window.restorePactMagic();
  // Универсальный трекер: короткий отдых не восстанавливает обычные spell slots.
  currentChar.lastRest = { type: 'short', at: new Date().toISOString() };
  _dndSave();
  alert('Короткий отдых отмечен.');
}

function longRestCharacter() {
  if (!currentChar) return;
  if (window.dndNetwork && window.dndNetwork.state && window.dndNetwork.state.role === 'player' && window.dndNetwork.state.connected) { window.dndNetwork.playerAction('LONG_REST', {}); alert('Длинный отдых отправлен мастеру.'); return; }
  currentChar.hpCurrent = currentChar.hpMax;
  if (currentChar.hp) {
    currentChar.hp.current = currentChar.hp.max;
    currentChar.hp.temp = 0;
  }
  if (currentChar.spellSlotsData) {
    Object.keys(currentChar.spellSlotsData).forEach(function(k){ currentChar.spellSlotsData[k].used = 0; });
  }
  if (currentChar.spells && currentChar.spells.slotsUsed) {
    Object.keys(currentChar.spells.slotsUsed).forEach(function(k){ currentChar.spells.slotsUsed[k] = 0; });
  }
  if (currentChar.pactMagicData) currentChar.pactMagicData.used = 0;
  if (currentChar.pactMagic) currentChar.pactMagic.used = 0;
  // A long rest fully restores HP. If this crosses 0 HP, the character is no
  // longer dying/unconscious and prior Death Saves must not persist.
  {
    if (currentChar.deathSaves) currentChar.deathSaves = {successes:0, failures:0};
    if (currentChar.activeConditions) {
      currentChar.activeConditions['Бессознателен'] = false;
      currentChar.activeConditions['Unconscious'] = false;
    }
    if (currentChar.conditions) {
      currentChar.conditions['Бессознателен'] = false;
      currentChar.conditions['Unconscious'] = false;
    }
    currentChar.defeated = false;
  }
  currentChar.lastRest = { type: 'long', at: new Date().toISOString() };
  _dndSave();
  if (typeof renderSpellSlots === 'function') renderSpellSlots();
  var hp = document.getElementById('hpCurrent');
  if (hp) hp.value = currentChar.hpCurrent;
  alert('Длинный отдых отмечен: HP восстановлены, использованные ячейки заклинаний сброшены.');
}

function escapeDndHtml(value) {
  return String(value == null ? '' : value)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

window.renderDndTools = renderDndTools;
