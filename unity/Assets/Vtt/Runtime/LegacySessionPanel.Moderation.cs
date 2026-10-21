using System;
using System.Collections;
using Newtonsoft.Json.Linq;
using UnityEngine;
namespace DndVtt.UnityPrototype
{
    public sealed partial class LegacySessionPanel
    {
        private JObject centerSnapshot;
        private JArray centerUsers=new JArray();
        private string centerMessage="Подключение ещё не проверено",centerSearch="",centerReason="",centerNote="",centerAssignee="",centerRequest="";
        private string caseTitle="",caseBody="",caseManifest="",caseOperation=Guid.NewGuid().ToString();
        private int caseKind,centerTrust;
        private string mfaCode="",mfaFactor="",mfaSecret="";
        private bool showSupportPanel;
        private bool CenterAdmin => cloudSession!=null&&((string)cloudAccess?["role"]=="owner"||(string)cloudAccess?["role"]=="admin");
        private bool CenterModerator => CenterAdmin||(cloudSession!=null&&(string)cloudAccess?["role"]=="moderator");
        private IEnumerator CenterCall(string rpc,JObject body,Action<JToken> apply)
        {
            if(cloudBusy)yield break;cloudBusy=true;string token=null;
            try {
                yield return CloudToken(t=>token=t);if(token==null) { centerMessage="Войдите в аккаунт";yield break; }
                yield return CloudRequest("/rest/v1/rpc/"+rpc,body,token,r=> { apply(r);centerMessage="Подтверждено сервером. Обновите данные для просмотра нового состояния."; },e=>centerMessage="Операция не подтверждена. "+e+" Серверный центр может быть ещё не развёрнут. После обрыва обновите данные перед повтором решения.");
            }finally { cloudBusy=false; }
        }
        private void CenterRefresh()
        {
            StartCoroutine(CenterCall("center_snapshot",new JObject(),r=> { centerSnapshot=(JObject)r;cloudAccess=(JObject)r["access"]; }));
        }
        private void CenterReview(JObject item,string action)
        {
            if(string.IsNullOrWhiteSpace(centerNote)) { centerMessage="Укажите обоснование решения";return; }
            Guid parsed;
            if(action=="assign"&&!Guid.TryParse(centerAssignee,out parsed)) { centerMessage="Введите UUID проверяющего";return; }
            StartCoroutine(CenterCall("review_case",new JObject { ["p_id"]=item["id"].DeepClone(),["p_revision"]=item["revision"].DeepClone(),["p_action"]=action,["p_note"]=centerNote,["p_assignee"]=action=="assign"?(JToken)centerAssignee:null },r=> { item.Replace(r.DeepClone());centerNote=""; }));
        }
        private void CenterLimit(JObject user,string kind)
        {
            if(string.IsNullOrWhiteSpace(centerReason)) { centerMessage="Укажите причину ограничения";return; }
            StartCoroutine(CenterCall("set_account_limit",new JObject { ["p_target"]=user["id"].DeepClone(),["p_revision"]=user["revision"].DeepClone(),["p_kind"]=kind,["p_until"]=DateTimeOffset.UtcNow.AddHours(24).ToString("o"),["p_reason"]=centerReason },r=> { user["revision"]=r["revision"].DeepClone();user["banned_until"]=r["banned_until"]?.DeepClone();user["muted_until"]=r["muted_until"]?.DeepClone(); }));
        }
        private void CenterSubmit()
        {
            JObject manifest=null;
            try { if(caseKind==2)manifest=JObject.Parse(caseManifest); }
            catch(Exception) { centerMessage="Нужен корректный JSON-манифест пакета";return; }
            StartCoroutine(CenterCall("submit_moderation_case",new JObject { ["p_id"]=caseOperation,["p_kind"]=new[]{"bug","complaint","content"}[caseKind],["p_title"]=caseTitle,["p_body"]=caseBody,["p_manifest"]=manifest },r=> { caseTitle=caseBody=caseManifest="";caseOperation=Guid.NewGuid().ToString(); }));
        }
        private IEnumerator CenterMfa(string action)
        {
            if(cloudBusy)yield break;cloudBusy=true;string token=null;
            try {
                yield return CloudToken(t=>token=t);if(token==null)yield break;
                if(action=="list")yield return CloudRequest("/auth/v1/user",null,token,r=> {
                    mfaFactor="";if(r["factors"] is JArray factors)foreach(JObject factor in factors)if((string)factor["factor_type"]=="totp"&&(string)factor["status"]=="verified") { mfaFactor=(string)factor["id"];break; }mfaSecret="";centerMessage=string.IsNullOrEmpty(mfaFactor)?"TOTP ещё не подключён":"Фактор найден. Введите код из приложения-аутентификатора.";
                },e=>centerMessage=e);
                else if(action=="enroll")yield return CloudRequest("/auth/v1/factors",new JObject { ["factor_type"]="totp",["friendly_name"]="DnD-VTT" },token,r=> { mfaFactor=(string)r["id"];mfaSecret=(string)r["totp"]?["secret"];centerMessage="Добавьте секрет в свой аутентификатор, затем подтвердите код. Секрет не сохраняется в файл."; },e=>centerMessage=e);
                else {
                    Guid id;if(!Guid.TryParse(mfaFactor,out id)||mfaCode.Length!=6) { centerMessage="Нужны TOTP-фактор и шестизначный код";yield break; }
                    string challenge=null;
                    yield return CloudRequest("/auth/v1/factors/"+id+"/challenge",new JObject(),token,r=>challenge=(string)r["id"],e=>centerMessage=e);
                    if(challenge!=null)yield return CloudRequest("/auth/v1/factors/"+id+"/verify",new JObject { ["challenge_id"]=challenge,["code"]=mfaCode },token,r=> { StoreCloudSession((JObject)r);centerSnapshot=null;mfaSecret="";centerMessage="MFA подтверждена. Обновите серверные права."; },e=>centerMessage=e);
                }
            }finally { mfaCode="";cloudBusy=false; }
        }
        private void DrawStaffSettingsPanels()
        {
            if(cloudSession==null) { centerSnapshot=null;centerUsers.Clear();showAdminPanel=showModeratorPanel=showSupportPanel=false;mfaSecret="";return; }
            GUILayout.BeginVertical(GUI.skin.box);SettingsSection("Обращения и управление");
            bool enabled=GUI.enabled;GUI.enabled=enabled&&!cloudBusy;
            if(GUILayout.Button("Обновить серверные права и обращения",brandBlue,GUILayout.MinHeight(58)))CenterRefresh();
            if(GUILayout.Button("Баг-репорт / жалоба / заявка автора",GUILayout.MinHeight(58)))showSupportPanel=!showSupportPanel;
            if(showSupportPanel) {
                caseKind=MenuGrid(caseKind,new[]{"Баг-репорт","Жалоба","Контент"},2);
                GUILayout.Label("Название");caseTitle=GUILayout.TextField(caseTitle,160);
                GUILayout.Label("Описание (не отправляйте пароли, токены и личные данные)",sheetQuiet);caseBody=GUILayout.TextArea(caseBody,8000,GUILayout.MinHeight(100));
                if(caseKind==2) { GUILayout.Label("JSON-манифест оригинального пакета. Файлы пока не загружаются.",sheetQuiet);caseManifest=GUILayout.TextArea(caseManifest,16384,GUILayout.MinHeight(100)); }
                if(GUILayout.Button("Отправить обращение",brandBlue,GUILayout.MinHeight(56)))CenterSubmit();
                if(centerSnapshot?["cases"] is JArray own)foreach(JObject c in own)if((string)c["author"]==(string)cloudSession["user"])GUILayout.Label((string)c["title"]+" · "+(string)c["status"],sheetQuiet);
            }
            if(CenterModerator) {
                if(GUILayout.Button("Панель модерации",brandBlue,GUILayout.MinHeight(58)))showModeratorPanel=!showModeratorPanel;
                if(showModeratorPanel)DrawCenterModeration();
            }else showModeratorPanel=false;
            if(CenterAdmin) {
                if(GUILayout.Button("Административная панель",brandGold,GUILayout.MinHeight(58)))showAdminPanel=!showAdminPanel;
                if(showAdminPanel)DrawCenterAdministration();
            }else showAdminPanel=false;
            // MFA uses existing Supabase session, with no alternate account database.
            if(CenterModerator) {
                GUILayout.Label("Защита аккаунта: TOTP / MFA",settingsHeader);
                if(GUILayout.Button("Найти мой TOTP-фактор",GUILayout.MinHeight(52)))StartCoroutine(CenterMfa("list"));
                if(GUILayout.Button("Подключить новый TOTP-фактор",GUILayout.MinHeight(52)))StartCoroutine(CenterMfa("enroll"));
                if(!string.IsNullOrEmpty(mfaSecret))GUILayout.Label("Секрет для аутентификатора: "+mfaSecret,sheetQuiet);
                mfaCode=GUILayout.TextField(mfaCode,6);
                if(GUILayout.Button("Подтвердить MFA кодом",GUILayout.MinHeight(52)))StartCoroutine(CenterMfa("verify"));
            }
            GUI.enabled=enabled;GUILayout.Label(centerMessage,sheetQuiet);GUILayout.EndVertical();
        }
        private void DrawCenterModeration()
        {
            int trust=(int?)cloudAccess?["trust"]??0;bool curator=CenterAdmin||trust>=2;
            GUILayout.Label(CenterAdmin?"Модерация — администрация":"Уровень доверия: "+trust,settingsHeader);
            GUILayout.Label("Все решения коллег видны ниже за последние 24 часа. Раннее удаление недоступно. Одобрение проверки не публикует пакет.",sheetQuiet);
            GUILayout.Label("Обоснование / замечание");centerNote=GUILayout.TextArea(centerNote,2000,GUILayout.MinHeight(80));
            if(curator) { GUILayout.Label("UUID назначаемого проверяющего");centerAssignee=GUILayout.TextField(centerAssignee,36); }
            if(centerSnapshot?["cases"] is JArray cases)foreach(JObject c in cases) {
                GUILayout.BeginVertical(GUI.skin.box);GUILayout.Label((string)c["title"]+" · "+(string)c["kind"]+" · "+(string)c["status"],settingsHeader);
                GUILayout.Label((string)c["body"],sheetQuiet);GUILayout.Label("Автор: "+(string)c["author"]+" · Проверяет: "+(string)c["assigned_to"],sheetQuiet);
                if(c["package_manifest"] is JObject manifest)GUILayout.Label(manifest.ToString(),sheetQuiet);
                if((string)c["author"]!=(string)cloudSession["user"]) {
                    if(GUILayout.Button("Оставить замечание",GUILayout.MinHeight(52)))CenterReview(c,"comment");
                    if(CenterAdmin||trust>=1)if(GUILayout.Button("Передать рекомендацию",GUILayout.MinHeight(52)))CenterReview(c,"recommend");
                    if(curator) {
                        if(GUILayout.Button("Назначить проверяющего",GUILayout.MinHeight(52)))CenterReview(c,"assign");
                        foreach(string action in new[]{"changes","accepted","rejected","resolved"}) {
                            string label=action=="changes"?"На доработку":action=="accepted"?"Одобрить проверку":action=="rejected"?"Отклонить":"Закрыть обращение";
                            if(GUILayout.Button(label,GUILayout.MinHeight(52)))CenterReview(c,action);
                        }
                    }
                }
                GUILayout.EndVertical();
            }
            GUILayout.Label("Общий журнал решений (UTC)",settingsHeader);
            if(centerSnapshot?["events"] is JArray events)foreach(JObject e in events)GUILayout.Label((string)e["at"]+" · "+(string)e["actor"]+" · "+(string)e["action"]+"\n"+e["details"],sheetQuiet);
            if(GUILayout.Button("Предыдущие записи журнала",GUILayout.MinHeight(52))&&centerSnapshot?["events"] is JArray page&&page.Count>0)
                StartCoroutine(CenterCall("center_snapshot",new JObject { ["p_before"]=page[page.Count-1]["at"].DeepClone() },r=> { centerSnapshot=(JObject)r;cloudAccess=(JObject)r["access"]; }));
        }
        private void DrawCenterAdministration()
        {
            GUILayout.Label("Учётные записи",settingsHeader);GUILayout.Label("Поиск по почте или UUID. Изменения требуют свежей MFA.",sheetQuiet);
            centerSearch=GUILayout.TextField(centerSearch,160);
            if(GUILayout.Button("Найти пользователей",GUILayout.MinHeight(54)))StartCoroutine(CenterCall("center_users",new JObject { ["p_query"]=centerSearch },r=>centerUsers=(JArray)r));
            GUILayout.Label("Причина ограничения");centerReason=GUILayout.TextArea(centerReason,1000,GUILayout.MinHeight(80));
            centerTrust=MenuGrid(centerTrust,new[]{"Стажёр 0","Проверяющий 1","Куратор 2","Техспециалист 3"},2);
            foreach(JObject u in centerUsers) {
                GUILayout.BeginVertical(GUI.skin.box);GUILayout.Label((string)u["email"]+"\n"+(string)u["id"]+" · "+(string)u["kind"],sheetQuiet);
                GUILayout.Label("Бан до: "+u["banned_until"]+" · Мут до: "+u["muted_until"],sheetQuiet);
                foreach(string action in new[]{"ban","mute","unban","unmute"})if(GUILayout.Button(action=="ban"?"Бан на 24 часа":action=="mute"?"Мут обращений на 24 часа":action=="unban"?"Снять бан":"Снять мут",GUILayout.MinHeight(52)))CenterLimit(u,action);
                if(GUILayout.Button("Запросить назначение модератором",GUILayout.MinHeight(56)))CenterStaffRequest(u,"moderator");
                if(GUILayout.Button("Запросить снятие должности",GUILayout.MinHeight(56)))CenterStaffRequest(u,"revoke");
                if((string)cloudAccess?["role"]=="owner"&&GUILayout.Button("Лично выбрать заместителем",GUILayout.MinHeight(56)))CenterStaffRequest(u,"admin");
                GUILayout.EndVertical();
            }
            if(centerSnapshot?["staffRequests"] is JArray requests)foreach(JObject pending in requests) {
                GUILayout.Label("Запрос: "+pending["id"]+" · "+pending["kind"]+" / "+pending["trust"]+"\nКому: "+pending["target"]+" · Запросил: "+pending["requester"],sheetQuiet);
                if((string)pending["requester"]!=(string)cloudSession["user"]&&(string)pending["target"]!=(string)cloudSession["user"])
                    if(GUILayout.Button("Независимо подтвердить назначение",GUILayout.MinHeight(58)))StartCoroutine(CenterCall("approve_staff_change",new JObject { ["p_request"]=pending["id"].DeepClone() },r=>centerMessage="Изменение подтверждено"));
            }
            GUILayout.Label("UUID запроса независимого подтверждения",sheetQuiet);centerRequest=GUILayout.TextField(centerRequest,36);
            if(GUILayout.Button("Подтвердить чужой запрос должности",GUILayout.MinHeight(58))) {
                Guid id;if(Guid.TryParse(centerRequest,out id))StartCoroutine(CenterCall("approve_staff_change",new JObject { ["p_request"]=id.ToString() },r=>centerMessage="Назначение подтверждено сервером"));else centerMessage="Нужен UUID запроса";
            }
        }
        private void CenterStaffRequest(JObject user,string kind)
        {
            StartCoroutine(CenterCall("request_staff_change",new JObject { ["p_target"]=user["id"].DeepClone(),["p_kind"]=kind,["p_trust"]=centerTrust },r=>centerRequest=(string)r));
        }
    }
}
