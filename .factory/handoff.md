# Freeze Capsule review 1 handoff

## Outcome

Adversarial first-read review 1 is complete. Verdict: **FAIL** with 50 findings, including four blocking findings. No product code was changed.

The principal blockers are the two-click demo behind a one-click promise, retained demo state after **Start for real**, a browser sample claim tested only against hard-coded browser copy, and a global CLI privacy promise exercised only by the demo subcommand. The report also records soft-404 behavior, back-button focus loss, stale route metadata, a mobile first-screen layout miss, incomplete claim inventory, and copy/terminology issues.

Full evidence and proposed fixes are in `.factory/review-1.md`.

## Verification performed

- Fresh 390×844 and 1440×900 browser contexts against the live site.
- Demo run/reset/exit, Web Storage inspection, and complete request logging.
- All ten exact `.factory/claims.json` commands after `npm ci` in a clean clone: passed.
- `npm test`: passed (5 Rust tests, watchdog integration, 17 Playwright tests).
- `npm run build`: passed; `dist/site` produced.
- `/opt/fleet/lib/verify-url.sh`: passed with no console errors.
- Live Playwright axe checks on `/`, `/demo`, `/privacy`, `/terms`, and a missing route: zero violations.
- Link crawl: all 12 unique anchors reachable.
- Metadata, HTTP status, deep links, keyboard route focus, Back behavior, reduced motion, touch targets, headers, asset sizes, release tag, and release assets checked.
- Earlier handoff and verification findings rechecked individually.

## Known gaps

The review is intentionally documentation-only. Product repairs remain for every finding in `.factory/review-1.md`; do not treat passing tests as acceptance until the missing and under-scoped claim coverage is corrected and the full adversarial checklist is rerun.
