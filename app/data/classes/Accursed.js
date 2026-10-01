/* Accursed.js — authoritative 1–20 class contract. */
(function(g){
  'use strict';
  var p=g.accursedProgression||{};
  p.className='Аккурсд';
  p.englishName='Accursed';
  p.hitDie=10;
  p.primaryStat='curseAbility';
  p.savingThrows=['wisdom','curseAbility'];
  p.skills={choose:2,from:['arcana','deception','insight','intimidation','investigation','survival']};
  p.armor=['light','medium'];
  p.weapons=['simple','handCrossbow'];
  p.subclassLevel=1;
  p.specializationName='Завоёванное проклятие';
  p.subclasses=[
    {id:'animation',name:'Проклятие оживления'},
    {id:'armament',name:'Проклятие оружия'},
    {id:'combustion',name:'Проклятие воспламенения'},
    {id:'created',name:'Проклятие созданного'},
    {id:'immortality',name:'Проклятие бессмертия'},
    {id:'misfortune',name:'Проклятие несчастья'},
    {id:'mummification',name:'Проклятие мумификации'},
    {id:'petrification',name:'Проклятие окаменения'},
    {id:'somnolence',name:'Проклятие сонливости'}
  ];
  var levels={};
  for(var i=1;i<=20;i++)levels[i]={features:[]};
  levels[1]={features:['Завоёванное проклятие','Сглаз']};
  levels[2]={features:['Маледикционная метаморфоза','Колдовство','Контроль недуга']};
  levels[3]={features:['Особенность завоёванного проклятия','Ревнивый морок']};
  levels[4]={features:['Увеличение характеристик / черта'] ,asi:true};
  levels[5]={features:['Увеличение характеристик / черта','Дополнительная атака']};
  levels[6]={features:['Универсальность маледикции']};
  levels[7]={features:['Защита от чужих проклятий']};
  levels[8]={features:['Особенность завоёванного проклятия','Увеличение характеристик / черта'],asi:true};
  levels[10]={features:['Дополнительная маледикционная метаморфоза']};
  levels[11]={features:['Особенность завоёванного проклятия']};
  levels[12]={features:['Улучшение Ревнивого морока','Увеличение характеристик / черта'],asi:true};
  levels[14]={features:['Увеличение характеристик / черта'],asi:true};
  levels[16]={features:['Увеличение характеристик / черта'],asi:true};
  levels[19]={features:['Особенность завоёванного проклятия','Увеличение характеристик / черта'],asi:true};
  levels[20]={features:['Увеличение характеристик / черта','Улучшение Ревнивого морока'],asi:true};
  p.levels=levels;
  p.maledictionMetamorphosesKnown={2:1,4:1,6:2,10:3,12:3,14:4,16:4,18:5,20:5};
  p.spellsKnown={2:2,3:3,4:3,5:3,6:5,7:5,8:6,9:6,10:8,11:8,12:9,13:9,14:11,15:11,16:12,17:12,18:14,19:15,20:15};
  p.spellSlots={
    2:[2,0,0,0,0],3:[3,0,0,0,0],4:[3,0,0,0,0],5:[3,0,0,0,0],
    6:[4,2,0,0,0],7:[4,2,0,0,0],8:[4,3,0,0,0],9:[4,3,0,0,0],
    10:[4,3,2,0,0],11:[4,3,2,0,0],12:[4,3,3,0,0],13:[4,3,3,0,0],
    14:[4,3,3,1,0],15:[4,3,3,1,0],16:[4,3,3,2,0],17:[4,3,3,2,0],
    18:[4,3,3,3,1],19:[4,3,3,3,2],20:[4,3,3,3,2]
  };
  g.accursedProgression=p;
})(window);
