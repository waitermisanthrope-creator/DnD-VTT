using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Newtonsoft.Json.Linq;
namespace DndVtt.UnityPrototype
{
    public static partial class CommerceRules
    {
        public static readonly string[] CraftModes={"manual","semi","auto"};
        private static JObject CraftObject(JObject parent,string key)
        {if(parent[key]==null)parent[key]=new JObject();return parent[key] as JObject??throw new FormatException("Неизвестный формат ремесленных данных: "+key);}
        private static JArray CraftArray(JObject parent,string key)
        {if(parent[key]==null)parent[key]=new JArray();return parent[key] as JArray??throw new FormatException("Неизвестный формат ремесленного списка: "+key);}
        public static JObject ReadCraftState(JObject hero)
        {
            var state=hero["crafts"]==null?new JObject():hero["crafts"] as JObject??throw new FormatException("Неизвестная версия ремесленного состояния — данные сохранены");
            if(state["schema"]!=null&&(state["schema"].Type!=JTokenType.Integer||(int)state["schema"]!=1))throw new FormatException("Более новая версия ремёсел — запись заблокирована");return state;
        }
        private static JObject WriteCraftState(JObject hero)
        {var state=ReadCraftState(hero);if(hero["crafts"]==null)hero["crafts"]=state;state["schema"]=1;return (JObject)hero["crafts"];}
        public static JObject SetCraftRuleset(JObject hero,string ruleset)
        {if(!WorkshopStore.ValidId(ruleset))throw new FormatException("Неверная игровая система");var copy=(JObject)hero.DeepClone();WriteCraftState(copy)["ruleset"]=ruleset;return copy;}
        public static JObject EnrollCraftProfession(JObject hero,ProductionCatalog catalog,string id)
        {if(!catalog.Professions.ContainsKey(id))throw new FormatException("Профессия недоступна");var copy=(JObject)hero.DeepClone();CraftProfession(copy,id);return copy;}
        public static bool CraftModeAllowed(JObject hero,string mode)
        {
            if(!CraftModes.Contains(mode))return false;var state=ReadCraftState(hero);var policy=state["policy"] as JObject;
            if(state["policy"]!=null&&policy==null)throw new FormatException("Неизвестная политика ремёсел");
            if(policy!=null&&policy["scope"]!=null&&(string)policy["scope"]!="offline")throw new FormatException("Для политики кампании нужны подтверждённые сетевые полномочия");
            if(policy?["allowedModes"]==null)return true;
            return policy["allowedModes"] is JArray modes&&modes.Values<string>().Contains(mode);
        }
        public static JObject SetCraftMode(JObject hero,string mode)
        {if(!CraftModeAllowed(hero,mode))throw new FormatException("Мастер ограничил этот режим изготовления");var copy=(JObject)hero.DeepClone();WriteCraftState(copy)["mode"]=mode;return copy;}
        public static JObject SetCraftPolicyOffline(JObject hero,JArray modes,bool localMaster)
        {
            if(!localMaster)throw new InvalidOperationException("Настройки доступны только локальному мастеру");
            if(modes==null||modes.Count>3||modes.Values<string>().Distinct().Count()!=modes.Count||modes.Any(m=>!CraftModes.Contains((string)m)))throw new FormatException("Неверные доступные режимы");
            var copy=(JObject)hero.DeepClone();var state=WriteCraftState(copy);state["policy"]=new JObject{["scope"]="offline",["allowedModes"]=modes.DeepClone()};if(!modes.Values<string>().Contains((string)state["mode"]))state["mode"]=modes.First?.ToString()??"manual";return copy;
        }
        private static JObject CraftProfession(JObject hero,string id)
        {
            var all=CraftObject(WriteCraftState(hero),"professions");
            if(all[id]==null&&hero["craftingProfessions"] is JObject old&&old[id] is JObject legacy)all[id]=legacy.DeepClone();
            return CraftObject(all,id);
        }
        private static JObject ReadCraftProfession(JObject hero,string id)
        {var state=ReadCraftState(hero);if(state["professions"]!=null&&!(state["professions"] is JObject))throw new FormatException("Неизвестный формат профессий");var value=state["professions"]?[id];return value==null?new JObject():value as JObject??throw new FormatException("Неизвестная запись профессии");}
        public static bool CraftProgressionEnabled(JObject hero,JObject profession)=>profession["progression"] is JObject&&((bool?)ReadCraftProfession(hero,(string)profession["id"])["progressionEnabled"]??false);
        public static JObject SetCraftProgression(JObject hero,ProductionCatalog catalog,string professionId,bool enabled)
        {
            if(!catalog.Professions.TryGetValue(professionId,out var profession)||enabled&&!(profession["progression"] is JObject))throw new FormatException("Для профессии не заданы правила развития");
            var copy=(JObject)hero.DeepClone();var record=CraftProfession(copy,professionId);record["progressionEnabled"]=enabled;
            if(enabled)record["level"]=((JArray)profession["progression"]["thresholds"]).Count(t=>PN(t)<=PN(record["xp"]));return copy;
        }
        public static JObject LearnProductionRecipe(JObject hero,ProductionCatalog catalog,string recipeId)
        {var recipe=catalog.Recipe(recipeId);var copy=(JObject)hero.DeepClone();var known=CraftArray(CraftProfession(copy,(string)recipe["professionId"]),"knownRecipes");if(!known.Values<string>().Contains(recipeId)){if(known.Count>=2000)throw new FormatException("Книга рецептов переполнена");known.Add(recipeId);}return copy;}
        public static bool ProductionRecipeKnown(JObject hero,JObject recipe)=>(bool?)recipe["knownByDefault"]==true||(ReadCraftProfession(hero,(string)recipe["professionId"])["knownRecipes"] as JArray??new JArray()).Values<string>().Contains((string)recipe["id"]);
        public static JObject FavoriteProductionRecipe(JObject hero,string recipeId)
        {var copy=(JObject)hero.DeepClone();var favorites=CraftArray(WriteCraftState(copy),"favorites");var existing=favorites.FirstOrDefault(x=>(string)x==recipeId);if(existing!=null)existing.Remove();else{if(favorites.Count>=2000)throw new FormatException("Слишком много избранных рецептов");favorites.Add(recipeId);}return copy;}
        private static decimal PN(JToken token,decimal fallback=0)=>ProductionCatalog.Number(token,fallback);
        private static IEnumerable<JObject> ProductionItems(JObject hero)=>CharacterSheetRules.InventoryCategories.SelectMany(c=>(hero["inventory"]?[c] as JArray??new JArray()).OfType<JObject>());
        private static bool IngredientMatches(JObject item,JObject ingredient)
        {
            if((bool?)item["equipped"]==true||(string)item["id"]!=(string)ingredient["itemId"])return false;
            if(ingredient["match"] is JObject match)foreach(var field in match.Properties())if(!JToken.DeepEquals(item[field.Name],field.Value))return false;
            return true;
        }
        private static string ItemLabel(ProductionCatalog catalog,string id)=>catalog.Items.TryGetValue(id,out var item)?(string)item["name"]??id:id;
        public static JObject PlanProduction(JObject hero,ProductionCatalog catalog,string recipeId,decimal units,JObject context)
        {
            if(units<1||units!=decimal.Truncate(units)||units>10000)throw new FormatException("Укажите целое количество изделий от1до10000");
            var recipe=catalog.Recipe(recipeId);if(recipe["legacy"] is JObject legacy)return PlanLegacyProduction(hero,catalog,legacy,units,context);var profession=catalog.Professions[(string)recipe["professionId"]];var missing=new JArray();context=context??new JObject();
            string ruleset=(string)(context["ruleset"]??ReadCraftState(hero)["ruleset"])??"dnd5e2014";
            if(recipe["rulesets"] is JArray editions&&editions.Count>0&&!editions.Values<string>().Contains(ruleset))missing.Add("Рецепт предназначен для другой системы правил");
            if(!ProductionRecipeKnown(hero,recipe))missing.Add("Рецепт не изучен");
            foreach(var requires in new[]{profession["requires"] as JObject,recipe["requires"] as JObject}.Where(r=>r!=null))
            {
                foreach(string flag in (requires["craftFlags"] as JArray??new JArray()).Values<string>())if((bool?)ReadCraftState(hero)["flags"]?[flag]!=true)missing.Add("Нужен ремесленный признак: "+flag);
                if((ruleset.StartsWith("dnd5e",StringComparison.Ordinal)?CharacterSheetRules.Level(hero):PN(hero["level"],1))<PN(requires["minLevel"]))missing.Add("Недостаточный уровень персонажа");
                foreach(string spell in (requires["spells"] as JArray??new JArray()).Values<string>())if(!(hero["spellsData"] as JArray??new JArray()).OfType<JObject>().Any(s=>(string)s["id"]==spell))missing.Add("Нужно известное заклинание: "+spell);
                if(requires["minStats"] is JObject stats)foreach(var stat in stats.Properties())if(PN(hero["stats"]?[stat.Name])<PN(stat.Value))missing.Add("Не хватает характеристики: "+stat.Name);
            }
            foreach(string tool in (profession["tools"] as JArray??new JArray()).Values<string>().Concat((recipe["tools"] as JArray??new JArray()).Values<string>()).Distinct())
                if(!HasTool(hero,tool,catalog.ToolAliases))missing.Add("Нужно владение инструментами: "+(catalog.ToolNames.TryGetValue(tool,out var label)?label:tool));
            foreach(string id in (profession["toolItems"] as JArray??new JArray()).Values<string>().Concat((recipe["toolItems"] as JArray??new JArray()).Values<string>()).Distinct())
                if(!ProductionItems(hero).Any(i=>(string)i["id"]==id&&ExactItemCount(i["count"])>0))missing.Add("Нужен инструмент: "+ItemLabel(catalog,id));
            foreach(string condition in (recipe["conditions"] as JArray??new JArray()).Values<string>())if(!(context["conditions"] as JArray??new JArray()).Values<string>().Contains(condition))missing.Add("Нужно условие: "+condition);
            if(CraftProgressionEnabled(hero,profession)&&PN(ReadCraftProfession(hero,(string)profession["id"])["level"],1)<PN(recipe["requiredRank"]))missing.Add("Недостаточное мастерство профессии");
            var requirements=new JArray();
            foreach(JObject input in recipe["ingredients"] as JArray??new JArray())
            {
                string id=(string)input["itemId"];decimal need=PN(input["count"],1)*units,have=ProductionItems(hero).Where(i=>IngredientMatches(i,input)).Sum(i=>ExactItemCount(i["count"]));
                if(!catalog.Items.ContainsKey(id))missing.Add("Не установлен материал: "+id);
                if(have<need)missing.Add("Не хватает: "+ItemLabel(catalog,id)+" ×"+(need-have).ToString(CultureInfo.InvariantCulture));
                requirements.Add(new JObject{["itemId"]=id,["need"]=need,["have"]=have});
            }
            decimal cost=PN(recipe["costCp"])*units;if((decimal)CharacterSheetRules.CoinTotal(hero["coins"] as JObject,null)<cost)missing.Add("Не хватает монет: требуется "+cost+" ММ");
            string hash=null;try{hash=catalog.RecipeHash(recipe);}catch(FormatException error){missing.Add(error.Message);}
            return new JObject{["available"]=missing.Count==0,["missing"]=missing,["requirements"]=requirements,["costCp"]=cost,["timeHours"]=PN(recipe["timeHours"])*units,["recipeHash"]=hash,["units"]=units};
        }
        private static IEnumerable<JObject> ProductionProjects(JObject hero)
        {
            var state=ReadCraftState(hero);
            foreach(string field in new[]{"projects","archive"})
            {if(state[field]!=null&&!(state[field] is JArray))throw new FormatException("Неизвестный журнал проектов");foreach(var token in state[field] as JArray??new JArray()){if(!(token is JObject project))throw new FormatException("Неизвестный формат проекта — данные сохранены");yield return project;}}
        }
        private static JObject ProductionProject(JObject hero,string id)=>ProductionProjects(hero).SingleOrDefault(p=>(string)p["id"]==id)??throw new FormatException("Проект не найден");
        private static bool ProductionClosed(JObject p)=>new[]{"completed","failed","cancelled","manual-completed"}.Contains((string)p["status"]);
        private static void ProductionHistory(JObject hero,JObject project,string action)
        {
            var log=CraftArray(WriteCraftState(hero),"history");log.Insert(0,new JObject{["projectId"]=project["id"].DeepClone(),["recipeId"]=project["recipeId"].DeepClone(),["event"]=action,["time"]=DateTime.UtcNow.ToString("o",CultureInfo.InvariantCulture)});while(log.Count>100)log.RemoveAt(log.Count-1);
        }
        private static void RequirePlan(JObject plan)
        {if((bool)plan["available"]!=true)throw new FormatException(string.Join("; ",((JArray)plan["missing"]).Values<string>()));}
        public static JObject StartProduction(JObject hero,ProductionCatalog catalog,string recipeId,string projectId,string mode,decimal units,JObject context,JObject rolls)
        {
            if(catalog.Recipe(recipeId)["legacy"] is JObject legacy)return StartLegacyProduction(hero,catalog,legacy,projectId,mode,units,context,rolls);
            if(!WorkshopStore.ValidId(projectId)||!CraftModeAllowed(hero,mode))throw new FormatException("Недоступный режим или ID проекта");
            var existing=ProductionProjects(hero).SingleOrDefault(p=>(string)p["id"]==projectId);
            if(existing!=null){if((string)existing["recipeId"]!=recipeId||PN(existing["units"],1)!=units||(string)existing["mode"]!=mode)throw new FormatException("Этот ID проекта уже использован");return (JObject)hero.DeepClone();}
            var recipe=catalog.Recipe(recipeId);var plan=PlanProduction(hero,catalog,recipeId,units,context);if(mode!="manual")RequirePlan(plan);
            var copy=(JObject)hero.DeepClone();var state=WriteCraftState(copy);state["mode"]=mode;var projects=CraftArray(state,"projects");if(projects.Count>=200)throw new FormatException("Архивируйте завершённые проекты перед созданием новых");
            bool approval=mode=="semi"||(bool?)recipe["requiresApproval"]==true;
            var project=new JObject{["id"]=projectId,["recipeId"]=recipeId,["name"]=recipe["name"].DeepClone(),["professionId"]=recipe["professionId"].DeepClone(),["mode"]=mode,["units"]=units,["recipeHash"]=plan["recipeHash"]?.DeepClone(),["requiredHours"]=plan["timeHours"].DeepClone(),["progressHours"]=0,["status"]=mode!="manual"&&approval?"pending":"working",["requiresApproval"]=approval,["materialsDebited"]=false,["outputCommitted"]=false};projects.Add(project);
            // Json.NET owns/clones parented nodes. Continue with the actual saved node.
            project=(JObject)projects.Last;ProductionHistory(copy,project,"started");
            if(mode!="manual"&&!approval&&PN(project["requiredHours"])==0)FinishProduction(copy,catalog,project,context,rolls);
            return copy;
        }
        private static void ConsumeProduction(JObject hero,JArray ingredients,decimal units)
        {
            foreach(JObject input in ingredients)
            {
                decimal left=PN(input["count"],1)*units;var rows=ProductionItems(hero).Where(i=>IngredientMatches(i,input)).ToArray();
                if(rows.Sum(i=>ExactItemCount(i["count"]))<left)throw new FormatException("Материалы изменились перед изготовлением");
                foreach(var item in rows){decimal owned=ExactItemCount(item["count"]),take=Math.Min(left,owned);left-=take;if(take==owned)item.Remove();else item["count"]=owned-take;if(left==0)break;}
            }
        }
        private static void GrantProductionExperience(JObject hero,ProductionCatalog catalog,JObject recipe,decimal units,bool success)
        {
            var profession=catalog.Professions[(string)recipe["professionId"]];if(!CraftProgressionEnabled(hero,profession))return;
            var record=CraftProfession(hero,(string)profession["id"]);decimal xp=PN(record["xp"])+PN(recipe[success?"experience":"failureExperience"])*units;if(xp>9007199254740991m)throw new FormatException("Слишком много опыта профессии");record["xp"]=xp;
            var thresholds=(JArray)profession["progression"]["thresholds"];record["level"]=thresholds.Count(t=>PN(t)<=xp);
        }
        private static void ApplyProductionEffects(JObject hero,ProductionCatalog catalog,JArray effects)
        {
            foreach(JObject effect in effects)
            {
                string kind=(string)effect["kind"];
                if(kind=="craft-flag")CraftObject(WriteCraftState(hero),"flags")[(string)effect["id"]]=effect["value"].DeepClone();
                else if(kind=="learn-recipe")
                {var recipe=catalog.Recipe((string)effect["recipeId"]);var known=CraftArray(CraftProfession(hero,(string)recipe["professionId"]),"knownRecipes");if(!known.Values<string>().Contains((string)recipe["id"]))known.Add(recipe["id"].DeepClone());}
                else throw new FormatException("Неизвестный декларативный эффект ремесла");
            }
        }
        private static void FinishProduction(JObject hero,ProductionCatalog catalog,JObject project,JObject context,JObject rolls)
        {
            if(ProductionClosed(project))return;
            if(project["legacy"] is JObject){FinishLegacyProduction(hero,catalog,project,context,rolls);return;}
            string mode=(string)project["mode"];if(!CraftModeAllowed(hero,mode))throw new FormatException("Мастер ограничил режим этого проекта");
            if(mode=="manual")throw new FormatException("Ручной проект завершается ручной записью");
            if((bool?)project["requiresApproval"]==true&&(string)project["approvalScope"]!="offline")throw new FormatException("Нужно подтверждение мастера");
            if(PN(project["progressHours"])<PN(project["requiredHours"]))throw new FormatException("Изготовление ещё не закончено");
            string id=(string)project["recipeId"];decimal units=PN(project["units"],1);var recipe=catalog.Recipe(id);var plan=PlanProduction(hero,catalog,id,units,context);RequirePlan(plan);
            if((string)plan["recipeHash"]!=(string)project["recipeHash"])throw new FormatException("Рецепт или предметы дополнения изменились. Создайте новый проект.");
            bool success=true;var outcome=new JObject();rolls=rolls??new JObject();
            if(recipe["check"] is JObject check)
            {
                int roll=(int?)rolls["d20"]??0;if(roll<1||roll>20)throw new FormatException("Нужен результат d20 от1до20");
                int bonus=0;string stat=(string)check["stat"];
                string skill=(string)check["skill"];int skillIndex=Array.IndexOf(CharacterSheetRules.SkillIds,skill);
                if(skill!=null)
                {
                    if(skillIndex>=0)bonus=CharacterSheetRules.Skill(hero,skillIndex);
                    else if(!int.TryParse(hero["skills"]?[skill]?.ToString(),out bonus))throw new FormatException("Не указан навык для проверки: "+skill);
                }
                else if(stat!=null)bonus=(string)check["statMode"]=="raw"?(int)PN(hero["stats"]?[stat]):CharacterSheetRules.Modifier(hero,stat);
                if(skill==null&&(bool?)check["proficiency"]==true)bonus+=CharacterSheetRules.Proficiency(hero);
                if(check["bonus"]!=null){if(!int.TryParse(check["bonus"].ToString(),out int extra)||Math.Abs((long)extra)>10000)throw new FormatException("Неверный модификатор проверки");bonus+=extra;}
                var profession=catalog.Professions[(string)recipe["professionId"]];
                if(CraftProgressionEnabled(hero,profession)&&profession["progression"]?["levels"] is JArray levels)
                {int rank=(int)PN(ReadCraftProfession(hero,(string)profession["id"])["level"],1);if(rank>=1&&rank<=levels.Count)bonus+=(int?)levels[rank-1]["checkBonus"]??0;}
                outcome["d20"]=roll;outcome["bonus"]=bonus;outcome["total"]=roll+bonus;outcome["dc"]=check["dc"].DeepClone();success=roll+bonus>=(int)PN(check["dc"]);
            }
            if(PN(recipe["failureChance"])>0){int roll=(int?)rolls["d100"]??0;if(roll<1||roll>100)throw new FormatException("Нужен результат d100 от1до100");outcome["d100"]=roll;success=success&&roll>PN(recipe["failureChance"]);}
            var outputs=(recipe[success?"results":"failureResults"] as JArray??new JArray());foreach(JObject output in outputs)catalog.Item((string)output["itemId"]);
            bool consume=success||((bool?)recipe["consumeOnFailure"]??true);
            if(consume)
            {
                ConsumeProduction(hero,recipe["ingredients"] as JArray??new JArray(),units);decimal cost=PN(plan["costCp"]);
                if(cost>0)CharacterSheetRules.ApplyCoinOperation(hero,new JObject{["cp"]=cost},"sub",null,(bool?)context?["showPlatinum"]??true,(bool?)context?["showElectrum"]??false,DateTime.Now.ToString("HH:mm:ss"));
            }
            var received=new JArray();foreach(JObject output in outputs)
            {var item=(JObject)catalog.Item((string)output["itemId"]).DeepClone();if(output["properties"] is JObject fields)foreach(var field in fields.Properties()){if(new[]{"id","inventoryCategory","count","packageId","packageVersion"}.Contains(field.Name))throw new FormatException("Результат не может менять ID или происхождение предмета");item[field.Name]=field.Value.DeepClone();}decimal count=PN(output["count"],1)*units;AddExactInventoryItem(hero,item,count);received.Add(new JObject{["itemId"]=item["id"].DeepClone(),["count"]=count});}
            ApplyProductionEffects(hero,catalog,recipe[success?"effects":"failureEffects"] as JArray??new JArray());
            GrantProductionExperience(hero,catalog,recipe,units,success);project["status"]=success?"completed":"failed";project["materialsDebited"]=consume;project["outputCommitted"]=received.Count>0;project["received"]=received;project["outcome"]=outcome;ProductionHistory(hero,project,success?"completed":"failed");
        }
        public static JObject ReviewProductionOffline(JObject hero,ProductionCatalog catalog,string projectId,bool approve,bool localMaster,JObject context,JObject rolls)
        {
            if(!localMaster)throw new InvalidOperationException("Нужно локальное подтверждение мастера; сетевых полномочий это не предоставляет");
            var copy=(JObject)hero.DeepClone();var project=ProductionProject(copy,projectId);if(ProductionClosed(project))return copy;
            if(!approve){project["status"]="cancelled";ProductionHistory(copy,project,"cancelled");return copy;}
            if((string)project["status"]!="pending")throw new FormatException("Проект не ожидает подтверждения");
            var plan=project["legacy"] is JObject legacy?PlanLegacyProduction(copy,catalog,legacy,1,context):PlanProduction(copy,catalog,(string)project["recipeId"],PN(project["units"],1),context);RequirePlan(plan);if((string)plan["recipeHash"]!=(string)project["recipeHash"])throw new FormatException("Рецепт изменился после подготовки проекта");
            project["approvalScope"]="offline";project["status"]="working";ProductionHistory(copy,project,"approved-offline");
            if(PN(project["progressHours"])>=PN(project["requiredHours"]))FinishProduction(copy,catalog,project,context,rolls);return copy;
        }
        public static JObject ProgressProduction(JObject hero,ProductionCatalog catalog,string projectId,decimal hours,JObject context,JObject rolls)
        {
            if(hours<=0||hours>87600)throw new FormatException("Укажите положительное игровое время");var copy=(JObject)hero.DeepClone();var project=ProductionProject(copy,projectId);if(ProductionClosed(project))return copy;
            if((string)project["status"]=="pending")throw new FormatException("Сначала получите подтверждение мастера");
            project["progressHours"]=Math.Min(PN(project["requiredHours"]),PN(project["progressHours"])+hours);ProductionHistory(copy,project,"progress");
            if((string)project["mode"]!="manual"&&PN(project["progressHours"])>=PN(project["requiredHours"]))FinishProduction(copy,catalog,project,context,rolls);return copy;
        }
        public static JObject CancelProduction(JObject hero,string projectId)
        {var copy=(JObject)hero.DeepClone();var project=ProductionProject(copy,projectId);if(ProductionClosed(project))return copy;project["status"]="cancelled";ProductionHistory(copy,project,"cancelled");return copy;}
        public static JObject FinishManualProduction(JObject hero,ProductionCatalog catalog,string projectId,JObject adjustment)
        {
            var copy=(JObject)hero.DeepClone();var project=ProductionProject(copy,projectId);if(ProductionClosed(project))return copy;if((string)project["mode"]!="manual")throw new FormatException("Проект использует другой режим");
            if(!CraftModeAllowed(copy,"manual"))throw new FormatException("Ручное изготовление ограничено мастером");adjustment=adjustment??new JObject();
            var consume=adjustment["consume"] as JArray??new JArray();ConsumeProduction(copy,consume,1);
            foreach(JObject output in adjustment["produce"] as JArray??new JArray())
            {
                var item=(JObject)catalog.Item((string)output["itemId"]).DeepClone();
                if(output["properties"] is JObject fields)foreach(var field in fields.Properties())
                {if(new[]{"id","inventoryCategory","count","packageId","packageVersion"}.Contains(field.Name))throw new FormatException("Ручной результат не может менять ID или происхождение");item[field.Name]=field.Value.DeepClone();}
                AddExactInventoryItem(copy,item,PN(output["count"],1));
            }
            decimal explicitXp=PN(adjustment["experience"]);
            if(explicitXp>0&&catalog.Professions.TryGetValue((string)project["professionId"],out var profession)&&CraftProgressionEnabled(copy,profession))
            {var record=CraftProfession(copy,(string)profession["id"]);decimal xp=PN(record["xp"])+explicitXp;if(xp>9007199254740991m)throw new FormatException("Слишком много опыта");record["xp"]=xp;record["level"]=((JArray)profession["progression"]["thresholds"]).Count(t=>PN(t)<=xp);}
            project["notes"]=(string)adjustment["notes"]??"";project["status"]="manual-completed";project["materialsDebited"]=consume.Count>0;project["outputCommitted"]=(adjustment["produce"] as JArray)?.Count>0;ProductionHistory(copy,project,"manual-completed");return copy;
        }
        public static JObject ArchiveProductionProjects(JObject hero)
        {
            var copy=(JObject)hero.DeepClone();var state=WriteCraftState(copy);var projects=CraftArray(state,"projects");var archive=CraftArray(state,"archive");
            foreach(JObject project in projects.OfType<JObject>().Where(ProductionClosed).ToArray()){if(archive.Count>=10000)throw new FormatException("Архив ремёсел переполнен; сохраните резервную копию");project.Remove();archive.Add(project);}return copy;
        }
    }
}
