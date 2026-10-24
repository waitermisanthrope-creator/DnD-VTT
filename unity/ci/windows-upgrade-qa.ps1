param([Parameter(Mandatory)][string]$CandidateFolder)
$ErrorActionPreference = 'Stop'
if ($env:GITHUB_REF -ne 'refs/heads/experiment/unity-vtt' -or $env:RUNNER_OS -ne 'Windows') { throw 'Use only an isolated trusted Windows runner' }
$root = Join-Path $env:RUNNER_TEMP ('unity-upgrade-' + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory $root | Out-Null
$baseline = Join-Path $root 'baseline-1.00.00.exe'
Invoke-WebRequest 'https://github.com/waitermisanthrope-creator/DnD-VTT/releases/download/unity-v1.00.00/DnD-VTT-Unity-Setup-1.00.00-x64.exe' -OutFile $baseline
if ((Get-FileHash $baseline).Hash -ne '8DF76DBB632CC314B9BD4A2C33F3399CA91B9A3920360693B7F7C8520BA3BCCF') { throw 'Published baseline setup hash changed' }
$install = Join-Path $root 'installed'
$profile = Join-Path $root 'synthetic-profile.json'
$fixture = '{"id":"cloud-upgrade-fixture","name":"Isolated CI hero","schemaVersion":3,"hpCurrent":17,"hpMax":24,"resources":{"tarot":{"remaining":3}},"classFeaturesState":{"pending":{"sourceId":"cloud-fixture"}},"futureUnknown":{"value":123}}'
[IO.File]::WriteAllText($profile, $fixture, [Text.UTF8Encoding]::new($false))
[IO.File]::WriteAllText(($profile+'.bak'), $fixture, [Text.UTF8Encoding]::new($false))
$before = (Get-FileHash $profile).Hash
function Install([string]$Setup) {
    $p = Start-Process -FilePath $Setup -ArgumentList @('/S','/NOAUTORUN=1',"/D=$install") -PassThru -WindowStyle Hidden
    if (!$p.WaitForExit(180000) -or $p.ExitCode -ne 0) { throw 'Silent installation failed/timed out' }
}
function Smoke([string]$Label, [bool]$Minimal = $false) {
    $mode = if ($Minimal) { "--vtt-client-smoke" } else { "--vtt-migration-smoke" }
    $marker = if ($Minimal) { "VTT_CLIENT_SMOKE_PASS:" } else { "VTT_MIGRATION_SMOKE_PASS:" }
    $log = Join-Path $root "$Label.log"
    $p = Start-Process -FilePath (Join-Path $install 'DndVtt.exe') -ArgumentList @('-batchmode','-nographics',$mode,'--vtt-profile-store',"`"$profile`"",'-logFile',"`"$log`"") -PassThru -WindowStyle Hidden
    $exited=$p.WaitForExit(180000)
    if (!$exited) { $p.Kill(); $p.WaitForExit(10000) | Out-Null }
    if (!$exited -or $p.ExitCode -ne 0 -or !(Select-String -LiteralPath $log -SimpleMatch $marker -Quiet)) {
        if(Test-Path $log) { Get-Content $log -Tail 100 | Write-Output }
        throw "Installed runtime smoke failed: $Label"
    }
    if ((Get-FileHash $profile).Hash -ne $before -or (Get-FileHash ($profile+'.bak')).Hash -ne $before) { throw 'Synthetic profile/backup changed' }
}
Install $baseline
Smoke 'baseline'
$unknownFile = Join-Path $install 'owner-added-note.txt'
[IO.File]::WriteAllText($unknownFile, 'Preserve user-added installation file')
$report = Get-Content (Join-Path $CandidateFolder 'candidate.json') -Raw | ConvertFrom-Json
$entry = $report.artifacts.windows
$setup = Join-Path $CandidateFolder $entry.name
if ((Get-FileHash $setup).Hash.ToLowerInvariant() -ne $entry.sha256 -or (Get-Item $setup).Length -ne $entry.bytes) { throw 'Candidate setup hash/size mismatch' }
Install $setup
foreach ($property in $report.windowsFiles.PSObject.Properties) {
    if ($property.Name -match '(^/|\.\.|:)') { throw 'Unsafe payload manifest path' }
    $path = Join-Path $install $property.Name
    if (!(Test-Path -LiteralPath $path) -or (Get-FileHash -LiteralPath $path).Hash.ToLowerInvariant() -ne $property.Value) { throw "Installed payload differs: $($property.Name)" }
}
if (!(Test-Path $unknownFile)) { throw 'Upgrade removed an unknown user-added file' }
Smoke 'upgraded' $true
Install $setup
Smoke 'reinstalled' $true
# Exercise the actual installed graphical player; do not use -batchmode/-nographics.
$ui = Join-Path $env:RUNNER_TEMP 'windows-ui-evidence'
New-Item -ItemType Directory -Force $ui | Out-Null
$uiLog = Join-Path $ui 'desktop-ui.log'
$p = Start-Process -FilePath (Join-Path $install 'DndVtt.exe') -ArgumentList @('-force-d3d11','-force-driver-type-warp','--vtt-ui-smoke','--vtt-ui-output',"`"$ui`"",'--vtt-profile-store',"`"$profile`"",'-logFile',"`"$uiLog`"") -PassThru
$uiExited = $p.WaitForExit(180000)
if (!$uiExited) { $p.Kill(); $p.WaitForExit(10000) | Out-Null }
if (Test-Path $uiLog) { Get-Content $uiLog | Where-Object { $_ -match 'VTT_DESKTOP_|Exception|Error|FAIL' } | Write-Output }
if (!$uiExited -or $p.ExitCode -ne 0 -or !(Select-String -LiteralPath $uiLog -SimpleMatch 'VTT_DESKTOP_UI_PASS:' -Quiet)) { Get-Content $uiLog -Tail 100 | Where-Object { $_ -notmatch 'VTT_DESKTOP_UI_PNG:' } | Write-Output; throw 'Actual Windows UI rendering test failed' }
if ((Get-ChildItem $ui -Filter '*.png').Count -lt 10) { throw 'Missing installed graphical UI evidence' }
if ((Get-FileHash $profile).Hash -ne $before -or (Get-FileHash ($profile+'.bak')).Hash -ne $before) { throw 'Graphical UI smoke modified profile or backup' }
$result = [ordered]@{ status='passed'; baseline='1.00.00'; candidate=$report.version; baselineInstall=$true; installedPayloadHashes=$true; upgrade=$true; reinstall=$true; isolatedProfileAndBackupPreserved=$true; unknownFilePreserved=$true; runtimeSmoke=$true; desktopUiSmoke=$true; baselineSmokeMode='legacy-adventure'; candidateSmokeMode='minimal-client'; physicalAndroidQa=$false; run=$env:GITHUB_RUN_ID; source=$env:GITHUB_SHA }
$result | ConvertTo-Json | Set-Content (Join-Path $env:RUNNER_TEMP 'windows-upgrade-result.json')
Write-Output 'CLOUD_WINDOWS_UPGRADE_QA_PASS: installed 1.00.00 -> candidate -> reinstall; exact payload/profile/backup hashes; actual runtime smoke'
