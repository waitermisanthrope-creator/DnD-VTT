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
        public static readonly string[] Types = { "game-system", "race", "class", "subclass", "spell", "item", "monster", "model", "environment", "texture", "animation", "map", "appearance", "collection", "craft" };
        private JArray verifiedCache;
        private string cacheFingerprint;
        public string Root { get; }
        public WorkshopStore(string root) { Root = Path.GetFullPath(root); Directory.CreateDirectory(Root); }
        public static bool ValidId(string id) => id != null && id.Length <= 120 && Regex.IsMatch(id, @"^[a-z0-9][a-z0-9._-]*$");
        public static string Digest(byte[] bytes) { using (var h = SHA256.Create()) return BitConverter.ToString(h.ComputeHash(bytes)).Replace("-", "").ToLowerInvariant(); }
        public static string DigestFile(string path) { using (var h = SHA256.Create()) using (var s = File.OpenRead(path)) return BitConverter.ToString(h.ComputeHash(s)).Replace("-", "").ToLowerInvariant(); }
        public static JObject Parse(string text) => JObject.Parse(text, new JsonLoadSettings { DuplicatePropertyNameHandling = DuplicatePropertyNameHandling.Error });
        public static void ValidateManifest(JObject m)
        {
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
                "https://raw.githubusercontent.com/waitermisanthrope-creator/DnD-VTT-Assets/main/packages/" } : new[] {
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
        public static JObject ValidateData(JObject m, string text)
        {
            var data = Parse(text);
            if ((int?)data["schemaVersion"] != 1 || (string)data["id"] != (string)m["id"] || (string)data["version"] != (string)m["version"] || (string)data["type"] != (string)m["type"]) throw new FormatException("Пакет не соответствует манифесту");
            string type = (string)m["type"];
            if (!new[] { "race", "model", "environment", "appearance" }.Contains(type)) throw new FormatException("Этот тип пока недоступен для активации");
            string field = type == "race" ? "races" : type == "appearance" ? "surfaces" : "objects";
            if (!(data[field] is JArray entries) || entries.Count < 1 || entries.Count > 100) throw new FormatException("Неверный состав пакета");
            var ids = entries.OfType<JObject>().Select(x => (string)x["id"]).ToArray();
            if (ids.Length != entries.Count || ids.Distinct().Count() != ids.Length) throw new FormatException("Повтор ID ресурса");
            foreach (JObject e in entries)
            {
                if (!ValidId((string)e["id"]) || !((string)e["id"]).StartsWith((string)m["id"] + ".", StringComparison.Ordinal) && (string)e["id"] != (string)m["id"] || string.IsNullOrWhiteSpace((string)e["name"])) throw new FormatException("ID ресурса должен принадлежать пакету");
                if (field == "races")
                {
                    // Only the implemented additive stat/speed/size contract is accepted.
                    if (!(e["seed"] is JObject seed) || seed.Properties().Any(p => !new[] { "stats", "speed", "size", "raceFeatureDescriptions" }.Contains(p.Name)) || !(e["choices"] is JArray choices) || choices.Count != 0) throw new FormatException("Неподдерживаемая механика расы");
                    if (!(seed["stats"] is JObject stats) || stats.Properties().Count() != 6 || new[] { "str", "dex", "con", "int", "wis", "cha" }.Any(s => stats[s]?.Type != JTokenType.Integer || (int)stats[s] < 8 || (int)stats[s] > 12)) throw new FormatException("Неверные бонусы характеристик");
                }
                else
                {
                    if (!Regex.IsMatch((string)e["color"] ?? "", "^#[A-Fa-f0-9]{8}$")) throw new FormatException("Цвет");
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
            foreach (JObject m in Installed())
            {
                if ((string)m["format"] != "json" || (string)m["type"] != "race") continue;
                foreach (JObject entry in (JArray)Data(m)["races"])
                {
                    if (((JArray)result["races"]).Any(r => (string)r["id"] == (string)entry["id"])) throw new FormatException("Повтор ID расы");
                    var race = (JObject)entry.DeepClone(); race["packageId"] = m["id"].DeepClone(); race["packageVersion"] = m["version"].DeepClone();
                    ((JArray)result["races"]).Add(race);
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
        public JObject Data(JObject m) { Verify(m, PayloadPath(m)); return ValidateData(m, File.ReadAllText(PayloadPath(m))); }
    }
}
