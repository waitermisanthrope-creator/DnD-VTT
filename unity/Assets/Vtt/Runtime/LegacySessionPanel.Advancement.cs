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
            advancementMilestone=false;advancementNewClass=false;advancementSearch="";advancementFeatSearch="";advancementClassPage=advancementFeatPage=0;experienceTotal=DisplayExperience(hero).ToString(CultureInfo.InvariantCulture);experienceAmount="0";frontScroll=Vector2.zero;
        }
        private void PublishAdvancement(JObject original,JObject updated)
        {
            if((string)original["id"]!=advancementHero||HeroSignature(archive.Snapshot(selected))!=advancementSignature)throw new InvalidOperationException("Лист изменился. Закройте окно и откройте снова — повышение не применено.");
            var candidate=archive.DetachedCopy();candidate.Replace(selected,updated);
            CharacterSheetStore.Save(SavePath,candidate);archive=candidate;
            advancementSignature=HeroSignature(updated);edits.Clear();status="Сохранено на устройстве";
        }
        private long ReadExperience(string value)
        {if(!long.TryParse(value,NumberStyles.None,CultureInfo.InvariantCulture,out long n)||n<0)throw new FormatException("Введите целое неотрицательное количество опыта");return n;}
        private void FlushAdvancementNumbers()
        {
            CompleteNumericKeyboard();
            if(numericSession.TryTake("advancement-xp-total",out string total))experienceTotal=total;
            if(numericSession.TryTake("advancement-xp-amount",out string amount))experienceAmount=amount;
        }
        private bool GrimoireAdvancementButton(string label)
        {
            return MeasuredMenuButton(label, uiStyles.HeroSecondaryButton,
                GUILayout.MinHeight(UiTheme.TouchHeight));
        }

        private void DrawAdvancement(JObject hero)
        {
            if((string)hero["id"]!=advancementHero){CloseAdvancement();return;}
            PrepareGrimoireHeroStyles();
            if(MeasuredMenuButton("← Вернуться к герою",uiStyles.HeroSecondaryButton,GUILayout.MinHeight(UiTheme.TouchHeight))){CloseAdvancement();return;}
            if(HeroSignature(hero)!=advancementSignature){GUILayout.Label("Лист изменился. Откройте развитие заново. Ничего не применено.");return;}
            if(experienceOpen){DrawExperience(hero);return;}
            GrimoireAdvancementOverview(hero);
            GrimoireSection("ПОВЫШЕНИЕ УРОВНЯ");
            int total=AdvancementTotal(hero);
            GUILayout.Label("Уровень "+total+" → "+(total+1),uiStyles.HeroSubtitle);
            bool enough=CharacterAdvancement.LevelByExperience(AdvancementCatalog,DisplayExperience(hero))>total;
            if(!enough)GUILayout.Label("По опыту повышение пока недоступно. Для игры по вехам можно подтвердить решение мастера.",sheetQuiet);
            if(MeasuredMenuButton(advancementMilestone?"✓ По решению мастера":"По опыту · изменить на решение мастера",uiStyles.HeroSecondaryButton,GUILayout.MinHeight(UiTheme.TouchHeight)))advancementMilestone=!advancementMilestone;
            JArray ownedClasses=null;string classProblem=null;
            try{ownedClasses=CharacterAdvancement.Classes(hero,AdvancementCatalog);}catch(FormatException e){classProblem=e.Message;}
            if(classProblem!=null){GUILayout.Label(classProblem,sheetQuiet);return;}
            if(advancementClass==null)
            {
                GrimoireChooseAdvancementClass(hero,ownedClasses,total,enough);
                return;
            }
            var cls=CharacterAdvancement.ClassData(AdvancementCatalog,advancementClass);var row=CharacterAdvancement.LevelData(AdvancementCatalog,hero,advancementClass);
            int next=CharacterAdvancement.NextClassLevel(AdvancementCatalog,hero,advancementClass),die=(int)cls["hitDie"];
            GUILayout.BeginVertical(uiStyles.HeroPanel);GUILayout.Label(advancementClass+" · "+next+" ур.",sheetCharacterName);
            if(GrimoireAdvancementButton("Выбрать другой класс")){ResetFormInput();advancementClass=null;GUILayout.EndVertical();return;}
            GUILayout.Label("Кость хитов d"+die+" · результат "+advancementHp+" + Телосложение",sheetQuiet);
            GUILayout.BeginHorizontal();
            if(MeasuredMenuButton("Среднее: "+(die/2+1),uiStyles.HeroSecondaryButton,GUILayout.ExpandWidth(true),GUILayout.MinHeight(UiTheme.TouchHeight)))advancementHp=die/2+1;
            if(MeasuredMenuButton("Бросить d"+die,uiStyles.HeroSecondaryButton,GUILayout.ExpandWidth(true),GUILayout.MinHeight(UiTheme.TouchHeight)))advancementHp=UnityEngine.Random.Range(1,die+1);
            if(MeasuredMenuButton("Максимум: "+die,uiStyles.HeroSecondaryButton,GUILayout.ExpandWidth(true),GUILayout.MinHeight(UiTheme.TouchHeight)))advancementHp=die;
            GUILayout.EndHorizontal();
            if(GrimoireAdvancementButton(advancementRestore?"✓ Восстановить HP до максимума":"Сохранить полученный урон · изменить"))advancementRestore=!advancementRestore;GUILayout.EndVertical();
            var entry=CharacterAdvancement.Classes(hero,AdvancementCatalog).OfType<JObject>().FirstOrDefault(c=>string.Equals((string)c["name"],advancementClass,StringComparison.OrdinalIgnoreCase));
            var subclasses=cls["subclasses"] as JObject??new JObject();
            if(string.IsNullOrEmpty((string)entry?["subclass"])&&((bool?)row["subclassLevel"]==true||subclasses.Properties().Any(p=>(int?)p.Value["pickLevel"]<=next)))
            {
                GUILayout.BeginVertical(uiStyles.HeroPanel);SheetSection("Подкласс");
                foreach(var p in subclasses.Properties().Where(p=>(int?)p.Value["pickLevel"]<=next))
                {if(GrimoireAdvancementButton((advancementSubclass==p.Name?"✓ ":"")+p.Name))advancementSubclass=p.Name;if(advancementSubclass==p.Name)GUILayout.Label((string)p.Value["description"]??"",sheetQuiet);}
                GUILayout.EndVertical();
            }
            if((bool?)row["asi"]==true)DrawAdvancementAsi(hero);
            if(entry==null)DrawAdvancementProficiencies(hero,cls);
            GUILayout.BeginVertical(uiStyles.HeroPanel);
            int featureCount=(row["features"] as JArray)?.Count??0;
            if(SheetFold("adv-features:"+hero["id"],"Новые особенности ("+featureCount+")"))
            {
                foreach(var feature in row["features"] as JArray??new JArray())GUILayout.Label("• "+feature,uiStyles.HeroSubtitle);
                GUILayout.Label("Записи добавляются в лист. Некоторые эффекты требуют ручного применения.",uiStyles.HeroSubtitle);
            }
            GUILayout.EndVertical();
            var choices=AdvancementChoices();JObject preview=null;string error=null;
            try{preview=CharacterAdvancement.Advance(AdvancementCatalog,hero,advancementClass,choices,CreationCatalog);}catch(Exception e){error=e.Message;}
            if(preview!=null)
            {
                GUILayout.Label("После повышения: уровень "+preview["level"]+", HP "+preview["hpCurrent"]+" / "+preview["hpMax"]+". Опыт не расходуется.",sheetCharacterName);
                if(GrimoireAdvancementButton("Подтвердить повышение и сохранить"))Attempt(()=>{PublishAdvancement(hero,preview);CloseAdvancement();status="Уровень повышен и сохранён";});
            }
            else GUILayout.Label(error,sheetQuiet);
            if(GrimoireAdvancementButton("Отменить повышение"))CloseAdvancement();
        }
        private void SelectAdvancementClass(JObject hero,string name)
        {
            CharacterAdvancement.LevelData(AdvancementCatalog,hero,name);ResetFormInput();advancementClass=name;advancementHp=(int)CharacterAdvancement.ClassData(AdvancementCatalog,name)["hitDie"]/2+1;
            advancementSubclass=advancementFeat=advancementFeatStat="";advancementAsiMode=0;advancementAsi1="str";advancementAsi2="dex";advancementRestore=false;advancementProficiencies.Clear();advancementFeatSearch="";advancementFeatPage=0;frontScroll=Vector2.zero;
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
        {
            GUILayout.Label(label,uiStyles.HeroSubtitle);
            for(int i=0;i<6;i++)
            {
                if(i%2==0)GUILayout.BeginHorizontal();
                string stat=CharacterSheetRules.Stats[i];
                if(MeasuredMenuButton((selected==stat?"✓ ":"")+CharacterSheetRules.StatNames[i],
                    selected==stat?uiStyles.HeroSelectedButton:uiStyles.HeroSecondaryButton,
                    GUILayout.ExpandWidth(true),GUILayout.MinHeight(UiTheme.TouchHeight)))selected=stat;
                if(i%2==1)GUILayout.EndHorizontal();
            }
            return selected;
        }
        private void DrawAdvancementAsi(JObject hero)
        {
            GUILayout.BeginVertical(uiStyles.HeroPanel);SheetSection("Характеристики или черта");
            GUILayout.BeginHorizontal();
            foreach(var option in new[]{("+2 одной",0),("+1 двум",1),("Черта",2)})
                if(MeasuredMenuButton((advancementAsiMode==option.Item2?"✓ ":"")+option.Item1,
                    advancementAsiMode==option.Item2?uiStyles.HeroSelectedButton:uiStyles.HeroSecondaryButton,
                    GUILayout.ExpandWidth(true),GUILayout.MinHeight(UiTheme.TouchHeight)))advancementAsiMode=option.Item2;
            GUILayout.EndHorizontal();
            if(advancementAsiMode<2){advancementAsi1=AdvancementStat(advancementAsi1,"Первая характеристика");if(advancementAsiMode==1)advancementAsi2=AdvancementStat(advancementAsi2,"Вторая, отличная от первой");}
            else GrimoireAdvancementFeatPicker();
            GUILayout.EndVertical();
        }
        private void DrawAdvancementProficiencies(JObject hero,JObject cls)
        {
            int i=0;foreach(JObject choice in cls["multiclass"]?["choices"] as JArray??new JArray())
            {
                string key=(i++).ToString();advancementProficiencies.TryGetValue(key,out string selected);GUILayout.BeginVertical(uiStyles.HeroPanel);SheetSection((string)choice["label"]??"Новое владение");
                if((string)choice["type"]=="skill")for(int s=0;s<CharacterSheetRules.SkillIds.Length;s++)
                {string id=CharacterSheetRules.SkillIds[s];if(LegacyJson.Number(hero["skillsData"]?[id])==0&&GrimoireAdvancementButton((selected==id?"✓ ":"")+CharacterSheetRules.SkillNames[s]))advancementProficiencies[key]=id;}
                else foreach(JObject p in ((JArray)AdvancementCatalog["proficiencies"]).OfType<JObject>().Where(p=>(string)p["category"]=="Музыкальные инструменты"))if(GrimoireAdvancementButton((selected==(string)p["id"]?"✓ ":"")+p["name"]))advancementProficiencies[key]=(string)p["id"];
                GUILayout.EndVertical();
            }
        }
        private void DrawExperience(JObject hero)
        {
            GrimoireAdvancementOverview(hero);
            int level = AdvancementTotal(hero);
            GUILayout.BeginVertical(uiStyles.HeroPanel);
            GUILayout.Label("Опыт не повышает класс автоматически: каждое повышение подтверждается отдельно.",
                uiStyles.HeroSubtitle);
            if (level < 20 && MeasuredMenuButton("↑ Повысить уровень…", uiStyles.HeroActionButton,
                GUILayout.MinHeight(UiTheme.TouchHeight)))
            {
                ResetFormInput(); experienceOpen = false; advancementMilestone = false;
                frontScroll = Vector2.zero;
            }
            GUILayout.EndVertical();

            if (SheetFold("adv-xp-set:" + hero["id"], "Изменить общий опыт"))
            {
                GUILayout.BeginVertical(uiStyles.HeroPanel);
                GUILayout.Label("Всего опыта", uiStyles.HeroSubtitle);
                experienceTotal = IntegerField("advancement-xp-total", experienceTotal,
                    GUILayout.MinHeight(UiTheme.TouchHeight));
                if (MeasuredMenuButton("Установить опыт", uiStyles.HeroActionButton,
                    GUILayout.MinHeight(UiTheme.TouchHeight)))
                    Attempt(() => { FlushAdvancementNumbers(); var next = CharacterAdvancement.Experience(hero,
                        ReadExperience(experienceTotal), "set"); PublishAdvancement(hero, next);
                        experienceTotal = CharacterAdvancement.CurrentExperience(next).ToString(); });
                GUILayout.EndVertical();
            }
            if (SheetFold("adv-xp-delta:" + hero["id"], "Начислить или списать опыт"))
            {
                GUILayout.BeginVertical(uiStyles.HeroPanel);
                GUILayout.Label("Количество опыта", uiStyles.HeroSubtitle);
                experienceAmount = IntegerField("advancement-xp-amount", experienceAmount,
                    GUILayout.MinHeight(UiTheme.TouchHeight));
                GUILayout.BeginHorizontal();
                foreach (string action in new[] { "add", "sub" })
                    if (MeasuredMenuButton(action == "add" ? "+ Добавить" : "− Списать",
                        uiStyles.HeroSecondaryButton, GUILayout.ExpandWidth(true),
                        GUILayout.MinHeight(UiTheme.TouchHeight)))
                        Attempt(() =>
                        {
                            FlushAdvancementNumbers();
                            var next = CharacterAdvancement.Experience(hero, ReadExperience(experienceAmount), action);
                            PublishAdvancement(hero, next);
                            experienceTotal = CharacterAdvancement.CurrentExperience(next).ToString();
                            experienceAmount = "0";
                        });
                GUILayout.EndHorizontal();
                GUILayout.EndVertical();
            }
        }
    }
}
