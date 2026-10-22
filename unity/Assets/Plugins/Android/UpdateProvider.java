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
            boolean picture = uri.getPathSegments().size()==2 && "appearance".equals(uri.getPathSegments().get(0)) && name!=null && name.matches("Appearance-[a-f0-9]{64}\\.png");
            if (!picture && (uri.getPathSegments().size()!=1 || name==null || !name.matches("UnityUpdate-[0-9]+\\.apk"))) throw new IOException("Invalid shared file name");
            File root = new File(getContext().getCacheDir(), picture ? "appearance-exports" : "updates").getCanonicalFile();
            File file = new File(root, name).getCanonicalFile();
            if (!file.getParentFile().equals(root) || !file.isFile()) throw new IOException("Invalid update file");
            return file;
        } catch (IOException e) { throw new FileNotFoundException(e.getMessage()); }
    }
    @Override public ParcelFileDescriptor openFile(Uri uri, String mode) throws FileNotFoundException {
        if (!"r".equals(mode)) throw new FileNotFoundException("Read only");
        return ParcelFileDescriptor.open(file(uri), ParcelFileDescriptor.MODE_READ_ONLY);
    }
    @Override public String getType(Uri uri) { return uri.getPathSegments().size()==2 && "appearance".equals(uri.getPathSegments().get(0)) ? "image/png" : "application/vnd.android.package-archive"; }
    @Override public Cursor query(Uri uri, String[] projection, String selection, String[] args, String sort) {
        try { File f = file(uri); MatrixCursor c = new MatrixCursor(new String[]{OpenableColumns.DISPLAY_NAME, OpenableColumns.SIZE}); c.addRow(new Object[]{f.getName(), f.length()}); return c; }
        catch (FileNotFoundException e) { return null; }
    }
    @Override public Uri insert(Uri u, ContentValues v) { throw new UnsupportedOperationException(); }
    @Override public int update(Uri u, ContentValues v, String s, String[] a) { throw new UnsupportedOperationException(); }
    @Override public int delete(Uri u, String s, String[] a) { throw new UnsupportedOperationException(); }
    public static void sharePicture(Activity activity, String path) throws IOException {
        File root=new File(activity.getCacheDir(),"appearance-exports").getCanonicalFile();
        File png=new File(path).getCanonicalFile();
        if(!png.getParentFile().equals(root)||!png.isFile()||!png.getName().matches("Appearance-[a-f0-9]{64}\\.png"))throw new SecurityException("Invalid image export");
        Uri uri=new Uri.Builder().scheme("content").authority(activity.getPackageName()+".updates").appendPath("appearance").appendPath(png.getName()).build();
        Intent send=new Intent(Intent.ACTION_SEND).setType("image/png").putExtra(Intent.EXTRA_STREAM,uri).addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
        send.setClipData(ClipData.newRawUri("DnD VTT image",uri));
        activity.startActivity(Intent.createChooser(send,"Сохранить или отправить изображение"));
    }
    /** Downloaded icon becomes a user-confirmed launcher shortcut, never an APK component replacement. */
    public static String pinPicture(Activity activity, byte[] png) {
        if(Build.VERSION.SDK_INT<26)return "unsupported";
        ShortcutManager manager=activity.getSystemService(ShortcutManager.class);
        if(manager==null||!manager.isRequestPinShortcutSupported())return "unsupported";
        if(png==null||png.length>4*1024*1024)throw new SecurityException("Invalid icon size");
        android.graphics.BitmapFactory.Options bounds=new android.graphics.BitmapFactory.Options();bounds.inJustDecodeBounds=true;
        android.graphics.BitmapFactory.decodeByteArray(png,0,png.length,bounds);
        if(bounds.outWidth<1||bounds.outHeight<1||bounds.outWidth>2048||bounds.outHeight>2048)throw new SecurityException("Invalid icon dimensions");
        android.graphics.BitmapFactory.Options options=new android.graphics.BitmapFactory.Options();options.inSampleSize=1;
        while(Math.max(bounds.outWidth,bounds.outHeight)/options.inSampleSize>256)options.inSampleSize*=2;
        android.graphics.Bitmap bitmap=android.graphics.BitmapFactory.decodeByteArray(png,0,png.length,options);
        if(bitmap==null)throw new SecurityException("Invalid icon image");
        try {
            Intent launch=activity.getPackageManager().getLaunchIntentForPackage(activity.getPackageName());
            if(launch==null)return "unsupported";
            launch.setAction(Intent.ACTION_VIEW);
            String id="dnd-vtt-selected-appearance";
            ShortcutInfo shortcut=new ShortcutInfo.Builder(activity,id).setShortLabel("DnD VTT").setLongLabel("DnD VTT")
                .setIcon(android.graphics.drawable.Icon.createWithBitmap(bitmap)).setIntent(launch).build();
            for(ShortcutInfo pinned:manager.getPinnedShortcuts())if(id.equals(pinned.getId()))
                return manager.updateShortcuts(Collections.singletonList(shortcut))?"updated":"unavailable";
            return manager.requestPinShortcut(shortcut,null)?"requested":"unavailable";
        } finally { bitmap.recycle(); }
    }
    private static String chatEditResult;
    public static synchronized String takeChatEdit() { String result=chatEditResult;chatEditResult=null;return result; }
    private static synchronized void finishChatEdit(String id,String text,boolean accepted) {
        try { chatEditResult=new org.json.JSONObject().put("id",id).put("text",text).put("accepted",accepted).toString(); }
        catch(org.json.JSONException ignored) { chatEditResult=null; }
    }
    public static void editChat(Activity activity,String id,String text) {
        synchronized(UpdateProvider.class) { chatEditResult=null; }
        activity.runOnUiThread(()->{
            android.widget.EditText input=new android.widget.EditText(activity);
            input.setInputType(android.text.InputType.TYPE_CLASS_TEXT|android.text.InputType.TYPE_TEXT_FLAG_MULTI_LINE|android.text.InputType.TYPE_TEXT_FLAG_CAP_SENTENCES);
            input.setFilters(new android.text.InputFilter[]{new android.text.InputFilter.LengthFilter(1000)});
            input.setMinLines(4);input.setMaxLines(10);input.setGravity(android.view.Gravity.TOP);
            input.setText(text);input.setSelection(input.length());input.setPadding(24,24,24,24);
            android.app.AlertDialog dialog=new android.app.AlertDialog.Builder(activity).setTitle("Сообщение в глобальный чат").setView(input)
                .setPositiveButton("Готово",(d,w)->finishChatEdit(id,input.getText().toString(),true))
                .setNegativeButton("Отмена",(d,w)->finishChatEdit(id,text,false))
                .setOnCancelListener(d->finishChatEdit(id,text,false)).create();
            dialog.setOnShowListener(d->{input.requestFocus();dialog.getWindow().setSoftInputMode(android.view.WindowManager.LayoutParams.SOFT_INPUT_STATE_ALWAYS_VISIBLE|android.view.WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE);});
            dialog.show();
        });
    }
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
