using System.Linq;
using UnityEngine;

namespace DndVtt.UnityPrototype
{
    public sealed partial class LegacySessionPanel
    {
        private void PrepareGrimoireAbilityStyles()
        {
            PrepareGrimoireHeroStyles();
            if (uiStyles.AbilityCard != null) return;

            var panel = Resources.Load<Texture2D>("UI/Grimoire/panels/panel_primary_9s");
            var inset = Resources.Load<Texture2D>("UI/Grimoire/panels/panel_secondary_9s");
            var gold = ThemeHeadingAccent;
            var text = new Color(.98f, .94f, .85f);

            uiStyles.AbilityPanel = new GUIStyle(uiStyles.HeroPanel)
            {
                padding = new RectOffset(10, 10, 9, 10),
                margin = new RectOffset(1, 1, 3, 9)
            };
            if (panel)
            {
                uiStyles.AbilityPanel.normal.background = panel;
                uiStyles.AbilityPanel.border = new RectOffset(16, 16, 16, 16);
            }

            uiStyles.AbilityCard = new GUIStyle(uiStyles.AbilityPanel)
            {
                padding = new RectOffset(9, 9, 8, 8),
                margin = new RectOffset(1, 1, 3, 5)
            };
            if (inset)
            {
                uiStyles.AbilityCard.normal.background = inset;
                uiStyles.AbilityCard.border = new RectOffset(16, 16, 16, 16);
            }

            uiStyles.AbilityName = new GUIStyle(uiStyles.HeroSection)
            {
                fontSize = 16, fontStyle = FontStyle.Bold,
                wordWrap = true, margin = new RectOffset(0, 0, 0, 0),
                normal = { textColor = text }
            };
            uiStyles.AbilitySub = new GUIStyle(uiStyles.HeroSubtitle)
            {
                fontSize = 12, wordWrap = true,
                margin = new RectOffset(0, 0, 2, 2),
                normal = { textColor = new Color(.78f, .77f, .74f) }
            };
            uiStyles.AbilityTitle = new GUIStyle(uiStyles.HeroSection)
            {
                fontSize = 19, alignment = TextAnchor.MiddleCenter,
                fontStyle = FontStyle.Bold, wordWrap = false,
                margin = new RectOffset(0, 0, 2, 5),
                normal = { textColor = gold }
            };
            uiStyles.AbilityCounter = new GUIStyle(uiStyles.HeroSmall)
            {
                fontSize = 14, alignment = TextAnchor.MiddleCenter,
                fontStyle = FontStyle.Bold, wordWrap = false,
                normal = { textColor = gold }
            };
            uiStyles.AbilityCircleTitle = new GUIStyle(uiStyles.AbilityCounter)
            {
                fontSize = 17,
                normal = { textColor = gold }
            };
            uiStyles.AbilityGlyph = new GUIStyle(uiStyles.AbilityTitle)
            {
                fontSize = 33,
                alignment = TextAnchor.MiddleCenter,
                normal = { textColor = gold }
            };
            uiStyles.AbilityGold = Button(sheetSkin.button,
                Color.Lerp(gold, new Color(.18f, .11f, .02f), .43f),
                new Color(1f, .95f, .81f));
            uiStyles.AbilityGold.font = sheetSerif;
            uiStyles.AbilityGold.fontSize = 13;
            uiStyles.AbilityGold.wordWrap = false;
            uiStyles.AbilityGold.padding = new RectOffset(4, 4, 5, 5);
            uiStyles.AbilityGold.margin = new RectOffset(1, 1, 1, 1);

            uiStyles.AbilityTab = new GUIStyle(uiStyles.AbilityGold);
            var navIdle = Resources.Load<Texture2D>("UI/Grimoire/navigation/nav_tab_idle_9s");
            if (navIdle)
            {
                uiStyles.AbilityTab.normal.background = navIdle;
                uiStyles.AbilityTab.hover.background = navIdle;
                uiStyles.AbilityTab.active.background = navIdle;
                uiStyles.AbilityTab.focused.background = navIdle;
            }
            uiStyles.AbilityTab.normal.textColor = text;
            uiStyles.AbilityTab.hover.textColor = text;
            uiStyles.AbilityTab.active.textColor = text;
            uiStyles.AbilityTab.focused.textColor = text;

            uiStyles.AbilityChip = new GUIStyle(uiStyles.AbilityTab)
            {
                fontSize = 11, padding = new RectOffset(3, 3, 4, 4),
                margin = new RectOffset(1, 1, 1, 1)
            };
            var ghost = Resources.Load<Texture2D>("UI/Grimoire/buttons/button_ghost_normal_9s");
            if (ghost)
            {
                uiStyles.AbilityChip.normal.background = ghost;
                uiStyles.AbilityChip.hover.background = ghost;
                uiStyles.AbilityChip.active.background = ghost;
                uiStyles.AbilityChip.focused.background = ghost;
            }
            uiStyles.AbilitySelectedChip = new GUIStyle(uiStyles.AbilityChip);
            uiStyles.AbilitySelectedChip.normal.background = Rounded(
                new Color(.37f, .22f, .06f, .98f), gold, 7);
            uiStyles.AbilitySelectedChip.hover.background = uiStyles.AbilitySelectedChip.normal.background;
            uiStyles.AbilitySelectedChip.active.background = uiStyles.AbilitySelectedChip.normal.background;
            uiStyles.AbilitySelectedChip.focused.background = uiStyles.AbilitySelectedChip.normal.background;

            uiStyles.AbilityStar = new GUIStyle(uiStyles.AbilityChip)
            {
                fontSize = 26, alignment = TextAnchor.MiddleCenter,
                padding = new RectOffset(0, 0, 0, 0),
                normal = { textColor = gold }
            };
            uiStyles.AbilitySearchPanel = new GUIStyle(uiStyles.AbilityPanel)
            {
                padding = new RectOffset(6, 6, 2, 2),
                margin = new RectOffset(1, 1, 4, 6)
            };
            uiStyles.AbilityInput = new GUIStyle(sheetSkin.textField)
            {
                fontSize = 13, padding = new RectOffset(8, 8, 7, 7),
                margin = new RectOffset(0, 0, 0, 0)
            };
            uiStyles.AbilityStar.hover.textColor = gold;
            uiStyles.AbilityStar.active.textColor = gold;
            uiStyles.AbilityStar.focused.textColor = gold;
            uiStyles.AbilitySearchGlyph = new GUIStyle(uiStyles.AbilityGlyph)
            {
                fontSize = 26, normal = { textColor = gold }
            };
            uiStyles.AbilityOrnament = GrimoireNineSlice(
                Resources.Load<Texture2D>("UI/Grimoire/frames/frame_ornate_mask_9s"), 16, 16);
            uiStyles.AbilityResourceTrack = Resources.Load<Texture2D>("UI/Grimoire/bars/bar_resource_track_9s");
            uiStyles.AbilityDockIcons = new[] { "hero", "inventory", "abilities", "lore", "settings" }
                .Select(key => Resources.Load<Texture2D>("UI/Grimoire/icons/icon_" + key + "_96")).ToArray();
        }

