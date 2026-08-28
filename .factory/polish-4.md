# Polish round 4 — Freeze Capsule

Candidate `784aaa1512ead50241ae3f2d985aefa99bfead46` and review commit
`81748d493104f4ad6e6f7d2053fc183656e63d4b` were repaired in implementation
commit `8c71ecc`. Every earlier review and polish record was rechecked.

## Evidence key

- **Clean claims:** all 26 exact commands in `.factory/claims.json` passed from
  `/tmp/freeze-capsule-polish4-NeB2JQ/repo`.
- **Full suite:** clean-clone `npm test` passed 10 Rust tests, the watchdog
  integration, and 35 Playwright tests. Clippy, release build, site build, and
  npm audit also passed.
- **Screens:** `.factory/evidence/home-390-polish-4.png`,
  `.factory/evidence/demo-390-polish-4.png`,
  `.factory/evidence/live-demo-390-polish-4.png`, and
  `.factory/evidence/404-390-polish-4.png`.
- **Live:** <https://freeze-capsule.sociobot.in/>,
  <https://freeze-capsule.sociobot.in/demo?demo=1>,
  <https://freeze-capsule.sociobot.in/privacy>,
  <https://freeze-capsule.sociobot.in/terms>, and the HTTP 404 at
  <https://freeze-capsule.sociobot.in/missing-sheet>.
- **Accessibility/performance:** live URL verifier had no console errors; Axe
  4.13 reported zero violations on five routes; mobile Lighthouse scored 100
  in performance, accessibility, best practices, and SEO.

## Review 1 mapping

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | One landing click opens a populated, fixture-derived report excerpt inside the phone viewport. | `@claim:sample-report`; live demo screen |
| F-1-2 | Reset and every demo exit clear only `demo:` keys; real markers survive. | `@claim:demo-private`; live reset/exit check |
| F-1-3 | Browser output is regenerated from the real command-line demo report. | `@claim:sample-fixture` |
| F-1-4 | Network/privacy wording remains limited to the exercised isolated demo. | `@claim:cli-local-only` |
| F-1-5 | Unknown live URLs return the complete designed shell with HTTP 404. | live `/missing-sheet`; 404 screenshot |
| F-1-6 | Demo, Back, and Forward focus the new route heading. | keyboard route test; live focus check |
| F-1-7 | Every route sets its own title, description, canonical, OG, and Twitter data. | route accessibility test; live metadata check |
| F-1-8 | Home outcome and three facts end by y=583 at 390×844. | mobile test; home screenshot |
| F-1-9 | Unresolved links name GitHub; resolved links point to the named files. | release browser tests; live link crawl |
| F-1-10 | The unsupported one-binary promise remains absent. | copy audit |
| F-1-11 | Linux collector requests every named source. | `@claim:linux-live-capture` |
| F-1-12 | Unsupported cross-platform capability wording remains absent. | README audit |
| F-1-13 | A suspended watcher preserves the previous completed snapshot. | `@claim:hard-freeze-limit` |
| F-1-14 | Permission-limited sources stay named and reportable. | `@claim:limited-source-report` |
| F-1-15 | Missing commands and unreadable sources stay in a usable report. | `@claim:limited-source-report` |
| F-1-16 | The printed hotkey command creates isolated retained evidence. | `@claim:hotkey-capture` |
| F-1-17 | Both real installer scripts accept valid checksums and reject tampered checksums before copying. | `@claim:installer-checksum`; live installer check |
| F-1-18 | Untested `.deb`/`.rpm` availability prose remains absent. | README audit |
| F-1-19 | Documented list and report JSON are parsed end to end. | `@claim:json-output` |
| F-1-20 | Journal, kernel, graphics, connector, process, and session collection are asserted. | `@claim:linux-live-capture` |
| F-1-21 | The untested 96 KiB public statement remains absent. | README audit |
| F-1-22 | Encryption round trip, nonce layout, and 32-byte key are exercised. | `@claim:encryption-format` |
| F-1-23 | Unix key mode is asserted as 0600. | `@claim:key-permissions` |
| F-1-24 | Plain snapshot-slot wording is backed by a count test. | `@claim:current-snapshot` |
| F-1-25 | Unsupported version-floor wording remains absent. | README audit |
| F-1-26 | The site output path is explicit and asserted after a real build. | `@claim:build-output` |
| F-1-27 | The release binary path is explicit and asserted after a real release build. | `@claim:build-output` |
| F-1-28 | The Playwright browser recovery command remains accurate. | clean-clone README/test check |
| F-1-29 | The unsupported “only on Actions” statement remains absent. | README audit |
| F-1-30 | Broad output claims were narrowed to the parsed workflow job declaration. | `@claim:release-workflow-declaration` |
| F-1-31 | Copy now says signing is not configured; executable workflow steps are checked for signing tools. | `@claim:release-workflow-declaration` |
| F-1-32 | Normal capture creates one key and evidence below isolated XDG state. | `@claim:normal-state-directory` |
| F-1-33 | All static routes are checked for cookies, storage, tracking, and foreign requests. | `@claim:site-no-tracking`; live request log |
| F-1-34 | GitHub release data is requested only after the explicit check action. | `@claim:release-lookup-request` |
| F-1-35 | Every package link names GitHub navigation and resolves after lookup. | live link crawl |
| F-1-36 | The controlled Linux source test covers every documented data category. | `@claim:linux-live-capture` |
| F-1-37 | Unsupported exact deletion-path prose remains absent. | privacy audit |
| F-1-38 | Unsupported uninstall-retention prose remains absent. | privacy audit |
| F-1-39 | The redaction fixture retains a documented hardware identifier. | `@claim:redaction-limits` |
| F-1-40 | MIT license and warranty text are both asserted. | `@claim:free-license` |
| F-1-41 | The evidence-process heading names Freeze Capsule and its job. | copy audit |
| F-1-42 | The pause step uses direct snapshot language. | copy audit |
| F-1-43 | The report step says “Create a redacted report.” | copy audit |
| F-1-44 | “Start and check the watcher” names the post-install task. | copy audit |
| F-1-45 | The 90-second watcher pause is described in user language. | README audit |
| F-1-46 | Source descriptions remain split below 22 words. | copy audit |
| F-1-47 | “Background watcher” is defined once; “watcher” is then used consistently. | README terminology audit |
| F-1-48 | “Freeze” and defined “hard freeze” now also replace the last sample/source “hard lock” text. | generated demo fixture; copy audit |
| F-1-49 | Least-privilege jargon remains absent from user copy. | README audit |
| F-1-50 | Both sample actions name the report result. | `@claim:sample-report` |

