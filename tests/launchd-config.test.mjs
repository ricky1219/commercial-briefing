const assert = require('assert');
const child = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const repo = path.resolve(__dirname, '..');
const target = fs.mkdtempSync(path.join(os.tmpdir(), 'briefing-launchd-'));
const result = child.spawnSync('bash', ['scripts/install-publication-guard.sh', '--target', target, '--no-load'], { cwd: repo, encoding: 'utf8' });
assert.strictEqual(result.status, 0, result.stderr);
const plist = path.join(target, 'com.chenyao.commercial-briefing.guard.plist');
assert.ok(fs.existsSync(plist));
assert.strictEqual(child.spawnSync('plutil', ['-lint', plist], { encoding: 'utf8' }).status, 0);
const content = fs.readFileSync(plist, 'utf8');
assert.ok(content.indexOf('<integer>9</integer>') >= 0);
assert.ok(content.indexOf('daily-recovery.mjs') >= 0);
console.log('launchd configuration: PASS');
