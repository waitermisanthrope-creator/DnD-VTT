"""Source palette contrast only; does not validate Unity rendering or layout."""
from pathlib import Path
import re
import unittest

ROOT = Path(__file__).resolve().parents[2]


def luminance(rgb):
    linear = [c / 12.92 if c <= .04045 else ((c + .055) / 1.055) ** 2.4 for c in rgb]
    return sum(c * w for c, w in zip(linear, (.2126, .7152, .0722)))


class MenuReadabilityTests(unittest.TestCase):
    def test_action_labels_have_readable_contrast(self):
        source = (ROOT / 'unity/Assets/Vtt/Runtime/LegacySessionPanel.Branding.cs').read_text()
        blend_match = re.search(r'Color.Lerp\(color, Color.white, ([.\d]+)f\)', source)
        self.assertIsNotNone(blend_match, 'Verify actual hover background formula')
        hover_blend = float(blend_match[1])
        for name in ('brandBlue', 'brandGreen', 'brandRed', 'brandPurple', 'brandGold', 'brandPlain'):
            with self.subTest(button=name):
                match = re.search(rf'{name}\s*=\s*Button\(button,\s*new Color\(([^)]+)\),\s*Color.white\)', source)
                self.assertIsNotNone(match, f'{name}: verify contrast when changing foreground implementation')
                rgb = [float(value.strip().removesuffix('f')) for value in match[1].split(',')[:3]]
                # Button hover blends with white; validate it too, not just idle.
                for state, color in [('normal', rgb), ('hover', [c + (1 - c) * hover_blend for c in rgb])]:
                    ratio = 1.05 / (luminance(color) + .05)
                    self.assertGreaterEqual(ratio, 4.5, f'{name} {state}: white label contrast {ratio:.2f}:1')


if __name__ == '__main__':
    unittest.main()
