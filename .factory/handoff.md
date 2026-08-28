# Freeze Capsule polish 1 handoff

## Outcome

Repaired the cumulative adversarial findings. The blueprint drafting identity remains intact. The landing demo is now a one-click isolated sample built from the real CLI output.

See .factory/polish-1.md for the finding-to-repair map.

## Verification performed

- npm ci, npm test, npm run build.
- cargo fmt --check, cargo clippy --all-targets -- -D warnings, and cargo build --release.
- Playwright covers claims, generated fixture parity, axe serious/critical issues, route focus, mobile visibility, 404 configuration, demo storage, and package lookup fallback.

## Known gaps

No deploy work-order executable or configuration exists in this checkout. Publish dist/site through the factory static work order, then cold-check /, /demo?demo=1, /privacy, /terms, and a missing URL.
