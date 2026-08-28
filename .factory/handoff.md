# Freeze Capsule — polish round 3 handoff

## Outcome

All cumulative review findings are repaired. The production code commit is
`89416b221144702026916874ad4b2c4fa0b5e86c`; it is deployed to
<https://freeze-capsule.sociobot.in> through the `sf-freeze-capsule` Azure
Static Web App.

The repair makes demo storage disposable on every exit, including browser
history and the standalone HTTP 404 document. It also restores a real unknown
route response instead of a soft 404, preserves the blueprint visual system,
aligns README/copy-audit wording with the tested product, and records the full
review mapping in `.factory/polish-3.md`.

## Run and verify

```sh
npm ci
npm test -- --workers=1
cargo clippy --all-targets -- -D warnings
cargo build --release
npm run build
```

The static artifact is `dist/site`. Deploy it with the work-order static
configuration: build with `npm ci && npm run build:site`, then deploy
`dist/site` to the configured Static Web App.

## Exact verification evidence

- Final clean clone: `/tmp/freeze-capsule-polish-3-final-code.Ol3GaL` at
  `89416b221144702026916874ad4b2c4fa0b5e86c`.
- `npm ci` completed with 0 vulnerabilities.
- All 25 exact commands from `.factory/claims.json` passed individually in
  that clone.
- `npm test -- --workers=1` passed: 10 Rust unit tests, watchdog integration,
  and 33 Playwright tests.
- `cargo clippy --all-targets -- -D warnings`, `cargo build --release`, and
  `npm run build` passed. The final clone produced
  `target/release/freeze-capsule` (2,422,280 bytes) and
  `dist/site/index.html` (1,770 bytes).
- Final bundle: JavaScript 13.94 kB (5.21 kB gzip); CSS 11.68 kB (3.38 kB
  gzip); original hero WebP remains below 300 kB.
- Production deployment completed with
  `swa deploy ./dist/site --env production` using the configured app token.
- `/opt/fleet/lib/verify-url.sh https://freeze-capsule.sociobot.in/` passed:
  HTTP 200, 794 ms cold load, no console/page errors, `lang=en`, one
  `h1`, one `main`, and no missing image alt text.
- Live Axe checks passed with no serious or critical findings on `/`,
  `/demo?demo=1`, `/privacy`, `/terms`, and `/missing-sheet`.
- Live cold browser checks confirmed the 390×844 first screen, one-click
  report, demo reset/exit isolation through Privacy, Home, Back, and the real
  404, route headings, and route-specific titles. `/missing-sheet` returns
  HTTP 404; the only browser console event there is Chromium’s expected failed
  document event for that intentional 404, with no failed helper resource or
  application error.
- Mobile Lighthouse: Performance 100, Accessibility 100, LCP 1.1 s, CLS 0,
  and TBT 60 ms.
- Screens: `.factory/evidence/home-390-polish-3.png`,
  `.factory/evidence/demo-390-polish-3.png`, and
  `.factory/evidence/404-390-polish-3.png`.

## Known gaps and next steps

None. The release workflow remains ready to build publishable CLI assets when
the factory creates the next version tag.
