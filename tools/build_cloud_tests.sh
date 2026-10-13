#!/usr/bin/env bash
# Build local Windows Portable + separate Android Cloud Test APK. Never publishes.
# Requires the SDK/JDK/Gradle installed by this onboarding session; see start_skill.
set -euo pipefail
task_repo="$(cd "$(dirname "$0")/.." && pwd)"
cd "$task_repo"
export JAVA_HOME=/workspace/cloud-tools/jdk/usr/lib/jvm/java-21-openjdk-amd64
export ANDROID_HOME=/workspace/cloud-tools/android-sdk
export ANDROID_USER_HOME=/workspace/cloud-tools/android-user
export GRADLE_USER_HOME=/workspace/.gradle
if [ ! -f /workspace/cloud-tools/cloud-test.keystore ]; then
  "$JAVA_HOME/bin/keytool" -genkeypair -keystore /workspace/cloud-tools/cloud-test.keystore -storepass android -keypass android -alias androiddebugkey -keyalg RSA -keysize 2048 -validity 10000 -dname 'CN=Android Debug,O=Android,C=US'
fi
npm run desktop:prepare
XDG_CACHE_HOME=/workspace/.cache ELECTRON_BUILDER_CACHE=/workspace/.electron-builder-cache ELECTRON_CACHE=/workspace/.electron-cache NODE_USE_ENV_PROXY=1 CSC_IDENTITY_AUTO_DISCOVERY=false node_modules/.bin/electron-builder --win portable --x64 --publish never -c.win.signAndEditExecutable=false -c.electronDownload.cache=/workspace/.electron-cache
/workspace/cloud-tools/gradle-9.6.0/bin/gradle -p android --project-cache-dir /workspace/.gradle/cloud-project-cache -I "$task_repo/tools/cloud_test.init.gradle" :app:assembleDebug --max-workers=4 --no-daemon --console=plain -Dhttps.proxyHost=proxy -Dhttps.proxyPort=8080 -Dhttp.proxyHost=proxy -Dhttp.proxyPort=8080
mkdir -p dist/cloud-test
task_desktop_version="$(node -p "require('./package.json').version")"
cp "dist/windows/DnD-VTT-Portable-${task_desktop_version}-x64.exe" dist/cloud-test/DnD-VTT-Cloud-Test-Windows-x64.exe
cp /workspace/cloud-tools/android-build/app/outputs/apk/debug/app-debug.apk dist/cloud-test/DnD-VTT-Cloud-Test-Android.apk
(cd dist/cloud-test && sha256sum DnD-VTT-Cloud-Test-Windows-x64.exe DnD-VTT-Cloud-Test-Android.apk > SHA256SUMS.txt)
