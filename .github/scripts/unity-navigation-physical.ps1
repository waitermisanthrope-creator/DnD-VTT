param([Parameter(Mandatory)][string]$CandidateFolder)
$ErrorActionPreference='Stop'
Add-Type -AssemblyName System.Drawing
Add-Type @'
using System;
using System.Runtime.InteropServices;
public static class NavPhysical {
 [StructLayout(LayoutKind.Sequential)] public struct Rect { public int left,top,right,bottom; }
 [StructLayout(LayoutKind.Sequential)] public struct Point { public int x,y; }
 [DllImport("user32.dll")] public static extern bool GetClientRect(IntPtr h,out Rect r);
 [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr h,out Rect r);
 [DllImport("user32.dll")] public static extern bool ClientToScreen(IntPtr h,ref Point p);
 [DllImport("user32.dll")] public static extern bool MoveWindow(IntPtr h,int x,int y,int w,int height,bool repaint);
 [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr h);
 [DllImport("user32.dll")] public static extern bool SetCursorPos(int x,int y);
 [DllImport("user32.dll")] public static extern void mouse_event(uint f,uint x,uint y,uint data,UIntPtr extra);
 [DllImport("user32.dll")] public static extern bool SetProcessDPIAware();
 public static int Gold(byte[] b,int w,int h,int stride,int cx,int cy) {
  int count=0;for(int y=Math.Max(0,cy-15);y<Math.Min(h,cy+16);y++)for(int x=Math.Max(0,cx-18);x<Math.Min(w,cx+19);x++){
   int i=y*stride+x*4;int blue=b[i],g=b[i+1],r=b[i+2];if(r>150&&g>100&&blue<100&&r>g)count++;
  }return count;
 }
 public static double HeaderDiff(byte[] a,byte[] b,int w,int stride) {
  long sum=0;for(int y=0;y<55;y++)for(int x=0;x<w*4;x++)sum+=Math.Abs(a[y*stride+x]-b[y*stride+x]);return (double)sum/(55*w*4);
 }
 public static int[] Box(byte[] b,int w,int h,int stride,int mode) {
  bool[] mask=new bool[w*h];int[] queue=new int[w*h];int best=0;int[] result=null;
  int startX=mode==0?(int)(w*.60):10;
  for(int y=70;y<h-(mode==0?100:45);y++)for(int x=startX;x<w-10;x++){
   int i=y*stride+x*4;int r=b[i+2],g=b[i+1],blue=b[i];
   mask[y*w+x]=mode==0?Math.Abs(r-48)<=5&&Math.Abs(g-46)<=5&&Math.Abs(blue-44)<=5:Math.Abs(r-31)<=7&&Math.Abs(g-92)<=7&&Math.Abs(blue-69)<=7;
  }
  for(int first=0;first<mask.Length;first++){
   if(!mask[first])continue;mask[first]=false;int head=0,tail=1;queue[0]=first;int n=0,l=w,t=h,right=0,bottom=0;
   while(head<tail){int p=queue[head++],x=p%w,y=p/w;n++;l=Math.Min(l,x);right=Math.Max(right,x);t=Math.Min(t,y);bottom=Math.Max(bottom,y);
    int[] near={x>0?p-1:-1,x<w-1?p+1:-1,p-w,p+w};foreach(int k in near)if(k>=0&&k<mask.Length&&mask[k]){mask[k]=false;queue[tail++]=k;}
   }
   int width=right-l+1,height=bottom-t+1;
   bool suitable=mode==0?width>60&&width<w*.45&&height>18&&height<90:width>w*.60&&height>30&&height<100;
   if(suitable&&n>best){best=n;result=new[]{(l+right)/2,(t+bottom)/2,l,t,right,bottom};}
  }return result;
 }
}
'@
[NavPhysical]::SetProcessDPIAware() | Out-Null
$root=Join-Path $env:RUNNER_TEMP 'navigation-physical'
New-Item -ItemType Directory -Force $root | Out-Null
$report=Get-Content (Join-Path $CandidateFolder 'candidate.json') -Raw | ConvertFrom-Json
if($report.version -ne '1.00.58' -or $report.sourceCommit -ne '826f2a1d32a3e12531b4d8d65abacaf590b05ea6'){throw 'Unrelated physical test candidate'}
$setup=Join-Path $CandidateFolder $report.artifacts.windows.name
if((Get-FileHash $setup).Hash.ToLowerInvariant() -ne $report.artifacts.windows.sha256){throw 'Setup hash mismatch'}
$install=Join-Path $root 'installed'
$p=Start-Process $setup -ArgumentList @('/S','/NOAUTORUN=1',"/D=$install") -PassThru
if(!$p.WaitForExit(180000) -or $p.ExitCode -ne 0){throw 'Candidate install failed'}
foreach($property in $report.windowsFiles.PSObject.Properties){if((Get-FileHash (Join-Path $install $property.Name)).Hash.ToLowerInvariant() -ne $property.Value){throw ('Payload mismatch '+$property.Name)}}
$profile=Join-Path $root 'synthetic.json'
$fixture='{"characters":[{"id":"nav-physical","schemaVersion":3,"name":"NAVTEST","class":"Воин","className":"Воин","classes":[{"name":"Воин","level":1}],"level":1,"race":"Человек","raceName":"Человек","stats":{"str":16,"dex":14,"con":14,"int":12,"wis":10,"cha":8},"hpCurrent":17,"hpMax":24,"hpTemp":0,"futureUnknown":{"keep":[1,2,3]}}],"metadata":{"keep":17}}'
[IO.File]::WriteAllText($profile,$fixture,[Text.UTF8Encoding]::new($false));[IO.File]::WriteAllText(($profile+'.bak'),$fixture,[Text.UTF8Encoding]::new($false))
$before=(Get-FileHash $profile).Hash
$log=Join-Path $root 'player.log'
$game=Start-Process (Join-Path $install 'DndVtt.exe') -ArgumentList @('-force-d3d11','-force-driver-type-warp','--vtt-profile-store',"`"$profile`"",'-logFile',"`"$log`"") -PassThru
$script:handle=[IntPtr]::Zero
function Check($ok,$message){if(!$ok){throw ("PHYSICAL_NAV_FAIL: "+$message)}}
function Shot([string]$name=''){
 $game.Refresh();Check (!$game.HasExited) 'same player remains alive'
 $r=[NavPhysical+Rect]::new();$o=[NavPhysical+Point]::new();[NavPhysical]::GetClientRect($script:handle,[ref]$r)|Out-Null;[NavPhysical]::ClientToScreen($script:handle,[ref]$o)|Out-Null
 $bmp=[Drawing.Bitmap]::new($r.right,$r.bottom,[Drawing.Imaging.PixelFormat]::Format32bppArgb);$g=[Drawing.Graphics]::FromImage($bmp)
 try{$g.CopyFromScreen($o.x,$o.y,0,0,$bmp.Size)}finally{$g.Dispose()}
 if($name){$bmp.Save((Join-Path $root ($name+'.png')),[Drawing.Imaging.ImageFormat]::Png)}
 $rect=[Drawing.Rectangle]::new(0,0,$bmp.Width,$bmp.Height);$lock=$bmp.LockBits($rect,[Drawing.Imaging.ImageLockMode]::ReadOnly,[Drawing.Imaging.PixelFormat]::Format32bppArgb)
 $bytes=[byte[]]::new($lock.Stride*$lock.Height);[Runtime.InteropServices.Marshal]::Copy($lock.Scan0,$bytes,0,$bytes.Length);$stride=$lock.Stride;$bmp.UnlockBits($lock);$bmp.Dispose()
 return @{bytes=$bytes;w=$r.right;h=$r.bottom;stride=$stride}
}
function Click([int]$x,[int]$y){
 $o=[NavPhysical+Point]::new();[NavPhysical]::ClientToScreen($script:handle,[ref]$o)|Out-Null
 Check ([NavPhysical]::SetCursorPos(($o.x+$x),($o.y+$y))) 'physical pointer position'
 Start-Sleep -Milliseconds 50;[NavPhysical]::mouse_event(2,0,0,0,[UIntPtr]::Zero);Start-Sleep -Milliseconds 50;[NavPhysical]::mouse_event(4,0,0,0,[UIntPtr]::Zero)
 Write-Output ("VTT_PHYSICAL_CLICK client=$x,$y screen="+($o.x+$x)+','+($o.y+$y))
}
function Wheel([int]$delta){
 $s=Shot;$o=[NavPhysical+Point]::new();[NavPhysical]::ClientToScreen($script:handle,[ref]$o)|Out-Null;[NavPhysical]::SetCursorPos(($o.x+$s.w/2),($o.y+$s.h/2))|Out-Null
 $data=[BitConverter]::ToUInt32([BitConverter]::GetBytes($delta),0);[NavPhysical]::mouse_event(2048,0,0,$data,[UIntPtr]::Zero);Start-Sleep -Milliseconds 160
}
function Find-Action([int]$mode){
 for($step=0;$step -lt 24;$step++){$s=Shot;$box=[NavPhysical]::Box($s.bytes,$s.w,$s.h,$s.stride,$mode);if($box){return @{shot=$s;box=$box}};Wheel -120}
 Shot 'action-not-found'|Out-Null;throw ('PHYSICAL_NAV_FAIL: visible action mode '+$mode)
}
function Hero($s){$cx=[int](($s.w-32)/10+14.5);return [NavPhysical]::Gold($s.bytes,$s.w,$s.h,$s.stride,$cx,($s.h-54)) -gt 4}
$cycles=@();$failure=$null
try {
 for($i=0;$i -lt 100;$i++){$game.Refresh();if($game.MainWindowHandle -ne 0){$script:handle=$game.MainWindowHandle;break};Start-Sleep -Milliseconds 200}
 Check ($script:handle -ne [IntPtr]::Zero) 'visible Unity window';[NavPhysical]::SetForegroundWindow($script:handle)|Out-Null
 $wr=[NavPhysical+Rect]::new();$cr=[NavPhysical+Rect]::new();[NavPhysical]::GetWindowRect($script:handle,[ref]$wr)|Out-Null;[NavPhysical]::GetClientRect($script:handle,[ref]$cr)|Out-Null
 [NavPhysical]::MoveWindow($script:handle,20,0,(440+$wr.right-$wr.left-$cr.right),(704+$wr.bottom-$wr.top-$cr.bottom),$true)|Out-Null
 Start-Sleep -Seconds 3
 $s=Shot 'splash';Click ($s.w-80) ($s.h-41);Start-Sleep -Milliseconds 400
 $s=Shot 'home-initial';Click ($s.w-70) 55;Start-Sleep -Milliseconds 450
 $s=Shot 'hero-initial';Check (Hero $s) 'Home Sheet button opens hero'
 for($cycle=0;$cycle -lt 5;$cycle++) {
  $a=Find-Action 0;$heroHeader=$a.shot;Click ([int]($a.shot.w/6)) $a.box[1];Start-Sleep -Milliseconds 600
  $dice=Shot ("dice-$cycle");Check (!(Hero $dice)) 'Dice opens through visible quick action';Check ([NavPhysical]::HeaderDiff($heroHeader.bytes,$dice.bytes,$dice.w,$dice.stride) -gt 2) 'Dice header changed'
  if($cycle -eq 0){$roll=Find-Action 1;$snapshot=$roll.shot;Click $roll.box[0] $roll.box[1];Start-Sleep -Milliseconds 100;$active=Shot 'active-roll';Check ([NavPhysical]::HeaderDiff($snapshot.bytes,$active.bytes,$active.w,$active.stride) -lt 2) 'roll preserves fixed header';Click 67 28}
  else {Click ([int]($dice.w/2)) 88}
  Start-Sleep -Milliseconds 350;$returned=Shot;Check (Hero $returned) 'Dice back returns hero without restart'
  $a=Find-Action 0;Click ([int]($a.shot.w/2)) $a.box[1];Start-Sleep -Milliseconds 300;$attack=Shot ("attacks-$cycle");Check (!(Hero $attack)) 'Attacks opens';Check ([NavPhysical]::Gold($attack.bytes,$attack.w,$attack.h,$attack.stride,([int]($attack.w/2-1.5)),($attack.h-54)) -gt 4) 'abilities dock is selected'
  Click ([int]($attack.w/2)) 88;Start-Sleep -Milliseconds 300;$returned=Shot;Check (Hero $returned) 'attack back returns hero'
  $a=Find-Action 0;Click $a.box[0] $a.box[1];Start-Sleep -Milliseconds 300;Click ([int]($a.shot.w/2)) 85;Start-Sleep -Milliseconds 300;$returned=Shot;Check (Hero $returned) 'advancement remains reachable and returns'
  Check ((Get-FileHash $profile).Hash -eq $before -and (Get-FileHash ($profile+'.bak')).Hash -eq $before) 'profile and backup bytes unchanged'
  $cycles+=@{cycle=$cycle;diceBack=$true;attacksBack=$true;advancementBack=$true;sameProcess=$game.Id;profileUnchanged=$true}
  Write-Output ('VTT_PHYSICAL_NAV_CYCLE_PASS: '+$cycle)
 }
 Click 45 28;Start-Sleep -Milliseconds 300;Click 110 90;Start-Sleep -Milliseconds 350;$homeFrame=Shot 'home-before-dice'
 Click ([int]($homeFrame.w*.73)) ([int]($homeFrame.h*.718));Start-Sleep -Milliseconds 400;$standalone=Shot 'standalone-dice';Check ([NavPhysical]::HeaderDiff($homeFrame.bytes,$standalone.bytes,$homeFrame.w,$homeFrame.stride) -gt 2) 'Home Dice opens'
 Click ([int]($homeFrame.w/2)) 165;Start-Sleep -Milliseconds 350;$homeFrameAgain=Shot 'home-returned';Check ([NavPhysical]::HeaderDiff($homeFrame.bytes,$homeFrameAgain.bytes,$homeFrame.w,$homeFrame.stride) -lt 2) 'standalone Dice returns home'
 Check ((Get-FileHash $profile).Hash -eq $before -and (Get-FileHash ($profile+'.bak')).Hash -eq $before) 'final archive and backup unchanged'
 $errors=Select-String -Path $log -Pattern 'NullReferenceException|ArgumentException|InvalidOperationException|Exception:|Getting control|Invalid GUILayout|GUI Error|EndLayoutGroup'
 Check (!$errors) 'no GUI/runtime exceptions in actual player log'
 @{status='passed';candidateRun=43612557699;source=$report.sourceCommit;version=$report.version;cycles=$cycles;standaloneBack=$true;productionBinaryUnchanged=$true;profileSha256=$before;physicalAndroid=$false} | ConvertTo-Json -Depth 8 | Set-Content (Join-Path $root 'verdict.json')
 Write-Output 'VTT_PHYSICAL_NAVIGATION_PASS: five real pointer roundtrips in unchanged candidate; standalone Home Dice/back; profile+backup unchanged; no GUI/runtime exceptions'
}
catch {$failure=$_;Write-Output ('PHYSICAL_NAV_DIAGNOSTIC: '+$_);try{Shot 'failure'|Out-Null}catch{}}
finally {
 if(!$game.HasExited){Stop-Process $game.Id -Force}
 foreach($p in Get-ChildItem $root -Filter '*.png'){
  $b=[Drawing.Bitmap]::new($p.FullName);$thumb=[Drawing.Bitmap]::new(440,[int](440*$b.Height/$b.Width));$g=[Drawing.Graphics]::FromImage($thumb);$ms=[IO.MemoryStream]::new()
  try{$g.DrawImage($b,0,0,$thumb.Width,$thumb.Height);$thumb.Save($ms,[Drawing.Imaging.ImageFormat]::Jpeg);Write-Output ('VTT_PHYSICAL_NAV_JPEG:'+$p.BaseName+':'+[Convert]::ToBase64String($ms.ToArray()))}finally{$g.Dispose();$b.Dispose();$thumb.Dispose();$ms.Dispose()}
 }
}
if($failure){throw $failure}
