# Adversarial first-read review 1 — Freeze Capsule

**Reviewed:** 28 August 2026 UTC  
**Live URL:** <https://freeze-capsule.sociobot.in>  
**Candidate:** `1281a77c03c64e824c422d672ae1cc52788d7f8f`  
**Verdict:** **FAIL**

The landing page is visually distinct and the narrow cold-read test passes, but the advertised one-click demo takes two clicks and opens without a report. Demo state also survives **Start for real**. Unknown URLs return HTTP 200, browser Back loses route focus, route metadata is stale, and public claims remain unlisted or insufficiently tested. A PASS requires zero findings, so passing the build and all ten declared claim commands does not change this verdict.

## First screen, before scrolling

Fresh contexts were used at 390×844 and 1440×900.

| Question | Answer from the first screen | Evidence |
| --- | --- | --- |
| What does it do? | It saves clues about a Linux freeze before reboot. | “Save freeze clues before you reboot” |
| For whom? | Desktop Linux users investigating a lockup. | “For desktop Linux users who need graphics, kernel, process, and session context after a lockup.” |
| What should I click first? | Try the sample. | “Try it with sample data” |

This narrow check passes on both viewports. On mobile, however, the hero image is placed before the explanation. The adjacent result sentence is clipped below the 844 px fold and all three facts are below it; see F-1-8.

## Findings — blocking

### F-1-1 — “Try it with sample data” is not a one-click demo

- **Quote/location:** Landing CTA “Try it with sample data” and adjacent promise “See a redacted report in one click.”
- **Observed:** One click opens `/demo`, where the report is hidden and a second **Run sample capture** click is required. The first demo screen shows setup copy and an idle terminal, not the product already working with sample data.
- **Why it fails:** The demo contract requires realistic output after the landing action's single click. The literal one-click claim is false and is not listed in `claims.json`.
- **Fix:** Make the CTA open a seeded `/demo` state with the report already visible. Keep **Run sample capture** only as a replay control. Add a claim entry and a test that starts at `/`, performs one click, and asserts the AMD/Cinnamon/Chrome report is already visible.

### F-1-2 — “Start for real” does not discard demo state

- **Quote/location:** `/demo` banner link “Start for real”; `.factory/demo.md` says the browser stores `sessionStorage["demo:ran"]`.
- **Observed:** After running the sample, **Start for real** returns home but leaves `demo:ran=1`. Opening `/demo` again in the same tab immediately restores the old result. **Reset demo** does clear it.
- **Why it fails:** The sandbox contract says leaving demo mode discards demo data. The action also does not start installation or any real workflow.
- **Fix:** Clear every `demo:` key before leaving and send the visitor to the real install step. Rename the action **Install Freeze Capsule** and add a test for cleared demo storage and the destination.

### F-1-3 — “REAL BUNDLED SAMPLE” is asserted against hard-coded browser copy

- **Quote/location:** Landing/demo plate “REAL BUNDLED SAMPLE”; claim `sample-report`.
- **Observed:** `site/src/main.ts` hard-codes the browser transcript and report. The `@claim:sample-report` test only checks that same hard-coded DOM. It never reads `examples/sample-freeze.json` or compares browser output with the real CLI demo. The separate CLI test does not connect the two artifacts.
- **Why it fails:** The test can pass after the sample fixture or CLI output changes. It does not prove the browser display is the real bundled sample or a recording of the real binary, as required for a CLI product.
- **Fix:** Generate a checked browser fixture/transcript from `freeze-capsule --json demo`, ship it as an asset, and have the browser and claim test consume and compare that artifact.

### F-1-4 — The global CLI privacy claim is still only tested in demo mode

- **Quote/location:** README: “The CLI has no telemetry and no network client.” Privacy: “It sends no capsule, report, identifier, or usage event anywhere.” Claim `cli-local-only` repeats the global statement.
- **Observed:** `tests/cli-local-only.sh` runs only `freeze-capsule --json demo` with `connect()` blocked. It does not exercise `capture`, `watch`, `list`, `render`, `prune`, `doctor`, `install-service`, or `hotkey-command`, and it does not establish the absence of telemetry across the CLI.
- **Why it fails:** A passing demo-only test cannot support a whole-product privacy promise. This is the same claim-coverage issue previously reported as **P1 — Claims contract is incomplete despite passing listed commands**; it is only half-fixed.
- **Fix:** Either narrow all copy and the claim to “The demo makes no network requests,” or test every applicable command under blocked networking and add a dependency/source guard for network and telemetry clients.

