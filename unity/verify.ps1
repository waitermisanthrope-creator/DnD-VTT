param(
    [ValidateSet('Setup','Windows','Android','Smoke','Snapshot')][string]$Stage = 'Setup',
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
if ($Stage -eq 'Smoke') {
    $executable = Join-Path $project 'Builds\Windows\DndVtt.exe'
    $arguments = "--vtt-smoke -logFile `"$log`""
    $marker = 'VTT_SMOKE_PASS'
} else {
    if (!(Test-Path -LiteralPath $Editor)) { throw 'Unity Editor not found' }
    $executable = $Editor
    $method = @{Setup='Create'; Windows='BuildWindows'; Android='BuildAndroid'; Snapshot='Snapshot'}[$Stage]
    $target = if ($Stage -eq 'Android') { '-buildTarget Android' } elseif ($Stage -eq 'Windows') { '-buildTarget Win64' } else { '' }
    $graphics = if ($Stage -eq 'Snapshot') { '-force-d3d11' } else { '-nographics' }
    $arguments = "-batchmode $graphics -quit $target -projectPath `"$project`" -executeMethod PrototypeSetup.$method -logFile `"$log`""
    $marker = if ($Stage -eq 'Setup') { 'VTT_SETUP_PASS' } elseif ($Stage -eq 'Snapshot') { 'VTT_SNAPSHOT_PASS' } else { 'VTT_BUILD_PASS' }
}
$process = Start-Process -FilePath $executable -ArgumentList $arguments -WindowStyle Hidden -PassThru
if (!$process.WaitForExit($(if ($Stage -eq 'Smoke') { 120000 } else { 1200000 }))) {
    Stop-Process -Id $process.Id
    throw "$Stage timed out; see $log"
}
if ($process.ExitCode -ne 0 -or !(Select-String -LiteralPath $log -SimpleMatch $marker -Quiet)) { throw "$Stage failed: exit $($process.ExitCode); see $log" }
Write-Output "$Stage PASS: $log"
