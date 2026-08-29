# Adversarial first-read review 7 — Freeze Capsule

**Reviewed:** 29 August 2026 UTC

**Live URL:** <https://freeze-capsule.sociobot.in>

**Candidate:** `53c098114b86b489eedd4ddc44a2067dbe15b6f3`
**Verdict:** **FAIL**

The first screen, one-click demo, sandbox separation, declared claims, core
routing, accessibility checks, and full clean-clone test suite pass. The product
still fails because its package picker identifies Android as desktop Linux and
iPhone as macOS, then offers incompatible desktop installers. It also announces
that packages are ready without checking that a matching asset exists. That
behavior is not represented by a claim in `.factory/claims.json`. Three smaller
plain-language defects remain. A PASS requires zero findings.

## First screen, before scrolling

Fresh Chromium contexts were opened at 390×844 and 1440×900 with `scrollY = 0`.
The phone check was also repeated with real Android and iPhone user agents.

| Question | Answer in my own words | Exact first-screen evidence |
| --- | --- | --- |
| What does it do? | It saves Linux freeze evidence before a reboot loses it. | “Save freeze clues before you reboot” |
| For whom? | Desktop Linux users investigating a freeze. | “For desktop Linux users who need graphics, kernel, process, and session context after a freeze.” |
| What should I click first? | Open the sample report. | “Try it with sample data” and “See a redacted report in one click.” |

This check passes at both sizes. At 390 px, the action result ends at y=514 and
the third fact ends at y=613, inside the 844 px first screen. At 1440 px, all
three facts end at y=846 inside the 900 px viewport. Neither viewport has
horizontal overflow.

## Findings

### F-7-1 — The phone package picker claims the wrong desktop platform and can claim that missing packages are ready

- **Severity:** **BLOCKING**
- **Quote/location:** Landing install panel after **Check published packages**:
  “Linux was detected,” “macOS was detected,” “Download for Linux,” and
  “v0.1.1 packages are ready.” Source: `site/src/main.ts`,
  `detectedPlatform()`, `loadRelease()`, and `applyRelease()`.
- **Observed:** With Playwright's Pixel 7 user agent at 390×844, the live page
  initially says **Open Linux releases**. After the check it says “Linux was
  detected” and changes the primary action to **Download for Linux**, pointing
  at the x86_64 `.deb`. With an iPhone 13 user agent, it says “macOS was
  detected” and offers the x86_64 `.pkg`. Android and iOS cannot run those
  desktop packages. The code treats any user agent containing `Linux` as
  desktop Linux and any one containing `Mac` as macOS.
- **Claim gap:** No entry in `.factory/claims.json` lists platform detection,
  package readiness, or selection of a compatible asset. The existing
  `release-lookup-request` claim covers only request timing. Its tagged test
  deliberately returns `assets: []` and still expects “v-test packages are
  ready. Linux was detected,” proving that the status does not validate package
  availability.
- **Why this fails:** This review is explicitly phone-first. The site tells a
  phone visitor that an unsupported desktop platform was detected and gives
  them an incompatible installer. The “packages are ready” statement can also
  be false for any successful release response that lacks the selected asset.
  That is not an honest or safe install path for the core CLI job.
- **Concrete fix:** Detect Android and iOS before desktop Linux/macOS. On mobile,
  say **Choose a package on your desktop** and do not auto-select an installer.
  On desktop, say a package is ready only after the matching asset is present;
  otherwise name the missing package and retain the GitHub release-page link.
  Change resolved secondary actions from **Find … on GitHub** to
  **Download …** when their `href` becomes a file. Add a
  `platform-package-selection` claim and one tagged test covering Android,
  iPhone, Linux x86_64, Windows x86_64, macOS architecture ambiguity, and a
  release with no matching asset.

### F-7-2 — The first-screen privacy fact uses unexplained Linux storage jargon

- **Severity:** Minor
- **Quote/location:** Landing first screen: “Capsules and key stay in your state
  directory.”
- **Why this fails:** “State directory” is an implementation term. A distracted
  first-time visitor cannot tell from this line whether it means a folder on
  their computer or remote account storage. This is one of the three mandatory
  plain facts and should answer the privacy question directly.
