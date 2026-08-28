# Freeze Capsule

Save Linux freeze clues before a reboot erases them.

Freeze Capsule is for desktop Linux users debugging graphics, kernel, application, or display-session lockups. Its per-user watcher keeps one encrypted snapshot current. A long scheduling gap promotes the prior snapshot into bounded retention. A desktop hotkey can capture on demand.

Live site: <https://freeze-capsule.sociobot.in>

## Try the isolated demo

```sh
freeze-capsule demo
```

The command loads [the bundled sample](examples/sample-freeze.json). It writes an encrypted capsule and redacted Markdown report under a new temporary directory. It never reads or writes your normal capsule directory.

The same sample is available at <https://freeze-capsule.sociobot.in/demo>.

## Install

Linux and macOS:

```sh
curl -fsSL https://freeze-capsule.sociobot.in/install.sh | sh
```

Windows PowerShell:

```powershell
irm https://freeze-capsule.sociobot.in/install.ps1 | iex
```

Both installers download the published archive and verify its SHA-256 checksum. Linux users can also choose the `.deb` or `.rpm` file on the release page.

Homebrew after the tap is published:

```sh
brew install B-Divyesh/freeze-capsule/freeze-capsule
```

Scoop after adding the repository bucket:

```powershell
scoop bucket add freeze-capsule https://github.com/B-Divyesh/sf-freeze-capsule
scoop install freeze-capsule
```

Live capture is Linux-specific. macOS and Windows builds provide the portable demo, renderer, and report inspection commands.

## Use

Start the least-privilege user watcher:

```sh
freeze-capsule install-service
freeze-capsule doctor
```

Capture from a desktop hotkey:

```sh
freeze-capsule hotkey-command
# Bind the printed command in your desktop keyboard settings.
```

After a freeze or reboot:

```sh
freeze-capsule list
freeze-capsule render latest --output freeze-report.md
```

JSON output is available for scripts:

```sh
freeze-capsule --json list
freeze-capsule render latest --format json
```

## What it records

Each Linux snapshot requests a ten-minute journal window, kernel messages, PCI graphics drivers, DRM connector states, the process table, and selected display-session variables. Every section is capped at 96 KiB. Missing commands or permissions appear in the report instead of aborting capture.

Capsules use XChaCha20-Poly1305 with a local 32-byte key. The key is created with user-only permissions. Rendering replaces common home paths, email addresses, IPv4 addresses, and secret assignments. Review every report before sharing it.

At most eight retained capsules remain. The rolling prebuffer is separate. A hard lock can stop every user process, so Freeze Capsule cannot guarantee a final write during a lock. It preserves the last completed snapshot instead.

## Develop

Requirements: stable Rust, Node.js 20 or newer, and npm.

```sh
npm install
npm test
npm run build:site
cargo build --release
```

The static site lands in `dist/site`. The CLI binary lands in `target/release`. Playwright uses its bundled Chromium. The release workflow builds platform artifacts only on GitHub Actions.

## Release

Tag a tested commit:

```sh
git tag v0.1.0
git push origin main v0.1.0
```

The workflow builds archives, `.deb`, `.rpm`, unsigned macOS `.pkg` files, checksums, `latest.json`, Homebrew, Scoop, and winget manifests. macOS and Windows artifacts are unsigned in v0.1.0.

## Privacy and license

The CLI has no telemetry and no network client. See [privacy](https://freeze-capsule.sociobot.in/privacy) and [terms](https://freeze-capsule.sociobot.in/terms). Freeze Capsule is released under the [MIT License](LICENSE).
