using System;
using System.IO;
using System.Linq;
using Newtonsoft.Json.Linq;
using DndVtt.UnityPrototype;

class Program
{
    static int checks;
    static void Check(bool ok, string name) { if (!ok) throw new Exception(name); checks++; }
    static void Reject(Action action, string name) { bool rejected = false; try { action(); } catch (Exception) { rejected = true; } Check(rejected, name); }
    static void Main(string[] args)
    {
        string root = Path.Combine(Path.GetTempPath(), "vtt-workshop-test-" + Guid.NewGuid()); Directory.CreateDirectory(root);
        try
        {
            string source = args.Length > 0 ? args[0] : "/workspace";
            string appRoot = args.Length > 1 ? args[1] : Directory.GetCurrentDirectory();
            Check((string)JObject.Parse(File.ReadAllText(Path.Combine(appRoot, "unity/Packages/manifest.json")))["dependencies"]["com.unity.modules.assetbundle"] == "1.0.0", "AssetBundle runtime module present");
            foreach (string file in Directory.GetFiles(Path.Combine(appRoot, "unity/Assets/Vtt"), "*.cs", SearchOption.AllDirectories))
            {
                var tree = Microsoft.CodeAnalysis.CSharp.CSharpSyntaxTree.ParseText(File.ReadAllText(file));
                var errors = tree.GetDiagnostics().Where(d => d.Severity == Microsoft.CodeAnalysis.DiagnosticSeverity.Error).ToArray();
                Check(errors.Length == 0, "C# syntax " + file + " " + string.Join(";", errors.Select(e => e.ToString())));
            }
            WorkshopStore.CheckDownloadSpace(1037, () => 1220000000L);
            Check(true, "tiny race downloads with reported 1.22GB free");
            WorkshopStore.CheckDownloadSpace(1037, () => throw new NotSupportedException("IL2CPP unsupported icall"));
            WorkshopStore.CheckDownloadSpace(1037, () => throw new IOException("probe unavailable"));
            Check(true, "unavailable free-space probe does not block download");
            WorkshopStore.CheckDownloadSpace(1037, () => -1);
            Check(true, "unknown space does not mean full storage");
            Reject(() => WorkshopStore.CheckDownloadSpace(1037, () => 0), "actual full storage blocks download");
            long required = 1037 * 2 + 1024 * 1024;
            WorkshopStore.CheckDownloadSpace(1037, () => required);
            Reject(() => WorkshopStore.CheckDownloadSpace(1037, () => required - 1), "storage reserve boundary");
            var store = new WorkshopStore(Path.Combine(root, "store"));
            Check(store.Installed().Count == 0, "empty offline startup");
            foreach (string repo in new[] { "DnD-VTT-Content", "DnD-VTT-Assets" })
            {
                string catalog = File.ReadAllText(Path.Combine(source, repo, "catalog/v2/index.json"));
                var list = WorkshopStore.Catalog(catalog, repo.EndsWith("Content") ? "packages" : "packs");
                foreach (JObject manifest in list)
                {
                    string id = (string)manifest["id"], original = Path.Combine(source, repo, "packages", Path.GetFileName((string)manifest["url"]));
                    string part = Path.Combine(root, "download"); File.Copy(original, part, true);
                    store.Install(manifest, part, "android-arm64", "6000.3.26f1"); Check(store.Find(id) != null, "install");
                    var restart = new WorkshopStore(store.Root); Check(restart.Find(id) != null, "restart");
                    var data = restart.Data(manifest); Check((string)data["id"] == id, "activation data");
                    if (id == "demo.race.lanternfolk")
                    {
                        var baseline = (JObject)JObject.Parse(File.ReadAllText(Path.Combine(appRoot, "unity/Assets/Vtt/Resources/CharacterSheet/catalog.json")))["creation"];
                        var creation = restart.Creation(baseline);
                        Check(((JArray)creation["races"]).Count == ((JArray)baseline["races"]).Count + 1, "installed race in creation picker");
                        var race = ((JArray)creation["races"]).OfType<JObject>().Last();
                        var cls = new JObject { ["id"] = "test.fighter", ["name"] = "Воин", ["hitDie"] = 10, ["seed"] = new JObject(), ["choices"] = new JArray(), ["levelOneFeatures"] = new JArray() };
                        var bg = new JObject { ["name"] = "Тест", ["seed"] = new JObject(), ["choices"] = new JArray() };
                        var stats = JObject.Parse("{\"str\":10,\"dex\":10,\"con\":10,\"int\":10,\"wis\":10,\"cha\":10}");
                        var hero = CharacterCreation.Create(creation, "Offline hero", race, cls, bg, stats, new JObject(), "manual");
                        Check((int)hero["stats"]["dex"] == 11 && (int)hero["hpMax"] == 10, "downloaded race actual stat bonus");
                        Check((string)hero["raceId"] == id && (string)hero["classId"] == "test.fighter", "stable content IDs saved");
                        string save = Path.Combine(root, "downloaded-character.json");
                        CharacterSheetStore.Save(save, new LegacyCharacterArchive(hero.ToString()));
                        store.Remove(id); var reopened = CharacterSheetStore.Load(save).Snapshot(0);
                        Check((string)reopened["raceId"] == id && (int)reopened["stats"]["dex"] == 11, "character survives package removal restart");
                        Check(restart.Creation(baseline).ToString() == new WorkshopStore(Path.Combine(root, "empty-baseline")).Creation(baseline).ToString(), "uninstall removes choice without changing base");
                        Check((string)reopened["contentPackages"][0]["version"] == "1.0.0", "package version retained in save");
                        File.Copy(original, part, true); store.Install(manifest, part, "android-arm64", "6000.3.26f1");
                    }
                    File.WriteAllText(store.PayloadPath(manifest), "corrupted cached payload");
                    Check(new WorkshopStore(store.Root).Find(id) == null, "corrupt cache not activated after restart");
                    File.Copy(original, part, true); store.Install(manifest, part, "android-arm64", "6000.3.26f1");
                    Check((string)new WorkshopStore(store.Root).Data(manifest)["id"] == id, "retry repairs corrupt cached revision");
                                        var bad = (JObject)manifest.DeepClone(); bad["sha256"] = new string('0', 64); File.Copy(original, part, true);
                    Reject(() => store.Install(bad, part, "android-arm64", "6000.3.26f1"), "corruption rejection"); Check(store.Find(id) != null, "previous revision survives");
                    bad = (JObject)manifest.DeepClone(); bad["dependencies"] = new JArray("missing.dependency");
                    Reject(() => store.Install(bad, part, "android-arm64", "6000.3.26f1"), "missing dependency");
                    bad = (JObject)manifest.DeepClone(); bad["platform"] = "windows-x64";
                    Reject(() => store.Install(bad, part, "android-arm64", "6000.3.26f1"), "platform mismatch");
                    store.Remove(id); Check(new WorkshopStore(store.Root).Find(id) == null, "uninstall restart");
                    File.Copy(original, part, true); store.Install(manifest, part, "windows-x64", "6000.3.26f1"); Check(store.Find(id) != null, "reinstall Windows");
                    bad = (JObject)manifest.DeepClone(); bad["url"] = "https://evil.invalid/package.json";
                    Reject(() => WorkshopStore.ValidateManifest(bad), "untrusted source");
                    bad = (JObject)manifest.DeepClone(); bad["id"] = "../../save";
                    Reject(() => WorkshopStore.ValidateManifest(bad), "path traversal");
                }
            }
            var baseCreation = (JObject)JObject.Parse(File.ReadAllText(Path.Combine(appRoot, "unity/Assets/Vtt/Resources/CharacterSheet/catalog.json")))["creation"];
            Check(((JArray)baseCreation["races"]).Count == 15 && ((JArray)baseCreation["classes"]).Count == 12, "explicit PHB baseline counts");
            Check(!((JArray)baseCreation["races"]).Any(r => new[] { "tortle", "aasimar" }.Contains((string)r["id"])), "non-PHB races physically absent from player catalog");
            Check(!((JArray)baseCreation["classes"]).Any(c => new[] { "blood_hunter", "alchemist", "witch", "occultist", "artificer" }.Contains((string)c["id"])), "non-PHB classes physically absent from player catalog");
            var expanded = store.Creation(baseCreation);
            var downloadedRace = ((JArray)expanded["races"]).OfType<JObject>().Single(r => (string)r["id"] == "tortle");
            var downloadedClass = ((JArray)expanded["classes"]).OfType<JObject>().Single(c => (string)c["id"] == "blood_hunter");
            var downloadedFeat = ((JArray)expanded["feats"]).OfType<JObject>().Single(f => (string)f["id"] == "athlete");
            var answerSet = new JObject { ["creation:feat"] = "athlete", ["feat:athlete:stat"] = "str" };
            foreach (var entry in new[] { downloadedRace, downloadedClass }) foreach (JObject choice in (JArray)entry["choices"])
            {
                var ids = ((JArray)choice["options"]).Select(o => o is JObject obj ? obj["id"] ?? obj["name"] : o).ToArray();
                answerSet[(string)choice["key"]] = (string)choice["type"] == "multi" ? new JArray(ids.Take((int?)choice["count"] ?? 1)) : ids[0].DeepClone();
            }
            var blankBackground = new JObject { ["name"] = "Test", ["seed"] = new JObject(), ["choices"] = new JArray() };
            var stats10 = JObject.Parse("{str:10,dex:10,con:10,int:10,wis:10,cha:10}");
            var optionalHero = CharacterCreation.Create(expanded, "Downloaded character", downloadedRace, downloadedClass, blankBackground, stats10, answerSet, "manual");
            Check((string)optionalHero["raceId"] == "tortle" && (string)optionalHero["classId"] == "blood_hunter", "legacy IDs retained by downloaded race and class");
            Check((int)optionalHero["stats"]["str"] == 13 && ((JArray)optionalHero["feats"]).Any(f => (string)f["id"] == "athlete"), "downloaded feat applies selected stat and persists record");
            Check(((JArray)optionalHero["contentPackages"]).Count == 3, "race class feat package IDs and versions persisted");
            var archiveText = new LegacyCharacterArchive(optionalHero.ToString()).Export();
            foreach (string id in new[] { "dnd.race.tortle", "dnd.class.blood_hunter", "dnd.feat.athlete" }) store.Remove(id);
            var afterRemoval = store.Creation(baseCreation);
            Check(!((JArray)afterRemoval["races"]).Any(r => (string)r["id"] == "tortle") && !((JArray)afterRemoval["classes"]).Any(c => (string)c["id"] == "blood_hunter") && !((JArray)afterRemoval["feats"]).Any(f => (string)f["id"] == "athlete"), "uninstall removes only optional picker entries");
            Check(JToken.DeepEquals(new LegacyCharacterArchive(archiveText).Snapshot(0), optionalHero), "old downloaded character fully survives removed packages and restart");
            var originalManifest = WorkshopStore.Catalog(File.ReadAllText(Path.Combine(source, "DnD-VTT-Content/catalog/v2/index.json")), "packages").OfType<JObject>().First();
            var edited = (JObject)originalManifest.DeepClone(); edited["bytes"] = WorkshopStore.MaxPackageBytes + 1;
            Reject(() => WorkshopStore.ValidateManifest(edited), "oversized payload");
            edited = (JObject)originalManifest.DeepClone(); edited["dependencies"] = new JArray((string)edited["id"]);
            Reject(() => WorkshopStore.ValidateManifest(edited), "self dependency");
            edited = (JObject)originalManifest.DeepClone(); edited["format"] = "dll";
            Reject(() => WorkshopStore.ValidateManifest(edited), "executable package");
            var raceData = store.Data(originalManifest); var invalid = (JObject)raceData.DeepClone();
            invalid["races"][0]["seed"]["arbitraryScript"] = "run()";
            Reject(() => WorkshopStore.ValidateData(originalManifest, invalid.ToString()), "unsupported race mechanics");
            invalid = (JObject)raceData.DeepClone(); invalid["races"][0]["seed"]["stats"]["dex"] = 999;
            Reject(() => WorkshopStore.ValidateData(originalManifest, invalid.ToString()), "unbounded stat bonus");
            invalid = (JObject)raceData.DeepClone(); invalid["races"][0]["id"] = "human";
            Reject(() => WorkshopStore.ValidateData(originalManifest, invalid.ToString()), "base race collision");
            invalid = (JObject)raceData.DeepClone(); invalid["version"] = "8.0.0";
            Reject(() => WorkshopStore.ValidateData(originalManifest, invalid.ToString()), "payload version mismatch");
            // A dependency protects uninstall, including after a restart. Updates
            // that introduce a cycle must not replace the previous revision.
            var dependent = (JObject)originalManifest.DeepClone(); dependent["id"] = "demo.race.dependent"; dependent["dependencies"] = new JArray((string)originalManifest["id"]);
            var payload = (JObject)raceData.DeepClone(); payload["id"] = dependent["id"].DeepClone(); payload["races"][0]["id"] = dependent["id"].DeepClone();
            string staged = Path.Combine(root, "dependent.json"); File.WriteAllText(staged, payload.ToString()); dependent["bytes"] = new FileInfo(staged).Length; dependent["sha256"] = WorkshopStore.DigestFile(staged);
            store.Install(dependent, staged, "android-arm64", "6000.3.26f1");
            Reject(() => new WorkshopStore(store.Root).Remove((string)originalManifest["id"]), "dependency uninstall protected after restart");
            edited = (JObject)originalManifest.DeepClone(); edited["dependencies"] = new JArray((string)dependent["id"]);
            File.Copy(store.PayloadPath(originalManifest), staged, true);
            Reject(() => store.Install(edited, staged, "android-arm64", "6000.3.26f1"), "transitive dependency cycle rejected");
            Check(((JArray)store.Find((string)originalManifest["id"])["dependencies"]).Count == 0, "cycle rejection keeps active revision");
            store.Remove((string)dependent["id"]);
                        var neighbor = (JObject)originalManifest.DeepClone(); neighbor["id"] = (string)originalManifest["id"] + "-neighbor";
            var neighborData = (JObject)raceData.DeepClone(); neighborData["id"] = neighbor["id"].DeepClone(); neighborData["races"][0]["id"] = neighbor["id"].DeepClone();
            File.WriteAllText(staged, neighborData.ToString()); neighbor["bytes"] = new FileInfo(staged).Length; neighbor["sha256"] = WorkshopStore.DigestFile(staged);
            store.Install(neighbor, staged, "android-arm64", "6000.3.26f1");
            store.Remove((string)originalManifest["id"]);
            Check(new WorkshopStore(store.Root).Find((string)neighbor["id"]) != null, "uninstall preserves similarly prefixed package");
                        string saves = Path.Combine(root, "characters.json"); File.WriteAllText(saves, "{\"unknown\":[1,2,3]}");
            foreach (JObject m in store.Installed()) store.Remove((string)m["id"]);
            Check(File.ReadAllText(saves) == "{\"unknown\":[1,2,3]}", "user saves untouched");
            Reject(() => WorkshopStore.Parse("{\"id\":1,\"id\":2}"), "duplicate JSON keys");
            Check(!WorkshopStore.ValidId(".."), "dot traversal");
            Console.WriteLine("WORKSHOP_STORE_PASS " + checks + " checks");
        }
        finally { Directory.Delete(root, true); }
    }
}
