# Demo contract

- Browser: `https://freeze-capsule.sociobot.in/demo?demo=1` or local `/demo?demo=1`.
- CLI: `freeze-capsule demo`.
- Sample: a 23 July 2026 Cinnamon and Chrome freeze with an AMD GPU ring timeout, process load, DRM connectors, and display-session context.
- Browser storage: only `sessionStorage` keys prefixed `demo:` (currently `demo:loaded`). The demo never reads or writes a real-data namespace.
- CLI storage: a new `freeze-capsule-demo-<pid>` directory under the operating system temporary directory. It never reads the normal capsule directory.
- Reset: use **Reset demo** in the banner to discard the demo namespace and reload the shipped fixture. **Install Freeze Capsule** clears every `demo:` key before opening the real install section. For the CLI, remove the printed temporary directory.
- First browser screen: a report excerpt shows journal, graphics, process, and display-session evidence before the replay control.
- Expected command-line output: one encrypted `.fcap` file and one redacted Markdown report.