## Findings — major

### F-1-5 — Unknown routes are soft 404s and the standalone 404 is incomplete

- **Quote/location:** `https://freeze-capsule.sociobot.in/missing-sheet` and `/404.html`.
- **Observed:** `/missing-sheet` renders the designed missing-page UI but returns HTTP 200. `/404.html` also returns 200, lacks canonical/Open Graph metadata, and its footer omits Privacy, Terms, the Param Factory link, and the build identifier used by the app shell.
- **Why it fails:** Crawlers and clients cannot distinguish a missing route, and the fallback does not meet the site's standard skeleton.
- **Fix:** Configure the host to serve the designed 404 document with status 404, and give that document the same header/footer and metadata contract as other routes. Add response-status and shell tests.

### F-1-6 — Browser Back loses route-change focus

- **Quote/location:** `window.addEventListener('popstate', () => render())` in `site/src/main.ts`.
- **Observed:** Activating the Demo link focuses the new `h1`, but going Back leaves focus on `<body>`. The popstate path calls `render()` without the focus and scroll behavior used for pushed navigation.
- **Why it fails:** Keyboard and screen-reader users get no useful focus position after back/forward navigation.
- **Fix:** Apply route heading focus and the intended scroll restoration on `popstate`, then test both Back and Forward rather than only link activation.

### F-1-7 — Route metadata keeps the home-page social identity

- **Quote/location:** `/demo`, `/privacy`, `/terms`, and `/missing-sheet`.
- **Observed:** Titles and canonicals change, but all app routes retain the home description, `og:title="Freeze Capsule — save Linux freeze clues"`, and `og:url="https://freeze-capsule.sociobot.in/"`. `/404.html` has no canonical or Open Graph fields.
- **Why it fails:** Shared route previews describe and link to the home page instead of the page being shared.
- **Fix:** Update description, Open Graph, and Twitter fields on every route. Give the 404 deliberate noindex metadata and test route-specific values.

### F-1-8 — The 390 px first screen omits the promised result context and all three facts

- **Quote/location:** Mobile `/` at 390×844.
- **Observed:** The CTA ends at y=812. “See a redacted report in one click” begins below y=839 and is clipped; “Free and open source,” “Capsules stay on your device,” and “Keeps at most eight capsules” are all below the fold. The art consumes the upper 324 px before the headline.
- **Why it fails:** The required first-screen shape includes the action outcome and three plain facts. A phone visitor must scroll to see them.
- **Fix:** Put copy before art on mobile or use a compact crop so the CTA, outcome, and facts fit in the initial 844 px viewport. Add visibility assertions for all five elements, not merely the heading and CTA.

### F-1-9 — Package links do not name the result they currently produce

- **Quote/location:** Landing links “Linux .deb,” “Linux .rpm,” “macOS .pkg,” and “Windows .zip.”
- **Observed:** Before **Check published packages** is used, every link goes to the general GitHub Releases page rather than downloading the named file.
- **Why it fails:** A visitor selecting a named package reasonably expects that package, not another chooser.
- **Fix:** Resolve release URLs on load with a usable fallback, or label the links **Find the Linux .deb on GitHub** until a direct URL is known.

### Unlisted claim findings

Every row below is a separate unlisted, untested claim. Add one `claims.json` entry with one observable tagged test for each claim, merge only genuinely identical claims across locations, or remove/narrow the sentence.