- **Concrete rewrite:** “Freeze Capsule stores capsules and the key in a folder
  on your computer.” Keep `normal-state-directory` as the observable claim test.

### F-7-3 — The README heading “Use” does not name its section

- **Severity:** Minor
- **Quote/location:** `README.md`, `## Use`.
- **Why this fails:** In a headings-only outline, “Use” does not say whether the
  section covers capture, reports, configuration, or troubleshooting.
- **Concrete rewrite:** `## Capture and export freeze reports`.

### F-7-4 — The README heading “What it records” depends on missing context

- **Severity:** Minor
- **Quote/location:** `README.md`, `## What it records`.
- **Why this fails:** “It” has no antecedent when headings are read as an
  outline, including by a screen-reader user.
- **Concrete rewrite:** `## What Freeze Capsule records`.

## Copy audit

Counts use whitespace-separated visible words. Fenced commands and diagnostic
rows are not prose sentences and are excluded. No
sentence exceeds 22 words and no banned marketing adjective appears. Core terms
are consistent; the flags are F-7-1 through F-7-4.

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
| Capsules and key stay in your state directory | 8 | F-7-2 |
| The command-line demo makes no network connection | 7 | `cli-local-only`; pass |
| Evidence sources: journal, graphics, processes, and display session. | 8 | Useful image caption; pass |
| Included command-line sample | 3 | Useful label; pass |
| See the sample report before installing | 6 | Section heading; pass |
| View the sample report | 4 | Result-naming action; pass |
| Demo — bundled sample data, nothing is saved to your capsule directory. | 11 | `demo-private`; pass |
| Encrypted sample: temporary `.fcap` | 4 | Output label; pass |
| Redacted report: temporary `freeze-report.md` | 4 | Output label; pass |
| journal / graphics / processes / display-session | 4 | Diagnostic row, not prose |
| This browser report comes from the included command-line demo. | 9 | `sample-fixture`; pass |
| Three steps | 2 | Process label; pass |
| How Freeze Capsule keeps pre-freeze evidence | 6 | Standalone section heading; pass |
| Keep one snapshot current | 4 | Step heading; pass |
| The background watcher records a ten-minute window every 30 seconds. | 10 | `rolling-snapshot`; pass |
| Keep the snapshot when the watcher pauses | 7 | Step heading; pass |
| A 90-second pause keeps the last completed snapshot. | 8 | `watchdog-gap`; pass |
| Create a redacted report | 4 | Step heading; pass |
| The report removes home paths, email addresses, IP addresses, and common secrets. | 12 | `redaction-coverage`; pass |
| Install the Linux watcher | 4 | Section heading; pass |
| Install Freeze Capsule, then choose when to start the watcher. | 10 | Direct instruction; pass |
| Copy command / Copied | 2 / 1 | Result action and success state; pass |
| Install command copied. | 3 | Success state; pass |
| Could not copy. | 3 | Error state; pass |
| Select the command and copy it manually. | 8 | Recovery action; pass |
| Find a package on GitHub, or check the published release. | 10 | Direct instruction; pass |
| Open Linux releases | 3 | Destination-naming link on desktop; fails on phones in F-7-1 |
| Check published packages | 3 | Result-naming action; pass |
| Checking the GitHub release… | 4 | Progress state; pass |
| v0.1.1 packages are ready. | 4 | Unlisted and insufficiently validated; F-7-1 |
| Linux was detected. / macOS was detected. | 3 each | Unlisted and false on Android/iPhone; F-7-1 |
| Download for Linux / Download for macOS | 3 each | Wrong result on Android/iPhone; F-7-1 |
| Package check failed. | 3 | Accurate error state; pass |
| Open the GitHub release page to see current files. | 10 | Recovery action; pass |
| Find Linux `.deb` on GitHub / Find Linux `.rpm` on GitHub | 5 each | Honest before lookup; should become Download after resolution under F-7-1 |
| Find macOS `.pkg` on GitHub / Find Windows `.zip` on GitHub | 5 each | Honest before lookup; should become Download after resolution under F-7-1 |
| If macOS shows an unidentified-developer warning, right-click the package and choose Open. | 12 | Platform instruction; pass |
| Review any Windows security warning before running the file. | 9 | Platform instruction; pass |
| Start and check the watcher | 5 | Standalone heading; pass |
| On Linux, use these commands to set up, check, or trigger the watcher. | 13 | Direct instruction; pass |
| Know the capture limits | 4 | Standalone heading; pass |
| A hard freeze can stop capture. | 6 | `hard-freeze-limit`; pass |
| The last completed snapshot remains available. | 6 | `hard-freeze-limit`; pass |
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
| Its background watcher keeps one encrypted snapshot current. | 8 | Defines watcher; claim-covered |
| If the watcher pauses for 90 seconds, it keeps the last complete snapshot. | 13 | `watchdog-gap`; pass |
| Live site: `https://freeze-capsule.sociobot.in` | 3 | Link label; pass |
| Try the isolated demo | 4 | Heading; pass |
| The command loads the bundled sample. | 6 | `sample-fixture`; pass |
| It writes an encrypted capsule and redacted Markdown report under a new temporary directory. | 14 | `encrypted-redacted`; pass |
| It never reads or writes your normal capsule directory. | 9 | `cli-local-only`; pass |
| The same isolated sample is available at `https://freeze-capsule.sociobot.in/demo?demo=1`. | 8 | `sample-report` and `demo-private`; pass |
| This browser report comes from the included command-line demo. | 9 | `sample-fixture`; pass |
| Install | 1 | Action heading; pass |
| Linux and macOS | 3 | Platform label; pass |
| Windows PowerShell | 2 | Platform label; pass |
| Both installers download the published archive and verify its SHA-256 checksum. | 11 | `installer-checksum`; pass |
| Install with Homebrew after the formula is published: | 8 | Conditional instruction; pass |
| Install with Scoop after adding this repository as a bucket: | 10 | Conditional instruction; pass |
| The watcher collects real system data only on Linux. | 9 | `linux-only-capture`; pass |
| Use the included sample to inspect a report before installing. | 10 | Direct instruction; pass |
| Use | 1 | F-7-3 |
| Start the watcher as your Linux user: | 7 | Direct instruction; pass |
| Capture from a desktop hotkey: | 5 | `hotkey-capture`; pass |
| Bind the printed command in your desktop keyboard settings. | 9 | Direct instruction; pass |
| List and export reports after a freeze or reboot: | 9 | Procedure heading; pass |
| JSON output is available for scripts: | 6 | `json-output`; pass |
| What it records | 3 | F-7-4 |
| Each Linux snapshot requests journal, kernel, graphics, connector, and process details. | 11 | `linux-live-capture`; pass |
| It also records selected display-session variables. | 6 | `linux-live-capture`; pass |
| A report marks unavailable sources instead of abandoning capture. | 9 | `limited-source-report`; pass |
| Capsules use XChaCha20-Poly1305 with a local 32-byte key. | 8 | Precise format detail; `encryption-format` |
| On Unix, the key is created with owner-only 0600 permissions. | 10 | Plain result plus exact mode; `key-permissions` |
| Rendering replaces common home paths, email addresses, IPv4 addresses, and secret assignments. | 12 | `redaction-coverage`; pass |
| Review every report before sharing it. | 6 | Direct instruction; pass |
| At most eight saved capsules remain. | 6 | `bounded-retention`; pass |
| The current rolling snapshot does not use one of those eight slots. | 12 | `current-snapshot`; pass |
| A hard freeze can stop every user process, so Freeze Capsule cannot guarantee a final write. | 16 | `hard-freeze-limit`; pass |
| It preserves the last completed snapshot instead. | 7 | `hard-freeze-limit`; pass |
| Develop | 1 | Standard contributor action heading; pass |
| You need Rust, Node.js, and npm to build from source. | 10 | Direct prerequisite; exercised by clean build |
| The site is in `dist/site`. | 5 | `build-output`; pass |
| The release binary is in `target/release/freeze-capsule`. | 6 | `build-output`; pass |
| If Playwright needs a browser, run `npx playwright install chromium`. | 10 | Recovery instruction; pass |
| Release | 1 | Standard maintainer action heading; pass |
| Tag a tested commit: | 4 | Direct instruction; pass |
| The checked release workflow declares Linux, macOS, and Windows packaging jobs. | 11 | `release-workflow-declaration`; pass |
| It does not configure package signing. | 6 | `release-workflow-declaration`; pass |
| Privacy and license | 3 | Heading; pass |
| The included command-line demo makes no network connection and uses a temporary directory. | 13 | `cli-local-only`; pass |
| See privacy and terms. | 4 | Direct link instruction; pass |
| Freeze Capsule is released under the MIT License. | 8 | `free-license`; pass |

