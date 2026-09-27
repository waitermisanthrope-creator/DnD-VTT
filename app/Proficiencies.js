// --- БАЗА ДАННЫХ ВЛАДЕНИЙ И ЯЗЫКОВ (ПОЛНАЯ И СКОРРЕКТИРОВАННАЯ) ---
var PROFICIENCIES_DB = [
  // --- ДОСПЕХИ И ЩИТЫ ---
  { id: 'p_armor_light', category: 'Доспехи', name: 'Лёгкие доспехи', description: 'Владение стеганым, кожаным и проклепанным кожаным доспехом.' },
  { id: 'p_armor_medium', category: 'Доспехи', name: 'Средние доспехи', description: 'Владение шкурными, кольчужными рубахами, кирасами и чешуйчатыми доспехами.' },
  { id: 'p_armor_heavy', category: 'Доспехи', name: 'Тяжелые доспехи', description: 'Владение кольчатыми, латными и прочими тяжелыми доспехами.' },
  { id: 'p_shields', category: 'Доспехи', name: 'Щиты', description: 'Умение эффективно использовать щиты для повышения класса доспеха (КД).' },

  // --- ОБЩИЕ КАТЕГОРИИ ОРУЖИЯ ---
  { id: 'p_weapon_simple', category: 'Оружие', name: 'Простое оружие (все)', description: 'Владение всем простым оружием (кинжалы, дубины, короткие луки и т.д.).' },
  { id: 'p_weapon_martial', category: 'Оружие', name: 'Воинское оружие (все)', description: 'Владение воинским оружием (мечи, алебарды, длинные луки, тяжелые арбалеты).' },
  { id: 'p_firearms', category: 'Оружие', name: 'Огнестрельное оружие', description: 'Владение кремневыми пистолетами, мушкетами и хоумбрю-огнестрелом.' },
  
  // --- СПЕЦИФИЧЕСКИЕ НАВЫКИ ОРУЖИЯ (для расовых/классовых особенностей) ---
  { id: 'p_bows', category: 'Оружие', name: 'Владение луками', description: 'Владение короткими и длинными луками.' },
  { id: 'p_crossbows', category: 'Оружие', name: 'Владение арбалетами', description: 'Владение ручными, легкими и тяжелыми арбалетами.' },

  // --- КОНКРЕТНОЕ ОРУЖИЕ ---
  { id: 'p_weap_club', category: 'Конкретное оружие', name: 'Дубина', description: 'Простое рукопашное оружие (легкое).' },
  { id: 'p_weap_dagger', category: 'Конкретное оружие', name: 'Кинжал', description: 'Простое оружие (фехтовальное, метательное, легкое).' },
  { id: 'p_weap_greatclub', category: 'Конкретное оружие', name: 'Великая дубина', description: 'Простое оружие (двуручное).' },
  { id: 'p_weap_handaxe', category: 'Конкретное оружие', name: 'Ручной топор', description: 'Простое оружие (легкое, метательное).' },
  { id: 'p_weap_javelin', category: 'Конкретное оружие', name: 'Дротик', description: 'Простое оружие (метательное).' },
  { id: 'p_weap_light_hammer', category: 'Конкретное оружие', name: 'Легкий молот', description: 'Простое оружие (легкое, метательное).' },
  { id: 'p_weap_mace', category: 'Конкретное оружие', name: 'Булава', description: 'Простое рукопашное оружие.' },
  { id: 'p_weap_quarterstaff', category: 'Конкретное оружие', name: 'Боевой посох', description: 'Простое оружие (универсальное).' },
  { id: 'p_weap_sickle', category: 'Конкретное оружие', name: 'Серп', description: 'Простое оружие (легкое).' },
  { id: 'p_weap_spear', category: 'Конкретное оружие', name: 'Копье', description: 'Простое оружие (метательное, универсальное).' },
  { id: 'p_weap_light_crossbow', category: 'Конкретное оружие', name: 'Легкий арбалет', description: 'Простое дальнобойное оружие (двуручное, боезапас).' },
  { id: 'p_weap_shortbow', category: 'Конкретное оружие', name: 'Короткий лук', description: 'Простое дальнобойное оружие (двуручное, боезапас).' },
  { id: 'p_weap_sling', category: 'Конкретное оружие', name: 'Праща', description: 'Простое дальнобойное оружие (боезапас).' },
  { id: 'p_weap_battleaxe', category: 'Конкретное оружие', name: 'Боевой топор', description: 'Воинское оружие (универсальное).' },
  { id: 'p_weap_flail', category: 'Конкретное оружие', name: 'Цеп', description: 'Воинское рукопашное оружие.' },
  { id: 'p_weap_glaive', category: 'Конкретное оружие', name: 'Глефа', description: 'Воинское оружие (тяжелое, досягаемость, двуручное).' },
  { id: 'p_weap_greataxe', category: 'Конкретное оружие', name: 'Двуручный топор', description: 'Воинское оружие (тяжелое, двуручное).' },
  { id: 'p_weap_greatsword', category: 'Конкретное оружие', name: 'Двуручный меч', description: 'Воинское оружие (тяжелое, двуручное).' },
  { id: 'p_weap_halberd', category: 'Конкретное оружие', name: 'Алебарда', description: 'Воинское оружие (тяжелое, досягаемость, двуручное).' },
  { id: 'p_weap_lance', category: 'Конкретное оружие', name: 'Пика', description: 'Воинское оружие (досягаемость, помеха вблизи).' },
  { id: 'p_weap_longsword', category: 'Конкретное оружие', name: 'Длинный меч', description: 'Воинское оружие (универсальное).' },
  { id: 'p_weap_maul', category: 'Конкретное оружие', name: 'Молот', description: 'Воинское оружие (тяжелое, двуручное).' },
  { id: 'p_weap_morningstar', category: 'Конкретное оружие', name: 'Моргенштерн', description: 'Воинское рукопашное оружие.' },
  { id: 'p_weap_pike', category: 'Конкретное оружие', name: 'Сарисса', description: 'Воинское оружие (тяжелое, досягаемость, двуручное).' },
  { id: 'p_weap_rapier', category: 'Конкретное оружие', name: 'Рапира', description: 'Воинское оружие (фехтовальное).' },
  { id: 'p_weap_scimitar', category: 'Конкретное оружие', name: 'Скимитар', description: 'Воинское оружие (фехтовальное, легкое).' },
  { id: 'p_weap_shortsword', category: 'Конкретное оружие', name: 'Короткий меч', description: 'Воинское оружие (фехтовальное, легкое).' },
  { id: 'p_weap_trident', category: 'Конкретное оружие', name: 'Трезубец', description: 'Воинское оружие (метательное, универсальное).' },
  { id: 'p_weap_war_pick', category: 'Конкретное оружие', name: 'Клевец', description: 'Воинское рукопашное оружие.' },
  { id: 'p_weap_warhammer', category: 'Конкретное оружие', name: 'Боевой молот', description: 'Воинское оружие (универсальное).' },
  { id: 'p_weap_whip', category: 'Конкретное оружие', name: 'Кнут', description: 'Воинское оружие (фехтовальное, досягаемость).' },
  { id: 'p_weap_blowgun', category: 'Конкретное оружие', name: 'Духовая трубка', description: 'Воинское дальнобойное оружие (боезапас).' },
  { id: 'p_weap_hand_crossbow', category: 'Конкретное оружие', name: 'Ручной арбалет', description: 'Воинское дальнобойное оружие (легкое, боезапас).' },
  { id: 'p_weap_heavy_crossbow', category: 'Конкретное оружие', name: 'Тяжелый арбалет', description: 'Воинское дальнобойное оружие (тяжелое, двуручное, перезарядка).' },
  { id: 'p_weap_longbow', category: 'Конкретное оружие', name: 'Длинный лук', description: 'Воинское дальнобойное оружие (тяжелое, двуручное, боезапас).' },
  { id: 'p_weap_net', category: 'Конкретное оружие', name: 'Сетка', description: 'Воинское дальнобойное оружие (особое, метательное).' },

  // --- ИНСТРУМЕНТЫ И ПРОЧЕЕ ---
  { id: 'p_tool_smith', category: 'Инструменты', name: 'Инструменты кузнеца', description: 'Ковка оружия, починка лат, работа с металлом и наковальней.' },
  { id: 'p_tool_alchemist', category: 'Инструменты', name: 'Алхимический набор', description: 'Создание зелий, ядов, кислот и перегонка реагентов.' },
  { id: 'p_tool_brewer', category: 'Инструменты', name: 'Инструменты пивовара', description: 'Варка пива, настоек и крепких напитков.' },
  { id: 'p_tool_cook', category: 'Инструменты', name: 'Поварские принадлежности', description: 'Приготовление изысканных блюд, улучшающих отдых или самочувствие.' },
  { id: 'p_tool_poisoner', category: 'Инструменты', name: 'Набор отравителя', description: 'Создание и безопасное применение смертельных токсинов.' },
  { id: 'p_tool_thief', category: 'Инструменты', name: 'Ворские инструменты', description: 'Взлом замков, обезвреживание ловушек и махинации с механизмами.' },
  { id: 'p_tool_carpenter', category: 'Инструменты', name: 'Инструменты плотника', description: 'Работа с деревом, создание мебели, дверей и деревянных укреплений.' },
  { id: 'p_tool_herbalist', category: 'Инструменты', name: 'Набор травника', description: 'Сбор лечебных кореньев, распознавание ядовитых растений.' },
  { id: 'p_tool_cartographer', category: 'Инструменты', name: 'Инструменты картографа', description: 'Создание точных карт местности и ориентирование.' },
  { id: 'p_tool_navigator', category: 'Инструменты', name: 'Инструменты навигатора', description: 'Прокладка морских и сухопутных маршрутов по звездам и приборам.' },
  { id: 'p_tool_calligrapher', category: 'Инструменты', name: 'Инструменты каллиграфа', description: 'Искусное письмо, создание свитков, подделка почерка.' },
  { id: 'p_tool_cobbler', category: 'Инструменты', name: 'Инструменты сапожника', description: 'Изготовление и починка обуви, тайники в каблуках.' },
  { id: 'p_tool_glassblower', category: 'Инструменты', name: 'Инструменты стеклодува', description: 'Выдувание колб, линз, сосудов и стеклянных изделий.' },
  { id: 'p_tool_jeweler', category: 'Инструменты', name: 'Инструменты ювелира', description: 'Огранка драгоценных камней, работа с тонкими оправами.' },
  { id: 'p_tool_leatherworker', category: 'Инструменты', name: 'Инструменты кожевника', description: 'Создание изделий из кожи, упряжи, легких доспехов.' },
  { id: 'p_tool_mason', category: 'Инструменты', name: 'Инструменты каменщика', description: 'Работа с камнем, анализ кладки, разрушение стен.' },
  { id: 'p_tool_painter', category: 'Инструменты', name: 'Принадлежности художника', description: 'Живопись, портреты, создание визуальных улик или подделок картин.' },
  { id: 'p_tool_potter', category: 'Инструменты', name: 'Инструменты гончара', description: 'Создание глиняной посуды, горшков, кирпичей.' },
  { id: 'p_tool_tinker', category: 'Инструменты', name: 'Инструменты жестянщика', description: 'Починка мелких бытовых приборов, создание заводных вещиц.' },
  { id: 'p_tool_weaver', category: 'Инструменты', name: 'Инструменты ткача', description: 'Работа с тканью, шитье одежды, гобелены.' },
  { id: 'p_tool_woodcarver', category: 'Инструменты', name: 'Инструменты резчика по дереву', description: 'Создание мелких деревянных изделий, рукоятей, стрел.' },
  { id: 'p_kit_disguise', category: 'Инструменты', name: 'Набор для грима', description: 'Изменение внешности, наложение макияжа, усов, париков.' },
  { id: 'p_kit_forgery', category: 'Инструменты', name: 'Набор для фальсификации', description: 'Создание поддельных документов, печатей и подписей.' },
  { id: 'p_game_dice', category: 'Инструменты', name: 'Набор для игры в кости', description: 'Участие в азартных играх на костях, блеф, тактическое мышление.' },
  { id: 'p_game_cards', category: 'Инструменты', name: 'Игральные карты', description: 'Участие в карточных играх, блеф, карточные фокусы.' },
  { id: 'p_game_chess', category: 'Инструменты', name: 'Набор для драконьих шахмат', description: 'Тактическая настольная игра, просчет ходов.' },
  { id: 'p_vehicle_land', category: 'Инструменты', name: 'Наземный транспорт', description: 'Управление повозками, каретами, телегами.' },
  { id: 'p_vehicle_water', category: 'Инструменты', name: 'Водный транспорт', description: 'Управление кораблями, лодками, ориентация на воде.' },
  { id: 'p_instr_lute', category: 'Музыкальные инструменты', name: 'Лютня', description: 'Виртуозная игра на струнном бардском инструменте.' },
  { id: 'p_instr_flute', category: 'Музыкальные инструменты', name: 'Флейта', description: 'Исполнение мелодий на духовом инструменте.' },
  { id: 'p_instr_drum', category: 'Музыкальные инструменты', name: 'Барабан', description: 'Задание ритма, марши и устрашающие боевые барабаны.' },
  { id: 'p_instr_bagpipes', category: 'Музыкальные инструменты', name: 'Волынка', description: 'Громкое и запоминающееся звучание для парадов или устрашения.' },
  { id: 'p_instr_viol', category: 'Музыкальные инструменты', name: 'Виола', description: 'Меланхоличный смычковый инструмент.' },
  { id: 'p_instr_horn', category: 'Музыкальные инструменты', name: 'Боевой рог', description: 'Сигнальные и боевые звуки на большие расстояния.' },
  { id: 'p_instr_pan_flute', category: 'Музыкальные инструменты', name: 'Пан-флейта', description: 'Пасторальные лесные мотивы.' },
  { id: 'p_instr_shawm', category: 'Музыкальные инструменты', name: 'Шалмей', description: 'Громкий язычковый духовой инструмент.' },
  { id: 'p_instr_lyre', category: 'Музыкальные инструменты', name: 'Лира', description: 'Классический античный струнный инструмент.' },
  { id: 'lang_common', category: 'Языки', name: 'Всеобщий язык', description: 'Основной язык общения людей, полуросликов, дварфов и эльфов.' },
  { id: 'lang_dwarvish', category: 'Языки', name: 'Дварфийский', description: 'Резкий, согласный язык горняков, записываемый рунами.' },
  { id: 'lang_elvish', category: 'Языки', name: 'Эльфийский', description: 'Певучий, сложный язык с богатой поэтической литературой.' },
  { id: 'lang_giant', category: 'Языки', name: 'Великаний', description: 'Громогласный язык гигантов, огров и троллей.' },
  { id: 'lang_gnomish', category: 'Языки', name: 'Гномий', description: 'Технический язык изобретателей и исследователей.' },
  { id: 'lang_goblin', category: 'Языки', name: 'Гоблинский', description: 'Грубый язык гоблиноидов и подземных обитателей.' },
  { id: 'lang_halfling', category: 'Языки', name: 'Язык полуросликов', description: 'Дружелюбный диалог хоббитов, редко используемый чужаками.' },
  { id: 'lang_orc', category: 'Языки', name: 'Орочий', description: 'Агрессивный, отрывистый язык орков.' },
  { id: 'lang_abyssal', category: 'Языки', name: 'Бездны', description: 'Ужасающее наречие демонов Нижних Планов.' },
  { id: 'lang_celestial', category: 'Языки', name: 'Небесный', description: 'Чистый, гармоничный язык ангелов и небожителей.' },
  { id: 'lang_draconic', category: 'Языки', name: 'Драконий', description: 'Шипящий древний язык драконов и арканистов.' },
  { id: 'lang_deep_speech', category: 'Языки', name: 'Глубинная речь', description: 'Чужеродный язык аберраций и обитателей Андердарка.' },
  { id: 'lang_infernal', category: 'Языки', name: 'Инфернальный', description: 'Коварный язык дьяволов Девяти Кругов.' },
  { id: 'lang_primordial', category: 'Языки', name: 'Первичный', description: 'Элементальный язык стихий (Акван, Ауран, Игнан, Терран).' },
  { id: 'lang_sylvan', category: 'Языки', name: 'Сильван', description: 'Лесной язык фей, феерических существ и зверей.' },
  { id: 'lang_undercommon', category: 'Языки', name: 'Подземный торговый', description: 'Лингва-франка подземных торговцев и дроу.' }
];

