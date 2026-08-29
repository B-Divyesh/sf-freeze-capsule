# Adversarial first-read review 9 — Freeze Capsule

**Reviewed:** 29 August 2026 UTC  
**Live URL:** <https://freeze-capsule.sociobot.in>  
**Candidate:** `8a3e95b4ab74fe04f7bfc64cda351d2bca6b3737`  
**Verdict:** **PASS**

No blocking, major, or minor finding remains. The first screen is clear on phone
and desktop, the one-click demo immediately shows realistic output, demo and
normal state remain separate, every listed claim test passes from a clean clone,
and every earlier finding remains fixed in both the deployed site and current
source.

## First screen, before scrolling

Fresh Chromium contexts opened `/` at 390×844 and 1440×900 with `scrollY = 0`.

| Question | Answer in my own words | Exact first-screen evidence |
| --- | --- | --- |
| What does it do? | It saves Linux freeze evidence before a reboot loses it. | “Save freeze clues before you reboot” |
| For whom? | Desktop Linux users investigating a freeze. | “For desktop Linux users who need graphics, kernel, process, and session context after a freeze.” |
| What should I click first? | Open the ready-made sample report. | “Try it with sample data” and “See a redacted report in one click.” |

This passes at both sizes. At 390 px, the action result ends at y=514 and the
three facts end at y=613. At 1440 px, the facts end at y=861 inside the 900 px
viewport. Both pages have zero horizontal overflow and no load error.

## Findings

None.

## Copy audit — landing page

Counts use whitespace-separated visible words. Commands and diagnostic rows are
not prose sentences; their surrounding labels and actions are included. Dynamic
success and error states are included. No item exceeds 22 words, contains a
banned marketing adjective, uses a mood-only heading, changes a core term, or
uses a non-result-naming task control.

