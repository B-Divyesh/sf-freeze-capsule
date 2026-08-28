# Polish round 5 — Freeze Capsule

Repaired from candidate `9a18043c4d81df0f753315c25ca6d0a4496b8b59`
and adversarial-review commit `dc25244701464e892eb064ed177dc5dbfcbac9f7`.
The implementation repair is `9d99a35`.

## Evidence key

- **Clean clone:** `/tmp/freeze-capsule-round5-clean-tkeufz/repo`, cloned from
  local `main` at `9d99a35`. `npm ci` passed; all 27 exact commands from
  `.factory/claims.json` passed independently; `npm test -- --workers=1`
  passed (11 Rust tests, watchdog integration, 36 Playwright tests); clippy,
  locked release build, site build, and `npm audit --audit-level=moderate`
  passed. Full command log: `/tmp/freeze-capsule-round5-clean-2.log`.
- **Claim notation:** `C:<id>` is the exact test command recorded for that
  claim in `.factory/claims.json`, run in the clean clone above.
- **Local mobile screens:**
  `.factory/evidence/home-390-polish-5.png`,
  `.factory/evidence/demo-390-polish-5.png`, and
  `.factory/evidence/404-390-polish-5.png`.
- **Live mobile screens:**
  `.factory/evidence/live-home-390-polish-5.png`,
  `.factory/evidence/live-demo-390-polish-5.png`, and
  `.factory/evidence/live-404-390-polish-5.png`.
- **Live recheck:** every URL in the final column was opened cold after the
  static deployment. `/opt/fleet/lib/verify-url.sh` passed with evidence in
  `.factory/evidence/live-polish-5/verify.json`; live axe reported zero
  serious/critical violations on all six checked routes. The live demo rows
  end at y=551 on a 390×844 viewport; reset leaves only `demo:loaded`, exit
  clears every `demo:` key, and the GitHub API request occurs once only after
  the explicit package-check action. Full details are in `.factory/handoff.md`.

## Review 1 ledger

