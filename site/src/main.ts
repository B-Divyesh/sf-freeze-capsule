import './style.css';

type Route = '/' | '/demo' | '/privacy' | '/terms' | '/404';
type Release = { tag_name: string; assets: { name: string; browser_download_url: string }[] };
const app = document.querySelector<HTMLDivElement>('#app')!;
const RELEASES = 'https://github.com/B-Divyesh/sf-freeze-capsule/releases';
const API = 'https://api.github.com/repos/B-Divyesh/sf-freeze-capsule/releases/latest';

const shell = (body: string, isDemo = false) => `
  <div class="route-announcer" aria-live="polite" aria-atomic="true"></div>
  ${isDemo ? `<aside class="demo-bar" aria-label="Demo mode"><span><strong>Demo</strong> — sample data, nothing is saved</span><span><button type="button" data-reset>Reset demo</button><a href="/" data-link>Start for real</a></span></aside>` : ''}
  <header class="site-header">
    <a class="wordmark" href="/" data-link aria-label="Freeze Capsule home"><svg aria-hidden="true" viewBox="0 0 38 24"><path d="M6 2h19a11 11 0 0 1 0 22H6A6 6 0 0 1 6 2Z"/><path d="M17 2v22M8 8h6M8 13h6"/></svg><span>Freeze Capsule</span></a>
    <nav aria-label="Main navigation"><a href="/demo" data-link>Demo</a><a href="/#install">Install</a><a href="/privacy" data-link>Privacy</a></nav>
  </header>
  <main id="main" tabindex="-1">${body}</main>
  <footer><p><strong>Freeze Capsule</strong> · Save Linux freeze clues before reboot.</p><nav aria-label="Footer"><a href="/privacy" data-link>Privacy</a><a href="/terms" data-link>Terms</a><a href="https://sociobot.in" rel="external">Built by Param Factory <span class="sr-only">(external site)</span></a></nav><p class="build">v0.1.1 · build 2026.08</p></footer>`;

const terminal = (interactive = false) => `
  <section class="terminal-sheet" aria-labelledby="terminal-title">
    <div class="plate-label"><span>DETAIL A</span><span>REAL BUNDLED SAMPLE</span></div>
    <div class="terminal-head"><h2 id="terminal-title">See the report before installing</h2>${interactive ? '<button class="run-button" type="button" data-run>Run sample capture</button>' : '<a href="/demo" data-link>Open the sample</a>'}</div>
    <div class="terminal" role="region" aria-label="Freeze Capsule demo transcript" tabindex="0"><div class="terminal-dots" aria-hidden="true"><i></i><i></i><i></i></div><pre data-transcript>${interactive ? '<span class="prompt">$</span> freeze-capsule demo\n\nReady. Run the bundled sample to create a temporary capsule.' : '<span class="prompt">$</span> freeze-capsule demo\n\nDemo — bundled sample data, nothing is saved to your capsule directory.\nEncrypted sample: /tmp/freeze-capsule-demo/capsule-20260723T143208Z.fcap\nRedacted report: /tmp/freeze-capsule-demo/freeze-report.md\n\n<span class="ok">✓ journal</span>  <span class="ok">✓ graphics</span>  <span class="ok">✓ processes</span>  <span class="ok">✓ display-session</span>'}</pre></div>
    <p class="terminal-note">The CLI demo runs this capture and render path in a temporary directory.</p>
  </section>`;

