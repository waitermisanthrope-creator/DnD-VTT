using System;
using System.Linq;
using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
namespace DndVtt.UnityPrototype
{
    public sealed partial class ProductionCatalog
    {
        private void AddLegacyRecipes()
        {
            foreach(JObject recipe in (Commerce["craft"]?["recipes"] as JArray??new JArray()).OfType<JObject>())
            {
                string id="legacy.craft."+(string)recipe["id"],profession=LegacyProfession((recipe["tools"] as JArray)?.First?.ToString());
                if(!Professions.ContainsKey(profession))profession=Professions.Keys.FirstOrDefault();if(profession==null||Recipes.ContainsKey(id))continue;
                string details=(string)recipe["description"]??"Рецепт ранее установленного сборника. Исходная механика сохранена.";
                details+="\nПроверка d20 + мастерство · СЛ "+recipe["dc"];
                details+="\nИнструменты: "+string.Join(", ",(recipe["tools"] as JArray??new JArray()).Values<string>().Select(tool=>ToolNames.TryGetValue(tool,out var label)?label:tool));
                foreach(var material in (recipe["materials"] as JObject??new JObject()).Properties())
                {var source=(Commerce["craft"]?["materials"] as JArray??new JArray()).OfType<JObject>().FirstOrDefault(m=>(string)m["id"]==material.Name);details+="\n"+((string)source?["name"]??material.Name)+" ×"+material.Value;}
                details+="\nРезультат: "+recipe["name"]+" ×"+(recipe["quantity"]?.ToString()??"1");
                Recipes.Add(id,new JObject{["id"]=id,["name"]=recipe["name"].DeepClone(),["description"]=details,["professionId"]=profession,["knownByDefault"]=true,["timeHours"]=recipe["time"]?.DeepClone()??new JValue(0),["legacy"]=new JObject{["kind"]="craft",["recipeId"]=recipe["id"].DeepClone()}});
            }
        }
        internal static string LegacyProfession(string tool)
        {switch(tool){case "woodwork":return "carpenter";case "leatherwork":return "leatherworker";case "alchemy":return "alchemist";case "herbal":return "herbalist";case "scribe":return "calligrapher";case "glasswork":return "glassblower";case "pottery":return "potter";default:return tool??"other";}}
    }
    public static partial class CommerceRules
    {
        private static JObject LegacyRecipe(ProductionCatalog catalog,JObject args)
        {
            if((string)args["kind"]!="craft")return new JObject{["name"]="Алхимическая смесь",["time"]=0,["dc"]=10};
            var matches=(catalog.Commerce["craft"]?["recipes"] as JArray??new JArray()).OfType<JObject>().Where(r=>(string)r["id"]==(string)args["recipeId"]).ToArray();
            if(matches.Length!=1)throw new FormatException("Исходный рецепт отсутствует или неоднозначен");return matches[0];
        }
        private static string LegacyHash(ProductionCatalog catalog,JObject args)
        {string section=(string)args["kind"]=="craft"?"craft":"alchemy";return WorkshopStore.Digest(Encoding.UTF8.GetBytes((catalog.Commerce[section]??new JObject()).ToString(Formatting.None)+args.ToString(Formatting.None)));}
        private static JObject PerformLegacyProduction(JObject hero,ProductionCatalog catalog,JObject args,JObject rolls)
        {
            string kind=(string)args["kind"];
            if(kind=="craft")return Craft(hero,LegacyRecipe(catalog,args),(JObject)catalog.Commerce["craft"],(int?)rolls["d20"]??0);
            if(kind=="alchemy")return Mix(hero,(JObject)catalog.Commerce["alchemy"],((JArray)args["ids"]).Values<string>().ToArray(),(string)args["catalyst"],(int?)rolls["d100"]??0);
            if(kind=="research"){Research(hero,(JObject)catalog.Commerce["alchemy"],(string)args["ingredientId"]);return new JObject{["ok"]=true};}
            throw new FormatException("Неизвестная сохранённая операция ремесла");
        }
        public static JObject PlanLegacyProduction(JObject hero,ProductionCatalog catalog,JObject args,decimal units,JObject context)
        {
            if(units!=1)throw new FormatException("Для старого рецепта создавайте по одному проекту");
            var missing=new JArray();var recipe=LegacyRecipe(catalog,args);
            try{PerformLegacyProduction((JObject)hero.DeepClone(),catalog,args,new JObject{["d20"]=20,["d100"]=100});}catch(Exception error){missing.Add(error.Message);}
            return new JObject{["available"]=missing.Count==0,["missing"]=missing,["requirements"]=new JArray(),["costCp"]=0,["timeHours"]=PN(recipe["time"]),["recipeHash"]=LegacyHash(catalog,args),["units"]=1};
        }
        public static JObject StartLegacyProduction(JObject hero,ProductionCatalog catalog,JObject args,string projectId,string mode,decimal units,JObject context,JObject rolls)
        {
            if(!WorkshopStore.ValidId(projectId)||!CraftModeAllowed(hero,mode))throw new FormatException("Недоступный режим проекта");
            var existing=ProductionProjects(hero).SingleOrDefault(p=>(string)p["id"]==projectId);if(existing!=null){if(!JToken.DeepEquals(existing["legacy"],args))throw new FormatException("ID проекта занят другой операцией");return (JObject)hero.DeepClone();}
            var plan=PlanLegacyProduction(hero,catalog,args,units,context);if(mode!="manual")RequirePlan(plan);var recipe=LegacyRecipe(catalog,args);
            var copy=(JObject)hero.DeepClone();var state=WriteCraftState(copy);state["mode"]=mode;var projects=CraftArray(state,"projects");if(projects.Count>=200)throw new FormatException("Архивируйте завершённые проекты");
            string profession=(string)args["kind"]=="craft"?ProductionCatalog.LegacyProfession((recipe["tools"] as JArray)?.First?.ToString()):"alchemist";
            if(!catalog.Professions.ContainsKey(profession))profession=catalog.Professions.Keys.FirstOrDefault()??"other";
            projects.Add(new JObject{["id"]=projectId,["name"]=recipe["name"].DeepClone(),["recipeId"]=(string)args["kind"]=="craft"?"legacy.craft."+(string)args["recipeId"]:"legacy."+(string)args["kind"],["professionId"]=profession,["legacy"]=args.DeepClone(),["mode"]=mode,["units"]=1,["recipeHash"]=plan["recipeHash"].DeepClone(),["requiredHours"]=plan["timeHours"].DeepClone(),["progressHours"]=0,["status"]=mode=="semi"?"pending":"working",["requiresApproval"]=mode=="semi",["materialsDebited"]=false,["outputCommitted"]=false});
            var project=(JObject)projects.Last;ProductionHistory(copy,project,"started");if(mode=="auto"&&PN(project["requiredHours"])==0)FinishLegacyProduction(copy,catalog,project,context,rolls);return copy;
        }
        private static void FinishLegacyProduction(JObject hero,ProductionCatalog catalog,JObject project,JObject context,JObject rolls)
        {
            if(ProductionClosed(project))return;
            if(!CraftModeAllowed(hero,(string)project["mode"]))throw new FormatException("Режим проекта ограничен мастером");
            if((bool?)project["requiresApproval"]==true&&(string)project["approvalScope"]!="offline")throw new FormatException("Нужно подтверждение мастера");
            var args=(JObject)project["legacy"];if((string)project["recipeHash"]!=LegacyHash(catalog,args))throw new FormatException("Справочник изменился после начала проекта");RequirePlan(PlanLegacyProduction(hero,catalog,args,1,context));
            string projectId=(string)project["id"];
            var result=PerformLegacyProduction(hero,catalog,args,rolls);bool success=(bool)result["ok"];
            // Legacy Craft/Mix commit a cloned whole hero. Continue with the
            // node owned by that committed tree, never the detached old record.
            project=ProductionProject(hero,projectId);
            project["outcome"]=result;project["status"]=success?"completed":"failed";project["materialsDebited"]=(string)args["kind"]!="research";project["outputCommitted"]=success&&(string)args["kind"]!="research";
            if(success&&catalog.Professions.TryGetValue((string)project["professionId"],out var profession)&&CraftProgressionEnabled(hero,profession))
            {
                var recipe=LegacyRecipe(catalog,args);string quality=(string)result["item"]?["craftQuality"];
                decimal xp=Math.Max(5,PN(recipe["dc"],10)*2)+(quality=="exceptional"?20:quality=="fine"?10:0);
                var proxy=new JObject{["professionId"]=profession["id"].DeepClone(),["experience"]=xp};GrantProductionExperience(hero,catalog,proxy,1,true);
            }
            ProductionHistory(hero,project,success?"completed":"failed");
        }
    }
}
