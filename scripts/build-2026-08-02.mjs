const { readFileSync, writeFileSync } = require('fs');

const date = '2026-08-02';
const yesterday = '08.01';
// 仅保留公开列表可见、发布时间可核验为 2026-08-01 的独立报道或案例。
const items = [
  ['推广与会员','SocialBeta','哈啰租车推出了「驶」上最小车展？','哈啰租车在成都东郊记忆将 8 款车型转成盲盒雪糕、微型展台和“人话版”参数牌，完成一场夏日快闪。','低频服务可用高频体验物做入场券，再把关键卖点放进可参与的线下动线。','租车、快闪活动、夏日营销、体验','https://socialbeta.com/campaign/28071'],
  ['推广与会员','SocialBeta','本周值得关注的 8 个品牌营销案例｜案例一周 Vol.408','SocialBeta 汇集 Apple、阿嬷手作、霸王茶姬、GAP 等近期案例，覆盖户外广告、首店围挡与空间化表达。','周度案例复盘应拆成传播母题、到店触点和可复制物料，而不只收藏视觉。','品牌营销、首店围挡、空间表达、案例','https://socialbeta.com/article/111262'],
  ['推广与会员','SocialBeta','抢跑秋上新，「场景 × 情绪」才是运动户外的增长新公式？','文章以运动户外上新为例讨论将产品嵌入具体生活场景与用户情绪，并强调种草到长期经营的衔接。','上新企划应先定义人群场景与参与理由，再配置内容、货品和门店体验。','运动户外、场景营销、情绪营销、种草','https://socialbeta.com/article/111261'],
  ['推广与会员','SocialBeta','29 块的 YOYO，正在抢泡泡玛特的风头','名创优品围绕自有 IP YOYO 在多城推出主题快闪、门店换装和限定商品，结合跨品牌合作延展周年传播。','自有IP经营要把内容共创、限定商品、主题门店和跨界资源串成持续事件。','名创优品、YOYO、自有IP、快闪','https://socialbeta.com/article/111259'],
  ['推广与会员','赢商网','荣耀传奇·C罗主题限定快闪北京站登陆北京apm','“荣耀传奇·C罗”主题限定快闪于 8 月 1 日在北京 apm 开启，活动持续至 9 月 6 日。','体育IP快闪需把档期、限定商品、互动体验与商场客流承接同步排期。','北京apm、C罗、体育IP、快闪','https://news.winshang.com/html/074/1427.html'],
  ['商业地产','赢商网','建发商管签约莆田华茂购物中心，首个“湾悦汇”落子玉湖新城','建发商管与莆田华茂购物中心签约，为项目提供从招商到运营的全周期管理服务，“湾悦汇”首次落地玉湖新城。','轻资产管理签约要重点跟踪定位、招商节奏、运营权责和开业后的兑现指标。','建发商管、轻资产、购物中心、运营','https://news.winshang.com/html/074/1426.html'],
  ['零售与餐饮','联商网','重百新世纪超市龙湖公园天街店正式焕新开业','重百新世纪超市龙湖公园天街店完成焕新开业，报道聚焦民生服务升级与数字化零售探索。','商超调改应同时看商品、服务、数字化触点和与购物中心客群的协同。','重百、新世纪超市、调改、数字零售','http://www.linkshop.com/news/2026550471.shtml']
];

const categories = ['推广与会员','商业地产','招商与首店','零售与餐饮','品牌与设计','政策与趋势'];
const grouped = categories.map(category => [category, items.filter(x => x[0] === category).map(x => [yesterday, x[1], x[2], x[3], x[4], x[5], x[6]])]);
const groupsJs = `const groups=${JSON.stringify(grouped)};`;
let html = readFileSync('2026-07-31.html', 'utf8')
  .split('2026.07.31').join('2026.08.02')
  .split('2026-07-31').join(date)
  .split('07.30').join(yesterday)
  .replace('严格昨日版 · 全部为 08.01 发布的独立报道或案例 · 知识库已核验：0', '严格昨日版 · 全部为 08.01 发布的独立报道或案例 · 知识库昨日命中：0')
  .replace('商业资产、品牌首店、餐饮商品力与线下体验同步更新；今天整理 30 条可核验内容。', '严格按 08.01 日期边界筛选后，仅有 7 条可公开核验内容；未以旧闻或软文补足。')
  .replace('<a class="portal" href="./" target="_top"><b>30</b><span>昨日发生</span></a>', '<a class="portal" href="./" target="_top"><b>7</b><span>昨日发生</span></a>')
  .replace(/<section class="observe">[\s\S]*?<\/section>/, '<section class="observe"><h2>今日观察</h2><ol><li><b>线下传播正在从“看一眼”转向“玩一次”。</b>哈啰租车与名创优品都把产品或IP拆成可参与、可带走的体验。</li><li><b>商场对快闪的价值在于承接完整活动周期。</b>体育IP需把限定商品、互动内容和客流转化统一配置。</li><li><b>低信息日更应更重视真实边界。</b>当日仅有 7 条达到核验标准，晨报明确显示实际数量，不以旧内容凑数。</li></ol></section>')
  .replace(/const groups=\[[\s\S]*?\];\nconst categoryPreview=/, `${groupsJs}\nconst categoryPreview=`);

writeFileSync(`${date}.html`, html);
writeFileSync('index.html', html);
const sections = grouped.filter(([, rows]) => rows.length).map(([category, rows]) => `## ${category}\n\n${rows.map((x, i) => `### ${i + 1}. ${x[2]}\n- **发布时间**：2026-08-01 ${x[0]}｜**来源**：[${x[1]}](${x[6]})｜**关键词**：${x[5]}\n- ${x[3]}\n- **可借鉴点**：${x[4]}`).join('\n\n')}`).join('\n\n');
writeFileSync(`${date}.md`, `---\ndate: ${date}\nrange: 2026-08-01\nitem_count: ${items.length}\nsources: 赢商网 2 条；联商网 1 条；SocialBeta 4 条；知识库昨日命中 0 条\n---\n\n# 陈瑶的商业晨报｜${date}\n\n> 严格昨日版：仅收录 8 月 1 日发布、可公开核验的独立报道。当天高质量候选不足，实际发布 ${items.length} 条，未以旧闻补足。\n\n${sections}\n\n## 今日观察\n\n1. 线下体验正成为低频服务、IP与品牌上新的共同沟通界面。\n2. 快闪的关键不止造景，还要把互动、商品和商场客流承接串起来。\n3. 信息密度低的日期应如实呈现实际数量，而不是用过期内容掩盖缺口。\n`);
console.log(`Built ${date}: ${items.length} verified yesterday items`);
