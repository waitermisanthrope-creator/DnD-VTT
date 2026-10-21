package com.dndvtt.unity;
import android.security.keystore.KeyGenParameterSpec;
import android.security.keystore.KeyProperties;
import android.util.Base64;
import java.security.KeyStore;
import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
/** Device-bound session encryption. No passwords or service-role keys. */
public final class DndSessionVault {
    private static final String ALIAS="dndvtt.auth.session.v1";
    private static SecretKey key(boolean create) throws Exception {
        KeyStore store=KeyStore.getInstance("AndroidKeyStore");store.load(null,null);
        if(store.containsAlias(ALIAS)) return ((KeyStore.SecretKeyEntry)store.getEntry(ALIAS,null)).getSecretKey();
        if(!create) throw new IllegalStateException("Session key unavailable");
        KeyGenerator generator=KeyGenerator.getInstance(KeyProperties.KEY_ALGORITHM_AES,"AndroidKeyStore");
        generator.init(new KeyGenParameterSpec.Builder(ALIAS,KeyProperties.PURPOSE_ENCRYPT|KeyProperties.PURPOSE_DECRYPT).setBlockModes(KeyProperties.BLOCK_MODE_GCM).setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE).build());
        return generator.generateKey();
    }
    public static String protect(String text) throws Exception {
        Cipher cipher=Cipher.getInstance("AES/GCM/NoPadding");cipher.init(Cipher.ENCRYPT_MODE,key(true));
        byte[] iv=cipher.getIV(),ciphertext=cipher.doFinal(text.getBytes(StandardCharsets.UTF_8));
        if(iv.length!=12) throw new IllegalStateException("Unexpected GCM IV");
        byte[] result=new byte[12+ciphertext.length];System.arraycopy(iv,0,result,0,12);System.arraycopy(ciphertext,0,result,12,ciphertext.length);
        return Base64.encodeToString(result,Base64.NO_WRAP);
    }
    public static String unprotect(String data) throws Exception {
        byte[] bytes=Base64.decode(data,Base64.NO_WRAP);if(bytes.length<28)throw new IllegalArgumentException("Invalid session");
        Cipher cipher=Cipher.getInstance("AES/GCM/NoPadding");cipher.init(Cipher.DECRYPT_MODE,key(false),new GCMParameterSpec(128,Arrays.copyOfRange(bytes,0,12)));
        return new String(cipher.doFinal(bytes,12,bytes.length-12),StandardCharsets.UTF_8);
    }
}
