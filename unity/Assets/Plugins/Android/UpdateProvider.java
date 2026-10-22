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
    /** Switch predeclared launcher aliases, like WebView. Never creates a pinned shortcut. */
    public static String replaceLauncherIcon(Activity activity,String packageId) throws Exception {
        if(packageId==null||!packageId.matches("dnd\\.appearance\\.icon\\.(default|0[1-9]|[12][0-9]|30)"))return "unsupported";
        String slot=packageId.substring("dnd.appearance.icon.".length());PackageManager pm=activity.getPackageManager();
        String original=pm.getApplicationInfo(activity.getPackageName(),PackageManager.GET_META_DATA).metaData.getString("dnd.vtt.launcherDefault");
        if(original==null)return "unsupported";
        ArrayList<ComponentName> components=new ArrayList<>();ArrayList<Integer> before=new ArrayList<>();int selected="default".equals(slot)?0:Integer.parseInt(slot);
        for(int i=0;i<=30;i++) { ComponentName name=new ComponentName(activity.getPackageName(),i==0?original:activity.getPackageName()+".LauncherIcon"+String.format(Locale.ROOT,"%02d",i));pm.getActivityInfo(name,PackageManager.MATCH_DISABLED_COMPONENTS);components.add(name);before.add(pm.getComponentEnabledSetting(name)); }
        if(Build.VERSION.SDK_INT>=33) {
            ArrayList<PackageManager.ComponentEnabledSetting> changes=new ArrayList<>();
            for(int i=0;i<=30;i++)changes.add(new PackageManager.ComponentEnabledSetting(components.get(i),i==selected?PackageManager.COMPONENT_ENABLED_STATE_ENABLED:PackageManager.COMPONENT_ENABLED_STATE_DISABLED,PackageManager.DONT_KILL_APP));
            pm.setComponentEnabledSettings(changes);
        } else {
            try {
                pm.setComponentEnabledSetting(components.get(selected),PackageManager.COMPONENT_ENABLED_STATE_ENABLED,PackageManager.DONT_KILL_APP);
                for(int i=0;i<=30;i++)if(i!=selected)pm.setComponentEnabledSetting(components.get(i),PackageManager.COMPONENT_ENABLED_STATE_DISABLED,PackageManager.DONT_KILL_APP);
            }catch(RuntimeException e) { for(int i=0;i<=30;i++)try { pm.setComponentEnabledSetting(components.get(i),before.get(i),PackageManager.DONT_KILL_APP); }catch(RuntimeException ignored) {}throw e; }
        }
        boolean legacy=false;
        ShortcutManager shortcuts=activity.getSystemService(ShortcutManager.class);
        try { if(shortcuts!=null)for(ShortcutInfo shortcut:shortcuts.getPinnedShortcuts())if("dnd-vtt-selected-appearance".equals(shortcut.getId())) { legacy=true;shortcuts.disableShortcuts(Collections.singletonList(shortcut.getId()),"Используйте основной значок DnD VTT"); } }catch(RuntimeException ignored) { /* launcher change itself has succeeded */ }
        return legacy?"changed-legacy-shortcut":"changed";
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
