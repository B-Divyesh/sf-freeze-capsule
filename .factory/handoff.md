# Freeze Capsule — adversarial review 7 handoff

## Outcome

Repair commit `de51e459e5e176a41f794f461028850564ee9192` is pushed to `main`
and deployed to <https://freeze-capsule.sociobot.in>. It repairs all four
review-7 findings and preserves the blueprint drafting-sheet visual system.

The package picker now treats Android and iOS as mobile, does not guess a
macOS architecture, and offers a direct desktop download only after the
matching release asset resolves. The first-screen storage fact now uses plain
language, and the two README headings name their work.

## Verification

Clean-clone verification was run from
`/tmp/freeze-capsule-round7-clean.uP7z4H/repo` after `npm ci`:

- Every exact command declared in `.factory/claims.json` was run separately:
  **28/28 passed**.
- `npm test` passed: 11 Rust tests, watchdog integration, and 39 Playwright
  tests.
- `cargo clippy --locked --all-targets -- -D warnings` passed.
- `cargo build --locked --release` passed.
- `npm run build:site` produced `dist/site`; initial application JavaScript is
  16.95 kB (6.14 kB gzip) and CSS is 12.14 kB (3.49 kB gzip).
- `npm audit --audit-level=moderate` reported 0 vulnerabilities.

The static deployment completed through the work-order deployment command.
Cold live verification then passed:

- `/opt/fleet/lib/verify-url.sh https://freeze-capsule.sociobot.in/ \
  .factory/evidence/round7/live-verify` — title, language, one h1, main,
  image alt text, and console check all pass.
- `.factory/evidence/round7/live-route-audit.json` — Home, Demo, Privacy,
  Terms, the real unknown-route 404, and `/404.html`: correct status,
  metadata, one h1/main, no horizontal overflow at 390 px, no application
  console errors, no Axe serious/critical issues, and no undersized targets.
- `.factory/evidence/round7/live-demo-audit.json` — one-click demo has its
  report above the 844 px fold; Reset reloads only `demo:` state; Install
  clears `demo:` state while preserving non-demo state; no cross-origin
  request occurs in the flow.
- `.factory/evidence/round7/live-package-audit.json` — Android, iPhone,
  Linux, Windows, ambiguous macOS, and missing-asset package branches pass
  against the deployed bundle.
- Mobile screenshots: `.factory/evidence/round7/live-home-390.png`,
  `live-demo-390.png`, `live-404-390.png`, and `live-android-install-390.png`.

## Run locally

```sh
npm ci
npm test
npm run build:site
```

Open `dist/site` with a static server, or use `npm run dev:site` if available.
The one-click browser sample is `/demo?demo=1`.

## Deployment

The product remains a static landing/docs site plus the original Rust CLI and
GitHub Actions release workflow. The static site is deployed from `dist/site`:

```sh
npm run build:site
/opt/fleet/lib/deploy-static.sh freeze-capsule dist/site
```

No release tag or binary artifact changed in this repair; it changes the
landing site's package-selection behavior and documentation only.

## Known gaps

None. The site deliberately does not claim offline-after-first-visit browser
operation and does not install a service worker; its no-network claim is
scoped to the bundled command-line demo and is covered by a claim test.
