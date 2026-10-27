package com.dndvtt.unityupdater;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import com.unity3d.player.UnityPlayer;
import org.json.JSONObject;
import java.io.*;

/** System document access only; no storage permission or exported activity. */
public class CharacterDocumentActivity extends Activity {
    private static final int PICK = 1040, LIMIT = 16 * 1024 * 1024;
    private String target, token, operation;
    private boolean resultDelivered, copying;
    public static void launch(Activity owner, String target, String token, String operation) {
        owner.runOnUiThread(() -> {
            Intent intent = new Intent(owner, CharacterDocumentActivity.class);
            intent.putExtra("target", target).putExtra("token", token).putExtra("operation", operation);
            try { owner.startActivity(intent); }
            catch (Exception error) {
                try { UnityPlayer.UnitySendMessage(target, "OnCharacterFileResult", new JSONObject().put("token", token).put("status", "error").put("error", "Не удалось открыть системное окно файла").toString()); }
                catch (Exception ignored) { }
            }
        });
    }
    private File transferFile() throws IOException {
        if (token == null || !token.matches("[a-f0-9]{32}")) throw new IOException("Неверный запрос файла");
        File directory = new File(getCacheDir(), "character-transfers");
        if (!directory.isDirectory() && !directory.mkdirs()) throw new IOException("Не удалось открыть временное хранилище");
        return new File(directory, token + ("art".equals(operation) ? ".image" : ".json"));
    }
    @Override public void onCreate(Bundle state) {
        super.onCreate(state);
        target = getIntent().getStringExtra("target"); token = getIntent().getStringExtra("token"); operation = getIntent().getStringExtra("operation");
        if (state != null) return; // The system restores the pending picker/result.
        try {
            if (!"import".equals(operation) && !"export".equals(operation) && !"art".equals(operation)) throw new IOException("Неверное действие с файлом");
            File source = transferFile();
            Intent pick = new Intent("export".equals(operation) ? Intent.ACTION_CREATE_DOCUMENT : Intent.ACTION_OPEN_DOCUMENT);
            pick.addCategory(Intent.CATEGORY_OPENABLE);
            if ("export".equals(operation)) {
                if (!source.isFile() || source.length() > LIMIT) throw new IOException("Нет файла для сохранения");
                pick.setType("application/json"); pick.putExtra(Intent.EXTRA_TITLE, "DnD-VTT-characters.json");
            } else if ("art".equals(operation)) {
                pick.setType("image/*");
                pick.putExtra(Intent.EXTRA_MIME_TYPES, new String[]{"image/png", "image/jpeg", "image/bmp", "image/x-ms-bmp"});
            } else {
                pick.setType("*/*");
                pick.putExtra(Intent.EXTRA_MIME_TYPES, new String[]{"application/json", "text/plain", "application/octet-stream"});
            }
            startActivityForResult(pick, PICK);
        } catch (Exception error) { complete("error", error.getMessage()); }
    }
    private static void copy(InputStream input, OutputStream output) throws IOException {
        if (input == null || output == null) throw new IOException("Не удалось открыть выбранный документ");
        byte[] buffer = new byte[8192]; int count, total = 0;
        while ((count = input.read(buffer)) != -1) {
            total += count; if (total > LIMIT) throw new IOException("Файл больше 16 МБ");
            output.write(buffer, 0, count);
        }
        output.flush();
    }
    @Override protected void onActivityResult(int request, int result, Intent data) {
        super.onActivityResult(request, result, data);
        if (request != PICK) return;
        if (result != RESULT_OK) { complete("cancel", null); return; }
        final Uri uri = data == null ? null : data.getData();
        copying = true;
        new Thread(() -> {
            try {
                if (uri == null || !"content".equals(uri.getScheme())) throw new IOException("Выберите документ в системном окне");
                File file = transferFile();
                if ("export".equals(operation)) {
                    try (InputStream input = new FileInputStream(file); OutputStream output = getContentResolver().openOutputStream(uri, "wt")) { copy(input, output); }
                    file.delete();
                } else {
                    try (InputStream input = getContentResolver().openInputStream(uri); OutputStream output = new FileOutputStream(file)) { copy(input, output); }
                }
                runOnUiThread(() -> complete("ok", null));
            } catch (Exception error) {
                try { if (!"export".equals(operation)) transferFile().delete(); } catch (Exception ignored) { }
                runOnUiThread(() -> complete("error", error.getMessage()));
            }
        }, "DnD character document").start();
    }

    private void notifyResult(String status, String error) {
        if (resultDelivered) return;
        resultDelivered = true;
        try {
            JSONObject result = new JSONObject().put("token", token).put("status", status);
            if (error != null) result.put("error", error);
            if (target != null) UnityPlayer.UnitySendMessage(target, "OnCharacterFileResult", result.toString());
            if (!"ok".equals(status)) transferFile().delete();
        } catch (Exception ignored) { }
    }
    private void complete(String status, String error) { notifyResult(status, error); finish(); }
    @Override protected void onDestroy() {
        if (!isChangingConfigurations() && !copying && !resultDelivered) notifyResult("cancel", null);
        super.onDestroy();
    }
}
