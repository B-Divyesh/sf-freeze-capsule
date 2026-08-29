# Freeze Capsule — polish round 8 handoff

## Outcome

Repaired the only open adversarial-review finding, `F-8-1`, from candidate
`d4db6701961f3936f312ddbad841d80d6bfa9591`. Repair commit
`05c6e7b99a75f024dd76c148bb568005a05d8a4c` is pushed to `main` and is deployed
to <https://freeze-capsule.sociobot.in>.

The privacy policy and README now say exactly where normal Linux evidence is
stored: `~/.local/state/freeze-capsule`. They explain the `XDG_STATE_HOME`
alternative and make the removal promise only for that documented storage.
`local-evidence-removal` creates a normal capture in a temporary XDG state
directory, removes that `freeze-capsule` folder, and proves the local key and
saved capsule are gone.

## Run and verify

```sh
npm ci
npm test
cargo clippy --locked --all-targets -- -D warnings
cargo build --locked --release
npm audit --audit-level=moderate
./target/debug/freeze-capsule demo
```

The site build is `npm run build:site` into `dist/site`. Run the landing page
locally with `npm run dev`, or inspect the isolated browser sample at
`/demo?demo=1`. The CLI sample writes to a temporary directory and makes no
network connection.

## Exact verification evidence

- Fresh clone: `/tmp/freeze-capsule-round8-clean.08ROXt/repo` from a no-local
  clone of this repository, followed by `npm ci`.
- Every one of the 29 exact `.factory/claims.json` commands passed separately,
  including `@claim:local-evidence-removal`.
- The same clean clone passed `npm test`: 11 Rust tests, watchdog integration,
  and 40 Playwright tests; `cargo clippy --locked --all-targets -- -D warnings`;
  `cargo build --locked --release`; and `npm audit --audit-level=moderate`
  (0 vulnerabilities).
- `npm run build:site` produced `dist/site`; its entry JavaScript is 17.08 kB
  (6.21 kB gzip), within the static first-load budget.
- Local cold check: `/opt/fleet/lib/verify-url.sh http://127.0.0.1:4173/
  .factory/evidence/round8-local` passed with no console errors, one `h1`, one
  `main`, `lang=en`, and no missing image alt. See
  `.factory/evidence/round8-local/verify.json` and its desktop/mobile screens.
- Live cold check after deployment: `/opt/fleet/lib/verify-url.sh
  https://freeze-capsule.sociobot.in/ .factory/evidence/round8-live/verify`
  passed in 817 ms with the same structural, alt, and console results.
- `.factory/evidence/round8-live/live-audit.json` records live cold-browser
  checks for `/`, `/demo?demo=1`, `/privacy`, `/terms`, and `/missing-sheet`:
  correct expected statuses (including real 404), route titles/metadata,
  390 px overflow, 44 px controls, zero serious/critical Axe results, link
  crawl, isolated demo reset/exit, focus/history, and same-origin demo traffic.
  `live-install-exit-390.png` shows the checked demo exit focused at Install.
- Deployment used the configured static-workload target `sf-freeze-capsule`
  and completed successfully; the live origin serves the repaired bundle.

## Documentation and product boundaries

- `.factory/polish-8.md` maps every finding from reviews 1–8 to its repair and
  evidence.
- `.factory/catalog-description.txt` now says: “Capture Linux freeze clues
  before a reboot erases them.” It is verb-first and 55 characters.
- No analytics, cookies, accounts, or runtime AI were added. The site remains a
  static landing/docs surface for the Rust CLI installer and retains the
  blueprint drafting-sheet visual system.
- The CLI only captures on Linux. macOS and Windows packages remain unsigned as
  documented; this is an explicit platform limitation, not a claim of support
  beyond the shipped package artifacts.

## Known gaps / next steps

None for this work order. Release publication and package signing remain the
normal factory release process, not a runtime dependency of the repaired site.
