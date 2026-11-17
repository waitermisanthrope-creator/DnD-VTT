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
                    padding = new RectOffset(14, 14, 10, 12),
                    margin = new RectOffset(0, 0, 2, 10)
                };
                unifiedGrimoireSkin.button = new GUIStyle(uiStyles.AbilityChip)
                {
                    font = sheetSerif, fontSize = 14,
                    alignment = TextAnchor.MiddleCenter, wordWrap = false,
                    padding = new RectOffset(7, 7, 8, 8),
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
