$ErrorActionPreference = "Stop"
$repo = "B-Divyesh/sf-freeze-capsule"
$version = if ($env:FREEZE_CAPSULE_VERSION) { $env:FREEZE_CAPSULE_VERSION } else { "latest" }
$installDir = if ($env:FREEZE_CAPSULE_INSTALL_DIR) { $env:FREEZE_CAPSULE_INSTALL_DIR } else { Join-Path $env:LOCALAPPDATA "FreezeCapsule\bin" }
$base = if ($version -eq "latest") { "https://github.com/$repo/releases/latest/download" } else { "https://github.com/$repo/releases/download/$version" }
$asset = "freeze-capsule-windows-x86_64.zip"
$tempDir = Join-Path ([System.IO.Path]::GetTempPath()) ("freeze-capsule-" + [guid]::NewGuid())
New-Item -ItemType Directory -Path $tempDir | Out-Null
try {
  Invoke-WebRequest "$base/$asset" -OutFile (Join-Path $tempDir $asset)
  Invoke-WebRequest "$base/SHA256SUMS" -OutFile (Join-Path $tempDir "SHA256SUMS")
  $line = Get-Content (Join-Path $tempDir "SHA256SUMS") | Where-Object { $_ -match [regex]::Escape($asset) } | Select-Object -First 1
  if (-not $line) { throw "No checksum was published for $asset." }
  $expected = ($line -split "\s+")[0].ToLowerInvariant()
  $actual = (Get-FileHash (Join-Path $tempDir $asset) -Algorithm SHA256).Hash.ToLowerInvariant()
  if ($actual -ne $expected) { throw "Checksum verification failed." }
  Expand-Archive (Join-Path $tempDir $asset) -DestinationPath $tempDir -Force
  New-Item -ItemType Directory -Path $installDir -Force | Out-Null
  Copy-Item (Join-Path $tempDir "freeze-capsule.exe") (Join-Path $installDir "freeze-capsule.exe") -Force
  Write-Host "Installed freeze-capsule.exe to $installDir"
  Write-Host "Add this directory to PATH, then run: freeze-capsule demo"
} finally { Remove-Item $tempDir -Recurse -Force -ErrorAction SilentlyContinue }
