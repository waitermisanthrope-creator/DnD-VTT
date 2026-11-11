using System;
using System.IO;
using System.Text;
using Newtonsoft.Json.Linq;

namespace DndVtt.UnityPrototype
{
    public static partial class CharacterSheetStore
    {
        // Persistent empty lock files coordinate all writers across client instances.
        // Never unlink a lock file: another process could already hold its inode.
        private sealed class WriteLease : IDisposable
        {
            private readonly System.Collections.Generic.List<FileStream> files=new System.Collections.Generic.List<FileStream>();
            public WriteLease(string[] paths)
            {
                try
                {
                    Array.Sort(paths,StringComparer.OrdinalIgnoreCase);
                    foreach(string path in paths)
                    {
                        string full=Path.GetFullPath(path);Directory.CreateDirectory(Path.GetDirectoryName(full));
                        files.Add(new FileStream(full+".write-lock",FileMode.OpenOrCreate,FileAccess.ReadWrite,FileShare.None));
                    }
                }
                catch{Dispose();throw;}
            }
            public void Dispose(){for(int i=files.Count-1;i>=0;i--)files[i].Dispose();files.Clear();}
        }
        internal static IDisposable AcquireWriteLease(params string[] paths)=>new WriteLease(paths);
        private static string TradeRead(string path)=>File.Exists(path)?File.ReadAllText(path):null;
        private static void TradeWrite(string path,string text,bool backup)
        {
            if(TradeRead(path)==text)return;
            if(text==null){if(File.Exists(path))File.Delete(path);return;}
            Directory.CreateDirectory(Path.GetDirectoryName(Path.GetFullPath(path)));
            using(var file=new FileStream(path+".pending",FileMode.Create,FileAccess.Write,FileShare.None))
            using(var writer=new StreamWriter(file,new UTF8Encoding(false))){writer.Write(text);writer.Flush();file.Flush(true);}
            if(File.Exists(path))File.Replace(path+".pending",path,backup?path+".bak":null);
            else File.Move(path+".pending",path);
        }
        private static void TradeTargets(string path,string settings)
        {
            if(string.Equals(Path.GetFullPath(path),Path.GetFullPath(settings),StringComparison.OrdinalIgnoreCase))throw new FormatException("Файлы рынка и персонажей должны различаться");
        }
        private static void CheckTradeSnapshot(JObject journal,string path,string settings)
        {
            if((int?)journal["schema"]!=1)throw new FormatException("Неизвестный журнал торговли");
            foreach(string key in new[]{"beforeCharacters","afterCharacters","beforePreferences","afterPreferences"})
                if(journal[key]==null||(journal[key].Type!=JTokenType.String&&journal[key].Type!=JTokenType.Null))throw new FormatException("Повреждён журнал торговли");
            _=new LegacyCharacterArchive((string)journal["afterCharacters"]);_=ClientPreferences.Parse((string)journal["afterPreferences"]);
            if((string)journal["beforeCharacters"]!=null)_=new LegacyCharacterArchive((string)journal["beforeCharacters"]);
            if((string)journal["beforePreferences"]!=null)_=ClientPreferences.Parse((string)journal["beforePreferences"]);
            string chars=TradeRead(path),prefs=TradeRead(settings);
            if(chars!=(string)journal["beforeCharacters"]&&chars!=(string)journal["afterCharacters"]||prefs!=(string)journal["beforePreferences"]&&prefs!=(string)journal["afterPreferences"])
                throw new InvalidOperationException("Файлы изменились вне незавершённой сделки. Автоматическая перезапись запрещена; сохраните архив и настройки.");
        }
        public static void RecoverTrade(string path,string settings)
        {
            TradeTargets(path,settings);using var lease=AcquireWriteLease(path,settings);string journalPath=path+".trade-journal";
            if(!File.Exists(journalPath))return;
            var info=new FileInfo(journalPath);if(info.Length>64*1024*1024)throw new FormatException("Слишком большой журнал торговли");
            var journal=JObject.Parse(File.ReadAllText(journalPath));CheckTradeSnapshot(journal,path,settings);
            // Forward recovery is idempotent. Existing after-files keep their .bak.
            TradeWrite(path,(string)journal["afterCharacters"],true);
            TradeWrite(settings,(string)journal["afterPreferences"],true);
            File.Delete(journalPath);
        }
        public static void SaveTrade(string path,LegacyCharacterArchive archive,string settings,ClientPreferences preferences,string expectedCharacters,string expectedPreferences)
        {
            TradeTargets(path,settings);using var lease=AcquireWriteLease(path,settings);string journalPath=path+".trade-journal";
            if(File.Exists(journalPath))throw new InvalidOperationException("Сначала восстановите незавершённую сделку");
            if(TradeRead(path)!=expectedCharacters||TradeRead(settings)!=expectedPreferences)throw new InvalidOperationException("Персонажи или рынок изменились. Откройте сделку заново.");
            string after=archive.Export(),afterPrefs=preferences.Export();_=new LegacyCharacterArchive(after);_=ClientPreferences.Parse(afterPrefs);
            var journal=new JObject{["schema"]=1,["beforeCharacters"]=expectedCharacters,["afterCharacters"]=after,["beforePreferences"]=expectedPreferences,["afterPreferences"]=afterPrefs,
                ["charactersBackup"]=TradeRead(path+".bak"),["preferencesBackup"]=TradeRead(settings+".bak")};
            // Durable intent exists before either canonical file changes. No paths
            // from the journal are executed; callers supply the two fixed targets.
            TradeWrite(journalPath,journal.ToString(),false);
            try
            {
                CheckTradeSnapshot(journal,path,settings);
                TradeWrite(path,after,true);TradeWrite(settings,afterPrefs,true);File.Delete(journalPath);
            }
            catch
            {
                // Recoverable filesystem failures restore previous canonical bytes
                // and previous backups. If rollback also fails, retain intent and
                // block ordinary writes until startup recovery resolves it.
                try
                {
                    CheckTradeSnapshot(journal,path,settings);
                    TradeWrite(path,expectedCharacters,false);TradeWrite(settings,expectedPreferences,false);
                    TradeWrite(path+".bak",(string)journal["charactersBackup"],false);TradeWrite(settings+".bak",(string)journal["preferencesBackup"],false);
                    File.Delete(journalPath);
                }
                catch{ /* Durable journal intentionally remains for safe recovery. */ }
                throw;
            }
        }
    }
}
