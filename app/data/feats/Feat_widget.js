/**
 * Feat_widget.js
 * Виджет отображения, добавления и удаления черт персонажа с поддержкой динамической прозрачности.
 */

function renderCharacterFeatsOnSkillsTab(hero) {
    if (!hero) {
        hero = window.currentCharacter;
    }
    if (!hero) return;

    const containerId = 'characterFeatsWidgetContainer';
    let block = document.getElementById(containerId);

    var swiperContainer = document.getElementById('swiper');
    var skillsPanel = null;

    if (swiperContainer && swiperContainer.children.length > 1) {
        skillsPanel = swiperContainer.children[1];
    }

    if (!skillsPanel) {
        var allPanels = document.querySelectorAll('.sheet-tab, [class*="tab"], section, div');
        for (var i = 0; i < allPanels.length; i++) {
            var t = allPanels[i].innerText || '';
            if (t.indexOf('Акробатика') !== -1 && t.indexOf('Обман') !== -1 && t.indexOf('Внимательность') !== -1) {
                skillsPanel = allPanels[i];
                break;
            }
        }
    }

    if (skillsPanel) {
        if (!block) {
            block = document.createElement('div');
            block.id = containerId;
            // Динамический фон через CSS-переменную прозрачности
            block.style.cssText = 'margin-top: 15px; margin-bottom: 25px; background: var(--panel-bg, rgba(28, 28, 30, 0.65)); backdrop-filter: blur(8px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.3);';
        }

        var profBlock = document.getElementById('dynamicProficienciesBlock');
        if (profBlock && profBlock.parentNode === skillsPanel) {
            skillsPanel.insertBefore(block, profBlock.nextSibling);
        } else {
            skillsPanel.appendChild(block);
        }
    }

    if (!block) return;

    block.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #333; padding-bottom: 8px;">
            <h3 style="margin: 0; color: #ffb74d; font-size: 16px; font-weight: bold;">Черты</h3>
            <button onclick="window.openAddFeatModal()" style="background: #ffb74d; color: #000; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: bold;">+ Добавить</button>
        </div>
        <div id="characterFeatsItemsList" style="display: flex; flex-direction: column; gap: 8px;"></div>
    `;

    var listContainer = document.getElementById('characterFeatsItemsList');
    if (!listContainer) return;

    const heroFeats = hero.feats || hero.features || [];
    if (heroFeats.length === 0) {
        listContainer.innerHTML = '<div style="color: #777; font-size: 13px; font-style: italic; text-align: center; padding: 10px 0;">У персонажа пока нет выбранных черт</div>';
        return;
    }

    var html = '';
    for (var k = 0; k < heroFeats.length; k++) {
        var featName = heroFeats[k];
        var featObj = getFeatObjectData(featName);
        
        var sourceTag = featObj.source ? `[${featObj.source}] ` : '';
        var baseNameRu = featObj.nameRu || featName;
        var baseNameEng = featObj.name ? ` (${featObj.name})` : '';
        var displayName = sourceTag + baseNameRu + baseNameEng;

        var featDesc = featObj.description || 'Описание отсутствует.';
        var featActionHtml = '';
        if (window.DNDFeats && featObj.id && window.DNDFeats.isActive(featObj.id)) {
            featActionHtml = '<button onclick="window.useFeat(\'' + String(featObj.id) + '\')" style="background:#ffb74d;color:#000;border:none;border-radius:6px;padding:4px 8px;font-size:11px;font-weight:bold;cursor:pointer;">Использовать</button>';
        }

        // Если у этой черты был применён бонус характеристики — показываем это
        var appliedBonusText = '';
        if (hero.featStatBonuses && hero.featStatBonuses[featName]) {
            var rec = hero.featStatBonuses[featName];
            appliedBonusText = '<span style="font-size: 11px; background: rgba(76,175,80,0.15); color: #81c784; padding: 2px 6px; border-radius: 4px; white-space: nowrap;">+' + rec.value + ' ' + (FEAT_STAT_LABELS[rec.stat] || rec.stat) + '</span>';
        }

        var reqText = formatFeatPrerequisite(getFeatFullData(featName) || {});
        var reqHtml = reqText ? '<div style="font-size: 11px; color: #888; margin-top: 4px;">Требование: ' + reqText + '</div>' : '';

        html += '<div style="display: flex; justify-content: space-between; align-items: flex-start; background: var(--item-bg, rgba(0, 0, 0, 0.2)); padding: 10px 12px; border-radius: 8px; border-left: 3px solid #ffb74d; border: 1px solid rgba(255,255,255,0.06); border-left-width: 3px;">' +
                  '<div style="flex-grow: 1; padding-right: 10px;">' +
                    '<div style="font-weight: bold; font-size: 14px; color: #fff; display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">' + 
                      displayName + appliedBonusText + featActionHtml +
                    '</div>' +
                    '<div style="font-size: 12px; color: #aaa; margin-top: 3px; line-height: 1.3;">' + featDesc + '</div>' +
                    reqHtml +
                  '</div>' +
                  '<button onclick="window.removeCharacterFeat(' + k + ')" style="background: none; border: none; color: #ff6b6b; cursor: pointer; font-size: 16px; padding: 2px 6px;" title="Удалить">✕</button>' +
                '</div>';
    }
    listContainer.innerHTML = html;
}

// Допустимые ключи характеристик — используется для защиты от мусорных данных
// (например, статBonus с заглушкой вместо реального ключа характеристики).
var FEAT_VALID_STATS = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
var FEAT_STAT_LABELS = { str: 'Сила', dex: 'Ловкость', con: 'Телосложение', int: 'Интеллект', wis: 'Мудрость', cha: 'Харизма' };

// Собирает все базы черт (как getFeatObjectData/populateFeatModalList) и возвращает
// ПОЛНЫЙ исходный объект черты (с statBonus и prerequisite), а не урезанную копию.
function getFeatFullData(featName) {
    let allSources = [];
    for (let key in window) {
        if (key.toLowerCase().includes('feat')) {
            const val = window[key];
            if (val && typeof val === 'object' && val !== document) {
                if (Array.isArray(val)) allSources = allSources.concat(val);
                else allSources = allSources.concat(Object.values(val).flat());
            }
        }
    }
    for (const item of allSources) {
        if (!item || typeof item !== 'object') continue;
        const engName = item.name || item.title;
        const idName = item.id;
        if (engName === featName || item.nameRu === featName || idName === featName) {
            return item;
        }
    }
    return null;
}

// Возвращает только валидные ключи характеристик из statBonus.stats (защита от опечаток в базе данных)
function getValidStatBonusKeys(statBonus) {
    if (!statBonus || !Array.isArray(statBonus.stats)) return [];
    return statBonus.stats.filter(function(s) { return FEAT_VALID_STATS.indexOf(s) !== -1; });
}

// Короткое читаемое описание требования черты (только для информации, ничего не блокирует)
function formatFeatPrerequisite(featObj) {
    var req = featObj && featObj.prerequisite;
    if (!req) return '';
    if (req.stat && req.min) {
        var txt = FEAT_STAT_LABELS[req.stat] || req.stat;
        txt += ' ' + req.min + '+';
        if (req.altStat && req.altMin) {
            txt += ' (или ' + (FEAT_STAT_LABELS[req.altStat] || req.altStat) + ' ' + req.altMin + '+)';
        }
        return txt;
    }
    if (req.race) return 'Раса: ' + req.race;
    if (req.proficiency) return 'Владение: ' + req.proficiency;
    if (req.feat) return 'Черта: ' + req.feat;
    if (req.spellcasting) return 'Наличие заклинаний';
    return '';
}

// Начисляет бонус характеристики от черты и запоминает это в hero.featStatBonuses,
// чтобы при удалении черты бонус можно было корректно снять.
function applyFeatStatBonus(hero, featName, statKey, value) {
    if (!hero || FEAT_VALID_STATS.indexOf(statKey) === -1) return;
    if (!hero.featStatBonuses) hero.featStatBonuses = {};
    if (hero.featStatBonuses[featName]) return; // уже применено — не начисляем повторно

    var input = document.getElementById(statKey);
    var current = input ? (parseInt(input.value) || 10) : (parseInt(hero.stats && hero.stats[statKey]) || 10);
    var updated = Math.min(20, current + value);

    if (input) input.value = updated;
    if (!hero.stats) hero.stats = {};
    hero.stats[statKey] = updated;

    hero.featStatBonuses[featName] = { stat: statKey, value: value };

    if (typeof calculateMods === 'function') calculateMods();
}

// Снимает ранее начисленный чертой бонус характеристики (при удалении черты)
function revertFeatStatBonus(hero, featName) {
    if (!hero || !hero.featStatBonuses || !hero.featStatBonuses[featName]) return;
    var record = hero.featStatBonuses[featName];
    var input = document.getElementById(record.stat);
    var current = input ? (parseInt(input.value) || 10) : (parseInt(hero.stats && hero.stats[record.stat]) || 10);
    var updated = Math.max(1, current - record.value);

    if (input) input.value = updated;
    if (!hero.stats) hero.stats = {};
    hero.stats[record.stat] = updated;

    delete hero.featStatBonuses[featName];

    if (typeof calculateMods === 'function') calculateMods();
}

// Поиск данных черты
function getFeatObjectData(featName) {
    let allSources = [];
    const specificSources = [
        window.feats_phb, window.feats_tcoe, window.feats_xgte, window.feats_settings, window.feats_ua_homebrew,
        window.Feats, window.FEATS
    ];
    specificSources.forEach(src => {
        if (src) {
            if (Array.isArray(src)) allSources = allSources.concat(src);
            else if (typeof src === 'object') allSources = allSources.concat(Object.values(src).flat());
        }
    });

    for (let key in window) {
        if (key.toLowerCase().includes('feat')) {
            const val = window[key];
            if (val && typeof val === 'object' && val !== document) {
                if (Array.isArray(val)) allSources = allSources.concat(val);
                else allSources = allSources.concat(Object.values(val).flat());
            }
        }
    }

    for (const item of allSources) {
        if (!item || typeof item !== 'object') continue;
        const engName = item.name || item.title;
        const idName = item.id;
        if (engName === featName || item.nameRu === featName || idName === featName) {
            return {
                name: engName || featName,
                nameRu: item.nameRu || engName || featName,
                description: item.description || item.text || 'Описание отсутствует.',
                source: item.source || 'PHB'
            };
        }
    }
    return { name: featName, nameRu: featName, description: 'Описание из баз данных не найдено.', source: 'PHB' };
}

window.removeCharacterFeat = function(index) {
    if (!window.currentCharacter) return;
    const hero = window.currentCharacter;

    // Определяем имя удаляемой черты ДО удаления из массива, чтобы можно было
    // корректно снять бонус характеристики, который она давала (если давала).
    var heroFeatsRef = hero.feats || hero.features || [];
    var featName = heroFeatsRef[index];
    if (featName !== undefined) {
        revertFeatStatBonus(hero, featName);
    }

    if (hero.feats && hero.feats[index] !== undefined) {
        hero.feats.splice(index, 1);
    }
    if (hero.features && hero.features[index] !== undefined) {
        hero.features.splice(index, 1);
    }
    
    if (typeof autoSaveCurrentCharacter === 'function') autoSaveCurrentCharacter();
    if (typeof saveAllCharacters === 'function') saveAllCharacters();
    
    renderCharacterFeatsOnSkillsTab(hero);
};

// Модальное окно выбора черт с адаптивным фоном
window.openAddFeatModal = function() {
    let modal = document.getElementById('addFeatManualModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'addFeatManualModal';
        modal.style.cssText = 'display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:20006; justify-content:center; align-items:center; padding: 15px; box-sizing: border-box; backdrop-filter: blur(4px);';
        modal.innerHTML = `
            <div style="background: var(--panel-bg, rgba(30, 30, 30, 0.95)); backdrop-filter: blur(10px); border:1px solid rgba(255,255,255,0.15); border-radius:10px; padding:20px; width:100%; max-width:500px; max-height:85vh; display:flex; flex-direction:column; color:#fff; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px; margin-bottom: 12px;">
                    <h3 style="margin:0; color:#ffb74d; font-size: 1.1em;">📚 Выбор черты</h3>
                    <button class="btn-action" onclick="window.closeAddFeatModal()" style="background: #e53935; padding: 4px 8px; cursor: pointer; border:none; color:#fff; border-radius:4px;">✕</button>
                </div>
                
                <input type="text" id="featSearchInput" placeholder="🔍 Поиск черты..." oninput="window.filterFeatsList()" style="width:100%; padding:10px; background:var(--item-bg, rgba(0,0,0,0.3)); color:#fff; border:1px solid rgba(255,255,255,0.15); border-radius:6px; margin-bottom:12px; box-sizing:border-box; font-size: 0.9em;">

                <div id="featModalItemsContainer" style="overflow-y:auto; flex-grow:1; display:flex; flex-direction:column; gap:10px; padding-right: 4px;"></div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    window.populateFeatModalList('');
    modal.style.display = 'flex';
};

