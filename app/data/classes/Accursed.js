/* Accursed.js — metadata bridge with guaranteed level-1 Builder contract. */
(function(g){
  var p=g.accursedProgression||{};
  p.className=p.className||"Аккурсд";
  p.englishName=p.englishName||"Accursed";
  p.hitDie=p.hitDie||10;
  p.primaryStat=p.primaryStat||"constitution";
  p.savingThrows=p.savingThrows||["wisdom","intelligence"];
  p.skills=p.skills||{choose:2,from:["athletics","deception","insight","intimidation","investigation","religion","stealth"]};
  p.armor=p.armor||["light","medium"];
  p.weapons=p.weapons||["simple","martial"];
  p.subclassLevel=p.subclassLevel||3;
  p.subclasses=p.subclasses||[
    {id:"bloodCurse",name:"Кровавое проклятие"},
    {id:"hexblade",name:"Проклятый клинок"},
    {id:"doomcaller",name:"Вестник рока"}
  ];
  p.levels=p.levels||{};
  if(!p.levels[1])p.levels[1]={features:["Проклятие","Мрачная клятва"]};
  g.accursedProgression=p;
})(window);
