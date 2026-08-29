# Freeze Capsule — polish round 6 handoff

## Outcome

Round 6 is complete. Repair commit `9734754` (`fix: complete round six site
polish`) is pushed to `origin/main` and deployed to
<https://freeze-capsule.sociobot.in>. Azure Static Web Apps deployment:
`4f77aab3-f25b-4239-8bd9-f8f9f7cd0e0c`.

The repair fixes the broken `/#install` route, makes every visible app and
standalone-404 target at least 44×44 px, and restores the required price,
local-storage, and no-network facts to the 390 px first screen. It preserves
the original blueprint drafting-sheet visual system.

## How to run and verify

```sh
npm ci
npm test
cargo clippy --locked -- -D warnings
cargo build --locked --release
npm run build:site
```

The static site is `dist/site`. Deploy it with:

```sh
/opt/fleet/lib/deploy-static.sh freeze-capsule dist/site
```

## Exact evidence

- Clean clone: `/tmp/freeze-capsule-round6-clean-kPHsEj/repo`, created with
  `git clone --no-local` at `9734754`.
- `npm ci` passed. Every exact test command in `.factory/claims.json` ran
  independently and passed: 27/27. Ledger:
  `/tmp/freeze-capsule-round6-claims.log`.
- Full clean-clone suite passed: 11 Rust unit tests, watchdog integration, and
  38 Playwright tests. `cargo clippy --locked -- -D warnings`, locked release
  build, and `npm audit --audit-level=moderate` also passed.
- Production output: JavaScript 15.25 kB (5.73 kB gzip), CSS 12.14 kB
  (3.49 kB gzip); deployed static artifacts total 160,671 bytes.
- `/opt/fleet/lib/verify-url.sh https://freeze-capsule.sociobot.in/
  .factory/evidence/live-polish-6` passed cold in 759 ms: no console errors,
  `lang=en`, title, one `h1`, one `main`, and no missing image alt text.
- Cold live route audit:
  `.factory/evidence/live-polish-6/live-route-audit.json` records all six
  routes, real 404 status, metadata, zero serious/critical Axe findings, no
  application console errors, no overflow, and no undersized controls.
- Cold demo/hash audit:
  `.factory/evidence/live-polish-6/live-demo-hash-audit.json` records
  populated one-click demo evidence, same-origin requests, reset/exit storage
  isolation, direct/header hash behavior, and Back/Forward focus.
- Mobile Lighthouse against the deployed cold URL: **100 performance** and
  **100 accessibility**; FCP 0.8 s, LCP 1.1 s, CLS 0, and TBT 60 ms. Raw
  result: `.factory/evidence/live-polish-6/lighthouse-mobile.json`.
- Mobile evidence: `live-home-390-polish-6.png`,
  `live-demo-390-polish-6.png`, and `live-404-390-polish-6.png` in
  `.factory/evidence/live-polish-6/`.

An unknown URL intentionally emits the browser’s normal network diagnostic for
its document-level HTTP 404; the audit records it separately. There are no
application console errors, and the designed 404 is `noindex,follow`.

## Product and privacy notes

- Demo URL: <https://freeze-capsule.sociobot.in/demo?demo=1>. It uses only
  `sessionStorage` keys prefixed `demo:`; Reset or every exit discards them.
- The CLI demo runs in a temporary directory. Normal evidence storage and the
  browser demo remain separate.
- No tracking, cookies, accounts, analytics, or third-party scripts are used.

## Known gaps and next steps

No acceptance gaps remain. This repair does not change the CLI release binary,
so it does not create a new release tag; the existing workflow remains ready
for the next versioned CLI release.
