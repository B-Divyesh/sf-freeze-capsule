# Independent verification — FAIL

**Candidate:** `d4d2159da56397a519f4deba1f0cbc8744df3d81`
**Live URL:** <https://freeze-capsule.sociobot.in>
**Verified:** 28 August 2026 (UTC)  
**Verdict:** **FAIL — release blockers remain.**

## First read and demo

A cold desktop and 390 px mobile load clearly say what it does: “Save freeze
clues before you reboot”; who it is for: desktop Linux users after a lockup;
and what to do first: **Try it with sample data**. The adjacent copy says it
will show a redacted report in one click. The action opens `/demo`; running the
sample showed the AMD/Cinnamon/Chrome evidence and Reset demo hid it again.

This part passes. The demo stored only `sessionStorage["demo:ran"]`, used no
third-party request, and had no localStorage state until the optional release
lookup was explicitly requested.

## Required claim checks

All commands in `.factory/claims.json` were run first after `npm ci`, against
the shipped demo entry point. They all passed.

| Claim | Exact command | Result |
| --- | --- | --- |
| `sample-report` | `npm run test:site -- --grep @claim:sample-report` | 1 passed |
| `demo-private` | `npm run test:site -- --grep @claim:demo-private` | 1 passed |
| `encrypted-redacted` | `npm run test:site -- --grep @claim:encrypted-redacted` | 1 passed |
| `bounded-retention` | `npm run test:site -- --grep @claim:bounded-retention` | 1 passed |
| `watchdog-gap` | `sh tests/watchdog.sh` | `watchdog gap promotion: ok` |
| `free-license` | `npm run test:site -- --grep @claim:free-license` | 1 passed |

Passing those commands does not cure the claim-coverage blocker below.

## Local build, package, and CLI checks

- `npm ci`: passed; audit reported zero vulnerabilities.
- `npm test`: passed — 4 Rust unit tests, the watchdog suspension integration,
  and 9 Playwright tests.
- `cargo clippy --all-targets -- -D warnings`, `npm run build`,
  `cargo build --release`, and `cargo package --allow-dirty`: passed.
  The package was emitted as `target/package/freeze-capsule-0.1.0.crate`.
- A clean consumer root installed the package with
  `cargo install --path /work/repo --root <temporary-root> --locked`.
  `--help`, `--json demo`, normal `capture`, `list`, JSON `render latest`, and
  `doctor` worked. The demo capsule began `FCAP1\0`, did not contain plaintext
  `amdgpu`, and the report contained journal, graphics, processes, and
  display-session sections.
- Invalid recovery behaved correctly: `render latest` in an empty directory
  and `watch --interval 0 --timeout 90 --once` both exited 1 with actionable
  errors.
- Ten captures one second apart left exactly eight retained capsules; a normal
  `watch --interval 1 --timeout 2 --once --json` wrote its prebuffer.
- The published Linux x86_64 tarball passed `sha256sum -c SHA256SUMS` and its
  binary ran the sample. The live `install.sh`, installed into a temporary
  directory, also verified/downloaded the release and ran the sample.

## Browser, privacy, deployment, and performance evidence

- Live `/`, `/demo`, `/privacy`, `/terms`, and an unknown route each had one
  `<main>`, one `<h1>`, correct route title, no console/page errors, and no
  axe serious/critical findings. The home image had meaningful alt text.
- Desktop and 390×844 mobile had no horizontal overflow. Keyboard activation
  opened the demo; focus was a visible 3 px `#ffcb45` outline with 4 px offset.
  Reduced motion hid the scan animation.
- The optional release check made exactly the disclosed request to
  `https://api.github.com/repos/B-Divyesh/sf-freeze-capsule/releases/latest`,
  completed with “v0.1.0 packages are ready”, and caused no error. The demo
  flow made only same-origin requests. There are no product server-side API
  endpoints, authentication flows, PWA/service worker, or rate-limitable
  product APIs to test.
- The live HTML, JS, CSS, and hero asset SHA-256 values exactly matched the
  local production build (`index-CfsPehB8.js`, `index-DNwuVfvG.css`, and
  `freeze-capsule-hero.webp`). Built sizes were 14,210 B JS (5.44 KB gzip),
  11,476 B CSS (3.33 KB gzip), and 49,308 B hero WebP: all size budgets pass.
- The live response has HSTS, CSP, `nosniff`, strict-origin referrer policy,
  and a restrictive permissions policy. Lighthouse could not be completed in
  this verifier container because Lighthouse could not connect to its supplied
  preinstalled Chromium; this is an environment limitation, not a product
  failure. Browser and axe checks above were executed with the pinned
  Playwright Chromium.

## Release-blocking defects

### P1 — Demo banner controls miss the mandatory 44 px touch target

On the live `/demo` page, both **Reset demo** and **Start for real** measure
36 CSS px high at desktop and 390 px mobile. The contract's accessibility
baseline requires touch targets of at least 44 px. This is observable in
`.demo-bar button` and `.demo-bar a` (`min-height: 36px`) and is not caught by
axe. Increase the controls to at least 44 px and add a regression test that
measures both targets at 390 px.

### P1 — Hashed static assets are not immutable or long-lived cached

The deployed hashed JS, CSS, and WebP assets all return
`Cache-Control: public, must-revalidate, max-age=30`. The performance contract
requires long-lived immutable caching for hashed assets. Configure route/asset
headers for the fingerprinted asset directory (for example one year plus
`immutable`) while retaining short revalidation for HTML. Add a header test.

### P1 — Claims contract is incomplete despite passing listed commands

`watchdog-gap` has no test tagged `@claim:watchdog-gap`, contrary to the
claims contract's exactly-one-tagged-test rule. More importantly, public copy
claims are unlisted or not observably asserted: the site promises a ten-minute
snapshot every 30 seconds, removal of home paths/emails/IPs/secrets, local-only
CLI behavior/no telemetry, and that the demo executes the capture/render path.
The `encrypted-redacted` browser claim test checks report headings but not a
redaction substitution. `demo-private` only observes the browser sample; it
does not prove the CLI privacy claim. Each relied-on claim needs a distinct
entry and an observable sandbox test, or the copy must be removed.

### P1 — Published release cannot be identified as the candidate commit

The live site files match the candidate, but `git ls-remote` shows `main` at
`d4d2159…` and the only published release tag, `v0.1.0`, dereferences to
`9d8dd35e…`; no tag contains the candidate. The Linux release binary is
functional and the Rust source did not change after that tag, but the
installer/release provenance is still not the exact candidate. Tag and release
the tested candidate (or publish an immutable build identity tied to it), then
verify the corresponding checksum and asset.

## Non-blocking notes

- The live release lookup, archive checksum, package links, fallback behavior,
  headers, one-click demo, keyboard operation, focus visibility, and reduced
  motion otherwise worked as intended.
- No production code was modified during this verification.
