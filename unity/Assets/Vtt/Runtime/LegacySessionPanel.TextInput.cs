using System;
using UnityEngine;

namespace DndVtt.UnityPrototype
{
    public sealed partial class LegacySessionPanel
    {
        private readonly TextCaretSession textCaret = new TextCaretSession();
        private TouchScreenKeyboard pendingCaretKeyboard;
        private string MenuTextField(string owner, string value, params GUILayoutOption[] options) => MenuText(owner, value, -1, GUI.skin.textField, false, false, options);
        private string MenuTextField(string owner, string value, int limit, params GUILayoutOption[] options) => MenuText(owner, value, limit, GUI.skin.textField, false, false, options);
        private string MenuTextField(string owner, string value, GUIStyle style, params GUILayoutOption[] options) => MenuText(owner, value, -1, style, false, false, options);
        private string MenuTextArea(string owner, string value, params GUILayoutOption[] options) => MenuText(owner, value, -1, GUI.skin.textArea, true, false, options);
        private string MenuTextArea(string owner, string value, int limit, params GUILayoutOption[] options) => MenuText(owner, value, limit, GUI.skin.textArea, true, false, options);
        private string MenuTextArea(string owner, string value, GUIStyle style, params GUILayoutOption[] options) => MenuText(owner, value, -1, style, true, false, options);
        private string MenuPasswordField(string owner, string value, char mask, params GUILayoutOption[] options) => MenuText(owner, value, -1, GUI.skin.textField, false, true, options);

