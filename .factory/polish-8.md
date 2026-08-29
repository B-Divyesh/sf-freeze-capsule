# Polish round 8 — Freeze Capsule

Repair commit: `05c6e7b99a75f024dd76c148bb568005a05d8a4c` (short: `05c6e7b`). It repairs review candidate `d4db6701961f3936f312ddbad841d80d6bfa9591` and keeps the original blueprint drafting-sheet identity, original capsule art, CLI installer artifact, and static deployment class.

## Evidence key

- **C:`id`** is the exact tagged command in `.factory/claims.json`, run independently after `npm ci` in clean clone `/tmp/freeze-capsule-round8-clean.08ROXt/repo`. All **29/29** commands passed, including the new `C:local-evidence-removal`.
- **Clean suite**: that clone passed `npm test` (11 Rust tests, watchdog integration, 40 Playwright tests), `cargo clippy --locked --all-targets -- -D warnings`, `cargo build --locked --release`, and `npm audit --audit-level=moderate` (0 vulnerabilities). The built site is `dist/site`; JavaScript is 17.08 kB (6.21 kB gzip).
- **Local cold check**: `/opt/fleet/lib/verify-url.sh http://127.0.0.1:4173/ .factory/evidence/round8-local` passed with no console errors, one h1/main, `lang=en`, and no missing image alt. Screens: `.factory/evidence/round8-local/screenshot-desktop.png` and `.factory/evidence/round8-local/screenshot-mobile.png`.
- **Live cold check**: `/opt/fleet/lib/verify-url.sh https://freeze-capsule.sociobot.in/ .factory/evidence/round8-live/verify` passed (817 ms; no console errors; one h1/main; `lang=en`; no missing alt/unlabelled buttons). `.factory/evidence/round8-live/live-audit.json` records cold 390 px checks for `/`, `/demo?demo=1`, `/privacy`, `/terms`, and `/missing-sheet`: expected HTTP statuses, titles/canonicals/social URLs, no horizontal overflow, zero serious/critical Axe findings, 44 px controls, link crawl, storage isolation/reset/exit, focus/history, and same-origin demo requests. Screens: `live-home-390.png`, `live-demo-390.png`, `live-privacy-390.png`, `live-terms-390.png`, `live-404-390.png`, and `live-install-exit-390.png`.

