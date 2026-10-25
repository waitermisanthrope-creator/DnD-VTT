using System;
using System.Linq;
using UnityEngine;

namespace DndVtt.UnityPrototype
{
    public sealed partial class LegacySessionPanel
    {
        private GUISkin sheetSkin;
        private Font sheetSerif;
        private GUIStyle sheetHeading, sheetQuiet, sheetTabStyle, sheetActiveTab, sheetCharacterName;
        private Vector2 sheetTabsScroll;
        private void PrepareSheetSkin()
        {
            PrepareBrand();
            if (sheetSkin) { GUI.skin = sheetSkin; return; }
            sheetSkin = Instantiate(GUI.skin); sheetSkin.hideFlags = HideFlags.HideAndDontSave;
            sheetSerif = MenuFont;
            sheetSkin.font = MenuFont;
            sheetSkin.label.fontSize = 20; sheetSkin.label.wordWrap = true; sheetSkin.label.normal.textColor = new Color(.82f, .81f, .77f);
            sheetSkin.button = new GUIStyle(brandPlain) { fontSize = 20, fixedHeight = 0, stretchWidth = true, padding = new RectOffset(12, 12, 10, 10) };
            sheetSkin.button.margin = new RectOffset(2,2,5,5);
            sheetSkin.button.onNormal = brandBlue.normal;
            sheetSkin.button.onHover = brandBlue.hover;sheetSkin.button.onActive = brandBlue.active;sheetSkin.button.onFocused = brandBlue.normal;
            var input = Rounded(new Color(.16f, .16f, .15f, .98f), new Color(.32f, .31f, .29f));
            foreach (var style in new[] { sheetSkin.textField, sheetSkin.textArea })
            {
                style.fontSize = 20; style.wordWrap = true; style.padding = new RectOffset(14, 14, 12, 12); style.border = new RectOffset(16,16,16,16);
                style.normal.background = input; style.focused.background = input; style.hover.background = input; style.normal.textColor = new Color(.88f,.86f,.82f); style.focused.textColor = Color.white;
            }
            sheetSkin.box = new GUIStyle(brandCard) { padding = new RectOffset(18,18,18,18), margin = new RectOffset(0,0,10,16) };
            sheetSkin.toggle.fontSize = 19; sheetSkin.toggle.wordWrap = true; sheetSkin.toggle.normal.textColor = sheetSkin.label.normal.textColor;
            sheetHeading = new GUIStyle(sheetSkin.label) { fontSize = 29, fontStyle = FontStyle.Bold, margin = new RectOffset(0,0,3,17) }; sheetHeading.normal.textColor = new Color(.92f,.85f,.69f);
            sheetCharacterName = new GUIStyle(sheetHeading) { fontSize = 22 };
            sheetQuiet = new GUIStyle(sheetSkin.label) { fontSize = 17, wordWrap = true }; sheetQuiet.normal.textColor = new Color(.75f,.74f,.70f);
            sheetTabStyle = new GUIStyle(sheetSkin.button) { wordWrap = false, fontSize = 20, fontStyle = FontStyle.Bold, padding = new RectOffset(16,16,14,14) };
            sheetActiveTab = new GUIStyle(sheetTabStyle); sheetActiveTab.normal.textColor = Color.white; sheetActiveTab.normal.background = Rounded(Color.Lerp(new Color(.10f,.10f,.12f), BrandAccent, .28f), Color.Lerp(BrandAccent, Color.white, .25f));
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
            float rowHeight=Mathf.Max(56,labels.Select(label=>GUI.skin.button.CalcHeight(new GUIContent(label),cellWidth)+GUI.skin.button.margin.vertical).DefaultIfEmpty(56).Max());
            return GUILayout.SelectionGrid(selectedIndex,labels,columns,GUILayout.MinHeight(((labels.Length+columns-1)/columns)*rowHeight));
        }
        private int HorizontalTabs(int selectedTab, string[] labels, ref Vector2 scrollPosition)
        {
            scrollPosition = GUILayout.BeginScrollView(SwipePosition("sheet-tabs",scrollPosition), true, false, GUILayout.Height(86)); GUILayout.BeginHorizontal();
            for (int i = 0; i < labels.Length; i++) if (GUILayout.Button(i == selectedTab ? "• " + labels[i] : labels[i], i == selectedTab ? sheetActiveTab : sheetTabStyle, GUILayout.Width(Mathf.Max(106,sheetTabStyle.CalcSize(new GUIContent("• " + labels[i])).x+12)), GUILayout.Height(54))) { selectedTab = i; GUI.FocusControl(null); }
            GUILayout.EndHorizontal(); GUILayout.EndScrollView(); RegisterSwipe("sheet-tabs",GUILayoutUtility.GetLastRect(),true); return selectedTab;
        }
        private void SheetSection(string title) { GUILayout.Space(8); GUILayout.Label(title, sheetHeading); }
    }
}
