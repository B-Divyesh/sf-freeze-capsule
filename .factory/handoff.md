# Freeze Capsule — adversarial review 8 handoff

## Outcome

Review-only commit for work order `freeze-capsule-review-8`. No product code,
assets, dependencies, or deployment configuration changed.

Verdict: **FAIL**. `.factory/review-8.md` records one minor finding:
`F-8-1`, an unlisted and non-actionable privacy promise about deleting local
evidence. The reviewer did not repair it, per the work order.

## Verification performed

- Cold live Chromium checks at 390×844 and 1440×900.
- Live one-click demo, storage isolation, reset, leave-demo, request-log, route
  focus/history, 404, link crawl, metadata, mobile overflow, and Axe checks.
- CLI demo from a separate temporary directory, with temporary capsule and
  report output confirmed.
- Fresh clone at `/tmp/freeze-capsule-review8.Yl0BXI/repo`, then `npm ci`.
- Every exact test command in all 28 `.factory/claims.json` entries passed
  independently.
- `npm test` passed: 11 Rust tests, watchdog integration, and 39 Playwright
  tests. Site build output is 16.95 kB JavaScript (6.14 kB gzip).

## Next step

Resolve F-8-1 by deleting the removal claim, or documenting a tested Linux
storage location and adding a tagged claim test that proves deleting it removes
the local key and capsules. Then rerun the full adversarial review.
