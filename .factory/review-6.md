# Adversarial first-read review 6 — Freeze Capsule

**Reviewed:** 29 August 2026 UTC

**Live URL:** <https://freeze-capsule.sociobot.in>

**Candidate:** `6bb01e406f6957da62ba42d776bcfff6e90847de`

**Verdict:** **FAIL**

The landing message and one-click demo are clear, realistic, and isolated. All
27 declared claim commands and the full clean-clone test suite pass. The site
still fails acceptance because its Install route is broken, several mobile
controls miss the required 44×44 px target, and the first-screen fact set omits
the mandatory offline fact. A PASS requires zero findings.

## First screen, before scrolling

Fresh Chromium contexts were used at 390×844 and 1440×900 with `scrollY = 0`.

| Question | First-read answer in my own words | Exact first-screen evidence |
| --- | --- | --- |
| What does it do? | It saves Linux freeze evidence before rebooting loses it. | “Save freeze clues before you reboot” |
| For whom? | Desktop Linux users diagnosing a freeze. | “For desktop Linux users who need graphics, kernel, process, and session context after a freeze.” |
| What should I click first? | Open the sample report. | “Try it with sample data” and “See a redacted report in one click.” |

This test passes at both widths. On the phone, the action result ends at y=514
and all three displayed facts end at y=583. On desktop, they end at y=846 in a
900 px viewport. The browser had no horizontal overflow.

## Findings

### F-6-1 — The Install route changes the URL but does not show Install

- **Severity:** **BLOCKING**
- **Quote/location:** Header link “Install,” `/#install`, and
  `site/src/main.ts:78`.
- **Observed:** From a fresh desktop home page, selecting **Install** changes
  the address to `/#install`, leaves `scrollY` at 0, focuses the home `h1`, and
  leaves the install section at y=2,288 outside the viewport. Opening
  `https://freeze-capsule.sociobot.in/#install` directly also leaves the
  install section outside the viewport (y=2,244 after load).
- **Code confirmation:** The shared `[data-link]` handler prevents native link
  behavior, saves the hash, then calls `render(url.pathname, false, true)`.
  `render` scrolls to the top and never resolves `location.hash`. Only the
  special demo-exit handler calls `scrollIntoView()`.
- **Why this fails:** The visible main-navigation destination and its deep link
  do not reach the promised section. The requested site-structure contract
  explicitly makes broken routing blocking.
- **Concrete fix:** After rendering, resolve a valid hash target, scroll it
  into view, and move focus to a suitable target without replacing the URL.
  Apply the same behavior on initial load, link activation, Back, and Forward.
  Add live-equivalent Playwright coverage for a direct `/#install` load and
  header **Install** activation; assert the install heading is in the viewport
  and focused or programmatically announced.

### F-6-2 — Multiple phone controls are smaller than 44×44 px

- **Severity:** Major
- **Quote/location:** Live 390 px Home, Demo, Privacy, Terms, and 404 routes;
  `site/src/style.css:20`, `:38`, and `:43`; standalone `404.html` inline CSS.
- **Observed:** Bounding-box checks found the header **Demo** link at
  31.8×44 px; app-footer **Privacy**, **Terms**, and **Built by Param Factory**
  links at 55.7×15, 39.8×15, and 175.1×15 px; and demo **Read the full report**
  at 330×36 px. The standalone 404 header/footer links are 25.5 px high.
- **Why this fails:** The attached accessibility baseline requires every touch
  target to be at least 44×44 px. Axe reports zero violations because it does
  not enforce this product requirement.
- **Concrete fix:** Give header and footer links at least 44 px of clickable
  height and width, restore the mobile report summary to 44 px, and apply the
  same sizing to the standalone 404 shell. Replace the demo-control-only test
  with a 390 px regression that measures every visible `a`, `button`, and
  `summary` on every route.

### F-6-3 — The mandatory first-screen fact set has no offline fact

- **Severity:** Minor
- **Quote/location:** Home first screen: “Free and open source,” “Demo data
  stays separate,” and “Keeps at most eight capsules.”
