# Adversarial first-read review 5 — Freeze Capsule

**Reviewed:** 28 August 2026 UTC  
**Live URL:** <https://freeze-capsule.sociobot.in>  
**Candidate:** `9a18043c4d81df0f753315c25ca6d0a4496b8b59`  
**Verdict:** **FAIL**

The cold-read path, populated browser demo, isolation, live routing, links,
accessibility, and all 26 declared claim commands pass. Two findings remain:
one public behavior claim has no matching claims entry/test, and the landing
page introduces its key background process as unexplained jargon. A PASS
requires zero findings.

## First screen, before scrolling

Fresh browser contexts were used at 390×844 and 1440×900. No scroll occurred
before recording this result.

| Question | First-read answer | Exact evidence |
| --- | --- | --- |
| What does it do? | It saves Linux freeze evidence before a reboot. | “Save freeze clues before you reboot” |
| For whom? | Desktop Linux users diagnosing a freeze. | “For desktop Linux users who need graphics, kernel, process, and session context after a freeze.” |
| What should I click first? | Try the sample report. | “Try it with sample data” and “See a redacted report in one click.” |

This passes on both viewports. At 390 px, the action outcome ends at y=514 and
the third fact ends at y=583, inside the 844 px first screen. The distinct
blueprint drafting identity, original capsule art, and non-generic layout are
present on the deployed page.

## Findings

### F-5-1 — “only on Linux” is an unlisted, untested public capability claim

- **Severity:** Blocking
- **Quote/location:** README, Install: “The watcher collects real system data only on Linux.”
- **Observed:** `.factory/claims.json` has `linux-live-capture`, whose claim is
  “Linux capture requests journal, kernel, graphics, connector, process, and
  display-session sources.” Its tagged test runs only the Linux collector
  source-contract test. It does not state or prove the converse: that
  non-Linux builds collect no real system data.
- **Why this matters:** A macOS or Windows visitor can rely on this boundary
  when deciding whether to install the package. The claims contract requires
  the published behavior itself to be listed and demonstrated from a clean
  sandbox, not inferred from a nearby Linux-only test.
- **Concrete fix:** Add a separate `linux-only-capture` claims entry with this
  exact public sentence and a tagged test. Refactor the platform choice behind
  an injectable function if needed, then assert that a non-Linux platform
  produces only the unavailable/platform result and no journal, kernel,
  graphics, connector, process, or display-session command request. Or remove
  the “only on Linux” sentence.

### F-5-2 — The landing page uses “watcher” before defining it

- **Severity:** Minor
- **Quote/location:** Landing, How Freeze Capsule keeps pre-freeze evidence:
  “The watcher records a ten-minute window every 30 seconds.”
- **Why this matters:** The visitor has not yet been told that a watcher is the
  background process which records the evidence. README defines “background
  watcher,” but the landing page must stand on its own for the 30-second phone
  visit.
- **Concrete fix:** Rewrite as: “The background watcher records a ten-minute
  window every 30 seconds.” Keep “watcher” for later references.

## Demo and sandbox check

- One landing click opened `/demo?demo=1` with a populated report at scroll
  position 0. The first phone screen showed realistic AMD `ring gfx timeout`,
  Cinnamon, Chrome, journal, graphics, processes, and display-session data.
- The persistent banner read “Demo — sample data, nothing is saved,” with
  **Reset demo** and **Install Freeze Capsule**. Reset removed a seeded
  `demo:changed` key, restored `demo:loaded`, and preserved `real:marker`.
  Leaving demo removed all `demo:` keys and preserved real state.
- The demo flow made only same-origin requests. The live home made no
  third-party request before action; **Check published packages** then made
  one request to `api.github.com`, matching the disclosed explicit action.
- The direct CLI command `cargo run --quiet -- --json demo` created an
  encrypted `.fcap` and redacted Markdown report under
  `/tmp/freeze-capsule-demo-8920/`; it reported `temporary: true`.

## Claims and quality evidence

From fresh clone `/tmp/freeze-capsule-review-5-NmDyPt/repo`:

- `npm ci` passed.
- Every one of the 26 exact `test` commands in `.factory/claims.json` passed
  individually.
- `npm test` passed: 10 Rust unit tests, watchdog integration, and 35
  Playwright/browser tests.
- `npm test` rebuilt `dist/site`; the production JavaScript is 14.82 kB
  (5.54 kB gzip).

The listed claims therefore pass. F-5-1 remains because the public
Linux-only sentence is broader than, and absent from, those listed claims.

## Structure, accessibility, and links

- Home, Demo, Privacy, Terms, and the designed unknown-route 404 had a
  route-specific title, meta description, canonical URL, OG URL, favicon,
  `lang=en`, one `h1`, and one `main`.
