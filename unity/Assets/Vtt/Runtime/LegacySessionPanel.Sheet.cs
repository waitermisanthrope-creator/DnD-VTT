using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Newtonsoft.Json.Linq;
using UnityEngine;

namespace DndVtt.UnityPrototype
{
    public sealed partial class LegacySessionPanel
    {
        private int sheetTab;
        private bool technicalDataOpen,editClassLevels;
        private readonly Dictionary<string, string> edits = new Dictionary<string, string>();
        private readonly HashSet<string> expanded = new HashSet<string>();
        private string rollResult = "Выберите кубик или проверку";
        private string spellSearch = "";
        private JArray spellCatalog;
        private JObject itemCatalog;
        private string itemSearch = "";
        private int itemCategory;
        private bool showItemCatalog;
        private string deletePath, deleteSignature, deleteCharacter, deleteLabel;
        private readonly string[] tabs = { "Герой", "Навыки", "Способности", "Инвентарь", "Заметки", "Дайсы", "Данные", "Кошелёк", "Паспорт", "Лор / Бестиарий" };
        private void ClearSheetInputs() { ResetFormInput(); technicalDataOpen=editClassLevels=false; heroArt3D=false; sheetActionsOpen=false; edits.Clear(); expanded.Clear(); deletePath = deleteSignature = deleteCharacter = deleteLabel = null; }
        private void Attempt(Action action)
        {
            try { action(); } catch (Exception error) { status = error.Message; }
        }
        private void DrawSheetCharacterSwitch()
        {
            if (archive.Count <= 1) return;
            if (GUILayout.Button("←", GUILayout.Width(52), GUILayout.MinHeight(48))) { selected=(selected+archive.Count-1)%archive.Count; ClearSheetInputs(); }
            if (GUILayout.Button("→", GUILayout.Width(52), GUILayout.MinHeight(48))) { selected=(selected+1)%archive.Count; ClearSheetInputs(); }
        }
        private void DrawSheet()
        {
            if (archive == null)
            {
                GUILayout.Label("Импортируйте своего персонажа во вкладке Данные / карты или создайте пустой лист.");
                if (GUILayout.Button("Создать персонажа", GUILayout.Height(52))) BeginCreation();
                DrawImportAndMap(); return;
            }
            bool portraitLayout = UiHeight > UiWidth;
            if (portraitLayout) GUILayout.Label(archive.Name(selected), sheetCharacterName);
            else
            {
                GUILayout.BeginHorizontal();
                GUILayout.Label(archive.Name(selected), sheetHeading);
                DrawSheetCharacterSwitch();
                GUILayout.EndHorizontal();
            }
            GUILayout.BeginHorizontal();
            if (portraitLayout) DrawSheetCharacterSwitch();
            if (MeasuredMenuButton("Сохранить", brandGreen, GUILayout.MinHeight(56))) Attempt(() => { SaveSheet(); status="Сохранено на устройстве"; });
            if (MeasuredMenuButton("Ещё", sheetActionsOpen ? brandBlue : GUI.skin.button, GUILayout.Width(100), GUILayout.MinHeight(56))) sheetActionsOpen=!sheetActionsOpen;
            GUILayout.EndHorizontal();
            if(sheetActionsOpen)
            {
                if (MeasuredMenuButton("Копировать весь архив", GUI.skin.button, GUILayout.MinHeight(54))) { GUIUtility.systemCopyBuffer=archive.Export(); status="Весь архив скопирован"; }
                if (MeasuredMenuButton("Сохранить архив в файл…", GUI.skin.button, GUILayout.MinHeight(54))) Attempt(() => PickCharacterFile(true));
                GUILayout.Label("Архив включает всех героев и их арт.",sheetQuiet);
            }
            int next = HorizontalTabs(sheetTab, tabs, ref sheetTabsScroll);
            // Render/save the old tab once before committing a tab transition.
            JObject hero = archive.Snapshot(selected); bool changed = false, persistWallet = false, persistCommerce = false;
            if (deletePath != null)
            {
                GUILayout.Label("Удалить запись «" + deleteLabel + "» вместе с её содержимым?");
                GUILayout.Label("После подтверждения изменение сохранится на устройстве.");
                GUILayout.BeginHorizontal();
                if (GUILayout.Button("Отмена", GUILayout.Height(52))) ClearSheetInputs();
                if (GUILayout.Button("Подтвердить удаление", GUILayout.Height(52))) Attempt(() =>
                {
                    if (hero["id"].ToString() != deleteCharacter) throw new InvalidOperationException("Выбран другой персонаж");
                    CharacterSheetRules.RemoveRecord(hero, deletePath, deleteSignature);
                    if (deletePath.StartsWith("libraryData.entries") && hero["library"] is JArray) hero["library"] = hero["libraryData"]["entries"].DeepClone();
                    var candidate = archive.DetachedCopy(); candidate.Replace(selected, hero);
                    CharacterSheetStore.Save(SavePath, candidate); archive = candidate;
                    ClearSheetInputs(); status = "Запись удалена и сохранена на устройстве.";
                });
                GUILayout.EndHorizontal(); return;
            }
            switch (sheetTab)
            {
                case 0: Hero(hero, ref changed); break;
                case 1: GUILayout.BeginVertical(GUI.skin.box); SheetSection("Навыки"); Skills(hero, ref changed); GUILayout.EndVertical(); DrawCharacterFeats(hero, ref changed); break;
                case 2:
                    GUILayout.Label("Редактор записей. Автоматическое исполнение классовых эффектов и расход действий ещё переносится.");
                    Scalar(hero, "spellStat", "Характеристика заклинаний", ref changed, "int");
                    string stat = (string)hero["spellStat"] ?? "int";
                    int attack = CharacterSheetRules.Modifier(hero, stat) + CharacterSheetRules.Proficiency(hero);
                    GUILayout.Label("Базовая СЛ заклинаний: " + (8 + attack) + " · атака: " + Signed(attack));
                    Collection(hero, "combatAbilities", "Приёмы", () => new JObject { ["id"] = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds(), ["name"] = "Новый приём", ["description"] = "", ["rechargeOn"] = "none", ["maxUses"] = 0, ["usedCount"] = 0 }, ref changed);
                    Collection(hero, "spellsData", "Заклинания и фокусы", () => new JObject { ["id"] = Guid.NewGuid().ToString(), ["name"] = "Новое заклинание", ["level"] = 0, ["desc"] = "", ["prepared"] = false }, ref changed);
                    SpellSlots(hero, ref changed);
                    SpellCatalog(hero, ref changed);
                    Tree(hero, "resources", "Ресурсы — ручной учёт", ref changed);
                    ReadOnly(hero, "classFeaturesState", "Состояние классовых эффектов"); break;
                case 3: DrawCommerceInventory(hero, ref changed, ref persistCommerce); break;
                case 4:
                    Collection(hero, "folders", "Папки заметок", () => new JObject { ["id"] = "f_" + Guid.NewGuid(), ["name"] = "Новая папка", ["notes"] = new JArray() }, ref changed); break;
                case 5: DrawDiceTable(); break;
                case 7: Wallet(hero, ref changed, ref persistWallet); break;
                case 9: DrawLore(hero, ref changed); break;
                case 8:
                    foreach (string field in new[] { "age", "gender", "origin", "alignment", "appearance", "personality", "ideals", "bonds", "flaws", "backstory", "profession" }) Scalar(hero, field, FieldLabel(field), ref changed);
                    foreach (string field in new[] { "proficiencies", "features", "feats", "raceMechanics", "raceFeatureDescriptions", "resistances", "immunities", "craftingProfessions", "companions", "encounters", "initiativeTracker", "pendingChoices", "choiceState" }) Tree(hero, field, FieldLabel(field), ref changed);
                    break;
                default:
                    SheetSection("Файлы и данные");
                    GUILayout.Label("Архив включает всех героев и их арты. Сохранение работает автоматически.",sheetQuiet);
                    DrawCharacterBackups();
                    if(FitMenuButton(technicalDataOpen?"Скрыть технический редактор":"Технический редактор…")){ResetFormInput();technicalDataOpen=!technicalDataOpen;}
                    if(technicalDataOpen){GUILayout.Label("Полный документ. Неизвестные поля сохраняются; ID защищены.",sheetQuiet);EditToken(hero,"raw",0,ref changed);}break;
            }
            if (changed) Attempt(() =>
            {
                if (persistWallet || persistCommerce)
                {
                    var candidate = archive.DetachedCopy(); candidate.Replace(selected, hero);
                    CharacterSheetStore.Save(SavePath, candidate); archive = candidate; ClearSheetInputs();
                    if (persistWallet) for (int i = 0; i < coinInput.Length; i++) coinInput[i] = "0";
                    if (persistWallet) status = "Операция кошелька выполнена. Архив сохранён на устройстве."; else status += " · Сохранено";
                }
                else
                {
                    var candidate = archive.DetachedCopy(); candidate.Replace(selected, hero);
                    CharacterSheetStore.Save(SavePath, candidate); archive = candidate;
                    status = "Изменения сохранены на устройстве";
                }
            });
            if(next!=sheetTab){ResetFormInput();sheetTab=next;}
        }
        private void Hero(JObject hero, ref bool changed)
        {
            string classesBefore=hero["classes"]?.ToString(Newtonsoft.Json.Formatting.None);
            bool wide=UiWidth>=900;
            if(wide){GUILayout.BeginHorizontal();GUILayout.BeginVertical(GUILayout.Width(310));}
            DrawHeroArt(hero);
            if(wide){GUILayout.EndVertical();GUILayout.BeginVertical();}
            GUILayout.BeginVertical(GUI.skin.box);SheetSection("О герое");
            string priorClass = (string)hero["class"];
            foreach (var field in new[] { ("name", "Имя"), ("class", "Класс"), ("raceName", "Раса"), ("background", "Предыстория"), ("speed", "Скорость"), ("hitDice", "Кости хитов") }) Scalar(hero, field.Item1, field.Item2, ref changed, field.Item1 == "class" ? hero["className"] : null);
            if ((string)hero["class"] != priorClass) hero["className"] = hero["class"]?.DeepClone();
            GUILayout.EndVertical();
            if(wide){GUILayout.EndVertical();GUILayout.EndHorizontal();}
            GUILayout.BeginVertical(GUI.skin.box);SheetSection("Здоровье и защита");
            GUILayout.Label("Уровень "+CharacterSheetRules.Level(hero),sheetCharacterName);
            if(FitMenuButton(editClassLevels?"Скрыть уровни классов":"Изменить уровни классов…")){ResetFormInput();editClassLevels=!editClassLevels;}
            if(editClassLevels)
            {
                GUILayout.Label("Ручной учёт уровней. Выбор новых способностей и прирост HP пока не автоматизированы.",sheetQuiet);
                if(hero["classes"] is JArray classList && classList.Count>0)
                    foreach(var c in classList.OfType<JObject>())Scalar(c,"level","Уровень: "+((string)c["name"]??"Класс"),ref changed,1);
                else Scalar(hero,"level","Уровень",ref changed,1);
            }
            foreach (var field in new[] { ("ac", "Класс доспеха"), ("hpMax", "Максимум HP"), ("hpCurrent", "Текущие HP"), ("hpTemp", "Временные HP") })
            {
                JToken fallback = field.Item1 == "hpCurrent" ? archive.CurrentHp(selected) : field.Item1 == "hpMax" ? archive.MaximumHp(selected) : field.Item1 == "hpTemp" ? archive.TemporaryHp(selected) : field.Item1 == "level" ? 1 : 10;
                Scalar(hero, field.Item1, field.Item2, ref changed, fallback);
            }
            GUILayout.EndVertical();
            GUILayout.BeginVertical(GUI.skin.box);SheetSection("Характеристики");
            Collection(hero, "classes", "Мультикласс", () => new JObject { ["name"] = "Класс", ["level"] = 1, ["subclass"] = "" }, ref changed);
            var stats = hero["stats"] as JObject ?? new JObject();
            int columns=wide?3:2;
            for (int i = 0; i < CharacterSheetRules.Stats.Length; i++)
            {
                if(i%columns==0)GUILayout.BeginHorizontal();
                GUILayout.BeginVertical(GUI.skin.box,GUILayout.Width(Mathf.Max(80,(UiWidth-2*Mathf.Min(28f,UiWidth*.04f)-60)/columns)));
                string stat = CharacterSheetRules.Stats[i];
                GUILayout.Label(CharacterSheetRules.StatNames[i],sheetQuiet);
                DesktopUiSmoke.RecordSingleLine(CharacterSheetRules.StatNames[i],sheetQuiet,GUILayoutUtility.GetLastRect());
                string key="hero-stat:"+stat;
                if(!edits.TryGetValue(key,out string old))old=stats[stat]?.ToString()??"10";
                string value=IntegerField("hero:"+hero["id"]+":"+stat,old,GUILayout.MinHeight(48));edits[key]=value;
                if(value!=old)
                {
                    if(int.TryParse(value,NumberStyles.Integer,CultureInfo.InvariantCulture,out int number)){stats[stat]=number;changed=true;}
                    else status="Введите целое число: "+CharacterSheetRules.StatNames[i];
                }
                GUILayout.Label(Signed(CharacterSheetRules.Modifier(new JObject { ["stats"] = stats.DeepClone() }, stat)),sheetCharacterName);
                GUILayout.EndVertical();if(i%columns==columns-1)GUILayout.EndHorizontal();
            }
            if (changed) { hero["stats"] = stats; Attempt(() => { if(classesBefore!=hero["classes"]?.ToString(Newtonsoft.Json.Formatting.None))CharacterSheetRules.SynchronizeClassLevel(hero);else CharacterSheetRules.Recalculate(hero); }); }
            GUILayout.Label("Бонус мастерства: " + Signed(CharacterSheetRules.Proficiency(hero)) + " · базовая инициатива: " + Signed(CharacterSheetRules.Modifier(hero, "dex")));
            if (GUILayout.Button("Бросить инициативу", GUILayout.Height(52))) Roll("Инициатива", 20, CharacterSheetRules.Modifier(hero, "dex"));
            GUILayout.Label(rollResult);
            ReadOnly(hero, "activeConditions", "Активные состояния (автоматические эффекты ещё переносятся)");
            ReadOnly(hero, "conditions", "Унаследованные состояния");
            ReadOnly(hero, "companions", "Компаньоны"); ReadOnly(hero, "initiativeTracker", "Бой / инициатива");
            GUILayout.EndVertical();
        }
        private void Skills(JObject hero, ref bool changed)
        {
            var skills = hero["skillsData"] as JObject ?? new JObject();
            var saves = hero["savesData"] as JObject ?? new JObject();
            GUILayout.Label("Базовая проверка: характеристика + владение × мастерство. Классовые бонусы ещё не исполняются.");
            for (int i = 0; i < CharacterSheetRules.SkillIds.Length; i++)
            {
                string key = CharacterSheetRules.SkillIds[i]; int old = (int)LegacyJson.Number(skills[key], 0);
                GUILayout.BeginHorizontal();
                int value = old; if (GUILayout.Button(new[] { "—", "✓", "★" }[Mathf.Clamp(old,0,2)], GUILayout.Width(57), GUILayout.Height(43))) value = (old + 1) % 3;
                GUILayout.Label(CharacterSheetRules.SkillNames[i], GUILayout.ExpandWidth(true));
                if (value != old) { skills[key] = value; hero["skillsData"] = skills; CharacterSheetRules.Recalculate(hero); changed = true; }
                int total = CharacterSheetRules.Skill(hero, i);
                if (GUILayout.Button(Signed(total) + " · бросок", GUILayout.Width(92))) Roll(CharacterSheetRules.SkillNames[i], 20, total);
                GUILayout.EndHorizontal();
            }
            for (int i = 0; i < CharacterSheetRules.Stats.Length; i++)
            {
                string key = CharacterSheetRules.Stats[i]; bool old = (bool?)saves[key] ?? false;
                bool value = GUILayout.Toggle(old, "Спасбросок: " + CharacterSheetRules.StatNames[i]);
                if (value != old) { saves[key] = value; hero["savesData"] = saves; changed = true; }
                if (GUILayout.Button("Бросок " + key)) Roll("Спасбросок " + key, 20, CharacterSheetRules.Modifier(hero, key) + (value ? CharacterSheetRules.Proficiency(hero) : 0));
            }
            GUILayout.Label("Пассивно: Внимательность " + (10 + CharacterSheetRules.Skill(hero, 11)) + " · Анализ " + (10 + CharacterSheetRules.Skill(hero, 8)) + " · Проницательность " + (10 + CharacterSheetRules.Skill(hero, 6)));
            GUILayout.Label(rollResult);
        }
        private void Roll(string label, int sides, int modifier) { int die = UnityEngine.Random.Range(1, sides + 1); rollResult = label + ": " + die + " " + Signed(modifier) + " = " + (die + modifier); }
        private void SpellSlots(JObject hero, ref bool changed)
        {
            GUILayout.Label("Ячейки: ручной учёт максимум / использовано. Прогрессия класса ещё переносится.");
            var slots = hero["spellSlotsData"] as JObject ?? new JObject();
            for (int i = 1; i <= 9; i++)
            {
                string key = i.ToString(); var level = slots[key] as JObject ?? new JObject(); bool edit = false;
                GUILayout.Label("Круг " + i);
                Scalar(level, "max", "Круг " + i + " максимум", ref edit, 0); Scalar(level, "used", "Круг " + i + " использовано", ref edit, 0);
                if (edit)
                {
                    float max = LegacyJson.Number(level["max"]), used = LegacyJson.Number(level["used"]);
                    if (max < 0 || used < 0 || used > max) { status = "Ячейки: требуется 0 ≤ использовано ≤ максимум"; continue; }
                    slots[key] = level; hero["spellSlotsData"] = slots; changed = true;
                }
            }
        }
        private void SpellCatalog(JObject hero, ref bool changed)
        {
            if (spellCatalog == null)
            {
                var asset = Resources.Load<TextAsset>("CharacterSheet/catalog");
                if (!asset) { GUILayout.Label("Справочник заклинаний не найден"); return; }
                spellCatalog = (JArray)JObject.Parse(asset.text)["spells"];
            }
            GUILayout.Label("Справочник: " + spellCatalog.Count + " заклинания. Поиск по названию:");
            spellSearch = GUILayout.TextField(spellSearch, GUILayout.Height(52));
            if (spellSearch.Trim().Length < 2) return;
            var matches = spellCatalog.OfType<JObject>().Where(s => ((string)s["name"] ?? "").IndexOf(spellSearch, StringComparison.OrdinalIgnoreCase) >= 0).Take(30);
            foreach (var spell in matches)
                if (GUILayout.Button("+ " + spell["name"] + " · круг " + spell["level"], GUILayout.Height(52)))
                {
                    var entry = (JObject)spell.DeepClone(); entry["id"] = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds(); entry["desc"] = spell["description"] ?? spell["desc"] ?? ""; entry["prepared"] = false;
                    CharacterSheetRules.Array(hero, "spellsData").Add(entry); changed = true;
                }
        }
        private static string Signed(int n) => n >= 0 ? "+" + n : n.ToString();
        private void ItemCatalog(JObject hero, ref bool changed)
        {
            showItemCatalog = GUILayout.Toggle(showItemCatalog, "Справочник предметов — 188 записей");
            if (!showItemCatalog) return;
            if (itemCatalog == null)
            {
                var asset = Resources.Load<TextAsset>("CharacterSheet/catalog");
                if (!asset) { GUILayout.Label("Справочник предметов не найден"); return; }
                itemCatalog = (JObject)JObject.Parse(asset.text)["items"];
            }
            itemCategory = MenuGrid(itemCategory,new[] { "Оружие", "Броня", "Расходники", "Материалы", "Хлам" },UiWidth<900?3:5);
            GUILayout.Label("Поиск по названию, категории или ID:"); itemSearch = GUILayout.TextField(itemSearch, GUILayout.Height(52));
            string category = CharacterSheetRules.InventoryCategories[itemCategory];
            var matches = ((JArray)itemCatalog[category]).OfType<JObject>().Where(item => (item["name"] + " " + item["category"] + " " + item["id"]).IndexOf(itemSearch, StringComparison.OrdinalIgnoreCase) >= 0).ToArray();
            GUILayout.Label("Найдено: " + matches.Length + "; показаны первые 20");
            foreach (var item in matches.Take(20))
                if (GUILayout.Button("+ " + item["name"] + " · " + item["weight"] + " · " + item["cost"], GUILayout.Height(52)))
                {
                    try { CharacterSheetRules.AddInventory(hero, category, (string)item["name"], 1, item); changed = true; }
                    catch (Exception error) { status = error.Message; }
                }
        }
        private void RequestDelete(JToken record, string label)
        {
            deletePath = record.Path; deleteSignature = record.ToString(Newtonsoft.Json.Formatting.None);
            deleteCharacter = archive.Snapshot(selected)["id"].ToString(); deleteLabel = label;
        }
        private void Scalar(JObject owner, string key, string label, ref bool changed, JToken fallback = null)
        {
            JToken token = owner[key] ?? fallback ?? new JValue("");
            if (token is JContainer) { Tree(owner, key, label, ref changed); return; }
            string path = owner.Path + "/" + label + "/" + key;
            bool portrait = UiHeight > UiWidth;
            if (portrait) { GUILayout.BeginVertical(); GUILayout.Label(label); } else { GUILayout.BeginHorizontal(); GUILayout.Label(label, GUILayout.Width(200)); }
            if (token.Type == JTokenType.Boolean)
            {
                bool old = (bool)token, value = GUILayout.Toggle(old, ""); if (old != value) { owner[key] = value; changed = true; }
            }
            else
            {
                string original = token.Type == JTokenType.Null ? "" : Convert.ToString(((JValue)token).Value, CultureInfo.InvariantCulture);
                if (!edits.TryGetValue(path, out string text)) text = original;
                bool numeric = token.Type == JTokenType.Integer || token.Type == JTokenType.Float || fallback?.Type == JTokenType.Integer || fallback?.Type == JTokenType.Float;
                bool integral = key != "count" && key != "weight" && (token.Type == JTokenType.Integer || fallback?.Type == JTokenType.Integer);
                GUI.SetNextControlName("sheet-field:"+selected+":"+path);
                string value = key == "text" || key == "desc" || key == "description"
                    ? GUILayout.TextArea(text, GUILayout.MinHeight(90)) : numeric&&integral?IntegerField("sheet-number:"+selected+":"+path,text,GUILayout.MinHeight(48)):GUILayout.TextField(text, GUILayout.MinHeight(48)); edits[path] = value;
                if (value != text)
                {
                    if (numeric)
                    {
                        if (double.TryParse(value, NumberStyles.Float, CultureInfo.InvariantCulture, out double number) && !double.IsNaN(number) && !double.IsInfinity(number) && number > long.MinValue && number < long.MaxValue && (!integral || number == Math.Truncate(number)) && (key != "count" || number > 0))
                        { owner[key] = integral ? new JValue(checked((long)number)) : new JValue(number); changed = true; }
                        else status = "Введите число: " + label;
                    }
                    else { owner[key] = value; changed = true; }
                }
            }
            if (portrait) GUILayout.EndVertical(); else GUILayout.EndHorizontal();
        }
        private void Collection(JObject hero, string key, string label, Func<JObject> create, ref bool changed)
        {
            GUILayout.Label(label);
            if (hero[key] != null && !(hero[key] is JArray)) { ReadOnly(hero, key, "Нестандартный формат"); return; }
            var rows = hero[key] as JArray ?? new JArray();
            for (int i = 0; i < rows.Count; i++)
            {
                string title = (rows[i] as JObject)?["name"]?.ToString() ?? (rows[i] as JObject)?["title"]?.ToString() ?? (i + 1).ToString();
                string path = hero.Path + "/" + key + "/" + i;
                if (GUILayout.Button((expanded.Contains(path) ? "▼ " : "▶ ") + title, GUILayout.Height(52)))
                {
                    if (!expanded.Add(path)) expanded.Remove(path);
                    if (key == "folders" && rows[i] is JObject folder) { hero["activeFolderId"] = folder["id"]?.DeepClone(); changed = true; }
                }
                if (expanded.Contains(path))
                {
                    EditToken(rows[i], path, 0, ref changed);
                    if (key != "classes" && GUILayout.Button("Удалить «" + title + "»…", GUILayout.Height(52))) RequestDelete(rows[i], title);
                }
            }
            if (GUILayout.Button("+ " + label, GUILayout.Height(52)))
            {
                var record = create(); rows.Add(record); hero[key] = rows;
                if (key == "folders") hero["activeFolderId"] = record["id"]?.DeepClone(); changed = true;
            }
        }
        private void Tree(JObject hero, string key, string label, ref bool changed)
        {
            if (hero[key] == null) return;
            string path = hero.Path + "/" + key;
            if (GUILayout.Button((expanded.Contains(path) ? "▼ " : "▶ ") + label, GUILayout.Height(52))) { if (!expanded.Add(path)) expanded.Remove(path); }
            if (expanded.Contains(path)) EditToken(hero[key], path, 0, ref changed);
        }
        private void EditToken(JToken token, string path, int depth, ref bool changed)
        {
            if (depth > 16) { GUILayout.Label("Вложенные данные доступны в полном экспорте"); return; }
            if (token is JObject obj)
            {
                foreach (var property in obj.Properties().ToArray())
                {
                    if (depth==0 && property.Name=="heroArt") { GUILayout.Label("Арт персонажа — управление во вкладке «Герой»",sheetQuiet);continue; }
                    if (property.Name == "id" || property.Name == "schemaVersion" || property.Name.EndsWith("Id", StringComparison.Ordinal)) continue;
                    if (property.Value is JContainer) { GUILayout.Label(FieldLabel(property.Name)); EditToken(property.Value, path + "/" + property.Name, depth + 1, ref changed); }
                    else Scalar(obj, property.Name, FieldLabel(property.Name), ref changed);
                }
                if (obj["notes"] is JArray notes && GUILayout.Button("+ Заметка")) { notes.Add(new JObject { ["id"] = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds(), ["title"] = "Заметка", ["text"] = "" }); changed = true; }
            }
            else if (token is JArray array) foreach (var item in array.ToArray())
            {
                if (item is JValue scalar)
                {
                    // Use the same typed controls as object properties; numeric and
                    // boolean arrays must not silently become string arrays.
                    string key = path + "/" + array.IndexOf(item); var box = new JObject { [key] = scalar.DeepClone() }; bool edited = false;
                    Scalar(box, key, "Значение", ref edited);
                    if (edited) { array[array.IndexOf(item)] = box[key].DeepClone(); changed = true; }
                }
                else EditToken(item, path + "/" + array.IndexOf(item), depth + 1, ref changed);
                string label = (item as JObject)?["title"]?.ToString() ?? (item as JObject)?["name"]?.ToString() ?? "Запись";
                if (array.Path != "classes" && GUILayout.Button("Удалить «" + label + "»…", GUILayout.Height(52))) RequestDelete(item, label);
            }
            else GUILayout.Label(token.ToString());
        }
        private void ReadOnly(JObject hero, string key, string title)
        {
            if (hero[key] == null) return;
            if (GUILayout.Button(title, GUILayout.Height(52))) { if (!expanded.Add("read/" + key)) expanded.Remove("read/" + key); }
            if (expanded.Contains("read/" + key)) ReadOnlyToken(hero[key], key, 0);
        }
        private static string FieldLabel(string key) => key switch
        {
            "age" => "Возраст", "gender" => "Пол", "origin" => "Происхождение", "alignment" => "Мировоззрение", "appearance" => "Внешность", "personality" => "Характер", "ideals" => "Идеалы", "bonds" => "Привязанности", "flaws" => "Слабости", "backstory" => "История", "profession" => "Профессия",
            "proficiencies" => "Владения и языки", "features" => "Особенности", "feats" => "Черты", "raceMechanics" => "Расовые особенности", "raceFeatureDescriptions" => "Описание расовых особенностей", "resistances" => "Сопротивления", "immunities" => "Иммунитеты", "craftingProfessions" => "Ремесленные профессии", "companions" => "Компаньоны", "encounters" => "Сражения", "initiativeTracker" => "Инициатива", "pendingChoices" => "Ожидающие решения", "choiceState" => "Сделанные выборы",
            "name" => "Название", "title" => "Заголовок", "text" => "Текст", "desc" => "Описание", "description" => "Описание",
            "count" => "Количество", "weight" => "Вес", "equipped" => "Экипировано", "prepared" => "Подготовлено", "level" => "Уровень",
            "notes" => "Заметки", "contents" => "Содержимое", "damage" => "Урон", "damageType" => "Тип урона", "school" => "Школа",
            "castingTime" => "Время накладывания", "range" => "Дистанция", "duration" => "Длительность", "concentration" => "Концентрация",
            "source" => "Источник", "rechargeOn" => "Восстановление", "maxUses" => "Максимум применений", "usedCount" => "Использовано", _ => key
        };
        private void ReadOnlyToken(JToken token, string path, int depth)
        {
            if (depth > 16) return;
            if (token is JObject obj) foreach (var p in obj.Properties()) { GUILayout.Label(p.Name); ReadOnlyToken(p.Value, path + "/" + p.Name, depth + 1); }
            else if (token is JArray array) foreach (var item in array) ReadOnlyToken(item, path, depth + 1);
            else GUILayout.Label(token.ToString());
        }
    }
}
