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
            BeginCraftView();if(!DrawProductionHeader(hero))return;
            PrepareInventoryCatalog();PrepareProductionCatalog();
            if(CommerceCatalog==null){DrawInventoryCatalogLoading();return;}
            if(productionError!=null)GUILayout.Label(productionError,sheetQuiet);
            if(productionCatalog==null)GUILayout.Label("Подготовка профессий и проектов…",sheetQuiet);
            else {DrawProductionProfessions(hero);DrawProductionBook(hero);DrawProductionProjects(hero);DrawCraftMaterialReference(hero);}
            if(MeasuredMenuButton(craftShowAlchemy?"Скрыть особую алхимию":"Особая алхимия: смеси и исследования",brandPlain,GUILayout.MinHeight(48)))pendingCraftView=()=>craftShowAlchemy=!craftShowAlchemy;
            if(craftShowAlchemy){GUILayout.BeginVertical(GUI.skin.box);DrawAlchemy(hero,ref changed,ref persist);GUILayout.EndVertical();}
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
                    QueueLegacyCraft(hero,new JObject{["kind"]="craft",["recipeId"]=recipe["id"].DeepClone()});
                }
                GUILayout.EndVertical();
            }
            SheetSection("Материалы рецептов"); GUILayout.Label("Добавляйте только ресурсы, полученные в игре.",sheetQuiet);
            foreach (JObject material in (JArray)rules["materials"]) if (GUILayout.Button("+ " + material["name"])) { var item = (JObject)material.DeepClone(); item["inventoryCategory"] = "materials"; item["craftMaterialId"] = material["id"].DeepClone(); CommerceRules.AddItem(hero,item); changed = persist = true; }
        }
        private void DrawCommerceDownloadPrompt(string text) { GUILayout.Label(text,sheetQuiet); if (GUILayout.Button("Открыть менеджер модов",brandBlue,GUILayout.Height(48))) Navigate(FrontScreen.ContentManager); }
        private string alchemyQuery="",alchemyLastQuery;
        private int alchemyPage;
        private JObject alchemyRowsSource;
        private JObject[] alchemyRows=Array.Empty<JObject>();
        private void DrawAlchemy(JObject hero, ref bool changed, ref bool persist)
        {
            SheetSection("Алхимия 2.0"); GUILayout.Label("Базовые реакции и исследования. Длительность и воздействие на других существ учитывает мастер.",sheetQuiet); var rules = (JObject)CommerceCatalog["alchemy"]; var ingredients = (JArray)rules["ingredients"];
            if (ingredients.Count == 0 || !((JObject)rules["effects"]).HasValues) { DrawCommerceDownloadPrompt("Установите правила Алхимии 2.0 и сборник ингредиентов."); return; }
            GUILayout.Label("Выбрано: " + selectedIngredients.Count + " / 5",sheetQuiet); if (GUILayout.Button("Очистить смесь"))pendingCraftView=()=>{selectedIngredients.Clear();selectedCatalyst=null;};
            foreach (JObject catalyst in (JArray)rules["catalysts"]) if (GUILayout.Toggle(selectedCatalyst == (string)catalyst["id"],(string)catalyst["name"])) selectedCatalyst = (string)catalyst["id"];
            if (selectedIngredients.Count >= 2)
            {
                try { var profile = CommerceRules.Profile(rules,selectedIngredients.ToArray(),selectedCatalyst); GUILayout.Label("Сила " + profile["potency"] + " · стабильность " + profile["stability"] + " · риск " + profile["risk"],sheetQuiet); } catch (Exception e) { GUILayout.Label(e.Message); }
                if (GUILayout.Button("Смешать: расход ингредиентов и проверка d100",brandGreen,GUILayout.Height(50)))
                {
                    QueueLegacyCraft(hero,new JObject{["kind"]="alchemy",["ids"]=new JArray(selectedIngredients),["catalyst"]=selectedCatalyst});
                }
            }
            GUILayout.Label("Найти ингредиент");alchemyQuery=MenuTextField("production.alchemy.search",alchemyQuery,GUILayout.MinHeight(44));
            if(Event.current.type==EventType.Layout&&(alchemyRowsSource!=rules||alchemyLastQuery!=alchemyQuery))
            {alchemyRows=ingredients.OfType<JObject>().Where(i=>i["name"].ToString().IndexOf(alchemyQuery,StringComparison.OrdinalIgnoreCase)>=0).ToArray();alchemyLastQuery=alchemyQuery;alchemyRowsSource=rules;alchemyPage=0;}
            foreach(JObject ingredient in alchemyRows.Skip(alchemyPage*20).Take(20))
            {
                string id = (string)ingredient["id"]; GUILayout.BeginVertical(GUI.skin.box); GUILayout.Label((string)ingredient["name"]);
                var known = hero["alchemyState"]?["discovered"]?[id] as JArray ?? new JArray(); GUILayout.Label("Изучено: " + string.Join(", ",known.Values<string>()),sheetQuiet);
                GUILayout.BeginHorizontal(); if (GUILayout.Button("В смесь") && selectedIngredients.Count < 5)pendingCraftView=()=>selectedIngredients.Add(id);
                if (GUILayout.Button("Исследовать образец")) { QueueLegacyCraft(hero,new JObject{["kind"]="research",["ingredientId"]=id}); } GUILayout.EndHorizontal(); GUILayout.EndVertical();
            }
            GUILayout.BeginHorizontal();if(alchemyPage>0&&MeasuredMenuButton("← Ингредиенты",brandPlain,GUILayout.MinHeight(44)))pendingCraftView=()=>alchemyPage--;if((alchemyPage+1)*20<alchemyRows.Length&&MeasuredMenuButton("Ингредиенты →",brandPlain,GUILayout.MinHeight(44)))pendingCraftView=()=>alchemyPage++;GUILayout.EndHorizontal();
        }
    }
}
