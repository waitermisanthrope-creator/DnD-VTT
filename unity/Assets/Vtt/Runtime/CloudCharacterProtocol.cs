using System;
using Newtonsoft.Json.Linq;
namespace DndVtt.UnityPrototype
{
    public static class CloudCharacterProtocol
    {
        public const string ProjectUrl="https://rrjqxbfgwsjhgshajnob.supabase.co";
        public const string PublicKey="sb_publishable_tEMVCTm-Pzd7lG6iGUPcjw_yGw9LcsD";
        public static JObject Session(JObject response)
        {
            if(!Guid.TryParse((string)response["user"]?["id"],out _) || string.IsNullOrEmpty((string)response["access_token"]) || string.IsNullOrEmpty((string)response["refresh_token"])) throw new FormatException("Подтвердите почту и войдите снова.");
            return new JObject { ["user"]=response["user"]["id"].DeepClone(),["email"]=response["user"]["email"]?.DeepClone(),["access_token"]=response["access_token"].DeepClone(),["refresh_token"]=response["refresh_token"].DeepClone(),["expires_at"]=(long?)response["expires_at"] ?? (DateTimeOffset.UtcNow.ToUnixTimeSeconds()+((long?)response["expires_in"]??3600)) };
        }
        public static JObject SaveRequest(JObject profile,JObject journal)
        {
            if(!Guid.TryParse((string)journal["remoteId"],out _) || (long?)journal["revision"]<0) throw new FormatException("Неверная облачная ссылка");
            return new JObject { ["p_id"]=journal["remoteId"].DeepClone(),["p_expected_revision"]=(long?)journal["revision"]??0,["p_profile"]=profile.DeepClone(),["p_schema_version"]=1,["p_deleted"]=false,["p_operation_id"]=Guid.NewGuid().ToString() };
        }
        public static JObject DownloadCopy(JObject remote)
        {
            if(!Guid.TryParse((string)remote["id"],out _) || remote["revision"]?.Type!=JTokenType.Integer || (long?)remote["revision"]<1 || (bool?)remote["deleted"]==true || !(remote["profile"] is JObject profile)) throw new FormatException("Неверная облачная запись");
            var copy=(JObject)profile.DeepClone();copy["id"]=Guid.NewGuid().ToString();
            // New local identity prevents collision with the original; all other fields survive.
            new LegacyCharacterArchive(copy.ToString()); return copy;
        }
    }
}
