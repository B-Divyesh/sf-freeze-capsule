# Freeze Capsule — review 4 handoff

## Outcome

Adversarial review 4 is complete at candidate
`784aaa1512ead50241ae3f2d985aefa99bfead46`. The verdict is **FAIL** with 23
findings in `.factory/review-4.md`: four blocking, two major, and seventeen
minor copy/structure findings. Product code was not modified.

## Verification performed

- Opened the live site cold at 390×844 and 1440×900.
- Exercised the one-click demo, Reset, Install exit, ordinary navigation,
  Back/Forward, unknown-route exit, storage isolation, and live request log.
- Ran all 25 exact `.factory/claims.json` commands individually after `npm ci`
  in clean clone `/tmp/freeze-review4-cdX0YK/clone`; all exited successfully.
- Ran `npm test` in that clone: 10 Rust tests, watchdog integration, and 33
  Playwright tests passed.
- Confirmed the build emits `dist/site` and 5.21 kB gzip JavaScript.
- Ran the live POSIX installer into a fresh temporary install directory and ran
  the installed binary's demo.
- Ran `/opt/fleet/lib/verify-url.sh` successfully and live Axe checks on Home,
  Demo, Privacy, Terms, and the unknown-route 404 with zero violations.
- Crawled all static links and all four resolved v0.1.1 download links; all
  intended destinations returned 200.
- Read and independently rechecked every finding from reviews 1–3 and every
  polish/handoff record.

## Remaining work

The complete fixes are specified per finding in `.factory/review-4.md`. The
blocking work is to show realistic report output in the first phone demo
viewport, replace installer/release source-string claim tests with outcome
tests, and remove or test the README build-output claim. Clipboard and package
lookup errors need honest recovery states. The remaining copy should be
rewritten to remove blueprint lore and define technical terms on first use.

## Re-run

```sh
npm ci
npm test
npm run build
```

Then run every command in `.factory/claims.json` individually from a clean
clone and repeat the live 390 px demo, request-log, route, link, and
accessibility checks. A later review should not inherit a PASS from the current
green command exits; it must verify the outcome coverage called out in F-4-2
and F-4-3.
