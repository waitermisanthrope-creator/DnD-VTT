using System;
using System.IO;
using System.Text;

namespace DndVtt.UnityPrototype
{
    // Editor-only packaging. Originals, all image-data chunks, colour metadata,
    // textual attribution and UI resources are preserved. caBX is a non-rendering
    // ancillary container; retain it in source, omit it only from the raw APK copy.
    public static class BuildBranding
    {
        public static byte[] OptimizePng(byte[] input)
        {
            byte[] signature = { 137, 80, 78, 71, 13, 10, 26, 10 };
            if (input == null || input.Length < 20) throw new FormatException("Truncated PNG");
            for (int i = 0; i < signature.Length; i++) if (input[i] != signature[i]) throw new FormatException("PNG signature");
            using var output = new MemoryStream(); output.Write(input, 0, 8);
            int position = 8; bool header = false, image = false, end = false;
            while (position < input.Length)
            {
                if (input.Length - position < 12) throw new FormatException("Truncated PNG chunk");
                uint length = (uint)input[position] << 24 | (uint)input[position + 1] << 16 | (uint)input[position + 2] << 8 | input[position + 3];
                if (length > int.MaxValue - 12 || length + 12L > input.Length - position) throw new FormatException("PNG chunk length");
                string kind = Encoding.ASCII.GetString(input, position + 4, 4);
                if (!header && kind != "IHDR" || end) throw new FormatException("PNG chunk order");
                header = true; image |= kind == "IDAT";
                int bytes = (int)length + 12;
                if (kind != "caBX") output.Write(input, position, bytes);
                position += bytes;
                if (kind == "IEND") { if (length != 0 || position != input.Length) throw new FormatException("PNG end"); end = true; }
            }
            if (!image || !end) throw new FormatException("Incomplete PNG");
            return output.ToArray();
        }

        public sealed class Scope : IDisposable
        {
            private readonly string path;
            private readonly byte[] original;
            public long SavedBytes { get; }
            public Scope(string streamingBrandingDirectory)
            {
                path = Path.Combine(streamingBrandingDirectory, "Splash19.png");
                original = File.ReadAllBytes(path); var optimized = OptimizePng(original);
                SavedBytes = original.Length - optimized.Length;
                try { File.WriteAllBytes(path, optimized); }
                catch { File.WriteAllBytes(path, original); throw; }
            }
            public void Dispose() { File.WriteAllBytes(path, original); }
        }
    }
}
