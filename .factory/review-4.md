# Adversarial first-read review 4 — Freeze Capsule

**Reviewed:** 28 August 2026 UTC  
**Live URL:** <https://freeze-capsule.sociobot.in>  
**Candidate:** `784aaa1512ead50241ae3f2d985aefa99bfead46`  
**Verdict:** **FAIL**

The cold landing screen is clear and the product works, but the required phone
demo screen does not show the actual sample report before scrolling. Two claim
tests pass by finding strings in source files rather than observing the claimed
installer and release outcomes. One README claim is absent from
`.factory/claims.json`. The remaining findings cover an unhandled clipboard
failure, a misleading package-lookup error, and copy that conflicts with the
supplied plain-words rules. A PASS requires zero findings.

## First screen, before scrolling

Fresh Chromium contexts at 390×844 and 1440×900 were opened before the brief,
design file, source, or earlier reviews were read.

| Question | Cold answer in my own words | Exact first-screen evidence |
| --- | --- | --- |
| What does it do? | It saves Linux graphics, kernel, process, and session clues before a reboot loses them. | “Save freeze clues before you reboot” |
| For whom? | Desktop Linux users diagnosing a freeze. | “For desktop Linux users who need graphics, kernel, process, and session context after a freeze.” |
| What should I click first? | Open the sample report. | “Try it with sample data” / “See a redacted report in one click.” |

This narrow check passes at both widths. At 390 px the headline, audience,
action, outcome, and all three facts are visible before the fold. The first
screen contains one clear primary action.

## Findings — blocking

### F-4-1 — The phone demo does not show the product output in its first screen (partially reopens F-1-1)

- **Quote/location:** Landing action “Try it with sample data”; `/demo?demo=1`
  at 390×844.
- **Observed:** One click loads the AMD/Cinnamon/Chrome sample and the report is
  present in the DOM. However, the terminal starts at y=785 and the report sheet
  starts at y=1,266; the “Freeze Capsule report” heading starts at y=1,339. The
  first 844 px show the banner, repeated header, page introduction, and “Replay
  sample capture,” but no journal, graphics, process, or session evidence.
- **Why it fails:** The demo contract requires the first screen after the click
  to already show the product being used with realistic sample data. DOM
  visibility below the fold is not first-screen visibility. The existing
  `@claim:sample-report` assertion uses Playwright `toBeVisible()`, which does
  not assert intersection with the viewport.
- **Concrete fix:** Put the populated report or a real excerpt directly under
  the demo banner on phones. Move the introduction and replay control below it,
  or collapse them. Extend `@claim:sample-report` to assert the report/excerpt's
  bounding box intersects 390×844 after the single landing click.

### F-4-2 — The installer checksum claim test does not run either verification path (reopens F-1-17 and F-2-8)

- **Quote/location:** README: “Both installers download the published archive
  and verify its SHA-256 checksum.” Test
  `@claim:installer-checksum` in `tests/claims.spec.ts`.
- **Observed:** The declared command exits successfully, but the test only reads
  `install.sh` and `install.ps1` and searches for strings such as
  `SHA256SUMS`, `expected`, `actual`, and the comparison operators. It does not
  execute either installer with a valid checksum or a tampered checksum. A
  separate reviewer run confirmed the live POSIX happy path installs into a
  temporary directory, but no declared regression proves rejection.
- **Why it fails:** A string-presence test can pass when the comparison is
  unreachable or broken. The attached claims contract requires the promised
  outcome, not the presence of implementation text. The earlier finding
  specifically required valid and deliberately mismatched checksum cases.
- **Concrete fix:** Serve a valid archive/checksum and a mismatched checksum from
  a local fixture server. Run both installer paths, assert the valid archive is
  installed, and assert the mismatched archive is rejected before any copy.

### F-4-3 — The release-artifact claim test checks workflow words, not artifacts (reopens F-1-30, F-1-31, and F-2-15)

- **Quote/location:** README: “The GitHub Actions workflow builds archives,
  Linux packages, macOS packages, Windows archives, checksums, and release
  manifests. macOS and Windows artifacts are unsigned.” Test
  `@claim:release-artifacts`.
- **Observed:** The test only checks that `.github/workflows/release.yml`
  contains ten strings, including `.deb`, `.rpm`, `.pkg`, `.zip`, and
  `unsigned`. It does not execute packaging, inspect produced files, validate
  manifests/checksums, or inspect signatures. The current live v0.1.1 links do
  resolve, but that external state is not the declared clean-clone sandbox
  test.