- **Why this fails:** The supplied plain-words contract requires short
  privacy, offline, and price facts. The screen gives price, demo isolation,
  and retention; it says nothing about offline or no-network behavior.
- **Concrete fix:** Use tested facts such as “Free under the MIT License,”
  “Capsules and the key stay in your state directory,” and “The command-line
  demo makes no network connection.” Keep retention elsewhere. Retain the
  existing `free-license`, `normal-state-directory`, and `cli-local-only`
  regressions, and add a first-screen assertion for all three facts.

## Copy audit

Method: visible whitespace-separated words. Headings, labels, controls, and
dynamic status text are included because visitors encounter them as copy.
Commands and diagnostic output are listed where they label a result but are
not treated as prose sentences. No sentence exceeds 22 words. No banned
marketing adjective, mood heading, metaphor heading, inconsistent core term,
or non-result-naming task control was found. F-6-3 concerns a required fact
that is absent, not an overlong or unclear sentence.

### Landing page

| Copy | Words | Audit |
| --- | ---: | --- |
| Skip to main content | 4 | Skip link |
| Freeze Capsule | 2 | Wordmark |
| Demo / Install / Privacy | 1 each | Navigation; Install behavior fails F-6-1 |
| Linux freeze evidence tool | 4 | Useful product label |
| Save freeze clues before you reboot | 6 | Plain headline |
| For desktop Linux users who need graphics, kernel, process, and session context after a freeze. | 15 | Audience and outcome |
| Try it with sample data | 5 | Result-naming demo action |
| See a redacted report in one click. | 7 | `sample-report` |
| Free and open source | 4 | `free-license`; fact set fails F-6-3 |
| Demo data stays separate | 4 | `demo-private`; fact set fails F-6-3 |
| Keeps at most eight capsules | 5 | `bounded-retention`; fact set fails F-6-3 |
| Evidence sources: journal, graphics, processes, and display session. | 8 | Useful art caption |
| Included command-line sample | 3 | Sample label |
| See the sample report before installing | 6 | Section heading |
| View the sample report | 4 | Result-naming action |
| Demo — bundled sample data, nothing is saved to your capsule directory. | 11 | Demo transcript |
| Encrypted sample: temporary `.fcap` | 4 | Output label |
| Redacted report: temporary `freeze-report.md` | 4 | Output label |
| journal / graphics / processes / display-session | 4 | Output summary |
| This browser report comes from the included command-line demo. | 9 | `sample-fixture` |
| Three steps | 2 | Process label |
| How Freeze Capsule keeps pre-freeze evidence | 6 | Section heading |
| Keep one snapshot current | 4 | Step heading |
| The background watcher records a ten-minute window every 30 seconds. | 10 | `rolling-snapshot`; defines watcher |
| Keep the snapshot when the watcher pauses | 7 | Step heading |
| A 90-second pause keeps the last completed snapshot. | 9 | `watchdog-gap` |
| Create a redacted report | 4 | Step heading |
| The report removes home paths, email addresses, IP addresses, and common secrets. | 12 | `redaction-coverage` |
| Install the Linux watcher | 4 | Section heading |
| Install Freeze Capsule, then choose when to start the watcher. | 10 | Direct instruction |
| Copy command / Copied | 2 / 1 | Result action and success state |
| Install command copied. | 3 | Success status |
| Could not copy. | 3 | Error state |
| Select the command and copy it manually. | 8 | Recovery step |
| Find a package on GitHub, or check the published release. | 10 | Download instruction |
| Open Linux releases / Check published packages | 3 / 3 | Result-naming actions |
| Checking the GitHub release… | 4 | Loading state |
| v0.1.1 packages are ready. | 4 | Successful lookup state |
| Linux was detected. | 3 | Detected-platform state |
| Package check failed. | 3 | Error state |
| Open the GitHub release page to see current files. | 10 | Recovery step |
| Find Linux `.deb` on GitHub / Find Linux `.rpm` on GitHub | 5 / 5 | Honest destinations |
| Find macOS `.pkg` on GitHub / Find Windows `.zip` on GitHub | 5 / 5 | Honest destinations |
| If macOS shows an unidentified-developer warning, right-click the package and choose Open. | 12 | Platform instruction |
| Review any Windows security warning before running the file. | 9 | Platform instruction |
| Start and check the watcher | 5 | Section heading |
| On Linux, use these commands to set up, check, or trigger the watcher. | 13 | Direct instruction |
| Know the capture limits | 4 | Section heading |
| A hard freeze can stop capture. | 6 | `hard-freeze-limit` |
| The last completed snapshot remains available. | 7 | `hard-freeze-limit` |
| Log access follows your account. | 5 | `limited-source-report` |
| Unavailable sources appear in the report. | 6 | `limited-source-report` |
| Review before sharing. | 3 | Direct instruction |
| Redaction does not remove every machine detail. | 7 | `redaction-limits` |
| Freeze Capsule · Save Linux freeze clues before reboot. | 8 | Footer one-line description |
| Privacy / Terms / Built by Param Factory | 1 / 1 / 4 | Footer links |
| v0.1.1 · build 2026.08 | 3 | Build label |