window.populateFeatModalList = function(filterText) {
    let allFeats = [];
    const specificSources = [
        window.feats_phb, window.feats_tcoe, window.feats_xgte, window.feats_settings, window.feats_ua_homebrew,
        window.Feats, window.FEATS
    ];
    specificSources.forEach(source => {
        if (source) {
            if (Array.isArray(source)) allFeats = allFeats.concat(source);
            else if (typeof source === 'object') allFeats = allFeats.concat(Object.values(source).flat());
        }
    });

    for (let key in window) {
        if (key.toLowerCase().includes('feat')) {
            const val = window[key];
            if (val && typeof val === 'object' && val !== document) {
                if (Array.isArray(val)) allFeats = allFeats.concat(val);
                else allFeats = allFeats.concat(Object.values(val).flat());
            }
        }
    }

    const groups = {
        'PHB': { label: '📖 Книга Игрока (PHB)', items: [] },
        'TCoE': { label: '🧪 Котёл всего Таши (TCoE)', items: [] },
        'XGtE': { label: '👁️ Руководство Ксанатара (XGtE)', items: [] },
        'Settings': { label: '🗺️ Сеттинги и другие книги', items: [] },
        'UA': { label: '🛠️ Unearthed Arcana & Homebrew', items: [] }
    };

    const seenNames = new Set();
    allFeats.forEach(feat => {
        if (!feat) return;
        let engName = typeof feat === 'string' ? feat : (feat.name || feat.title || feat.id);
        let ruName = typeof feat === 'object' ? (feat.nameRu || engName) : engName;
        let src = typeof feat === 'object' ? (feat.source || 'PHB') : 'PHB';
        let desc = typeof feat === 'object' ? (feat.description || feat.text || 'Описание отсутствует.') : 'Описание отсутствует.';
        let reqText = typeof feat === 'object' ? formatFeatPrerequisite(feat) : '';
        let statBonusKeys = typeof feat === 'object' ? getValidStatBonusKeys(feat.statBonus) : [];
        let bonusText = '';
        if (statBonusKeys.length === 1) {
            bonusText = '+' + feat.statBonus.value + ' ' + (FEAT_STAT_LABELS[statBonusKeys[0]] || statBonusKeys[0]);
        } else if (statBonusKeys.length > 1) {
            bonusText = '+' + feat.statBonus.value + ' (на выбор: ' + statBonusKeys.map(function(s){ return FEAT_STAT_LABELS[s] || s; }).join('/') + ')';
        }

        if (filterText) {
            const query = filterText.toLowerCase();
            const matches = engName.toLowerCase().includes(query) || ruName.toLowerCase().includes(query) || desc.toLowerCase().includes(query);
            if (!matches) return;
        }

        let groupKey = 'Settings';
        const sUp = String(src).toUpperCase();
        if (sUp.includes('PHB')) groupKey = 'PHB';
        else if (sUp.includes('TCOE') || sUp.includes('TCE')) groupKey = 'TCoE';
        else if (sUp.includes('XGTE') || sUp.includes('XGE')) groupKey = 'XGtE';
        else if (sUp.includes('UA') || sUp.includes('HOMEBREW')) groupKey = 'UA';

        if (engName && !seenNames.has(engName)) {
            seenNames.add(engName);
            groups[groupKey].items.push({ ru: ruName, eng: engName, source: src, desc: desc, req: reqText, bonus: bonusText });
        }
    });

    Object.keys(groups).forEach(k => {
        groups[k].items.sort((a, b) => a.ru.localeCompare(b.ru));
    });

    const container = document.getElementById('featModalItemsContainer');
    if (!container) return;

    let html = '';
    const groupOrder = ['PHB', 'TCoE', 'XGtE', 'Settings', 'UA'];

    groupOrder.forEach(key => {
        const group = groups[key];
        if (group.items.length > 0) {
            html += `<div style="color: #ffb74d; font-weight: bold; font-size: 0.9em; margin-top: 8px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 4px;">${group.label}</div>`;
            group.items.forEach(f => {
                var extraLine = '';
                if (f.bonus) extraLine += '<span style="font-size: 0.75em; background: rgba(76,175,80,0.15); color: #81c784; padding: 2px 6px; border-radius: 4px; margin-right: 6px;">' + f.bonus + '</span>';
                if (f.req) extraLine += '<span style="font-size: 0.75em; color: #888;">Треб.: ' + f.req + '</span>';

                html += `
                    <div onclick="window.confirmAddFeatManual('${f.eng}')" style="background: var(--item-bg, rgba(0,0,0,0.2)); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 10px; cursor: pointer; transition: background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.05)'" onmouseout="this.style.background='var(--item-bg, rgba(0,0,0,0.2))'">
                        <div style="font-weight: bold; font-size: 0.95em; color: #fff; display: flex; align-items: center; gap: 6px;">
                            <span style="font-size: 0.75em; background: rgba(255,183,77,0.15); color: #ffb74d; padding: 2px 6px; border-radius: 4px;">[${f.source}]</span>
                            ${f.ru} (${f.eng})
                        </div>
                        <div style="font-size: 0.8em; color: #aaa; margin-top: 4px; line-height: 1.3;">${f.desc}</div>
                        ${extraLine ? '<div style="margin-top: 6px;">' + extraLine + '</div>' : ''}
                    </div>
                `;
            });
        }
    });

    if (html === '') {
        html = '<div style="text-align: center; color: #777; padding: 20px; font-size: 0.9em;">Черты не найдены</div>';
    }

    container.innerHTML = html;
};

