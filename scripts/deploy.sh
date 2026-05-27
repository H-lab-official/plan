#!/bin/bash
# Deploy root project: Vite (dist/) + Express (server/dist/) + SQLite
set -euo pipefail

APP_DIR="${DEPLOY_PATH:-/var/www/plan4eve}"
cd "$APP_DIR"

echo "==> Pull latest..."
git fetch origin main
git reset --hard origin/main

echo "==> Install dependencies (incl. devDeps for build)..."
npm ci

echo "==> Build frontend (dist/) + server (server/dist/)..."
npm run build

echo "==> Seed zones (INSERT OR IGNORE)..."
npm run seed

echo "==> Restart PM2..."
pm2 restart 4eve-zones || pm2 start ecosystem.config.js
pm2 save

echo "==> Health check..."
sleep 2
curl -fsS http://localhost:3000/api/zones | head -c 200
echo ""

echo "==> Deploy done."
pm2 status
