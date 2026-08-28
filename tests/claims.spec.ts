import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { execFileSync } from 'node:child_process';
import { readFileSync, rmSync } from 'node:fs';

test('@claim:sample-report demo renders the bundled freeze evidence', async ({ page }) => {
  await page.goto('/demo');
  await page.getByRole('button', { name: 'Run sample capture' }).click();
  const report = page.getByRole('heading', { name: 'Freeze Capsule report' });
  await expect(report).toBeVisible();
  await expect(page.getByText('amdgpu ring gfx timeout')).toBeVisible();
  await expect(page.getByText('6 captured · 1 limited')).toBeVisible();
  await page.reload();
  await expect(report).toBeVisible();
  await page.getByRole('button', { name: 'Reset demo' }).click();
  await expect(report).toBeHidden();
});

test('@claim:demo-private demo makes no third-party request', async ({ page }) => {
  const foreign: string[] = [];
  page.on('request', request => {
    if (new URL(request.url()).origin !== 'http://127.0.0.1:4173') foreign.push(request.url());
  });
  await page.goto('/demo');
  await page.getByRole('button', { name: 'Run sample capture' }).click();
  await expect(page.getByRole('heading', { name: 'Freeze Capsule report' })).toBeVisible();
  expect(foreign).toEqual([]);
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
  rmSync(result.capsule.replace(/\/capsule-[^/]+$/, ''), { recursive: true, force: true });
});

test('@claim:bounded-retention retention keeps no more than eight capsules', () => {
  const output = execFileSync('cargo', ['test', 'retention_is_bounded'], { encoding: 'utf8' });
  expect(output).toContain('test result: ok');
});

test('@claim:free-license repository ships the MIT license', () => {
  expect(readFileSync('LICENSE', 'utf8')).toContain('MIT License');
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
  await expect(page).toHaveURL(/\/demo$/);
  await expect(page.locator('h1')).toBeFocused();
});

test('mobile first screen and demo stay within 390 pixels', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Try it with sample data' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  await page.goto('/demo');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
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
