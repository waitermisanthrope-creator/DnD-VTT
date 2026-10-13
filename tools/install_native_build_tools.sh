#!/usr/bin/env bash
# Install native test-build tools under /workspace only; verify official artifacts.
set -euo pipefail
mkdir -p /workspace/cloud-tools
if [ ! -x /workspace/cloud-tools/jdk/usr/lib/jvm/java-21-openjdk-amd64/bin/javac ]; then
  task_jdk="$(mktemp -d /workspace/cloud-tools/jdk-bootstrap.XXXXXX)"
  mkdir -p "$task_jdk/lists/partial" "$task_jdk/debs"
  cat > "$task_jdk/sources.list" <<'SOURCES'
deb [signed-by=/usr/share/keyrings/debian-archive-keyring.gpg] https://deb.debian.org/debian trixie main
SOURCES
  apt-get -o Dir::Etc::main=/dev/null -o Dir::Etc::parts=- -o Dir::Etc::sourcelist="$task_jdk/sources.list" -o Dir::Etc::sourceparts=- -o Dir::State::lists="$task_jdk/lists" -o Dir::Cache="$task_jdk/cache" update
  (
    cd "$task_jdk/debs"
    apt-get -o Dir::Etc::main=/dev/null -o Dir::Etc::parts=- -o Dir::Etc::sourcelist="$task_jdk/sources.list" -o Dir::Etc::sourceparts=- -o Dir::State::lists="$task_jdk/lists" download openjdk-21-jdk-headless openjdk-21-jre-headless
    mkdir -p /workspace/cloud-tools/jdk
    for task_package in ./*.deb; do dpkg-deb -x "$task_package" /workspace/cloud-tools/jdk; done
  )
  rm -rf "$task_jdk"
fi
if [ ! -x /workspace/cloud-tools/gradle-9.6.0/bin/gradle ]; then
  curl --fail --location --silent --show-error https://services.gradle.org/distributions/gradle-9.6.0-bin.zip -o /workspace/cloud-tools/gradle-9.6.0.zip
  echo 'bbaeb2fef8710818cf0e261201dab964c572f92b942812df0c3620d62a529a01  /workspace/cloud-tools/gradle-9.6.0.zip' | sha256sum --check -
  unzip -q -o /workspace/cloud-tools/gradle-9.6.0.zip -d /workspace/cloud-tools
  chmod +x /workspace/cloud-tools/gradle-9.6.0/bin/gradle
fi
if [ ! -x /workspace/cloud-tools/android-sdk/cmdline-tools/latest/bin/sdkmanager ]; then
  curl --fail --location --silent --show-error https://dl.google.com/android/repository/commandlinetools-linux-16111833_latest.zip -o /workspace/cloud-tools/android-cmdline.zip
  echo 'e025545c62a8e64c7559119566a569fb1dec5f60  /workspace/cloud-tools/android-cmdline.zip' | sha1sum --check -
  mkdir -p /workspace/cloud-tools/android-sdk/cmdline-tools
  task_sdk="$(mktemp -d /workspace/cloud-tools/sdk-bootstrap.XXXXXX)"
  unzip -q /workspace/cloud-tools/android-cmdline.zip -d "$task_sdk"
  mv "$task_sdk/cmdline-tools" /workspace/cloud-tools/android-sdk/cmdline-tools/latest
  rmdir "$task_sdk"
fi
if [ ! -f /workspace/cloud-tools/android-sdk/platforms/android-36/android.jar ] || [ ! -x /workspace/cloud-tools/android-sdk/build-tools/36.0.0/apksigner ]; then
  JAVA_HOME=/workspace/cloud-tools/jdk/usr/lib/jvm/java-21-openjdk-amd64 ANDROID_USER_HOME=/workspace/cloud-tools/android-user /workspace/cloud-tools/android-sdk/cmdline-tools/latest/bin/sdkmanager --sdk_root=/workspace/cloud-tools/android-sdk 'platforms;android-36' 'build-tools;36.0.0'
fi
GRADLE_USER_HOME=/workspace/.gradle /workspace/cloud-tools/gradle-9.6.0/bin/gradle --version
/workspace/cloud-tools/jdk/usr/lib/jvm/java-21-openjdk-amd64/bin/javac -version
