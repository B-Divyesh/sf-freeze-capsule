# Freeze Capsule repair handoff

**Repair base:** `d449e0e6519fd7a9c762d38e0ce868402f559f32`
**Repair version:** `0.1.1`
**Date:** 28 August 2026 UTC

## Fixed release blockers

1. Demo banner actions now have a 44 px minimum height. A Playwright regression
   measures both controls at 390 px.
2. Static Web Apps now revalidates HTML immediately and caches `/assets/*` for
   one year with `immutable`. The test asserts both header policies.
3. Claims now have exactly one tagged regression each. New checks cover the
   real watchdog suspension, ten-minute/30-second service contract, explicit
   home/email/IP/secret substitutions, real CLI demo output, and local-only
   CLI demo behavior with `connect()` blocked.
4. The repair increments the release to `v0.1.1`. The release workflow now
   generates Homebrew, Scoop, and winget manifests from the actual release
   checksums instead of stale placeholder values.

## Verified before release

- `npm ci` — passed; zero audit vulnerabilities.
- `npm test` — passed: 5 Rust tests, watchdog suspension integration, and 17
  Playwright tests (axe has no serious or critical findings on every route).
- Every exact command listed in `.factory/claims.json` — passed.
- `cargo fmt --check`, `cargo clippy --all-targets -- -D warnings`,
  `cargo build --release`, and `cargo package --allow-dirty` — passed.
- `cargo install --path . --root <temporary-root> --locked` — passed; the
  clean consumer ran `--help`, JSON demo, capture, list, JSON render, and the
  empty-directory error path.
- Production site build: 14.21 KB JS (5.44 KB gzip), 11.48 KB CSS (3.33 KB
  gzip), 49.31 KB hero WebP. Browser checks cover desktop, 390×844, keyboard,
  focus, reduced motion, route titles, headers config, privacy, and release
  lookup failure.

## Release and deployment evidence

The repaired commit will be tagged `v0.1.1`, built by the GitHub Actions
release matrix, and deployed as the existing static `dist/site` artifact. This
section is updated with the immutable tag, action run, checksum, installer,
and live-header evidence after publication.

---

# Historical builder handoff (superseded by this repair)

## What shipped

- Rust 0.1.0 single-binary CLI with `capture`, `watch`, `list`, `render`, `prune`, `demo`, `hotkey-command`, `install-service`, and `doctor` commands.
- Linux capture for a ten-minute journal window, kernel messages, PCI graphics drivers, DRM connectors, process context, and display-session variables.
- XChaCha20-Poly1305 capsules, a user-only local key, atomic writes, 96 KiB section limits, and eight-capsule retention.
- A rolling encrypted prebuffer that is promoted after a 90-second scheduling gap. The service runs as the desktop user with systemd hardening.
- Redacted Markdown and JSON reports. Redaction covers the home directory, hostname, email, IPv4, MAC addresses, common secret assignments, and secret command arguments.
- A bundled AMD/Cinnamon/Chrome freeze fixture. `freeze-capsule demo` runs in a new temporary directory and never touches the normal capsule directory.
- A blueprint drafting-sheet site with one-click browser demo, real routes, 404 page, mobile layout, keyboard focus management, release failure state, privacy, and terms.
- Original generated hero art with prompt metadata, plus derived WebP hero, social card, favicon, and touch icon.
- Tag and manual GitHub Actions release workflow for Linux, macOS arm64/x64, and Windows. It builds archives, `.deb`, `.rpm`, unsigned `.pkg`, SHA256SUMS, `latest.json`, and package-manager manifests.
- SHA-256-verifying POSIX and PowerShell installers.

## Run and verify

```sh
npm install
npm test
npm run build:site       # exact factory build command; output: dist/site
cargo build --release
cargo run -- demo
```

Verification completed on 28 August 2026:

- Rust: 4 unit tests passed. A process-suspension integration test also promoted and rendered the prior snapshot.
- Playwright: 9 tests passed, including five browser and CLI claim tests. The sixth claim uses the watchdog shell test.
- Axe: no serious or critical findings on `/`, `/demo`, `/privacy`, `/terms`, or the app 404 route.
- Keyboard route focus and 390×844 layouts passed.
- `cargo clippy --all-targets -- -D warnings` passed.
- `npm audit --audit-level=high` reported zero vulnerabilities.
- Release workflow YAML passed `yaml-lint`.
- GitHub Actions run `33185785710`: Linux, macOS arm64, macOS x64, Windows, and release jobs passed.
- GitHub Release `v0.1.0` contains 13 assets. `latest.json` parsed and reported seven platform/package artifacts.
- The published Linux archive matched `SHA256SUMS`. The one-line installer downloaded, verified, installed, and ran the released binary demo.
- Production budget: 5.44 KB gzip JavaScript, 3.33 KB gzip CSS, 49 KB hero WebP.
- Lighthouse mobile: Performance 100, Accessibility 100, Best Practices 100, SEO 100. LCP 1.6 s, TBT 0 ms, CLS 0.

Claim definitions and one-command checks are in `.factory/claims.json`. Demo isolation is documented in `.factory/demo.md`. Copy counts are in `.factory/copy-audit.md`.

## Honest limits

- A hard lock can stop all user processes and disk writes. The tool keeps the last completed rolling snapshot; it cannot guarantee a capture at the instant of lockup.
- Live evidence capture is Linux-specific. The macOS and Windows binaries provide the bundled demo and report tooling for release completeness.
- Log detail depends on distro policy and user permissions. Unavailable sections remain visible in the report.
- Redaction is pattern-based. Users must inspect reports before sharing them.
- Desktop environments do not share a safe hotkey registration API. `hotkey-command` prints the command users bind in their desktop settings.

## Needs operator action

- The valid Homebrew formula, Scoop manifest, and winget manifests now contain v0.1.0 release hashes. They are also attached to the GitHub Release.
- Set `HOMEBREW_TAP_TOKEN` with write access to `B-Divyesh/homebrew-freeze-capsule` for future automatic tap publication. The v0.1.0 formula is currently a release asset and committed in this repository.
- Submit the generated winget manifest to `microsoft/winget-pkgs` after release review.
- macOS `.pkg` and Windows portable zip are unsigned. Future signing would require Apple and Windows signing certificates.
- Factory deployment should publish `dist/site`; no DNS or infrastructure was changed here.
