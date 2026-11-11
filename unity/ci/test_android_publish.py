import copy
import unittest
import publish_android_update as pub

class AndroidPublishTests(unittest.TestCase):
    def test_successful_android_does_not_wait_for_windows(self):
        verify = getattr(pub, 'verified_android_source', None)
        self.assertIsNotNone(verify, 'Android publication must depend on the signed Android job')
        run = dict(name='Unity cloud Android candidate', head_branch=pub.BRANCH,
                   path='.github/workflows/unity-cloud-candidate.yml', event='push',
                   head_sha='a'*40, head_repository=dict(full_name=pub.REPO))
        jobs = [dict(name='Build and verify signed Android ARM64 APK', conclusion='success'),
                dict(name='Build verified Windows x64 installer', conclusion=None)]
        self.assertEqual(verify(run, jobs), 'a'*40)
        for field, bad in [('head_branch', 'main'), ('event', 'pull_request'), ('head_sha', 'bad')]:
            altered=copy.deepcopy(run);altered[field]=bad
            with self.subTest(field=field), self.assertRaises(ValueError):verify(altered,jobs)
        for outcome in [None, 'failure', 'skipped', 'cancelled']:
            altered=copy.deepcopy(jobs);altered[0]['conclusion']=outcome
            with self.subTest(outcome=outcome), self.assertRaises(ValueError):verify(run,altered)
        altered=copy.deepcopy(run);altered['head_repository']['full_name']='someone/fork'
        with self.assertRaises(ValueError):verify(altered,jobs)

if __name__ == '__main__':unittest.main()
