# Polish round 7 — Freeze Capsule

Candidate `53c098114b86b489eedd4ddc44a2067dbe15b6f3` was repaired at
`de51e459e5e176a41f794f461028850564ee9192`. This ledger closes every finding
in reviews 1–7, including findings previously marked minor or historical.

## Evidence key

- **C:`id`**: the exact command recorded for that id in `.factory/claims.json`,
  run independently after `npm ci` in clean clone
  `/tmp/freeze-capsule-round7-clean.uP7z4H/repo`. **All 28/28 claim commands
  passed.**
- **Suite**: that clone passed `npm test` (11 Rust tests, watchdog integration,
  39 Playwright tests), `cargo clippy --locked --all-targets -- -D warnings`,
  `cargo build --locked --release`, `npm run build:site`, and
  `npm audit --audit-level=moderate` (0 vulnerabilities).
- **Live**: <https://freeze-capsule.sociobot.in>, checked cold after deployment.
  `.factory/evidence/round7/live-route-audit.json` records statuses, metadata,
  landmarks, 390 px overflow, console/page errors, Axe serious/critical, and
  44 px targets. `.factory/evidence/round7/live-demo-audit.json` records demo
  isolation. `.factory/evidence/round7/live-package-audit.json` records the
  platform fixture branches against the deployed bundle.
- **Screens**: `.factory/evidence/round7/live-home-390.png`,
  `live-demo-390.png`, `live-404-390.png`, and `live-android-install-390.png`.
- **Copy**: `.factory/copy-audit.md`; **README**: current `README.md` headings
  and wording checked in the clean suite.