- `/missing-sheet` returned HTTP 404 with the designed page; `/404.html`
  returned the deliberate standalone document. The header/footer, skip link,
  Privacy, and Terms were present on all routes.
- Back from Demo restored the Home URL, focused “Save freeze clues before you
  reboot,” and updated the polite route announcement. Forward did the same for
  Demo.
- Live axe checks returned zero violations on Home, Demo, Privacy, Terms, and
  the 404. There were no browser console errors.
- The live response sends CSP (including response-header `frame-ancestors`),
  `X-Content-Type-Options`, `Referrer-Policy`, and a restrictive permissions
  policy.
- All landing links returned HTTP 200 after redirects, including the resolved
  Linux `.deb`, `.rpm`, macOS `.pkg`, Windows `.zip`, GitHub release page,
  legal routes, and Param Factory link.

## Copy audit

Counts use whitespace-separated visible words. Commands, version strings, and
single-word navigation labels are not sentences; result-naming controls were
checked separately. No audited sentence exceeds 22 words. The one landing
jargon finding is F-5-2. No marketing adjective, metaphor heading, or
non-result naming button was found.

### Landing sentences

| Sentence | Words | Claim/flag |
| --- | ---: | --- |
| Save freeze clues before you reboot | 6 | headline |
| For desktop Linux users who need graphics, kernel, process, and session context after a freeze. | 15 | audience |
| See a redacted report in one click. | 7 | `sample-report` |
| Evidence sources: journal, graphics, processes, and display session. | 8 | `sample-report` |
| Demo — bundled sample data, nothing is saved to your capsule directory. | 11 | `demo-private` |
| This browser report comes from the included command-line demo. | 9 | `sample-fixture` |
| The watcher records a ten-minute window every 30 seconds. | 9 | F-5-2; `rolling-snapshot` |
| A 90-second pause keeps the last completed snapshot. | 8 | `watchdog-gap` |
| The report removes home paths, email addresses, IP addresses, and common secrets. | 12 | `redaction-coverage` |
| Install Freeze Capsule, then choose when to start the watcher. | 10 | instruction |
| Find a package on GitHub, or check the published release. | 10 | `release-lookup-request` |
| If macOS shows an unidentified-developer warning, right-click the package and choose Open. | 12 | platform instruction |
| Review any Windows security warning before running the file. | 9 | platform instruction |
| On Linux, use these commands to set up, check, or trigger the watcher. | 13 | `hotkey-capture` |
| A hard freeze can stop capture. | 6 | `hard-freeze-limit` |
| The last completed snapshot remains available. | 6 | `hard-freeze-limit` |
| Log access follows your account. | 5 | `limited-source-report` |
| Unavailable sources appear in the report. | 6 | `limited-source-report` |
| Review before sharing. | 3 | instruction |
| Redaction does not remove every machine detail. | 7 | `redaction-limits` |
| Freeze Capsule · Save Linux freeze clues before reboot. | 8 | product one-liner |

Result-naming landing controls checked: **Try it with sample data**, **View
the sample report**, **Replay sample capture**, **Copy command**, **Open Linux
releases**, **Check published packages**, and the four **Find … on GitHub**
links. All name an outcome or destination.

### README sentences

