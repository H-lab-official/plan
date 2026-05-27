#!/bin/bash
# รันบน Ubuntu VPS: bash scripts/install-caddy.sh plan4.devza.autos
set -euo pipefail

DOMAIN="${1:-}"
APP_DIR="$(cd "$(dirname "$0")/.." && pwd)"

if [ -z "$DOMAIN" ]; then
  echo "Usage: bash scripts/install-caddy.sh your-domain.com"
  exit 1
fi

echo "==> Installing Caddy..."
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' \
  | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' \
  | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install -y caddy

echo "==> Writing /etc/caddy/Caddyfile for $DOMAIN..."
sudo tee /etc/caddy/Caddyfile > /dev/null <<EOF
${DOMAIN} {
	encode gzip
	reverse_proxy localhost:3000
}
EOF

echo "==> Opening firewall (if ufw active)..."
if command -v ufw >/dev/null && sudo ufw status | grep -q "Status: active"; then
  sudo ufw allow 80/tcp
  sudo ufw allow 443/tcp
fi

echo "==> Starting Caddy..."
sudo systemctl enable caddy
sudo systemctl restart caddy
sudo systemctl status caddy --no-pager

echo ""
echo "Done! https://${DOMAIN}"
echo "Make sure PM2 is running: pm2 status"
echo "DNS A record for ${DOMAIN} must point to this server's IP."
