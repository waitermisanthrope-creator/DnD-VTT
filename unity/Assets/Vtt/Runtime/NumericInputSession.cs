using System.Collections.Generic;
using System.Globalization;
namespace DndVtt.UnityPrototype
{
 public sealed class NumericInputSession
 {
  public string Owner {get;private set;}
  private readonly Dictionary<string,string> pending=new Dictionary<string,string>();
  public static bool IsIntegerText(string text)=>!string.IsNullOrEmpty(text)&&text.Length<=11&&int.TryParse(text,NumberStyles.AllowLeadingSign,CultureInfo.InvariantCulture,out _);
  public void Begin(string owner){Owner=owner;}
  public void Stage(string owner,string text){if(Owner!=null&&Owner==owner&&IsIntegerText(text))pending[owner]=text;}
  public void Finish(string owner,string text,bool accepted){if(Owner==null||Owner!=owner)return;if(accepted)Stage(owner,text);else pending.Remove(owner);Owner=null;}
  public bool TryTake(string owner,out string text){if(!pending.TryGetValue(owner,out text))return false;pending.Remove(owner);return true;}
  public void CancelAll(){Owner=null;pending.Clear();}
 }
}