Terminology is otherwise consistent:

| Concept | One term used |
| --- | --- |
| Encrypted evidence file | capsule |
| Readable output | report |
| Background process | watcher |
| Current evidence | snapshot |
| Included scenario | sample |
| Isolated try-out | demo |

## Demo and sandbox verification

- One landing click opens `/demo?demo=1` at scroll position 0 with the report
  already populated. Journal, graphics, processes, and display-session rows are
  all inside the first 844 px. The sample contains an AMD ring timeout,
  Cinnamon, and Chrome rather than placeholder text.
- The persistent banner reads “Demo — sample data, nothing is saved” and shows
  **Reset demo** and **Install Freeze Capsule**.
- Reset removed seeded `demo:changed` and `demo:old` keys, restored only
  `demo:loaded`, and preserved seeded `real:marker` values in local and session
  storage. Exit removed every `demo:` key and preserved both real markers.
- The live demo request log contained only the product origin: document, hashed
  JS/CSS, hero art, and `assets/demo-report.json`. Static Home, Demo, Privacy,
  and Terms checks produced no cookies or third-party request.
- The command-line demo was run from `/tmp/freeze-review7-cli.GHdy2S` with a
  separate `XDG_STATE_HOME`. It wrote a 1,649-byte encrypted capsule, a 32-byte
  key, and a 1,547-byte Markdown report only under
  `freeze-capsule-demo-8969`; the normal state directory remained empty.
