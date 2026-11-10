using System;
using System.IO;
using System.Text;
#if UNITY_STANDALONE_WIN
using System.Runtime.InteropServices;
#endif

namespace DndVtt.UnityPrototype
{
    public static class CharacterFiles
    {
        public const int Limit = CharacterArt.ArchiveLimit;
        public static string Validate(string json)
        {
            var archive = new LegacyCharacterArchive(json);
            if (archive.Count == 0) throw new FormatException("В файле нет персонажей");
            return json;
        }
        public static string Read(string path)
        {
            using var stream = new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.Read);
            if (stream.Length > Limit) throw new FormatException("Файл персонажей больше 16 МБ");
            using var data = new MemoryStream();
            var buffer = new byte[8192]; int count;
            while ((count = stream.Read(buffer, 0, buffer.Length)) > 0)
            {
                if (data.Length + count > Limit) throw new FormatException("Файл персонажей больше 16 МБ");
                data.Write(buffer, 0, count);
            }
            string json = new UTF8Encoding(false, true).GetString(data.ToArray());
            return Validate(json.TrimStart('\uFEFF'));
        }
        public static void Write(string path, string json)
        {
            Validate(json);
            if (!string.Equals(Path.GetExtension(path), ".json", StringComparison.OrdinalIgnoreCase))
                throw new FormatException("Сохраните архив с расширением .json");
            CharacterSheetStore.Save(path, new LegacyCharacterArchive(json));
        }
#if UNITY_STANDALONE_WIN
        [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Unicode)]
        private struct OpenFileName
        {
            public int size; public IntPtr owner, instance;
            public string filter, customFilter; public int maxCustomFilter, filterIndex;
            public IntPtr file; public int maxFile; public IntPtr fileTitle; public int maxFileTitle;
            public string initialDir, title; public uint flags; public ushort fileOffset, extensionOffset;
            public string defaultExtension; public IntPtr customData, hook; public string template;
            public IntPtr reserved; public uint reservedValue, flagsEx;
        }
        [DllImport("comdlg32.dll", CharSet = CharSet.Unicode, SetLastError = true)]
        [return: MarshalAs(UnmanagedType.Bool)] private static extern bool GetOpenFileName(ref OpenFileName dialog);
        [DllImport("comdlg32.dll", CharSet = CharSet.Unicode, SetLastError = true)]
        [return: MarshalAs(UnmanagedType.Bool)] private static extern bool GetSaveFileName(ref OpenFileName dialog);
        [DllImport("comdlg32.dll")] private static extern uint CommDlgExtendedError();
        [DllImport("user32.dll")] private static extern IntPtr GetActiveWindow();
        public static string PickWindows(bool save) => PickWindowsCore(save, false);
        public static string PickWindowsArt() => PickWindowsCore(false, true);
        private static string PickWindowsCore(bool save, bool art)
        {
            IntPtr buffer = Marshal.AllocHGlobal(32768 * 2);
            try
            {
                Marshal.Copy(new byte[32768 * 2], 0, buffer, 32768 * 2);
                if (save)
                {
                    var name = Encoding.Unicode.GetBytes("DnD-VTT-characters-" + DateTime.UtcNow.ToString("yyyyMMdd") + ".json\0");
                    Marshal.Copy(name, 0, buffer, name.Length);
                }
                var dialog = new OpenFileName { size = Marshal.SizeOf<OpenFileName>(), owner = GetActiveWindow(),
                    filter = art ? "Арт персонажа (*.png;*.jpg;*.jpeg;*.bmp)\0*.png;*.jpg;*.jpeg;*.bmp\0Все файлы (*.*)\0*.*\0\0" : "Персонажи DnD VTT (*.json)\0*.json\0Все файлы (*.*)\0*.*\0\0", filterIndex = 1,
                    file = buffer, maxFile = 32768, title = art ? "Выбрать арт персонажа" : save ? "Сохранить персонажей DnD VTT" : "Открыть персонажей DnD VTT",
                    defaultExtension = art ? "png" : "json", flags = 0x80000 | 0x8 | 0x800 | (save ? 0x2u : 0x1000u) };
                bool accepted = save ? GetSaveFileName(ref dialog) : GetOpenFileName(ref dialog);
                if (accepted) return Marshal.PtrToStringUni(buffer);
                uint error = CommDlgExtendedError();
                if (error != 0) throw new IOException("Не удалось открыть окно выбора файла: " + error);
                return null;
            }
            finally { Marshal.FreeHGlobal(buffer); }
        }
#endif
    }
}
