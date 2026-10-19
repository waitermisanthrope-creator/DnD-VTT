"""Contract tests for CI trust, pinned signing cleanup and encrypted artifact transport."""
import importlib.util
import json
import os
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch
import promote_candidate as promotion

spec = importlib.util.spec_from_file_location('cloud_release', Path(__file__).with_name('cloud_release.py'))
ci = importlib.util.module_from_spec(spec)
spec.loader.exec_module(ci)


class CloudReleaseTests(unittest.TestCase):
    def setUp(self):
        self.previous = Path.cwd()
        self.folder = tempfile.TemporaryDirectory()
        os.chdir(self.folder.name)
        self.env = patch.dict(os.environ, GITHUB_REF=ci.BRANCH, GITHUB_REPOSITORY=ci.REPO,
                              GITHUB_EVENT_NAME='workflow_dispatch', GITHUB_SHA='a'*40,
                              RUNNER_TEMP=self.folder.name, UNITY_CI_ARTIFACT_PASSWORD='fixture-'*10)
        self.env.start()

    def tearDown(self):
        self.env.stop()
        os.chdir(self.previous)
        self.folder.cleanup()

    def test_reject_untrusted_branch_event_and_repository(self):
        for key, value in [('GITHUB_REF','refs/heads/main'), ('GITHUB_EVENT_NAME','pull_request'), ('GITHUB_EVENT_NAME','pull_request_target'), ('GITHUB_REPOSITORY','attacker/fork')]:
            with patch.dict(os.environ, {key:value}):
                with self.assertRaises(ValueError): ci.trusted()

    def test_version_contract(self):
        self.assertEqual(ci.version_code('1.00.01'), 10001)
        for version in ['1.0.1', '0.00.01', '1.00.01;echo secret', '../1.00.01']:
            with self.assertRaises(ValueError): ci.version_code(version)

    def fixture(self):
        runtime = Path('unity/Assets/Vtt/Runtime'); runtime.mkdir(parents=True)
        (runtime/'UnityRelease.cs').write_text('const string Version = "1.00.00"; const int Code = 10000;')
        settings = Path('unity/ProjectSettings'); settings.mkdir()
        (settings/'ProjectSettings.asset').write_text('companyName: DnDVttExperiment\nproductName: DnD VTT Unity Prototype')
        (settings/'ProjectVersion.txt').write_text('m_EditorVersion: 6000.3.26f1')
        scene = Path('unity/Assets/Vtt/Scenes'); scene.mkdir()
        (scene/'ImportedAdventure.unity').touch()
        Path('updates').mkdir(); Path('updates/unity-experiment.json').write_text('{"versionCode":10000}')

    def test_prepare_version_only_never_feed_or_save_identity(self):
        self.fixture(); settings=Path('unity/ProjectSettings/ProjectSettings.asset').read_bytes()
        feed=Path('updates/unity-experiment.json').read_bytes()
        with self.assertRaises(ValueError): ci.prepare('1.00.00')
        ci.prepare('1.00.01')
        self.assertEqual(ci.metadata()[:2], ('1.00.01',10001))
        self.assertEqual(Path('updates/unity-experiment.json').read_bytes(),feed)
        self.assertEqual(Path('unity/ProjectSettings/ProjectSettings.asset').read_bytes(),settings)

    def test_signing_pin_and_cleanup_on_failure(self):
        import base64, hashlib
        seen=[]
        def fail(store):
            seen.append(store); self.assertTrue(store.exists()); raise RuntimeError('injected failure')
        cert=b'public-certificate-fixture'
        with patch.dict(os.environ, UNITY_ANDROID_KEYSTORE_BASE64=base64.b64encode(b'encrypted-store').decode()), patch.object(ci,'CERT',hashlib.sha256(cert).hexdigest()), patch.object(ci,'run',return_value=cert):
            with self.assertRaises(RuntimeError): ci.with_keystore(fail)
        self.assertTrue(seen and not seen[0].exists())
        self.assertEqual(list(Path('.').glob('unity-sign-*')),[])
        with patch.dict(os.environ, UNITY_ANDROID_KEYSTORE_BASE64='ZW5jcnlwdGVk'), patch.object(ci,'run',return_value=b'wrong-cert'):
            with self.assertRaises(ValueError): ci.with_keystore(lambda _: self.fail('wrong signer accepted'))
        self.assertEqual(list(Path('.').glob('unity-sign-*')),[])

    def test_license_preflight_not_a_build(self):
        with patch.dict(os.environ, UNITY_SERIAL='',UNITY_EMAIL='',UNITY_PASSWORD=''):
            with self.assertRaisesRegex(ValueError,'Unity CI license not configured'): ci.check_license()

    def test_promotion_requires_actual_build_and_upgrade_success(self):
        run=dict(id=42,conclusion='success',head_branch='experiment/unity-vtt',head_sha='a'*40,
                 path='.github/workflows/unity-cloud-candidate.yml',head_repository=dict(full_name=ci.REPO),event='workflow_dispatch')
        jobs=[dict(name=n,conclusion='success') for n in ['Verify cloud signing key against public 1.00.00','Unity license preflight (not a build)','Build both release packages on GitHub Linux runner','Install and upgrade from public 1.00.00 on isolated Windows runner']]
        with patch.object(promotion.subprocess,'check_output',side_effect=[json.dumps(run).encode(),json.dumps(dict(jobs=jobs)).encode()]):
            self.assertEqual(promotion.proven_run('42')['id'],42)
        jobs[-1]['conclusion']='skipped'
        with patch.object(promotion.subprocess,'check_output',side_effect=[json.dumps(run).encode(),json.dumps(dict(jobs=jobs)).encode()]):
            with self.assertRaisesRegex(ValueError,'did not all succeed'): promotion.proven_run('42')
        for key,value in [('conclusion','failure'),('head_branch','main'),('path','.github/workflows/unity-experiment-android.yml'),('event','pull_request')]:
            with patch.object(promotion.subprocess,'check_output',return_value=json.dumps(dict(run,**{key:value})).encode()):
                with self.assertRaisesRegex(ValueError,'successful trusted'): promotion.proven_run('42')

    def test_promotion_candidate_ties_qa_to_exact_version_source_and_hashes(self):
        self.fixture(); ci.prepare('1.00.01')
        _,_,root=ci.metadata();out=root/'distribution';out.mkdir(parents=True)
        windows=root/'windows';(windows/'DndVtt_Data/Managed').mkdir(parents=True)
        (windows/'DndVtt.exe').write_bytes(b'fixture');(windows/'DndVtt_Data/Managed/Assembly-CSharp.dll').write_bytes(b'fixture')
        for name in ['DnD-VTT-Unity-1.00.01-arm64.apk','DnD-VTT-Unity-Setup-1.00.01-x64.exe']: (out/name).write_bytes(b'fixture'*500)
        ci.candidate()
        run=dict(head_sha='a'*40,id=42)
        qa=dict(status='passed',source='a'*40,candidate='1.00.01',run=42,baselineInstall=True,installedPayloadHashes=True,upgrade=True,reinstall=True,isolatedProfileAndBackupPreserved=True,unknownFilePreserved=True,runtimeSmoke=True)
        Path('qa.json').write_text(json.dumps(qa));feed=Path('updates/unity-experiment.json').read_bytes()
        with patch.object(promotion.ci,'verify_apk'):
            self.assertEqual(promotion.candidate_manifest(out,'qa.json',run,'1.00.01')[1]['versionCode'],10001)
            Path('qa.json').write_text(json.dumps(dict(qa,source='b'*40)))
            with self.assertRaisesRegex(ValueError,'QA does not belong'): promotion.candidate_manifest(out,'qa.json',run,'1.00.01')
            Path('qa.json').write_text(json.dumps(qa)); (out/'DnD-VTT-Unity-1.00.01-arm64.apk').write_bytes(b'corrupt')
            with self.assertRaisesRegex(ValueError,'size/hash'): promotion.candidate_manifest(out,'qa.json',run,'1.00.01')
        self.assertEqual(Path('updates/unity-experiment.json').read_bytes(),feed)

    def test_authenticated_encryption_roundtrip_and_tamper_refusal(self):
        self.fixture(); ci.prepare('1.00.01')
        _,_,root=ci.metadata(); out=root/'distribution'; out.mkdir(parents=True)
        windows=root/'windows'; (windows/'DndVtt_Data/Managed').mkdir(parents=True)
        (windows/'DndVtt.exe').write_bytes(b'fixture-player')
        (windows/'DndVtt_Data/Managed/Assembly-CSharp.dll').write_bytes(b'fixture-code')
        for name in ['DnD-VTT-Unity-1.00.01-arm64.apk','DnD-VTT-Unity-Setup-1.00.01-x64.exe']:
            (out/name).write_bytes(b'synthetic-binary'*200)
        ci.candidate(); ci.seal()
        source=Path(self.folder.name)/'unity-encrypted'
        ci.unseal(source, Path('decoded'))
        self.assertEqual((Path('decoded')/'candidate.json').read_bytes(),(out/'candidate.json').read_bytes())
        with patch.dict(os.environ, UNITY_CI_ARTIFACT_PASSWORD='wrong-password'*8):
            with self.assertRaisesRegex(ValueError,'authentication failed'): ci.unseal(source,Path('wrong'))
        encrypted=source/'candidate.zip.enc'; data=bytearray(encrypted.read_bytes()); data[-1]^=1; encrypted.write_bytes(data)
        with self.assertRaisesRegex(ValueError,'authentication failed'): ci.unseal(source,Path('tampered'))
        self.assertFalse(Path('wrong').exists()); self.assertFalse(Path('tampered').exists())


if __name__ == '__main__':
    unittest.main(verbosity=2)