## Review 1 ledger

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | The landing action opens a loaded isolated sample report in one click. | C:`sample-report`; Live demo; Screens demo |
| F-1-2 | Reset and every demo exit clear only `demo:` state and send installation to the real section. | C:`demo-private`; Live demo |
| F-1-3 | The browser fixture is generated from the CLI demo report. | C:`sample-fixture` |
| F-1-4 | The no-network assertion is scoped to the CLI demo and tested. | C:`cli-local-only` |
| F-1-5 | Unknown addresses return a complete designed HTTP 404. | Suite; Live route audit; Screens 404 |
| F-1-6 | Push, Back, and Forward restore heading focus and announce the route. | Suite; Live route audit |
| F-1-7 | Each route has its own title, description, canonical, and social metadata. | Suite; Live route audit |
| F-1-8 | Phone first screen keeps result context and all three facts above the fold. | Suite; Live demo audit; Screens home |
| F-1-9 | Package links state GitHub before lookup and specific downloads only after resolution. | C:`platform-package-selection`; Live package audit |
| F-1-10 | The unsupported one-binary assertion was removed. | Copy |
| F-1-11 | Linux live collection is listed and exercised with controlled sources. | C:`linux-live-capture` |
| F-1-12 | Unsupported macOS/Windows command-capability promise was removed. | README; Copy |
| F-1-13 | The hard-freeze limitation and preserved last snapshot are tested. | C:`hard-freeze-limit` |
| F-1-14 | Permission-limited log access is explicit in report output. | C:`limited-source-report` |
| F-1-15 | Missing sources remain explicit in a usable report. | C:`limited-source-report` |
| F-1-16 | The printed hotkey command creates retained evidence. | C:`hotkey-capture` |
| F-1-17 | POSIX and PowerShell installers accept valid and reject altered checksums. | C:`installer-checksum` |
| F-1-18 | Unsupported release-availability prose was removed. | README; Copy |
| F-1-19 | Documented list and report commands emit parsed JSON. | C:`json-output` |
| F-1-20 | Every named Linux source is exercised under controlled fixtures. | C:`linux-live-capture` |
| F-1-21 | The untested 96 KiB public assertion was removed. | README; Copy |
| F-1-22 | Encryption layout, nonce, key size, and round trip are exercised. | C:`encryption-format` |
| F-1-23 | Unix owner-only local-key permissions are exercised. | C:`key-permissions` |
| F-1-24 | The current snapshot and saved-slot distinction is direct and measured. | C:`current-snapshot` |
| F-1-25 | Unsupported tool-version floor was removed. | README; Copy |
| F-1-26 | Site build output path is built and asserted. | C:`build-output` |
| F-1-27 | Release binary path is built and asserted. | C:`build-output` |
| F-1-28 | Playwright setup/recovery instructions match the actual suite. | Suite; README |
| F-1-29 | Unsupported Actions-only assertion was removed. | README; Copy |
| F-1-30 | Release wording is narrowed to the parsed workflow declaration. | C:`release-workflow-declaration` |
| F-1-31 | Workflow declaration test proves signing commands are absent. | C:`release-workflow-declaration` |
| F-1-32 | Normal capture stores one local key and capsules under local state storage. | C:`normal-state-directory` |
| F-1-33 | Static routes are checked for cookies, storage, tracking, and foreign requests. | C:`site-no-tracking`; Live route audit |
| F-1-34 | GitHub release lookup is only made after the explicit action. | C:`release-lookup-request` |
| F-1-35 | Package destinations remain honest before and after lookup. | C:`platform-package-selection`; Live package audit |
| F-1-36 | Documented diagnostic categories are covered by Linux collection fixtures. | C:`linux-live-capture` |
| F-1-37 | Unsupported exact deletion-path promise was removed. | Copy; privacy route Live check |
| F-1-38 | Unsupported uninstall-retention assertion was removed. | Copy; privacy route Live check |
| F-1-39 | Redaction retains a hardware detail for review. | C:`redaction-limits` |
| F-1-40 | MIT license and warranty language are both asserted. | C:`free-license` |
| F-1-41 | Workflow heading names Freeze Capsule and pre-freeze evidence. | Copy |
| F-1-42 | Pause step uses direct snapshot language. | Copy |
| F-1-43 | Report step says “Create a redacted report.” | Copy |
| F-1-44 | Post-install heading names watcher work. | Copy |
| F-1-45 | Watcher pause is described in user language. | README; Copy |
| F-1-46 | Source prose is split below the 22-word cap. | Copy |
| F-1-47 | “Background watcher” is defined once and used consistently. | Copy |
| F-1-48 | “Freeze” and defined “hard freeze” are used consistently. | Copy |
| F-1-49 | Least-privilege jargon is absent from public copy. | README; Copy |
| F-1-50 | Both sample actions name the report result. | C:`sample-report`; Screens demo |

## Review 2 ledger

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-2-1 | The complete quality gate is deterministic from a clean clone. | Suite |
| F-2-2 | Static 404 includes skip link, header, icons, social data, legal footer, and build id. | Suite; Live route audit |
| F-2-3 | Linux capture is listed and controlled-source tested. | C:`linux-live-capture` |
| F-2-4 | Unsupported macOS/Windows command claim remains absent. | README; Copy |
| F-2-5 | Paused-watcher behavior is listed and tested. | C:`hard-freeze-limit` |
| F-2-6 | Limited-source report behavior is listed and tested. | C:`limited-source-report` |
| F-2-7 | Hotkey capture is listed and tested. | C:`hotkey-capture` |
| F-2-8 | Installer verification executes against local fixture archives. | C:`installer-checksum` |
| F-2-9 | Unsupported release-page availability wording remains absent. | README; Copy |
| F-2-10 | Structured command output is listed and parsed. | C:`json-output` |
| F-2-11 | All named collection sources are asserted. | C:`linux-live-capture` |
| F-2-12 | Encryption details are exercised. | C:`encryption-format` |
| F-2-13 | Key permissions are exercised. | C:`key-permissions` |
| F-2-14 | Current snapshot is outside saved retention slots. | C:`current-snapshot` |
| F-2-15 | Public release wording is the structurally parsed declaration. | C:`release-workflow-declaration` |
| F-2-16 | Normal local state behavior is exercised. | C:`normal-state-directory` |
| F-2-17 | Whole-site no-tracking behavior is exercised. | C:`site-no-tracking`; Live route audit |
| F-2-18 | Explicit GitHub request timing and origin are exercised. | C:`release-lookup-request` |
| F-2-19 | Unsupported package-removal prose remains absent. | Copy; privacy route Live check |
| F-2-20 | Redaction limit retains hardware detail. | C:`redaction-limits` |
| F-2-21 | Public copy says command-line sample, not unexplained CLI/fixture jargon. | Copy |

