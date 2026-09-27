/**
 * Proficienciescheck.js
 * ------------------------------------------------------------------
 * ЧТО ЭТО ЗА ФАЙЛ:
 * Сборка общей базы оружия (window.WEAPONS_DB) из отдельных файлов
 * (weaponsmelee.js, weaponsheavy.js, weaponsranged.js, weaponsspecial.js)
 * и проверка владения оружием персонажем перед экипировкой.
 *
 * ИСПРАВЛЕНО В ЭТОЙ ВЕРСИИ (не связано с мультиклассом, но критично):
 * В исходном файле было две версии функции checkCharacterProficiency,
 * случайно вложенные одна в другую — из-за незакрытой скобки внешней
 * функции ВЕСЬ файл падал с SyntaxError при загрузке страницы, и функции
 * проверки владения/экипировки оружия были полностью недоступны во всём
 * приложении. Оставлена более полная версия проверки (с автосозданием
 * character.proficiencies и поддержкой огнестрельного оружия).
 *
 * КАКИЕ ПЕРЕМЕННЫЕ ИСПОЛЬЗУЕТ:
 * - window.meleeWeapons / heavyWeapons / rangedWeapons / firearmWeapons /
 *   specialWeapons -> собираются в window.WEAPONS_DB
 * - currentCharacter.proficiencies, currentCharacter.inventory,
 *   currentCharacter.equippedWeapon
 * ------------------------------------------------------------------
 */
// ==========================================
// 1. СБОРКА БАЗЫ ОРУЖИЯ
// ==========================================
window.defaultWeapons = [
    ...(window.meleeWeapons || []),
    ...(window.heavyWeapons || []),
    ...(window.rangedWeapons || []),
    ...(window.firearmWeapons || []),
    ...(window.specialWeapons || [])
];

window.defaultWeapons = Array.from(new Set(window.defaultWeapons.map(w => w?.id).filter(Boolean)))
    .map(id => window.defaultWeapons.find(w => w?.id === id));

window.WEAPONS_DB = window.defaultWeapons;


//// ==========================================
// СТРОГАЯ И НАДЕЖНАЯ ПРОВЕРКА ВЛАДЕНИЙ (С ОТЛАДКОЙ СТРУКТУРЫ)
// ------------------------------------------------------------------
// ИСПРАВЛЕНО: в исходном файле здесь были ДВЕ версии функции
// checkCharacterProficiency, вложенные одна в другую (осталось от
// незавершённой правки) — из-за этого весь файл не парсился браузером
// (SyntaxError: Unexpected end of input), и ВСЯ проверка владения оружием
// в приложении была сломана. Оставлена более полная (вторая) версия.
// ==========================================
function checkCharacterProficiency(character, weapon) {
    if (!character) return false;
    if (!weapon) return false;

    // Если у персонажа вообще нет массива владений, создаем его на лету
    if (!Array.isArray(character.proficiencies)) {
        character.proficiencies = [];
    }

    console.log("📦 СЫРЫЕ ДАННЫЕ character.proficiencies:", character.proficiencies);

    const profs = character.proficiencies;
    
    // Собираем все ID владений, которые есть у персонажа
    const profIds = profs.map(p => {
        if (!p) return '';
        if (typeof p === 'string') return p.trim().toLowerCase();
        if (typeof p === 'object') {
            return String(p.id || p.value || p.key || p.code || '').trim().toLowerCase();
        }
        return '';
    }).filter(Boolean);

    console.log(`🔍 Обработанные ID владений персонажа:`, profIds);

    const weaponId = String(weapon.id || '').trim().toLowerCase();
    const catStr = String(weapon.category || '').toLowerCase();

    // 1. ПРОВЕРКА ПО КОНКРЕТНОМУ ID 
    const specificProf1 = weaponId; 
    const specificProf2 = weaponId.replace('w_', 'p_weap_'); 
    const specificProf3 = weaponId.replace('p_weap_', 'w_'); 

    const hasSpecificProf = profIds.includes(specificProf1) || 
                            profIds.includes(specificProf2) || 
                            profIds.includes(specificProf3);

    if (hasSpecificProf) {
        console.log(`✅ Успех: найдено персональное владение для "${weapon.name}"`);
        return true;
    }

    // 2. ПРОВЕРКА ПО ОБЩИМ КАТЕГОРИЯМ
    const hasSimpleAll = profIds.includes('p_weapon_simple') || profIds.includes('simple') || profIds.includes('простое');
    const hasMartialAll = profIds.includes('p_weapon_martial') || profIds.includes('martial') || profIds.includes('воинское');
    const hasFirearmsAll = profIds.includes('p_firearms') || profIds.includes('огнестрел');

    // Определяем категорию самого оружия
    const isSimple = catStr.includes('простое') || catStr.includes('simple') || 
                     weaponId.includes('club') || weaponId.includes('dagger') || 
                     (weaponId.includes('axe') && !catStr.includes('воинское') && !catStr.includes('боевой')) || 
                     weaponId.includes('javelin') || weaponId.includes('hammer') || 
                     weaponId.includes('mace') || weaponId.includes('quarterstaff') || 
                     weaponId.includes('sickle') || weaponId.includes('spear') || 
                     weaponId.includes('sling') || weaponId.includes('crossbow_light') || weaponId.includes('shortbow');

    const isMartial = catStr.includes('воинское') || catStr.includes('martial') || catStr.includes('тяжелое') || 
                      catStr.includes('двуручный') || catStr.includes('хоумбрю') || 
                      weaponId.includes('maul') || weaponId.includes('glaive') || 
                      weaponId.includes('halberd') || weaponId.includes('rapier') || 
                      weaponId.includes('scimitar') || weaponId.includes('sword') || 
                      weaponId.includes('trident') || weaponId.includes('whip') || 
                      weaponId.includes('pike') || weaponId.includes('lance') || 
                      weaponId.includes('flail') || weaponId.includes('nodachi');

    const isFirearm = catStr.includes('огнестрел');

    if (hasMartialAll && (isMartial || isSimple)) {
        console.log(`✅ Успех: доступ по общему воинскому навыку для "${weapon.name}"`);
        return true;
    }
    
    if (hasSimpleAll && isSimple) {
        console.log(`✅ Успех: доступ по общему простому навыку для "${weapon.name}"`);
        return true;
    }

    if (hasFirearmsAll && isFirearm) {
        console.log(`✅ Успех: доступ по навыку огнестрела для "${weapon.name}"`);
        return true;
    }

    console.log(`❌ ОТКАЗ В ЭКИПИРОВКЕ: "${weapon.name}". Категория: "${catStr}", ID: "${weaponId}". У персонажа нет ни персонального ID, ни подходящей общей категории.`);
    return false;
}

