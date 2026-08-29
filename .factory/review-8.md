# Adversarial first-read review 8 — Freeze Capsule

**Reviewed:** 29 August 2026 UTC  
**Live URL:** <https://freeze-capsule.sociobot.in>  
**Candidate:** `d4db6701961f3936f312ddbad841d80d6bfa9591`  
**Verdict:** **FAIL**

The cold first-read, one-click demo, sandbox isolation, all 28 declared claims,
CLI demo, routing, metadata, accessibility, and link checks pass. One privacy
promise remains outside the claim inventory, so the required zero-finding PASS
threshold is not met.

## First screen, before scrolling

Fresh Chromium contexts at 390×844 and 1440×900 opened `/` with `scrollY = 0`.

| Question | Answer in my own words | Exact evidence |
| --- | --- | --- |
| What does it do? | It saves Linux freeze evidence before I reboot. | “Save freeze clues before you reboot” and “Evidence sources: journal, graphics, processes, and display session.” |
| For whom? | Desktop Linux users investigating a freeze. | “For desktop Linux users who need graphics, kernel, process, and session context after a freeze.” |
| What should I click first? | Open the ready-made sample report. | “Try it with sample data” and “See a redacted report in one click.” |

This is clear on both viewports. On the 390 px page, the primary action,
result sentence, and all three facts are visible before the hero art starts;
there is no horizontal overflow.

## Findings

### F-8-1 — The privacy policy makes an unlisted promise about removing local evidence

- **Severity:** Minor
- **Quote/location:** `/privacy`, “Remove the Freeze Capsule folder when you
  want to remove local capsules and the key.”
- **Observed:** This promises that deleting one unspecified folder removes both
  types of evidence. `.factory/claims.json` has no entry for deletion/removal;
  `normal-state-directory` proves only that a new capture creates one key and a
  capsule below temporary XDG state. The page also does not identify which
  folder a desktop Linux visitor should remove.
- **Why this fails:** A visitor may rely on the privacy page when deciding
  whether sensitive diagnostic evidence can be removed. The promise is neither
  demonstrably complete nor actionable, and the claims contract requires every
  reliance claim to have a listed sandbox test.
- **Concrete fix:** Either remove the sentence, or say where the tool stores
  the folder on Linux and add `local-evidence-removal` to `claims.json`. Its
  tagged test should create normal state under a temporary `XDG_STATE_HOME`,
  remove the documented `freeze-capsule` folder, and assert that no key or
  capsule remains. Do not claim removal from locations that test does not
  cover.

## Copy audit

Counts are whitespace-separated visible words. Fenced commands and report
evidence rows are labels, not prose. No landing or README sentence exceeds 22
words. The only copy finding is F-8-1; terminology is otherwise consistent and
the buttons name their results.

### Landing page

