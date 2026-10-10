/**
 * martyr_mhp_2024_runtime.js
 * Данные и частично исполняемый runtime Мученика 2024/5.5E.
 * API: window.martyrRuntime / window.martyrProgression.
 * Заклинания используют HP-жертву, а 14 Mortal Burdens подключаются как
 * структурированные подклассы с уровнями 3/6/14/18.
 */
(function(){
"use strict";
const PB=[0,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6];
const PREP=[0,2,3,4,5,6,6,7,7,8,8,10,10,11,11,12,12,14,14,15,15];
const MAX=[0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5];
const USES=[0,2,2,3,3,6,6,7,7,9,9,10,10,11,11,12,12,14,14,15,15];
const HIT_COST={1:5,2:10,3:20,4:30,5:40};
const spells={
1:["Bane","Bless","Command","Cure Wounds","Detect Evil and Good","Detect Magic","Detect Poison and Disease","Divine Favor","Guiding Bolt","Heroism","Inflict Wounds","Protection from Evil and Good","Purify Food and Drink","Sanctuary"],
2:["Aid","Augury","Calm Emotions","Darkvision","Enhance Ability","Ethereal Jaunt","Hold Person","Lesser Restoration","Magic Weapon","Prayer of Healing","Silence","Spiritual Weapon","Warding Bond"],
3:["Create Food and Water","Daylight","Dispel Magic","Divine Wrath","Magic Circle","Protection from Energy","Remove Curse","Revivify","Speak with Dead","Tongues","Water Walk","Word of Frailty"],
4:["Aura of Life","Banishment","Death Ward","Divination","Freedom of Movement","Locate Creature","Stoneskin"],
5:["Commune","Dispel Evil and Good","Flame Strike","Geas","Greater Restoration","Hallow","Hold Monster","Insect Plague","Mass Cure Wounds","Raise Dead","Word of Control"]
};
const burdens={};
function burden(name,desc,spellsByLevel,features){burdens[name]={name,description:desc,featureLevels:[3,6,14,18],alwaysPrepared:spellsByLevel,features};}
burden("Бремя анонимности","Работа из тени, без славы и признания.",{
3:["Disguise Self","Expeditious Retreat"],5:["Invisibility","Silence"],9:["Sending","Word of Transience"],13:["Arcane Eye","Greater Invisibility"],17:["Modify Memory","Passwall"]
},{3:["Владение Скрытностью и инструментами воров."],6:["Исчезновение: при инициативе можно стать Невидимым до конца следующего хода; часть эффектов позволяет восстановить невидимость через жертву HP."],14:["Ложная смерть: при уроне или спасении от гибели создаётся убедительный двойник, а вы перемещаетесь в известное место; 1/долгий отдых."],18:["Божественный убийца: преимущества против обнаружения; невидимость становится быстрым действием и её HP-цена уменьшается."]});
burden("Бремя вознесения","Выполнение божественных трудов ради посмертного возвышения.",{
3:["Divine Favor","Heroism"],5:["Enhance Ability","Locate Object"],9:["Beacon of Hope","Protection from Energy"],13:["Death Ward","Locate Creature"],17:["Hold Monster","Legend Lore"]
},{3:["Аегис, Оракул и Ксифос — три легендарных предмета, связанные с вашими трудами; каждый получает особую функцию."],6:["Божественные труды: известные вам задания получают преимущество на D20 Test; завершение труда увеличивает максимум HP."],14:["Высшая награда: одно из связанных с предметами чудесных применений усиливается; ресурсы можно возвращать через радиантную жертву."],18:["Вознесение: финальный набор преимуществ для легендарных предметов и выполнения последнего труда."]});
burden("Бремя искупления","Защита невиновных и искупление прошлых ошибок.",{
3:["Cure Wounds","Sanctuary"],5:["Calm Emotions","Lesser Restoration"],9:["Remove Curse","Speak with Dead"],13:["Death Ward","Stoneskin"],17:["Greater Restoration","Mass Cure Wounds"]
},{3:["Перенаправление: реакцией можно принять на себя атаку, предназначенную союзнику в 5 футах."],6:["Искупительная жертва: использование Торжества/Мучения для защиты других можно восстанавливать дополнительной радиантной ценой."],14:["Сила искупления: защитные эффекты распространяются на союзников и помогают снять состояния/последствия."],18:["Последнее искупление: ответная магия и спасение союзника получают усиление, связанное с вашим HP-жертвованием."]});
burden("Бремя бедствия","Вестник чумы, стихийных бедствий и дурных знамений.",{
3:["Contagion","Fog Cloud"],5:["Bestow Curse","Sleet Storm"],9:["Blight","Call Lightning"],13:["Control Water","Insect Plague"],17:["Contagion","Control Winds"]
},{3:["Знамение бедствия: создаёте локальные разрушительные проявления и получаете тематическое преимущество на D20 Tests."],6:["Катастрофический призыв: после получения радиантного урона можно вызвать случайный эффект бедствия в зоне."],14:["Отречение от арканы: враги, полагающиеся на магию, получают помехи/урон от ваших бедствий; эффект можно поддерживать жертвой HP."],18:["Апокалиптический ответ: реакцией на полученный урон применяете бедственный эффект и уменьшаете собственную цену заклинания."]});
burden("Бремя раздора","Распространяет хаос и ломает привычный порядок.",{
3:["Chaos Bolt","Dissonant Whispers"],5:["Mirror Image","Shatter"],9:["Confusion","Haste"],13:["Dimension Door","Polymorph"],17:["Mislead","Passwall"]
},{3:["Хаос!: после попадания оружием раз за отдых/через 5 HP жертвы бросок по таблице хаоса: лечение, огонь, толчок, телепорт, сбивание с ног и другие случайные эффекты."],6:["Монета хаоса: добавляет к D20 Test +4 или +1; после использования переходит GM и затем возвращается."],14:["Раскол реальности: случайные эффекты хаоса становятся сильнее и чаще."],18:["Хаотический триумф: критические/случайные эффекты могут накладывать состояния Charmed, Frightened или Poisoned либо автоматически критовать атаку."]});
burden("Бремя конца","Предотвращение грядущей катастрофы любой ценой.",{
3:["Chromatic Orb","Protection from Evil and Good","Sacred Flame"],5:["Darkness","Shatter"],9:["Counterspell","Lightning Bolt"],13:["Banishment","Blight"],17:["Cone of Cold","Telekinesis"]
},{3:["Мистическая мудрость: владение Arcana с бонусом Wisdom; восстановление части использований после короткого отдыха 1/долгий отдых."],6:["Освящённая аркана: выбранные заклинания Бремени конца требуют меньше радиантной цены."],14:["Жертвенное заклинание: за 10 радиантного урона можно усилить спасбросок против заклинания помехой или ускорить заклинание до бонусного действия с ограничениями."],18:["Мстительное заклинание: реакцией после урона врага можно сотворить атакующее заклинание 1–3 уровня с уменьшенной ценой жертвы."]});
burden("Бремя славы","Божественная знаменитость и сила публичного присутствия.",{
3:["Charm Person","Unseen Servant"],5:["Misty Step","Suggestion"],9:["Hypnotic Pattern","Tongues"],13:["Compulsion","Private Sanctum"],17:["Dominate Person","Teleportation Circle"]
},{3:["Мистическая сценическая речь: владение Performance и бонус Wisdom к проверкам."],6:["Звёздный эффект: Charm Person можно колдовать без радиантной цены; очарованные вами существа воспринимают вас как выдающуюся знаменитость."],14:["Сияющая слава: вокруг вас действует аура, усиливающая союзников и социальные D20 Tests."],18:["Легендарная репутация: сильнейшие эффекты очарования/телепортации получают сниженную цену и расширенный контроль."]});
burden("Бремя лёгкости","Инструмент богов-трикстеров, созданный для хаоса и веселья.",{
3:["Disguise Self","Hideous Laughter","Minor Illusion"],5:["Calm Emotions","Misty Step"],9:["Major Image","Stinking Cloud"],13:["Confusion","Dimension Door"],17:["Modify Memory","Seeming"]
},{3:["Левитация: владение Performance и бонус Wisdom; Charm/иллюзии становятся частью вашей божественной роли."],6:["Звёздный розыгрыш: Charm Person без цены; очарованный воспринимает вас как знаменитость."],14:["Заносчивая мисдирекция: Reprisal может перенаправить атаку на другую подходящую цель."],18:["Безумное перенаправление: иллюзорные/телепортационные эффекты становятся быстрыми и получают сниженные затраты."]});
burden("Бремя милосердия","Целитель и носитель надежды.",{
3:["Cure Wounds","Protection from Evil and Good"],5:["Lesser Restoration","Prayer of Healing"],9:["Remove Curse","Revivify"],13:["Aura of Life","Death Ward"],17:["Mass Cure Wounds","Raise Dead"]
},{3:["Милосердное исцеление: заклинания из списка Бремени не требуют радиантной цены."],6:["Добродетельные благословения: после долгого отдыха благословляет до Wisdom существ бонусом к скорости, социальным/мудрым проверкам или инициативе."],14:["Осуждающий свет: 30-футовая аура наносит радиантный урон выбранному типу сверхъестественных существ и защищает союзников от их магии."],18:["Святое исцеление: исцеление добавляет уровень Мученика; каждое существо ограничено дополнительным исцелением раз за долгий отдых."]});
burden("Бремя одиссеи","Нескончаемое путешествие исследования и открытий.",{
3:["Expeditious Retreat","Feather Fall"],5:["Gust of Wind","Misty Step"],9:["Fly","Water Walk"],13:["Dimension Door","Freedom of Movement"],17:["Passwall","Teleportation Circle"]
},{3:["Ловкость путешественника: улучшенная скорость и движение по сложной местности."],6:["Естественный спутник: Find Familiar и Speak with Animals без радиантной цены и расхода использования."],14:["Шаг зефира: после достаточного перемещения атаки против вас получают помеху, а Sacrificial Strike временно не требует цены."],18:["Нескончаемый путь: экстремальная мобильность, защита и усиленные перемещения между точками мира."]});
burden("Бремя возрождения","Восстановление разрушенной природы.",{
3:["Entangle","Find Familiar","Goodberry","Shillelagh","Speak with Animals"],5:["Pass without Trace","Spike Growth"],9:["Plant Growth","Speak with Plants"],13:["Giant Insect","Hallucinatory Terrain"],17:["Awaken","Reincarnate"]
},{3:["Природный спутник: Find Familiar и Speak with Animals без цены."],6:["Надёжная поступь: сложная местность не замедляет вас и союзников рядом; защита от Entangle/Spike Growth/Plant Growth."],14:["Зелёная стойкость: бонусным действием на минуту получаете регенерацию и сопротивление дробящему/колющему/рубящему."],18:["Колесо жизни: Reincarnate без материальных компонентов и радиантной цены; при смерти возможно возвращение через 24 часа, с ограниченным повтором."]});
burden("Бремя революции","Освобождение угнетённых и свержение тиранов.",{
3:["Command","Heroism"],5:["Hold Person","Magic Weapon"],9:["Divine Wrath","Protection from Energy"],13:["Stoneskin","Wall of Fire"],17:["Hold Monster","Telepathic Bond"]
},{3:["Боевые владения и знамя восстания: дополнительная защита/временные HP после короткой активации."],6:["Аура стойкости: союзники в 30 футах добавляют Wisdom к инициативе; эффект не работает при Incapacitated."],14:["Неукротимое знамя: вы и союзники получают защиту от Charmed/Frightened и усиление воли."],18:["Удар сплочения: после Sacrificial Strike союзник в 30 футах может реакцией сделать оружейную атаку; также доступны эффекты против поверженных врагов."]});
burden("Бремя истины","Пророк, несущий миру опасное знание.",{
3:["Identify","Word of Force"],5:["Word of Terror","Zone of Truth"],9:["Sending","Word of Transience"],13:["Divination","Freedom of Movement"],17:["Legend Lore","True Seeing"]
},{3:["Пророческая речь: бонус к расследованию/проверкам знания и способности раскрывать ложь."],6:["Пророческое восстановление: после короткого отдыха можно вернуть часть использований заклинаний."],14:["Истинное слово: жертвенный эффект усиливает контроль, раскрытие скрытого и защиту от обмана."],18:["Последнее откровение: сильнейшая пророческая магия и возможность раскрыть скрытые свойства существа/явления."]});
burden("Бремя тирании","Тёмный мученик, предназначенный для покорения.",{
3:["Command","Dissonant Whispers"],5:["Hold Person","Spiritual Weapon"],9:["Fear","Slow"],13:["Dominate Beast","Stoneskin"],17:["Dominate Person","Hold Monster"]
},{3:["Властное присутствие: бонус к Запугиванию; атаки/заклинания получают преимущества против запуганных целей."],6:["Аура подчинения: враги в области получают штраф к инициативе и спасброскам против ваших эффектов страха/контроля."],14:["Раздавить волю: реакцией/жертвой HP можно усилить контроль и навязать состояние Frightened/Charmed."],18:["Верховный тиран: после Sacrificial Strike союзник не требуется — вы можете продолжить цепочку атак/контроля против подавленных врагов."]});
const levels={};for(let l=1;l<=20;l++)levels[l]={proficiencyBonus:PB[l],preparedSpells:PREP[l],maxSpellLevel:MAX[l],spellUses:USES[l],features:{
1:["Доспех веры","Использование заклинаний","Мастерство оружия"],2:["Чудесное исцеление","Воздаяние"],3:["Подкласс Мученика","Жертва"],4:["Увеличение характеристик / Черта"],5:["Дополнительная атака"],6:["Способность подкласса"],7:["Жертва врага"],8:["Увеличение характеристик / Черта"],9:["Божественная передышка"],10:["Неумирающий"],11:["Улучшенный жертвенный удар"],12:["Увеличение характеристик / Черта"],13:["Божественная передышка — улучшение"],14:["Способность подкласса"],15:["Шествие к судьбе"],16:["Увеличение характеристик / Черта"],17:["Божественная передышка и улучшенный жертвенный удар"],18:["Способность подкласса"],19:["Эпический дар"],20:["Последнее мученичество"]}[l]||[]};
const progression={className:"Мученик",englishName:"Martyr",edition:"5.5E",source:"Mage Hand Press — Martyr 2024 / Complete Martyr 2024",status:"implemented_partial_2024_runtime",hitDie:12,primaryStat:"wisdom",secondaryStatChoice:["strength","dexterity"],savingThrows:["strength","wisdom"],armor:["light","shields"],weapons:["simple","martial"],skills:{choose:2,from:["athletics","history","insight","intimidation","medicine","persuasion","religion"]},multiclassRequirement:{wisdom:13,strengthOrDexterity:13},levels,spellcasting:{ability:"wisdom",preparedByLevel:PREP,maxSpellLevelByLevel:MAX,spellUsesByLevel:USES,hpDamageBySlot:HIT_COST,spellList:spells,focus:"holy_symbol",cantrips:[]},burdens};
const runtime={progression,burdens,spellList:spells,mechanics:{armorOfFaith:["medium+Wis AC","unarmored 10+Dex+Wis"],spellcasting:{damageType:"radiant",ignoresResistance:true,ignoresImmunity:true,bypassesTempHP:true,noConcentrationCheck:true,noHealingFromOwnSpells:true},miraculousHealing:"bonus_action: spend up to floor(level/2) Hit Dice, each + Con",reprisal:"reaction: halve visible melee damage; attacker takes radiant/necrotic d6 (2d6 lv5,3d6 lv11,4d6 lv17)",sacrifice:{bonusAction:true,selfDamage:5,targetExtraRadiant:10,improvedAt11:{selfDamage:10,targetExtraRadiant:20},freeAt17:true},sacrificeFoe:"kill with Sacrifice removes self-damage",divineRespite:{levels:{9:3,13:6,17:10},oncePerLongRest:true},undying:"0 HP -> 1 HP + Miraculous Healing, 1/long rest",marchUntoDestiny:["no food/drink","immune paralyzed/petrified/stunned"],finalMartyrdom:"10 minutes: advantage all D20, immune all damage/conditions except grappled/invisible/prone/unconscious, free Wish, then irreversible death"},sync(c){const l=Math.max(1,Math.min(20,Number(c?.level)||1)),w=Number(c?.wisdom??c?.abilities?.wisdom??10),m=Math.floor((w-10)/2);return Object.assign({},levels[l],{spellSaveDC:8+PB[l]+m,spellAttackBonus:PB[l]+m,hpCostBySlot:HIT_COST})}};

function martyrState(c){c.classFeaturesState=c.classFeaturesState||{};return c.classFeaturesState.martyr=c.classFeaturesState.martyr||{};}
function martyrEntry(c){return (c&&c.classes||[]).find(x=>x&&(['Мученик','Martyr'].includes(x.name)||x.englishName==='Martyr'));}
function martyrLevel(c){var e=martyrEntry(c);return Math.max(0,Math.min(20,e?Number(e.level)||0:Array.isArray(c&&c.classes)?0:Number(c&&c.level)||0));}
function ability(c,k){var a=c.abilityScores||c.stats||c.abilities||c;return Math.floor((Number(a[k]??a[k.slice(0,3)]??10)-10)/2);}
function hp(c){return Number(c.hpCurrent??c.hp?.current??c.hp)||0;}
function pool(c,id,max,legacy){c.resources=c.resources||{};var r=c.resources[id];if(!r)r=c.resources[id]={current:legacy==null?max:legacy};r.max=max;r.current=Math.max(0,Math.min(max,Number(r.current)||0));r.recharge='long';return r;}
const burdenAliases={mercy:'Бремя милосердия',revolution:'Бремя революции',truth:'Бремя истины',awakening:'Бремя возрождения'};
function burdenName(n){return burdens[n]?n:burdenAliases[n]||Object.keys(burdens).find(k=>k.replace('Бремя ','').toLowerCase()===String(n).replace(/^Burden of /i,'').toLowerCase());}
function martyrSync(c){
 var l=martyrLevel(c),s=martyrState(c);if(!l)return s;var e=martyrEntry(c),selected=e&&e.subclass;
 s.burden=burdenName(selected)||(!selected?burdenName(s.burden):null)||null;s.level=l;s.proficiencyBonus=Number(c.proficiencyBonus)||PB[l];
 s.preparedMax=PREP[l];s.maxSpellLevel=MAX[l];s.spellUsesMax=USES[l];s.spellSaveDC=8+s.proficiencyBonus+ability(c,'wisdom');s.spellAttackBonus=s.proficiencyBonus+ability(c,'wisdom');
 var r=pool(c,'martyrSpellUses',USES[l],s.spellUses);s.spellUses=r.current;
 s.divineRespiteMax=l>=17?10:l>=13?6:l>=9?3:0;r=pool(c,'martyrDivineRespite',l>=9?1:0,s.divineRespiteUses);s.divineRespiteUses=r.current;
 r=pool(c,'martyrUndying',l>=10?1:0,s.undyingUsed?0:undefined);s.undyingAvailable=l>=10;s.undyingUsed=r.current===0;
 return s;
}
function martyrPrepareBurden(c,name){name=burdenName(name);if(martyrLevel(c)<3||!name)return {ok:false,reason:'Нужны 3 уровень Мученика и известное Бремя.'};martyrState(c).burden=name;var e=martyrEntry(c);if(e)e.subclass=name;return {ok:true,burden:name,data:burdens[name]};}
function martyrCast(c,spellLevel,spellName){
 var l=martyrLevel(c),s=martyrSync(c),sl=Number(spellLevel),B=window.DNDCombat;
 if(!l||!Number.isInteger(sl)||sl<1||sl>MAX[l]||!spellName)return {ok:false,reason:'Нужны доступный уровень и конкретное заклинание.'};
 var extra=s.burden&&burdens[s.burden].alwaysPrepared||{},available=(spells[sl]||[]).slice();
 // Burden keys are class levels 3/5/9/13/17, not spell levels.
 Object.keys(extra).forEach(k=>{if(Number(k)<=l&&Math.max(1,Math.floor((Number(k)+3)/4))===sl)available.push(...extra[k]);});
 if(!available.includes(spellName)||c.resources.martyrSpellUses.current<1)return {ok:false,reason:'Заклинание или использование недоступно.'};
 var cost=HIT_COST[sl];if(s.burden==='Бремя милосердия'&&Object.values(extra).flat().includes(spellName))cost=0;
 if(!B||!B.payHitPointCost||hp(c)<=cost)return {ok:false,reason:'Недостаточно HP или нет обработчика оплаты.'};
 var paid=B.payHitPointCost(c,cost);if(!paid.ok)return paid;c.resources.martyrSpellUses.current--;martyrSync(c);
 return {ok:true,reserved:true,spell:spellName,spellLevel:sl,hpCost:cost,remaining:s.spellUses,message:'Оплата зарезервирована; эффект заклинания требует общего spell executor.'};
}
function hitDicePool(c){
 var r=c.resources&&c.resources.hitDice;if(r&&typeof r==='object'&&Number.isFinite(Number(r.current))&&Number.isFinite(Number(r.max)))return {current:Number(r.current),max:Number(r.max),write:n=>r.current=n};
 if(Number.isFinite(Number(c.hitDiceRemaining))&&Number.isFinite(Number(c.hitDiceMax)))return {current:Number(c.hitDiceRemaining),max:Number(c.hitDiceMax),write:n=>c.hitDiceRemaining=n};
 return null;
}
function martyrHeal(c,dice){
 var l=martyrLevel(c),n=Number(dice),p=hitDicePool(c),B=window.DNDCombat;
 if(l<2||!Number.isInteger(n)||n<1||n>Math.floor(l/2)||!p||p.current<n||!B)return {ok:false,reason:'Нужны доступные Кости хитов и допустимое целое количество.'};
 var rolled=B.rollDice(n+'d12').total,amount=Math.max(0,rolled+ability(c,'constitution')*n);p.write(p.current-n);var healed=B.heal(c,amount);
 return {ok:true,hitDiceSpent:n,rolled,healing:healed,remaining:p.current-n,message:'Чудесное исцеление: +'+healed.amount+' HP.'};
}
function martyrUseDivineRespite(c,amount){
 var s=martyrSync(c),p=hitDicePool(c),r=c.resources&&c.resources.martyrDivineRespite,n=amount==null?s.divineRespiteMax:Number(amount);
 if(martyrLevel(c)<9||!r||r.current<1||!p||!Number.isInteger(n)||n<1||n>s.divineRespiteMax||p.current>=p.max)return {ok:false,reason:'Передышка требует потраченные Кости хитов и дневное использование.'};
 n=Math.min(n,p.max-p.current);p.write(p.current+n);r.current--;martyrSync(c);return {ok:true,hitDiceRestored:n,message:'Восстановлено Костей хитов: '+n};
}
function martyrUndying(c){
 var s=martyrSync(c),r=c.resources&&c.resources.martyrUndying,B=window.DNDCombat;
 if(martyrLevel(c)<10||!r||r.current<1||hp(c)!==0||c.dead||c.instantDeath||!B)return {ok:false,reason:'Неумирающий применяется при 0 HP один раз за долгий отдых.'};
 var healed=B.heal(c,1);if(!healed.amount)return {ok:false,reason:'Восстановление HP заблокировано.'};r.current--;martyrSync(c);return {ok:true,hitPointsAfter:hp(c),triggerHealing:true,message:'Неумирающий: 1 HP; доступно Чудесное исцеление.'};
}
function martyrSacrifice(c,target,improved){
 var l=martyrLevel(c),B=window.DNDCombat;if(l<3||!target||target===c||hp(target)<=0||!B)return {ok:false,reason:'Нужна живая цель Жертвенного удара.'};
 var cost=improved&&l>=11?10:5,extra=improved&&l>=11?20:10;
 if(l<17&&hp(c)<=cost)return {ok:false,reason:'Недостаточно HP для жертвы.'};
 var hit=B.applyDamage(target,extra,'radiant',{ignoreResistance:true,ignoreImmunity:true,source:'martyr-sacrifice'});
 var waived=l>=17||l>=7&&hp(target)===0;if(!waived)B.payHitPointCost(c,cost);
 return {ok:true,selfDamage:waived?0:cost,targetExtraRadiant:extra,damage:hit,message:'Жертвенный удар применён.'};
}
function martyrReprisal(c,ctx){
 var l=martyrLevel(c),B=window.DNDCombat,attacker=ctx.returnTarget||ctx.attacker;
 if(l<2||ctx.source!=='attack'||!['weapon','meleeWeapon'].includes(ctx.attackKind)||ctx.visible===false||Number(ctx.amount)<=0||!attacker||!B||c.turnResources&&(c.turnResources.reaction===false||c.turnResources.reaction===0))return {ok:false,reason:'Нужна доступная реакция на видимую рукопашную атаку.'};
 var amount=Math.ceil(Number(ctx.amount)/2),rolled=B.rollDice((l>=17?4:l>=11?3:l>=5?2:1)+'d6').total;
 var hit=B.applyDamage(attacker,rolled,ctx.returnDamageType==='necrotic'?'necrotic':'radiant',{source:'martyr-reprisal'});if(c.turnResources)c.turnResources.reaction=false;
 return {ok:true,id:'reprisal',applied:true,reduced:Number(ctx.amount)-amount,remainingAmount:amount,returnDamage:hit,message:'Воздаяние: входящий урон уменьшен вдвое.'};
}
function martyrArmor(c){
 if(c.armorEquipped||c.equippedArmor||c.equipment&&(c.equipment.armor||c.equipment.armour))return {ok:false,unsupported:true,reason:'Вариант с бронёй требует единый расчёт КД экипировки.'};
 var ac=10+ability(c,'dexterity')+ability(c,'wisdom')+(c.shieldEquipped||c.equippedShield||c.equipment&&c.equipment.shield?2:0);c.ac=Math.max(Number(c.ac)||0,ac);return {ok:true,ac:c.ac,message:'Доспех веры: КД '+c.ac};
}
function martyrRest(c,type){var s=martyrSync(c);if(type==='long'){['martyrSpellUses','martyrDivineRespite','martyrUndying'].forEach(k=>{var r=c.resources[k];r.current=r.max;});martyrSync(c);}return s;}
function martyrFinalMartyrdom(c){return {ok:false,unsupported:true,reason:'Полный цикл Последнего мученичества ещё не реализован.'};}
function martyrUse(c,id,ctx){
 ctx=ctx||{};var D=window.DNDContent;if(!D||!D.resolveFeature(c,id,'Мученик'))return {ok:false,unavailable:true,reason:'Способность Мученика недоступна.'};martyrSync(c);
 if(id==='martyr-chooseBurden')return martyrPrepareBurden(c,ctx.burden||ctx.choice);
 if(id==='armorOfFaith')return martyrArmor(c);
 if(id==='miraculousHealing')return martyrHeal(c,ctx.dice??ctx.hitDice);
 if(id==='divineRespite')return martyrUseDivineRespite(c,ctx.amount);
 if(id==='undying')return martyrUndying(c);
 if(id==='sacrifice'||id==='sacrificialStrike'||id==='improvedSacrificialStrike')return martyrSacrifice(c,ctx.target,id==='improvedSacrificialStrike'||ctx.improved);
 if(id==='reprisal')return martyrReprisal(c,ctx);
 return {ok:false,unsupported:true,reason:'Эффект этой особенности ещё не подключён.'};
}
const pack={id:'mh-martyr',name:'Мученик',aliases:['Martyr'],source:progression.source,authoritativeSubclasses:true,subclassLevel:3,
 features:[['armorOfFaith','Доспех веры',1,'utility'],['martyrMagic','Заклинания Мученика',1,'utility'],['miraculousHealing','Чудесное исцеление',2,'bonus'],['reprisal','Воздаяние',2,'reaction'],['martyr-chooseBurden','Выбор Бремени',3,'choice'],['sacrifice','Жертвенный удар',3,'bonus'],['sacrificialStrike','Жертвенный удар',3,'bonus'],['martyrExtraAttack','Дополнительная атака',5,'passive'],['sacrificeFoe','Жертва врага',7,'passive'],['divineRespite','Божественная передышка',9,'utility'],['undying','Неумирающий',10,'reaction'],['improvedSacrificialStrike','Улучшенный жертвенный удар',11,'bonus'],['marchUntoDestiny','Шествие к судьбе',15,'passive'],['finalMartyrdom','Последнее мученичество',20,'action']].map(([id,name,level,action])=>({id,name,level,action})),
 subclasses:Object.keys(burdens).map(name=>({id:name,name,description:burdens[name].description,pickLevel:3,features:[3,6,14,18].map(level=>({id:'martyr-'+name+'-'+level,name:name+' — '+level+' уровень',level,action:'utility',description:(burdens[name].features[level]||[]).join(' ')}))})),
 hooks:{sync:martyrSync,useFeature:martyrUse,rest:martyrRest,attackModifiers:()=>({extraAttacks:0}),reactionOptions:(c,ctx)=>martyrLevel(c)>=2&&ctx.source==='attack'&&['weapon','meleeWeapon'].includes(ctx.attackKind)&&ctx.visible!==false&&ctx.returnTarget&&Number(ctx.amount)>0?[{id:'reprisal',priority:15,label:'Воздаяние',description:'Уменьшить рукопашный урон вдвое и ответить излучением.'}]:[]}};
pack.hooks.attackModifiers=c=>({extraAttacks:martyrLevel(c)>=5?2:1});
if(window.DNDContent)window.DNDContent.registerClass(pack);else (window.DND_PENDING_CLASS_PACKS=window.DND_PENDING_CLASS_PACKS||[]).push(pack);
window.martyrRuntime=runtime;window.MARTYR_2024=runtime;window.martyrRuntime.useFeature=martyrUse;window.martyrRuntime.state=martyrState;window.martyrRuntime.sync=martyrSync;window.martyrRuntime.prepareBurden=martyrPrepareBurden;window.martyrRuntime.cast=martyrCast;window.martyrRuntime.rest=martyrRest;window.martyrRuntime.miraculousHealing=martyrHeal;window.martyrRuntime.useDivineRespite=martyrUseDivineRespite;window.martyrRuntime.undying=martyrUndying;window.martyrRuntime.sacrifice=martyrSacrifice;window.martyrRuntime.finalMartyrdom=martyrFinalMartyrdom;window.martyrProgression=progression;window.MARTYR_BURDENS=burdens;
})();
/* V70.26.92 closure pass: executable spell-use, burden, rest and martyr-resource APIs. */
