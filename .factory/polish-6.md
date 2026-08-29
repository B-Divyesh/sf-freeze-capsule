# Polish round 6 — Freeze Capsule

Repaired from candidate `6bb01e406f6957da62ba42d776bcfff6e90847de` and
cumulative review record through `01cf34a303c08af1b31abe9bc707ae0535ed56e8`.
The implementation repair is `9734754`.

## Evidence key

- **C:`id`** is the exact `.factory/claims.json` command, independently run
  from clean clone `/tmp/freeze-capsule-round6-clean-kPHsEj/repo`. All 27
  passed; the command ledger is `/tmp/freeze-capsule-round6-claims.log`.
- **Clean suite** is the same clone passing `npm test` (11 Rust tests, watchdog
  integration, 38 Playwright tests), `cargo clippy --locked -- -D warnings`,
  `cargo build --locked --release`, and `npm audit --audit-level=moderate`.
- **Live route audit** is `.factory/evidence/live-polish-6/live-route-audit.json`.
  It cold-checks status, metadata, landmarks, overflow, application console
  errors, Axe, and every visible `a`, `button`, and `summary` at 390 px.
- **Live demo/hash audit** is `.factory/evidence/live-polish-6/live-demo-hash-audit.json`.
  Screens are `live-home-390-polish-6.png`, `live-demo-390-polish-6.png`, and
  `live-404-390-polish-6.png` in that directory. Live URL:
  <https://freeze-capsule.sociobot.in>.
- **Mobile Lighthouse** is `.factory/evidence/live-polish-6/lighthouse-mobile.json`:
  100 performance, 100 accessibility, FCP 0.8 s, LCP 1.1 s, CLS 0, TBT 60 ms.

## Review 1 ledger

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | Landing CTA enters a pre-populated isolated report. | C:`sample-report`; live demo audit |
| F-1-2 | Reset and every exit clear only `demo:` state; install exits to the real section. | C:`demo-private`; live demo/hash audit |
| F-1-3 | Browser fixture is generated from the command-line demo. | C:`sample-fixture` |
| F-1-4 | Privacy language is limited to the network-blocked demo. | C:`cli-local-only` |
| F-1-5 | Unknown routes return complete designed HTTP 404. | live route audit |
| F-1-6 | Push, Back, and Forward restore focus and announce the destination. | Clean suite; live demo/hash audit |
| F-1-7 | App routes have own metadata; static 404 is deliberate noindex. | Clean suite; live route audit |
| F-1-8 | Phone hero puts outcome and all three facts before the fold. | Clean suite; live demo/hash audit |
| F-1-9 | Package links honestly name GitHub before lookup and downloads after it. | Clean suite; live URL install section |
| F-1-10 | Unsupported one-binary assertion was removed. | copy audit |
| F-1-11 | Linux collection is declared and controlled-source tested. | C:`linux-live-capture` |
| F-1-12 | Unsupported cross-platform command promise was removed. | README/copy audit |
| F-1-13 | Hard-freeze limitation and retained snapshot are tested. | C:`hard-freeze-limit` |
| F-1-14 | Permission-limited log access is named in usable output. | C:`limited-source-report` |
| F-1-15 | Missing sources remain explicit in usable output. | C:`limited-source-report` |
| F-1-16 | Printed hotkey command creates retained evidence. | C:`hotkey-capture` |
| F-1-17 | Both installer scripts accept valid and reject changed checksums. | C:`installer-checksum` |
| F-1-18 | Unsupported release-page availability prose was removed. | README audit |
| F-1-19 | Documented list and report output parse as JSON. | C:`json-output` |
| F-1-20 | Every named Linux source is exercised with controlled sources. | C:`linux-live-capture` |
| F-1-21 | Untested 96 KiB public assertion was removed. | README audit |
| F-1-22 | Encryption layout, nonce, key size, and round trip are exercised. | C:`encryption-format` |
| F-1-23 | Unix owner-only key permissions are exercised. | C:`key-permissions` |
| F-1-24 | Current snapshot and saved-slot distinction are direct and measured. | C:`current-snapshot` |
| F-1-25 | Unsupported tool-version floor was removed. | README audit |
| F-1-26 | Site output path is built and asserted. | C:`build-output` |
| F-1-27 | Release binary path is built and asserted. | C:`build-output` |
| F-1-28 | Playwright browser recovery instructions are accurate. | Clean suite |
| F-1-29 | Unsupported Actions-only assertion was removed. | README audit |
| F-1-30 | Release copy is narrowed to a parsed workflow declaration. | C:`release-workflow-declaration` |
| F-1-31 | Workflow declaration test proves no signing commands are configured. | C:`release-workflow-declaration` |
| F-1-32 | Normal capture puts one key and capsules below state storage. | C:`normal-state-directory` |
| F-1-33 | Static routes are checked for cookies, storage, tracking, and foreign requests. | C:`site-no-tracking` |
| F-1-34 | GitHub lookup happens only after explicit action. | C:`release-lookup-request` |
| F-1-35 | Package destinations are honest before and after lookup. | Clean suite; live install section |
| F-1-36 | Documented categories are covered by controlled Linux capture. | C:`linux-live-capture` |
| F-1-37 | Unsupported exact deletion-path promise was removed. | privacy/copy audit |
| F-1-38 | Unsupported uninstall-retention assertion was removed. | privacy/copy audit |
| F-1-39 | Redaction retains a hardware detail for review. | C:`redaction-limits` |
| F-1-40 | MIT license and warranty text are both asserted. | C:`free-license` |
| F-1-41 | Workflow heading names Freeze Capsule and pre-freeze evidence. | copy audit |
| F-1-42 | Pause step uses direct snapshot language. | copy audit |
| F-1-43 | Report step says “Create a redacted report.” | copy audit |
| F-1-44 | Post-install heading names watcher work. | copy audit |
| F-1-45 | 90-second watcher pause is described in user language. | README audit |
| F-1-46 | Source prose is split below 22 words. | copy audit |
| F-1-47 | “Background watcher” is defined once; later use is consistent. | copy audit |
| F-1-48 | “Freeze” and defined “hard freeze” are consistent. | copy audit |
| F-1-49 | Least-privilege jargon is absent from public copy. | README audit |
| F-1-50 | Both sample actions name the report result. | C:`sample-report`; live demo audit |

