const fs = require('fs');
const today = '2026.08.02';
const picks = [
  ['ZNzM5NDY1NTY=','推广活动','汽车活动','《黄金标准·终极对决》——AIGC','汽车主题的竞赛化主视觉，适合试驾、快闪与产品传播的场景化表达参考。'],
  ['ZNzM5NDY1MjA=','推广活动','音乐活动','《If U Want It All》MV——#MVLAND嘻哈狂欢派对','强节奏的角色和舞台感可转译为音乐节、夜间市集及年轻客群活动。'],
  ['ZNzM5NDU4NTI=','推广活动','汽车活动','【代号】：全员C位 M8的黄金标准','围绕产品卖点组织视觉冲突，适合商业活动从一句主题延展至整套物料。'],
  ['ZNzM5NDMzMjA=','推广活动','影视传播','《蜘蛛侠 崭新之日》｜中国版电影海报','电影级叙事画面可借鉴到联名活动、主题展和限定商品的主视觉表达。'],
  ['ZNzM5NDk1NjQ=','品牌与IP','餐饮品牌','STACKVORE汉堡｜餐饮品牌全案设计','餐饮品牌识别需兼顾菜单、包装、招牌与空间中的高频识别。'],
  ['ZNzM5MzQ3ODA=','品牌与IP','餐饮品牌','SOLUTION Bar & Grill 品牌设计','酒吧与餐吧以统一的识别、材质和信息层级建立夜间场景气质。'],
  ['ZNzM5NDE3NDg=','品牌与IP','品牌全案','AI时代·智能卫浴品牌升级全案｜从LOGO到终端','耐消品品牌应让识别系统贯通产品、终端和服务触点。'],
  ['ZNzM5MzExMzI=','品牌与IP','IP形象','XONE 4大IP形象全案设计','成组IP可成为会员互动、节庆物料与联名衍生的长期内容资产。'],
  ['ZNzM5NDYzNjQ=','包装与零售','酒类包装','摘要·「道源」｜品自然大道 寻风味本源','以产品主题贯穿包装与礼赠语境，适合观察文化叙事如何走进商品。'],
  ['ZNzM5NDU3ODQ=','包装与零售','节庆礼赠','中秋｜月上桂花枝，人间团圆时','节庆视觉可提前沉淀为礼盒、陈列、会员礼和商场活动的一致母题。'],
  ['ZNzM4MjQzNDg=','包装与零售','酒类包装','古莲春，一池古莲，千年风雅','东方意象与礼赠感结合，适合文化型商品的陈列与开箱体验参考。'],
  ['ZNzM5Mzg3MzI=','包装与零售','宠物零售','喵铮铮®功能营养猫条&猫粮｜包装设计品牌','功能卖点和货架识别应由系列包装统一承接。'],
  ['ZNzM5NDcxMTY=','视觉资产','字体视觉','汉字境／一字禅《伏天修形・一字见心》','系列字体可延展至导视、海报、会员物料和栏目封面。'],
  ['ZNzM5MzEzMDg=','视觉资产','产品广告','正浩OCEAN2电源产品三维动画广告','产品功能以动态三维方式呈现，可参考新品发布和终端屏幕内容。'],
  ['ZNzM5NDQ3MDQ=','视觉资产','角色视觉','「宇季」归环 帕塔角色PV','角色和动态镜头可为IP发布、社媒短片与互动装置提供视觉语言。']
];
let source = fs.readFileSync('/tmp/zc-0802.html', 'utf8').replace(/\\"/g, '"').replace(/\\u0026/g, '&');
const readWork = id => {
  const esc = id.replace(/[=]/g, '\\$&');
  const re = new RegExp('\\["w",\\[\\d+,"'+esc+'","([^"]+)","([^"]+)"');
  const m = source.match(re); if (!m) throw new Error('Missing ZCOOL card '+id);
  return [m[1], m[2]];
};
const latest = picks.map(([id, category, kind, wantedTitle, takeaway]) => {
  const [title, image] = readWork(id);
  return [category, kind, title || wantedTitle, '站酷公开首页推荐', takeaway, `https://www.zcool.com.cn/work/${id}.html`, image];
});
let html = fs.readFileSync('design.html', 'utf8');
const match = html.match(/const cases=(\[[\s\S]*?\]);const pastCases=(\[[\s\S]*?\]);let active=/);
if (!match) throw new Error('Cannot locate design data');
const oldCases = Function(`return ${match[1]}`)();
const oldPast = Function(`return ${match[2]}`)();
const past = [...oldCases.map(x => ['往期精选', '站酷归档', ...x.slice(2)]), ...oldPast];
html = html
  .replace(/采集于 2026\.\d\d\.\d\d/, `采集于 ${today}`)
  .replace(/最新公开首页推荐 15 个案例|每日 15 个商业设计案例/, '站酷一级主源 · 最新公开首页推荐 15 个案例')
  .replace(/以下统一标注“首页推荐采集于 2026\.\d\d\.\d\d”。/, `以下统一标注“首页推荐采集于 ${today}”。`)
  .replace(/<div class="stat"><b>15<\/b><span>最新案例<\/span><\/div><div class="stat"><b>[^<]+<\/b><span>四类分布<\/span><\/div><div class="stat"><b>\d+<\/b><span>往期精选归档<\/span><\/div>/, `<div class="stat"><b>15</b><span>最新案例</span></div><div class="stat"><b>4 / 4 / 4 / 3</b><span>四类分布</span></div><div class="stat"><b>${past.length}</b><span>往期精选归档</span></div>`)
  .replace(/<summary>2026 年 7 月 · 往期精选 <span>\d+ 个案例<\/span><\/summary>/, `<summary>2026 年 7 月 · 往期精选 <span>${past.length} 个案例</span></summary>`)
  .replace(/const cases=\[[\s\S]*?\];const pastCases=\[[\s\S]*?\];let active=/, `const cases=${JSON.stringify(latest)};const pastCases=${JSON.stringify(past)};let active=`);
fs.writeFileSync('design.html', html);
console.log(`Synced design: ${latest.length} latest, ${past.length} archived`);