- **Why it fails:** A comment or disconnected workflow line satisfies the test.
  It therefore does not prove the public build/signature claim from a clean
  clone.
- **Concrete fix:** Make CI emit a fixture manifest from actual packaging jobs
  and validate file names, checksums, archive contents, and signature state in
  the tagged claim test. If that cannot run locally, narrow the README to what
  the checked workflow declares rather than what it builds.

### F-4-4 — “The build commands print their output paths” is an unlisted claim (related regression of F-1-26/F-1-27)

- **Quote/location:** README, Develop: “The build commands print their output
  paths.”
- **Observed:** No `.factory/claims.json` entry covers this sentence. The
  displayed block includes `npm ci` and `npm test`, which do not each print a
  final artifact path; `cargo build --release` reports a target profile rather
  than the binary path.
- **Why it fails:** A developer can rely on this sentence to find artifacts,
  but neither the wording nor a claim test identifies which command prints
  which path. This leaves an untested and over-broad claim.
- **Concrete fix:** Replace it with the explicit instruction “The site is in
  `dist/site`; the release binary is in `target/release/freeze-capsule`,” then
  add a tagged build-output test, or delete the sentence.

## Findings — major

### F-4-5 — Clipboard denial produces an uncaught error and no user guidance

- **Quote/location:** Landing Install control “Copy command.”
- **Observed:** In a fresh HTTPS context without clipboard permission, clicking
  the button leaves its text unchanged and raises `Failed to execute
  'writeText' on 'Clipboard': Write permission denied.` as a page error.
- **Why it fails:** The visitor cannot tell whether the command was copied or
  how to recover. The error-state rule requires what happened and one next
  action.
- **Concrete fix:** Catch clipboard rejection and announce “Could not copy.
  Select the command and copy it manually.” Add an `aria-live` status and a
  denied-permission browser test.

### F-4-6 — The package-lookup failure message invents the cause

- **Quote/location:** Landing package-check failure: “Downloads are being
  published. The release page shows current files.”
- **Observed:** The same text is deliberately shown when the GitHub request is
  aborted. A timeout, rate limit, CSP failure, or offline state does not mean
  packages are being published.
- **Why it fails:** The message can mislead a visitor about release status and
  does not say that the lookup failed. Its “being published” assertion is also
  absent from the claims inventory and cannot be established by a failed
  request.
- **Concrete fix:** Use “Package check failed. Open the GitHub release page to
  see current files.” Keep the existing release-page link and test the revised
  state.

## Findings — minor copy and structure

Each item below is a separate plain-words flag with a direct rewrite.

### F-4-7 — The hero label uses invented drawing lore

- **Quote/location:** Landing hero: “LINUX FIELD TOOL · DRAWING FC–01”.
- **Why:** “Field tool” and “drawing FC–01” do not tell a new visitor another
  usable fact.
- **Rewrite:** “Linux freeze evidence tool,” or remove the label.

### F-4-8 — The hero caption starts with a decorative figure number

- **Quote/location:** “FIG. 1 — journal · graphics · processes · display
  session”.
- **Why:** The source list is useful; “FIG. 1” is not.
- **Rewrite:** “Evidence sources: journal, graphics, processes, and display
  session.”

### F-4-9 — “DETAIL A” does not name the section

- **Quote/location:** Sample preview label “DETAIL A”.
- **Why:** It has no meaning outside the blueprint metaphor.
- **Rewrite:** Delete it; retain “Included command-line sample.”

### F-4-10 — “SEQUENCE / 03” does not name the section

- **Quote/location:** Workflow label “SEQUENCE / 03”.
- **Why:** The adjacent heading already names the process; the label is
  decorative.
- **Rewrite:** Delete it, or use “Three steps.”

### F-4-11 — “INSTALLATION PLATE” is a metaphor label

- **Quote/location:** Install section label “INSTALLATION PLATE”.
- **Why:** “Plate” adds no install information.
- **Rewrite:** Delete it; “Install the Linux watcher” already names the section.

### F-4-12 — “BOUNDARY NOTES” is less direct than the section heading

- **Quote/location:** Limits label “BOUNDARY NOTES”.
- **Why:** It is a drafting metaphor beside the already clear “Know the capture
  limits.”
