const fs = require('fs');

const page = 'design.html';
const today = '2026.07.31';
// 仅使用站酷公开首页当日可见的作品卡：标题、链接和预览图均来自首页 payload。
const latest = [
  ['推广活动','汽车活动','《恐龙大逃亡》_东风奕派M8·舒适的黄金标准','站酷公开首页推荐','以故事化汽车视觉强化“舒适”主题，适合汽车快闪、试驾和主题展的传播画面参考。','https://www.zcool.com.cn/work/ZNzM5NDEzMDQ=.html','https://img.zcool.cn/community/6a6a472be01b1ff2ycqmfn6343.jpg?k=e9aae97c2ec68a53c6b30dfc2ba99655&t=6a6e1800&x-oss-process=image/resize,m_fill,w_520,h_390,limit_1/auto-orient,1/sharpen,100/quality,q_80'],
  ['推广活动','音乐活动','《鼻塞》#MVLAND嘻哈狂欢派对','站酷公开首页推荐','强角色、强节奏的画面可转译为夜经济、音乐节和潮流市集的传播主视觉。','https://www.zcool.com.cn/work/ZNzM5NDEzMDA=.html','https://img.zcool.cn/community/6a6a3a9246380aho72r1q95941.jpg?k=2b36b8aa28f6b00109efcaa59f868ac8&t=6a6e1800&x-oss-process=image/resize,m_fill,w_520,h_390,limit_1/auto-orient,1/sharpen,100/quality,q_80'],
  ['推广活动','游戏活动','和平精英｜集结！全员就位点燃刺激狂欢','站酷公开首页推荐','将游戏角色、赛场氛围和社群动员汇成一张主画面，适合作为青年客群活动灵感。','https://www.zcool.com.cn/work/ZNzM5MzkwODQ=.html','https://img.zcool.cn/community/6a69a7c3bd7d6d2c6pt7zk8763.png?k=865fee7ecccb00294e8a283e82ddb671&t=6a6e1800&x-oss-process=image/resize,m_fill,w_520,h_390,limit_1/auto-orient,1/sharpen,100/quality,q_80'],
  ['推广活动','美妆活动','雅诗兰黛382号粉色星球！Pink Power！','站酷公开首页推荐','以品牌色和场景化叙事放大新品记忆点，可参考至美妆快闪、打卡装置和会员礼传播。','https://www.zcool.com.cn/work/ZNzM5MzkzOTI=.html','https://img.zcool.cn/community/6a69b60edcfc0wz8o1btfd9200.png?k=d0475d07aa63db093e8b21c1e1641b65&t=6a6e1800&x-oss-process=image/resize,m_fill,w_520,h_390,limit_1/auto-orient,1/sharpen,100/quality,q_80'],
  ['品牌与IP','餐饮品牌','SOLUTION Bar & Grill 品牌设计','站酷公开首页推荐','餐饮品牌的标志、材质和信息层级结合紧密，适合酒吧、餐吧及夜间场景的品牌参考。','https://www.zcool.com.cn/work/ZNzM5MzQ3ODA=.html','https://img.zcool.cn/community/6a686986c748cemliznnhr6368.jpg?k=8cd16936e8dd322984cc0fdcac56b8db&t=6a6e1800&x-oss-process=image/resize,m_fill,w_520,h_390,limit_1/auto-orient,1/sharpen,100/quality,q_80'],
  ['品牌与IP','品牌全案','AI时代·智能卫浴品牌升级全案｜从LOGO到终端','站酷公开首页推荐','从识别到终端应用的全链路呈现，适合观察耐消品如何建立统一的门店与产品语言。','https://www.zcool.com.cn/work/ZNzM5NDE3NDg=.html','https://img.zcool.cn/community/6a6ab7fa82809lfqev5h1v5039.png?k=4d018830eebca4a3ae127d3915fc8fb2&t=6a6e1800&x-oss-process=image/resize,m_fill,w_520,h_390,limit_1/auto-orient,1/sharpen,100/quality,q_80'],
  ['品牌与IP','IP形象','XONE 4大IP形象全案设计','站酷公开首页推荐','成组角色为会员互动、节庆物料和联名衍生提供可复制的内容资产。','https://www.zcool.com.cn/work/ZNzM5MzExMzI=.html','https://img.zcool.cn/community/6a6a0b987b274oqc2jyl3a8297.png?k=b52cd82ac25b64a92430c79e73e1bdf0&t=6a6e1800&x-oss-process=image/resize,m_fill,w_520,h_390,limit_1/auto-orient,1/sharpen,100/quality,q_80'],
  ['品牌与IP','餐饮品牌','碳响Sizzor烤肉小酒馆｜品牌设计','站酷公开首页推荐','将餐饮品类特性转成可识别的品牌气质，适合餐饮招商与门店焕新的视觉研究。','https://www.zcool.com.cn/work/ZNzM5MzkzNTY=.html','https://img.zcool.cn/community/6a69d1cf8a866madrw5w94478.png?k=817b9381392405cee08a89b11f215469&t=6a6e1800&x-oss-process=image/resize,m_fill,w_520,h_390,limit_1/auto-orient,1/sharpen,100/quality,q_80'],
  ['包装与零售','酒类包装','古莲春，一池古莲，千年风雅','站酷公开首页推荐','以东方意象组织酒类包装和礼赠感，适合节庆陈列与文化型商品开发参考。','https://www.zcool.com.cn/work/ZNzM4MjQzNDg=.html','https://img.zcool.cn/community/6a6b2e91a9ecfa2asokuh08255.png?k=4c3ca641c32968f7480f65430995cd19&t=6a6e1800&x-oss-process=image/resize,m_fill,w_520,h_390,limit_1/auto-orient,1/sharpen,100/quality,q_80'],
  ['包装与零售','节庆礼赠','中秋礼｜厝揽明月，骰落福来','站酷公开首页推荐','节庆礼盒将地方文化和互动元素纳入包装，适合商场中秋礼赠与会员活动参考。','https://www.zcool.com.cn/work/ZNzM5NDIwNjA=.html','https://img.zcool.cn/community/6a6abb30008425ong298sh9355.png?k=426bef056359ab2bdfbde5df06657606&t=6a6e1800&x-oss-process=image/resize,m_fill,w_520,h_390,limit_1/auto-orient,1/sharpen,100/quality,q_80'],
  ['包装与零售','酒类包装','摘要酒・书中自有黄金屋丨白酒包装设计','站酷公开首页推荐','把内容主题转化为礼盒叙事，适合研究高客单礼赠如何兼顾陈列感与开箱体验。','https://www.zcool.com.cn/work/ZNzM5NDEyOTY=.html','https://img.zcool.cn/community/6a6a4a9567d5571xw7kvtb6611.png?k=dbdeec06f6cedb3a3bfdb66b54db80ec&t=6a6e1800&x-oss-process=image/resize,m_fill,w_520,h_390,limit_1/auto-orient,1/sharpen,100/quality,q_80'],
  ['包装与零售','宠物零售','喵铮铮®功能营养猫条&猫粮｜包装设计品牌','站酷公开首页推荐','功能卖点、色彩区分与货架识别同步呈现，适合新消费品类的包装系统参考。','https://www.zcool.com.cn/work/ZNzM5Mzg3MzI=.html','https://img.zcool.cn/community/6a69a073c0c549sbnzyg169053.png?k=b0c4045f8e7c687e4c6d7e6aec4d82d1&t=6a6e1800&x-oss-process=image/resize,m_fill,w_520,h_390,limit_1/auto-orient,1/sharpen,100/quality,q_80'],
  ['视觉资产','网站视觉','UMe奶茶独立站官网设计｜GDD','站酷公开首页推荐','茶饮品牌将产品、视觉与转化页面统一，适合观察线上触点如何反哺门店消费。','https://www.zcool.com.cn/work/ZNzM5NDA4Njg=.html','https://img.zcool.cn/community/6a6a064e770eccpfdyno3k9813.png?k=03c85d0e8857721030fe718d0ca57a99&t=6a6e1800&x-oss-process=image/resize,m_fill,w_520,h_390,limit_1/auto-orient,1/sharpen,100/quality,q_80'],
  ['视觉资产','字体设计','好电影推荐（300部）系列字体设计','站酷公开首页推荐','系列字形可沉淀成海报、导视、联名物料和栏目封面的长期识别资产。','https://www.zcool.com.cn/work/ZNzM5NDIxNjg=.html','https://img.zcool.cn/community/6a6abdc935ea5lxtyguxyv2970.png?k=43ac4e97a2acde1014dd1dce05995006&t=6a6e1800&x-oss-process=image/resize,m_fill,w_520,h_390,limit_1/auto-orient,1/sharpen,100/quality,q_80'],
  ['视觉资产','插画视觉','六七月份习作','站酷公开首页推荐','商业插画的色彩与角色组织可为市集、夏日主题活动及周边物料提供灵感。','https://www.zcool.com.cn/work/ZNzM5NDE4NDQ=.html','https://img.zcool.cn/community/01df5d6a6b3459434ac1100065e16b.jpg?k=4d490065e2614295ffd71eaee6c96cc1&t=6a6e1800&x-oss-process=image/resize,m_fill,w_520,h_390,limit_1/auto-orient,1/sharpen,100/quality,q_80']
];

