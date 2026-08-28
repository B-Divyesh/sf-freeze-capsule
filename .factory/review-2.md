# Adversarial first-read review 2 — Freeze Capsule

**Reviewed:** 28 August 2026 UTC  
**Live URL:** <https://freeze-capsule.sociobot.in>  
**Candidate:** `5391894628495b71c192c26e5f15448f3fa31556`  
**Verdict:** **FAIL**

The cold first read and isolated browser demo now work. However, the required `npm test` gate fails from a clean checkout, the standalone 404 is still not a complete route shell, and a substantial set of public capability and privacy statements has no `claims.json` entry or observable sandbox test. The previous review marked those statements as removed or narrowed, but they remain in the live copy and README. A PASS requires zero findings.

## First screen, before scrolling

Fresh Chromium contexts were used at 390×844 and 1440×900. No scroll occurred before recording this result.

| Question | Answer from the first screen | Exact evidence |
| --- | --- | --- |
| What does it do? | It saves Linux freeze clues before a reboot. | “Save freeze clues before you reboot” |
| For whom? | Desktop Linux users who need diagnostic context after a freeze. | “For desktop Linux users who need graphics, kernel, process, and session context after a freeze.” |
| What should I click first? | Try the sample report. | “Try it with sample data” and “See a redacted report in one click.” |

This check passes. On the 390 px viewport the heading, audience sentence, action, action outcome, and all three facts were visible before the fold. The blueprint cutaway, grid, drafting labels, and restrained scan line are distinct and match the recorded design direction; this is not a generic SaaS template.

## Findings — blocking

### F-2-1 — The required `npm test` quality gate fails

- **Location:** clean clone, `tests/claims.spec.ts:134–142`.
- **Observed:** `npm test` produced 5 passing Rust tests, the watchdog test, and 18 passing Playwright tests, then failed the untagged mobile regression test. `getByText('Free and open source', { exact: true })` never finds an element because the visible words share an `<li>` with the aria-hidden `01` marker. Re-running that test alone with one worker fails identically.
- **Why it fails:** The repository contract requires `npm test` to pass. The phone first screen visibly contains the fact, but the regression gate cannot verify it and makes a clean verification fail.
- **Concrete fix:** Select the facts by a stable semantic structure, for example `page.locator('.facts li').nth(0).toContainText('Free and open source')`, then run the full suite from a clean checkout.

### F-2-2 — The designed 404 is still an incomplete route shell (reopens F-1-5)

- **Location:** `https://freeze-capsule.sociobot.in/missing-sheet`, served as `404`; deployed `404.html`.
- **Observed:** The status is now correctly 404 and the page has a heading and footer. But, unlike every application route, it has no skip link, no Install navigation item, no Apple touch icon, and no `og:image` or `twitter:image`. The site-structure contract requires the consistent header/footer skeleton and a real social image on every route.
- **Why it fails:** Keyboard visitors do not get the required bypass link on the error route, and sharing that route lacks the product's social art. The earlier 404 repair is therefore only partial.
- **Concrete fix:** Add the same skip link, header navigation, icon links, and complete Open Graph/Twitter image metadata used by the app shell to `404.html`; add a deployed-404 shell and metadata test.

### F-2-3 — Linux live-capture capability is again an unlisted claim (reopens F-1-11)

- **Quote/location:** Landing installation panel: “Live capture runs on Linux.”
- **Why it fails:** No `claims.json` entry tests live collection on Linux. The declared CLI tests only exercise the bundled demo and fixture behavior.
- **Concrete fix:** Add a `linux-live-capture` claim with controlled command/file fixtures that prove a capture records the documented sources, or change the panel to an instruction without asserting capability.

### F-2-4 — Cross-platform command capability is again an unlisted claim (reopens F-1-12)

- **Quote/location:** Landing: “Other builds run the sample and report commands.” README: “macOS and Windows builds provide the portable demo, renderer, and report inspection commands.”
- **Why it fails:** No declared test runs the advertised release binaries on macOS and Windows or otherwise proves these commands are available there.
- **Concrete fix:** Add platform release smoke tests and a `portable-commands` claim, or remove the platform promise until those builds are verified.

### F-2-5 — The hard-freeze limitation is an unlisted behavioral claim (reopens F-1-13)

