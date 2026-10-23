using System;
using UnityEngine;
using UnityEngine.InputSystem;

namespace DndVtt.UnityPrototype
{
    public sealed partial class LegacySessionPanel
    {
        private DiceTray[] diceTrays;
        private bool diceTrayPicker,ownsDiceSensor;
        private Accelerometer diceSensor;
        private readonly DiceMotion diceMotion=new DiceMotion();
        private void DrawDiceTrayPicker()
        {
            string active=diceTable.ActiveTrayId;
            string name=Array.Find(diceTrays??Array.Empty<DiceTray>(),t=>t.Id==active)?.Name??"Классический лоток";
            if(GUILayout.Button("Лоток / башня · "+name,GUILayout.MinHeight(56)))diceTrayPicker=!diceTrayPicker;
            if(!diceTrayPicker)return;
            for(int i=-1;i<(diceTrays?.Length??0);i++) {
                var selected=i<0?null:diceTrays[i];
                if(GUILayout.Button((active==(selected?.Id??"")?"✓ ":"")+(selected?.Name??"Классический лоток"),GUILayout.MinHeight(54))) {
                    diceTable.SetTray(selected);PlayerPrefs.SetString("dndvtt.dice.tray",selected?.Id??"");PlayerPrefs.Save();diceTrayPicker=false;
                }
            }
            if((diceTrays?.Length??0)==0)GUILayout.Label("Скачайте лотки и башни: Мастерская → Оформление → Лотки и башни.",muted);
        }
        private void DrawDiceShakeControl()
        {
            bool available=Accelerometer.current!=null,enabled=PlayerPrefs.GetInt("dndvtt.dice.shake",0)==1;
            bool previous=GUI.enabled;GUI.enabled=previous&&available;
            if(GUILayout.Button(available?(enabled?"✓ Встряхивание телефона включено":"Включить встряхивание телефона"):"Датчик движения недоступен",GUILayout.MinHeight(54))) {
                PlayerPrefs.SetInt("dndvtt.dice.shake",enabled?0:1);PlayerPrefs.Save();diceMotion.Reset();if(enabled)StopDiceSensor();
            }
            GUI.enabled=previous;
            if(available&&enabled)GUILayout.Label("Встряхните и остановите телефон — кубики полетят. Сильнее тряска — сильнее бросок. Во время броска можно подбросить их снова. Зафиксированный результат не меняется.",muted);
        }
        private void StopDiceSensor()
        {
            if(ownsDiceSensor&&diceSensor!=null&&diceSensor.added)InputSystem.DisableDevice(diceSensor);
            diceSensor=null;ownsDiceSensor=false;diceMotion.Reset();
        }
        private void UpdateDiceSensor()
        {
            if(!Application.isFocused||PlayerPrefs.GetInt("dndvtt.dice.shake",0)!=1) { StopDiceSensor();return; }
            var sensor=Accelerometer.current;
            if(sensor==null) { StopDiceSensor();return; }
            if(diceSensor!=sensor) { StopDiceSensor();diceSensor=sensor;ownsDiceSensor=!sensor.enabled;if(ownsDiceSensor)InputSystem.EnableDevice(sensor); }
            Vector3 a=sensor.acceleration.ReadValue();
            if(!diceMotion.Sample(a.x,a.y,a.z,Time.unscaledDeltaTime))return;
            if(diceTable.Throwing)diceTable.Shake(diceMotion.Strength);
            else if(diceGroups.Count>0&&diceEditGroup<0) {
                diceTable.Throw(DiceGroupExpression(),diceMotion.Strength);diceInputError="";diceAddPicker=false;
            }
        }
    }
}
