const fs = require('fs');

const page = process.argv[2] || 'index.html';
const html = fs.readFileSync(page, 'utf8');
const start = html.indexOf('const groups=');
const end = html.indexOf(';\nconst categoryPreview=', start);

if (start < 0 || end < 0) {
  throw new Error(`无法从 ${page} 读取晨报分组数据`);
}

const groups = JSON.parse(html.slice(start + 'const groups='.length, end));
const entries = groups.flatMap(([, items]) => items);
const takeaways = entries.map((entry) => String(entry[4] || '').trim());

if (takeaways.some((item) => item.length < 12)) {
  throw new Error('存在过短或缺失的“可借鉴”文案');
}

const unique = new Set(takeaways);
if (unique.size !== takeaways.length) {
  throw new Error(`“可借鉴”文案重复：${takeaways.length} 条中仅 ${unique.size} 条唯一`);
}

console.log(`briefing takeaways: PASS (${takeaways.length} 条，全部唯一)`);
