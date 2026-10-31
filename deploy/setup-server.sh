#!/usr/bin/env bash
# One-time (and safe to re-run) setup of the production server, as the `ubuntu` user with
# sudo: Node 24, pnpm, pm2, Nginx, the app in ~/arayhan.com, and HTTPS. See docs/DEPLOY.md.
#
#   bash setup-server.sh            # everything except HTTPS
#   bash setup-server.sh --https    # also issue the certificate (DNS must point here first)
#   BRANCH=dev bash setup-server.sh # first build from another branch (deploys always use main)

main() {
  set -euo pipefail
  local branch="${BRANCH:-main}"
  local repo="https://github.com/arayhan/arayhan.com.git"
  local dir="$HOME/arayhan.com"
  local email="rayhanprima99@gmail.com"
  export DEBIAN_FRONTEND=noninteractive COREPACK_ENABLE_DOWNLOAD_PROMPT=0

  # Next builds need about 2GB; small servers get a swap file instead of an OOM kill.
  if [ "$(awk '/MemTotal/ {print $2}' /proc/meminfo)" -lt 2500000 ] && ! swapon --show | grep -q .; then
    sudo fallocate -l 2G /swapfile
    sudo chmod 600 /swapfile
    sudo mkswap /swapfile
    sudo swapon /swapfile
    echo "/swapfile none swap sw 0 0" | sudo tee -a /etc/fstab >/dev/null
  fi

  sudo apt-get update -y
  sudo apt-get install -y ca-certificates curl git nginx certbot python3-certbot-nginx

  if ! node -v 2>/dev/null | grep -q '^v24\.'; then
    curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
    sudo apt-get install -y nodejs
  fi
  sudo corepack enable
  command -v pm2 >/dev/null || sudo npm install -g pm2

  if [ ! -d "$dir/.git" ]; then
    git clone "$repo" "$dir"
  fi
  cd "$dir"
  git fetch --prune origin "$branch"
  git checkout -f -B "$branch" "origin/$branch"
  pnpm install --frozen-lockfile
  pnpm build

  if pm2 describe arayhan >/dev/null 2>&1; then
    pm2 reload arayhan --update-env
  else
    pm2 start node_modules/next/dist/bin/next --name arayhan --cwd "$dir" -- start -p 3000 -H 127.0.0.1
  fi
  pm2 save
  sudo env PATH="$PATH:/usr/bin" pm2 startup systemd -u "$USER" --hp "$HOME" >/dev/null

  local site=/etc/nginx/sites-available/arayhan.com
  if [ ! -f "$site" ]; then
    sudo cp "$dir/deploy/nginx/arayhan.com.conf" "$site"
  fi
  sudo ln -sf "$site" /etc/nginx/sites-enabled/arayhan.com
  sudo rm -f /etc/nginx/sites-enabled/default
  sudo nginx -t
  sudo systemctl enable --now nginx
  sudo systemctl reload nginx

  if sudo ufw status 2>/dev/null | grep -q "Status: active"; then
    sudo ufw allow OpenSSH
    sudo ufw allow "Nginx Full"
  fi

  if [ "${1:-}" = "--https" ]; then
    sudo certbot --nginx -d arayhan.com -d www.arayhan.com --redirect -m "$email" --agree-tos -n
  fi

  echo "done: $(git rev-parse --short HEAD) on :3000 behind Nginx"
}

main "$@"
