import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';

const result = JSON.parse(execFileSync('cargo', ['run', '--quiet', '--', '--json', 'demo'], { encoding: 'utf8' }));
const report = readFileSync(result.report, 'utf8');
const transcript = 'Demo — bundled sample data, nothing is saved to your capsule directory.\nEncrypted sample: temporary .fcap\nRedacted report: temporary freeze-report.md\n\n✓ journal  ✓ graphics  ✓ processes  ✓ display-session';
mkdirSync('site/public/assets', { recursive: true });
writeFileSync('site/public/assets/demo-report.json', JSON.stringify({ transcript, report }, null, 2) + '\n');
rmSync(result.capsule.replace(/\/capsule-[^/]+$/, ''), { recursive: true, force: true });
