/*
 * Market Expansion V55.1: расширяет существующий Market Economy V55 десятками
 * специализированных торговцев и сотнями конкретных позиций ассортимента. Как работает:
 * добавляет записи в общий DND_MARKET_V55.TRADERS, поэтому покупка, продажа, региональные
 * цены, склад и restock продолжают использовать единый движок V55. Важные API: DND_MARKET_V55,
 * DndMarketV55, TRADERS. Каждый товар имеет стабильный id, категорию, базовую цену, количество
 * и теги спроса. Это авторский контент без замены Inventory/Coins/Crafting Economy.
 */
(function(global){'use strict';
  var market=global.DND_MARKET_V55||global.DndMarketV55;
  if(!market||!market.TRADERS)return;

  function items(prefix, category, rows, tags, qty){
    return rows.map(function(r,i){
      return {id:'m551_'+prefix+'_'+(i+1),name:r[0],category:category,costGp:r[1],qty:r[2]==null?(qty||6):r[2],tags:(r[3]||tags||[]).slice()};
    });
  }
  function add(id,name,type,buyFactor,sellFactor,regions,stock){
    market.TRADERS[id]={name:name,type:type,buyFactor:buyFactor,sellFactor:sellFactor,regions:regions,stock:stock};
  }
  var R=['forest','highlands','swamp','coast','wasteland','ruins'];
  add('armorer','Бронник', 'armorer',1.08,.58,['highlands','wasteland','forest'],items('armorer','armor',[
    ['Кожаный доспех',10,2,['leather']],['Кольчуга',75,1,['metal']],['Чешуйчатый доспех',50,1,['metal','scale']],['Кираса',400,1,['metal']],['Шлем',10,3,['metal']],['Наручи',8,3,['metal']],['Металлические поножи',12,2,['metal']],['Заклёпки, набор',2,12,['metal']]],['metal'],4));
  add('weaponwright','Оружейник','weaponsmith',1.07,.6,['highlands','wasteland','coast'],items('weaponwright','weapons',[
    ['Боевой топор',10,2,['metal']],['Длинный меч',15,2,['metal']],['Рапира',25,2,['metal']],['Секира',10,2,['metal']],['Молот',2,4,['metal']],['Палица',0.2,5,['wood','metal']],['Копьё',1,5,['wood','metal']],['Арбалет',25,2,['wood','metal']]],['metal'],4));
  add('fletcher','Лучник и оплетчик','fletcher',1.03,.55,['forest','coast'],items('fletcher','weapons',[
    ['Короткий лук',25,3,['wood']],['Длинный лук',50,2,['wood']],['Лёгкий арбалет',25,2,['wood','metal']],['Стрелы (20)',1,15,['wood']],['Болты (20)',1,15,['wood','metal']],['Стрела с железным наконечником (1)',.08,60,['wood','metal']],['Тетива',.5,12,['fiber']],['Оперение для стрел (20)',.2,15,['fiber']]],['wood'],8));
  add('leatherworker','Кожевник','leatherworker',1.05,.62,['forest','swamp','coast'],items('leatherworker','gear',[
    ['Кожаная броня',10,2,['leather']],['Кожаная сбруя',10,3,['leather']],['Ножны',2,5,['leather']],['Подсумок',1,8,['leather']],['Кожаный ремень',.5,12,['leather']],['Мягкие перчатки',1,8,['leather']],['Кожаная сумка',3,5,['leather']],['Шкура обработанная',4,10,['leather']]],['leather'],6));
  add('weaver','Ткач','weaver',1.02,.6,['forest','coast'],items('weaver','gear',[
    ['Рулон льняной ткани',3,10,['textile']],['Рулон шерсти',5,8,['textile']],['Плащ',2,5,['textile']],['Мантия',5,3,['textile']],['Верёвка, 50 футов',1,8,['rope']],['Канат, 50 футов',2,8,['rope']],['Парусная ткань',4,10,['textile']],['Тонкая нить',.1,30,['fiber']]],['textile'],8));
  add('woodcarver','Резчик по дереву','woodcarver',1.02,.58,['forest','highlands'],items('woodcarver','materials',[
    ['Лук заготовка',3,5,['wood']],['Древесина, заготовка',1,20,['wood']],['Рукоять оружия',1,15,['wood']],['Щит деревянный',10,3,['wood']],['Деревянные колья (10)',.5,12,['wood']],['Стрелковые древки (20)',.4,15,['wood']],['Дубовая заготовка',2,12,['wood']],['Тисовая заготовка',5,6,['wood']]],['wood'],8));
  add('carpenter','Плотник','carpenter',1.03,.55,['forest','highlands'],items('carpenter','gear',[
    ['Лестница складная',5,3,['wood']],['Ящик',1,8,['wood']],['Сундук',5,4,['wood']],['Деревянная дверь',10,2,['wood']],['Стол походный',3,3,['wood']],['Кровать походная',2,3,['wood']],['Бочка',2,6,['wood']],['Щит усиленный',15,3,['wood','metal']]],['wood'],5));
  add('jeweler','Ювелир','jeweler',1.2,.7,['ruins','highlands','coast'],items('jeweler','materials',[
    ['Серебряная оправа',10,5,['metal']],['Золотая оправа',25,4,['metal']],['Серебряное кольцо',25,3,['metal']],['Золотой перстень',50,2,['metal']],['Янтарь',20,3,['relic']],['Аметист',100,2,['relic']],['Гранат',100,2,['relic']],['Опал',100,2,['relic']]],['relic'],3));
  add('gemcutter','Огранщик самоцветов','gemcutter',1.18,.72,['ruins','highlands'],items('gemcutter','materials',[
    ['Драгоценный камень, необработанный',50,6,['relic']],['Огранённый кварц',10,8,['relic']],['Огранённый гранат',120,2,['relic']],['Огранённый сапфир',200,2,['relic']],['Огранённый рубин',200,2,['relic']],['Огранённый изумруд',200,2,['relic']],['Лунный камень',50,3,['relic']],['Чёрный обсидиан',25,5,['stone','relic']]],['relic'],4));
  add('potter','Гончар','potter',1.04,.55,['swamp','forest','coast'],items('potter','materials',[
    ['Керамический кувшин',.02,20,['ceramic']],['Керамическая чаша',.03,20,['ceramic']],['Керамический тигель',1,8,['ceramic']],['Алхимическая колба-керамика',2,8,['ceramic','alchemical']],['Глиняная печать',.1,20,['ceramic']],['Черепица (10)',.5,20,['stone']],['Керамический фильтр',1,8,['ceramic']],['Глазурь',.5,12,['ceramic']]],['ceramic'],10));
  add('glassblower','Стеклодув','glassblower',1.06,.58,['coast','ruins'],items('glassblower','materials',[
    ['Стеклянный флакон',.1,30,['glass']],['Стеклянная колба',1,15,['glass']],['Линза',10,5,['glass']],['Толстая линза',25,3,['glass']],['Стеклянная трубка',2,10,['glass']],['Стеклянная реторта',8,5,['glass','alchemical']],['Витражное стекло',5,10,['glass']],['Чистое стекло',3,15,['glass']]],['glass'],10));
  add('mason','Каменщик','mason',1.04,.55,['highlands','ruins'],items('mason','materials',[
    ['Гранитная заготовка',2,20,['stone']],['Мраморная заготовка',5,12,['stone']],['Каменная плита',1,30,['stone']],['Точёный камень',.5,30,['stone']],['Каменный блок',.1,50,['stone']],['Известь',.05,40,['stone']],['Гравированный камень',10,5,['stone','relic']],['Каменный идол',25,2,['stone','relic']]],['stone'],15));
  add('cobbler','Сапожник','cobbler',1.02,.6,['forest','highlands','coast'],items('cobbler','gear',[
    ['Сапоги',1,8,['leather']],['Сапоги походные',2,6,['leather']],['Высокие сапоги',3,5,['leather']],['Мягкие туфли',.5,10,['leather','textile']],['Подошва кожаная (пара)',.5,12,['leather']],['Шпоры',1,5,['metal']],['Гетры',1,8,['textile','leather']],['Набор для ремонта обуви',1,8,['leather']]],['leather'],8));
  add('painter','Художник и герольд','painter',1.08,.6,['forest','coast','ruins'],items('painter','materials',[
    ['Пигменты, набор',3,10,['pigment']],['Чёрная краска',1,12,['pigment']],['Красная краска',1.5,12,['pigment']],['Синяя краска',2,10,['pigment']],['Золотая краска',10,5,['pigment','metal']],['Гербовая ткань',8,5,['textile']],['Малярный набор',2,6,['pigment']],['Масло для красок',1,10,['alchemical']]],['pigment'],8));
  add('tinker','Жестянщик и механик','tinker',1.1,.62,['highlands','ruins','coast'],items('tinker','gear',[
    ['Замок простой',5,8,['metal']],['Замок сложный',25,4,['metal']],['Шестерни, набор',2,12,['metal']],['Пружины, набор',3,8,['metal']],['Механический таймер',10,4,['metal']],['Капкан',5,5,['metal']],['Сигнальный колокольчик',1,8,['metal']],['Инструментальный набор',25,2,['metal','repair']]],['metal'],6));
  add('scribe','Писец','scribe',1.06,.5,['ruins','forest','coast'],items('scribe','gear',[
    ['Бумага (10 листов)',1,20,['paper']],['Пергамент (10 листов)',2,15,['paper']],['Чернила',.1,20,['paper']],['Чернила стойкие',5,6,['paper','relic']],['Пустая книга',1,8,['paper']],['Журнал путешественника',2,5,['paper']],['Пустой свиток',1,10,['paper']],['Восковые печати (10)',.5,10,['paper']]],['paper'],8));
  add('cartographer','Картограф','cartographer',1.12,.58,['coast','ruins','forest'],items('cartographer','gear',[
    ['Карта местности',5,6,['paper']],['Карта региона',15,3,['paper']],['Морская карта',25,3,['paper','coast']],['Комплект картографа',15,3,['paper']],['Компас',10,4,['metal']],['Линейка и циркуль',2,8,['metal']],['Тубус для карт',2,6,['leather','paper']],['Водостойкая карта',20,3,['paper']]],['paper'],5));
  add('herbalist','Травник','herbalist',1.08,.55,['forest','swamp'],items('herbalist','materials',[
    ['Лечебная трава',3,20,['herbalism']],['Лунный мох',8,10,['herbalism','alchemical']],['Сонный мак',5,12,['herbalism']],['Крапива болотная',2,15,['herbalism']],['Кора целебная',4,12,['herbalism']],['Сухоцвет',1,20,['herbalism']],['Корень мандрагоры',20,4,['herbalism','alchemical']],['Пыльца фей',25,3,['herbalism','arcane']]],['herbalism'],12));
  add('alchemist','Алхимик','alchemist',1.15,.62,['swamp','ruins','forest'],items('alchemist','consumables',[
    ['Зелье лечения',50,6,['alchemical']],['Противоядие',50,4,['alchemical']],['Зелье лазания',50,3,['alchemical']],['Зелье ночного зрения',50,3,['alchemical']],['Алхимический огонь',50,4,['alchemical']],['Кислота, флакон',25,5,['alchemical']],['Дымовая смесь',15,6,['alchemical']],['Алхимический реагент',8,15,['alchemical','reagent']]],['alchemical'],6));
  add('poisoner','Торговец ядами','poisoner',1.35,.7,['swamp','ruins'],items('poisoner','consumables',[
    ['Антитоксин',50,5,['alchemical']],['Слабый яд',100,3,['alchemical']],['Контактный токсин',150,2,['alchemical']],['Снотворный яд',120,2,['alchemical']],['Противоядие редкое',150,2,['alchemical']],['Токсичный реагент',25,8,['alchemical']],['Ядовитая смола',40,5,['alchemical']],['Пустой флакон',.1,30,['glass']]],['alchemical'],5));
  add('brewer','Пивовар','brewer',1.0,.5,['forest','highlands','coast'],items('brewer','consumables',[
    ['Эль, кружка',.04,30,['food']],['Пиво крепкое',.1,20,['food']],['Медовуха',.2,15,['food']],['Сидр',.1,20,['food']],['Дрожжи',.5,15,['reagent']],['Солод',.2,20,['food']],['Хмель',.1,20,['herbalism']],['Бочка эля',2,5,['wood','food']]],['food'],15));
  add('cook','Повар','cook',1.05,.5,['forest','coast','highlands'],items('cook','consumables',[
    ['Паёк',.5,30,['food']],['Сухое мясо',1,20,['food']],['Сыр',.5,20,['food']],['Сухари',.1,30,['food']],['Специи',.5,20,['food']],['Соль',.05,30,['food']],['Масло',.1,20,['food']],['Походный суп',.2,20,['food']]],['food'],15));
  add('fisher','Рыбак','fisher',1.0,.48,['coast','swamp'],items('fisher','consumables',[
    ['Свежая рыба',.1,30,['food']],['Сушёная рыба',.2,25,['food']],['Солёная рыба',.25,20,['food']],['Рыбий жир',.5,12,['food','alchemical']],['Икра',2,8,['food']],['Крючки (10)',.2,20,['metal']],['Леска',.1,30,['fiber']],['Сеть рыбацкая',1,8,['rope']]],['food'],15));
  add('shipchandler','Корабельный снабженец','shipchandler',1.08,.55,['coast'],items('shipchandler','gear',[
    ['Канат, 50 футов',2,12,['rope']],['Парусная ткань',4,15,['textile']],['Фонарь',5,5,['metal']],['Масло для фонаря',.1,20,['alchemical']],['Крюк абордажный',2,6,['metal']],['Комплект для ремонта судна',25,4,['wood','metal']],['Водонепроницаемый мешок',3,8,['leather']],['Компас',10,5,['metal']]],['coast'],8));
  add('miner','Рудокоп','miner',1.1,.6,['highlands','wasteland','ruins'],items('miner','materials',[
    ['Железная руда',1,30,['metal']],['Медная руда',1.5,25,['metal']],['Серебряная руда',5,15,['metal']],['Золотая руда',20,6,['metal']],['Уголь',.05,40,['metal']],['Железный слиток',5,20,['metal']],['Медный слиток',4,15,['metal']],['Сталь, заготовка',10,8,['metal']]],['metal'],15));
  add('stonecutter','Торговец камнем','stonecutter',1.05,.55,['highlands','ruins'],items('stonecutter','materials',[
    ['Гранит',2,30,['stone']],['Мрамор',5,20,['stone']],['Известняк',.5,30,['stone']],['Обсидиан',10,10,['stone','relic']],['Кварц',3,15,['stone','relic']],['Сланец',1,20,['stone']],['Гравий',.02,50,['stone']],['Мел',.05,30,['stone']]],['stone'],15));
  add('generalstore','Лавочник','general',1.02,.48,R,items('generalstore','gear',[
    ['Факел',.01,60,['common']],['Свеча',.01,40,['common']],['Верёвка, 50 футов',1,10,['rope']],['Рюкзак',2,8,['common']],['Одеяло',.5,8,['textile']],['Фляга',.2,15,['common']],['Кремень и огниво',.5,10,['common']],['Крючья для лазания',2,8,['metal']]],['common'],10));
  add('luxury','Торговец роскошью','luxury',1.35,.72,['coast','ruins','highlands'],items('luxury','gear',[
    ['Шёлковая рубашка',10,5,['textile']],['Парфюм',15,5,['alchemical']],['Серебряный кубок',25,3,['metal']],['Хрустальный графин',50,2,['glass']],['Музыкальная шкатулка',25,2,['metal']],['Редкий чай',5,10,['food']],['Экзотические специи',10,8,['food']],['Драгоценная табакерка',75,1,['relic','metal']]],['relic'],4));
  add('relicdealer','Торговец реликвиями','relic',1.45,.75,['ruins'],items('relicdealer','materials',[
    ['Древний фрагмент',25,5,['relic']],['Старинная монета',10,12,['relic']],['Руническая пластина',50,3,['relic','arcane']],['Осколок обсидиана',15,8,['relic']],['Кость древнего зверя',20,4,['relic']],['Прах мумии',30,3,['relic','alchemical']],['Древний пергамент',15,4,['relic','paper']],['Неопознанный артефакт',100,1,['relic','arcane']]],['relic'],4));
  add('arcane','Торговец магическими реагентами','arcane',1.3,.7,['ruins','forest'],items('arcane','materials',[
    ['Арканная пыль',15,8,['arcane']],['Эссенция огня',25,5,['arcane','alchemical']],['Эссенция воды',20,5,['arcane','alchemical']],['Эссенция воздуха',25,5,['arcane','alchemical']],['Эссенция земли',20,5,['arcane','alchemical']],['Лунный камень',50,3,['arcane','relic']],['Кристалл памяти',75,2,['arcane','relic']],['Порошок серебра',10,8,['arcane','metal']]],['arcane'],5));
  add('stablemaster','Конюший','stable',1.08,.55,['forest','highlands','coast'],items('stablemaster','gear',[
    ['Седло',10,3,['leather']],['Вьючное седло',15,3,['leather']],['Уздечка',2,6,['leather']],['Подковы (4)',1,10,['metal']],['Корм, мешок',.5,20,['food']],['Овёс',.1,30,['food']],['Конская попона',2,5,['textile']],['Седельные сумки',4,5,['leather']]],['leather'],8));
  add('hunter','Охотник','hunter',1.08,.6,['forest','highlands','wasteland'],items('hunter','materials',[
    ['Шкура оленя',5,8,['leather']],['Шкура волка',8,6,['leather']],['Кабаний клык',2,10,['relic']],['Оленьи рога',10,3,['bone']],['Перья',.1,30,['fiber']],['Копчёное мясо',1,15,['food']],['Лук охотничий',25,2,['wood']],['Набор силков',2,8,['metal']]],['leather'],8));
  add('monsterparts','Заготовитель чудовищных трофеев','monsterparts',1.25,.68,['swamp','wasteland','ruins'],items('monsterparts','materials',[
    ['Паучий шёлк',5,10,['fiber']],['Панцирь хитина',8,8,['metal']],['Коготь чудовища',3,12,['relic']],['Клык чудовища',4,12,['relic']],['Глаз чудовища',10,5,['alchemical']],['Ядовитая железа',15,4,['alchemical']],['Чешуя чудовища',6,10,['scale']],['Эссенция монстра',25,3,['arcane','alchemical']]],['relic'],6));
  add('scrollmerchant','Торговец свитками','scrolls',1.2,.62,['ruins','forest','coast'],items('scrollmerchant','consumables',[
    ['Свиток заклинания 1 круга',25,4,['arcane','paper']],['Свиток заклинания 2 круга',75,3,['arcane','paper']],['Свиток заклинания 3 круга',150,2,['arcane','paper']],['Пустой свиток',1,15,['paper']],['Чернила арканные',10,8,['arcane','paper']],['Пергамент',.2,20,['paper']],['Печать гильдии магов',5,5,['relic']],['Футляр для свитков',2,8,['leather','paper']]],['arcane'],5));
  add('temple','Храмовый лавочник','temple',1.05,.5,['forest','highlands','ruins'],items('temple','consumables',[
    ['Святая вода',25,8,['alchemical']],['Ладан',1,15,['herbalism']],['Церковная свеча',.05,30,['common']],['Символ веры',5,6,['metal']],['Благословлённое масло',10,6,['alchemical']],['Бинты',.1,30,['herbalism']],['Лечебная мазь',5,10,['alchemical']],['Молитвенник',2,5,['paper','relic']]],['alchemical'],8));
  add('blackmarket','Чёрный рынок','blackmarket',1.45,.8,['ruins','wasteland','swamp'],items('blackmarket','gear',[
    ['Отмычки',25,4,['metal']],['Маска',2,8,['leather']],['Поддельная печать',20,3,['metal','paper']],['Скрытый нож',5,3,['metal']],['Дымовая шашка',25,4,['alchemical']],['Контрабандный реагент',30,6,['alchemical']],['Редкий яд',200,2,['alchemical']],['Запрещённый артефакт',250,1,['relic','arcane']]],['relic'],4));
  add('caravan_master','Мастер каравана','caravan_master',1.16,.66,R,items('caravan_master','gear',[
    ['Дорожный шатёр',10,4,['textile','wood']],['Повозка, комплект ремонта',15,5,['wood','metal']],['Масло фонарное',.1,25,['alchemical']],['Верёвка, 50 футов',1,15,['rope']],['Паёк',.5,30,['food']],['Фляга',.2,20,['common']],['Лошадиный корм',.2,30,['food']],['Карта торговых путей',10,5,['paper']]],['common'],12));
  add('siege','Осадный снабженец','siege',1.2,.55,['highlands','wasteland','ruins'],items('siege','materials',[
    ['Канат толстый',5,10,['rope']],['Цепь',5,10,['metal']],['Железные шипы (20)',2,15,['metal']],['Деревянный брус',2,20,['wood']],['Смола',1,15,['alchemical']],['Масло горючее',2,12,['alchemical']],['Каменные ядра (5)',5,10,['stone']],['Ремонтный набор',10,6,['repair','metal']]],['metal'],8));

  var TYPES=Object.keys(market.TRADERS).filter(function(id){return id.indexOf('m551_')!==0;});
  market.MARKET_EXPANSION_V55_1={version:'55.1',traderCount:TYPES.length,newTraderIds:TYPES.slice(4),stockCount:TYPES.reduce(function(n,id){return n+(market.TRADERS[id].stock||[]).length;},0)};
  global.DND_MARKET_V55_1=market.MARKET_EXPANSION_V55_1;
})(window);
