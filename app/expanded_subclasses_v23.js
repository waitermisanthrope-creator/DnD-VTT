/**
 * expanded_subclasses_v23.js
 * ------------------------------------------------------------------
 * ЧТО ЭТО ЗА ФАЙЛ: мостит подклассы v23 в старый SUBCLASSES_REFERENCE,
 * чтобы экран создания и level-up видели сторонние архетипы.
 * КАК РАБОТАЕТ: добавляет метаданные только для трёх новых классов;
 * runtime-эффекты живут в expanded_classes_v23.js.
 * ОСНОВНЫЕ ПЕРЕМЕННЫЕ: SUBCLASSES_REFERENCE, PACK_SUBCLASSES.
 * ИСТОЧНИК: структурные метаданные проекта; оригинальный текст книг не копируется.
 * НЕ ИЗМЕНЯЕТ Wallpapers.js/Ambiences.js.
 * ------------------------------------------------------------------
 */
(function(g){
 'use strict';
 var r=g.SUBCLASSES_REFERENCE||(g.SUBCLASSES_REFERENCE={});
 function add(cls,arr){r[cls]=r[cls]||{};arr.forEach(function(x){r[cls][x.name]={source:x.source||'Third-party',description:x.description||'Сторонний подкласс, подключаемый через Content Framework.',pickLevel:3,levels:{3:{features:x.features||[]}}};});}
 add('Иллирригер',[{name:'Hell Knight',features:['Infernal Armor']},{name:'Shadowmaster',features:['Shadow Step']},{name:'Painkiller',features:['Pain Transfer']},{name:'Dread Duelist',features:['Infernal Duel']},{name:'Hellspeaker',features:['Command Seal']}]);
 add('Бистхарт',[{name:'Beastcaller',features:['Bonded Beast']},{name:'Dire Hunter',features:['Predatory Strike']},{name:'Pack Leader',features:['Pack Tactics']},{name:'Primal Soul',features:['Primal Bond']},{name:'Wild Heart',features:['Feral Form']}]);
 add('Пугилист',[{name:'The Sweet Science',features:['Technical Boxer']},{name:'The Street Fighter',features:['Dirty Tricks']},{name:'The Bloodhound',features:['Relentless Pursuit']},{name:'Knuckle Bone',features:['Bone Breaker']}]);
})(window);
