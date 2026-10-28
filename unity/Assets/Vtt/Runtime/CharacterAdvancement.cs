using System;
using System.Globalization;
using System.Linq;
using System.Text.RegularExpressions;
using Newtonsoft.Json.Linq;

namespace DndVtt.UnityPrototype
{
    // One-level, detached transactions over the existing legacy character document.
    // Tables are exported from reviewed local WebView sources; no executable mods/JS.
    public static class CharacterAdvancement
    {
        static readonly string[] LongStats={"strength","dexterity","constitution","intelligence","wisdom","charisma"};
        static readonly string[] Extra={"Рой","Паразит","Паразит доктора Вальтера","Призрак"};
        static long Integer(JToken value,long fallback=0)
        {
            if(value==null||value.Type==JTokenType.Null)return fallback;
            if(!long.TryParse(value.ToString(),NumberStyles.Integer,CultureInfo.InvariantCulture,out long n))throw new FormatException("Введите целое число");return n;
        }
        public static long CurrentExperience(JObject hero)=>Integer(hero["exp"]??hero["experience"]);
        public static int LevelByExperience(JObject data,long xp)
        {if(xp<0)throw new FormatException("Опыт не может быть отрицательным");var table=(JArray)data["xp"];for(int i=table.Count-1;i>=0;i--)if(xp>=Integer(table[i]))return i+1;return 1;}
        public static JObject Experience(JObject source,long amount,string action)
        {
            if(amount<0)throw new FormatException("Опыт не может быть отрицательным");
            long current=action=="set"?0:CurrentExperience(source),next;
            checked {if(action=="set")next=amount;else if(action=="add")next=current+amount;else if(action=="sub")next=amount>current?0:current-amount;else throw new FormatException("Неизвестная операция опыта");}
            // Match JavaScript's exact integer range for portable exports/cloud.
            if(next>9007199254740991L)throw new FormatException("Слишком большое значение опыта");
            var result=(JObject)source.DeepClone();result["exp"]=next;return result;
        }
        public static int Score(JObject hero,string stat)
        {
            int index=Array.IndexOf(CharacterSheetRules.Stats,stat);if(index<0)index=Array.IndexOf(LongStats,stat);
            if(index<0)throw new FormatException("Неизвестная характеристика");
            var stats=hero["stats"] as JObject;return checked((int)Integer(stats?[CharacterSheetRules.Stats[index]]??stats?[LongStats[index]],10));
        }
        static int Modifier(JObject hero,string stat)=>(int)Math.Floor((Score(hero,stat)-10)/2d);
        static string Key(string value)=>Regex.Replace(value??"",@"\s+"," ").Trim().ToLowerInvariant();
        public static JObject ClassData(JObject data,string name)=>((JObject)data["classes"]).Properties().FirstOrDefault(p=>Key(p.Name)==Key(name))?.Value as JObject;
        static string Canonical(JObject data,string name)=>((JObject)data["classes"]).Properties().FirstOrDefault(p=>Key(p.Name)==Key(name))?.Name;
        public static JArray Classes(JObject hero,JObject data)
        {
            if(hero["classes"] is JArray existing && existing.Count>0)return (JArray)existing.DeepClone();
            string raw=(string)(hero["className"]??hero["class"]),name=Canonical(data,raw);
            if(name==null && raw!=null)
            {
                // Accept a single legacy "Воин 3" label; never guess a formatted multiclass.
                string plain=Regex.Replace(raw,@"\s*\d+\s*(ур\.?|уровень)?\s*$","",RegexOptions.IgnoreCase).Trim();name=Canonical(data,plain);
            }
            if(name==null)throw new FormatException("Не удалось распознать исходный класс. Проверьте импортированный лист.");
            return new JArray(new JObject{["name"]=name,["level"]=CharacterSheetRules.Level(hero),["subclass"]=hero["subclass"]?.DeepClone()});
        }
        public static string EntryProblem(JObject data,JObject hero,string name)
        {
            var cls=ClassData(data,name);if(cls==null)return "Прогрессия класса «"+name+"» ещё не перенесена";
            if((bool?)hero["isExtraClass"]==true||Extra.Contains((string)hero["class"])||!string.IsNullOrEmpty((string)hero["extraClassType"]))return "Extra-персонажи требуют отдельного переноса механик; автоматическое повышение пока недоступно";
            JArray owned;try{owned=Classes(hero,data);}catch(FormatException e){return e.Message;}
            if(owned.Any(c=>!(c is JObject)))return "Некорректный формат списка классов";
            if(owned.OfType<JObject>().Any(c=>ClassData(data,(string)c["name"])==null))return "В листе есть класс без перенесённой прогрессии. Автоматическое повышение недоступно";
            if(owned.OfType<JObject>().Any(c=>Extra.Contains((string)c["name"])))return "Extra-классы нельзя смешивать с обычными";
            if(owned.OfType<JObject>().Any(c=>Key((string)c["name"])==Key(name)))return null;
            if(Extra.Contains(name)||(bool?)cls["multiclassAllowed"]==false)return "Класс нельзя взять мультиклассом";
            var req=cls["requirements"] as JObject??new JObject();
            if(!req.Properties().Any())return "Требования мультикласса для «"+name+"» ещё не перенесены";
            bool ok;
            if(name=="Воин")ok=Score(hero,"str")>=13||Score(hero,"dex")>=13;
            else if(name=="Кровавый охотник")ok=Score(hero,"int")>=13&&(Score(hero,"str")>=13||Score(hero,"dex")>=13);
            else ok=req.Properties().All(p=>Requirement(hero,p.Name,Integer(p.Value)));
            if(ok)return null;
            string needed=name=="Воин"?"Сила или Ловкость ≥ 13":name=="Кровавый охотник"?"Интеллект ≥ 13 и Сила или Ловкость ≥ 13":string.Join(", ",req.Properties().Select(p=>StatName(p.Name)+" ≥ "+p.Value));
            return "Для мультикласса нужно: "+needed;
        }
        static bool Requirement(JObject hero,string key,long minimum)
        {return Regex.Split(key,"Or").Any(part=>Score(hero,char.ToLowerInvariant(part[0])+part.Substring(1))>=minimum);}
        static string StatName(string key){if(key.Contains("Or"))return string.Join(" или ",Regex.Split(key,"Or").Select(p=>StatName(char.ToLowerInvariant(p[0])+p.Substring(1))));int i=Array.IndexOf(LongStats,key);if(i<0)i=Array.IndexOf(CharacterSheetRules.Stats,key);return i>=0?CharacterSheetRules.StatNames[i]:key;}
        public static int NextClassLevel(JObject data,JObject hero,string name)=>checked((int)Integer(Classes(hero,data).OfType<JObject>().FirstOrDefault(c=>Key((string)c["name"])==Key(name))?["level"])+1);
        public static JObject LevelData(JObject data,JObject hero,string name)
        {int level=NextClassLevel(data,hero,name);return ClassData(data,name)?["levels"]?[level.ToString()] as JObject??throw new FormatException("Нет данных уровня "+level+" для «"+name+"»");}
        static void Feature(JObject hero,JToken feature)
        {var list=CharacterSheetRules.Array(hero,"features");if(!list.Any(x=>JToken.DeepEquals(x,feature)))list.Add(feature.DeepClone());}
        public static void ApplyLevelFeatures(JObject data,JObject hero,string name,int level)
        {
            var row=ClassData(data,name)?["levels"]?[level.ToString()] as JObject??throw new FormatException("Нет данных прогрессии");
            foreach(var f in row["features"] as JArray??new JArray())Feature(hero,f);
            foreach(string key in new[]{"sneakAttackDice","ragesCount","rageDamageBonus","kiPoints","sorceryPoints"})if(row[key]!=null)hero[key]=row[key].DeepClone();
        }
        static void SetScore(JObject hero,string stat,int score)
        {
            int index=Array.IndexOf(CharacterSheetRules.Stats,stat);if(index<0)throw new FormatException("Неизвестная характеристика ASI");
            var stats=CharacterSheetRules.Object(hero,"stats");stats[stat]=score;if(stats[LongStats[index]]!=null)stats[LongStats[index]]=score;
            if(hero["abilities"] is JObject a){if(a[stat]!=null)a[stat]=score;if(a[LongStats[index]]!=null)a[LongStats[index]]=score;}
            if(hero["abilityScores"] is JObject b){if(b[stat]!=null)b[stat]=score;if(b[LongStats[index]]!=null)b[LongStats[index]]=score;}
        }
        static void Proficiency(JObject data,JObject hero,string id)
        {
            var list=CharacterSheetRules.Array(hero,"proficiencies");if(list.Any(x=>x is JObject&&(string)x["id"]==id))return;
            list.Add(((JArray)data["proficiencies"]).OfType<JObject>().FirstOrDefault(x=>(string)x["id"]==id)?.DeepClone()??new JObject{["id"]=id,["name"]=id,["category"]="Мультикласс"});
        }
        public static JObject Advance(JObject data,JObject source,string requested,JObject choices,JObject creation=null)
        {
            string name=Canonical(data,requested)??requested;string issue=EntryProblem(data,source,name);if(issue!=null)throw new FormatException(issue);
            var hero=(JObject)source.DeepClone();var classes=Classes(hero,data);hero["classes"]=classes;
            // The existing feat/derived-value implementation consumes short Builder stat keys.
            // Normalize a detached copy only and keep all original long aliases in sync.
            foreach(string stat in CharacterSheetRules.Stats)SetScore(hero,stat,Score(source,stat));
            foreach(var c in classes){if(!(c is JObject)||Integer(c["level"])<1||Integer(c["level"])>20)throw new FormatException("Некорректный уровень класса");}
            if(classes.OfType<JObject>().GroupBy(c=>Key((string)c["name"])).Any(g=>g.Count()>1))throw new FormatException("В листе повторяется один класс");
            int total=CharacterSheetRules.Level(hero);if(total>=20)throw new FormatException("Достигнут максимальный уровень 20");
            string mode=(string)choices["mode"];if(mode!="xp"&&mode!="milestone")throw new FormatException("Выберите опыт или решение мастера");
            if(mode=="xp"&&LevelByExperience(data,CurrentExperience(hero))<=total)throw new FormatException("Недостаточно опыта для следующего уровня");
            var cls=ClassData(data,name);int next=NextClassLevel(data,hero,name);var row=LevelData(data,hero,name);
            int die=checked((int)Integer(cls["hitDie"])),baseHp=checked((int)Integer(choices["baseHp"]));
            if(!new[]{6,8,10,12}.Contains(die)||baseHp<1||baseHp>die)throw new FormatException("Некорректный результат кости хитов");
            var entry=classes.OfType<JObject>().FirstOrDefault(c=>Key((string)c["name"])==Key(name));bool isNew=entry==null;
            if(isNew){entry=new JObject{["name"]=name,["level"]=1,["subclass"]=null};classes.Add(entry);}else entry["level"]=next;
            int oldCon=Modifier(hero,"con");
            if((bool?)row["asi"]==true)
            {
                if(choices["asi"] is JObject asi)
                {
                    var props=asi.Properties().ToArray();int[] values=props.Select(p=>checked((int)Integer(p.Value))).ToArray();
                    if(props.Length<1||props.Length>2||values.Sum()!=2||values.Any(v=>v<1||v>2))throw new FormatException("ASI: +2 к одной или +1 к двум разным характеристикам");
                    foreach(var p in props){if(!CharacterSheetRules.Stats.Contains(p.Name)||Score(hero,p.Name)+Integer(p.Value)>20)throw new FormatException("ASI не может поднять характеристику выше 20");SetScore(hero,p.Name,Score(hero,p.Name)+(int)Integer(p.Value));}
                }
                else if(!string.IsNullOrEmpty((string)choices["feat"]))
                {
                    var feat=(creation?["feats"] as JArray)?.OfType<JObject>().FirstOrDefault(f=>(string)f["id"]==(string)choices["feat"])??throw new FormatException("Черта не установлена");
                    if((hero["feats"] as JArray??new JArray()).Any(f=>f.Type==JTokenType.String&&(Key((string)f)==Key((string)feat["id"])||Key((string)f)==Key((string)feat["name"]))))throw new FormatException("Черта уже выбрана");
                    // AddFeat owns the existing Builder feat contract/effects and object duplicate checks.
                    CharacterCreation.AddFeat(hero,feat,(string)choices["featStat"]);foreach(string stat in CharacterSheetRules.Stats)SetScore(hero,stat,Score(hero,stat));Feature(hero,feat["name"]??feat["id"]);
                }
                else throw new FormatException("Выберите ASI или черту");
            }
            var subclasses=cls["subclasses"] as JObject??new JObject();
            bool subclassDue=(bool?)row["subclassLevel"]==true||subclasses.Properties().Any(p=>Integer(p.Value["pickLevel"],99)<=next);
            if(string.IsNullOrWhiteSpace((string)entry["subclass"])&&subclassDue)
            {
                string sub=(string)choices["subclass"];var selected=sub==null?null:subclasses[sub] as JObject;
                if(selected==null||Integer(selected["pickLevel"],next)>next)throw new FormatException("Выберите доступный подкласс");entry["subclass"]=sub;
            }
            string selectedSub=(string)entry["subclass"];
            // Unknown imported subclass must not silently lose its level features.
            if(!string.IsNullOrEmpty(selectedSub)&&subclasses[selectedSub]==null)throw new FormatException("Прогрессия подкласса «"+selectedSub+"» ещё не перенесена");
            if(isNew)
            {
                foreach(string id in (cls["multiclass"]?["fixed"] as JArray??new JArray()).Values<string>())Proficiency(data,hero,id);
                int i=0;foreach(JObject choice in cls["multiclass"]?["choices"] as JArray??new JArray())
                {
                    string value=(string)choices["proficiencies"]?[i.ToString()];if(string.IsNullOrEmpty(value))throw new FormatException("Выберите владение: "+choice["label"]);
                    if((string)choice["type"]=="skill")
                    {
                        if(!CharacterSheetRules.SkillIds.Contains(value)||Integer(hero["skillsData"]?[value])>0)throw new FormatException("Выберите новый навык");
                        CharacterSheetRules.Object(hero,"skillsData")[value]=1;CharacterSheetRules.Object(hero,"skills")[value]="proficient";
                        Proficiency(data,hero,"skill_"+value);
                    }
                    else if((string)choice["type"]=="instrument")
                    {
                        if(!((JArray)data["proficiencies"]).OfType<JObject>().Any(p=>(string)p["id"]==value&&(string)p["category"]=="Музыкальные инструменты"))throw new FormatException("Выберите музыкальный инструмент");Proficiency(data,hero,value);
                    }
                    else throw new FormatException("Неподдерживаемый выбор владения");i++;
                }
            }
            ApplyLevelFeatures(data,hero,name,next);
            if(!string.IsNullOrEmpty(selectedSub))for(int level=1;level<=next;level++)
            {
                var subLevel=subclasses[selectedSub]?["levels"]?[level.ToString()];
                var features=subLevel as JArray??(subLevel as JObject)?["features"] as JArray??new JArray();
                foreach(var f in features)Feature(hero,f);
            }
            int gain=Math.Max(1,baseHp+Modifier(hero,"con"))+(Modifier(hero,"con")-oldCon)*total;
            // Reuse the archive's established alias resolution (including scalar hp/hitPoints).
            var health=new LegacyCharacterArchive(hero.ToString());
            long max=checked((long)health.MaximumHp(0)),current=checked((long)health.CurrentHp(0));
            max=checked(max+gain);current=(bool?)choices["restoreFull"]==true?max:Math.Min(max,checked(current+gain));
            hero["hpMax"]=max;hero["hpCurrent"]=current;
            if(hero["maxHp"]!=null)hero["maxHp"]=max;if(hero["currentHP"]!=null)hero["currentHP"]=current;
            foreach(string field in new[]{"hp","hitPoints"})
            {if(hero[field] is JObject hp){hp["max"]=max;hp["current"]=current;}else if(hero[field]!=null)hero[field]=current;}
            hero["level"]=total+1;
            hero["class"]=hero["className"]=(total+1)+" уровень\n"+string.Join("\n",classes.OfType<JObject>().Select(c=>c["level"]+" ур. "+c["name"]+(string.IsNullOrEmpty((string)c["subclass"])?"":" ("+c["subclass"]+")")));
            hero["hitDice"]=string.Join(" + ",classes.OfType<JObject>().GroupBy(c=>Integer(ClassData(data,(string)c["name"])?["hitDie"],0)).Where(g=>g.Key>0).Select(g=>g.Sum(c=>(int)Integer(c["level"]))+"d"+g.Key));
            RebuildSpellSlots(data,hero);CharacterSheetRules.SynchronizeClassLevel(hero);return hero;
        }
        public static void RebuildSpellSlots(JObject data,JObject hero)
        {
            int caster=0,pact=0,bloodPact=0;var classes=(JArray)hero["classes"];
            foreach(JObject c in classes)
            {
                string name=Canonical(data,(string)c["name"])??(string)c["name"],sub=((string)c["subclass"]??"").ToLowerInvariant();int n=(int)Integer(c["level"]);
                if(new[]{"Бард","Волшебник","Жрец","Друид","Чародей"}.Contains(name))caster+=n;
                else if(name=="Изобретатель")caster+=(n+1)/2;
                else if(name=="Паладин"||name=="Следопыт")caster+=n/2;
                else if((name=="Воин"||name=="Плут")&&Regex.IsMatch(sub,"мистич|eldritch|arcane trickster|трикстер"))caster+=n/3;
                if(name=="Колдун")pact+=n;
                if(name=="Кровавый охотник"&&n>=3&&Regex.IsMatch(sub,"profane|оскверн"))bloodPact=n;
                string ability=(string)ClassData(data,name)?["spellAbility"];
                if(ability!=null){var sources=CharacterSheetRules.Array(hero,"spellcastingSources");if(!sources.Any(s=>(string)s["className"]==name))sources.Add(new JObject{["className"]=name,["ability"]=ability});if(hero["spellStat"]==null)hero["spellStat"]=ability;}
            }
            var slots=CharacterSheetRules.Object(hero,"spellSlotsData");
            for(int i=1;i<=9;i++){string key=i.ToString();var slot=CharacterSheetRules.Object(slots,key);int max=(int)Integer(data["slots"]?[Math.Min(20,caster).ToString()]?[key]);slot["max"]=max;slot["used"]=Math.Min(max,Integer(slot["used"]));}
            if(pact>0||bloodPact>0){var p=pact>0?data["pact"][Math.Min(20,pact+bloodPact/3).ToString()]:new JObject{["count"]=bloodPact>=6?2:1,["level"]=bloodPact>=19?4:bloodPact>=13?3:bloodPact>=7?2:1};long used=Integer(hero["pactMagicData"]?["used"]??hero["pactMagic"]?["used"]);foreach(string field in new[]{"pactMagicData","pactMagic"}){var target=CharacterSheetRules.Object(hero,field);target["max"]=p["count"].DeepClone();target["slotLevel"]=p["level"].DeepClone();target["used"]=Math.Min(used,Integer(p["count"]));}}
        }
    }
}
