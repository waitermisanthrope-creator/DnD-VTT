using System;
using System.Linq;
using Newtonsoft.Json.Linq;
using UnityEngine;
namespace DndVtt.UnityPrototype
{
    public sealed partial class LegacySessionPanel
    {
        private void DrawCrafts(JObject hero,ref bool changed,ref bool persist)
        {
            PrepareInventoryCatalog();SheetSection("Ремёсла");
            if(CommerceCatalog==null){DrawInventoryCatalogLoading();return;}
            GUILayout.BeginVertical(GUI.skin.box);DrawCrafting(hero,ref changed,ref persist);GUILayout.EndVertical();
            GUILayout.BeginVertical(GUI.skin.box);DrawAlchemy(hero,ref changed,ref persist);GUILayout.EndVertical();
        }
        private void DrawCrafting(JObject hero, ref bool changed, ref bool persist)
        {
            SheetSection("Мастерская и крафт"); var rules = (JObject)CommerceCatalog["craft"]; var recipes = (JArray)rules["recipes"];
            GUILayout.Label("Проверка d20 + мастерство, инструменты и материалы — как в базовом движке main. Время рецепта учитывает мастер. Расширенные профессии и экономика ещё не перенесены.",sheetQuiet);
            if (recipes.Count == 0) { DrawCommerceDownloadPrompt("Скачайте пакет «Мастерская — рецепты и материалы»."); return; }
            craftQuery = MenuTextField("craftQuery", craftQuery,GUILayout.MinHeight(45));
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
            GUILayout.Label("Найти ингредиент"); inventoryQuery = MenuTextField("inventoryQuery", inventoryQuery);
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
            GUILayout.Label("Найти черту"); featQuery = MenuTextField("featQuery", featQuery);
            GUILayout.Label("Прибавка характеристики для черт с выбором");
            var statNames = new[] { "str", "dex", "con", "int", "wis", "cha" };
            featStat = statNames[MenuGrid(Array.IndexOf(statNames,featStat),statNames,6)];
            foreach (JObject feat in ((JArray)CreationCatalog["feats"]).OfType<JObject>().Where(f => (f["nameRu"] + " " + f["name"]).IndexOf(featQuery,StringComparison.OrdinalIgnoreCase) >= 0).Take(30)) if (GUILayout.Button("+ " + (feat["nameRu"] ?? feat["name"]))) { try { CharacterCreation.AddFeat(hero,feat,featStat); changed = true; } catch (Exception e) { status = e.Message; } }
            GUILayout.EndVertical(); GUILayout.BeginVertical(GUI.skin.box); SheetSection("Владения и языки"); Collection(hero,"proficiencies","Записи",() => new JObject { ["name"] = "Своё владение",["description"] = "" },ref changed); GUILayout.EndVertical();
        }
        private string featStat = "str", featQuery = "";
        private string loreTitle = "", loreDescription = "", loreCategory = "Локация";
        private void DrawLore(JObject hero, ref bool changed)
        {
            GUILayout.BeginVertical(GUI.skin.box); SheetSection("Добавить запись в Базу"); GUILayout.Label("Категория (используй / для подкатегорий)"); loreCategory = MenuTextField("loreCategory", loreCategory); GUILayout.Label("Название"); loreTitle = MenuTextField("loreTitle", loreTitle); GUILayout.Label("Описание и характеристики"); loreDescription = MenuTextArea("loreDescription", loreDescription,GUILayout.Height(120));
            if (GUILayout.Button("+ Добавить запись",brandBlue,GUILayout.Height(50)) && !string.IsNullOrWhiteSpace(loreTitle)) { var library = CharacterSheetRules.Object(hero,"libraryData"); var entries = library["entries"] as JArray ?? hero["library"] as JArray ?? new JArray(); library["entries"] = entries; entries.Add(new JObject { ["id"] = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds(),["category"] = loreCategory,["title"] = loreTitle,["desc"] = loreDescription }); if (hero["library"] is JArray) hero["library"] = entries.DeepClone(); loreTitle = loreDescription = ""; changed = true; }
            GUILayout.EndVertical(); GUILayout.BeginVertical(GUI.skin.box); SheetSection("Справочник мира"); var records = hero["libraryData"]?["entries"] as JArray ?? hero["library"] as JArray ?? new JArray(); if (records.Count == 0) GUILayout.Label("Справочник пуст",sheetQuiet);
            foreach (JObject record in records.OfType<JObject>().ToArray()) { GUILayout.Label(record["category"] + " / " + record["title"]); GUILayout.Label((string)record["desc"] ?? "",sheetQuiet); if (GUILayout.Button("Удалить запись")) RequestDelete(record,(string)record["title"]); } GUILayout.EndVertical();
        }
    }
}
