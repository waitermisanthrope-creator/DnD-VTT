using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json.Linq;
using UnityEngine;

namespace DndVtt.UnityPrototype
{
    public sealed partial class LegacySessionPanel
    {
        private JObject commerceCatalog;
        private JObject CommerceCatalog { get { InitializeWorkshop(); return commerceCatalog ??= workshop.Commerce(); } }
        private int inventoryMode, inventoryCategory;
        private string inventoryQuery = "", customItemName = "", customItemWeight = "0", craftQuery = "";
        private bool inventoryPicker, customItemOpen, inventoryWeightEnabled = true;
        private readonly List<string> selectedIngredients = new List<string>();
        private string selectedCatalyst;
        private readonly string[] inventoryNames = { "Оружие", "Броня", "Расходники", "Материалы и крафт", "Хлам" };
        private void DrawCommerceInventory(JObject hero, ref bool changed, ref bool persist)
        {
            if (hero["inventory"] is JArray) { ReadOnly(hero,"inventory","Унаследованный инвентарь сохранён без изменений"); return; }
            inventoryMode = GUILayout.SelectionGrid(inventoryMode,new[] { "Инвентарь", "Крафт", "Алхимия 2.0" },3,GUILayout.MinHeight(76));
            if (inventoryMode == 1) { DrawCrafting(hero,ref changed,ref persist); return; }
            if (inventoryMode == 2) { DrawAlchemy(hero,ref changed,ref persist); return; }
            GUILayout.BeginVertical(GUI.skin.box); GUILayout.Label("Текущий КД",sheetQuiet); GUILayout.Label((hero["ac"] ?? hero["baseAC"] ?? 10).ToString(),sheetHeading); GUILayout.EndVertical();
            inventoryCategory = GUILayout.SelectionGrid(inventoryCategory,inventoryNames,2,GUILayout.MinHeight(210));
            if (GUILayout.Button("Справочник / Свой предмет",brandGreen,GUILayout.Height(58),GUILayout.ExpandWidth(true))) inventoryPicker = !inventoryPicker;
            if (inventoryPicker)
            {
                GUILayout.BeginVertical(GUI.skin.box); SheetSection("Справочник предметов");
                inventoryQuery = GUILayout.TextField(inventoryQuery,GUILayout.MinHeight(45));
                var entries = ((JArray)CommerceCatalog["items"]).OfType<JObject>().Where(x => (string)x["inventoryCategory"] == CharacterSheetRules.InventoryCategories[inventoryCategory] && (x["name"] + " " + x["description"]).IndexOf(inventoryQuery,StringComparison.OrdinalIgnoreCase) >= 0).ToArray();
                if (entries.Length == 0) { GUILayout.Label("Скачайте сборник этой категории из менеджера модов. Свой предмет можно создать без интернета.",sheetQuiet); if (GUILayout.Button("Открыть менеджер модов",brandBlue)) Navigate(FrontScreen.ContentManager); }
                foreach (var entry in entries.Take(25)) if (GUILayout.Button("+ " + entry["name"],GUILayout.MinHeight(44))) { CommerceRules.AddItem(hero,entry); changed = persist = true; status = "Предмет добавлен"; }
                customItemOpen = GUILayout.Toggle(customItemOpen,"Создать свой предмет");
                if (customItemOpen)
                {
                    GUILayout.Label("Название"); customItemName = GUILayout.TextField(customItemName); GUILayout.Label("Вес (кг)"); customItemWeight = GUILayout.TextField(customItemWeight);
                    if (GUILayout.Button("Добавить свой предмет",brandGreen))
                    {
                        if (string.IsNullOrWhiteSpace(customItemName)) status = "Введите название";
                        else { CommerceRules.AddItem(hero,new JObject { ["name"] = customItemName.Trim(),["inventoryCategory"] = CharacterSheetRules.InventoryCategories[inventoryCategory],["weight"] = customItemWeight + " кг" }); customItemName = ""; changed = persist = true; status = "Свой предмет добавлен"; }
                    }
                }
                GUILayout.EndVertical();
            }
            GUILayout.BeginVertical(GUI.skin.box); inventoryWeightEnabled = GUILayout.Toggle(inventoryWeightEnabled,"Расчёт веса (если вы играете с ним)",GUILayout.Height(38));
            if (inventoryWeightEnabled) { double weight = CommerceRules.TotalWeightKg(hero), capacity = CharacterSheetRules.CapacityKg(hero); GUILayout.Label("Вес: " + weight.ToString("0.0") + " кг / Лимит: " + capacity.ToString("0.0") + " кг",sheetQuiet); Rect r = GUILayoutUtility.GetRect(1,9,GUILayout.ExpandWidth(true)); GUI.Box(r,GUIContent.none); var old = GUI.color; GUI.color = weight > capacity ? Color.red : Color.green; GUI.DrawTexture(new Rect(r.x,r.y,r.width*Mathf.Clamp01((float)(weight/Math.Max(1,capacity))),r.height),Texture2D.whiteTexture); GUI.color = old; }
            GUILayout.EndVertical();
            var list = hero["inventory"]?[CharacterSheetRules.InventoryCategories[inventoryCategory]] as JArray ?? new JArray();
            if (list.Count == 0) GUILayout.Label("Список пуст",sheetQuiet);
            foreach (JObject item in list.OfType<JObject>().ToArray())
            {
                GUILayout.BeginVertical(GUI.skin.box); GUILayout.BeginHorizontal(); GUILayout.Label((string)item["name"],new GUIStyle(GUI.skin.label) { fontStyle = FontStyle.Bold });
                if (GUILayout.Button("×",GUILayout.Width(44))) RequestDelete(item,(string)item["name"]); GUILayout.EndHorizontal();
                GUILayout.Label((item["category"] ?? "") + " · " + (item["weight"] ?? "0") + " · " + (item["cost"] ?? ""),sheetQuiet);
                if (item["description"] != null) GUILayout.Label((string)item["description"],sheetQuiet);
                GUILayout.BeginHorizontal(); double count = LegacyJson.Number(item["count"],1);
                if (GUILayout.Button("−",GUILayout.Width(46))) { if (count <= 1) RequestDelete(item,(string)item["name"]); else { item["count"] = count - 1; changed = persist = true; } }
                GUILayout.Label("Количество: " + count.ToString("0.##"));
                if (GUILayout.Button("+",GUILayout.Width(46))) { item["count"] = count + 1; changed = persist = true; } GUILayout.EndHorizontal();
                if (inventoryCategory < 2 && GUILayout.Button((bool?)item["equipped"] == true ? "✓ Экипировано" : "Экипировать",GUILayout.MinHeight(40))) { try { CommerceRules.Equip(hero,item); changed = persist = true; } catch (Exception e) { status = e.Message; } }
                if (item["effects"] is JArray)
                {
                    GUILayout.Label("Урон, длительность и эффекты на других существ учитываются вручную.",sheetQuiet);
                    if (GUILayout.Button("Применить алхимический продукт",brandGreen)) { try { CommerceRules.UseProduct(hero,item); changed = persist = true; status = "Продукт применён"; } catch (Exception e) { status = e.Message; } }
                }
                foreach (JObject destination in (hero["inventory"]?["containers"] as JArray ?? new JArray()).OfType<JObject>().ToArray())
                    if (GUILayout.Button("В контейнер: " + destination["name"]))
                    {
                        var copy = (JObject)item.DeepClone(); copy["inventoryCategory"] = CharacterSheetRules.InventoryCategories[inventoryCategory]; copy["equipped"] = false;
                        CharacterSheetRules.Array(destination,"contents").Add(copy); item.Remove(); changed = persist = true; break;
                    }
                GUILayout.EndVertical();
            }
            GUILayout.BeginVertical(GUI.skin.box); SheetSection("Контейнеры");
            if (GUILayout.Button("Новый контейнер",brandBlue)) { CharacterSheetRules.Array(CharacterSheetRules.Object(hero,"inventory"),"containers").Add(new JObject { ["id"] = "container_"+Guid.NewGuid().ToString("N"),["name"] = "Рюкзак",["capacity"] = 30,["weight"] = 0,["contents"] = new JArray(),["closed"] = false,["source"] = "v54" }); changed = persist = true; }
            foreach (JObject container in (hero["inventory"]?["containers"] as JArray ?? new JArray()))
            {
                GUILayout.Label((string)container["name"]); bool renamed = false; Scalar(container,"name","Название",ref renamed); if (renamed) changed = persist = true; var contents = container["contents"] as JArray ?? new JArray(); GUILayout.Label("Предметов внутри: " + contents.Count,sheetQuiet);
                foreach (JObject item in contents.OfType<JObject>().ToArray()) if (GUILayout.Button("Извлечь: " + item["name"])) { CommerceRules.AddItem(hero,item,LegacyJson.Number(item["count"],1)); item.Remove(); changed = persist = true; }
            }
            GUILayout.EndVertical();
        }
        private void DrawCrafting(JObject hero, ref bool changed, ref bool persist)
        {
            SheetSection("Мастерская и крафт"); var rules = (JObject)CommerceCatalog["craft"]; var recipes = (JArray)rules["recipes"];
            GUILayout.Label("Проверка d20 + мастерство, инструменты и материалы — как в базовом движке main. Время рецепта учитывает мастер. Расширенные профессии и экономика ещё не перенесены.",sheetQuiet);
            if (recipes.Count == 0) { DrawCommerceDownloadPrompt("Скачайте пакет «Мастерская — рецепты и материалы»."); return; }
            craftQuery = GUILayout.TextField(craftQuery,GUILayout.MinHeight(45));
            foreach (JObject recipe in recipes.OfType<JObject>().Where(r => (r["name"]+" "+r["category"]).IndexOf(craftQuery,StringComparison.OrdinalIgnoreCase) >= 0).Take(20))
            {
                GUILayout.BeginVertical(GUI.skin.box); GUILayout.Label((string)recipe["name"],sheetHeading); GUILayout.Label("СЛ " + recipe["dc"] + " · " + recipe["time"] + " ч · " + recipe["tools"],sheetQuiet);
                foreach (var material in ((JObject)recipe["materials"]).Properties()) GUILayout.Label(((JArray)rules["materials"]).First(x => (string)x["id"] == material.Name)["name"] + " ×" + material.Value,sheetQuiet);
                if (GUILayout.Button("Изготовить",brandGold,GUILayout.Height(45)))
                {
                    try { var result = CommerceRules.Craft(hero,recipe,rules,UnityEngine.Random.Range(1,21)); status = (bool)result["ok"] ? "Изготовлено: " + result["item"]["name"] : "Проверка провалена. Материалы израсходованы."; status += " · " + result["total"] + " против " + result["dc"]; changed = persist = true; } catch (Exception e) { status = e.Message; }
                }
                GUILayout.EndVertical();
            }
            SheetSection("Материалы рецептов"); GUILayout.Label("Добавляйте только ресурсы, полученные в игре.",sheetQuiet);
            foreach (JObject material in (JArray)rules["materials"]) if (GUILayout.Button("+ " + material["name"])) { var item = (JObject)material.DeepClone(); item["inventoryCategory"] = "materials"; item["craftMaterialId"] = material["id"].DeepClone(); CommerceRules.AddItem(hero,item); changed = persist = true; }
        }
        private void DrawCommerceDownloadPrompt(string text) { GUILayout.Label(text,sheetQuiet); if (GUILayout.Button("Открыть менеджер модов",brandBlue,GUILayout.Height(48))) Navigate(FrontScreen.ContentManager); }
        private void DrawAlchemy(JObject hero, ref bool changed, ref bool persist)
        {
            SheetSection("Алхимия 2.0"); GUILayout.Label("Базовые реакции и исследования. Расширенные профессии ещё не перенесены; длительность и воздействие на других существ учитывает мастер.",sheetQuiet); var rules = (JObject)CommerceCatalog["alchemy"]; var ingredients = (JArray)rules["ingredients"];
            if (ingredients.Count == 0 || !((JObject)rules["effects"]).HasValues) { DrawCommerceDownloadPrompt("Установите правила Алхимии 2.0 и сборник ингредиентов."); return; }
            GUILayout.Label("Выбрано: " + selectedIngredients.Count + " / 5",sheetQuiet); if (GUILayout.Button("Очистить смесь")) { selectedIngredients.Clear(); selectedCatalyst = null; }
            foreach (JObject catalyst in (JArray)rules["catalysts"]) if (GUILayout.Toggle(selectedCatalyst == (string)catalyst["id"],(string)catalyst["name"])) selectedCatalyst = (string)catalyst["id"];
            if (selectedIngredients.Count >= 2)
            {
                try { var profile = CommerceRules.Profile(rules,selectedIngredients.ToArray(),selectedCatalyst); GUILayout.Label("Сила " + profile["potency"] + " · стабильность " + profile["stability"] + " · риск " + profile["risk"],sheetQuiet); } catch (Exception e) { GUILayout.Label(e.Message); }
                if (GUILayout.Button("Смешать: расход ингредиентов и проверка d100",brandGreen,GUILayout.Height(50)))
                {
                    try { var outcome = CommerceRules.Mix(hero,rules,selectedIngredients.ToArray(),selectedCatalyst,UnityEngine.Random.Range(1,101)); status = (bool)outcome["ok"] ? "Создано: " + outcome["product"]["name"] : "Реакция сорвалась. Ингредиенты израсходованы."; selectedIngredients.Clear(); changed = persist = true; } catch (Exception e) { status = e.Message; }
                }
            }
            GUILayout.Label("Найти ингредиент"); inventoryQuery = GUILayout.TextField(inventoryQuery);
            foreach (JObject ingredient in ingredients.OfType<JObject>().Where(i => ((string)i["name"]).IndexOf(inventoryQuery,StringComparison.OrdinalIgnoreCase) >= 0).Take(20))
            {
                string id = (string)ingredient["id"]; GUILayout.BeginVertical(GUI.skin.box); GUILayout.Label((string)ingredient["name"]);
                var known = hero["alchemyState"]?["discovered"]?[id] as JArray ?? new JArray(); GUILayout.Label("Изучено: " + string.Join(", ",known.Values<string>()),sheetQuiet);
                GUILayout.BeginHorizontal(); if (GUILayout.Button("В смесь") && selectedIngredients.Count < 5) selectedIngredients.Add(id);
                if (GUILayout.Button("Исследовать образец")) { try { CommerceRules.Research(hero,rules,id); changed = persist = true; status = "Свойство раскрыто; образец сохранён"; } catch (Exception e) { status = e.Message; } } GUILayout.EndHorizontal(); GUILayout.EndVertical();
            }
        }
        private void DrawCharacterFeats(JObject hero, ref bool changed)
        {
            GUILayout.BeginVertical(GUI.skin.box); SheetSection("Черты");
            Collection(hero,"feats","Черты персонажа",() => new JObject { ["id"] = Guid.NewGuid().ToString(),["name"] = "Своя черта",["description"] = "" },ref changed);
            GUILayout.Label("Найти черту"); featQuery = GUILayout.TextField(featQuery);
            GUILayout.Label("Прибавка характеристики для черт с выбором");
            var statNames = new[] { "str", "dex", "con", "int", "wis", "cha" };
            featStat = statNames[GUILayout.SelectionGrid(Array.IndexOf(statNames,featStat),statNames,6)];
            foreach (JObject feat in ((JArray)CreationCatalog["feats"]).OfType<JObject>().Where(f => (f["nameRu"] + " " + f["name"]).IndexOf(featQuery,StringComparison.OrdinalIgnoreCase) >= 0).Take(30)) if (GUILayout.Button("+ " + (feat["nameRu"] ?? feat["name"]))) { try { CharacterCreation.AddFeat(hero,feat,featStat); changed = true; } catch (Exception e) { status = e.Message; } }
            GUILayout.EndVertical(); GUILayout.BeginVertical(GUI.skin.box); SheetSection("Владения и языки"); Collection(hero,"proficiencies","Записи",() => new JObject { ["name"] = "Своё владение",["description"] = "" },ref changed); GUILayout.EndVertical();
        }
        private string featStat = "str", featQuery = "";
        private string loreTitle = "", loreDescription = "", loreCategory = "Локация";
        private void DrawLore(JObject hero, ref bool changed)
        {
            GUILayout.BeginVertical(GUI.skin.box); SheetSection("Добавить запись в Базу"); GUILayout.Label("Категория (используй / для подкатегорий)"); loreCategory = GUILayout.TextField(loreCategory); GUILayout.Label("Название"); loreTitle = GUILayout.TextField(loreTitle); GUILayout.Label("Описание и характеристики"); loreDescription = GUILayout.TextArea(loreDescription,GUILayout.Height(120));
            if (GUILayout.Button("+ Добавить запись",brandBlue,GUILayout.Height(50)) && !string.IsNullOrWhiteSpace(loreTitle)) { var library = CharacterSheetRules.Object(hero,"libraryData"); var entries = library["entries"] as JArray ?? hero["library"] as JArray ?? new JArray(); library["entries"] = entries; entries.Add(new JObject { ["id"] = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds(),["category"] = loreCategory,["title"] = loreTitle,["desc"] = loreDescription }); if (hero["library"] is JArray) hero["library"] = entries.DeepClone(); loreTitle = loreDescription = ""; changed = true; }
            GUILayout.EndVertical(); GUILayout.BeginVertical(GUI.skin.box); SheetSection("Справочник мира"); var records = hero["libraryData"]?["entries"] as JArray ?? hero["library"] as JArray ?? new JArray(); if (records.Count == 0) GUILayout.Label("Справочник пуст",sheetQuiet);
            foreach (JObject record in records.OfType<JObject>().ToArray()) { GUILayout.Label(record["category"] + " / " + record["title"]); GUILayout.Label((string)record["desc"] ?? "",sheetQuiet); if (GUILayout.Button("Удалить запись")) RequestDelete(record,(string)record["title"]); } GUILayout.EndVertical();
        }
    }
}