// --- СТРОГАЯ ПРИВЯЗКА БЛОКА ВЛАДЕНИЙ И ЯЗЫКОВ ВНУТРЬ ВКЛАДКИ НАВЫКОВ ---
function acquireProficiency(profId) {
  var foundProf = null;
  for (var i = 0; i < PROFICIENCIES_DB.length; i++) {
    if (PROFICIENCIES_DB[i].id === profId) {
      foundProf = PROFICIENCIES_DB[i];
      break;
    }
  }
  if (!foundProf) return;

  if (window.currentCharacter) {
    if (!window.currentCharacter.proficiencies) {
      window.currentCharacter.proficiencies = [];
    }
    var alreadyHas = false;
    for (var j = 0; j < window.currentCharacter.proficiencies.length; j++) {
      if (window.currentCharacter.proficiencies[j].id === profId) { alreadyHas = true; break; }
    }
    if (!alreadyHas) {
      window.currentCharacter.proficiencies.push(Object.assign({}, foundProf));
      autoSaveCurrentCharacter();
      renderProficienciesBlock();
    }
  }
}

function renderProficienciesBlock() {
  var containerId = 'dynamicProficienciesBlock';
  var block = document.getElementById(containerId);

  var swiperContainer = document.getElementById('swiper');
  var skillsPanel = null;

  if (swiperContainer && swiperContainer.children.length > 1) {
    skillsPanel = swiperContainer.children[1];
  }

  if (!skillsPanel) {
    var allPanels = document.querySelectorAll('.sheet-tab, [class*="tab"], section, div');
    for (var i = 0; i < allPanels.length; i++) {
      var t = allPanels[i].innerText || '';
      if (t.indexOf('Акробатика') !== -1 && t.indexOf('Обман') !== -1 && t.indexOf('Внимательность') !== -1) {
        skillsPanel = allPanels[i];
        break;
      }
    }
  }

  if (skillsPanel) {
    if (!block) {
      block = document.createElement('div');
      block.id = containerId;
      // Используем переменные прозрачности для динамического фона
      block.style.cssText = 'margin-top: 15px; margin-bottom: 25px; background: var(--panel-bg, rgba(28, 28, 30, 0.65)); backdrop-filter: blur(8px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.3);';
      block.innerHTML = '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #333; padding-bottom: 8px;">' +
                          '<h3 style="margin: 0; color: #d4af37; font-size: 16px; font-weight: bold;">Владения и языки</h3>' +
                          '<button onclick="openProficienciesModal()" style="background: #d4af37; color: #000; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: bold;">+ Добавить</button>' +
                        '</div>' +
                        '<div id="proficienciesItemsList" style="display: flex; flex-direction: column; gap: 8px;"></div>';
    }

    var skillsListContainer = null;
    var innerDivs = skillsPanel.querySelectorAll('div');
    for (var j = 0; j < innerDivs.length; j++) {
      var txt = innerDivs[j].innerText || '';
      if (txt.indexOf('Акробатика') !== -1 && txt.indexOf('Выживание') !== -1) {
        skillsListContainer = innerDivs[j];
      }
    }

    if (skillsListContainer && skillsListContainer.parentNode === skillsPanel) {
      skillsPanel.insertBefore(block, skillsListContainer.nextSibling);
    } else {
      skillsPanel.appendChild(block);
    }
  }

  var listContainer = document.getElementById('proficienciesItemsList');
  if (!listContainer) return;

  if (!window.currentCharacter || !window.currentCharacter.proficiencies || window.currentCharacter.proficiencies.length === 0) {
    listContainer.innerHTML = '<div style="color: #777; font-size: 13px; font-style: italic; text-align: center; padding: 10px 0;">Нет добавленных владений и языков</div>';
    return;
  }

  var html = '';
  var profs = window.currentCharacter.proficiencies;
  for (var k = 0; k < profs.length; k++) {
    var p = profs[k];
    html += '<div style="display: flex; justify-content: space-between; align-items: flex-start; background: var(--item-bg, rgba(0, 0, 0, 0.2)); padding: 10px 12px; border-radius: 8px; border-left: 3px solid #d4af37; border: 1px solid rgba(255,255,255,0.06); border-left-width: 3px;">' +
              '<div style="flex-grow: 1; padding-right: 10px;">' +
                '<div style="font-weight: bold; font-size: 14px; color: #fff; display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">' + 
                  p.name + 
                  '<span style="font-size: 10px; background: rgba(212,175,55,0.15); color: #d4af37; padding: 2px 6px; border-radius: 4px; font-weight: normal;">' + p.category + '</span>' +
                '</div>' +
                '<div style="font-size: 12px; color: #aaa; margin-top: 3px; line-height: 1.3;">' + p.description + '</div>' +
              '</div>' +
              '<button onclick="removeProficiency(\'' + p.id + '\')" style="background: none; border: none; color: #ff6b6b; cursor: pointer; font-size: 16px; padding: 2px 6px;" title="Удалить">✕</button>' +
            '</div>';
  }
  listContainer.innerHTML = html;
}

