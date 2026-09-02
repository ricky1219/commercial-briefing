import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const child = require('child_process');
const fs = require('fs');
const path = require('path');

function readArg(name, fallback) {
  const i = process.argv.indexOf(name);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

function chinaToday() {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date(process.env.BRIEFING_NOW || Date.now()));
  const map = {};
  parts.forEach(part => { map[part.type] = part.value; });
  return `${map.year}-${map.month}-${map.day}`;
}

const date = readArg('--date', chinaToday());
const site = readArg('--site', 'index.html');
const state = readArg('--state', '.publication-guard');
const request = path.join(state, `recovery-needed-${date}.json`);
const lock = path.join(state, '.recovery.lock');
fs.mkdirSync(state, { recursive: true });

let lockFd;
try {
  lockFd = fs.openSync(lock, 'wx');
} catch (error) {
  console.log('RECOVERY_ALREADY_RUNNING');
  process.exit(0);
}

try {
  const result = child.spawnSync(process.execPath, ['scripts/publication-guard.mjs', '--date', date, '--site', site], { encoding: 'utf8' });
  let exitCode = 0;
  if (result.status === 0) {
    console.log('RECOVERY_NOT_NEEDED');
  } else if (fs.existsSync(request)) {
    console.log('RECOVERY_ALREADY_REQUESTED');
  } else {
    fs.writeFileSync(request, JSON.stringify({ date: date, site: site, requestedAt: new Date().toISOString(), reason: (result.stderr || '').trim() }, null, 2));
    console.log(`RECOVERY_NEEDED ${request}`);
    exitCode = 2;
    if (process.argv.indexOf('--no-dispatch') >= 0) {
      console.log('RECOVERY_DISPATCH_SKIPPED');
    } else {
      const codex = readArg('--codex-bin', '/Users/ricky/.local/bin/codex');
      const knowledgeRoot = path.resolve(process.cwd(), '../../..');
      const prompt = `发布守护检测到 ${date} 的商业晨报未上线。请立即在当前仓库完成一次“补发昨天日报”：严格只用中国时区昨天发布的可公开核验内容；先检查来源与日期、去重，再生成当天 HTML/Markdown、更新 index.html、提交并推送 origin main。不要用旧闻凑数；完成后必须运行 node scripts/publication-guard.mjs --date ${date} --remote --pages，只有全部通过才结束。知识库仅发布明确非受限的行业公开资料。`;
      console.log('RECOVERY_DISPATCH_STARTED');
      const dispatched = child.spawnSync(codex, ['exec', '--search', '-C', process.cwd(), '--add-dir', knowledgeRoot, '-a', 'never', '-s', 'workspace-write', prompt], { encoding: 'utf8', timeout: 2400000, maxBuffer: 1024 * 1024 });
      if (dispatched.stdout) console.log(dispatched.stdout.trim());
      if (dispatched.stderr) console.error(dispatched.stderr.trim());
      const verified = child.spawnSync(process.execPath, ['scripts/publication-guard.mjs', '--date', date, '--site', site, '--remote', '--pages'], { encoding: 'utf8', timeout: 60000 });
      if (verified.status === 0) {
        fs.unlinkSync(request);
        console.log('RECOVERY_PUBLISHED');
        exitCode = 0;
      } else {
        if (verified.stdout) console.log(verified.stdout.trim());
        if (verified.stderr) console.error(verified.stderr.trim());
        console.error('RECOVERY_FAILED');
      }
    }
  }
  process.exitCode = exitCode;
} finally {
  try { fs.closeSync(lockFd); } catch (error) {}
  try { fs.unlinkSync(lock); } catch (error) {}
}
