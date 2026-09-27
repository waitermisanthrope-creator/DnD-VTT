# DND VTT Android shell

Native Android shell scaffold for the WebView application and future file-level updater.

The web application remains in the repository root. The Android build should copy `index.html`, `app/**`, and runtime media into generated APK assets instead of duplicating source files.

Target architecture: stable WebView origin + app-private versioned webroot + atomic active-version switch + rollback.
