using System;
using UnityEngine;

namespace DndVtt.UnityPrototype
{
    public sealed partial class LegacySessionPanel
    {
        private DiceTable diceTable;
        private int diceSelection=5;
        private string diceError;
        private static readonly int[] DiceSides={4,6,8,10,12,20,100};
        private void CloseDiceTable() { diceTable?.Dispose();diceTable=null; }
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
                try { diceTable=new DiceTable();diceTable.Preview(DiceSides[diceSelection]); }
                catch(Exception error) { CloseDiceTable();diceError="Не удалось открыть 3D-стол. Обычные броски доступны в листе героя. "+error.Message; }
            }
            if(diceTable==null) {
                GUILayout.Label(diceError,muted);
                if(GUILayout.Button("Повторить",GUILayout.MinHeight(54)))diceError=null;
                // Keep the existing lightweight rolls accessible if the GPU cannot create a table.
                foreach(int sides in DiceSides)if(GUILayout.Button("Бросить d"+sides,GUILayout.MinHeight(48)))Roll("d"+sides,sides,0);
                GUILayout.Label(rollResult);return;
            }
            bool enabled=GUI.enabled;GUI.enabled=enabled&&!diceTable.Rolling;
            int next=MenuGrid(diceSelection,new[]{"d4","d6","d8","d10","d12","d20","d100"},UiHeight>UiWidth?3:7);
            if(next!=diceSelection) { diceSelection=next;diceTable.Preview(DiceSides[next]); }
            GUI.enabled=enabled;
            float height=Mathf.Clamp(UiHeight*.38f,200,440);
            Rect image=GUILayoutUtility.GetRect(1,height,GUILayout.ExpandWidth(true));
            if(Event.current.type==EventType.Repaint)GUI.DrawTexture(image,diceTable.Image,ScaleMode.ScaleToFit,false);
            GUILayout.Label(diceTable.Result,heading);
            GUI.enabled=enabled&&!diceTable.Rolling;
            if(GUILayout.Button(diceTable.Rolling?"Бросок…":"Бросить d"+DiceSides[diceSelection],brandGreen,GUILayout.MinHeight(62)))diceTable.Throw(DiceSides[diceSelection]);
            GUI.enabled=enabled;
            GUILayout.Label("Настоящая физика. Результат читается с грани после остановки. Кубик на ребре перебрасывается. Пока без авторских текстур и сетевой проверки бросков.",muted);
        }
    }
}