- **Rewrite:** Delete it, or use “Capture limits.”

### F-4-13 — The README introduces “watcher” without defining it

- **Quote/location:** README opening: “Its watcher keeps one encrypted snapshot
  current.”
- **Why:** “Watcher” is implementation jargon on first use.
- **Rewrite:** “Its background watcher keeps one encrypted snapshot current.”

### F-4-14 — The Homebrew heading is conditional jargon

- **Quote/location:** README: “Homebrew after the tap is published:”.
- **Why:** It does not say that the following command installs the product, and
  “tap” is unexplained.
- **Rewrite:** “Install with Homebrew after the formula is published:”.

### F-4-15 — The Scoop heading does not name the result

- **Quote/location:** README: “Scoop after adding the repository bucket:”.
- **Why:** It describes setup state but not the action that follows.
- **Rewrite:** “Install with Scoop after adding this repository as a bucket:”.

### F-4-16 — “Live capture” is not defined

- **Quote/location:** README: “Live capture is Linux-specific.”
- **Why:** The reader has to infer whether this means the watcher, demo, or
  report renderer.
- **Rewrite:** “The watcher collects real system data only on Linux.”

### F-4-17 — “After a freeze or reboot” does not name the next task

- **Quote/location:** README procedure label “After a freeze or reboot:”.
- **Why:** Read alone, it does not explain what the commands do.
- **Rewrite:** “List and export reports after a freeze or reboot:”.

### F-4-18 — The 404 eyebrow uses drawing lore

- **Quote/location:** 404: “DRAWING NOT FOUND / 404”.
- **Why:** The route is a missing web page, not a drawing.
- **Rewrite:** “PAGE NOT FOUND / 404”.

### F-4-19 — The 404 heading describes a “sheet,” not a page

- **Quote/location:** 404 h1: “This sheet is missing”.
- **Why:** The heading does not name the web error in plain language.
- **Rewrite:** “Page not found”.

### F-4-20 — The 404 return action continues the metaphor

- **Quote/location:** 404 link: “Return to the home sheet”.
- **Why:** The result is the home page.
- **Rewrite:** “Return to the home page”.

### F-4-21 — The Privacy route has a decorative policy-sheet label

- **Quote/location:** Privacy: “POLICY SHEET / 01”.
- **Why:** It carries no policy information.
- **Rewrite:** Delete it, or use “Privacy policy.”

### F-4-22 — The Terms route has a decorative terms-sheet label

- **Quote/location:** Terms: “TERMS SHEET / 01”.
- **Why:** The sheet number carries no usable information.
- **Rewrite:** Delete it, or use “Terms.”

### F-4-23 — The Terms h1 is vague

- **Quote/location:** Terms h1: “Use the tool at your discretion”.
- **Why:** It sounds like a warning but does not identify the page as terms.
- **Rewrite:** “Terms for using Freeze Capsule”.

## Copy audit — landing page

Counts use visible lexical words; version numbers and dotted file types count
as one word, while standalone punctuation does not. Commands are included as
controls but are not prose sentences. No sentence exceeds 22 words and no
banned marketing adjective appears.

