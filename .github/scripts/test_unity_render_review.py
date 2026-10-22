"""Release control: only the reviewed immutable render index may activate the feed."""
import importlib.util
from pathlib import Path
import unittest
spec=importlib.util.spec_from_file_location('unity_publisher',Path(__file__).with_name('publish-unity-artifacts.py'))
publisher=importlib.util.module_from_spec(spec);spec.loader.exec_module(publisher)
class RenderReviewTests(unittest.TestCase):
    def test_unreviewed_or_changed_art_cannot_activate_feed(self):
        for approved,actual in [(None,'a'*64),('', 'a'*64),('b'*64,'a'*64),('a'*64,None),('a'*64,'a'*63)]:
            self.assertFalse(publisher.render_review_allows_activation(True,approved,actual))
        self.assertTrue(publisher.render_review_allows_activation(True,'a'*64,'a'*64))
    def test_existing_nonvisual_publication_contract_remains_compatible(self):
        self.assertTrue(publisher.render_review_allows_activation(False,None,None))
if __name__=='__main__':unittest.main(verbosity=2)
