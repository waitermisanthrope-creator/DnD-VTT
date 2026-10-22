using System;
using System.Linq;
using System.Text.RegularExpressions;
using Newtonsoft.Json.Linq;

namespace DndVtt.UnityPrototype
{
    // Declarative data only: downloaded themes cannot execute code or supply physics scripts.
    public sealed class DiceTheme
    {
        public string Id,Name,Icon,Shape,Body,Trim;
        public float Length,Width;
        public static DiceTheme ForIcon(DiceTheme[] installed,string icon)
        {
            if(string.IsNullOrEmpty(icon))icon="dnd.appearance.icon.default";
            return installed?.FirstOrDefault(theme=>theme.Icon==icon);
        }
        public static DiceTheme Read(JObject data)
        {
            string shape=(string)data["shape"],body=(string)data["body"],trim=(string)data["trim"];
            float length=(float?)data["length"]??float.NaN,width=(float?)data["width"]??float.NaN;
            if(!new[]{"spikes","tentacles","fangs","rounded","vines","crystal","filigree"}.Contains(shape)||!Regex.IsMatch(body??"","^#[A-Fa-f0-9]{6}$")||!Regex.IsMatch(trim??"","^#[A-Fa-f0-9]{6}$")||float.IsNaN(length)||length<.02f||length>.24f||float.IsNaN(width)||width<.015f||width>.09f)throw new FormatException("Неверная геометрия набора дайсов");
            if(!WorkshopStore.ValidId((string)data["id"])||string.IsNullOrWhiteSpace((string)data["name"])||!Regex.IsMatch((string)data["iconPackage"]??"",@"^dnd\.appearance\.icon\.(default|[0-9]{2})$")||!(data["sides"] is JArray sides)||!sides.Values<int>().SequenceEqual(new[]{4,6,8,10,12,20,100}))throw new FormatException("Неверный состав набора дайсов");
            return new DiceTheme { Id=(string)data["id"],Name=(string)data["name"],Icon=(string)data["iconPackage"],Shape=shape,Body=body,Trim=trim,Length=length,Width=width };
        }
    }
}
