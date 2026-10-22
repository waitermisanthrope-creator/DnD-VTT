using System;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace DndVtt.UnityPrototype
{
    // Pure data/storage layer. Only curated, pinned repository locations are accepted.
    // Each immutable revision is committed before the atomic active pointer changes.
    public sealed class WorkshopStore
    {
        // A failed optional probe must never prevent a bounded download. Actual
        // filesystem write failures still abort installation without changing saves.
        public static void CheckDownloadSpace(long packageBytes, Func<long> probe)
        {
            long available;
            try { available = probe(); }
            catch (Exception) { return; }
            long required = checked(packageBytes * 2 + 1024 * 1024);
            if (available >= 0 && available < required)
                throw new IOException("Недостаточно места в хранилище приложения: требуется " + required + " байт, доступно " + available + " байт. Освободите место и повторите загрузку.");
        }
        public const int MaxCatalogBytes = 1024 * 1024;
        public const long MaxPackageBytes = 64 * 1024 * 1024;
        public static readonly string[] Types = { "game-system", "race", "class", "feat", "subclass", "spell", "item", "monster", "model", "environment", "texture", "animation", "map", "appearance", "collection", "craft" };
        private JArray verifiedCache;
        private string cacheFingerprint;
        public string Root { get; }
        public WorkshopStore(string root) { Root = Path.GetFullPath(root); Directory.CreateDirectory(Root); }
        public static bool ValidId(string id) => id != null && id.Length <= 120 && Regex.IsMatch(id, @"^[a-z0-9][a-z0-9._-]*$");
        public static string Digest(byte[] bytes) { using (var h = SHA256.Create()) return BitConverter.ToString(h.ComputeHash(bytes)).Replace("-", "").ToLowerInvariant(); }
        public static string DigestFile(string path) { using (var h = SHA256.Create()) using (var s = File.OpenRead(path)) return BitConverter.ToString(h.ComputeHash(s)).Replace("-", "").ToLowerInvariant(); }
        public static JObject Parse(string text) => JObject.Parse(text, new JsonLoadSettings { DuplicatePropertyNameHandling = DuplicatePropertyNameHandling.Error });
        public static string CategoryPath(JObject manifest)
        {
            string type=(string)manifest["type"],id=(string)manifest["id"]??"";
            switch(type) {
                case "race":return "Персонажи/Расы";
                case "class":return "Персонажи/Классы";
                case "subclass":return "Персонажи/Подклассы";
                case "feat":return "Персонажи/Черты";
                case "spell":return "Магия/Заклинания";
                case "monster":return "Бестиарий/Монстры";
                case "game-system":return "Игровые системы/Правила";
                case "item":
                    foreach(var pair in new[]{new[]{"weapons","Оружие"},new[]{"armor","Броня"},new[]{"consumables","Расходники"},new[]{"materials","Материалы"},new[]{"junk","Хлам"}})if(id.EndsWith("."+pair[0],StringComparison.Ordinal))return "Инвентарь/"+pair[1];
                    return "Инвентарь/Прочее";
                case "craft":return id.Contains("alchemy.ingredients")?"Крафт и алхимия/Алхимия/Ингредиенты":id.Contains("alchemy")?"Крафт и алхимия/Алхимия/Правила и катализаторы":"Крафт и алхимия/Рецепты";
                case "map":return "3D и карты/Карты/"+(id.Contains("castle")?"Замки":id.Contains("house")?"Дома":id.Contains("tavern")?"Таверны":id.Contains("town")||id.Contains("village")?"Поселения":id.Contains("dungeon")?"Подземелья":id.Contains("stress")?"Тестовые":"Разное");
                case "model":return "3D и карты/Модели";
                case "environment":return "3D и карты/Окружение";
                case "texture":return "3D и карты/Материалы и текстуры";
                case "animation":return "3D и карты/Анимации";
                case "appearance":return (string)manifest["imageKind"]=="dice"?"Оформление/3D Дайсы":(string)manifest["imageKind"]=="wallpaper"?"Оформление/Обои":(string)manifest["imageKind"]=="icon"?"Оформление/Иконки":"3D и карты/Материалы и текстуры";
                default:return "Коллекции/Наборы";
            }
        }
        public static void ValidatePreview(JObject preview)
        {
            string url=(string)preview["url"];
            if(url==null||!url.StartsWith("https://github.com/waitermisanthrope-creator/DnD-VTT-Assets/releases/download/workshop-previews-v1/",StringComparison.Ordinal)||!url.EndsWith(".jpg",StringComparison.Ordinal)||url.Contains("..")||url.Contains("?")||url.Contains("#")||!Regex.IsMatch((string)preview["sha256"]??"","^[a-f0-9]{64}$")||(long?)preview["bytes"]<1||(long?)preview["bytes"]>256*1024||preview["bytes"]==null||(int?)preview["width"]<1||(int?)preview["width"]>512||preview["width"]==null||(int?)preview["height"]<1||(int?)preview["height"]>512||preview["height"]==null)
                throw new FormatException("Некорректный предпросмотр");
        }
        public static byte[] PreviewBytes(JObject preview,byte[] bytes)
        {
            ValidatePreview(preview);
            if(bytes.LongLength!=(long)preview["bytes"]||Digest(bytes)!=(string)preview["sha256"]||bytes.Length<12||bytes[0]!=255||bytes[1]!=216)throw new FormatException("Предпросмотр: размер/SHA-256/JPEG не совпадают");
            int pos=2;
            while(pos+4<bytes.Length) {
                if(bytes[pos++]!=255)throw new FormatException("Неверный JPEG");
                while(pos<bytes.Length&&bytes[pos]==255)pos++;
                if(pos>=bytes.Length)break;int marker=bytes[pos++];
                if(marker==0xD9||marker==0xDA)break;if(marker==0x01||marker>=0xD0&&marker<=0xD7)continue;
                if(pos+2>bytes.Length)break;int length=bytes[pos]*256+bytes[pos+1];if(length<2||pos+length>bytes.Length)break;
                if(marker>=0xC0&&marker<=0xCF&&marker!=0xC4&&marker!=0xC8&&marker!=0xCC) {
                    if(length<8)break;int height=bytes[pos+3]*256+bytes[pos+4],width=bytes[pos+5]*256+bytes[pos+6];
                    if(width!=(int)preview["width"]||height!=(int)preview["height"]||width>512||height>512)throw new FormatException("Неверные размеры предпросмотра");
                    return bytes;
                }
                pos+=length;
            }
            throw new FormatException("JPEG не содержит безопасного размера");
        }
        public static void ValidateManifest(JObject m)
        {
            if(m["preview"]!=null) { if(!(m["preview"] is JObject preview))throw new FormatException("Неверный предпросмотр");ValidatePreview(preview); }
            string id = (string)m["id"], url = (string)m["url"], hash = (string)m["sha256"];
            long size = (long?)m["bytes"] ?? -1;
            if ((int?)m["schemaVersion"] != 1 || !ValidId(id) || !Types.Contains((string)m["type"]) || size < 1 || size > MaxPackageBytes
                || !Regex.IsMatch((string)m["version"] ?? "", @"^\d+\.\d+\.\d+$")
                || string.IsNullOrWhiteSpace((string)m["name"]) || string.IsNullOrWhiteSpace((string)m["author"])
                || string.IsNullOrWhiteSpace((string)m["license"]) || !Regex.IsMatch(hash ?? "", "^[a-f0-9]{64}$"))
                throw new FormatException("Некорректный манифест: " + id);
            bool json = (string)m["format"] == "json";
            string[] prefixes = json ? new[] {
                "https://raw.githubusercontent.com/waitermisanthrope-creator/DnD-VTT-Content/main/packages/",
                "https://raw.githubusercontent.com/waitermisanthrope-creator/DnD-VTT-Assets/main/packages/",
                "https://github.com/waitermisanthrope-creator/DnD-VTT-Assets/releases/download/" } : new[] {
                "https://github.com/waitermisanthrope-creator/DnD-VTT-Assets/releases/download/" };
            if (url == null || !prefixes.Any(p => url.StartsWith(p, StringComparison.Ordinal)) || url.Contains("..") || url.Contains("?") || url.Contains("#")
                || (!json && (string)m["format"] != "assetbundle") || (json && (!url.EndsWith(".json", StringComparison.Ordinal) || size > 5 * 1024 * 1024)))
                throw new FormatException("Недоверенный адрес/формат пакета");
            if (!(m["dependencies"] is JArray deps) || deps.Count > 50 || deps.Any(d => !ValidId((string)d)) || deps.Select(d => (string)d).Distinct().Count() != deps.Count || deps.Any(d => (string)d == id))
                throw new FormatException("Неверные зависимости");
            if ((string)m["platform"] != "any" && (string)m["platform"] != "android-arm64" && (string)m["platform"] != "windows-x64") throw new FormatException("Неизвестная платформа");
            if (!json && ((string)m["platform"] == "any" || string.IsNullOrWhiteSpace((string)m["unityVersion"]))) throw new FormatException("AssetBundle требует платформу и Unity");
        }
        public static JArray Catalog(string text, string field)
        {
            if (Encoding.UTF8.GetByteCount(text) > MaxCatalogBytes) throw new FormatException("Каталог слишком большой");
            var doc = Parse(text);
            if ((int?)doc["schemaVersion"] != 1 || !(doc[field] is JArray list) || list.Count > 2000) throw new FormatException("Неверная схема каталога");
            foreach (var t in list) ValidateManifest(t as JObject ?? throw new FormatException("Запись каталога"));
            if (list.OfType<JObject>().Select(m => (string)m["id"]).Distinct().Count() != list.Count) throw new FormatException("Повтор ID");
            return (JArray)list.DeepClone();
        }
        public static void Compatible(JObject m, string platform, string unity)
        {
            if ((string)m["platform"] != "any" && (string)m["platform"] != platform) throw new FormatException("Пакет для другой платформы");
            if ((string)m["format"] == "assetbundle" && (string)m["unityVersion"] != unity) throw new FormatException("Требуется Unity " + m["unityVersion"]);
        }
        private string Pointer(string id) { if (!ValidId(id)) throw new FormatException("ID"); return Path.Combine(Root, id + ".json"); }
        private string Revision(JObject m) => Path.Combine(Root, (string)m["id"] + "-" + (string)m["sha256"]);
        public string PayloadPath(JObject m) => Path.Combine(Revision(m), "payload");
        public static void AtomicText(string path, string text)
        {
            string part = path + ".part";
            byte[] bytes = new UTF8Encoding(false).GetBytes(text);
            using (var output = new FileStream(part, FileMode.Create, FileAccess.Write, FileShare.None)) { output.Write(bytes, 0, bytes.Length); output.Flush(true); }
            if (File.Exists(path)) File.Replace(part, path, path + ".bak"); else File.Move(part, path);
        }
        public JArray Installed()
        {
            string fingerprint = string.Join("|", Directory.GetFiles(Root, "*.json").OrderBy(p => p).Select(p => { var info = new FileInfo(p); return p + ":" + info.Length + ":" + info.LastWriteTimeUtc.Ticks; }));
            if (verifiedCache != null && fingerprint == cacheFingerprint) return (JArray)verifiedCache.DeepClone();
            var list = new JArray();
            foreach (string path in Directory.GetFiles(Root, "*.json"))
            {
                try { var m = Parse(File.ReadAllText(path)); ValidateManifest(m); if (Path.GetFileName(path) != (string)m["id"] + ".json") continue; Verify(m, PayloadPath(m)); list.Add(m); }
                catch { /* Corrupt packages are never activated; files and saves are preserved. */ }
            }
            bool changed;
            do { changed = false; foreach (JObject item in list.ToArray()) if (((JArray)item["dependencies"]).Any(d => !list.Any(x => (string)x["id"] == (string)d))) { item.Remove(); changed = true; } } while (changed);
            verifiedCache = (JArray)list.DeepClone(); cacheFingerprint = fingerprint;
            return list;
        }
        public JObject Find(string id) => Installed().OfType<JObject>().FirstOrDefault(m => (string)m["id"] == id);
        public static void Verify(JObject m, string path)
        {
            if (new FileInfo(path).Length != (long)m["bytes"] || DigestFile(path) != (string)m["sha256"]) throw new FormatException("Размер или SHA-256 не совпадает");
        }
        private static void ValidateChoices(JToken token)
        {
            if (!(token is JArray choices) || choices.Count > 50) throw new FormatException("Неверные выборы");
            foreach (JObject choice in choices)
                if (!new[] { "single", "multi", "stats2", "feat" }.Contains((string)choice["type"]) || string.IsNullOrEmpty((string)choice["key"]) || !(choice["options"] is JArray options) || options.Count > 500 || ((int?)choice["count"] ?? 1) < 1 || ((int?)choice["count"] ?? 1) > 20)
                    throw new FormatException("Неподдерживаемый выбор");
        }
        public static JObject ValidateData(JObject m, string text)
        {
            var data = Parse(text);
            if ((int?)data["schemaVersion"] != 1 || (string)data["id"] != (string)m["id"] || (string)data["version"] != (string)m["version"] || (string)data["type"] != (string)m["type"]) throw new FormatException("Пакет не соответствует манифесту");
            string type = (string)m["type"], packageId = (string)m["id"];
            if (!new[] { "race", "class", "feat", "map", "model", "environment", "appearance", "item", "craft" }.Contains(type)) throw new FormatException("Этот тип пока недоступен для активации");
            if(type=="appearance"&&data["diceThemes"]!=null) {
                if((string)m["imageKind"]!="dice"||!(data["diceThemes"] is JArray themes)||themes.Count!=1||data["images"]!=null||data["surfaces"]!=null)throw new FormatException("Состав набора дайсов");
                var theme=DiceTheme.Read(themes[0] as JObject??throw new FormatException("Набор дайсов"));
                if(theme.Id!=packageId+".theme"||(themes[0]["albedo"]==null&&!((JArray)m["dependencies"]).Values<string>().Contains(theme.Icon)))throw new FormatException("Набор должен зависеть от своей иконки");
                return data;
            }
            if(type=="appearance"&&data["images"]!=null) {
                if(!(data["images"] is JArray images)||images.Count!=1||data["surfaces"]!=null||data["objects"]!=null||data["maps"]!=null)throw new FormatException("Состав пакета изображений");
                var image=images[0] as JObject??throw new FormatException("Изображение");
                if((string)image["id"]!=packageId+".image"||string.IsNullOrWhiteSpace((string)image["name"])||!new[]{"wallpaper","icon"}.Contains((string)image["kind"])||(string)m["imageKind"]!=(string)image["kind"])throw new FormatException("Тип изображения");
                ImageBytes(image);return data;
            }
            if (type == "craft") { CommerceRules.ValidateCatalog(data); return data; }
            string field = type == "race" ? "races" : type == "class" ? "classes" : type == "feat" ? "feats" : type == "map" ? "maps" : type == "appearance" ? "surfaces" : type == "item" ? "items" : "objects";
            if (!(data[field] is JArray entries) || entries.Count < 1 || entries.Count > 100) throw new FormatException("Неверный состав пакета");
            var ids = entries.OfType<JObject>().Select(x => (string)x["id"]).ToArray();
            if (ids.Length != entries.Count || ids.Distinct().Count() != ids.Length) throw new FormatException("Повтор ID ресурса");
            foreach (JObject e in entries)
            {
                string id = (string)e["id"];
                bool legacyCharacterId = (type == "race" || type == "class" || type == "feat") && packageId == "dnd." + type + "." + id;
                if (!ValidId(id) || !(id.StartsWith(packageId + ".", StringComparison.Ordinal) || id == packageId || legacyCharacterId) || string.IsNullOrWhiteSpace((string)e["name"])) throw new FormatException("ID ресурса должен принадлежать пакету");
                if (type == "race" || type == "class")
                {
                    if (!(e["seed"] is JObject seed)) throw new FormatException("Нет параметров персонажа");
                    string[] raceFields = { "stats", "speed", "size", "raceFeatureDescriptions", "abilities", "ac", "baseAC", "features", "hpCurrent", "hpMax", "immunities", "proficiencies", "raceCraftBonuses", "raceHpBonusPerLevel", "raceId", "raceMechanics", "raceName", "resistances" };
                    string[] classFields = { "name", "age", "level", "class", "className", "classes", "background", "profession", "raceId", "raceName", "baseAC", "ac", "speed", "profBonus", "stats", "_builderBaseStats", "statGenerationMode", "statRollsUsed", "savesData", "skillsData", "proficiencies", "feats", "features", "choiceState", "choiceHistory", "pendingChoices", "activeConditions", "weaponsData", "spellSlotsData", "spellsData", "folders", "library", "hpMax", "hpCurrent", "hitDice", "gender", "origin", "classFeaturesState", "abilities", "isExtraClass", "extraClassId", "extraClassName", "replacesRace", "resources", "extraClasses", "extraClassType", "tokenArt", "tokenReady", "multiclassAllowed" };
                    if (seed.Properties().Any(p => !(type == "race" ? raceFields : classFields).Contains(p.Name))) throw new FormatException("Неподдерживаемая механика персонажа");
                    if (seed["stats"] != null && (!(seed["stats"] is JObject stats) || stats.Properties().Count() != 6 || new[] { "str", "dex", "con", "int", "wis", "cha" }.Any(k => stats[k]?.Type != JTokenType.Integer || (int)stats[k] < 8 || (int)stats[k] > 12))) throw new FormatException("Неверные бонусы характеристик");
                    ValidateChoices(e["choices"]);
                    if (type == "class" && (!(e["levelOneFeatures"] is JArray) || !new[] { 4, 6, 8, 10, 12 }.Contains((int?)e["hitDie"] ?? 0))) throw new FormatException("Неверный класс");
                }
                else if (type == "item")
                {
                    if (!CharacterSheetRules.InventoryCategories.Contains((string)e["inventoryCategory"])) throw new FormatException("Категория предмета");
                }
                else if (type == "feat")
                {
                    if (e["statBonus"] is JObject bonus && (!(bonus["stats"] is JArray stats) || stats.Count == 0 || stats.Count > 6 || stats.Any(k => !CharacterSheetRules.Stats.Contains((string)k)) || !new[] { 1, 2 }.Contains((int?)bonus["value"] ?? 0))) throw new FormatException("Бонус черты");
                }
                else if (type == "map")
                {
                    if (!(e["document"] is JObject doc)) throw new FormatException("Нет карты");
                    var map = new LegacyMapDocument(doc.ToString());
                    if (map.FloorCount > 16 || map.Floors.OfType<JObject>().Sum(f => ((JObject)f["tiles"]).Count + ((JObject)f["walls"]).Count + ((JArray)f["objects"]).Count) > 50000) throw new FormatException("Карта слишком велика");
                }
                else
                {
                    if (!System.Text.RegularExpressions.Regex.IsMatch((string)e["color"] ?? "", "^#[A-Fa-f0-9]{8}$")) throw new FormatException("Цвет");
                    if (e["legacyKey"] != null && (packageId != "dnd.appearance.map-surfaces" || !Regex.IsMatch((string)e["legacyKey"], "^(floor|wall)_[a-z0-9_]+$"))) throw new FormatException("Неверный ключ материала");
                    if (e["pattern"] != null && ((string)e["pattern"] != "checker" || (int?)e["textureSize"] != 32 || !Regex.IsMatch((string)e["alternateColor"] ?? "", "^#[A-Fa-f0-9]{8}$"))) throw new FormatException("Неверная текстура");
                    if (field == "objects" && (!new[] { "Cube", "Sphere", "Cylinder", "Capsule" }.Contains((string)e["primitive"]) || !(e["scale"] is JArray scale) || scale.Count != 3 || scale.Any(v => v.Type != JTokenType.Float && v.Type != JTokenType.Integer || double.IsNaN((double)v) || double.IsInfinity((double)v) || (double)v < .05 || (double)v > 10))) throw new FormatException("Геометрия");
                }
            }
            return data;
        }
        public void Install(JObject m, string downloaded, string platform, string unity)
        {
            ValidateManifest(m); Compatible(m, platform, unity); Verify(m, downloaded);
            if ((string)m["format"] == "json") ValidateData(m, File.ReadAllText(downloaded));
            var installed = Installed().OfType<JObject>().Where(i => (string)i["id"] != (string)m["id"]).ToList(); installed.Add(m);
            var graph = installed.ToDictionary(i => (string)i["id"], i => ((JArray)i["dependencies"]).Values<string>().ToArray());
            var visiting = new System.Collections.Generic.HashSet<string>(); var complete = new System.Collections.Generic.HashSet<string>();
            void Visit(string id)
            {
                if (complete.Contains(id)) return;
                if (!graph.ContainsKey(id)) throw new FormatException("Сначала установите зависимость: " + id);
                if (!visiting.Add(id)) throw new FormatException("Циклические зависимости");
                foreach (string dep in graph[id]) Visit(dep);
                visiting.Remove(id); complete.Add(id);
            }
            foreach (string id in graph.Keys) Visit(id);
            Directory.CreateDirectory(Revision(m));
            string target = PayloadPath(m);
            if (!File.Exists(target)) File.Move(downloaded, target);
            else
            {
                try { Verify(m, target); }
                catch (Exception e) when (e is IOException || e is FormatException)
                { File.Replace(downloaded, target, target + ".bad"); }
            }
            AtomicText(Pointer((string)m["id"]), m.ToString()); verifiedCache = null;
        }
        public JObject Creation(JObject baseline)
        {
            var result = (JObject)baseline.DeepClone();
            if (!(result["feats"] is JArray)) result["feats"] = new JArray();
            foreach (JObject m in Installed())
            {
                string type = (string)m["type"];
                if ((string)m["format"] != "json" || !new[] { "race", "class", "feat" }.Contains(type)) continue;
                string field = type == "race" ? "races" : type == "class" ? "classes" : "feats";
                foreach (JObject entry in (JArray)Data(m)[field])
                {
                    if (((JArray)result[field]).Any(r => (string)r["id"] == (string)entry["id"])) throw new FormatException("Повтор ID: " + entry["id"]);
                    var item = (JObject)entry.DeepClone(); item["packageId"] = m["id"].DeepClone(); item["packageVersion"] = m["version"].DeepClone();
                    ((JArray)result[field]).Add(item);
                }
            }
            foreach (JObject race in (JArray)result["races"])
                foreach (JObject choice in (JArray)race["choices"])
                    if ((string)choice["type"] == "feat") choice["options"] = result["feats"].DeepClone();
            return result;
        }
        public JObject Commerce()
        {
            var result = new JObject { ["items"] = new JArray(), ["craft"] = new JObject { ["materials"] = new JArray(), ["recipes"] = new JArray(), ["toolAliases"] = new JObject(), ["toolLabels"] = new JObject() }, ["alchemy"] = new JObject { ["ingredients"] = new JArray(), ["catalysts"] = new JArray(), ["synergy"] = new JArray(), ["conflict"] = new JArray(), ["effects"] = new JObject(), ["extraTrigger"] = new JObject() } };
            foreach (JObject manifest in Installed())
            {
                if ((string)manifest["format"] != "json" || !new[] { "item", "craft" }.Contains((string)manifest["type"])) continue;
                var data = Data(manifest);
                foreach (JObject item in data["items"] as JArray ?? new JArray())
                {
                    var copy = (JObject)item.DeepClone(); copy["packageId"] = manifest["id"].DeepClone(); copy["packageVersion"] = manifest["version"].DeepClone(); ((JArray)result["items"]).Add(copy);
                }
                if ((string)manifest["type"] != "craft") continue;
                var target = (JObject)result[(string)data["mode"] == "craft-v31" ? "craft" : "alchemy"];
                foreach (var property in data.Properties())
                {
                    if (target[property.Name] is JArray array && property.Value is JArray values) foreach (var value in values) array.Add(value.DeepClone());
                    else if (target[property.Name] is JObject obj && property.Value is JObject fields) foreach (var field in fields.Properties()) obj[field.Name] = field.Value.DeepClone();
                }
            }
            return result;
        }
        public void Remove(string id)
        {
            foreach (JObject m in Installed()) if (((JArray)m["dependencies"]).Any(d => (string)d == id)) throw new FormatException("Пакет используется: " + m["name"]);
            string pointer = Pointer(id);
            if (File.Exists(pointer)) File.Delete(pointer);
            verifiedCache = null;
            if (File.Exists(pointer + ".bak")) File.Delete(pointer + ".bak");
            foreach (string dir in Directory.GetDirectories(Root, id + "-*"))
            {
                string name = Path.GetFileName(dir);
                if (name.Length == id.Length + 65 && Regex.IsMatch(name.Substring(id.Length + 1), "^[a-f0-9]{64}$")) Directory.Delete(dir, true);
            }
        }
        public static byte[] ImageBytes(JObject image)
        {
            string encoded=(string)image["pngBase64"];
            if(encoded==null||encoded.Length>6*1024*1024)throw new FormatException("Размер изображения");
            byte[] png=Convert.FromBase64String(encoded);
            byte[] signature={137,80,78,71,13,10,26,10};
            if(png.Length<33||png.Length>4*1024*1024||!png.Take(8).SequenceEqual(signature)||Encoding.ASCII.GetString(png,12,4)!="IHDR")throw new FormatException("Требуется PNG");
            uint width=0,height=0;for(int n=0;n<4;n++) { width=(width<<8)|png[16+n];height=(height<<8)|png[20+n]; }
            if(width==0||height==0||width>2048||height>2048||(long)width*height>4194304||width!=(long?)image["width"]||height!=(long?)image["height"])throw new FormatException("Размеры PNG");
            if(Digest(png)!=(string)image["sha256"])throw new FormatException("SHA-256 PNG");return png;
        }
        public JObject Data(JObject m) { Verify(m, PayloadPath(m)); return ValidateData(m, File.ReadAllText(PayloadPath(m))); }
    }
}
