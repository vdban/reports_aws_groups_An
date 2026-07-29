#!/bin/bash
# Deploy CloudFormation stack (region mặc định: ap-southeast-2)
set -e

STACK_NAME="${1:-smarthome-stack}"
KEY_PAIR="${2:?Usage: ./deploy-stack.sh STACK_NAME KEY_PAIR_NAME [ADMIN_PASSWORD]}"
ADMIN_PASSWORD="${3:-Admin123456}"
REGION="${AWS_REGION:-ap-southeast-2}"

echo "Looking up default VPC in $REGION..."
VPC_ID=$(aws ec2 describe-vpcs --region "$REGION" \
  --filters Name=isDefault,Values=true \
  --query 'Vpcs[0].VpcId' --output text)
if [ -z "$VPC_ID" ] || [ "$VPC_ID" = "None" ]; then
  echo "❌ No default VPC found. Enable default VPC in EC2 → VPC → Actions → Create default VPC"
  exit 1
fi

SUBNET_ID=$(aws ec2 describe-subnets --region "$REGION" \
  --filters Name=vpc-id,Values="$VPC_ID" Name=map-public-ip-on-launch,Values=true \
  --query 'Subnets[0].SubnetId' --output text)
if [ -z "$SUBNET_ID" ] || [ "$SUBNET_ID" = "None" ]; then
  SUBNET_ID=$(aws ec2 describe-subnets --region "$REGION" \
    --filters Name=vpc-id,Values="$VPC_ID" \
    --query 'Subnets[0].SubnetId' --output text)
fi
echo "Using VPC=$VPC_ID Subnet=$SUBNET_ID"

echo "Deploying stack $STACK_NAME in $REGION..."

aws cloudformation deploy \
  --template-file infrastructure/cloudformation/smarthome-stack.yaml \
  --stack-name "$STACK_NAME" \
  --parameter-overrides \
    ProjectName=smarthome \
    KeyPairName="$KEY_PAIR" \
    AllowedSSHIp="0.0.0.0/0" \
    VpcId="$VPC_ID" \
    SubnetId="$SUBNET_ID" \
  --capabilities CAPABILITY_NAMED_IAM \
  --region "$REGION"

echo ""
echo "=== Stack Outputs ==="
aws cloudformation describe-stacks \
  --stack-name "$STACK_NAME" \
  --region "$REGION" \
  --query 'Stacks[0].Outputs' \
  --output table

POOL_ID=$(aws cloudformation describe-stacks --stack-name "$STACK_NAME" --region "$REGION" \
  --query "Stacks[0].Outputs[?OutputKey=='CognitoUserPoolId'].OutputValue" --output text)

echo ""
echo "Setting Cognito admin password..."
chmod +x infrastructure/scripts/init-cognito-admin.sh
./infrastructure/scripts/init-cognito-admin.sh "$POOL_ID" "$ADMIN_PASSWORD"

echo ""
echo "Admin login: admin / $ADMIN_PASSWORD"
echo "Web URL: see WebURL output above"