## Review 2 mapping

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-2-1 | The clean full quality gate passes. | clean-clone `npm test`: 35 browser tests |
| F-2-2 | Static 404 retains skip link, Install nav, icons, social metadata, and full footer. | 404 shell test; live 404 |
| F-2-3 | Linux data collection is declared and exercised. | `@claim:linux-live-capture` |
| F-2-4 | Unsupported macOS/Windows command promise remains absent. | README audit |
| F-2-5 | Watcher suspension behavior is declared and exercised. | `@claim:hard-freeze-limit` |
| F-2-6 | Limited-source behavior is declared and exercised. | `@claim:limited-source-report` |
| F-2-7 | Hotkey capture is declared and exercised. | `@claim:hotkey-capture` |
| F-2-8 | Both installer success and rejection paths now execute. | `@claim:installer-checksum` |
| F-2-9 | Unsupported release-page availability prose remains absent. | README audit |
| F-2-10 | Structured command output is declared and parsed. | `@claim:json-output` |
| F-2-11 | Every named collection source is asserted. | `@claim:linux-live-capture` |
| F-2-12 | Encryption details are exercised. | `@claim:encryption-format` |
| F-2-13 | Key permissions are exercised. | `@claim:key-permissions` |
| F-2-14 | Current-snapshot wording and saved-slot behavior remain direct and tested. | `@claim:current-snapshot` |
| F-2-15 | The over-broad artifact/signature claim was replaced by a structurally parsed workflow declaration. | `@claim:release-workflow-declaration` |
| F-2-16 | Normal local state behavior is exercised. | `@claim:normal-state-directory` |
| F-2-17 | Whole-site no-tracking behavior is exercised. | `@claim:site-no-tracking` |
| F-2-18 | Explicit GitHub lookup timing and origin are exercised. | `@claim:release-lookup-request` |
| F-2-19 | Unsupported package-removal statement remains absent. | privacy audit |
| F-2-20 | A retained hardware detail demonstrates the redaction boundary. | `@claim:redaction-limits` |
| F-2-21 | Public copy uses “included command-line sample,” not CLI/fixture jargon. | copy audit |

## Review 3 mapping

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-3-1 | Privacy, Home, Back, Forward, Install, and a real 404 all clear `demo:` state while preserving real markers. | `@claim:demo-private`; live route/storage check |

## Review 4 mapping

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-4-1 | A compact report excerpt is rendered before the replay terminal. Its four rows end at y=551 on the live 390×844 viewport. | `@claim:sample-report`; live demo screenshot |
| F-4-2 | A local fixture server feeds valid and changed checksums to both real installer scripts; all four outcomes are asserted. | `@claim:installer-checksum` |
| F-4-3 | The public claim now describes the workflow declaration, which is parsed as YAML; it no longer claims locally unobserved artifacts or signatures. | `@claim:release-workflow-declaration`; live v0.1.1 asset check |
| F-4-4 | Explicit site and binary paths have a real build-output claim. | `@claim:build-output` |
| F-4-5 | Clipboard rejection is caught and announces a manual-copy recovery step without a page error. | clipboard-denial Playwright test; live denied-permission check |
| F-4-6 | Lookup failure now says the check failed and points to the release page without inventing a cause. | release-fallback test; live aborted-request check |
| F-4-7 | Hero label is now “Linux freeze evidence tool.” | copy audit; home screenshot |
| F-4-8 | Caption now names the four evidence sources without a figure number. | copy audit; home screenshot |
| F-4-9 | “Detail A” was removed; the useful sample label remains. | copy audit |
| F-4-10 | “Sequence / 03” became “Three steps.” | copy audit |
| F-4-11 | “Installation plate” was removed. | copy audit |
| F-4-12 | “Boundary notes” was removed. | copy audit |
| F-4-13 | README first defines “background watcher.” | README audit |
| F-4-14 | Homebrew heading now names the install result and formula condition. | README audit |
| F-4-15 | Scoop heading now names installation and explains the bucket. | README audit |
| F-4-16 | README and command output say the watcher collects real system data only on Linux. | README/source audit |
| F-4-17 | Procedure heading now says “List and export reports after a freeze or reboot.” | README audit |
| F-4-18 | 404 label is “Page not found / 404.” | 404 screenshot; live 404 |
| F-4-19 | Both SPA and static 404 headings say “Page not found.” | 404 test; live 404 |
| F-4-20 | 404 action says “Return to the home page.” | 404 screenshot |
| F-4-21 | Privacy label is “Privacy policy.” | live `/privacy` |
| F-4-22 | Terms label is “Terms.” | live `/terms` |
| F-4-23 | Terms h1 is “Terms for using Freeze Capsule.” | live `/terms` metadata check |

## Result

No finding remains open. The deployed site serves the implementation asset
`index-N_uPf4SV.js`; all intended live routes and resolved v0.1.1 package links
return their expected status. The blueprint identity and original art remain.
