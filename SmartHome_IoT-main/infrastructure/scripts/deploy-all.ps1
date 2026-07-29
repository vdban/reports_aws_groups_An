# Deploy backend + frontend to EC2 (Windows PowerShell)
param(
    [Parameter(Mandatory=$true)][string]$Ec2Host,
    [Parameter(Mandatory=$true)][string]$KeyPath,
    [string]$ApiUrl       = "",
    [string]$EnvFile      = "",
    [switch]$FrontendOnly = $false,
    [switch]$SkipBackend  = $false,
    [switch]$SkipFrontend = $false
)

if (-not $ApiUrl) { $ApiUrl = "http://$Ec2Host" }

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$RootDir   = Split-Path -Parent (Split-Path -Parent $ScriptDir)

$PkgJson = Join-Path $RootDir "package.json"
if (-not (Test-Path $PkgJson) -or (Get-Content $PkgJson | ConvertFrom-Json).name -ne "smarthome-iot") {
    Write-Error "Project root not found"
    exit 1
}

Set-Location $RootDir
$KeyPath = Resolve-Path $KeyPath -ErrorAction Stop | Select-Object -ExpandProperty Path

$SshTarget = "ec2-user@$Ec2Host"
$SshOpts   = @("-i", $KeyPath, "-o", "StrictHostKeyChecking=no", "-o", "ConnectTimeout=15")

function Run-SSH([string]$Cmd) {
    ssh @SshOpts $SshTarget $Cmd
    if ($LASTEXITCODE -ne 0) { throw "SSH failed: $Cmd" }
}

function Stage-Backend([string]$Src, [string]$Dst) {
    if (Test-Path $Dst) { Remove-Item $Dst -Recurse -Force }
    New-Item -ItemType Directory -Force -Path $Dst | Out-Null
    robocopy $Src $Dst /E /XD node_modules data /XF .env /NFL /NDL /NJH /NJS /nc /ns /np | Out-Null
}

Write-Host "SmartHome Deploy -> $Ec2Host"

$testSsh = ssh @SshOpts $SshTarget "echo ok" 2>&1
if ($testSsh -ne "ok") {
    Write-Error "Cannot SSH to EC2. Check IP, key, Security Group port 22."
    exit 1
}
Write-Host "SSH OK"

if (-not $FrontendOnly -and -not $SkipBackend) {
    Write-Host "Upload backend (skip node_modules, data, .env)..."
    Run-SSH "sudo mkdir -p /opt/smarthome; sudo chown -R ec2-user:ec2-user /opt/smarthome"

    $StageDir = Join-Path $env:TEMP "smarthome-backend-upload"
    Stage-Backend "$RootDir\backend" $StageDir

    scp @SshOpts -r "$StageDir\*" "${SshTarget}:/opt/smarthome/backend/"
    if ($LASTEXITCODE -ne 0) { Write-Error "SCP backend failed"; exit 1 }
    Remove-Item $StageDir -Recurse -Force -ErrorAction SilentlyContinue

    scp @SshOpts -r "$RootDir\infrastructure" "${SshTarget}:/opt/smarthome/"
    if ($LASTEXITCODE -ne 0) { Write-Error "SCP infrastructure failed"; exit 1 }

    if (-not $EnvFile) {
        $defaultEnv = Join-Path $RootDir "infrastructure\ec2.env.template"
        if (Test-Path $defaultEnv) { $EnvFile = $defaultEnv }
    }
    if ($EnvFile -and (Test-Path $EnvFile)) {
        Write-Host "Upload production .env..."
        scp @SshOpts $EnvFile "${SshTarget}:/opt/smarthome/backend/.env"
        if ($LASTEXITCODE -ne 0) { Write-Error "SCP .env failed"; exit 1 }
    } else {
        $envExists = ssh @SshOpts $SshTarget "test -f /opt/smarthome/backend/.env && echo yes || echo no"
        if ($envExists -ne "yes") {
            Write-Error "Missing .env on EC2. Create infrastructure/ec2.env.template"
            exit 1
        }
    }

    Write-Host "Run ec2-setup.sh..."
    Run-SSH "bash /opt/smarthome/infrastructure/scripts/ec2-setup.sh"
    Write-Host "Backend setup done"
}

if (-not $SkipFrontend) {
    Write-Host "Build frontend..."
    if (-not (Test-Path "$RootDir\node_modules")) { npm install --silent }

    $env:VITE_API_URL        = $ApiUrl
    $env:VITE_ALLOW_REGISTER = "false"

    npm run build
    if ($LASTEXITCODE -ne 0) { Write-Error "Build failed"; exit 1 }

    $DistPath = Join-Path $RootDir "dist"
    Run-SSH "mkdir -p /opt/smarthome/dist"
    scp @SshOpts -r "$DistPath\*" "${SshTarget}:/opt/smarthome/dist/"
    if ($LASTEXITCODE -ne 0) { Write-Error "SCP dist failed"; exit 1 }

    Run-SSH "sudo systemctl reload nginx"
    Write-Host "Frontend deploy done"
}

Write-Host "Done! Open http://$Ec2Host"
$health = ssh @SshOpts $SshTarget "curl -s http://localhost/api/health"
Write-Host "Health: $health"
