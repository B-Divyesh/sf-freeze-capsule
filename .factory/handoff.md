# Freeze Capsule — polish round 5 handoff

## Outcome

All findings in `.factory/review-1.md` through `.factory/review-5.md` and
`.factory/polish-1.md` through `.factory/polish-4.md` are closed. The repair
is implementation commit `9d99a359f0103163f682a840500bda681246da68`
(`fix: prove Linux-only capture boundary`), pushed to `main` and deployed as
the static site at <https://freeze-capsule.sociobot.in>.

The final two fixes are substantive:

- `linux-only-capture` is an exact public claim with its own tagged test. The
  collector now selects its platform branch through an injected Linux-source
  closure. The test exercises macOS and Windows branches, asserts one
  unavailable platform result, asserts no Linux source sections, and would
  panic if Linux collection were requested.
- The landing page now defines the background process on first use:
  “The background watcher records a ten-minute window every 30 seconds.”

The product remains a Rust CLI with installer artifacts and its original
blueprint drafting-sheet identity. The catalog sentence is now verb-first and
55 characters: “Capture Linux freeze clues before a reboot erases them.”

## Exact verification evidence

### Clean clone

Fresh clone: `/tmp/freeze-capsule-round5-clean-tkeufz/repo`, created with
`git clone --no-local --branch main /work/repo` at the implementation commit.
Full log: `/tmp/freeze-capsule-round5-clean-2.log`.

- `npm ci`: pass; zero moderate-or-higher audit vulnerabilities.
- All **27** exact commands in `.factory/claims.json`: pass individually.
  This includes the new `npm run test:site -- --grep @claim:linux-only-capture`.
- `npm test -- --workers=1`: pass — 11 Rust unit tests, the real suspended
  watcher integration, and 36 Playwright/browser tests.
- `cargo clippy --all-targets -- -D warnings`: pass.
- `cargo build --locked --release`: pass.
- `npm run build`: pass; output is `dist/site`.
- Production bundle: JavaScript 14.83 kB (5.55 kB gzip); CSS 12.17 kB
  (3.50 kB gzip).

The claim tests cover generated CLI/browser fixture parity, one-click report
visibility, demo isolation, encrypted/redacted output, retention, watchdog
promotion, actual POSIX and PowerShell checksum acceptance/rejection, JSON,
encryption/key modes, normal local state, no tracking, explicit release lookup,
redaction limits, build output, workflow declaration, live Linux sources, and
the non-Linux collection boundary. The complete per-finding map is
`.factory/polish-5.md`.

### Local mobile checks

Fresh 390×844 screenshots were visually inspected:

- `.factory/evidence/home-390-polish-5.png`
- `.factory/evidence/demo-390-polish-5.png`
- `.factory/evidence/404-390-polish-5.png`

The Home screen shows its headline, audience, primary action, one-click result,
and all three facts before the fold. The demo’s populated evidence excerpt is
visible before replay controls. The 404 uses the complete navigation/footer
shell and a plain route-specific heading.

### Deployment and cold production recheck

Deployment used `/opt/fleet/lib/deploy-static.sh freeze-capsule dist/site`.
Azure Static Web Apps upload deployment ID:
`9b08cc50-9df5-4be7-bc4f-48453618b08a`. The existing custom domain reached
HTTPS 200 after the upload.

- `/opt/fleet/lib/verify-url.sh https://freeze-capsule.sociobot.in/ .factory/evidence/live-polish-5`:
  pass — HTTP 200, 920 ms cold load, no page or console errors, one title,
  `lang=en`, one `h1`, one `main`, no missing image alt text, and no unnamed
  buttons. Evidence: `.factory/evidence/live-polish-5/verify.json`.
- Fresh live Playwright + Axe audit: Home, Demo, Privacy, Terms, the real 404,
  and standalone `/404.html` each have one `h1`, one `main`, route-specific
  title/description/canonical/OG URL, skip link, legal footer, and zero
  serious/critical axe violations. The expected browser failed-resource message
  for the deliberately HTTP-404 document was excluded only for that document;
  no application console error occurred.
- `/missing-sheet`: HTTP 404. `/404.html`: HTTP 200 as the designed standalone
  error document. Security response headers include CSP with response-header
  `frame-ancestors`, `X-Content-Type-Options`, `Referrer-Policy`, and
  `Permissions-Policy`. Hashed assets are one-year immutable.
- Cold demo flow: one Home click opens `/demo?demo=1` with AMD/Cinnamon/Chrome
  evidence. Its Journal and Graphics rows span y=469–507; Processes and Display
  session span y=513–551, entirely inside a 390×844 viewport. Reset leaves only
  `demo:loaded`; Install exit clears every `demo:` key while preserving seeded
  real markers. Demo requests are same-origin only.
- Browser Back and Forward restore heading focus. The explicit package-check
  action produces exactly one request to `api.github.com`; none occurs before
  activation. The live response was “v0.1.1 packages are ready. Linux was
  detected.”
- All static, legal, installer, release-page, and resolved `.deb`, `.rpm`,
  macOS `.pkg`, and Windows `.zip` links returned HTTP 200 after redirects.

Live mobile screenshots were visually inspected:

- `.factory/evidence/live-home-390-polish-5.png`
- `.factory/evidence/live-demo-390-polish-5.png`
- `.factory/evidence/live-404-390-polish-5.png`

## Run and verify

```sh
npm ci
npm test -- --workers=1
cargo clippy --all-targets -- -D warnings
cargo build --locked --release
npm run build
```

Run any single public claim with the exact `test` command in
`.factory/claims.json`. The isolated browser entry point is
`/demo?demo=1`; the isolated command-line entry point is
`freeze-capsule demo`.

## Known gaps and next steps

No acceptance finding or known product defect remains. macOS and Windows
release artifacts remain intentionally unsigned, as disclosed; adding signing
in the future requires owner-held certificates and is not part of this work
order.