| Copy | Words | Audit |
| --- | ---: | --- |
| Freeze Capsule — save Linux freeze clues | 7 | Route announcement/title; direct |
| Skip to main content | 4 | Skip link; direct |
| Freeze Capsule | 2 | Wordmark |
| Demo / Install / Privacy | 1 each | Navigation |
| Linux freeze evidence tool | 4 | Product label; direct |
| Save freeze clues before you reboot | 6 | Job headline |
| For desktop Linux users who need graphics, kernel, process, and session context after a freeze. | 15 | Audience and situation |
| Try it with sample data | 5 | Result-naming action |
| See a redacted report in one click. | 7 | `sample-report` |
| Free under the MIT License | 5 | `free-license` |
| Freeze Capsule stores capsules and the key in a folder on your computer. | 13 | `normal-state-directory` |
| The command-line demo makes no network connection. | 7 | `cli-local-only` |
| Evidence sources: journal, graphics, processes, and display session. | 8 | Useful image caption |
| Included command-line sample | 3 | Sample label |
| See the sample report before installing | 6 | Standalone heading |
| View the sample report | 4 | Result-naming action |
| Demo — bundled sample data, nothing is saved to your capsule directory. | 11 | `demo-private` |
| Encrypted sample: temporary `.fcap` | 4 | Output label |
| Redacted report: temporary `freeze-report.md` | 4 | Output label |
| journal / graphics / processes / display-session | 4 | Diagnostic row |
| This browser report comes from the included command-line demo. | 9 | `sample-fixture` |
| Three steps | 2 | Process label |
| How Freeze Capsule keeps pre-freeze evidence | 6 | Standalone heading |
| Keep one snapshot current | 4 | Step heading |
| The background watcher records a ten-minute window every 30 seconds. | 10 | `rolling-snapshot`; defines watcher |
| Keep the snapshot when the watcher pauses | 7 | Step heading |
| A 90-second pause keeps the last completed snapshot. | 9 | `watchdog-gap` |
| Create a redacted report | 4 | Step heading |
| The report removes home paths, email addresses, IP addresses, and common secrets. | 12 | `redaction-coverage` |
| Install the Linux watcher | 4 | Standalone heading |
| Install Freeze Capsule, then choose when to start the watcher. | 10 | Direct instruction |
| Copy command / Copied | 2 / 1 | Result action and success state |
| Install command copied. | 3 | Success status |
| Could not copy. | 3 | Error status |
| Select the command and copy it manually. | 8 | Recovery action |
| Find a package on GitHub, or check the published release. | 10 | Direct instruction |
| Open Linux releases / Check published packages | 3 / 3 | Destination and result actions |
| Checking the GitHub release… | 4 | Progress status |
| v0.1.1 Linux `.deb` package is ready. | 6 | `platform-package-selection` |
| v0.1.1 does not include a Linux `.deb` package. Open the GitHub release page to see current files. | 17 | Tested missing-asset recovery |
| Choose a package on your desktop. | 6 | Tested Android/iOS state |
| Choose the matching macOS package for your Mac. | 9 | Tested architecture-safe state |
| Package check failed. | 3 | Accurate error |
| Open the GitHub release page to see current files. | 10 | Recovery action |
| Find Linux `.deb` on GitHub / Find Linux `.rpm` on GitHub | 5 / 5 | Honest unresolved links |
| Find macOS Apple silicon `.pkg` on GitHub / Find macOS Intel `.pkg` on GitHub | 7 / 7 | Honest unresolved links |
| Find Windows `.zip` on GitHub | 5 | Honest unresolved link |
| Download Linux `.deb` / Download Linux `.rpm` | 3 / 3 | Result-naming resolved links |
| Download macOS Apple silicon `.pkg` / Download macOS Intel `.pkg` | 5 / 5 | Result-naming resolved links |
| Download Windows `.zip` | 3 | Result-naming resolved link |
| If macOS shows an unidentified-developer warning, right-click the package and choose Open. | 12 | Direct conditional instruction |
| Review any Windows security warning before running the file. | 9 | Direct safety instruction |
| Start and check the watcher | 5 | Standalone heading |
| On Linux, use these commands to set up, check, or trigger the watcher. | 13 | Direct instruction |
| Know the capture limits | 4 | Standalone heading |
| A hard freeze can stop capture. | 6 | `hard-freeze-limit` |
| The last completed snapshot remains available. | 7 | `hard-freeze-limit` |
| Log access follows your account. | 5 | `limited-source-report` |
| Unavailable sources appear in the report. | 6 | `limited-source-report` |
| Review before sharing. | 3 | Direct instruction |
| Redaction does not remove every machine detail. | 7 | `redaction-limits` |
| Freeze Capsule · Save Linux freeze clues before reboot. | 8 | Footer description |
| Privacy / Terms / Built by Param Factory | 1 / 1 / 4 | Footer navigation |
| v0.1.1 · build 2026.08 | 3 | Build label |

## Copy audit — README

Fenced commands are executable examples, not sentences. Each is introduced by a
direct task sentence below. No sentence exceeds 22 words and no copy flag was
found.

