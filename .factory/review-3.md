# Adversarial first-read review 3 — Freeze Capsule

**Reviewed:** 28 August 2026 UTC  
**Candidate:** bed9e225ef42cb594698a688072e7ae54825b581  
**Live URL:** https://freeze-capsule.sociobot.in  
**Verdict:** **FAIL**

One blocking demo-sandbox defect remains. The dedicated demo exit clears demo
state, but ordinary navigation out of demo does not. The cold first read, every
declared claim command, the CLI demo, and other structure checks pass.

## First screen, before scrolling

Fresh Chromium contexts were used at 390×844 and 1440×900 without scrolling.

| Question | Answer from the first screen | Exact evidence |
| --- | --- | --- |
| What does it do? | It saves Linux freeze clues before reboot. | “Save freeze clues before you reboot” |
| For whom? | Desktop Linux users investigating a freeze. | “For desktop Linux users who need graphics, kernel, process, and session context after a freeze.” |
| What should I click first? | Try the sample report. | “Try it with sample data” / “See a redacted report in one click.” |

This passes at both sizes. On a 390 px phone the heading, audience sentence,
action, action result, and all three facts appear before the 844 px fold; the
document is 390 px wide. The blueprint grid, crop marks, capsule cutaway, and
restrained scan line match the visual thesis and are not generic SaaS.

## Findings — blocking

### F-3-1 — Ordinary navigation out of demo retains demo state (partially reopens F-1-2)

- **Quote/location:** /demo?demo=1 banner, “Demo — sample data, nothing is saved”; main-navigation Privacy and wordmark home links.
- **Observed:** A fresh live demo context creates only sessionStorage["demo:loaded"]. Selecting header Privacy leaves that key on /privacy. Selecting the wordmark then leaves the same key on /. Install Freeze Capsule does clear it.
- **Why this fails:** The demo contract requires leaving demo mode to discard demo data. The separate namespace still prevents real-data writes, but cleanup is incomplete and the banner does not disclose this exception. This is a half-fix of the earlier demo-cleanup finding.
- **Concrete fix:** When leaving /demo for every non-demo route—ordinary links, wordmark, Back/Forward, and 404—clear every demo: key before rendering. Keep automatic fixture loading when /demo?demo=1 is opened again. Add a regression that follows header Privacy, wordmark Home, and Back after entering demo and asserts no demo key on each non-demo route.

## Copy audit

Counts use whitespace-separated visible words. Navigation, labels, and actions
are included; preformatted commands and diagnostic sample output are treated as
commands/output, not prose. No sentence is over 22 words. No banned marketing
term, mood-only heading, inconsistent core term, or non-result-naming button was
found. F-3-1 is the only copy-adjacent failure.

### Landing page

| Copy | Words | Audit |
| --- | ---: | --- |
| Skip to main content | 4 | Pass |
| Freeze Capsule | 2 | Pass |
| Demo / Install / Privacy | 1 each | Pass |
| Linux field tool · drawing FC–01 | 6 | Label; pass |
| Save freeze clues before you reboot | 6 | Plain headline; pass |
| For desktop Linux users who need graphics, kernel, process, and session context after a freeze. | 15 | Pass |
| Try it with sample data | 5 | Result-naming action |
| See a redacted report in one click. | 7 | sample-report |
| Free and open source | 4 | free-license |
| Demo data stays separate | 4 | demo-private; F-3-1 exception |
| Keeps at most eight capsules | 5 | bounded-retention |
| Fig. 1 — journal · graphics · processes · display session | 8 | Art caption; pass |
| Detail A / Included command-line sample | 2 / 3 | Labels; pass |
| See the sample report before installing | 6 | Heading; pass |
| View the sample report | 4 | Result-naming action |
| This browser report comes from the included command-line demo. | 9 | sample-fixture |
| Sequence / 03 | 2 | Label; pass |
| How Freeze Capsule keeps pre-freeze evidence | 6 | Heading; pass |
| Keep one snapshot current | 4 | Heading; pass |
| The watcher records a ten-minute window every 30 seconds. | 9 | rolling-snapshot |
| Keep the snapshot when the watcher pauses | 7 | Heading; pass |
| A 90-second pause keeps the last completed snapshot. | 9 | watchdog-gap |
| Create a redacted report | 4 | Heading; pass |
| The report removes home paths, email addresses, IP addresses, and common secrets. | 12 | redaction-coverage |
| Installation plate / Install the Linux watcher | 2 / 4 | Labels/headings; pass |
| Install Freeze Capsule, then choose when to start the watcher. | 10 | Instruction; pass |
| Copy command | 2 | Result-naming action |
| Find a package on GitHub, or check the published release. | 10 | Instruction; pass |
| Find Linux packages on GitHub / Check published packages | 5 / 3 | Result-naming actions |
| Find Linux .deb on GitHub / Find Linux .rpm on GitHub | 5 / 5 | Honest external links |
| Find macOS .pkg on GitHub / Find Windows .zip on GitHub | 5 / 5 | Honest external links |
| Start and check the watcher | 5 | Heading; pass |
| On Linux, use these commands to set up, check, or trigger the watcher. | 13 | Instruction; pass |
| Boundary notes / Know the capture limits | 2 / 4 | Labels/headings; pass |
| A hard freeze can stop capture. | 6 | hard-freeze-limit |
| The last completed snapshot remains available. | 7 | hard-freeze-limit |
| Log access follows your account. | 5 | limited-source-report |
| Unavailable sources appear in the report. | 6 | limited-source-report |
| Review before sharing. | 3 | Instruction; pass |
| Redaction does not remove every machine detail. | 7 | redaction-limits |
| Freeze Capsule · Save Linux freeze clues before reboot. | 8 | Footer one-liner |
| Terms / Built by Param Factory / v0.1.1 · build 2026.08 | 1 / 4 / 3 | Navigation/build labels |

