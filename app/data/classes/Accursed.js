/**
 * Accursed.js — шаблон класса Аккурсд.
 * Этап 1: базовые требования, проклятие, симптомы и прогрессия.
 */
window.accursedProgression={
 className:"Аккурсд",englishName:"Accursed",source:"Blackbando / third-party",status:"skeleton",edition:"5E 2014",
 hitDie:10,primaryStat:"wisdom",secondaryStat:"constitution",savingThrows:["strength","constitution"],
 armor:["light","medium"],weapons:["simple","martial"],tools:[],
 multiclassRequirement:{wisdom:13},multiclassProficiencies:{tools:["one_tool"],weapons:["simple"]},
 skills:{choose:2,from:["acrobatics","athletics","deception","intimidation","perception","stealth","survival"]},
 subclassLevel:1,subclassFeatureLevels:[1,6,9,13],
 levels:{1:{features:["Заготовка: Unarmored Defense","Заготовка: Cursed"]},2:{features:["Заготовка: Fighting Style","Заготовка: Instinct"]},3:{features:["Заготовка: Symptoms","Заготовка: Cravings"]},4:{features:["Увеличение характеристик (ASI) или Черта"],asi:true},5:{features:["Заготовка: Extra Attack"]},6:{features:["Заготовка: Curse feature"]},7:{features:["Заготовка: Living Nightmare"]},8:{features:["Увеличение характеристик (ASI) или Черта"],asi:true},9:{features:["Заготовка: Affliction","Заготовка: Curse feature"]},10:{features:["Заготовка: Inflict Cravings"]},11:{features:["Заготовка: Bump in the Night"]},12:{features:["Увеличение характеристик (ASI) или Черта"],asi:true},13:{features:["Заготовка: Curse feature"]},14:{features:["Заготовка: Hexed Resistance"]},15:{features:[]},16:{features:["Увеличение характеристик (ASI) или Черта"],asi:true},17:{features:["Заготовка: Extra Attack II"]},18:{features:["Заготовка: Self-Control"]},19:{features:["Увеличение характеристик (ASI) или Черта"],asi:true},20:{features:["Заготовка: Curse feature"]}},
 mechanics:{cursed:"pending",symptoms:"pending",cravings:"pending",affliction:"pending",curseSystem:"pending",notes:"Этап 1 — структура; конкретные симптомы и пять Curse paths будут реализованы отдельно."}
};