| Finding ID | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | The landing action opens seeded `/demo?demo=1` with a populated report; replay is optional. | C:sample-report; `demo-390-polish-5.png`; live `/demo?demo=1` |
| F-1-2 | Reset and every exit remove only `demo:` state and the banner sends visitors to Install. | C:demo-private; live `/demo?demo=1` → `/`, `/privacy`, `/#install` |
| F-1-3 | The browser report is regenerated from the included command-line demo. | C:sample-fixture; live `/demo?demo=1` |
| F-1-4 | Network/privacy wording is limited to the isolated demo behavior actually exercised. | C:cli-local-only; live `/privacy` |
| F-1-5 | Unknown URLs return the complete designed HTTP 404; standalone 404 has the shared shell. | full browser suite; `404-390-polish-5.png`; live `/missing-sheet` |
| F-1-6 | Push, Back, and Forward focus and announce the new route heading. | full browser suite; live `/` ↔ `/demo?demo=1` |
| F-1-7 | Every app route and the 404 set route-specific title, description, canonical, OG, Twitter, and robots data. | full browser suite; live `/`, `/demo?demo=1`, `/privacy`, `/terms`, `/missing-sheet` |
| F-1-8 | Phone home puts the outcome and all three facts before the art. | full browser suite; `home-390-polish-5.png`; live `/` |
| F-1-9 | Unresolved package links name GitHub; resolved links become direct package downloads after an explicit lookup. | full browser suite; live `/#install` |
| F-1-10 | The unsupported one-binary assertion remains absent. | copy audit; live `/` |
| F-1-11 | Linux collection sources are a declared, tested behavior. | C:linux-live-capture; live `/` and README |
| F-1-12 | The unsupported cross-platform command promise remains absent. | README/copy audit; live `/` |
| F-1-13 | The hard-freeze limitation and retained prior snapshot are exercised. | C:hard-freeze-limit; live `/` and `/terms` |
| F-1-14 | Permission-limited log access remains named in a usable report. | C:limited-source-report; live `/` |
| F-1-15 | Missing commands and unreadable sources remain named in a usable report. | C:limited-source-report; live `/` |
| F-1-16 | The printed hotkey command creates isolated retained evidence. | C:hotkey-capture; README |
| F-1-17 | Both real installers accept a valid checksum and reject a changed checksum before copying. | C:installer-checksum; live `/install.sh`, `/install.ps1` |
| F-1-18 | The unverified release-page asset-availability sentence remains absent. | README audit |
| F-1-19 | Documented list and report JSON output are parsed end to end. | C:json-output; README |
| F-1-20 | Every documented journal, kernel, graphics, connector, process, and session source is asserted. | C:linux-live-capture; README |
| F-1-21 | The untested 96 KiB public assertion remains absent. | README audit |
| F-1-22 | Encryption layout, nonce length, key size, and round trip are exercised. | C:encryption-format; README |
| F-1-23 | Unix key mode is asserted as `0600`. | C:key-permissions; README |
| F-1-24 | Current-snapshot wording is plain and the saved-slot distinction is counted. | C:current-snapshot; README |
| F-1-25 | The unsupported version-floor statement remains absent. | README audit |
| F-1-26 | The site output path is explicitly built and asserted. | C:build-output; README |
| F-1-27 | The release binary path is explicitly built and asserted. | C:build-output; README |
| F-1-28 | Playwright recovery instructions remain accurate. | clean-clone `npm ci` and browser suite; README |
| F-1-29 | The unsupported “only on GitHub Actions” assertion remains absent. | README audit |
| F-1-30 | Release wording is narrowed to the parsed workflow declaration. | C:release-workflow-declaration; README |
| F-1-31 | The declaration test checks that signing tools are not configured. | C:release-workflow-declaration; README |
| F-1-32 | Normal capture creates one key and evidence below isolated XDG state. | C:normal-state-directory; live `/privacy` |
| F-1-33 | Static routes are checked for cookies, storage, tracking, and foreign requests. | C:site-no-tracking; live `/`, `/demo?demo=1`, `/privacy`, `/terms` |
| F-1-34 | GitHub release lookup occurs only after the explicit check action. | C:release-lookup-request; live `/#install` |
| F-1-35 | Package-link destinations remain honest before and after lookup. | full browser suite; live `/#install` |
| F-1-36 | The controlled Linux source test covers each documented data category. | C:linux-live-capture; README |
| F-1-37 | The unsupported exact deletion-path promise remains absent. | privacy audit; live `/privacy` |
| F-1-38 | The unsupported uninstall-retention assertion remains absent. | privacy audit; live `/privacy` |
| F-1-39 | A retained hardware identifier demonstrates the redaction boundary. | C:redaction-limits; live `/privacy` |
| F-1-40 | MIT license and warranty text are asserted. | C:free-license; live `/terms` |
| F-1-41 | The evidence workflow heading names Freeze Capsule and its job. | copy audit; live `/` |
| F-1-42 | The pause step uses direct snapshot language. | copy audit; live `/` |
| F-1-43 | The report step says “Create a redacted report.” | copy audit; live `/` |
| F-1-44 | “Start and check the watcher” names the post-install task. | copy audit; live `/` |
| F-1-45 | The 90-second pause is described in user language. | README audit |
| F-1-46 | Source descriptions are split below 22 words. | copy audit; README |
| F-1-47 | “Background watcher” defines the process on first use; later references consistently use “watcher.” | copy audit; live `/` |
| F-1-48 | “Freeze” is the consistent event term; “hard freeze” names the stronger limit. | copy audit; live `/` and `/terms` |
| F-1-49 | Least-privilege jargon remains absent from user copy. | copy audit; README |
| F-1-50 | Both sample actions explicitly name the report result. | C:sample-report; `demo-390-polish-5.png`; live `/` |

## Review 2 ledger

