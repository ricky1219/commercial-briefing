const assert = require('assert');
const child = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const repo = path.resolve(__dirname, '..');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'briefing-recovery-'));
const state = path.join(tmp, 'state');
const stale = path.join(tmp, 'stale.html');
const valid = path.join(tmp, 'valid.html');
fs.writeFileSync(stale, '<title>陈瑶的商业晨报｜2026.08.07</title><div>昨日范围：08.06</div>');
fs.writeFileSync(valid, '<title>陈瑶的商业晨报｜2026.08.17</title><div>昨日范围：08.16</div>');

function run(site, date) {
  return child.spawnSync(process.execPath, ['scripts/daily-recovery.mjs', '--date', date, '--site', site, '--state', state, '--no-dispatch'], { cwd: repo, encoding: 'utf8' });
}

let result = run(stale, '2026-08-17');
assert.strictEqual(result.status, 2, result.stderr);
assert.ok(/RECOVERY_NEEDED/.test(result.stdout));
assert.ok(/RECOVERY_DISPATCH_SKIPPED/.test(result.stdout));
assert.ok(fs.existsSync(path.join(state, 'recovery-needed-2026-08-17.json')));

result = run(stale, '2026-08-17');
assert.strictEqual(result.status, 0, result.stderr);
assert.ok(/RECOVERY_ALREADY_REQUESTED/.test(result.stdout));

result = run(valid, '2026-08-17');
assert.strictEqual(result.status, 0, result.stderr);
assert.ok(/RECOVERY_NOT_NEEDED/.test(result.stdout));

const future = path.join(tmp, 'future.html');
fs.writeFileSync(future, '<title>陈瑶的商业晨报｜2030.01.02</title><div>昨日范围：01.01</div>');
result = child.spawnSync(process.execPath, ['scripts/daily-recovery.mjs', '--site', future, '--state', path.join(tmp, 'future-state'), '--no-dispatch'], { cwd: repo, encoding: 'utf8', env: Object.assign({}, process.env, { BRIEFING_NOW: '2030-01-01T16:30:00Z' }) });
assert.strictEqual(result.status, 0, result.stderr);
assert.ok(/RECOVERY_NOT_NEEDED/.test(result.stdout));

console.log('daily recovery behavior: PASS');
