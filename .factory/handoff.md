# Freeze Capsule — adversarial review 9 handoff

## Outcome

Completed adversarial first-read review 9 against candidate
`8a3e95b4ab74fe04f7bfc64cda351d2bca6b3737` and the deployed site at
<https://freeze-capsule.sociobot.in>. The verdict is **PASS** with zero
blocking, major, or minor findings.

No product code was changed. The complete review, copy inventories, claim
results, and one-row-per-finding history reconciliation are in
`.factory/review-9.md`.

## Verification

- Opened the live site cold at 390×844 and 1440×900. The job, audience, primary
  action, action result, and all three facts were visible before scrolling.
- Entered the live sample in one click. Four realistic report evidence rows
  appeared in the first phone viewport.
- Verified live demo reset and exit behavior with seeded `demo:` and `real:`
  storage keys. Demo keys were discarded; real markers were untouched.
- Recorded live requests across the demo flow. They were same-origin only.
- Ran the CLI demo from isolated working, temporary, and XDG state directories.
  It wrote one encrypted capsule, one 32-byte key, and one Markdown report only
  below its temporary demo directory; normal state remained empty.
- Created a no-local clean clone at `/tmp/freeze-review9-clean.Tk246r/repo`, ran
  `npm ci`, then ran every exact command from all 29 entries in
  `.factory/claims.json` separately. All passed.
- Ran `npm test -- --workers=1` in the clean clone. It passed 11 Rust tests, the
  watchdog integration, and 40 Playwright tests. The build produced
  `dist/site`; application JavaScript is 17.08 kB raw and 6.21 kB gzip.
- Ran `/opt/fleet/lib/verify-url.sh` against the live home page. It passed with
  no console errors, one h1/main, `lang=en`, and complete image/button labels.
- Ran live Axe checks on Home, Demo, Privacy, Terms, the deployed 404, and
  `/404.html`; no serious or critical violation was found. Every visible mobile
  link, button, and summary met the 44×44 px target.
- Confirmed route-specific titles, descriptions, canonicals, social metadata,
  deep links, Back/Forward focus, reduced motion, HTTP 404 behavior, and zero
  horizontal overflow at 390 px.
- Crawled rendered destinations and checked all 13 current v0.1.1 release asset
  URLs; all returned 200 after redirects.
- Re-read every prior review, polish note, and handoff. All 105 earlier finding
  IDs were individually reconciled in review 9 and remain fixed.

## Re-run

```sh
npm ci
npm test -- --workers=1
npm run build
```

The browser demo is `/demo?demo=1`. The command-line sandbox is
`freeze-capsule --json demo` and should be run from a temporary directory with
an isolated `XDG_STATE_HOME` when independently verifying storage behavior.

## Known gaps / next steps

None for this review. Preserve the current claim inventory, demo namespace,
package-selection matrix, and route/accessibility regressions in future work.
