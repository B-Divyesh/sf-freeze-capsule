# Freeze Capsule — polish round 4 handoff

## Outcome

All findings from reviews 1–4 are resolved. The implementation repair is
commit `8c71ecc`; final site guidance and evidence are in `b4f0a20`. The
static product is deployed at <https://freeze-capsule.sociobot.in> with its
original CLI/installers artifact class and blueprint visual identity intact.

The phone demo now shows journal, graphics, process, and display-session
evidence immediately after one landing click. Clipboard and package lookup
failures have recovery text. Every route has the required metadata, focus,
legal shell, and real 404 behavior. All round-4 copy findings were rewritten.

## Exact verification evidence

### Clean clone and claims

Final fresh clone: `/tmp/freeze-capsule-final-L9O6e3/repo` from pushed commit
`b4f0a20`.

- `npm ci`: pass.
- Every one of the 26 exact `.factory/claims.json` commands: pass individually.
- `npm test`: pass — 10 Rust unit tests, watchdog integration, 35 Playwright
  browser/integration/claim tests.
- `cargo clippy --all-targets -- -D warnings`: pass.
- `cargo build --locked --release`: pass.
- `npm run build`: pass; output is `dist/site`.
- `npm audit --audit-level=moderate`: pass; zero vulnerabilities.
- Production bundle: 14.82 kB JavaScript / 5.54 kB gzip and 12.17 kB CSS /
  3.50 kB gzip.

The installer claim starts a local fixture server. It executes both the POSIX
and PowerShell installers with a valid archive/checksum and a deliberately
changed checksum. Both valid archives install; both changed checksums fail
before a binary is copied. PowerShell 7.6.5 is downloaded only as a test runner
when `pwsh` is unavailable, and its pinned archive checksum is verified first.

### Browser, accessibility, privacy, and performance

- `/opt/fleet/lib/verify-url.sh` against the live home page: HTTP 200, no page
  or console errors, `lang=en`, one h1, one main, no missing alt text, and no
  unnamed button. Evidence: `.factory/evidence/verify-live-polish-4.json`.
- Axe 4.13 CLI on live Home, Demo, Privacy, Terms, and `/missing-sheet`: zero
  violations on every route.
- Mobile Lighthouse on the final live home page: performance 100,
  accessibility 100, best practices 100, SEO 100, LCP 1.1 s, CLS 0, TBT 0 ms, and 5,588
  transferred JavaScript bytes.
- Privacy request log across live Home, Demo, Privacy, Terms, and 404: no
  third-party request. The separate claim test proves the GitHub API request
  occurs only after **Check published packages**. No cookies or analytics are
  present.
- The command-line offline/privacy path runs with `connect()` blocked and uses
  only a temporary demo directory. The website makes no offline claim.

### Cold live recheck

- At 390×844, the home action outcome and all three facts end by y=583.
- One click opens `/demo?demo=1`; the four report excerpt rows occupy
  y=469–551. Screenshot:
  `.factory/evidence/live-demo-390-polish-4.png`.
- Reset removes a seeded `demo:changed` value, restores `demo:loaded`, and
  preserves both seeded `real:marker` values. Install exit removes all `demo:`
  keys and preserves both real markers.
- Browser Back focuses “Save freeze clues before you reboot”; Forward focuses
  “Inspect a sample freeze report.”
- Home, Demo, Privacy, and Terms each return 200 with route-specific title,
  description, canonical, OG URL, one h1, one main, and the legal footer.
- `/missing-sheet` returns HTTP 404 with “Page not found”; `/404.html` returns
  200 as the deliberate standalone error document.
- Clipboard denial announces “Could not copy. Select the command and copy it
  manually.” and produces no page error.
- An aborted GitHub API request announces “Package check failed. Open the
  GitHub release page to see current files.” and produces no page error.
- Every discovered static/legal link and all four resolved package links
  returned 200 after redirects.

Screenshots:

- `.factory/evidence/home-390-polish-4.png`
- `.factory/evidence/demo-390-polish-4.png`
- `.factory/evidence/live-demo-390-polish-4.png`
- `.factory/evidence/404-390-polish-4.png`

## Release and installers

- GitHub release `v0.1.1` exposes 13 assets: Linux archive, `.deb`, `.rpm`, two
  macOS archives, two macOS `.pkg` files, Windows zip, checksums, `latest.json`,
  Homebrew formula, Scoop manifest, and winget manifest archive.
- The deployed POSIX installer downloaded, checksum-verified, installed, and
  ran the real command-line demo in a fresh temporary directory.
- The deployed PowerShell installer downloaded, checksum-verified, and
  installed the Windows executable in a fresh temporary directory.
- Homebrew tap <https://github.com/B-Divyesh/homebrew-freeze-capsule> now
  publishes `Formula/freeze-capsule.rb`; all three formula hashes match the
  release `SHA256SUMS`.
- The checked release workflow declares Linux, macOS, and Windows packaging
  jobs and contains no package-signing command. The site gives conditional
  macOS and Windows warning guidance.

## Run and verify

```sh
npm ci
npm test
cargo clippy --all-targets -- -D warnings
cargo build --locked --release
npm run build
```

Run any single claim using the exact `test` field in `.factory/claims.json`.
The isolated browser demo is `/demo?demo=1`; the isolated CLI demo is
`freeze-capsule demo`.

## Known gaps and next steps

No acceptance finding or known product defect remains. Future signed macOS or
Windows releases would require the owner's signing certificates; signing is
not part of the current unsigned release contract. Set `HOMEBREW_TAP_TOKEN` in
the release repository only if future releases should update the tap
automatically; the current formula is already published.
