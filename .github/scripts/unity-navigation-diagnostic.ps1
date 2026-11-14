param([Parameter(Mandatory)][string]$CandidateFolder)
$ErrorActionPreference='Stop'
$shots=Join-Path $env:RUNNER_TEMP 'navigation-native'
New-Item -ItemType Directory -Force $shots | Out-Null
$watch=Start-Job -ArgumentList $shots -ScriptBlock {
 param($folder)
 Add-Type -AssemblyName System.Drawing
 Add-Type @'
using System;
using System.Runtime.InteropServices;
public static class NavWindowCapture {
 [StructLayout(LayoutKind.Sequential)] public struct Rect { public int left,top,right,bottom; }
 [StructLayout(LayoutKind.Sequential)] public struct Point { public int x,y; }
 [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr h,out Rect r);
 [DllImport("user32.dll")] public static extern bool GetClientRect(IntPtr h,out Rect r);
 [DllImport("user32.dll")] public static extern bool ClientToScreen(IntPtr h,ref Point p);
 [DllImport("user32.dll")] public static extern bool GetCursorPos(out Point p);
 [DllImport("user32.dll")] public static extern bool SetProcessDPIAware();
}
'@
 [NavWindowCapture]::SetProcessDPIAware() | Out-Null
 $n=0
 for($tick=0;$tick -lt 2400;$tick++) {
  $player=Get-Process DndVtt -ErrorAction SilentlyContinue | Where-Object {$_.MainWindowHandle -ne 0} | Select-Object -First 1
  if($player) {
   $r=[NavWindowCapture+Rect]::new();$c=[NavWindowCapture+Rect]::new();$p=[NavWindowCapture+Point]::new();$origin=[NavWindowCapture+Point]::new()
   if([NavWindowCapture]::GetWindowRect($player.MainWindowHandle,[ref]$r) -and ($r.right-$r.left) -ge 500 -and ($r.bottom-$r.top) -ge 500) {
    [NavWindowCapture]::GetClientRect($player.MainWindowHandle,[ref]$c) | Out-Null
    [NavWindowCapture]::ClientToScreen($player.MainWindowHandle,[ref]$origin) | Out-Null
    [NavWindowCapture]::GetCursorPos([ref]$p) | Out-Null
    $slot=$n%8;$bmp=[Drawing.Bitmap]::new(($r.right-$r.left),($r.bottom-$r.top));$g=[Drawing.Graphics]::FromImage($bmp)
    try { $g.CopyFromScreen($r.left,$r.top,0,0,$bmp.Size);$bmp.Save((Join-Path $folder ("native-$slot.png")),[Drawing.Imaging.ImageFormat]::Png) }
    finally {$g.Dispose();$bmp.Dispose()}
    @{n=$n;window=@($r.left,$r.top,$r.right,$r.bottom);client=@($c.right,$c.bottom);origin=@($origin.x,$origin.y);cursor=@($p.x,$p.y);utc=[DateTime]::UtcNow.ToString('o')} | ConvertTo-Json -Compress | Set-Content (Join-Path $folder ("native-$slot.json"))
    $n++
   }
  }
  Start-Sleep -Milliseconds 100
 }
}
$failure=$null
try { & ./unity/ci/windows-upgrade-qa.ps1 -CandidateFolder $CandidateFolder }
catch { $failure=$_;Write-Output ("REPLAY_EXPECTED_DIAGNOSTIC_FAILURE: "+$_) }
finally { Stop-Job $watch;Receive-Job $watch | Write-Output;Remove-Job $watch }
foreach($file in Get-ChildItem $shots -Filter '*.json' | Sort-Object LastWriteTime | Select-Object -Last 5) {
 Write-Output ('VTT_NAV_NATIVE_GEOMETRY:'+ (Get-Content $file.FullName -Raw))
 $png=[IO.Path]::ChangeExtension($file.FullName,'.png')
 Write-Output ('VTT_NAV_DIAG_PNG:'+ $file.BaseName+':'+[Convert]::ToBase64String([IO.File]::ReadAllBytes($png)))
}
if($failure){throw $failure}
