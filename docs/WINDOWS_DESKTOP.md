# DnD VTT — Windows desktop (test branch)

**Status:** initial Windows packaging is implemented on the isolated `windows-desktop` branch. The installer has **not** been confirmed to run on a physical Windows PC yet. Android `main` is unchanged.

## Build the two Windows EXEs with GitHub Actions

1. Open **Actions** in the repository.
2. Select **Build Windows Desktop EXE**.
3. Use **Run workflow** (choose branch `windows-desktop`), or open a build triggered by a push to that branch.
4. When the Windows job finishes successfully, download the **DnD-VTT-Windows-Test** artifact (ZIP).
5. Unzip it to get `DnD-VTT-Setup-74.0.62-x64.exe` and `DnD-VTT-Portable-74.0.62-x64.exe`.

A GitHub Actions artifact is a ZIP containing the two executables; it is not an APK. If the build is red, read the logs and do not assume an installer has been produced.

## Build locally (Windows 10/11 x64)

Requires Node.js 22+ and npm. In PowerShell at the root of the repository:

```powershell
git checkout windows-desktop
npm install
npm run desktop:check
npm run desktop:dev
npm run desktop:build:win
```

The installable and portable EXEs are created in `dist/windows/`. Start with `desktop:dev` to validate UI/3D before installation.

## Desktop behavior

- Existing HTML, CSS, JS, GLB, textures and bundled sounds are staged from the same sources as Android.
- Default portrait window is approximately 520 × 900 logical pixels, resizable.
- The 3D map editor automatically triggers landscape-sized window and restores previous portrait bounds on exit.
- **F11** toggles fullscreen. **Ctrl+Shift+L** toggles the landscape-sized window manually (useful for the 3D character editor).
- Each Windows installation shares its local Electron user-data directory for saves/settings. Android localStorage saves are *not* copied automatically; export/import must be tested separately.
- The Android native OTA update mechanism is deliberately disabled on Windows. For now download the next desktop EXE and install it manually. Auto-updater comes later, with platform-specific verification.
- The Windows build is unsigned; SmartScreen may warn. Do not disable system protection globally.
- Some wallpapers / music require existing repository media. Any asset missing from GitHub cannot be magically added by the build.
- Browser features requiring Android-only native APIs need targeted desktop tests; a successful build does not prove every feature works.

## First hands-on smoke test

1. Launch Portable EXE; confirm splash -> main menu.
2. Open an existing and a newly created character, change settings, restart and confirm they persist.
3. Test the class/subclass and level-up flows (including Blood Hunter).
4. Open 3D character editor, rotate/modify the model, change race and clothing.
5. Open a 3D map, rotate and navigate, place furniture, save/reopen.
6. Check network/multiplayer and audio with headphones.
7. Verify fullscreen, map window restore, Windows scaling at 100%, 125%, 150%.
8. Confirm that the desktop app does *not* attempt an Android APK or Android OTA install.

## Follow-up work

- QA and repairs from Windows logs/screenshots; keyboard/mouse controls where necessary.
- Windows auto-updates with separate installer manifest, signing and rollback.
- Desktop icon, automated smoke tests, file import/export dialog UX.
- Release management and tested Windows installers.
