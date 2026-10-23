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
        public string Behavior;
        public bool NumberedAtlas;
        public float Length,Width;
        public byte[] TexturePng;
        public string TextureSha256;
        public bool TintTexture;
        public int FaceTile,TrimTile;
        public static DiceTheme ForIcon(DiceTheme[] installed,string icon)
        {
            if(string.IsNullOrEmpty(icon))icon="dnd.appearance.icon.default";
            return installed?.FirstOrDefault(theme=>theme.Icon==icon);
        }
        public static DiceTheme ForSelection(DiceTheme[] installed,string icon,string selected,bool followIcon)
            =>followIcon?ForIcon(installed,icon):installed?.FirstOrDefault(theme=>theme.Id==selected);
        public static DiceTheme Read(JObject data,bool includeTexture=false)
        {
            string shape=(string)data["shape"],body=(string)data["body"],trim=(string)data["trim"];
            float length=(float?)data["length"]??float.NaN,width=(float?)data["width"]??float.NaN;
            if(!new[]{"spikes","tentacles","fangs","rounded","vines","crystal","filigree"}.Contains(shape)||!Regex.IsMatch(body??"","^#[A-Fa-f0-9]{6}$")||!Regex.IsMatch(trim??"","^#[A-Fa-f0-9]{6}$")||float.IsNaN(length)||length<.02f||length>.24f||float.IsNaN(width)||width<.015f||width>.09f)throw new FormatException("Неверная геометрия набора дайсов");
            if(!WorkshopStore.ValidId((string)data["id"])||string.IsNullOrWhiteSpace((string)data["name"])||!Regex.IsMatch((string)data["iconPackage"]??"",@"^dnd\.appearance\.icon\.(default|[0-9]{2})$")||!(data["sides"] is JArray sides)||!sides.Values<int>().SequenceEqual(new[]{4,6,8,10,12,20,100}))throw new FormatException("Неверный состав набора дайсов");
            string behavior=(string)data["behavior"]??"";bool numbered=(bool?)data["numberedAtlas"]??false;
            if(!new[]{"","abyss","ice","blood","stone","vine","slime"}.Contains(behavior)||numbered&&(data["albedo"]==null||behavior==""))throw new FormatException("Неверный профиль материала");
            byte[] png=null;int faceTile=(int?)data["faceTile"]??0,trimTile=(int?)data["trimTile"]??3;
            if(data["albedo"]!=null) {
                if(!(data["albedo"] is JObject image)||faceTile<0||faceTile>3||trimTile<0||trimTile>3)throw new FormatException("Материал дайса");
                var bytes=WorkshopStore.ImageBytes(image);if(numbered&&((int?)image["width"]!=1920||(int?)image["height"]!=1728))throw new FormatException("Размер нумерованного атласа");if(includeTexture)png=bytes;
            }
            return new DiceTheme { Behavior=behavior,NumberedAtlas=numbered,TextureSha256=(string)data["albedo"]?["sha256"],TintTexture=(bool?)data["tintTexture"]??false,TexturePng=png,FaceTile=faceTile,TrimTile=trimTile,Id=(string)data["id"],Name=(string)data["name"],Icon=(string)data["iconPackage"],Shape=shape,Body=body,Trim=trim,Length=length,Width=width };
        }
    }
}