| Copy | Words | Audit |
| --- | ---: | --- |
| Skip to main content | 4 | Skip link; pass |
| Freeze Capsule | 2 | Wordmark; pass |
| Demo / Install / Privacy | 1 each | Navigation; pass |
| Linux freeze evidence tool | 4 | Useful label; pass |
| Save freeze clues before you reboot | 6 | Plain job headline; pass |
| For desktop Linux users who need graphics, kernel, process, and session context after a freeze. | 15 | Audience and situation; pass |
| Try it with sample data | 5 | Result-naming action; pass |
| See a redacted report in one click. | 7 | `sample-report`; pass |
| Free under the MIT License | 5 | `free-license`; pass |
| Freeze Capsule stores capsules and the key in a folder on your computer | 13 | `normal-state-directory`; pass |
| The command-line demo makes no network connection | 7 | `cli-local-only`; pass |
| Evidence sources: journal, graphics, processes, and display session. | 8 | Useful image caption; pass |
| Included command-line sample | 3 | Useful label; pass |
| See the sample report before installing | 6 | Standalone heading; pass |
| View the sample report | 4 | Result-naming action; pass |
| Demo — bundled sample data, nothing is saved to your capsule directory. | 11 | `demo-private`; pass |
| Encrypted sample: temporary .fcap | 4 | Output label; pass |
| Redacted report: temporary freeze-report.md | 4 | Output label; pass |
| journal / graphics / processes / display-session | 4 | Evidence row; not prose |
| This browser report comes from the included command-line demo. | 9 | `sample-fixture`; pass |
| Three steps | 2 | Useful process label; pass |
| How Freeze Capsule keeps pre-freeze evidence | 6 | Standalone heading; pass |
| Keep one snapshot current | 4 | Step heading; pass |
| The background watcher records a ten-minute window every 30 seconds. | 10 | `rolling-snapshot`; pass |
| Keep the snapshot when the watcher pauses | 7 | Step heading; pass |
| A 90-second pause keeps the last completed snapshot. | 9 | `watchdog-gap`; pass |
| Create a redacted report | 4 | Step heading; pass |
| The report removes home paths, email addresses, IP addresses, and common secrets. | 12 | `redaction-coverage`; pass |
| Install the Linux watcher | 4 | Standalone heading; pass |
| Install Freeze Capsule, then choose when to start the watcher. | 10 | Direct instruction; pass |
| Copy command / Copied | 2 / 1 | Result action and state; pass |
| Install command copied. | 3 | Success state; pass |
| Could not copy. | 3 | Error state; pass |
| Select the command and copy it manually. | 8 | Recovery action; pass |
| Find a package on GitHub, or check the published release. | 10 | Direct instruction; pass |
| Open Linux releases / Check published packages | 3 / 3 | Destination and result actions; pass |
| Checking the GitHub release… | 4 | Progress state; pass |
| v0.1.1 Linux .deb package is ready. | 6 | `platform-package-selection`; pass when shown |
| v0.1.1 does not include a Linux .deb package. Open the GitHub release page to see current files. | 17 | Tested recovery; pass |
| Choose a package on your desktop. | 6 | Tested Android/iOS state; pass |
| Choose the matching macOS package for your Mac. | 9 | Tested architecture-safe state; pass |
| Package check failed. | 3 | Accurate error; pass |
| Open the GitHub release page to see current files. | 10 | Recovery action; pass |
| Find Linux .deb on GitHub / Find Linux .rpm on GitHub | 5 / 5 | Honest unresolved links; pass |
| Find macOS Apple silicon .pkg on GitHub / Find macOS Intel .pkg on GitHub | 7 / 7 | Honest unresolved links; pass |
| Find Windows .zip on GitHub | 5 | Honest unresolved link; pass |
| Download Linux .deb / Download Linux .rpm / Download macOS Apple silicon .pkg / Download macOS Intel .pkg / Download Windows .zip | 3 / 3 / 5 / 5 / 3 | Tested resolved actions; pass |
| If macOS shows an unidentified-developer warning, right-click the package and choose Open. | 12 | Direct conditional instruction; pass |
| Review any Windows security warning before running the file. | 9 | Direct safety instruction; pass |
| Start and check the watcher | 5 | Standalone heading; pass |
| On Linux, use these commands to set up, check, or trigger the watcher. | 13 | Direct instruction; pass |
| Know the capture limits | 4 | Standalone heading; pass |
| A hard freeze can stop capture. | 6 | `hard-freeze-limit`; pass |
| The last completed snapshot remains available. | 7 | `hard-freeze-limit`; pass |
| Log access follows your account. | 5 | `limited-source-report`; pass |
| Unavailable sources appear in the report. | 6 | `limited-source-report`; pass |
| Review before sharing. | 3 | Direct instruction; pass |
| Redaction does not remove every machine detail. | 7 | `redaction-limits`; pass |
| Freeze Capsule · Save Linux freeze clues before reboot. | 8 | Footer description; pass |
| Privacy / Terms / Built by Param Factory | 1 / 1 / 4 | Footer links; pass |
| v0.1.1 · build 2026.08 | 3 | Build label; pass |

### README