- **Quote/location:** Landing: “A hard freeze can stop capture.” / “The last completed snapshot remains available.” Demo report and README repeat the same outcome; Terms says “A hard freeze can prevent a final write.”
- **Why it fails:** The limitation is appropriate to disclose, but no claim test suspends capture and proves both the absence of a final write and preservation of the previous completed snapshot.
- **Concrete fix:** Add a `hard-freeze-limit` claim using a suspended controlled watcher, or make the limitation explicitly non-behavioral and remove the asserted preservation outcome.

### F-2-6 — Log-permission and unavailable-source behavior is unlisted (reopens F-1-14 and F-1-15)

- **Quote/location:** Landing: “Log access follows your account.” / “Unavailable sources appear in the report.” Demo report: “Commands respect the current user's log permissions.” Terms repeats the permissions limitation.
- **Why it fails:** No claim creates a permission-denied or missing-command source and checks that the report remains usable with an explicit unavailable status.
- **Concrete fix:** Add one `limited-source-report` claim with injected permission and command failures; assert the report names each unavailable source and continues.

### F-2-7 — Desktop-hotkey capture remains unlisted (reopens F-1-16)

- **Quote/location:** README: “Capture from a desktop hotkey:” followed by `freeze-capsule hotkey-command`.
- **Why it fails:** No claim runs the emitted command in an isolated capsule directory and asserts a capsule is created.
- **Concrete fix:** Add a `hotkey-capture` claim that executes the emitted command with a controlled fixture and observes the retained capsule.

### F-2-8 — Installer checksum verification is unlisted (reopens F-1-17)

- **Quote/location:** README: “Both installers download the published archive and verify its SHA-256 checksum.”
- **Why it fails:** Neither `claims.json` nor its tagged tests runs both installer paths against a valid and a deliberately mismatched checksum.
- **Concrete fix:** Add an `installer-checksum` claim covering POSIX and PowerShell success and checksum-rejection paths, or remove the verification assertion.

### F-2-9 — Release-package availability is unlisted (reopens F-1-18)

- **Quote/location:** README: “Linux users can also choose the `.deb` or `.rpm` file on the release page.”
- **Why it fails:** The release lookup UI is crawlable, but no declared claim verifies both package assets in a published release.
- **Concrete fix:** Add a `linux-package-assets` claim against a release fixture or published-release integration check.

### F-2-10 — Scriptable JSON output remains unlisted (reopens F-1-19)

- **Quote/location:** README: “JSON output is available for scripts:” followed by `--json list` and `render latest --format json`.
- **Why it fails:** No declared claim invokes both documented commands and checks the promised observable JSON result.
- **Concrete fix:** Add a `json-output` claim with required stable fields for both commands.

### F-2-11 — Claimed collection sources are unlisted (reopens F-1-20)

- **Quote/location:** README: “Each Linux snapshot requests journal, kernel, graphics, connector, and process details.” / “It also records selected display-session variables.”
- **Why it fails:** The demo fixture displays those sections but does not prove the live Linux collector requests each source.
- **Concrete fix:** Cover these sentences with the controlled Linux capture claim in F-2-3, asserting every named source.

### F-2-12 — The encryption algorithm statement is unlisted (reopens F-1-22)

- **Quote/location:** README: “Capsules use XChaCha20-Poly1305 with a local 32-byte key.”
- **Why it fails:** `encrypted-redacted` checks a file magic prefix and absence of one plaintext term. It does not establish the stated algorithm or key size.
- **Concrete fix:** Add an `encryption-format` claim that round-trips a fixture and asserts the algorithm, nonce, and 32-byte key contract.

### F-2-13 — Key permissions are unlisted (reopens F-1-23)

- **Quote/location:** README: “The key is created with user-only permissions.”
- **Why it fails:** No claim inspects the key's mode or documents and tests the equivalent Windows protection.
- **Concrete fix:** Add a `key-permissions` claim that asserts `0600` on Unix and the documented Windows behavior.

### F-2-14 — The retained/prebuffer distinction is unexplained and untested (reopens F-1-24)

- **Quote/location:** README: “The rolling prebuffer is not counted as a retained capsule.”
- **Why it fails:** “Prebuffer” is undefined jargon, and `bounded-retention` does not prove its exclusion from the eight retained capsules.
- **Concrete fix:** Rewrite as “The current rolling snapshot does not use one of the eight saved capsules,” then add a claim that creates both kinds and checks the count.

### F-2-15 — Release-workflow and signature assertions are unlisted (reopens F-1-30 and F-1-31)