### README

| Copy | Words | Audit |
| --- | ---: | --- |
| Freeze Capsule | 2 | Title |
| Save Linux freeze clues before a reboot erases them. | 9 | Plain summary |
| Freeze Capsule is for desktop Linux users debugging graphics, kernel, application, or display-session freezes. | 14 | Audience |
| Its watcher keeps one encrypted snapshot current. | 7 | rolling-snapshot, encryption-format |
| If the watcher pauses for 90 seconds, it keeps the last complete snapshot. | 11 | watchdog-gap |
| Live site: URL | 3 | Link label |
| Try the isolated demo / freeze-capsule demo | 4 / 2 | Heading/command |
| The command loads the bundled sample. | 5 | Demo instruction |
| It writes an encrypted capsule and redacted Markdown report under a new temporary directory. | 12 | encrypted-redacted |
| It never reads or writes your normal capsule directory. | 10 | cli-local-only |
| The same isolated sample is available at the demo URL. | 9 | Demo instruction |
| The browser report is generated from the same bundled CLI demo fixture. | 11 | sample-fixture provenance |
| Install / Linux and macOS / Windows PowerShell | 1 / 3 / 2 | Headings |
| Both installers download the published archive and verify its SHA-256 checksum. | 10 | installer-checksum |
| Homebrew after the tap is published / Scoop after adding the repository bucket | 5 / 8 | Conditional headings |
| Live capture is Linux-specific. | 4 | linux-live-capture |
| Use the included sample to inspect a report before installing. | 10 | Instruction |
| Use / Start the watcher as your Linux user. | 1 / 7 | Heading/instruction |
| Capture from a desktop hotkey: | 5 | hotkey-capture |
| Bind the printed command in your desktop keyboard settings. | 9 | Instruction |
| After a freeze or reboot: | 5 | Procedure label |
| JSON output is available for scripts: | 6 | json-output |
| What it records | 4 | Heading |
| Each Linux snapshot requests journal, kernel, graphics, connector, and process details. | 10 | linux-live-capture |
| It also records selected display-session variables. | 6 | linux-live-capture |
| A report marks unavailable sources instead of abandoning capture. | 8 | limited-source-report |
| Capsules use XChaCha20-Poly1305 with a local 32-byte key. | 7 | encryption-format |
| On Unix, the key is created with owner-only 0600 permissions. | 9 | key-permissions |
| Rendering replaces common home paths, email addresses, IPv4 addresses, and secret assignments. | 11 | redaction-coverage |
| Review every report before sharing it. | 6 | Instruction |
| At most eight saved capsules remain. | 6 | bounded-retention |
| The current rolling snapshot does not use one of those eight slots. | 11 | current-snapshot |
| A hard freeze can stop every user process, so Freeze Capsule cannot guarantee a final write. | 16 | hard-freeze-limit |
| It preserves the last completed snapshot instead. | 7 | hard-freeze-limit |
| Develop / You need Rust, Node.js, and npm to build from source. | 1 / 10 | Build instruction |
| The build commands print their output paths. | 7 | Procedure note |
| If Playwright needs a browser, run npx playwright install chromium. | 9 | Recovery instruction |
| Release / Tag a tested commit: | 1 / 4 | Heading/procedure |
| The GitHub Actions workflow builds archives, Linux packages, macOS packages, Windows archives, checksums, and release manifests. | 16 | release-artifacts |
| macOS and Windows artifacts are unsigned. | 5 | release-artifacts |
| Privacy and license | 3 | Heading |
| The bundled CLI demo makes no network connection and uses a temporary directory. | 11 | cli-local-only |
| See privacy and terms. | 4 | Link instruction |
| Freeze Capsule is released under the MIT License. | 8 | free-license |

