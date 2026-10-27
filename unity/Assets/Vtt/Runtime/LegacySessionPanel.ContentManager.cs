using System;
using System.Collections;
using System.IO;
using System.Linq;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;
using UnityEngine;
using UnityEngine.Networking;

namespace DndVtt.UnityPrototype
{
    public sealed partial class LegacySessionPanel
    {
        private const string CatalogUrl = "https://raw.githubusercontent.com/waitermisanthrope-creator/DnD-VTT-Content/main/catalog/v3/index.json";
        private const string AssetsCatalogUrl = "https://raw.githubusercontent.com/waitermisanthrope-creator/DnD-VTT-Assets/main/catalog/v9/index.json";
        private WorkshopStore workshopStore;
        private WorkshopRuntime workshop;
        private bool contentBusy, installedOnly,contentCatalogAutoRefreshed,contentShowParts;
        private bool contentCollectionsPage=true;
        private float contentProgress;
        private int contentCategory;
        private string contentSearch = "", contentNotice = "Каталоги доступны через интернет; установленные пакеты работают офлайн.";
        private JArray contentPackages = new JArray(), assetPacks = new JArray();
        private JObject contentDetails;
        private const int ContentPageSize=12;
        private int ContentPageLimit=>contentCollectionsPage?24:ContentPageSize;
        private int contentPage,contentViewCategory=-1;
        private bool contentViewDirty=true,contentViewInstalledOnly;
        private string contentViewSearch,contentViewGroup;
        private string contentGroupPath="";
        private List<string> contentTreeChildren=new List<string>();
        private Dictionary<string,int> contentTreeCounts=new Dictionary<string,int>();
        private int contentViewRevision;
        private List<JObject> contentView=new List<JObject>();
        private Dictionary<string,JObject> contentInstalled=new Dictionary<string,JObject>();
        private Dictionary<string,string> contentAvailability=new Dictionary<string,string>();
        private void RebuildContentView()
        {
            contentInstalled=workshopStore.Installed().OfType<JObject>().ToDictionary(m=>(string)m["id"]);
            var all=contentPackages.Concat(assetPacks).OfType<JObject>().GroupBy(m=>(string)m["id"]).Select(g=>g.First()).ToList();
            var ids=new HashSet<string>(all.Select(m=>(string)m["id"]));
            all.AddRange(contentInstalled.Values.Where(m=>!ids.Contains((string)m["id"])));
            var collectionParts=WorkshopStore.CollectionParts(all);
            var eligible=all.Where(m=>(!contentCollectionsPage || (string)m["collectionRole"]=="category")&&(contentShowParts || !collectionParts.Contains((string)m["id"]))&&(!installedOnly||contentInstalled.ContainsKey((string)m["id"]))&&(contentCategory==0||(string)m["type"]==ContentTypes[contentCategory]||ContentTypes[contentCategory]=="item"&&(string)m["type"]=="collection")&&
                (m["name"]+" "+m["id"]+" "+m["author"]+" "+WorkshopStore.CategoryPath(m)).IndexOf(contentSearch,StringComparison.OrdinalIgnoreCase)>=0)
                .OrderBy(m=>contentCollectionsPage&&(string)m["collectionRole"]=="category"?0:1)
                .ThenBy(m=>contentCollectionsPage?WorkshopStore.CollectionOrder(m):0).ToList();
            string prefix=contentGroupPath==""?"":contentGroupPath+"/";
            contentView=eligible.Where(m=>contentGroupPath==""||WorkshopStore.CategoryPath(m)==contentGroupPath||WorkshopStore.CategoryPath(m).StartsWith(prefix,StringComparison.Ordinal)).ToList();
            contentTreeCounts.Clear();
            foreach(var item in eligible) {
                string group=WorkshopStore.CategoryPath(item);if(!group.StartsWith(prefix,StringComparison.Ordinal)||group==contentGroupPath)continue;
                string child=prefix+group.Substring(prefix.Length).Split('/')[0];
                if(!contentTreeCounts.ContainsKey(child))contentTreeCounts[child]=0;contentTreeCounts[child]++;
            }
            contentTreeChildren=contentTreeCounts.Keys.OrderBy(k=>k,StringComparer.Ordinal).ToList();contentViewGroup=contentGroupPath;contentViewRevision++;
            contentAvailability.Clear();contentViewDirty=false;contentViewCategory=contentCategory;contentViewSearch=contentSearch;contentViewInstalledOnly=installedOnly;contentPage=0;contentDetails=null;
        }
        private void EnsureContentView()
        {
            if(contentViewDirty||contentViewCategory!=contentCategory||contentViewSearch!=contentSearch||contentViewInstalledOnly!=installedOnly||contentViewGroup!=contentGroupPath)RebuildContentView();
        }
        private IEnumerable<JObject> VisibleContentPage()=>contentView.Skip(contentPage*ContentPageLimit).Take(ContentPageLimit);
        private void DrawContentTree()
        {
            GUILayout.Label(contentGroupPath==""?"Все категории":"Все / "+contentGroupPath,muted);
            if(contentGroupPath!=""||contentCategory>0) {
                GUILayout.BeginHorizontal();
                if(GUILayout.Button("Все категории",GUILayout.MinHeight(50))) { contentGroupPath="";contentCategory=0;frontScroll=Vector2.zero; }
                if(contentGroupPath!=""&&GUILayout.Button("← На уровень выше",GUILayout.MinHeight(50))) { int slash=contentGroupPath.LastIndexOf('/');contentGroupPath=slash<0?"":contentGroupPath.Substring(0,slash);if(contentGroupPath=="")contentCategory=0;frontScroll=Vector2.zero; }
                GUILayout.EndHorizontal();
            }
            for(int i=0;i<contentTreeChildren.Count;i+=2) {
                GUILayout.BeginHorizontal();for(int j=i;j<Math.Min(i+2,contentTreeChildren.Count);j++) {
                    string group=contentTreeChildren[j];string label=group.Split('/').Last()+" · "+contentTreeCounts[group];
                    if(GUILayout.Button(label,GUILayout.MinHeight(56))) { contentGroupPath=group;frontScroll=Vector2.zero; }
                }GUILayout.EndHorizontal();
            }
        }
        private void DrawContentPagination()
        {
            int pages=Math.Max(1,(contentView.Count+ContentPageLimit-1)/ContentPageLimit);
            GUILayout.Label("Материалов: "+contentView.Count+" · Страница "+(contentPage+1)+" из "+pages,muted);
            if(pages==1)return;
            GUILayout.BeginHorizontal();bool enabled=GUI.enabled;GUI.enabled=enabled&&contentPage>0;
            if(GUILayout.Button("← Назад",GUILayout.MinHeight(52))) { contentPage--;contentDetails=null;frontScroll=Vector2.zero; }
            GUI.enabled=enabled&&contentPage+1<pages;
            if(GUILayout.Button("Далее →",GUILayout.MinHeight(52))) { contentPage++;contentDetails=null;frontScroll=Vector2.zero; }
            GUI.enabled=enabled;GUILayout.EndHorizontal();
        }
        private static readonly string[] ContentCategories = { "Все", "Игровые системы", "Расы", "Классы", "Черты", "Подклассы", "Заклинания", "Предметы", "Монстры", "3D-модели", "Окружение", "Текстуры", "Анимации", "Карты", "Оформление", "Коллекции", "Крафт и алхимия" };
        private static readonly string[] ContentTypes = { "", "game-system", "race", "class", "feat", "subclass", "spell", "item", "monster", "model", "environment", "texture", "animation", "map", "appearance", "collection", "craft" };
        private string ContentDirectory => Path.Combine(Application.persistentDataPath, "workshop-v1");
        private void InitializeWorkshop()
        {
            if (workshopStore != null) return;
            Application.lowMemory += OnWorkshopLowMemory;
            workshopStore = new WorkshopStore(ContentDirectory); workshop = new WorkshopRuntime(workshopStore); workshop.ActivateData();
            foreach (string pair in new[] { "content", "assets" })
            {
                string path = Path.Combine(ContentDirectory, pair + ".catalog");
                if (!File.Exists(path)) continue;
                try { var entries = WorkshopStore.Catalog(File.ReadAllText(path), pair == "content" ? "packages" : "packs"); if (pair == "content") contentPackages = entries; else assetPacks = entries; }
                catch (Exception e) { contentNotice = "Кеш каталога отклонён: " + e.Message; }
            }
            creationCatalog = null;
        }
        private void OnWorkshopLowMemory() { ReleaseHeroArt(); ReleaseAppearanceImages(false);workshop?.ReleaseBundleCache(); }
        private void OnDestroy() { ReleaseHeroArt(); CloseCharacterStudio(); CloseDiceTable(); CloseWorkshopPreviews(); Application.lowMemory -= OnWorkshopLowMemory; workshop?.Dispose(); ReleaseAppearanceImages(true);ReleaseBrandStyles();  ApplyScreenSleep(false); }
        private void RefreshWorkshop()
        {
            // Destroy geometry before unloading owned resources, then reconstruct
            // from preserved JSON. Missing resources become visible placeholders.
            contentViewDirty=true;ReleaseAppearanceImages(true);
            world.ClearWorkshopGeometry(); workshop.Dispose(); workshop = new WorkshopRuntime(workshopStore); workshop.ActivateData(); creationCatalog = null; commerceCatalog = null; itemCatalog = null;
            world.Workshop = workshop; world.ReloadCurrent();
        }
        private void OpenContentManager() { InitializeWorkshop(); contentViewDirty=true; contentCollectionsPage=true;contentCategory = 0; contentGroupPath="";contentDetails = null;Navigate(FrontScreen.ContentManager); }
        private IEnumerator FetchContentCatalog()
        {
            contentBusy = true;
            foreach (string kind in new[] { "content", "assets" })
            {
                string path = Path.Combine(ContentDirectory, kind + ".catalog.part-download");
                WorkshopDownload handler = null; UnityWebRequest request = null;
                try { handler = new WorkshopDownload(path, WorkshopStore.MaxCatalogBytes); request = new UnityWebRequest(kind == "content" ? CatalogUrl : AssetsCatalogUrl, "GET", handler, null); request.timeout = 25; request.redirectLimit = 0; }
                catch (Exception e) { contentNotice = e.Message; }
                if (request == null) { handler?.Close(); continue; }
                using (request)
                {
                    yield return request.SendWebRequest(); handler.Close();
                    try
                    {
                        if (request.result != UnityWebRequest.Result.Success) throw new IOException(handler.Failure ?? request.error);
                        string text = File.ReadAllText(path); var list = WorkshopStore.Catalog(text, kind == "content" ? "packages" : "packs");
                        WorkshopStore.AtomicText(Path.Combine(ContentDirectory, kind + ".catalog"), text);
                        if (kind == "content") contentPackages = list; else assetPacks = list;
                        contentNotice = "Каталог обновлён. Доступно: " + (contentPackages.Count + assetPacks.Count);
                    }
                    catch (Exception e) { contentNotice = "Каталог недоступен; сохранён офлайн-кеш: " + e.Message; }
                    finally { if (File.Exists(path)) File.Delete(path); }
                }
            }
            contentBusy = false;contentViewDirty=true;
        }
        private long ReadWorkshopFreeBytes()
        {
#if UNITY_ANDROID && !UNITY_EDITOR
            // DriveInfo invokes unsupported IL2CPP icalls on Android. Query the
            // actual app-data filesystem, not the root filesystem or shared storage.
            using (var stat = new AndroidJavaObject("android.os.StatFs", ContentDirectory))
                return stat.Call<long>("getAvailableBytes");
#else
            return new DriveInfo(Path.GetPathRoot(ContentDirectory)).AvailableFreeSpace;
#endif
        }
        private JArray ContentInstallPlan(JObject item) => WorkshopStore.InstallPlan(item,contentPackages.Concat(assetPacks).OfType<JObject>(),workshopStore.Installed().OfType<JObject>(),WorkshopRuntime.Platform,Application.unityVersion,UnityRelease.Code);
        private IEnumerator DownloadContentPackage(JObject item)
        {
            contentBusy=true;contentProgress=0;
            JArray plan=null;
            try { plan=ContentInstallPlan(item); if(plan.Count>0)WorkshopStore.CheckDownloadSpace(plan.Sum(m=>(long)m["bytes"]),ReadWorkshopFreeBytes); }
            catch(Exception e) { contentNotice=e.Message;plan=null; }
            if(plan==null) { contentBusy=false;yield break; }
            if(plan.Count==0) { contentNotice="Сборник и все его части уже установлены";contentBusy=false;yield break; }
            long total=plan.Sum(m=>(long)m["bytes"]),done=0;int completed=0;bool failed=false;
            string path=Path.Combine(ContentDirectory,"download.part");
            foreach(JObject member in plan)
            {
                contentNotice="Загрузка "+(completed+1)+"/"+plan.Count+": "+member["name"];
                WorkshopDownload handler=null;UnityWebRequest request=null;
                try {
                    handler=new WorkshopDownload(path,(long)member["bytes"]);
                    request=new UnityWebRequest((string)member["url"],"GET",handler,null) {timeout=120,redirectLimit=new Uri((string)member["url"]).Host=="github.com"?3:0};
                } catch(Exception e) { contentNotice=e.Message;failed=true; }
                if(request!=null) {
                    using(request) {
                        var operation=request.SendWebRequest();
                        while(!operation.isDone) { contentProgress=(float)(done+handler.Received)/Math.Max(1,total);yield return null; }
                        handler.Close();
                        try {
                            if(request.result!=UnityWebRequest.Result.Success)throw new IOException(handler.Failure ?? request.error);
                            workshopStore.Install(member,path,WorkshopRuntime.Platform,Application.unityVersion);
                            done+=(long)member["bytes"];completed++;
                        } catch(Exception e) { contentNotice="Сборник не установлен полностью: "+e.Message+". Повторите загрузку; проверенные части сохранятся.";failed=true; }
                    }
                } else handler?.Close();
                try { if(File.Exists(path))File.Delete(path); } catch(Exception e) { contentNotice+=" · "+e.Message; }
                if(failed)break;
            }
            RefreshWorkshop();contentBusy=false;
            if(!failed) {contentProgress=1;contentNotice="Установлено: "+item["name"]+" · загружено частей: "+completed;}
        }
        private string InstallAvailability(JObject item)
        {
            try { ContentInstallPlan(item);return null; }
            catch(Exception e) {return e.Message;}
        }
        private void SwitchContentPage(bool collections)
        {
            contentCollectionsPage=collections;contentCategory=0;contentGroupPath="";contentSearch="";
            contentDetails=null;contentPage=0;contentViewDirty=true;frontScroll=Vector2.zero;
        }
        private void DrawContentManager()
        {
            InitializeWorkshop(); GUILayout.Label("Мастерская дополнений", heading);
            if (!contentBusy && GUILayout.Button("↻ Обновить каталоги и проверить обновления", GUILayout.Height(45))) StartCoroutine(FetchContentCatalog());
            GUILayout.Label(contentNotice, muted);
            if (contentBusy) GUILayout.HorizontalSlider(contentProgress, 0, 1);
            installedOnly = GUILayout.Toggle(installedOnly, "Только установленные (доступно без интернета)");
            GUILayout.BeginHorizontal();
            if(GUILayout.Toggle(contentCollectionsPage,"Сборники модов",GUI.skin.button,GUILayout.MinHeight(54))&&!contentCollectionsPage)SwitchContentPage(true);
            if(GUILayout.Toggle(!contentCollectionsPage,"Все дополнения",GUI.skin.button,GUILayout.MinHeight(54))&&contentCollectionsPage)SwitchContentPage(false);
            GUILayout.EndHorizontal();
            if(contentCollectionsPage)GUILayout.Label("Полные тематические сборники. Все входящие дополнения скачиваются одной кнопкой.",muted);
            else {
                bool showParts=GUILayout.Toggle(contentShowParts,"Показать отдельные моды и части сборников");
                if(showParts!=contentShowParts) {contentShowParts=showParts;contentViewDirty=true;}
            }
            contentSearch = GUILayout.TextField(contentSearch, GUILayout.MinHeight(40));
            EnsureContentView();if(!contentCollectionsPage)DrawContentTree();SyncWorkshopPreviewPage();
            DrawContentPagination();int shown=0;
            foreach (JObject item in VisibleContentPage())
            {
                string id=(string)item["id"];contentInstalled.TryGetValue(id,out var local);
                shown++; GUILayout.BeginVertical(GUI.skin.box); GUILayout.Label(item["name"] + " · " + item["version"], heading);
                DrawWorkshopPreview(item);
                GUILayout.Label(local == null ? "Не установлено" : (string)local["sha256"] == (string)item["sha256"] ? "✓ Установлено" : "Доступна другая версия · установлена " + local["version"], muted);
                if (GUILayout.Button("Подробнее", GUILayout.Height(52))) contentDetails = contentDetails == item ? null : item;
                if (contentDetails == item)
                {
                    GUILayout.Label((string)item["description"], muted);
                    GUILayout.Label("Автор: " + item["author"] + " · Лицензия: " + item["license"] + " · " + item["bytes"] + " байт", muted);
                    if((string)item["type"]=="collection") GUILayout.Label((item["inventoryCategory"]!=null?"Предметов в сборнике: "+item["itemCount"]:"Дополнений в сборнике: "+item["packageCount"])+". Все необходимые части загружаются автоматически.",muted);
                    else GUILayout.Label("Зависимости: " + string.Join(", ", ((JArray)item["dependencies"]).Values<string>()) + " · Платформа: " + item["platform"] + " · Unity: " + item["unityVersion"], muted);
                    GUILayout.Label("SHA-256: " + item["sha256"], muted);
                }
                string unavailable;if(!contentAvailability.TryGetValue(id,out unavailable)) { unavailable=InstallAvailability(item);contentAvailability[id]=unavailable; } if (unavailable != null) GUILayout.Label(unavailable, muted);
                bool enabled = GUI.enabled; GUI.enabled = enabled && !contentBusy && unavailable == null;
                if (GUILayout.Button(local == null ? "Скачать и установить" : (string)local["sha256"] == (string)item["sha256"] ? "Скачать повторно" : "Установить версию " + item["version"], GUILayout.Height(42))) StartCoroutine(DownloadContentPackage((JObject)item.DeepClone()));
                GUI.enabled = enabled && !contentBusy && local != null;
                if (GUILayout.Button((string)item["type"]=="collection"?"Удалить запись сборника (дополнения сохранятся)":"Удалить пакет (персонажи и карты сохранятся)", GUILayout.Height(52)))
                {
                    try { workshopStore.Remove(id); RefreshWorkshop(); contentNotice = "Пакет удалён. Ссылки сохранений сохранены; ресурсы можно установить повторно."; }
                    catch (Exception e) { contentNotice = e.Message; }
                }
                GUI.enabled = enabled; GUILayout.EndVertical();
            }
            if (shown == 0) GUILayout.Label("Материалы не найдены. Обновите каталог или измените фильтр.", muted);
            if(shown>0)DrawContentPagination();
            if(!contentPreviewLoading&&VisibleContentPage().Any(m=>m["preview"] is JObject p&&contentPreviewAttempted.Contains((string)p["sha256"])&&!contentPreviewImages.ContainsKey((string)p["sha256"]))&&GUILayout.Button("Повторить загрузку предпросмотров",GUILayout.MinHeight(50))) {
                foreach(var item in VisibleContentPage())if(item["preview"] is JObject p)contentPreviewAttempted.Remove((string)p["sha256"]);
            }
            if(Event.current.type==EventType.Repaint&&!contentBusy)QueueWorkshopPreview();
            if (GUILayout.Button("← Настройки", GUILayout.Height(45))) OpenSettings();
        }
    }
}
