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
        if(args.Length>0 && args[0]=="--all-collections") { Console.WriteLine("ALL_MOD_COLLECTIONS_PASS "+AllModCollectionChecks.Run(args[1]));return; }
        if(args.Length>0 && args[0]=="--collections") { Console.WriteLine("COLLECTIONS_PASS "+CollectionChecks.Run(args[1]));return; }
        string root = Path.Combine(Path.GetTempPath(), "vtt-workshop-test-" + Guid.NewGuid()); Directory.CreateDirectory(root);
        try
        {
            var iconThemes=new[]{new DiceTheme {Id="a",Icon="dnd.appearance.icon.01"},new DiceTheme {Id="b",Icon="dnd.appearance.icon.02"},new DiceTheme {Id="default",Icon="dnd.appearance.icon.default"}};
            Check(DiceTheme.ForIcon(iconThemes,"dnd.appearance.icon.01").Id=="a","selected icon selects same dice set");
            Check(DiceTheme.ForIcon(iconThemes,"dnd.appearance.icon.02").Id=="b","changing icon switches set");
            Check(DiceTheme.ForIcon(iconThemes,"").Id=="default","default launcher uses default set");
            Check(DiceTheme.ForIcon(iconThemes,"dnd.appearance.icon.03")==null,"missing linked set never uses another icon");
            Check(DiceTheme.ForIcon(null,"dnd.appearance.icon.01")==null,"empty installations use classic");
            Check(DiceTheme.ForSelection(iconThemes,"dnd.appearance.icon.02","a",false).Id=="a","manual downloaded set wins over another app icon");
            Check(DiceTheme.ForSelection(iconThemes,"dnd.appearance.icon.02","a",true).Id=="b","explicit follow-icon mode");
            Check(DiceTheme.ForSelection(iconThemes,"dnd.appearance.icon.02","",false)==null,"explicit classic survives installed icon set");
            Check(DiceTheme.ForSelection(iconThemes,"dnd.appearance.icon.02","removed",false)==null,"removed manual set does not silently substitute a different one");
            var mixed=DiceRollRequest.Parse("7d20 + 3d6 + 1d8");
            Check(mixed.Count==11,"mixed request count");
            int requested=0;while(mixed.Pending) { var batch=mixed.TakeBatch(8);Check(batch.Length>0&&batch.Length<=8,"bounded batch");foreach(int n in batch) { mixed.Accept(n,n);requested++; } }
            Check(requested==11&&mixed.Total==166,"mixed totals");
            var huge=DiceRollRequest.Parse("999999999999999999999999999999d20");
            Check(huge.TakeBatch(8).Length==8&&huge.Count>long.MaxValue,"unbounded quantity never expanded");
            var percentiles=DiceRollRequest.Parse("9d100");Check(percentiles.TakeBatch(8).Length==4,"percentile bodies bounded");
            foreach(string bad in new[]{"0d20","-1d6","d7","1d20+","NaNd6","1d6x","1d6 + 2"})Reject(()=>DiceRollRequest.Parse(bad),"invalid throw "+bad);
            Check(DiceRollRequest.Parse("20d20").TakeBatch(20).Length==20,"twenty simultaneous physical slots");
            Check(DiceRollRequest.Parse("20d100").TakeBatch(20).Length==10,"twenty physical slots for percentile pairs");
            var motion=new DiceMotion();int releases=0;
            for(int i=0;i<600;i++)if(motion.Sample(0,-1,0,1f/60))releases++;
            Check(releases==0,"gravity alone never throws");
            motion.Reset();
            for(int i=0;i<480;i++)if(motion.Sample((float)Math.Sin(i*Math.PI/240),-(float)Math.Cos(i*Math.PI/240),0,1f/60))releases++;
            Check(releases==0,"ordinary gradual orientation change never throws");
            motion.Reset();motion.Sample(0,-1,0,1f/60);
            for(int i=0;i<120;i++)if(motion.Sample(i<12?4:0,-1,0,1f/60))releases++;
            Check(releases==0,"single pickup jolt does not count as repeated shaking");
            float Gesture(float amplitude) {
                var filter=new DiceMotion();float strength=0;int events=0;
                for(int i=0;i<60;i++)filter.Sample(0,-1,0,1f/60);
                for(int i=0;i<210;i++)if(filter.Sample(i<72?(float)Math.Sin(i*.65)*amplitude:0,-1,0,1f/60)) { events++;strength=filter.Strength; }
                Check(events==1,"one release per shake, quiet cooldown");return strength;
            }
            float gentle=Gesture(1.4f),strong=Gesture(4);
            Check(strong>gentle&&strong<=1&&gentle>0,"shake amplitude changes bounded launch strength");
            var cancelledGesture=new DiceMotion();cancelledGesture.Sample(0,-1,0,1f/60);
            for(int i=0;i<72;i++)cancelledGesture.Sample((float)Math.Sin(i*.65)*4,-1,0,1f/60);
            cancelledGesture.Reset();int staleReleases=0;
            for(int i=0;i<180;i++)if(cancelledGesture.Sample(0,-1,0,1f/60))staleReleases++;
            Check(staleReleases==0,"cancel/focus reset discards a pending shake release");
            motion.Reset();Check(!motion.Sample(float.NaN,0,0,.1f),"invalid sensor sample ignored");
            string source = args.Length > 0 ? args[0] : "/workspace";
            string appRoot = args.Length > 1 ? args[1] : Directory.GetCurrentDirectory();
            Check((string)JObject.Parse(File.ReadAllText(Path.Combine(appRoot, "unity/Packages/manifest.json")))["dependencies"]["com.unity.modules.assetbundle"] == "1.0.0", "AssetBundle runtime module present");
            foreach (string file in Directory.GetFiles(Path.Combine(appRoot, "unity/Assets/Vtt"), "*.cs", SearchOption.AllDirectories))
            {
                var tree = Microsoft.CodeAnalysis.CSharp.CSharpSyntaxTree.ParseText(File.ReadAllText(file));
                var errors = tree.GetDiagnostics().Where(d => d.Severity == Microsoft.CodeAnalysis.DiagnosticSeverity.Error).ToArray();
                Check(errors.Length == 0, "C# syntax " + file + " " + string.Join(";", errors.Select(e => e.ToString())));
            }
            var trayCatalog=WorkshopStore.Catalog(File.ReadAllText(Path.Combine(source,"DnD-VTT-Assets/catalog/v9/index.json")),"packs");
            var trayStore=new WorkshopStore(Path.Combine(root,"trays"));int trayCount=0;
            foreach(JObject m in trayCatalog.Where(m=>(string)m["imageKind"]=="dice-tray")) {
                var trayPayload=Path.Combine(source,"DnD-VTT-Assets/packages",Path.GetFileName((string)m["url"]));WorkshopStore.Verify(m,trayPayload);
                string text=File.ReadAllText(trayPayload);var data=WorkshopStore.ValidateData(m,text);var tray=DiceTray.Read((JObject)data["diceTrays"][0]);
                Check(tray.Id==(string)m["id"]+".tray"&&WorkshopStore.CategoryPath(m)=="Оформление/Лотки и башни","verified native tray and category");
                var trayDownload=Path.Combine(root,"tray-download.json");File.Copy(trayPayload,trayDownload,true);
                trayStore.Install(m,trayDownload,"android-arm64","6000.3.26f1");
                Check(new WorkshopStore(trayStore.Root).Find((string)m["id"])!=null,"tray survives restart");
                foreach(var bad in new[]{new[]{"profile","shell"},new[]{"print","remote-url"},new[]{"floor","NaN"},new[]{"id","other.tray"}}) {
                    var copy=(JObject)data.DeepClone();copy["diceTrays"][0][bad[0]]=bad[1];Reject(()=>WorkshopStore.ValidateData(m,copy.ToString()),"invalid tray "+bad[0]);
                }
                var extra=(JObject)data.DeepClone();extra["diceTrays"][0]["script"]="exec";Reject(()=>WorkshopStore.ValidateData(m,extra.ToString()),"downloaded script rejected");
                extra=(JObject)data.DeepClone();extra["surfaces"]=new JArray();Reject(()=>WorkshopStore.ValidateData(m,extra.ToString()),"mixed tray payload rejected");trayCount++;
            }
            Check(trayCount==4,"four installable tray profiles");
            var diceCatalog=WorkshopStore.Catalog(File.ReadAllText(Path.Combine(source,"DnD-VTT-Assets/catalog/v5/index.json")),"packs");
            var themes=diceCatalog.OfType<JObject>().Where(m=>(string)m["imageKind"]=="dice").ToArray();
            Check(themes.Length==31,"31 icon-linked full sets");
            foreach(var m in themes) {
                var themePayload=Path.Combine(source,"DnD-VTT-Assets/packages",Path.GetFileName((string)m["url"]));WorkshopStore.Verify(m,themePayload);
                var data=WorkshopStore.ValidateData(m,File.ReadAllText(themePayload));
                Check(WorkshopStore.CategoryPath(m)=="Оформление/3D Дайсы","dice subgroup");
                var copy=(JObject)data.DeepClone();copy["diceThemes"][0]["length"]=999;
                Reject(()=>WorkshopStore.ValidateData(m,copy.ToString()),"oversized ornament rejected");
                copy=(JObject)data.DeepClone();copy["diceThemes"][0]["shape"]="script";
                Reject(()=>WorkshopStore.ValidateData(m,copy.ToString()),"executable theme rejected");
            }
            var texturedPath=Path.Combine(source,"DnD-VTT-Assets/catalog/v6/index.json");
            if(File.Exists(texturedPath)) {
                var texturedCatalog=WorkshopStore.Catalog(File.ReadAllText(texturedPath),"packs");int materialSets=0;
                foreach(JObject manifest in texturedCatalog) {
                    if((string)manifest["imageKind"]!="dice")continue;
                    string path=Path.Combine(source,"DnD-VTT-Assets/packages",Path.GetFileName((string)manifest["url"]));WorkshopStore.Verify(manifest,path);
                    var data=WorkshopStore.ValidateData(manifest,File.ReadAllText(path));var recipe=(JObject)data["diceThemes"][0];
                    var selected=DiceTheme.Read(recipe,true);Check(selected.TexturePng?.Length>10000,"actual texture bytes loaded for selected set");
                    Check(((JArray)manifest["dependencies"]).Count==0,"textured set install independent from launcher icon");
                    Check(DiceTheme.Read(recipe).TexturePng==null,"library metadata does not retain all decoded textures");
                    var bad=(JObject)recipe.DeepClone();bad["faceTile"]=4;Reject(()=>DiceTheme.Read(bad),"atlas index bounded");
                    bad=(JObject)recipe.DeepClone();bad["albedo"]["sha256"]=new string('0',64);Reject(()=>DiceTheme.Read(bad),"texture hash checked");
                    materialSets++;
                }
                Check(materialSets==31,"all31 textured recipes checked");
            }
            var experiments=WorkshopStore.Catalog(File.ReadAllText(Path.Combine(source,"DnD-VTT-Assets/catalog/v8/index.json")),"packs");int six=0;
            foreach(JObject manifest in experiments.Where(m=>(string)m["version"]=="1.2.1"&&(string)m["imageKind"]=="dice")) {
                string path=Path.Combine(source,"DnD-VTT-Assets/packages",Path.GetFileName((string)manifest["url"]));WorkshopStore.Verify(manifest,path);
                var recipe=(JObject)WorkshopStore.ValidateData(manifest,File.ReadAllText(path))["diceThemes"][0];var parsed=DiceTheme.Read(recipe,true);
                Check(parsed.NumberedAtlas&&parsed.TexturePng.Length>10000,"real complete numbered atlas selected");
                Check(new[]{"abyss","ice","blood","stone","vine","slime"}.Contains(parsed.Behavior),"allowlisted behavior profile");
                var bad=(JObject)recipe.DeepClone();bad["behavior"]="execute";Reject(()=>DiceTheme.Read(bad),"downloaded code profile rejected");
                bad=(JObject)recipe.DeepClone();bad["albedo"]["width"]=1024;Reject(()=>DiceTheme.Read(bad),"wrong numbered atlas layout rejected");
                bad=(JObject)recipe.DeepClone();bad.Remove("albedo");Reject(()=>DiceTheme.Read(bad),"numbered profile requires verified image");six++;
            }
            Check(six==6,"all six experimental payloads validated");
            var previewCatalog=WorkshopStore.Catalog(File.ReadAllText(Path.Combine(source,"DnD-VTT-Assets/catalog/v4/index.json")),"packs");int previewCount=0;
            foreach(JObject entry in previewCatalog)if(entry["preview"] is JObject preview) {
                byte[] bytes=File.ReadAllBytes(Path.Combine(source,"DnD-VTT-Assets/previews",Path.GetFileName((string)preview["url"])));
                Check(WorkshopStore.PreviewBytes(preview,bytes).Length==bytes.Length,"public preview SHA and bounded JPEG dimensions");previewCount++;
                var bad=(JObject)preview.DeepClone();bad["url"]="https://example.invalid/preview.jpg";Reject(()=>WorkshopStore.ValidatePreview(bad),"external preview source rejected");
                bad=(JObject)preview.DeepClone();bad["width"]=9999;Reject(()=>WorkshopStore.PreviewBytes(bad,bytes),"decompression size rejected before decode");
                var tampered=(byte[])bytes.Clone();tampered[tampered.Length-1]^=1;Reject(()=>WorkshopStore.PreviewBytes(preview,tampered),"tampered preview rejected");
            }
            Check(previewCount==75,"all current graphical packages have small previews");
            Check(WorkshopStore.CategoryPath(JObject.Parse("{type:'appearance',imageKind:'wallpaper'}"))=="Оформление/Обои","wallpaper subgroup");
            Check(WorkshopStore.CategoryPath(JObject.Parse("{type:'appearance',imageKind:'icon'}"))=="Оформление/Иконки","icon subgroup separate from wallpaper");
            Check(WorkshopStore.CategoryPath(JObject.Parse("{type:'item',id:'dnd.items.weapons'}"))=="Инвентарь/Оружие","inventory tree subgroup");
            Check(WorkshopStore.CategoryPath(JObject.Parse("{type:'craft',id:'dnd.alchemy.ingredients.1'}"))=="Крафт и алхимия/Алхимия/Ингредиенты","three-level alchemy branch");
            var imageBytes=File.ReadAllBytes(Path.Combine(appRoot,"wallpapers/6.png"));
            int iw=0,ih=0;for(int n=0;n<4;n++) { iw=(iw<<8)|imageBytes[16+n];ih=(ih<<8)|imageBytes[20+n]; }
            var imageEntry=new JObject { ["id"]="demo.image.image",["name"]="Own fixture",["kind"]="wallpaper",["width"]=iw,["height"]=ih,["sha256"]=WorkshopStore.Digest(imageBytes),["pngBase64"]=Convert.ToBase64String(imageBytes) };
            var imageManifest=new JObject { ["id"]="demo.image",["version"]="1.0.0",["type"]="appearance",["imageKind"]="wallpaper" };
            var imageData=new JObject { ["schemaVersion"]=1,["id"]="demo.image",["version"]="1.0.0",["type"]="appearance",["images"]=new JArray(imageEntry) };
            Check(WorkshopStore.ValidateData(imageManifest,imageData.ToString())!=null,"downloadable PNG appearance validates");
            imageEntry["sha256"]=new string('a',64);Reject(()=>WorkshopStore.ValidateData(imageManifest,imageData.ToString()),"PNG tampering rejected");imageEntry["sha256"]=WorkshopStore.Digest(imageBytes);
            imageEntry["width"]=999999;Reject(()=>WorkshopStore.ValidateData(imageManifest,imageData.ToString()),"oversized/mismatched PNG dimensions rejected");imageEntry["width"]=iw;
            imageData["objects"]=new JArray();Reject(()=>WorkshopStore.ValidateData(imageManifest,imageData.ToString()),"image package cannot smuggle unvalidated world objects");imageData.Remove("objects");
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
            var art = File.ReadAllBytes(Path.Combine(appRoot, "unity/Assets/StreamingAssets/Branding/Splash19.png"));
            var optimizedArt = BuildBranding.OptimizePng(art);
            Check(art.Length - optimizedArt.Length == 6854025, "only known non-rendering PNG container omitted");
            Check(BuildBranding.OptimizePng(optimizedArt).SequenceEqual(optimizedArt), "PNG optimizer idempotent");
            Reject(() => BuildBranding.OptimizePng(art.Take(art.Length - 1).ToArray()), "truncated PNG rejected");
            Reject(() => BuildBranding.OptimizePng(new byte[40]), "invalid PNG signature rejected");
            string artDirectory = Path.Combine(root, "art"); Directory.CreateDirectory(artDirectory);
            string artPath = Path.Combine(artDirectory, "Splash19.png"); File.WriteAllBytes(artPath, art);
            try { using var scope = new BuildBranding.Scope(artDirectory); Check(File.ReadAllBytes(artPath).SequenceEqual(optimizedArt), "packaging uses optimized copy"); throw new IOException("simulated build failure"); }
            catch (IOException) { }
            Check(File.ReadAllBytes(artPath).SequenceEqual(art), "build failure restores exact original source artwork");
            var store = new WorkshopStore(Path.Combine(root, "store"));
            Check(store.Installed().Count == 0, "empty offline startup");
            foreach (string repo in new[] { "DnD-VTT-Content", "DnD-VTT-Assets" })
            {
                string catalog = File.ReadAllText(Path.Combine(source, repo, repo.EndsWith("Content") ? "catalog/v3/index.json" : "catalog/v3/index.json"));
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
            var collectionMarkers=store.Installed().OfType<JObject>().Where(m=>(bool?)m["modCategoryCollection"]==true).OrderBy(m=>(string)m["collectionRole"]=="category"?0:1).ToArray();
            if(collectionMarkers.Length>0) {
                Reject(()=>store.Remove("dnd.race.tortle"),"required race cannot be removed while collection marker is installed");
                foreach(var marker in collectionMarkers)store.Remove((string)marker["id"]);
                Check(store.Find("dnd.race.tortle")!=null,"removing collection marker preserves original mod");
            }
            foreach (string id in new[] { "dnd.race.tortle", "dnd.class.blood_hunter", "dnd.feat.athlete" }) store.Remove(id);
            var afterRemoval = store.Creation(baseCreation);
            Check(!((JArray)afterRemoval["races"]).Any(r => (string)r["id"] == "tortle") && !((JArray)afterRemoval["classes"]).Any(c => (string)c["id"] == "blood_hunter") && !((JArray)afterRemoval["feats"]).Any(f => (string)f["id"] == "athlete"), "uninstall removes only optional picker entries");
            Check(JToken.DeepEquals(new LegacyCharacterArchive(archiveText).Snapshot(0), optionalHero), "old downloaded character fully survives removed packages and restart");
            checks += CommerceChecks.Run(store,appRoot);
            if(File.Exists(Path.Combine(source,"DnD-VTT-Content/packages/dnd.collections.weapons-1.0.0.json"))) checks += CollectionChecks.Run(Path.Combine(source,"DnD-VTT-Content"));
            checks += AccountGestureChecks.Run(appRoot);
            if(File.Exists(Path.Combine(source,"DnD-VTT-Content/packages/dnd.collections.races-1.0.0.json"))) checks += AllModCollectionChecks.Run(source);
            var originalManifest = WorkshopStore.Catalog(File.ReadAllText(Path.Combine(source, "DnD-VTT-Content/catalog/v3/index.json")), "packages").OfType<JObject>().First();
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
            while (store.Installed().Count > 0)
            {
                var remaining = store.Installed().OfType<JObject>().ToArray();
                var leaf = remaining.First(m => !remaining.Any(other => ((JArray)other["dependencies"]).Values<string>().Contains((string)m["id"])));
                store.Remove((string)leaf["id"]);
            }
            Check(File.ReadAllText(saves) == "{\"unknown\":[1,2,3]}", "user saves untouched");
            Reject(() => WorkshopStore.Parse("{\"id\":1,\"id\":2}"), "duplicate JSON keys");
            Check(!WorkshopStore.ValidId(".."), "dot traversal");
            Console.WriteLine("WORKSHOP_STORE_PASS " + checks + " checks");
        }
        finally { Directory.Delete(root, true); }
    }
}
