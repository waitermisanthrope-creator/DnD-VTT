using System.Collections.Generic;
using System.Globalization;
namespace DndVtt.UnityPrototype
{
 public sealed class NumericInputSession
 {
  public string Owner {get;private set;}
  private bool allowLong;
  private readonly Dictionary<string,string> pending=new Dictionary<string,string>();
  public static bool IsIntegerText(string text)=>!string.IsNullOrEmpty(text)&&text.Length<=11&&int.TryParse(text,NumberStyles.AllowLeadingSign,CultureInfo.InvariantCulture,out _);
  private static bool IsWideIntegerText(string text)=>!string.IsNullOrEmpty(text)&&text.Length<=16&&long.TryParse(text,NumberStyles.None,CultureInfo.InvariantCulture,out long value)&&value>=0&&value<=9007199254740991L;
  public void Begin(string owner,bool wide=false){Owner=owner;allowLong=wide;}
  public void Stage(string owner,string text){if(Owner!=null&&Owner==owner&&(allowLong?IsWideIntegerText(text):IsIntegerText(text)))pending[owner]=text;}
  public void Finish(string owner,string text,bool accepted){if(Owner==null||Owner!=owner)return;if(accepted)Stage(owner,text);else pending.Remove(owner);Owner=null;}
  public bool TryTake(string owner,out string text){if(!pending.TryGetValue(owner,out text))return false;pending.Remove(owner);return true;}
  public void CancelAll(){Owner=null;allowLong=false;pending.Clear();}
 }
}
