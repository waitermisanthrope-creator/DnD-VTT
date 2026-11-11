using System;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;
namespace DndVtt.UnityPrototype
{
    public sealed class DiceAppearanceCatalog
    {
        public DiceTheme[] Themes=Array.Empty<DiceTheme>();
        public DiceTray[] Trays=Array.Empty<DiceTray>();
        public readonly Dictionary<string,JObject> ThemePackages=new Dictionary<string,JObject>();
        public string Warning="";
        // The caller provides WorkshopStore.Data: package/hash validation remains
        // mandatory; only its already-verified image metadata is read a second time.
        public static DiceAppearanceCatalog Load(JArray installed,Func<JObject,JObject> read)
        {
            var result=new DiceAppearanceCatalog();var themes=new List<DiceTheme>();var trays=new List<DiceTray>();
            foreach(JObject manifest in installed)
            {
                string kind=(string)manifest["imageKind"];if(kind!="dice"&&kind!="dice-tray")continue;
                try
                {
                    var data=read(manifest);
                    if(kind=="dice"){var theme=DiceTheme.ReadVerified((JObject)data["diceThemes"][0]);themes.Add(theme);result.ThemePackages[theme.Id]=(JObject)manifest.DeepClone();}
                    else trays.Add(DiceTray.Read((JObject)data["diceTrays"][0]));
                }
                catch(Exception error){result.Warning="Часть наборов недоступна: "+error.Message;}
            }
            result.Themes=themes.ToArray();result.Trays=trays.ToArray();return result;
        }
    }
}