const home = () => shell(`
  <section class="hero blueprint-section">
    <div class="hero-copy"><p class="eyebrow">LINUX FIELD TOOL · DRAWING FC–01</p><h1>Save freeze clues before you reboot</h1><p class="lede">For desktop Linux users who need graphics, kernel, process, and session context after a lockup.</p><div class="hero-actions"><a class="primary" href="/demo" data-link>Try it with sample data</a><span>See a redacted report in one click.</span></div><ul class="facts"><li><span aria-hidden="true">01</span> Free and open source</li><li><span aria-hidden="true">02</span> Capsules stay on your device</li><li><span aria-hidden="true">03</span> Keeps at most eight capsules</li></ul></div>
    <figure class="hero-art"><div class="scan" aria-hidden="true"></div><img src="/assets/freeze-capsule-hero.webp" width="768" height="512" alt="Cutaway drawing of a capsule holding four layers of Linux system evidence." fetchpriority="high" /><figcaption>FIG. 1 — journal · graphics · processes · display session</figcaption></figure>
  </section>
  ${terminal(false)}
  <section class="steps blueprint-section" aria-labelledby="how-title"><div class="section-mark">SEQUENCE / 03</div><h2 id="how-title">How it preserves the useful window</h2><ol><li><span>01</span><div><h3>Keep one snapshot current</h3><p>The user service records a bounded ten-minute window every 30 seconds.</p></div></li><li><span>02</span><div><h3>Promote it after a gap</h3><p>A 90-second scheduling gap preserves the last completed snapshot.</p></div></li><li><span>03</span><div><h3>Render a safer report</h3><p>The render command removes home paths, email addresses, IP addresses, and common secrets.</p></div></li></ol></section>
  <section id="install" class="install blueprint-section" aria-labelledby="install-title"><div><div class="section-mark">INSTALLATION PLATE</div><h2 id="install-title">Install the Linux watcher</h2><p>The package installs one binary. You choose when to start the per-user service.</p><div class="command"><code>curl -fsSL https://freeze-capsule.sociobot.in/install.sh | sh</code><button type="button" data-copy="curl -fsSL https://freeze-capsule.sociobot.in/install.sh | sh">Copy command</button></div><p class="platform-note" data-download-state aria-live="polite">Choose a package or check the published release.</p><div class="release-actions"><a class="primary" data-primary-download href="${RELEASES}">Open Linux releases</a><button class="check-release" type="button" data-check-release>Check published packages</button></div><div class="downloads"><a data-download="deb" href="${RELEASES}">Linux .deb</a><a data-download="rpm" href="${RELEASES}">Linux .rpm</a><a data-download="mac" href="${RELEASES}">macOS .pkg</a><a data-download="win" href="${RELEASES}">Windows .zip</a><a href="${RELEASES}">All releases <span class="sr-only">(external site)</span></a></div></div><aside><h3>After install</h3><pre><code>freeze-capsule install-service\nfreeze-capsule doctor\nfreeze-capsule hotkey-command</code></pre><p>Linux provides live capture. macOS and Windows builds provide the portable sample and report tools.</p></aside></section>
  <section class="limits blueprint-section" aria-labelledby="limits-title"><div class="section-mark">BOUNDARY NOTES</div><h2 id="limits-title">Know what it cannot capture</h2><div class="limit-grid"><p><strong>A hard lock can stop all capture.</strong><br />The last completed rolling snapshot remains available.</p><p><strong>Log access follows your account.</strong><br />Missing kernel lines appear as unavailable in the report.</p><p><strong>It does not send or file reports.</strong><br />You inspect the redacted file before sharing it.</p></div></section>`);

const demo = () => shell(`
  <section class="page-head"><p class="eyebrow">SANDBOX / TEMP DIRECTORY</p><h1>Inspect a sample freeze report</h1><p>The sample shows an AMD graphics timeout during a Cinnamon and Chrome lockup.</p></section>
  ${terminal(true)}
  <section class="report-sheet" aria-labelledby="report-title" hidden data-report><div class="report-meta"><span>REDACTED OUTPUT</span><span>2026-07-23 14:32 UTC</span></div><h2 id="report-title">Freeze Capsule report</h2><dl><div><dt>Reason</dt><dd>watchdog-gap-94s</dd></div><div><dt>Window</dt><dd>600 seconds</dd></div><div><dt>Sections</dt><dd>6 captured · 1 limited</dd></div></dl><div class="evidence"><h3>Journal</h3><pre>14:31:41 cinnamon: Window stopped responding\n14:31:44 kernel: amdgpu ring gfx timeout\n14:31:46 kernel: GPU reset begin\n14:31:53 kernel: GPU reset succeeded</pre></div><div class="evidence"><h3>Graphics and process clue</h3><pre>Driver: amdgpu · AMD Navi 23\ncinnamon  88.4% CPU\nchrome    45.1% CPU</pre></div><p class="redaction">Private values become <code>[HOME]</code>, <code>[EMAIL]</code>, <code>[IP]</code>, or <code>[REDACTED]</code>.</p></section>`, true);