| Copy | Words | Audit |
| --- | ---: | --- |
| Skip to main content | 4 | Pass |
| Freeze Capsule | 2 | Pass |
| Demo / Install / Privacy | 1 each | Pass |
| Linux field tool · drawing FC–01 | 5 | F-4-7 |
| Save freeze clues before you reboot | 6 | Pass |
| For desktop Linux users who need graphics, kernel, process, and session context after a freeze. | 15 | Pass |
| Try it with sample data | 5 | Result-naming demo action; pass |
| See a redacted report in one click. | 7 | Pass; the post-click viewport fails F-4-1 |
| Free and open source | 4 | Pass |
| Demo data stays separate | 4 | Pass |
| Keeps at most eight capsules | 5 | Pass |
| Fig. 1 — journal · graphics · processes · display session | 7 | F-4-8 |
| Detail A | 2 | F-4-9 |
| Included command-line sample | 3 | Pass |
| See the sample report before installing | 6 | Pass |
| View the sample report | 4 | Result-naming action; pass |
| This browser report comes from the included command-line demo. | 9 | Pass |
| Sequence / 03 | 2 | F-4-10 |
| How Freeze Capsule keeps pre-freeze evidence | 6 | Pass |
| Keep one snapshot current | 4 | Pass |
| The watcher records a ten-minute window every 30 seconds. | 9 | Pass |
| Keep the snapshot when the watcher pauses | 7 | Pass |
| A 90-second pause keeps the last completed snapshot. | 9 | Pass |
| Create a redacted report | 4 | Pass |
| The report removes home paths, email addresses, IP addresses, and common secrets. | 12 | Pass |
| Installation plate | 2 | F-4-11 |
| Install the Linux watcher | 4 | Pass |
| Install Freeze Capsule, then choose when to start the watcher. | 10 | Pass |
| Copy command | 2 | Result-naming action; interaction fails F-4-5 |
| Copied | 1 | Completion state; pass |
| Find a package on GitHub, or check the published release. | 10 | Pass |
| Open Linux releases / Download for Linux | 3 each | Result-naming actions; pass |
| Check published packages | 3 | Result-naming action; pass |
| Checking the GitHub release… | 4 | Pass |
| v0.1.1 packages are ready. | 4 | Pass |
| Linux was detected. | 3 | Pass |
| Downloads are being published. | 4 | F-4-6 |
| The release page shows current files. | 6 | F-4-6 |
| Find Linux .deb on GitHub / Find Linux .rpm on GitHub | 5 each | Pass |
| Find macOS .pkg on GitHub / Find Windows .zip on GitHub | 5 each | Pass |
| Start and check the watcher | 5 | Pass |
| On Linux, use these commands to set up, check, or trigger the watcher. | 13 | Pass |
| Boundary notes | 2 | F-4-12 |
| Know the capture limits | 4 | Pass |
| A hard freeze can stop capture. | 6 | Pass |
| The last completed snapshot remains available. | 7 | Pass |
| Log access follows your account. | 5 | Pass |
| Unavailable sources appear in the report. | 6 | Pass |
| Review before sharing. | 3 | Pass |
| Redaction does not remove every machine detail. | 7 | Pass |
| Freeze Capsule · Save Linux freeze clues before reboot. | 8 | Pass |
| Terms / Built by Param Factory / v0.1.1 · build 2026.08 | 1 / 4 / 3 | Pass |

Every landing task action starts with a verb and names its result. The clipboard
failure is behavioral, not a label failure.

## Copy audit — README

Command invocations in fenced blocks are excluded. Their explanatory comment,
all headings, and all prose are included. No sentence exceeds 22 words; the
longest has 16.

| Copy | Words | Audit |
| --- | ---: | --- |
| Freeze Capsule | 2 | Title; pass |
| Save Linux freeze clues before a reboot erases them. | 9 | Pass |
| Freeze Capsule is for desktop Linux users debugging graphics, kernel, application, or display-session freezes. | 14 | Pass |
| Its watcher keeps one encrypted snapshot current. | 7 | F-4-13 |
| If the watcher pauses for 90 seconds, it keeps the last complete snapshot. | 13 | Pass |
| Live site: URL | 3 | Pass |
| Try the isolated demo | 4 | Pass |
| The command loads the bundled sample. | 6 | Pass |
| It writes an encrypted capsule and redacted Markdown report under a new temporary directory. | 14 | Pass |
| It never reads or writes your normal capsule directory. | 9 | Pass |
| The same isolated sample is available at the demo URL. | 8 | Pass |
| This browser report comes from the included command-line demo. | 9 | Pass |
| Install / Linux and macOS / Windows PowerShell | 1 / 3 / 2 | Pass |
| Both installers download the published archive and verify its SHA-256 checksum. | 11 | F-4-2 |
| Homebrew after the tap is published | 6 | F-4-14 |
| Scoop after adding the repository bucket | 6 | F-4-15 |
| Live capture is Linux-specific. | 4 | F-4-16 |
| Use the included sample to inspect a report before installing. | 10 | Pass |
| Use | 1 | Heading; pass |
| Start the watcher as your Linux user | 7 | Pass |
| Capture from a desktop hotkey | 5 | Pass |
| Bind the printed command in your desktop keyboard settings. | 9 | Pass |
| After a freeze or reboot | 5 | F-4-17 |
| JSON output is available for scripts | 6 | Pass |
| What it records | 3 | Pass |
| Each Linux snapshot requests journal, kernel, graphics, connector, and process details. | 11 | Pass |
| It also records selected display-session variables. | 6 | Pass |
| A report marks unavailable sources instead of abandoning capture. | 9 | Pass |
| Capsules use XChaCha20-Poly1305 with a local 32-byte key. | 8 | Necessary format detail; pass |
| On Unix, the key is created with owner-only 0600 permissions. | 10 | Pass |
| Rendering replaces common home paths, email addresses, IPv4 addresses, and secret assignments. | 12 | Pass |
| Review every report before sharing it. | 6 | Pass |
| At most eight saved capsules remain. | 6 | Pass |
| The current rolling snapshot does not use one of those eight slots. | 12 | Pass |
| A hard freeze can stop every user process, so Freeze Capsule cannot guarantee a final write. | 16 | Pass |
| It preserves the last completed snapshot instead. | 7 | Pass |
| Develop | 1 | Heading; pass |
| You need Rust, Node.js, and npm to build from source. | 10 | Build prerequisite; pass |
| The build commands print their output paths. | 7 | F-4-4 |
| If Playwright needs a browser, run npx playwright install chromium. | 10 | Recovery instruction; pass |
| Release | 1 | Heading; pass |
| Tag a tested commit | 4 | Instruction; pass |
| The GitHub Actions workflow builds archives, Linux packages, macOS packages, Windows archives, checksums, and release manifests. | 16 | F-4-3 |
| macOS and Windows artifacts are unsigned. | 6 | F-4-3 |
| Privacy and license | 3 | Heading; pass |
| The included command-line demo makes no network connection and uses a temporary directory. | 13 | Pass |
| See privacy and terms. | 4 | Pass |
| Freeze Capsule is released under the MIT License. | 8 | Pass |

