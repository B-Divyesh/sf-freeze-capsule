use anyhow::{Context, Result, bail};
use chacha20poly1305::{
    XChaCha20Poly1305, XNonce,
    aead::{Aead, KeyInit},
};
use chrono::{DateTime, Utc};
use clap::{Parser, Subcommand, ValueEnum};
use rand::RngCore;
use regex::Regex;
use serde::{Deserialize, Serialize};
use std::{
    env, fs,
    io::Write,
    path::{Path, PathBuf},
    process::Command,
    thread,
    time::{Duration, Instant},
};

const MAGIC: &[u8] = b"FCAP1\0";
const MAX_CAPSULES: usize = 8;
const MAX_SECTION_BYTES: usize = 96 * 1024;
const SNAPSHOT_WINDOW_SECONDS: u32 = 600;
const DEFAULT_WATCH_INTERVAL_SECONDS: u64 = 30;
const DEFAULT_WATCHDOG_TIMEOUT_SECONDS: u64 = 90;
const DEMO_JSON: &str = include_str!("../examples/sample-freeze.json");

#[derive(Parser)]
#[command(name = "freeze-capsule", version, about = "Preserve Linux freeze clues before reboot", long_about = None)]
struct Cli {
    /// Store capsules under this directory instead of the default
    #[arg(long, global = true, env = "FREEZE_CAPSULE_DIR")]
    capsule_dir: Option<PathBuf>,
    /// Print machine-readable output
    #[arg(long, global = true)]
    json: bool,
    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    /// Capture system, graphics, process, and display context now
    Capture {
        /// Short reason stored with the capsule
        #[arg(long, default_value = "manual")]
        reason: String,
    },
    /// Keep a rolling snapshot and promote it after a scheduling gap
    Watch {
        /// Seconds between bounded snapshots
        #[arg(long, default_value_t = DEFAULT_WATCH_INTERVAL_SECONDS)]
        interval: u64,
        /// Gap in seconds that indicates the machine stopped scheduling the watcher
        #[arg(long, default_value_t = DEFAULT_WATCHDOG_TIMEOUT_SECONDS)]
        timeout: u64,
        /// Stop after one snapshot; useful for service checks
        #[arg(long)]
        once: bool,
    },
    /// List encrypted capsules without opening them
    List,
    /// Render a redacted report from an encrypted capsule
    Render {
        /// Capsule path, or "latest"
        capsule: String,
        /// Output format
        #[arg(long, value_enum, default_value_t = Format::Markdown)]
        format: Format,
        /// Write to a file instead of stdout
        #[arg(short, long)]
        output: Option<PathBuf>,
    },
    /// Remove old capsules now, keeping the newest bounded set
    Prune,
    /// Run the real capture and render path on bundled sample data
    Demo,
    /// Print the desktop hotkey command to bind in system settings
    HotkeyCommand,
    /// Install and start the per-user systemd watcher
    InstallService,
    /// Print a short status report
    Doctor,
}

