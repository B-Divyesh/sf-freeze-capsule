# Review 3 handoff

## Outcome

Completed the requested adversarial first-read review without modifying product
code. Added .factory/review-3.md and committed the review documents.

**Verdict: FAIL.** One blocking issue remains: demo state is cleared by the
dedicated **Install Freeze Capsule** exit but not when a visitor leaves /demo
through ordinary header navigation, the wordmark, or history navigation.

## Verification performed

- Cold live checks at 390×844 and 1440×900.
- Live one-click demo, request/storage log, reset, explicit exit, and ordinary
  navigation cleanup checks.
- Read all prior reviews, polish notes, verification notes, handoff, brief,
  design, demo contract, claims inventory, current source, README, 404 shell,
  and static deployment configuration.
- Fresh clone at /tmp/freeze-capsule-review-3.wCAU2j: npm ci,
  npm test -- --workers=1, and npm run build all passed.
- Ran every one of the 25 exact commands declared by .factory/claims.json
  independently; all passed.

## Required follow-up

Clear every demo: session key before rendering any non-demo route when the
current route is demo, including ordinary links and popstate. Add a Playwright
regression covering header Privacy, wordmark Home, and browser Back from demo.
Then rerun the review checklist and claims suite.
