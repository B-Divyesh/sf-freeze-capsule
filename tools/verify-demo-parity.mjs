import { execFileSync } from 'node:child_process';
import { readFileSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';

const binary = resolve(process.argv[2] ?? 'target/release/freeze-capsule');
const fixturePath = resolve(process.argv[3] ?? 'site/public/assets/demo-report.json');
const result = JSON.parse(execFileSync(binary, ['--json', 'demo'], { encoding: 'utf8' }));

try {
  const installedReport = readFileSync(result.report, 'utf8');
  const browserReport = JSON.parse(readFileSync(fixturePath, 'utf8')).report;
  if (installedReport !== browserReport) {
    throw new Error('packaged command-line demo does not match the browser sample report');
  }
  process.stdout.write('packaged demo report matches the browser sample\n');
} finally {
  rmSync(result.capsule.replace(/[/\\]capsule-[^/\\]+$/, ''), { recursive: true, force: true });
}
