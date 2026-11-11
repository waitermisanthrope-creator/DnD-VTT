using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
namespace DndVtt.UnityPrototype
{
    // Indexes point into the shared immutable commerce snapshot; no second item DB.
    public sealed class ProductionCatalog
    {
        public readonly Dictionary<string,JObject> Items=new Dictionary<string,JObject>();
        public readonly Dictionary<string,JObject> Professions=new Dictionary<string,JObject>();
        public readonly Dictionary<string,JObject> Recipes=new Dictionary<string,JObject>();
        public readonly JObject Commerce;
        public readonly JObject ToolAliases=new JObject();
        public readonly Dictionary<string,string> ToolNames=new Dictionary<string,string>();
        public ProductionCatalog(JObject commerce,JObject[] modules)
        {
            Commerce=commerce??throw new ArgumentNullException(nameof(commerce));
            foreach(JObject item in (commerce["items"] as JArray??new JArray()).OfType<JObject>())
            {string id=(string)item["id"];if(id!=null&&!Items.ContainsKey(id))Items.Add(id,item);}
            if(commerce["craft"]?["toolAliases"] is JObject aliases)foreach(var field in aliases.Properties())ToolAliases[field.Name]=field.Value.DeepClone();
            foreach(var module in modules)
            {
                Validate(module);
                if(module["toolLabels"] is JObject labels)foreach(var field in labels.Properties()){ToolNames[field.Name]=field.Value.ToString();var names=ToolAliases[field.Name] as JArray??new JArray(field.Name);if(!names.Values<string>().Contains(field.Value.ToString()))names.Add(field.Value.ToString());ToolAliases[field.Name]=names;}
                if(module["toolAliases"] is JObject moduleAliases)foreach(var field in moduleAliases.Properties())ToolAliases[field.Name]=field.Value.DeepClone();
                foreach(JObject profession in (JArray)module["professions"])
                {string id=(string)profession["id"];if(Professions.ContainsKey(id))throw new FormatException("Повторный ID профессии: "+id);var copy=(JObject)profession.DeepClone();if(module["packageVersion"]!=null){copy["packageId"]=module["packageId"]?.DeepClone();copy["packageVersion"]=module["packageVersion"].DeepClone();}Professions.Add(id,copy);}
                foreach(JObject recipe in (JArray)module["recipes"])
                {string id=(string)recipe["id"];if(Recipes.ContainsKey(id))throw new FormatException("Повторный ID рецепта: "+id);var copy=(JObject)recipe.DeepClone();if(module["packageVersion"]!=null){copy["packageId"]=module["packageId"]?.DeepClone();copy["packageVersion"]=module["packageVersion"].DeepClone();}Recipes.Add(id,copy);}
            }
            foreach(var recipe in Recipes.Values)if(!Professions.ContainsKey((string)recipe["professionId"]))throw new FormatException("Не установлена профессия рецепта: "+recipe["name"]);
        }
        public static decimal Number(JToken token,decimal fallback=0,decimal maximum=9007199254740991m)
        {
            decimal value=CommerceRules.ExactItemCount(token,fallback);if(value>maximum)throw new FormatException("Слишком большое ремесленное значение");return value;
        }
        public static void Validate(JObject data)
        {
            if((string)data["mode"]!="production-v1"||!(data["professions"] is JArray professions)||!(data["recipes"] is JArray recipes)||professions.Count>200||recipes.Count>1000)throw new FormatException("Неверный декларативный пакет ремёсел");
            if(data["items"] is JArray items&&items.Count>0)throw new FormatException("Предметы подключайте отдельным item-пакетом через зависимости");
            if(data.Descendants().OfType<JProperty>().Any(p=>new[]{"script","javascript","code","eval","csharp","lua"}.Contains(p.Name.ToLowerInvariant())))throw new FormatException("Исполняемый код в ремесленных дополнениях запрещён");
            foreach(var list in new[]{professions,recipes})
            {var ids=new HashSet<string>();foreach(var token in list){if(!(token is JObject entry)||!WorkshopStore.ValidId((string)entry["id"])||!ids.Add((string)entry["id"])||!(entry["name"] is JValue name)||name.Type!=JTokenType.String||name.ToString().Length<1||name.ToString().Length>150)throw new FormatException("Неверный ID или название ремесленной записи");if(entry["description"]!=null&&entry["description"].ToString().Length>16000)throw new FormatException("Слишком длинное описание ремесла");}}
            foreach(JObject profession in professions)
            {
                Strings(profession["tools"]);Strings(profession["toolItems"]);
                if(profession["progression"]!=null)
                {
                    if(!(profession["progression"] is JObject progression)||!(progression["thresholds"] is JArray thresholds)||thresholds.Count<1||thresholds.Count>100||Number(thresholds[0])!=0)throw new FormatException("Неверные правила развития профессии");
                    if(progression["levels"]!=null&&(!(progression["levels"] is JArray levels)||levels.Count!=thresholds.Count||levels.Any(l=>!(l is JObject)||(int?)l["checkBonus"] < -100||(int?)l["checkBonus"]>100)))throw new FormatException("Неверные модификаторы уровней профессии");
                    decimal previous=-1;foreach(var token in thresholds){decimal value=Number(token);if(value<=previous)throw new FormatException("Пороги опыта должны возрастать");previous=value;}
                }
            }
            foreach(JObject recipe in recipes)
            {
                if(!WorkshopStore.ValidId((string)recipe["professionId"]))throw new FormatException("У рецепта нет профессии");
                References(recipe["ingredients"],false);References(recipe["results"],true);if(recipe["failureResults"]!=null)References(recipe["failureResults"],false);
                foreach(string effectField in new[]{"effects","failureEffects"})if(recipe[effectField]!=null)
                {
                    if(!(recipe[effectField] is JArray effects)||effects.Count>30)throw new FormatException("Неверные эффекты ремесла");
                    foreach(var token in effects)
                    {if(!(token is JObject effect))throw new FormatException("Неверный эффект");string kind=(string)effect["kind"];if(kind=="craft-flag"){if(!WorkshopStore.ValidId((string)effect["id"])||effect["value"]?.Type!=JTokenType.Boolean)throw new FormatException("Неверный признак ремесла");}else if(kind=="learn-recipe"){if(!WorkshopStore.ValidId((string)effect["recipeId"]))throw new FormatException("Неверный ID открываемого рецепта");}else throw new FormatException("Исполняемый или неизвестный эффект запрещён");}
                }
                Strings(recipe["tools"]);Strings(recipe["toolItems"]);Strings(recipe["conditions"]);Strings(recipe["rulesets"]);
                foreach(string key in new[]{"requiresApproval","knownByDefault","consumeOnFailure"})if(recipe[key]!=null&&recipe[key].Type!=JTokenType.Boolean)throw new FormatException("Неверный переключатель рецепта: "+key);
                Number(recipe["timeHours"],0,87600);decimal cost=Number(recipe["costCp"],0,1000000000);if(cost!=decimal.Truncate(cost))throw new FormatException("Стоимость задаётся целым количеством ММ");Number(recipe["experience"],0,1000000000);Number(recipe["failureExperience"],0,1000000000);Number(recipe["failureChance"],0,100);Number(recipe["requiredRank"],0,100);
                if(recipe["check"]!=null&&recipe["check"].Type!=JTokenType.Null)
                {if(!(recipe["check"] is JObject check)||Number(check["dc"],0,10000)<1)throw new FormatException("Неверная проверка изготовления");if(check["statMode"]!=null&&!new[]{"modifier","raw"}.Contains((string)check["statMode"]))throw new FormatException("Неизвестный расчёт характеристики");}
            }
        }
        private static void Strings(JToken token)
        {if(token==null)return;if(!(token is JArray array)||array.Count>100||array.Any(x=>x.Type!=JTokenType.String||x.ToString().Length<1||x.ToString().Length>150))throw new FormatException("Неверный список требований ремесла");}
        private static void References(JToken token,bool required)
        {
            if(token==null&&!required)return;
            if(!(token is JArray entries)||entries.Count>100||required&&entries.Count==0)throw new FormatException("Не заданы предметы рецепта");
            var ids=new HashSet<string>();foreach(var value in entries)
            {if(!(value is JObject entry)||!WorkshopStore.ValidId((string)entry["itemId"])||!ids.Add((string)entry["itemId"])||Number(entry["count"],1,1000000)<=0||entry["match"]!=null&&!(entry["match"] is JObject)||entry["properties"]!=null&&!(entry["properties"] is JObject))throw new FormatException("Неверный ID или количество предмета рецепта");}
        }
        public JObject Recipe(string id)=>Recipes.TryGetValue(id,out var recipe)?recipe:throw new FormatException("Рецепт недоступен. Установите исходное дополнение: "+id);
        public JObject Item(string id)=>Items.TryGetValue(id,out var item)?item:throw new FormatException("Не установлен предмет рецепта: "+id);
        public string RecipeHash(JObject recipe)
        {
            var text=new StringBuilder(recipe.ToString(Formatting.None));text.Append(Professions[(string)recipe["professionId"]].ToString(Formatting.None));
            foreach(string key in new[]{"ingredients","results","failureResults"})foreach(JObject reference in (recipe[key] as JArray??new JArray()))text.Append(Item((string)reference["itemId"]).ToString(Formatting.None));
            return WorkshopStore.Digest(Encoding.UTF8.GetBytes(text.ToString()));
        }
    }
}