### README

Fenced commands are executable examples, not sentences. They were checked
against the documented task immediately above each block.

| Copy | Words | Audit |
| --- | ---: | --- |
| Freeze Capsule | 2 | Title |
| Save Linux freeze clues before a reboot erases them. | 9 | Plain summary |
| Freeze Capsule is for desktop Linux users debugging graphics, kernel, application, or display-session freezes. | 14 | Audience |
| Its background watcher keeps one encrypted snapshot current. | 8 | Defines watcher |
| If the watcher pauses for 90 seconds, it keeps the last complete snapshot. | 13 | `watchdog-gap` |
| Live site | 2 | Link label |
| Try the isolated demo | 4 | Heading |
| The command loads the bundled sample. | 6 | `sample-fixture` |
| It writes an encrypted capsule and redacted Markdown report under a new temporary directory. | 14 | `encrypted-redacted` |
| It never reads or writes your normal capsule directory. | 9 | `cli-local-only` |
| The same isolated sample is available at the demo URL. | 8 | `sample-report`, `demo-private` |
| This browser report comes from the included command-line demo. | 9 | `sample-fixture` |
| Install | 1 | Heading |
| Linux and macOS | 3 | Platform label |
| Windows PowerShell | 2 | Platform label |
| Both installers download the published archive and verify its SHA-256 checksum. | 11 | `installer-checksum` |
| Install with Homebrew after the formula is published. | 8 | Conditional instruction |
| Install with Scoop after adding this repository as a bucket. | 10 | Conditional instruction |
| The watcher collects real system data only on Linux. | 9 | `linux-only-capture` |
| Use the included sample to inspect a report before installing. | 10 | Instruction |
| Use | 1 | Heading |
| Start the watcher as your Linux user. | 7 | Instruction |
| Capture from a desktop hotkey. | 5 | `hotkey-capture` |
| Bind the printed command in your desktop keyboard settings. | 9 | Instruction |
| List and export reports after a freeze or reboot. | 9 | Procedure heading |
| JSON output is available for scripts. | 6 | `json-output` |
| What it records | 3 | Heading |
| Each Linux snapshot requests journal, kernel, graphics, connector, and process details. | 11 | `linux-live-capture` |
| It also records selected display-session variables. | 6 | `linux-live-capture` |
| A report marks unavailable sources instead of abandoning capture. | 9 | `limited-source-report` |
| Capsules use XChaCha20-Poly1305 with a local 32-byte key. | 8 | `encryption-format` |
| On Unix, the key is created with owner-only 0600 permissions. | 10 | `key-permissions` |
| Rendering replaces common home paths, email addresses, IPv4 addresses, and secret assignments. | 12 | `redaction-coverage` |
| Review every report before sharing it. | 6 | Instruction |
| At most eight saved capsules remain. | 6 | `bounded-retention` |
| The current rolling snapshot does not use one of those eight slots. | 12 | `current-snapshot` |
| A hard freeze can stop every user process, so Freeze Capsule cannot guarantee a final write. | 16 | `hard-freeze-limit` |
| It preserves the last completed snapshot instead. | 7 | `hard-freeze-limit` |
| Develop | 1 | Heading |
| You need Rust, Node.js, and npm to build from source. | 10 | Prerequisite |
| The site is in `dist/site`. | 5 | `build-output` |
| The release binary is in `target/release/freeze-capsule`. | 6 | `build-output` |
| If Playwright needs a browser, run `npx playwright install chromium`. | 10 | Recovery instruction |
| Release | 1 | Heading |
| Tag a tested commit. | 4 | Instruction |
| The checked release workflow declares Linux, macOS, and Windows packaging jobs. | 11 | `release-workflow-declaration` |
| It does not configure package signing. | 6 | `release-workflow-declaration` |
| Privacy and license | 3 | Heading |
| The included command-line demo makes no network connection and uses a temporary directory. | 13 | `cli-local-only` |
| See privacy and terms. | 4 | Link instruction |
| Freeze Capsule is released under the MIT License. | 8 | `free-license` |

