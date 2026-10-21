using System;
using System.Linq;
using System.Collections.Generic;
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
            return new JObject { ["p_id"]=journal["remoteId"].DeepClone(),["p_expected_revision"]=(long?)journal["revision"]??0,["p_profile"]=profile.DeepClone(),["p_schema_version"]=(int?)profile["schemaVersion"]??3,["p_deleted"]=false,["p_operation_id"]=Guid.NewGuid().ToString() };
        }
        public static JObject CopyIdentity(JObject original,string next)
        {
            var copy=(JObject)original.DeepClone();string old=copy["id"]?.ToString()??throw new FormatException("Нет ID персонажа");
            if(old==next)return copy;
            var refs=new HashSet<string> { "characterId","combatantId","sourceId","ownerId","source","untilOwnerStart","untilOwnerEnd","sceneOwnerId","roundOwnerId","charmSourceId","bondPartnerId","bondOwnerId","fearSourceId","nearAllyId","attackerId","targetId","casterId","actorId" };
            bool selfActor=(copy["initiativeTracker"]?["combatants"] as JArray??new JArray()).OfType<JObject>().Any(a=>a["id"]?.ToString()==old);
            string prefix="initiative:"+old+":";string Turn(string value)=>value!=null&&value.StartsWith(prefix,StringComparison.Ordinal)?"initiative:"+next+":"+value.Substring(prefix.Length):value;
            void Walk(JToken value)
            {
                if(value is JObject obj)foreach(var property in obj.Properties().ToArray())
                {
                    var x=property.Value;string text=x.Type==JTokenType.String?(string)x:null;
                    if(refs.Contains(property.Name)&&text==old)property.Value=next;
                    else if(selfActor&&text!=null&&new[] { "id","ownTurnId","tarotLastStartedTurn" }.Contains(property.Name))property.Value=Turn(text);
                    else if(selfActor&&x is JArray array&&new[] { "turnIds","swappedTurns","slipTurns" }.Contains(property.Name))
                    { for(int index=0;index<array.Count;index++)if(array[index].Type==JTokenType.String)array[index]=Turn((string)array[index]); }
                    else Walk(x);
                }
                else if(value is JArray array)foreach(var child in array)Walk(child);
            }
            Walk(copy);
            foreach(JObject actor in (copy["initiativeTracker"]?["combatants"] as JArray??new JArray()).OfType<JObject>())if(actor["id"]?.ToString()==old)actor["id"]=next;
            if(copy["initiativeTracker"]?["battlefield"]?["tokens"] is JObject tokens)
                foreach(var property in tokens.Properties().ToArray())
                {
                    var token=property.Value as JObject;if(token==null)continue;
                    string tokenId=token["id"]?.Type==JTokenType.String?(string)token["id"]:null;
                    if(tokenId==old)token["id"]=next;else if(tokenId=="bt_"+old)token["id"]="bt_"+next;
                    if(property.Name==old||property.Name=="bt_"+old) { tokens[property.Name==old?next:"bt_"+next]=token.DeepClone();property.Remove(); }
                }
            void Rekey(JObject map) { if(map?[old]!=null) { map[next]=map[old].DeepClone();map.Remove(old); } }
            Rekey(copy["tarotKnowledge"] as JObject);if(selfActor)Rekey(copy["initiativeTracker"]?["tarotDamageTotals"] as JObject);
            copy["id"]=next;return copy;
        }
        public static JObject DownloadCopy(JObject remote)
        {
            if(!Guid.TryParse((string)remote["id"],out _) || remote["revision"]?.Type!=JTokenType.Integer || (long?)remote["revision"]<1 || (bool?)remote["deleted"]==true || !(remote["profile"] is JObject profile)) throw new FormatException("Неверная облачная запись");
            var copy=CopyIdentity(profile,Guid.NewGuid().ToString());
            // Main-compatible identity remapping preserves self-linked combat/effect state.
            new LegacyCharacterArchive(copy.ToString()); return copy;
        }
    }
}
