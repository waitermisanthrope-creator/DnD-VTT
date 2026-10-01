/* RuneKeeper.js — complete class progression / Builder metadata. */
(function(g){
  var p=g.runeKeeperProgression||{};
  p.className="Рунный хранитель"; p.englishName="RuneKeeper"; p.hitDie=8;
  p.primaryStat="intelligence"; p.savingThrows=["intelligence","wisdom"];
  p.skills={choose:2,from:["arcana","history","insight","investigation","nature","perception","religion"]};
  p.armor=["light","medium","shields"]; p.weapons=["simple","warhammers","polearms"];
  p.tools=["calligrapher's supplies","artisan's tool"];
  p.subclassLevel=2;
  p.subclasses=[
    {id:"dethek",name:"Детек"},
    {id:"fiendish",name:"Инфернский"},
    {id:"ghukliak",name:"Гуклиак"},
    {id:"jotun",name:"Йотун"},
    {id:"iokharic",name:"Иокхарик"},
    {id:"supernal",name:"Высший"}
  ];
  var f={
    1:["Руническое знание","Полиглот"],2:["Хранительский диалект","Рунная стойка"],
    3:["Герметическая интуиция"],4:["Увеличение характеристик / черта"],
    5:["Причинное призывание"],6:["Особенность хранительского диалекта"],
    7:["Гармоническая настройка"],8:["Увеличение характеристик / черта"],
    9:["Рунный напев"],10:["Особенность хранительского диалекта"],
    11:["Вездесущность"],12:["Увеличение характеристик / черта"],
    14:["Особенность хранительского диалекта"],15:["Всеведение"],
    16:["Увеличение характеристик / черта"],18:["Всемогущество"],
    19:["Увеличение характеристик / черта"],20:["Улучшение Рунного напева"]
  };
  p.levels={}; for(var l=1;l<=20;l++)p.levels[l]={features:(f[l]||[]).slice()};
  p.levels[4].asi=p.levels[8].asi=p.levels[12].asi=p.levels[16].asi=p.levels[19].asi=true;
  p.inscribedRunes={1:2,2:2,3:3,4:3,5:4,6:4,7:5,8:5,9:6,10:6,11:7,12:7,13:8,14:8,15:9,16:9,17:10,18:10,19:10,20:10};
  p.knownRunes={1:4,2:5,3:6,4:7,5:8,6:9,7:10,8:11,9:12,10:13,11:14,12:15,13:16,14:17,15:18,16:19,17:20,18:21,19:22,20:23};
  g.runeKeeperProgression=p;
})(window);