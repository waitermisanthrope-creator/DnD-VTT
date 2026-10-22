import unittest
from verify_launcher_aliases import resource_files,resolve_files

class LauncherResourceTests(unittest.TestCase):
 def test_packed_paths_and_deduplicated_png(self):
  dump='''spec resource 0x7f010001 app:drawable/vtt_icon_01: flags=0x0
 resource 0x7f010001 app:drawable/vtt_icon_01: t=0x03 d=0x000001
   (string8) "res/a.png"
 resource 0x7f010002 app:drawable/vtt_icon_02: t=0x03 d=0x000001
   (string8) "res/a.png"
 resource 0x7f010003 app:drawable/vtt_icon_default: t=0x01 d=0x7f010001
'''
  paths,refs=resource_files(dump)
  self.assertEqual(resolve_files('0x7f010001',paths,refs),{'res/a.png'})
  self.assertEqual(resolve_files('0x7f010002',paths,refs),{'res/a.png'})
  self.assertEqual(resolve_files('0x7f010003',paths,refs),{'res/a.png'})
 def test_missing_or_cyclic_resource_rejected(self):
  with self.assertRaises(ValueError):resolve_files('0x1',{}, {})
  with self.assertRaises(ValueError):resolve_files('0x1',{}, {'0x1':'0x2','0x2':'0x1'})
if __name__=='__main__':unittest.main()
