using System;
using System.Collections;
using System.IO;
using System.Linq;
using Newtonsoft.Json.Linq;
using UnityEngine;
using UnityEngine.Networking;
namespace DndVtt.UnityPrototype
{
    public sealed partial class LegacySessionPanel
    {
        private JObject cloudSession,cloudAccess,cloudJournal,cloudConflict;
        private JArray cloudCharacters=new JArray();
        private string cloudEmail="",cloudPassword="",cloudCode="",cloudMessage="Гостевой режим. Ваши локальные герои доступны без регистрации.";
        private bool cloudBusy,cloudLoaded;
        private int cloudSessionEpoch;
        private int cloudPage;
        private string cloudConflictLocalId;
        private string CloudSessionPath=>Path.Combine(Application.persistentDataPath,"cloud-session.encrypted");
        private string CloudJournalPath=>Path.Combine(Application.persistentDataPath,"cloud-journal-"+(string)cloudSession["user"]+".json");
        private static void WriteCloudFile(string path,string text)
        {
            using(var stream=new FileStream(path+".pending",FileMode.Create,FileAccess.Write,FileShare.None))using(var writer=new StreamWriter(stream,new System.Text.UTF8Encoding(false))) { writer.Write(text);writer.Flush();stream.Flush(true); }
            if(File.Exists(path))File.Replace(path+".pending",path,path+".bak");else File.Move(path+".pending",path);
        }
        private void LoadCloudSession()
        {
            if(cloudLoaded)return;cloudLoaded=true;
#if UNITY_ANDROID && !UNITY_EDITOR
            if(File.Exists(CloudSessionPath))try { using var vault=new AndroidJavaClass("com.dndvtt.unity.DndSessionVault");cloudSession=JObject.Parse(vault.CallStatic<string>("unprotect",File.ReadAllText(CloudSessionPath)));cloudEmail=(string)cloudSession["email"]??"";cloudMessage="Сессия сохранена на устройстве. Для подключения нажмите «Обновить облако»."; }catch(Exception) { cloudSession=null;cloudMessage="Сохранённая сессия недоступна. Войдите снова; персонажи сохранены."; }
#endif
        }
        private void StoreCloudSession(JObject response)
        {
            var next=CloudCharacterProtocol.Session(response);bool changed=cloudSession==null||(string)cloudSession["user"]!=(string)next["user"];
            if(changed) { cloudSessionEpoch++; chatMessages.Clear();chatDraft=chatPendingId=chatPendingBody="";cloudJournal=null;cloudCharacters.Clear();cloudPage=0;cloudConflict=null;centerSnapshot=null;centerUsers.Clear();mfaSecret=mfaFactor=""; }
            cloudSession=next;cloudAccess=null;if(changed)ClearWorkshopIdentity();PersistCloudSession();
        }
        private void PersistCloudSession()
        {
#if UNITY_ANDROID && !UNITY_EDITOR
            try { using var vault=new AndroidJavaClass("com.dndvtt.unity.DndSessionVault");WriteCloudFile(CloudSessionPath,vault.CallStatic<string>("protect",cloudSession.ToString())); } catch(Exception) { cloudMessage="Вход выполнен. Защищённое сохранение сессии недоступно; после закрытия войдите снова."; }
#endif
        }
        private JObject CloudJournal
        {
            get { if(cloudJournal==null) cloudJournal=File.Exists(CloudJournalPath)?JObject.Parse(File.ReadAllText(CloudJournalPath)):new JObject(); return cloudJournal; }
        }
        private IEnumerator CloudRequest(string path,JObject body,string token,Action<JToken> success,Action<string> failure,string method=null)
        {
            using var request=new UnityWebRequest(CloudCharacterProtocol.ProjectUrl+path,method??(body==null?"GET":"POST"));
            request.downloadHandler=new DownloadHandlerBuffer();request.timeout=25;request.redirectLimit=0;
            request.SetRequestHeader("apikey",CloudCharacterProtocol.PublicKey);request.SetRequestHeader("Content-Type","application/json");
            if(token!=null)request.SetRequestHeader("Authorization","Bearer "+token);
            if(body!=null)request.uploadHandler=new UploadHandlerRaw(System.Text.Encoding.UTF8.GetBytes(body.ToString(Newtonsoft.Json.Formatting.None)));
            var operation=request.SendWebRequest();while(!operation.isDone) { if(request.downloadedBytes>16*1024*1024) { request.Abort();failure("Ответ облака слишком большой. Локальные данные сохранены.");yield break; }yield return null; }
            if(request.result!=UnityWebRequest.Result.Success)
            {
                // Never include raw auth response/token/email or request body in logs/errors.
                failure(request.responseCode==401?"Сессия истекла. Войдите снова.":request.responseCode==400?(path.StartsWith("/auth/",StringComparison.Ordinal)?"Проверьте почту, пароль или код; подтвердите почту перед входом.":"Облачные данные отклонены. Локальные версии сохранены."):request.responseCode==429?"Слишком много запросов. Повторите позже.":"Нет связи с облаком или запрос отклонён ("+request.responseCode+"). Локальные данные сохранены.");yield break;
            }
            JToken parsed=null;string error=null;try { parsed=string.IsNullOrWhiteSpace(request.downloadHandler.text)?new JObject():LegacyJson.Parse(request.downloadHandler.text,16*1024*1024); }catch(Exception) { error="Некорректный ответ облака"; }
            if(error!=null)failure(error);else { try { success(parsed); }catch(Exception) { failure("Не удалось обработать ответ или записать служебный журнал. Исходные персонажи не удалены; операцию можно повторить."); } }
        }
        private IEnumerator CloudToken(Action<string> ready)
        {
            if(cloudSession==null) { cloudMessage="Сначала войдите в аккаунт";yield break; }
            if((long?)cloudSession["expires_at"]>DateTimeOffset.UtcNow.ToUnixTimeSeconds()+60) { ready((string)cloudSession["access_token"]);yield break; }
            int epoch=cloudSessionEpoch;
            yield return CloudRequest("/auth/v1/token?grant_type=refresh_token",new JObject { ["refresh_token"]=cloudSession["refresh_token"].DeepClone() },null,r=>{if(epoch!=cloudSessionEpoch||cloudSession==null)return;StoreCloudSession((JObject)r);ready((string)cloudSession["access_token"]);},e=>cloudMessage=e);
        }
        private IEnumerator CloudAuth(string action)
        {
            if(string.IsNullOrWhiteSpace(cloudEmail)||!cloudEmail.Contains("@")) { cloudMessage="Введите корректную почту";yield break; }
            if((action=="login"&&cloudPassword.Length==0)||(action=="signup"&&cloudPassword.Length<8)) { cloudMessage="Введите пароль; для регистрации нужно не менее 8 символов";yield break; }
            if((action=="verify"||action=="recovery")&&string.IsNullOrWhiteSpace(cloudCode)) { cloudMessage="Введите код из письма";yield break; }
            cloudBusy=true;cloudMessage="Подключаюсь…";string password=cloudPassword;cloudPassword="";
            string path=action=="login"?"/auth/v1/token?grant_type=password":action=="signup"?"/auth/v1/signup":action=="recover"?"/auth/v1/recover":"/auth/v1/verify";
            var body=new JObject { ["email"]=cloudEmail.Trim() };
            if(action=="login"||action=="signup")body["password"]=password;
            if(action=="verify"||action=="recovery") { body["token"]=cloudCode.Trim();body["type"]=action=="verify"?"signup":"recovery"; }
            try { yield return CloudRequest(path,body,null,r=>{ if(r["access_token"]!=null) { StoreCloudSession((JObject)r);cloudMessage="Вход выполнен. Локальные герои не заменены."; }else cloudMessage="Проверьте почту. После подтверждения можно войти; для восстановления введите код из письма."; },e=>cloudMessage=e); }finally { password=null;body.Remove("password");cloudBusy=false; }
        }
        private IEnumerator CloudChangePassword()
        {
            if(cloudPassword.Length<8) { cloudMessage="Новый пароль должен содержать не менее 8 символов";yield break; }
            cloudBusy=true;string token=null;var body=new JObject { ["password"]=cloudPassword };cloudPassword="";
            try { yield return CloudToken(t=>token=t);if(token!=null)yield return CloudRequest("/auth/v1/user",body,token,r=>cloudMessage="Пароль изменён",e=>cloudMessage=e,"PUT"); }
            finally { body.Remove("password");cloudBusy=false; }
        }
        private IEnumerator CloudRefresh()
        {
            cloudBusy=true;string token=null;
            try {
                yield return CloudToken(t=>token=t);if(token==null)yield break;
                yield return CloudRequest("/auth/v1/user",null,token,r=>{cloudSession["chat_nickname"]=CloudCharacterProtocol.ChatNicknameValue(r["user_metadata"]?["chat_nickname"]);nicknameActor="";PersistCloudSession();cloudMessage="Аккаунт подтверждён сервером.";},e=>cloudMessage=e);
                yield return CloudRequest("/rest/v1/characters?select=id,profile,revision,deleted,updated_at&deleted=eq.false&order=updated_at.desc&limit=10&offset="+(cloudPage*10),null,token,r=>{cloudCharacters=(JArray)r;cloudMessage="Облачные герои загружены. Локальные файлы не заменены.";},e=>cloudMessage=e);
                yield return CloudRequest("/rest/v1/rpc/my_access",new JObject(),token,r=>cloudAccess=(JObject)r,e=>{cloudAccess=null;});
            } finally { cloudBusy=false; }
        }
        private IEnumerator CloudUpload()
        {
            cloudBusy=true;string token=null;
            try {
                string backupError=null;JObject hero=null;
                // Freeze user intent before any network yield: navigation must
                // not change which character the pending operation uploads.
                try { if(archive==null)backupError="Нет выбранного героя";else { hero=archive.Snapshot(selected);CharacterSheetStore.Save(SavePath,archive); } }catch(Exception) { backupError="Не удалось сохранить локальную резервную копию. Отправка отменена; изменения остаются в памяти."; }
                if(backupError!=null) { cloudMessage=backupError;yield break; }
                yield return CloudToken(t=>token=t);if(token==null)yield break;
                string key=hero["id"].ToString();
                JObject link=null,pending=null;string preparationError=null;
                try {
                    link=CloudJournal[key] as JObject;
                    if(link==null)CloudJournal[key]=link=new JObject { ["remoteId"]=Guid.NewGuid().ToString(),["revision"]=0 };
                    pending=link["pending"] as JObject;
                    if(pending==null)link["pending"]=pending=CloudCharacterProtocol.SaveRequest(hero,link);
                    WriteCloudFile(CloudJournalPath,CloudJournal.ToString());
                }catch(Exception) { preparationError="Не удалось подготовить безопасную отправку. Проверьте хранилище устройства; герой в облако не отправлен."; }
                if(preparationError!=null) { cloudMessage=preparationError;yield break; }
                yield return CloudRequest("/rest/v1/rpc/save_character",pending,token,r=>{
                    if((bool?)r["conflict"]==true) { cloudConflict=(JObject)r;cloudConflictLocalId=key;cloudMessage="Конфликт версий. Ни одна версия не перезаписана; можно отправить локальную отдельной облачной копией.";return; }
                    link["revision"]=r["character"]["revision"].DeepClone();link.Remove("pending");WriteCloudFile(CloudJournalPath,CloudJournal.ToString());cloudMessage="Сохранён герой «"+hero["name"]+"». Повторите отправку, если после первой попытки редактировали его.";
                },e=>cloudMessage=e+" Повторная отправка безопасно использует ту же операцию.");
            }finally { cloudBusy=false; }
        }
        private void CloudDownload(JObject remote)
        {
            try {
                var profile=CloudCharacterProtocol.DownloadCopy(remote);
                var candidate=archive==null?new LegacyCharacterArchive(profile.ToString()):archive.Append(profile);
                CharacterSheetStore.Save(SavePath,candidate);archive=candidate;selected=archive.Count-1;ClearSheetInputs();
                cloudMessage="Герой добавлен отдельной локальной копией и сохранён на устройстве.";
                try { CloudJournal[profile["id"].ToString()]=new JObject { ["remoteId"]=remote["id"].DeepClone(),["revision"]=remote["revision"].DeepClone() };WriteCloudFile(CloudJournalPath,CloudJournal.ToString()); }
                catch(Exception) { cloudMessage="Локальная копия сохранена, но связь с облачной версией не записана. Проверьте хранилище перед новой отправкой."; }
            }catch(Exception) { cloudMessage="Не удалось сохранить копию. Исходный архив не удалён."; }
        }
        private IEnumerator CloudLogout()
        {
            cloudBusy=true;string token=(string)cloudSession?["access_token"];
            cloudSessionEpoch++;cloudSession=cloudAccess=cloudJournal=cloudConflict=null;ClearWorkshopIdentity();chatMessages.Clear();chatDraft=chatPendingId=chatPendingBody="";cloudCharacters.Clear();cloudPassword=cloudCode="";
            cloudMessage="Вы вышли на этом устройстве. Локальные герои сохранены.";
            try {
                try { foreach(string suffix in new[] { "", ".bak", ".pending" })if(File.Exists(CloudSessionPath+suffix))File.Delete(CloudSessionPath+suffix); }
                catch(Exception) { cloudMessage="Сессия закрыта в памяти, но файл входа удалить не удалось. Проверьте хранилище перед выходом из приложения."; }
                if(token!=null)yield return CloudRequest("/auth/v1/logout?scope=local",new JObject(),token,r=>{},e=>cloudMessage+=" Серверный отзыв сессии не подтверждён; проверьте активные сессии аккаунта.");
            }finally { cloudBusy=false; }
        }
        private void DrawAccount()
        {
            LoadCloudSession();SheetSection("Аккаунт и облачные персонажи");GUILayout.Label(cloudMessage,sheetQuiet);
            bool previous=GUI.enabled;GUI.enabled=previous&&!cloudBusy;
            if(cloudSession==null)
            {
                GUILayout.Label("Почта");cloudEmail=GUILayout.TextField(cloudEmail,GUILayout.MinHeight(52));GUILayout.Label("Пароль");cloudPassword=GUILayout.PasswordField(cloudPassword,'•',GUILayout.MinHeight(52));
                if(GUILayout.Button("Войти",brandBlue,GUILayout.Height(56)))StartCoroutine(CloudAuth("login"));
                if(GUILayout.Button("Зарегистрироваться",GUILayout.Height(52)))StartCoroutine(CloudAuth("signup"));
                GUILayout.Label("Код подтверждения / восстановления");cloudCode=GUILayout.TextField(cloudCode,GUILayout.MinHeight(52));
                if(GUILayout.Button("Подтвердить почту"))StartCoroutine(CloudAuth("verify"));
                if(GUILayout.Button("Отправить письмо восстановления"))StartCoroutine(CloudAuth("recover"));
                if(GUILayout.Button("Подтвердить код восстановления"))StartCoroutine(CloudAuth("recovery"));
            }
            else
            {
                GUILayout.Label((string)cloudSession["email"]);GUILayout.Label("Авторизован · облако своих персонажей",sheetQuiet);
                if(cloudAccess!=null)GUILayout.Label("Метки: "+string.Join(" · ",((JArray)cloudAccess["tags"]??new JArray()).Values<string>()));
                else GUILayout.Label("Премиум и служебные роли не подтверждены сервером. Привилегии не предоставлены.",sheetQuiet);
                if(GUILayout.Button("Обновить облако и права",brandBlue,GUILayout.Height(56)))StartCoroutine(CloudRefresh());
                if(archive!=null&&GUILayout.Button("Сохранить выбранного героя в облако",brandGreen,GUILayout.Height(58)))StartCoroutine(CloudUpload());
                if(cloudConflict!=null&&archive!=null&&archive.Snapshot(selected)["id"].ToString()==cloudConflictLocalId&&GUILayout.Button("Отправить локального отдельной облачной копией")) {
                    string key=archive.Snapshot(selected)["id"].ToString();CloudJournal[key]=new JObject { ["remoteId"]=Guid.NewGuid().ToString(),["revision"]=0 };WriteCloudFile(CloudJournalPath,CloudJournal.ToString());cloudConflict=null;StartCoroutine(CloudUpload());
                }
                SheetSection("Облачные персонажи");foreach(JObject remote in cloudCharacters) { GUILayout.BeginVertical(GUI.skin.box);GUILayout.Label((string)remote["profile"]?["name"]??"Без имени");GUILayout.Label("Ревизия "+remote["revision"],sheetQuiet);if(GUILayout.Button("Добавить локальную копию",brandBlue))CloudDownload(remote);GUILayout.EndVertical(); }
                GUILayout.BeginHorizontal();if(cloudPage>0&&GUILayout.Button("← Предыдущие")) { cloudPage--;StartCoroutine(CloudRefresh()); }if(cloudCharacters.Count==10&&GUILayout.Button("Следующие →")) { cloudPage++;StartCoroutine(CloudRefresh()); }GUILayout.EndHorizontal();
                GUILayout.Label("Новый пароль (после подтверждения восстановления)");cloudPassword=GUILayout.PasswordField(cloudPassword,'•',GUILayout.MinHeight(52));
                if(GUILayout.Button("Задать новый пароль"))StartCoroutine(CloudChangePassword());
                if(GUILayout.Button("Выйти на этом устройстве",brandRed,GUILayout.Height(52)))StartCoroutine(CloudLogout());
            }
            GUILayout.Label("Загрузка всегда добавляет отдельную копию. Облако не удаляет и не заменяет локальных героев автоматически.",sheetQuiet);
            GUI.enabled=previous;
        }
    }
}
