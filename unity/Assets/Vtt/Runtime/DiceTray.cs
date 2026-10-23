using System;
using System.Linq;
using System.Text.RegularExpressions;
using Newtonsoft.Json.Linq;

namespace DndVtt.UnityPrototype
{
    // Safe native builders, selected by immutable workshop data. No mesh scripts,
    // forces, paths or executable behaviour can be supplied by a downloaded tray.
    public sealed class DiceTray
    {
        public string Id,Name,Profile,Print,Floor,Wall;
        public static DiceTray Read(JObject data)
        {
            if(data==null||data.Properties().Any(p=>!new[]{"id","name","profile","print","floor","wall"}.Contains(p.Name)))throw new FormatException("Состав лотка");
            string id=(string)data["id"],name=(string)data["name"],profile=(string)data["profile"],print=(string)data["print"],floor=(string)data["floor"],wall=(string)data["wall"];
            if(!WorkshopStore.ValidId(id)||string.IsNullOrWhiteSpace(name)||name.Length>100||!new[]{"spiral","pit","hexagon","octagon"}.Contains(profile)||!new[]{"astral","runes","web","compass"}.Contains(print)||!Regex.IsMatch(floor??"","^#[a-fA-F0-9]{6}$")||!Regex.IsMatch(wall??"","^#[a-fA-F0-9]{6}$"))throw new FormatException("Неверный профиль лотка");
            return new DiceTray { Id=id,Name=name,Profile=profile,Print=print,Floor=floor,Wall=wall };
        }
    }
}