#[derive(Clone, Copy, ValueEnum)]
enum Format {
    Markdown,
    Json,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct Capsule {
    schema: u8,
    captured_at: DateTime<Utc>,
    reason: String,
    window_seconds: u32,
    sections: Vec<Section>,
    notices: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct Section {
    name: String,
    source: String,
    status: String,
    content: String,
}

fn main() {
    if let Err(error) = run() {
        eprintln!("freeze-capsule: {error:#}");
        std::process::exit(1);
    }
}

fn run() -> Result<()> {
    let cli = Cli::parse();
    let root = cli.capsule_dir.unwrap_or(default_capsule_dir()?);
    match cli.command {
        Commands::Capture { reason } => {
            let capsule = collect(&reason);
            let path = save_capsule(&root, &capsule, false)?;
            prune(&root)?;
            print_result(cli.json, "captured", &path, &capsule)?;
        }
        Commands::Watch {
            interval,
            timeout,
            once,
        } => watch(&root, interval, timeout, once, cli.json)?,
        Commands::List => list(&root, cli.json)?,
        Commands::Render {
            capsule,
            format,
            output,
        } => render_command(&root, &capsule, format, output)?,
        Commands::Prune => {
            let removed = prune(&root)?;
            if cli.json {
                println!("{{\"removed\":{removed}}}");
            } else {
                println!("Removed {removed} old capsule(s). Keeping at most {MAX_CAPSULES}.");
            }
        }
        Commands::Demo => demo(cli.json)?,
        Commands::HotkeyCommand => println!("freeze-capsule capture --reason hotkey"),
        Commands::InstallService => install_service()?,
        Commands::Doctor => doctor(&root, cli.json)?,
    }
    Ok(())
}

fn default_capsule_dir() -> Result<PathBuf> {
    let base = env::var_os("XDG_STATE_HOME")
        .map(PathBuf::from)
        .or_else(|| env::var_os("HOME").map(|p| PathBuf::from(p).join(".local/state")))
        .context("HOME and XDG_STATE_HOME are unset; pass --capsule-dir")?;
    Ok(base.join("freeze-capsule"))
}

fn key_path(root: &Path) -> PathBuf {
    root.join("capsule.key")
}

fn load_key(root: &Path) -> Result<[u8; 32]> {
    fs::create_dir_all(root).with_context(|| format!("cannot create {}", root.display()))?;
    let path = key_path(root);
    if path.exists() {
        let value = fs::read(&path).with_context(|| format!("cannot read {}", path.display()))?;
        return value
            .try_into()
            .map_err(|_| anyhow::anyhow!("{} is not a valid 32-byte key", path.display()));
    }
    let mut key = [0u8; 32];
    rand::rng().fill_bytes(&mut key);
    let mut options = fs::OpenOptions::new();
    options.write(true).create_new(true);
    #[cfg(unix)]
    {
        use std::os::unix::fs::OpenOptionsExt;
        options.mode(0o600);
    }
    options.open(&path)?.write_all(&key)?;
    Ok(key)
}

fn encrypt(root: &Path, capsule: &Capsule) -> Result<Vec<u8>> {
    let key = load_key(root)?;
    let cipher = XChaCha20Poly1305::new((&key).into());
    let mut nonce = [0u8; 24];
    rand::rng().fill_bytes(&mut nonce);
    let plaintext = serde_json::to_vec(capsule)?;
    let encrypted = cipher
        .encrypt(XNonce::from_slice(&nonce), plaintext.as_ref())
        .map_err(|_| anyhow::anyhow!("encryption failed"))?;
    let mut out = Vec::with_capacity(MAGIC.len() + nonce.len() + encrypted.len());
    out.extend_from_slice(MAGIC);
    out.extend_from_slice(&nonce);
    out.extend_from_slice(&encrypted);
    Ok(out)
}

fn decrypt(root: &Path, bytes: &[u8]) -> Result<Capsule> {
    if bytes.len() < MAGIC.len() + 24 || &bytes[..MAGIC.len()] != MAGIC {
        bail!("not a Freeze Capsule file");
    }
    let key = load_key(root)?;
    let cipher = XChaCha20Poly1305::new((&key).into());
    let nonce = XNonce::from_slice(&bytes[MAGIC.len()..MAGIC.len() + 24]);
    let plain = cipher
        .decrypt(nonce, &bytes[MAGIC.len() + 24..])
        .map_err(|_| anyhow::anyhow!("cannot decrypt capsule with the local key"))?;
    Ok(serde_json::from_slice(&plain)?)
}

fn save_capsule(root: &Path, capsule: &Capsule, prebuffer: bool) -> Result<PathBuf> {
    fs::create_dir_all(root)?;
    let name = if prebuffer {
        "prebuffer.fcap".into()
    } else {
        format!(
            "capsule-{}.fcap",
            capsule.captured_at.format("%Y%m%dT%H%M%SZ")
        )
    };
    let path = root.join(name);
    let temp = path.with_extension("tmp");
    fs::write(&temp, encrypt(root, capsule)?)?;
    fs::rename(&temp, &path)?;
    Ok(path)
}

fn collect(reason: &str) -> Capsule {
    let mut sections = Vec::new();
    #[cfg(target_os = "linux")]
    {
        sections.push(command_section(
            "journal",
            "journalctl --since -10min",
            "journalctl",
            &[
                "--no-pager",
                "--since",
                "10 minutes ago",
                "-n",
                "900",
                "-o",
                "short-precise",
            ],
        ));
        sections.push(command_section(
            "kernel",
            "dmesg",
            "dmesg",
            &["--color=never", "--ctime"],
        ));
        sections.push(command_section("graphics", "lspci -k", "lspci", &["-k"]));
        sections.push(command_section(
            "processes",
            "ps",
            "ps",
            &[
                "-eo",
                "pid,ppid,stat,etimes,%cpu,%mem,comm,args",
                "--sort=-%cpu",
            ],
        ));
        sections.push(file_section(
            "gpu-drm",
            "/sys/class/drm",
            Path::new("/sys/class/drm"),
        ));
        sections.push(env_section());
    }
    #[cfg(not(target_os = "linux"))]
    sections.push(Section {
        name: "platform".into(),
        source: env::consts::OS.into(),
        status: "unavailable".into(),
        content: "The watcher collects real system data only on Linux. Use `freeze-capsule demo` here.".into(),
    });
    Capsule { schema: 1, captured_at: Utc::now(), reason: reason.chars().take(80).collect(), window_seconds: SNAPSHOT_WINDOW_SECONDS, sections, notices: vec!["Commands respect the current user's log permissions.".into(), "A hard freeze can prevent any process from recording new data; the watcher keeps the last completed snapshot.".into()] }
}

fn command_section(name: &str, source: &str, program: &str, args: &[&str]) -> Section {
    match Command::new(program).args(args).output() {
        Ok(out) => {
            let mut content = String::from_utf8_lossy(if out.stdout.is_empty() {
                &out.stderr
            } else {
                &out.stdout
            })
            .into_owned();
            if content.len() > MAX_SECTION_BYTES {
                content.truncate(MAX_SECTION_BYTES);
                content.push_str("\n[section truncated]\n");
            }
            Section {
                name: name.into(),
                source: source.into(),
                status: if out.status.success() {
                    "captured"
                } else {
                    "limited"
                }
                .into(),
                content,
            }
        }
        Err(e) => Section {
            name: name.into(),
            source: source.into(),
            status: "unavailable".into(),
            content: format!("{program} could not run: {e}"),
        },
    }
}

fn file_section(name: &str, source: &str, path: &Path) -> Section {
    match fs::read_dir(path) {
        Ok(entries) => {
            let mut rows = Vec::new();
            for entry in entries.flatten().take(200) {
                let p = entry.path();
                let status_path = p.join("status");
                let status = fs::read_to_string(status_path)
                    .unwrap_or_default()
                    .trim()
                    .to_owned();
                rows.push(format!(
                    "{} {}",
                    entry.file_name().to_string_lossy(),
                    status
                ));
            }
            Section {
                name: name.into(),
                source: source.into(),
                status: "captured".into(),
                content: rows.join("\n"),
            }
        }
        Err(e) => Section {
            name: name.into(),
            source: source.into(),
            status: "unavailable".into(),
            content: format!("{source} could not be read: {e}"),
        },
    }
}

fn env_section() -> Section {
    let allowed = [
        "XDG_SESSION_TYPE",
        "XDG_CURRENT_DESKTOP",
        "DESKTOP_SESSION",
        "WAYLAND_DISPLAY",
        "DISPLAY",
    ];
    let content = allowed
        .iter()
        .map(|k| format!("{k}={}", env::var(k).unwrap_or_else(|_| "unset".into())))
        .collect::<Vec<_>>()
        .join("\n");
    Section {
        name: "display-session".into(),
        source: "selected environment".into(),
        status: "captured".into(),
        content,
    }
}

fn watch(root: &Path, interval: u64, timeout: u64, once: bool, json: bool) -> Result<()> {
    if interval == 0 || timeout <= interval {
        bail!("timeout must be greater than a non-zero interval");
    }
    let mut last = Instant::now();
    loop {
        let elapsed = last.elapsed().as_secs();
        if elapsed >= timeout && root.join("prebuffer.fcap").exists() {
            let bytes = fs::read(root.join("prebuffer.fcap"))?;
            let mut old = decrypt(root, &bytes)?;
            old.reason = format!("watchdog-gap-{elapsed}s");
            let promoted = save_capsule(root, &old, false)?;
            if !json {
                eprintln!("Promoted pre-freeze snapshot: {}", promoted.display());
            }
        }
        let capsule = collect("rolling-prebuffer");
        let path = save_capsule(root, &capsule, true)?;
        if json {
            println!(
                "{{\"status\":\"ready\",\"path\":{}}}",
                serde_json::to_string(&path)?
            );
        }
        if once {
            break;
        }
        prune(root)?;
        last = Instant::now();
        thread::sleep(Duration::from_secs(interval));
    }
    Ok(())
}

fn capsule_paths(root: &Path) -> Result<Vec<PathBuf>> {
    if !root.exists() {
        return Ok(Vec::new());
    }
    let mut paths = fs::read_dir(root)?
        .flatten()
        .map(|e| e.path())
        .filter(|p| {
            p.file_name()
                .and_then(|n| n.to_str())
                .is_some_and(|n| n.starts_with("capsule-") && n.ends_with(".fcap"))
        })
        .collect::<Vec<_>>();
    paths.sort();
    paths.reverse();
    Ok(paths)
}

fn list(root: &Path, json: bool) -> Result<()> {
    let paths = capsule_paths(root)?;
    if json {
        println!("{}", serde_json::to_string_pretty(&paths)?);
    } else if paths.is_empty() {
        println!("No retained capsules yet. Run `freeze-capsule capture` or start the watcher.");
    } else {
        for path in paths {
            println!("{}", path.display());
        }
    }
    Ok(())
}

fn select_capsule(root: &Path, value: &str) -> Result<PathBuf> {
    if value == "latest" {
        capsule_paths(root)?
            .into_iter()
            .next()
            .context("no retained capsules; run capture first")
    } else {
        Ok(PathBuf::from(value))
    }
}

fn render_command(root: &Path, value: &str, format: Format, output: Option<PathBuf>) -> Result<()> {
    let path = select_capsule(root, value)?;
    let capsule = decrypt(
        root,
        &fs::read(&path).with_context(|| format!("cannot read {}", path.display()))?,
    )?;
    let result = render(&capsule, format)?;
    if let Some(dest) = output {
        fs::write(&dest, result)?;
        println!("Wrote redacted report to {}", dest.display());
    } else {
        print!("{result}");
    }
    Ok(())
}

fn redact(input: &str) -> String {
    let home = env::var("HOME").unwrap_or_default();
    let mut value = if home.len() > 1 {
        input.replace(&home, "[HOME]")
    } else {
        input.to_owned()
    };
    let hostname = env::var("HOSTNAME")
        .ok()
        .or_else(|| fs::read_to_string("/etc/hostname").ok())
        .unwrap_or_default();
    let hostname = hostname.trim();
    if hostname.len() > 2 {
        value = value.replace(hostname, "[HOST]");
    }
    let rules = [
        (r"(?i)\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b", "[EMAIL]"),
        (r"\b(?:\d{1,3}\.){3}\d{1,3}\b", "[IP]"),
        (
            r"(?i)(token|password|secret|api[_-]?key)=\S+",
            "$1=[REDACTED]",
        ),
        (
            r"(?i)(--(?:token|password|secret|api[_-]?key))\s+\S+",
            "$1 [REDACTED]",
        ),
        (r"(?i)\b(?:[0-9a-f]{2}:){5}[0-9a-f]{2}\b", "[MAC]"),
        (r"/home/[^/\s]+", "/home/[USER]"),
    ];
    for (pattern, replacement) in rules {
        value = Regex::new(pattern)
            .expect("valid redaction pattern")
            .replace_all(&value, replacement)
            .into_owned();
    }
    value
}

fn render(capsule: &Capsule, format: Format) -> Result<String> {
    let mut safe = capsule.clone();
    for section in &mut safe.sections {
        section.content = redact(&section.content);
    }
    Ok(match format {
        Format::Json => serde_json::to_string_pretty(&safe)? + "\n",
        Format::Markdown => {
            let mut out = format!(
                "# Freeze Capsule report\n\n- Captured: {}\n- Reason: {}\n- Evidence window: {} seconds\n\n",
                safe.captured_at,
                redact(&safe.reason),
                safe.window_seconds
            );
            for notice in &safe.notices {
                out.push_str(&format!("> {}\n\n", redact(notice)));
            }
            for section in &safe.sections {
                out.push_str(&format!(
                    "## {}\n\nSource: `{}` · Status: **{}**\n\n```text\n{}\n```\n\n",
                    section.name, section.source, section.status, section.content
                ));
            }
            out
        }
    })
}

fn prune(root: &Path) -> Result<usize> {
    let paths = capsule_paths(root)?;
    let mut removed = 0;
    for path in paths.into_iter().skip(MAX_CAPSULES) {
        fs::remove_file(path)?;
        removed += 1;
    }
    Ok(removed)
}

fn demo(json: bool) -> Result<()> {
    let root = env::temp_dir().join(format!("freeze-capsule-demo-{}", std::process::id()));
    if root.exists() {
        fs::remove_dir_all(&root)?;
    }
    fs::create_dir_all(&root)?;
    let capsule: Capsule = serde_json::from_str(DEMO_JSON)?;
    let path = save_capsule(&root, &capsule, false)?;
    let report_path = root.join("freeze-report.md");
    fs::write(
        &report_path,
        render(&decrypt(&root, &fs::read(&path)?)?, Format::Markdown)?,
    )?;
    if json {
        println!(
            "{{\"capsule\":{},\"report\":{},\"temporary\":true}}",
            serde_json::to_string(&path)?,
            serde_json::to_string(&report_path)?
        );
    } else {
        println!("Demo — bundled sample data, nothing is saved to your capsule directory.");
        println!("Encrypted sample: {}", path.display());
        println!("Redacted report: {}", report_path.display());
        println!("The temporary directory can be removed after inspection.");
    }
    Ok(())
}

fn install_service() -> Result<()> {
    #[cfg(not(target_os = "linux"))]
    bail!("the watcher service is available on Linux only; `demo` works here");
    #[cfg(target_os = "linux")]
    {
        let config = env::var_os("XDG_CONFIG_HOME")
            .map(PathBuf::from)
            .or_else(|| env::var_os("HOME").map(|p| PathBuf::from(p).join(".config")))
            .context("HOME is unset")?;
        let dir = config.join("systemd/user");
        fs::create_dir_all(&dir)?;
        let exe = env::current_exe()?;
        let unit = watcher_service_unit(&exe);
        fs::write(dir.join("freeze-capsule.service"), unit)?;
        let reload = Command::new("systemctl")
            .args(["--user", "daemon-reload"])
            .status()?;
        let enable = Command::new("systemctl")
            .args(["--user", "enable", "--now", "freeze-capsule.service"])
            .status()?;
        if !reload.success() || !enable.success() {
            bail!(
                "the unit was written, but systemd could not start it; run `systemctl --user status freeze-capsule`"
            );
        }
        println!("Installed and started the per-user watcher. No root access was requested.");
    }
    Ok(())
}

fn watcher_service_unit(executable: &Path) -> String {
    format!(
        "[Unit]\nDescription=Freeze Capsule rolling evidence watcher\nDocumentation=https://freeze-capsule.sociobot.in\n\n[Service]\nType=simple\nExecStart={} watch --interval {DEFAULT_WATCH_INTERVAL_SECONDS} --timeout {DEFAULT_WATCHDOG_TIMEOUT_SECONDS}\nRestart=on-failure\nNoNewPrivileges=true\nPrivateTmp=true\nProtectSystem=strict\nProtectHome=read-only\nReadWritePaths=%h/.local/state/freeze-capsule\n\n[Install]\nWantedBy=default.target\n",
        executable.display()
    )
}

fn doctor(root: &Path, json: bool) -> Result<()> {
    let platform = env::consts::OS;
    let retained = capsule_paths(root)?.len();
    let key = key_path(root).exists();
    if json {
        println!(
            "{{\"platform\":{platform:?},\"capsule_dir\":{},\"key_ready\":{key},\"retained\":{retained},\"retention_limit\":{MAX_CAPSULES}}}",
            serde_json::to_string(root)?
        );
    } else {
        println!(
            "Platform: {platform}\nCapsule directory: {}\nEncryption key: {}\nRetained capsules: {retained}/{MAX_CAPSULES}",
            root.display(),
            if key {
                "ready"
            } else {
                "created on first capture"
            }
        );
        if platform != "linux" {
            println!("System-data watcher: Linux only. The bundled demo is available.");
        }
    }
    Ok(())
}

fn print_result(json: bool, status: &str, path: &Path, capsule: &Capsule) -> Result<()> {
    if json {
        println!(
            "{{\"status\":{status:?},\"path\":{},\"captured_at\":{}}}",
            serde_json::to_string(path)?,
            serde_json::to_string(&capsule.captured_at)?
        );
    } else {
        println!(
            "Saved encrypted capsule: {}\nRender it with: freeze-capsule render latest",
            path.display()
        );
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;
    use tempfile::tempdir;

    #[test]
    fn encrypted_round_trip_has_no_plaintext() {
        let dir = tempdir().unwrap();
        let capsule: Capsule = serde_json::from_str(DEMO_JSON).unwrap();
        let bytes = encrypt(dir.path(), &capsule).unwrap();
        // FCAP1 followed by the 24-byte XChaCha nonce is the on-disk format.
        assert!(bytes.len() > MAGIC.len() + 24);
        assert_eq!(&bytes[..MAGIC.len()], MAGIC);
        assert_eq!(fs::read(key_path(dir.path())).unwrap().len(), 32);
        assert!(!String::from_utf8_lossy(&bytes).contains("amdgpu"));
        assert_eq!(decrypt(dir.path(), &bytes).unwrap().reason, capsule.reason);
    }

    #[test]
    fn redacts_private_values() {
        let input = "mail a.person@example.com from 192.168.1.4 /home/alex/a token=abcd 00:11:22:aa:bb:cc --password nope";
        let safe = redact(input);
        assert_eq!(
            safe,
            "mail [EMAIL] from [IP] /home/[USER]/a token=[REDACTED] [MAC] --password [REDACTED]"
        );
    }

    #[test]
    fn demo_fixture_has_all_required_context() {
        let capsule: Capsule = serde_json::from_str(DEMO_JSON).unwrap();
        for name in ["journal", "graphics", "processes", "display-session"] {
            assert!(capsule.sections.iter().any(|s| s.name == name));
        }
    }

    #[test]
    fn retention_is_bounded() {
        let dir = tempdir().unwrap();
        let mut capsule: Capsule = serde_json::from_str(DEMO_JSON).unwrap();
        for n in 0..12 {
            capsule.captured_at = Utc::now() + chrono::Duration::seconds(n);
            save_capsule(dir.path(), &capsule, false).unwrap();
        }
        prune(dir.path()).unwrap();
        assert_eq!(capsule_paths(dir.path()).unwrap().len(), MAX_CAPSULES);
    }

    #[test]
    fn current_snapshot_does_not_use_a_retained_capsule_slot() {
        let dir = tempdir().unwrap();
        let mut capsule: Capsule = serde_json::from_str(DEMO_JSON).unwrap();
        save_capsule(dir.path(), &capsule, true).unwrap();
        for n in 0..MAX_CAPSULES {
            capsule.captured_at = Utc::now() + chrono::Duration::seconds(n as i64);
            save_capsule(dir.path(), &capsule, false).unwrap();
        }
        prune(dir.path()).unwrap();
        assert!(dir.path().join("prebuffer.fcap").exists());
        assert_eq!(capsule_paths(dir.path()).unwrap().len(), MAX_CAPSULES);
    }

    #[test]
    fn unavailable_sources_stay_in_a_renderable_report() {
        let dir = tempdir().unwrap();
        let capsule = Capsule {
            schema: 1,
            captured_at: Utc::now(),
            reason: "controlled-source-failure".into(),
            window_seconds: SNAPSHOT_WINDOW_SECONDS,
            sections: vec![
                command_section(
                    "journal",
                    "controlled command",
                    "freeze-capsule-missing-command",
                    &[],
                ),
                file_section(
                    "gpu-drm",
                    "controlled directory",
                    &dir.path().join("missing"),
                ),
            ],
            notices: vec![],
        };
        let rendered = render(&capsule, Format::Markdown).unwrap();
        assert!(rendered.contains("## journal"));
        assert!(rendered.contains("## gpu-drm"));
        assert_eq!(capsule.sections[0].status, "unavailable");
        assert_eq!(capsule.sections[1].status, "unavailable");
    }

    #[cfg(target_os = "linux")]
    #[test]
    fn linux_collector_requests_each_documented_source() {
        let capsule = collect("source-contract");
        for name in [
            "journal",
            "kernel",
            "graphics",
            "gpu-drm",
            "processes",
            "display-session",
        ] {
            assert!(
                capsule.sections.iter().any(|section| section.name == name),
                "missing {name}"
            );
        }
        assert!(
            capsule
                .sections
                .iter()
                .all(|section| !section.status.is_empty())
        );
    }

    #[test]
    fn redaction_keeps_a_non_private_hardware_detail_for_review() {
        let rendered = redact("GPU PCI ID 1002:73bf at /home/alex token=abc");
        assert!(rendered.contains("1002:73bf"));
        assert!(rendered.contains("/home/[USER]"));
        assert!(rendered.contains("token=[REDACTED]"));
    }

    #[cfg(unix)]
    #[test]
    fn local_key_is_created_with_owner_only_permissions() {
        use std::os::unix::fs::PermissionsExt;
        let dir = tempdir().unwrap();
        let capsule: Capsule = serde_json::from_str(DEMO_JSON).unwrap();
        encrypt(dir.path(), &capsule).unwrap();
        assert_eq!(
            fs::metadata(key_path(dir.path()))
                .unwrap()
                .permissions()
                .mode()
                & 0o777,
            0o600
        );
    }

    #[test]
    fn rolling_snapshot_contract_uses_the_documented_window_and_cadence() {
        assert_eq!(SNAPSHOT_WINDOW_SECONDS, 600);
        assert_eq!(DEFAULT_WATCH_INTERVAL_SECONDS, 30);
        assert_eq!(DEFAULT_WATCHDOG_TIMEOUT_SECONDS, 90);
        assert!(
            watcher_service_unit(Path::new("/tmp/freeze-capsule"))
                .contains("watch --interval 30 --timeout 90")
        );
    }
}
