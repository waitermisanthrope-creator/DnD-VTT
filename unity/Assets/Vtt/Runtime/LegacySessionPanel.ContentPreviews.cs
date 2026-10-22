using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Newtonsoft.Json.Linq;
using UnityEngine;
using UnityEngine.Networking;
namespace DndVtt.UnityPrototype
{
    public sealed partial class LegacySessionPanel
    {
        private const long PreviewCacheLimit=8*1024*1024;
        private readonly Dictionary<string,Texture2D> contentPreviewImages=new Dictionary<string,Texture2D>();
        private readonly HashSet<string> contentPreviewAttempted=new HashSet<string>();
        private string contentPreviewRoot,contentPreviewPageKey;
        private Coroutine contentPreviewRoutine;
        private UnityWebRequest contentPreviewRequest;
        private WorkshopDownload contentPreviewHandler;
        private int contentPreviewGeneration;
        private bool contentPreviewLoading;
        private void BeginWorkshopPreviews()
        {
            CloseWorkshopPreviews();
            contentPreviewRoot=Path.Combine(Application.temporaryCachePath,"dnd-vtt-workshop-previews");
            try { if(Directory.Exists(contentPreviewRoot))Directory.Delete(contentPreviewRoot,true);Directory.CreateDirectory(contentPreviewRoot); }
            catch(Exception) { contentPreviewRoot=null; }
        }
        private void StopPreviewDownload()
        {
            contentPreviewGeneration++;
            if(contentPreviewRoutine!=null)StopCoroutine(contentPreviewRoutine);contentPreviewRoutine=null;
            if(contentPreviewRequest!=null) { contentPreviewRequest.Abort();contentPreviewRequest.Dispose();contentPreviewRequest=null; }
            contentPreviewHandler?.Close();contentPreviewHandler=null;contentPreviewLoading=false;
        }
        private void CloseWorkshopPreviews()
        {
            StopPreviewDownload();
            foreach(var image in contentPreviewImages.Values)ReleaseAppearanceTexture(image);
            contentPreviewImages.Clear();contentPreviewAttempted.Clear();contentPreviewPageKey=null;
            if(contentPreviewRoot!=null)try { if(Directory.Exists(contentPreviewRoot))Directory.Delete(contentPreviewRoot,true); }catch(IOException) { /* only this ephemeral folder, retry on next open */ }
            contentPreviewRoot=null;
        }
        private void SyncWorkshopPreviewPage()
        {
            string key=contentViewRevision+":"+contentPage;
            if(key==contentPreviewPageKey)return;
            StopPreviewDownload();contentPreviewPageKey=key;
            foreach(var image in contentPreviewImages.Values)ReleaseAppearanceTexture(image);contentPreviewImages.Clear();
        }
        private void DrawWorkshopPreview(JObject manifest)
        {
            if(!(manifest["preview"] is JObject preview))return;
            string hash=(string)preview["sha256"];var rect=GUILayoutUtility.GetRect(1,145,GUILayout.ExpandWidth(true));
            if(contentPreviewImages.TryGetValue(hash,out var image)&&image)GUI.DrawTexture(rect,image,ScaleMode.ScaleToFit,true);
            else GUI.Label(rect,contentPreviewAttempted.Contains(hash)?"Предпросмотр недоступен":"Загрузка предпросмотра…",muted);
            string kind=(string)preview["kind"];
            if(kind=="map-plan")GUILayout.Label("Схема первого этажа карты",muted);
            else if(kind=="object-schematic")GUILayout.Label("Схема геометрических объектов",muted);
            else if(kind=="swatches")GUILayout.Label("Образцы материалов",muted);
        }
        private void QueueWorkshopPreview()
        {
            if(contentPreviewLoading||contentPreviewRoot==null)return;
            var item=VisibleContentPage().FirstOrDefault(m=>m["preview"] is JObject p&&!contentPreviewImages.ContainsKey((string)p["sha256"])&&(!contentPreviewAttempted.Contains((string)p["sha256"])||File.Exists(Path.Combine(contentPreviewRoot,(string)p["sha256"]+".jpg"))));
            if(item!=null) { contentPreviewLoading=true;contentPreviewRoutine=StartCoroutine(LoadWorkshopPreview((JObject)item["preview"],contentPreviewGeneration)); }
        }
        private IEnumerator LoadWorkshopPreview(JObject preview,int generation)
        {
            string hash=(string)preview["sha256"],path=Path.Combine(contentPreviewRoot,hash+".jpg"),part=path+".part";contentPreviewAttempted.Add(hash);
            try {
                WorkshopStore.ValidatePreview(preview);
                if(!File.Exists(path)) {
                    long size=Directory.GetFiles(contentPreviewRoot).Sum(f=>new FileInfo(f).Length);
                    if(size+(long)preview["bytes"]>PreviewCacheLimit) { foreach(string old in Directory.GetFiles(contentPreviewRoot,"*.jpg"))File.Delete(old); }
                    contentPreviewHandler=new WorkshopDownload(part,(long)preview["bytes"]);
                    contentPreviewRequest=new UnityWebRequest((string)preview["url"],"GET",contentPreviewHandler,null) { timeout=15,redirectLimit=3 };
                }
            }catch(Exception) { contentPreviewHandler?.Close();contentPreviewHandler=null;contentPreviewLoading=false;yield break; }
            try {
                if(contentPreviewRequest!=null) {
                    yield return contentPreviewRequest.SendWebRequest();
                    if(generation!=contentPreviewGeneration)yield break;
                    contentPreviewHandler.Close();contentPreviewHandler=null;
                    if(contentPreviewRequest.result!=UnityWebRequest.Result.Success)yield break;
                    try { WorkshopStore.PreviewBytes(preview,File.ReadAllBytes(part));File.Move(part,path); }catch(Exception) { yield break; }
                }
                if(generation!=contentPreviewGeneration)yield break;
                Texture2D image=null;
                try {
                    var bytes=WorkshopStore.PreviewBytes(preview,File.ReadAllBytes(path));image=new Texture2D(2,2,TextureFormat.RGBA32,false) { hideFlags=HideFlags.HideAndDontSave };
                    if(!image.LoadImage(bytes,false)||image.width!=(int)preview["width"]||image.height!=(int)preview["height"])throw new FormatException();
                    contentPreviewImages[hash]=image;image=null;
                }catch(Exception) { if(File.Exists(path))File.Delete(path); }
                finally { ReleaseAppearanceTexture(image); }
            }finally {
                if(generation==contentPreviewGeneration) { contentPreviewRequest?.Dispose();contentPreviewRequest=null;contentPreviewHandler?.Close();contentPreviewHandler=null;contentPreviewLoading=false;contentPreviewRoutine=null; }
                if(File.Exists(part))try { File.Delete(part); }catch(IOException) { }
            }
        }
    }
}