- **Quote/location:** README: “The GitHub Actions workflow builds archives, Linux packages, macOS packages, Windows archives, checksums, and release manifests.” / “macOS and Windows artifacts are unsigned.”
- **Why it fails:** No claim checks the workflow matrix, expected output names, or signature state.
- **Concrete fix:** Add one `release-artifacts` claim that inspects the workflow and fixture manifests, including the unsigned disclosure, or move unverified release-process detail out of public documentation.

### F-2-16 — Normal local storage behavior is unlisted (reopens F-1-32)

- **Quote/location:** Privacy: “Capsules and the local key are stored in your state directory.”
- **Why it fails:** The local-only test checks only the temporary CLI demo. It does not create normal evidence under an isolated state directory or establish that the key and capsules are there.
- **Concrete fix:** Add a `normal-state-directory` claim using a temporary `XDG_STATE_HOME`; assert the expected evidence and one key.

### F-2-17 — Whole-site no-account/no-analytics/no-cookie claim is untested (reopens F-1-33)

- **Quote/location:** Privacy: “The site does not use accounts, analytics, advertising, or cookies.”
- **Why it fails:** `demo-private` observes the `/demo` flow's requests and Web Storage only. It does not check cookies, the home/privacy/terms routes, or the optional release lookup.
- **Concrete fix:** Add a `site-no-tracking` claim that records requests, cookies, and browser storage across every static route; explicitly allow GitHub only after the release-check action if retained.

### F-2-18 — The GitHub release request is unlisted (reopens F-1-34)

- **Quote/location:** Privacy: “Checking published packages requests public release details from GitHub.”
- **Why it fails:** The request is disclosed but has no claim entry that limits the origin and proves it happens only on the explicit button action.
- **Concrete fix:** Add a `release-lookup-request` claim recording requests before and after activation, or remove the behavior until it is covered.

### F-2-19 — State retention after uninstall is unlisted (reopens F-1-38)

- **Quote/location:** Privacy: “Package removal does not remove that directory.”
- **Why it fails:** No package lifecycle test verifies that evidence survives uninstall.
- **Concrete fix:** Add an `uninstall-keeps-evidence` claim that installs, creates normal evidence, removes the package, and asserts the state directory remains.

### F-2-20 — The redaction-limit warning is untested (reopens F-1-39)

- **Quote/location:** Landing and Privacy: “Redaction does not remove every machine detail.”
- **Why it fails:** The redaction test checks selected substitutions but never establishes which legitimate machine detail remains, so a reader cannot verify the warning's boundary.
- **Concrete fix:** Add a `redaction-limits` fixture with an intentionally preserved machine-detail category and assert the documented result.

## Copy audit

Counts use whitespace-separated visible words. The landing inventory includes labels, headings, actions, code labels, and footer text because all are read by a first-time visitor. No individual sentence exceeds 22 words. `F-2-14` and `F-2-21` identify the copy flags below.

### Landing page

