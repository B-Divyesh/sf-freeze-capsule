# Review 11 — save Linux freeze clues before reboot

**Verdict: PASS**

**Reviewed:** 6 September 2026 UTC  
**Live URL:** <https://freeze-capsule.sociobot.in>  
**Implementation candidate:** `d645cfe150217e48cf5b8645987575ab10abdb43`  
**Documentation baseline:** `89fc5bc3337aef04681990e0b2d818bd84c673d2`  
**Published CLI release:** `v0.1.2`, source `55069d4c3478cd19ba29cb238e31cc2aaf3fe015`

Finding count: **0**. Untested-claim count: **0**.

## Job, audience, and first action before scrolling

Fresh 390×844 phone and 1440×900 desktop Chromium contexts opened the live
home page without scrolling.

| Item | Observed live text |
| --- | --- |
| Job | “Save freeze clues before you reboot” |
| Audience | “For desktop Linux users who need graphics, kernel, process, and session context after a freeze.” |
| First action | “Try it with sample data” |
| Result | “See a redacted report in one click.” |

The phone primary action ended at y=472 and its three facts ended by y=613.
Neither viewport overflowed horizontally at normal text size.

## Live review

- The one-click sample opened `/demo?demo=1` with journal, graphics, process,
  and display-session evidence: an AMD ring timeout, `amdgpu`, Chrome, and
  Cinnamon.
- The persistent label said “Demo — sample data, nothing is saved” and included
  **Reset demo** and **Install Freeze Capsule**. Reset removed seeded
  `demo:changed`, restored `demo:loaded` and all evidence rows, and preserved
  `real:marker`. No foreign request or page/console error occurred.
- Home, Demo, Privacy, Terms, a deliberate missing route, and `/404.html` each
  had one `h1`, one `main`, a route-specific title, no Axe violation, and no
  horizontal overflow. The missing route returned an expected HTTP 404 with a
  complete designed page. Crawled links returned HTTP 200 where appropriate.
- The factory URL verifier returned HTTP 200 in 927 ms with no console error,
  `lang=en`, title, main landmark, and complete image alt text. The skip link
  was present and reduced-motion hid the scan effect. Keyboard, history/hash,
  touch-target, 200% reflow, clipboard recovery, and package-error recovery
  are covered by the passing browser suite.
- The static routes set no cookies and made no tracking, analytics, advertising,
  or third-party request. GitHub release lookup is the separately tested,
  explicit-action exception. There is no backend, 429, offline-reload, or
  automatic-update promise to test.

## Clean checkout, claims, and installed artifact

A new clone at the candidate passed `npm ci`, then every one of the 29 exact
commands in `.factory/claims.json` separately: `sample-report`,
`sample-fixture`, `demo-private`, `encrypted-redacted`, `demo-capture-render`,
`redaction-coverage`, `bounded-retention`, `watchdog-gap`, `rolling-snapshot`,
`cli-local-only`, `free-license`, `linux-live-capture`, `linux-only-capture`,
`hard-freeze-limit`, `limited-source-report`, `hotkey-capture`,
`installer-checksum`, `json-output`, `encryption-format`, `key-permissions`,
`current-snapshot`, `build-output`, `release-workflow-declaration`,
`normal-state-directory`, `local-evidence-removal`, `site-no-tracking`,
`release-lookup-request`, `platform-package-selection`, and `redaction-limits`.

`npm test` passed 11 Rust tests, the watchdog integration, and 41 Playwright
tests. `npm run build` produced `dist/site`; JavaScript was 17.08 kB raw / 6.21
kB gzip and CSS was 12.25 kB raw / 3.52 kB gzip. `cargo fmt --check`, `cargo
clippy --all-targets -- -D warnings`, and `cargo package --allow-dirty` passed.

In a new consumer directory, the public POSIX installer installed
`freeze-capsule 0.1.2`. Its `--json demo` created temporary encrypted evidence
and a report byte-for-byte equal to the live browser fixture. Empty JSON list
returned `[]`; `render latest` clearly said to capture first. GitHub listed 13
release assets; all seven packages in `SHA256SUMS` downloaded and matched.

## Earlier findings

I inspected reviews 1–10, verification reports 1–3, and polish reports 1–8.
The prior closure ledger remains proved: F-1-1 through F-1-50, F-2-1 through
F-2-21, F-3-1, F-4-1 through F-4-23, F-5-1 through F-5-2, F-6-1 through F-6-3,
F-7-1 through F-7-4, and F-8-1 are closed. Review 9 had no open finding.
F-10-1 remains closed because the documented installer now selects `v0.1.2`
and the installed demo exactly matches the browser fixture. No minor finding
reopened.

## Conclusion

**PASS.** Zero findings of every severity and zero untested public claims.
