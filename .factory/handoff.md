# Freeze Capsule — review 11 handoff

## Outcome

Review 11 passed with zero findings and zero untested claims. F-10-1 remains
closed.

Review 11 independently checked fresh 390×844 phone and 1440×900 desktop live
flows, demo isolation and reset, accessibility, privacy, legal routes, 404,
reduced motion, all 29 declared claims from a new clone, the complete quality
gate, and a new public consumer installation. The full report is
`.factory/review-11.md`.

The live installers now select release `v0.1.2`. That release was built from
`55069d4c3478cd19ba29cb238e31cc2aaf3fe015`, where the command-line demo and
browser fixture both use the current “hard freeze” sample. A clean consumer
install of the public Linux archive produced `freeze-capsule 0.1.2`, passed its
published checksum, and produced a report byte-for-byte equal to the browser
sample.

The implementation SHA is `d645cfe150217e48cf5b8645987575ab10abdb43`.
The release-binary source SHA is `55069d4c3478cd19ba29cb238e31cc2aaf3fe015`.
The documentation baseline SHA is `89fc5bc3337aef04681990e0b2d818bd84c673d2`.
The later documentation report does not require another product image.

The final site was deployed to <https://freeze-capsule.sociobot.in> with static
deployment ID `50e4d333-3273-4da4-b619-2b9567a7f973`.

## What changed

- Released `v0.1.2` for Linux, macOS Intel, macOS Apple silicon, and Windows.
- Pinned both public one-line installers to `v0.1.2` while preserving their
  documented version overrides.
- Changed the sample-parity claim test to package the release binary, install
  it through `install.sh`, check its version, run its demo, and compare the
  complete rendered report with the browser fixture.
- Added the same packaged-binary parity gate to the Linux release job before
  release assets are assembled.
- Updated `Cargo.toml`, npm metadata, the site build label, changelog, README,
  Homebrew formula, Scoop manifest, and winget manifests to `0.1.2`.
- Fixed horizontal page overflow at 200% text size and added an outcome-based
  regression across the home, demo, privacy, terms, and 404 routes.
- Kept the catalog description verb-first and under 120 characters, then
  copied it to `/work/.evidence/catalog-description.txt`.

## Verification 3

- A no-local clean checkout at `d645cfe` passed `npm ci`, `npm test`
  (11 Rust tests, watchdog integration, 41 browser tests),
  `npm run build`, format, clippy, and package checks.
- All 29 exact `.factory/claims.json` commands passed separately; no claim was
  skipped. Evidence is `/work/.evidence/verify-3-claims.log`.
- Fresh phone and desktop live contexts showed the job, Linux audience, sample
  action, result, and three facts before scrolling. The one-click sample was
  populated, labelled persistently, reset correctly, and did not alter real
  browser state.
- The public POSIX installer installed `freeze-capsule 0.1.2` in a new
  consumer directory, verified its checksum, and produced a byte-for-byte
  browser-sample report. Empty, normal, watch-once, corrupt-input, JSON, and
  key-permission paths behaved as expected.
- All 13 public release assets returned HTTP 200; all seven checksum-listed
  packages matched; `latest.json` names 0.1.2 with seven platform entries.
- The live runtime asset hashes match the `d645cfe` clean build. Axe found no
  violations on Home, Demo, Privacy, Terms, the deployed 404, or `/404.html`.
  The deliberate HTTP 404 is expected and has a working designed page.
- `.factory/verification-3.md` is the full independent report.

## Finding disposition

- F-10-1: closed. The live POSIX installer downloaded `v0.1.2`; the installed
  binary's full demo report matched `site/public/assets/demo-report.json`.
- Reviews 1–9 and both earlier verification reports: all 105 findings listed
  as closed in review 10 remain closed. Their affected paths were covered by
  the 29 clean-checkout claim commands and the final unit, integration,
  browser, package, and live checks.
- Repair audit: a 200% text-size overflow was found on the install and terms
  sections, fixed, regression-tested, deployed, and verified at 390 px.

## Verification

