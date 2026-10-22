using System;
using System.Collections;
using Newtonsoft.Json.Linq;
using UnityEngine;
namespace DndVtt.UnityPrototype
{
    public sealed partial class LegacySessionPanel
    {
        private JArray chatMessages=new JArray();
        private string chatDraft="",chatStatus="История хранится на сервере один час",chatPendingId,chatPendingBody;
        private bool chatBusy;
        private float chatNextRefresh;
        private double chatServerOffset;
        private bool chatClearComposer;
        private string chatEditId,chatEditActor;
        private Rect chatDraftRect;
        private bool chatDraftRectValid;
        private void PollNativeChatEditor()
        {
#if UNITY_ANDROID && !UNITY_EDITOR
            if(chatEditId==null)return;
            try {
                using var bridge=new AndroidJavaClass("com.dndvtt.unityupdater.UpdateProvider");string json=bridge.CallStatic<string>("takeChatEdit");if(string.IsNullOrEmpty(json))return;
                var result=JObject.Parse(json);
                if((string)result["id"]==chatEditId&&(string)cloudSession?["user"]==chatEditActor&&(bool?)result["accepted"]==true)chatDraft=(string)result["text"]??"";
                chatEditId=chatEditActor=null;
            }catch(Exception) { chatEditId=chatEditActor=null;chatStatus="Не удалось открыть редактор сообщения. Черновик сохранён."; }
#endif
        }
        private void AcknowledgeChatDraft()
        {
            chatDraft="";chatPendingId=chatPendingBody=null;chatClearComposer=true;
        }
        private void DrawChatComposer()
        {
            if(chatClearComposer) { GUI.FocusControl(null);chatClearComposer=false; }
            bool enabled=GUI.enabled;GUI.enabled=enabled&&!chatBusy&&!cloudBusy&&chatEditId==null;
#if UNITY_ANDROID && !UNITY_EDITOR
            GUILayout.Label(string.IsNullOrEmpty(chatDraft)?"Напишите сообщение…":chatDraft,GUI.skin.box);
            if(GUILayout.Button(string.IsNullOrEmpty(chatDraft)?"Написать сообщение":"Изменить текст · курсор и выделение",GUILayout.MinHeight(58))) {
                chatEditId=Guid.NewGuid().ToString();chatEditActor=(string)cloudSession?["user"];
                try { using var player=new AndroidJavaClass("com.unity3d.player.UnityPlayer");using var activity=player.GetStatic<AndroidJavaObject>("currentActivity");using var bridge=new AndroidJavaClass("com.dndvtt.unityupdater.UpdateProvider");bridge.CallStatic("editChat",activity,chatEditId,chatDraft); }
                catch(Exception) { chatEditId=chatEditActor=null;chatStatus="Не удалось открыть редактор. Черновик сохранён."; }
            }
#else
            GUI.SetNextControlName("ChatDraft");chatDraft=GUILayout.TextArea(chatDraft,1000,GUILayout.MinHeight(100));
            if(Event.current.type==EventType.Repaint) { var rect=GUILayoutUtility.GetLastRect();chatDraftRect=new Rect(GUIUtility.GUIToScreenPoint(rect.position),rect.size*MenuScale);chatDraftRectValid=true; }
#endif
            GUI.enabled=enabled;
        }
        private void DrawChatAuthor(JObject message,string label,GUIStyle plain)
        {
            string prefix=CloudCharacterProtocol.ChatRolePrefix(message);
            var style=new GUIStyle(plain);string role=(string)message["author_role"];
            if(prefix!="") {
                style.fontStyle=FontStyle.Bold;
                if(role=="owner")style.normal.textColor=Color.Lerp(new Color(1,.67f,.08f),new Color(1,.96f,.65f),.5f+.5f*Mathf.Sin(Time.unscaledTime*2));
                else if(role=="admin")style.normal.textColor=new Color(1,.78f,.25f);
                else { var colors=new[]{new Color(.38f,.8f,1),new Color(.45f,.9f,.55f),new Color(.8f,.55f,1),new Color(1,.48f,.5f)};style.normal.textColor=colors[(int)message["author_trust"]]; }
            }
            string header=(prefix==""?"":prefix+" · ")+label+" · "+ChatMessageTime((string)message["created_at"]);
            GUILayout.Label(header,style);
            if(role=="owner"&&Event.current.type==EventType.Repaint) { var rect=GUILayoutUtility.GetLastRect();var glow=new GUIStyle(style);glow.normal.textColor=new Color(1,.8f,.15f,.2f);GUI.Label(new Rect(rect.x+1,rect.y+1,rect.width,rect.height),header,glow); }
        }
        private string nicknameDraft="",nicknameActor="",nicknameNotice="";
        private void DrawChatNicknameSettings()
        {
            if(cloudSession==null)return;
            string actor=(string)cloudSession["user"];
            if(nicknameActor!=actor) { nicknameActor=actor;nicknameDraft=(string)cloudSession["chat_nickname"]??"";nicknameNotice=""; }
            GUILayout.Label("Ник в глобальном чате",settingsDescription);
            nicknameDraft=GUILayout.TextField(nicknameDraft,24,GUILayout.MinHeight(52));
            GUILayout.Label("3–24 символа: буквы, цифры, пробел, _ и -. Ник не является служебной ролью.",settingsDescription);
            bool enabled=GUI.enabled;GUI.enabled=enabled&&!cloudBusy&&!chatBusy;
            if(GUILayout.Button("Сохранить ник аккаунта",GUILayout.MinHeight(56)))StartCoroutine(SaveChatNickname());
            GUI.enabled=enabled;GUILayout.Label(nicknameNotice,settingsDescription);
        }
        private IEnumerator SaveChatNickname()
        {
            string nick;
            try { nick=CloudCharacterProtocol.ChatNickname(nicknameDraft,true); }catch(Exception e) { nicknameNotice=e.Message;yield break; }
            cloudBusy=true;string token=null,actor=(string)cloudSession?["user"];
            try {
                yield return CloudToken(t=>token=t);if(token==null) { nicknameNotice="Нет действующей сессии. Войдите снова.";yield break; }
                yield return CloudRequest("/auth/v1/user",new JObject { ["data"]=new JObject { ["chat_nickname"]=nick } },token,r=> {
                    if((string)cloudSession?["user"]!=actor)return;
                    cloudSession["chat_nickname"]=CloudCharacterProtocol.ChatNicknameValue(r["user_metadata"]?["chat_nickname"]);
                    PersistCloudSession();nicknameNotice="Ник сохранён в аккаунте.";
                },e=>nicknameNotice="Ник не сохранён: "+e,"PUT");
            }finally { cloudBusy=false; }
        }
        private IEnumerator ChatRequest(bool send)
        {
            if(chatBusy||cloudBusy||(send&&chatEditId!=null))yield break;chatBusy=true;string token=null;string actor=(string)cloudSession?["user"];
            try {
                yield return CloudToken(t=>token=t);if(token==null||(string)cloudSession?["user"]!=actor) { chatMessages.Clear();chatStatus="Для чата войдите в аккаунт";yield break; }
                if(send) {
                    if(string.IsNullOrWhiteSpace(chatDraft))yield break;
                    if(chatPendingBody!=chatDraft||chatPendingId==null) { chatPendingId=Guid.NewGuid().ToString();chatPendingBody=chatDraft; }
                    bool sent=false;string captured=chatPendingBody;
                    yield return CloudRequest("/rest/v1/rpc/send_chat",new JObject { ["p_id"]=chatPendingId,["p_body"]=captured },token,r=> { if((string)cloudSession?["user"]!=actor)return;sent=true;AcknowledgeChatDraft(); },e=>chatStatus="Не отправлено: "+e);
                    if(!sent)yield break;
                }
                yield return CloudRequest("/rest/v1/rpc/read_chat",new JObject(),token,r=> {
                    if((string)cloudSession?["user"]!=actor)return;chatMessages=(JArray)r["messages"];chatServerOffset=(DateTimeOffset.Parse((string)r["serverTime"])-DateTimeOffset.UtcNow).TotalSeconds;chatStatus="Последние 100 сообщений за час. Обновление каждые 10 секунд."+((bool?)r["nicknamesSupported"]==true?"":" Для показа ников всем игрокам требуется серверное обновление чата.")+((bool?)r["roleBadgesSupported"]==true?"":" Серверные префиксы ролей ещё не подключены.");
                },e=>chatStatus="Чат недоступен. Серверная миграция может быть ещё не подключена. "+e);
            }finally { chatBusy=false;chatNextRefresh=Time.unscaledTime+10; }
        }
        private static string ChatAuthorLabel(string author,string ownUser)
        {
            if(!string.IsNullOrEmpty(ownUser)&&author==ownUser)return "Вы";
            return "Игрок "+WorkshopStore.Digest(System.Text.Encoding.UTF8.GetBytes(author??"unknown")).Substring(0,6).ToUpperInvariant();
        }
        private static string ChatMessageTime(string value)=>DateTimeOffset.TryParse(value,out var created)?created.ToLocalTime().ToString("HH:mm"):"";
        private void DrawChat()
        {
            LoadCloudSession();
            if(cloudSession==null) {
                chatMessages.Clear();GUILayout.Label("Чат доступен только авторизованным пользователям.");
                if(GUILayout.Button("Войти в аккаунт",GUILayout.MinHeight(56)))Navigate(FrontScreen.Account);return;
            }
            GUILayout.Label("Глобальный чат",heading);
            if(GUILayout.Button("Настроить ник",GUILayout.MinHeight(52)))OpenSettings();
            var plain=new GUIStyle(GUI.skin.label) { richText=false,wordWrap=true };
            var now=DateTimeOffset.UtcNow.AddSeconds(chatServerOffset);
            foreach(JObject message in chatMessages) {
                if(!DateTimeOffset.TryParse((string)message["expires_at"],out var expires)||expires<=now)continue;
                GUILayout.BeginVertical(GUI.skin.box);
                string author=(string)message["author"];
                string nick=CloudCharacterProtocol.ChatNicknameValue(message["author_name"]);
                if(nick==""&&author==(string)cloudSession?["user"])nick=CloudCharacterProtocol.ChatNickname((string)cloudSession?["chat_nickname"]);
                string label=nick!=""?nick:ChatAuthorLabel(author,(string)cloudSession?["user"]);
                DrawChatAuthor(message,label,plain);
                GUILayout.Label((string)message["body"],plain);GUILayout.EndVertical();
            }
            DrawChatComposer();
            bool enabled=GUI.enabled;GUI.enabled=enabled&&!chatBusy&&!cloudBusy&&chatEditId==null&&!string.IsNullOrWhiteSpace(chatDraft);
            if(GUILayout.Button("Отправить",GUILayout.MinHeight(56)))StartCoroutine(ChatRequest(true));
            GUI.enabled=enabled&&!chatBusy&&!cloudBusy;
            if(GUILayout.Button("Обновить чат",GUILayout.MinHeight(52)))StartCoroutine(ChatRequest(false));
            GUI.enabled=enabled;GUILayout.Label(chatStatus,plain);
            if(Event.current.type==EventType.Repaint&&!chatBusy&&!cloudBusy&&Time.unscaledTime>=chatNextRefresh)StartCoroutine(ChatRequest(false));
        }
    }
}
