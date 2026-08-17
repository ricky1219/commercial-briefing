const assert = require('assert');
const child = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const repo = path.resolve(__dirname, '..');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'briefing-guard-'));
const valid = path.join(tmp, 'valid.html');
const stale = path.join(tmp, 'stale.html');
const stalePages = path.join(tmp, 'stale-pages.html');
const chinaDefault = path.join(tmp, 'china-default.html');
fs.writeFileSync(valid, '<title>陈瑶的商业晨报｜2026.08.17</title><div>昨日范围：08.16</div>');
fs.writeFileSync(stale, '<title>陈瑶的商业晨报｜2026.08.07</title><div>昨日范围：08.06</div>');
fs.writeFileSync(stalePages, '<title>陈瑶的商业晨报｜2026.08.07</title><div>昨日范围：08.06</div>');
fs.writeFileSync(chinaDefault, '<title>陈瑶的商业晨报｜2030.01.02</title><div>昨日范围：01.01</div>');

function run(site, extra) {
  return child.spawnSync(process.execPath, ['scripts/publication-guard.mjs', '--date', '2026-08-17', '--site', site].concat(extra || []), { cwd: repo, encoding: 'utf8' });
}

let result = run(valid);
assert.strictEqual(result.status, 0, result.stderr);
assert.ok(/LOCAL_OK/.test(result.stdout));

result = run(stale);
assert.strictEqual(result.status, 1, result.stderr);
assert.ok(/STALE_LOCAL/.test(result.stderr));

result = run(valid, ['--pages-file', stalePages]);
assert.strictEqual(result.status, 1, result.stderr);
assert.ok(/STALE_PAGES/.test(result.stderr));

result = child.spawnSync(process.execPath, ['scripts/publication-guard.mjs', '--site', chinaDefault], { cwd: repo, encoding: 'utf8', env: Object.assign({}, process.env, { BRIEFING_NOW: '2030-01-01T16:30:00Z' }) });
assert.strictEqual(result.status, 0, result.stderr);
assert.ok(/2030.01.02/.test(result.stdout));

console.log('publication-guard local validation: PASS');
