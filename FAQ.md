# DnD VTT — FAQ / project map

## Core
- index.html — application entry point and script loading order.
- app/ — production JavaScript and data.
- tests/ — regression tests.
- tools/ — maintenance/build/update tools.
- docs/ — architecture and Android/native notes.

## Updating
- app/update_manager.js — checks a remote manifest, validates compatibility, downloads files and verifies SHA-256, then hands the staged update to the native updater.
- tools/build_update_manifest.py — creates a static HTTPS update manifest from index.html + app/**.
- Native DndUpdater.applyStagedUpdate — required for real APK-side atomic replacement/rollback.

Heavy wallpapers and ambience assets are deliberately outside this lightweight repository transfer.