window.filterFeatsList = function() {
    const input = document.getElementById('featSearchInput');
    if (input) {
        window.populateFeatModalList(input.value);
    }
};

window.closeAddFeatModal = function() {
    const modal = document.getElementById('addFeatManualModal');
    if (modal) modal.style.display = 'none';
};

window.confirmAddFeatManual = function(chosenFeat) {
    if (!chosenFeat || !window.currentCharacter) return;

    const hero = window.currentCharacter;
    var alreadyHad = (hero.feats && hero.feats.includes(chosenFeat)) || (hero.features && hero.features.includes(chosenFeat));

    if (!hero.feats) hero.feats = [];
    if (!hero.feats.includes(chosenFeat)) {
        hero.feats.push(chosenFeat);
    }
    if (!hero.features) hero.features = [];
    if (!hero.features.includes(chosenFeat)) {
        hero.features.push(chosenFeat);
    }

    if (typeof autoSaveCurrentCharacter === 'function') autoSaveCurrentCharacter();
    if (typeof saveAllCharacters === 'function') saveAllCharacters();

    renderCharacterFeatsOnSkillsTab(hero);
    window.closeAddFeatModal();

    // --- Привязка механического эффекта черты к персонажу ---
    // Начисляем бонус характеристики, если он предусмотрен чертой и ещё не был начислен ранее.
    if (!alreadyHad) {
        var fullData = getFeatFullData(chosenFeat);
        var validStats = fullData ? getValidStatBonusKeys(fullData.statBonus) : [];

        if (validStats.length === 1) {
            applyFeatStatBonus(hero, chosenFeat, validStats[0], fullData.statBonus.value);
            if (typeof autoSaveCurrentCharacter === 'function') autoSaveCurrentCharacter();
            renderCharacterFeatsOnSkillsTab(hero);
        } else if (validStats.length > 1) {
            window.openFeatStatChoiceModal(chosenFeat, validStats, fullData.statBonus.value);
        }
    }
};