        private string MenuText(string owner, string value, int limit, GUIStyle style, bool multiline, bool secure, GUILayoutOption[] options)
        {
            value = value ?? "";
            // Dark fields need a visible caret and selection in every screen/skin.
            GUI.skin.settings.cursorColor = Color.white;
            GUI.skin.settings.selectionColor = new Color(.2f, .5f, 1f, .65f);
            GUI.skin.settings.cursorFlashSpeed = 1f;
#if UNITY_ANDROID && !UNITY_EDITOR
            // Keep the ordinary software keyboard; text and caret stay inside Unity.
            TouchScreenKeyboard.hideInput = true;
            var content = new GUIContent(secure ? new string('•', value.Length) : value);
            Rect rect = GUILayoutUtility.GetRect(content, style, options);
            if(Event.current.type==EventType.MouseDown&&rect.Contains(Event.current.mousePosition)&&GUI.enabled)CompleteNumericKeyboard();
            bool focused = GUI.GetNameOfFocusedControl() == owner;
            int focusedId = GUIUtility.keyboardControl;
            var editor = focused && focusedId != 0 ? GUIUtility.GetStateObject(typeof(TextEditor), focusedId) as TextEditor : null;
            var e = Event.current;
            if (GUI.enabled && editor?.keyboardOnScreen != null)
            {
                PrepareMobileCaret(owner, editor.keyboardOnScreen, value);
                editor.text = value; editor.position = rect; editor.style = style; editor.isMultiline = multiline;
                editor.cursorIndex = textCaret.Cursor; editor.selectIndex = textCaret.Anchor;
                if (e.type == EventType.MouseDown && rect.Contains(e.mousePosition))
                {
                    // A second tap repositions the cursor without reopening the keyboard.
                    editor.MoveCursorToPosition(e.mousePosition);
                    textCaret.Select(value, editor.cursorIndex, editor.selectIndex);
                    WriteMobileSelection(editor.keyboardOnScreen);
                    GUIUtility.hotControl = focusedId; e.Use();
                }
                else if (e.type == EventType.MouseDrag && GUIUtility.hotControl == focusedId)
                {
                    editor.SelectToPosition(e.mousePosition);
                    textCaret.Select(value, editor.cursorIndex, editor.selectIndex);
                    WriteMobileSelection(editor.keyboardOnScreen); e.Use();
                }
                else if (e.type == EventType.MouseUp && GUIUtility.hotControl == focusedId)
                { GUIUtility.hotControl = 0; e.Use(); }
            }
            GUI.SetNextControlName(owner);
            string result = secure ? GUI.PasswordField(rect, value, '•', limit, style)
                : multiline ? GUI.TextArea(rect, value, limit, style) : GUI.TextField(rect, value, limit, style);
            if (GUI.GetNameOfFocusedControl() == owner && GUIUtility.keyboardControl != 0)
            {
                int id = GUIUtility.keyboardControl;
                editor = (TextEditor)GUIUtility.GetStateObject(typeof(TextEditor), id);
                if (editor.keyboardOnScreen != null)
                {
                    PrepareMobileCaret(owner, editor.keyboardOnScreen, result);
                    editor.text = result; editor.cursorIndex = textCaret.Cursor; editor.selectIndex = textCaret.Anchor;
                    // Unity's touch handler only draws the background/text. DrawCursor
                    // adds the same scrolling caret/selection that desktop IMGUI uses.
                    if (e.type == EventType.Repaint) editor.DrawCursor(secure ? new string('•', result.Length) : result);
                }
            }
#else
            GUI.SetNextControlName(owner);
            string result = secure ? GUILayout.PasswordField(value, '•', limit, style, options)
                : multiline ? GUILayout.TextArea(value, limit, style, options) : GUILayout.TextField(value, limit, style, options);
            Rect rect = GUILayoutUtility.GetLastRect();
#endif
            DesktopUiSmoke.RecordTextField(owner);
            RegisterTextControl(owner, rect);
            return result;
        }
        private void PrepareMobileCaret(string owner, TouchScreenKeyboard keyboard, string text)
        {
            if(keyboard==null)return;
            if (textCaret.Activate(owner, keyboard, text)) pendingCaretKeyboard = keyboard;
            if (ReferenceEquals(pendingCaretKeyboard, keyboard))
            {
                if (keyboard.canSetSelection) { WriteMobileSelection(keyboard); pendingCaretKeyboard = null; }
            }
            else if (keyboard.canGetSelection)
            {
                var selection = keyboard.selection;
                if(textCaret.Start!=selection.start||textCaret.Length!=selection.length)
                    textCaret.Select(text, selection.start + selection.length, selection.start);
            }
        }
        private void WriteMobileSelection(TouchScreenKeyboard keyboard)
        { if (keyboard.canSetSelection) keyboard.selection = new RangeInt(textCaret.Start, textCaret.Length); }
        private void BlurTextField()
        {
            int id=GUIUtility.keyboardControl;
            if(id!=0)
            {
                var editor=GUIUtility.GetStateObject(typeof(TextEditor),id) as TextEditor;
                if(editor?.keyboardOnScreen!=null){editor.keyboardOnScreen.active=false;editor.keyboardOnScreen=null;}
                editor?.OnLostFocus();
            }
            GUI.FocusControl(null);GUIUtility.keyboardControl=0;GUIUtility.hotControl=0;
        }
        private void RegisterTextControl(string owner, Rect rect)
        {
            if (Event.current.type != EventType.Repaint) return;
            var top = GUIUtility.GUIToScreenPoint(rect.position);
            var bottom = GUIUtility.GUIToScreenPoint(rect.position + rect.size);
            string parent = screen == FrontScreen.Map ? "map-panel" : "front";
            float smallest = float.MaxValue;
            foreach (var pair in menuGesture.Regions)
            {
                var r = pair.Value;
                if (r.nativeControl || r.horizontal || r.width * r.height >= smallest) continue;
                if (top.x >= r.x + r.width || bottom.x <= r.x || top.y >= r.y + r.height || bottom.y <= r.y) continue;
                parent = pair.Key; smallest = r.width * r.height;
            }
            // EndSwipeFrame clips this to its viewport so offscreen text cannot
            // capture page gestures. The field owns drag selection, like a slider.
            RegisterMenuControl("text:" + owner, parent, rect);
        }
    }
}
