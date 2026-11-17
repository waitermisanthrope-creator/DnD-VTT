using UnityEngine;

namespace DndVtt.UnityPrototype
{
    public sealed partial class LegacySessionPanel
    {
        // Shared IMGUI visual shell for non-sheet windows. All graphics are the
        // approved Ability kit; no duplicated assets or per-frame textures.
        // Do not apply globally to Sheet: Wallet and spell/hero layouts own
        // dedicated styles and must keep their established interactions.
        private GUISkin unifiedGrimoireSkin;

        // Cached, multiline-safe variants for inventory/notes/long crafting actions.
        // Keep these separate from generic GUI.skin to protect the existing Wallet.
        private GUIStyle grimoireWrappedTab, grimoireWrappedGold, grimoireWrappedInput;

        private GUIStyle GrimoireWrappedTab
        {
            get
            {
                PrepareGrimoireAbilityStyles();
                return grimoireWrappedTab ??= new GUIStyle(uiStyles.AbilityTab)
                {
                    wordWrap = true, fontSize = 13, alignment = TextAnchor.MiddleCenter
                };
            }
        }

        private GUIStyle GrimoireWrappedGold
        {
            get
            {
                PrepareGrimoireAbilityStyles();
                return grimoireWrappedGold ??= new GUIStyle(uiStyles.AbilityGold)
                {
                    wordWrap = true, fontSize = 13, alignment = TextAnchor.MiddleCenter
                };
            }
        }

        private GUIStyle GrimoireWrappedInput
        {
            get
            {
                PrepareGrimoireAbilityStyles();
                return grimoireWrappedInput ??= new GUIStyle(uiStyles.AbilityInput)
                {
                    wordWrap = true, fontSize = 13
                };
            }
        }

        private void DrawGrimoireSectionHeading(string title, int iconId)
        {
            PrepareGrimoireAbilityStyles();
            GUILayout.BeginHorizontal();
            if (iconId > 0)
            {
                Rect iconRect = GUILayoutUtility.GetRect(26, 26,
                    GUILayout.Width(26), GUILayout.Height(26));
                if (Event.current.type == EventType.Repaint)
                {
                    Sprite sprite = DndVtt.ApprovedIconRegistry.GetSprite(iconId);
                    if (sprite != null)
                    {
                        Texture2D texture = sprite.texture;
                        Rect source = sprite.textureRect;
                        GUI.DrawTextureWithTexCoords(iconRect, texture,
                            new Rect(source.x / texture.width, source.y / texture.height,
                                source.width / texture.width, source.height / texture.height),
                            true);
                    }
                }
            }
            GUILayout.Label(title, uiStyles.AbilityTitle, GUILayout.ExpandWidth(true));
            GUILayout.EndHorizontal();
            DrawGrimoireAbilityRule();
        }

        // Brand Home, Settings and Character Studio draw before the normal
        // DrawFrontEnd skin path. Prepare existing art without changing screen logic.
        private void PrepareGrimoireSystemStyles()
        {
            PrepareSheetSkin();
            PrepareGrimoireAbilityStyles();
        }

        private void PrepareUnifiedGrimoireSkin()
        {
            // PrepareSheetSkin() already ran in DrawFrontEnd; ability styles cache
            // through uiStyles and are automatically recreated on theme changes.
            PrepareGrimoireAbilityStyles();
            if (!unifiedGrimoireSkin)
            {
                unifiedGrimoireSkin = Instantiate(sheetSkin);
                unifiedGrimoireSkin.hideFlags = HideFlags.HideAndDontSave;
                unifiedGrimoireSkin.box = new GUIStyle(uiStyles.AbilityPanel)
                {
                    // Do not place text inside 28px decorative corners.
                    padding = new RectOffset(29, 29, 29, 29),
                    margin = new RectOffset(0, 0, 2, 10)
                };
                unifiedGrimoireSkin.button = new GUIStyle(uiStyles.AbilityChip)
                {
                    font = sheetSerif, fontSize = 14,
                    alignment = TextAnchor.MiddleCenter, wordWrap = false,
                    // AbilityChip uses an 18px border; reserve that inset.
                    padding = new RectOffset(19, 19, 12, 12),
                    margin = new RectOffset(2, 2, 2, 2)
                };
                unifiedGrimoireSkin.label = new GUIStyle(sheetSkin.label)
                {
                    font = sheetSerif, fontSize = 15, wordWrap = true,
                    normal = { textColor = new Color(.97f, .93f, .84f) }
                };
                unifiedGrimoireSkin.textField = new GUIStyle(uiStyles.AbilityInput)
                {
                    wordWrap = false, stretchWidth = true, fontSize = 14
                };
                unifiedGrimoireSkin.textArea = new GUIStyle(uiStyles.AbilityInput)
                {
                    wordWrap = true, stretchWidth = true, fontSize = 14
                };
            }
            GUI.skin = unifiedGrimoireSkin;
        }
    }
}