- No web offline-after-first-visit claim is made and no service worker exists.

## Claims verification

A clean clone was created with `git clone --no-local` at
`/tmp/freeze-review7.RrJvFI/repo`. After `npm ci`, every exact `test` command in
`.factory/claims.json` was run separately. All 27 declared claims passed.

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
| `site-no-tracking` | PASS |
| `release-lookup-request` | PASS |
| `redaction-limits` | PASS |

The full clean-clone `npm test` also passed: 11 Rust tests, the watchdog
integration, and 38 Playwright tests. The build produced `dist/site`; the
application JavaScript is 15.25 kB (5.73 kB gzip). F-7-1 remains because its
runtime detection/readiness sentences are unlisted claims and the existing
release request test positively accepts an empty asset list as “ready.”

## Structure, links, visual identity, and accessibility

- `/`, `/demo?demo=1`, `/privacy`, and `/terms` return 200. The designed
  `/missing-sheet` returns 404; `/404.html` returns 200 as its source document.
- Every checked route has `lang=en`, one `main`, one `h1`, a route-specific
  title, description, canonical URL, Open Graph/Twitter data, SVG favicon,
  Apple touch icon, skip link, legal footer, and Param Factory attribution.
- Demo navigation, Back, and Forward restore focus to the route `h1`. Direct
  `/#install` loads with **Install the Linux watcher** focused and at y=44.
  Header activation and demo exit reach the same section.
- Every discovered internal route, static file, GitHub release page, Sociobot
  link, and all 13 published v0.1.1 assets returned 200 after redirects. The
  only intended non-200 response is the designed unknown-route 404.
- Live Axe checks found zero serious or critical violations on Home, Demo,
  Privacy, Terms, the unknown 404, and `/404.html`. Every visible `a`, `button`,
  and `summary` on those routes is at least 44×44 px at 390 px. The factory URL
  verifier passed in 620 ms with no console error, one `h1`, one `main`, and no
  missing image alt text.
- Response headers include CSP with `frame-ancestors`,
  `X-Content-Type-Options`, `Referrer-Policy`, and a restrictive permissions
  policy. Reduced motion disables the one-shot scan.
- The blueprint grid, crop marks, exploded evidence capsule, sharp safety-yellow
  labels, mono/sans pairing, and scan line are product-specific. The page does
  not resemble the prohibited generic centered-hero/three-card template.

