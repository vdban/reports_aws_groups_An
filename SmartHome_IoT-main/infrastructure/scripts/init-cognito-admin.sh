#!/bin/bash
# Set permanent password for Cognito admin user after stack deploy
set -e

USER_POOL_ID="${1:?Usage: ./init-cognito-admin.sh USER_POOL_ID ADMIN_PASSWORD}"
ADMIN_PASSWORD="${2:?Missing admin password}"

aws cognito-idp admin-set-user-password \
  --user-pool-id "$USER_POOL_ID" \
  --username admin \
  --password "$ADMIN_PASSWORD" \
  --permanent \
  --region "${AWS_REGION:-ap-southeast-2}"

aws cognito-idp admin-add-user-to-group \
  --user-pool-id "$USER_POOL_ID" \
  --username admin \
  --group-name admin \
  --region "${AWS_REGION:-ap-southeast-2}" 2>/dev/null || true

echo "✅ Cognito admin password set (username: admin)"
