using Newtonsoft.Json.Linq;
using UnityEngine;
namespace DndVtt.UnityPrototype
{
    public sealed partial class LegacySessionPanel
    {
        private bool containerTransferConfirm,pendingContainerTransfer,containerTransferNeeded;
        private bool? requestedContainerTransferConfirm;
        private LegacyCharacterArchive containerTransferCheckedArchive;
        private int containerTransferCheckedHero=-1;
        private void DrawContainerTransfer(JObject hero)
        {
            if(Event.current.type==EventType.Layout&&requestedContainerTransferConfirm.HasValue){containerTransferConfirm=requestedContainerTransferConfirm.Value;requestedContainerTransferConfirm=null;}
            if(!ReferenceEquals(containerTransferCheckedArchive,archive)||containerTransferCheckedHero!=selected)
            {containerTransferCheckedArchive=archive;containerTransferCheckedHero=selected;containerTransferNeeded=CommerceRules.NeedsContainerTransfer(hero);}
            if(!containerTransferNeeded)return;
            PrepareGrimoireAbilityStyles();
            GUILayout.BeginVertical(uiStyles.AbilityPanel);
            DrawGrimoireSectionHeading("Сохранённые контейнеры",30);
            GUILayout.Label("Содержимое можно перенести в основной инвентарь. Исходные записи останутся в архиве; перед записью будет создана резервная копия всех персонажей.",sheetQuiet);
            if(!containerTransferConfirm){if(MeasuredMenuButton("Перенести содержимое",GrimoireWrappedGold,GUILayout.MinHeight(48)))requestedContainerTransferConfirm=true;}
            else
            {
                if(MeasuredMenuButton("Подтвердить перенос с резервной копией",GrimoireWrappedGold,GUILayout.MinHeight(48)))pendingContainerTransfer=true;
                if(MeasuredMenuButton("Отмена",GrimoireWrappedTab,GUILayout.MinHeight(44)))requestedContainerTransferConfirm=false;
            }
            GUILayout.EndVertical();
        }
        private void CommitContainerTransfer()
        {
            if(!pendingContainerTransfer)return;pendingContainerTransfer=false;containerTransferConfirm=false;
            Attempt(()=>{archive=CharacterSheetStore.TransferContainers(SavePath,archive);status="Предметы перенесены. Исходные записи и резервная копия сохранены.";});
        }
    }
}
