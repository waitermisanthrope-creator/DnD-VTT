# DND VTT Android shell

Native Android shell scaffold for the WebView application and future file-level updater.

The web application remains in the repository root. The Android build should copy `index.html`, `app/**`, and runtime media into generated APK assets instead of duplicating source files.

Target architecture: stable WebView origin + app-private versioned webroot + atomic active-version switch + rollback.


The native updater now stages HTTPS manifest payloads, verifies file sizes and SHA-256, writes a new version under app-private storage, and switches the active webroot without clearing WebView user data. The previous version remains available for rollback work.
