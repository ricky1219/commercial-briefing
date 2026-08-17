const fs = require('fs');

const D = '2026-08-17';
const Y = '08.16';
const take = {
  '推广与会员': '节日营销应把主题、到店场景与可复用的内容资产同步设计。',
  '商业地产': '项目内容需要同时证明空间体验、品牌组合与长期运营的连接。',
  '招商与首店': '首店判断应回到区域客群、店型适配和持续经营能力。',
  '零售与餐饮': '高频零售要把价格、商品、服务和履约作为一个完整模型看。',
  '品牌与设计': '品牌扩张不能只看门店数量，还要看产品和区域经营质量。',
  '政策与趋势': '行业判断需把单店效率、渠道变化与消费基本面一起评估。'
};

const rows = [
  ['推广与会员', '赢商网', '大豫园七夕浪漫上新：爱神丘比特降临外滩BFC、豫园国风新庙会启幕', '外滩BFC与豫园围绕七夕分别落地丘比特主题与国风庙会内容，把节日表达延展到城市地标和线下游逛场景。', take['推广与会员'], '七夕营销、文商旅、场景运营', 'https://news.winshang.com/html/074/1636.html', 'https://img1.winshang.com/newsimg/wsimg/2026/8/20260816201842407_74f474b9333f4e1d96c066e0fbfc563f.jpg'],
  ['推广与会员', '赢商网', '七夕限定，一封“闻”得到的情书！', '南京区商务部门与德基广场推出城市级香氛品宣策划，以节日主题将商业空间、城市消费与感官体验连接起来。', take['推广与会员'], '七夕营销、香氛、城市商业', 'https://news.winshang.com/html/074/1637.html', ''],
  ['零售与餐饮', '联商网', '雪王不声不响，把现磨咖啡打到了6元', '联商网关注蜜雪冰城旗下现磨咖啡的低价策略。该案例提示平价咖啡竞争已从单点促销转向供应链、选址与门店效率的协同。', take['零售与餐饮'], '现磨咖啡、低价、连锁经营', 'http://www.linkshop.com/news/2026551013.shtml', 'http://www.linkshop.com/upload/article/2026/20260816205215_0072.jpg'],
  ['零售与餐饮', '联商网', '于东来最新分享：胖东来从“经营企业”走向“传播文明”', '报道记录于东来对胖东来经营理念的最新分享，强调透明化与组织价值的外溢。对零售企业而言，经营表达本身也正在成为建立信任的内容资产。', take['零售与餐饮'], '胖东来、零售经营、组织文化', 'http://www.linkshop.com/news/2026551019.shtml', 'http://www.linkshop.com/upload/article/2026/20260816131516_6688.jpg'],
  ['零售与餐饮', '联商网', '一碗甜品卖95元，火锅店快把糖水铺“卷死”了', '火锅品牌向高客单甜品延伸，折射出餐饮门店通过副品类增加体验与客单的探索。真正的考验仍是产品与主业之间是否形成合理联动。', take['零售与餐饮'], '甜品、火锅、客单价', 'http://www.linkshop.com/news/2026551022.shtml', 'http://www.linkshop.com/upload/article/2026/20260816205735_3189.jpg'],
  ['零售与餐饮', '联商网', 'Gelato摸着新茶饮过河，但还没上岸', 'Gelato赛道借鉴新茶饮的产品与门店打法，但规模化仍受供应链、季节性和复购效率制约。报道为细分餐饮品类扩张提供了风险参照。', take['零售与餐饮'], 'Gelato、新茶饮、品类扩张', 'http://www.linkshop.com/news/2026551023.shtml', 'http://www.linkshop.com/upload/article/2026/20260816205421_8700.jpg'],
  ['零售与餐饮', '联商网', '为什么很多老板把山姆想简单了', '报道从山姆模式的多个经营维度切入，提醒会员店并非简单复制选品或装修即可实现。商品力、供应链、服务与组织能力需要同步到位。', take['零售与餐饮'], '会员店、山姆、商品力', 'http://www.linkshop.com/news/2026551032.shtml', 'http://www.linkshop.com/atlas/sltuthumbnail/20251201115921556774_thumb.jpg'],
  ['零售与餐饮', '联商网', '美团自营数码仓曝光，为何连做7个自营即时零售品牌？', '美团持续布局自营即时零售业态，报道讨论了数码仓与多个自营品牌的协同可能。即时履约正从单品配送走向更综合的前置仓组织。', take['零售与餐饮'], '即时零售、前置仓、美团', 'http://www.linkshop.com/news/2026551036.shtml', 'http://www.linkshop.com/atlas/sltuthumbnail/20260601112223021287_thumb.jpg'],
  ['品牌与设计', '联商网', '贵州茅台增收不增利，上半年净利润同比下降1.95％', '贵州茅台披露上半年业绩，营收增长与利润承压同时出现。高端消费品牌在渠道与价格体系调整中，需更关注增长质量而非单一规模。', take['品牌与设计'], '茅台、业绩、渠道', 'http://www.linkshop.com/news/2026551027.shtml', 'http://www.linkshop.com/upload/article/2026/20260816211617_0720.jpg'],
  ['品牌与设计', '联商网', 'Coach母公司年入80亿美元，大中华区还在暴涨', 'Coach母公司披露全年业绩，大中华区表现受到关注。国际品牌的区域增长需要与品牌定位、门店结构及本地化经营一并判断。', take['品牌与设计'], 'Coach、奢侈品、大中华区', 'http://www.linkshop.com/news/2026551028.shtml', 'http://www.linkshop.com/upload/article/2026/20260816210633_5359.jpg'],
  ['品牌与设计', '联商网', '名创优品预计上半年利润同比增长约4％-6％', '名创优品预告上半年营收约114.5亿至115.5亿元、同比增长约22%至23%，利润增幅相对温和。门店扩张之外，产品结构和经营效率仍是观察重点。', take['品牌与设计'], '名创优品、业绩、零售品牌', 'http://www.linkshop.com/news/2026551037.shtml', 'http://www.linkshop.com/upload/article/2026/20260816214934_9377.jpg']
];

