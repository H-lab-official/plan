#!/bin/bash
# One-time VPS setup (run manually before first GitHub Actions deploy)
# Usage: bash scripts/bootstrap-server.sh
set -euo pipefail

APP_DIR="${DEPLOY_PATH:-/var/www/plan4eve}"
REPO_URL="${DEPLOY_REPO:-https://github.com/YOUR_USER/plan4eve.git}"  # public repo

echo "==> Install Node.js 20 + PM2..."
if ! command -v node >/dev/null; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt install -y nodejs git
fi
sudo npm install -g pm2

echo "==> Prepare app directory..."
sudo mkdir -p /var/www
sudo chown "$USER:$USER" /var/www

if [ ! -d "$APP_DIR/.git" ]; then
  git clone "$REPO_URL" "$APP_DIR"
fi

cd "$APP_DIR"
bash scripts/deploy.sh

echo "==> Optional: setup Caddy"
echo "    bash scripts/install-caddy.sh plan4.devza.autos"