const privacy = () => shell(`<article class="prose"><p class="eyebrow">POLICY SHEET / 01</p><h1>Privacy stays local</h1><p><time datetime="2026-08-28">Effective 28 August 2026</time></p><h2>The command line tool</h2><p>Freeze Capsule writes encrypted capsules and one key to your local state directory. It sends no capsule, report, identifier, or usage event anywhere.</p><h2>The website</h2><p>This static site uses no cookies, accounts, analytics, or advertising. The download panel may request public release details from GitHub. Opening a download follows a link to GitHub.</p><h2>What reports contain</h2><p>A capsule may contain journal lines, command arguments, device details, process names, and display settings. Rendering replaces common private patterns. Inspect the report before sharing it.</p><h2>Delete your data</h2><p>Delete <code>~/.local/state/freeze-capsule</code> to remove capsules and the local key. Uninstalling the package does not delete evidence automatically.</p></article>`);
const terms = () => shell(`<article class="prose"><p class="eyebrow">TERMS SHEET / 01</p><h1>Use the tool at your discretion</h1><p><time datetime="2026-08-28">Effective 28 August 2026</time></p><h2>License</h2><p>Freeze Capsule is free software under the MIT License.</p><h2>No guarantee of capture</h2><p>A hard lock can prevent new data from reaching storage. Available logs also depend on your Linux distribution and account permissions.</p><h2>Your responsibility</h2><p>Review a rendered report before sharing it. Diagnostic output can still contain machine details that matter to you.</p><h2>Warranty</h2><p>The software is provided “as is,” without warranty, as described in the MIT License.</p></article>`);
const notFound = () => shell(`<section class="not-found"><div class="broken-capsule" aria-hidden="true"><i></i><i></i></div><p class="eyebrow">DRAWING NOT FOUND / 404</p><h1>This sheet is missing</h1><p>The address does not match a Freeze Capsule page.</p><a class="primary" href="/" data-link>Return to the home sheet</a></section>`);

function routeFor(pathname: string): Route { return ['/', '/demo', '/privacy', '/terms'].includes(pathname) ? pathname as Route : '/404'; }

function render(pathname = location.pathname, push = false) {
  const route = routeFor(pathname);
  if (push) history.pushState({}, '', route === '/404' ? pathname : route);
  const pages: Record<Route, () => string> = { '/': home, '/demo': demo, '/privacy': privacy, '/terms': terms, '/404': notFound };
  const titles: Record<Route, string> = { '/': 'Freeze Capsule — save Linux freeze clues', '/demo': 'Demo — Freeze Capsule', '/privacy': 'Privacy — Freeze Capsule', '/terms': 'Terms — Freeze Capsule', '/404': 'Page not found — Freeze Capsule' };
  app.innerHTML = pages[route](); document.title = titles[route];
  document.querySelector<HTMLElement>('h1')?.setAttribute('tabindex', '-1');
  document.querySelector<HTMLLinkElement>('#canonical')!.href = `https://freeze-capsule.sociobot.in${route === '/404' ? pathname : route}`;
  bind();
  if (push) { window.scrollTo(0, 0); document.querySelector<HTMLElement>('h1')?.focus({ preventScroll: true }); }
  document.querySelector<HTMLElement>('.route-announcer')!.textContent = titles[route];
}

function bind() {
  document.querySelectorAll<HTMLAnchorElement>('[data-link]').forEach(link => link.addEventListener('click', event => { event.preventDefault(); render(new URL(link.href).pathname, true); }));
  document.querySelector<HTMLButtonElement>('[data-run]')?.addEventListener('click', runDemo);
  document.querySelector<HTMLButtonElement>('[data-check-release]')?.addEventListener('click', () => void loadRelease());
  document.querySelector<HTMLButtonElement>('[data-reset]')?.addEventListener('click', () => { sessionStorage.removeItem('demo:ran'); render('/demo'); });
  document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach(button => button.addEventListener('click', async () => { await navigator.clipboard.writeText(button.dataset.copy ?? ''); button.textContent = 'Copied'; }));
  if (location.pathname === '/demo' && sessionStorage.getItem('demo:ran') === '1') showDemoResult();
  const primaryDownload = document.querySelector<HTMLAnchorElement>('[data-primary-download]');
  if (primaryDownload) primaryDownload.textContent = `Open ${detectedPlatform()} releases`;
}