| Sentence | Words | Claim/flag |
| --- | ---: | --- |
| Save Linux freeze clues before a reboot erases them. | 9 | product summary |
| Freeze Capsule is for desktop Linux users debugging graphics, kernel, application, or display-session freezes. | 14 | audience |
| Its background watcher keeps one encrypted snapshot current. | 8 | `rolling-snapshot` |
| If the watcher pauses for 90 seconds, it keeps the last complete snapshot. | 13 | `watchdog-gap` |
| The command loads the bundled sample. | 6 | `sample-fixture` |
| It writes an encrypted capsule and redacted Markdown report under a new temporary directory. | 14 | `encrypted-redacted` |
| It never reads or writes your normal capsule directory. | 9 | `cli-local-only` |
| The same isolated sample is available at https://freeze-capsule.sociobot.in/demo?demo=1. | 8 | `sample-report` / `demo-private` |
| This browser report comes from the included command-line demo. | 9 | `sample-fixture` |
| Both installers download the published archive and verify its SHA-256 checksum. | 11 | `installer-checksum` |
| The watcher collects real system data only on Linux. | 9 | **F-5-1** |
| Use the included sample to inspect a report before installing. | 10 | instruction |
| Start the watcher as your Linux user. | 7 | instruction |
| Capture from a desktop hotkey. | 5 | `hotkey-capture` |
| List and export reports after a freeze or reboot. | 9 | `json-output` |
| JSON output is available for scripts. | 6 | `json-output` |
| Each Linux snapshot requests journal, kernel, graphics, connector, and process details. | 11 | `linux-live-capture` |
| It also records selected display-session variables. | 6 | `linux-live-capture` |
| A report marks unavailable sources instead of abandoning capture. | 9 | `limited-source-report` |
| Capsules use XChaCha20-Poly1305 with a local 32-byte key. | 8 | `encryption-format` |
| On Unix, the key is created with owner-only 0600 permissions. | 10 | `key-permissions` |
| Rendering replaces common home paths, email addresses, IPv4 addresses, and secret assignments. | 12 | `redaction-coverage` |
| Review every report before sharing it. | 6 | instruction |
| At most eight saved capsules remain. | 6 | `bounded-retention` |
| The current rolling snapshot does not use one of those eight slots. | 12 | `current-snapshot` |
| A hard freeze can stop every user process, so Freeze Capsule cannot guarantee a final write. | 16 | `hard-freeze-limit` |
| It preserves the last completed snapshot instead. | 7 | `hard-freeze-limit` |
| You need Rust, Node.js, and npm to build from source. | 10 | instruction |
| The site is in `dist/site`. | 5 | `build-output` |
| The release binary is in `target/release/freeze-capsule`. | 6 | `build-output` |
| If Playwright needs a browser, run `npx playwright install chromium`. | 10 | instruction |
| Tag a tested commit. | 4 | instruction |
| The checked release workflow declares Linux, macOS, and Windows packaging jobs. | 11 | `release-workflow-declaration` |
| It does not configure package signing. | 6 | `release-workflow-declaration` |
| The included command-line demo makes no network connection and uses a temporary directory. | 13 | `cli-local-only` |
| Freeze Capsule is released under the MIT License. | 8 | `free-license` |

## Earlier-finding confirmation ledger

Each earlier finding was rechecked against the live deployment and current
code rather than accepted from its previous “fixed” label.

| Earlier IDs | Status now | Current confirmation |
| --- | --- | --- |
| F-1-1, F-1-50 | Fixed | One landing click renders the populated report; both actions name the sample report. |
| F-1-2, F-3-1 | Fixed | Reset, Home, Privacy, Install, Back, and 404 discard only `demo:` state. |
| F-1-3 | Fixed | Browser sample is generated from the CLI demo; `sample-fixture` passed. |
| F-1-4 | Fixed | CLI local-only demo claim passed with network blocking. |
| F-1-5, F-2-2 | Fixed | Complete shared-shell unknown route returns HTTP 404. |
| F-1-6, F-1-7 | Fixed | Back/Forward focus/announce and route-specific metadata work live. |
| F-1-8 | Fixed | Phone hero outcome and three facts are in the first screen. |
| F-1-9 | Fixed | Package links name GitHub before lookup and resolved download links work. |
| F-1-10–F-1-40, each | Fixed | Unsupported wording remains removed or the corresponding declared claim passed (source capture, watcher gap, permissions, hotkey, installers, JSON, encryption, key mode, retention, build outputs, workflow, normal state, privacy, lookup, redaction, and MIT license). |
| F-1-41–F-1-49, except F-5-2 | Fixed | Earlier metaphors, inconsistent freeze names, long sentence, and unclear headings remain absent; F-5-2 is a new first-use landing clarity finding. |
| F-2-1 | Fixed | Full clean-clone `npm test` passed. |
| F-2-3–F-2-20, except the narrower F-5-1 boundary | Fixed | Their listed claim tests passed. F-5-1 is the remaining unlisted converse of the Linux-only disclosure. |
| F-2-21 | Fixed | Public copy uses “command-line,” not unexplained CLI/fixture language. |
| F-4-1 | Fixed | Four evidence rows are visible in the first 390 px demo screen. |
| F-4-2–F-4-4 | Fixed | Installer, workflow-declaration, and build-output claim tests passed. |
| F-4-5, F-4-6 | Fixed | Clipboard and lookup failures have recovery copy without console errors. |
| F-4-7–F-4-12 | Fixed | Decorative drawing-lore labels remain removed from public copy. |
| F-4-13–F-4-17 | Fixed | README headings, defined “background watcher,” Linux scope, and report task wording remain clear. |
| F-4-18–F-4-23 | Fixed | 404, Privacy, and Terms public headings and actions remain plain and route-specific. |

## What would make this perfect

Add and pass the exact non-Linux capture-boundary claim/test, then define the
background watcher on first use on the landing page. Re-run the clean-clone
claim loop and the same live phone check. With those two changes, this review
has no other open finding.
