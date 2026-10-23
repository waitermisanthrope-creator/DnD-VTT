using System;
using System.Linq;
using System.Collections.Generic;
using System.Globalization;
using BigInteger = System.Numerics.BigInteger;
using Newtonsoft.Json.Linq;
using UnityEngine;

namespace DndVtt.UnityPrototype
{
    public sealed partial class LegacySessionPanel
    {
        private DiceTable diceTable;
        private int diceSelection=5;
        private string diceError;
        private DiceTheme[] diceThemes;
        private int diceThemeSelection,diceThemePage;
        private bool diceThemePicker;
        private string diceIconSelection;
        private string diceInputError="";
        private readonly List<KeyValuePair<int,BigInteger>> diceGroups = new List<KeyValuePair<int,BigInteger>> { new KeyValuePair<int,BigInteger>(20,BigInteger.One) };
        private bool diceAddPicker;
        private int diceEditGroup=-1;
        private string diceQuantity="1";
        private bool diceReplaceQuantity;
        private static readonly int[] DiceSides={4,6,8,10,12,20,100};
        private void CloseDiceTable() { StopDiceSensor();diceTable?.Dispose();diceTable=null;diceThemes=null;diceTrays=null; }
        private void UpdateDiceTable()
        {
            bool visible=screen==FrontScreen.Dice||(screen==FrontScreen.Sheet&&sheetTab==5);
            if(!visible) { if(diceTable!=null)CloseDiceTable();return; }
            if(diceTable==null)return;
            try { UpdateDiceSensor();diceTable.Tick(Time.unscaledDeltaTime); }
            catch(Exception error) { CloseDiceTable();diceError="3D-стол временно недоступен: "+error.Message;return; }
            if(diceTable.Value.HasValue)rollResult=diceTable.Result;
        }
        // Manual installed-set selection and icon-following are distinct persisted modes.
        private void SyncDiceIcon()
        {
            if(diceTable==null||diceTable.Throwing)return;
            bool follow=PlayerPrefs.GetInt("dndvtt.dice.followIcon",PlayerPrefs.HasKey("dndvtt.dice.theme")?0:1)==1;
            string icon=PlayerPrefs.GetString(AppearancePreference("icon"),"dnd.appearance.icon.default");
            string selected=PlayerPrefs.GetString("dndvtt.dice.theme","");
            string key=(follow?"icon:":"set:")+(follow?icon:selected);
            if(key==diceIconSelection)return;
            var resolved=DiceTheme.ForSelection(diceThemes,icon,selected,follow);
            diceThemeSelection=Array.IndexOf(diceThemes??Array.Empty<DiceTheme>(),resolved)+1;
            if(resolved!=null) {
                var manifest=workshopStore.Find(resolved.Id.Substring(0,resolved.Id.Length-6));
                if(manifest!=null)resolved=DiceTheme.Read((JObject)workshopStore.Data(manifest)["diceThemes"][0],true);
            }
            diceTable.SetTheme(resolved);diceIconSelection=key;diceThemePage=diceThemeSelection/6;
        }
        private void DrawDiceThemePicker()
        {
            GUILayout.Label("Набор для броска: "+(diceThemeSelection==0?"Классический":diceThemes[diceThemeSelection-1].Name));
            if(GUILayout.Button(diceThemePicker?"Свернуть наборы":"Мои наборы · "+(diceThemes?.Length??0),GUILayout.MinHeight(56)))diceThemePicker=!diceThemePicker;
            if(!diceThemePicker)return;
            bool follow=PlayerPrefs.GetInt("dndvtt.dice.followIcon",PlayerPrefs.HasKey("dndvtt.dice.theme")?0:1)==1;
            if(GUILayout.Button((follow?"✓ ":"")+"Как выбранная иконка приложения",GUILayout.MinHeight(56))) {
                PlayerPrefs.SetInt("dndvtt.dice.followIcon",1);PlayerPrefs.Save();diceIconSelection=null;SyncDiceIcon();
            }
            int count=(diceThemes?.Length??0)+1,start=diceThemePage*6,end=Math.Min(count,start+6);
            for(int i=start;i<end;i++) {
                string name=i==0?"Классический":diceThemes[i-1].Name;
                if(GUILayout.Button((i==diceThemeSelection?"✓ ":"")+name,GUILayout.MinHeight(56))) {
                    PlayerPrefs.SetString("dndvtt.dice.theme",i==0?"":diceThemes[i-1].Id);
                    PlayerPrefs.SetInt("dndvtt.dice.followIcon",0);PlayerPrefs.Save();diceIconSelection=null;SyncDiceIcon();diceThemePicker=false;
                }
            }
            GUILayout.BeginHorizontal();
            if(diceThemePage>0&&GUILayout.Button("← Наборы",GUILayout.MinHeight(52)))diceThemePage--;
            if(end<count&&GUILayout.Button("Наборы →",GUILayout.MinHeight(52)))diceThemePage++;
            GUILayout.EndHorizontal();
            if((diceThemes?.Length??0)==0)GUILayout.Label("Пока нет установленных 3D-наборов. Иконки и 3D-наборы — разные загрузки: Мастерская → Оформление → 3D Дайсы.",muted);
        }
        private string DiceGroupExpression()=>string.Join(" + ",diceGroups.Select(g=>g.Value.ToString(CultureInfo.InvariantCulture)+"d"+g.Key));
        private void AddDiceGroup(int selection)
        {
            diceSelection=selection;
            diceGroups.Add(new KeyValuePair<int,BigInteger>(DiceSides[selection],BigInteger.One));
            diceEditGroup=diceGroups.Count-1;diceQuantity="1";diceReplaceQuantity=true;diceAddPicker=false;
            diceTable?.Preview(DiceSides[selection]);
        }
        private void ApplyDiceQuantity()
        {
            if(diceEditGroup<0||diceEditGroup>=diceGroups.Count)return;
            if(BigInteger.TryParse(diceQuantity,out var quantity)&&quantity>0) {
                var group=diceGroups[diceEditGroup];diceGroups[diceEditGroup]=new KeyValuePair<int,BigInteger>(group.Key,quantity);
                diceEditGroup=-1;diceInputError="";
            }else diceInputError="Количество должно быть больше нуля.";
        }
        private void DrawDiceGroups()
        {
            for(int i=0;i<diceGroups.Count;i++) {
                var group=diceGroups[i];
                GUILayout.BeginVertical(brandCard);
                GUILayout.Label("d"+group.Key+" · "+group.Value.ToString(CultureInfo.InvariantCulture)+" шт.");
                GUILayout.BeginHorizontal();
                if(GUILayout.Button("−",GUILayout.MinHeight(52))&&group.Value>1)diceGroups[i]=new KeyValuePair<int,BigInteger>(group.Key,group.Value-1);
                if(GUILayout.Button("Количество",GUILayout.MinHeight(52))) { diceEditGroup=i;diceQuantity=group.Value.ToString(CultureInfo.InvariantCulture);diceReplaceQuantity=true;diceAddPicker=false; }
                if(GUILayout.Button("+",GUILayout.MinHeight(52)))diceGroups[i]=new KeyValuePair<int,BigInteger>(group.Key,group.Value+1);
                GUILayout.EndHorizontal();
                if(GUILayout.Button("Убрать d"+group.Key,GUILayout.MinHeight(48))) { diceGroups.RemoveAt(i);diceEditGroup=-1;GUILayout.EndVertical();break; }
                GUILayout.EndVertical();
            }
            if(GUILayout.Button(diceAddPicker?"Закрыть выбор":"+ Добавить дайс",GUILayout.MinHeight(56))) { diceAddPicker=!diceAddPicker;diceEditGroup=-1; }
            if(diceAddPicker) {
                GUILayout.Label("Выберите количество граней",muted);
                int next=MenuGrid(-1,new[]{"d4","d6","d8","d10","d12","d20","d100"},UiHeight>UiWidth?3:7);
                if(next>=0)AddDiceGroup(next);
            }
            if(diceEditGroup>=0&&diceEditGroup<diceGroups.Count) {
                GUILayout.BeginVertical(brandCard);
                GUILayout.Label("Количество d"+diceGroups[diceEditGroup].Key+": "+diceQuantity);
                // In-app keypad never opens the OS keyboard or hides the dice list.
                int digit=MenuGrid(-1,new[]{"1","2","3","4","5","6","7","8","9","Очистить","0","⌫"},3);
                if(digit>=0&&diceReplaceQuantity) { diceQuantity="";diceReplaceQuantity=false; }
                if(digit>=0&&digit<9)diceQuantity=(diceQuantity=="0"?"":diceQuantity)+(digit+1).ToString();
                if(digit==9)diceQuantity="";
                if(digit==10)diceQuantity=(diceQuantity=="0"?"":diceQuantity)+"0";
                if(digit==11&&diceQuantity.Length>0)diceQuantity=diceQuantity.Substring(0,diceQuantity.Length-1);
                if(GUILayout.Button("Применить количество",brandGreen,GUILayout.MinHeight(56)))ApplyDiceQuantity();
                GUILayout.EndVertical();
            }
        }
        private void DrawDiceTable()
        {
            GUILayout.Label("Объёмные дайсы",heading);
            if(diceTable==null&&diceError==null) {
                try { diceTable=new DiceTable();diceTable.Preview(DiceSides[diceSelection]);
                    InitializeWorkshop();
                    diceThemes=workshopStore.Installed().OfType<JObject>().Where(m=>(string)m["imageKind"]=="dice").Select(m=>DiceTheme.Read((JObject)workshopStore.Data(m)["diceThemes"][0])).ToArray();
                    diceTrays=workshopStore.Installed().OfType<JObject>().Where(m=>(string)m["imageKind"]=="dice-tray").Select(m=>DiceTray.Read((JObject)workshopStore.Data(m)["diceTrays"][0])).ToArray();
                    diceTable.SetTray(diceTrays.FirstOrDefault(t=>t.Id==PlayerPrefs.GetString("dndvtt.dice.tray","")));
                    diceIconSelection=null;SyncDiceIcon(); }
                catch(Exception error) { CloseDiceTable();diceError="Не удалось открыть 3D-стол. Обычные броски доступны в листе героя. "+error.Message; }
            }
            if(diceTable==null) {
                GUILayout.Label(diceError,muted);
                if(GUILayout.Button("Повторить",GUILayout.MinHeight(54)))diceError=null;
                // Keep the existing lightweight rolls accessible if the GPU cannot create a table.
                foreach(int sides in DiceSides)if(GUILayout.Button("Бросить d"+sides,GUILayout.MinHeight(48)))Roll("d"+sides,sides,0);
                GUILayout.Label(rollResult);return;
            }
            bool enabled=GUI.enabled;GUI.enabled=enabled&&!diceTable.Throwing;
            SyncDiceIcon();
            DrawDiceThemePicker();
            DrawDiceTrayPicker();
            DrawDiceShakeControl();
            if(diceThemeSelection==0)GUILayout.Label("Скачанные 3D-комплекты доступны в «Мои наборы». Режим привязки к иконке работает, если соответствующий комплект установлен.",muted);
            else if(diceThemes[diceThemeSelection-1].TextureSha256==null)GUILayout.Label("Этот набор ещё версии без UV-текстур. Обновите его в мастерской до 1.1.0.",muted);
            DrawDiceGroups();
            GUI.enabled=enabled;
            float height=Mathf.Clamp(UiHeight*.38f,200,440);
            Rect image=GUILayoutUtility.GetRect(1,height,GUILayout.ExpandWidth(true));
            if(Event.current.type==EventType.Repaint)GUI.DrawTexture(image,diceTable.Image,ScaleMode.ScaleToFit,false);
            GUILayout.Label(diceTable.Result,heading);
            GUI.enabled=enabled&&!diceTable.Throwing;
            GUILayout.Label(diceGroups.Count==0?"Добавьте дайсы для броска":DiceGroupExpression(),muted);
            GUI.enabled=GUI.enabled&&diceGroups.Count>0&&diceEditGroup<0;
            if(GUILayout.Button(diceTable.Throwing?"Бросок…":"Бросить",brandGreen,GUILayout.MinHeight(62))) {
                try { diceTable.Throw(DiceGroupExpression());diceInputError="";diceAddPicker=false;diceEditGroup=-1; }
                catch(FormatException error) { diceInputError=error.Message; }
            }
            GUI.enabled=enabled;
            if(diceTable.Throwing&&GUILayout.Button("Отменить бросок",GUILayout.MinHeight(54))) { diceMotion.Reset();diceTable.Cancel(); }
            if(diceInputError.Length>0)GUILayout.Label(diceInputError,muted);
            GUILayout.Label("До 20 физических кубов одновременно (d100 занимает два места). Общее количество не ограничено: большие броски идут партиями. Результат читается после остановки; движения щупалец и прыжки слайма могут изменить его до фиксации. Фигурные наборы могут быть несбалансированными. Сетевого подтверждения результата нет.",muted);
        }
    }
}
