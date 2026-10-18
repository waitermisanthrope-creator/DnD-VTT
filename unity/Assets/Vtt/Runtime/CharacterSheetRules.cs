using System;
using System.IO;
using System.Linq;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace DndVtt.UnityPrototype
{
    // Base sheet formulas from app/app.js, skills.js and spells.js. These are
    // intentionally separate from class-specific combat/equipment execution.
    public static class CharacterSheetRules
    {
        public static readonly string[] Stats = { "str", "dex", "con", "int", "wis", "cha" };
        public static readonly string[] StatNames = { "Сила", "Ловкость", "Телосложение", "Интеллект", "Мудрость", "Харизма" };
        public static readonly string[] SkillIds = { "acrobatics", "animalHandling", "arcana", "athletics", "deception", "history", "insight", "intimidation", "investigation", "medicine", "nature", "perception", "performance", "persuasion", "religion", "sleightOfHand", "stealth", "survival" };
        public static readonly string[] SkillStats = { "dex", "wis", "int", "str", "cha", "int", "wis", "cha", "int", "wis", "int", "wis", "cha", "cha", "int", "dex", "dex", "wis" };
        public static readonly string[] SkillNames = { "Акробатика", "Уход за животными", "Магия", "Атлетика", "Обман", "История", "Проницательность", "Запугивание", "Анализ", "Медицина", "Природа", "Внимательность", "Выступление", "Убеждение", "Религия", "Ловкость рук", "Скрытность", "Выживание" };
        public static int Modifier(JObject hero, string stat)
        {
            int score = (int)LegacyJson.Number((hero["stats"] as JObject)?[stat], 10);
            if (score == 0) score = 10; // app.js parseInt(value) || 10
            return (int)Math.Floor((score - 10) / 2d);
        }
        public static int Level(JObject hero)
        {
            float n = hero["classes"] is JArray classes && classes.Count > 0
                ? classes.Sum(c => LegacyJson.Number((c as JObject)?["level"], 0)) : LegacyJson.Number(hero["level"], 1);
            return Math.Max(1, (int)n);
        }
        public static int Proficiency(JObject hero) => (int)Math.Floor((Level(hero) - 1) / 4d) + 2;
        public static int Skill(JObject hero, int index) => Modifier(hero, SkillStats[index]) + Proficiency(hero) * (int)LegacyJson.Number((hero["skillsData"] as JObject)?[SkillIds[index]], 0);
        public static void Validate(JObject hero)
        {
            foreach (string key in new[] { "stats", "skillsData", "savesData", "spellSlotsData" })
                if (hero[key] != null && hero[key].Type != JTokenType.Null && !(hero[key] is JObject)) throw new FormatException(key + " must be an object");
            var stats = hero["stats"] as JObject; var skills = hero["skillsData"] as JObject;
            foreach (string stat in Stats) if (stats?[stat] != null) LegacyJson.Number(stats[stat]);
            foreach (string skill in SkillIds)
            {
                float n = LegacyJson.Number(skills?[skill]);
                if (n < 0 || n > 2 || n != Math.Floor(n)) throw new FormatException("Invalid skill proficiency " + skill);
            }
            float level = LegacyJson.Number(hero["level"], 1);
            if (level < 1 || level > 100 || level != Math.Floor(level)) throw new FormatException("Invalid character level");
            if (hero["classes"] is JArray classes)
                foreach (var c in classes.OfType<JObject>())
                { float n = LegacyJson.Number(c["level"], 0); if (n < 0 || n > 100 || n != Math.Floor(n)) throw new FormatException("Invalid class level"); }
        }
        public static JObject Object(JObject parent, string key)
        {
            if (parent[key] == null || parent[key].Type == JTokenType.Null) parent[key] = new JObject();
            return parent[key] as JObject ?? throw new FormatException(key + " must be an object");
        }
        public static JArray Array(JObject parent, string key)
        {
            if (parent[key] == null || parent[key].Type == JTokenType.Null) parent[key] = new JArray();
            return parent[key] as JArray ?? throw new FormatException(key + " must be an array");
        }
        public static void Recalculate(JObject hero)
        {
            hero["profBonus"] = Proficiency(hero);
            var skills = Object(hero, "skills"); var values = Object(hero, "skillValues");
            for (int i = 0; i < SkillIds.Length; i++)
            {
                int mult = (int)LegacyJson.Number((hero["skillsData"] as JObject)?[SkillIds[i]], 0);
                skills[SkillIds[i]] = mult == 2 ? "expert" : mult == 1 ? "proficient" : "none";
                values[SkillIds[i]] = Skill(hero, i);
            }
        }
    }

    // Experimental local archive only: no writes into browser localStorage or
    // Supabase journals. Replace atomically; retain the preceding valid archive.
    public static class CharacterSheetStore
    {
        public static void Save(string path, LegacyCharacterArchive archive)
        {
            string json = archive.Export(); _ = new LegacyCharacterArchive(json);
            Directory.CreateDirectory(Path.GetDirectoryName(Path.GetFullPath(path)));
            string temp = path + ".pending";
            using (var stream = new FileStream(temp, FileMode.Create, FileAccess.Write, FileShare.None))
            using (var writer = new StreamWriter(stream, new System.Text.UTF8Encoding(false)))
            { writer.Write(json); writer.Flush(); stream.Flush(true); }
            if (File.Exists(path)) File.Replace(temp, path, path + ".bak"); else File.Move(temp, path);
        }
        public static LegacyCharacterArchive Load(string path) => new LegacyCharacterArchive(File.ReadAllText(path));
    }
}
