package com.dndvtt.app;

import android.content.Context;
import android.app.Activity;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.content.SharedPreferences;
import androidx.webkit.JavaScriptReplyProxy;
import org.json.JSONArray;
import org.json.JSONObject;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.MessageDigest;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public final class DndUpdateBridge {
    private final Context context;
    private final Activity activity;
    private final ExecutorService executor = Executors.newSingleThreadExecutor();

    public DndUpdateBridge(Activity activity) {
        this.activity = activity;
        this.context = activity.getApplicationContext();
    }

    public void handle(String raw, JavaScriptReplyProxy reply) {
        try {
            JSONObject request = new JSONObject(raw);
            String id = request.optString("id", "");
            String type = request.optString("type", "");
            // Accept the launcher-icon request under all names used by older/newer web assets.
            if (type.isEmpty()) type = request.optString("action", "");
            if (type.isEmpty()) type = request.optString("request", "");
            if ("setIcon".equals(type) || "set_icon".equals(type) || "launcher-icon".equals(type)) {
                type = "set-icon";
            }
            Log.d("DndUpdateBridge", "request id=" + id + " type=" + type + " raw=" + raw);
            if ("version".equals(type)) {
                postReply(reply, response(id, true, "version", getActiveVersion()));
            } else if ("stage".equals(type)) {
                String manifestUrl = request.optString("manifestUrl", "");
                executor.execute(() -> stage(id, manifestUrl, reply));
            } else if ("apply".equals(type)) {
                executor.execute(() -> apply(id, reply));
            } else if ("rollback".equals(type)) {
                executor.execute(() -> rollbackPending(id, reply));
            } else if ("set-icon".equals(type)) {
                String iconId = request.optString("iconId", "default");
                executor.execute(() -> setLauncherIcon(id, iconId, reply));
            } else if ("storage".equals(type)) {
                executor.execute(() -> postReply(reply, storageResponse(id)));
            } else {
                Log.e("DndUpdateBridge", "Unknown request: " + raw);
                postReply(reply, response(id, false, "unknown-request", "type=" + type));
            }
        } catch (Exception e) {
            postReply(reply, response("", false, "invalid-request", e.toString()));
        }
    }

    private void stage(String id, String manifestUrl, JavaScriptReplyProxy reply) {
        File stageRoot = null;
        try {
            if (!manifestUrl.startsWith("https://")) throw new Exception("HTTPS manifest required");
            JSONObject manifest = new JSONObject(readUrl(manifestUrl));
            String version = manifest.getString("version");
            JSONArray files = manifest.getJSONArray("files");
            final int totalFiles = files.length();
            long totalBytes = 0L;
            for (int ti = 0; ti < totalFiles; ti++) totalBytes += Math.max(0L, files.getJSONObject(ti).optLong("bytes", 0L));
            long downloadedBytes = 0L;
            String baseUrl = manifest.optString("baseUrl", "");
            File root = new File(context.getFilesDir(), "vtt-updates");
            deleteRecursive(root);
            if (!root.mkdirs() && !root.isDirectory()) throw new Exception("Cannot create update directory");
            stageRoot = new File(root, version);
            deleteRecursive(stageRoot);
            if (!stageRoot.mkdirs()) throw new Exception("Cannot create staging directory");

            for (int i = 0; i < files.length(); i++) {
                JSONObject entry = files.getJSONObject(i);
                String path = entry.getString("path");
                validatePath(path);
                String expectedHash = entry.getString("sha256");
                long expectedBytes = entry.optLong("bytes", -1);
                File activeFile = new File(new File(context.getFilesDir(), "vtt-versions/" + getActiveVersion()), path);
                File target = new File(stageRoot, path);
                File parent = target.getParentFile();
                if (!parent.mkdirs() && !parent.isDirectory()) throw new Exception("Cannot create target directory");

                // Do not redownload files already present in the active version.
                // Compare the actual local SHA-256 with the manifest before touching GitHub.
                if (activeFile.isFile() && expectedHash.equalsIgnoreCase(sha256(activeFile))) {
                    if (expectedBytes >= 0 && activeFile.length() != expectedBytes) {
                        throw new Exception("Local size mismatch: " + path);
                    }
                    downloadedBytes += Math.max(0L, activeFile.length());
                    postProgress(reply, id, "skip", i + 1, totalFiles, path, downloadedBytes, totalBytes);
                    copyFile(activeFile, target);
                    continue;
                }

                postProgress(reply, id, "download", i + 1, totalFiles, path, downloadedBytes, totalBytes);
                String url = entry.optString("url", "");
                if (url.isEmpty()) url = baseUrl.replaceAll("/+$", "") + "/" + path;
                if (!url.startsWith("https://")) throw new Exception("HTTPS update file required");
                // Raw GitHub/CDN can briefly serve a stale cached file after the manifest changes.
                // Key each request by the expected content hash so bytes and manifest cannot drift.
                String cacheKey = "dndvtt_update=" + version + "-" + expectedHash;
                url += (url.contains("?") ? "&" : "?") + cacheKey;
                byte[] data = readBytesWithProgress(url, reply, id, i + 1, totalFiles, path, downloadedBytes, totalBytes);
                if (expectedBytes >= 0 && expectedBytes != data.length) throw new Exception("Size mismatch: " + path);
                downloadedBytes += data.length;
                postProgress(reply, id, "download", i + 1, totalFiles, path, downloadedBytes, totalBytes);
                if (!expectedHash.equalsIgnoreCase(sha256(data))) throw new Exception("SHA-256 mismatch: " + path);
                try (FileOutputStream out = new FileOutputStream(target)) {
                    out.write(data);
                }
            }

            try (FileOutputStream out = new FileOutputStream(new File(stageRoot, "manifest.json"))) {
                out.write(manifest.toString().getBytes("UTF-8"));
            }
            postReply(reply, response(id, true, "staged", version));
        } catch (Exception e) {
            if (stageRoot != null) deleteRecursive(stageRoot);
            postReply(reply, response(id, false, "stage-failed", e.toString()));
        }
    }

    private void apply(String id, JavaScriptReplyProxy reply) {
        try {
            File updateRoot = new File(context.getFilesDir(), "vtt-updates");
            File[] candidates = updateRoot.listFiles(File::isDirectory);
            if (candidates == null || candidates.length == 0) throw new Exception("No staged update");
            File staged = candidates[candidates.length - 1];
            JSONObject manifest = new JSONObject(readFile(new File(staged, "manifest.json")));
            String version = manifest.getString("version");
            validateVersion(version);

            File versions = new File(context.getFilesDir(), "vtt-versions");
            if (!versions.exists() && !versions.mkdirs()) throw new Exception("Cannot create versions directory");

            File active = new File(versions, getActiveVersion());
            File next = new File(versions, version);
            deleteRecursive(next);

            // The staged tree is already a complete, hash-verified web version.
            // Promote it atomically instead of copying the whole active version again.
            // This keeps peak storage around 2x the web payload instead of 3x+.
            postProgress(reply, id, "apply", 0, 1, "Переключение версии");
            if (!staged.renameTo(next)) {
                throw new Exception("Cannot promote staged update without copying; update aborted to protect storage");
            }

            SharedPreferences prefs = context.getSharedPreferences("dnd_vtt_update", Context.MODE_PRIVATE);
            String previous = prefs.getString("active", "");
            prefs.edit().putString("previous", previous).putString("active", version).putString("pending", version).commit();

            postReply(reply, response(id, true, "applied", version));
            new Handler(Looper.getMainLooper()).postDelayed(activity::recreate, 500);
        } catch (Exception e) {
            postReply(reply, response(id, false, "apply-failed", e.toString()));
        }
    }

    private void cleanupVersionStorage(boolean keepPrevious) {
        try {
            File versions = new File(context.getFilesDir(), "vtt-versions");
            if (!versions.isDirectory()) return;
            SharedPreferences prefs = context.getSharedPreferences("dnd_vtt_update", Context.MODE_PRIVATE);
            String active = prefs.getString("active", getPackageVersion());
            String previous = keepPrevious ? prefs.getString("previous", "") : "";
            File[] dirs = versions.listFiles(File::isDirectory);
            if (dirs == null) return;
            for (File dir : dirs) {
                String name = dir.getName();
                if (name.equals(active) || (keepPrevious && name.equals(previous))) continue;
                deleteRecursive(dir);
            }
        } catch (Exception e) {
            Log.w("DndUpdateBridge", "Version cleanup failed", e);
        }
    }

    private void cleanupStagingStorage() {
        try {
            File updateRoot = new File(context.getFilesDir(), "vtt-updates");
            File[] dirs = updateRoot.listFiles(File::isDirectory);
            if (dirs != null) for (File dir : dirs) deleteRecursive(dir);
        } catch (Exception e) {
            Log.w("DndUpdateBridge", "Staging cleanup failed", e);
        }
    }

    private static long directorySize(File root) {
        if (root == null || !root.exists()) return 0L;
        if (root.isFile()) return root.length();
        long total = 0L;
        File[] children = root.listFiles();
        if (children != null) {
            for (File child : children) total += directorySize(child);
        }
        return total;
    }

    private static long[] apkSize(Context context) {
        long total = 0L;
        try {
            android.content.pm.ApplicationInfo info = context.getApplicationInfo();
            if (info.sourceDir != null) total += new File(info.sourceDir).length();
            if (info.splitSourceDirs != null) {
                for (String split : info.splitSourceDirs) if (split != null) total += new File(split).length();
            }
        } catch (Exception ignored) {}
        return new long[]{total};
    }

    private static String formatBytes(long bytes) {
        if (bytes < 1024L) return bytes + " Б";
        double value = bytes;
        String[] units = {"КБ", "МБ", "ГБ", "ТБ"};
        int unit = -1;
        while (value >= 1024.0 && unit < units.length - 1) {
            value /= 1024.0;
            unit++;
        }
        return String.format(java.util.Locale.ROOT, "%.2f %s", value, units[unit]);
    }

    private String storageResponse(String id) {
        JSONObject out = new JSONObject();
        try {
            File dataRoot = context.getDataDir();
            File files = context.getFilesDir();
            File cache = context.getCacheDir();
            File noBackup = context.getNoBackupFilesDir();
            File codeCache = context.getCodeCacheDir();
            File updateRoot = new File(files, "vtt-updates");
            File versions = new File(files, "vtt-versions");

            long apkBytes = apkSize(context)[0];
            long cacheBytes = safeDirectorySize(cache);
            long filesBytes = safeDirectorySize(files);
            long noBackupBytes = safeDirectorySize(noBackup);
            long codeCacheBytes = safeDirectorySize(codeCache);
            long dataBytes = safeDirectorySize(dataRoot);
            long updateBytes = safeDirectorySize(updateRoot);
            long versionsBytes = safeDirectorySize(versions);
            long totalBytes = apkBytes + dataBytes;

            out.put("id", id);
            out.put("ok", true);
            out.put("status", "storage");
            out.put("apkBytes", apkBytes);
            out.put("dataBytes", dataBytes);
            out.put("filesBytes", filesBytes);
            out.put("cacheBytes", cacheBytes);
            out.put("noBackupBytes", noBackupBytes);
            out.put("codeCacheBytes", codeCacheBytes);
            out.put("updateBytes", updateBytes);
            out.put("versionsBytes", versionsBytes);
            out.put("totalBytes", totalBytes);
            out.put("apkText", formatBytes(apkBytes));
            out.put("dataText", formatBytes(dataBytes));
            out.put("filesText", formatBytes(filesBytes));
            out.put("cacheText", formatBytes(cacheBytes));
            out.put("noBackupText", formatBytes(noBackupBytes));
            out.put("codeCacheText", formatBytes(codeCacheBytes));
            out.put("updateText", formatBytes(updateBytes));
            out.put("versionsText", formatBytes(versionsBytes));
            out.put("freeBytes", dataRoot.getUsableSpace());
            out.put("freeText", formatBytes(dataRoot.getUsableSpace()));
            out.put("activeVersion", getActiveVersion());
        } catch (Exception e) {
            try {
                out.put("id", id);
                out.put("ok", false);
                out.put("status", "storage-failed");
                out.put("value", e.getClass().getSimpleName() + ": " + String.valueOf(e.getMessage()));
            } catch (Exception ignored) {}
        }
        return out.toString();
    }

    private static long safeDirectorySize(File root) {
        if (root == null || !root.exists()) return 0L;
        long total = 0L;
        java.util.ArrayDeque<File> stack = new java.util.ArrayDeque<>();
        java.util.HashSet<String> visited = new java.util.HashSet<>();
        stack.push(root);
        while (!stack.isEmpty()) {
            File file = stack.pop();
            try {
                String canonical = file.getCanonicalPath();
                if (!visited.add(canonical)) continue;
                if (file.isFile()) {
                    total += Math.max(0L, file.length());
                    continue;
                }
                File[] children = file.listFiles();
                if (children == null) continue;
                for (File child : children) {
                    if (child != null) stack.push(child);
                }
            } catch (Exception ignored) {}
        }
        return total;
    }

    private static void validateVersion(String version) throws Exception {
        if (version == null || version.isEmpty() || !version.matches("[0-9]+\\.[0-9]+\\.[0-9]+")) {
            throw new Exception("Unsafe update version: " + version);
        }
    }

    private String getPackageVersion() {
        try {
            android.content.pm.PackageInfo info = context.getPackageManager().getPackageInfo(context.getPackageName(), 0);
            return info.versionName == null ? "0" : info.versionName;
        } catch (Exception e) {
            return "0";
        }
    }

    private static int compareVersions(String a, String b) {
        String[] aa = String.valueOf(a == null ? "0" : a).replaceFirst("^v", "").split("\\.");
        String[] bb = String.valueOf(b == null ? "0" : b).replaceFirst("^v", "").split("\\.");
        int len = Math.max(aa.length, bb.length);
        for (int i = 0; i < len; i++) {
            int av = 0, bv = 0;
            try { av = i < aa.length ? Integer.parseInt(aa[i]) : 0; } catch (Exception ignored) {}
            try { bv = i < bb.length ? Integer.parseInt(bb[i]) : 0; } catch (Exception ignored) {}
            if (av != bv) return av > bv ? 1 : -1;
        }
        return 0;
    }

    public String getActiveVersion() {
        SharedPreferences prefs = context.getSharedPreferences("dnd_vtt_update", Context.MODE_PRIVATE);
        return prefs.getString("active", getPackageVersion());
    }

    public boolean hasPendingUpdate() {
        SharedPreferences prefs = context.getSharedPreferences("dnd_vtt_update", Context.MODE_PRIVATE);
        String pending = prefs.getString("pending", "");
        String active = prefs.getString("active", "");
        return !pending.isEmpty() && pending.equals(active);
    }

    /**
     * Revert a newly promoted web version when the recreated WebView cannot
     * prove that the application booted. The failed version is deliberately
     * left on disk until the next healthy startup, where normal cleanup removes
     * obsolete versions.
     */
    public void rollbackPending() {
        try {
            SharedPreferences prefs = context.getSharedPreferences("dnd_vtt_update", Context.MODE_PRIVATE);
            String pending = prefs.getString("pending", "");
            String previous = prefs.getString("previous", "");
            String active = prefs.getString("active", "");
            if (pending.isEmpty() || !pending.equals(active) || previous.isEmpty()) {
                Log.w("DndUpdateBridge", "Rollback skipped: no valid pending update");
                return;
            }
            File previousDir = new File(new File(context.getFilesDir(), "vtt-versions"), previous);
            if (!previousDir.isDirectory()) {
                Log.e("DndUpdateBridge", "Rollback failed: previous version missing: " + previous);
                return;
            }
            prefs.edit()
                    .putString("active", previous)
                    .remove("pending")
                    .remove("previous")
                    .commit();
            cleanupStagingStorage();
            new Handler(Looper.getMainLooper()).postDelayed(activity::recreate, 150);
        } catch (Exception e) {
            Log.e("DndUpdateBridge", "Rollback failed", e);
        }
    }

    private void rollbackPending(String id, JavaScriptReplyProxy reply) {
        try {
            rollbackPending();
            postReply(reply, response(id, true, "rolled-back", getActiveVersion()));
        } catch (Exception e) {
            postReply(reply, response(id, false, "rollback-failed", e.toString()));
        }
    }

    /** Ensure icon preview assets exist in the active web root even when that root was created by an older web update. */
    private void ensureIconPreviewAssets(File activeRoot) throws Exception {
        File previewRoot = new File(activeRoot, "icon_previews");
        File defaultFile = new File(previewRoot, "default.png");
        if (!previewRoot.isDirectory() || !defaultFile.isFile()) {
            copyAssetTree("icon_previews", activeRoot);
            return;
        }
        for (int i = 1; i <= 30; i++) {
            File f = new File(previewRoot, String.format(java.util.Locale.ROOT, "dice_%02d.png", i));
            if (!f.isFile() || f.length() <= 0) {
                copyAssetTree("icon_previews", activeRoot);
                return;
            }
        }
    }

    public void ensureSeeded() throws Exception {
        SharedPreferences prefs = context.getSharedPreferences("dnd_vtt_update", Context.MODE_PRIVATE);
        File versions = new File(context.getFilesDir(), "vtt-versions");
        String packageVersion = getPackageVersion();
        String activeVersion = getActiveVersion();
        File active = new File(versions, activeVersion);

        // Remove abandoned staging data and all obsolete web versions.
        // Keep only the active version and, while a rollout is pending, the rollback version.
        cleanupStagingStorage();
        boolean keepPrevious = prefs.getString("pending", "").length() > 0;
        cleanupVersionStorage(keepPrevious);

        // A new native APK must get one clean seed from its own bundled web assets.
        // This is especially important when an older APK already promoted a broken
        // web update with the same version name: the old native bridge cannot perform
        // the new boot-health rollback. Once this package version has seeded and booted
        // successfully, the marker prevents needless reseeding on normal launches.
        boolean nativeSeedValidated = packageVersion.equals(
                prefs.getString("nativeSeedValidated", ""));
        if (active.isDirectory() && new File(active, "index.html").isFile()
                && compareVersions(activeVersion, packageVersion) >= 0
                && nativeSeedValidated) {
            ensureIconPreviewAssets(active);
            return;
        }

        if (active.isDirectory()) deleteRecursive(active);
        active = new File(versions, packageVersion);
        deleteRecursive(active);
        if (!active.mkdirs()) throw new Exception("Cannot create active version");
        copyAssetTree("index.html", active);
        copyAssetTree("app", active);
        copyRootImageAssets(active);
        copyAssetTree("icon_previews", active);
        copyAssetTree("wallpapers", active);
        copyAssetTree("ambience", active);
        prefs.edit()
                .putString("active", packageVersion)
                .putString("healthy", packageVersion)
                .putString("nativeSeedValidated", packageVersion)
                .commit();
    }

    public void setLauncherIcon(String id, String iconId, JavaScriptReplyProxy reply) {
        try {
            Log.d("DndUpdateBridge", "setLauncherIcon iconId=" + iconId);
            if (!"default".equals(iconId) && !iconId.matches("dice_\\d{2}")) {
                throw new Exception("Unknown launcher icon: " + iconId);
            }
            android.content.pm.PackageManager pm = context.getPackageManager();
            String[] aliases = new String[31];
            aliases[0] = "com.dndvtt.app.LauncherDefault";
            for (int i = 1; i <= 30; i++) {
                aliases[i] = "com.dndvtt.app.LauncherDice" + String.format(java.util.Locale.ROOT, "%02d", i);
            }

            int selectedIndex = 0;
            if (!"default".equals(iconId)) {
                selectedIndex = Integer.parseInt(iconId.substring("dice_".length()));
            }

            for (int i = 0; i < aliases.length; i++) {
                android.content.ComponentName component = new android.content.ComponentName(context, aliases[i]);
                int state = (i == selectedIndex)
                        ? android.content.pm.PackageManager.COMPONENT_ENABLED_STATE_ENABLED
                        : android.content.pm.PackageManager.COMPONENT_ENABLED_STATE_DISABLED;
                pm.setComponentEnabledSetting(
                        component,
                        state,
                        android.content.pm.PackageManager.DONT_KILL_APP
                );
            }

            context.getSharedPreferences("dnd_vtt_icon", Context.MODE_PRIVATE)
                    .edit().putString("selected", iconId).apply();

            postReply(reply, response(id, true, "icon-applied", iconId));
        } catch (Exception e) {
            postReply(reply, response(id, false, "icon-failed", e.toString()));
        }
    }

    public String setLauncherIconFromJs(String iconId) {
        try {
            Log.d("DndUpdateBridge", "direct JS setLauncherIcon iconId=" + iconId);
            if (iconId == null || (!"default".equals(iconId) && !iconId.matches("dice_\\d{2}"))) {
                return "ERROR:Unknown launcher icon: " + iconId;
            }
            android.content.pm.PackageManager pm = context.getPackageManager();
            for (int i = 0; i <= 30; i++) {
                String name = i == 0
                        ? "com.dndvtt.app.LauncherDefault"
                        : "com.dndvtt.app.LauncherDice" + String.format(java.util.Locale.ROOT, "%02d", i);
                boolean enabled = (i == 0 && "default".equals(iconId))
                        || (i > 0 && iconId.equals("dice_" + String.format(java.util.Locale.ROOT, "%02d", i)));
                pm.setComponentEnabledSetting(
                        new android.content.ComponentName(context, name),
                        enabled
                                ? android.content.pm.PackageManager.COMPONENT_ENABLED_STATE_ENABLED
                                : android.content.pm.PackageManager.COMPONENT_ENABLED_STATE_DISABLED,
                        android.content.pm.PackageManager.DONT_KILL_APP
                );
            }
            context.getSharedPreferences("dnd_vtt_icon", Context.MODE_PRIVATE)
                    .edit().putString("selected", iconId).commit();
            return "OK";
        } catch (Exception e) {
            Log.e("DndUpdateBridge", "direct launcher icon change failed", e);
            return "ERROR:" + e.toString();
        }
    }

    public void ensureLauncherIcon() throws Exception {
        SharedPreferences prefs = context.getSharedPreferences("dnd_vtt_icon", Context.MODE_PRIVATE);
        String selected = prefs.getString("selected", "default");
        if (!"default".equals(selected) && !selected.matches("dice_\\d{2}")) selected = "default";

        android.content.pm.PackageManager pm = context.getPackageManager();
        for (int i = 0; i <= 30; i++) {
            String name = i == 0
                    ? "com.dndvtt.app.LauncherDefault"
                    : "com.dndvtt.app.LauncherDice" + String.format(java.util.Locale.ROOT, "%02d", i);
            boolean enabled = (i == 0 && "default".equals(selected))
                    || (i > 0 && selected.equals("dice_" + String.format(java.util.Locale.ROOT, "%02d", i)));
            pm.setComponentEnabledSetting(
                    new android.content.ComponentName(context, name),
                    enabled
                            ? android.content.pm.PackageManager.COMPONENT_ENABLED_STATE_ENABLED
                            : android.content.pm.PackageManager.COMPONENT_ENABLED_STATE_DISABLED,
                    android.content.pm.PackageManager.DONT_KILL_APP
            );
        }
        prefs.edit().putString("selected", selected).apply();
    }

    public void markHealthy() {
        String active = getActiveVersion();
        context.getSharedPreferences("dnd_vtt_update", Context.MODE_PRIVATE)
                .edit().putString("healthy", active).remove("pending").commit();
        cleanupVersionStorage(false);
        cleanupStagingStorage();
    }

    private void copyRootImageAssets(File targetRoot) throws Exception {
        String[] rootEntries = context.getAssets().list("");
        if (rootEntries == null) return;
        for (String name : rootEntries) {
            String lower = name.toLowerCase(java.util.Locale.ROOT);
            if (!lower.endsWith(".png") && !lower.endsWith(".jpg") && !lower.endsWith(".jpeg")) continue;
            File target = new File(targetRoot, name);
            try (InputStream in = context.getAssets().open(name); FileOutputStream out = new FileOutputStream(target)) {
                byte[] buf = new byte[8192]; int n;
                while ((n = in.read(buf)) >= 0) out.write(buf, 0, n);
            }
        }
    }

    private void copyAssetTree(String path, File targetRoot) throws Exception {
        String[] children = context.getAssets().list(path);
        File target = new File(targetRoot, path);
        if (children == null || children.length == 0) {
            File parent = target.getParentFile();
            if (!parent.mkdirs() && !parent.isDirectory()) throw new Exception("Cannot create asset directory");
            try (InputStream in = context.getAssets().open(path); FileOutputStream out = new FileOutputStream(target)) {
                byte[] buf = new byte[8192]; int n;
                while ((n = in.read(buf)) >= 0) out.write(buf, 0, n);
            }
            return;
        }
        if (!target.mkdirs() && !target.isDirectory()) throw new Exception("Cannot create asset directory");
        for (String child : children) copyAssetTree(path + "/" + child, targetRoot);
    }

    private static String readUrl(String url) throws Exception { return new String(readBytes(url), "UTF-8"); }

    private static byte[] readBytes(String url) throws Exception {
        HttpURLConnection c = (HttpURLConnection) new URL(url).openConnection();
        c.setConnectTimeout(15000); c.setReadTimeout(60000); c.setUseCaches(false);
        if (c.getResponseCode() < 200 || c.getResponseCode() >= 300) throw new IOException("HTTP " + c.getResponseCode());
        try (InputStream in = c.getInputStream(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            byte[] buf = new byte[16384]; int n;
            while ((n = in.read(buf)) >= 0) out.write(buf, 0, n);
            return out.toByteArray();
        } finally { c.disconnect(); }
    }

    private static byte[] readBytesWithProgress(
            String url,
            JavaScriptReplyProxy reply,
            String id,
            int current,
            int total,
            String path,
            long downloadedBefore,
            long totalBytes) throws Exception {
        HttpURLConnection c = (HttpURLConnection) new URL(url).openConnection();
        c.setConnectTimeout(15000);
        c.setReadTimeout(60000);
        c.setUseCaches(false);
        if (c.getResponseCode() < 200 || c.getResponseCode() >= 300) {
            throw new IOException("HTTP " + c.getResponseCode());
        }
        long received = 0L;
        try (InputStream in = c.getInputStream(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            byte[] buf = new byte[16384];
            int n;
            while ((n = in.read(buf)) >= 0) {
                if (n == 0) continue;
                out.write(buf, 0, n);
                received += n;
                postProgress(reply, id, "download", current, total, path, downloadedBefore + received, totalBytes);
            }
            return out.toByteArray();
        } finally {
            c.disconnect();
        }
    }

    private static String sha256(File file) throws Exception {
        try (InputStream in = new FileInputStream(file)) {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] buf = new byte[16384]; int n;
            while ((n = in.read(buf)) >= 0) digest.update(buf, 0, n);
            byte[] bytes = digest.digest();
            StringBuilder s = new StringBuilder();
            for (byte b : bytes) s.append(String.format("%02x", b & 0xff));
            return s.toString();
        }
    }

    private static String sha256(byte[] data) throws Exception {
        byte[] digest = MessageDigest.getInstance("SHA-256").digest(data);
        StringBuilder s = new StringBuilder();
        for (byte b : digest) s.append(String.format("%02x", b & 0xff));
        return s.toString();
    }

    private static void validatePath(String path) throws Exception {
        if (path.isEmpty() || path.startsWith("/") || path.contains("..")) throw new Exception("Unsafe update path: " + path);
    }

    private static void postProgress(JavaScriptReplyProxy reply, String id, String phase, int current, int total, String path) {
        postProgress(reply, id, phase, current, total, path, -1L, -1L);
    }

    private static void postProgress(JavaScriptReplyProxy reply, String id, String phase, int current, int total, String path, long bytesDone, long bytesTotal) {
        JSONObject o = new JSONObject();
        try {
            o.put("id", id);
            o.put("ok", true);
            o.put("status", "progress");
            o.put("phase", phase);
            o.put("current", current);
            o.put("total", total);
            o.put("path", path);
            if (bytesDone >= 0) o.put("bytesDone", bytesDone);
            if (bytesTotal >= 0) o.put("bytesTotal", bytesTotal);
        } catch (Exception ignored) {}
        postReply(reply, o.toString());
    }

    private static void postReply(JavaScriptReplyProxy reply, String message) {
        new Handler(Looper.getMainLooper()).post(() -> reply.postMessage(message));
    }

    private static String response(String id, boolean ok, String status, String value) {
        JSONObject o = new JSONObject();
        try {
            o.put("id", id); o.put("ok", ok); o.put("status", status);
            if (value != null) o.put("value", value);
        } catch (Exception ignored) {}
        return o.toString();
    }

    private static String readFile(File file) throws Exception {
        try (FileInputStream in = new FileInputStream(file); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            byte[] buf = new byte[8192]; int n;
            while ((n = in.read(buf)) >= 0) out.write(buf, 0, n);
            return out.toString("UTF-8");
        }
    }

    private static void copyFile(File src, File dst) throws Exception {
        try (InputStream in = new FileInputStream(src); OutputStream out = new FileOutputStream(dst)) {
            byte[] buf = new byte[16384]; int n;
            while ((n = in.read(buf)) >= 0) out.write(buf, 0, n);
        }
    }

    private static void copyRecursive(File src, File dst) throws Exception {
        if (src == null || !src.exists()) throw new Exception("Missing active version");
        if (src.isDirectory()) {
            if (!dst.exists() && !dst.mkdirs()) throw new Exception("Cannot create directory");
            File[] children = src.listFiles();
            if (children != null) for (File child : children) copyRecursive(child, new File(dst, child.getName()));
        } else copyFile(src, dst);
    }

    private static void deleteRecursive(File f) {
        if (f == null || !f.exists()) return;
        if (f.isDirectory()) {
            File[] children = f.listFiles();
            if (children != null) for (File child : children) deleteRecursive(child);
        }
        f.delete();
    }
}