## Earlier-finding audit

Every earlier review, polish report, and handoff was read. Each ID below was
rechecked against the live site, current source, or its clean observable test;
none is accepted merely because a polish note says it was fixed.

### Review 1

| ID | Current confirmation |
| --- | --- |
| F-1-1 | Fixed: one click opens populated sample evidence in the phone viewport. |
| F-1-2 | Fixed: Reset and every tested exit clear only `demo:` state. |
| F-1-3 | Fixed: the browser fixture equals generated command-line output. |
| F-1-4 | Fixed: CLI network privacy wording remains limited to the tested demo. |
| F-1-5 | Fixed: unknown routes use the complete designed HTTP 404. |
| F-1-6 | Fixed: pushed navigation, Back, and Forward restore heading focus. |
| F-1-7 | Fixed: route metadata updates on every application route. |
| F-1-8 | Fixed: phone outcome and all three facts are above the fold. |
| F-1-9 | Fixed for its original scope: unresolved links name GitHub and current resolved assets are live. The new platform/readiness defect is F-7-1. |
| F-1-10 | Fixed: the unsupported one-binary assertion remains absent. |
| F-1-11 | Fixed: Linux source collection is declared and tested. |
| F-1-12 | Fixed: unsupported cross-platform command wording remains absent. |
| F-1-13 | Fixed: stopped-watcher behavior and the retained snapshot are tested. |
| F-1-14 | Fixed: permission-limited sources remain named in usable output. |
| F-1-15 | Fixed: missing sources remain explicit without aborting the report. |
| F-1-16 | Fixed: the printed hotkey command creates retained evidence. |
| F-1-17 | Fixed: both installers accept valid and reject changed checksums. |
| F-1-18 | Fixed: unsupported release-page availability prose remains absent. |
| F-1-19 | Fixed: documented list and report JSON output are parsed. |
| F-1-20 | Fixed: every named Linux collection source is asserted. |
| F-1-21 | Fixed: the untested 96 KiB sentence remains absent. |
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
| F-1-35 | Fixed for destination honesty at current desktop state; F-7-1 covers false phone selection/readiness. |
| F-1-36 | Fixed: controlled Linux tests cover the documented data categories. |
| F-1-37 | Fixed: the unsupported exact deletion-path promise remains absent. |
| F-1-38 | Fixed: the unsupported uninstall-retention promise remains absent. |
| F-1-39 | Fixed: retained hardware detail demonstrates the redaction boundary. |
| F-1-40 | Fixed: MIT license and warranty wording are asserted. |
| F-1-41 | Fixed: the workflow heading names Freeze Capsule and the evidence job. |
| F-1-42 | Fixed: the pause step uses direct snapshot language. |
| F-1-43 | Fixed: the report step says “Create a redacted report.” |
| F-1-44 | Fixed: the watcher task heading makes sense alone. |
| F-1-45 | Fixed: the 90-second pause is described directly. |
| F-1-46 | Fixed: source descriptions remain below 22 words. |
| F-1-47 | Fixed: “background watcher” is defined before later “watcher” uses. |
| F-1-48 | Fixed: “freeze” and defined “hard freeze” remain consistent. |
| F-1-49 | Fixed: least-privilege jargon remains absent. |
| F-1-50 | Fixed: both sample actions name the report result. |

### Review 2

