param(
    [ValidateSet('Setup','Windows','Android','Smoke','Snapshot','MigrationSetup','MigrationContracts','MigrationWindows','MigrationAndroid','MigrationSmoke')][string]$Stage = 'Setup',
    [string]$Editor = 'C:\Program Files\Unity\Hub\Editor\6000.3.26f1\Editor\Unity.exe'
)
$ErrorActionPreference = 'Stop'
$project = $PSScriptRoot
$repo = Split-Path $project -Parent
$branch = & git -C $repo branch --show-current
if ($LASTEXITCODE -ne 0 -or $branch -ne 'experiment/unity-vtt') { throw 'Requires experiment/unity-vtt and Git in PATH' }
$results = Join-Path $project 'TestResults'
New-Item -ItemType Directory -Force $results | Out-Null
$log = Join-Path $results "$Stage.log"
if ($Stage -in @('Smoke','MigrationSmoke')) {
    $folder = if ($Stage -eq 'MigrationSmoke') { 'WindowsMigration' } else { 'Windows' }
    $executable = Join-Path $project "Builds\$folder\DndVtt.exe"
    $flag = if ($Stage -eq 'MigrationSmoke') { '--vtt-migration-smoke' } else { '--vtt-smoke' }
    $arguments = "$flag -logFile `"$log`""
    $marker = if ($Stage -eq 'MigrationSmoke') { 'VTT_MIGRATION_SMOKE_PASS' } else { 'VTT_SMOKE_PASS' }
} else {
    if (!(Test-Path -LiteralPath $Editor)) { throw 'Unity Editor not found' }
    $executable = $Editor
    $method = @{Setup='Create'; Windows='BuildWindows'; Android='BuildAndroid'; Snapshot='Snapshot'; MigrationSetup='CreateScene'; MigrationContracts='ValidateContracts'; MigrationWindows='BuildWindows'; MigrationAndroid='BuildAndroid'}[$Stage]
    $className = if ($Stage.StartsWith('Migration')) { 'LegacyMigrationSetup' } else { 'PrototypeSetup' }
    $target = if ($Stage -in @('Android','MigrationAndroid')) { '-buildTarget Android' } elseif ($Stage -in @('Windows','MigrationWindows')) { '-buildTarget Win64' } else { '' }
    $graphics = if ($Stage -eq 'Snapshot') { '-force-d3d11' } else { '-nographics' }
    $arguments = "-batchmode $graphics -quit $target -projectPath `"$project`" -executeMethod $className.$method -logFile `"$log`""
    $marker = switch ($Stage) { 'Setup' {'VTT_SETUP_PASS'} 'Snapshot' {'VTT_SNAPSHOT_PASS'} 'MigrationSetup' {'VTT_MIGRATION_SCENE_PASS'} 'MigrationContracts' {'VTT_MIGRATION_CONTRACT_PASS'} 'MigrationWindows' {'VTT_MIGRATION_BUILD_PASS'} 'MigrationAndroid' {'VTT_MIGRATION_BUILD_PASS'} default {'VTT_BUILD_PASS'} }
}
$process = Start-Process -FilePath $executable -ArgumentList $arguments -WindowStyle Hidden -PassThru
if (!$process.WaitForExit($(if ($Stage -in @('Smoke','MigrationSmoke')) { 120000 } else { 1200000 }))) {
    Stop-Process -Id $process.Id
    throw "$Stage timed out; see $log"
}
if ($process.ExitCode -ne 0 -or !(Select-String -LiteralPath $log -SimpleMatch $marker -Quiet)) { throw "$Stage failed: exit $($process.ExitCode); see $log" }
Write-Output "$Stage PASS: $log"
