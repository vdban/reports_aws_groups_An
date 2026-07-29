# Deploy CloudFormation stack (Windows PowerShell)
# Usage:
#   .\infrastructure\scripts\deploy-stack.ps1 -KeyPairName smarthome-key
#   .\infrastructure\scripts\deploy-stack.ps1 -KeyPairName smarthome-key -AdminPassword "Admin@Demo2024"
param(
    [string]$StackName     = "smarthome-stack",
    [Parameter(Mandatory=$true)][string]$KeyPairName,
    [string]$AdminPassword = "Admin@Demo2024",
    [string]$Region        = "ap-southeast-2"
)

$ErrorActionPreference = "Stop"

# Tim thu muc goc project
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$RootDir   = Split-Path -Parent (Split-Path -Parent $ScriptDir)
Set-Location $RootDir

$Template = Join-Path $RootDir "infrastructure\cloudformation\smarthome-stack.yaml"
if (-not (Test-Path $Template)) {
    Write-Error "Khong tim thay template: $Template"
    exit 1
}

Write-Host "Looking up default VPC in $Region..."
$VpcId = aws ec2 describe-vpcs --region $Region `
    --filters Name=isDefault,Values=true `
    --query "Vpcs[0].VpcId" --output text

if (-not $VpcId -or $VpcId -eq "None") {
    Write-Error "Khong co default VPC. AWS Console -> EC2 -> VPC -> Create default VPC"
    exit 1
}

$SubnetId = aws ec2 describe-subnets --region $Region `
    --filters Name=vpc-id,Values=$VpcId Name=map-public-ip-on-launch,Values=true `
    --query "Subnets[0].SubnetId" --output text

if (-not $SubnetId -or $SubnetId -eq "None") {
    $SubnetId = aws ec2 describe-subnets --region $Region `
        --filters Name=vpc-id,Values=$VpcId `
        --query "Subnets[0].SubnetId" --output text
}

Write-Host "Using VPC=$VpcId Subnet=$SubnetId"
Write-Host "Deploying stack $StackName in $Region..."

aws cloudformation deploy `
    --template-file $Template `
    --stack-name $StackName `
    --parameter-overrides `
        ProjectName=smarthome `
        KeyPairName=$KeyPairName `
        AllowedSSHIp=0.0.0.0/0 `
        VpcId=$VpcId `
        SubnetId=$SubnetId `
    --capabilities CAPABILITY_NAMED_IAM `
    --region $Region

if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host ""
Write-Host "=== Stack Outputs ==="
aws cloudformation describe-stacks `
    --stack-name $StackName `
    --region $Region `
    --query "Stacks[0].Outputs" `
    --output table

$PoolId = aws cloudformation describe-stacks `
    --stack-name $StackName `
    --region $Region `
    --query "Stacks[0].Outputs[?OutputKey=='CognitoUserPoolId'].OutputValue" `
    --output text

Write-Host ""
Write-Host "Setting Cognito admin password..."
& "$ScriptDir\init-cognito-admin.ps1" -UserPoolId $PoolId -AdminPassword $AdminPassword -Region $Region

Write-Host ""
Write-Host "Admin login: admin / $AdminPassword"
Write-Host "Web URL: xem output WebURL o tren"
