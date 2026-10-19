param(
    [ValidateSet('Windows','Android','Package','Manifest')][string]$Stage,
    [string]$Editor = 'C:\Program Files\Unity\Hub\Editor\6000.3.26f1\Editor\Unity.exe',
    [string]$Nsis = "$env:USERPROFILE\.cache\dnd-vtt-build-tools\nsis-3.11\makensis.exe"
)
$ErrorActionPreference = 'Stop'
$repo = Split-Path $PSScriptRoot -Parent
if ((git -C $repo branch --show-current) -ne 'experiment/unity-vtt') { throw 'Unity release requires experiment/unity-vtt' }
$source = Get-Content (Join-Path $PSScriptRoot 'Assets/Vtt/Runtime/UnityRelease.cs') -Raw
$version = [regex]::Match($source, 'const string Version = "([0-9.]+)"').Groups[1].Value
$code = [int][regex]::Match($source, 'const int Code = ([0-9]+)').Groups[1].Value
if ($version -notmatch '^([1-9][0-9]{0,3})\.([0-9]{2})\.([0-9]{2})$' -or $code -ne ([int]$Matches[1]*10000+[int]$Matches[2]*100+[int]$Matches[3])) { throw 'Version/code mismatch' }
$root = Join-Path $PSScriptRoot "Builds/Unity-$version"
$out = Join-Path $root 'distribution'
$results = Join-Path $PSScriptRoot 'TestResults'
New-Item -ItemType Directory -Force $out,$results | Out-Null
if ($Stage -in @('Windows','Android')) {
    $log = Join-Path $results "Release$Stage.log"
    $target = if ($Stage -eq 'Android') { 'Android' } else { 'Win64' }
    $arguments = "-batchmode -nographics -quit -buildTarget $target -projectPath `"$PSScriptRoot`" -executeMethod UnityReleaseBuild.$Stage -logFile `"$log`""
    $process = Start-Process -FilePath $Editor -ArgumentList $arguments -WindowStyle Hidden -PassThru
    if (!$process.WaitForExit(1200000)) { throw 'Release build timed out; inspect the owned Unity process before retry' }
    if ($process.ExitCode -ne 0 -or !(Select-String -LiteralPath $log -SimpleMatch 'VTT_RELEASE_BUILD_PASS:' -Quiet)) { throw "Release $Stage failed: exit $($process.ExitCode); $log" }
    Write-Output "Release $Stage PASS (exit0): $log"
}
if ($Stage -eq 'Android') {
    $android = Join-Path (Split-Path $Editor -Parent) 'Data/PlaybackEngines/AndroidPlayer'
    $sdk = Join-Path $android 'SDK/build-tools/36.0.0'
    $env:JAVA_HOME = Join-Path $android 'OpenJDK'
    $signing = Join-Path $env:USERPROFILE '.dnd-vtt-unity/signing'
    New-Item -ItemType Directory -Force $signing | Out-Null
    $store = Join-Path $signing 'unity-release.p12'; $secret = Join-Path $signing 'password.dpapi.xml'
    if ((Test-Path $store) -ne (Test-Path $secret)) { throw 'Incomplete signing backup; do not regenerate the release key' }
    if (!(Test-Path $store)) {
        $bytes = [Security.Cryptography.RandomNumberGenerator]::GetBytes(32)
        $password = [Convert]::ToBase64String($bytes)
        ConvertTo-SecureString $password -AsPlainText -Force | Export-Clixml -LiteralPath $secret
    } else {
        $secure = Import-Clixml -LiteralPath $secret
        $password = [Net.NetworkCredential]::new('', $secure).Password
    }
    try {
        $env:VTT_SIGN_PASSWORD = $password
        if (!(Test-Path $store)) {
            & (Join-Path $env:JAVA_HOME 'bin/keytool.exe') -genkeypair -keystore $store -storetype PKCS12 -alias unity-release -keyalg RSA -keysize 3072 -validity 10000 -dname 'CN=DnD VTT Unity, OU=Experimental, O=DnD VTT' -storepass:env VTT_SIGN_PASSWORD -keypass:env VTT_SIGN_PASSWORD
            if ($LASTEXITCODE -ne 0) { throw 'Key generation failed; preserve signing files for diagnosis' }
        }
        & (Join-Path $sdk 'zipalign.exe') -P 16 -f 4 (Join-Path $root 'android-intermediate.apk') (Join-Path $root 'android-aligned.apk')
        if ($LASTEXITCODE -ne 0) { throw 'APK zip alignment failed' }
        $apk = Join-Path $out "DnD-VTT-Unity-$version-arm64.apk"
        & (Join-Path $sdk 'apksigner.bat') sign --ks $store --ks-key-alias unity-release --ks-pass env:VTT_SIGN_PASSWORD --key-pass env:VTT_SIGN_PASSWORD --out $apk (Join-Path $root 'android-aligned.apk')
        if ($LASTEXITCODE -ne 0) { throw 'APK release signing failed' }
        & (Join-Path $sdk 'apksigner.bat') verify --verbose --print-certs $apk | Tee-Object -FilePath (Join-Path $results 'ReleaseAndroid-signature.txt')
        if ($LASTEXITCODE -ne 0) { throw 'APK signature verification failed' }
    } finally { $env:VTT_SIGN_PASSWORD = $null; $password = $null }
}
if ($Stage -eq 'Package') {
    if (!(Test-Path -LiteralPath $Nsis)) { throw 'NSIS compiler unavailable; supply -Nsis path/to/makensis.exe' }
    $payload = Join-Path $root ('payload-' + [guid]::NewGuid().ToString('N'))
    New-Item -ItemType Directory $payload | Out-Null
    Get-ChildItem (Join-Path $root 'windows') | Where-Object { $_.Name -notmatch 'DoNotShip|BackUpThisFolder' } | Copy-Item -Destination $payload -Recurse
    $uninstall = Join-Path $root 'uninstall-files.nsh'
    $commands = [Collections.Generic.List[string]]::new()
    $prefix = [IO.Path]::GetFullPath($payload) + [IO.Path]::DirectorySeparatorChar
    foreach ($file in Get-ChildItem -LiteralPath $payload -Recurse -File) {
        if (!$file.FullName.StartsWith($prefix, [StringComparison]::OrdinalIgnoreCase)) { throw 'Payload path escapes build directory' }
        $relative = $file.FullName.Substring($prefix.Length).Replace('$','$$')
        $commands.Add('Delete "$INSTDIR\' + $relative + '"')
    }
    foreach ($dir in Get-ChildItem -LiteralPath $payload -Recurse -Directory | Sort-Object { $_.FullName.Length } -Descending) {
        $commands.Add('RMDir "$INSTDIR\' + $dir.FullName.Substring($prefix.Length).Replace('$','$$') + '"')
    }
    [IO.File]::WriteAllLines($uninstall, $commands, [Text.UTF8Encoding]::new($false))
    $numeric = (($version.Split('.') | ForEach-Object { [int]$_ }) -join '.') + '.0'
    $setup = Join-Path $out "DnD-VTT-Unity-Setup-$version-x64.exe"
    & $Nsis /V2 "/DVERSION=$version" "/DNUMVERSION=$numeric" "/DPAYLOAD=$payload" "/DOUTPUT=$setup" "/DUNINSTALL_FILES=$uninstall" (Join-Path $PSScriptRoot 'Installer/UnitySetup.nsi')
    if ($LASTEXITCODE -ne 0 -or !(Test-Path $setup)) { throw 'Windows setup compilation failed' }
    Write-Output "Windows setup PASS: $setup"
}
if ($Stage -eq 'Manifest') {
    $artifactNames = @{ android="DnD-VTT-Unity-$version-arm64.apk"; windows="DnD-VTT-Unity-Setup-$version-x64.exe" }
    $artifacts = [ordered]@{}; $checksums = @()
    foreach ($platform in @('android','windows')) {
        $file = Get-Item -LiteralPath (Join-Path $out $artifactNames[$platform]); $sha = (Get-FileHash -LiteralPath $file.FullName -Algorithm SHA256).Hash.ToLowerInvariant()
        $artifacts[$platform] = [ordered]@{ url="https://github.com/waitermisanthrope-creator/DnD-VTT/releases/download/unity-v$version/$($file.Name)"; bytes=$file.Length; sha256=$sha }
        $checksums += "$sha  $($file.Name)"
    }
    $manifest = [ordered]@{ schema=1; channel='unity-experiment'; version=$version; versionCode=$code; androidPackage='com.dndvtt.unity'; notes='Первый Unity-клиент: герои, создание, лист, инвентарь, кошелёк, настройки и 3D-карта. Классовая автоматика и облако ещё переносятся.'; artifacts=$artifacts }
    $json = $manifest | ConvertTo-Json -Depth 8
    [IO.File]::WriteAllText((Join-Path $repo 'updates/unity-experiment.json'), $json + "`n", [Text.UTF8Encoding]::new($false))
    [IO.File]::WriteAllText((Join-Path $out 'unity-experiment.json'), $json + "`n", [Text.UTF8Encoding]::new($false))
    [IO.File]::WriteAllLines((Join-Path $out 'SHA256SUMS.txt'), $checksums, [Text.UTF8Encoding]::new($false))
    Write-Output "Manifest generated: $out"
}