Terminology remains consistent: **capsule** is the encrypted evidence file,
**report** is readable output, **watcher** is the background process,
**snapshot** is current evidence, **sample** is the included scenario, and
**demo** is the isolated try-out.

## Demo and sandbox verification

- One landing click opened `/demo?demo=1` with AMD `ring gfx timeout`, Cinnamon,
  Chrome, journal, graphics, process, and display-session evidence already
  visible. The four phone evidence rows end at y=551.
- The persistent banner says “Demo — sample data, nothing is saved” and offers
  **Reset demo** and **Install Freeze Capsule**.
- A seeded `demo:changed` key was removed. Reset restored the shipped report and
  only `demo:loaded`. Seeded `real:marker` values in local and session storage
  survived reset and exit. Every demo request was same-origin.
- Home, Privacy, Back, Install, and the standalone 404 clear the `demo:`
  namespace. The clean `@claim:demo-private` regression covers these exits.
- A direct clean-clone CLI run with fresh `TMPDIR`, working directory, and
  `XDG_STATE_HOME` wrote one encrypted capsule, one key, and one Markdown report
  only below `freeze-capsule-demo-9365`; normal state remained empty.
- No offline-after-first-visit web claim is made and no service worker exists.

## Claims verification

The repository was cloned with `git clone --no-local` to
`/tmp/freeze-review6.hMKU7B/repo`. After `npm ci`, every exact `test` command
from `.factory/claims.json` was run separately. All 27 passed.

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

No listed claim failed, and no claim-like sentence on the live landing, demo,
Privacy, Terms, or current README lacks a matching claims entry. The complete
suite also passed: 11 Rust tests, the real watchdog-gap integration, and 36
Playwright tests. `npm run build` produced `dist/site`; JavaScript is 14.83 kB
(5.55 kB gzip).

## Structure, links, visual identity, and accessibility

- `/`, `/demo?demo=1`, `/privacy`, and `/terms` return 200. The designed
  `/missing-sheet` returns 404; `/404.html` returns 200 as its source document.
- Every checked route has `lang=en`, one `main`, one `h1`, a route-specific
  title/description/canonical/Open Graph URL, favicon, Apple touch icon, skip
  link, legal footer, and Param Factory attribution. The social image is
  1200×630. Security headers include CSP with `frame-ancestors`,
  `X-Content-Type-Options`, and `Referrer-Policy`.
- Demo, browser Back, and Forward focus and announce the new route `h1` at the
  top. The separate hash destination failure is F-6-1.
- Every discovered static, legal, GitHub release, resolved `.deb`, `.rpm`,
  `.pkg`, `.zip`, and Sociobot link returned 200 after redirects. The only
  intentionally non-200 URL is the designed unknown-route 404.