README command lines are executable examples, not sentences. The removed .deb/.rpm
release-page claim remains absent. Every current claim-like landing/README
sentence maps to the named declared claim; no unlisted claim was found.

## Demo, privacy, claims, and CLI

- One landing click opened /demo?demo=1 with the AMD/Cinnamon/Chrome report,
  journal, graphics, process, DRM, and display-session evidence already rendered.
  The banner and Reset demo were present.
- The demo request log contained only same-origin requests, no cookies, no
  localStorage, and sessionStorage["demo:loaded"]; no real-data namespace was
  read or written. F-3-1 is the only cleanup exception.
- Clean-clone CLI demo tests created an encrypted .fcap and a redacted Markdown
  report in a new temporary directory, never the normal state directory.
- No offline claim is made. No runtime AI feature, provider key, or AI request
  exists; deterministic capture/redaction fits the brief, and JSON/Markdown are
  the expected export path.
- From fresh clone /tmp/freeze-capsule-review-3.wCAU2j, npm test -- --workers=1
  passed (10 Rust tests, watchdog integration, 33 Playwright tests) and npm run
  build produced dist/site.
- Every exact claims.json command was independently run and passed:
  sample-report, sample-fixture, demo-private, encrypted-redacted,
  demo-capture-render, redaction-coverage, bounded-retention, watchdog-gap,
  rolling-snapshot, cli-local-only, free-license, linux-live-capture,
  hard-freeze-limit, limited-source-report, hotkey-capture, installer-checksum,
  json-output, encryption-format, key-permissions, current-snapshot,
  release-artifacts, normal-state-directory, site-no-tracking,
  release-lookup-request, and redaction-limits.

## Structure, routing, and accessibility

Live /, /demo?demo=1, /privacy, /terms, an unknown route, and /404.html were
checked. Normal routes have route-specific title, description, canonical, Open
Graph/Twitter fields, one main, and one h1; the designed missing route returns
404 with its complete standalone shell. The passing browser suite checks axe
serious/critical violations, Back/Forward heading focus, skip links, visible
focus, 44 px demo controls, reduced motion, alt text, mobile width, 404 metadata,
and static headers. Live cold loads produced no page errors. Internal links and
explicitly labelled GitHub/Sociobot destinations are live; legal navigation,
robots, sitemap, favicon, Apple icon, and CSP are present.

## History audit

Every earlier review, polish note, verification note, and handoff was read. The
live origin and current source were checked instead of trusting a fixed label.

| Earlier IDs | Current result |
| --- | --- |
| F-1-1 | Fixed: one click opens a rendered report. |
| F-1-2 | Partly fixed only; explicit exit clears state, ordinary exits are F-3-1. |
| F-1-3–F-1-4 | Fixed: generated browser/CLI fixture parity and narrowed privacy claim. |
| F-1-5–F-1-9 | Fixed: 404, focus/metadata, mobile first screen, and link labels. |
| F-1-10 | Fixed: unsupported one-binary assertion absent. |
| F-1-11–F-1-24 | Fixed: retained capability statements have declared source, fixture, CLI, or watchdog tests; removed 96 KiB assertion stays absent. |
| F-1-25–F-1-29 | Fixed: unsupported version/output/release wording removed or corrected. |
| F-1-30–F-1-40 | Fixed: release, state, tracking, redaction-limit, and MIT claims are covered or removed. |
| F-1-41–F-1-50 | Fixed: direct headings/terms, demo action, mobile layout, and plain copy remain clear. |
| F-2-1 | Fixed: clean npm test passes. |
| F-2-2 | Fixed: static 404 has the complete shared shell and metadata. |
| F-2-3–F-2-20 | Fixed: retained capability/privacy statements are declared and tested; removed wording stays absent. |
| F-2-21 | Fixed: landing says “included command-line sample”; the README provenance note is clear. |

## What would make this perfect

Clear demo keys on every route out of demo and add the cleanup regression. Then
the clear first read, immediate realistic report, claim coverage, visual identity,
and route/accessibility checks would have no remaining finding.