function runDemo() {
  const button = document.querySelector<HTMLButtonElement>('[data-run]')!;
  const transcript = document.querySelector<HTMLElement>('[data-transcript]')!;
  button.disabled = true; button.textContent = 'Capturing sample…'; transcript.innerHTML = '<span class="prompt">$</span> freeze-capsule demo\n\nEncrypting bundled evidence…';
  window.setTimeout(() => { sessionStorage.setItem('demo:ran', '1'); showDemoResult(); }, matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 500);
}

function showDemoResult() {
  const transcript = document.querySelector<HTMLElement>('[data-transcript]');
  if (transcript) transcript.innerHTML = '<span class="prompt">$</span> freeze-capsule demo\n\nDemo — bundled sample data, nothing is saved to your capsule directory.\nEncrypted sample: /tmp/freeze-capsule-demo/capsule-20260723T143208Z.fcap\nRedacted report: /tmp/freeze-capsule-demo/freeze-report.md\n\n<span class="ok">✓ journal</span>  <span class="ok">✓ graphics</span>  <span class="ok">✓ processes</span>  <span class="ok">✓ display-session</span>';
  const report = document.querySelector<HTMLElement>('[data-report]'); if (report) report.hidden = false;
  const button = document.querySelector<HTMLButtonElement>('[data-run]'); if (button) { button.textContent = 'Sample captured'; button.disabled = true; }
  report?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
}

async function loadRelease() {
  const state = document.querySelector<HTMLElement>('[data-download-state]'); if (!state) return;
  state.textContent = 'Checking the GitHub release…';
  try {
    const cached = localStorage.getItem('release:v1'); if (!cached) throw new Error('empty');
    const parsed = JSON.parse(cached) as { saved: number; value: Release }; if (Date.now() - parsed.saved >= 3_600_000) throw new Error('expired');
    applyRelease(parsed.value, state);
  } catch {
    try { const response = await fetch(API, { headers: { Accept: 'application/vnd.github+json' } }); if (!response.ok) throw new Error('not published'); const release = await response.json() as Release; localStorage.setItem('release:v1', JSON.stringify({ saved: Date.now(), value: release })); applyRelease(release, state); }
    catch { state.textContent = 'Downloads are being published. The release page shows current files.'; }
  }
}

function applyRelease(release: Release, state: HTMLElement) {
  const isArm = /arm|aarch64/i.test(navigator.userAgent);
  const pairs: [string, RegExp][] = [['deb', /amd64\.deb$/], ['rpm', /x86_64\.rpm$/], ['mac', isArm ? /macos-aarch64\.pkg$/ : /macos-x86_64\.pkg$/], ['win', /windows-x86_64\.zip$/]];
  pairs.forEach(([kind, pattern]) => { const asset = release.assets.find(item => pattern.test(item.name)); const link = document.querySelector<HTMLAnchorElement>(`[data-download="${kind}"]`); if (asset && link) link.href = asset.browser_download_url; });
  const platform = detectedPlatform();
  const kind = platform === 'Windows' ? 'win' : platform === 'macOS' ? 'mac' : 'deb';
  const selected = document.querySelector<HTMLAnchorElement>(`[data-download="${kind}"]`);
  const primary = document.querySelector<HTMLAnchorElement>('[data-primary-download]');
  if (selected && primary) { primary.href = selected.href; primary.textContent = `Download for ${platform}`; }
  state.textContent = `${release.tag_name} packages are ready. ${platform} was detected.`;
}

function detectedPlatform() { return /Windows/i.test(navigator.userAgent) ? 'Windows' : /Mac/i.test(navigator.userAgent) ? 'macOS' : 'Linux'; }

window.addEventListener('popstate', () => render());
render();
