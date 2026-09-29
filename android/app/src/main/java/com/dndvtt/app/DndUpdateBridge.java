package com.dndvtt.app;

import android.content.Context;
import android.app.Activity;
import android.os.Handler;
import android.os.Looper;
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
            if ("version".equals(type)) {
                postReply(reply, response(id, true, "version", getActiveVersion()));
            } else if ("stage".equals(type)) {
                String manifestUrl = request.optString("manifestUrl", "");
                executor.execute(() -> stage(id, manifestUrl, reply));
            } else if ("apply".equals(type)) {
                executor.execute(() -> apply(id, reply));
            } else {
                postReply(reply, response(id, false, "unknown-request", null));
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
                    postProgress(reply, id, "skip", i + 1, totalFiles, path);
                    copyFile(activeFile, target);
                    continue;
                }

                postProgress(reply, id, "download", i + 1, totalFiles, path);
                String url = entry.optString("url", "");
                if (url.isEmpty()) url = baseUrl.replaceAll("/+$", "") + "/" + path;
                if (!url.startsWith("https://")) throw new Exception("HTTPS update file required");
                byte[] data = readBytes(url);
                if (expectedBytes >= 0 && expectedBytes != data.length) throw new Exception("Size mismatch: " + path);
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
            File versions = new File(context.getFilesDir(), "vtt-versions");
            File active = new File(versions, getActiveVersion());
            File next = new File(versions, version);
            deleteRecursive(next);
            copyRecursive(active, next);
            JSONArray files = manifest.getJSONArray("files");
            for (int i = 0; i < files.length(); i++) {
                String path = files.getJSONObject(i).getString("path");
                postProgress(reply, id, "apply", i + 1, files.length(), path);
                validatePath(path);
                File src = new File(staged, path);
                File dst = new File(next, path);
                File parent = dst.getParentFile();
                if (!parent.mkdirs() && !parent.isDirectory()) throw new Exception("Cannot create update directory");
                copyFile(src, dst);
            }
            SharedPreferences prefs = context.getSharedPreferences("dnd_vtt_update", Context.MODE_PRIVATE);
            String previous = prefs.getString("active", "");
            prefs.edit().putString("previous", previous).putString("active", version).putString("pending", version).commit();
            deleteRecursive(staged);
            postReply(reply, response(id, true, "applied", version));
            new Handler(Looper.getMainLooper()).postDelayed(activity::recreate, 500);
        } catch (Exception e) {
            postReply(reply, response(id, false, "apply-failed", e.toString()));
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

    public String getActiveVersion() {
        SharedPreferences prefs = context.getSharedPreferences("dnd_vtt_update", Context.MODE_PRIVATE);
        return prefs.getString("active", getPackageVersion());
    }

    public void ensureSeeded() throws Exception {
        SharedPreferences prefs = context.getSharedPreferences("dnd_vtt_update", Context.MODE_PRIVATE);
        File versions = new File(context.getFilesDir(), "vtt-versions");
        File active = new File(versions, getActiveVersion());
        if (active.isDirectory() && new File(active, "index.html").isFile()) return;
        deleteRecursive(active);
        if (!active.mkdirs()) throw new Exception("Cannot create active version");
        copyAssetTree("index.html", active);
        copyAssetTree("app", active);
        copyAssetTree("wallpapers", active);
        copyAssetTree("ambience", active);
        prefs.edit().putString("active", getPackageVersion()).putString("healthy", getPackageVersion()).commit();
    }

    public void markHealthy() {
        String active = getActiveVersion();
        context.getSharedPreferences("dnd_vtt_update", Context.MODE_PRIVATE)
                .edit().putString("healthy", active).remove("pending").commit();
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
        JSONObject o = new JSONObject();
        try {
            o.put("id", id);
            o.put("ok", true);
            o.put("status", "progress");
            o.put("phase", phase);
            o.put("current", current);
            o.put("total", total);
            o.put("path", path);
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
