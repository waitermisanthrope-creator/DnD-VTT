using System;
using System.IO;
using System.Linq;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.InputSystem;

namespace DndVtt.UnityPrototype
{
    public sealed partial class LegacySessionPanel
    {
        CharacterStudioView characterStudio;
        AppearanceDocument characterDraft;
        Vector2 characterControlsScroll;
        Rect characterViewportPixels;
        bool characterDragging, characterPinching, characterDirty;
        string characterSlider;
        readonly Dictionary<string, Rect> characterSliders = new Dictionary<string, Rect>();
        string characterNotice = "База человека из прежнего редактора. Волосы, лицо и другие расы ещё переносятся.";
        static readonly string[] CharacterAxes = { "height", "width", "muscle", "fat", "shoulders", "chest", "waist", "hips", "arms", "legs", "head", "breastSize", "pectorals", "armLength", "legLength" };
        static readonly string[] CharacterLabels = { "Рост", "Ширина тела", "Мышцы", "Жир", "Плечи", "Грудная клетка", "Талия", "Бёдра", "Объём рук", "Объём ног", "Размер головы", "Объём груди", "Грудные мышцы", "Длина рук", "Длина ног" };
        string CharacterDraftPath => Path.Combine(Application.persistentDataPath, "character-studio-draft.json");

