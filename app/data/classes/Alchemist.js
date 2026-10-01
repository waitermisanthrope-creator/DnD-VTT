/**
 * Alchemist.js
 * Карманный ВТТ — класс «Алхимик».
 * Источник механики: Mage Hand Press, Alchemist 2024 / 5.5E.
 */
(function(g){
'use strict';
var levels={};for(var i=1;i<=20;i++)levels[i]={features:[]};
levels[1]={features:['Бомбы','Реагенты','Варка зелий']};
levels[2]={features:['Прайм-бомба','Формулы бомб','Синтез реагентов']};
levels[3]={features:['Подкласс Алхимика'],subclassLevel:true};
levels[4]={features:['Увеличение характеристик (ASI) или Черта','Зелья'],asi:true};
levels[5]={features:['Открытие','Улучшенные бомбы']};
levels[6]={features:['Особенность подкласса']};
levels[7]={features:['Уклонение']};
levels[8]={features:['Увеличение характеристик (ASI) или Черта','Зелья'],asi:true};
levels[9]={features:['Открытие']};
levels[10]={features:['Особенность подкласса']};
levels[11]={features:['Покрытие взрыва']};
levels[12]={features:['Увеличение характеристик (ASI) или Черта','Зелья'],asi:true};
levels[13]={features:['Открытие']};
levels[14]={features:['Особенность подкласса']};
levels[15]={features:['Миксолог зелий']};
levels[16]={features:['Увеличение характеристик (ASI) или Черта','Зелья'],asi:true};
levels[17]={features:['Открытие']};
levels[18]={features:['Экспериментатор']};
levels[19]={features:['Эпический дар']};
levels[20]={features:['Философский камень','Ядерная бомба']};
g.alchemistProgression={
 className:'Алхимик',englishName:'Alchemist',source:'Mage Hand Press — Alchemist 2024 / 5.5E',
 status:'in_progress_runtime',runtimeVersion:'1.7.0-bombs-grafts-combat',edition:'5.5E / 2024',hitDie:8,primaryStat:'dexterity',secondaryStat:'intelligence',
 savingThrows:['dexterity','intelligence'],armor:['light'],weapons:['simple'],tools:['alchemist_supplies'],
 multiclassRequirement:{dexterity:13,intelligence:13},
 multiclassProficiencies:{armor:['light'],weapons:['simple'],tools:['alchemist_supplies']},
 startingEquipment:{a:['2 кинжала','Кожаный доспех','Инструменты алхимика','Алхимический огонь','Набор учёного','6 зм'],b:['160 зм']},
 skills:{choose:3,from:['arcana','history','insight','medicine','nature','perception','sleightOfHand','survival']},
 subclassLevel:3,subclassFeatureLevels:[3,6,10,14],
 progression:{bombDamage:['1d10','1d10','1d10','1d10','2d10','2d10','2d10','2d10','2d10','2d10','3d10','3d10','3d10','3d10','3d10','3d10','4d10','4d10','4d10','4d10'],primeBomb:[0,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5],reagents:[2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40],formulas:[0,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,8,8]},
 bomb:{damage:'1d10 fire + Dexterity modifier',range:'30/90',radiusFt:5,properties:['destructible','finesse','thrown'],mastery:'explode',intelligentExplosions:true,saveAbility:'dexterity'},
 bombFormulas:['Acid Bomb','Bramble Bomb','Concussion Bomb','Cryo Bomb','Fear Bomb','Holy Bomb','Impact Bomb','Incendiary Bomb','Laughing Gas Bomb','Lightning Bomb','Oil Bomb','Paint Bomb','Prismatic Bomb','Quiet Bomb','Seeking Bomb','Smoke Bomb','Teleportation Bomb','Withering Bomb'],
 discoveries:['Alchemy of Alteration','Alchemy of Poison','Alchemy of Restoration','Arcane Studies','Combat Studies','Fundamental Alchemy','Guided Explosives','Homunculus','Precision Explosives','Unconventional Explosives','Unconventional Potions'],
 subclasses:[
  {id:'amorist',name:'Аморист'},{id:'apothecary',name:'Аптекарь'},{id:'dynamoEngineer',name:'Инженер-динамо'},
  {id:'ionizer',name:'Ионизатор'},{id:'madBomber',name:'Безумный бомбардир'},{id:'mutagenist',name:'Мутагенист'},
  {id:'oozeRancher',name:'Разводчик слизней'},{id:'pigmentist',name:'Пигментист'},{id:'resonator',name:'Резонатор'},
  {id:'venomsmith',name:'Веномсмит'},{id:'xenoalchemist',name:'Ксеноалхимик'}
 ],
 mechanics:{bombs:'implemented_core',reagents:'implemented_core',potionBrewing:'implemented_core',primeBomb:'implemented_core',bombFormulas:'core_registry',reagentSynthesis:'implemented_core',discoveries:'core_registry',improvedBombs:'implemented_core',evasion:'implemented_core',blastCoating:'implemented_core',potionMixologist:'implemented_core',experimentalist:'implemented_core',philosophersStone:'implemented_core',nuclearBomb:'implemented_core',subclassSystem:'runtime_registered_2024_in_progress',subclassFeatureIdResolution:'fixed',discoveryLevelGating:'fixed',notes:'2024 runtime подключён: бомбы, 18 формул, реагенты, зелья, Prime Bomb, Synthesis, Discoveries, уровни 1–20 и 11 регистраций подклассов. Формулы передают эффекты в combat resolver, длительность зелий уменьшается по окончанию хода, долгий отдых очищает временные эффекты. Класс остаётся in_progress: не все формулы/области и особенности 11 подклассов имеют полное боевое поведение; нужны CI и игровой QA.'},
 levels:levels
};
})(window);
