/* Extra-class fallback stubs.
 * IMPORTANT: never overwrite a real class bridge/runtime.
 */
(function(g){'use strict';
function make(name,hitDie,primaryStat,saves){var levels={};for(var i=1;i<=20;i++)levels[i]={features:[]};[4,8,12,16,19].forEach(function(l){levels[l]={features:['Временная заглушка: ASI / Черта'],asi:true};});levels[1]={features:['Временная заглушка класса «'+name+'»']};levels[3]={features:['Временная заглушка: подкласс'],subclassLevel:true};levels[20]={features:['Временная заглушка: финальная способность']};return{className:name,englishName:name,source:'Temporary project stub',status:'stub',hitDie:hitDie,primaryStat:primaryStat,savingThrows:saves,armor:[],weapons:['simple'],tools:[],multiclassRequirement:{},subclassLevel:3,levels:levels,mechanics:{status:'pending'}};}
if(!g.accursedProgression)g.accursedProgression=make('Аккурсд',10,'charisma',['constitution','charisma']);
if(!g.geistProgression)g.geistProgression=make('Гайст',8,'wisdom',['wisdom','charisma']);
if(!g.parasiteProgression)g.parasiteProgression=make('Паразит',10,'constitution',['constitution','wisdom']);
if(!g.walterParasiteProgression)g.walterParasiteProgression=make('Паразит доктора Вальтера',10,'highest_stat',['constitution','dexterity']);
if(!g.ghostProgression)g.ghostProgression=make('Призрак',8,'charisma',['wisdom','charisma']);
if(!g.psionProgression)g.psionProgression=make('Псионик',8,'intelligence',['intelligence','wisdom']);
if(!g.runeKeeperProgression)g.runeKeeperProgression=make('Рунный хранитель',10,'intelligence',['constitution','intelligence']);
if(!g.savantProgression)g.savantProgression=make('Савант',8,'intelligence',['intelligence','wisdom']);
if(!g.shifterProgression)g.shifterProgression=make('Шифтер',10,'dexterity',['dexterity','wisdom']);
if(!g.swarmProgression)g.swarmProgression=make('Рой',8,'wisdom',['dexterity','wisdom']);
if(!g.wardenProgression)g.wardenProgression=make('Страж',10,'constitution',['strength','constitution']);
if(!g.warlordProgression)g.warlordProgression=make('Военачальник',10,'strength',['strength','charisma']);
})(window);