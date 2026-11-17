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

            // Scoped art for the approved gold-grimoire reference. Each texture is
            // Resources-owned and cached with the sheet skin (no per-frame loads).
            const string art = "UI/Grimoire/abilities/";
            var panel = Resources.Load<Texture2D>(art + "panel_ornate_9s")
                ?? Resources.Load<Texture2D>("UI/Grimoire/panels/panel_primary_9s");
            var inset = Resources.Load<Texture2D>(art + "card_ornate_9s")
                ?? Resources.Load<Texture2D>("UI/Grimoire/panels/panel_secondary_9s");
            var activeTexture = Resources.Load<Texture2D>(art + "tab_gold_9s");
            var idleTexture = Resources.Load<Texture2D>(art + "tab_idle_9s");
            // The owner-approved mockup specifies gold independently of global accent.
            var gold = new Color(.95f, .76f, .41f);
            var text = new Color(.98f, .94f, .85f);

            uiStyles.AbilityPanel = new GUIStyle(uiStyles.HeroPanel)
            {
                // The 28px corner 9-slice previously surrounded only 7px of
                // padding, causing body text to sit on the filigree.
                padding = new RectOffset(21, 21, 20, 20),
                margin = new RectOffset(1, 1, 3, 9)
            };
            if (panel)
            {
                uiStyles.AbilityPanel.normal.background = panel;
                uiStyles.AbilityPanel.border = new RectOffset(28, 28, 28, 28);
            }

            uiStyles.AbilityCard = new GUIStyle(uiStyles.AbilityPanel)
            {
                padding = new RectOffset(20, 20, 18, 21),
                margin = new RectOffset(1, 1, 3, 7)
            };
            if (inset)
            {
                uiStyles.AbilityCard.normal.background = inset;
                uiStyles.AbilityCard.border = new RectOffset(28, 28, 28, 28);
            }

            uiStyles.AbilityName = new GUIStyle(uiStyles.HeroSection)
            {
                fontSize = 16, fontStyle = FontStyle.Bold,
                font = sheetSerif, wordWrap = true, margin = new RectOffset(0, 0, 0, 0),
                normal = { textColor = text }
            };
            // Ability names are tappable detail controls while keeping label styling.
            uiStyles.AbilityName.hover.textColor = text;
            uiStyles.AbilityName.active.textColor = text;
            uiStyles.AbilityName.focused.textColor = text;
            uiStyles.AbilitySub = new GUIStyle(uiStyles.HeroSubtitle)
            {
                fontSize = 12, wordWrap = false,
                margin = new RectOffset(0, 0, 2, 0),
                normal = { textColor = new Color(.78f, .77f, .74f) }
            };
            uiStyles.AbilityTitle = new GUIStyle(uiStyles.HeroSection)
            {
                fontSize = 19, alignment = TextAnchor.MiddleCenter,
                font = sheetSerif, fontStyle = FontStyle.Bold, wordWrap = false,
                margin = new RectOffset(0, 0, 2, 5),
                normal = { textColor = gold }
            };
            uiStyles.AbilityDescription = new GUIStyle(uiStyles.AbilitySub)
            {
                fontSize = 13, font = sheetSerif, wordWrap = true,
                margin = new RectOffset(2, 2, 4, 4)
            };
            uiStyles.AbilitySpellMeta = new GUIStyle(uiStyles.AbilitySub)
            {
                font = sheetSerif, fontSize = 11, wordWrap = false,
                alignment = TextAnchor.MiddleLeft,
                margin = new RectOffset(0, 0, 0, 0)
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
            // The border and gold glow live in the 9-slice PNG rather than
            // being recreated by Rounded() for each style rebuild.
            uiStyles.AbilityGold = new GUIStyle(sheetSkin.button)
            {
                alignment = TextAnchor.MiddleCenter,
                fontStyle = FontStyle.Bold,
                border = new RectOffset(25, 25, 12, 12)
            };
            if (activeTexture)
            {
                uiStyles.AbilityGold.normal.background = activeTexture;
                uiStyles.AbilityGold.hover.background = activeTexture;
                uiStyles.AbilityGold.active.background = activeTexture;
                uiStyles.AbilityGold.focused.background = activeTexture;
                uiStyles.AbilityGold.onNormal.background = activeTexture;
                uiStyles.AbilityGold.onHover.background = activeTexture;
                uiStyles.AbilityGold.onActive.background = activeTexture;
                uiStyles.AbilityGold.onFocused.background = activeTexture;
            }
            var goldText = new Color(1f, .95f, .81f);
            uiStyles.AbilityGold.normal.textColor = goldText;
            uiStyles.AbilityGold.hover.textColor = goldText;
            uiStyles.AbilityGold.active.textColor = goldText;
            uiStyles.AbilityGold.focused.textColor = goldText;
            uiStyles.AbilityGold.font = sheetSerif;
            uiStyles.AbilityGold.fontSize = 13;
            uiStyles.AbilityGold.wordWrap = false;
            uiStyles.AbilityGold.padding = new RectOffset(18, 18, 9, 9);
            uiStyles.AbilityGold.margin = new RectOffset(1, 1, 1, 1);

            uiStyles.AbilityTab = new GUIStyle(uiStyles.AbilityGold);
            var navIdle = idleTexture
                ?? Resources.Load<Texture2D>("UI/Grimoire/navigation/nav_tab_idle_9s");
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
                fontSize = 12, border = new RectOffset(18, 18, 10, 10),
                padding = new RectOffset(3, 3, 4, 4),
                margin = new RectOffset(1, 1, 1, 1)
            };
            uiStyles.AbilitySelectedChip = new GUIStyle(uiStyles.AbilityChip);
            uiStyles.AbilitySelectedChip.normal.background = activeTexture
                ? activeTexture : uiStyles.AbilityGold.normal.background;
            uiStyles.AbilitySelectedChip.hover.background = uiStyles.AbilitySelectedChip.normal.background;
            uiStyles.AbilitySelectedChip.active.background = uiStyles.AbilitySelectedChip.normal.background;
            uiStyles.AbilitySelectedChip.focused.background = uiStyles.AbilitySelectedChip.normal.background;

            uiStyles.AbilityStar = new GUIStyle(uiStyles.AbilityChip)
            {
                fontSize = 25, alignment = TextAnchor.MiddleCenter,
                padding = new RectOffset(0, 0, 0, 0),
                normal = { textColor = gold }
            };
            // Star is drawn on the card face, not in its own large button.
            uiStyles.AbilityStar.normal.background = null;
            uiStyles.AbilityStar.hover.background = null;
            uiStyles.AbilityStar.active.background = null;
            uiStyles.AbilityStar.focused.background = null;
            uiStyles.AbilitySearchPanel = new GUIStyle(uiStyles.AbilityPanel)
            {
                padding = new RectOffset(6, 6, 2, 2),
                margin = new RectOffset(1, 1, 4, 6)
            };
            uiStyles.AbilityInput = new GUIStyle(sheetSkin.textField)
            {
                font = sheetSerif, fontSize = 13,
                border = new RectOffset(19, 19, 12, 12),
                padding = new RectOffset(19, 19, 8, 8),
                margin = new RectOffset(0, 0, 0, 0)
            };
            if (idleTexture)
            {
                uiStyles.AbilityInput.normal.background = idleTexture;
                uiStyles.AbilityInput.focused.background = idleTexture;
                uiStyles.AbilityInput.hover.background = idleTexture;
            }
            uiStyles.AbilityInput.normal.textColor = text;
            uiStyles.AbilityInput.focused.textColor = text;
            uiStyles.AbilitySearchHint = new GUIStyle(sheetSkin.label)
            {
                fontSize = 12, alignment = TextAnchor.MiddleLeft,
                padding = new RectOffset(0, 0, 0, 0),
                normal = { textColor = new Color(.61f, .60f, .58f) }
            };
            uiStyles.AbilityDockLabel = new GUIStyle(sheetQuiet)
            {
                font = sheetSerif, fontSize = 12,
                alignment = TextAnchor.LowerCenter, wordWrap = false,
                padding = new RectOffset(0, 0, 0, 5),
                normal = { textColor = Color.white }
            };
            uiStyles.AbilityBack = new GUIStyle(uiStyles.AbilityChip)
            {
                fontSize = 24, fontStyle = FontStyle.Bold,
                alignment = TextAnchor.MiddleCenter
            };
            uiStyles.AbilityStar.hover.textColor = gold;
            uiStyles.AbilityStar.active.textColor = gold;
            uiStyles.AbilityStar.focused.textColor = gold;
            uiStyles.AbilitySearchGlyph = new GUIStyle(uiStyles.AbilityGlyph)
            {
                fontSize = 26, normal = { textColor = gold }
            };
            uiStyles.AbilityOrnament = GrimoireNineSlice(
                Resources.Load<Texture2D>(art + "frame_corners_9s"), 28, 28)
                ?? GrimoireNineSlice(
                    Resources.Load<Texture2D>("UI/Grimoire/frames/frame_ornate_mask_9s"), 16, 16);
            uiStyles.AbilityPlaceholder = Resources.Load<Texture2D>(art + "placeholder_question_96");
            uiStyles.AbilityDivider = Resources.Load<Texture2D>(art + "divider_filigrane_512");
            uiStyles.AbilityOrbFilled = Resources.Load<Texture2D>(art + "orb_filled_48");
            uiStyles.AbilityOrbEmpty = Resources.Load<Texture2D>(art + "orb_empty_48");
            uiStyles.AbilityResourceTrack = Resources.Load<Texture2D>(
                "UI/Grimoire/bars/bar_resource_track_9s");
            uiStyles.AbilityDockIcons = new[] { "hero", "inventory", "abilities", "lore", "settings" }
                .Select(key => Resources.Load<Texture2D>("UI/Grimoire/icons/icon_" + key + "_96")).ToArray();
        }

        private void DrawGrimoireAbilityRule()
        {
            Rect rule = GUILayoutUtility.GetRect(1, 14, GUILayout.ExpandWidth(true));
            if (Event.current.type != EventType.Repaint) return;
            if (uiStyles.AbilityDivider)
                GUI.DrawTexture(rule, uiStyles.AbilityDivider, ScaleMode.StretchToFill, true);
            else
                GUI.DrawTexture(new Rect(rule.x, rule.center.y, rule.width, 1),
                    Texture2D.whiteTexture, ScaleMode.StretchToFill, false, 0,
                    new Color(ThemeHeadingAccent.r, ThemeHeadingAccent.g, ThemeHeadingAccent.b, .63f), 0, 0);
        }

        private void DrawGrimoireQuestionIcon(int size)
        {
            Rect frame = GUILayoutUtility.GetRect(size, size, GUILayout.Width(size), GUILayout.Height(size));
            if (Event.current.type != EventType.Repaint) return;
            if (uiStyles.AbilityPlaceholder)
            {
                GUI.DrawTexture(frame, uiStyles.AbilityPlaceholder, ScaleMode.ScaleToFit, true);
                return;
            }
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
            // Authored art is already gold; do not recolor the full texture.
            GUI.color = Color.white;
            uiStyles.AbilityOrnament.Draw(rect, false, false, false, false);
            GUI.color = prev;
        }

        private void DrawGrimoireAbilityOrb(Rect rect, bool filled, int level)
        {
            Color tint = level == 1 ? new Color(.18f, .66f, 1f) :
                level == 2 ? new Color(.43f, .79f, 1f) :
                level == 3 ? new Color(.76f, .33f, .98f) :
                new Color(.96f, .64f, .28f);
            Texture2D orb = filled ? uiStyles.AbilityOrbFilled : uiStyles.AbilityOrbEmpty;
            if (orb)
            {
                // One textured draw per slot, color by spell circle.
                GUI.DrawTexture(rect, orb, ScaleMode.ScaleToFit, true, 0,
                    filled ? tint : Color.Lerp(tint, Color.gray, .55f), 0, 0);
                return;
            }
            GUI.DrawTexture(rect, Texture2D.whiteTexture, ScaleMode.StretchToFill,
                true, 0, filled ? tint : new Color(.09f, .09f, .13f), 0, 8);
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
            // The shared sheet header has a gray overlay. This opaque graphite
            // cover only applies to sheetTab 2 and restores the reference palette.
            if (Event.current.type == EventType.Repaint)
            {
                Shade(new Rect(0, 0, UiWidth, 60), new Color(.045f, .043f, .055f, 1f));
                DrawGrimoireAbilityFrame(new Rect(10, 3, UiWidth - 20, 54));
            }
            Rect back = new Rect(13, 8, 46, 43);
            if (GUI.Button(back, "‹", uiStyles.AbilityBack))
            {
                if (showSpellCatalog) CloseSpellCatalog();
                else ReturnToHero();
            }
            DesktopUiSmoke.RecordButton(showSpellCatalog ? "‹ К магии" : "‹ К герою",
                uiStyles.AbilityBack, back);
            Rect title = new Rect(64, 12, Mathf.Max(180, UiWidth - 77), 38);
            GUI.Label(title, "СПОСОБНОСТИ И МАГИЯ", uiStyles.AbilityTitle);
        }

        private void DrawGrimoireAbilityPhoneDock()
        {
            PrepareGrimoireNavigation();
            PrepareGrimoireAbilityStyles();
            Rect dock = new Rect(10, UiHeight - 78, UiWidth - 20, 69);
            if (Event.current.type == EventType.Repaint)
                uiStyles.AbilityPanel.Draw(dock, false, false, false, false);
            string[] labels = { "Герой", "Инвентарь", "Умения", "Знания", "Настройки" };
            int[] targets = { 0, 3, 2, 9, -1 };
            float cell = (dock.width - 12) / 5;
            for (int i = 0; i < 5; i++)
            {
                bool active = i == 2;
                Rect button = new Rect(dock.x + 6 + i * cell, dock.y + 4,
                    cell - 3, dock.height - 8);
                if (GUI.Button(button, GUIContent.none, active ? uiStyles.AbilityGold : uiStyles.AbilityTab))
                {
                    if (i == 4) requestedAbilitySettings = true;
                    else requestedSheetTab = targets[i];
                    CompleteNumericKeyboard();
                }
                if (Event.current.type != EventType.Repaint) continue;
                Color tint = active ? new Color(1f, .78f, .38f) :
                    new Color(.85f, .70f, .42f);
                if (uiStyles.AbilityDockIcons[i])
                    GUI.DrawTexture(new Rect(button.center.x - 13, button.y + 5, 26, 26),
                        uiStyles.AbilityDockIcons[i], ScaleMode.ScaleToFit, true, 0, tint, 0, 0);
                Color previous = GUI.contentColor;
                GUI.contentColor = active ? new Color(1, .94f, .79f) :
                    new Color(.89f, .82f, .70f);
                GUI.Label(button, labels[i], uiStyles.AbilityDockLabel);
                GUI.contentColor = previous;
            }
        }
    }
}