## Review 2 ledger

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-2-1 | Full quality gate is deterministic and passes from a clean clone. | Clean suite |
| F-2-2 | Static 404 has skip link, header, icons, social data, legal footer, and build id. | Clean suite; live route audit |
| F-2-3 | Linux capture is listed and controlled-source tested. | C:`linux-live-capture` |
| F-2-4 | Unsupported macOS/Windows command claim remains absent. | README audit |
| F-2-5 | Paused-watcher behavior is listed and tested. | C:`hard-freeze-limit` |
| F-2-6 | Limited-source output is listed and tested. | C:`limited-source-report` |
| F-2-7 | Hotkey capture is listed and tested. | C:`hotkey-capture` |
| F-2-8 | Installer verification paths execute against local archives. | C:`installer-checksum` |
| F-2-9 | Unsupported release-page wording remains absent. | README audit |
| F-2-10 | Structured command output is listed and parsed. | C:`json-output` |
| F-2-11 | All named collection sources are asserted. | C:`linux-live-capture` |
| F-2-12 | Encryption details are exercised. | C:`encryption-format` |
| F-2-13 | Key permissions are exercised. | C:`key-permissions` |
| F-2-14 | Current snapshot is outside saved retention slots. | C:`current-snapshot` |
| F-2-15 | Public release wording is the structurally parsed declaration. | C:`release-workflow-declaration` |
| F-2-16 | Normal local state behavior is exercised. | C:`normal-state-directory` |
| F-2-17 | Whole-site no-tracking behavior is exercised. | C:`site-no-tracking` |
| F-2-18 | Explicit GitHub request timing and origin are exercised. | C:`release-lookup-request` |
| F-2-19 | Unsupported package-removal prose remains absent. | privacy audit |
| F-2-20 | Redaction limit retains hardware detail. | C:`redaction-limits` |
| F-2-21 | Public copy says command-line sample, not unexplained CLI/fixture jargon. | copy audit |

## Reviews 3–5 ledger

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-3-1 | Every ordinary demo exit clears demo state while preserving real state. | C:`demo-private`; live demo/hash audit |
| F-4-1 | Four evidence rows precede replay controls on phone. | C:`sample-report`; live demo screenshot |
| F-4-2 | Real POSIX and PowerShell installer paths accept and reject fixture archives. | C:`installer-checksum` |
| F-4-3 | Workflow claim says only what the parsed declaration proves. | C:`release-workflow-declaration` |
| F-4-4 | Site and release-binary paths have a build-output assertion. | C:`build-output` |
| F-4-5 | Clipboard denial has manual-copy recovery and no page error. | Clean suite |
| F-4-6 | Lookup failure gives a neutral recovery message. | Clean suite |
| F-4-7 | Hero label names the Linux evidence tool. | copy audit |
| F-4-8 | Hero caption names evidence sources without figure lore. | copy audit |
| F-4-9 | “Detail A” was removed. | copy audit |
| F-4-10 | Decorative sequence label became “Three steps.” | copy audit |
| F-4-11 | “Installation plate” was removed. | copy audit |
| F-4-12 | “Boundary notes” was removed. | copy audit |
| F-4-13 | README defines “background watcher” on first use. | README audit |
| F-4-14 | Homebrew heading names install result and condition. | README audit |
| F-4-15 | Scoop heading names install result and bucket condition. | README audit |
| F-4-16 | Linux-only collection boundary is direct and tested. | C:`linux-only-capture` |
| F-4-17 | Report procedure heading names its task. | README audit |
| F-4-18 | 404 label is “Page not found / 404.” | live 404 screenshot |
| F-4-19 | SPA and static 404 headings say “Page not found.” | live route audit |
| F-4-20 | 404 action says “Return to the home page.” | live 404 screenshot |
| F-4-21 | Privacy label is “Privacy policy.” | live route audit |
| F-4-22 | Terms label is “Terms.” | live route audit |
| F-4-23 | Terms h1 names Freeze Capsule. | live route audit |
| F-5-1 | Exact Linux-only capability claim and platform-injected regression were added. | C:`linux-only-capture` |
| F-5-2 | Landing first use says “background watcher.” | copy audit; live home screenshot |

## Review 6 ledger

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-6-1 | Hash-aware routing scrolls and focuses Install on initial load, header activation, Back, Forward, and demo exit. | Clean suite hash regression; live demo/hash audit |
| F-6-2 | Every app and static-404 target has a 44×44 px minimum; mobile Install is visible; static CSS CSP hash is verified. | Clean suite target/CSP regressions; live route audit (`undersized: []`) |
| F-6-3 | Hero facts now state tested price, local state storage, and no-network demo behavior. | Clean suite first-screen regression; live demo/hash audit (through y=613) |

## Result

No blocking, major, minor, or historical finding remains open. The deployed
site retains the blueprint drafting-sheet identity and original capsule art.