// ==========================================
// 3. ДОБАВЛЕНИЕ В ИНВЕНТАРЬ
// ==========================================
function addPresetWeapon(weaponName) {
    if (!window.defaultWeapons) return false;
    const foundWeapon = window.defaultWeapons.find(w => w && w.name && w.name.toLowerCase() === weaponName.toLowerCase());
    if (!foundWeapon) return false;

    if (typeof currentCharacter !== 'undefined' && currentCharacter) {
        if (!currentCharacter.inventory || Array.isArray(currentCharacter.inventory)) {
            var legacy = Array.isArray(currentCharacter.inventory) ? currentCharacter.inventory : [];
            currentCharacter.inventory = { weapons: legacy, armor: [], consumables: [], materials: [], junk: [] };
        }
        if (!Array.isArray(currentCharacter.inventory.weapons)) currentCharacter.inventory.weapons = [];
        currentCharacter.inventory.weapons.push({ ...foundWeapon });
        console.log(`✅ В инвентарь добавлено: ${foundWeapon.name}`);
        return true;
    }
    return false;
}


// ==========================================
// 4. ЭКИПИРОВКА ОРУЖИЯ
// ==========================================
function equipWeapon(weaponId) {
    if (typeof currentCharacter === 'undefined' || !currentCharacter) return false;

    const inv = currentCharacter.inventory;
    const inventory = Array.isArray(inv) ? inv : (inv && Array.isArray(inv.weapons) ? inv.weapons : []);
    const weaponsDb = Array.isArray(window.defaultWeapons) ? window.defaultWeapons : [];

    const weapon = inventory.find(w => w && w.id === weaponId) || 
                   weaponsDb.find(w => w && w.id === weaponId);

    if (!weapon) return false;

    // Проверяем навык владения
    if (!checkCharacterProficiency(currentCharacter, weapon)) {
        const targetProfId = (Array.isArray(weapon.proficiencies) && weapon.proficiencies.length > 0) ? weapon.proficiencies[0] : null;
        const profObj = Array.isArray(window.PROFICIENCIES_DB) ? window.PROFICIENCIES_DB.find(p => p && p.id === targetProfId) : null;
        const profName = profObj ? profObj.name : (weapon.category || 'требуемый навык');

        alert(`❌ Персонаж не владеет данным типом снаряжения («${weapon.name || 'Предмет'}»).\nТребуется навык: "${profName}".\nЭкипировка заблокирована.`);
        return false;
    }

    currentCharacter.equippedWeapon = weapon;
    console.log(`✅ Оружие "${weapon.name}" успешно надето.`);
    
    if (typeof updateUI === 'function') updateUI();
    else if (typeof renderInventory === 'function') renderInventory();

    return true;
}
