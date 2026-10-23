using System;
using System.Collections;
using System.Linq;
using Newtonsoft.Json.Linq;
using UnityEngine;
namespace DndVtt.UnityPrototype
{
    public sealed partial class LegacySessionPanel
    {
        private readonly WorkshopCommunity contentCommunity=new WorkshopCommunity();
        private bool contentHeartsBusy,contentFavoritesOnly;
        private int contentHeartsGeneration,contentSort,contentViewSort=-1;
        private bool contentViewFavorites;
        private string contentHeartsActor,contentHeartsNotice="Рейтинг ещё не загружен.";
        private string WorkshopActor=>(string)cloudSession?["user"];
        private void ClearWorkshopIdentity()
        {
            contentHeartsGeneration++;contentHeartsBusy=false;contentHeartsActor=WorkshopActor;
            contentCommunity.Clear();contentViewDirty=true;contentFavoritesOnly=false;
            contentHeartsNotice="Обновите рейтинг для текущего аккаунта.";
        }
        private void SyncWorkshopIdentity()
        {
            LoadCloudSession();if(contentHeartsActor!=WorkshopActor)ClearWorkshopIdentity();
        }
        private IEnumerator FetchWorkshopHearts()
        {
            SyncWorkshopIdentity();if(contentHeartsBusy)yield break;
            contentHeartsBusy=true;int generation=contentHeartsGeneration;string actor=WorkshopActor,token=null;
            contentHeartsNotice="Загрузка рейтинга…";
            try {
                if(actor!=null)yield return CloudToken(t=>token=t);
                if(generation!=contentHeartsGeneration||actor!=WorkshopActor)yield break;
                if(actor!=null&&token==null) { contentHeartsNotice="Войдите снова, чтобы загрузить избранное.";contentCommunity.Invalidate();contentViewDirty=true;yield break; }
                var ids=contentPackages.Concat(assetPacks).OfType<JObject>().Select(m=>(string)m["id"]).Distinct().ToArray();
                var items=new JArray();bool failed=false;
                for(int offset=0;offset<ids.Length;offset+=200) {
                    yield return CloudRequest("/rest/v1/rpc/read_workshop_hearts",new JObject { ["p_ids"]=new JArray(ids.Skip(offset).Take(200)) },token,r=>{
                        if(generation!=contentHeartsGeneration||actor!=WorkshopActor)return;
                        if((bool?)r["authenticated"]!=(actor!=null)||!(r["items"] is JArray rows))throw new FormatException();
                        foreach(var row in rows)items.Add(row.DeepClone());
                    },e=>{if(generation==contentHeartsGeneration) { failed=true;contentHeartsNotice="Рейтинг недоступен. Проверьте подключение; серверу требуется миграция мастерской."; }});
                    if(generation!=contentHeartsGeneration||actor!=WorkshopActor)yield break;
                    if(failed) { contentCommunity.Invalidate();contentViewDirty=true;yield break; }
                }
                string error=null;try { contentCommunity.Replace(items); }catch(Exception) { error="Сервер вернул некорректный рейтинг. Повторите обновление.";contentCommunity.Invalidate(); }
                contentHeartsNotice=error??(actor==null?"Рейтинг: количество сердечек. Войдите в аккаунт, чтобы добавить мод в избранное.":"Сердечко добавляет в избранное. Повторное нажатие убирает сердечко.");contentViewDirty=true;
            }finally { if(generation==contentHeartsGeneration)contentHeartsBusy=false; }
        }
        private IEnumerator ToggleWorkshopHeart(string id)
        {
            SyncWorkshopIdentity();string actor=WorkshopActor;
            if(actor==null||contentHeartsBusy||!contentCommunity.Known(id))yield break;
            bool desired=!contentCommunity.Hearted(id);int generation=contentHeartsGeneration;string token=null;
            contentHeartsBusy=true;
            try {
                yield return CloudToken(t=>token=t);
                if(generation!=contentHeartsGeneration||actor!=WorkshopActor)yield break;
                if(token==null) {contentCommunity.Invalidate();contentViewDirty=true;contentHeartsNotice="Сессия истекла. Войдите снова и обновите рейтинг.";yield break;}
                yield return CloudRequest("/rest/v1/rpc/set_workshop_heart",new JObject { ["p_id"]=id,["p_hearted"]=desired },token,r=>{
                    if(generation!=contentHeartsGeneration||actor!=WorkshopActor)return;
                    if((string)r["id"]!=id||(bool?)r["hearted"]!=desired)throw new FormatException();
                    contentCommunity.Apply((JObject)r);contentViewDirty=true;
                    contentHeartsNotice=desired?"Добавлено в избранное. Сердечко учтено в рейтинге.":"Убрано из избранного. Сердечко снято.";
                },e=>{
                    if(generation!=contentHeartsGeneration)return;
                    // A timeout may follow a committed write. Re-read before allowing another toggle.
                    contentCommunity.Invalidate();contentViewDirty=true;
                    contentHeartsNotice="Результат не подтверждён. Обновите рейтинг перед повторным нажатием.";
                });
            }finally { if(generation==contentHeartsGeneration)contentHeartsBusy=false; }
        }
        private void DrawWorkshopCommunity()
        {
            SyncWorkshopIdentity();GUILayout.Label(contentHeartsNotice,muted);
            bool enabled=GUI.enabled;GUI.enabled=enabled&&!contentHeartsBusy;
            if(GUILayout.Button(contentHeartsBusy?"Загрузка рейтинга…":"↻ Обновить рейтинг и избранное",GUILayout.MinHeight(48)))StartCoroutine(FetchWorkshopHearts());
            GUI.enabled=enabled;
            GUILayout.BeginHorizontal();
            if(GUILayout.Toggle(contentSort==0,"Новые и обновлённые",GUI.skin.button,GUILayout.MinHeight(48))&&contentSort!=0) {contentSort=0;contentViewDirty=true;}
            GUI.enabled=enabled&&contentCommunity.Ready;
            if(GUILayout.Toggle(contentSort==1,"По рейтингу",GUI.skin.button,GUILayout.MinHeight(48))&&contentSort!=1) {contentSort=1;contentViewDirty=true;}
            GUI.enabled=enabled;GUILayout.EndHorizontal();
            GUI.enabled=enabled&&WorkshopActor!=null&&contentCommunity.Ready;
            bool favorites=GUILayout.Toggle(contentFavoritesOnly,"♥ Только избранное");
            if(favorites!=contentFavoritesOnly) {contentFavoritesOnly=favorites;contentViewDirty=true;}
            GUI.enabled=enabled;
            if(contentFavoritesOnly&&!contentCommunity.Ready)GUILayout.Label("Избранное недоступно до обновления рейтинга.",muted);
        }
        private void DrawWorkshopHeart(JObject item)
        {
            string id=(string)item["id"];bool known=contentCommunity.Known(id);
            bool enabled=GUI.enabled;GUI.enabled=enabled&&WorkshopActor!=null&&known&&!contentHeartsBusy;
            string label=known?(contentCommunity.Hearted(id)?"♥ ":"♡ ")+contentCommunity.Rating(id):"♡ —";
            if(GUILayout.Button(label+(WorkshopActor==null?" · Войдите, чтобы поставить сердечко":""),GUILayout.MinHeight(48)))StartCoroutine(ToggleWorkshopHeart(id));
            GUI.enabled=enabled;
            var updated=WorkshopCommunity.Updated(item);
            if(updated!=DateTimeOffset.MinValue)GUILayout.Label("Обновлено: "+updated.UtcDateTime.ToString("dd.MM.yyyy HH:mm")+" UTC",muted);
        }
    }
}
