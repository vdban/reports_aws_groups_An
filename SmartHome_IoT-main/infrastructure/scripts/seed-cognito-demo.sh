#!/bin/bash
# Tạo tài khoản demo trong Cognito User Pool
# Usage: ./seed-cognito-demo.sh USER_POOL_ID
# Hoặc tự lấy từ stack: ./seed-cognito-demo.sh (cần STACK_NAME)
set -e

REGION="${AWS_REGION:-ap-southeast-2}"
STACK_NAME="${STACK_NAME:-smarthome-stack}"

# Lấy Pool ID từ tham số hoặc CloudFormation output
if [ -n "$1" ]; then
  POOL_ID="$1"
else
  echo "Lấy Cognito User Pool ID từ stack $STACK_NAME..."
  POOL_ID=$(aws cloudformation describe-stacks \
    --stack-name "$STACK_NAME" \
    --region "$REGION" \
    --query "Stacks[0].Outputs[?OutputKey=='CognitoUserPoolId'].OutputValue" \
    --output text)
fi

if [ -z "$POOL_ID" ] || [ "$POOL_ID" = "None" ]; then
  echo "❌ Không tìm thấy User Pool ID. Truyền trực tiếp: ./seed-cognito-demo.sh ap-southeast-2_XXXXX"
  exit 1
fi

echo "User Pool: $POOL_ID"
echo ""

# ---------- Hàm tạo user ----------
create_user() {
  local USERNAME="$1"
  local PASSWORD="$2"
  local DISPLAY_NAME="$3"
  local GROUP="$4"

  echo "→ Tạo user: $USERNAME ($DISPLAY_NAME) [$GROUP]"

  # Tạo user (suppress welcome email)
  aws cognito-idp admin-create-user \
    --user-pool-id "$POOL_ID" \
    --username "$USERNAME" \
    --message-action SUPPRESS \
    --user-attributes \
      Name=name,Value="$DISPLAY_NAME" \
    --region "$REGION" 2>/dev/null || echo "  (user đã tồn tại, bỏ qua)"

  # Đặt mật khẩu permanent
  aws cognito-idp admin-set-user-password \
    --user-pool-id "$POOL_ID" \
    --username "$USERNAME" \
    --password "$PASSWORD" \
    --permanent \
    --region "$REGION"

  # Thêm vào group
  aws cognito-idp admin-add-user-to-group \
    --user-pool-id "$POOL_ID" \
    --username "$USERNAME" \
    --group-name "$GROUP" \
    --region "$REGION" 2>/dev/null || true

  echo "  ✅ $USERNAME / $PASSWORD"
}

# ---------- Tài khoản demo ----------
create_user "admin"    "Admin@Demo2024"  "Quản trị viên"   "admin"
create_user "user1"    "User1@Demo2024"  "Người dùng 1"    "user"
create_user "user2"    "User2@Demo2024"  "Người dùng 2"    "user"

echo ""
echo "=============================="
echo "  Demo accounts (Cognito)"
echo "=============================="
echo "  admin  / Admin@Demo2024  [admin]"
echo "  user1  / User1@Demo2024  [user]"
echo "  user2  / User2@Demo2024  [user]"
echo "=============================="
