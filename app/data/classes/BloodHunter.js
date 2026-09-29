/** Blood Hunter — полный progression/runtime metadata (third-party: Matt Mercer / Critical Role). */
(function(g){
  'use strict';
  var levels={};
  var names={
    1:['Охотничья погибель','Кровавое проклятие'],
    2:['Боевой стиль','Алый обряд'],
    3:['Орден кровавых охотников'],
    4:['Увеличение характеристик / черта'],
    5:['Дополнительная атака'],
    6:['Клеймо наказания','Улучшение Кровавого проклятия'],
    7:['Умение ордена','Улучшение Алого обряда'],
    8:['Увеличение характеристик / черта'],
    9:['Мрачная психометрия'],
    10:['Тёмное усиление','Дополнительное кровавое проклятие'],
    11:['Умение ордена'],
    12:['Увеличение характеристик / черта'],
    13:['Клеймо привязки','Улучшение Кровавого проклятия'],
    14:['Закалённая душа','Улучшение Алого обряда','Дополнительное кровавое проклятие'],
    15:['Умение ордена'],
    16:['Увеличение характеристик / черта'],
    17:['Улучшение Кровавого проклятия'],
    18:['Умение ордена','Дополнительное кровавое проклятие'],
    19:['Увеличение характеристик / черта'],
    20:['Кровавое мастерство']
  };
  for(var i=1;i<=20;i++) levels[i]={features:names[i]||[]};
  [4,8,12,16,19].forEach(function(l){levels[l].asi=true;});
  levels[3].subclassLevel=true;
  var curseKnown={1:1,2:1,3:1,4:1,5:1,6:2,7:2,8:2,9:2,10:3,11:3,12:3,13:3,14:4,15:4,16:4,17:4,18:5,19:5,20:5};
  Object.keys(levels).forEach(function(k){levels[k].bloodCursesKnown=curseKnown[k];});
  g.bloodHunterProgression={
    hitDie:10,
    source:'Matt Mercer / Critical Role / third-party',
    primaryAbilities:['Сила','Ловкость'],
    hemocraftAbilities:['Интеллект','Мудрость'],
    savingThrows:['Ловкость','Интеллект'],
    armor:['лёгкие','средние','щиты'],
    weapons:['простое','воинское'],
    tools:['набор алхимика'],
    skills:{choose:3,from:['Акробатика','Магия','Атлетика','История','Проницательность','Расследование','Религия','Выживание']},
    multiclass:{requires:[['Сила','Ловкость'],13,['Интеллект'],13],proficiencies:['лёгкие доспехи','средние доспехи','щиты','простое оружие','воинское оружие','набор алхимика']},
    hemocraftDie:{1:'d4',2:'d4',3:'d4',4:'d4',5:'d6',6:'d6',7:'d6',8:'d6',9:'d6',10:'d6',11:'d8',12:'d8',13:'d8',14:'d8',15:'d8',16:'d8',17:'d10',18:'d10',19:'d10',20:'d10'},
    levels:levels,
    bloodCurses:[
      {id:'anxious',name:'Кровавое проклятие тревоги',action:'bonus',rangeFt:30},
      {id:'binding',name:'Кровавое проклятие связывания',action:'bonus',rangeFt:30},
      {id:'bloatedAgony',name:'Кровавое проклятие распирающей боли',action:'bonus',rangeFt:30},
      {id:'corrosion',name:'Кровавое проклятие коррозии',action:'bonus',rangeFt:30,prerequisite:15,order:'mutant'},
      {id:'exorcist',name:'Кровавое проклятие экзорциста',action:'bonus',rangeFt:30,prerequisite:15,order:'ghostslayer'},
      {id:'exposure',name:'Кровавое проклятие обнажения',action:'reaction',rangeFt:30},
      {id:'eyeless',name:'Кровавое проклятие безглазого',action:'reaction',rangeFt:30},
      {id:'fallenPuppet',name:'Кровавое проклятие павшей марионетки',action:'reaction',rangeFt:30},
      {id:'howl',name:'Кровавое проклятие воя',action:'action',rangeFt:30,prerequisite:18,order:'lycan'},
      {id:'marked',name:'Кровавое проклятие метки',action:'bonus',rangeFt:30},
      {id:'muddledMind',name:'Кровавое проклятие помутнённого разума',action:'bonus',rangeFt:30},
      {id:'soulEater',name:'Кровавое проклятие пожирателя душ',action:'reaction',rangeFt:30,prerequisite:18,order:'profaneSoul'}
    ],
    crimsonRites:[
      {id:'flame',name:'Обряд пламени',damageType:'fire',prerequisite:1},
      {id:'frozen',name:'Обряд холода',damageType:'cold',prerequisite:1},
      {id:'storm',name:'Обряд бури',damageType:'lightning',prerequisite:1},
      {id:'dead',name:'Обряд мёртвых',damageType:'necrotic',prerequisite:14},
      {id:'oracle',name:'Обряд оракула',damageType:'psychic',prerequisite:14},
      {id:'roar',name:'Обряд рёва',damageType:'thunder',prerequisite:14}
    ],
    fightingStyles:['Стрельба','Дуэлянт','Сражение большим оружием','Сражение двумя оружиями'],
    orders:['Орден призрачных убийц','Орден ликантропов','Орден мутантов','Орден осквернённых душ'],
    mechanicsStatus:'implemented_full_core_and_orders'
  };
})(window);
