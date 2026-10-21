using System;
using UnityEngine;

namespace DndVtt.UnityPrototype
{
    public sealed partial class LegacySessionPanel
    {
        private GUISkin sheetSkin;
        private Font sheetSerif;
        private GUIStyle sheetHeading, sheetQuiet, sheetTabStyle, sheetActiveTab;
        private Vector2 sheetTabsScroll;
        private void PrepareSheetSkin()
        {
            PrepareBrand();
            if (sheetSkin) { GUI.skin = sheetSkin; return; }
            sheetSkin = Instantiate(GUI.skin); sheetSkin.hideFlags = HideFlags.HideAndDontSave;
            if (!sheetSerif)
            {
                try { sheetSerif = Font.CreateDynamicFontFromOSFont(new[] { "Noto Serif", "Droid Serif", "Liberation Serif", "Times New Roman", "serif" }, 20); }
                catch (Exception) { sheetSerif = null; }
            }
            if (sheetSerif) sheetSkin.font = sheetSerif;
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
            sheetHeading = new GUIStyle(sheetSkin.label) { fontSize = 29, fontStyle = FontStyle.Bold, margin = new RectOffset(0,0,3,17) }; sheetHeading.normal.textColor = new Color(.88f,.18f,.19f);
            sheetQuiet = new GUIStyle(sheetSkin.label) { fontSize = 17, wordWrap = true }; sheetQuiet.normal.textColor = new Color(.59f,.58f,.55f);
            sheetTabStyle = new GUIStyle(sheetSkin.button) { wordWrap = false, fontSize = 20, fontStyle = FontStyle.Bold, padding = new RectOffset(16,16,14,14) };
            sheetActiveTab = new GUIStyle(sheetTabStyle); sheetActiveTab.normal.textColor = new Color(.98f,.23f,.23f); sheetActiveTab.normal.background = Rounded(new Color(.18f,.13f,.13f),new Color(.74f,.14f,.14f));
            GUI.skin = sheetSkin;
        }
        private int HorizontalTabs(int selectedTab, string[] labels, ref Vector2 scrollPosition)
        {
            scrollPosition = GUILayout.BeginScrollView(SwipePosition("sheet-tabs",scrollPosition), true, false, GUILayout.Height(86)); GUILayout.BeginHorizontal();
            for (int i = 0; i < labels.Length; i++) if (GUILayout.Button(labels[i], i == selectedTab ? sheetActiveTab : sheetTabStyle, GUILayout.Width(Mathf.Max(106,sheetTabStyle.CalcSize(new GUIContent(labels[i])).x+12)), GUILayout.Height(54))) { selectedTab = i; GUI.FocusControl(null); }
            GUILayout.EndHorizontal(); GUILayout.EndScrollView(); RegisterSwipe("sheet-tabs",GUILayoutUtility.GetLastRect(),true); return selectedTab;
        }
        private void SheetSection(string title) { GUILayout.Space(8); GUILayout.Label(title, sheetHeading); }
    }
}