| Copy | Words | Audit |
| --- | ---: | --- |
| Freeze Capsule | 2 | Title; pass |
| Save Linux freeze clues before a reboot erases them. | 9 | Plain summary; pass |
| Freeze Capsule is for desktop Linux users debugging graphics, kernel, application, or display-session freezes. | 14 | Audience; pass |
| Its background watcher keeps one encrypted snapshot current. | 8 | `encrypted-redacted` and `rolling-snapshot`; pass |
| If the watcher pauses for 90 seconds, it keeps the last complete snapshot. | 13 | `watchdog-gap`; pass |
| Live site: https://freeze-capsule.sociobot.in | 3 | Link label; pass |
| Try the isolated demo | 4 | Standalone heading; pass |
| The command loads the bundled sample. | 6 | `sample-fixture`; pass |
| It writes an encrypted capsule and redacted Markdown report under a new temporary directory. | 14 | `encrypted-redacted`; pass |
| It never reads or writes your normal capsule directory. | 9 | `cli-local-only`; pass |
| The same isolated sample is available at https://freeze-capsule.sociobot.in/demo?demo=1. | 8 | `sample-report`, `demo-private`; pass |
| This browser report comes from the included command-line demo. | 9 | `sample-fixture`; pass |
| Install | 1 | Action heading; pass |
| Linux and macOS / Windows PowerShell | 3 / 2 | Platform labels; pass |
| Both installers download the published archive and verify its SHA-256 checksum. | 11 | `installer-checksum`; pass |
| Install with Homebrew after the formula is published: | 8 | Conditional instruction; pass |
| Install with Scoop after adding this repository as a bucket: | 10 | Conditional instruction; pass |
| The watcher collects real system data only on Linux. | 9 | `linux-only-capture`; pass |
| Use the included sample to inspect a report before installing. | 10 | Direct instruction; pass |
| Capture and export freeze reports | 5 | Standalone heading; pass |
| Start the watcher as your Linux user: | 7 | Direct instruction; pass |
| Capture from a desktop hotkey: | 5 | `hotkey-capture`; pass |
| Bind the printed command in your desktop keyboard settings. | 9 | Direct instruction; pass |
| List and export reports after a freeze or reboot: | 9 | Procedure heading; pass |
| JSON output is available for scripts: | 6 | `json-output`; pass |
| What Freeze Capsule records | 4 | Standalone heading; pass |
| Each Linux snapshot requests journal, kernel, graphics, connector, and process details. | 11 | `linux-live-capture`; pass |
| It also records selected display-session variables. | 6 | `linux-live-capture`; pass |
| A report marks unavailable sources instead of abandoning capture. | 9 | `limited-source-report`; pass |
| Capsules use XChaCha20-Poly1305 with a local 32-byte key. | 8 | `encryption-format`; pass |
| On Unix, the key is created with owner-only 0600 permissions. | 10 | `key-permissions`; pass |
| Rendering replaces common home paths, email addresses, IPv4 addresses, and secret assignments. | 12 | `redaction-coverage`; pass |
| Review every report before sharing it. | 6 | Direct instruction; pass |
| At most eight saved capsules remain. | 6 | `bounded-retention`; pass |
| The current rolling snapshot does not use one of those eight slots. | 12 | `current-snapshot`; pass |
| A hard freeze can stop every user process, so Freeze Capsule cannot guarantee a final write. | 16 | `hard-freeze-limit`; pass |
| It preserves the last completed snapshot instead. | 7 | `hard-freeze-limit`; pass |
| Develop | 1 | Contributor heading; pass |
| You need Rust, Node.js, and npm to build from source. | 10 | Direct prerequisite; pass |
| The site is in dist/site. | 5 | `build-output`; pass |
| The release binary is in target/release/freeze-capsule. | 6 | `build-output`; pass |
| If Playwright needs a browser, run npx playwright install chromium. | 10 | Recovery instruction; pass |
| Release | 1 | Maintainer heading; pass |
| Tag a tested commit: | 4 | Direct instruction; pass |
| The checked release workflow declares Linux, macOS, and Windows packaging jobs. | 11 | `release-workflow-declaration`; pass |
| It does not configure package signing. | 6 | `release-workflow-declaration`; pass |
| Privacy and license | 3 | Standalone heading; pass |
| The included command-line demo makes no network connection and uses a temporary directory. | 13 | `cli-local-only`; pass |
| See privacy and terms. | 4 | Direct instruction; pass |
| Freeze Capsule is released under the MIT License. | 8 | `free-license`; pass |

Terminology check: **capsule** is the encrypted evidence file, **report** is the
readable output, **watcher** is the background process, **snapshot** is current
evidence, **sample** is the shipped scenario, and **demo** is the isolated
try-out. No banned marketing terms, generic slogans, or mood headings were
found.

## Demo, privacy, and CLI sandbox verification

