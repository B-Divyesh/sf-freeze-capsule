import './style.css';

type Route = '/' | '/demo' | '/privacy' | '/terms' | '/404';
type Release = { tag_name: string; assets: { name: string; browser_download_url: string }[] };
const app = document.querySelector<HTMLDivElement>('#app')!;
const ORIGIN = 'https://freeze-capsule.sociobot.in';
const RELEASES = 'https://github.com/B-Divyesh/sf-freeze-capsule/releases';
const API = 'https://api.github.com/repos/B-Divyesh/sf-freeze-capsule/releases/latest';

const shell = (body: string, isDemo = false) => `
  <div class="route-announcer" aria-live="polite" aria-atomic="true"></div>
  ${isDemo ? `<aside class="demo-bar" aria-label="Demo mode"><span><strong>Demo</strong> — sample data, nothing is saved</span><span><button type="button" data-reset>Reset demo</button><a href="/#install" data-leave-demo>Install Freeze Capsule</a></span></aside>` : ''}
  <header class="site-header">
    <a class="wordmark" href="/" data-link aria-label="Freeze Capsule home"><svg aria-hidden="true" viewBox="0 0 38 24"><path d="M6 2h19a11 11 0 0 1 0 22H6A6 6 0 0 1 6 2Z"/><path d="M17 2v22M8 8h6M8 13h6"/></svg><span>Freeze Capsule</span></a>
    <nav aria-label="Main navigation"><a href="/demo?demo=1" data-link>Demo</a><a href="/#install" data-link>Install</a><a href="/privacy" data-link>Privacy</a></nav>
  </header>
  <main id="main" tabindex="-1">${body}</main>
  <footer><p><strong>Freeze Capsule</strong> · Save Linux freeze clues before reboot.</p><nav aria-label="Footer"><a href="/privacy" data-link>Privacy</a><a href="/terms" data-link>Terms</a><a href="https://sociobot.in" rel="external">Built by Param Factory <span class="sr-only">(external site)</span></a></nav><p class="build">v0.1.1 · build 2026.08</p></footer>`;

const terminal = (interactive = false) => `
  <section class="terminal-sheet" aria-labelledby="terminal-title">
    <div class="plate-label"><span>DETAIL A</span><span>INCLUDED COMMAND-LINE SAMPLE</span></div>
    <div class="terminal-head"><h2 id="terminal-title">See the sample report before installing</h2>${interactive ? '<button class="run-button" type="button" data-run>Replay sample capture</button>' : '<a href="/demo?demo=1" data-link>View the sample report</a>'}</div>
    <div class="terminal" role="region" aria-label="Freeze Capsule demo transcript" tabindex="0"><div class="terminal-dots" aria-hidden="true"><i></i><i></i><i></i></div><pre data-transcript>Loading the bundled command-line sample…</pre></div>
    <p class="terminal-note">This browser report comes from the included command-line demo. <code>freeze-capsule --json demo</code></p>
  </section>`;

const home = () => shell(`
  <section class="hero blueprint-section">
    <div class="hero-copy"><p class="eyebrow">LINUX FIELD TOOL · DRAWING FC–01</p><h1>Save freeze clues before you reboot</h1><p class="lede">For desktop Linux users who need graphics, kernel, process, and session context after a freeze.</p><div class="hero-actions"><a class="primary" href="/demo?demo=1" data-link>Try it with sample data</a><span>See a redacted report in one click.</span></div><ul class="facts"><li><span aria-hidden="true">01</span> Free and open source</li><li><span aria-hidden="true">02</span> Demo data stays separate</li><li><span aria-hidden="true">03</span> Keeps at most eight capsules</li></ul></div>
    <figure class="hero-art"><div class="scan" aria-hidden="true"></div><img src="/assets/freeze-capsule-hero.webp" width="768" height="512" alt="Cutaway drawing of a capsule holding four layers of Linux system evidence." fetchpriority="high" /><figcaption>FIG. 1 — journal · graphics · processes · display session</figcaption></figure>
  </section>
  ${terminal(false)}
  <section class="steps blueprint-section" aria-labelledby="how-title"><div class="section-mark">SEQUENCE / 03</div><h2 id="how-title">How Freeze Capsule keeps pre-freeze evidence</h2><ol><li><span>01</span><div><h3>Keep one snapshot current</h3><p>The watcher records a ten-minute window every 30 seconds.</p></div></li><li><span>02</span><div><h3>Keep the snapshot when the watcher pauses</h3><p>A 90-second pause keeps the last completed snapshot.</p></div></li><li><span>03</span><div><h3>Create a redacted report</h3><p>The report removes home paths, email addresses, IP addresses, and common secrets.</p></div></li></ol></section>
  <section id="install" class="install blueprint-section" aria-labelledby="install-title"><div><div class="section-mark">INSTALLATION PLATE</div><h2 id="install-title">Install the Linux watcher</h2><p>Install Freeze Capsule, then choose when to start the watcher.</p><div class="command"><code>curl -fsSL https://freeze-capsule.sociobot.in/install.sh | sh</code><button type="button" data-copy="curl -fsSL https://freeze-capsule.sociobot.in/install.sh | sh">Copy command</button></div><p class="platform-note" data-download-state aria-live="polite">Find a package on GitHub, or check the published release.</p><div class="release-actions"><a class="primary" data-primary-download href="${RELEASES}">Find Linux packages on GitHub</a><button class="check-release" type="button" data-check-release>Check published packages</button></div><div class="downloads"><a data-download="deb" href="${RELEASES}">Find Linux .deb on GitHub</a><a data-download="rpm" href="${RELEASES}">Find Linux .rpm on GitHub</a><a data-download="mac" href="${RELEASES}">Find macOS .pkg on GitHub</a><a data-download="win" href="${RELEASES}">Find Windows .zip on GitHub</a></div></div><aside><h3>Start and check the watcher</h3><pre><code>freeze-capsule install-service\nfreeze-capsule doctor\nfreeze-capsule hotkey-command</code></pre><p>On Linux, use these commands to set up, check, or trigger the watcher.</p></aside></section>
  <section class="limits blueprint-section" aria-labelledby="limits-title"><div class="section-mark">BOUNDARY NOTES</div><h2 id="limits-title">Know the capture limits</h2><div class="limit-grid"><p><strong>A hard freeze can stop capture.</strong><br />The last completed snapshot remains available.</p><p><strong>Log access follows your account.</strong><br />Unavailable sources appear in the report.</p><p><strong>Review before sharing.</strong><br />Redaction does not remove every machine detail.</p></div></section>`);

