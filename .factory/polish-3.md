# Polish round 3 — Freeze Capsule

Repaired from review candidate `9a1f58f7f8057f466e63e54daa74b9462ccc7fb1`.
The production repair commits are `e15a981`, `d9aeb4b`, `eacb17e`,
`bb60fc3`, `e70b3c5`, and `89416b2`.

## Evidence key

- **Claims:** every exact command declared in `.factory/claims.json`, from a
  fresh clone, plus `npm test -- --workers=1`.
- **Build:** `cargo clippy --all-targets -- -D warnings`,
  `cargo build --release`, and `npm run build`.
- **Screens:** `.factory/evidence/home-390-polish-3.png`,
  `.factory/evidence/demo-390-polish-3.png`, and
  `.factory/evidence/404-390-polish-3.png`.
- **Live:** <https://freeze-capsule.sociobot.in/>,
  <https://freeze-capsule.sociobot.in/demo?demo=1>,
  <https://freeze-capsule.sociobot.in/privacy>,
  <https://freeze-capsule.sociobot.in/terms>, and
  <https://freeze-capsule.sociobot.in/missing-sheet>.

## Review 1 mapping

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | Landing action opens a seeded report in one navigation. | `@claim:sample-report`; demo screen |
| F-1-2 | Every SPA exit and the standalone 404 clear all `demo:` keys. | `@claim:demo-private`; live demo → 404 |
| F-1-3 | Browser report is generated from the bundled command-line demo output. | `@claim:sample-fixture` |
| F-1-4 | Privacy copy is limited to the network-blocked isolated demo. | `@claim:cli-local-only` |
| F-1-5 | Explicit catch-all 404 returns the designed shell with HTTP 404. | live `/missing-sheet` status check |
| F-1-6 | Push, Back, and Forward focus and announce the route heading. | route-focus Playwright test |
| F-1-7 | App and static 404 titles, canonical, OG, Twitter, and robots fields are route-specific. | route/axe Playwright test |
| F-1-8 | Phone layout puts copy and all facts before art. | mobile Playwright test; home screen |
| F-1-9 | Unresolved package links honestly say they open GitHub. | release-link UI test |
| F-1-10 | Unsupported one-binary promise was removed. | copy audit |
| F-1-11 | Linux collection source contract is tested. | `@claim:linux-live-capture` |
| F-1-12 | Unsupported cross-platform command promise was removed. | README audit |
| F-1-13 | Hard-freeze limitation is disclosed and exercised. | `@claim:hard-freeze-limit` |
| F-1-14 | Permission-limited sources remain named in a report. | `@claim:limited-source-report` |
| F-1-15 | Missing commands and unreadable sources remain reportable. | `@claim:limited-source-report` |
| F-1-16 | Printed hotkey command creates retained evidence. | `@claim:hotkey-capture` |
| F-1-17 | POSIX and PowerShell checksum branches are asserted. | `@claim:installer-checksum` |
| F-1-18 | Untested package-availability promise was removed. | README audit |
| F-1-19 | Documented JSON results are parsed end to end. | `@claim:json-output` |
| F-1-20 | Each documented Linux source is asserted. | `@claim:linux-live-capture` |
| F-1-21 | Untested 96 KiB statement remains absent. | README audit |
| F-1-22 | Encryption file layout, nonce length, key size, and round trip are asserted. | `@claim:encryption-format` |
| F-1-23 | Unix local-key mode is asserted as 0600. | `@claim:key-permissions` |
| F-1-24 | Snapshot slot wording is plain and tested. | `@claim:current-snapshot` |
| F-1-25 | Unsupported version-floor statement was removed. | README audit |
| F-1-26 | Unnecessary build-output marketing statement was removed. | README audit |
| F-1-27 | Unnecessary binary-output marketing statement was removed. | README audit |
| F-1-28 | Browser-install recovery instruction is accurate. | README audit |
| F-1-29 | Unsupported “only on Actions” assertion was removed. | README audit |
| F-1-30 | Workflow outputs and manifests are asserted. | `@claim:release-artifacts` |
| F-1-31 | Unsigned macOS/Windows state is explicit and asserted. | `@claim:release-artifacts` |
| F-1-32 | Normal XDG state contains one key and captured evidence. | `@claim:normal-state-directory` |
| F-1-33 | Static routes are checked for cookies, storage, tracking, and foreign requests. | `@claim:site-no-tracking` |
| F-1-34 | GitHub API lookup occurs only after the explicit action. | `@claim:release-lookup-request` |
| F-1-35 | Download links visibly identify GitHub navigation. | release-link UI test |
| F-1-36 | Documented collection categories are covered by the Linux source test. | `@claim:linux-live-capture` |
| F-1-37 | Unsupported exact deletion-path statement was removed. | privacy audit |
| F-1-38 | Unsupported uninstall-retention statement was removed. | privacy audit |
| F-1-39 | Preserved hardware detail is demonstrated beside redaction. | `@claim:redaction-limits` |
| F-1-40 | MIT warranty text is asserted. | `@claim:free-license` |
| F-1-41 | Evidence section heading names Freeze Capsule and its job. | copy audit |
| F-1-42 | Snapshot-pause heading uses direct language. | copy audit |
| F-1-43 | Report step uses “Create a redacted report.” | copy audit |
| F-1-44 | Watcher action heading is standalone and direct. | copy audit |
| F-1-45 | README describes the pause trigger in user language. | README audit |
| F-1-46 | Source-description sentence is split below 22 words. | README audit |
| F-1-47 | “Watcher” is the one background-process term. | terminology table |
| F-1-48 | “Freeze” is consistent; “hard freeze” is the defined limit. | copy audit |
| F-1-49 | Least-privilege jargon was removed. | README audit |
| F-1-50 | Demo actions name the report result. | `@claim:sample-report` |

