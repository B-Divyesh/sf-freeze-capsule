# Freeze Capsule — review 10 handoff

## Outcome

The seven-day independent review is complete against implementation candidate
`05c6e7b99a75f024dd76c148bb568005a05d8a4c`, documentation SHA
`c8a13d84a5996addc86d1a83290fa9f257fcb16a`, and the live site at
<https://freeze-capsule.sociobot.in>.

**Verdict: FAIL.** One major finding remains and no claim was left untested.

F-10-1: the documented installer downloads `v0.1.1`, built from older commit
`73390fd47f9881e38fafd7645f3b56b941c8536a`. Its command-line demo says “hard
lock,” while the current source and live browser sample say “hard freeze.” The
public claim that both reports match is therefore false for a clean consumer
installation. The source-level claim test passes because it does not exercise
the published artifact.

No product code was changed. The full finding, claim table, browser evidence,
installed-artifact results, and one-row-per-finding history audit are in
`.factory/review-10.md`.

## Verification completed

- Opened the live site in fresh 390×844 phone and 1440×900 desktop contexts.
  The job, audience, sample action, action result, and three facts were visible
  before scrolling.
- Entered the realistic sample in one click. Its persistent label, Reset, exit,
  isolated `demo:` storage, real-marker preservation, and same-origin request
  boundary passed.
- Ran every exact command from all 29 `.factory/claims.json` entries separately
  after `npm ci` in a no-local clean clone. Every command passed.
- Ran `npm test`: 11 Rust tests, the watchdog integration, and 40 Playwright
  tests passed.
- Ran `npm run build`; `dist/site` was produced. Live HTML, JavaScript, CSS, and
  demo-fixture hashes matched the clean build.
- Ran the factory live URL verifier, full Axe checks on six documents, mobile
  touch-target checks, keyboard/focus/history checks, reduced motion, 200% text,
  failure recovery, links, metadata, privacy requests, legal pages, and the
  designed HTTP 404.
- Lighthouse mobile scored 100 for Performance, Accessibility, Best Practices,
  and SEO. LCP was 1.1 s, TBT 50 ms, and CLS 0.
- Ran the documented POSIX installer in an isolated consumer directory. The
  archive checksum passed, normal and invalid CLI paths worked, all seven
  checksummed release files verified, and all 13 release-page assets returned
  200.
- Compared the installed demo report with the source-built candidate and live
  browser fixture. The direct one-line mismatch proves F-10-1.
- Re-read and reconciled all 105 earlier review findings, the four original
  verification findings, both verification reports, and all polish ledgers.

## Re-run

```sh
npm ci
npm test
npm run build
```

The browser demo is `/demo?demo=1`. The CLI sandbox command is
`freeze-capsule --json demo`; run it with isolated `TMPDIR` and
`XDG_STATE_HOME` values when checking storage behavior.

## Required next step

Publish all platform packages, `SHA256SUMS`, and `latest.json` from the current
implementation candidate or a later repair commit. Then install through the
documented one-line installer and compare the complete installed demo report
with the live browser fixture. Review 10 cannot become PASS until F-10-1 is
closed and a fresh review finds no other issue.