| Words | Copy | Flag |
| ---: | --- | --- |
| 4 | Skip to main content | — |
| 7 | Freeze Capsule — save Linux freeze clues | — |
| 2 | Freeze Capsule | — |
| 1 / 1 / 1 | Demo / Install / Privacy | — |
| 6 | Linux field tool · drawing FC–01 | — |
| 6 | Save freeze clues before you reboot | — |
| 15 | For desktop Linux users who need graphics, kernel, process, and session context after a freeze. | — |
| 5 | Try it with sample data | Result-naming action; passes. |
| 7 | See a redacted report in one click. | Covered by `sample-report`. |
| 4 / 4 / 5 | Free and open source / Demo data stays separate / Keeps at most eight capsules | Claims covered. |
| 11 | Fig. 1 — journal · graphics · processes · display session | — |
| 2 / 3 | Detail A / Bundled CLI sample | F-2-21 |
| 6 | See the sample report before installing | — |
| 4 | View the sample report | Result-naming action; passes. |
| 12 | Demo — bundled sample data, nothing is saved to your capsule directory. | Covered by `demo-private`. |
| 4 / 4 | Encrypted sample: temporary `.fcap` / Redacted report: temporary `freeze-report.md` | Covered by the CLI-demo claims. |
| 8 | ✓ journal ✓ graphics ✓ processes ✓ display-session | — |
| 10 | The browser uses a fixture generated from `freeze-capsule --json demo`. | F-2-21; parity is covered by `sample-fixture`. |
| 3 | Sequence / 03 | — |
| 6 | How Freeze Capsule keeps pre-freeze evidence | Heading makes sense alone. |
| 4 | Keep one snapshot current | — |
| 9 | The watcher records a ten-minute window every 30 seconds. | Covered by `rolling-snapshot`. |
| 7 | Keep the snapshot when the watcher pauses | — |
| 8 | A 90-second pause keeps the last completed snapshot. | Covered by `watchdog-gap`. |
| 4 | Create a redacted report | — |
| 12 | The report removes home paths, email addresses, IP addresses, and common secrets. | Covered by `redaction-coverage`. |
| 2 / 4 | Installation plate / Install the Linux watcher | — |
| 10 | Install Freeze Capsule, then choose when to start the watcher. | — |
| 5 | `curl -fsSL https://freeze-capsule.sociobot.in/install.sh \| sh` | Command, not a button. |
| 10 | Find a package on GitHub, or check the published release. | — |
| 3 / 3 | Open Linux releases / Check published packages | Result-naming actions; pass. |
| 5 / 5 / 5 / 5 | Find Linux `.deb` on GitHub / Find Linux `.rpm` on GitHub / Find macOS `.pkg` on GitHub / Find Windows `.zip` on GitHub | Each points to the named GitHub release index. |
| 5 | Start and check the watcher | Heading makes sense alone. |
| 2 / 2 / 2 | `freeze-capsule install-service` / `freeze-capsule doctor` / `freeze-capsule hotkey-command` | Commands. |
| 5 / 8 | Live capture runs on Linux. / Other builds run the sample and report commands. | F-2-3, F-2-4. |
| 2 / 4 | Boundary notes / Know the capture limits | — |
| 6 / 6 | A hard freeze can stop capture. / The last completed snapshot remains available. | F-2-5. |
| 5 / 6 | Log access follows your account. / Unavailable sources appear in the report. | F-2-6. |
| 3 / 7 | Review before sharing. / Redaction does not remove every machine detail. | F-2-20. |
| 9 | Freeze Capsule · Save Linux freeze clues before reboot. | — |
| 1 / 1 / 4 / 2 / 4 | Privacy / Terms / Built by Param Factory / (external site) / v0.1.1 · build 2026.08 | — |

### README

| Words | Sentence, heading, or user-facing command | Flag |
| ---: | --- | --- |
| 2 | Freeze Capsule | — |
| 9 | Save Linux freeze clues before a reboot erases them. | — |
| 14 | Freeze Capsule is for desktop Linux users debugging graphics, kernel, application, or display-session freezes. | — |
| 7 | Its watcher keeps one encrypted snapshot current. | — |
| 11 | If the watcher pauses for 90 seconds, it keeps the last complete snapshot. | Covered by `watchdog-gap`. |
| 3 | Live site: URL | — |
| 4 / 2 | Try the isolated demo / `freeze-capsule demo` | — |
| 5 | The command loads the bundled sample. | Covered by CLI demo claims. |
| 12 | It writes an encrypted capsule and redacted Markdown report under a new temporary directory. | Covered by `encrypted-redacted`. |
| 10 | It never reads or writes your normal capsule directory. | Covered by `cli-local-only`. |
| 8 | The same isolated sample is available at the demo URL. | — |
| 11 | The browser report is generated from the same bundled CLI demo fixture. | F-2-21; parity is covered. |
| 1 / 3 / 2 | Install / Linux and macOS / Windows PowerShell | — |
| 5 / 4 | POSIX installer command / PowerShell installer command | Commands. |
| 10 | Both installers download the published archive and verify its SHA-256 checksum. | F-2-8. |
| 12 | Linux users can also choose the `.deb` or `.rpm` file on the release page. | F-2-9. |
| 5 / 3 | Homebrew after the tap is published / Homebrew command | — |
| 6 / 8 | Scoop after adding the repository bucket / Scoop bucket command | — |
| 3 | Scoop install command | — |
| 4 | Live capture is Linux-specific. | F-2-3. |
| 12 | macOS and Windows builds provide the portable demo, renderer, and report inspection commands. | F-2-4; “renderer” is also unexplained jargon. |
| 1 / 7 | Use / Start the watcher as your Linux user. | — |
| 2 / 2 | `freeze-capsule install-service` / `freeze-capsule doctor` | Commands. |
| 5 / 2 | Capture from a desktop hotkey: / `freeze-capsule hotkey-command` | F-2-7. |
| 5 | After a freeze or reboot: | — |
| 2 / 5 | `freeze-capsule list` / `freeze-capsule render latest --output freeze-report.md` | Commands. |
| 6 | JSON output is available for scripts: | F-2-10. |
| 3 / 5 | `freeze-capsule --json list` / `freeze-capsule render latest --format json` | F-2-10. |
| 4 | What it records | Heading makes sense alone. |
| 10 | Each Linux snapshot requests journal, kernel, graphics, connector, and process details. | F-2-11. |
| 6 | It also records selected display-session variables. | F-2-11. |
| 8 | A report marks unavailable sources instead of abandoning capture. | F-2-6. |
| 7 | Capsules use XChaCha20-Poly1305 with a local 32-byte key. | F-2-12; technical term needs a plain-language lead-in. |
| 7 | The key is created with user-only permissions. | F-2-13. |
| 11 | Rendering replaces common home paths, email addresses, IPv4 addresses, and secret assignments. | Covered by `redaction-coverage`. |
| 5 | Review every report before sharing it. | — |
| 6 | At most eight retained capsules remain. | Covered by `bounded-retention`. |
| 9 | The rolling prebuffer is not counted as a retained capsule. | F-2-14. |
| 16 | A hard freeze can stop every user process, so Freeze Capsule cannot guarantee a final write. | F-2-5. |
| 6 | It preserves the last completed snapshot instead. | F-2-5. |
| 1 / 10 | Develop / You need Rust, Node.js, and npm to build from source. | — |
| 2 / 2 / 3 / 3 | `npm ci` / `npm test` / `npm run build:site` / `cargo build --release` | `npm test` currently fails: F-2-1. |
| 6 | The build commands print their output paths. | — |
| 9 | If Playwright needs a browser, run `npx playwright install chromium`. | — |
| 1 / 3 | Release / Tag a tested commit: | — |
| 3 / 5 | `git tag v0.1.1` / `git push origin main v0.1.1` | Commands. |
| 16 | The GitHub Actions workflow builds archives, Linux packages, macOS packages, Windows archives, checksums, and release manifests. | F-2-15. |
| 5 | macOS and Windows artifacts are unsigned. | F-2-15. |
| 3 | Privacy and license | — |
| 11 | The bundled CLI demo makes no network connection and uses a temporary directory. | Covered by `cli-local-only`. |
| 5 | See privacy and terms. | — |
| 8 | Freeze Capsule is released under the MIT License. | Covered by `free-license`. |

