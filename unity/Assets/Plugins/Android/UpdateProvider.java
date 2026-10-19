package com.dndvtt.unityupdater;

import android.app.Activity;
import android.content.*;
import android.content.pm.*;
import android.database.Cursor;
import android.database.MatrixCursor;
import android.net.Uri;
import android.os.*;
import android.provider.OpenableColumns;
import android.provider.Settings;
import java.io.*;
import java.util.*;

/** Read-only, grant-only access to the single verified updater cache directory. */
public class UpdateProvider extends ContentProvider {
    @Override public boolean onCreate() { return true; }
    private File file(Uri uri) throws FileNotFoundException {
        try {
            String name = uri.getLastPathSegment();
            if (name == null || !name.matches("UnityUpdate-[0-9]+\\.apk")) throw new IOException("Invalid update name");
            File root = new File(getContext().getCacheDir(), "updates").getCanonicalFile();
            File file = new File(root, name).getCanonicalFile();
            if (!file.getParentFile().equals(root) || !file.isFile()) throw new IOException("Invalid update file");
            return file;
        } catch (IOException e) { throw new FileNotFoundException(e.getMessage()); }
    }
    @Override public ParcelFileDescriptor openFile(Uri uri, String mode) throws FileNotFoundException {
        if (!"r".equals(mode)) throw new FileNotFoundException("Read only");
        return ParcelFileDescriptor.open(file(uri), ParcelFileDescriptor.MODE_READ_ONLY);
    }
    @Override public String getType(Uri uri) { return "application/vnd.android.package-archive"; }
    @Override public Cursor query(Uri uri, String[] projection, String selection, String[] args, String sort) {
        try { File f = file(uri); MatrixCursor c = new MatrixCursor(new String[]{OpenableColumns.DISPLAY_NAME, OpenableColumns.SIZE}); c.addRow(new Object[]{f.getName(), f.length()}); return c; }
        catch (FileNotFoundException e) { return null; }
    }
    @Override public Uri insert(Uri u, ContentValues v) { throw new UnsupportedOperationException(); }
    @Override public int update(Uri u, ContentValues v, String s, String[] a) { throw new UnsupportedOperationException(); }
    @Override public int delete(Uri u, String s, String[] a) { throw new UnsupportedOperationException(); }
    private static Set<String> signatures(PackageInfo p) {
        Signature[] sigs = Build.VERSION.SDK_INT >= 28 ? p.signingInfo.getApkContentsSigners() : p.signatures;
        Set<String> result = new HashSet<>(); for (Signature s : sigs) result.add(s.toCharsString()); return result;
    }
    public static String install(Activity activity, String path) throws Exception {
        File root = new File(activity.getCacheDir(), "updates").getCanonicalFile(), apk = new File(path).getCanonicalFile();
        if (!apk.getParentFile().equals(root) || !apk.getName().matches("UnityUpdate-[0-9]+\\.apk")) throw new IOException("Invalid APK path");
        PackageManager pm = activity.getPackageManager(); int flags = Build.VERSION.SDK_INT >= 28 ? PackageManager.GET_SIGNING_CERTIFICATES : PackageManager.GET_SIGNATURES;
        PackageInfo current = pm.getPackageInfo(activity.getPackageName(), flags), next = pm.getPackageArchiveInfo(apk.getPath(), flags);
        if (next == null || !current.packageName.equals(next.packageName) || !signatures(current).equals(signatures(next))) throw new SecurityException("APK package or signature mismatch");
        long oldCode = Build.VERSION.SDK_INT >= 28 ? current.getLongVersionCode() : current.versionCode;
        long newCode = Build.VERSION.SDK_INT >= 28 ? next.getLongVersionCode() : next.versionCode;
        if (newCode <= oldCode) throw new SecurityException("APK must have a newer versionCode");
        if (!pm.canRequestPackageInstalls()) {
            activity.startActivity(new Intent(Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES, Uri.parse("package:" + activity.getPackageName()))); return "permission";
        }
        Uri uri = new Uri.Builder().scheme("content").authority(activity.getPackageName() + ".updates").appendPath(apk.getName()).build();
        Intent intent = new Intent(Intent.ACTION_VIEW).setDataAndType(uri, "application/vnd.android.package-archive").addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
        activity.startActivity(intent); return "launched";
    }
}
