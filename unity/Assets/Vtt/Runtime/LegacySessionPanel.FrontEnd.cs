using System;
using System.Globalization;
using System.Linq;
using Newtonsoft.Json.Linq;
using UnityEngine;

namespace DndVtt.UnityPrototype
{
    public sealed partial class LegacySessionPanel
    {
        private enum FrontScreen { Home, Characters, Create, Sheet, Import, Map, Settings, ContentManager, Account, Chat, Dice, CharacterStudio }
        private FrontScreen screen = FrontScreen.Home;
        private Vector2 frontScroll;
        private JObject creationCatalog;
        private int creationStep, raceIndex, classIndex, backgroundIndex, statMode;
        private string heroName = "", rosterSearch = "";
        private string pendingCharacterDeleteId, pendingCharacterDeleteName;
        private string pickerKey, pickerSearch = "";
        private readonly string[] statInputs = { "15", "14", "13", "12", "10", "8" };
        private JObject creationAnswers = new JObject();
        private JObject lastPreview;
        private bool creationFeatEnabled;
        private int creationFeatIndex;
        private GUIStyle heading, muted, bigButton;
        private JObject CreationCatalog { get { InitializeWorkshop(); return creationCatalog ??= workshop.Creation((JObject)JObject.Parse(Resources.Load<TextAsset>("CharacterSheet/catalog").text)["creation"]); } }
        private JArray AvailableClasses => new JArray(((JArray)CreationCatalog["classes"]).OfType<JObject>().Where(c => (bool?)c["seed"]?["isExtraClass"] != true && (string)c["name"] != "Гайст"));
        // Mobile menus, character creation, sheets, import and settings use
        // portrait; only the live 3D map uses landscape. Desktop is unchanged.
        private void ApplyMobileOrientation(FrontScreen target)
        {
#if UNITY_ANDROID && !UNITY_EDITOR
            ScreenOrientation desired = target == FrontScreen.Map
                ? ScreenOrientation.LandscapeLeft : ScreenOrientation.Portrait;
            if (Screen.orientation != desired) Screen.orientation = desired;
#endif
        }
        private void Navigate(FrontScreen next)
        {
            if (screen == FrontScreen.CharacterStudio && next != FrontScreen.CharacterStudio) CloseCharacterStudio();
            if(screen==FrontScreen.ContentManager&&next!=FrontScreen.ContentManager)CloseWorkshopPreviews();
            if(next==FrontScreen.ContentManager&&screen!=FrontScreen.ContentManager) { InitializeWorkshop();BeginWorkshopPreviews();if(!contentCatalogAutoRefreshed&&!contentBusy&&(assetPacks.Count==0||!assetPacks.OfType<Newtonsoft.Json.Linq.JObject>().Any(m=>m["preview"]!=null)||!contentPackages.OfType<Newtonsoft.Json.Linq.JObject>().Any(m=>(string)m["collectionCategory"]=="races")||!assetPacks.OfType<Newtonsoft.Json.Linq.JObject>().Any(m=>(string)m["collectionCategory"]=="icons"))) { contentCatalogAutoRefreshed=true;StartCoroutine(FetchContentCatalog()); } }
            pendingCharacterDeleteId = pendingCharacterDeleteName = null;
            menuGesture.Clear();
            screen = next;
            ApplyMobileOrientation(next);
            frontScroll = Vector2.zero; scroll = Vector2.zero; ClearSheetInputs();
            world.explorer.acceptInput = next == FrontScreen.Map; panel = false;
            Cursor.lockState = CursorLockMode.None; Cursor.visible = true; if (Event.current != null) GUI.FocusControl(null);
        }
        private void BeginCreation()
        {
            heroName = ""; creationStep = 0; creationFeatEnabled = false; creationAnswers = new JObject(); lastPreview = null;
            classIndex = Math.Max(0, AvailableClasses.ToList().FindIndex(c => (string)c["name"] == "Воин"));
            backgroundIndex = Math.Max(0, ((JArray)CreationCatalog["backgrounds"]).ToList().FindIndex(b => (string)b["nameRu"] == "Солдат"));
            Navigate(FrontScreen.Create);
        }
        private void DrawFrontEnd()
        {
            // The main app and settings use the exact main-branch look, but
            // remain native Unity screens. Existing gameplay screens survive.
            if (screen == FrontScreen.Home) { DrawBrandHome(); return; }
            if (screen == FrontScreen.CharacterStudio) { DrawCharacterStudio(); return; }
            if (screen == FrontScreen.Settings)
            {
                if (brandTechnicalScreen) DrawTechnicalSettings();
                else DrawBrandSettings();
                return;
            }
            PrepareSheetSkin();
            heading ??= new GUIStyle(GUI.skin.label) { fontSize = 32, fontStyle = FontStyle.Bold, wordWrap = true };
            muted ??= new GUIStyle(GUI.skin.label) { fontSize = 15, wordWrap = true, normal = { textColor = new Color(.65f, .73f, .83f) } };
            bigButton ??= new GUIStyle(GUI.skin.button) { fontSize = 18, padding = new RectOffset(20, 20, 16, 16), alignment = TextAnchor.MiddleLeft };
            var oldColor = GUI.color;
            string theme = preferences?.theme ?? "midnight";
            GUI.color = oldColor;
            DrawBrandBackdrop(true); // Shared wallpaper + charcoal overlay on secondary screens.
            float inset = Mathf.Min(28f, UiWidth * .04f);
            GUILayout.BeginArea(new Rect(inset, 20, Mathf.Max(1, UiWidth - inset * 2), Mathf.Max(1, UiHeight - 40)));
            GUILayout.BeginHorizontal(); GUILayout.Label("DnD VTT", heading); GUILayout.FlexibleSpace(); GUILayout.Label("Unity · " + UnityRelease.Version, muted); GUILayout.EndHorizontal();
            // A 6-column PC toolbar becomes 3 comfortable rows of two on a
            // portrait phone; all destinations stay accessible in either view.
            bool portraitLayout = UiHeight > UiWidth;
            if (screen == FrontScreen.Sheet)
            {
                GUILayout.BeginHorizontal();
                if (GUILayout.Button("⌂ Меню",GUILayout.Height(44))) Navigate(FrontScreen.Home);
                if (GUILayout.Button("Персонажи",GUILayout.Height(44))) Navigate(FrontScreen.Characters);
                if (GUILayout.Button("Настройки",GUILayout.Height(44))) OpenSettings();
                GUILayout.EndHorizontal();
            }
            else
            {
            int navHeight = portraitLayout ? 54 : 36;
            GUILayout.BeginHorizontal();
            if (GUILayout.Button("Главная", GUILayout.Height(navHeight))) Navigate(FrontScreen.Home);
            if (GUILayout.Button("Персонажи · " + (archive?.Count ?? 0), GUILayout.Height(navHeight))) Navigate(FrontScreen.Characters);
            if (portraitLayout) { GUILayout.EndHorizontal(); GUILayout.BeginHorizontal(); }
            if (GUILayout.Button("Создать героя", GUILayout.Height(navHeight))) BeginCreation();
            if (GUILayout.Button("Импорт / экспорт", GUILayout.Height(navHeight))) Navigate(FrontScreen.Import);
            if (portraitLayout) { GUILayout.EndHorizontal(); GUILayout.BeginHorizontal(); }
            if (GUILayout.Button("3D-карта", GUILayout.Height(navHeight))) Navigate(FrontScreen.Map);
            if (GUILayout.Button("Настройки", GUILayout.Height(navHeight))) OpenSettings();
            GUILayout.EndHorizontal(); GUILayout.Space(18);
            }
            frontScroll = GUILayout.BeginScrollView(SwipePosition("front",frontScroll),false,true,GUIStyle.none,GUI.skin.verticalScrollbar);
            GUILayout.BeginVertical(new GUIStyle { fixedWidth=Mathf.Max(1,UiWidth-inset*2-22),stretchWidth=false });
            switch (screen)
            {
                case FrontScreen.Home:
                    GUILayout.Space(24); GUILayout.Label("Каждая история начинается\nс персонажа.", heading);
                    GUILayout.Space(10); GUILayout.Label("Создайте героя, откройте его лист или перенесите сохранение из прежнего клиента.", muted); GUILayout.Space(24);
                    if (GUILayout.Button("Мои персонажи  →", bigButton, GUILayout.Height(68))) Navigate(FrontScreen.Characters);
                    if (GUILayout.Button("+  Создать персонажа", bigButton, GUILayout.Height(68))) BeginCreation();
                    if (archive != null && GUILayout.Button("Продолжить: " + CurrentName, bigButton, GUILayout.Height(68))) Navigate(FrontScreen.Sheet);
                    if (updateFeed != null && (int)updateFeed["versionCode"] > UnityRelease.Code)
                    {
                        GUILayout.Label("Доступно обновление Unity " + (string)updateFeed["version"], muted);
                        if (GUILayout.Button("Обновить приложение  →", bigButton, GUILayout.Height(58))) OpenSettings();
                    }
                    if (GUILayout.Button("Настройки и обновления", bigButton, GUILayout.Height(54))) OpenSettings();
                    GUILayout.Space(22); GUILayout.Label("Лист, инвентарь, кошелёк, заклинания и заметки — в одном сохранении.", muted); break;
                case FrontScreen.Dice: DrawDiceTable(); break;
                case FrontScreen.Chat: DrawChat(); break;
                case FrontScreen.Account: DrawAccount(); break;
                case FrontScreen.ContentManager: DrawContentManager(); break;
                case FrontScreen.Characters: DrawRoster(); break;
                case FrontScreen.Create: DrawCreation(); break;
                case FrontScreen.Sheet: DrawSheet(); break;
                case FrontScreen.Settings: DrawSettings(); break;
                case FrontScreen.Import:
                    GUILayout.Label("Перенос персонажей", heading);
                    GUILayout.Label("Вставьте JSON персонажа, массива или архива characters. Импорт сначала проверяется и открывается в памяти; запись — кнопкой Сохранить.", muted);
                    input = GUILayout.TextArea(input, GUILayout.MinHeight(170));
                    if (GUILayout.Button("Проверить и открыть импорт", GUILayout.Height(44))) { if (Import(input)) Navigate(FrontScreen.Characters); }
                    if (archive != null)
                    {
                        if (GUILayout.Button("Копировать текущий архив", GUILayout.Height(52))) GUIUtility.systemCopyBuffer = ExportCurrent();
                        if (GUILayout.Button("Сохранить архив на устройстве", GUILayout.Height(52))) Attempt(() => { SaveSheet(); status = "Архив сохранён"; });
                    }
                    GUILayout.Label("Локальный файл: " + SavePath, muted); break;
            }
            GUILayout.Space(20); GUILayout.Label(status, muted); GUILayout.EndVertical(); GUILayout.EndScrollView(); RegisterSwipe("front",GUILayoutUtility.GetLastRect()); GUILayout.EndArea();
        }
        private void DrawRoster()
        {
            GUILayout.Label("Мои персонажи", heading);
            GUILayout.Label("Поиск по имени, расе или классу", muted); rosterSearch = GUILayout.TextField(rosterSearch, GUILayout.Height(52)); GUILayout.Space(12);
            if (archive == null) { GUILayout.Label("Пока нет персонажей. Создайте первого героя или импортируйте сохранение."); return; }
            if (pendingCharacterDeleteId != null)
            {
                GUILayout.Label("Удалить персонажа «" + pendingCharacterDeleteName + "» с этого устройства?", heading);
                GUILayout.Label("Облачная копия останется. Предыдущий локальный архив сохранится в резервной копии.", muted);
                if (GUILayout.Button("Подтвердить удаление", GUILayout.Height(52))) Attempt(() =>
                {
                    string currentId = archive.Snapshot(selected)["id"].ToString();
                    var candidate = archive.WithoutCharacter(pendingCharacterDeleteId);
                    CharacterSheetStore.Save(SavePath, candidate);
                    archive = candidate.Count == 0 ? null : candidate;
                    selected = archive == null ? 0 : Enumerable.Range(0, archive.Count).FirstOrDefault(n => archive.Snapshot(n)["id"].ToString() == currentId);
                    ClearSheetInputs(); pendingCharacterDeleteId = pendingCharacterDeleteName = null;
                    status = "Персонаж удалён с устройства";
                });
                if (GUILayout.Button("Отмена", GUILayout.Height(52))) pendingCharacterDeleteId = pendingCharacterDeleteName = null;
                return;
            }
            for (int i = 0; i < archive.Count; i++)
            {
                var hero = archive.Snapshot(i); string details = ((string)hero["class"] ?? (string)hero["className"] ?? "Без класса") + " · " + CharacterSheetRules.Level(hero) + " ур. · " + (hero["raceName"] ?? "Раса не указана");
                if ((archive.Name(i) + " " + details).IndexOf(rosterSearch, StringComparison.OrdinalIgnoreCase) < 0) continue;
                GUILayout.BeginVertical(GUI.skin.box); GUILayout.Label(archive.Name(i), heading); GUILayout.Label(details, muted);
                GUILayout.Label("Здоровье " + archive.CurrentHp(i) + " / " + archive.MaximumHp(i) + "   ·   " + CharacterSheetRules.InventoryWeightKg(hero).ToString("0.##", CultureInfo.InvariantCulture) + " кг");
                if (GUILayout.Button("Открыть лист  →", GUILayout.Height(52))) { selected = i; Navigate(FrontScreen.Sheet); }
                if (GUILayout.Button("Удалить персонажа…", GUILayout.Height(52)))
                { pendingCharacterDeleteId = hero["id"].ToString(); pendingCharacterDeleteName = archive.Name(i); }
                GUILayout.EndVertical(); GUILayout.Space(10);
            }
        }
        private void DrawCreation()
        {
            GUILayout.Label("Создание персонажа", heading);
            GUILayout.Label("Шаг " + (creationStep + 1) + " / 4 · " + new[] { "История героя", "Раса и класс", "Характеристики и выборы", "Подтверждение" }[creationStep], muted);
            var races = (JArray)CreationCatalog["races"]; var classes = AvailableClasses; var backgrounds = (JArray)CreationCatalog["backgrounds"];
            raceIndex = Mathf.Clamp(raceIndex, 0, races.Count - 1); classIndex = Mathf.Clamp(classIndex, 0, classes.Count - 1); backgroundIndex = Mathf.Clamp(backgroundIndex, 0, backgrounds.Count - 1);
            var race = (JObject)races[raceIndex]; var cls = (JObject)classes[classIndex]; var bg = (JObject)backgrounds[backgroundIndex];
            if (creationStep == 0)
            {
                GUILayout.Label("Имя героя"); heroName = GUILayout.TextField(heroName, 120, GUILayout.Height(52));
                Picker("Предыстория", backgrounds, ref backgroundIndex, "nameRu"); GUILayout.Label((string)backgrounds[backgroundIndex]["description"] ?? "", muted);
            }
            else if (creationStep == 1)
            {
                int oldRace = raceIndex, oldClass = classIndex;
                Picker("Раса", races, ref raceIndex, "name"); GUILayout.Label((string)races[raceIndex]["desc"] ?? "", muted);
                Picker("Класс", classes, ref classIndex, "name"); GUILayout.Label((string)classes[classIndex]["desc"] ?? "", muted);
                if (oldRace != raceIndex || oldClass != classIndex) creationAnswers = new JObject();
            }
            else if (creationStep == 2)
            {
                statMode = MenuGrid(statMode,new[] { "Покупка · 27 очков", "Ввод мастером" },2);
                for (int i = 0; i < 6; i++) { GUILayout.BeginHorizontal(); GUILayout.Label(CharacterSheetRules.StatNames[i], GUILayout.Width(180)); statInputs[i] = GUILayout.TextField(statInputs[i], GUILayout.Height(52)); GUILayout.EndHorizontal(); }
                int total = 0; bool valid = true; foreach (string text in statInputs) { if (int.TryParse(text, out int n) && n >= 8 && n <= 15) total += CharacterCreation.PointCost(n); else valid = false; }
                if (statMode == 0) GUILayout.Label(valid ? "Потрачено: " + total + " / 27 (до расовых бонусов)" : "Для покупки допустимы значения 8–15");
                foreach (var entry in new[] { race, cls, bg }) foreach (JObject choice in (JArray)entry["choices"]) DrawCreationChoice(choice);
                if (!((JArray)race["choices"]).OfType<JObject>().Any(c => (string)c["type"] == "feat"))
                {
                    creationFeatEnabled = GUILayout.Toggle(creationFeatEnabled, "Добавить черту по разрешению мастера");
                    if (creationFeatEnabled)
                    {
                        var feats = (JArray)CreationCatalog["feats"];
                        if (feats.Count > 0)
                        {
                            creationFeatIndex = Mathf.Clamp(creationFeatIndex, 0, feats.Count - 1);
                            Picker("Черта", feats, ref creationFeatIndex, "nameRu");
                            var feat = (JObject)feats[creationFeatIndex]; creationAnswers["creation:feat"] = feat["id"].DeepClone(); DrawFeatStatChoice(feat);
                        }
                    }
                    else creationAnswers.Remove("creation:feat");
                }
            }
            else
            {
                if (lastPreview != null)
                {
                    GUILayout.Label((string)lastPreview["name"], heading); GUILayout.Label(lastPreview["raceName"] + " · " + lastPreview["class"] + " · 1 уровень");
                    GUILayout.Label("Предыстория: " + lastPreview["background"] + " · HP " + lastPreview["hpMax"] + " · " + lastPreview["hitDice"]);
                    foreach (string stat in CharacterSheetRules.Stats) GUILayout.Label(stat.ToUpperInvariant() + "  " + lastPreview["stats"][stat]);
                    GUILayout.Label("Создаётся новый герой. Существующие персонажи остаются в архиве.", muted);
                    GUILayout.Label("Классовые эффекты и стартовые наборы ещё переносятся. Неприменённые решения сохранятся в листе как ожидающие обработки; снаряжение можно добавить из справочника.", muted);
                }
            }
            GUILayout.Space(20); GUILayout.BeginHorizontal();
            if (GUILayout.Button("Назад", GUILayout.Height(42))) { if (creationStep == 0) Navigate(FrontScreen.Characters); else creationStep--; frontScroll = Vector2.zero; }
            if (GUILayout.Button(creationStep == 3 ? "Создать и сохранить героя" : "Далее  →", GUILayout.Height(42))) Attempt(() =>
            {
                if (creationStep == 0 && string.IsNullOrWhiteSpace(heroName)) throw new FormatException("Введите имя героя");
                if (creationStep == 2) lastPreview = BuildDraft(race, cls, bg);
                if (creationStep == 3)
                {
                    var candidate = archive == null ? new LegacyCharacterArchive(new JArray(lastPreview.DeepClone()).ToString()) : archive.Append(lastPreview);
                    CharacterSheetStore.Save(SavePath, candidate); archive = candidate; selected = archive.Count - 1; Navigate(FrontScreen.Sheet); status = "Персонаж создан и сохранён";
                }
                else { creationStep++; frontScroll = Vector2.zero; }
            });
            GUILayout.EndHorizontal();
        }
        private JObject BuildDraft(JObject race, JObject cls, JObject bg)
        {
            var stats = new JObject(); for (int i = 0; i < 6; i++) { if (!int.TryParse(statInputs[i], out int n)) throw new FormatException("Введите целую характеристику"); stats[CharacterSheetRules.Stats[i]] = n; }
            return CharacterCreation.Create(CreationCatalog, heroName, race, cls, bg, stats, creationAnswers, statMode == 0 ? "pointbuy" : "manual");
        }
        private void Picker(string label, JArray values, ref int selectedIndex, string nameField)
        {
            GUILayout.Label(label); GUILayout.BeginHorizontal();
            if (GUILayout.Button("‹", GUILayout.Width(48), GUILayout.Height(52))) selectedIndex = (selectedIndex + values.Count - 1) % values.Count;
            if (GUILayout.Button(((string)values[selectedIndex][nameField] ?? (string)values[selectedIndex]["name"]) + "  ▾", GUILayout.MinHeight(38))) { pickerKey = pickerKey == label ? null : label; pickerSearch = ""; }
            if (GUILayout.Button("›", GUILayout.Width(48), GUILayout.Height(52))) selectedIndex = (selectedIndex + 1) % values.Count;
            GUILayout.EndHorizontal();
            if (pickerKey == label)
            {
                GUILayout.Label("Найти вариант:", muted); pickerSearch = GUILayout.TextField(pickerSearch, GUILayout.Height(52)); int shown = 0;
                for (int i = 0; i < values.Count; i++)
                {
                    string name = (string)values[i][nameField] ?? (string)values[i]["name"];
                    if (name.IndexOf(pickerSearch, StringComparison.OrdinalIgnoreCase) < 0 || shown++ >= 12) continue;
                    if (GUILayout.Button(name, GUILayout.Height(52))) { selectedIndex = i; pickerKey = null; }
                }
            }
        }
        private void DrawCreationChoice(JObject choice)
        {
            string key = (string)choice["key"], type = (string)choice["type"]; int count = type == "stats2" ? 2 : (int?)choice["count"] ?? 1;
            GUILayout.Label((string)choice["label"] + (count > 1 ? " · выбрать " + count : ""));
            var options = (JArray)choice["options"];
            if (type == "feat")
            {
                GUILayout.Label("Бонус характеристик применяется автоматически. Остальные эффекты и дополнительные требования проверьте с мастером.", muted);
                var selectedFeat = options.OfType<JObject>().FirstOrDefault(f => (string)f["id"] == (string)creationAnswers[key]);
                if (selectedFeat != null) DrawFeatStatChoice(selectedFeat);
            }
            if (type == "stats2") options = new JArray(CharacterSheetRules.Stats.Select((s, i) => new JObject { ["id"] = s, ["name"] = CharacterSheetRules.StatNames[i] }));
            if (options.Count == 0) { creationAnswers[key] = GUILayout.TextField((string)creationAnswers[key] ?? "", GUILayout.Height(52)); return; }
            var selectedValues = creationAnswers[key] is JArray arr ? (JArray)arr.DeepClone() : new JArray();
            foreach (var option in options)
            {
                string id = option is JObject obj ? (string)(obj["id"] ?? obj["name"]) : option.ToString();
                string name = option is JObject o ? (string)(o["nameRu"] ?? o["name"] ?? o["id"]) : id;
                bool old = type == "multi" || type == "stats2" ? selectedValues.Any(v => (string)v == id) : (string)creationAnswers[key] == id;
                bool value = GUILayout.Toggle(old, name, GUILayout.MinHeight(26));
                if (value != old)
                {
                    if (type == "multi" || type == "stats2") { if (value && selectedValues.Count < count) selectedValues.Add(id); else if (!value) selectedValues.First(v => (string)v == id).Remove(); creationAnswers[key] = selectedValues; }
                    else if (value) creationAnswers[key] = id;
                }
            }
        }
        private void DrawFeatStatChoice(JObject feat)
        {
            GUILayout.Label((string)feat["description"] ?? "", muted);
            if (feat["prerequisite"] != null && feat["prerequisite"].Type != JTokenType.Null) GUILayout.Label("Требования: " + feat["prerequisite"], muted);
            if (feat["statBonus"] is JObject bonus && (string)bonus["type"] == "choice")
            {
                string key = "feat:" + feat["id"] + ":stat";
                foreach (string stat in ((JArray)bonus["stats"]).Values<string>())
                    if (GUILayout.Toggle((string)creationAnswers[key] == stat, "+" + bonus["value"] + " " + stat.ToUpperInvariant())) creationAnswers[key] = stat;
            }
        }
        private readonly string[] coinInput = { "0", "0", "0", "0", "0" }, coinRateInputs = { "10", "2", "10", "10" };
        private bool showPlatinum = true, showElectrum = true, showCoinRates;
        private JObject CurrentCoinRates()
        {
            var rates = new JObject(); string[] keys = { "pPerG", "gPerE", "sPerG", "cPerS" };
            for (int i = 0; i < keys.Length; i++)
            {
                if (!int.TryParse(coinRateInputs[i], NumberStyles.Integer, CultureInfo.InvariantCulture, out int value)) throw new FormatException("Введите целочисленный курс монет");
                rates[keys[i]] = value;
            }
            CharacterSheetRules.CoinMultipliers(rates); return rates;
        }
        private void Wallet(JObject hero, ref bool changed, ref bool persist)
        {
            GUILayout.Label("Кошелёк", heading); var coins = hero["coins"] is JObject old ? (JObject)old.DeepClone() : new JObject(); bool edited = false;
            string[] keys = { "cp", "sp", "ep", "gp", "pp" }, names = { "Медные", "Серебряные", "Электрум", "Золотые", "Платиновые" };
            for (int i = 0; i < keys.Length; i++) Scalar(coins, keys[i], names[i], ref edited, 0);
            if (edited)
            {
                if (keys.Any(k => LegacyJson.Number(coins[k]) < 0)) status = "Количество монет не может быть отрицательным";
                else { hero["coins"] = coins; changed = true; }
            }
            try { var currentRates = CurrentCoinRates(); GUILayout.Label("Общая стоимость: " + (CharacterSheetRules.CoinTotal(coins, currentRates) / CharacterSheetRules.CoinMultipliers(currentRates)[3]).ToString("0.##", CultureInfo.InvariantCulture) + " зм", muted); }
            catch (FormatException error) { GUILayout.Label(error.Message, muted); }
            GUILayout.Space(14); GUILayout.Label("Получение и трата монет", heading);
            GUILayout.Label("Операция разменяет монеты по выбранному курсу и сразу сохранит архив, включая текущие правки листа.", muted);
            GUILayout.BeginHorizontal(); showPlatinum = GUILayout.Toggle(showPlatinum, "Использовать платину"); showElectrum = GUILayout.Toggle(showElectrum, "Использовать электрум"); GUILayout.EndHorizontal();
            for (int i = 0; i < keys.Length; i++)
            {
                if ((keys[i] == "pp" && !showPlatinum) || (keys[i] == "ep" && !showElectrum)) continue;
                GUILayout.BeginHorizontal(); GUILayout.Label(names[i], GUILayout.Width(200)); coinInput[i] = GUILayout.TextField(coinInput[i], GUILayout.Height(52)); GUILayout.EndHorizontal();
            }
            showCoinRates = GUILayout.Toggle(showCoinRates, "Настроить курсы размена", GUILayout.Height(52));
            if (showCoinRates)
            {
                string[] rateLabels = { "Золотых за платиновую", "Электрума за золотую", "Серебряных за золотую", "Медных за серебряную" };
                for (int i = 0; i < 4; i++) { GUILayout.BeginHorizontal(); GUILayout.Label(rateLabels[i], GUILayout.Width(240)); coinRateInputs[i] = GUILayout.TextField(coinRateInputs[i], GUILayout.Height(52)); GUILayout.EndHorizontal(); }
            }
            string operation = null; GUILayout.BeginHorizontal();
            if (GUILayout.Button("Получить монеты", GUILayout.Height(42))) operation = "add";
            if (GUILayout.Button("Потратить монеты", GUILayout.Height(42))) operation = "sub";
            GUILayout.EndHorizontal();
            if (operation != null)
            {
                try
                {
                    var amount = new JObject();
                    for (int i = 0; i < keys.Length; i++)
                    {
                        bool hidden = (keys[i] == "pp" && !showPlatinum) || (keys[i] == "ep" && !showElectrum);
                        if (!hidden && (!long.TryParse(coinInput[i], NumberStyles.Integer, CultureInfo.InvariantCulture, out long value) || value < 0)) throw new FormatException("Введите целое неотрицательное количество монет");
                        amount[keys[i]] = hidden ? 0 : long.Parse(coinInput[i], CultureInfo.InvariantCulture);
                    }
                    CharacterSheetRules.ApplyCoinOperation(hero, amount, operation, CurrentCoinRates(), showPlatinum, showElectrum, DateTime.Now.ToString("HH:mm:ss")); changed = true; persist = true;
                }
                catch (FormatException error) { status = error.Message; }
            }
            GUILayout.Space(14); GUILayout.Label("История кошелька", heading);
            if (hero["coinLog"] is JArray log) foreach (JObject entry in log.OfType<JObject>())
            {
                string amounts = string.Join(" · ", keys.Select((key, i) => entry[key]?.ToString() + " " + names[i].ToLowerInvariant()));
                GUILayout.Label("[" + entry["time"] + "] " + ((string)entry["action"] == "add" ? "+ " : "− ") + amounts, muted);
            }
        }
    }
}
