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
        private JObject CommerceCatalog => commerceCatalog;
        private readonly InventoryCatalogCache inventoryCatalogCache = new InventoryCatalogCache();
        private JObject[] inventoryEntries = Array.Empty<JObject>();
        private bool commerceCatalogInvalidated;
        private bool? requestedInventoryPicker;
        private void InvalidateCommerceCatalog() { commerceCatalogInvalidated = true; marketCatalog = null; }
        private void PrepareInventoryCatalog()
        {
            if(Event.current.type!=EventType.Layout)return;
            if(commerceCatalogInvalidated)
            { inventoryCatalogCache.Invalidate();commerceCatalog=null;commerceCatalogInvalidated=false; }
            inventoryCatalogCache.Poll();
            commerceCatalog=inventoryCatalogCache.Current?.Catalog;
            inventoryEntries=commerceCatalog==null?Array.Empty<JObject>():inventoryCatalogCache.Current.Find(CharacterSheetRules.InventoryCategories[inventoryCategory],inventoryQuery);
            if(commerceCatalog!=null||inventoryCatalogCache.IsLoading||inventoryCatalogCache.Error!=null)return;
            InitializeWorkshop();
            // Snapshot the already verified manifest list once. The worker still
            // verifies each item/craft payload; unrelated graphics packs aren't reread.
            var installed=workshopStore.Installed();string root=workshopStore.Root;
            // Unity Resources are read on the main thread; expensive merchant
            // indexing runs alongside the existing commerce worker.
            string marketJson=Resources.Load<TextAsset>("CharacterSheet/market").text;
            inventoryCatalogCache.Request(()=>{
                JObject result=new WorkshopStore(root).Commerce(installed);
                result["market"]=CommerceRules.MergeMarketPacks(JObject.Parse(marketJson),result["markets"] as JArray,result["items"] as JArray??new JArray());
                return result;
            });
        }
        private void DrawInventoryCatalogLoading()
        {
            GUILayout.Label(inventoryCatalogCache.Error==null?"Загрузка справочника…":"Не удалось загрузить справочник: "+inventoryCatalogCache.Error,sheetQuiet);
            if(inventoryCatalogCache.Error!=null&&GUILayout.Button("Повторить",GUILayout.MinHeight(44)))InvalidateCommerceCatalog();
        }
        private int inventoryCategory;
        private Vector2 inventoryTabsScroll;
        private GUIStyle inventoryAcLabel,inventoryAcValue;
        private int? requestedInventoryCategory;
        private string inventoryQuery = "", customItemName = "", customItemWeight = "0", craftQuery = "";
        private bool inventoryPicker, customItemOpen, inventoryWeightEnabled = true;
        private readonly List<string> selectedIngredients = new List<string>();
        private string selectedCatalyst;
        private readonly string[] inventoryNames = { "Оружие", "Броня", "Расходники", "Материалы", "Хлам" };
        private void DrawCommerceInventory(JObject hero, ref bool changed, ref bool persist)
        {
            if (hero["inventory"] is JArray) { ReadOnly(hero,"inventory","Унаследованный инвентарь сохранён без изменений"); return; }
            PrepareCompactControls();
            if(Event.current.type==EventType.Layout&&requestedInventoryCategory.HasValue){inventoryCategory=requestedInventoryCategory.Value;requestedInventoryCategory=null;inventoryPicker=customItemOpen=false;requestedInventoryPicker=null;ResetFormInput();}
            if(Event.current.type==EventType.Layout&&requestedInventoryPicker.HasValue)
            { inventoryPicker=requestedInventoryPicker.Value;requestedInventoryPicker=null; }
            if(inventoryPicker)PrepareInventoryCatalog();
            inventoryAcLabel??=new GUIStyle(cloneMetricLabel){normal={textColor=new Color(.67f,.67f,.67f)}};inventoryAcValue??=new GUIStyle(cloneSuccess){fontSize=22,alignment=TextAnchor.MiddleCenter};
            GUILayout.BeginVertical(GUI.skin.box);GUILayout.Label("Текущий КД",inventoryAcLabel);GUILayout.Label((hero["ac"]??hero["baseAC"]??10).ToString(),inventoryAcValue);GUILayout.EndVertical();DrawContainerTransfer(hero);
            inventoryTabsScroll=GUILayout.BeginScrollView(SwipePosition("inventory-tabs",inventoryTabsScroll),false,false,GUIStyle.none,GUIStyle.none,GUILayout.Height(42));GUILayout.BeginHorizontal();
            for(int i=0;i<inventoryNames.Length;i++)
            {float width=Mathf.Max(70,GUI.skin.button.CalcSize(new GUIContent(inventoryNames[i])).x+8);if(MeasuredMenuButton(inventoryNames[i],i==inventoryCategory?cloneBlue:GUI.skin.button,GUILayout.Width(width),GUILayout.Height(35)))requestedInventoryCategory=i;GUILayout.Space(4);}
            GUILayout.EndHorizontal();GUILayout.EndScrollView();RegisterSwipe("inventory-tabs",GUILayoutUtility.GetLastRect(),true);
            GUILayout.Space(8);if(MeasuredMenuButton("Выбрать из справочника / Создать",cloneGreen,GUILayout.Height(39),GUILayout.ExpandWidth(true)))requestedInventoryPicker=!inventoryPicker;
            GUILayout.Space(12);
            if (inventoryPicker)
            {
                GUILayout.BeginVertical(GUI.skin.box); SheetSection("Справочник предметов");
                inventoryQuery = MenuTextField("inventoryQuery", inventoryQuery,GUILayout.MinHeight(45));
                var entries = inventoryEntries;
                if(commerceCatalog==null)DrawInventoryCatalogLoading();
                else if (entries.Length == 0) { GUILayout.Label("Скачайте сборник этой категории из менеджера модов. Свой предмет можно создать без интернета.",sheetQuiet); if (GUILayout.Button("Открыть менеджер модов",brandBlue)) Navigate(FrontScreen.ContentManager); }
                foreach (var entry in entries) if (GUILayout.Button("+ " + entry["name"],GUILayout.MinHeight(44))) { CommerceRules.AddItem(hero,entry); changed = persist = true; status = "Предмет добавлен"; }
                customItemOpen = GUILayout.Toggle(customItemOpen,"Создать свой предмет");
                if (customItemOpen)
                {
                    GUILayout.Label("Название"); customItemName = MenuTextField("customItemName", customItemName); GUILayout.Label("Вес (кг)"); customItemWeight = MenuTextField("customItemWeight", customItemWeight);
                    if (GUILayout.Button("Добавить свой предмет",brandGreen))
                    {
                        if (string.IsNullOrWhiteSpace(customItemName)) status = "Введите название";
                        else { CommerceRules.AddItem(hero,new JObject { ["name"] = customItemName.Trim(),["inventoryCategory"] = CharacterSheetRules.InventoryCategories[inventoryCategory],["weight"] = customItemWeight + " кг" }); customItemName = ""; changed = persist = true; status = "Свой предмет добавлен"; }
                    }
                }
                GUILayout.EndVertical();
            }
            GUILayout.BeginVertical(GUI.skin.box); inventoryWeightEnabled = GUILayout.Toggle(inventoryWeightEnabled,"Расчёт веса (если вы играете с ним)",GUILayout.Height(25));
            if (inventoryWeightEnabled) { double weight = CommerceRules.TotalWeightKg(hero), capacity = CharacterSheetRules.CapacityKg(hero); GUILayout.Label("Вес: " + weight.ToString("0.0") + " кг / Лимит: " + capacity.ToString("0.0") + " кг",sheetQuiet); Rect r = GUILayoutUtility.GetRect(1,9,GUILayout.ExpandWidth(true)); Shade(r,new Color(.12f,.12f,.12f));Shade(new Rect(r.x,r.y,r.width*Mathf.Clamp01((float)(weight/Math.Max(1,capacity))),r.height),weight>capacity?Color.red:Color.green); }
            GUILayout.EndVertical();
            var list = hero["inventory"]?[CharacterSheetRules.InventoryCategories[inventoryCategory]] as JArray ?? new JArray();
            if (list.Count == 0) GUILayout.Label("Список пуст",sheetQuiet);
            foreach (JObject item in list.OfType<JObject>().ToArray())
            {
                GUILayout.BeginVertical(GUI.skin.box); GUILayout.BeginHorizontal(); GUILayout.Label((string)item["name"],new GUIStyle(GUI.skin.label) { fontStyle = FontStyle.Bold });
                if (GUILayout.Button("×",GUILayout.Width(44))) RequestDelete(item,(string)item["name"]); GUILayout.EndHorizontal();
                GUILayout.Label((item["category"] ?? "") + " · " + (item["weight"] ?? "0") + " · " + (item["cost"] ?? ""),sheetQuiet);
                bool itemDetails=SheetFold("item-details:"+item.Path,"Описание и перемещение");
                if (itemDetails&&item["description"] != null) GUILayout.Label((string)item["description"],sheetQuiet);
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
                GUILayout.EndVertical();
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
