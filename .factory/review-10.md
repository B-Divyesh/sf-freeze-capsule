# Review 10 — save Linux freeze clues before reboot

**Reviewed:** 6 September 2026 UTC  
**Live URL:** <https://freeze-capsule.sociobot.in>  
**Implementation candidate:** `05c6e7b99a75f024dd76c148bb568005a05d8a4c`  
**Documentation SHA:** `c8a13d84a5996addc86d1a83290fa9f257fcb16a`  
**Published CLI release commit:** `73390fd47f9881e38fafd7645f3b56b941c8536a` (`v0.1.1`)  
**Verdict:** **FAIL**

One major finding remains. The live browser and current source use the review
candidate, but the documented installer still downloads a binary built from an
older commit. Its bundled demo does not match the live browser sample. This
reopens the earlier release-provenance concern and makes the public
`sample-fixture` claim false for a clean consumer install. All 29 declared claim
commands passed, so the untested-claim count is zero; the problem is that the
test uses a source-built binary instead of the published artifact.

## Job, audience, and first action before scrolling

Fresh Chromium contexts opened the live home page at 390×844 and 1440×900.
Neither context scrolled before this check.

| Question | Plain answer | Live evidence |
| --- | --- | --- |
| What is the job? | Save Linux freeze clues before a reboot. | “Save freeze clues before you reboot” |
| Who is it for? | Desktop Linux users diagnosing graphics, kernel, process, or session freezes. | “For desktop Linux users who need graphics, kernel, process, and session context after a freeze.” |
| What should the visitor do first? | Open the sample report. | “Try it with sample data” and “See a redacted report in one click.” |

The headline, audience sentence, action, action result, and three facts were all
inside the first viewport on both devices. The phone page had no horizontal
overflow at its normal text size.

## Finding

### F-10-1 — the installer serves an older demo than the live site

- **Severity:** Major
- **Public claim:** `sample-fixture` — “The browser sample report matches the
  report created by the bundled command-line demo.” The same statement appears
  on the home page and in README.
- **Observed:** The live site assets match the build from implementation
  candidate `05c6e7b`. The documented `curl | sh` installer downloads release
  `v0.1.1`, whose tag dereferences to `73390fd`. No published tag contains the
  implementation candidate.
- **Clean consumer result:** The installer completed and verified the archive
  checksum. `freeze-capsule --json demo` then produced a report containing “A
  hard lock can prevent any process…”. The live browser fixture and the
  source-built candidate contain “A hard freeze can prevent any process…”. A
  direct diff found this one changed line. The installed and candidate Linux
  binaries also have different SHA-256 values.
- **Why this matters:** The installable CLI is the product. The declared claim
  test passes only because it builds the current source and compares that build
  with the browser fixture. It does not prove the result a visitor gets from
  the documented installer. A visitor therefore receives an older artifact
  than the reviewed implementation, and the exact sample-parity promise is
  false after installation.
- **Required repair:** Tag and publish a new release from `05c6e7b` or a later
  repair commit, including all required platform packages, checksums, and
  manifests. Then use the documented installer in a clean directory and compare
  its complete demo report with the live browser fixture. The installed binary
  must be the implementation under review.

## Demo and real-data isolation

- One click on **Try it with sample data** opened `/demo?demo=1` at the top of
  the page. Four populated rows showed an AMD ring timeout, the `amdgpu` driver,
  Chrome process context, and Cinnamon display-session data.
- The banner stayed visible and read “Demo — sample data, nothing is saved.” It
  contained **Reset demo** and **Install Freeze Capsule**.
- Reset removed a seeded `demo:mutated` value, recreated only `demo:loaded`,
  reproduced the same report, and preserved `real:marker`.
- Leaving the demo removed all `demo:` keys, kept `real:marker`, opened
  `/#install`, and focused **Install the Linux watcher**.
- Landing, demo entry, reset, and exit made only same-origin requests. The
  GitHub API was requested only after **Check published packages**.
- The installed CLI demo ran with separate temporary and XDG state directories.
  It wrote one encrypted capsule, one 32-byte key, and one Markdown report under
  its temporary demo folder. The normal state directory remained empty.

Evidence: `.factory/evidence/review10/live/live-audit.json`,
`demo-phone.png`, and `install-exit-phone.png`.

## Installed CLI checks

The live POSIX installer was run into
`/tmp/freeze-review10-artifact.UTyBJ6/bin` without changing the normal PATH or
normal state directory.