        private void DrawGrimoireAbilityRule()
        {
            Rect rule = GUILayoutUtility.GetRect(1, 2, GUILayout.ExpandWidth(true));
            if (Event.current.type != EventType.Repaint) return;
            GUI.DrawTexture(rule, Texture2D.whiteTexture, ScaleMode.StretchToFill, false, 0,
                new Color(ThemeHeadingAccent.r, ThemeHeadingAccent.g, ThemeHeadingAccent.b, .63f), 0, 0);
        }

        private void DrawGrimoireQuestionIcon(int size)
        {
            Rect frame = GUILayoutUtility.GetRect(size, size, GUILayout.Width(size), GUILayout.Height(size));
            if (Event.current.type != EventType.Repaint) return;
            GUI.DrawTexture(frame, Texture2D.whiteTexture, ScaleMode.StretchToFill, true, 0,
                new Color(.45f, .29f, .075f, .9f), 0, 8);
            GUI.DrawTexture(new Rect(frame.x + 2, frame.y + 2, frame.width - 4, frame.height - 4),
                Texture2D.whiteTexture, ScaleMode.StretchToFill, true, 0,
                new Color(.06f, .065f, .09f, .98f), 0, 7);
            GUI.Label(frame, "?", uiStyles.AbilityGlyph);
        }

        private void DrawGrimoireAbilityFrame(Rect rect)
        {
            if (Event.current.type != EventType.Repaint || uiStyles.AbilityOrnament == null) return;
            var prev = GUI.color;
            GUI.color = new Color(ThemeHeadingAccent.r, ThemeHeadingAccent.g, ThemeHeadingAccent.b, .85f);
            uiStyles.AbilityOrnament.Draw(rect, false, false, false, false);
            GUI.color = prev;
        }

