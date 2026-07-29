# Deploy frontend lên EC2 (chạy từ BẤT KỲ thư mục nào trong project)
# Usage: .\infrastructure\scripts\deploy-frontend.ps1 -Ec2Host IP -KeyPath key.pem
param(
    [Parameter(Mandatory=$true)][string]$Ec2Host,
    [string]$KeyPath = "",
    [string]$ApiUrl = ""
)

if (-not $ApiUrl) { $ApiUrl = "http://$Ec2Host" }

# ── Tự tìm thư mục gốc project (chứa package.json với name smarthome-iot) ──
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$RootDir   = Split-Path -Parent (Split-Path -Parent $ScriptDir)   # scripts → infrastructure → root

# Kiểm tra
$PkgJson = Join-Path $RootDir "package.json"
if (-not (Test-Path $PkgJson)) {
    Write-Error "Không tìm thấy package.json tại $RootDir"
    exit 1
}
$PkgName = (Get-Content $PkgJson | ConvertFrom-Json).name
if ($PkgName -ne "smarthome-iot") {
    Write-Error "Sai thư mục — package.json tên '$PkgName', cần 'smarthome-iot'"
    exit 1
}

Write-Host "Root: $RootDir"
Write-Host "EC2 Host: $Ec2Host"
Write-Host "API URL: $ApiUrl"
Write-Host ""

# ── Build frontend ──────────────────────────────────────────────
Set-Location $RootDir

# Cài dependencies nếu chưa có
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 npm install..."
    npm install --silent
}

$env:VITE_API_URL      = $ApiUrl
$env:VITE_ALLOW_REGISTER = "false"

Write-Host "🔨 Building frontend (VITE_API_URL=$ApiUrl)..."
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Error "Build thất bại"
    exit $LASTEXITCODE
}

$DistPath = Join-Path $RootDir "dist"
if (-not (Test-Path $DistPath)) {
    Write-Error "Không tìm thấy dist/ sau khi build"
    exit 1
}

Write-Host "✅ Build xong: $DistPath"
Write-Host ""

# ── Upload lên EC2 ──────────────────────────────────────────────
$SshTarget = "ec2-user@$Ec2Host"
$SshOpts   = @("-o", "StrictHostKeyChecking=no", "-o", "ConnectTimeout=10")
if ($KeyPath) { $SshOpts += @("-i", $KeyPath) }

Write-Host "📤 Upload dist/ → $SshTarget:/opt/smarthome/dist/ ..."

# Tạo thư mục đích
ssh @SshOpts $SshTarget "mkdir -p /opt/smarthome/dist" 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Error "Không SSH được vào EC2. Kiểm tra IP, key và Security Group (port 22)"
    exit 1
}

# Upload
scp @SshOpts -r "$DistPath\*" "${SshTarget}:/opt/smarthome/dist/"
if ($LASTEXITCODE -ne 0) {
    Write-Error "SCP thất bại"
    exit 1
}

# Reload nginx
ssh @SshOpts $SshTarget "sudo systemctl reload nginx 2>/dev/null || true"

Write-Host ""
Write-Host "=============================="
Write-Host "  Deploy hoàn tất!"
Write-Host "  Mở: http://$Ec2Host"
Write-Host "=============================="
