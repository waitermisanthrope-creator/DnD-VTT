package com.dndvtt.app;

import android.app.Activity;
import android.os.Bundle;
import android.net.Uri;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebView;
import android.webkit.JavascriptInterface;
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

    public class LauncherIconJsBridge {
        @JavascriptInterface
        public String setIcon(String iconId) {
            return updater.setLauncherIconFromJs(iconId);
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        updater = new DndUpdateBridge(this);
        try {
            updater.ensureSeeded();
            updater.ensureLauncherIcon();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        webView = new WebView(this);
        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setDomStorageEnabled(true);
        webView.getSettings().setAllowFileAccess(false);
        webView.getSettings().setAllowContentAccess(false);

        File activeRoot = new File(getFilesDir(), "vtt-versions/" + updater.getActiveVersion());
        final WebViewAssetLoader loader = new WebViewAssetLoader.Builder()
                .addPathHandler("/vtt/", new WebViewAssetLoader.InternalStoragePathHandler(this, activeRoot))
                .build();

        webView.addJavascriptInterface(new LauncherIconJsBridge(), "DndLauncherIcon");

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
                updater.markHealthy();
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