| Copy | Words | Audit |
| --- | ---: | --- |
| Freeze Capsule | 2 | Product heading |
| Save Linux freeze clues before a reboot erases them. | 9 | Plain summary |
| Freeze Capsule is for desktop Linux users debugging graphics, kernel, application, or display-session freezes. | 14 | Audience |
| Its background watcher keeps one encrypted snapshot current. | 8 | Defines watcher |
| If the watcher pauses for 90 seconds, it keeps the last complete snapshot. | 13 | `watchdog-gap` |
| Live site | 2 | Link label |
| Try the isolated demo | 4 | Standalone heading |
| The command loads the bundled sample. | 6 | `sample-fixture` |
| It writes an encrypted capsule and redacted Markdown report under a new temporary directory. | 14 | `encrypted-redacted` |
| It never reads or writes your normal capsule directory. | 9 | `cli-local-only` |
| The same isolated sample is available at the demo URL. | 8 | `sample-report`, `demo-private` |
| This browser report comes from the included command-line demo. | 9 | `sample-fixture` |
| Install | 1 | Action heading |
| Linux and macOS / Windows PowerShell | 3 / 2 | Platform labels |
| Both installers download the published archive and verify its SHA-256 checksum. | 11 | `installer-checksum` |
| Install with Homebrew after the formula is published. | 8 | Conditional instruction |
| Install with Scoop after adding this repository as a bucket. | 10 | Conditional instruction |
| The watcher collects real system data only on Linux. | 9 | `linux-only-capture` |
| Use the included sample to inspect a report before installing. | 10 | Direct instruction |
| Capture and export freeze reports | 5 | Standalone heading |
| Start the watcher as your Linux user. | 7 | Direct instruction |
| Capture from a desktop hotkey. | 5 | `hotkey-capture` |
| Bind the printed command in your desktop keyboard settings. | 9 | Direct instruction |
| List and export reports after a freeze or reboot. | 9 | Procedure heading |
| JSON output is available for scripts. | 6 | `json-output` |
| What Freeze Capsule records | 4 | Standalone heading |
| Each Linux snapshot requests journal, kernel, graphics, connector, and process details. | 11 | `linux-live-capture` |
| It also records selected display-session variables. | 6 | `linux-live-capture` |
| A report marks unavailable sources instead of abandoning capture. | 9 | `limited-source-report` |
| Capsules use XChaCha20-Poly1305 with a local 32-byte key. | 8 | `encryption-format` |
| On Unix, the key is created with owner-only 0600 permissions. | 10 | `key-permissions` |
| Rendering replaces common home paths, email addresses, IPv4 addresses, and secret assignments. | 12 | `redaction-coverage` |
| Review every report before sharing it. | 6 | Direct instruction |
| At most eight saved capsules remain. | 6 | `bounded-retention` |
| The current rolling snapshot does not use one of those eight slots. | 12 | `current-snapshot` |
| A hard freeze can stop every user process, so Freeze Capsule cannot guarantee a final write. | 16 | `hard-freeze-limit` |
| It preserves the last completed snapshot instead. | 7 | `hard-freeze-limit` |
| Develop | 1 | Standard contributor heading |
| You need Rust, Node.js, and npm to build from source. | 10 | Build prerequisite |
| The site is in `dist/site`. | 5 | `build-output` |
| The release binary is in `target/release/freeze-capsule`. | 6 | `build-output` |
| If Playwright needs a browser, run `npx playwright install chromium`. | 10 | Recovery instruction |
| Release | 1 | Standard maintainer heading |
| Tag a tested commit. | 4 | Direct instruction |
| The checked release workflow declares Linux, macOS, and Windows packaging jobs. | 11 | `release-workflow-declaration` |
| It does not configure package signing. | 6 | `release-workflow-declaration` |
| Privacy and license | 3 | Standalone heading |
| The included command-line demo makes no network connection and uses a temporary directory. | 13 | `cli-local-only` |
| For normal Linux storage, remove `~/.local/state/freeze-capsule` to remove the local key and saved capsules. | 14 | `local-evidence-removal` |
| If you set `XDG_STATE_HOME`, remove its `freeze-capsule` folder instead. | 9 | `local-evidence-removal` |
| See privacy and terms. | 4 | Direct link instruction |
| Freeze Capsule is released under the MIT License. | 8 | `free-license` |

Terminology is consistent:

| Concept | Term |
| --- | --- |
| Encrypted evidence file | capsule |
| Human-readable output | report |
| Background process | watcher |
| Latest replaceable evidence | snapshot |
| Kept evidence after a trigger | saved capsule |
| Included scenario | sample |
| Isolated try-out | demo |

## Demo and sandbox verification

- One click on **Try it with sample data** opened `/demo?demo=1` at scroll
  position zero with four populated evidence rows inside the first 844 px.
  The sample names an AMD ring timeout, Cinnamon, Chrome, and display-session
  data; it is not placeholder content.
- The persistent banner says “Demo — sample data, nothing is saved” and includes
  **Reset demo** and **Install Freeze Capsule**.
- Reset removed seeded `demo:stale` and `demo:changed` values, restored only
  `demo:loaded`, and preserved seeded `real:` values in local and session
  storage. Leaving demo removed all `demo:` values and preserved both real
  markers.