Terminology is otherwise consistent: **capsule** is the encrypted evidence
file, **report** is the readable output, **snapshot** is the current evidence,
**sample** is the shipped scenario, and **demo** is the isolated try-out.

## Demo and sandbox evidence

- One landing click opens `/demo?demo=1`; the AMD timeout, Cinnamon, Chrome,
  journal, graphics, process, connector, and display-session data are already
  loaded. F-4-1 concerns their phone viewport position, not a second click.
- The persistent banner reads “Demo — sample data, nothing is saved” and offers
  **Reset demo** and **Install Freeze Capsule**.
- A seeded `real:marker` in both local and session storage survived demo entry
  and Reset. Reset removed a seeded `demo:changed` key and re-created only
  `demo:loaded`.
- The live demo requested only the product document, hashed JS/CSS, hero, and
  `assets/demo-report.json`, all same-origin. It created no cookie and no
  local-storage entry.
- Privacy, Home, Back, and a real 404 each cleared all `demo:` keys. The
  non-demo marker remained untouched.
- The CLI command was run from a new temporary working directory with a new
  `XDG_STATE_HOME`. It wrote one `.fcap` and one Markdown report under
  `/tmp/freeze-capsule-demo-<pid>` and wrote nothing to the working or normal
  state directory.
- No offline claim is made.

## Declared claims

All 25 exact commands in `.factory/claims.json` were run individually after
`npm ci` in clean clone `/tmp/freeze-review4-cdX0YK/clone`. Every command exited
successfully. “Pass” below records command outcome; F-4-2 and F-4-3 explain why
two passing implementations still do not prove their claims.

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
| `hard-freeze-limit` | PASS |
| `limited-source-report` | PASS |
| `hotkey-capture` | PASS |
| `installer-checksum` | PASS exit; insufficient outcome coverage, F-4-2 |
| `json-output` | PASS |
| `encryption-format` | PASS |
| `key-permissions` | PASS |
| `current-snapshot` | PASS |
| `release-artifacts` | PASS exit; insufficient outcome coverage, F-4-3 |
| `normal-state-directory` | PASS |
| `site-no-tracking` | PASS |
| `release-lookup-request` | PASS |
| `redaction-limits` | PASS |

F-4-4 is the unlisted product/build claim. The unsupported causal assertion in
the landing error state is separately recorded in F-4-6.

## Structure, routing, links, and accessibility

- `/`, `/demo?demo=1`, `/privacy`, and `/terms` return 200. An unknown route
  returns the designed 404 with HTTP 404; `/404.html` itself returns 200.
- Each checked route has `lang=en`, one `main`, one `h1`, a route-specific title
  in the required pattern, a description, canonical, Open Graph/Twitter fields,
  SVG favicon, and 180×180 Apple icon. The social image is 1200×630.
