/* Savant.js — metadata bridge with guaranteed level-1 Builder contract. */
(function(g){
  var p=g.savantProgression||{};
  p.className=p.className||"Савант";
  p.englishName=p.englishName||"Savant";
  p.hitDie=p.hitDie||8;
  p.primaryStat=p.primaryStat||"intelligence";
  p.savingThrows=p.savingThrows||["intelligence","wisdom"];
  p.skills=p.skills||{choose:3,from:["arcana","history","insight","investigation","medicine","nature","perception","persuasion"]};
  p.armor=p.armor||["light"];
  p.weapons=p.weapons||["simple"];
  p.subclassLevel=p.subclassLevel||3;
  p.subclasses=p.subclasses||[
    {id:"tactician",name:"Тактик"},
    {id:"scholar",name:"Учёный"},
    {id:"physician",name:"Практик"},
    {id:"investigator",name:"Следователь"}
  ];
  p.levels=p.levels||{};
  if(!p.levels[1])p.levels[1]={features:["Изучение","Анализ"]};
  g.savantProgression=p;
})(window);
