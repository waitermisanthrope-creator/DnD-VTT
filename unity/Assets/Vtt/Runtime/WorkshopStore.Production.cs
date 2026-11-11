using System;
using System.IO;
using System.Linq;
using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
namespace DndVtt.UnityPrototype
{
    public sealed partial class WorkshopStore
    {
        public const int ProductionClientCode=10051;
        public JArray Production(JArray installed)
        {
            var modules=new JArray();
            foreach(JObject manifest in installed)
            {
                if((string)manifest["type"]!="craft"||(string)manifest["craftMode"]!="production-v1")continue;
                var data=Data(manifest);data["packageId"]=manifest["id"].DeepClone();data["packageVersion"]=manifest["version"].DeepClone();modules.Add(data);
            }
            return modules;
        }
        // Local transport feeds the SAME validator, dependency graph, immutable
        // revisions and atomic installed pointer as downloaded workshop packages.
        public JObject ImportLocalData(string text,string platform,string unity,int clientCode)
        {
            if(Encoding.UTF8.GetByteCount(text)>5*1024*1024)throw new FormatException("Дополнение больше5МБ");
            var envelope=Parse(text);var manifest=(JObject)(envelope["manifest"] as JObject??throw new FormatException("Нет манифеста дополнения")).DeepClone();
            var data=(JObject)(envelope["data"] as JObject??throw new FormatException("Нет данных дополнения")).DeepClone();
            string type=(string)manifest["type"],id=(string)manifest["id"],version=(string)manifest["version"];
            if(!new[]{"item","craft"}.Contains(type))throw new FormatException("Из файла принимаются только декларативные предметы и ремёсла");
            manifest["schemaVersion"]=1;manifest["format"]="json";manifest["platform"]=manifest["platform"]??new JValue("any");manifest["unityVersion"]=manifest["unityVersion"]??new JValue("*");manifest["dependencies"]=manifest["dependencies"]??new JArray();manifest["source"]="local";manifest["minClientVersionCode"]=Math.Max(ProductionClientCode,(int?)manifest["minClientVersionCode"]??0);
            manifest["url"]="local://"+id+"/"+version+".json";
            if((string)data["mode"]=="production-v1"){manifest["craftMode"]="production-v1";manifest["minClientVersionCode"]=Math.Max(ProductionClientCode,(int?)manifest["minClientVersionCode"]??0);}
            data["schemaVersion"]=data["schemaVersion"]??new JValue(1);data["id"]=data["id"]??manifest["id"].DeepClone();data["version"]=data["version"]??manifest["version"].DeepClone();data["type"]=data["type"]??manifest["type"].DeepClone();
            byte[] bytes=Encoding.UTF8.GetBytes(data.ToString(Formatting.None));manifest["bytes"]=bytes.Length;manifest["sha256"]=Digest(bytes);ValidateManifest(manifest);ValidateData(manifest,Encoding.UTF8.GetString(bytes));
            var installed=Installed();var others=installed.OfType<JObject>().Where(m=>(string)m["id"]!=id).ToArray();
            // Never allow a second package to shadow an existing item ID.
            if(type=="item")
            {
                var existing=((JArray)Commerce(new JArray(others))["items"]).OfType<JObject>().Select(i=>(string)i["id"]).ToHashSet();
                if(((JArray)data["items"]).OfType<JObject>().Any(i=>existing.Contains((string)i["id"])))throw new FormatException("ID предмета уже принадлежит другому дополнению");
            }
            var available=new JArray(others.Select(m=>m.DeepClone()));available.Add(manifest.DeepClone());InstallPlan(manifest,available.OfType<JObject>(),installed.OfType<JObject>(),platform,unity,clientCode);
            string temporary=Path.Combine(Root,"local-import-"+Guid.NewGuid().ToString("N")+".json");
            try {File.WriteAllBytes(temporary,bytes);Install(manifest,temporary,platform,unity);return manifest;}
            finally{if(File.Exists(temporary))File.Delete(temporary);}
        }
    }
}
