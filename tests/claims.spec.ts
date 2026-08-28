import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';

test('@claim:sample-report one click opens the bundled freeze report', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Try it with sample data' }).click();
  const report = page.getByRole('heading', { name: 'Freeze Capsule report' });
  await expect(report).toBeVisible();
  await expect(page.locator('[data-report-content]')).toContainText('amdgpu');
  await expect(page.locator('[data-report-content]')).toContainText('Cinnamon');
  await expect(page.locator('[data-report-content]')).toContainText('chrome');
});

test('@claim:demo-private demo makes no third-party request', async ({ page }) => {
  const foreign: string[] = [];
  page.on('request', request => {
    if (new URL(request.url()).origin !== 'http://127.0.0.1:4173') foreign.push(request.url());
  });
  await page.goto('/demo?demo=1');
  await expect(page.getByRole('heading', { name: 'Freeze Capsule report' })).toBeVisible();
  expect(foreign).toEqual([]);
  expect(await page.evaluate(() => Object.keys(sessionStorage))).toEqual(['demo:loaded']);
  expect(await page.evaluate(() => Object.keys(localStorage))).toEqual([]);
  await page.getByRole('link', { name: 'Install Freeze Capsule' }).click();
  expect(await page.evaluate(() => Object.keys(sessionStorage).filter(key => key.startsWith('demo:')))).toEqual([]);
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

test('all public routes have one heading and no serious accessibility findings', async ({ page }) => {
  for (const route of ['/', '/demo', '/privacy', '/terms', '/missing-sheet']) {
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

test('mobile first screen and demo stay within 390 pixels', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Try it with sample data' })).toBeVisible();
  await expect(page.getByText('See a redacted report in one click.', { exact: true })).toBeVisible();
  await expect(page.getByText('Free and open source', { exact: true })).toBeVisible();
  await expect(page.getByText('Demo data stays separate', { exact: true })).toBeVisible();
  await expect(page.getByText('Keeps at most eight capsules', { exact: true })).toBeVisible();
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
  const config = JSON.parse(readFileSync('site/public/staticwebapp.config.json', 'utf8')) as { routes: { route: string; rewrite?: string }[]; responseOverrides: { '404': { rewrite: string } } };
  expect(config.routes.filter(route => ['/demo', '/privacy', '/terms'].includes(route.route)).every(route => route.rewrite === '/index.html')).toBe(true);
  expect(config.responseOverrides['404'].rewrite).toBe('/404.html');
  const missing = readFileSync('site/public/404.html', 'utf8');
  for (const text of ['noindex,follow', 'Privacy', 'Terms', 'Built by Param Factory', 'v0.1.1']) expect(missing).toContain(text);
});

test('demo banner controls meet the 44 pixel mobile touch-target baseline', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/demo');
  for (const name of ['Reset demo', 'Install Freeze Capsule']) {
    const box = await page.getByRole(name === 'Reset demo' ? 'button' : 'link', { name }).boundingBox();
    expect(box?.height, name + ' height').toBeGreaterThanOrEqual(44);
    expect(box?.width, name + ' width').toBeGreaterThanOrEqual(44);
  }
});

test('release lookup failure shows a calm fallback without console errors', async ({ page }) => {
  await page.route('https://api.github.com/**', route => route.abort());
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await page.getByRole('button', { name: 'Check published packages' }).click();
  await expect(page.getByText('Downloads are being published. The release page shows current files.')).toBeVisible();
  expect(errors).toEqual([]);
});
