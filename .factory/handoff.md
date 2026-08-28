# Review 2 handoff

## Outcome

Performed the requested read-only adversarial review of the live Freeze Capsule site and the candidate checkout. Product code was not changed. The review is **FAIL** and is recorded in `.factory/review-2.md`.

## Verification performed

- Cold live-browser checks at 390×844 and 1440×900.
- One-click browser demo, reset/exit storage behavior, same-origin request log, live route metadata, link crawl, 404 status, keyboard Back/Forward focus, mobile overflow, reduced motion, and live axe smoke checks.
- Fresh clone at `/tmp/freeze-capsule-review-clean`; `npm ci`; every declared `@claim` check passed (11/11); direct CLI demo in fresh `TMPDIR`/`XDG_STATE_HOME` wrote only its temporary demo directory.
- Full clean-clone `npm test` failed: 18 Playwright tests passed and the mobile first-screen regression test failed because its exact text selector cannot match the numbered fact list. The focused rerun failed identically.

## Known gaps / next steps

Fix the test selector and run `npm test` successfully. Complete the static 404 shell metadata and skip navigation. Add claims/tests or remove all unlisted capability, privacy, installer, platform, release, and storage statements enumerated as F-2-3 through F-2-20. Replace remaining user-facing CLI/fixture jargon.
