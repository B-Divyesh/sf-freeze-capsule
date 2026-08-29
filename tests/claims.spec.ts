import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { execFileSync, spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { createServer } from 'node:http';
import { chmodSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { parse } from 'yaml';

test('@claim:sample-report one click opens the bundled freeze report', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('link', { name: 'Try it with sample data' }).click();
  const report = page.getByRole('heading', { name: 'Freeze Capsule report' });
  await expect(report).toBeVisible();
  await expect(page.locator('[data-report-content]')).toContainText('amdgpu');
  await expect(page.locator('[data-report-content]')).toContainText('Cinnamon');
  await expect(page.locator('[data-report-content]')).toContainText('chrome');
  for (const kind of ['journal', 'graphics', 'processes', 'display-session']) {
    const box = await page.locator(`[data-evidence="${kind}"]`).boundingBox();
    expect(box, `${kind} excerpt exists`).not.toBeNull();
    expect(box!.y, `${kind} excerpt starts in the first screen`).toBeLessThan(844);
    expect(box!.y + box!.height, `${kind} excerpt is fully in the first screen`).toBeLessThanOrEqual(844);
  }
});

test('@claim:demo-private demo makes no third-party request', async ({ page }) => {
  const foreign: string[] = [];
  const demoKeys = () => page.evaluate(() => Object.keys(sessionStorage).filter(key => key.startsWith('demo:')));
  page.on('request', request => {
    if (new URL(request.url()).origin !== 'http://127.0.0.1:4173') foreign.push(request.url());
  });
  await page.goto('/');
  await page.evaluate(() => { localStorage.setItem('real:marker', 'keep'); sessionStorage.setItem('real:marker', 'keep'); });
  await page.getByRole('link', { name: 'Try it with sample data' }).click();
  await expect(page.getByRole('heading', { name: 'Freeze Capsule report' })).toBeVisible();
  expect(foreign).toEqual([]);
  expect(await demoKeys()).toEqual(['demo:loaded']);
  await page.evaluate(() => sessionStorage.setItem('demo:changed', 'discard'));
  await page.getByRole('button', { name: 'Reset demo' }).click();
  await expect(page.getByRole('heading', { name: 'Freeze Capsule report' })).toBeVisible();
  await expect.poll(demoKeys).toEqual(['demo:loaded']);
  expect(await page.evaluate(() => localStorage.getItem('real:marker'))).toBe('keep');
  expect(await page.evaluate(() => sessionStorage.getItem('real:marker'))).toBe('keep');
  await page.getByRole('link', { name: 'Install Freeze Capsule' }).click();
  expect(await demoKeys()).toEqual([]);
  await expect(page.getByRole('heading', { name: 'Install the Linux watcher' })).toBeInViewport();
  expect(await page.evaluate(() => localStorage.getItem('real:marker'))).toBe('keep');
  expect(await page.evaluate(() => sessionStorage.getItem('real:marker'))).toBe('keep');
  await page.evaluate(() => { localStorage.removeItem('real:marker'); sessionStorage.removeItem('real:marker'); });

  await page.goto('/demo?demo=1');
  await expect(page.getByRole('heading', { name: 'Freeze Capsule report' })).toBeVisible();
  expect(await demoKeys()).toEqual(['demo:loaded']);
  await page.getByRole('link', { name: 'Privacy' }).first().click();
  await expect(page).toHaveURL('/privacy');
  expect(await demoKeys()).toEqual([]);

  await page.goto('/demo?demo=1');
  await expect(page.getByRole('heading', { name: 'Freeze Capsule report' })).toBeVisible();
  await page.getByRole('link', { name: 'Freeze Capsule home' }).click();
  await expect(page).toHaveURL('/');
  expect(await demoKeys()).toEqual([]);

  await page.goto('/');
  await page.getByRole('link', { name: 'Try it with sample data' }).click();
  await expect(page.getByRole('heading', { name: 'Freeze Capsule report' })).toBeVisible();
  expect(await demoKeys()).toEqual(['demo:loaded']);
  await page.goBack();
  await expect(page).toHaveURL('/');
  expect(await demoKeys()).toEqual([]);

  await page.goto('/demo?demo=1');
  await expect(page.getByRole('heading', { name: 'Freeze Capsule report' })).toBeVisible();
  await page.goto('/404.html');
  await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible();
  expect(await demoKeys()).toEqual([]);
});

test('@claim:demo-capture-render the CLI demo executes its encrypted capture and render path', () => {
  const output = execFileSync('cargo', ['run', '--quiet', '--', '--json', 'demo'], { encoding: 'utf8' });
  const result = JSON.parse(output) as { capsule: string; report: string; temporary: boolean };
  expect(result.temporary).toBe(true);
  expect(existsSync(result.capsule)).toBe(true);
  expect(existsSync(result.report)).toBe(true);
  rmSync(result.capsule.replace(/\/capsule-[^/]+$/, ''), { recursive: true, force: true });
});

test('@claim:encrypted-redacted CLI demo encrypts evidence and writes a redacted report', () => {
  const output = execFileSync('cargo', ['run', '--quiet', '--', '--json', 'demo'], { encoding: 'utf8' });
  const result = JSON.parse(output) as { capsule: string; report: string };
  const encrypted = readFileSync(result.capsule);
  expect(encrypted.subarray(0, 6).toString()).toBe('FCAP1\0');
  expect(encrypted.toString()).not.toContain('amdgpu');
  const report = readFileSync(result.report, 'utf8');
  expect(report).toContain('journal');
  expect(report).toContain('graphics');
  expect(report).toContain('processes');
  expect(report).toContain('display-session');
  expect(report).toContain('[EMAIL]');
  expect(report).toContain('[IP]');
  expect(report).toContain('/home/[USER]');
  expect(report).toContain('token=[REDACTED]');
  expect(report).not.toContain('alex.freeze@example.test');
  expect(report).not.toContain('198.51.100.17');
  expect(report).not.toContain('sample-only-token');
  rmSync(result.capsule.replace(/\/capsule-[^/]+$/, ''), { recursive: true, force: true });
});

test('@claim:redaction-coverage report rendering replaces home paths, emails, IPs, and secrets', () => {
  const output = execFileSync('cargo', ['test', 'redacts_private_values'], { encoding: 'utf8' });
  expect(output).toContain('test result: ok');
});

test('@claim:bounded-retention retention keeps no more than eight capsules', () => {
  const output = execFileSync('cargo', ['test', 'retention_is_bounded'], { encoding: 'utf8' });
  expect(output).toContain('test result: ok');
});

test('@claim:free-license repository ships the MIT license', () => {
  const license = readFileSync('LICENSE', 'utf8');
  expect(license).toContain('MIT License');
  expect(license).toContain('THE SOFTWARE IS PROVIDED "AS IS"');
});

test('@claim:watchdog-gap a scheduling pause promotes the last completed snapshot', () => {
  expect(execFileSync('sh', ['tests/watchdog.sh'], { encoding: 'utf8' })).toContain('watchdog gap promotion: ok');
});

test('@claim:rolling-snapshot the service uses a ten-minute window every 30 seconds', () => {
  const output = execFileSync('cargo', ['test', 'rolling_snapshot_contract_uses_the_documented_window_and_cadence'], { encoding: 'utf8' });
  expect(output).toContain('test result: ok');
});

test('@claim:cli-local-only the CLI demo stays local with network connections blocked', () => {
  expect(execFileSync('sh', ['tests/cli-local-only.sh'], { encoding: 'utf8' })).toContain('cli demo local-only: ok');
});

test('every declared claim has exactly one tagged regression test', () => {
  const claims = JSON.parse(readFileSync('.factory/claims.json', 'utf8')) as { id: string }[];
  const sources = readdirSync('tests')
    .filter(name => /\.(?:ts|sh|c)$/.test(name))
    .map(name => readFileSync(join('tests', name), 'utf8'))
    .join('\n');
  const tags = [...sources.matchAll(/@claim:([a-z0-9-]+)/g)].map(match => match[1]);
  expect(new Set(tags)).toEqual(new Set(claims.map(claim => claim.id)));
  for (const claim of claims) expect(tags.filter(tag => tag === claim.id)).toHaveLength(1);
});

test('static asset headers are immutable while HTML revalidates', () => {
  const config = JSON.parse(readFileSync('site/public/staticwebapp.config.json', 'utf8')) as {
    globalHeaders: Record<string, string>;
    routes: { route: string; headers?: Record<string, string> }[];
  };
  expect(config.globalHeaders['Cache-Control']).toBe('public, max-age=0, must-revalidate');
  const assets = config.routes.find(route => route.route === '/assets/*');
  expect(assets?.headers?.['Cache-Control']).toBe('public, max-age=31536000, immutable');
});

test('standalone 404 inline assets match the deployed content-security policy', () => {
  const config = JSON.parse(readFileSync('site/public/staticwebapp.config.json', 'utf8')) as { globalHeaders: Record<string, string> };
  const missing = readFileSync('site/public/404.html', 'utf8');
  for (const tag of ['style', 'script']) {
    const contents = missing.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`))?.[1];
    expect(contents, `${tag} contents`).toBeTruthy();
    const hash = createHash('sha256').update(contents!).digest('base64');
    expect(config.globalHeaders['Content-Security-Policy']).toContain(`'sha256-${hash}'`);
  }
});

test('all public routes have one heading and no serious accessibility findings', async ({ page }) => {
  for (const route of ['/', '/demo', '/privacy', '/terms', '/missing-sheet', '/404.html']) {
    await page.goto(route);
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page).toHaveTitle(/Freeze Capsule/);
    const results = await new AxeBuilder({ page: page as never }).analyze();
    expect(results.violations.filter(item => ['serious', 'critical'].includes(item.impact ?? ''))).toEqual([]);
  }
});

test('keyboard route changes focus the page heading', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Demo', exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/demo\?demo=1$/);
  await expect(page.locator('h1')).toBeFocused();
  await page.goBack();
  await expect(page.locator('h1')).toBeFocused();
  await page.goForward();
  await expect(page.locator('h1')).toBeFocused();
});

test('install hash links scroll, focus, and restore on browser history', async ({ page }) => {
  await page.goto('/#install');
  const installHeading = page.getByRole('heading', { name: 'Install the Linux watcher' });
  await expect(installHeading).toBeInViewport();
  await expect(installHeading).toBeFocused();

  await page.goto('/');
  await page.getByRole('link', { name: 'Install', exact: true }).click();
  await expect(page).toHaveURL('/#install');
  await expect(installHeading).toBeInViewport();
  await expect(installHeading).toBeFocused();
  await page.goBack();
  await expect(page).toHaveURL('/');
  await expect(page.locator('h1')).toBeFocused();
  await page.goForward();
  await expect(page).toHaveURL('/#install');
  await expect(installHeading).toBeInViewport();
  await expect(installHeading).toBeFocused();
});

test('mobile first screen shows the tested price, local-storage, and no-network facts', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  for (const element of [
    page.getByRole('heading', { level: 1 }),
    page.getByRole('link', { name: 'Try it with sample data' }),
    page.getByText('See a redacted report in one click.', { exact: true }),
    page.locator('.facts li').filter({ hasText: 'Free under the MIT License' }),
    page.locator('.facts li').filter({ hasText: 'Freeze Capsule stores capsules and the key in a folder on your computer' }),
    page.locator('.facts li').filter({ hasText: 'The command-line demo makes no network connection' }),
  ]) await expect(element).toBeInViewport();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  await page.goto('/demo');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});

test('@claim:sample-fixture browser fixture is generated from the CLI demo report', () => {
  const expected = JSON.parse(execFileSync('cargo', ['run', '--quiet', '--', '--json', 'demo'], { encoding: 'utf8' })) as { capsule: string; report: string };
  const fixture = JSON.parse(readFileSync('site/public/assets/demo-report.json', 'utf8')) as { report: string };
  expect(fixture.report).toBe(readFileSync(expected.report, 'utf8'));
  rmSync(expected.capsule.replace(/\/capsule-[^/]+$/, ''), { recursive: true, force: true });
});

test('known static routes and the real 404 configuration are explicit', () => {
  const config = JSON.parse(readFileSync('site/public/staticwebapp.config.json', 'utf8')) as { routes: { route: string; rewrite?: string; statusCode?: number }[]; responseOverrides: { '404': { rewrite: string } } };
  expect(config.routes.filter(route => ['/demo', '/privacy', '/terms'].includes(route.route)).every(route => route.rewrite === '/index.html')).toBe(true);
  expect(config.routes.filter(route => ['/404.html', '/favicon.svg', '/apple-touch-icon.png', '/robots.txt', '/sitemap.xml', '/install.sh', '/install.ps1'].includes(route.route))).toHaveLength(7);
  expect(config.routes.find(route => route.route === '/*')).toMatchObject({ statusCode: 404 });
  expect(config.responseOverrides['404'].rewrite).toBe('/404.html');
  const missing = readFileSync('site/public/404.html', 'utf8');
  for (const text of ['noindex,follow', 'Skip to main content', 'Install', 'Privacy', 'Terms', 'Built by Param Factory', 'v0.1.1', 'apple-touch-icon', 'og:image', 'twitter:image', 'sessionStorage', '<style>']) expect(missing).toContain(text);
});

test('every visible app and static-404 control meets the 44 pixel mobile touch-target baseline', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of ['/', '/demo?demo=1', '/privacy', '/terms', '/missing-sheet', '/404.html']) {
    await page.goto(route);
    if (route.startsWith('/demo')) await expect(page.getByRole('heading', { name: 'Freeze Capsule report' })).toBeVisible();
    const undersized = await page.locator('a, button, summary').evaluateAll(elements => elements
      .filter(element => {
        const style = getComputedStyle(element);
        return style.display !== 'none' && style.visibility !== 'hidden' && element.getClientRects().length > 0;
      })
      .map(element => {
        const box = element.getBoundingClientRect();
        return { name: element.textContent?.trim() || element.getAttribute('aria-label') || element.tagName, width: box.width, height: box.height };
      })
      .filter(control => control.width < 44 || control.height < 44));
    expect(undersized, route).toEqual([]);
  }
});

test('release lookup failure shows a calm fallback without console errors', async ({ page }) => {
  await page.route('https://api.github.com/**', route => route.abort());
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await page.getByRole('button', { name: 'Check published packages' }).click();
  await expect(page.getByText('Package check failed. Open the GitHub release page to see current files.')).toBeVisible();
  expect(errors).toEqual([]);
});

test('clipboard denial explains how to copy the install command manually', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: () => Promise.reject(new DOMException('denied', 'NotAllowedError')) } });
  });
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/#install');
  await page.getByRole('button', { name: 'Copy command' }).click();
  await expect(page.getByRole('status')).toHaveText('Could not copy. Select the command and copy it manually.');
  expect(errors).toEqual([]);
});

test('@claim:linux-live-capture Linux collection requests every documented source', () => {
  const output = execFileSync('cargo', ['test', 'linux_collector_requests_each_documented_source'], { encoding: 'utf8' });
  expect(output).toContain('test result: ok');
});

test('@claim:linux-only-capture non-Linux capture returns only an unavailable platform result', () => {
  const output = execFileSync('cargo', ['test', 'non_linux_collection_returns_only_an_unavailable_platform_result'], { encoding: 'utf8' });
  expect(output).toContain('test result: ok');
});

test('@claim:hard-freeze-limit a stopped watcher preserves the last completed snapshot', () => {
  expect(execFileSync('sh', ['tests/watchdog.sh'], { encoding: 'utf8' })).toContain('watchdog gap promotion: ok');
});

test('@claim:limited-source-report missing commands and unreadable sources remain reportable', () => {
  const output = execFileSync('cargo', ['test', 'unavailable_sources_stay_in_a_renderable_report'], { encoding: 'utf8' });
  expect(output).toContain('test result: ok');
});

test('@claim:hotkey-capture the printed desktop command creates a retained capsule', () => {
  const root = join(tmpdir(), `freeze-capsule-hotkey-${process.pid}-${Date.now()}`);
  try {
    execFileSync('cargo', ['build', '--quiet']);
    const command = execFileSync('target/debug/freeze-capsule', ['hotkey-command'], { encoding: 'utf8' }).trim().split(/\s+/);
    expect(command).toEqual(['freeze-capsule', 'capture', '--reason', 'hotkey']);
    execFileSync('target/debug/freeze-capsule', ['--capsule-dir', root, ...command.slice(1)]);
    expect(readdirSync(root).some(name => /^capsule-.*\.fcap$/.test(name))).toBe(true);
  } finally { rmSync(root, { recursive: true, force: true }); }
});

test('@claim:installer-checksum both installers accept valid checksums and reject changed checksums before copying', async () => {
  test.setTimeout(180_000);
  const root = mkdtempSync(join(tmpdir(), 'freeze-capsule-installers-'));
  const unixStage = join(root, 'unix-stage');
  const windowsStage = join(root, 'windows-stage');
  mkdirSync(unixStage);
  mkdirSync(windowsStage);
  writeFileSync(join(unixStage, 'freeze-capsule'), '#!/bin/sh\necho fixture binary\n');
  chmodSync(join(unixStage, 'freeze-capsule'), 0o755);
  writeFileSync(join(windowsStage, 'freeze-capsule.exe'), 'fixture windows binary\n');
  const unixAsset = 'freeze-capsule-linux-x86_64.tar.gz';
  const windowsAsset = 'freeze-capsule-windows-x86_64.zip';
  execFileSync('tar', ['-C', unixStage, '-czf', join(root, unixAsset), 'freeze-capsule']);
  execFileSync('zip', ['-q', join(root, windowsAsset), 'freeze-capsule.exe'], { cwd: windowsStage });
  const digest = (name: string) => createHash('sha256').update(readFileSync(join(root, name))).digest('hex');
  const checksums = `${digest(unixAsset)}  ${unixAsset}\n${digest(windowsAsset)}  ${windowsAsset}\n`;
  const server = createServer((request, response) => {
    const path = request.url ?? '';
    if (path.endsWith('/SHA256SUMS')) {
      response.end(path.startsWith('/tampered/') ? checksums.replace(/[a-f0-9]{64}/g, '0'.repeat(64)) : checksums);
      return;
    }
    const name = path.split('/').at(-1) ?? '';
    if (![unixAsset, windowsAsset].includes(name)) { response.writeHead(404).end(); return; }
    response.end(readFileSync(join(root, name)));
  });
  await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  if (!address || typeof address === 'string') throw new Error('fixture server did not bind');
  const run = (file: string, args: string[], env: NodeJS.ProcessEnv) => new Promise<{ code: number; output: string }>((resolve, reject) => {
    const child = spawn(file, args, { cwd: process.cwd(), env: { ...process.env, ...env } });
    let output = '';
    child.stdout.on('data', value => { output += value; });
    child.stderr.on('data', value => { output += value; });
    child.on('error', reject);
    child.on('close', code => resolve({ code: code ?? -1, output }));
  });
  try {
    const pwsh = execFileSync('sh', ['tests/ensure-pwsh.sh'], { encoding: 'utf8' }).trim();
    const base = `http://127.0.0.1:${address.port}`;
    const posixInstall = join(root, 'posix-valid');
    const powershellInstall = join(root, 'powershell-valid');
    const goodPosix = await run('sh', ['site/public/install.sh'], { FREEZE_CAPSULE_RELEASE_BASE: `${base}/valid`, FREEZE_CAPSULE_INSTALL_DIR: posixInstall });
    expect(goodPosix.code, goodPosix.output).toBe(0);
    expect(readFileSync(join(posixInstall, 'freeze-capsule'), 'utf8')).toContain('fixture binary');
    const goodPowerShell = await run(pwsh, ['-NoLogo', '-NoProfile', '-NonInteractive', '-File', 'site/public/install.ps1'], { FREEZE_CAPSULE_RELEASE_BASE: `${base}/valid`, FREEZE_CAPSULE_INSTALL_DIR: powershellInstall });
    expect(goodPowerShell.code, goodPowerShell.output).toBe(0);
    expect(readFileSync(join(powershellInstall, 'freeze-capsule.exe'), 'utf8')).toBe('fixture windows binary\n');

    const badPosixInstall = join(root, 'posix-tampered');
    const badPowerShellInstall = join(root, 'powershell-tampered');
    const badPosix = await run('sh', ['site/public/install.sh'], { FREEZE_CAPSULE_RELEASE_BASE: `${base}/tampered`, FREEZE_CAPSULE_INSTALL_DIR: badPosixInstall });
    expect(badPosix.code).not.toBe(0);
    expect(badPosix.output).toContain('Checksum verification failed.');
    expect(existsSync(join(badPosixInstall, 'freeze-capsule'))).toBe(false);
    const badPowerShell = await run(pwsh, ['-NoLogo', '-NoProfile', '-NonInteractive', '-File', 'site/public/install.ps1'], { FREEZE_CAPSULE_RELEASE_BASE: `${base}/tampered`, FREEZE_CAPSULE_INSTALL_DIR: badPowerShellInstall });
    expect(badPowerShell.code).not.toBe(0);
    expect(badPowerShell.output).toContain('Checksum verification failed.');
    expect(existsSync(join(badPowerShellInstall, 'freeze-capsule.exe'))).toBe(false);
  } finally {
    await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
    rmSync(root, { recursive: true, force: true });
  }
});

test('@claim:json-output documented list and report commands return structured JSON', () => {
  const root = join(tmpdir(), `freeze-capsule-json-${process.pid}-${Date.now()}`);
  try {
    execFileSync('cargo', ['build', '--quiet']);
    execFileSync('target/debug/freeze-capsule', ['--capsule-dir', root, 'capture']);
    const listed = JSON.parse(execFileSync('target/debug/freeze-capsule', ['--capsule-dir', root, '--json', 'list'], { encoding: 'utf8' })) as string[];
    expect(listed).toHaveLength(1);
    const report = JSON.parse(execFileSync('target/debug/freeze-capsule', ['--capsule-dir', root, 'render', 'latest', '--format', 'json'], { encoding: 'utf8' })) as { sections: { name: string; status: string }[] };
    expect(report.sections.some(section => section.name === 'journal' && section.status.length > 0)).toBe(true);
  } finally { rmSync(root, { recursive: true, force: true }); }
});

test('@claim:encryption-format capsules use the FCAP1 XChaCha nonce layout and a 32-byte local key', () => {
  expect(execFileSync('cargo', ['test', 'encrypted_round_trip_has_no_plaintext'], { encoding: 'utf8' })).toContain('test result: ok');
});

test('@claim:key-permissions Unix local keys are owner-readable only', () => {
  expect(execFileSync('cargo', ['test', 'local_key_is_created_with_owner_only_permissions'], { encoding: 'utf8' })).toContain('test result: ok');
});

test('@claim:current-snapshot current rolling evidence does not use a saved-capsule slot', () => {
  expect(execFileSync('cargo', ['test', 'current_snapshot_does_not_use_a_retained_capsule_slot'], { encoding: 'utf8' })).toContain('test result: ok');
});

test('@claim:build-output site and release builds write the documented output paths', () => {
  expect(existsSync('dist/site/index.html')).toBe(true);
  execFileSync('cargo', ['build', '--locked', '--release'], { encoding: 'utf8' });
  expect(existsSync('target/release/freeze-capsule')).toBe(true);
});

test('@claim:release-workflow-declaration release workflow declares three operating-system package jobs without signing', () => {
  const workflow = parse(readFileSync('.github/workflows/release.yml', 'utf8')) as {
    on: { push: { tags: string[] }; workflow_dispatch: unknown };
    jobs: Record<string, { needs?: string; strategy?: { matrix?: { include?: { os: string; target: string; asset: string }[] } }; steps?: { name?: string; run?: string; uses?: string }[] }>;
  };
  expect(workflow.on.push.tags).toEqual(['v*']);
  expect(workflow.on).toHaveProperty('workflow_dispatch');
  expect(workflow.jobs.build.strategy?.matrix?.include).toEqual(expect.arrayContaining([
    expect.objectContaining({ os: 'ubuntu-latest', asset: 'linux-x86_64' }),
    expect.objectContaining({ os: 'macos-latest', asset: 'macos-x86_64' }),
    expect.objectContaining({ os: 'macos-latest', asset: 'macos-aarch64' }),
    expect.objectContaining({ os: 'windows-latest', asset: 'windows-x86_64' }),
  ]));
  expect(workflow.jobs.release.needs).toBe('build');
  const executableSteps = Object.values(workflow.jobs).flatMap(job => job.steps ?? []).map(step => `${step.uses ?? ''}\n${step.run ?? ''}`).join('\n');
  expect(executableSteps).not.toMatch(/\bcodesign\b|\bsigntool\b|\bnotarytool\b|osslsigncode/i);
});

test('@claim:normal-state-directory normal capture keeps one key and capsules beneath XDG state', () => {
  const state = join(tmpdir(), `freeze-capsule-state-${process.pid}-${Date.now()}`);
  const root = join(state, 'freeze-capsule');
  try {
    execFileSync('cargo', ['build', '--quiet']);
    execFileSync('target/debug/freeze-capsule', ['capture'], { env: { ...process.env, XDG_STATE_HOME: state } });
    expect(readFileSync(join(root, 'capsule.key'))).toHaveLength(32);
    expect(readdirSync(root).filter(name => /^capsule-.*\.fcap$/.test(name))).toHaveLength(1);
  } finally { rmSync(state, { recursive: true, force: true }); }
});

test('@claim:local-evidence-removal removing the documented normal-state folder removes the local key and saved capsules', () => {
  const state = join(tmpdir(), `freeze-capsule-removal-${process.pid}-${Date.now()}`);
  const root = join(state, 'freeze-capsule');
  try {
    execFileSync('cargo', ['build', '--quiet']);
    execFileSync('target/debug/freeze-capsule', ['capture'], { env: { ...process.env, XDG_STATE_HOME: state } });
    expect(existsSync(join(root, 'capsule.key'))).toBe(true);
    expect(readdirSync(root).some(name => /^capsule-.*\.fcap$/.test(name))).toBe(true);
    rmSync(root, { recursive: true, force: true });
    expect(existsSync(root)).toBe(false);
    expect(existsSync(join(root, 'capsule.key'))).toBe(false);
  } finally { rmSync(state, { recursive: true, force: true }); }
});

test('@claim:site-no-tracking static routes use no cookies, analytics, advertising, or third-party requests', async ({ page }) => {
  const foreign: string[] = [];
  page.on('request', request => { if (new URL(request.url()).origin !== 'http://127.0.0.1:4173') foreign.push(request.url()); });
  for (const route of ['/', '/demo?demo=1', '/privacy', '/terms']) await page.goto(route);
  expect(foreign).toEqual([]);
  expect(await page.context().cookies()).toEqual([]);
  expect(await page.evaluate(() => Object.keys(localStorage))).toEqual([]);
});

test('@claim:release-lookup-request GitHub release details are requested only after the explicit check action', async ({ page }) => {
  const githubRequests: string[] = [];
  page.on('request', request => { if (request.url().startsWith('https://api.github.com/')) githubRequests.push(request.url()); });
  await page.route('https://api.github.com/**', route => route.fulfill({ contentType: 'application/json', body: JSON.stringify({ tag_name: 'v-test', assets: [{ name: 'freeze-capsule_0.1.1_amd64.deb', browser_download_url: 'https://downloads.example.test/freeze-capsule_0.1.1_amd64.deb' }] }) }));
  await page.goto('/');
  expect(githubRequests).toEqual([]);
  await page.getByRole('button', { name: 'Check published packages' }).click();
  await expect(page.getByText('v-test Linux .deb package is ready.')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Download for Linux' })).toHaveAttribute('href', 'https://downloads.example.test/freeze-capsule_0.1.1_amd64.deb');
  expect(githubRequests).toHaveLength(1);
});

test('@claim:platform-package-selection package checks select only compatible desktop assets', async ({ browser }) => {
  const releasePage = 'https://github.com/B-Divyesh/sf-freeze-capsule/releases';
  const assets = [
    'freeze-capsule_0.1.1_amd64.deb',
    'freeze-capsule-0.1.1-1.x86_64.rpm',
    'freeze-capsule-macos-aarch64.pkg',
    'freeze-capsule-macos-x86_64.pkg',
    'freeze-capsule-windows-x86_64.zip',
  ].map(name => ({ name, browser_download_url: `https://downloads.example.test/${name}` }));

  async function checkedPage(userAgent: string, releaseAssets = assets) {
    const context = await browser.newContext({ userAgent, viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    await page.route('https://api.github.com/**', route => route.fulfill({ contentType: 'application/json', body: JSON.stringify({ tag_name: 'v-test', assets: releaseAssets }) }));
    await page.goto('/#install');
    await page.getByRole('button', { name: 'Check published packages' }).click();
    return { context, page };
  }

  const android = await checkedPage('Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 Chrome/120.0 Mobile Safari/537.36');
  await expect(android.page.getByText('Choose a package on your desktop.')).toBeVisible();
  await expect(android.page.getByRole('link', { name: 'Choose a package on your desktop' })).toHaveAttribute('href', releasePage);
  await expect(android.page.locator('[data-primary-download]')).not.toHaveText(/Download for/);
  await android.context.close();

  const iphone = await checkedPage('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Version/17.0 Mobile/15E148 Safari/604.1');
  await expect(iphone.page.getByText('Choose a package on your desktop.')).toBeVisible();
  await expect(iphone.page.getByRole('link', { name: 'Choose a package on your desktop' })).toHaveAttribute('href', releasePage);
  await expect(iphone.page.locator('[data-primary-download]')).not.toHaveText(/Download for/);
  await iphone.context.close();

  const linux = await checkedPage('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120.0 Safari/537.36');
  await expect(linux.page.getByText('v-test Linux .deb package is ready.')).toBeVisible();
  await expect(linux.page.getByRole('link', { name: 'Download for Linux' })).toHaveAttribute('href', 'https://downloads.example.test/freeze-capsule_0.1.1_amd64.deb');
  await expect(linux.page.getByRole('link', { name: 'Download Linux .deb' })).toHaveAttribute('href', 'https://downloads.example.test/freeze-capsule_0.1.1_amd64.deb');
  await expect(linux.page.getByRole('link', { name: 'Download macOS Apple silicon .pkg' })).toHaveAttribute('href', 'https://downloads.example.test/freeze-capsule-macos-aarch64.pkg');
  await linux.context.close();

  const windows = await checkedPage('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0 Safari/537.36');
  await expect(windows.page.getByText('v-test Windows .zip package is ready.')).toBeVisible();
  await expect(windows.page.getByRole('link', { name: 'Download for Windows' })).toHaveAttribute('href', 'https://downloads.example.test/freeze-capsule-windows-x86_64.zip');
  await windows.context.close();

  const mac = await checkedPage('Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605.1.15 Version/17.0 Safari/605.1.15');
  await expect(mac.page.getByText('Choose the matching macOS package for your Mac.')).toBeVisible();
  await expect(mac.page.getByRole('link', { name: 'Choose the matching macOS package' })).toHaveAttribute('href', releasePage);
  await expect(mac.page.locator('[data-primary-download]')).not.toHaveText(/Download for/);
  await mac.context.close();

  const missing = await checkedPage('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120.0 Safari/537.36', []);
  await expect(missing.page.getByText('v-test does not include a Linux .deb package. Open the GitHub release page to see current files.')).toBeVisible();
  await expect(missing.page.getByRole('link', { name: 'Open Linux releases' })).toHaveAttribute('href', releasePage);
  await expect(missing.page.getByRole('link', { name: 'Find Linux .deb on GitHub' })).toHaveAttribute('href', releasePage);
  await missing.context.close();
});

test('@claim:redaction-limits reports redact selected private patterns while retaining hardware detail for review', () => {
  expect(execFileSync('cargo', ['test', 'redaction_keeps_a_non_private_hardware_detail_for_review'], { encoding: 'utf8' })).toContain('test result: ok');
});
