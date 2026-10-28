using System;
using System.Linq;
using System.Globalization;
using Newtonsoft.Json.Linq;

namespace DndVtt.UnityPrototype
{
    public static partial class CharacterSheetRules
    {
        public static bool TrySheetCount(JToken token,out int count)
        {
            count=0;
            if(token==null||token.Type==JTokenType.Null)return true;
            if(token.Type!=JTokenType.Integer&&token.Type!=JTokenType.Float&&token.Type!=JTokenType.String)return false;
            if(!decimal.TryParse(token.ToString(),NumberStyles.Float,CultureInfo.InvariantCulture,out decimal n)||n<0||n>int.MaxValue||n!=decimal.Truncate(n))return false;
            count=(int)n;return true;
        }
        static int ActionCount(JToken token,int fallback=0)
        {
            if(token==null||token.Type==JTokenType.Null)return fallback;
            if(!TrySheetCount(token,out int count))throw new FormatException("Счётчик должен быть целым неотрицательным числом");
            return count;
        }
        static void WriteHealth(JObject hero,int current,int maximum,int temporary)
        {
            hero["hpCurrent"]=current;hero["hpMax"]=maximum;hero["hpTemp"]=temporary;
            if(hero["currentHP"]!=null)hero["currentHP"]=current;if(hero["maxHp"]!=null)hero["maxHp"]=maximum;if(hero["tempHp"]!=null)hero["tempHp"]=temporary;
            foreach(string key in new[]{"hp","hitPoints"})if(hero[key] is JObject hp){hp["current"]=current;hp["max"]=maximum;hp["temp"]=temporary;}else if(hero[key]!=null)hero[key]=current;
        }
        public static void ChangeHealth(JObject hero,int amount,bool heal)
        {
            if(amount<0)throw new FormatException("Введите положительное количество HP");
            if(!string.IsNullOrEmpty((string)hero["extraClassType"]))throw new FormatException("Для этого тела нужны особые правила изменения здоровья");
            if(heal&&(bool?)hero["dead"]==true)throw new FormatException("Лечение не воскрешает погибшего персонажа");
            var archive=new LegacyCharacterArchive(hero.ToString());int current=ActionCount(archive.CurrentHp(0)),max=ActionCount(archive.MaximumHp(0)),temp=ActionCount(archive.TemporaryHp(0));
            if(heal)current=(int)Math.Min(max,(long)current+amount);
            else{int absorbed=Math.Min(temp,amount);temp-=absorbed;current=Math.Max(0,current-(amount-absorbed));}
            WriteHealth(hero,current,max,temp);
        }
        public static void ChangeSpellUse(JObject hero,int level,int delta)
        {
            if(level<1||level>9||Math.Abs((long)delta)!=1)throw new FormatException("Некорректная ячейка");
            var slot=(hero["spellSlotsData"] as JObject)?[level.ToString()] as JObject??throw new FormatException("Ячейки этого круга отсутствуют");
            int max=ActionCount(slot["max"]),used=ActionCount(slot["used"]);long next=(long)used+delta;if(next<0||next>max)throw new FormatException("Нет доступных ячеек для этой операции");slot["used"]=next;
        }
        public static void ChangePactUse(JObject hero,int delta)
        {
            if(Math.Abs((long)delta)!=1)throw new FormatException("Некорректное изменение пакта");
            var pact=hero["pactMagicData"] as JObject??hero["pactMagic"] as JObject??throw new FormatException("Ячеек пакта нет");
            int max=ActionCount(pact["max"]),used=ActionCount(pact["used"]);long next=(long)used+delta;if(next<0||next>max)throw new FormatException("Нет доступных ячеек пакта");
            foreach(string key in new[]{"pactMagicData","pactMagic"})if(hero[key] is JObject target)target["used"]=next;
        }
        public static void ChangeResource(JObject hero,string key,int delta)
        {
            if(Math.Abs((long)delta)!=1)throw new FormatException("Некорректное изменение ресурса");
            var r=(hero["resources"] as JObject)?[key] as JObject??throw new FormatException("Неизвестный формат ресурса");
            if(r["current"]==null||r["max"]==null)throw new FormatException("Для этого ресурса нужен отдельный способ учёта");
            int max=ActionCount(r["max"]),current=ActionCount(r["current"]);long next=(long)current+delta;if(next<0||next>max)throw new FormatException("Недостаточно ресурса или достигнут максимум");r["current"]=next;
        }
        public static void ChangeAbilityUse(JObject hero,string id,int delta)
        {
            if(Math.Abs((long)delta)!=1)throw new FormatException("Некорректный расход");
            var ability=(hero["combatAbilities"] as JArray)?.OfType<JObject>().SingleOrDefault(a=>a["id"]?.ToString()==id)??throw new FormatException("Приём не найден");
            int max=ActionCount(ability["maxUses"]),used=ActionCount(ability["usedCount"]);long next=(long)used+delta;if(next<0||next>max)throw new FormatException("Нет доступных использований");ability["usedCount"]=next;
        }
        public static void ToggleSheetCondition(JObject hero,string name)
        {
            if(string.IsNullOrWhiteSpace(name)||name.Length>80)throw new FormatException("Неизвестное состояние");
            var conditions=Object(hero,"activeConditions");bool current=(bool?)conditions[name]??false;conditions[name]=!current;
        }
        public static void SetDeathTrack(JObject hero,int successes,int failures)
        {
            if(successes<0||successes>3||failures<0||failures>3)throw new FormatException("Спасброски от смерти: от0до3");
            var track=Object(hero,"deathSaves");track["successes"]=successes;track["failures"]=failures;
        }
        public static void RecordRest(JObject hero,bool full)
        {
            if((bool?)hero["dead"]==true)throw new FormatException("Отдых не воскрешает погибшего персонажа");
            if(!string.IsNullOrEmpty((string)hero["extraClassType"])||(bool?)hero["isExtraClass"]==true)throw new FormatException("Особое тело требует собственных правил отдыха");
            if(full&&ActionCount(hero["exhaustionLevel"])>0)throw new FormatException("Истощение требует отдельных правил восстановления; автоматический отдых отменён");
            var copy=(JObject)hero.DeepClone();
            foreach(var value in (copy["resources"] as JObject??new JObject()).Properties())
            {
                if(!(value.Value is JObject r))continue;
                string recharge=((string)(r["recharge"]??r["rechargeOn"])??"").ToLowerInvariant().Replace("_rest","");
                if((recharge=="short"||full&&recharge=="long")&&r["current"]!=null&&r["max"]!=null){ActionCount(r["current"]);r["current"]=ActionCount(r["max"]);}
            }
            foreach(JObject a in (copy["combatAbilities"] as JArray??new JArray()).OfType<JObject>())
            {
                string recharge=(a["rechargeOn"]?.Type==JTokenType.String?(string)a["rechargeOn"]:"").ToLowerInvariant().Replace("_rest","");
                if(recharge=="short"||full&&recharge=="long"){ActionCount(a["maxUses"]);ActionCount(a["usedCount"]);a["usedCount"]=0;}
            }
            foreach(string key in new[]{"pactMagicData","pactMagic"})if(copy[key] is JObject pact){ActionCount(pact["max"]);ActionCount(pact["used"]);pact["used"]=0;}
            if(full)
            {
                var archive=new LegacyCharacterArchive(copy.ToString());int max=ActionCount(archive.MaximumHp(0));WriteHealth(copy,max,max,0);
                foreach(var p in (copy["spellSlotsData"] as JObject??new JObject()).Properties())if(p.Value is JObject slot&&int.TryParse(p.Name,out int level)&&level>=1&&level<=9){ActionCount(slot["max"]);ActionCount(slot["used"]);slot["used"]=0;}
                SetDeathTrack(copy,0,0);
            }
            copy["lastRest"]=new JObject{["type"]=full?"long":"short",["at"]=DateTime.UtcNow.ToString("o"),["id"]=Guid.NewGuid().ToString()};
            // All work above is detached: unsupported data cannot leave a partial rest.
            foreach(string field in new[]{"resources","combatAbilities","pactMagicData","pactMagic","spellSlotsData","hpCurrent","hpMax","hpTemp","currentHP","maxHp","tempHp","hp","hitPoints","deathSaves","lastRest"})if(copy[field]!=null)hero[field]=copy[field].DeepClone();
        }
        private static int RaceInteger(JToken token,int fallback,int minimum,int maximum)
        {
            if(token==null||token.Type==JTokenType.Null)return fallback;
            if((token.Type!=JTokenType.Integer&&token.Type!=JTokenType.String)||!int.TryParse(token.ToString(),NumberStyles.Integer,CultureInfo.InvariantCulture,out int value)||value<minimum||value>maximum)
                throw new FormatException("Некорректное числовое значение расы");
            return value;
        }
        public static JObject CustomRace(string name,string description,int speed,JObject bonuses)
        {
            name=(name??"").Trim();description=(description??"").Trim();
            if(name.Length==0||name.Length>120||description.Length>4000||speed<0||speed>1000)throw new FormatException("Проверьте название, описание и скорость расы");
            var values=new JObject();foreach(string stat in Stats)values[stat]=RaceInteger(bonuses?[stat],0,-30,30);
            return new JObject{["id"]="custom_"+Guid.NewGuid().ToString("N"),["name"]=name,["desc"]=description.Length==0?"Пользовательская раса":description,["speed"]=speed.ToString(CultureInfo.InvariantCulture)+" футов",["languages"]=new JArray("Всеобщий язык"),["bonuses"]=values};
        }
        // A preview is detached. Cancel, failed validation and repeated confirmation
        // cannot alter an existing profile or merge an entire creation seed into it.
        public static JObject SelectRace(JObject hero,JObject race)
        {
            if(hero==null||race==null)throw new FormatException("Выберите расу");
            if(hero["raceId"]!=null&&hero["raceId"].Type!=JTokenType.Null&&hero["raceId"].ToString()!="")throw new FormatException("Раса уже выбрана и зафиксирована");
            string id=race["id"]?.Type==JTokenType.String?(string)race["id"]:null,name=race["name"]?.Type==JTokenType.String?(string)race["name"]:null;
            if(string.IsNullOrWhiteSpace(id)||id.Length>200||string.IsNullOrWhiteSpace(name)||name.Length>120)throw new FormatException("Некорректная запись расы");
            if(race["bonuses"]==null&&race["seed"] is JObject seed)
            {
                string[] supported={"stats","speed","size","raceId","raceName","raceFeatureDescriptions","raceMechanics"};
                if(seed.Properties().Any(p=>!supported.Contains(p.Name))||(race["choices"] is JArray choices&&choices.Count>0))
                    throw new FormatException("Составные механики этой пакетной расы выбираются при создании персонажа; текущий герой не изменён");
                race=(JObject)race.DeepClone();var bonuses=new JObject();
                if(seed["stats"]!=null&&!(seed["stats"] is JObject))throw new FormatException("Неизвестный формат расовых характеристик");
                foreach(string stat in Stats)bonuses[stat]=RaceInteger(seed["stats"]?[stat],10,1,40)-10;
                race["bonuses"]=bonuses;if(seed["speed"]!=null)race["speed"]=seed["speed"].DeepClone();
            }
            var copy=(JObject)hero.DeepClone();var stats=Object(copy,"stats");
            if(race["bonuses"]!=null&&!(race["bonuses"] is JObject))throw new FormatException("Неизвестный формат бонусов расы");
            foreach(string stat in Stats)
            {int score=RaceInteger(stats[stat],10,1,1000),bonus=RaceInteger(race["bonuses"]?[stat],0,-30,30);int next=checked(score+bonus);if(next<1||next>1000)throw new FormatException("Характеристика вне допустимого диапазона");stats[stat]=next;}
            if(race["speed"]!=null){if(race["speed"].Type!=JTokenType.String||race["speed"].ToString().Length>80)throw new FormatException("Неизвестный формат скорости");copy["speed"]=race["speed"].DeepClone();}
            if(race["baseAc"]!=null)copy["ac"]=RaceInteger(race["baseAc"],10,0,1000);
            else if(race["baseAcFormula"]!=null)
            {if((string)race["baseAcFormula"]!="lizardfolk")throw new FormatException("Особая формула КД этой расы ещё не поддерживается");copy["ac"]=13+Modifier(copy,"dex");}
            int hpBonus=RaceInteger(race["hpBonusPerLevel"],0,0,1000);
            if(hpBonus!=0)
            {var a=new LegacyCharacterArchive(copy.ToString());WriteHealth(copy,checked(ActionCount(a.CurrentHp(0))+hpBonus),checked(ActionCount(a.MaximumHp(0))+hpBonus),ActionCount(a.TemporaryHp(0)));copy["raceHpBonusPerLevel"]=hpBonus;}
            copy["raceId"]=id;copy["raceName"]=name;
            if(race["seed"]?["size"]?.Type==JTokenType.String)copy["size"]=race["seed"]["size"].DeepClone();
            // Carry descriptive race data only. Never overwrite class resources,
            // inventory, art, choice history or unrelated existing fields with seed.
            if(race["desc"]?.Type==JTokenType.String)
            {var descriptions=Array(copy,"raceFeatureDescriptions");descriptions.Add(race["desc"].DeepClone());}
            if(copy["raceMechanics"]==null&&race["seed"]?["raceMechanics"] is JObject mechanics)copy["raceMechanics"]=mechanics.DeepClone();
            CharacterCreation.RecordPackage(copy,race);Recalculate(copy);return copy;
        }
        public static JObject CreateFolder(JObject hero,string name)
        {
            name=(name??"").Trim();if(name.Length==0||name.Length>120)throw new FormatException("Название папки: от1до120 символов");
            var folders=Array(hero,"folders");var folder=new JObject{["id"]="f_"+Guid.NewGuid().ToString("N"),["name"]=name,["notes"]=new JArray()};folders.Add(folder);hero["activeFolderId"]=folder["id"].DeepClone();return folder;
        }
        static JObject NoteFolder(JObject hero,string id)=>(hero["folders"] as JArray)?.OfType<JObject>().SingleOrDefault(f=>f["id"]?.ToString()==id)??throw new FormatException("Папка не найдена");
        public static JObject CreateNote(JObject hero,string folderId)
        {
            var notes=Array(NoteFolder(hero,folderId),"notes");long id=DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();while(notes.Any(n=>n["id"]?.ToString()==id.ToString()))id++;
            var note=new JObject{["id"]=id,["title"]="",["text"]=""};notes.Add(note);return note;
        }
        public static void UpdateNote(JObject hero,string folderId,JToken noteId,string title,string text)
        {
            if(title==null||text==null||title.Length>500||text.Length>100000)throw new FormatException("Слишком большая заметка");
            var note=(NoteFolder(hero,folderId)["notes"] as JArray)?.OfType<JObject>().SingleOrDefault(n=>JToken.DeepEquals(n["id"],noteId))??throw new FormatException("Заметка не найдена");note["title"]=title;note["text"]=text;
        }
    }
}
