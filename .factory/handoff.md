# Polish 2 handoff

## Outcome

Repaired every current and earlier adversarial finding in the checkout, including the mobile regression, one-click isolated demo, complete static 404 shell, plain-language copy, and the complete claims contract. The product remains the original blueprint-drafting visual system and CLI-installer artifact.

The repair commits are `b20747b4789685fa0e5d8a3e4eab834c4e25b625` and `73dcd6bfd69c33b8b3d44b2a8b34003e27776e32` (pushed to `origin/main`). `.factory/polish-2.md` maps F-1-1 through F-1-50 and F-2-1 through F-2-21 to implementation and evidence.

## What changed

- Seeded `/demo?demo=1` now renders the included report immediately, retains its isolated `demo:` namespace only while in demo, and clears it before the install route.
- Added source, watcher pause, unavailable-source, hotkey, installer checksum, JSON, encryption/key, rolling-slot, workflow, normal-state, tracking, release-request, and redaction-boundary claim tests. `claims.json` now has 25 claims and exactly one tagged observable test per claim.
- Completed the standalone 404 with skip navigation, Install/Demo/Privacy navigation, social image fields, Apple icon, legal footer, and responsive error-shell CSS.
- Fixed the failing mobile fact selector and the actual 390px diagnostic-report overflow. Long evidence lines now wrap instead of expanding the page.
- Replaced internal “CLI/fixture” wording with “included command-line sample,” removed unsupported cross-platform, package-availability, and uninstall-retention promises, and clarified rolling-snapshot language.
- Marked unsigned macOS/Windows release outputs in the checked-in release workflow, matching the README disclosure.

## Verification

Ran locally from this checkout:

```sh
npm test -- --workers=1
cargo clippy --all-targets -- -D warnings
cargo build --release
npm run build
```

Results: 10 Rust unit tests, the suspended-watcher integration, and 33 Playwright tests passed. The Playwright suite includes axe checks with zero serious/critical findings for `/`, `/demo`, `/privacy`, `/terms`, unknown SPA route, and `/404.html`; route focus, keyboard, touch target, metadata, 404 shell, privacy, release fallback, reduced-motion, and 390px no-overflow checks passed. The production site build is `dist/site`; JavaScript is 13.93 KB (5.20 KB gzip), CSS 11.68 KB (3.38 KB gzip), and the existing hero is 49 KB.

From a fresh clone made with `git clone /work/repo <mktemp directory>`, after `npm ci`, every one of the 25 exact commands listed in `.factory/claims.json` was run independently and passed. Screenshots are in `.factory/evidence/home-390.png`, `.factory/evidence/demo-390.png`, and `.factory/evidence/404-390.png`.

## Deployment status

`git push origin main` completed successfully. The injected static work order specifies `npm ci && npm run build:site` with `dist/site`; that exact build completed successfully. It provides no publish command, deployment token, or endpoint, and the only checked-in GitHub workflow is tag-only release packaging. At the final cold check on 28 August 2026 19:25 UTC, `https://freeze-capsule.sociobot.in` still served the older `index-B_W3jRdD.js`/`index-CwujLCAi.css` deployment, and `/404.html` was likewise the old 1,650-byte document. No repository-side publication action exists to run without changing infrastructure, which the product contract forbids.

Once the factory static deployer publishes `73dcd6b`, cold-check `/`, `/demo?demo=1`, `/privacy`, `/terms`, `/missing-sheet`, and `/404.html`; the expected new assets are `index-mCnaAh8b.js` and `index-0Ewcw7uD.css`. Then rerun the browser checks listed above against the live origin.

## Known gaps

No product-code, test, accessibility, claim, routing, copy, or documentation finding remains in the committed repair. The only outstanding state is the external static publication described above.