function removeProficiency(profId) {
  if (!window.currentCharacter || !window.currentCharacter.proficiencies) return;
  window.currentCharacter.proficiencies = window.currentCharacter.proficiencies.filter(function(p) {
    return p.id !== profId;
  });
  autoSaveCurrentCharacter();
  renderProficienciesBlock();
}

function openProficienciesModal() {
  var modal = document.getElementById('proficienciesModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'proficienciesModal';
    modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); z-index: 20006; display: flex; justify-content: center; align-items: center; padding: 15px; box-sizing: border-box; backdrop-filter: blur(4px);';
    
    modal.innerHTML = '<div style="background: var(--panel-bg, rgba(28, 28, 30, 0.9)); backdrop-filter: blur(10px); width: 100%; max-width: 480px; max-height: 85vh; border-radius: 12px; display: flex; flex-direction: column; border: 1px solid rgba(255,255,255,0.15); overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">' +
                        '<div style="padding: 15px; background: rgba(0,0,0,0.3); display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1);">' +
                          '<h3 style="margin: 0; color: #fff; font-size: 16px;">Выбор владений и языков</h3>' +
                          '<button onclick="closeProficienciesModal()" style="background: none; border: none; color: #aaa; font-size: 20px; cursor: pointer; padding: 0 5px;">✕</button>' +
                        '</div>' +
                        '<div id="proficienciesCatalogList" style="padding: 15px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; flex-grow: 1;"></div>' +
                      '</div>';
    document.body.appendChild(modal);
  }

  var catalogContainer = document.getElementById('proficienciesCatalogList');
  var currentProfsIds = [];
  if (window.currentCharacter && window.currentCharacter.proficiencies) {
    currentProfsIds = window.currentCharacter.proficiencies.map(function(p) { return p.id; });
  }

  var groupsMap = {
    'Броня': [],
    'Оружие всё': [],
    'Оружие поштучно': [],
    'Навыки': [],
    'Инструменты': [],
    'Музыкальные инструменты': [],
    'Языки': []
  };

  for (var i = 0; i < PROFICIENCIES_DB.length; i++) {
    var item = PROFICIENCIES_DB[i];
    var cat = item.category;

    if (cat === 'Доспехи') {
      groupsMap['Броня'].push(item);
    } else if (cat === 'Оружие') {
      groupsMap['Оружие всё'].push(item);
    } else if (cat === 'Конкретное оружие') {
      groupsMap['Оружие поштучно'].push(item);
    } else if (cat === 'Инструменты') {
      groupsMap['Инструменты'].push(item);
    } else if (cat === 'Музыкальные инструменты') {
      groupsMap['Музыкальные инструменты'].push(item);
    } else if (cat === 'Языки') {
      groupsMap['Языки'].push(item);
    } else {
      if (!groupsMap[cat]) groupsMap[cat] = [];
      groupsMap[cat].push(item);
    }
  }

  var catalogHtml = '';
  var groupKeys = Object.keys(groupsMap);

  for (var g = 0; g < groupKeys.length; g++) {
    var groupName = groupKeys[g];
    var items = groupsMap[groupName];
    if (!items || items.length === 0) continue;

    catalogHtml += '<div style="font-size: 14px; font-weight: bold; color: #d4af37; margin-top: ' + (g === 0 ? '0' : '20px') + '; margin-bottom: 8px; border-bottom: 1px solid rgba(212,175,55,0.2); padding-bottom: 4px;">' + groupName + '</div>';

    for (var k = 0; k < items.length; k++) {
      var item = items[k];
      var isAlreadyHas = currentProfsIds.indexOf(item.id) !== -1;

      catalogHtml += '<div style="display: flex; justify-content: space-between; align-items: center; background: var(--item-bg, rgba(0,0,0,0.2)); padding: 10px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.06); margin-bottom: 8px;">' +
                       '<div style="padding-right: 10px;">' +
                         '<div style="font-weight: bold; color: #fff; font-size: 13px;">' + item.name + '</div>' +
                         '<div style="font-size: 11px; color: #aaa; margin-top: 2px;">' + item.description + '</div>' +
                       '</div>';

      if (isAlreadyHas) {
        catalogHtml += '<span style="font-size: 12px; color: #6bb46b; font-weight: bold; white-space: nowrap;">Добавлено</span>';
      } else {
        catalogHtml += '<button onclick="selectProficiencyFromCatalog(\'' + item.id + '\')" style="background: #d4af37; color: #000; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: bold; white-space: nowrap;">+</button>';
      }

      catalogHtml += '</div>';
    }
  }

  catalogContainer.innerHTML = catalogHtml;
  modal.style.display = 'flex';
}

function closeProficienciesModal() {
  var modal = document.getElementById('proficienciesModal');
  if (modal) modal.style.display = 'none';
}

function selectProficiencyFromCatalog(profId) {
  acquireProficiency(profId);
  openProficienciesModal();
}
