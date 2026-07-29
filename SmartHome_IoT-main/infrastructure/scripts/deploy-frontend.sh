#!/bin/bash
# Deploy frontend build to EC2 (nginx serves static files)
set -e

EC2_HOST="${1:?Usage: ./deploy-frontend.sh EC2_PUBLIC_IP [SSH_KEY.pem]}"
SSH_KEY="${2:-}"
API_URL="${3:-http://${EC2_HOST}}"

echo "Building frontend with VITE_API_URL=$API_URL"
export VITE_API_URL="$API_URL"
export VITE_ALLOW_REGISTER=false

npm run build

SSH_OPTS=(-o StrictHostKeyChecking=no)
if [ -n "$SSH_KEY" ]; then
  SSH_OPTS+=(-i "$SSH_KEY")
fi

echo "Uploading dist/ to ec2-user@${EC2_HOST}:/opt/smarthome/dist ..."
rsync -avz --delete -e "ssh ${SSH_OPTS[*]}" dist/ "ec2-user@${EC2_HOST}:/opt/smarthome/dist/"

echo "Done! Open http://${EC2_HOST}"
