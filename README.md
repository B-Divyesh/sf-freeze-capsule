# Freeze Capsule

Save Linux freeze clues before a reboot erases them.

Freeze Capsule is for desktop Linux users debugging graphics, kernel, application, or display-session freezes. Its watcher keeps one encrypted snapshot current. If the watcher pauses for 90 seconds, it keeps the last complete snapshot.

Live site: <https://freeze-capsule.sociobot.in>

## Try the isolated demo

```sh
freeze-capsule demo
```

The command loads [the bundled sample](examples/sample-freeze.json). It writes an encrypted capsule and redacted Markdown report under a new temporary directory. It never reads or writes your normal capsule directory.

The same isolated sample is available at <https://freeze-capsule.sociobot.in/demo?demo=1>. The browser report is generated from the same bundled CLI demo fixture.

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

Start the watcher as your Linux user:

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

Each Linux snapshot requests journal, kernel, graphics, connector, and process details. It also records selected display-session variables. A report marks unavailable sources instead of abandoning capture.

Capsules use XChaCha20-Poly1305 with a local 32-byte key. The key is created with user-only permissions. Rendering replaces common home paths, email addresses, IPv4 addresses, and secret assignments. Review every report before sharing it.

At most eight retained capsules remain. The rolling prebuffer is not counted as a retained capsule. A hard freeze can stop every user process, so Freeze Capsule cannot guarantee a final write. It preserves the last completed snapshot instead.

## Develop

You need Rust, Node.js, and npm to build from source.

```sh
npm ci
npm test
npm run build:site
cargo build --release
```

The build commands print their output paths. If Playwright needs a browser, run `npx playwright install chromium`.

## Release

Tag a tested commit:

```sh
git tag v0.1.1
git push origin main v0.1.1
```

The GitHub Actions workflow builds archives, Linux packages, macOS packages, Windows archives, checksums, and release manifests. macOS and Windows artifacts are unsigned.

## Privacy and license

The bundled CLI demo makes no network connection and uses a temporary directory. See [privacy](https://freeze-capsule.sociobot.in/privacy) and [terms](https://freeze-capsule.sociobot.in/terms). Freeze Capsule is released under the [MIT License](LICENSE).
