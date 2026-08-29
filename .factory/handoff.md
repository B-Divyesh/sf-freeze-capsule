# Freeze Capsule — adversarial review 6 handoff

## Outcome

Review 6 is complete and the verdict is **FAIL**. No product code was changed.
The full report is `.factory/review-6.md`.

Three findings remain:

- **F-6-1 (blocking):** the header **Install** link and direct `/#install`
  deep link retain the hash but leave the install section outside the viewport.
- **F-6-2 (major):** several mobile header, footer, report-summary, and static
  404 controls are smaller than the required 44×44 px.
- **F-6-3 (minor):** the first-screen facts omit the required offline fact.

The cold landing message, one-click populated demo, sandbox cleanup, route
metadata, designed 404, claim inventory, external links, visual identity, and
current automated suite otherwise passed.

## Verification performed

- Fresh live Chromium contexts at 390×844 and 1440×900.
- One-click demo, sample evidence viewport position, banner, reset, demo-state
  isolation, real-marker preservation, and request logging.
- Live route metadata, Back/Forward heading focus, unknown-route HTTP status,
  hash deep link behavior, and every discovered link.
- Live Axe on Home, Demo, Privacy, Terms, the unknown-route 404, and
  `/404.html`: zero reported violations. A separate bounding-box audit found
  F-6-2 because Axe does not enforce the 44×44 px factory baseline.
- `/opt/fleet/lib/verify-url.sh https://freeze-capsule.sociobot.in/`: pass in
  766 ms with no page or console errors.
- No-local clean clone at `/tmp/freeze-review6.hMKU7B/repo`: `npm ci`, every
  exact command in `.factory/claims.json` (27/27), and
  `npm test -- --workers=1` all passed. The full suite ran 11 Rust tests, the
  watchdog integration, and 36 Playwright tests.
- `npm run build` ran through the suite and produced `dist/site`; JavaScript is
  14.83 kB (5.55 kB gzip).
- Direct `freeze-capsule demo` equivalent from fresh temporary working/state
  directories wrote only one encrypted capsule, one key, and one Markdown
  report beneath its temporary demo directory. Normal state remained empty.

## Reproduce the open findings

1. At desktop width, open the live home page and activate header **Install**.
   The URL becomes `/#install`, but `scrollY` remains 0 and the install section
   remains below the viewport. A direct load of `/#install` behaves the same.
2. At 390 px, measure every visible `a`, `button`, and `summary`. Examples:
   header Demo is 31.8×44 px, app footer Terms is 39.8×15 px, demo report
   summary is 330×36 px, and standalone 404 links are 25.5 px high.
3. Read the three hero facts. They cover price, demo isolation, and retention,
   but not offline/no-network behavior.

## Next steps

Repair all three findings, add hash-route and all-control-size regressions, and
rerun review 6 from a fresh live context and clean clone. The review standard
requires zero remaining findings before PASS.