| Path | Result |
| --- | --- |
| Install and checksum | PASS; installed `freeze-capsule 0.1.1` with mode 0755. |
| `--help` and `--version` | PASS; commands and global JSON/state options were present. |
| Bundled demo | PASS for encryption, redaction, realistic evidence, temporary output, and normal-state isolation; FAIL for current browser parity per F-10-1. |
| Empty list | PASS; returned `[]`. |
| Empty render | PASS recovery; exit 1 said to capture first. |
| Normal capture | PASS; a bounded 80-character reason produced encrypted evidence. |
| Limited sources | PASS; unavailable journal/graphics/DRM sources stayed named while process and session sources rendered. |
| JSON list and render | PASS; both outputs parsed. |
| Watch once | PASS; produced an encrypted rolling prebuffer. |
| Corrupt capsule | PASS recovery; exit 1 reported “not a Freeze Capsule file.” |
| Key and encryption | PASS; key mode was 0600, file magic was `FCAP1`, and plaintext sample terms were absent from the capsule. |
| Release assets | PASS; all seven files in `SHA256SUMS` downloaded and verified. `latest.json` listed the same seven versioned assets. |

No backend exists, so tenant isolation, server restart persistence, health, and
HTTP 429 checks do not apply. No web offline or automatic-update promise is
made.

## Declared claims

A no-local clean clone was created at
`/tmp/freeze-review10-clean.FaKptM/repo`. After `npm ci`, every exact command in
`.factory/claims.json` was run separately. All 29 completed; none was skipped.

| Claim | Command result | Public result |
| --- | --- | --- |
| `sample-report` | PASS | PASS |
| `sample-fixture` | PASS | **FAIL after documented install; F-10-1** |
| `demo-private` | PASS | PASS |
| `encrypted-redacted` | PASS | PASS |
| `demo-capture-render` | PASS | PASS |
| `redaction-coverage` | PASS | PASS |
| `bounded-retention` | PASS | PASS |
| `watchdog-gap` | PASS | PASS |
| `rolling-snapshot` | PASS | PASS |
| `cli-local-only` | PASS | PASS |
| `free-license` | PASS | PASS |
| `linux-live-capture` | PASS | PASS |
| `linux-only-capture` | PASS | PASS |
| `hard-freeze-limit` | PASS | PASS |
| `limited-source-report` | PASS | PASS |
| `hotkey-capture` | PASS | PASS |
| `installer-checksum` | PASS | PASS |
| `json-output` | PASS | PASS |
| `encryption-format` | PASS | PASS |
| `key-permissions` | PASS | PASS |
| `current-snapshot` | PASS | PASS |
| `build-output` | PASS | PASS |
| `release-workflow-declaration` | PASS | PASS |
| `normal-state-directory` | PASS | PASS |
| `local-evidence-removal` | PASS | PASS |
| `site-no-tracking` | PASS | PASS |
| `release-lookup-request` | PASS | PASS |
| `platform-package-selection` | PASS | PASS |
| `redaction-limits` | PASS | PASS |

This table separates command exit status from the observable installed result.
F-10-1 is a false deployed claim, not an unrun claim.

## Build and quality gates

- `npm ci` — PASS from the clean clone.
- `npm test` — PASS: 11 Rust tests, watchdog integration, and 40 Playwright
  tests.
- `npm run build` — PASS; produced `dist/site`.
- Application JavaScript — 17.08 kB raw and 6.21 kB gzip.
- CSS — 12.14 kB raw and 3.49 kB gzip.
- Hero image — 49.31 kB.
- Live and local SHA-256 values matched for HTML, JavaScript, CSS, and the demo
  fixture. This proves the live web runtime is the implementation candidate;
  the two later commits change only reports and evidence.
- Live Lighthouse mobile — Performance 100, Accessibility 100, Best Practices
  100, SEO 100; LCP 1.1 s, TBT 50 ms, CLS 0.
- Factory URL verifier — PASS with no application console error, one `h1`, one
  `main`, `lang=en`, complete alt text, and labelled buttons.

## Browser, accessibility, privacy, and route checks

- Home, Demo, Privacy, and Terms returned 200. An unknown address returned the
  designed page with HTTP 404. `/404.html` returned its expected source document
  with 200. The browser's failed-document console message for the deliberate
  404 is expected and is not a defect.
- All six checked documents had one `h1`, one `main`, header, navigation,
  footer, route title, description, canonical, skip link, and legal links.
- Axe found zero violations of any severity on Home, Demo, Privacy, Terms,
  `/404.html`, and the deployed 404.
- Every visible link, button, and disclosure at 390 px measured at least 44×44
  CSS pixels. Focus rings were visible. Tab reached the skip link first; Enter
  moved focus to main content.
- Direct hash navigation, clicked navigation, demo exit, Back, and Forward
  restored the correct URL, scroll position, and heading focus.
- Reduced-motion mode removed the scan. At 200% text size the content and
  controls remained present and operable; command text could be panned.
- Clipboard denial supplied a manual-copy instruction. A blocked GitHub lookup
  supplied a calm release-page recovery action without inventing a cause.
- A fresh mobile browser was told to choose a package on a desktop. A fresh
  Linux desktop browser requested GitHub only after the explicit check, then
  linked directly to the published `.deb`.