| ID | Exact quote and location | Why it is unverified | Concrete fix |
| --- | --- | --- | --- |
| F-1-10 | Landing: “The package installs one binary.” | No claim checks installed archive contents. | Test each install artifact contains/installs exactly the documented binary. |
| F-1-11 | Landing: “Linux provides live capture.” | Demo-fixture tests do not prove live collection. | Add a Linux capture integration with controlled command fixtures. |
| F-1-12 | Landing/README: “macOS and Windows builds provide the portable sample and report tools/commands.” | No manifest entry covers those platform capabilities. | Smoke-test `demo`, `render`, and inspection behavior in macOS and Windows release jobs. |
| F-1-13 | Landing: “A hard lock can stop all capture.” README/Terms repeat the limitation. | It is required, useful disclosure but absent from the claim inventory. | Add a process-suspension test showing no write while stopped and preservation of the prior snapshot. |
| F-1-14 | Landing: “Log access follows your account.” Terms says logs depend on distribution and permissions. | No test varies log permissions. | Test an unprivileged/missing-permission fixture and assert limited status. |
| F-1-15 | Landing: “Missing kernel lines appear as unavailable in the report.” README: “Missing commands or permissions appear in the report instead of aborting capture.” | Current tests do not force and inspect either recovery path. | Add fixture-injected command failures and assert an available report with explicit unavailable sections. |
| F-1-16 | README: “A desktop hotkey can capture on demand.” | No claim or end-to-end test covers `hotkey-command` and the emitted command. | Execute the emitted command in a temporary capsule directory and assert a capsule. |
| F-1-17 | README: “Both installers download the published archive and verify its SHA-256 checksum.” | No declared test tampers with a checksum or runs both installers. | Add positive and tampered-checksum tests for POSIX and PowerShell installers. |
| F-1-18 | README: “Linux users can also choose the `.deb` or `.rpm` file on the release page.” | Availability is outside the manifest and can drift. | Assert both assets in the published release API fixture/live release check. |
| F-1-19 | README: “JSON output is available for scripts.” | No claim entry defines which commands and schema are supported. | Add tagged tests for documented JSON commands and stable required fields. |
| F-1-20 | README: “Each Linux snapshot requests a ten-minute journal window, kernel messages, PCI graphics drivers, DRM connector states, the process table, and selected display-session variables.” | The sample-fixture test does not test real Linux collection sources. | Add controlled command/file fixtures and assert every requested source. |
| F-1-21 | README: “Every section is capped at 96 KiB.” | No quantitative claim test feeds oversized sections. | Add a >96 KiB fixture and assert the cap and truncation notice. |
| F-1-22 | README: “Capsules use XChaCha20-Poly1305 with a local 32-byte key.” | The current test checks a magic header and absence of one plaintext string, not algorithm or key properties. | Add an algorithm/nonce round-trip test and assert a locally created 32-byte key. |
| F-1-23 | README: “The key is created with user-only permissions.” | No test inspects filesystem mode. | Assert mode `0600` on Unix and document/test the Windows equivalent. |
| F-1-24 | README: “The rolling prebuffer is separate.” | Neither the claim nor the user-visible consequence is defined. | Rewrite as a measurable retention statement and test prebuffer exclusion from the eight retained capsules. |
| F-1-25 | README: “Requirements: stable Rust, Node.js 20 or newer, and npm.” | No clean-environment/version-floor check is declared. | Test the documented minimum Node version and pinned Rust toolchain, or avoid an unverified floor. |
| F-1-26 | README: “The static site lands in `dist/site`.” | Not in the claim inventory. | Add a build-output assertion for `dist/site/index.html`. |
| F-1-27 | README: “The CLI binary lands in `target/release`.” | Not in the claim inventory. | Add a release-build output assertion or make the sentence a direct command result note. |
| F-1-28 | README: “Playwright uses its bundled Chromium.” | The repository depends on an externally installed Playwright browser and the README omits `playwright install chromium`. | Replace with accurate setup text and test a clean setup path. |
| F-1-29 | README: “The release workflow builds platform artifacts only on GitHub Actions.” | No claim test inspects the workflow trigger/environment contract. | Add a workflow-structure test or remove “only.” |
| F-1-30 | README: “The workflow builds archives, `.deb`, `.rpm`, unsigned macOS `.pkg` files, checksums, `latest.json`, Homebrew, Scoop, and winget manifests.” | The local claim suite does not assert this complete artifact set. | Validate the workflow matrix and published asset names in one tagged release claim. |
| F-1-31 | README: “macOS and Windows artifacts are unsigned.” | The limitation is not inventoried or checked. | Add artifact-signature inspection to the release claim. |
| F-1-32 | Privacy: “Freeze Capsule writes encrypted capsules and one key to your local state directory.” | Existing encryption tests do not assert the normal storage location and one-key behavior. | Add a temporary `XDG_STATE_HOME` integration test for paths and key count. |
| F-1-33 | Privacy: “This static site uses no cookies, accounts, analytics, or advertising.” | `demo-private` checks requests and Web Storage only; it does not assert cookies or audit non-demo routes. | Record requests/cookies/storage across every route and interaction. |
| F-1-34 | Privacy: “The download panel may request public release details from GitHub.” | Covered only by an untagged fallback test, not a declared claim. | Add a release-request claim that asserts the sole allowed external origin and explicit user action. |
| F-1-35 | Privacy: “Opening a download follows a link to GitHub.” | No claim checks all package link destinations. | Assert each pre-lookup and post-lookup destination. |
| F-1-36 | Privacy: “A capsule may contain journal lines, command arguments, device details, process names, and display settings.” | The live-capture data categories are not in a claim entry. | Cover this with the controlled Linux capture test proposed for F-1-20. |
| F-1-37 | Privacy: “Delete `~/.local/state/freeze-capsule` to remove capsules and the local key.” | No deletion test verifies that this path is complete. | Seed normal state, delete the documented path, and assert no capsule/key remains. |
| F-1-38 | Privacy: “Uninstalling the package does not delete evidence automatically.” | No uninstall/package test checks retained state. | Install, create evidence, uninstall, and assert the state directory remains. |
| F-1-39 | Terms: “Diagnostic output can still contain machine details that matter to you.” | The warning is not tied to a fixture showing intentionally unredacted categories. | Add a report-content fixture and a precise claim about what redaction does not cover. |
| F-1-40 | Terms: “The software is provided ‘as is,’ without warranty, as described in the MIT License.” | `free-license` checks only that the file contains “MIT License.” | Extend the license claim test to assert the warranty disclaimer, or treat the existing license claim as explicitly covering it. |

