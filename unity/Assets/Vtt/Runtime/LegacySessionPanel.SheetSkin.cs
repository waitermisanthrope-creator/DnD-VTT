using System;
using System.Linq;
using UnityEngine;

namespace DndVtt.UnityPrototype
{
    public sealed partial class LegacySessionPanel
    {
        private readonly NumericInputSession numericSession=new NumericInputSession();
        private TouchScreenKeyboard numericKeyboard;
        private void ResetFormInput()
        {
            if(numericKeyboard!=null){numericKeyboard.active=false;numericKeyboard=null;}
            numericSession.CancelAll();
            if(Event.current!=null)
            {
                int id=GUIUtility.keyboardControl;
                if(id!=0)
                {
                    var editor=GUIUtility.GetStateObject(typeof(TextEditor),id) as TextEditor;
                    if(editor!=null){if(editor.keyboardOnScreen!=null){editor.keyboardOnScreen.active=false;editor.keyboardOnScreen=null;}editor.OnLostFocus();}
                }
                GUI.FocusControl(null);GUIUtility.keyboardControl=0;GUIUtility.hotControl=0;
            }
        }
        private void PollNumericKeyboard()
        {
#if UNITY_ANDROID && !UNITY_EDITOR
            if(numericKeyboard==null)return;
            if(numericKeyboard.status==TouchScreenKeyboard.Status.Canceled){numericSession.Finish(numericSession.Owner,"",false);numericKeyboard.active=false;numericKeyboard=null;return;}
            numericSession.Stage(numericSession.Owner,numericKeyboard.text);
            if(numericKeyboard.status!=TouchScreenKeyboard.Status.Visible)CompleteNumericKeyboard();
#endif
        }
        private void CompleteNumericKeyboard()
        {
            if(numericKeyboard==null)return;
            numericSession.Finish(numericSession.Owner,numericKeyboard.text,numericKeyboard.status!=TouchScreenKeyboard.Status.Canceled);
            numericKeyboard.active=false;numericKeyboard=null;
        }
        private void FlushCreationNumbers()
        {
            CompleteNumericKeyboard();
            for(int i=0;i<statInputs.Length;i++)if(numericSession.TryTake("creation-stat-"+CharacterSheetRules.Stats[i],out string value))statInputs[i]=value;
        }
        private string IntegerField(string owner,string value,params GUILayoutOption[] options)
        {
#if UNITY_ANDROID && !UNITY_EDITOR
            PollNumericKeyboard();
            if(numericSession.TryTake(owner,out string committed))value=committed;
            bool own=numericSession.Owner==owner&&numericKeyboard!=null;
            string display=own?numericKeyboard.text+" ✓":value;
            if(GUILayout.Button(display,GUI.skin.textField,options))
            {
                // Preserve the previous owner's last valid digit in either draw order.
                CompleteNumericKeyboard();
                if(numericSession.TryTake(owner,out committed))value=committed;
                if(!own)
                {
                    numericSession.Begin(owner);
                    numericKeyboard=TouchScreenKeyboard.Open(value,TouchScreenKeyboardType.NumberPad,false,false,false,false,"Введите число",11);
                }
            }
            return value;
#else
            GUI.SetNextControlName(owner);return GUILayout.TextField(value,options);
#endif
        }
        private bool FitMenuButton(string label,float minimum=44)
        {
            float width=Mathf.Max(80,classicControlWidth>0?classicControlWidth-8:Mathf.Min(900,UiWidth-140));
            return MeasuredMenuButton(label,GUI.skin.button,GUILayout.MinHeight(Mathf.Max(minimum,GUI.skin.button.CalcHeight(new GUIContent(label),width))));
        }
        private GUISkin sheetSkin;
        private Font sheetSerif;
        private GUIStyle sheetHeading, sheetQuiet, sheetTabStyle, sheetActiveTab, sheetCharacterName,sheetMetricBox,sheetMetricInput;
        private Vector2 sheetTabsScroll;
        private void PrepareSheetSkin()
        {
            PrepareBrand();
            if (sheetSkin) { GUI.skin = sheetSkin; return; }
            sheetSkin = Instantiate(GUI.skin); sheetSkin.hideFlags = HideFlags.HideAndDontSave;
            sheetSerif = MenuFont;
            sheetSkin.font = MenuFont;
            sheetSkin.label.fontSize = 17; sheetSkin.label.wordWrap = true; sheetSkin.label.normal.textColor = new Color(.82f, .81f, .77f);
            sheetSkin.button = new GUIStyle(brandPlain) { fontSize = 17, fixedHeight = 0, stretchWidth = true, padding = new RectOffset(10, 10, 7, 7) };
            sheetSkin.button.margin = new RectOffset(2,2,3,3);
            sheetSkin.button.onNormal = brandBlue.normal;
            sheetSkin.button.onHover = brandBlue.hover;sheetSkin.button.onActive = brandBlue.active;sheetSkin.button.onFocused = brandBlue.normal;
            var input = Rounded(new Color(.16f, .16f, .15f, .98f), new Color(.32f, .31f, .29f));
            foreach (var style in new[] { sheetSkin.textField, sheetSkin.textArea })
            {
                style.fontSize = 17; style.wordWrap = true; style.padding = new RectOffset(10, 10, 8, 8); style.border = new RectOffset(16,16,16,16);
                style.normal.background = input; style.focused.background = input; style.hover.background = input; style.normal.textColor = new Color(.88f,.86f,.82f); style.focused.textColor = Color.white;
            }
            sheetSkin.textField.wordWrap=false;
            sheetSkin.box = new GUIStyle(brandCard) { padding = new RectOffset(14,14,12,12), margin = new RectOffset(0,0,8,12) };
            sheetSkin.toggle.fontSize = 17; sheetSkin.toggle.wordWrap = true; sheetSkin.toggle.normal.textColor = sheetSkin.label.normal.textColor;
            sheetHeading = new GUIStyle(sheetSkin.label) { fontSize = 21, fontStyle = FontStyle.Bold, margin = new RectOffset(0,0,3,8) }; sheetHeading.normal.textColor = BrandAccent;
            sheetCharacterName = new GUIStyle(sheetHeading) { fontSize = 20 };
            sheetQuiet = new GUIStyle(sheetSkin.label) { fontSize = 15, wordWrap = true }; sheetQuiet.normal.textColor = new Color(.75f,.74f,.70f);
            sheetTabStyle = new GUIStyle(sheetSkin.button) { wordWrap = false, fontSize = 13, fontStyle = FontStyle.Bold, padding = new RectOffset(4,4,8,8),margin=new RectOffset(0,0,0,0) };
            foreach(var state in new[]{sheetTabStyle.normal,sheetTabStyle.hover,sheetTabStyle.active,sheetTabStyle.focused}){state.background=null;state.textColor=new Color(.72f,.71f,.69f);}
            sheetActiveTab = new GUIStyle(sheetTabStyle);
            foreach(var state in new[]{sheetActiveTab.normal,sheetActiveTab.hover,sheetActiveTab.active,sheetActiveTab.focused})state.textColor=BrandAccent;
            sheetMetricBox=new GUIStyle(sheetSkin.box){padding=new RectOffset(8,8,8,8),margin=new RectOffset(0,4,0,4)};
            sheetMetricInput=new GUIStyle(sheetSkin.textField){fontSize=15,padding=new RectOffset(6,6,8,8),wordWrap=false};
            GUI.skin = sheetSkin;
        }
        private bool MeasuredMenuButton(string label, GUIStyle style, params GUILayoutOption[] options)
        {
            bool clicked = GUILayout.Button(label, style, options);
            DesktopUiSmoke.RecordButton(label, style, GUILayoutUtility.GetLastRect());
            return clicked;
        }
        private int MenuGrid(int selectedIndex,string[] labels,int columns)
        {
            columns=Mathf.Clamp(columns,1,Mathf.Max(1,labels.Length));
            float cellWidth=Mathf.Max(40,(UiWidth-100)/columns-8);
            float rowHeight=Mathf.Max(44,labels.Select(label=>GUI.skin.button.CalcHeight(new GUIContent(label),cellWidth)+GUI.skin.button.margin.vertical).DefaultIfEmpty(44).Max());
            return GUILayout.SelectionGrid(selectedIndex,labels,columns,GUILayout.MinHeight(((labels.Length+columns-1)/columns)*rowHeight));
        }
        private void SheetSection(string title) { GUILayout.Space(3); GUILayout.Label(title, sheetHeading); Rect rule=GUILayoutUtility.GetRect(1,1,GUILayout.ExpandWidth(true));GUI.DrawTexture(rule,Texture2D.whiteTexture,ScaleMode.StretchToFill,false,0,new Color(.30f,.29f,.27f),0,0);GUILayout.Space(7); }
    }
}