        private void DrawGrimoireAbilityOrb(Rect rect, bool filled, int level)
        {
            Color tint = level == 1 ? new Color(.22f, .69f, 1f) :
                level == 2 ? new Color(.43f, .81f, 1f) :
                level == 3 ? new Color(.79f, .36f, .98f) : ThemeHeadingAccent;
            GUI.DrawTexture(new Rect(rect.x - 1, rect.y - 1, rect.width + 2, rect.height + 2),
                Texture2D.whiteTexture, ScaleMode.StretchToFill, true, 0,
                new Color(tint.r, tint.g, tint.b, filled ? .47f : .23f), 0, 9);
            GUI.DrawTexture(rect, Texture2D.whiteTexture, ScaleMode.StretchToFill, true, 0,
                new Color(.07f, .08f, .12f), 0, 8);
            Rect inner = new Rect(rect.x + 3, rect.y + 3, rect.width - 6, rect.height - 6);
            GUI.DrawTexture(inner, Texture2D.whiteTexture, ScaleMode.StretchToFill, true, 0,
                filled ? tint : new Color(.08f, .085f, .12f), 0, 7);
            if (filled)
            {
                GUI.DrawTexture(new Rect(rect.x + 4, rect.y + 3, 5, 4),
                    Texture2D.whiteTexture, ScaleMode.StretchToFill, true, 0,
                    new Color(1, 1, 1, .58f), 0, 3);
            }
        }

        private void DrawGrimoireAbilityBar(Rect rect, float fraction)
        {
            if (uiStyles.AbilityResourceTrack)
                GUI.DrawTexture(rect, uiStyles.AbilityResourceTrack, ScaleMode.StretchToFill);
            else
                GUI.DrawTexture(rect, Texture2D.whiteTexture, ScaleMode.StretchToFill, true, 0,
                    new Color(.14f, .13f, .14f), 0, 5);
            if (fraction <= 0f) return;
            Rect inner = new Rect(rect.x + 2, rect.y + 2,
                Mathf.Max(0, rect.width - 4) * fraction, Mathf.Max(1, rect.height - 4));
            GUI.DrawTexture(inner, Texture2D.whiteTexture, ScaleMode.StretchToFill, true, 0,
                ThemeHeadingAccent, 0, 3);
        }

        private void DrawGrimoireAbilityPhoneHeader()
        {
            PrepareGrimoireAbilityStyles();
            if (Event.current.type == EventType.Repaint)
                DrawGrimoireAbilityFrame(new Rect(12, 4, UiWidth - 24, 49));
            Rect back = new Rect(13, 9, 58, 36);
            if (GUI.Button(back, "‹", sheetTabStyle)) ReturnToHero();
            DesktopUiSmoke.RecordButton("‹ К герою", sheetTabStyle, back);
            GUI.Label(new Rect(74, 11, UiWidth - 86, 36),
                "СПОСОБНОСТИ И МАГИЯ", uiStyles.AbilityTitle);
        }

        private void DrawGrimoireAbilityPhoneDock()
        {
            PrepareGrimoireNavigation();
            PrepareGrimoireAbilityStyles();
            Rect dock = new Rect(10, UiHeight - 76, UiWidth - 20, 66);
            if (Event.current.type == EventType.Repaint)
                grimoireDockPanel.Draw(dock, false, false, false, false);
            string[] labels = { "Герой", "Инвентарь", "Умения", "Знания", "Настройки" };
            int[] targets = { 0, 3, 2, 9, -1 };
            float cell = (dock.width - 12) / 5;
            for (int i = 0; i < 5; i++)
            {
                bool active = i == 2;
                Rect button = new Rect(dock.x + 6 + i * cell, dock.y + 4, cell - 3, dock.height - 8);
                if (GUI.Button(button, GUIContent.none, active ? uiStyles.AbilityGold : grimoireDockIdle))
                {
                    if (i == 4) OpenSettings();
                    else requestedSheetTab = targets[i];
                    CompleteNumericKeyboard();
                }
                if (Event.current.type != EventType.Repaint) continue;
                Color tint = active ? ThemeHeadingAccent : new Color(.80f, .75f, .67f);
                if (uiStyles.AbilityDockIcons[i])
                    GUI.DrawTexture(new Rect(button.center.x - 12, button.y + 6, 24, 24),
                        uiStyles.AbilityDockIcons[i], ScaleMode.ScaleToFit, true, 0, tint, 0, 0);
                Color previous = GUI.contentColor;
                GUI.contentColor = tint;
                GUI.Label(button, labels[i], grimoireDockLabel);
                GUI.contentColor = previous;
            }
        }
    }
}
