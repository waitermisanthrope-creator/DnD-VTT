using System;
using System.IO;
using System.Linq;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using UnityEngine;

namespace DndVtt.UnityPrototype
{
    public sealed partial class LegacySessionPanel
    {
        private JObject marketCatalog;
        private JObject MarketCatalog=>marketCatalog??=JObject.Parse(Resources.Load<TextAsset>("CharacterSheet/market").text);
        private bool marketOpen,tradeRecoveryVisible;
        private bool? requestedMarketOpen;
        private Action pendingMarketAction;
        private string marketTrader="village",marketMode="buy",marketQuery="",marketWanted,marketMessage="";
        private readonly JArray marketOffers=new JArray();
        private Vector2 marketScroll;
        private GUIStyle marketSurface,marketHeading,marketSelected;
        private void MarketLayout()
        {
            if(Event.current.type!=EventType.Layout)return;
            if(requestedMarketOpen.HasValue)
            {
                marketOpen=requestedMarketOpen.Value;requestedMarketOpen=null;pendingMarketAction=null;marketOffers.Clear();marketWanted=null;marketQuery="";marketMode="buy";marketScroll=Vector2.zero;ResetFormInput();
            }
            if(pendingMarketAction!=null){var action=pendingMarketAction;pendingMarketAction=null;try{action();}catch(Exception error){marketMessage=status=error.Message;}}
            tradeRecoveryVisible=File.Exists(SavePath+".trade-journal");
        }
        private void DrawMarketEntry(JObject hero,ref bool changed,ref bool persist)
        {
            PrepareCompactControls();GUILayout.BeginVertical(GUI.skin.box);GUILayout.BeginHorizontal();
            GUILayout.Label("Рынок и торговцы",sheetHeading);GUILayout.FlexibleSpace();
            if(MeasuredMenuButton("Открыть торговлю",cloneBlue,GUILayout.Width(156),GUILayout.Height(35)))RequestMarketOpen(hero,ref changed,ref persist);
            GUILayout.EndHorizontal();GUILayout.EndVertical();
        }
        private void RequestMarketOpen(JObject hero,ref bool changed,ref bool persist)
        {
            CompleteNumericKeyboard();
            foreach(string key in CharacterSheetRules.CoinKeys)
                if(numericSession.TryTake("wallet-balance:"+hero["id"]+":"+key,out string value))
                {
                    if(!long.TryParse(value,System.Globalization.NumberStyles.None,System.Globalization.CultureInfo.InvariantCulture,out long number)||number<0)
                    {status="Введите целое неотрицательное количество монет";return;}
                    CharacterSheetRules.Object(hero,"coins")[key]=number;changed=persist=true;
                }
            for(int i=0;i<coinInput.Length;i++)if(numericSession.TryTake("wallet-amount-"+i,out string amount))coinInput[i]=amount;
            for(int i=0;i<coinRateInputs.Length;i++)if(numericSession.TryTake("wallet-rate-"+i,out string rate))coinRateInputs[i]=rate;
            requestedMarketOpen=true;
        }
        private void QueueMarketTrade(string mode,JObject selection,long count,JArray offers)
        {
            string expectedArchive=archive.Export(),expectedState=preferences.Export(),trader=marketTrader;
            var target=(JObject)selection.DeepClone();var proposed=(JArray)(offers??new JArray()).DeepClone();
            pendingMarketAction=()=>SubmitMarketTrade(trader,mode,target,count,proposed,expectedArchive,expectedState);
        }
        private void SubmitMarketTrade(string trader,string mode,JObject selection,long count,JArray offers,string expectedArchive,string expectedState)
        {
            if(archive.Export()!=expectedArchive||preferences.Export()!=expectedState)throw new InvalidOperationException("Персонаж или рынок изменились. Выберите сделку заново.");
            string oldProfile=File.Exists(SavePath)?File.ReadAllText(SavePath):null,oldPreferences=File.Exists(SettingsPath)?File.ReadAllText(SettingsPath):null;
            if(oldProfile==null||new LegacyCharacterArchive(oldProfile).Export()!=expectedArchive||oldPreferences!=null&&ClientPreferences.Parse(oldPreferences).Export()!=expectedState)
                throw new InvalidOperationException("Файлы изменены вне приложения. Перезапустите клиент перед сделкой.");
            var result=CommerceRules.MarketTrade(MarketCatalog,(JArray)CommerceCatalog["items"],archive.Snapshot(selected),preferences.MarketState,trader,mode,selection,count,offers);
            var candidate=archive.DetachedCopy();candidate.Replace(selected,(JObject)result["hero"]);var nextPreferences=preferences.WithMarketState((JObject)result["state"]);
            CharacterSheetStore.SaveTrade(SavePath,candidate,SettingsPath,nextPreferences,oldProfile,oldPreferences);
            archive=candidate;preferences=nextPreferences;edits.Clear();marketOffers.Clear();marketWanted=null;
            marketMessage=mode=="buy"?"Товар куплен":mode=="sell"?"Товар продан":"Обмен завершён";
            if((string)result["received"]?["marketFunctionalStatus"]=="data_only")marketMessage+=". Сохранено описание; функциональное определение требует установленного пакета предметов.";
        }
        private static string MarketMoney(long copper)=>copper/100+" зм "+copper%100/10+" см "+copper%10+" мм";
        private JObject MarketItemSelection(JObject item,string category,int index)=>new JObject{["category"]=category,["index"]=index,["signature"]=item.ToString(Formatting.None)};
        private void DrawMarketModal()
        {
            PrepareSheetSkin();PrepareCompactControls();
            marketSurface??=new GUIStyle(GUI.skin.box){padding=new RectOffset(12,12,12,12),normal={background=Rounded(new Color(24/255f,24/255f,24/255f),new Color(128/255f,107/255f,60/255f),12)}};
            marketHeading??=new GUIStyle(sheetHeading){fontSize=18,normal={textColor=new Color(232/255f,189/255f,100/255f)}};
            marketSelected??=CloneAction(new Color(115/255f,93/255f,43/255f),Color.white);
            JObject hero=archive.Snapshot(selected),state=null;JArray definitions=null,stock=null;string loadError=null;
            try
            {
                state=preferences.MarketState;definitions=(JArray)CommerceCatalog["items"];
                stock=CommerceRules.MarketStock(MarketCatalog,state,marketTrader);
                if(marketMode!="sell")foreach(JObject item in stock.OfType<JObject>())
                {CommerceRules.MarketQuote(MarketCatalog,marketTrader,item,"buy",(string)state["region"]??"forest");CommerceRules.MarketResolve(definitions,item);}
            }
            catch(Exception error){loadError="Торговля недоступна; исходные данные сохранены. "+error.Message;}
            DrawClassicSheetBackdrop();Shade(new Rect(0,0,UiWidth,UiHeight),new Color(0,0,0,.82f));
            float width=Mathf.Min(980,UiWidth-20);GUILayout.BeginArea(new Rect((UiWidth-width)/2,UiHeight*.03f,width,UiHeight*.94f));
            GUILayout.BeginVertical(marketSurface);marketScroll=GUILayout.BeginScrollView(SwipePosition("market-modal",marketScroll));
            GUILayout.BeginHorizontal();GUILayout.Label("Торговля",marketHeading);GUILayout.FlexibleSpace();
            try{GUILayout.Label("Баланс: "+MarketMoney((long)CharacterSheetRules.CoinTotal(hero["coins"] as JObject,null)),sheetQuiet);}catch(Exception error){GUILayout.Label(error.Message,sheetQuiet);}
            if(MeasuredMenuButton("×",cloneBlue,GUILayout.Width(35),GUILayout.Height(35)))requestedMarketOpen=false;GUILayout.EndHorizontal();GUILayout.Space(10);
            if(loadError!=null)
            {
                GUILayout.Label(loadError,sheetQuiet);GUILayout.EndScrollView();GUILayout.EndVertical();GUILayout.EndArea();
                if(Event.current.type==EventType.KeyDown&&Event.current.keyCode==KeyCode.Escape){requestedMarketOpen=false;Event.current.Use();}return;
            }
            float used=0,available=width-44;GUILayout.BeginHorizontal();
            foreach(var entry in ((JObject)MarketCatalog["traders"]).Properties())
            {
                string id=entry.Name,name=(string)entry.Value["name"];var style=id==marketTrader?marketSelected:cloneBlue;float cell=Mathf.Min(available,style.CalcSize(new GUIContent(name)).x+6),height=Mathf.Max(35,style.CalcHeight(new GUIContent(name),cell));
                if(used>0&&used+cell+6>available){GUILayout.FlexibleSpace();GUILayout.EndHorizontal();GUILayout.BeginHorizontal();used=0;}
                if(MeasuredMenuButton(name,style,GUILayout.Width(cell),GUILayout.Height(height)))pendingMarketAction=()=>{marketTrader=id;marketOffers.Clear();marketWanted=null;};used+=cell+6;GUILayout.Space(6);
            }
            GUILayout.FlexibleSpace();GUILayout.EndHorizontal();GUILayout.Space(10);GUILayout.BeginHorizontal();
            foreach(var entry in new[]{("buy","Купить"),("sell","Продать"),("barter","Обмен")})
                if(MeasuredMenuButton(entry.Item2,cloneBlue,GUILayout.Width(74),GUILayout.Height(35))){string mode=entry.Item1;pendingMarketAction=()=>{marketMode=mode;marketOffers.Clear();marketWanted=null;};}
            marketQuery=GUILayout.TextField(marketQuery,cloneInput,GUILayout.MinWidth(95),GUILayout.Height(35));GUILayout.EndHorizontal();GUILayout.Space(8);
            if(stock!=null)
            {
                GUILayout.Label(MarketCatalog["traders"][marketTrader]["name"]+" · склад: "+stock.Sum(i=>(long)i["qty"])+" · Покупает только подходящие товары",sheetQuiet);GUILayout.Space(8);
                if(marketMode=="sell")DrawMarketSales(hero,state,definitions);else DrawMarketGoods(hero,state,definitions,stock);
            }
            GUILayout.Space(8);GUILayout.Label(marketMessage,sheetQuiet);GUILayout.EndScrollView();RegisterSwipe("market-modal",GUILayoutUtility.GetLastRect());GUILayout.EndVertical();GUILayout.EndArea();
            if(Event.current.type==EventType.KeyDown&&Event.current.keyCode==KeyCode.Escape){requestedMarketOpen=false;Event.current.Use();}
        }
        private void DrawMarketGoods(JObject hero,JObject state,JArray definitions,JArray stock)
        {
            string region=(string)state["region"]??"forest";
            foreach(JObject item in stock.OfType<JObject>().Where(i=>(long)i["qty"]>0&&i["name"].ToString().IndexOf(marketQuery,StringComparison.CurrentCultureIgnoreCase)>=0))
            {
                string id=(string)item["id"];long quote=CommerceRules.MarketQuote(MarketCatalog,marketTrader,item,"buy",region);CloneListRule();GUILayout.BeginHorizontal();GUILayout.BeginVertical(GUILayout.ExpandWidth(true));
                GUILayout.Label(item["name"]+" × "+item["qty"]);GUILayout.Label("Продажа игроку: "+MarketMoney(quote),sheetQuiet);
                if((string)CommerceRules.MarketResolve(definitions,item)["marketFunctionalStatus"]=="data_only")GUILayout.Label("Описание товара · пакет свойств не установлен",sheetQuiet);
                GUILayout.EndVertical();
                if(MeasuredMenuButton(marketMode=="barter"?"Выбрать":"Купить",cloneBlue,GUILayout.Width(88),GUILayout.Height(35)))
                {if(marketMode=="barter")pendingMarketAction=()=>marketWanted=id;else QueueMarketTrade("buy",new JObject{["itemId"]=id},1,new JArray());}
                GUILayout.EndHorizontal();GUILayout.Space(6);
            }
            if(marketMode!="barter")return;
            GUILayout.BeginVertical(GUI.skin.box);GUILayout.Label("Предметы для обмена",marketHeading);
            foreach(string category in CharacterSheetRules.InventoryCategories)
            {
                var list=hero["inventory"]?[category] as JArray??new JArray();for(int i=0;i<list.Count;i++)
                {
                    if(!(list[i] is JObject item))continue;int index=i;var reference=MarketItemSelection(item,category,index);
                    var offer=marketOffers.OfType<JObject>().FirstOrDefault(o=>(string)o["category"]==category&&(int)o["index"]==index);
                    bool enabled=GUI.enabled,accepted=false;string price;
                    try{accepted=(bool?)item["equipped"]!=true&&CommerceRules.MarketAccepts(MarketCatalog,definitions,marketTrader,item);price=MarketMoney(CommerceRules.MarketItemValue(item));}
                    catch(Exception error){price=error.Message;}
                    GUI.enabled=enabled&&accepted;
                    bool chosen=GUILayout.Toggle(offer!=null,item["name"]+" × "+(item["count"]??1)+" · "+price);
                    if(chosen!=(offer!=null))pendingMarketAction=()=>{if(chosen){reference["count"]=1;marketOffers.Add(reference);}else offer.Remove();};GUI.enabled=enabled;
                }
            }
            long offered=0;
            foreach(JObject offer in marketOffers.OfType<JObject>())
            {
                var item=hero["inventory"]?[offer["category"].ToString()]?[(int)offer["index"]] as JObject;
                if(item!=null)offered=checked(offered+CommerceRules.MarketItemValue(item)*(long)offer["count"]);
            }
            GUILayout.Label("Стоимость предложения: "+MarketMoney(offered),sheetQuiet);
            GUILayout.Label("Выбрано: "+(stock.OfType<JObject>().FirstOrDefault(i=>(string)i["id"]==marketWanted)?["name"]?.ToString()??"Выберите товар торговца"),sheetQuiet);
            bool wasEnabled=GUI.enabled;GUI.enabled=wasEnabled&&marketWanted!=null;
            if(MeasuredMenuButton("Обменять",cloneBlue,GUILayout.Height(35)))QueueMarketTrade("barter",new JObject{["itemId"]=marketWanted},1,marketOffers);GUI.enabled=wasEnabled;
            GUILayout.Label("Для обмена предложите 100–110% стоимости выбранного товара. Монеты не расходуются.",sheetQuiet);GUILayout.EndVertical();
        }
        private void DrawMarketSales(JObject hero,JObject state,JArray definitions)
        {
            foreach(string category in CharacterSheetRules.InventoryCategories)
            {
                var list=hero["inventory"]?[category] as JArray??new JArray();for(int i=0;i<list.Count;i++)
                {
                    if(!(list[i] is JObject item)||item["name"].ToString().IndexOf(marketQuery,StringComparison.CurrentCultureIgnoreCase)<0)continue;
                    bool accepted=CommerceRules.MarketAccepts(MarketCatalog,definitions,marketTrader,item)&&(bool?)item["equipped"]!=true;long price=0;string error=null;
                    try{price=CommerceRules.MarketQuote(MarketCatalog,marketTrader,item,"sell",(string)state["region"]??"forest");}catch(Exception e){accepted=false;error=e.Message;}
                    CloneListRule();GUILayout.BeginHorizontal();GUILayout.BeginVertical(GUILayout.ExpandWidth(true));GUILayout.Label(item["name"]+" × "+(item["count"]??1));GUILayout.Label(error??("Скупка: "+MarketMoney(price)+(accepted?"":" · не нужен торговцу / экипирован")),sheetQuiet);GUILayout.EndVertical();
                    bool enabled=GUI.enabled;GUI.enabled=enabled&&accepted;
                    if(MeasuredMenuButton("Продать",cloneBlue,GUILayout.Width(88),GUILayout.Height(35)))QueueMarketTrade("sell",MarketItemSelection(item,category,i),1,new JArray());GUI.enabled=enabled;GUILayout.EndHorizontal();GUILayout.Space(6);
                }
            }
        }
        private void RecoverMarket()
        {
            CharacterSheetStore.RecoverTrade(SavePath,SettingsPath);LoadPreferences();archive=CharacterSheetStore.Load(SavePath);
            marketOpen=false;status="Операция восстановлена";
        }
        private void DrawTradeRecovery()
        {
            PrepareSheetSkin();GUILayout.BeginArea(new Rect(20,20,UiWidth-40,UiHeight-40),GUI.skin.box);
            GUILayout.Label("Незавершённая торговая операция",sheetHeading);GUILayout.Label("Запись заблокирована до согласованного восстановления персонажей и общего склада. "+status,sheetQuiet);
            if(FitMenuButton("Повторить восстановление"))pendingMarketAction=RecoverMarket;GUILayout.EndArea();
        }
    }
}