// Модальное окно выбора характеристики, когда черта даёт бонус "на выбор" (например, +1 к Силе или Ловкости)
window.openFeatStatChoiceModal = function(featName, statOptions, value) {
    var modal = document.getElementById('featStatChoiceModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'featStatChoiceModal';
        modal.style.cssText = 'display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:20007; justify-content:center; align-items:center; padding: 15px; box-sizing: border-box; backdrop-filter: blur(4px);';
        document.body.appendChild(modal);
    }

    var buttonsHtml = statOptions.map(function(s) {
        return '<button onclick="window.confirmFeatStatChoice(\'' + featName.replace(/'/g, "\\'") + '\', \'' + s + '\', ' + value + ')" ' +
            'style="flex: 1; min-width: 100px; background: #ffb74d; color: #000; border: none; padding: 12px; border-radius: 8px; font-weight: bold; cursor: pointer;">+' + value + ' ' + (FEAT_STAT_LABELS[s] || s) + '</button>';
    }).join('');

    modal.innerHTML = `
        <div style="background: var(--panel-bg, rgba(30, 30, 30, 0.95)); backdrop-filter: blur(10px); border:1px solid rgba(255,255,255,0.15); border-radius:10px; padding:20px; width:100%; max-width:420px; color:#fff; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
            <h3 style="margin: 0 0 12px 0; color: #ffb74d; font-size: 1.05em;">Выберите характеристику</h3>
            <p style="margin: 0 0 14px 0; font-size: 0.85em; color: #ccc;">Черта даёт бонус на выбор — какую характеристику увеличить?</p>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">${buttonsHtml}</div>
        </div>
    `;
    modal.style.display = 'flex';
};

window.confirmFeatStatChoice = function(featName, statKey, value) {
    if (window.currentCharacter) {
        applyFeatStatBonus(window.currentCharacter, featName, statKey, value);
        if (typeof autoSaveCurrentCharacter === 'function') autoSaveCurrentCharacter();
        renderCharacterFeatsOnSkillsTab(window.currentCharacter);
    }
    var modal = document.getElementById('featStatChoiceModal');
    if (modal) modal.style.display = 'none';
};

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-tab="skills"], #navSkills, .tab-skills, button').forEach(el => {
        if (el.textContent.includes('Навыки')) {
            el.addEventListener('click', () => {
                setTimeout(() => {
                    if (window.currentCharacter) {
                        renderCharacterFeatsOnSkillsTab(window.currentCharacter);
                    }
                }, 50);
            });
        }
    });
});