- Home, Demo, Privacy, Terms, and 404 use the same header/footer skeleton with a
  skip link, Privacy, Terms, Param Factory attribution, and build identifier.
- Direct deep links work. Demo navigation focuses “Inspect a sample freeze
  report”; Back focuses “Save freeze clues before you reboot”; Forward restores
  demo heading focus; leaving for Privacy focuses “Privacy stays local.”
- All discovered static links, hash targets, GitHub Releases, Sociobot, and the
  four resolved v0.1.1 package downloads returned 200. No dead link was found.
- `/opt/fleet/lib/verify-url.sh` passed with no page/console errors on load, one
  h1, one main, valid alt text, and `lang=en`.
- Live Axe 4.13.0 checks reported zero violations on Home, Demo, Privacy, Terms,
  and the unknown-route 404. The project suite also covers visible focus,
  reduced motion, 44 px demo controls, mobile width, and route focus.
- The blueprint grid, cutaway capsule art, crop marks, square safety-yellow
  controls, and restrained scan motion are recognisable and product-specific.
  This is not a generic SaaS template. Original-asset provenance is recorded in
  `.factory/design.md`.
- The clean build emits 13.94 kB JavaScript (5.21 kB gzip) and `dist/site`.

## Earlier-finding audit

Every earlier review, polish note, and handoff was read. The table records a
fresh live/source confirmation for each earlier finding; “fixed” is not copied
from the polish notes.

