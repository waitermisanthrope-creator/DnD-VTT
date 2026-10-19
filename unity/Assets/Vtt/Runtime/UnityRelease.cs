using System;
using System.Globalization;
using System.IO;
using System.Security.Cryptography;
using System.Text.RegularExpressions;
using Newtonsoft.Json.Linq;

namespace DndVtt.UnityPrototype
{
    public static class UnityRelease
    {
        public const string Version = "1.00.00";
        public const int Code = 10000;
        public const string Package = "com.dndvtt.unity";
        public const string Feed = "https://raw.githubusercontent.com/waitermisanthrope-creator/DnD-VTT/experiment/unity-vtt/updates/unity-experiment.json";
        public const string ChangelogFeed = "https://raw.githubusercontent.com/waitermisanthrope-creator/DnD-VTT/experiment/unity-vtt/updates/unity-changelog.json";
        public const string Releases = "https://github.com/waitermisanthrope-creator/DnD-VTT/releases";
        public static int VersionCode(string version)
        {
            if (version == null || !Regex.IsMatch(version, @"^[1-9][0-9]{0,3}\.[0-9]{2}\.[0-9]{2}$")) throw new FormatException("Неизвестный формат версии");
            var parts = version.Split('.'); return checked(int.Parse(parts[0], CultureInfo.InvariantCulture) * 10000 + int.Parse(parts[1], CultureInfo.InvariantCulture) * 100 + int.Parse(parts[2], CultureInfo.InvariantCulture));
        }
        public static JObject ParseFeed(string json, string platform)
        {
            var feed = LegacyJson.Parse(json, 64 * 1024) as JObject ?? throw new FormatException("Неверный ответ сервера обновлений");
            if (feed["schema"]?.Type != JTokenType.Integer || (int?)feed["schema"] != 1 || feed["versionCode"]?.Type != JTokenType.Integer || (string)feed["channel"] != "unity-experiment" || VersionCode((string)feed["version"]) != (int?)feed["versionCode"]) throw new FormatException("Неверный канал или версия обновления");
            var artifact = feed["artifacts"]?[platform] as JObject ?? throw new FormatException("Обновление для этой платформы отсутствует");
            var uri = new Uri((string)artifact["url"] ?? "", UriKind.Absolute);
            string prefix = "/waitermisanthrope-creator/DnD-VTT/releases/download/unity-v" + (string)feed["version"] + "/";
            string extension = platform == "android" ? ".apk" : platform == "windows" ? ".exe" : throw new FormatException("Неподдерживаемая платформа");
            if (uri.Scheme != "https" || uri.Host != "github.com" || uri.UserInfo != "" || uri.Query != "" || uri.Fragment != "" || !uri.AbsolutePath.StartsWith(prefix, StringComparison.Ordinal) || !uri.AbsolutePath.EndsWith(extension, StringComparison.OrdinalIgnoreCase)) throw new FormatException("Неверный адрес пакета обновления");
            if (!Regex.IsMatch((string)artifact["sha256"] ?? "", "^[a-fA-F0-9]{64}$") || artifact["bytes"]?.Type != JTokenType.Integer || (long?)artifact["bytes"] < 1 || (long?)artifact["bytes"] > 1024L * 1024 * 1024) throw new FormatException("Неизвестный размер или контрольная сумма обновления");
            if (platform == "android" && (string)feed["androidPackage"] != Package) throw new FormatException("Пакет относится к другому приложению");
            return feed;
        }
        public static JObject ParseHistory(string json)
        {
            var history = LegacyJson.Parse(json, 64 * 1024) as JObject
                ?? throw new FormatException("Неверный формат истории изменений");
            if ((int?)history["schema"] != 1 || (string)history["channel"] != "unity-experiment" ||
                history["releases"] is not JArray releases || releases.Count < 1 || releases.Count > 100)
                throw new FormatException("Неизвестный формат истории изменений");
            int previous = int.MaxValue;
            foreach (JToken row in releases)
            {
                if (row is not JObject entry) throw new FormatException("Повреждённая запись истории");
                int code = VersionCode((string)entry["version"]);
                if ((int?)entry["versionCode"] != code || code >= previous)
                    throw new FormatException("История должна содержать уникальные версии по убыванию");
                previous = code;
                if ((string)entry["status"] != "published" && (string)entry["status"] != "testing")
                    throw new FormatException("Некорректный статус выпуска");
                if (((string)entry["title"])?.Length > 160 || ((string)entry["date"])?.Length > 30 ||
                    entry["changes"] is not JArray changes || changes.Count < 1 || changes.Count > 30)
                    throw new FormatException("Некорректный список изменений");
                foreach (JToken item in changes)
                    if (item.Type != JTokenType.String || ((string)item).Length > 500)
                        throw new FormatException("Некорректное описание изменения");
            }
            return history;
        }

        public static void VerifyFile(string path, JObject artifact)
        {
            if (new FileInfo(path).Length != (long)artifact["bytes"]) throw new FormatException("Пакет загружен не полностью");
            using var sha = SHA256.Create(); using var file = File.OpenRead(path);
            string digest = BitConverter.ToString(sha.ComputeHash(file)).Replace("-", "");
            if (!string.Equals(digest, (string)artifact["sha256"], StringComparison.OrdinalIgnoreCase)) throw new FormatException("Контрольная сумма не совпала. Установка отменена.");
        }
    }
}
