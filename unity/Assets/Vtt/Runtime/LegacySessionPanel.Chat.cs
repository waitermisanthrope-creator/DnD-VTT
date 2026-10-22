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
            if(chatBusy||cloudBusy)yield break;chatBusy=true;string token=null;string actor=(string)cloudSession?["user"];
            try {
                yield return CloudToken(t=>token=t);if(token==null||(string)cloudSession?["user"]!=actor) { chatMessages.Clear();chatStatus="Для чата войдите в аккаунт";yield break; }
                if(send) {
                    if(string.IsNullOrWhiteSpace(chatDraft))yield break;
                    if(chatPendingBody!=chatDraft||chatPendingId==null) { chatPendingId=Guid.NewGuid().ToString();chatPendingBody=chatDraft; }
                    bool sent=false;string captured=chatPendingBody;
                    yield return CloudRequest("/rest/v1/rpc/send_chat",new JObject { ["p_id"]=chatPendingId,["p_body"]=captured },token,r=> { if((string)cloudSession?["user"]!=actor)return;sent=true;if(chatDraft==captured)chatDraft="";chatPendingId=chatPendingBody=null; },e=>chatStatus="Не отправлено: "+e);
                    if(!sent)yield break;
                }
                yield return CloudRequest("/rest/v1/rpc/read_chat",new JObject(),token,r=> {
                    if((string)cloudSession?["user"]!=actor)return;chatMessages=(JArray)r["messages"];chatServerOffset=(DateTimeOffset.Parse((string)r["serverTime"])-DateTimeOffset.UtcNow).TotalSeconds;chatStatus="Последние 100 сообщений за час. Обновление каждые 10 секунд."+((bool?)r["nicknamesSupported"]==true?"":" Для показа ников всем игрокам требуется серверное обновление чата.");
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
                string time=ChatMessageTime((string)message["created_at"]);
                GUILayout.Label(label+" · "+time,plain);
                GUILayout.Label((string)message["body"],plain);GUILayout.EndVertical();
            }
            chatDraft=GUILayout.TextArea(chatDraft,1000,GUILayout.MinHeight(85));
            bool enabled=GUI.enabled;GUI.enabled=enabled&&!chatBusy&&!cloudBusy;
            if(GUILayout.Button("Отправить",GUILayout.MinHeight(56)))StartCoroutine(ChatRequest(true));
            if(GUILayout.Button("Обновить чат",GUILayout.MinHeight(52)))StartCoroutine(ChatRequest(false));
            GUI.enabled=enabled;GUILayout.Label(chatStatus,plain);
            if(Event.current.type==EventType.Repaint&&!chatBusy&&!cloudBusy&&Time.unscaledTime>=chatNextRefresh)StartCoroutine(ChatRequest(false));
        }
    }
}
