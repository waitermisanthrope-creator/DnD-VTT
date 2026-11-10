using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text.RegularExpressions;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace DndVtt.UnityPrototype
{
    public static partial class CommerceRules
    {
        private const long MarketSafe=9007199254740991L;
        private static decimal MarketNumber(JToken token,decimal fallback=0)
        {
            if(token==null||token.Type==JTokenType.Null)return fallback;
            if((token.Type!=JTokenType.Integer&&token.Type!=JTokenType.Float&&token.Type!=JTokenType.String)||!decimal.TryParse(token.ToString(),NumberStyles.Float,CultureInfo.InvariantCulture,out decimal value)||Math.Abs(value)>MarketSafe)
                throw new FormatException("Неизвестное или слишком большое числовое значение торговли");
            return value;
        }
        private static long MarketCount(JToken token,long fallback=0)
        {
            decimal value=MarketNumber(token,fallback);if(value<0||value!=decimal.Truncate(value))throw new FormatException("Количество должно быть целым неотрицательным");return (long)value;
        }
        private static long MarketCopper(decimal value)
        {value=decimal.Floor(value+.5m);if(value<0||value>MarketSafe)throw new FormatException("Сумма торговли слишком велика");return (long)value;}
        private static JObject MarketTrader(JObject catalog,string id)=>(catalog["traders"] as JObject)?[id] as JObject??throw new FormatException("Торговец не найден");
        private static string MarketNorm(string text)=>Regex.Replace((text??"").ToLowerInvariant(),"[^a-zа-яё0-9]","");
        private static decimal MarketBase(JObject item)
        {
            // Explicit catalog/crafted prices precede the old1gp fallback bug.
            foreach(string key in new[]{"baseCraftValue","costGp","price"})if(item[key]!=null)return MarketNumber(item[key]);
            if(item["cost"]!=null)
            {
                if(item["cost"].Type==JTokenType.Integer||item["cost"].Type==JTokenType.Float)return MarketNumber(item["cost"]);
                var match=Regex.Match(item["cost"].ToString().Replace(',','.'),@"([0-9]+(?:\.[0-9]+)?)\s*зм",RegexOptions.IgnoreCase);
                if(match.Success)return decimal.Parse(match.Groups[1].Value,CultureInfo.InvariantCulture);
            }
            if(item["marketPriceGp"]!=null)return MarketNumber(item["marketPriceGp"]);
            throw new FormatException("У предмета нет известной цены; укажите стоимость в его данных");
        }
        private static decimal MarketRarity(JObject item)
        {switch((string)item["rarity"]){case "uncommon":return 1.25m;case "rare":return 1.75m;case "very_rare":return 2.5m;case "legendary":return 4;default:return 1;}}
        private static decimal MarketWear(JObject item)
        {decimal max=MarketNumber(item["maxDurability"]);return item["currentDurability"]!=null&&max>0?Math.Max(.15m,Math.Min(1,MarketNumber(item["currentDurability"])/max)):1;}
        public static long MarketQuote(JObject catalog,string trader,JObject item,string mode,string region)
        {
            if(mode!="buy"&&mode!="sell")throw new FormatException("Неизвестный режим торговли");
            var seller=MarketTrader(catalog,trader);var modifiers=(catalog["regions"] as JObject)?[region] as JObject??throw new FormatException("Неизвестный регион рынка");
            double regional=1;bool matched=false;
            foreach(var tag in (item["tags"] as JArray??item["craftTags"] as JArray??new JArray()).Values<string>())
                if(modifiers[tag]!=null){regional*=(double)MarketNumber(modifiers[tag]);matched=true;}
            if(!matched)regional=(double)MarketNumber(modifiers["common"],1);
            double rarity=(double)MarketRarity(item);if(mode=="sell")rarity=1/rarity;
            double factor=(double)MarketNumber(seller[mode=="buy"?"buyFactor":"sellFactor"]);
            double value=(double)MarketBase(item);if(value<0||factor<=0)throw new FormatException("Некорректная цена торговли");
            double copper=Math.Max(.01,value*regional*rarity*factor*(double)MarketWear(item))*100;
            if(double.IsNaN(copper)||double.IsInfinity(copper)||copper>MarketSafe)throw new FormatException("Сумма торговли слишком велика");
            // Match JS Math.round positive fractions, including binary half cases;
            // settlement remains checked integer copper, never floating balances.
            double floor=Math.Floor(copper);return checked((long)(copper-floor<.5?floor:floor+1));
        }
        public static long MarketItemValue(JObject item)=>MarketCopper(Math.Max(0,MarketBase(item)*MarketRarity(item)*MarketNumber(item["qualityMultiplier"],1)*(.25m+.75m*MarketWear(item)))*100);
        public static JObject MarketResolve(JArray definitions,JObject item)
        {
            string name=(string)item["name"]??"";if(name=="Противоядие"||name=="Антитоксин")name="Противоядие (Антидот)";
            var matches=definitions.OfType<JObject>().Where(d=>MarketNorm((string)d["name"])==MarketNorm(name)).ToArray();
            var definition=matches.Length==1?matches[0]:null;var result=(JObject)item.DeepClone();
            if(definition!=null)
            {
                foreach(var field in definition.Properties())if(result[field.Name]==null)result[field.Name]=field.Value.DeepClone();
                if(item["costGp"]!=null&&definition["id"]!=null)result["id"]=definition["id"].DeepClone();
                result["inventoryCategory"]=definition["inventoryCategory"]?.DeepClone();
            }
            else{string category=(string)(item["inventoryCategory"]??item["category"])??"materials";result["inventoryCategory"]=CharacterSheetRules.InventoryCategories.Contains(category)?category:"junk";}
            result["marketFunctionalStatus"]=definition!=null?"functional":"data_only";
            result["marketFunctionalKind"]=definition!=null?(string)definition["inventoryCategory"]:"generic";result.Remove("qty");return result;
        }
        public static bool MarketAccepts(JObject catalog,JArray definitions,string trader,JObject item)
        {
            var t=MarketTrader(catalog,trader);string type=(string)t["type"];
            if(type=="general"||type=="caravan"||type=="caravan_master")return true;
            var rule=(catalog["accept"] as JObject)?[type] as JObject??(JObject)catalog["accept"]["general"];
            string category=(string)MarketResolve(definitions,item)["inventoryCategory"];
            if(!((JArray)rule["categories"]).Values<string>().Contains(category))return false;
            var tags=new HashSet<string>(new[]{"tags","craftTags","roles"}.SelectMany(k=>(item[k] as JArray??new JArray()).Values<string>()).Select(x=>x.ToLowerInvariant()));
            var names=new Dictionary<string,string[]>{
                ["metal"]=new[]{"оруж","меч","топор","молот","арбалет","щит","брон","кольч","лат","руда","слит"},["wood"]=new[]{"лук","древес","дерев","копь","стрел"},["leather"]=new[]{"кож","шкур","сбру","ножн","сумк"},
                ["alchemical"]=new[]{"зель","элик","алхим","кислот","дым","реагент"},["poison"]=new[]{"яд","токс"},["food"]=new[]{"паёк","мяс","сыр","хлеб","рыб","эль","пиво","медовух","сидр","соль","масло"},["paper"]=new[]{"свиток","пергамент","бумаг","чернил","карта"},
                ["glass"]=new[]{"стекл","флакон","графин","хруст"},["rope"]=new[]{"верёв","канат","леск","сеть"},["textile"]=new[]{"ткан","шёлк","одеж","попон"},["stone"]=new[]{"камень","гранит","мрамор","сланец","кварц","обсидиан"},
                ["gem"]=new[]{"аметист","гранат","опал","руб","сапфир","изумруд","алмаз","драгоцен"},["relic"]=new[]{"реликв","артефакт","рунич","древн","талисман"},["arcane"]=new[]{"аркан","магич","эссенц","кристалл"}};
            string text=((string)item["name"]??"").ToLowerInvariant();foreach(var pair in names)if(pair.Value.Any(text.Contains))tags.Add(pair.Key);
            return ((JArray)rule["tags"]).Values<string>().Any(tags.Contains);
        }
        public static JArray MarketStock(JObject catalog,JObject state,string trader)
        {
            var template=MarketTrader(catalog,trader);var result=(JArray)template["stock"].DeepClone();
            if(state["traders"]!=null&&!(state["traders"] is JObject))throw new FormatException("Неизвестный формат состояния рынка");
            var saved=(state["traders"] as JObject)?[trader];if(saved==null)return result;
            if(!(saved is JObject)||!(saved["stock"] is JArray slots)||slots.Any(s=>!(s is JObject))||slots.GroupBy(s=>(string)s["id"]).Any(g=>g.Count()>1))throw new FormatException("Неизвестный формат склада — данные сохранены");
            foreach(JObject row in result){var slot=slots.OfType<JObject>().SingleOrDefault(s=>JToken.DeepEquals(s["id"],row["id"]));row["qty"]=slot==null?0:MarketCount(slot["qty"]);}
            return result;
        }
        private static void MarketSetStock(JObject catalog,JObject state,string trader,string item,long count)
        {
            var traders=CharacterSheetRules.Object(state,"traders");
            if(traders[trader]==null)traders[trader]=new JObject{["stock"]=new JArray(((JArray)MarketTrader(catalog,trader)["stock"]).OfType<JObject>().Select(i=>new JObject{["id"]=i["id"].DeepClone(),["qty"]=i["qty"].DeepClone()})),["lastRestock"]=DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()};
            var slot=((JArray)traders[trader]["stock"]).OfType<JObject>().Single(s=>(string)s["id"]==item);slot["qty"]=count;
        }
        private static long MarketBalance(JObject hero)
        {
            if(hero["coins"]!=null&&!(hero["coins"] is JObject))throw new FormatException("Неизвестный формат кошелька");
            long sum=0;long[] factors={1,10,50,100,1000};for(int i=0;i<5;i++)sum=checked(sum+checked(MarketCount(hero["coins"]?[CharacterSheetRules.CoinKeys[i]])*factors[i]));
            if(sum>MarketSafe)throw new FormatException("Слишком большой кошелёк");return sum;
        }
        private static void MarketSetBalance(JObject hero,long amount)
        {
            if(amount<0||amount>MarketSafe)throw new FormatException("Недостаточно монет или сумма слишком велика");
            var coins=CharacterSheetRules.Object(hero,"coins");long[] factors={1,10,50,100,1000};for(int i=4;i>=0;i--){coins[CharacterSheetRules.CoinKeys[i]]=amount/factors[i];amount%=factors[i];}
        }
        private static JObject MarketSelected(JObject hero,JObject selection)
        {
            string category=(string)selection["category"];if(!CharacterSheetRules.InventoryCategories.Contains(category))throw new FormatException("Неизвестная категория");
            long index=MarketCount(selection["index"]);var list=hero["inventory"]?[category] as JArray;
            if(list==null||index>=list.Count||!(list[(int)index] is JObject item)||item.ToString(Formatting.None)!=(string)selection["signature"])throw new InvalidOperationException("Выбранный предмет изменился; откройте сделку заново");
            if((bool?)item["equipped"]==true)throw new FormatException("Сначала снимите предмет с экипировки");return item;
        }
        private static void MarketRemove(JObject item,long count)
        {
            decimal owned=MarketNumber(item["count"],1);if(owned<count)throw new FormatException("Недостаточно предметов");
            if(owned==count)item.Remove();else item["count"]=owned-count;
        }
        private static void MarketAdd(JObject hero,JObject item,long count)
        {
            string category=(string)item["inventoryCategory"];if(!CharacterSheetRules.InventoryCategories.Contains(category))throw new FormatException("Неизвестная категория товара");
            var list=CharacterSheetRules.Array(CharacterSheetRules.Object(hero,"inventory"),category);
            // Stack only identical records. Unknown fields, potency, charges and
            // durability are identity-bearing; merging by id would clone variants.
            JObject Identity(JObject value){var copy=(JObject)value.DeepClone();copy.Remove("count");if((bool?)copy["equipped"]!=true)copy.Remove("equipped");return copy;}
            var identity=Identity(item);
            var same=list.OfType<JObject>().FirstOrDefault(x=>JToken.DeepEquals(Identity(x),identity));
            if(same!=null){decimal total=MarketNumber(same["count"],1)+count;if(total>MarketSafe)throw new FormatException("Слишком много предметов");same["count"]=total;}
            else{item["count"]=count;item["equipped"]=false;list.Add(item);}
        }
        public static JObject MarketTrade(JObject catalog,JArray definitions,JObject hero,JObject state,string trader,string mode,JObject selection,long count,JArray offers)
        {
            if(count<1||count>int.MaxValue)throw new FormatException("Укажите целое положительное количество");
            if(hero["inventory"]!=null&&!(hero["inventory"] is JObject))throw new FormatException("Старый формат инвентаря сохранён; торговля требует явной миграции");
            var h=(JObject)hero.DeepClone();var s=(JObject)state.DeepClone();string region=(string)s["region"]??"forest";_=MarketTrader(catalog,trader);
            long total=0;JObject received=null;
            if(mode=="sell")
            {
                var sold=MarketSelected(h,selection);if(!MarketAccepts(catalog,definitions,trader,sold))throw new FormatException("Торговец не заинтересован в этом товаре");
                total=checked(MarketQuote(catalog,trader,sold,"sell",region)*count);MarketRemove(sold,count);MarketSetBalance(h,checked(MarketBalance(h)+total));
            }
            else if(mode=="buy"||mode=="barter")
            {
                var row=MarketStock(catalog,s,trader).OfType<JObject>().SingleOrDefault(i=>(string)i["id"]==(string)selection["itemId"])??throw new FormatException("Товар не найден");
                long quantity=MarketCount(row["qty"]);if(quantity<count)throw new FormatException("Недостаточно товара на складе");
                if(mode=="buy")
                {total=checked(MarketQuote(catalog,trader,row,"buy",region)*count);MarketSetBalance(h,checked(MarketBalance(h)-total));}
                else
                {
                    long wanted=checked(MarketItemValue(row)*count),offered=0;var keys=new HashSet<string>();var removals=new List<(JObject item,long count)>();
                    if(offers==null||offers.Count==0)throw new FormatException("Добавьте предметы для обмена");
                    foreach(var entry in offers)
                    {
                        if(!(entry is JObject offer)||!keys.Add(offer["category"]+":"+offer["index"]))throw new FormatException("Один предмет нельзя предложить дважды");
                        var item=MarketSelected(h,offer);long amount=MarketCount(offer["count"],1);if(amount<1||MarketNumber(item["count"],1)<amount||!MarketAccepts(catalog,definitions,trader,item))throw new FormatException("Проверьте предметы для обмена");
                        offered=checked(offered+checked(MarketItemValue(item)*amount));removals.Add((item,amount));
                    }
                    if(wanted<=0||offered<wanted||(decimal)offered>wanted*1.10m)throw new FormatException("Стоимость обмена должна быть от100%до110% стоимости товара");
                    foreach(var entry in removals)MarketRemove(entry.item,entry.count);total=wanted;
                }
                received=MarketResolve(definitions,row);received["marketSource"]=trader;received["marketPriceGp"]=MarketBase(row);MarketAdd(h,received,count);MarketSetStock(catalog,s,trader,(string)row["id"],quantity-count);
            }
            else throw new FormatException("Неизвестная операция торговли");
            if(total<0||total>MarketSafe)throw new FormatException("Сумма сделки слишком велика");s["revision"]=checked(MarketCount(s["revision"])+1);s["region"]=region;
            return new JObject{["hero"]=h,["state"]=s,["totalCp"]=total,["received"]=received?.DeepClone()};
        }
    }
}
