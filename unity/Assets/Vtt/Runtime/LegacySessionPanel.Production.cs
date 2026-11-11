using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using UnityEngine;
namespace DndVtt.UnityPrototype
{
    public sealed partial class LegacySessionPanel
    {
        private ProductionCatalog productionCatalog;
        private Task<(ProductionCatalog catalog,string error)> productionTask;
        private string productionError;
        private Action pendingCraftCommand,pendingCraftView;
        private bool craftLocalMaster,craftMasterConfirm,craftShowProfessions,craftShowAlchemy,craftShowJournal,craftShowPolicy,craftShowMaterials;
        private string craftProjectDetail="";
        private string craftProfession="",craftRecipe="",craftSearch="",craftUnits="1",craftWorkHours="8",craftManualNotes="",craftManualXp="0";
        private int craftFilter,craftPage,craftProfessionPage,craftOwnedPage,craftProjectPage,craftMaterialPage;
        private JObject[] craftMatches=Array.Empty<JObject>();
        private LegacyCharacterArchive craftViewArchive,craftPlanArchive;
        private string craftViewKey,craftPlanKey;
        private JObject craftCachedPlan;
        private readonly HashSet<string> craftConditions=new HashSet<string>();
        private bool craftManualConsume,craftManualProduce;
        private void InvalidateProductionCatalog(){if(pendingCraftCommand!=null){pendingCraftCommand=null;status="Действие ремесла отменено: дополнения изменились.";}productionCatalog=null;productionTask=null;productionError=null;craftViewArchive=craftPlanArchive=null;}
        private void QueueCraft(Func<JObject,JObject> operation,string message)
        {
            string expected=archive.Export(),heroId=(string)archive.Snapshot(selected)["id"];int index=selected;
            pendingCraftCommand=()=>
            {
                if(archive.Export()!=expected||selected!=index||(string)archive.Snapshot(index)["id"]!=heroId)throw new InvalidOperationException("Персонаж изменился. Повторите действие.");
                var hero=operation(archive.Snapshot(index));var candidate=archive.DetachedCopy();candidate.Replace(index,hero);
                CharacterSheetStore.SaveExpected(SavePath,candidate,expected);archive=candidate;craftViewArchive=craftPlanArchive=null;status=message;
            };
        }
        private void CommitCraftCommand()
        {if(pendingCraftCommand==null)return;var action=pendingCraftCommand;pendingCraftCommand=null;Attempt(action);}
        private void PrepareProductionCatalog()
        {
            if(Event.current.type!=EventType.Layout)return;
            if(productionTask!=null&&productionTask.IsCompleted)
            {var result=productionTask.Result;productionTask=null;productionCatalog=result.catalog;productionError=result.error;craftViewArchive=craftPlanArchive=null;}
            if(productionCatalog!=null||productionTask!=null||productionError!=null||CommerceCatalog==null)return;
            string text=Resources.Load<TextAsset>("CharacterSheet/production")?.text;
            var installed=workshopStore.Installed();string root=workshopStore.Root;var shared=CommerceCatalog;
            productionTask=Task.Run(()=>
            {
                JObject builtin=null;
                try{builtin=JObject.Parse(text??throw new FormatException("Не найден справочник профессий"));var modules=new WorkshopStore(root).Production(installed).OfType<JObject>().ToList();modules.Insert(0,builtin);return(new ProductionCatalog(shared,modules.ToArray()),(string)null);}
                catch(Exception error){try{return(new ProductionCatalog(shared,new[]{builtin??JObject.Parse("{mode:'production-v1',professions:[],recipes:[]}")}),"Дополнения ремёсел не активированы: "+error.Message);}catch{return((ProductionCatalog)null,"Не удалось подготовить ремёсла: "+error.Message);}}
            });
        }
        private void BeginCraftView(){if(Event.current.type==EventType.Layout&&pendingCraftView!=null){var view=pendingCraftView;pendingCraftView=null;view();craftViewKey=craftPlanKey=null;}}
        private static string CraftModeName(string mode)=>mode=="semi"?"Полуавтомат":mode=="auto"?"Автомат":"Ручной";
        private JObject CraftContext(JObject hero)=>new JObject{["ruleset"]=(string)CommerceRules.ReadCraftState(hero)["ruleset"]??"dnd5e2014",["conditions"]=new JArray(craftConditions),["showPlatinum"]=showPlatinum,["showElectrum"]=showElectrum};
        private decimal CraftUnits()
        {
            CompleteNumericKeyboard();if(numericSession.TryTake("production.units",out string value))craftUnits=value;
            if(!decimal.TryParse(craftUnits,NumberStyles.None,CultureInfo.InvariantCulture,out var units)||units<1||units>10000)throw new FormatException("Укажите количество изделий от1до10000");return units;
        }
        private JObject CraftRolls()=>new JObject{["d20"]=UnityEngine.Random.Range(1,21),["d100"]=UnityEngine.Random.Range(1,101)};
        private bool DrawProductionHeader(JObject hero)
        {
            SheetSection("Ремёсла");JObject state;
            try{state=CommerceRules.ReadCraftState(hero);}catch(Exception error){GUILayout.Label(error.Message,sheetQuiet);return false;}
            string mode=(string)state["mode"]??"manual";
            GUILayout.BeginHorizontal();
            foreach(string id in CommerceRules.CraftModes)
            {
                bool enabled=GUI.enabled;GUI.enabled=enabled&&CommerceRules.CraftModeAllowed(hero,id);
                if(MeasuredMenuButton(CraftModeName(id),id==mode?brandBlue:brandPlain,GUILayout.MinHeight(50),GUILayout.ExpandWidth(true)))QueueCraft(h=>CommerceRules.SetCraftMode(h,id),"Режим: "+CraftModeName(id));GUI.enabled=enabled;
            }
            GUILayout.EndHorizontal();
            GUILayout.Label(mode=="manual"?"Ручной учёт: ресурсы и результат определяет игрок. Автоматического расхода нет.":mode=="semi"?"Проект готовится без списания. Итог подтверждает локальный мастер.":"Условия проверяются повторно; расход и результат сохраняются одной операцией.",sheetQuiet);
            GUILayout.Label("Локальная игра: подтверждение на этом устройстве. Сетевое одобрение мастера пока недоступно.",sheetQuiet);
            if(!craftLocalMaster)
            {
                if(!craftMasterConfirm){if(MeasuredMenuButton("Передать устройство локальному мастеру",brandPlain,GUILayout.MinHeight(44)))pendingCraftView=()=>craftMasterConfirm=true;}
                else
                {
                    GUILayout.Label("Этот режим предназначен для доверенной офлайн-игры и не даёт полномочий в сетевой кампании.",sheetQuiet);
                    if(MeasuredMenuButton("Устройство у мастера",brandBlue,GUILayout.MinHeight(48)))pendingCraftView=()=>{craftLocalMaster=true;craftMasterConfirm=false;};
                    if(MeasuredMenuButton("Отмена",brandPlain,GUILayout.MinHeight(44)))pendingCraftView=()=>craftMasterConfirm=false;
                }
            }
            else
            {
                if(MeasuredMenuButton("Вернуть игроку",brandPlain,GUILayout.MinHeight(44)))pendingCraftView=()=>{craftLocalMaster=false;craftShowPolicy=false;};
                if(MeasuredMenuButton("Доступные режимы изготовления",brandPlain,GUILayout.MinHeight(44)))pendingCraftView=()=>craftShowPolicy=!craftShowPolicy;
                if(craftShowPolicy)foreach(string id in CommerceRules.CraftModes)
                {bool allowed=CommerceRules.CraftModeAllowed(hero,id);if(GUILayout.Toggle(allowed,CraftModeName(id),GUILayout.MinHeight(40))!=allowed){var modes=new JArray(CommerceRules.CraftModes.Where(m=>m==id?!allowed:CommerceRules.CraftModeAllowed(hero,m)));QueueCraft(h=>CommerceRules.SetCraftPolicyOffline(h,modes,true),"Ограничения мастера сохранены");}}
            }
            GUILayout.BeginHorizontal();foreach(var edition in new[]{("dnd5e2014","D&D 2014"),("dnd5e2024","D&D 2024"),("homebrew","Свои правила")})
                if(MeasuredMenuButton(edition.Item2,(string)state["ruleset"]==edition.Item1||state["ruleset"]==null&&edition.Item1=="dnd5e2014"?brandBlue:brandPlain,GUILayout.MinHeight(44)))QueueCraft(h=>CommerceRules.SetCraftRuleset(h,edition.Item1),"Правила ремёсел сохранены");GUILayout.EndHorizontal();
            return true;
        }
        private void DrawProductionProfessions(JObject hero)
        {
            var state=CommerceRules.ReadCraftState(hero);var owned=state["professions"] as JObject??new JObject();SheetSection("Мои профессии");
            if(!owned.Properties().Any())GUILayout.Label("Выберите профессию в каталоге. Развитие не включается автоматически.",sheetQuiet);
            if(Event.current.type==EventType.Layout)craftOwnedPage=Math.Min(craftOwnedPage,Math.Max(0,(owned.Count-1)/8));
            foreach(var property in owned.Properties().Skip(craftOwnedPage*8).Take(8))
            {
                string id=property.Name;if(!productionCatalog.Professions.TryGetValue(id,out var profession)){GUILayout.Label("Профессия сохранена; дополнение не установлено: "+id,sheetQuiet);continue;}
                if(MeasuredMenuButton((string)profession["name"],id==craftProfession?brandBlue:brandPlain,GUILayout.MinHeight(48)))pendingCraftView=()=>{craftProfession=id;craftPage=0;};
                if(CommerceRules.CraftProgressionEnabled(hero,profession))
                {var record=property.Value;GUILayout.Label("Мастерство: "+(record["level"]??1)+" · Опыт: "+(record["xp"]??0),sheetQuiet);}
                else GUILayout.Label("Без обязательных уровней профессии",sheetQuiet);
            }
            GUILayout.BeginHorizontal();if(craftOwnedPage>0&&MeasuredMenuButton("← Мои профессии",brandPlain,GUILayout.MinHeight(44)))pendingCraftView=()=>craftOwnedPage--;if((craftOwnedPage+1)*8<owned.Count&&MeasuredMenuButton("Мои профессии →",brandPlain,GUILayout.MinHeight(44)))pendingCraftView=()=>craftOwnedPage++;GUILayout.EndHorizontal();
            if(MeasuredMenuButton(craftShowProfessions?"Скрыть каталог ремёсел":"Каталог ремёсел · "+productionCatalog.Professions.Count,brandPlain,GUILayout.MinHeight(48)))pendingCraftView=()=>craftShowProfessions=!craftShowProfessions;
            if(craftShowProfessions)
            {
                var list=productionCatalog.ProfessionList;
                foreach(var profession in list.Skip(craftProfessionPage*8).Take(8))
                {string id=(string)profession["id"];if(MeasuredMenuButton((string)profession["name"],id==craftProfession?brandBlue:brandPlain,GUILayout.MinHeight(48)))pendingCraftView=()=>{craftProfession=id;craftPage=0;};}
                GUILayout.BeginHorizontal();if(craftProfessionPage>0&&MeasuredMenuButton("← Ремёсла",brandPlain,GUILayout.MinHeight(44)))pendingCraftView=()=>craftProfessionPage--;if((craftProfessionPage+1)*8<list.Length&&MeasuredMenuButton("Ремёсла →",brandPlain,GUILayout.MinHeight(44)))pendingCraftView=()=>craftProfessionPage++;GUILayout.EndHorizontal();
            }
            if(craftProfession!=""&&productionCatalog.Professions.TryGetValue(craftProfession,out var chosen))
            {
                GUILayout.BeginVertical(GUI.skin.box);GUILayout.Label((string)chosen["name"],sheetHeading);GUILayout.Label((string)chosen["description"]??"",sheetQuiet);
                if(chosen["tools"] is JArray tools)GUILayout.Label("Инструменты: "+string.Join(", ",tools.Values<string>().Select(id=>productionCatalog.ToolNames.TryGetValue(id,out var name)?name:id)),sheetQuiet);
                string id=craftProfession;if(owned[id]==null&&MeasuredMenuButton("Добавить в мои профессии",brandGreen,GUILayout.MinHeight(48)))QueueCraft(h=>CommerceRules.EnrollCraftProfession(h,productionCatalog,id),"Профессия добавлена");
                if(chosen["progression"] is JObject)
                {bool enabled=CommerceRules.CraftProgressionEnabled(hero,chosen);if(GUILayout.Toggle(enabled,"Дополнительное развитие профессии (Homebrew)",GUILayout.MinHeight(44))!=enabled)QueueCraft(h=>CommerceRules.SetCraftProgression(h,productionCatalog,id,!enabled),"Развитие профессии настроено");}
                if(MeasuredMenuButton("Все профессии в книге рецептов",brandPlain,GUILayout.MinHeight(44)))pendingCraftView=()=>{craftProfession="";craftPage=0;};GUILayout.EndVertical();
            }
        }
        private void RefreshCraftRecipeView(JObject hero)
        {
            if(Event.current.type!=EventType.Layout)return;
            string key=craftSearch+"|"+craftProfession+"|"+craftFilter;
            if(ReferenceEquals(craftViewArchive,archive)&&craftViewKey==key)return;
            var favorites=CommerceRules.ReadCraftState(hero)["favorites"] as JArray??new JArray();
            craftMatches=productionCatalog.Recipes.Values.Where(r=>(craftProfession==""||(string)r["professionId"]==craftProfession)&&((string)r["name"]??"").IndexOf(craftSearch,StringComparison.OrdinalIgnoreCase)>=0&&(craftFilter==0?CommerceRules.ProductionRecipeKnown(hero,r):craftFilter!=2||favorites.Values<string>().Contains((string)r["id"]))).OrderBy(r=>(string)r["name"],StringComparer.CurrentCulture).ToArray();
            craftViewArchive=archive;craftViewKey=key;craftPage=Math.Min(craftPage,Math.Max(0,(craftMatches.Length-1)/20));
        }
        private JObject CurrentCraftPlan(JObject hero,JObject recipe)
        {
            string key=craftRecipe+"|"+craftUnits+"|"+string.Join(",",craftConditions.OrderBy(x=>x));
            if(craftCachedPlan!=null&&Event.current.type!=EventType.Layout)return craftCachedPlan;
            if(ReferenceEquals(craftPlanArchive,archive)&&craftPlanKey==key)return craftCachedPlan;
            try{craftCachedPlan=CommerceRules.PlanProduction(hero,productionCatalog,(string)recipe["id"],decimal.Parse(craftUnits,CultureInfo.InvariantCulture),CraftContext(hero));}
            catch(Exception error){craftCachedPlan=new JObject{["available"]=false,["missing"]=new JArray(error.Message),["requirements"]=new JArray(),["timeHours"]=0,["costCp"]=0};}
            craftPlanArchive=archive;craftPlanKey=key;return craftCachedPlan;
        }
        private void DrawProductionBook(JObject hero)
        {
            SheetSection("Книга рецептов");GUILayout.BeginHorizontal();string[] labels={"Известные","Все доступные","Избранное"};for(int i=0;i<3;i++){int filter=i;if(MeasuredMenuButton(labels[i],i==craftFilter?brandBlue:brandPlain,GUILayout.MinHeight(44)))pendingCraftView=()=>{craftFilter=filter;craftPage=0;};}GUILayout.EndHorizontal();
            GUILayout.Label("Поиск рецепта",sheetQuiet);craftSearch=MenuTextField("production.search",craftSearch,GUILayout.MinHeight(44));RefreshCraftRecipeView(hero);
            if(craftMatches.Length==0)GUILayout.Label("Подходящих рецептов нет. Установите сборник рецептов или выберите «Все доступные».",sheetQuiet);
            foreach(var recipe in craftMatches.Skip(craftPage*20).Take(20))
            {string id=(string)recipe["id"];if(MeasuredMenuButton((string)recipe["name"],id==craftRecipe?brandBlue:brandPlain,GUILayout.MinHeight(48)))pendingCraftView=()=>{craftRecipe=id;craftUnits="1";};}
            GUILayout.BeginHorizontal();if(craftPage>0&&MeasuredMenuButton("← Рецепты",brandPlain,GUILayout.MinHeight(44)))pendingCraftView=()=>craftPage--;if((craftPage+1)*20<craftMatches.Length&&MeasuredMenuButton("Рецепты →",brandPlain,GUILayout.MinHeight(44)))pendingCraftView=()=>craftPage++;GUILayout.EndHorizontal();
            if(!productionCatalog.Recipes.TryGetValue(craftRecipe,out var selectedRecipe))return;
            GUILayout.BeginVertical(GUI.skin.box);GUILayout.Label((string)selectedRecipe["name"],sheetHeading);GUILayout.Label((string)selectedRecipe["description"]??"",sheetQuiet);
            string recipeId=craftRecipe;
            if(MeasuredMenuButton(CommerceRules.ProductionRecipeKnown(hero,selectedRecipe)?"Рецепт известен":"Изучить рецепт",brandPlain,GUILayout.MinHeight(44))&&!CommerceRules.ProductionRecipeKnown(hero,selectedRecipe))QueueCraft(h=>CommerceRules.LearnProductionRecipe(h,productionCatalog,recipeId),"Рецепт изучен");
            if(MeasuredMenuButton("Добавить / убрать из избранного",brandPlain,GUILayout.MinHeight(44)))QueueCraft(h=>CommerceRules.FavoriteProductionRecipe(h,recipeId),"Избранное обновлено");
            GUILayout.Label("Количество изделий",sheetQuiet);bool enabled=GUI.enabled;GUI.enabled=enabled&&selectedRecipe["legacy"]==null;craftUnits=IntegerField("production.units",craftUnits,GUILayout.MinHeight(44));GUI.enabled=enabled;
            foreach(string condition in (selectedRecipe["conditions"] as JArray??new JArray()).Values<string>())
            {bool active=craftConditions.Contains(condition);string label=(string)selectedRecipe["conditionLabels"]?[condition]??condition;if(GUILayout.Toggle(active,label,GUILayout.MinHeight(40))!=active){if(active)craftConditions.Remove(condition);else craftConditions.Add(condition);craftPlanKey=null;}}
            var plan=CurrentCraftPlan(hero,selectedRecipe);GUILayout.Label("Время: "+plan["timeHours"]+" ч · Стоимость: "+plan["costCp"]+" ММ",sheetQuiet);
            foreach(JObject requirement in (JArray)plan["requirements"])GUILayout.Label((productionCatalog.Items.TryGetValue((string)requirement["itemId"],out var item)?(string)item["name"]:(string)requirement["itemId"])+": "+requirement["have"]+" / "+requirement["need"],sheetQuiet);
            foreach(string missing in ((JArray)plan["missing"]).Values<string>())GUILayout.Label(missing,sheetQuiet);
            if(selectedRecipe["check"] is JObject check)GUILayout.Label("Проверка изготовления · СЛ "+check["dc"],sheetQuiet);
            foreach(JObject output in selectedRecipe["results"] as JArray??new JArray())GUILayout.Label("Результат: "+(productionCatalog.Items.TryGetValue((string)output["itemId"],out var resultItem)?(string)resultItem["name"]:(string)output["itemId"])+" ×"+output["count"],sheetQuiet);
            string mode=(string)CommerceRules.ReadCraftState(hero)["mode"]??"manual";
            bool canStart=GUI.enabled;GUI.enabled=canStart&&CommerceRules.CraftModeAllowed(hero,mode)&&(mode=="manual"||(bool)plan["available"]);
            if(MeasuredMenuButton(mode=="manual"?"Начать ручной учёт":mode=="semi"?"Подготовить проект мастеру":"Начать изготовление",brandGreen,GUILayout.MinHeight(52)))Attempt(()=>{decimal units=CraftUnits();var context=CraftContext(hero);var rolls=CraftRolls();string id="project."+Guid.NewGuid().ToString("N");QueueCraft(h=>CommerceRules.StartProduction(h,productionCatalog,recipeId,id,mode,units,context,rolls),mode=="semi"?"Проект ожидает локального мастера":"Проект сохранён");});
            GUI.enabled=canStart;GUILayout.EndVertical();
        }
        private static string CraftProjectStatus(string status)
        {switch(status){case "started":return "Проект начат";case "approved-offline":return "Подтверждено мастером";case "progress":return "Учтено рабочее время";case "pending":return "Ожидает мастера";case "working":return "В работе";case "completed":return "Готово";case "failed":return "Неудача";case "cancelled":return "Отменено";case "manual-completed":return "Ручной итог записан";default:return "Сохранённый проект";}}
        private void DrawProductionProjects(JObject hero)
        {
            SheetSection("Текущие проекты");var state=CommerceRules.ReadCraftState(hero);var projects=(state["projects"] as JArray??new JArray()).OfType<JObject>().Where(p=>p["id"]?.Type==JTokenType.String&&p["mode"]?.Type==JTokenType.String).ToArray();if(Event.current.type==EventType.Layout)craftProjectPage=Math.Min(craftProjectPage,Math.Max(0,(projects.Length-1)/12));
            if(projects.Length==0)GUILayout.Label("Незавершённых проектов нет",sheetQuiet);
            GUILayout.Label("Игровые часы работы за действие",sheetQuiet);craftWorkHours=MenuTextField("production.work.hours",craftWorkHours,GUILayout.MinHeight(44));
            foreach(var project in projects.Skip(craftProjectPage*12).Take(12))
            {
                string id=(string)project["id"],recipeId=(string)project["recipeId"],mode=(string)project["mode"],status=(string)project["status"];
                bool closed=new[]{"completed","failed","cancelled","manual-completed"}.Contains(status);
                GUILayout.BeginVertical(GUI.skin.box);GUILayout.Label((string)project["name"]??(productionCatalog.Recipes.TryGetValue(recipeId,out var recipe)?(string)recipe["name"]:recipeId),sheetHeading);
                GUILayout.Label(CraftProjectStatus(status)+" · "+(project["progressHours"]??0)+" / "+(project["requiredHours"]??0)+" ч",sheetQuiet);
                foreach(JObject receipt in project["received"] as JArray??new JArray())GUILayout.Label("Получено: "+(productionCatalog.Items.TryGetValue((string)receipt["itemId"],out var received)?(string)received["name"]:(string)receipt["itemId"])+" ×"+receipt["count"],sheetQuiet);
                if(project["outcome"] is JObject legacyOutcome&&(legacyOutcome["item"]??legacyOutcome["product"]) is JObject legacyItem)GUILayout.Label("Результат: "+legacyItem["name"],sheetQuiet);
                if(project["outcome"] is JObject outcome&&outcome["total"]!=null)GUILayout.Label("Проверка: "+outcome["total"]+" против "+outcome["dc"],sheetQuiet);
                if(!closed&&MeasuredMenuButton(id==craftProjectDetail?"Скрыть управление":"Управлять проектом",brandPlain,GUILayout.MinHeight(44)))pendingCraftView=()=>{craftProjectDetail=id==craftProjectDetail?"":id;craftManualNotes=(string)project["notes"]??"";craftManualConsume=craftManualProduce=false;craftManualXp="0";};
                if(!closed&&id==craftProjectDetail)
                {
                    if(productionCatalog.Recipes.TryGetValue(recipeId,out var projectRecipe))foreach(string condition in (projectRecipe["conditions"] as JArray??new JArray()).Values<string>())
                    {bool available=craftConditions.Contains(condition);string label=(string)projectRecipe["conditionLabels"]?[condition]??condition;if(GUILayout.Toggle(available,label,GUILayout.MinHeight(40))!=available){if(available)craftConditions.Remove(condition);else craftConditions.Add(condition);craftPlanKey=null;}}
                    var context=CraftContext(hero);
                    if(status=="pending"&&craftLocalMaster&&MeasuredMenuButton("Подтвердить изготовление",brandGreen,GUILayout.MinHeight(48))){var rolls=CraftRolls();QueueCraft(h=>CommerceRules.ReviewProductionOffline(h,productionCatalog,id,true,true,context,rolls),"Решение мастера сохранено");}
                    if(status!="pending"&&MeasuredMenuButton("Продолжить работу",brandBlue,GUILayout.MinHeight(48)))Attempt(()=>{if(!decimal.TryParse(craftWorkHours.Replace(',','.'),NumberStyles.Number,CultureInfo.InvariantCulture,out var hours)||hours<=0)throw new FormatException("Укажите положительное игровое время");var rolls=CraftRolls();QueueCraft(h=>CommerceRules.ProgressProduction(h,productionCatalog,id,hours,context,rolls),"Работа учтена");});
                    if(mode=="manual")
                    {
                        GUILayout.Label("Ручной итог. Затраты и результат применяются только по вашему явному выбору.",sheetQuiet);craftManualNotes=MenuTextArea("production.manual.notes:"+id,craftManualNotes,16000,GUILayout.MinHeight(60));
                        craftManualConsume=GUILayout.Toggle(craftManualConsume,"Списать ингредиенты выбранного рецепта",GUILayout.MinHeight(40));craftManualProduce=GUILayout.Toggle(craftManualProduce,"Выдать результат выбранного рецепта",GUILayout.MinHeight(40));
                        GUILayout.Label("Опыт по решению игрока / мастера (при включённом развитии)",sheetQuiet);craftManualXp=IntegerField("production.manual.xp:"+id,craftManualXp,GUILayout.MinHeight(44));
                        if(MeasuredMenuButton("Записать ручной итог",brandGreen,GUILayout.MinHeight(48)))Attempt(()=>
                        {
                            if(!decimal.TryParse(craftManualXp,NumberStyles.None,CultureInfo.InvariantCulture,out var xp))throw new FormatException("Проверьте опыт");
                            JObject definition=productionCatalog.Recipes.TryGetValue(recipeId,out var found)?found:null;
                            if((craftManualConsume||craftManualProduce)&&(definition==null||definition["legacy"]!=null))throw new FormatException("Для старого рецепта измените предметы вручную в инвентаре. Здесь можно сохранить итог без автоматических изменений.");
                            var adjustment=new JObject{["notes"]=craftManualNotes,["experience"]=xp,["consume"]=craftManualConsume?(definition?["ingredients"]?.DeepClone()??new JArray()):new JArray(),["produce"]=craftManualProduce?(definition?["results"]?.DeepClone()??new JArray()):new JArray()};
                            decimal units=(decimal?)project["units"]??1;foreach(string field in new[]{"consume","produce"})foreach(JObject row in (JArray)adjustment[field])row["count"]=((decimal?)row["count"]??1)*units;
                            QueueCraft(h=>CommerceRules.FinishManualProduction(h,productionCatalog,id,adjustment),"Ручной итог сохранён");
                        });
                    }
                    if(MeasuredMenuButton("Отменить проект без расхода",brandPlain,GUILayout.MinHeight(44)))QueueCraft(h=>CommerceRules.CancelProduction(h,id),"Проект отменён");
                }
                GUILayout.EndVertical();
            }
            GUILayout.BeginHorizontal();if(craftProjectPage>0&&MeasuredMenuButton("← Проекты",brandPlain,GUILayout.MinHeight(44)))pendingCraftView=()=>craftProjectPage--;if((craftProjectPage+1)*12<projects.Length&&MeasuredMenuButton("Проекты →",brandPlain,GUILayout.MinHeight(44)))pendingCraftView=()=>craftProjectPage++;GUILayout.EndHorizontal();
            if(MeasuredMenuButton("Архивировать завершённые проекты",brandPlain,GUILayout.MinHeight(44)))QueueCraft(CommerceRules.ArchiveProductionProjects,"Проекты сохранены в архиве");
            if(MeasuredMenuButton(craftShowJournal?"Скрыть историю":"История изготовления",brandPlain,GUILayout.MinHeight(44)))pendingCraftView=()=>craftShowJournal=!craftShowJournal;
            if(craftShowJournal)foreach(JObject record in (state["history"] as JArray??new JArray()).OfType<JObject>().Take(20))GUILayout.Label(record["time"]+" · "+CraftProjectStatus((string)record["event"])+" · "+record["recipeId"],sheetQuiet);
        }
        private void DrawCraftMaterialReference(JObject hero)
        {
            if(MeasuredMenuButton(craftShowMaterials?"Скрыть материалы мастерской":"Материалы мастерской",brandPlain,GUILayout.MinHeight(48)))pendingCraftView=()=>craftShowMaterials=!craftShowMaterials;
            if(!craftShowMaterials)return;
            var materials=CommerceCatalog["craft"]?["materials"] as JArray??new JArray();GUILayout.Label("Добавляйте только ресурсы, полученные в игре.",sheetQuiet);
            foreach(JObject material in materials.OfType<JObject>().Skip(craftMaterialPage*20).Take(20))
                if(MeasuredMenuButton("+ "+material["name"],brandPlain,GUILayout.MinHeight(44)))
                {var item=(JObject)material.DeepClone();item["inventoryCategory"]="materials";item["craftMaterialId"]=material["id"].DeepClone();QueueCraft(h=>{CommerceRules.AddExactInventoryItem(h,item,1);return h;},"Материал добавлен");}
            GUILayout.BeginHorizontal();if(craftMaterialPage>0&&MeasuredMenuButton("← Материалы",brandPlain,GUILayout.MinHeight(44)))pendingCraftView=()=>craftMaterialPage--;if((craftMaterialPage+1)*20<materials.Count&&MeasuredMenuButton("Материалы →",brandPlain,GUILayout.MinHeight(44)))pendingCraftView=()=>craftMaterialPage++;GUILayout.EndHorizontal();
        }
        private void QueueLegacyCraft(JObject hero,JObject args)
        {
            string mode=(string)CommerceRules.ReadCraftState(hero)["mode"]??"manual";var context=CraftContext(hero);var rolls=CraftRolls();string id="project."+Guid.NewGuid().ToString("N");
            if(productionCatalog==null){status="Дождитесь подготовки ремёсел";return;}
            QueueCraft(h=>CommerceRules.StartLegacyProduction(h,productionCatalog,args,id,mode,1,context,rolls),mode=="semi"?"Ожидается решение локального мастера":"Проект сохранён");
        }
    }
}
