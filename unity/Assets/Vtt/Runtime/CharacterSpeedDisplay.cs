using System;
using System.Globalization;
using System.Text.RegularExpressions;

namespace DndVtt.UnityPrototype
{
    // Presentation only. Character speed in saves remains unchanged (normally feet).
    // D&D uses the conventional 5 ft = 1.5 m scale, not a physics-unit conversion.
    public static class CharacterSpeedDisplay
    {
        private static readonly Regex SimpleSpeed = new Regex(
            @"^\s*(?<value>\d+(?:[.,]\d+)?)\s*(?<unit>футов|фута|футы|фут|фт|feet|ft|метров|метра|метр|м)?\s*$",
            RegexOptions.IgnoreCase | RegexOptions.CultureInvariant);
        private static readonly CultureInfo Russian = CultureInfo.GetCultureInfo("ru-RU");

        public static string Format(string raw)
        {
            if (string.IsNullOrWhiteSpace(raw)) return "9 м / 30 фт";
            Match match = SimpleSpeed.Match(raw);
            if (!match.Success) return raw; // Never guess the units in custom descriptions.
            string source = match.Groups["value"].Value.Replace(',', '.');
            if (!decimal.TryParse(source, NumberStyles.AllowDecimalPoint, CultureInfo.InvariantCulture, out decimal n)
                || n > 100000m) return raw;
            string unit = match.Groups["unit"].Value.ToLowerInvariant();
            bool metres = unit == "м" || unit.StartsWith("метр", StringComparison.Ordinal);
            decimal metric = metres ? n : n * 0.3m;
            decimal feet = metres ? n / 0.3m : n;
            return metric.ToString("0.##", Russian) + " м / " + feet.ToString("0.##", Russian) + " фт";
        }
    }
}
