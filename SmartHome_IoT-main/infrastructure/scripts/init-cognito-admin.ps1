# Set permanent password for Cognito admin user after stack deploy
param(
    [Parameter(Mandatory=$true)][string]$UserPoolId,
    [Parameter(Mandatory=$true)][string]$AdminPassword,
    [string]$Region = "ap-southeast-2"
)

aws cognito-idp admin-set-user-password `
    --user-pool-id $UserPoolId `
    --username admin `
    --password $AdminPassword `
    --permanent `
    --region $Region

if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

aws cognito-idp admin-add-user-to-group `
    --user-pool-id $UserPoolId `
    --username admin `
    --group-name admin `
    --region $Region 2>$null

Write-Host "Cognito admin password set (username: admin)"
