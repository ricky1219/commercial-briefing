import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');
const child = require('child_process');

function readArg(name, fallback) {
  const i = process.argv.indexOf(name);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

function chinaToday() {
  const now = new Date(process.env.BRIEFING_NOW || Date.now());
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now);
  const map = {};
  parts.forEach(part => { map[part.type] = part.value; });
  return `${map.year}-${map.month}-${map.day}`;
}

function previousDate(day) {
  const parts = day.split('-').map(Number);
  const date = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2] - 1));
  return [date.getUTCFullYear(), String(date.getUTCMonth() + 1).padStart(2, '0'), String(date.getUTCDate()).padStart(2, '0')].join('-');
}

function main() {
  const date = readArg('--date', chinaToday());
  const site = readArg('--site', 'index.html');
  const expectedTitle = date.replace(/-/g, '.');
  const expectedYesterday = previousDate(date).slice(5).replace('-', '.');
  let page;
  try { page = fs.readFileSync(site, 'utf8'); }
  catch (error) { console.error(`STALE_LOCAL missing site: ${site}`); process.exit(1); }
  if (page.indexOf(expectedTitle) < 0 || page.indexOf(`昨日范围：${expectedYesterday}`) < 0) {
    console.error(`STALE_LOCAL expected ${expectedTitle} / ${expectedYesterday}`);
    process.exit(1);
  }
  console.log(`LOCAL_OK ${expectedTitle} / ${expectedYesterday}`);

  if (process.argv.indexOf('--remote') >= 0) {
    try {
      const local = child.execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
      const remote = child.execFileSync('git', ['ls-remote', 'origin', 'refs/heads/main'], { encoding: 'utf8' }).trim();
      if (remote.indexOf(local) !== 0) throw new Error('origin/main does not match HEAD');
      console.log(`REMOTE_OK ${local}`);
    } catch (error) {
      console.error(`REMOTE_UNVERIFIED ${error.message}`);
      process.exit(1);
    }
  }

  const pagesFile = readArg('--pages-file', '');
  if (pagesFile || process.argv.indexOf('--pages') >= 0) {
    let publicPage;
    try {
      if (pagesFile) publicPage = fs.readFileSync(pagesFile, 'utf8');
      else {
        const base = readArg('--pages-url', 'https://ricky1219.github.io/commercial-briefing/');
        const sep = base.indexOf('?') >= 0 ? '&' : '?';
        publicPage = child.execFileSync('curl', ['-fsSL', '--max-time', '30', `${base}${sep}v=${Date.now()}`], { encoding: 'utf8' });
      }
    } catch (error) {
      console.error(`PAGES_UNVERIFIED ${error.message}`);
      process.exit(1);
    }
    if (publicPage.indexOf(expectedTitle) < 0 || publicPage.indexOf(`昨日范围：${expectedYesterday}`) < 0) {
      console.error(`STALE_PAGES expected ${expectedTitle} / ${expectedYesterday}`);
      process.exit(1);
    }
    console.log(`PAGES_OK ${expectedTitle} / ${expectedYesterday}`);
  }
}

main();