## Review 2 mapping

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-2-1 | Mobile semantic selectors and diagnostic wrapping are stable. | full Playwright suite |
| F-2-2 | Static 404 has full shared shell, metadata, icons, and legal links. | 404 shell test; 404 screen |
| F-2-3 | Linux live capture is an explicit tested claim. | `@claim:linux-live-capture` |
| F-2-4 | Unsupported macOS/Windows command claim was removed. | README audit |
| F-2-5 | Hard-freeze behavior is a declared testable claim. | `@claim:hard-freeze-limit` |
| F-2-6 | Limited-source behavior is a declared testable claim. | `@claim:limited-source-report` |
| F-2-7 | Hotkey capture is a declared testable claim. | `@claim:hotkey-capture` |
| F-2-8 | Installer checksum behavior is a declared testable claim. | `@claim:installer-checksum` |
| F-2-9 | Untested release-page package wording was removed. | README audit |
| F-2-10 | Structured command output is a declared testable claim. | `@claim:json-output` |
| F-2-11 | Collection-source wording is covered by the Linux claim. | `@claim:linux-live-capture` |
| F-2-12 | Encryption details are a declared testable claim. | `@claim:encryption-format` |
| F-2-13 | Key permissions are a declared testable claim. | `@claim:key-permissions` |
| F-2-14 | Current snapshot wording and slot behavior are plain and tested. | `@claim:current-snapshot` |
| F-2-15 | Workflow/signature detail is a declared testable claim. | `@claim:release-artifacts` |
| F-2-16 | Normal local state behavior is a declared testable claim. | `@claim:normal-state-directory` |
| F-2-17 | Whole-site tracking behavior is a declared testable claim. | `@claim:site-no-tracking` |
| F-2-18 | Release lookup timing and origin are a declared testable claim. | `@claim:release-lookup-request` |
| F-2-19 | Unsupported uninstall statement was removed. | privacy audit |
| F-2-20 | Redaction boundary is a declared testable claim. | `@claim:redaction-limits` |
| F-2-21 | “Fixture” and “CLI” wording became “included command-line demo.” | copy audit |

## Review 3 mapping

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-3-1 | Non-demo route rendering clears the demo namespace; static 404 has the same cleanup before its body. The 404 rule now returns a real 404 without helper-resource errors. | `@claim:demo-private`; live demo → Privacy, Home, Back, and 404 checks; live `/missing-sheet` HTTP 404 |

## Result

No review finding remains open. The blueprint drafting-sheet identity and
original generated capsule art remain intact.