- The live request log for landing, entry, reset, and exit contained only
  `https://freeze-capsule.sociobot.in`. Static route checks created no cookie.
- A direct CLI run from a new temporary work directory with separate `TMPDIR`
  and `XDG_STATE_HOME` wrote a 1,649-byte encrypted capsule, a 32-byte key, and
  a 1,547-byte Markdown report only below `freeze-capsule-demo-*`. The normal
  state directory remained empty.
- No web offline-after-first-visit claim is made. The narrower command-line
  demo no-network claim passed with network `connect()` blocked.

## Claims verification

The repository was cloned with `git clone --no-local` to
`/tmp/freeze-review9-clean.Tk246r/repo`, then installed with `npm ci`. Every
exact `test` command in `.factory/claims.json` was run separately. All 29
passed; none was skipped.

| Claim ID | Result |
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

The same clean clone passed `npm test`: 11 Rust tests, the watchdog integration,
and 40 Playwright tests. `npm run build` produced `dist/site`; its application
JavaScript is 17.08 kB raw and 6.21 kB gzip. Cross-checking the deployed landing,
demo, privacy, terms, README, and dynamic package states found no unlisted
claim-like sentence.

## Structure, routing, links, accessibility, and identity

- `/`, `/demo?demo=1`, `/privacy`, and `/terms` return 200. `/missing-sheet`
  returns the designed page with HTTP 404; `/404.html` returns 200 as its source
  document.
- Every checked route has `lang=en`, one `main`, one `h1`, a route-specific
  title, description, canonical, Open Graph title/URL/image, favicon, Apple
  touch icon, skip link, legal footer, and build identifier. The social image
  is 1200×630 and the Apple icon is 180×180.
- Demo navigation, Back, and Forward focus the destination `h1`, update the
  polite announcement, and return to scroll position zero. Direct and clicked
  `/#install` routes focus and reveal **Install the Linux watcher** after smooth
  scrolling settles.
- Live Axe checks found no serious or critical violation on Home, Demo,
  Privacy, Terms, the real 404, or `/404.html`. Every visible phone link,
  button, and summary is at least 44×44 px. Reduced-motion mode removes the
  scan animation.
- The factory URL verifier passed in 748 ms with no application console errors,
  one `h1`, one `main`, `lang=en`, and no missing image alt or unlabelled button.
  The browser's expected failed-document message on the intentional HTTP 404 is
  not an application error.
- Every rendered internal link, GitHub Releases, Sociobot, and all 13 published
  v0.1.1 asset URLs returned 200 after redirects. `robots.txt`, `sitemap.xml`,
  the legal routes, and installer files are explicitly routed.
- The blueprint grid, cutaway evidence capsule, crop marks, square safety-yellow
  controls, mono/sans typography, and one-shot scan are recognisable and match
  `.factory/design.md`. This is not the generic centred-hero/three-card SaaS
  pattern. Original image provenance is recorded in the design file.

## Earlier-finding verification

Every earlier review, polish record, and handoff was read. Each finding below
was checked against the deployed behavior and current source or its observable
clean-clone regression; no status was accepted from a prior “fixed” label.

### Review 1

