using System;
using System.IO;
using System.Linq;
using Newtonsoft.Json.Linq;
using UnityEngine;
namespace DndVtt.UnityPrototype
{
    public sealed partial class LegacySessionPanel
    {
        private Texture2D downloadedWallpaper,downloadedIcon;
        private string loadedWallpaperId,loadedIconId,appearanceNotice="";
        private bool appearanceLibraryOpen;
        private static string AppearancePreference(string kind)=>"dndvtt.appearance."+kind;
        private void ReleaseAppearanceImages(bool retry)
        {
            if(downloadedWallpaper)Destroy(downloadedWallpaper);if(downloadedIcon)Destroy(downloadedIcon);
            downloadedWallpaper=downloadedIcon=null;
            if(retry)loadedWallpaperId=loadedIconId=null;
        }
        private Texture2D SelectedAppearanceImage(string kind)
        {
            string id=PlayerPrefs.GetString(AppearancePreference(kind),"");
            if(id=="")return null;
            if((kind=="wallpaper"?loadedWallpaperId:loadedIconId)==id)return kind=="wallpaper"?downloadedWallpaper:downloadedIcon;
            if(kind=="wallpaper") { if(downloadedWallpaper)Destroy(downloadedWallpaper);downloadedWallpaper=null;loadedWallpaperId=id; }
            else { if(downloadedIcon)Destroy(downloadedIcon);downloadedIcon=null;loadedIconId=id; }
            Texture2D texture=null;
            try {
                InitializeWorkshop();var manifest=workshopStore.Find(id);
                if(manifest==null||(string)manifest["imageKind"]!=kind)return null;
                var image=(JObject)workshopStore.Data(manifest)["images"][0];var bytes=WorkshopStore.ImageBytes(image);
                texture=new Texture2D(2,2,TextureFormat.RGBA32,false) { name=id,hideFlags=HideFlags.HideAndDontSave };
                if(!texture.LoadImage(bytes,false)||texture.width!=(int)image["width"]||texture.height!=(int)image["height"])throw new FormatException("Ошибка декодирования PNG");
                if(kind=="wallpaper")downloadedWallpaper=texture;else downloadedIcon=texture;
                return texture;
            }catch(Exception) { if(texture)Destroy(texture);appearanceNotice="Оформление недоступно. Используется встроенный фон; пакет можно установить повторно.";return null; }
        }
        private void DrawAppearanceLibrary()
        {
            GUILayout.BeginVertical(GUI.skin.box);SettingsSection("Обои и авторские иконки");
            if(GUILayout.Button("Библиотека установленного оформления",GUILayout.MinHeight(56)))appearanceLibraryOpen=!appearanceLibraryOpen;
            if(appearanceLibraryOpen) {
                InitializeWorkshop();
                GUILayout.Label("Обои применяются сразу и сохраняются после перезапуска. Иконки можно просматривать и экспортировать; системный значок Android из скачанного PNG не заменяется.",sheetQuiet);
                if(GUILayout.Button("Вернуть основной фон",GUILayout.MinHeight(52))) { PlayerPrefs.DeleteKey(AppearancePreference("wallpaper"));PlayerPrefs.Save();ReleaseAppearanceImages(true); }
                foreach(JObject manifest in workshopStore.Installed().OfType<JObject>().Where(m=>m["imageKind"]!=null)) {
                    string kind=(string)manifest["imageKind"],id=(string)manifest["id"];
                    GUILayout.Label((string)manifest["name"],sheetQuiet);
                    if(GUILayout.Button(kind=="wallpaper"?"Применить обои":"Посмотреть иконку",GUILayout.MinHeight(52))) {
                        PlayerPrefs.SetString(AppearancePreference(kind),id);PlayerPrefs.Save();ReleaseAppearanceImages(true);SelectedAppearanceImage(kind);
                    }
                    if(GUILayout.Button("Экспортировать PNG",GUILayout.MinHeight(52))) {
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
                var preview=SelectedAppearanceImage("icon");if(preview)GUILayout.Label(new GUIContent(preview),GUILayout.Width(128),GUILayout.Height(128));
                if(GUILayout.Button("Скачать оформление из мастерской",GUILayout.MinHeight(56))) { OpenContentManager();contentCategory=14; }
            }
            GUILayout.Label(appearanceNotice,sheetQuiet);GUILayout.EndVertical();
        }
    }
}
