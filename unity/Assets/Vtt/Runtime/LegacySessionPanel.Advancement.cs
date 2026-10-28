using System;
using System.Globalization;
using System.Linq;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using UnityEngine;

namespace DndVtt.UnityPrototype
{
    public sealed partial class LegacySessionPanel
    {
        private JObject advancementCatalog;
        private JObject AdvancementCatalog=>advancementCatalog??=JObject.Parse(Resources.Load<TextAsset>("CharacterSheet/advancement").text);
        private bool advancementOpen,experienceOpen,advancementMilestone,advancementRestore,advancementNewClass;
        private string advancementSearch="";
        private string advancementHero,advancementSignature,advancementClass,advancementSubclass="",advancementFeat="",advancementFeatStat="",advancementAsi1="str",advancementAsi2="dex";
        private string experienceAmount="0",experienceTotal="0";
        private int advancementHp,advancementAsiMode;
        private readonly System.Collections.Generic.Dictionary<string,string> advancementProficiencies=new System.Collections.Generic.Dictionary<string,string>();
        private int AdvancementTotal(JObject hero)
        {try{return CharacterAdvancement.CurrentLevel(AdvancementCatalog,hero);}catch(FormatException){return CharacterSheetRules.Level(hero);}}
        private long DisplayExperience(JObject hero)
        {try{return Math.Max(0,CharacterAdvancement.CurrentExperience(hero));}catch(FormatException){return 0;}}
        private string HeroSignature(JObject hero)=>hero.ToString(Formatting.None);
        private void CloseAdvancement(){ResetFormInput();advancementOpen=experienceOpen=false;advancementHero=advancementSignature=advancementClass=null;advancementProficiencies.Clear();}
        private void BeginAdvancement(JObject hero,bool experience)
        {
            ResetFormInput();advancementHero=(string)hero["id"];advancementSignature=HeroSignature(hero);advancementClass=null;advancementOpen=true;experienceOpen=experience;
            advancementMilestone=false;advancementNewClass=false;advancementSearch="";experienceTotal=DisplayExperience(hero).ToString(CultureInfo.InvariantCulture);experienceAmount="0";frontScroll=Vector2.zero;
        }
        private void PublishAdvancement(JObject original,JObject updated)
        {
            if((string)original["id"]!=advancementHero||HeroSignature(archive.Snapshot(selected))!=advancementSignature)throw new InvalidOperationException("Лист изменился. Закройте окно и откройте снова — повышение не применено.");
            var candidate=archive.DetachedCopy();candidate.Replace(selected,updated);
            CharacterSheetStore.Save(SavePath,candidate);archive=candidate;
            advancementSignature=HeroSignature(updated);edits.Clear();status="Сохранено на устройстве";
        }
        private void DrawProgressionSummary(JObject hero)
        {
            GUILayout.BeginVertical(GUI.skin.box);SheetSection("Развитие персонажа");
            int level=AdvancementTotal(hero);long xp=DisplayExperience(hero);
            GUILayout.Label("Уровень "+level+" · опыт "+xp,sheetCharacterName);
            if(level<20){long next=(long)AdvancementCatalog["xp"][Math.Min(19,level)];GUILayout.Label(xp>=next?"Доступно повышение уровня":"До следующего уровня: "+Math.Max(0,next-xp)+" опыта",sheetQuiet);}
            else GUILayout.Label("Достигнут 20-й уровень",sheetQuiet);
            foreach(JObject cls in (hero["classes"] as JArray??new JArray()).OfType<JObject>())GUILayout.Label(cls["name"]+" · "+cls["level"]+" ур."+(string.IsNullOrEmpty((string)cls["subclass"])?"":" · "+cls["subclass"]),sheetQuiet);
            if(FitMenuButton("Опыт…"))BeginAdvancement(hero,true);
            if(level<20&&FitMenuButton("Повысить уровень…"))BeginAdvancement(hero,false);
            GUILayout.EndVertical();
        }
        private long ReadExperience(string value)
        {if(!long.TryParse(value,NumberStyles.None,CultureInfo.InvariantCulture,out long n)||n<0)throw new FormatException("Введите целое неотрицательное количество опыта");return n;}
        private void FlushAdvancementNumbers()
        {
            CompleteNumericKeyboard();
            if(numericSession.TryTake("advancement-xp-total",out string total))experienceTotal=total;
            if(numericSession.TryTake("advancement-xp-amount",out string amount))experienceAmount=amount;
        }
        private void DrawAdvancement(JObject hero)
        {
            if((string)hero["id"]!=advancementHero){CloseAdvancement();return;}
            if(FitMenuButton("← Вернуться к герою")){CloseAdvancement();return;}
            if(HeroSignature(hero)!=advancementSignature){GUILayout.Label("Лист изменился. Откройте развитие заново. Ничего не применено.");return;}
            if(experienceOpen){DrawExperience(hero);return;}
            SheetSection("Повышение уровня");
            int total=AdvancementTotal(hero);
            GUILayout.Label("Уровень "+total+" → "+(total+1),sheetCharacterName);
            bool enough=CharacterAdvancement.LevelByExperience(AdvancementCatalog,DisplayExperience(hero))>total;
            if(!enough)GUILayout.Label("По опыту повышение пока недоступно. Для игры по вехам можно подтвердить решение мастера.",sheetQuiet);
            if(FitMenuButton(advancementMilestone?"✓ По решению мастера":"По опыту · изменить на решение мастера"))advancementMilestone=!advancementMilestone;
            JArray ownedClasses=null;string classProblem=null;
            try{ownedClasses=CharacterAdvancement.Classes(hero,AdvancementCatalog);}catch(FormatException e){classProblem=e.Message;}
            if(classProblem!=null){GUILayout.Label(classProblem,sheetQuiet);return;}
            if(advancementClass==null)
            {
                GUILayout.Label("Выберите класс. Новый класс добавит мультикласс, существующий получит ещё один уровень.",sheetQuiet);
                if(FitMenuButton(advancementNewClass?"← Мои классы":"Добавить мультикласс…")){advancementNewClass=!advancementNewClass;ResetFormInput();}
                if(advancementNewClass){GUILayout.Label("Поиск класса",sheetQuiet);advancementSearch=GUILayout.TextField(advancementSearch,GUILayout.MinHeight(48));}
                var owned=ownedClasses.OfType<JObject>().Select(c=>(string)c["name"]).ToArray();
                foreach(var unknown in owned.Where(n=>CharacterAdvancement.ClassData(AdvancementCatalog,n)==null))GUILayout.Label("«"+unknown+"»: прогрессия ещё не перенесена",sheetQuiet);
                foreach(var p in ((JObject)AdvancementCatalog["classes"]).Properties().Where(p=>advancementNewClass?!owned.Contains(p.Name,StringComparer.OrdinalIgnoreCase)&&p.Name.IndexOf(advancementSearch,StringComparison.CurrentCultureIgnoreCase)>=0:owned.Contains(p.Name,StringComparer.OrdinalIgnoreCase)).OrderBy(p=>p.Name,StringComparer.CurrentCulture))
                {
                    string name=p.Name,problem=null;try{problem=CharacterAdvancement.EntryProblem(AdvancementCatalog,hero,name);}catch(FormatException e){problem=e.Message;}
                    GUILayout.BeginVertical(GUI.skin.box);
                    bool was=GUI.enabled;GUI.enabled=was&&problem==null&&(enough||advancementMilestone)&&total<20;
                    if(FitMenuButton(name+(problem==null?" · "+CharacterAdvancement.NextClassLevel(AdvancementCatalog,hero,name)+" ур.":"")))Attempt(()=>SelectAdvancementClass(hero,name));
                    GUI.enabled=was;if(problem!=null)GUILayout.Label(problem,sheetQuiet);GUILayout.EndVertical();
                }
                return;
            }
            var cls=CharacterAdvancement.ClassData(AdvancementCatalog,advancementClass);var row=CharacterAdvancement.LevelData(AdvancementCatalog,hero,advancementClass);
            int next=CharacterAdvancement.NextClassLevel(AdvancementCatalog,hero,advancementClass),die=(int)cls["hitDie"];
            GUILayout.BeginVertical(GUI.skin.box);GUILayout.Label(advancementClass+" · "+next+" ур.",sheetCharacterName);
            if(FitMenuButton("Выбрать другой класс")){ResetFormInput();advancementClass=null;GUILayout.EndVertical();return;}
            GUILayout.Label("Кость хитов d"+die+" · результат "+advancementHp+" + Телосложение",sheetQuiet);
            if(FitMenuButton("Среднее: "+(die/2+1)))advancementHp=die/2+1;
            if(FitMenuButton("Бросить d"+die))advancementHp=UnityEngine.Random.Range(1,die+1);
            if(FitMenuButton("Максимум: "+die))advancementHp=die;
            if(FitMenuButton(advancementRestore?"✓ Восстановить HP до максимума":"Сохранить полученный урон · изменить"))advancementRestore=!advancementRestore;GUILayout.EndVertical();
            var entry=CharacterAdvancement.Classes(hero,AdvancementCatalog).OfType<JObject>().FirstOrDefault(c=>string.Equals((string)c["name"],advancementClass,StringComparison.OrdinalIgnoreCase));
            var subclasses=cls["subclasses"] as JObject??new JObject();
            if(string.IsNullOrEmpty((string)entry?["subclass"])&&((bool?)row["subclassLevel"]==true||subclasses.Properties().Any(p=>(int?)p.Value["pickLevel"]<=next)))
            {
                GUILayout.BeginVertical(GUI.skin.box);SheetSection("Подкласс");
                foreach(var p in subclasses.Properties().Where(p=>(int?)p.Value["pickLevel"]<=next))
                {if(FitMenuButton((advancementSubclass==p.Name?"✓ ":"")+p.Name))advancementSubclass=p.Name;if(advancementSubclass==p.Name)GUILayout.Label((string)p.Value["description"]??"",sheetQuiet);}
                GUILayout.EndVertical();
            }
            if((bool?)row["asi"]==true)DrawAdvancementAsi(hero);
            if(entry==null)DrawAdvancementProficiencies(hero,cls);
            GUILayout.BeginVertical(GUI.skin.box);SheetSection("Новые особенности");
            foreach(var feature in row["features"] as JArray??new JArray())GUILayout.Label("• "+feature,sheetQuiet);
            GUILayout.Label("Записи способностей добавляются в лист. Автоматическое исполнение всех боевых эффектов классов ещё переносится.",sheetQuiet);GUILayout.EndVertical();
            var choices=AdvancementChoices();JObject preview=null;string error=null;
            try{preview=CharacterAdvancement.Advance(AdvancementCatalog,hero,advancementClass,choices,CreationCatalog);}catch(Exception e){error=e.Message;}
            if(preview!=null)
            {
                GUILayout.Label("После повышения: уровень "+preview["level"]+", HP "+preview["hpCurrent"]+" / "+preview["hpMax"]+". Опыт не расходуется.",sheetCharacterName);
                if(FitMenuButton("Подтвердить повышение и сохранить"))Attempt(()=>{PublishAdvancement(hero,preview);CloseAdvancement();status="Уровень повышен и сохранён";});
            }
            else GUILayout.Label(error,sheetQuiet);
            if(FitMenuButton("Отменить повышение"))CloseAdvancement();
        }
        private void SelectAdvancementClass(JObject hero,string name)
        {
            CharacterAdvancement.LevelData(AdvancementCatalog,hero,name);ResetFormInput();advancementClass=name;advancementHp=(int)CharacterAdvancement.ClassData(AdvancementCatalog,name)["hitDie"]/2+1;
            advancementSubclass=advancementFeat=advancementFeatStat="";advancementAsiMode=0;advancementAsi1="str";advancementAsi2="dex";advancementRestore=false;advancementProficiencies.Clear();frontScroll=Vector2.zero;
        }
        private JObject AdvancementChoices()
        {
            var result=new JObject{["mode"]=advancementMilestone?"milestone":"xp",["baseHp"]=advancementHp,["restoreFull"]=advancementRestore,["subclass"]=advancementSubclass,["proficiencies"]=JObject.FromObject(advancementProficiencies)};
            if(advancementAsiMode==2){result["feat"]=advancementFeat;result["featStat"]=advancementFeatStat;}
            else if(advancementAsiMode==0)result["asi"]=new JObject{[advancementAsi1]=2};
            else if(advancementAsi1!=advancementAsi2)result["asi"]=new JObject{[advancementAsi1]=1,[advancementAsi2]=1};
            return result;
        }
        private string AdvancementStat(string selected,string label)
        {GUILayout.Label(label,sheetQuiet);for(int i=0;i<6;i++)if(FitMenuButton((selected==CharacterSheetRules.Stats[i]?"✓ ":"")+CharacterSheetRules.StatNames[i]))selected=CharacterSheetRules.Stats[i];return selected;}
        private void DrawAdvancementAsi(JObject hero)
        {
            GUILayout.BeginVertical(GUI.skin.box);SheetSection("Характеристики или черта");
            foreach(var option in new[]{("+2 к характеристике",0),("+1 к двум характеристикам",1),("Выбрать черту",2)})if(FitMenuButton((advancementAsiMode==option.Item2?"✓ ":"")+option.Item1))advancementAsiMode=option.Item2;
            if(advancementAsiMode<2){advancementAsi1=AdvancementStat(advancementAsi1,"Первая характеристика");if(advancementAsiMode==1)advancementAsi2=AdvancementStat(advancementAsi2,"Вторая, отличная от первой");}
            else foreach(JObject feat in CreationCatalog["feats"] as JArray??new JArray())
            {
                string id=(string)feat["id"];if(FitMenuButton((advancementFeat==id?"✓ ":"")+((string)feat["name"]??id)))advancementFeat=id;
                if(advancementFeat==id){GUILayout.Label((string)(feat["description"]??feat["desc"])??"",sheetQuiet);if((string)feat["statBonus"]?["type"]=="choice")advancementFeatStat=AdvancementStat(advancementFeatStat,"Характеристика черты");}
            }
            GUILayout.EndVertical();
        }
        private void DrawAdvancementProficiencies(JObject hero,JObject cls)
        {
            int i=0;foreach(JObject choice in cls["multiclass"]?["choices"] as JArray??new JArray())
            {
                string key=(i++).ToString();advancementProficiencies.TryGetValue(key,out string selected);GUILayout.BeginVertical(GUI.skin.box);SheetSection((string)choice["label"]??"Новое владение");
                if((string)choice["type"]=="skill")for(int s=0;s<CharacterSheetRules.SkillIds.Length;s++)
                {string id=CharacterSheetRules.SkillIds[s];if(LegacyJson.Number(hero["skillsData"]?[id])==0&&FitMenuButton((selected==id?"✓ ":"")+CharacterSheetRules.SkillNames[s]))advancementProficiencies[key]=id;}
                else foreach(JObject p in ((JArray)AdvancementCatalog["proficiencies"]).OfType<JObject>().Where(p=>(string)p["category"]=="Музыкальные инструменты"))if(FitMenuButton((selected==(string)p["id"]?"✓ ":"")+p["name"]))advancementProficiencies[key]=(string)p["id"];
                GUILayout.EndVertical();
            }
        }
        private void DrawExperience(JObject hero)
        {
            SheetSection("Опыт персонажа");int level=AdvancementTotal(hero);long current=DisplayExperience(hero);
            GUILayout.Label("Уровень "+level+" · "+current+" опыта",sheetCharacterName);
            if(level<20)GUILayout.Label("Следующий уровень: "+AdvancementCatalog["xp"][Math.Min(19,level)]+" опыта",sheetQuiet);
            GUILayout.Label("Всего опыта");experienceTotal=IntegerField("advancement-xp-total",experienceTotal,GUILayout.MinHeight(50));
            if(FitMenuButton("Установить опыт"))Attempt(()=>{FlushAdvancementNumbers();var next=CharacterAdvancement.Experience(hero,ReadExperience(experienceTotal),"set");PublishAdvancement(hero,next);});
            GUILayout.Label("Количество для начисления / списания");experienceAmount=IntegerField("advancement-xp-amount",experienceAmount,GUILayout.MinHeight(50));
            foreach(string action in new[]{"add","sub"})if(FitMenuButton(action=="add"?"Добавить опыт":"Вычесть опыт"))Attempt(()=>
            {
                FlushAdvancementNumbers();var next=CharacterAdvancement.Experience(hero,ReadExperience(experienceAmount),action);PublishAdvancement(hero,next);experienceTotal=CharacterAdvancement.CurrentExperience(next).ToString();experienceAmount="0";
            });
            GUILayout.Label("Опыт не повышает и не понижает класс автоматически. Каждое повышение подтверждается отдельно.",sheetQuiet);
            if(level<20&&CharacterAdvancement.LevelByExperience(AdvancementCatalog,current)>level&&FitMenuButton("Повысить уровень…")){ResetFormInput();experienceOpen=false;advancementMilestone=false;frontScroll=Vector2.zero;}
        }
    }
}