| ID | Current verification |
| --- | --- |
| F-1-1 | Fixed: one click opens populated evidence inside the phone viewport. |
| F-1-2 | Fixed: Reset and every tested exit clear only `demo:` state. |
| F-1-3 | Fixed: the browser fixture equals generated command-line output. |
| F-1-4 | Fixed: no-network wording remains limited to the tested CLI demo. |
| F-1-5 | Fixed: unknown routes use the complete designed HTTP 404. |
| F-1-6 | Fixed: push, Back, and Forward restore heading focus. |
| F-1-7 | Fixed: every route updates title, description, canonical, OG, and Twitter data. |
| F-1-8 | Fixed: phone outcome and all three facts remain above the fold. |
| F-1-9 | Fixed: unresolved links name GitHub and resolved links name downloads. |
| F-1-10 | Fixed: the unsupported one-binary assertion remains absent. |
| F-1-11 | Fixed: Linux source collection is declared and tested. |
| F-1-12 | Fixed: unsupported cross-platform command wording remains absent. |
| F-1-13 | Fixed: stopped-watcher behavior and the retained snapshot are tested. |
| F-1-14 | Fixed: permission-limited sources remain named in usable output. |
| F-1-15 | Fixed: missing sources remain explicit without aborting the report. |
| F-1-16 | Fixed: the printed hotkey command creates retained evidence. |
| F-1-17 | Fixed: both installers accept valid and reject changed checksums. |
| F-1-18 | Fixed: unsupported release-availability prose remains absent. |
| F-1-19 | Fixed: documented list and report outputs parse as JSON. |
| F-1-20 | Fixed: every named Linux collection source is asserted. |
| F-1-21 | Fixed: the untested 96 KiB assertion remains absent. |
| F-1-22 | Fixed: encryption layout, nonce, key size, and round trip are tested. |
| F-1-23 | Fixed: Unix key mode is asserted as 0600. |
| F-1-24 | Fixed: the current snapshot does not consume a saved slot. |
| F-1-25 | Fixed: unsupported tool-version floors remain absent. |
| F-1-26 | Fixed: `dist/site` is produced and asserted. |
| F-1-27 | Fixed: the release binary path is produced and asserted. |
| F-1-28 | Fixed: Playwright browser recovery guidance is accurate. |
| F-1-29 | Fixed: the unsupported Actions-only sentence remains absent. |
| F-1-30 | Fixed: workflow copy is narrowed to its parsed declaration. |
| F-1-31 | Fixed: the declaration test finds no signing command. |
| F-1-32 | Fixed: normal isolated state contains one key and capsule. |
| F-1-33 | Fixed: static routes have no tracking, cookies, or foreign requests. |
| F-1-34 | Fixed: GitHub lookup occurs only after explicit activation. |
| F-1-35 | Fixed: package destinations are honest before and after lookup. |
| F-1-36 | Fixed: controlled capture covers the documented data categories. |
| F-1-37 | Fixed: normal Linux removal now names and tests the exact folder. |
| F-1-38 | Fixed: unsupported uninstall-retention prose remains absent. |
| F-1-39 | Fixed: retained hardware detail demonstrates the redaction boundary. |
| F-1-40 | Fixed: MIT license and warranty wording are asserted. |
| F-1-41 | Fixed: the evidence heading names Freeze Capsule and the job. |
| F-1-42 | Fixed: the pause step uses direct snapshot language. |
| F-1-43 | Fixed: the report step says “Create a redacted report.” |
| F-1-44 | Fixed: the post-install heading names watcher work. |
| F-1-45 | Fixed: the 90-second pause is described directly. |
| F-1-46 | Fixed: source descriptions remain below 22 words. |
| F-1-47 | Fixed: “background watcher” is defined before later uses. |
| F-1-48 | Fixed: “freeze” and defined “hard freeze” remain consistent. |
| F-1-49 | Fixed: least-privilege jargon remains absent. |
| F-1-50 | Fixed: both sample actions name the report result. |

### Review 2

| ID | Current verification |
| --- | --- |
| F-2-1 | Fixed: clean `npm test` passes all 40 browser tests. |
| F-2-2 | Fixed: standalone 404 has skip link, navigation, icons, social data, and footer. |
| F-2-3 | Fixed: Linux collection is listed and exercised. |
| F-2-4 | Fixed: unsupported macOS/Windows command promise remains absent. |
| F-2-5 | Fixed: watcher suspension behavior is listed and tested. |
| F-2-6 | Fixed: limited-source behavior is listed and tested. |
| F-2-7 | Fixed: hotkey capture is listed and tested. |
| F-2-8 | Fixed: both installer outcome paths execute. |
| F-2-9 | Fixed: unsupported release-page availability wording remains absent. |
| F-2-10 | Fixed: structured list/report output is parsed end to end. |
| F-2-11 | Fixed: all named collection sources remain asserted. |
| F-2-12 | Fixed: encryption details remain exercised. |
| F-2-13 | Fixed: key permissions remain exercised. |
| F-2-14 | Fixed: snapshot-slot wording and behavior remain direct. |
| F-2-15 | Fixed: workflow wording remains narrowed and structurally tested. |
| F-2-16 | Fixed: normal local-state behavior remains exercised. |
| F-2-17 | Fixed: whole-site no-tracking behavior remains exercised. |
| F-2-18 | Fixed: explicit GitHub request timing remains exercised. |
| F-2-19 | Fixed: unsupported uninstall prose remains absent. |
| F-2-20 | Fixed: retained hardware detail demonstrates redaction limits. |
| F-2-21 | Fixed: public copy uses “command-line,” not CLI/fixture jargon. |

