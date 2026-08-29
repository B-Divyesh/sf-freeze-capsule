# Freeze Capsule — adversarial review 7 handoff

## Outcome

Review 7 is complete against commit
`53c098114b86b489eedd4ddc44a2067dbe15b6f3` and the live site at
<https://freeze-capsule.sociobot.in>. The verdict is **FAIL** with four findings.
No product code was changed.

The blocking defect is the phone download selector: Android is presented as
desktop Linux and receives the x86_64 `.deb`; iPhone is presented as macOS and
receives the x86_64 `.pkg`. The picker also says packages are ready without
checking that a matching asset exists, and that behavior has no claims entry.
Three minor plain-language findings cover the first-screen term “state
directory” and two ambiguous README headings.

Full evidence, copy counts, claim results, and the historical-finding ledger are
in `.factory/review-7.md`.

## How verification was run

```sh
git clone --no-local /work/repo /tmp/freeze-review7.RrJvFI/repo
cd /tmp/freeze-review7.RrJvFI/repo
npm ci
# Every exact .factory/claims.json test command was run separately.
npm test
```

Results:

- 27/27 declared claim commands passed.
- `npm test` passed: 11 Rust tests, watchdog integration, and 38 Playwright
  tests.
- `npm run build` produced `dist/site`; application JavaScript is 15.25 kB
  (5.73 kB gzip).
- `/opt/fleet/lib/verify-url.sh https://freeze-capsule.sociobot.in/
  /tmp/review7-verify` passed in 620 ms.
- Live Axe checks found no serious or critical issue on Home, Demo, Privacy,
  Terms, the unknown-route 404, or `/404.html`.
- A live crawl returned 200 for every intended route, static file, external
  link, and all 13 published v0.1.1 assets. The designed unknown route returned
  404.
- The live browser demo was checked in fresh storage at 390×844. Reset and exit
  clear `demo:` keys, preserve seeded non-demo keys, and make only same-origin
  requests.
- The CLI demo ran from `/tmp/freeze-review7-cli.GHdy2S` with a separate state
  directory. Its capsule, key, and report stayed inside the generated temporary
  demo directory.
- Pixel 7 and iPhone 13 user-agent runs reproduce the blocking package-picker
  defect recorded as F-7-1.

## Remaining work

1. Repair mobile platform/package selection and add the missing claim with
   Android, iPhone, desktop, missing-asset, and architecture cases.
2. Replace the first-screen storage jargon.
3. Rename README headings **Use** and **What it records** as specified in the
   review.
4. Re-run every claim command, the full suite, the live phone flow, and the
   complete earlier-finding ledger.