| Earlier ID | Current verification |
| --- | --- |
| F-1-1 | **Half-fixed:** one click loads the report, but it is below the phone first screen; F-4-1. |
| F-1-2 | Fixed: every tested exit clears `demo:` keys; real markers survive. |
| F-1-3 | Fixed: generated browser fixture equals command-line demo output. |
| F-1-4 | Fixed: copy is narrowed to the tested demo-only network claim. |
| F-1-5 | Fixed: unknown live URL returns the complete designed HTTP 404. |
| F-1-6 | Fixed: Demo, Back, and Forward focus the route h1. |
| F-1-7 | Fixed: route titles, descriptions, canonicals, OG, and Twitter values update. |
| F-1-8 | Fixed: the home phone first screen contains outcome and three facts. |
| F-1-9 | Fixed: unresolved links name GitHub; resolved v0.1.1 assets return 200. |
| F-1-10 | Fixed: “one binary” claim is absent. |
| F-1-11 | Fixed: Linux source contract is declared and exercised. |
| F-1-12 | Fixed: cross-platform command promise is absent. |
| F-1-13 | Fixed: real watcher suspension exercises the hard-freeze limitation. |
| F-1-14 | Fixed: limited-source behavior has a controlled test. |
| F-1-15 | Fixed: missing/unreadable sources remain in a usable report test. |
| F-1-16 | Fixed: emitted hotkey command creates isolated retained evidence. |
| F-1-17 | **Half-fixed:** claim exists, but test only searches source strings; F-4-2. |
| F-1-18 | Fixed: unsupported package-availability sentence is absent. |
| F-1-19 | Fixed: both documented JSON results are parsed in the claim test. |
| F-1-20 | Fixed: all named Linux collection sources are asserted. |
| F-1-21 | Fixed: 96 KiB public assertion is absent. |
| F-1-22 | Fixed: encryption layout, key size, and round trip are exercised. |
| F-1-23 | Fixed: Unix key mode is checked as 0600. |
| F-1-24 | Fixed: current snapshot wording and slot behavior are direct and tested. |
| F-1-25 | Fixed: unsupported tool-version floor is absent. |
| F-1-26 | **Regressed in broader form:** build-output assertion remains; F-4-4. |
| F-1-27 | **Regressed in broader form:** build-output assertion remains; F-4-4. |
| F-1-28 | Fixed: Playwright browser recovery command is accurate. |
| F-1-29 | Fixed: “only on GitHub Actions” assertion is absent. |
| F-1-30 | **Half-fixed:** workflow-string test does not observe artifacts; F-4-3. |
| F-1-31 | **Half-fixed:** `unsigned` string is not signature inspection; F-4-3. |
| F-1-32 | Fixed: normal isolated state contains one key and capsule. |
| F-1-33 | Fixed: live and local static-route request/cookie audits pass. |
| F-1-34 | Fixed: GitHub lookup occurs only after its explicit action. |
| F-1-35 | Fixed: pre/post lookup link destinations are honest and live. |
| F-1-36 | Fixed: collector-source test covers the retained categories. |
| F-1-37 | Fixed: unsupported exact deletion-path claim is absent. |
| F-1-38 | Fixed: unsupported uninstall-retention claim is absent. |
| F-1-39 | Fixed: redaction-limit fixture retains a hardware identifier. |
| F-1-40 | Fixed: MIT license and warranty text are asserted. |
| F-1-41 | Fixed: evidence workflow heading names product and job. |
| F-1-42 | Fixed: pause heading uses direct wording. |
| F-1-43 | Fixed: report step says “Create a redacted report.” |
| F-1-44 | Fixed: watcher action heading makes sense alone. |
| F-1-45 | Fixed: 90-second pause is described directly. |
| F-1-46 | Fixed: source list is split and below 22 words. |
| F-1-47 | Fixed: background process consistently uses “watcher”; first-use clarity is the new F-4-13. |
| F-1-48 | Fixed: “freeze” and defined “hard freeze” remain consistent. |
| F-1-49 | Fixed: “least-privilege” wording is absent. |
| F-1-50 | Fixed: preview action says “View the sample report.” |
| F-2-1 | Fixed: clean `npm test` passes all 33 browser tests. |
| F-2-2 | Fixed: standalone 404 has full shell, icons, metadata, and skip link. |
| F-2-3 | Fixed: Linux live-capture claim exists and passes. |
| F-2-4 | Fixed: unsupported cross-platform command claim is absent. |
| F-2-5 | Fixed: suspended-watcher claim passes. |
| F-2-6 | Fixed: permission/missing-source claim passes. |
| F-2-7 | Fixed: hotkey command is executed in isolated storage. |
| F-2-8 | **Half-fixed:** installer test is source-string inspection; F-4-2. |
| F-2-9 | Fixed: unsupported release-page availability wording is absent. |
| F-2-10 | Fixed: list/report JSON output is parsed. |
| F-2-11 | Fixed: collector source contract is tested. |
| F-2-12 | Fixed: encryption format is exercised. |
| F-2-13 | Fixed: key permissions are exercised. |
| F-2-14 | Fixed: prebuffer jargon is absent and slot behavior is tested. |
| F-2-15 | **Half-fixed:** artifact/signature outcomes are not tested; F-4-3. |
| F-2-16 | Fixed: normal state behavior is exercised. |
| F-2-17 | Fixed: site tracking/cookie claim is exercised locally and confirmed live. |
| F-2-18 | Fixed: explicit GitHub lookup timing is exercised. |
| F-2-19 | Fixed: unsupported package-removal assertion is absent. |
| F-2-20 | Fixed: a retained hardware detail demonstrates the redaction boundary. |
| F-2-21 | Fixed: user-facing copy says “included command-line sample”; no “fixture.” |
| F-3-1 | Fixed: Privacy, Home, Back, and real 404 clear demo state in live checks and code. |

## Full quality-gate evidence

- `npm test` from the clean clone: PASS — 10 Rust tests, watchdog integration,
  and 33 Playwright tests.
- `npm run build`: exercised by every claim command and the full test; PASS,
  producing `dist/site`.
- All 25 exact claim commands: PASS by exit status.
- Live URL verifier: PASS.
- Live Axe on five routes: zero violations.
- CLI demo from a fresh temporary directory: PASS; normal state untouched.
- POSIX installer into a fresh temporary install directory: PASS; installed
  v0.1.1 binary ran its isolated demo.

## Missed leverage

No missing AI, sync, or import feature is implied by the brief. Sending freeze
evidence to a model would weaken the product's local-first position unless a
user explicitly asked for it. The product already supplies the expected
Markdown and JSON export paths. No decorative AI feature, provider key, or AI
network request exists.

## What would make this perfect

Move realistic report evidence into the first 844 px of the phone demo. Replace
the installer and release string checks with outcome tests, and remove or test
the README build-output assertion. Handle clipboard denial and report package
lookup failure accurately. Remove the blueprint lore from user-facing labels,
define “watcher” on first use, clarify the two package-manager headings, and
rename the 404 and Terms copy in plain page language. Then rerun the full cold
read, every claim command, live request log, link crawl, accessibility checks,
and the complete earlier-finding table; a PASS requires that no item remains.