const demo = () => shell(`
  <section class="page-head"><p class="eyebrow">SANDBOX / TEMP DIRECTORY</p><h1>Inspect a sample freeze report</h1><p>The sample shows an AMD graphics timeout during a Cinnamon and Chrome freeze.</p></section>
  ${terminal(true)}
  <section class="report-sheet" aria-labelledby="report-title" data-report><div class="report-meta"><span>REDACTED OUTPUT</span><span>2026-07-23 14:32 UTC</span></div><article data-report-content aria-live="polite"><h2 id="report-title">Loading the sample report</h2><p>Reading the bundled command-line fixture…</p></article></section>`, true);

const privacy = () => shell(`<article class="prose"><p class="eyebrow">POLICY SHEET / 01</p><h1>Privacy stays local</h1><p><time datetime="2026-08-28">Effective 28 August 2026</time></p><h2>The command-line tool</h2><p>Capsules and one local key are stored in your state directory. The included demo uses a temporary directory.</p><h2>The website</h2><p>The site does not use accounts, analytics, advertising, or cookies. Checking published packages requests public release details from GitHub.</p><h2>Reports</h2><p>Open each report before sharing it. Redaction covers common private patterns, not every machine detail.</p><h2>Remove local evidence</h2><p>Remove your Freeze Capsule state directory when you want to remove local capsules and the key.</p></article>`);
const terms = () => shell(`<article class="prose"><p class="eyebrow">TERMS SHEET / 01</p><h1>Use the tool at your discretion</h1><p><time datetime="2026-08-28">Effective 28 August 2026</time></p><h2>License</h2><p>Freeze Capsule is free software under the MIT License.</p><h2>No guarantee of capture</h2><p>A hard freeze can prevent a final write. Available logs depend on your Linux distribution and account permissions.</p><h2>Your responsibility</h2><p>Read the redacted report before sharing it.</p><h2>Warranty</h2><p>The software is provided “as is,” without warranty, as described in the MIT License.</p></article>`);
const notFound = () => shell(`<section class="not-found"><div class="broken-capsule" aria-hidden="true"><i></i><i></i></div><p class="eyebrow">DRAWING NOT FOUND / 404</p><h1>This sheet is missing</h1><p>The address does not match a Freeze Capsule page.</p><a class="primary" href="/" data-link>Return to the home sheet</a></section>`);

function routeFor(pathname: string): Route { return ['/', '/demo', '/privacy', '/terms'].includes(pathname) ? pathname as Route : '/404'; }