- Clicking **Try it with sample data** once opened `/demo?demo=1` with the
  populated report at scroll position zero. The first 844 px includes journal,
  graphics, process, and display-session rows for an AMD timeout, Cinnamon,
  and Chrome.
- The persistent banner reads “Demo — sample data, nothing is saved,” with
  **Reset demo** and **Install Freeze Capsule**. Reset discarded a seeded
  `demo:changed` key, restored the shipped `demo:loaded` state, and preserved a
  separate `real:sentinel` key. Leaving demo removed every `demo:` key and
  retained the real key.
- The live demo request log contained only the product origin: document,
  first-party JavaScript, CSS, image, and `assets/demo-report.json`. No
  third-party request occurred.
- From a separate temporary working directory, `freeze-capsule --json demo`
  wrote an encrypted `.fcap` and Markdown report only under a temporary
  `freeze-capsule-demo-*` directory; it reported `"temporary": true`.
- The brief does not imply an AI-assisted workflow, import, sync, or additional
  export beyond the existing Markdown and JSON report paths. No decorative AI
  feature or embedded provider credential is present.

## Claims and quality verification

Fresh clone: `/tmp/freeze-capsule-review8.Yl0BXI/repo`; dependencies installed
with `npm ci`.

- Every exact command named by all 28 entries in `.factory/claims.json` passed
  independently. No claim test failed or was skipped.
- `npm test` passed: 11 Rust tests, the watchdog integration test, and 39
  Playwright tests.
- The release build claim produced `dist/site`; the app JavaScript is 16.95 kB
  (6.14 kB gzip), below the static-site budget.
- Live Home, Demo, Privacy, Terms, a real unknown-route 404, and `/404.html`
  each have a route-specific title, description, canonical, OG title, favicon,
  one h1, and one main. Axe reported no serious/critical violation. No page
  has horizontal overflow at 390 px. The expected browser network message for
  navigating to the real HTTP 404 was excluded from application-console errors.
- Crawl of all internal and external rendered links returned 200 (where a
  document response is applicable). The unknown route itself returned HTTP 404.
  Back and Forward restored focus to the destination heading and updated the
  live announcement.

## Earlier findings reconciliation

I read every earlier `review-*.md`, `polish-*.md`, and the prior handoff, then
checked the fixes against the current source and live deployment rather than
accepting their status labels. No historical ID reopens:

| Earlier finding IDs checked individually | Current confirmation |
| --- | --- |
| F-1-1 through F-1-9 | Seeded one-click report, isolated exits, generated fixture parity, real 404, metadata, focus/history, mobile first screen, and honest package links all pass live and in tagged tests. |
| F-1-10 through F-1-40 | Removed unsupported copy remains absent; capture, redaction, retention, installer, JSON, encryption, state, tracking, release, and license claims have corresponding passing declared tests. |
| F-1-41 through F-1-50 | Current headings, actions, terms, terminology, sentence lengths, and mobile copy remain direct and standalone. |
| F-2-1 through F-2-21 | Clean quality gate, complete static 404, inventory coverage, request timing, and plain command-line-sample wording remain confirmed. |
| F-3-1 | Every tested ordinary demo exit clears only `demo:` state; live behavior confirmed again. |
| F-4-1 through F-4-23 | Phone output placement, installer verification, narrowed release wording, build outputs, clipboard and lookup recovery, direct labels, README clarity, and 404/legal wording remain confirmed. |
| F-5-1 through F-5-2 | Linux-only capture and first-use “background watcher” wording remain present and tested. |
| F-6-1 through F-6-3 | Hash routing/focus, 44 px controls, CSP-compatible 404 assets, and the three mobile facts remain confirmed. |
| F-7-1 through F-7-4 | Android/iOS and macOS package selection, missing-asset behavior, the plain storage fact, and the two README headings remain confirmed by source, live check, and the package-selection claim matrix. |

F-8-1 is new rather than a re-open of F-1-37: the old exact-path wording is
still absent, but the new generic removal promise is itself unlisted.

## What would make this perfect

Resolve F-8-1 by either removing the untestable deletion promise or documenting
one tested Linux removal location with a declared removal test. Then rerun the
same clean-clone claims, CLI demo, and live route checks. With no remaining
finding, the product would meet the PASS threshold.