## Findings — copy and terminology

### F-1-41 — “How it preserves the useful window” is context-dependent

- **Problem:** “it” and “useful window” do not identify the product or evidence when headings are listed alone.
- **Rewrite:** **How Freeze Capsule keeps pre-freeze evidence**.

### F-1-42 — “Promote it after a gap” uses internal jargon

- **Problem:** “promote,” “it,” and “gap” make sense only after reading surrounding implementation copy.
- **Rewrite:** **Keep the snapshot when the watcher pauses**.

### F-1-43 — “Render a safer report” is jargon plus an unmeasured adjective

- **Problem:** “render” is CLI jargon and “safer” has no stated baseline.
- **Rewrite:** **Create a redacted report**.

### F-1-44 — “After install” does not make sense as a standalone heading

- **Problem:** It does not name the next job.
- **Rewrite:** **Start and check the watcher**.

### F-1-45 — The README describes the core trigger in implementation jargon

- **Quote:** “A long scheduling gap promotes the prior snapshot into bounded retention.”
- **Rewrite:** “If the watcher pauses for 90 seconds, it keeps the last complete snapshot.”

### F-1-46 — One README sentence exceeds 22 words

- **Quote:** “Each Linux snapshot requests a ten-minute journal window, kernel messages, PCI graphics drivers, DRM connector states, the process table, and selected display-session variables.” (23 words)
- **Rewrite:** “Each Linux snapshot requests journal, kernel, graphics, connector, and process details. It also records selected display-session variables.”

### F-1-47 — One background process has three names

- **Locations:** “watcher,” “user service,” and “per-user service.”
- **Why it matters:** A new user may read these as separate components.
- **Rewrite:** Use **watcher** everywhere; for example, “The watcher records a ten-minute window every 30 seconds.”

### F-1-48 — The failure event changes names

- **Locations:** “freeze,” “lockup,” and “hard lock.”
- **Why it matters:** The distinction is not explained.
- **Rewrite:** Use **freeze** for the event and **hard freeze** only where the stronger case is defined.

### F-1-49 — “least-privilege user watcher” is unnecessary jargon

- **Location:** README, “Start the least-privilege user watcher.”
- **Rewrite:** “Start the watcher as your Linux user.”

### F-1-50 — “Open the sample” does not name the result

- **Location:** Landing preview link.
- **Why it matters:** It opens the same idle two-step demo as F-1-1.
- **Rewrite:** **View the sample report**, and make the report visible on arrival.

No banned marketing word from the supplied plain-words list appears in the landing page or README.

## Copy audit — landing page

Method: whitespace-separated visible words; markup is excluded. Multiple sentences in one element are split. UI labels and headings are included because they are part of the requested button/heading audit.

