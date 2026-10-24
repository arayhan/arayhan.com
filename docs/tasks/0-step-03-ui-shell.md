# 0-step-03-ui-shell

Build the home page on the phase 0 copy so the user can review the UI before SEO/GEO polish and deploy.

## Goal

Every home page section named in docs/PRD.md exists and renders from the typed content files written in phase 0. Layout is mobile-first (docs/rules/project-preferences.md). Motion is showcase-grade but never delays LCP and switches off under prefers-reduced-motion. No backend or API calls: the site is static.

## Deliverables

- One section per PRD home page section, reachable from in-page navigation
- Content in one place (`src/content/`), typed in `src/domain/`
- Reduced-motion variant of every animated section
- A running dev server URL, or screenshots at 375px, tablet and desktop, ready to show the user

## Acceptance Criteria

```bash
pnpm dev
pnpm lint
pnpm typecheck
```

- Every PRD section renders with no console errors.
- `rg "fetch\(|axios" src` finds no network calls: the site is static.

**Depends:** 0-step-02-verify-loop · **Blocks:** 0-gate-ui-review · **handoff:** software-engineer
