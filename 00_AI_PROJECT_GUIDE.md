# DnD VTT — AI Project Guide

Current lightweight project baseline: V70.25.61.

The repository intentionally excludes large wallpaper/ambience media from the lightweight audit/update bundle. Those verified assets are restored unchanged for final APK packaging.

## Remote updates
- Browser layer: app/update_manager.js
- Manifest generator: tools/build_update_manifest.py
- Native Android layer must perform final atomic replacement and rollback.
- SHA-256 verifies integrity; it is not a publisher signature.
- Before public release, add detached digital signature verification.
