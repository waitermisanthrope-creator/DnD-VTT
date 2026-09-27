# Network / APK notes

The web application is transport-adapter ready. Android native code is expected to expose a DndLanBridge for LAN discovery/transport and a DndUpdater for staged update application.

The native updater must preserve user data, verify the staged payload, atomically switch versions, and retain a rollback path.
