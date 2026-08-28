# Independent verification 2 — PASS

**Candidate:** `ef258d4164c81fe32160ca0d0bf27d4b02822267`
**Live URL:** <https://freeze-capsule.sociobot.in>
**Verified:** 28 August 2026 UTC
**Verdict:** **PASS — no release-blocking defects found.**

## First read

Cold-loading the live landing page answered the required questions in plain
words on the first screen:

- **Does:** “Save freeze clues before you reboot.”
- **For whom:** desktop Linux users who need graphics, kernel, process, and
  session context after a lockup.
- **First action:** **Try it with sample data**; adjacent text says it will
  show a redacted report in one click.

The action opens `/demo`. Running **Run sample capture** renders the AMD GPU,
Cinnamon, Chrome, journal, graphics, process, and display-session sample; the
banner says “Demo — sample data, nothing is saved,” and **Reset demo** removes
the result.

## Required claim checks

From the clean candidate checkout, after `npm ci`, every exact command in
`.factory/claims.json` passed against the shipped demo entry point. There are
ten declared claims and ten distinct `@claim:` regression tags.

| Claim | Exact command | Result |
| --- | --- | --- |
| `sample-report` | `npm run test:site -- --grep @claim:sample-report` | 1 passed |
| `demo-private` | `npm run test:site -- --grep @claim:demo-private` | 1 passed |
| `encrypted-redacted` | `npm run test:site -- --grep @claim:encrypted-redacted` | 1 passed |
| `demo-capture-render` | `npm run test:site -- --grep @claim:demo-capture-render` | 1 passed |
| `redaction-coverage` | `npm run test:site -- --grep @claim:redaction-coverage` | 1 passed |
| `bounded-retention` | `npm run test:site -- --grep @claim:bounded-retention` | 1 passed |
| `watchdog-gap` | `npm run test:site -- --grep @claim:watchdog-gap` | 1 passed |
| `rolling-snapshot` | `npm run test:site -- --grep @claim:rolling-snapshot` | 1 passed |
| `cli-local-only` | `npm run test:site -- --grep @claim:cli-local-only` | 1 passed |
| `free-license` | `npm run test:site -- --grep @claim:free-license` | 1 passed |

## Local build, CLI, and package checks

- `npm test` passed: 5 Rust unit tests, the watchdog-gap integration, and all
  17 Playwright tests.
- `cargo fmt --check`, `cargo clippy --all-targets -- -D warnings`, `cargo
  build --release`, and `cargo package --allow-dirty` passed. The package is
  `target/package/freeze-capsule-0.1.1.crate`.
- A clean consumer unpacked that crate and installed it with `cargo install
  --path <unpacked-crate> --root <temporary-root> --locked`. Its public CLI
  `--help`, `--json demo`, `capture`, `--json list`, and `render latest
  --format json` all worked.
- Boundary/recovery checks passed: an empty-directory `render latest` exited
  1 with “no retained capsules; run capture first”; `watch --interval 0
  --timeout 90 --once` exited 1 with “timeout must be greater than a non-zero
  interval.” The claimed retention, redaction, scheduling-gap, and local-only
  boundaries are additionally exercised by the ten claim tests above.
- The live `install.sh`, restricted to a fresh temporary installation
  directory and pinned to `v0.1.1`, downloaded the archive, checked
  `SHA256SUMS`, installed it, and its `--json demo` returned a temporary
  encrypted capsule and redacted report.

## Live deployment, privacy, and browser QA

- The live HTML and current hashed JS/CSS matched the candidate's fresh
  production build byte-for-byte by SHA-256:
  `index-5m5ZsQVL.js` =
  `e701caae06c2e1b50d9d8c98b217fe4393bb175a05dd55c0af75de064d6096e1`;
  `index-CA6SsUt3.css` =
  `29dab3ddd751397c565371eb9e4b6dd844f28a23178c3f091d4f6356242f4594`.
  The candidate differs from release tag `v0.1.1` only in `.factory/handoff.md`;
  the tagged release is an ancestor and contains the same shipped code.
- Live `/`, `/demo`, `/privacy`, `/terms`, and an unknown route each rendered
  a title, one `main`, and one `h1`; they produced no console or page errors.
  Playwright axe found zero serious or critical violations on every route.
- At 390×844 there was no horizontal overflow. Keyboard Enter opened the
  demo; the demo result rendered; **Reset demo** and **Start for real** each
  measured 44 CSS pixels high. Keyboard focus on **Start for real** had a
  visible `3px solid rgb(255, 203, 69)` outline. Under reduced motion the scan
  animation was absent and the demo completed.
- The demo made only same-origin document/JS/CSS requests; it left
  `localStorage` empty and stored only `sessionStorage["demo:ran"]`. Choosing
  **Check published packages** made the disclosed request to
  `api.github.com` and rendered “v0.1.1 packages are ready. Linux was
  detected.” No analytics, sign-in, or product server API exists. Therefore
  no rate-limitable product endpoint, authentication tenant, PWA update, or
  offline-after-first-visit claim applies.
- Responses use HSTS, `nosniff`, strict-origin referrer policy, a restrictive
  CSP with only `self` plus the disclosed GitHub API connection, and a
  restrictive permissions policy. HTML revalidates; hashed JS, CSS, and WebP
  return `Cache-Control: public, max-age=31536000, immutable`.
- Fresh build sizes: JS 14.21 KB (5.44 KB gzip), CSS 11.48 KB (3.33 KB gzip),
  hero WebP 49.31 KB. All are within budget. Live Lighthouse (mobile) reported
  Performance 96, Accessibility 100, SEO 100, LCP 1,138 ms, and CLS 0.

## Defects by severity

None found.

## Known product limits (disclosed, not defects)

A hard lock can prevent a final user-process write; the tool preserves the
last completed rolling snapshot. Live evidence capture is Linux-specific;
macOS and Windows releases provide the portable demo and report tooling.
