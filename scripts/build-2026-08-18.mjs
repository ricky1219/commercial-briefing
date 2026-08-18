const fs = require('fs');

const D = '2026-08-18';
const Y = '08.17';
const take = {
  '推广与会员': '城市与项目营销需把在地资源、内容主题和日常客流转化放在同一套运营方案里。',
  '商业地产': '项目扩张与焕新要回到城市结构、商圈供给和长期运营能力来判断。',
  '招商与首店': '首店价值不只在数量，需同步看品牌能级、落位和后续经营质量。',
  '零售与餐饮': '零售增长应同时拆解商品、供应链、价格和门店效率，避免只看规模。',
  '品牌与设计': '品牌信任也是经营资产，组织治理与公开表达会直接影响用户关系。',
  '政策与趋势': '数据观察要回到消费结构和业态效率，避免仅用单月数字下结论。'
};

const rows = [
  ['推广与会员', '赢商网', '从文旅海岛到超级县城：吾悦广场的「一城一策」牌怎么打？', '赢商网梳理吾悦广场在不同城市结合当地文旅、消费与客群特点组织项目运营的做法。项目内容要成为区域生活方式的一部分，不能只复制标准化活动。', take['推广与会员'], '吾悦广场、在地运营、文商旅', 'https://news.winshang.com/html/074/1643.html', ''],
  ['商业地产', '赢商网', '下半年，长沙新开商业被龙湖“承包”了', '报道关注长沙下半年拟开商业及龙湖项目布局。新增供给加速时，项目定位、招商节奏和与既有商圈的差异化关系需提前判断。', take['商业地产'], '长沙、龙湖商业、新开项目', 'https://news.winshang.com/html/074/1641.html', ''],
  ['招商与首店', '赢商网', '杭州2026上半年首发经济报告：首店数量冲至全国第一', '赢商网发布杭州上半年首发经济观察，聚焦首店数量与城市首发活力。对商场而言，首店引入要与落位、传播和复访机制一并设计。', take['招商与首店'], '杭州、首发经济、首店', 'https://news.winshang.com/html/074/1642.html', ''],
  ['零售与餐饮', '赢商网', '瑞幸咖啡：第一名有多焦虑？', '报道从瑞幸的市场位置与竞争压力切入，讨论连锁咖啡头部品牌的增长挑战。高频零售的领先优势仍要靠产品节奏、供应链和门店执行持续巩固。', take['零售与餐饮'], '瑞幸咖啡、连锁咖啡、门店运营', 'https://news.winshang.com/html/074/1650.html', ''],
  ['零售与餐饮', '赢商网', '入华30年，沃尔玛为什么能持续穿越周期？', '赢商网复盘沃尔玛在中国市场长期经营的调整路径。大卖场与会员业态的竞争核心仍在商品力、组织效率和本地化经营。', take['零售与餐饮'], '沃尔玛、商超、商品力', 'https://news.winshang.com/html/074/1648.html', ''],
  ['零售与餐饮', '联商网', '30岁的山姆中国“变了”：一边高速增长，一边暗流涌动', '联商网关注山姆中国在扩张阶段的经营变化与挑战。会员店的判断不能只看开店速度，还要跟踪商品、供应链、服务和用户信任。', take['零售与餐饮'], '山姆、中国市场、会员店', 'http://www.linkshop.com/news/2026551069.shtml', ''],
  ['零售与餐饮', '联商网', '1-7月份餐饮收入32822亿元，增长2.6％', '联商网转载并解读前7个月餐饮收入数据，餐饮消费保持增长但增速温和。品牌和商场需要更重视有效客流、客单与复购，而非只追逐开店规模。', take['零售与餐饮'], '餐饮收入、消费数据、复购', 'http://www.linkshop.com/news/2026551071.shtml', ''],
  ['品牌与设计', '联商网', '胖东来胜诉！宋某某被判赔30万并公开登报道歉', '联商网报道胖东来相关名誉权案件的公开判决结果。零售品牌的信任建设既来自服务体验，也依赖透明、合规的治理与沟通。', take['品牌与设计'], '胖东来、品牌信任、组织治理', 'http://www.linkshop.com/news/2026551059.shtml', ''],
  ['政策与趋势', '赢商网', '赢商周报：上海恒隆广场三期9月开业；胖东来因租金在许昌关店；Alo线上店卖爆了…', '赢商周报汇集商业地产、零售品牌与项目运营动态。周报用于发现线索，涉及具体项目、开业和经营事实时应继续追溯单项公开来源。', take['政策与趋势'], '商业周报、项目开业、零售趋势', 'https://news.winshang.com/html/074/1654.html', '']
];

const categories = ['推广与会员', '商业地产', '招商与首店', '零售与餐饮', '品牌与设计', '政策与趋势'];
const groups = categories.map(category => [category, rows.filter(row => row[0] === category).map(row => [Y].concat(row.slice(1)))]);

let html = fs.readFileSync('2026-08-17.html', 'utf8')
  .split('2026.08.17').join('2026.08.18')
  .split('2026-08-17').join(D)
  .split('08.16').join(Y);
html = html
  .replace(/<section class="hero">[\s\S]*?<\/section>/, '<section class="hero"><p>严格昨日版 · 仅收录 08.17 发布、可公开核验的独立报道</p><strong>城市商业的在地运营、会员店与咖啡竞争、首发经济，是当天值得持续跟进的三条线索；实际收录 9 条。</strong></section>')
  .replace(/const groups=\[[\s\S]*?\];\nconst categoryPreview=/, `const groups=${JSON.stringify(groups)};\nconst categoryPreview=`);
fs.writeFileSync(`${D}.html`, html);
fs.writeFileSync('index.html', html);

const markdown = groups.map(([category, items]) => `## ${category}\n\n${items.length ? items.map((item, index) => `### ${index + 1}. ${item[2]}\n- **发布时间**：2026-08-17｜**来源**：[${item[1]}](${item[6]})\n- ${item[3]}\n- **可借鉴点**：${item[4]}`).join('\n\n') : '当天无符合本栏目范围、可公开核验的独立报道。'}`).join('\n\n');
fs.writeFileSync(`${D}.md`, `# 陈瑶的商业晨报｜${D}\n\n> 严格昨日版：仅收录 2026 年 8 月 17 日可公开核验的独立报道，共 ${rows.length} 条。高质量独立内容不足 30 条，未以旧闻或泛营销补足。\n\n## 今日观察\n\n1. 商业项目的内容运营越来越依赖本地资源组合，城市差异不能只靠标准化活动覆盖。\n2. 山姆、沃尔玛与瑞幸的竞争提醒我们：规模之外，商品、供应链和门店效率才是长期变量。\n3. 首发经济需要从“引进数量”走向“落位、传播、复访”一体化运营。\n\n${markdown}\n`);

const state = JSON.parse(fs.readFileSync('kb-scan-state.json', 'utf8'));
state.last_successful_run = '2026-08-18T08:00:00+08:00';
state.last_scan_window = { start: '2026-08-17T00:00:00+08:00', end: '2026-08-18T00:00:00+08:00' };
state.published_yesterday = [];
state.records = state.records || [];
state.notes = '8月18日全量复核：未发现8月17日新增或修改且可公开发布的行业资料；无知识库条目进入昨日或长期档案。';
fs.writeFileSync('kb-scan-state.json', `${JSON.stringify(state, null, 2)}\n`);

console.log(JSON.stringify({ published: rows.length, groups: groups.map(([category, items]) => [category, items.length]), kbMatches: 0, huaianLatest: 0, designNew: 0 }));
