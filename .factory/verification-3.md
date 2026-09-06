# Freeze Capsule verification 3 — save Linux freeze clues before reboot

**Verdict: PASS**

**Reviewed:** 6 September 2026 UTC  
**Live URL:** <https://freeze-capsule.sociobot.in>  
**Implementation candidate:** `d645cfe150217e48cf5b8645987575ab10abdb43`  
**Release-binary source:** `55069d4c3478cd19ba29cb238e31cc2aaf3fe015` (`v0.1.2`)  
**Documentation SHA:** `0050b592ff1fb364a8483c37be07f0e9ae2de32c`

Finding count: **0**. Untested-claim count: **0**.

## Job, audience, and first action before scrolling

Fresh 1440×900 desktop and 390×844 phone Chromium contexts opened the live home
page at scroll position zero.

| Check | Observed live text |
| --- | --- |
| Job | “Save freeze clues before you reboot” |
| Audience | “For desktop Linux users who need graphics, kernel, process, and session context after a freeze.” |
| First action | “Try it with sample data” — “See a redacted report in one click.” |

The title, audience, action, action outcome, and three facts were visible in
the first screen on both devices. The visual check showed the intended blueprint
layout, readable contrast, and no normal-size horizontal overflow.

## Live demo and browser checks

- One click opened `/demo?demo=1` with populated Journal, Graphics, Processes,
  and Display session rows: AMD ring timeout, `amdgpu`, Chrome, and Cinnamon.
- The persistent banner said “Demo — sample data, nothing is saved,” with
  **Reset demo** and **Install Freeze Capsule**.
- Reset recreated the same four rows. It retained `real:marker` and only the
  `demo:loaded` demo key. Leaving the demo removed only the `demo:` key.
- The demo flow made same-origin requests only.
- Home, Demo, Privacy, Terms, the designed unknown-route 404, and `/404.html`
  each had one `<h1>`, one `<main>`, a route-specific title, and no application
  console error. The deliberate unknown URL returned HTTP 404; its browser
  resource message is expected, not a finding.
- Axe found zero violations on all six routes. Keyboard Tab reached the skip
  link first and Enter moved focus to the route heading. Reduced motion hid the
  scan effect. Route focus, hash navigation, error recovery, touch targets, and
  200% text reflow are covered by the passing browser suite.
- Static routes set no cookies or third-party requests. The only optional
  external request is the disclosed GitHub release lookup after its explicit
  action. Live CSP, immutable asset caching, `nosniff`, and referrer policy were
  present.

## Clean checkout and declared claims

A separate no-local clone was checked out at `d645cfe`, then `npm ci` ran
successfully. `npm test -- --workers=1` passed 11 Rust tests, the watchdog
integration, and 41 browser tests. `npm run build` created `dist/site`.
`cargo fmt --check`, `cargo clippy --all-targets -- -D warnings`, and
`cargo package --allow-dirty` also passed.

Every exact command in `.factory/claims.json` was run separately from that
clean clone. All 29 passed; none was skipped. Full command output is retained
at `/work/.evidence/verify-3-claims.log`.

| Declared claim | Result |
| --- | --- |
| `sample-report` | PASS |
| `sample-fixture` | PASS |
| `demo-private` | PASS |
| `encrypted-redacted` | PASS |
| `demo-capture-render` | PASS |
| `redaction-coverage` | PASS |
| `bounded-retention` | PASS |
| `watchdog-gap` | PASS |
| `rolling-snapshot` | PASS |
| `cli-local-only` | PASS |
| `free-license` | PASS |
| `linux-live-capture` | PASS |
| `linux-only-capture` | PASS |
| `hard-freeze-limit` | PASS |
| `limited-source-report` | PASS |
| `hotkey-capture` | PASS |
| `installer-checksum` | PASS |
| `json-output` | PASS |
| `encryption-format` | PASS |
| `key-permissions` | PASS |
| `current-snapshot` | PASS |
| `build-output` | PASS |
| `release-workflow-declaration` | PASS |
| `normal-state-directory` | PASS |
| `local-evidence-removal` | PASS |
| `site-no-tracking` | PASS |
| `release-lookup-request` | PASS |
| `platform-package-selection` | PASS |
| `redaction-limits` | PASS |

The live HTML, JavaScript, CSS, and demo fixture SHA-256 values exactly matched
the clean candidate build. The built JavaScript was 17,082 bytes raw / 6.21 kB
gzip and CSS 12,250 bytes raw / 3.52 kB gzip.

## Installed release and recovery paths

The public POSIX installer was run into a new temporary consumer directory. It
downloaded the public Linux archive, verified its published SHA-256 checksum,
and installed `freeze-capsule 0.1.2` with mode 0755.

- `freeze-capsule --json demo` produced a report byte-for-byte equal to the
  live browser fixture.
- Empty `--json list` returned `[]`; `render latest` failed helpfully with
  “capture first.”
- A normal isolated capture and JSON list succeeded; `watch --once` created
  the rolling snapshot.
- A corrupt capsule failed with “not a Freeze Capsule file.” The generated
  local key was mode 0600.
- `v0.1.2` resolves to release-binary source `55069d4`. All 13 release assets
  returned HTTP 200. `latest.json` names `0.1.2` and seven platform entries;
  all seven packages listed in `SHA256SUMS` downloaded and matched.

There is no backend, tenant, health, restart, or 429 behavior to test. The
site does not promise offline reload or automatic updates.

## Earlier finding disposition

All earlier review, verification, and polish reports were inspected. The
current clean claim run, live browser checks, and consumer installation prove
the dispositions recorded by review 10: review 1 (F-1-1 through F-1-50), review
2 (F-2-1 through F-2-21), review 3 (F-3-1), review 4 (F-4-1 through F-4-23),
reviews 5–8 (F-5-1, F-5-2, F-6-1 through F-6-3, F-7-1 through F-7-4, F-8-1),
and both earlier verification findings remain closed.

The one previously open issue, **F-10-1**, is closed: its cause was the older
`v0.1.1` installer artifact. The fresh public installer now selects `v0.1.2`,
whose demo exactly matches the browser sample. Review 9 and verification 2 had
no open finding. No new finding was observed.

## Operator follow-up

The Homebrew tap formula publication and winget submission remain external
operator actions, already disclosed in the README and handoff. They are not
represented as complete on the live site and do not invalidate a tested current
installer or release asset. macOS and Windows packages remain unsigned as
disclosed.