### Review 3

| ID | Current verification |
| --- | --- |
| F-3-1 | Fixed: Privacy, Home, Back, Install, and 404 exits clear demo state while preserving real markers. |

### Review 4

| ID | Current verification |
| --- | --- |
| F-4-1 | Fixed: four populated evidence rows appear in the first phone demo screen. |
| F-4-2 | Fixed: POSIX and PowerShell installers accept and reject fixture checksums. |
| F-4-3 | Fixed: workflow copy says only what the parsed declaration proves. |
| F-4-4 | Fixed: both documented build paths are asserted. |
| F-4-5 | Fixed: clipboard denial supplies recovery text without a page error. |
| F-4-6 | Fixed: lookup failure names failure without inventing a cause. |
| F-4-7 | Fixed: hero label is “Linux freeze evidence tool.” |
| F-4-8 | Fixed: hero caption directly names evidence sources. |
| F-4-9 | Fixed: “Detail A” remains absent. |
| F-4-10 | Fixed: the process label remains “Three steps.” |
| F-4-11 | Fixed: “Installation plate” remains absent. |
| F-4-12 | Fixed: “Boundary notes” remains absent. |
| F-4-13 | Fixed: README defines “background watcher” on first use. |
| F-4-14 | Fixed: Homebrew heading names installation and its condition. |
| F-4-15 | Fixed: Scoop heading names installation and its bucket condition. |
| F-4-16 | Fixed: Linux-only collection is separately declared and tested. |
| F-4-17 | Fixed: report procedure heading names list/export behavior. |
| F-4-18 | Fixed: 404 label remains “Page not found / 404.” |
| F-4-19 | Fixed: application and standalone 404 headings say “Page not found.” |
| F-4-20 | Fixed: 404 action says “Return to the home page.” |
| F-4-21 | Fixed: Privacy label remains “Privacy policy.” |
| F-4-22 | Fixed: Terms label remains “Terms.” |
| F-4-23 | Fixed: Terms h1 names Freeze Capsule and the route. |

### Reviews 5–8

| ID | Current verification |
| --- | --- |
| F-5-1 | Fixed: non-Linux capture returns only an unavailable platform result. |
| F-5-2 | Fixed: landing defines “background watcher” on first use. |
| F-6-1 | Fixed: direct, clicked, history, and demo-exit hash navigation reveal and focus Install. |
| F-6-2 | Fixed: every visible phone control on all checked routes is at least 44×44 px. |
| F-6-3 | Fixed: tested price, local-storage, and no-network facts are above the fold. |
| F-7-1 | Fixed: mobile devices are not offered desktop installers; matching assets are required before readiness copy. |
| F-7-2 | Fixed: first-screen storage copy says “a folder on your computer.” |
| F-7-3 | Fixed: README heading is “Capture and export freeze reports.” |
| F-7-4 | Fixed: README heading is “What Freeze Capsule records.” |
| F-8-1 | Fixed: normal Linux storage removal names the exact paths and passes `local-evidence-removal`. |

## Missed leverage

No obvious AI, import, sync, or additional export step is missing from the
brief. Sending freeze evidence to a model would weaken the local-first boundary
without improving the core capture job. Markdown and JSON already provide the
expected export paths. No decorative AI feature, provider key, Azure endpoint,
or unexplained model request exists.

## What would make this perfect

Nothing remains for this review. Preserve the current one-click sample,
demo/real-data separation, exact claim inventory, package-selection matrix,
plain copy, and live route/accessibility regressions in future releases.
