param([string]$Gh = 'gh')
$ErrorActionPreference = 'Stop'
# Owner-authorized transfer: values travel only over gh stdin to environment Secrets.
# Never write the decrypted password, base64 keystore or generated CI key to disk/logs.
$repository = 'waitermisanthrope-creator/DnD-VTT'
$environmentName = 'unity-ci'
$expected = 'c1c1b3e6537f10819a3042817ac91535b47754ed65d084e635f84ff2b1f44c8e'
$folder = Join-Path $env:USERPROFILE '.dnd-vtt-unity/signing'
$store = Join-Path $folder 'unity-release.p12'
$secret = Join-Path $folder 'password.dpapi.xml'
if (!(Test-Path -LiteralPath $store) -or !(Test-Path -LiteralPath $secret)) { throw 'Original release signing files missing; never generate a replacement' }
$policy = (& $Gh api "repos/$repository/environments/$environmentName/deployment-branch-policies" | ConvertFrom-Json).branch_policies
if ($LASTEXITCODE -ne 0 -or $policy.Count -ne 1 -or $policy[0].name -cne 'experiment/unity-vtt' -or $policy[0].type -cne 'branch') { throw 'Secrets environment must allow only the experimental branch' }
function Set-ProtectedSecret([string]$Name, [string]$Value) {
    $start = [Diagnostics.ProcessStartInfo]::new()
    $start.FileName = (Get-Command $Gh).Source
    foreach ($part in @('secret','set',$Name,'--repo',$repository,'--env',$environmentName)) { $start.ArgumentList.Add($part) }
    $start.UseShellExecute = $false; $start.CreateNoWindow = $true
    $start.RedirectStandardInput = $true; $start.RedirectStandardOutput = $true; $start.RedirectStandardError = $true
    $process = [Diagnostics.Process]::Start($start)
    $process.StandardInput.Write($Value); $process.StandardInput.Close()
    $null = $process.StandardOutput.ReadToEnd(); $null = $process.StandardError.ReadToEnd()
    $process.WaitForExit()
    if ($process.ExitCode -ne 0) { throw "Secret transfer failed: $Name (no secret values logged)" }
    $process.Dispose()
    Write-Output "SECRET_STORED: $Name"
}
try {
    $secure = Import-Clixml -LiteralPath $secret
    $password = [Net.NetworkCredential]::new('', $secure).Password
    $certificate = [Security.Cryptography.X509Certificates.X509Certificate2]::new($store, $password, [Security.Cryptography.X509Certificates.X509KeyStorageFlags]::EphemeralKeySet)
    $digest = $certificate.GetCertHashString([Security.Cryptography.HashAlgorithmName]::SHA256).ToLowerInvariant()
    if (!$certificate.HasPrivateKey -or $digest -cne $expected) { throw 'Release certificate differs from published 1.00.00; transfer refused' }
    Write-Output "SIGNING_CERTIFICATE_MATCH: $digest"
    Set-ProtectedSecret 'UNITY_ANDROID_KEYSTORE_BASE64' ([Convert]::ToBase64String([IO.File]::ReadAllBytes($store)))
    Set-ProtectedSecret 'UNITY_ANDROID_KEYSTORE_PASSWORD' $password
    $names = & $Gh secret list --repo $repository --env $environmentName --json name | ConvertFrom-Json
    if ($LASTEXITCODE -ne 0) { throw 'Cannot check existing artifact encryption secret' }
    if ('UNITY_CI_ARTIFACT_PASSWORD' -notin $names.name) {
        $artifactPassword = [Convert]::ToBase64String([Security.Cryptography.RandomNumberGenerator]::GetBytes(48))
        Set-ProtectedSecret 'UNITY_CI_ARTIFACT_PASSWORD' $artifactPassword
    }
} finally {
    if ($certificate) { $certificate.Dispose() }
    $password = $null; $artifactPassword = $null; $secure = $null
}
Write-Output 'Original encrypted signing files preserved; no plaintext temporary files created.'