## Reviews 3–5 ledger

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-3-1 | Every ordinary demo exit clears demo state while preserving real state. | C:`demo-private`; Live demo |
| F-4-1 | Four evidence rows precede replay controls on phone. | C:`sample-report`; Screens demo |
| F-4-2 | POSIX and PowerShell installer paths accept and reject fixture archives. | C:`installer-checksum` |
| F-4-3 | Workflow claim says only what the parsed declaration proves. | C:`release-workflow-declaration` |
| F-4-4 | Site and release-binary paths have a build-output assertion. | C:`build-output` |
| F-4-5 | Clipboard denial has manual-copy recovery and no page error. | Suite |
| F-4-6 | Lookup failure gives a neutral recovery message. | Suite |
| F-4-7 | Hero label names the Linux evidence tool. | Copy |
| F-4-8 | Hero caption names evidence sources without figure lore. | Copy |
| F-4-9 | “Detail A” was removed. | Copy |
| F-4-10 | Decorative sequence label became “Three steps.” | Copy |
| F-4-11 | “Installation plate” was removed. | Copy |
| F-4-12 | “Boundary notes” was removed. | Copy |
| F-4-13 | README defines “background watcher” on first use. | README; Copy |
| F-4-14 | Homebrew heading names the install result and condition. | README |
| F-4-15 | Scoop heading names the install result and bucket condition. | README |
| F-4-16 | Linux-only collection boundary is direct and tested. | C:`linux-only-capture` |
| F-4-17 | Report procedure heading names its task. | README |
| F-4-18 | The 404 label is “Page not found / 404.” | Screens 404 |
| F-4-19 | SPA and static 404 headings say “Page not found.” | Live route audit |
| F-4-20 | 404 action says “Return to the home page.” | Screens 404 |
| F-4-21 | Privacy label is “Privacy policy.” | Live route audit |
| F-4-22 | Terms label is “Terms.” | Live route audit |
| F-4-23 | Terms h1 names Freeze Capsule. | Live route audit |
| F-5-1 | Linux-only capability claim and platform-injected regression are present. | C:`linux-only-capture` |
| F-5-2 | Landing first use says “background watcher.” | Copy; Screens home |

## Review 6 ledger

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-6-1 | Hash-aware routing scrolls and focuses Install on load, navigation, history, and demo exit. | Suite; Live route audit |
| F-6-2 | App and static-404 controls meet 44×44 px; mobile Install is visible; static CSP is verified. | Suite; Live route audit |
| F-6-3 | Hero facts state tested price, local storage, and no-network demo behavior. | Suite; Screens home; Copy |

## Review 7 ledger

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-7-1 | `platformSelection()` identifies Android/iOS before Linux/macOS, leaves macOS architecture unguessed, and `applyRelease()` only marks a matching resolved desktop asset ready. All resolved secondary links name their package. Added the claim and browser matrix for Android, iPhone, Linux, Windows, ambiguous macOS, and missing asset. | C:`platform-package-selection`; `.factory/evidence/round7/live-package-audit.json`; Screens Android |
| F-7-2 | Replaced “state directory” on the first screen with “a folder on your computer.” | Copy; Screens home; Live route audit |
| F-7-3 | Renamed README `Use` to `Capture and export freeze reports`. | README; Copy README heading audit |
| F-7-4 | Renamed README `What it records` to `What Freeze Capsule records`. | README; Copy README heading audit |

## Result

No blocking, major, minor, or historical finding remains open. The catalog
description is verb-first and 59 characters: “Capture Linux freeze evidence
before a reboot erases it.” The deployed site keeps its product-specific
blueprint drafting-sheet identity.
