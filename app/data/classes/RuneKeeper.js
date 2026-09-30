/* RuneKeeper.js — metadata bridge with guaranteed level-1 Builder contract. */
(function(g){
  var p=g.runeKeeperProgression||{};
  p.className=p.className||"Рунный хранитель";
  p.englishName=p.englishName||"RuneKeeper";
  p.hitDie=p.hitDie||8;
  p.primaryStat=p.primaryStat||"intelligence";
  p.savingThrows=p.savingThrows||["intelligence","wisdom"];
  p.skills=p.skills||{choose:2,from:["arcana","history","investigation","nature","religion","insight","perception"]};
  p.armor=p.armor||["light","medium"];
  p.weapons=p.weapons||["simple"];
  p.subclassLevel=p.subclassLevel||3;
  p.subclasses=p.subclasses||[
    {id:"warRune",name:"Военные руны"},
    {id:"wardRune",name:"Руны защиты"},
    {id:"sageRune",name:"Руны знания"}
  ];
  p.levels=p.levels||{};
  if(!p.levels[1])p.levels[1]={features:["Руническое начертание","Рунический фокус"]};
  g.runeKeeperProgression=p;
})(window);
