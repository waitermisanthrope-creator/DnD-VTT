using System;
using System.IO;
namespace DndVtt.UnityPrototype
{
    public static partial class CharacterSheetStore
    {
        public static void SaveExpected(string path,LegacyCharacterArchive candidate,string expectedExport)
        {
            using var lease=AcquireWriteLease(path);
            if(File.Exists(path+".trade-journal"))throw new InvalidOperationException("Сначала восстановите торговую операцию");
            if(!File.Exists(path)||Load(path).Export()!=expectedExport)throw new InvalidOperationException("Архив изменился. Обновите персонажа перед изготовлением.");
            SaveOwned(path,candidate);
        }
        public static LegacyCharacterArchive TransferContainers(string path,LegacyCharacterArchive archive)
        {
            using var lease=AcquireWriteLease(path);
            if(File.Exists(path+".trade-journal"))throw new InvalidOperationException("Сначала восстановите торговую операцию");
            if(!File.Exists(path)||Load(path).Export()!=archive.Export())throw new InvalidOperationException("Архив изменился вне приложения. Перезапустите клиент перед переносом.");
            var candidate=archive.DetachedCopy();bool changed=false;
            for(int i=0;i<archive.Count;i++)if(CommerceRules.NeedsContainerTransfer(archive.Snapshot(i)))
            {candidate.Replace(i,CommerceRules.TransferLegacyContainers(archive.Snapshot(i)));changed=true;}
            if(!changed)return archive;
            // Validate the complete archive before backup; keep the original file
            // and in-memory archive until durable atomic replacement succeeds.
            _=new LegacyCharacterArchive(candidate.Export());Backup(path,archive);SaveOwned(path,candidate);return candidate;
        }
    }
}
