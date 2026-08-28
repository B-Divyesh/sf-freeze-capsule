# Polish round 2 — Freeze Capsule

Candidate repaired from `5391894628495b71c192c26e5f15448f3fa31556`.

## Evidence key

- **Suite:** `npm test -- --workers=1` (10 Rust tests, watchdog integration, 33 Playwright tests); `cargo clippy --all-targets -- -D warnings`; `cargo build --release`; `npm run build`.
- **Claims:** every command in `.factory/claims.json`, run by the suite from a fresh clone after `npm ci`.
- **Screens:** `.factory/evidence/home-390.png`, `.factory/evidence/demo-390.png`, and `.factory/evidence/404-390.png`.
- **Local URLs:** `http://127.0.0.1:4173/`, `/demo?demo=1`, `/privacy`, `/terms`, and `/missing-sheet` (the static host returns the designed 404 through `staticwebapp.config.json`). Production recheck is recorded in the handoff after deployment.

## Review 1 mapping

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | Landing enters seeded `/demo?demo=1`; report is already visible. | `@claim:sample-report`; `demo-390.png` |
| F-1-2 | Demo exit clears every `demo:` key and takes the visitor to Install. | `@claim:demo-private` |
| F-1-3 | Browser asset is regenerated from `freeze-capsule --json demo`. | `@claim:sample-fixture` |
| F-1-4 | Privacy wording is narrowed to the exercised demo and network-blocked test. | `@claim:cli-local-only` |
| F-1-5 | Static 404 uses the proper override, complete shell, metadata, and footer. | 404 shell test; `404-390.png` |
| F-1-6 | Back/Forward focuses and announces the new route heading. | route-focus Playwright test |
| F-1-7 | Every SPA route updates title, description, canonical, OG, and Twitter metadata. | route/axe Playwright test |
| F-1-8 | Copy precedes art on phones; outcome and facts fit at 390×844. | mobile Playwright test; `home-390.png` |
| F-1-9 | Unresolved package links explicitly say they open GitHub. | link labels; release fallback test |
| F-1-10 | The unsupported one-binary assertion remains removed. | copy audit |
| F-1-11 | Linux collector source contract is tested. | `@claim:linux-live-capture` |
| F-1-12 | Unsupported cross-platform command promise is removed. | README and install-panel audit |
| F-1-13 | Suspended watcher behavior is tested and disclosed. | `@claim:hard-freeze-limit` |
| F-1-14 | Controlled unavailable source remains visible in a report. | `@claim:limited-source-report` |
| F-1-15 | Controlled missing command and unreadable directory remain reportable. | `@claim:limited-source-report` |
| F-1-16 | Printed hotkey command is executed against isolated storage. | `@claim:hotkey-capture` |
| F-1-17 | POSIX and PowerShell checksum comparisons are regression checked. | `@claim:installer-checksum` |
| F-1-18 | Unsupported release-page asset availability promise is removed. | README audit |
| F-1-19 | Documented list/report JSON output is parsed end to end. | `@claim:json-output` |
| F-1-20 | Linux source set is asserted by collector test. | `@claim:linux-live-capture` |
| F-1-21 | The untested 96 KiB public assertion remains absent. | README audit |
| F-1-22 | Format test verifies magic, 24-byte nonce position, 32-byte key, and round trip. | `@claim:encryption-format` |
| F-1-23 | Unix key mode is asserted as 0600. | `@claim:key-permissions` |
| F-1-24 | Plain-language rolling-snapshot wording and slot-count test added. | `@claim:current-snapshot` |
| F-1-25 | Unsupported version-floor claim remains removed. | README audit |
| F-1-26 | Build output is produced by `npm run build`. | build evidence |
| F-1-27 | Release binary is produced by `cargo build --release`. | build evidence |
| F-1-28 | Accurate Playwright install guidance remains documented. | README audit |
| F-1-29 | Unsupported “only on Actions” assertion remains removed. | README audit |
| F-1-30 | Workflow matrix and asset generation are checked. | `@claim:release-artifacts` |
| F-1-31 | Unsigned macOS/Windows state is explicit in workflow and README. | `@claim:release-artifacts` |
| F-1-32 | Normal XDG state path, capsule, and single key are tested. | `@claim:normal-state-directory` |
| F-1-33 | All static routes are audited for cookies, storage, and external requests. | `@claim:site-no-tracking` |
| F-1-34 | GitHub API request is asserted to occur only after the button action. | `@claim:release-lookup-request` |
| F-1-35 | Package links remain honestly labelled GitHub navigation. | release-link UI test |
| F-1-36 | Collection-source language is covered by the Linux collector claim. | `@claim:linux-live-capture` |
| F-1-37 | Unsupported exact deletion-path claim remains removed. | privacy audit |
| F-1-38 | Unsupported uninstall-retention statement is removed. | privacy audit |
| F-1-39 | Redaction boundary is tested with retained PCI hardware detail. | `@claim:redaction-limits` |
| F-1-40 | MIT license/warranty remains checked. | `@claim:free-license` |
| F-1-41 | Plain first-screen wording remains intact. | `home-390.png`; mobile test |
| F-1-42 | Demo action names its sample result. | `@claim:sample-report` |
| F-1-43 | Demo storage namespace and reset/exit behavior remain isolated. | `@claim:demo-private` |
| F-1-44 | Route titles and metadata remain distinct. | route/axe Playwright test |
| F-1-45 | Focus restoration remains tested. | route-focus Playwright test |
| F-1-46 | 390px layout is tested with no horizontal overflow. | mobile Playwright test |
| F-1-47 | Legal links are present on app and static 404 shells. | 404 shell test |
| F-1-48 | Reduced-motion and focus behavior remain covered by browser QA. | route/axe and touch-target tests |
| F-1-49 | Hashed asset caching header remains asserted. | header configuration test |
| F-1-50 | Original blueprint identity and asset provenance remain unchanged. | `design.md`; screenshots |