const C = ['推广与会员', '商业地产', '招商与首店', '零售与餐饮', '品牌与设计', '政策与趋势'];
const G = C.map(c => [c, rows.filter(x => x[0] === c).map(x => [Y].concat(x.slice(1)))]);
let h = fs.readFileSync('2026-08-07.html', 'utf8')
  .split('2026.08.07').join('2026.08.17')
  .split('2026-08-07').join(D)
  .split('08.06').join(Y);
const previewPolicy = `const categoryPreview={"推广与会员":"assets/covers/promo.svg","商业地产":"assets/covers/property.svg","招商与首店":"assets/covers/retail.svg","零售与餐饮":"assets/covers/retail.svg","品牌与设计":"assets/covers/promo.svg","政策与趋势":"assets/covers/data.svg"};const safeOriginal=url=>{try{const parsed=new URL(url);return parsed.protocol==='https:'&&parsed.hostname!=='linkshop.com'&&!parsed.hostname.endsWith('.linkshop.com')}catch{return false}};const previewFor=(item,category)=>{const raw=item[7]||window.articleCovers&&window.articleCovers[item[6]]||'';const original=safeOriginal(raw)?raw:'';const fallback=categoryPreview[category]||categoryPreview["商业地产"];const src=original||fallback;const label=original?"原文图片":"晨报配图";return '<div class="card-preview" data-cover="'+original+'" data-fallback="'+(original?"false":"true")+'"><img loading="lazy" decoding="async" fetchpriority="low" referrerpolicy="no-referrer" alt="'+label+'" src="'+src+'" onerror="this.onerror=null;this.src=\\''+fallback+'\\';this.nextElementSibling.textContent=\\'晨报配图\\'"><span>'+label+'</span></div>'};let active=`;
h = h.replace(/const categoryPreview=\{.*?\};const previewFor=.*?;let active=/, previewPolicy);
h = h.replace(/<section class="hero">[\s\S]*?<\/section>/, '<section class="hero"><p>严格昨日版 · 仅收录 08.16 发布、可公开核验的独立报道</p><strong>七夕线下场景、餐饮品类演化与即时零售协同，是当天最值得跟进的三条线索；实际收录 11 条。</strong></section>')
  .replace(/const groups=\[[\s\S]*?\];\nconst categoryPreview=/, `const groups=${JSON.stringify(G)};\nconst categoryPreview=`);
fs.writeFileSync(`${D}.html`, h);
fs.writeFileSync('index.html', h);

const md = G.map(([c, r]) => `## ${c}\n\n` + (r.length ? r.map((x, n) => `### ${n + 1}. ${x[2]}\n- **发布时间**：2026-08-16｜**来源**：[${x[1]}](${x[6]})\n- ${x[3]}\n- **可借鉴点**：${x[4]}`).join('\n\n') : '当天无符合本栏目范围的独立公开报道。')).join('\n\n');
fs.writeFileSync(`${D}.md`, `# 陈瑶的商业晨报｜${D}\n\n> 严格昨日版：仅收录 8 月 16 日可公开核验的独立报道，共 ${rows.length} 条。当天合格内容不足 30 条，未以旧闻补足。\n\n${md}`);
console.log(JSON.stringify({ count: rows.length, groups: G.map(([c, r]) => [c, r.length]) }));