- Static routes set no cookies and made no third-party request. The CSP allows
  only the disclosed GitHub API connection and produced no policy error.
- `robots.txt`, `sitemap.xml`, favicon, Apple icon, social image, both installer
  scripts, all internal links, GitHub Releases, Param Factory, and all 13
  current release-page assets returned successful responses. The social image
  is 1200×630; the Apple icon is 180×180.
- The blueprint grid, original cutaway image, safety-yellow controls, square
  drawing labels, and mono/sans hierarchy match `.factory/design.md` and remain
  distinct from a generic product template.

## Earlier finding disposition

Every earlier review, both verification reports, all polish ledgers, and the
prior handoff were read. The current live behavior, source regressions, clean
claim runs, and installed artifact were used for the dispositions below.

### Review 1

| ID | Current proof |
| --- | --- |
| F-1-1 | Fixed: one click opens populated evidence in the first phone screen. |
| F-1-2 | Fixed: Reset and every tested exit clear only `demo:` state. |
| F-1-3 | **Reopened as F-10-1:** source/browser parity passes, but the documented installer supplies the older sample. |
| F-1-4 | Fixed: no-network wording remains limited to the tested CLI demo. |
| F-1-5 | Fixed: unknown routes use the complete designed HTTP 404. |
| F-1-6 | Fixed: push, Back, and Forward restore heading focus. |
| F-1-7 | Fixed: routes update title, description, canonical, Open Graph, and Twitter data. |
| F-1-8 | Fixed: phone result context and three facts remain above the fold. |
| F-1-9 | Fixed: unresolved links name GitHub and resolved links name downloads. |
| F-1-10 | Fixed: the unsupported one-binary assertion remains absent. |
| F-1-11 | Fixed: Linux source collection is declared and tested. |
| F-1-12 | Fixed: unsupported cross-platform capture wording remains absent. |
| F-1-13 | Fixed: stopped-watcher behavior and retained snapshot pass. |
| F-1-14 | Fixed: permission-limited sources stay named in usable output. |
| F-1-15 | Fixed: missing sources remain explicit without aborting the report. |
| F-1-16 | Fixed: the printed hotkey command creates retained evidence. |
| F-1-17 | Fixed: both installers accept valid and reject changed checksums. |
| F-1-18 | Fixed: unsupported package-availability prose remains absent. |
| F-1-19 | Fixed: documented list and report output parse as JSON. |
| F-1-20 | Fixed: every named Linux collection source is asserted. |
| F-1-21 | Fixed: the untested 96 KiB statement remains absent. |
| F-1-22 | Fixed: encryption layout, nonce, key size, and round trip pass. |
| F-1-23 | Fixed: Unix key mode is 0600 in source and installed-artifact checks. |
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
| F-1-36 | Fixed: controlled capture covers the documented categories. |
| F-1-37 | Fixed: normal Linux removal names and tests the exact folder. |
| F-1-38 | Fixed: unsupported uninstall-retention prose remains absent. |
| F-1-39 | Fixed: retained hardware detail demonstrates the redaction boundary. |
| F-1-40 | Fixed: the MIT license and warranty wording are asserted. |
| F-1-41 | Fixed: the evidence heading names the product and job. |
| F-1-42 | Fixed: the pause step uses direct snapshot wording. |
| F-1-43 | Fixed: the report step says “Create a redacted report.” |
| F-1-44 | Fixed: the post-install heading names watcher work. |
| F-1-45 | Fixed: the 90-second pause is described directly. |
| F-1-46 | Fixed: source descriptions stay below 22 words. |
| F-1-47 | Fixed: “background watcher” is defined before later use. |
| F-1-48 | Fixed in source/live copy; the older release wording is covered by F-10-1. |
| F-1-49 | Fixed: least-privilege jargon remains absent. |
| F-1-50 | Fixed: both sample actions name the report result. |

### Review 2

| ID | Current proof |
| --- | --- |
| F-2-1 | Fixed: clean `npm test` passes all 40 browser tests. |
| F-2-2 | Fixed: standalone 404 has skip link, navigation, icons, metadata, and footer. |
| F-2-3 | Fixed: Linux collection is listed and exercised. |
| F-2-4 | Fixed: unsupported macOS/Windows capture wording remains absent. |
| F-2-5 | Fixed: watcher suspension behavior is listed and tested. |
| F-2-6 | Fixed: limited-source behavior is listed and tested. |
| F-2-7 | Fixed: hotkey capture is listed and tested. |
| F-2-8 | Fixed: both installer checksum outcome paths execute. |
| F-2-9 | Fixed: unsupported release-availability wording remains absent. |
| F-2-10 | Fixed: structured list/report output parses end to end. |
| F-2-11 | Fixed: all named collection sources remain asserted. |
| F-2-12 | Fixed: encryption details remain exercised. |
| F-2-13 | Fixed: key permissions remain exercised. |
| F-2-14 | Fixed: snapshot-slot wording and behavior remain direct. |
| F-2-15 | Fixed: workflow wording remains narrow and structurally tested. |
| F-2-16 | Fixed: normal local-state behavior remains exercised. |
| F-2-17 | Fixed: whole-site no-tracking behavior remains exercised. |
| F-2-18 | Fixed: explicit GitHub request timing remains exercised. |
| F-2-19 | Fixed: unsupported uninstall prose remains absent. |
| F-2-20 | Fixed: retained hardware detail demonstrates redaction limits. |
| F-2-21 | Fixed: public copy uses “command-line,” not CLI/fixture jargon. |