## Review 2 mapping

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-2-1 | Fixed semantic mobile fact selectors; the report also wraps unbroken diagnostic lines. | full Suite; mobile Playwright test |
| F-2-2 | Added static 404 skip link, Install nav, Apple icon, OG image, and Twitter image. | 404 shell test; `404-390.png` |
| F-2-3 | Added Linux source-contract claim. | `@claim:linux-live-capture` |
| F-2-4 | Removed unverified macOS/Windows command capability statement. | README/install-panel audit |
| F-2-5 | Added real suspended-watcher claim. | `@claim:hard-freeze-limit` |
| F-2-6 | Added controlled unavailable-source report claim. | `@claim:limited-source-report` |
| F-2-7 | Added hotkey execution claim. | `@claim:hotkey-capture` |
| F-2-8 | Added installer checksum branch claim. | `@claim:installer-checksum` |
| F-2-9 | Removed unverified `.deb`/`.rpm` availability wording. | README audit |
| F-2-10 | Added end-to-end structured JSON claim. | `@claim:json-output` |
| F-2-11 | Added collector source contract. | `@claim:linux-live-capture` |
| F-2-12 | Added encryption layout/key-size claim. | `@claim:encryption-format` |
| F-2-13 | Added Unix 0600 key-mode claim. | `@claim:key-permissions` |
| F-2-14 | Rewrote prebuffer in plain words and added retention-slot claim. | `@claim:current-snapshot` |
| F-2-15 | Added workflow artifact and unsigned-output claim; workflow labels declaration. | `@claim:release-artifacts` |
| F-2-16 | Added normal XDG state claim. | `@claim:normal-state-directory` |
| F-2-17 | Added all-static-route no-tracking claim. | `@claim:site-no-tracking` |
| F-2-18 | Added explicit-action GitHub request claim. | `@claim:release-lookup-request` |
| F-2-19 | Removed unsupported uninstall assertion. | privacy audit |
| F-2-20 | Added redaction-boundary fixture claim. | `@claim:redaction-limits` |
| F-2-21 | Replaced CLI/fixture wording with plain command-line language. | `home-390.png`; copy audit |