## Review 1 ledger

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | Landing CTA opens an already-populated isolated report. | C:`sample-report`; clean suite |
| F-1-2 | Reset and every route exit clear only `demo:` state; install reaches the real section. | C:`demo-private`; clean suite |
| F-1-3 | Browser report is generated from the bundled command-line demo. | C:`sample-fixture` |
| F-1-4 | No-network copy is scoped to the isolated CLI demo. | C:`cli-local-only` |
| F-1-5 | Unknown addresses use the complete designed HTTP 404. | Clean suite; local cold check |
| F-1-6 | Push, Back, and Forward focus and announce the destination heading. | Clean suite |
| F-1-7 | Routes set their own title, description, canonical, and social metadata. | Clean suite |
| F-1-8 | Phone first screen keeps the outcome and three tested facts before the art. | Clean suite; local mobile screen |
| F-1-9 | Unresolved package links name GitHub; resolved links name direct downloads. | C:`platform-package-selection` |
| F-1-10 | Unsupported one-binary promise remains removed. | Copy audit |
| F-1-11 | Linux source collection is declared and controlled-source tested. | C:`linux-live-capture` |
| F-1-12 | Unsupported cross-platform command promise remains removed. | README and copy audit |
| F-1-13 | Hard-freeze limitation and last completed snapshot are exercised. | C:`hard-freeze-limit` |
| F-1-14 | Permission-limited sources remain named in a usable report. | C:`limited-source-report` |
| F-1-15 | Missing commands and unreadable sources remain named in a usable report. | C:`limited-source-report` |
| F-1-16 | The printed hotkey command creates isolated retained evidence. | C:`hotkey-capture` |
| F-1-17 | POSIX and PowerShell installers accept valid and reject changed checksums. | C:`installer-checksum` |
| F-1-18 | Unsupported release-availability prose remains removed. | README audit |
| F-1-19 | Documented list and report results parse as JSON. | C:`json-output` |
| F-1-20 | Every named journal, kernel, graphics, connector, process, and session source is exercised. | C:`linux-live-capture` |
| F-1-21 | Untested 96 KiB promise remains removed. | README audit |
| F-1-22 | Encryption layout, 24-byte nonce, 32-byte key, and round trip are exercised. | C:`encryption-format` |
| F-1-23 | Unix local-key permissions are owner-only. | C:`key-permissions` |
| F-1-24 | Current snapshot is distinct from eight saved slots. | C:`current-snapshot` |
| F-1-25 | Unsupported tool-version floor remains removed. | README audit |
| F-1-26 | `dist/site` is built and asserted. | C:`build-output` |
| F-1-27 | `target/release/freeze-capsule` is built and asserted. | C:`build-output` |
| F-1-28 | Playwright recovery instructions remain accurate. | Clean-clone suite; README |
| F-1-29 | Unsupported Actions-only wording remains removed. | README audit |
| F-1-30 | Release wording is narrowed to the parsed workflow declaration. | C:`release-workflow-declaration` |
| F-1-31 | Workflow declaration test confirms no signing command is configured. | C:`release-workflow-declaration` |
| F-1-32 | Normal capture stores one local key and capsules below local state. | C:`normal-state-directory` |
| F-1-33 | Static routes are checked for cookies, storage, tracking, and foreign requests. | C:`site-no-tracking` |
| F-1-34 | GitHub release lookup is only requested after explicit activation. | C:`release-lookup-request` |
| F-1-35 | Package destinations remain honest before and after lookup. | C:`platform-package-selection` |
| F-1-36 | Documented diagnostic categories are covered by controlled capture. | C:`linux-live-capture` |
| F-1-37 | The old unsupported exact path promise remains absent; the new normal-storage removal instruction is exact and tested. | C:`local-evidence-removal` |
| F-1-38 | Unsupported uninstall-retention promise remains removed. | Privacy/copy audit |
| F-1-39 | Redaction retains a documented hardware detail for review. | C:`redaction-limits` |
| F-1-40 | MIT license and warranty language are asserted. | C:`free-license` |
| F-1-41 | Evidence-process heading names Freeze Capsule and its job. | Copy audit |
| F-1-42 | Pause step uses direct snapshot language. | Copy audit |
| F-1-43 | Report step says “Create a redacted report.” | Copy audit |
| F-1-44 | Post-install heading names watcher work. | Copy audit |
| F-1-45 | Pause trigger is described in user language. | README audit |
| F-1-46 | Source descriptions remain below 22 words. | Copy audit |
| F-1-47 | “Background watcher” is defined before later watcher references. | Copy audit |
| F-1-48 | “Freeze” and defined “hard freeze” are used consistently. | Copy audit |
| F-1-49 | Least-privilege jargon remains absent. | README audit |
| F-1-50 | Both sample actions name the sample report result. | C:`sample-report` |

## Review 2 ledger

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-2-1 | The clean quality gate is deterministic and green. | Clean suite |
| F-2-2 | Static 404 includes skip link, header, icons, social data, legal footer, and build id. | Clean suite; local cold check |
| F-2-3 | Linux capture is listed and controlled-source tested. | C:`linux-live-capture` |
| F-2-4 | Unsupported macOS/Windows command claim remains absent. | README audit |
| F-2-5 | Paused-watcher behavior is listed and tested. | C:`hard-freeze-limit` |
| F-2-6 | Limited-source reports remain usable and explicit. | C:`limited-source-report` |
| F-2-7 | Hotkey capture is listed and tested. | C:`hotkey-capture` |
| F-2-8 | Installer verification executes against fixture archives. | C:`installer-checksum` |
| F-2-9 | Unsupported release-page wording remains absent. | README audit |
| F-2-10 | Structured CLI output is listed and parsed. | C:`json-output` |
| F-2-11 | All named collection sources are asserted. | C:`linux-live-capture` |
| F-2-12 | Encryption details are exercised. | C:`encryption-format` |
| F-2-13 | Key permissions are exercised. | C:`key-permissions` |
| F-2-14 | Current snapshot is outside saved retention slots. | C:`current-snapshot` |
| F-2-15 | Public release wording is the structurally parsed declaration. | C:`release-workflow-declaration` |
| F-2-16 | Normal local-state behavior is exercised. | C:`normal-state-directory` |
| F-2-17 | Whole-site no-tracking behavior is exercised. | C:`site-no-tracking` |
| F-2-18 | Explicit GitHub request timing and origin are exercised. | C:`release-lookup-request` |
| F-2-19 | Unsupported package-removal prose remains absent. | Privacy/copy audit |
| F-2-20 | Redaction limit retains hardware detail. | C:`redaction-limits` |
| F-2-21 | Public copy uses “command-line sample,” not unexplained CLI/fixture jargon. | Copy audit |

