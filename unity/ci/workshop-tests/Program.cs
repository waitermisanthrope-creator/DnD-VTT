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
            foreach (string file in Directory.GetFiles(Path.Combine(appRoot, "unity/Assets/Vtt"), "*.cs", SearchOption.AllDirectories))
            {
                var tree = Microsoft.CodeAnalysis.CSharp.CSharpSyntaxTree.ParseText(File.ReadAllText(file));
                var errors = tree.GetDiagnostics().Where(d => d.Severity == Microsoft.CodeAnalysis.DiagnosticSeverity.Error).ToArray();
                Check(errors.Length == 0, "C# syntax " + file + " " + string.Join(";", errors.Select(e => e.ToString())));
            }
            var store = new WorkshopStore(Path.Combine(root, "store"));
            Check(store.Installed().Count == 0, "empty offline startup");
            foreach (string repo in new[] { "DnD-VTT-Content", "DnD-VTT-Assets" })
            {
                string catalog = File.ReadAllText(Path.Combine(source, repo, "catalog/v1/index.json"));
                var list = WorkshopStore.Catalog(catalog, repo.EndsWith("Content") ? "packages" : "packs");
                foreach (JObject manifest in list)
                {
                    string id = (string)manifest["id"], original = Path.Combine(source, repo, "packages", Path.GetFileName((string)manifest["url"]));
                    string part = Path.Combine(root, "download"); File.Copy(original, part, true);
                    store.Install(manifest, part, "android-arm64", "6000.3.26f1"); Check(store.Find(id) != null, "install");
                    var restart = new WorkshopStore(store.Root); Check(restart.Find(id) != null, "restart");
                    var data = restart.Data(manifest); Check((string)data["id"] == id, "activation data");
                    if ((string)manifest["type"] == "race")
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
                        Check(restart.Creation(baseline).ToString() == baseline.ToString(), "uninstall removes choice without changing base");
                        Check((string)reopened["contentPackages"][0]["version"] == "1.0.0", "package version retained in save");
                        File.Copy(original, part, true); store.Install(manifest, part, "android-arm64", "6000.3.26f1");
                    }
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
