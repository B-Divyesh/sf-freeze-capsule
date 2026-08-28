# Demo contract

- Browser: `https://freeze-capsule.sociobot.in/demo` or local `/demo`.
- CLI: `freeze-capsule demo`.
- Sample: a 23 July 2026 Cinnamon and Chrome lockup with an AMD GPU ring timeout, process load, DRM connectors, and display-session context.
- Browser storage: only `sessionStorage` key `demo:ran`. The demo never reads or writes a real-data namespace.
- CLI storage: a new `freeze-capsule-demo-<pid>` directory under the operating system temporary directory. It never reads the normal capsule directory.
- Reset: use **Reset demo** in the banner. For the CLI, remove the printed temporary directory.
- Expected output: one encrypted `.fcap` file and one redacted Markdown report.