## Reviews 3–7 ledger

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-3-1 | All ordinary demo exits clear only `demo:` state. | C:`demo-private` |
| F-4-1 | Four sample evidence rows precede replay controls on phone. | C:`sample-report`; local mobile screen |
| F-4-2 | Installer success and rejection paths execute for both scripts. | C:`installer-checksum` |
| F-4-3 | Workflow claim says only what the parsed declaration proves. | C:`release-workflow-declaration` |
| F-4-4 | Site and release-binary paths have a build-output assertion. | C:`build-output` |
| F-4-5 | Clipboard denial gives manual-copy recovery without a page error. | Clean suite |
| F-4-6 | Lookup failure gives neutral recovery copy. | Clean suite |
| F-4-7 | Hero label names the Linux evidence tool. | Copy audit |
| F-4-8 | Hero caption names the evidence sources. | Copy audit |
| F-4-9 | “Detail A” remains removed. | Copy audit |
| F-4-10 | Process label is “Three steps.” | Copy audit |
| F-4-11 | “Installation plate” remains removed. | Copy audit |
| F-4-12 | “Boundary notes” remains removed. | Copy audit |
| F-4-13 | README defines “background watcher” on first use. | README audit |
| F-4-14 | Homebrew heading names installation and its condition. | README audit |
| F-4-15 | Scoop heading names installation and its bucket condition. | README audit |
| F-4-16 | Linux-only collection is separately declared and tested. | C:`linux-only-capture` |
| F-4-17 | Report procedure heading names list/export work. | README audit |
| F-4-18 | 404 label is “Page not found / 404.” | Clean suite |
| F-4-19 | App and standalone 404 headings say “Page not found.” | Clean suite |
| F-4-20 | 404 action says “Return to the home page.” | Clean suite |
| F-4-21 | Privacy label is “Privacy policy.” | Clean suite |
| F-4-22 | Terms label is “Terms.” | Clean suite |
| F-4-23 | Terms h1 names Freeze Capsule. | Clean suite |
| F-5-1 | Non-Linux capture returns only an unavailable platform result. | C:`linux-only-capture` |
| F-5-2 | Landing defines “background watcher” on first use. | Copy audit |
| F-6-1 | Hash routing scrolls and focuses Install on load, navigation, history, and demo exit. | Clean suite |
| F-6-2 | Every app and static-404 control meets the 44×44 px mobile target. | Clean suite |
| F-6-3 | Phone facts state tested price, local storage, and no-network demo behavior. | Clean suite; local mobile screen |
| F-7-1 | Android/iOS are not treated as desktops; only matching resolved assets are offered. | C:`platform-package-selection` |
| F-7-2 | First-screen storage fact says “a folder on your computer.” | Copy audit |
| F-7-3 | README section is “Capture and export freeze reports.” | README audit |
| F-7-4 | README section is “What Freeze Capsule records.” | README audit |

## Review 8 ledger

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-8-1 | Privacy and README now name normal Linux storage as `~/.local/state/freeze-capsule`, name the `XDG_STATE_HOME` alternative, and limit the promise to that normal storage. Added `local-evidence-removal`, which creates a normal capture in a temporary XDG state directory, removes its `freeze-capsule` folder, and asserts the local key and capsule are gone. | C:`local-evidence-removal`; clean suite; `.factory/evidence/round8-live/live-audit.json`; `live-privacy-390.png` |

## Result

All current and historical findings are addressed. No product scope, visual identity, runtime privacy boundary, or artifact/deployment class was broadened. The catalog description is verb-first and 55 characters: “Capture Linux freeze clues before a reboot erases them.”
