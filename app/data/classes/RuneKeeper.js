/**
 * RuneKeeper.js — шаблон класса Рунный хранитель.
 * Этап 1: требования, руническое оружие, руны и Rune Secrets.
 */
window.runeKeeperProgression={
 className:"Рунный хранитель",englishName:"Rune Keeper",source:"third-party/homebrew",status:"skeleton",edition:"5E",
 hitDie:10,primaryStat:"intelligence",secondaryStat:"strength",savingThrows:["constitution","intelligence"],
 armor:["light","medium","shields"],weapons:["simple","martial"],tools:["smiths_tools"],
 multiclassRequirement:{strength:13,intelligence:13},multiclassProficiencies:{armor:["light","medium","shields"],weapons:["simple","martial"]},
 skills:{choose:2,from:["arcana","athletics","history","investigation","nature","perception","religion","survival"]},
 subclassLevel:3,subclassFeatureLevels:[3,7,10,15],
 levels:{1:{features:["Заготовка: Find Runes","Заготовка: Runic Weapon"]},2:{features:["Заготовка: Fighting Style","Заготовка: Rune Magic"]},3:{features:["Заготовка: Rune Secret","Заготовка: Enhanced Runic Weapon"]},4:{features:["Увеличение характеристик (ASI) или Черта"],asi:true},5:{features:["Заготовка: Extra Attack"]},6:{features:["Заготовка: Enchanting Rune","Заготовка: Extra Attunement"]},7:{features:["Заготовка: Rune Secret feature"]},8:{features:["Увеличение характеристик (ASI) или Черта"],asi:true},9:{features:[]},10:{features:["Заготовка: Rune Secret feature"]},11:{features:["Заготовка: Enchanting Rune","Заготовка: Eyes of the Rune Keeper"]},12:{features:["Увеличение характеристик (ASI) или Черта"],asi:true},13:{features:[]},14:{features:["Заготовка: Magical Rampage"]},15:{features:["Заготовка: Rune Secret feature"]},16:{features:["Увеличение характеристик (ASI) или Черта"],asi:true},17:{features:[]},18:{features:["Заготовка: Enchanting Rune"]},19:{features:["Увеличение характеристик (ASI) или Черта"],asi:true},20:{features:["Заготовка: Permanent Runes"]}},
 mechanics:{runePool:"pending",runicWeapon:"pending",runeSecrets:"pending",spellcasting:"pending",enchantingRunes:"pending",notes:"Этап 1 — структура. Названия Rune Secrets и численные рунические эффекты будут уточнены перед реализацией."}
};
