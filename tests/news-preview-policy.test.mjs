const assert = require('assert');
const fs = require('fs');
const preview = require('../assets/news-preview.js');

assert.strictEqual(preview.pickImage('https://img1.winshang.com/newsimg/example.jpg', '商业地产'), 'https://img1.winshang.com/newsimg/example.jpg');
assert.strictEqual(preview.pickImage('http://www.linkshop.com/upload/article/example.jpg', '零售与餐饮'), 'assets/covers/retail.svg');
assert.strictEqual(preview.pickImage('', '推广与会员'), 'assets/covers/promo.svg');
assert.strictEqual(preview.pickImage('https://www.linkshop.com/upload/article/example.jpg', '零售与餐饮'), 'assets/covers/retail.svg');

const builder = fs.readFileSync('scripts/build-2026-08-17.mjs', 'utf8');
assert.ok(builder.includes('assets/covers/retail.svg'), '日报生成器应输出站内零售配图作为安全兜底');
assert.ok(builder.includes('data-cover='), '日报生成器应保留安全原图地址供通用预览脚本处理');
assert.ok(builder.includes("const parsed=new URL(url);return parsed.protocol==='https:'"), '日报生成器的安全图片判断必须可被浏览器解析');
const rendered = fs.readFileSync('index.html', 'utf8');
assert.ok(rendered.includes("const parsed=new URL(url);return parsed.protocol==='https:'"), '已生成日报必须带有可执行的安全图片判断');
const renderedScript = rendered.slice(rendered.indexOf('const groups='), rendered.indexOf('</script>', rendered.indexOf('const groups=')));
assert.doesNotThrow(() => new Function(renderedScript), '已生成日报的内联脚本必须可被浏览器解析');
console.log('news preview source policy: PASS');