| ID | Current confirmation |
| --- | --- |
| F-2-1 | Fixed: clean `npm test` passes all 38 browser tests. |
| F-2-2 | Fixed: standalone 404 has its skip link, navigation, icons, social metadata, and footer. |
| F-2-3 | Fixed: Linux source collection is listed and exercised. |
| F-2-4 | Fixed: unsupported macOS/Windows command promise remains absent. |
| F-2-5 | Fixed: watcher suspension behavior is declared and exercised. |
| F-2-6 | Fixed: limited-source behavior is declared and exercised. |
| F-2-7 | Fixed: hotkey capture is declared and exercised. |
| F-2-8 | Fixed: both installer success and rejection paths execute. |
| F-2-9 | Fixed: unsupported release-page availability prose remains absent. |
| F-2-10 | Fixed: structured list/report output is parsed. |
| F-2-11 | Fixed: all named collection sources are asserted. |
| F-2-12 | Fixed: encryption details are exercised. |
| F-2-13 | Fixed: key permissions are exercised. |
| F-2-14 | Fixed: snapshot-slot wording and behavior remain direct. |
| F-2-15 | Fixed: workflow wording is narrowed and structurally tested. |
| F-2-16 | Fixed: normal local-state behavior is exercised. |
| F-2-17 | Fixed: whole-site no-tracking behavior is exercised. |
| F-2-18 | Fixed: explicit GitHub request timing is exercised. |
| F-2-19 | Fixed: unsupported package-removal prose remains absent. |
| F-2-20 | Fixed: a retained hardware detail demonstrates redaction limits. |
| F-2-21 | Fixed: public copy says “command-line,” not unexplained CLI/fixture language. |

### Review 3

| ID | Current confirmation |
| --- | --- |
| F-3-1 | Fixed: Privacy, Home, Back, Forward, Install, and 404 exits clear demo state while preserving real markers. |

### Review 4

| ID | Current confirmation |
| --- | --- |
| F-4-1 | Fixed: four populated evidence rows appear in the first phone demo screen. |
| F-4-2 | Fixed: real POSIX and PowerShell installer paths accept and reject fixture checksums. |
| F-4-3 | Fixed: public workflow wording is limited to the parsed declaration. |
| F-4-4 | Fixed: both documented build-output paths are asserted. |
| F-4-5 | Fixed: clipboard rejection supplies recovery text without a page error. |
| F-4-6 | Fixed: lookup failure names failure without inventing a cause. |
| F-4-7 | Fixed: hero label is “Linux freeze evidence tool.” |
| F-4-8 | Fixed: hero caption directly names evidence sources. |
| F-4-9 | Fixed: “Detail A” remains absent. |
| F-4-10 | Fixed: the process label is “Three steps.” |
| F-4-11 | Fixed: “Installation plate” remains absent. |
| F-4-12 | Fixed: “Boundary notes” remains absent. |
| F-4-13 | Fixed: README defines “background watcher” on first use. |
| F-4-14 | Fixed: Homebrew heading names installation and its condition. |
| F-4-15 | Fixed: Scoop heading names installation and its bucket condition. |
| F-4-16 | Fixed: Linux-only collection is directly declared and tested. |
| F-4-17 | Fixed: report procedure heading names list/export behavior. |
| F-4-18 | Fixed: 404 label is “Page not found / 404.” |
| F-4-19 | Fixed: application and standalone 404 headings say “Page not found.” |
| F-4-20 | Fixed: 404 action says “Return to the home page.” |
| F-4-21 | Fixed: Privacy label is “Privacy policy.” |
| F-4-22 | Fixed: Terms label is “Terms.” |
| F-4-23 | Fixed: Terms h1 names Freeze Capsule and the route. |

### Review 5

| ID | Current confirmation |
| --- | --- |
| F-5-1 | Fixed: a separate Linux-only claim and non-Linux regression are present and pass. |
| F-5-2 | Fixed: landing first use says “background watcher.” |

### Review 6

| ID | Current confirmation |
| --- | --- |
| F-6-1 | Fixed: direct, header, demo-exit, Back, and Forward hash navigation reaches and focuses Install. |
| F-6-2 | Fixed: every visible phone control on all six routes is at least 44×44 px. |
| F-6-3 | Fixed: tested price, local-storage, and no-network facts are above the phone fold; F-7-2 concerns plain wording only. |

## Missed leverage

No AI, synchronization, or additional import step is implied by the brief.
Sending freeze evidence to a model would weaken the local-first boundary unless
the user explicitly chose it. Markdown and JSON already provide the expected
export paths. No decorative AI feature, provider key, Azure endpoint, or model
request exists.

## What would make this perfect

Make package selection honest on Android and iOS, validate that a compatible
asset exists before saying it is ready, and add the missing claim and
cross-platform browser fixtures. Replace the first-screen storage jargon and
rename the two ambiguous README headings. Then rerun every declared claim,
the full clean suite, the live real-phone package flow, and this entire
historical ledger. Nothing else should remain.