| Copy | Words | Flag |
| --- | ---: | --- |
| Skip to main content | 4 | — |
| Freeze Capsule — save Linux freeze clues | 7 | — |
| Freeze Capsule | 2 | — |
| Demo | 1 | — |
| Install | 1 | — |
| Privacy | 1 | — |
| LINUX FIELD TOOL · DRAWING FC–01 | 6 | — |
| Save freeze clues before you reboot | 6 | F-1-48 |
| For desktop Linux users who need graphics, kernel, process, and session context after a lockup. | 15 | F-1-48 |
| Try it with sample data | 5 | F-1-1 |
| See a redacted report in one click. | 7 | F-1-1 |
| Free and open source | 4 | — |
| Capsules stay on your device | 5 | F-1-4 |
| Keeps at most eight capsules | 5 | — |
| FIG. 1 — journal · graphics · processes · display session | 11 | — |
| DETAIL A | 2 | — |
| REAL BUNDLED SAMPLE | 3 | F-1-3 |
| See the report before installing | 5 | — |
| Open the sample | 3 | F-1-50 |
| `freeze-capsule demo` | 2 | — |
| Demo — bundled sample data, nothing is saved to your capsule directory. | 11 | — |
| Encrypted sample: `/tmp/freeze-capsule-demo/capsule-20260723T143208Z.fcap` | 2 | — |
| Redacted report: `/tmp/freeze-capsule-demo/freeze-report.md` | 3 | — |
| ✓ journal ✓ graphics ✓ processes ✓ display-session | 8 | — |
| The CLI demo runs this capture and render path in a temporary directory. | 13 | — |
| SEQUENCE / 03 | 3 | — |
| How it preserves the useful window | 6 | F-1-41 |
| Keep one snapshot current | 4 | — |
| The user service records a bounded ten-minute window every 30 seconds. | 11 | F-1-47 |
| Promote it after a gap | 5 | F-1-42 |
| A 90-second scheduling gap preserves the last completed snapshot. | 9 | — |
| Render a safer report | 4 | F-1-43 |
| The render command removes home paths, email addresses, IP addresses, and common secrets. | 13 | — |
| INSTALLATION PLATE | 2 | — |
| Install the Linux watcher | 4 | — |
| The package installs one binary. | 5 | F-1-10 |
| You choose when to start the per-user service. | 8 | F-1-47 |
| `curl -fsSL https://freeze-capsule.sociobot.in/install.sh \| sh` | 5 | — |
| Copy command | 2 | — |
| Choose a package or check the published release. | 8 | — |
| Open Linux releases | 3 | — |
| Check published packages | 3 | — |
| Linux .deb | 2 | F-1-9 |
| Linux .rpm | 2 | F-1-9 |
| macOS .pkg | 2 | F-1-9 |
| Windows .zip | 2 | F-1-9 |
| All releases (external site) | 4 | — |
| After install | 2 | F-1-44 |
| `freeze-capsule install-service` | 2 | — |
| `freeze-capsule doctor` | 2 | — |
| `freeze-capsule hotkey-command` | 2 | — |
| Linux provides live capture. | 4 | F-1-11 |
| macOS and Windows builds provide the portable sample and report tools. | 11 | F-1-12 |
| BOUNDARY NOTES | 2 | — |
| Know what it cannot capture | 5 | — |
| A hard lock can stop all capture. | 7 | F-1-13, F-1-48 |
| The last completed rolling snapshot remains available. | 7 | — |
| Log access follows your account. | 5 | F-1-14 |
| Missing kernel lines appear as unavailable in the report. | 9 | F-1-15 |
| It does not send or file reports. | 7 | F-1-4 |
| You inspect the redacted file before sharing it. | 8 | — |
| Freeze Capsule · Save Linux freeze clues before reboot. | 9 | — |
| Privacy | 1 | — |
| Terms | 1 | — |
| Built by Param Factory (external site) | 6 | — |
| v0.1.1 · build 2026.08 | 4 | — |

## Copy audit — README

Code blocks are commands rather than sentences and are excluded. Headings and prose labels remain included.

