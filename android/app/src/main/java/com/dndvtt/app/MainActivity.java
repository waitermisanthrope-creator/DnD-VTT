package com.dndvtt.app;

import android.app.Activity;
import android.view.Window;
import android.content.pm.ActivityInfo;
import android.os.Bundle;
import android.net.Uri;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebView;
import android.webkit.WebSettings;
import android.webkit.JavascriptInterface;
import android.util.Log;
import android.os.Handler;
import java.io.File;
import java.util.Collections;
import androidx.webkit.WebViewAssetLoader;
import androidx.webkit.WebViewClientCompat;
import androidx.webkit.WebViewCompat;
import androidx.webkit.WebViewFeature;
import androidx.webkit.JavaScriptReplyProxy;
import androidx.webkit.WebMessageCompat;

public class MainActivity extends Activity {
    private DndUpdateBridge updater;
    private WebView webView;

    private final class OrientationJsBridge {
        private int previousRequestedOrientation = ActivityInfo.SCREEN_ORIENTATION_UNSPECIFIED;
        private boolean landscapeActive = false;

        @JavascriptInterface
        public void landscape() {
            runOnUiThread(() -> {
                if (!landscapeActive) {
                    previousRequestedOrientation = getRequestedOrientation();
                    landscapeActive = true;
                }
                setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
            });
        }

        @JavascriptInterface
        public void restore() {
            runOnUiThread(() -> {
                int restore = previousRequestedOrientation;
                landscapeActive = false;
                setRequestedOrientation(restore);
            });
        }
    }

    public class LauncherIconJsBridge {
        @JavascriptInterface
        public String setIcon(String iconId) {
            return updater.setLauncherIconFromJs(iconId);
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // WebView UI has its own navigation; the native Activity title bar only
        // wastes vertical space and duplicated the app name above every screen.
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        // The launcher alias keeps the user-facing app name, but the running Activity must
        // not expose that label as its window/task title. setTitle() is the final runtime guard.
        setTitle("");
        getWindow().setTitle("");
        if (getActionBar() != null) getActionBar().hide();

        updater = new DndUpdateBridge(this);
        try {
            updater.ensureSeeded();
            updater.ensureLauncherIcon();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        webView = new WebView(this);
        // In-app updates replace the local WebView asset tree. Never let a
        // recreated Activity reuse the previous document/resource cache.
        webView.clearCache(true);
        webView.clearHistory();
        webView.getSettings().setCacheMode(WebSettings.LOAD_NO_CACHE);
        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setDomStorageEnabled(true);
        webView.getSettings().setAllowFileAccess(false);
        webView.getSettings().setAllowContentAccess(false);

        File activeRoot = new File(getFilesDir(), "vtt-versions/" + updater.getActiveVersion());
        final WebViewAssetLoader loader = new WebViewAssetLoader.Builder()
                .addPathHandler("/vtt/", new WebViewAssetLoader.InternalStoragePathHandler(this, activeRoot))
                // Icon previews are static APK assets, so they must remain available even when
                // the active web version was produced by an in-app update.
                .addPathHandler("/vtt-apk/", new WebViewAssetLoader.AssetsPathHandler(this))
                .build();

        webView.addJavascriptInterface(new LauncherIconJsBridge(), "DndLauncherIcon");
        // Native orientation bridge: Android WebView often rejects screen.orientation.lock()
        // even after fullscreen, so 1st/3rd person explicitly asks the Activity for landscape.
        webView.addJavascriptInterface(new OrientationJsBridge(), "DndOrientation");

        webView.setWebViewClient(new WebViewClientCompat() {
            @Override
            public WebResourceResponse shouldInterceptRequest(
                    WebView view, WebResourceRequest request) {
                return loader.shouldInterceptRequest(request.getUrl());
            }

            @Override
            @SuppressWarnings("deprecation")
            public WebResourceResponse shouldInterceptRequest(WebView view, String url) {
                return loader.shouldInterceptRequest(Uri.parse(url));
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                if (!updater.hasPendingUpdate()) {
                    updater.markHealthy();
                    return;
                }

                // onPageFinished can fire even when the new web version renders
                // only a blank shell after a fatal JS/runtime failure. A staged
                // update is healthy only after the recreated WebView proves that
                // the application booted and its core navigation API exists.
                new Handler(getMainLooper()).postDelayed(() -> {
                    if (webView == null) return;
                    webView.evaluateJavascript(
                            "(function(){return !!(window.__DND_APP_BOOT_READY===true && typeof window.goToTab==='function' && document.body && document.body.children.length>0);})()",
                            value -> {
                                boolean healthy = "true".equalsIgnoreCase(String.valueOf(value).replace("\"", ""));
                                if (healthy) {
                                    updater.markHealthy();
                                } else {
                                    Log.w("MainActivity", "Pending web update failed boot validation; rolling back");
                                    updater.rollbackPending();
                                }
                            });
                }, 2500L);
            }
        });

        if (WebViewFeature.isFeatureSupported(WebViewFeature.WEB_MESSAGE_LISTENER)) {
            WebViewCompat.addWebMessageListener(
                    webView,
                    "dndNative",
                    Collections.singleton("https://appassets.androidplatform.net"),
                    new WebViewCompat.WebMessageListener() {
                        @Override
                        public void onPostMessage(WebView view, WebMessageCompat message,
                                                   Uri sourceOrigin, boolean isMainFrame,
                                                   JavaScriptReplyProxy replyProxy) {
                            if (!isMainFrame || message.getData() == null) return;
                            updater.handle(message.getData(), replyProxy);
                        }
                    });
        }

        setContentView(webView);
        webView.loadUrl("https://appassets.androidplatform.net/vtt/index.html");
    }
}
