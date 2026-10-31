#!/usr/bin/env bash
# Runs on the server. GitHub Actions pipes it in over SSH (`ssh … 'bash -s' < deploy.sh`)
# after CI passes on main, so the script always matches the commit being deployed.
# Pulls main, builds, and reloads the running app. A failed step exits before the reload,
# so the site keeps serving the last good build. See docs/DEPLOY.md.
#
# Everything sits inside main() so bash parses the whole script before running any of it.

main() {
  set -euo pipefail
  local dir="$HOME/arayhan.com"
  export COREPACK_ENABLE_DOWNLOAD_PROMPT=0

  cd "$dir"
  git fetch --prune origin main
  git checkout -f -B main origin/main
  echo "deploying $(git rev-parse --short HEAD): $(git log -1 --format=%s)"

  pnpm install --frozen-lockfile
  pnpm build
  pm2 reload arayhan --update-env

  for _ in $(seq 1 20); do
    if curl -fsS -o /dev/null http://127.0.0.1:3200/; then
      echo "live"
      return 0
    fi
    sleep 1
  done
  echo "app did not answer on :3200 after reload" >&2
  pm2 logs arayhan --lines 40 --nostream >&2 || true
  return 1
}

main "$@"