| Copy | Words | Flag |
| --- | ---: | --- |
| Freeze Capsule | 2 | — |
| Save Linux freeze clues before a reboot erases them. | 9 | — |
| Freeze Capsule is for desktop Linux users debugging graphics, kernel, application, or display-session lockups. | 14 | F-1-48 |
| Its per-user watcher keeps one encrypted snapshot current. | 8 | — |
| A long scheduling gap promotes the prior snapshot into bounded retention. | 11 | F-1-45 |
| A desktop hotkey can capture on demand. | 7 | F-1-16 |
| Live site: https://freeze-capsule.sociobot.in | 3 | — |
| Try the isolated demo | 4 | — |
| The command loads the bundled sample. | 6 | — |
| It writes an encrypted capsule and redacted Markdown report under a new temporary directory. | 14 | — |
| It never reads or writes your normal capsule directory. | 9 | — |
| The same sample is available at https://freeze-capsule.sociobot.in/demo. | 7 | — |
| Install | 1 | — |
| Linux and macOS: | 3 | — |
| Windows PowerShell: | 2 | — |
| Both installers download the published archive and verify its SHA-256 checksum. | 11 | F-1-17 |
| Linux users can also choose the .deb or .rpm file on the release page. | 14 | F-1-18 |
| Homebrew after the tap is published: | 6 | — |
| Scoop after adding the repository bucket: | 6 | — |
| Live capture is Linux-specific. | 4 | F-1-11 |
| macOS and Windows builds provide the portable demo, renderer, and report inspection commands. | 13 | F-1-12 |
| Use | 1 | — |
| Start the least-privilege user watcher: | 5 | F-1-49 |
| Capture from a desktop hotkey: | 5 | — |
| After a freeze or reboot: | 5 | — |
| JSON output is available for scripts: | 6 | F-1-19 |
| What it records | 3 | — |
| Each Linux snapshot requests a ten-minute journal window, kernel messages, PCI graphics drivers, DRM connector states, the process table, and selected display-session variables. | 23 | F-1-20, F-1-46 |
| Every section is capped at 96 KiB. | 7 | F-1-21 |
| Missing commands or permissions appear in the report instead of aborting capture. | 12 | F-1-15 |
| Capsules use XChaCha20-Poly1305 with a local 32-byte key. | 8 | F-1-22 |
| The key is created with user-only permissions. | 7 | F-1-23 |
| Rendering replaces common home paths, email addresses, IPv4 addresses, and secret assignments. | 12 | — |
| Review every report before sharing it. | 6 | — |
| At most eight retained capsules remain. | 6 | — |
| The rolling prebuffer is separate. | 5 | F-1-24 |
| A hard lock can stop every user process, so Freeze Capsule cannot guarantee a final write during a lock. | 19 | F-1-13, F-1-48 |
| It preserves the last completed snapshot instead. | 7 | — |
| Develop | 1 | — |
| Requirements: stable Rust, Node.js 20 or newer, and npm. | 9 | F-1-25 |
| The static site lands in dist/site. | 6 | F-1-26 |
| The CLI binary lands in target/release. | 6 | F-1-27 |
| Playwright uses its bundled Chromium. | 5 | F-1-28 |
| The release workflow builds platform artifacts only on GitHub Actions. | 10 | F-1-29 |
| Release | 1 | — |
| Tag a tested commit: | 4 | — |
| The workflow builds archives, .deb, .rpm, unsigned macOS .pkg files, checksums, latest.json, Homebrew, Scoop, and winget manifests. | 17 | F-1-30 |
| macOS and Windows artifacts are unsigned. | 6 | F-1-31 |
| Privacy and license | 3 | — |
| The CLI has no telemetry and no network client. | 9 | F-1-4 |
| See privacy and terms. | 4 | — |
| Freeze Capsule is released under the MIT License. | 8 | — |

## Demo and sandbox evidence

- Landing CTA click 1: URL becomes `/demo`; report heading is hidden; **Run sample capture** is visible.
- Click 2: the report shows `watchdog-gap-94s`, `600 seconds`, `6 captured · 1 limited`, AMD GPU timeout evidence, Cinnamon, and Chrome.
- Demo banner is present and says “Demo — sample data, nothing is saved.”
- **Reset demo** hides the report and clears `sessionStorage`.
- The demo flow requested only the document and same-origin hashed JS/CSS. `localStorage` remained empty; the only state was `sessionStorage["demo:ran"]`.
- After the initial page load, the browser sample can run without another request. The product makes no offline-after-first-visit claim, and there is no service worker.
- The real CLI demo returned `temporary:true` and wrote its encrypted capsule and report under `/tmp/freeze-capsule-demo-<pid>`, not the command's working directory or normal capsule directory.

## Declared claims

All ten exact commands were run sequentially after `npm ci` in clean clone `/tmp/freeze-review-1-clean-DHE4eR`. All passed. Findings F-1-3, F-1-4, and F-1-10 through F-1-40 concern test fidelity or claims missing from the manifest, not command exit status.