| Finding ID | Change made | Evidence |
| --- | --- | --- |
| F-2-1 | Mobile semantic selectors and the full quality gate are deterministic. | clean-clone `npm test`; `home-390-polish-5.png` |
| F-2-2 | Static 404 has skip link, Install nav, icons, social metadata, legal links, and footer. | full browser suite; `404-390-polish-5.png`; live `/missing-sheet` |
| F-2-3 | Linux data collection is declared and exercised. | C:linux-live-capture; README |
| F-2-4 | The unsupported macOS/Windows command promise remains absent. | README audit |
| F-2-5 | Watcher suspension behavior is declared and exercised. | C:hard-freeze-limit |
| F-2-6 | Limited-source behavior is declared and exercised. | C:limited-source-report |
| F-2-7 | Hotkey capture is declared and exercised. | C:hotkey-capture |
| F-2-8 | Both installer success and rejection paths execute. | C:installer-checksum |
| F-2-9 | Unsupported release-page package wording remains absent. | README audit |
| F-2-10 | Structured command output is declared and parsed. | C:json-output |
| F-2-11 | Every named collection source is asserted. | C:linux-live-capture |
| F-2-12 | Encryption details are exercised. | C:encryption-format |
| F-2-13 | Key permissions are exercised. | C:key-permissions |
| F-2-14 | Current-snapshot wording and saved-slot behavior remain direct and tested. | C:current-snapshot |
| F-2-15 | The over-broad artifact/signature claim is replaced by a parsed workflow declaration. | C:release-workflow-declaration |
| F-2-16 | Normal local state behavior is exercised. | C:normal-state-directory; live `/privacy` |
| F-2-17 | Whole-site no-tracking behavior is exercised. | C:site-no-tracking; live static routes |
| F-2-18 | Explicit GitHub lookup timing and origin are exercised. | C:release-lookup-request; live `/#install` |
| F-2-19 | Unsupported package-removal prose remains absent. | privacy audit |
| F-2-20 | A retained hardware detail demonstrates the redaction boundary. | C:redaction-limits; live `/privacy` |
| F-2-21 | Public copy uses “included command-line sample,” not CLI/fixture jargon. | copy audit; live `/` and `/demo?demo=1` |

## Reviews 3–5 ledger

| Finding ID | Change made | Evidence |
| --- | --- | --- |
| F-3-1 | Privacy, Home, Back, Forward, Install, and 404 exits clear `demo:` state while preserving real markers. | C:demo-private; live `/demo?demo=1` exits |
| F-4-1 | A compact populated evidence excerpt precedes replay controls on the phone demo. | C:sample-report; `demo-390-polish-5.png`; live `/demo?demo=1` |
| F-4-2 | Local archive fixtures execute valid and tampered checksum paths for both installer scripts. | C:installer-checksum |
| F-4-3 | The public workflow claim is narrowed to a structurally parsed declaration. | C:release-workflow-declaration |
| F-4-4 | Documented site and binary paths have a real build-output assertion. | C:build-output |
| F-4-5 | Clipboard rejection is caught and announces manual-copy recovery without a page error. | full browser suite; live `/#install` |
| F-4-6 | Package lookup failure says the check failed and links to the release page without inventing a cause. | full browser suite; live `/#install` |
| F-4-7 | Hero label says “Linux freeze evidence tool.” | copy audit; `home-390-polish-5.png`; live `/` |
| F-4-8 | Hero caption names the evidence sources without a decorative figure number. | copy audit; `home-390-polish-5.png`; live `/` |
| F-4-9 | “Detail A” remains removed. | copy audit; live `/` |
| F-4-10 | Decorative sequence lore became “Three steps.” | copy audit; live `/` |
| F-4-11 | “Installation plate” remains removed. | copy audit; live `/` |
| F-4-12 | “Boundary notes” remains removed. | copy audit; live `/` |
| F-4-13 | README first defines “background watcher.” | README audit |
| F-4-14 | The Homebrew heading names the install result and formula condition. | README audit |
| F-4-15 | The Scoop heading names installation and explains the bucket. | README audit |
| F-4-16 | The Linux-only collection boundary is declared and tested. | C:linux-only-capture; README |
| F-4-17 | The report procedure heading names its task. | README audit |
| F-4-18 | 404 label is “Page not found / 404.” | `404-390-polish-5.png`; live `/missing-sheet` |
| F-4-19 | SPA and static 404 headings say “Page not found.” | full browser suite; live `/missing-sheet` |
| F-4-20 | The 404 action says “Return to the home page.” | `404-390-polish-5.png`; live `/missing-sheet` |
| F-4-21 | Privacy label is “Privacy policy.” | full browser suite; live `/privacy` |
| F-4-22 | Terms label is “Terms.” | full browser suite; live `/terms` |
| F-4-23 | Terms heading is “Terms for using Freeze Capsule.” | full browser suite; live `/terms` |
| F-5-1 | Added an exact `linux-only-capture` claim and a platform-injected Rust regression. The macOS and Windows paths produce only an unavailable platform result; the injected Linux collector panics if called. | C:linux-only-capture; README |
| F-5-2 | Landing first use now says “The background watcher records a ten-minute window every 30 seconds.” | copy audit; `home-390-polish-5.png`; live `/` |

## Result

No blocking, major, minor, or earlier finding remains open. The blueprint
drafting-sheet visual system and its original generated capsule art remain
unchanged. The catalog description is now the verb-first, 55-character sentence
“Capture Linux freeze clues before a reboot erases them.”