let html = fs.readFileSync(page, 'utf8');
const match = html.match(/const cases=(\[[\s\S]*?\]);const pastCases=(\[[\s\S]*?\]);let active=/);
if (!match) throw new Error('Cannot locate design data');
const oldCases = Function(`return ${match[1]}`)();
const oldPast = Function(`return ${match[2]}`)();
const past = [...oldCases.map(x => ['往期精选', '站酷归档', ...x.slice(2)]), ...oldPast];

html = html
  .replace('采集于 2026.07.30', `采集于 ${today}`)
  .replace('站酷一级主源 · 每日 15 个商业设计案例', '站酷一级主源 · 最新公开首页推荐 15 个案例')
  .replace('<div class="stat"><b>15</b><span>精选案例</span></div><div class="stat"><b>5</b><span>推广活动</span></div><div class="stat"><b>9</b><span>往期精选归档</span></div>', '<div class="stat"><b>15</b><span>最新案例</span></div><div class="stat"><b>4 / 4 / 4 / 3</b><span>四类分布</span></div><div class="stat"><b>24</b><span>往期精选归档</span></div>')
  .replace('以下统一标注“首页推荐采集于 2026.07.30”。', `以下统一标注“首页推荐采集于 ${today}”。`)
  .replace(/<summary>2026 年 7 月 · 往期精选 <span>9 个案例<\/span><\/summary>/, '<summary>2026 年 7 月 · 往期精选 <span>24 个案例</span></summary>')
  .replace(/const cases=\[[\s\S]*?\];const pastCases=\[[\s\S]*?\];let active=/, `const cases=${JSON.stringify(latest)};const pastCases=${JSON.stringify(past)};let active=`);

fs.writeFileSync(page, html);
console.log(`Synced design: ${latest.length} latest, ${past.length} archived`);