- Live Axe reported zero violations on Home, Demo, Privacy, Terms, the unknown
  404, and `/404.html`. `/opt/fleet/lib/verify-url.sh` passed Home in 766 ms
  with no application or console errors. The target-size failure that Axe does
  not check is F-6-2.
- Reduced motion disables the signature scan. The blueprint grid, crop marks,
  cutaway capsule, square safety labels, mono/sans typography, and restrained
  scan are recognisable and product-specific rather than a generic SaaS
  template. Original asset provenance is recorded in `.factory/design.md`.

## Earlier-finding audit

Every prior review, polish record, and handoff was read. Each prior ID was
checked against current source, live behavior, or its clean observable claim
test. All earlier findings remain fixed; F-6-1 through F-6-3 are new findings.

### Review 1

| ID | Current confirmation |
| --- | --- |
| F-1-1 | One click opens populated sample evidence in the phone viewport. |
| F-1-2 | Reset and all tested exits clear only `demo:` state. |
| F-1-3 | Browser fixture exactly matches generated command-line output. |
| F-1-4 | CLI privacy wording remains limited to the tested demo. |
| F-1-5 | Unknown routes use the complete designed HTTP 404. |
| F-1-6 | Demo, Back, and Forward restore heading focus. |
| F-1-7 | Route metadata updates for every route. |
| F-1-8 | Phone home outcome and facts remain above the fold. |
| F-1-9 | Package links name GitHub and resolve after lookup. |
| F-1-10 | The unsupported one-binary assertion remains absent. |
| F-1-11 | Linux source collection is declared and tested. |
| F-1-12 | Unsupported cross-platform command wording remains absent. |
| F-1-13 | The suspended-watcher limitation is tested. |
| F-1-14 | Permission-limited sources remain named in reports. |
| F-1-15 | Missing sources remain usable and explicit. |
| F-1-16 | The printed hotkey command creates retained evidence. |
| F-1-17 | Both installers accept valid and reject changed checksums. |
| F-1-18 | Unsupported release-page availability prose remains absent. |
| F-1-19 | Documented JSON commands return parsed JSON. |
| F-1-20 | Every named Linux collection source is asserted. |
| F-1-21 | The untested 96 KiB statement remains absent. |
| F-1-22 | Encryption layout, nonce, key size, and round trip are tested. |
| F-1-23 | Unix key mode is asserted as 0600. |
| F-1-24 | Current evidence does not consume a saved slot. |
| F-1-25 | Unsupported tool-version floors remain absent. |
| F-1-26 | `dist/site` is produced and asserted. |
| F-1-27 | The release binary path is produced and asserted. |
| F-1-28 | Playwright browser recovery guidance remains accurate. |
| F-1-29 | The unsupported Actions-only assertion remains absent. |
| F-1-30 | Workflow copy remains narrowed to its parsed declaration. |
| F-1-31 | The workflow has no configured signing commands. |
| F-1-32 | Normal isolated state contains one key and capsule. |
| F-1-33 | Static routes have no tracking, cookies, or foreign requests. |
| F-1-34 | GitHub lookup occurs only after explicit activation. |
| F-1-35 | Package destinations remain honest before and after lookup. |
| F-1-36 | Controlled Linux tests cover the stated data categories. |
| F-1-37 | The unsupported exact deletion-path promise remains absent. |
| F-1-38 | The unsupported uninstall-retention promise remains absent. |
| F-1-39 | A retained hardware identifier proves the redaction boundary. |
| F-1-40 | MIT license and warranty wording are asserted. |
| F-1-41 | The workflow heading names the product and task. |
| F-1-42 | The pause step uses direct snapshot language. |
| F-1-43 | The report step says “Create a redacted report.” |
| F-1-44 | The watcher task heading makes sense alone. |
| F-1-45 | The 90-second pause is described directly. |
| F-1-46 | Source descriptions remain below 22 words. |
| F-1-47 | “Background watcher” is defined and used consistently. |
| F-1-48 | “Freeze” and defined “hard freeze” remain consistent. |
| F-1-49 | Least-privilege jargon remains absent. |
| F-1-50 | Both sample actions name the report result. |