### F-2-21 — User-facing “CLI” and “fixture” jargon obscures the demo source

- **Quote/location:** Landing: “BUNDLED CLI SAMPLE” and “The browser uses a fixture generated from `freeze-capsule --json demo`.” README repeats “bundled CLI demo fixture.”
- **Why it is a first-read problem:** A visitor who only wants to inspect a report does not need to know the internal test-artifact term “fixture,” and “CLI” changes the README's otherwise plainer “command-line tool” terminology.
- **Concrete rewrite:** “INCLUDED COMMAND-LINE SAMPLE” and “This browser report comes from the included command-line demo.” Keep the exact command in a separately labelled technical note.

No banned marketing adjective was found. The product consistently uses **capsule**, **report**, **watcher**, **snapshot**, **sample**, and **demo** for their recorded concepts; the only terminology mismatch is **CLI/command-line** in F-2-21.

## Demo, privacy, and CLI sandbox checks

- One click on the live landing action opened `https://freeze-capsule.sociobot.in/demo?demo=1` with the AMD/Cinnamon/Chrome report already rendered. The persistent banner read “Demo — sample data, nothing is saved.” **Replay sample capture** is optional, not required to see output.
- The demo used only `sessionStorage["demo:loaded"]`, no `localStorage`, and only same-origin document, JS, CSS, image, and fixture requests. **Install Freeze Capsule** cleared the `demo:` namespace before returning to the install section. **Reset demo** reloaded the bundled fixture in the demo namespace.
- `TMPDIR=<fresh temporary directory> XDG_STATE_HOME=<fresh temporary directory> cargo run -- --json demo` created `capsule-*.fcap`, `freeze-report.md`, and `capsule.key` only under `freeze-capsule-demo-*` in the temporary directory. The isolated normal state directory remained empty.
- No offline claim is made. No runtime AI feature or provider key exists; the brief does not imply an AI step beyond the existing capture/redacted-report workflow, and JSON/Markdown output already supplies the expected export path.

## Claims audit

From a fresh local clone at `/tmp/freeze-capsule-review-clean`, all eleven declared claim tags passed together with one worker (`npm run test:site -- --grep @claim --workers=1`):

