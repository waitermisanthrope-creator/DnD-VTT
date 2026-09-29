/**
 * Shifter.js — шаблон класса Шифтер.
 * Этап 1: требования, владения, Wild Shifting и Bloodlines.
 */
window.shifterProgression={
 className:"Шифтер",englishName:"Shifter",source:"laserllama / third-party",status:"skeleton",edition:"5E 2014",
 hitDie:10,primaryStat:"constitution",secondaryStat:"wisdom",savingThrows:["dexterity","constitution"],
 armor:["light","medium","shields"],weapons:["simple","martial"],tools:[],
 multiclassRequirement:{constitution:13},multiclassProficiencies:{armor:["light","medium"],weapons:["simple"]},
 skills:{choose:2,from:["acrobatics","animalHandling","athletics","insight","nature","perception","stealth","survival"]},
 subclassLevel:3,subclassFeatureLevels:[3,6,10,14],
 levels:Object.assign({},...Array.from({length:20},(_,i)=>{const l=i+1,o={features:[]};if([4,8,12,16,19].includes(l)){o.features=["Увеличение характеристик (ASI) или Черта"];o.asi=true}return {[l]:o}})),
 mechanics:{wildShifting:"pending",feralPhysique:"pending",wildEmpathy:"pending",primevalForm:"pending",bloodlineSystem:"pending",notes:"Этап 1 — структура; формы зверей, расчёты характеристик и трансформация будут реализованы отдельно."}
};
window.shifterProgression.levels[1]={features:["Заготовка: Feral Physique","Заготовка: Wild Empathy"]};
window.shifterProgression.levels[2]={features:["Заготовка: Wild Shifting"]};
window.shifterProgression.levels[3]={features:["Заготовка: Bloodline","Заготовка: Primeval Form"],subclassLevel:true};
window.shifterProgression.levels[5]={features:["Заготовка: Extra Attack"]};
window.shifterProgression.levels[7]={features:["Заготовка: Improved Shifting"]};
window.shifterProgression.levels[11]={features:["Заготовка: Primal Strike"]};
window.shifterProgression.levels[15]={features:["Заготовка: Greater Shifting"]};
window.shifterProgression.levels[18]={features:["Заготовка: Apex Predator"]};
window.shifterProgression.levels[20]={features:["Заготовка: Perfect Form"]};
