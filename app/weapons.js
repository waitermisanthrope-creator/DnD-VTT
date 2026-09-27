// 1. Сборка общей базы оружия из всех категорий
window.defaultWeapons = [
    ...(window.meleeWeapons || []),
    ...(window.heavyWeapons || []),
    ...(window.rangedWeapons || []),
    ...(window.firearmWeapons || []),
    ...(window.specialWeapons || [])
];

// Убираем дубликаты по id
window.defaultWeapons = Array.from(new Set(window.defaultWeapons.map(w => w?.id).filter(Boolean)))
    .map(id => window.defaultWeapons.find(w => w?.id === id));

window.WEAPONS_DB = window.defaultWeapons;


// 2. Функция добавления оружия в инвентарь персонажа
function addPresetWeapon(weaponName) {
    const foundWeapon = window.defaultWeapons.find(w => w && w.name && w.name.toLowerCase() === weaponName.toLowerCase());
    
    if (!foundWeapon) {
        console.warn(`Оружие "${weaponName}" не найдено в базе WEAPONS_DB.`);
        return false;
    }

    if (typeof currentCharacter !== 'undefined' && currentCharacter) {
        if (!Array.isArray(currentCharacter.inventory)) {
            currentCharacter.inventory = [];
        }
        currentCharacter.inventory.push({ ...foundWeapon });
        console.log(`✅ В инвентарь добавлено: ${foundWeapon.name}`);
        return true;
    }
    return false;
}


// 3. ЭКИПИРОВКА ОРУЖИЯ С БЛОКИРОВКОЙ ПРИ ОТСУТСТВИИ НАВЫКА
function equipWeapon(weaponId) {
    if (typeof currentCharacter === 'undefined' || !currentCharacter) return false;

    const inventory = Array.isArray(currentCharacter.inventory) ? currentCharacter.inventory : [];
    const weaponsDb = Array.isArray(window.defaultWeapons) ? window.defaultWeapons : [];

    const weapon = inventory.find(w => w && w.id === weaponId) || 
                   weaponsDb.find(w => w && w.id === weaponId);

    if (!weapon) {
        console.warn("Оружие не найдено!");
        return false;
    }

    // Вызываем внешнюю проверку навыков (из файла Proficienciescheck.js)
    const hasProf = typeof checkCharacterProficiency === 'function' 
        ? checkCharacterProficiency(currentCharacter, weapon) 
        : true; // Страховка, если файл еще не подгрузился

    if (!hasProf) {
        const targetProfId = (Array.isArray(weapon.proficiencies) && weapon.proficiencies.length > 0) ? weapon.proficiencies[0] : null;
        const profObj = Array.isArray(window.PROFICIENCIES_DB) ? window.PROFICIENCIES_DB.find(p => p && p.id === targetProfId) : null;
        const profName = profObj ? profObj.name : (weapon.category || 'требуемый навык');

        alert(`❌ Персонаж не владеет данным типом снаряжения («${weapon.name || 'Предмет'}»).\nТребуется навык: "${profName}".\nЭкипировка заблокирована.`);
        return false;
    }

    // Успешная экипировка
    currentCharacter.equippedWeapon = weapon;
    console.log(`✅ Оружие "${weapon.name}" успешно надето.`);
    
    // Перерисовка интерфейса
    if (typeof updateUI === 'function') updateUI();
    else if (typeof renderInventory === 'function') renderInventory();

    return true;
}