        private void OpenCharacterStudio()
        {
            CloseCharacterStudio();
            CloseDiceTable();
            Navigate(FrontScreen.CharacterStudio);
            try
            {
                characterDraft ??= AppearanceDocument.Create(false);
                characterStudio = new CharacterStudioView(); characterStudio.Apply(characterDraft); characterStudio.Render();
            }
            catch (Exception error) { CloseCharacterStudio(); characterNotice = "Предпросмотр не открылся: " + error.Message; }
        }
        private void CloseCharacterStudio()
        {
            characterStudio?.Dispose(); characterStudio = null;
            characterDragging = characterPinching = characterDirty = false;
            characterSlider = null; characterSliders.Clear();
            characterViewportPixels = default;
        }
        bool CharacterOwnsPointer(Vector2 point) => screen == FrontScreen.CharacterStudio && (characterSlider != null || characterDragging || characterPinching || characterViewportPixels.Contains(point) || characterSliders.Values.Any(r => r.Contains(point)));
        void BeginCharacterPointer(Vector2 point)
        {
            characterSlider = characterSliders.FirstOrDefault(pair => pair.Value.Contains(point)).Key;
            characterDragging = characterSlider == null && characterViewportPixels.Contains(point);
        }
        void MoveCharacterSlider(Vector2 point)
        {
            if (characterSlider == null || !characterSliders.TryGetValue(characterSlider, out var rect)) return;
            characterDraft.Set(characterSlider, Mathf.Clamp01((point.x - rect.x) / Mathf.Max(1, rect.width)) * 2 - 1);
            characterDirty = true;
        }
        private bool UpdateCharacterStudio()
        {
            if (screen != FrontScreen.CharacterStudio || characterStudio == null) return false;
            bool owns = false;
            var device = Touchscreen.current;
            var touches = device?.touches.Where(t => t.press.isPressed).ToArray();
            if (touches != null && touches.Length > 0)
            {
                var touch = touches[0]; var position = touch.position.ReadValue(); var delta = touch.delta.ReadValue();
                if (touch.press.wasPressedThisFrame) BeginCharacterPointer(position);
                if (characterSlider != null) MoveCharacterSlider(position);
                else if (touches.Length > 1)
                {
                    var second = touches[1]; var p2 = second.position.ReadValue();
                    characterPinching = characterViewportPixels.Contains(position) && characterViewportPixels.Contains(p2);
                    if (characterPinching)
                    {
                        float oldLength = ((position - delta) - (p2 - second.delta.ReadValue())).magnitude;
                        characterStudio.Zoom(oldLength / Mathf.Max(1, (position - p2).magnitude));
                    }
                }
                else { characterPinching = false; if (characterDragging) characterStudio.Orbit(new Vector2(delta.x, -delta.y) / MenuScale); }
                owns = characterSlider != null || characterDragging || characterPinching;
            }
            else
            {
                characterPinching = false;
                var mouse = Mouse.current;
                if (mouse != null)
                {
                    var point = mouse.position.ReadValue();
                    if (mouse.leftButton.wasPressedThisFrame) BeginCharacterPointer(point);
                    if (!mouse.leftButton.isPressed) { characterDragging = false; characterSlider = null; }
                    if (characterSlider != null) MoveCharacterSlider(point);
                    if (characterDragging) { var delta = mouse.delta.ReadValue(); characterStudio.Orbit(new Vector2(delta.x, -delta.y) / MenuScale); }
                    if (characterViewportPixels.Contains(point)) characterStudio.Zoom(Mathf.Exp(-mouse.scroll.ReadValue().y * .001f));
                    owns = characterDragging || characterSlider != null;
                }
                else { characterDragging = false; characterSlider = null; }
            }
            try { if (characterDirty) { characterStudio.Apply(characterDraft); characterDirty = false; } characterStudio.Render(); }
            catch (Exception error) { CloseCharacterStudio(); characterNotice = "Ошибка предпросмотра: " + error.Message; }
            return owns;
        }
        private void DrawCharacterStudio()
        {
            DrawBrandBackdrop(true);
            GUILayout.BeginArea(new Rect(12, 12, UiWidth - 24, 60));
            GUILayout.BeginHorizontal();
            if (GUILayout.Button("← Главная", brandBlue, GUILayout.Height(48))) Navigate(FrontScreen.Home);
            GUILayout.Label("3D Персонаж", brandName); GUILayout.EndHorizontal(); GUILayout.EndArea();
            bool portrait = UiHeight > UiWidth;
            float viewHeight = portrait ? Mathf.Max(180, UiHeight * .46f) : UiHeight - 92;
            float viewWidth = portrait ? UiWidth - 24 : Mathf.Max(180, UiWidth * .60f);
            var view = new Rect(12, 80, viewWidth, viewHeight);
            if (characterStudio != null)
            {
                GUI.DrawTexture(view, characterStudio.Image, ScaleMode.ScaleToFit, false);
                if (Event.current.type == EventType.Repaint)
                {
                    Vector2 p = GUIUtility.GUIToScreenPoint(view.position);
                    characterViewportPixels = new Rect(p.x, Screen.height - p.y - view.height * MenuScale, view.width * MenuScale, view.height * MenuScale);
                }
            }
            var controls = portrait ? new Rect(12, view.yMax + 8, UiWidth - 24, Mathf.Max(80, UiHeight - view.yMax - 20))
                : new Rect(view.xMax + 12, 80, UiWidth - view.xMax - 24, UiHeight - 92);
            Vector2 controlsPoint = GUIUtility.GUIToScreenPoint(controls.position);
            var controlsPixels = new Rect(controlsPoint.x, Screen.height - controlsPoint.y - controls.height * MenuScale, controls.width * MenuScale, controls.height * MenuScale);
            if (Event.current.type == EventType.Repaint) characterSliders.Clear();
            GUILayout.BeginArea(controls, brandCard);
            characterControlsScroll = GUILayout.BeginScrollView(SwipePosition("character-controls", characterControlsScroll));
            GUILayout.Label(characterNotice, brandSub);
            if (characterStudio != null)
            {
                GUILayout.BeginHorizontal();
                if (GUILayout.Button("Мужчина", brandBlue, GUILayout.Height(46))) { characterDraft.SetGender(false); characterDirty = true; }
                if (GUILayout.Button("Женщина", brandPurple, GUILayout.Height(46))) { characterDraft.SetGender(true); characterDirty = true; }
                GUILayout.EndHorizontal();
                GUILayout.BeginHorizontal();
                if (GUILayout.Button("Тело", GUILayout.Height(42))) characterStudio.Frame(false);
                if (GUILayout.Button("Лицо", GUILayout.Height(42))) characterStudio.Frame(true);
                if (GUILayout.Button("−", GUILayout.Height(42))) characterStudio.Zoom(1.15f);
                if (GUILayout.Button("+", GUILayout.Height(42))) characterStudio.Zoom(1 / 1.15f);
                GUILayout.EndHorizontal();
                GUILayout.BeginHorizontal();
                if (GUILayout.Button("Спереди", GUILayout.Height(42))) characterStudio.Angle(0);
                if (GUILayout.Button("Сбоку", GUILayout.Height(42))) characterStudio.Angle(90);
                if (GUILayout.Button("Сзади", GUILayout.Height(42))) characterStudio.Angle(180);
                GUILayout.EndHorizontal();
                bool grey = GUILayout.Toggle(characterStudio.Body.Grey, "Серый материал — проверить форму");
                if (grey != characterStudio.Body.Grey) characterStudio.Grey(grey);
                for (int i = 0; i < CharacterAxes.Length; i++)
                {
                    if (CharacterAxes[i] == "breastSize" && !characterDraft.Female) continue;
                    float old = characterDraft.Get(CharacterAxes[i]);
                    GUILayout.Label(CharacterLabels[i] + "  " + old.ToString("0.00"));
                    float value = GUILayout.HorizontalSlider(old, -1, 1, GUILayout.Height(28));
                    if (Event.current.type == EventType.Repaint)
                    {
                        var r = GUILayoutUtility.GetLastRect(); var p = GUIUtility.GUIToScreenPoint(r.position);
                        var pixels = new Rect(p.x, Screen.height - p.y - r.height * MenuScale, r.width * MenuScale, r.height * MenuScale);
                        float left = Mathf.Max(pixels.xMin, controlsPixels.xMin), right = Mathf.Min(pixels.xMax, controlsPixels.xMax);
                        float low = Mathf.Max(pixels.yMin, controlsPixels.yMin), high = Mathf.Min(pixels.yMax, controlsPixels.yMax);
                        if (right > left && high > low) characterSliders[CharacterAxes[i]] = Rect.MinMaxRect(left, low, right, high);
                    }
                    if (Mathf.Abs(value - old) > .0001f) { characterDraft.Set(CharacterAxes[i], value); characterDirty = true; }
                }
                if (GUILayout.Button("Сбросить тело", GUILayout.Height(46))) { foreach (string axis in CharacterAxes) characterDraft.Set(axis, 0); characterDirty = true; }
                if (GUILayout.Button("Сохранить черновик", brandGreen, GUILayout.Height(46)))
                    CharacterAction(() => { File.WriteAllText(CharacterDraftPath, characterDraft.Serialize()); characterNotice = "Черновик сохранён отдельно от листов персонажей."; });
                if (GUILayout.Button("Загрузить черновик", brandBlue, GUILayout.Height(46))) CharacterAction(() =>
                {
                    var candidate = new AppearanceDocument(File.ReadAllText(CharacterDraftPath));
                    characterStudio.Apply(candidate); characterDraft = candidate; characterNotice = "Черновик загружен.";
                });
                GUILayout.Label("Вращение — пальцем или мышью. Масштаб — двумя пальцами или кнопками + / −.", brandSub);
            }
            GUILayout.EndScrollView(); RegisterSwipe("character-controls", GUILayoutUtility.GetLastRect()); GUILayout.EndArea();
        }
        void CharacterAction(Action action) { try { action(); } catch (Exception error) { characterNotice = "Ошибка: " + error.Message; } }
    }
}
