using System;
using System.Linq;
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
        private string diceExpression="1d20",diceInputError="";
        private static readonly int[] DiceSides={4,6,8,10,12,20,100};
        private void CloseDiceTable() { diceTable?.Dispose();diceTable=null;diceThemes=null; }
        private void UpdateDiceTable()
        {
            bool visible=screen==FrontScreen.Dice||(screen==FrontScreen.Sheet&&sheetTab==5);
            if(!visible) { if(diceTable!=null)CloseDiceTable();return; }
            if(diceTable==null)return;
            try { diceTable.Tick(Time.unscaledDeltaTime); }
            catch(Exception error) { CloseDiceTable();diceError="3D-стол временно недоступен: "+error.Message;return; }
            if(diceTable.Value.HasValue)rollResult=diceTable.Result;
        }
        private void DrawDiceTable()
        {
            GUILayout.Label("Объёмные дайсы",heading);
            if(diceTable==null&&diceError==null) {
                try { diceTable=new DiceTable();diceTable.Preview(DiceSides[diceSelection]);
                    InitializeWorkshop();
                    diceThemes=workshopStore.Installed().OfType<JObject>().Where(m=>(string)m["imageKind"]=="dice").Select(m=>DiceTheme.Read((JObject)workshopStore.Data(m)["diceThemes"][0])).ToArray();
                    string selected=PlayerPrefs.GetString("dndvtt.dice.theme","");
                    if(!PlayerPrefs.HasKey("dndvtt.dice.theme")) { string icon=PlayerPrefs.GetString(AppearancePreference("icon"),"");selected=diceThemes.FirstOrDefault(t=>t.Icon==icon)?.Id??""; }
                    diceThemeSelection=Array.FindIndex(diceThemes,t=>t.Id==selected)+1;diceThemePage=diceThemeSelection/6;
                    if(diceThemeSelection>0)diceTable.SetTheme(diceThemes[diceThemeSelection-1]); }
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
            if(diceThemes!=null&&diceThemes.Length>0) {
                GUILayout.Label("Набор: "+(diceThemeSelection==0?"Классический":diceThemes[diceThemeSelection-1].Name),muted);
                if(GUILayout.Button(diceThemePicker?"Свернуть наборы":"Выбрать набор",GUILayout.MinHeight(48)))diceThemePicker=!diceThemePicker;
                if(diceThemePicker) {
                int start=diceThemePage*6,end=Math.Min(start+6,diceThemes.Length+1);
                for(int i=start;i<end;i++) {
                    string name=i==0?"Классический":diceThemes[i-1].Name;
                    if(GUILayout.Button((diceThemeSelection==i?"✓ ":"")+name,GUILayout.MinHeight(48))) {
                        diceThemeSelection=i;diceThemePicker=false;diceTable.SetTheme(i==0?null:diceThemes[i-1]);
                        PlayerPrefs.SetString("dndvtt.dice.theme",i==0?"":diceThemes[i-1].Id);PlayerPrefs.Save();
                    }
                }
                GUILayout.BeginHorizontal();
                if(diceThemePage>0&&GUILayout.Button("← Наборы"))diceThemePage--;
                if(end<diceThemes.Length+1&&GUILayout.Button("Наборы →"))diceThemePage++;
                GUILayout.EndHorizontal();
                }
            }else GUILayout.Label("Авторские 3D-наборы: Главная → Мастерская → Оформление → 3D Дайсы.",muted);
            int next=MenuGrid(diceSelection,new[]{"d4","d6","d8","d10","d12","d20","d100"},UiHeight>UiWidth?3:7);
            if(next!=diceSelection) { diceSelection=next;diceExpression="1d"+DiceSides[next];diceTable.Preview(DiceSides[next]); }
            GUI.enabled=enabled;
            float height=Mathf.Clamp(UiHeight*.38f,200,440);
            Rect image=GUILayoutUtility.GetRect(1,height,GUILayout.ExpandWidth(true));
            if(Event.current.type==EventType.Repaint)GUI.DrawTexture(image,diceTable.Image,ScaleMode.ScaleToFit,false);
            GUILayout.Label(diceTable.Result,heading);
            GUI.enabled=enabled&&!diceTable.Throwing;
            GUILayout.Label("Бросок: например 7d20 + 3d6 + 1d8",muted);
            diceExpression=GUILayout.TextField(diceExpression);
            if(GUILayout.Button(diceTable.Throwing?"Бросок…":"Бросить",brandGreen,GUILayout.MinHeight(62))) {
                try { diceTable.Throw(diceExpression);diceInputError=""; }
                catch(FormatException error) { diceInputError=error.Message; }
            }
            GUI.enabled=enabled;
            if(diceTable.Throwing&&GUILayout.Button("Отменить бросок",GUILayout.MinHeight(54)))diceTable.Cancel();
            if(diceInputError.Length>0)GUILayout.Label(diceInputError,muted);
            GUILayout.Label("Большие броски идут партиями, без ограничения общего количества. Настоящая физика. Результат читается с грани после остановки. Кубик на ребре перебрасывается. Фигурные наборы могут быть несбалансированными. Результат не имеет сетевого подтверждения.",muted);
        }
    }
}
