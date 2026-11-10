using System;
namespace DndVtt.UnityPrototype
{
    // A focus/keyboard transition initializes once; repaints never move the caret.
    public sealed class TextCaretSession
    {
        private string owner;
        private object keyboard;
        public int Cursor { get; private set; }
        public int Anchor { get; private set; }
        public int Start => Math.Min(Cursor, Anchor);
        public int Length => Math.Abs(Cursor - Anchor);
        public bool Activate(string nextOwner, object nextKeyboard, string text)
        {
            if (owner == nextOwner && ReferenceEquals(keyboard, nextKeyboard)) return false;
            owner = nextOwner; keyboard = nextKeyboard;
            Select(text, (text ?? "").Length, (text ?? "").Length); return true;
        }
        public void Select(string text, int cursor, int anchor)
        { text = text ?? ""; Cursor = Boundary(text, cursor); Anchor = Boundary(text, anchor); }
        private static int Boundary(string text, int value)
        {
            int index = Math.Max(0, Math.Min(text.Length, value));
            if (index > 0 && index < text.Length && char.IsHighSurrogate(text[index - 1]) && char.IsLowSurrogate(text[index])) index--;
            return index;
        }
        public void Reset() { owner = null; keyboard = null; Cursor = Anchor = 0; }
    }
}
