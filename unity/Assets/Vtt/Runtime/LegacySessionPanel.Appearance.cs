using System;
using System.IO;
using System.Linq;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;
using UnityEngine;
namespace DndVtt.UnityPrototype
{
    public sealed partial class LegacySessionPanel
    {
        private Texture2D downloadedWallpaper,downloadedIcon;
        private string loadedWallpaperId,loadedIconId,appearanceNotice="";
        private bool appearanceLibraryOpen;
        private string appearanceKind="wallpaper",appearancePreviewId="";
        private int appearancePage;
        private Texture2D appearancePreviewTexture;
        private string appearancePreviewTextureId;
        private const int AppearancePageSize=9;
        private readonly Dictionary<string,Texture2D> appearanceThumbnails=new Dictionary<string,Texture2D>();
        private static void ReleaseAppearanceTexture(Texture2D texture)
        {
            if(!texture)return;
            if(Application.isPlaying)Destroy(texture);else DestroyImmediate(texture);
        }
        private static string AppearancePreference(string kind)=>"dndvtt.appearance."+kind;
        private void ReleaseAppearanceImages(bool retry)
        {
            ClearAppearanceThumbnails();
            ReleaseAppearanceTexture(appearancePreviewTexture);appearancePreviewTexture=null;appearancePreviewTextureId=null;
            ReleaseAppearanceTexture(downloadedWallpaper);ReleaseAppearanceTexture(downloadedIcon);
            downloadedWallpaper=downloadedIcon=null;
            if(retry)loadedWallpaperId=loadedIconId=null;
        }
        private Texture2D SelectedAppearanceImage(string kind)
        {
            string id=PlayerPrefs.GetString(AppearancePreference(kind),"");
            if(id=="")return null;
            if((kind=="wallpaper"?loadedWallpaperId:loadedIconId)==id)return kind=="wallpaper"?downloadedWallpaper:downloadedIcon;
            if(kind=="wallpaper") { ReleaseAppearanceTexture(downloadedWallpaper);downloadedWallpaper=null;loadedWallpaperId=id; }
            else { ReleaseAppearanceTexture(downloadedIcon);downloadedIcon=null;loadedIconId=id; }
            Texture2D texture=null;
            try {
                InitializeWorkshop();var manifest=workshopStore.Find(id);
                if(manifest==null||(string)manifest["imageKind"]!=kind)return null;
                var image=(JObject)workshopStore.Data(manifest)["images"][0];var bytes=WorkshopStore.ImageBytes(image);
                texture=new Texture2D(2,2,TextureFormat.RGBA32,false) { name=id,hideFlags=HideFlags.HideAndDontSave };
                if(!texture.LoadImage(bytes,false)||texture.width!=(int)image["width"]||texture.height!=(int)image["height"])throw new FormatException("Ошибка декодирования PNG");
                if(kind=="wallpaper")downloadedWallpaper=texture;else downloadedIcon=texture;
                return texture;
            }catch(Exception) { ReleaseAppearanceTexture(texture);appearanceNotice="Оформление недоступно. Используется встроенный фон; пакет можно установить повторно.";return null; }
        }
        private void ClearAppearanceThumbnails()
        {
            foreach(var image in appearanceThumbnails.Values)ReleaseAppearanceTexture(image);
            appearanceThumbnails.Clear();
        }
        private Texture2D AppearanceThumbnail(JObject manifest)
        {
            string id=(string)manifest["id"];
            if(appearanceThumbnails.TryGetValue(id,out var cached))return cached;
            // Nine visible thumbnails only. Full source textures are discarded immediately.
            if(appearanceThumbnails.Count>=AppearancePageSize)ClearAppearanceThumbnails();
            Texture2D source=null,small=null;
            try {
                var image=(JObject)workshopStore.Data(manifest)["images"][0];
                source=new Texture2D(2,2,TextureFormat.RGBA32,false);
                if(!source.LoadImage(WorkshopStore.ImageBytes(image),false))throw new FormatException();
                float ratio=Mathf.Min(160f/source.width,160f/source.height);
                int w=Mathf.Max(1,Mathf.RoundToInt(source.width*ratio)),h=Mathf.Max(1,Mathf.RoundToInt(source.height*ratio));
                small=new Texture2D(w,h,TextureFormat.RGBA32,false) { hideFlags=HideFlags.HideAndDontSave };
                var pixels=new Color32[w*h];var original=source.GetPixels32();
                for(int y=0;y<h;y++)for(int x=0;x<w;x++)pixels[y*w+x]=original[Mathf.Min(source.height-1,y*source.height/h)*source.width+Mathf.Min(source.width-1,x*source.width/w)];
                small.SetPixels32(pixels);small.Apply(false,true);appearanceThumbnails[id]=small;return small;
            }catch(Exception) { ReleaseAppearanceTexture(small);appearanceThumbnails[id]=null;return null; }
            finally { if(source)DestroyImmediate(source); }
        }
        private Texture2D AppearancePreview(JObject manifest)
        {
            string id=(string)manifest["id"];
            if(appearancePreviewTextureId==id)return appearancePreviewTexture;
            ReleaseAppearanceTexture(appearancePreviewTexture);
            appearancePreviewTexture=null;appearancePreviewTextureId=id;
            try {
                var image=(JObject)workshopStore.Data(manifest)["images"][0];
                appearancePreviewTexture=new Texture2D(2,2,TextureFormat.RGBA32,false) { hideFlags=HideFlags.HideAndDontSave };
                if(!appearancePreviewTexture.LoadImage(WorkshopStore.ImageBytes(image),false))throw new FormatException();
                return appearancePreviewTexture;
            }catch(Exception) { ReleaseAppearanceTexture(appearancePreviewTexture);appearancePreviewTexture=null;return null; }
        }
        private void DrawAppearanceLibrary()
        {
            GUILayout.BeginVertical(GUI.skin.box);SettingsSection("Обои и иконки");
            if(GUILayout.Button("Открыть библиотеку оформления",GUILayout.MinHeight(64)))appearanceLibraryOpen=!appearanceLibraryOpen;
            if(appearanceLibraryOpen) {
                InitializeWorkshop();
                GUILayout.BeginHorizontal();
                foreach(string kind in new[]{"wallpaper","icon"}) {
                    var previous=GUI.backgroundColor;if(appearanceKind==kind)GUI.backgroundColor=BrandAccent;
                    if(GUILayout.Button(kind=="wallpaper"?"Обои":"Иконки",GUILayout.MinHeight(54))) { appearanceKind=kind;appearancePage=0;appearancePreviewId="";ClearAppearanceThumbnails(); }
                    GUI.backgroundColor=previous;
                }
                GUILayout.EndHorizontal();
                var entries=workshopStore.Installed().OfType<JObject>().Where(m=>(string)m["imageKind"]==appearanceKind).OrderBy(m=>(string)m["name"]).ToArray();
                string selected=PlayerPrefs.GetString(AppearancePreference(appearanceKind),"");
                if(appearancePreviewId=="")appearancePreviewId=selected;
                GUILayout.Label(appearanceKind=="wallpaper"?"Выберите скачанные обои. Нажмите карточку для предпросмотра.":"Выберите скачанную иконку для предпросмотра, экспорта PNG и создания ярлыка Android. Значок в общем списке приложений не меняется.",settingsDescription);
                if(entries.Length==0)GUILayout.Label("Здесь появятся изображения, установленные из мастерской.",settingsDescription);
                appearancePage=Mathf.Clamp(appearancePage,0,Mathf.Max(0,(entries.Length-1)/AppearancePageSize));
                var visible=entries.Skip(appearancePage*AppearancePageSize).Take(AppearancePageSize).ToArray();
                float tileWidth=Mathf.Max(60,(Mathf.Min(UiWidth-24,600)-110)/3);
                var tileLabel=new GUIStyle(GUI.skin.label) { fontSize=14,wordWrap=true,richText=false,alignment=TextAnchor.UpperCenter };
                for(int row=0;row<visible.Length;row+=3) {
                    GUILayout.BeginHorizontal();
                    for(int col=0;col<3;col++) {
                        if(row+col>=visible.Length) { GUILayout.FlexibleSpace();continue; }
                        var manifest=visible[row+col];string id=(string)manifest["id"];
                        var previous=GUI.backgroundColor;if(id==appearancePreviewId)GUI.backgroundColor=BrandAccent;
                        var card=GUILayoutUtility.GetRect(tileWidth,170,GUILayout.Width(tileWidth));
                        if(GUI.Button(card,GUIContent.none))appearancePreviewId=id;
                        var thumb=AppearanceThumbnail(manifest);
                        if(thumb)GUI.DrawTexture(new Rect(card.x+7,card.y+7,card.width-14,100),thumb,ScaleMode.ScaleToFit,true);
                        GUI.Label(new Rect(card.x+5,card.y+111,card.width-10,56),(id==selected?"✓ ":"")+(string)manifest["name"],tileLabel);
                        GUI.backgroundColor=previous;
                    }
                    GUILayout.EndHorizontal();
                }
                if(entries.Length>AppearancePageSize) {
                    GUILayout.BeginHorizontal();bool enabled=GUI.enabled;GUI.enabled=enabled&&appearancePage>0;
                    if(GUILayout.Button("←",GUILayout.MinHeight(52))) { appearancePage--;ClearAppearanceThumbnails(); }
                    GUI.enabled=enabled;GUILayout.Label((appearancePage+1)+" / "+Mathf.Max(1,(entries.Length+AppearancePageSize-1)/AppearancePageSize),settingsDescription);
                    GUI.enabled=enabled&&(appearancePage+1)*AppearancePageSize<entries.Length;
                    if(GUILayout.Button("→",GUILayout.MinHeight(52))) { appearancePage++;ClearAppearanceThumbnails(); }
                    GUI.enabled=enabled;GUILayout.EndHorizontal();
                }
                var previewManifest=entries.FirstOrDefault(m=>(string)m["id"]==appearancePreviewId);
                if(previewManifest!=null) {
                    GUILayout.Space(12);GUILayout.Label((string)previewManifest["name"],settingsHeader);
                    var preview=AppearancePreview(previewManifest);
                    var rect=GUILayoutUtility.GetRect(1,220,GUILayout.ExpandWidth(true));if(preview)GUI.DrawTexture(rect,preview,ScaleMode.ScaleToFit,true);
                    if(GUILayout.Button(appearanceKind=="wallpaper"?"Применить обои":"Выбрать эту иконку",GUILayout.MinHeight(60))) {
                        PlayerPrefs.SetString(AppearancePreference(appearanceKind),appearancePreviewId);PlayerPrefs.Save();ReleaseAppearanceImages(true);SelectedAppearanceImage(appearanceKind);
                        appearanceNotice=appearanceKind=="wallpaper"?"Обои применены":"Иконка выбрана. Можно создать ярлык на главном экране или экспортировать PNG.";
                    }
                    #if UNITY_ANDROID && !UNITY_EDITOR
                    if(appearanceKind=="icon"&&GUILayout.Button("Создать / обновить ярлык Android",GUILayout.MinHeight(64)))PinAppearanceShortcut(previewManifest);
#endif
                    if(GUILayout.Button("Сохранить / отправить PNG",GUILayout.MinHeight(56)))ExportAppearancePng(previewManifest);
                }
                if(appearanceKind=="wallpaper"&&GUILayout.Button("Вернуть основной фон",GUILayout.MinHeight(56))) { PlayerPrefs.DeleteKey(AppearancePreference("wallpaper"));PlayerPrefs.Save();appearancePreviewId="";ReleaseAppearanceImages(true); }
                if(GUILayout.Button("Скачать оформление из мастерской",GUILayout.MinHeight(64))) { OpenContentManager();contentCategory=14; }
            }
            GUILayout.Label(appearanceNotice,settingsDescription);GUILayout.EndVertical();
        }
#if UNITY_ANDROID && !UNITY_EDITOR
        private void PinAppearanceShortcut(JObject manifest)
        {
            try {
                var image=(JObject)workshopStore.Data(manifest)["images"][0];var png=WorkshopStore.ImageBytes(image);
                using var player=new AndroidJavaClass("com.unity3d.player.UnityPlayer");using var activity=player.GetStatic<AndroidJavaObject>("currentActivity");
                using var bridge=new AndroidJavaClass("com.dndvtt.unityupdater.UpdateProvider");
                string result=bridge.CallStatic<string>("pinPicture",activity,png);
                appearanceNotice=result=="requested"?"Подтвердите добавление ярлыка в системном окне Android.":result=="updated"?"Иконка ранее созданного ярлыка обновлена.":"Этот рабочий стол не поддерживает добавление ярлыка. Можно экспортировать PNG.";
            }catch(Exception) { appearanceNotice="Не удалось создать ярлык. Можно экспортировать PNG."; }
        }
#endif
        private void ExportAppearancePng(JObject manifest)
        {
            string id=(string)manifest["id"];
                        try {
                            var image=(JObject)workshopStore.Data(manifest)["images"][0];byte[] png=WorkshopStore.ImageBytes(image);
#if UNITY_ANDROID && !UNITY_EDITOR
                            using var player=new AndroidJavaClass("com.unity3d.player.UnityPlayer");using var activity=player.GetStatic<AndroidJavaObject>("currentActivity");
                            using var cache=activity.Call<AndroidJavaObject>("getCacheDir");
                            string dir=Path.Combine(cache.Call<string>("getAbsolutePath"),"appearance-exports");Directory.CreateDirectory(dir);
                            foreach(string old in Directory.GetFiles(dir,"Appearance-*.png"))if(File.GetLastWriteTimeUtc(old)<DateTime.UtcNow.AddDays(-1))File.Delete(old);
                            string path=Path.Combine(dir,"Appearance-"+WorkshopStore.Digest(png)+".png");File.WriteAllBytes(path,png);
                            using var bridge=new AndroidJavaClass("com.dndvtt.unityupdater.UpdateProvider");bridge.CallStatic("sharePicture",activity,path);appearanceNotice="Выберите приложение для сохранения PNG.";
#else
                            string dir=Path.Combine(Application.persistentDataPath,"appearance-exports");Directory.CreateDirectory(dir);string path=Path.Combine(dir,id+".png");File.WriteAllBytes(path,png);appearanceNotice="PNG сохранён: "+path;
#endif
                        }catch(Exception) { appearanceNotice="Не удалось экспортировать PNG. Проверьте свободное место."; }
        }
    }
}