From a fresh clone at `d645cfe150217e48cf5b8645987575ab10abdb43`:

- `npm ci` passed.
- All 29 exact commands in `.factory/claims.json` passed separately. Evidence:
  `/work/.evidence/repair-2-final-claims.json`.
- `npm test` passed: 11 Rust unit tests, the watchdog integration,
  and 41 Playwright tests.
- `npm run build` produced `dist/site`.
- `cargo fmt --check`, `cargo clippy --all-targets -- -D warnings`, and
  `cargo package --allow-dirty` passed. The crate package is version `0.1.2`.
- Initial JavaScript is 17,082 bytes raw and 6.21 kB gzip. CSS is 12,250 bytes
  raw and 3.52 kB gzip. The hero image is 49,308 bytes.

Release workflow run `34009735634` passed every Linux, macOS, Windows, release,
checksum, and packaged-demo-parity job. The public release has 13 assets. Every
asset returned HTTP 200, all seven distributable packages matched
`SHA256SUMS`, and `latest.json` named version `0.1.2` with seven platform
entries. The released Homebrew, Scoop, and winget metadata matches this repo.
Release metadata is in `/work/.evidence/release-v0.1.2.json`.

The public POSIX installer was run in a new directory. It installed version
`0.1.2`, verified SHA-256, and passed the full demo-parity comparison. The same
installed binary also passed empty-state recovery, invalid-format exit code 2,
normal capture and render, persistence across processes, eight-capsule
retention, a rolling snapshot, 0600 key permissions, a 32-byte key, and the
`FCAP1` encrypted-file header. Installer evidence is in
`/work/.evidence/repair-2-live-install.txt` and
`/work/.evidence/repair-2-installed-artifact.json`.

The live custom domain passed the factory URL check in 885 ms with no home-page
console errors. Fresh 390×844 phone and 1440×900 desktop contexts showed the
job, Linux audience, sample action, action result, and three facts before any
scroll. The one-click demo showed all four evidence groups in the first screen,
kept its sample label, reset to the same report, discarded only `demo:` state,
preserved real-data markers, and made only same-origin requests.

The final live route audit covered home, demo, privacy, terms, a deliberate
HTTP 404, and the standalone 404 page. Every route had its own title, one h1,
one main landmark, no Axe violations, no undersized visible controls, correct
keyboard focus, reduced-motion behavior, and no horizontal page scroll at 200%
text size. Privacy checks found no cookies or third-party requests. Evidence,
screenshots, and browser output are under
`/work/.evidence/repair-2-live-d645cfe/`. The deliberate missing-route request
produces the expected browser 404 resource message; its designed document,
navigation, and accessibility checks pass.

Final mobile Lighthouse scores were 100 Performance, 100 Accessibility, 100
Best Practices, and 100 SEO. LCP was 1.1 seconds, CLS was 0, and total transfer
was 62,097 bytes. INP is not reported for a synthetic page load.

## Run and verify

```sh
npm ci
npm test
npm run build
cargo fmt --check
cargo clippy --all-targets -- -D warnings
cargo package --allow-dirty
```

Browser demo: <https://freeze-capsule.sociobot.in/demo?demo=1>

CLI demo:

```sh
freeze-capsule --json demo
```

## Known limits and operator actions

- A hard machine lock can stop every user process. Freeze Capsule preserves the
  last completed rolling snapshot but cannot guarantee a final write.
- Real freeze-recovery success on physical graphics hardware was not induced in
  this container. Collection failure and watchdog-gap paths are covered by
  deterministic tests.
- The separate Homebrew tap still serves its earlier formula. Work-order scope
  did not permit modifying another repository. Publish the released `v0.1.2`
  `freeze-capsule.rb` asset to that tap before advertising the Homebrew command
  as current. The README states this condition.
- The winget manifests are ready in `winget/`; the owner must submit them to
  `microsoft/winget-pkgs`.
- macOS and Windows packages are unsigned, as disclosed. Signing requires the
  owner's platform certificates.
- This is a free MIT-licensed product. No billing offer or billing metadata is
  required.