function render(pathname = location.pathname, push = false, focus = false) {
  const route = routeFor(pathname);
  // Demo storage is disposable. Clearing it at the route boundary, rather than
  // only on one banner control, also covers the wordmark, header links,
  // browser history, unknown routes, and a stale tab reopened outside /demo.
  if (route !== '/demo') clearDemo();
  if (push) history.pushState({}, '', route === '/404' ? pathname : route);
  const pages: Record<Route, () => string> = { '/': home, '/demo': demo, '/privacy': privacy, '/terms': terms, '/404': notFound };
  const titles: Record<Route, string> = { '/': 'Freeze Capsule — save Linux freeze clues', '/demo': 'Demo — Freeze Capsule', '/privacy': 'Privacy — Freeze Capsule', '/terms': 'Terms — Freeze Capsule', '/404': 'Page not found — Freeze Capsule' };
  app.innerHTML = pages[route](); document.title = titles[route];
  document.querySelector<HTMLElement>('h1')?.setAttribute('tabindex', '-1');
  const description: Record<Route, string> = { '/': 'Keep Linux freeze clues ready before reboot, then create a redacted report.', '/demo': 'Inspect a bundled, redacted Linux freeze report without saving real data.', '/privacy': 'Read how Freeze Capsule keeps browser demo data separate.', '/terms': 'Read the MIT license terms and capture limits.', '/404': 'The requested Freeze Capsule page was not found.' };
  const url = ORIGIN + (route === '/404' ? pathname : route);
  document.querySelector<HTMLLinkElement>('#canonical')!.href = url;
  document.querySelector<HTMLMetaElement>('meta[name="description"]')!.content = description[route];
  document.querySelector<HTMLMetaElement>('meta[property="og:title"]')!.content = titles[route];
  document.querySelector<HTMLMetaElement>('meta[property="og:description"]')!.content = description[route];
  document.querySelector<HTMLMetaElement>('meta[property="og:url"]')!.content = url;
  document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]')!.content = titles[route];
  document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]')!.content = description[route];
  document.querySelector<HTMLMetaElement>('meta[name="robots"]')!.content = route === '/404' ? 'noindex,follow' : 'index,follow';
  bind();
  if (push || focus) { window.scrollTo(0, 0); document.querySelector<HTMLElement>('h1')?.focus({ preventScroll: true }); }
  document.querySelector<HTMLElement>('.route-announcer')!.textContent = titles[route];
  if (route === '/demo') void loadDemoFixture();
  if (route === '/') void loadTerminalFixture();
}

function bind() {
  document.querySelectorAll<HTMLAnchorElement>('[data-link]').forEach(link => link.addEventListener('click', event => { event.preventDefault(); const url = new URL(link.href); history.pushState({}, '', url.pathname + url.search + url.hash); render(url.pathname, false, true); }));
  document.querySelector<HTMLButtonElement>('[data-run]')?.addEventListener('click', () => void replayDemo());
  document.querySelector<HTMLButtonElement>('[data-check-release]')?.addEventListener('click', () => void loadRelease());
  document.querySelector<HTMLButtonElement>('[data-reset]')?.addEventListener('click', () => { clearDemo(); void loadDemoFixture(); });
  document.querySelector<HTMLAnchorElement>('[data-leave-demo]')?.addEventListener('click', event => { event.preventDefault(); clearDemo(); render('/', true, true); window.setTimeout(() => document.querySelector('#install')?.scrollIntoView(), 0); });
  document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach(button => button.addEventListener('click', async () => { await navigator.clipboard.writeText(button.dataset.copy ?? ''); button.textContent = 'Copied'; }));
  const primaryDownload = document.querySelector<HTMLAnchorElement>('[data-primary-download]');
  if (primaryDownload) primaryDownload.textContent = `Open ${detectedPlatform()} releases`;
}

function clearDemo() { Object.keys(sessionStorage).filter(key => key.startsWith('demo:')).forEach(key => sessionStorage.removeItem(key)); }
function safe(text: string) { return text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;'); }
async function fixture() { const response = await fetch('/assets/demo-report.json'); if (!response.ok) throw new Error('fixture unavailable'); return response.json() as Promise<{ transcript: string; report: string }>; }
async function loadTerminalFixture() { try { const data = await fixture(); const target = document.querySelector<HTMLElement>('[data-transcript]'); if (target) target.textContent = data.transcript; } catch { /* shell stays readable if an asset is unavailable */ } }
async function loadDemoFixture() { try { const data = await fixture(); const transcript = document.querySelector<HTMLElement>('[data-transcript]'); const report = document.querySelector<HTMLElement>('[data-report-content]'); if (transcript) transcript.textContent = data.transcript; if (report) report.innerHTML = '<h2 id="report-title">Freeze Capsule report</h2><pre>' + safe(data.report) + '</pre>'; sessionStorage.setItem('demo:loaded', '1'); } catch { const report = document.querySelector<HTMLElement>('[data-report-content]'); if (report) report.innerHTML = '<h2 id="report-title">Sample unavailable</h2><p>Reload the page to load the bundled report.</p>'; } }
async function replayDemo() { const button = document.querySelector<HTMLButtonElement>('[data-run]'); if (button) { button.disabled = true; button.textContent = 'Replaying sample…'; } await loadDemoFixture(); if (button) { button.disabled = false; button.textContent = 'Replay sample capture'; } }

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

window.addEventListener('popstate', () => render(location.pathname, false, true));
render();