### Review 2

| ID | Current confirmation |
| --- | --- |
| F-2-1 | Clean `npm test` passes all 36 browser tests. |
| F-2-2 | Standalone 404 retains its shell, icons, skip link, and metadata. |
| F-2-3 | Linux source collection remains declared and tested. |
| F-2-4 | Unsupported cross-platform capability wording remains absent. |
| F-2-5 | Watcher suspension remains tested. |
| F-2-6 | Limited-source behavior remains tested. |
| F-2-7 | Hotkey capture remains tested. |
| F-2-8 | Both installer outcome paths execute. |
| F-2-9 | Unsupported package-availability wording remains absent. |
| F-2-10 | Structured output is parsed end to end. |
| F-2-11 | All named collection sources remain asserted. |
| F-2-12 | Encryption details remain exercised. |
| F-2-13 | Key permissions remain exercised. |
| F-2-14 | Snapshot slot wording and behavior remain direct. |
| F-2-15 | Workflow wording remains narrowed and structurally tested. |
| F-2-16 | Normal local-state behavior remains exercised. |
| F-2-17 | Whole-site no-tracking behavior remains exercised. |
| F-2-18 | Explicit GitHub request timing remains exercised. |
| F-2-19 | Unsupported package-removal prose remains absent. |
| F-2-20 | Retained hardware detail still demonstrates redaction limits. |
| F-2-21 | Public copy uses “command-line,” not CLI/fixture jargon. |

### Reviews 3–5

| ID | Current confirmation |
| --- | --- |
| F-3-1 | Privacy, Home, Back, Install, and 404 exits clear demo state. |
| F-4-1 | Four populated evidence rows remain in the phone demo viewport. |
| F-4-2 | Both real installer scripts execute valid and tampered checksums. |
| F-4-3 | Workflow claim remains limited to the parsed declaration. |
| F-4-4 | Both documented build-output paths are asserted. |
| F-4-5 | Clipboard rejection supplies recovery text without a page error. |
| F-4-6 | Lookup failure identifies failure without inventing a cause. |
| F-4-7 | Hero label remains “Linux freeze evidence tool.” |
| F-4-8 | Hero caption directly names evidence sources. |
| F-4-9 | “Detail A” remains absent. |
| F-4-10 | The process label remains “Three steps.” |
| F-4-11 | “Installation plate” remains absent. |
| F-4-12 | “Boundary notes” remains absent. |
| F-4-13 | README defines “background watcher” on first use. |
| F-4-14 | Homebrew heading names the install result and condition. |
| F-4-15 | Scoop heading names installation and explains the bucket. |
| F-4-16 | Linux-only collection is separately declared and tested. |
| F-4-17 | Report procedure heading names list/export behavior. |
| F-4-18 | 404 label remains “Page not found / 404.” |
| F-4-19 | Both 404 headings remain “Page not found.” |
| F-4-20 | 404 action remains “Return to the home page.” |
| F-4-21 | Privacy label remains “Privacy policy.” |
| F-4-22 | Terms label remains “Terms.” |
| F-4-23 | Terms h1 remains route-specific and plain. |
| F-5-1 | Non-Linux capture returns only an unavailable platform result. |
| F-5-2 | Landing defines “background watcher” on first use. |

## Missed leverage

No AI, sync, or new import step is implied by the brief. Sending freeze evidence
to a model would weaken the local-first boundary unless a user explicitly chose
it. Markdown and JSON already provide the expected export paths. No decorative
AI feature, embedded provider key, or AI request exists.

## What would make this perfect

Make `/#install` work on direct load, click, Back, and Forward; enlarge every
phone target to at least 44×44 px; and replace the first-screen retention fact
with tested price, privacy, and offline facts. Then rerun the live hash-route
checks, all-target measurement, full clean suite, every exact claim command,
and the complete earlier-finding ledger. Nothing else should remain.