| Claim | Exact command | Result |
| --- | --- | --- |
| `sample-report` | `npm run test:site -- --grep @claim:sample-report` | PASS, 1 test |
| `demo-private` | `npm run test:site -- --grep @claim:demo-private` | PASS, 1 test |
| `encrypted-redacted` | `npm run test:site -- --grep @claim:encrypted-redacted` | PASS, 1 test |
| `demo-capture-render` | `npm run test:site -- --grep @claim:demo-capture-render` | PASS, 1 test |
| `redaction-coverage` | `npm run test:site -- --grep @claim:redaction-coverage` | PASS, 1 test |
| `bounded-retention` | `npm run test:site -- --grep @claim:bounded-retention` | PASS, 1 test |
| `watchdog-gap` | `npm run test:site -- --grep @claim:watchdog-gap` | PASS, 1 test |
| `rolling-snapshot` | `npm run test:site -- --grep @claim:rolling-snapshot` | PASS, 1 test |
| `cli-local-only` | `npm run test:site -- --grep @claim:cli-local-only` | PASS, 1 test; scope inadequate per F-1-4 |
| `free-license` | `npm run test:site -- --grep @claim:free-license` | PASS, 1 test |

## Structure, links, visual identity, and accessibility

- Titles follow the required pattern and are under 60 characters. `/`, `/demo`, `/privacy`, `/terms`, and the app 404 each have one `h1`, one `main`, and `lang="en"`.
- Canonicals update for app routes. Open Graph and descriptions do not; see F-1-7.
- SVG favicon, 180×180 apple-touch icon, 1200×630 social card, robots, sitemap, and security headers exist.
- All 12 unique live anchors were crawled. Internal routes, hash targets, GitHub Releases, and Sociobot returned 200; no dead link was found. The missing route's 200 is itself F-1-5.
- Pointer navigation focuses the next route heading. Back navigation fails; see F-1-6.
- The blueprint drafting-sheet identity, original capsule cutaway, square label buttons, grid, and restrained scan motion are product-specific rather than a generic SaaS template. Provenance is recorded in `.factory/design.md`.
- `prefers-reduced-motion` removes the scan and shortens transitions. Mobile has no horizontal overflow. Demo controls measure at least 44 px.
- `/opt/fleet/lib/verify-url.sh` passed: title, `lang`, one `h1`, `main`, image alt, and no console errors. Live Playwright axe checks reported zero violations on `/`, `/demo`, `/privacy`, `/terms`, and `/missing-sheet`.
- Fresh build size is 14.21 KB JavaScript (5.44 KB gzip), 11.48 KB CSS (3.33 KB gzip), and 49.31 KB hero WebP.

## History audit

No earlier `.factory/review-*.md` or `.factory/polish-*.md` exists. The earlier handoff and both verification reports were read. Each prior release blocker was checked again:

| Earlier finding | Current result |
| --- | --- |
| P1 — demo banner controls below 44 px | Fixed: both rules and live controls use at least 44 px; regression passes. |
| P1 — hashed assets not immutable | Fixed: live HTML revalidates and hashed assets return one-year `immutable`. |
| P1 — claims contract incomplete | **Half-fixed and blocking again:** ten IDs/tags now exist, but F-1-3, F-1-4, and the unlisted-claim table show coverage is still incomplete. |
| P1 — release not identifiable as candidate | Fixed: `v0.1.1` dereferences to `73390fd`, is an ancestor of current `main`, and the GitHub release exposes 13 versioned assets. |

## Missed leverage

No AI feature, sync, or additional import is justified by the brief. Optional remote analysis would weaken the local-first privacy position. Markdown and JSON rendering already provide the expected export path. No embedded model-provider key or decorative AI feature was found.

## Verification commands and results

- `npm test` — PASS: 5 Rust tests, watchdog integration, 17 Playwright tests.
- `npm run build` — PASS; output in `dist/site`.
- Every exact `.factory/claims.json` command — PASS from a clean clone.
- Live verify-url check — PASS, no console errors.
- Live Playwright axe on five routes — PASS, zero violations.
- Link crawl — all listed links reachable; soft-404 defect remains.

## What would make this perfect

Resolve all 50 findings, then rerun this entire review from a fresh context and clean clone. The critical path is to make the landing CTA open a populated, fixture-derived demo in one click; discard demo state on exit; make privacy tests cover the whole CLI; inventory every retained public claim; return a real 404; restore focus on Back/Forward; set route-specific metadata; and fit the full required first-screen message at 390×844. After the copy rewrites and direct package-link behavior are verified, there should be no remaining finding or untested claim.
