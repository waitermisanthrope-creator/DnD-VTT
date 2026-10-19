# Unity Android: updates from inside the installed app

The original Android package ID **com.dndvtt.unity** and release signing certificate
must never change. The WebView application in `main` is independent.

## User journey

1. Open **Настройки → Обновления → Проверить обновление**. On Unity
   1.00.02+, optional startup checks also announce new published releases.
2. App fetches `updates/unity-experiment.json` from the experimental branch,
   and accepts only same-channel versions newer than the installed
   `versionCode`, with the correct Android package and a GitHub Release URL.
3. Press **Скачать обновление**. Download stays in the app's **internal**
   Android cache, and is checked for exact length and SHA-256.
4. Press **Обновить**. The native Android provider verifies *same package ID*,
   *same signing certificate*, and *strictly higher version code*, then opens
   Android's system package installer. The **user must approve installation**.
5. App data and characters stay in the unchanged Android app data directory.

Note: a signed APK from GitHub Actions **Artifacts is not an update** until
promoted to a public versioned GitHub Release and the feed is advanced.
Android apps cannot silently install their own APKs without special privileges.
Every new Unity native application release still requires CI compilation,
but users do not manually download files or wait on the GitHub Actions website.

## Release operator

- Changes go only into `experiment/unity-vtt`, never `main`.
- CI **Unity cloud Android candidate** generates an Android-only, separately
  signed version (currently 1.00.02), validates the original pinned certificate
  and stores `DnD-VTT-Unity-<version>-Android-test` in Actions Artifacts.
- Keep `unity/Assets/Vtt/Resources/Changelog.json` and
  `updates/unity-changelog.json` synchronized for the candidate;
  each release must have an entry and its status initially `testing`.
- Publishing is **not automatic**. The owner must explicitly approve the
  public prerelease. The workflow
  `.github/workflows/unity-android-update-publish.yml` can be dispatched on
  its supported ref; it also responds to an **owner-authored** change to
  `release-staging/unity-android-approval.json` containing:
  ```json
  { "version": "1.00.02", "candidateRunId": 123456789, "approved": true }
  ```
- The publisher downloads the exact artifact from a successful Android
  candidate run, verifies Android signature, package, version, architecture,
  alignment, and size, then uploads the **same bytes** to a GitHub prerelease.
  Only after downloading the release and matching the checksum does it advance
  `updates/unity-experiment.json` and mark changelog status `published`.
- On each release, update the history and never replace an already-published
  version with different APK bytes.
- Windows remains out of scope. The Android-only feed omits Windows artifacts
  until a separate Windows QA and delivery workflow is restored.

## QA / current limitations

- The Unity 1.00.01 build installed successfully on the owner's Android device.
- The 1.00.02 updater UI, actual network transfer and Android installer flow
  require **device testing** before being called proven.
- The 1.00.01 built-in updater is accessible at the bottom of its original
  settings screen; it checks the same feed. If its native cache path prevents
  installing 1.00.02, one manual APK upgrade may be required to bootstrap the
  repaired cache implementation. From 1.00.02 onward, the app uses
  `Activity.getCacheDir()` to agree with its read-only package provider.
