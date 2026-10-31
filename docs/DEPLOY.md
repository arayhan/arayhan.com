# Deploy

arayhan.com runs on the owner's own server (Tencent Cloud, `43.157.241.50`, user `ubuntu`),
not on Vercel. Every push to `main` that passes CI deploys itself.

```
push to main
  -> GitHub Actions "CI": build job (lint, typecheck, test, build)
  -> deploy job, only if build is green and the push is to main
       ssh ubuntu@43.157.241.50 'bash -s' < deploy/deploy.sh
         cd ~/arayhan.com
         git fetch + checkout -f -B main origin/main
         pnpm install --frozen-lockfile
         pnpm build
         pm2 reload arayhan
         smoke test http://127.0.0.1:3000/
  -> Nginx :443 arayhan.com -> 127.0.0.1:3000 (www.arayhan.com -> 301 apex)
```

A failed install or build stops before `pm2 reload`, so the site keeps serving the last good
build. `pnpm build` rewrites `.next` in place; a request during the build (about a minute) can
briefly fail. Accepted for a personal site.

## Files

| File | Role |
|---|---|
| `.github/workflows/ci.yml` | `build` on every push and PR to main/dev; `deploy` on a green push to main |
| `deploy/deploy.sh` | What a deploy runs on the server, piped in from the commit being deployed |
| `deploy/setup-server.sh` | One-time, re-runnable server setup |
| `deploy/nginx/arayhan.com.conf` | The Nginx site, copied (not linked) to `/etc/nginx/sites-available/arayhan.com` |

## GitHub secrets (`arayhan/arayhan.com`, Actions)

| Secret | Value |
|---|---|
| `SSH_HOST` | `43.157.241.50` |
| `SSH_USER` | `ubuntu` |
| `SSH_KEY` | private half of the deploy key `arayhan_deploy` (ed25519, no passphrase) |
| `SSH_KNOWN_HOSTS` | `ssh-keyscan 43.157.241.50` output; pins the server's host key |

The deploy key's public half is in `/home/ubuntu/.ssh/authorized_keys` on the server, with the
comment `arayhan.com deploy`.

## Server setup (once)

1. Add the deploy key's public line to `~/.ssh/authorized_keys`.
2. In the Tencent Cloud console firewall, allow TCP 22, 80 and 443.
3. DNS: `arayhan.com` and `www` have an A record to `43.157.241.50` and **no AAAA record**
   (an AAAA to another host breaks Let's Encrypt and IPv6 visitors).
4. Copy and run the script: `bash setup-server.sh`. It installs Node 24, pnpm (corepack),
   pm2, Nginx and Certbot, adds 2GB swap on small machines, clones the repo to
   `~/arayhan.com`, builds, starts `arayhan` under pm2 (restarts on reboot) and enables the
   Nginx site. `BRANCH=dev bash setup-server.sh` builds another branch the first time.
5. Once DNS points here: `bash ~/arayhan.com/deploy/setup-server.sh --https` issues the
   certificate for both names, redirects HTTP to HTTPS, and renews on its own.

## Day to day

- Logs: `pm2 logs arayhan`. Status: `pm2 status`.
- Deploy by hand: `bash ~/arayhan.com/deploy/deploy.sh` on the server, or re-run the
  workflow in GitHub.
- Roll back: revert the commit on `main` and push (preferred), or on the server
  `git -C ~/arayhan.com checkout -f <sha> && pnpm -C ~/arayhan.com build && pm2 reload arayhan`
  (the next push to main undoes it).
- Rotate the key: make a new key pair, add its public line to `authorized_keys`, update the
  `SSH_KEY` secret, then remove the old line.
- Nginx edits happen in `/etc/nginx/sites-available/arayhan.com` on the server (certbot has
  added its TLS lines there); `sudo nginx -t && sudo systemctl reload nginx`.