| Claim | Exact declared command | Result |
| --- | --- | --- |
| `sample-report` | `npm run test:site -- --grep @claim:sample-report` | pass |
| `sample-fixture` | `npm run test:site -- --grep @claim:sample-fixture` | pass |
| `demo-private` | `npm run test:site -- --grep @claim:demo-private` | pass |
| `encrypted-redacted` | `npm run test:site -- --grep @claim:encrypted-redacted` | pass |
| `demo-capture-render` | `npm run test:site -- --grep @claim:demo-capture-render` | pass |
| `redaction-coverage` | `npm run test:site -- --grep @claim:redaction-coverage` | pass |
| `bounded-retention` | `npm run test:site -- --grep @claim:bounded-retention` | pass |
| `watchdog-gap` | `npm run test:site -- --grep @claim:watchdog-gap` | pass |
| `rolling-snapshot` | `npm run test:site -- --grep @claim:rolling-snapshot` | pass |
| `cli-local-only` | `npm run test:site -- --grep @claim:cli-local-only` | pass |
| `free-license` | `npm run test:site -- --grep @claim:free-license` | pass |

No declared claim test failed. This does not cure F-2-3 through F-2-20: those are public claim-like sentences with no entry and no tagged observable test. The full `npm test` result is failing as documented in F-2-1.

## Structure and route checks

- `/`, `/demo?demo=1`, `/privacy`, and `/terms` returned 200 with one `main`, one `h1`, a route-specific title, description, canonical URL, Open Graph URL/title, Twitter card, favicon, and Apple touch icon. `/missing-sheet` returned the designed page with HTTP 404.
- All discovered internal links, the GitHub Releases link, and `sociobot.in` returned 200 (hash links resolve to their existing sections). The title, language, landmarks, image alt text, touch targets, contrast, and reduced-motion behavior passed the live smoke checks. Axe reported no serious or critical violation on the four app routes or the 404.
- Navigation to Demo, browser Back, and Forward each restored focus to the route `h1` and returned scroll position to the top. No horizontal overflow was observed at 390 px.
- The 404 document itself causes the browser's expected failed-resource console event because it is correctly an HTTP 404; no application JavaScript error was observed. Its missing consistent-shell metadata/accessibility requirements are F-2-2.

## History audit

Every earlier `.factory/review-*.md`, `.factory/polish-*.md`, verification report, and handoff was read. Live behavior and current source were rechecked rather than trusting the polish map.

| Earlier finding(s) | Current result |
| --- | --- |
| F-1-1, F-1-2, F-1-3 | Fixed: a single click shows the generated CLI fixture; the exit action clears `demo:` state; browser/CLI fixture parity is tested. |
| F-1-4 | Fixed by narrowing the CLI privacy copy to the demo behavior covered by `cli-local-only`. |
| F-1-5 | Half-fixed; status, footer, and some metadata are repaired, but the standalone 404 still lacks the full shared shell and social/icon metadata. Reopened as F-2-2. |
| F-1-6, F-1-7, F-1-8, F-1-9 | Fixed: Back/Forward focus, SPA metadata, mobile first-screen visibility, and honest package-link labels were verified live. |
| F-1-10 | Fixed: the one-binary assertion was removed. |
| F-1-11 through F-1-20 | Unfixed or regressed public claims remain. Reopened as F-2-3 through F-2-11. |
| F-1-21 | Fixed: the 96 KiB assertion was removed. |
| F-1-22 through F-1-24 | Unfixed public claims remain. Reopened as F-2-12 through F-2-14. |
| F-1-25 through F-1-29 | Fixed: the version/output/release-process wording was removed or corrected. |
| F-1-30 through F-1-34 | Unfixed public claims remain. Reopened as F-2-15 through F-2-18. |
| F-1-35 through F-1-37 | Fixed or removed: present links honestly identify GitHub; data-category/delete-path assertions are absent. |
| F-1-38 and F-1-39 | Unfixed public claims remain. Reopened as F-2-19 and F-2-20. |
| F-1-40 | Fixed: the license claim test checks the MIT warranty wording. |
| F-1-41 through F-1-50 | Fixed except the new/repeated CLI/fixture jargon in F-2-21; headings, watcher/freeze terminology, and sample-result action are otherwise clear. |

## What would make this perfect

Make `npm test` deterministic and green, complete the static 404 shell, then either test every retained operational/privacy statement through a declared claim or remove it. Replace the remaining internal demo terminology with plain command-line language. At that point, the clear first screen, genuinely one-click report, isolated demo, distinct visual system, and otherwise solid route behavior would have no remaining first-read or verification gaps.
