using System;
using System.Globalization;
using System.Linq;
using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
namespace DndVtt.UnityPrototype
{
    public static partial class CommerceRules
    {
        private const string ContainerTransferKey="dndVttInventoryTransfer";
        public static decimal ExactItemCount(JToken value,decimal fallback=1)
        {
            if(value==null)return fallback;
            if(!(value is JValue)||!decimal.TryParse(value.ToString(),NumberStyles.Float,CultureInfo.InvariantCulture,out var n)||n<0||n>9007199254740991m)throw new FormatException("Неверное количество предметов");
            return n;
        }
        public static void AddExactInventoryItem(JObject hero,JObject item,decimal count)
        {
            string category=(string)item["inventoryCategory"];
            if(!CharacterSheetRules.InventoryCategories.Contains(category)||count<=0||count>9007199254740991m)throw new FormatException("Неверный предмет или количество");
            if(hero["inventory"]!=null&&!(hero["inventory"] is JObject))throw new FormatException("Неизвестный формат инвентаря — данные сохранены");
            JObject Identity(JObject value){var copy=(JObject)value.DeepClone();copy.Remove("count");if((bool?)copy["equipped"]!=true)copy.Remove("equipped");return copy;}
            var identity=Identity(item);var list=CharacterSheetRules.Array(CharacterSheetRules.Object(hero,"inventory"),category);
            var same=list.OfType<JObject>().FirstOrDefault(x=>JToken.DeepEquals(Identity(x),identity));
            if(same!=null){decimal total=ExactItemCount(same["count"])+count;if(total>9007199254740991m)throw new FormatException("Слишком много предметов");same["count"]=total;}
            else{var copy=(JObject)item.DeepClone();copy["count"]=count;if(copy["equipped"]==null)copy["equipped"]=false;list.Add(copy);}
        }
        private static string ContainerSignature(JObject container)
        {var copy=(JObject)container.DeepClone();copy.Remove(ContainerTransferKey);return WorkshopStore.Digest(Encoding.UTF8.GetBytes(copy.ToString(Formatting.None)));}
        public static bool IsArchivedContainer(JObject container)=>container[ContainerTransferKey] is JObject state&&(int?)state["schema"]==1&&(string)state["state"]=="complete";
        public static bool NeedsContainerTransfer(JObject hero)
        {
            var containers=hero["inventory"]?["containers"];if(containers==null)return false;if(!(containers is JArray list))return true;
            return list.Any(c=>!(c is JObject obj)||!IsArchivedContainer(obj)||(string)obj[ContainerTransferKey]["signature"]!=ContainerSignature(obj));
        }
        public static JObject TransferLegacyContainers(JObject hero)
        {
            var candidate=(JObject)hero.DeepClone();var token=candidate["inventory"]?["containers"];if(token==null)return candidate;
            if(!(token is JArray containers))throw new FormatException("Неизвестный формат контейнеров — перенос отменён");
            foreach(var value in containers)
            {
                if(!(value is JObject container)||!(container["contents"] is JArray contents))throw new FormatException("Неизвестный формат контейнера — перенос отменён");
                string signature=ContainerSignature(container);
                if(container[ContainerTransferKey]!=null)
                {if(!IsArchivedContainer(container)||(string)container[ContainerTransferKey]["signature"]!=signature)throw new FormatException("Архив контейнера изменён после переноса. Автоматический повторный перенос заблокирован.");continue;}
                foreach(var entry in contents)
                {
                    if(!(entry is JObject item)||!(item["name"] is JValue name)||name.Type!=JTokenType.String)throw new FormatException("Неизвестный предмет в контейнере — перенос отменён");
                    decimal count=ExactItemCount(item["count"]);if(count==0)continue;
                    var copy=(JObject)item.DeepClone();string category=(string)(copy["inventoryCategory"]??copy["category"]);
                    if(!CharacterSheetRules.InventoryCategories.Contains(category))
                    {if(copy["inventoryCategory"]!=null)copy["legacyInventoryCategory"]=copy["inventoryCategory"].DeepClone();category="junk";}
                    copy["inventoryCategory"]=category;AddExactInventoryItem(candidate,copy,count);
                }
                var shell=(JObject)container.DeepClone();shell.Remove("contents");shell["id"]=container["id"]?.DeepClone()??new JValue("legacy.container."+signature.Substring(0,16));shell["name"]=container["name"]?.DeepClone()??new JValue("Сумка");shell["inventoryCategory"]="junk";
                AddExactInventoryItem(candidate,shell,1);
                container[ContainerTransferKey]=new JObject{["schema"]=1,["state"]="complete",["signature"]=signature};
            }
            return candidate;
        }
    }
}