### Reviews 3 and 4

| ID | Current proof |
| --- | --- |
| F-3-1 | Fixed: Privacy, Home, Back, Install, and 404 exits clear only demo state. |
| F-4-1 | Fixed: four evidence rows appear in the first phone demo screen. |
| F-4-2 | Fixed: POSIX and PowerShell installers execute both checksum outcomes. |
| F-4-3 | Fixed: workflow copy says only what the parsed declaration proves. |
| F-4-4 | Fixed: both documented build paths are asserted. |
| F-4-5 | Fixed: clipboard denial supplies recovery text without a page error. |
| F-4-6 | Fixed: lookup failure avoids an invented cause. |
| F-4-7 | Fixed: hero label is “Linux freeze evidence tool.” |
| F-4-8 | Fixed: the hero caption directly names evidence sources. |
| F-4-9 | Fixed: “Detail A” remains absent. |
| F-4-10 | Fixed: the process label remains “Three steps.” |
| F-4-11 | Fixed: “Installation plate” remains absent. |
| F-4-12 | Fixed: “Boundary notes” remains absent. |
| F-4-13 | Fixed: README defines “background watcher” on first use. |
| F-4-14 | Fixed: the Homebrew heading names installation and its condition. |
| F-4-15 | Fixed: the Scoop heading names installation and its condition. |
| F-4-16 | Fixed: Linux-only collection is separately declared and tested. |
| F-4-17 | Fixed: the report heading names list/export behavior. |
| F-4-18 | Fixed: the 404 label is “Page not found / 404.” |
| F-4-19 | Fixed: application and standalone headings say “Page not found.” |
| F-4-20 | Fixed: the 404 action says “Return to the home page.” |
| F-4-21 | Fixed: the Privacy label is “Privacy policy.” |
| F-4-22 | Fixed: the Terms label is “Terms.” |
| F-4-23 | Fixed: the Terms `h1` names the product and route. |

### Reviews 5 through 8

| ID | Current proof |
| --- | --- |
| F-5-1 | Fixed: non-Linux capture returns only an unavailable platform result. |
| F-5-2 | Fixed: landing defines “background watcher” on first use. |
| F-6-1 | Fixed: direct, clicked, history, and demo-exit hash navigation reveal and focus Install. |
| F-6-2 | Fixed: every visible phone control on all checked routes is at least 44×44 px. |
| F-6-3 | Fixed: price, local-storage, and no-network facts remain above the phone fold. |
| F-7-1 | Fixed: mobile is not offered a desktop installer; a matching asset is required for readiness copy. |
| F-7-2 | Fixed: first-screen storage copy says “a folder on your computer.” |
| F-7-3 | Fixed: README heading is “Capture and export freeze reports.” |
| F-7-4 | Fixed: README heading is “What Freeze Capsule records.” |
| F-8-1 | Fixed: normal Linux removal names and tests both documented state paths. |

### Earlier verification reports

| Earlier finding | Current proof |
| --- | --- |
| Demo banner controls below 44 px | Fixed: all current route controls pass the live 390 px measurement. |
| Hashed assets lacked immutable caching | Fixed: live hashed JavaScript returns one-year `immutable`; HTML revalidates. |
| `watchdog-gap` lacked a tagged claim test | Fixed: the exact tagged command passed independently and in the full suite. |
| Published release could not be identified as the candidate | **Reopened as F-10-1:** the release is identifiable as older commit `73390fd`, not current implementation `05c6e7b`. |

Review 9 and verification 2 recorded no findings. The polish ledgers contain
repair mappings rather than new finding IDs; their referenced repairs were
covered by the rows above.

## Missed leverage

No obvious AI, sync, import, or additional export step belongs in this product.
Sending local freeze evidence to a model would weaken the stated privacy
boundary. Markdown and JSON already cover the useful export paths.

## Required next step

Publish all installer assets from the implementation candidate, install that
release in a clean consumer environment, and rerun `sample-fixture` against the
installed binary. The review can be PASS only after F-10-1 is closed with no
new finding and no untested claim.
