const assert = require('assert');
const fs = require('fs');

const html = fs.readFileSync('2026-08-27.html', 'utf8');
const start = html.indexOf('const groups=');
const end = html.indexOf(';\nconst categoryPreview=', start);
assert.ok(start >= 0 && end >= 0, '页面必须包含可渲染的分组数据');
assert.ok(html.includes('2026.08.27'), '标题必须是 2026.08.27');
assert.ok(html.includes('08.26 发布'), '昨日边界必须是 08.26');
const groups = JSON.parse(html.slice(start + 'const groups='.length, end));
const entries = groups.flatMap(([, items]) => items);
assert.strictEqual(entries.length, 18, '昨日版必须如实发布 18 条已核验内容');
assert.ok(entries.every((item) => item[0] === '08.26'), '每条内容必须标为 08.26 发布');
assert.strictEqual(new Set(entries.map((item) => item[4])).size, 18, '每条“可借鉴”必须是独立文案');
assert.ok(entries.every((item) => /^https:\/\//.test(item[6])), '每条必须有公开来源链接');
console.log('2026-08-27 briefing contract: PASS');
