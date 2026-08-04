import fs from 'node:fs';

const today = '2026.08.04';
const works = [
  ['推广活动','运动空间','微光跑者｜为城市奔跑爱好者打造的复合空间','以跑步社群为线索组织商业空间，适合运动主题活动与社群场景参考。','ZNzM5NTkxMjA=','https://img.zcool.cn/community/6a7020976d118finm4cqsn3423.png?k=554639efcab4d08729ac88accef452d6&t=6a735e00&x-oss-process=image/resize,m_fill,w_520,h_390,limit_1/auto-orient,1/sharpen,100/quality,q_80'],
  ['推广活动','音乐传播','候场少女：野生节拍','动态角色与节奏感画面可转译为夜间市集、音乐活动和年轻客群传播。','ZNzM5NTMwMjA=','https://img.zcool.cn/community/6a6dafc47bf09jgfrteeri7997.png?k=bc8edf8907ee9c6e2feaf75e072dfb52&t=6a735e00&x-oss-process=image/resize,m_fill,w_520,h_390,limit_1/auto-orient,1/sharpen,100/quality,q_80'],
  ['推广活动','节庆视觉','羊年IP｜羊名立万，五福临门','生肖角色可形成节庆主题、互动装置与会员周边的一整套视觉资产。','ZNzM4MzU5NzY=','https://img.zcool.cn/community/6a6f7dcdeabc5qc0u1ihid9813.png?k=a0acb3867d4cb93e3bbbf4fef656bea2&t=6a735e00&x-oss-process=image/resize,m_fill,w_520,h_390,limit_1/auto-orient,1/sharpen,100/quality,q_80'],
  ['推广活动','专辑设计','【专辑设计—破局六章】','强主题的视觉系统适合被延展到活动主 KV、系列海报与现场导视。','ZNzM5NjAzMDA=','https://img.zcool.cn/community/6a703ab2e0ef8nqhbdm3gt8210.jpg?k=8068f609b27f6c18cc78b638aa5ed89f&t=6a735e00&x-oss-process=image/resize,m_fill,w_520,h_390,limit_1/auto-orient,1/sharpen,100/quality,q_80'],
  ['品牌与IP','餐饮品牌','「无菜单」餐厅 VI 品牌全案设计','餐饮识别系统应贯通门头、菜单、空间与社媒表达，建立可被记住的体验。','ZNzE2Nzc3MzY=','https://img.zcool.cn/community/67ea6ad9dd844f37o41ty64638.png?k=3dbf469c57bbd17d3dbc5215b43d3029&t=6a735e00&x-oss-process=image/resize,m_fill,w_520,h_390,limit_1/auto-orient,1/sharpen,100/quality,q_80'],
  ['品牌与IP','娱乐空间','君毅设计×局柒｜新一代 KTV 品牌全案','夜间娱乐品牌需要将名称、视觉、空间与用户传播统一为完整体验。','ZNzM5NjAyODA=','https://img.zcool.cn/community/6a703a585fe39ovjhbevlz6166.png?k=9b2f294f740a24b6542e94e50ea31aee&t=6a735e00&x-oss-process=image/resize,m_fill,w_520,h_390,limit_1/auto-orient,1/sharpen,100/quality,q_80'],
  ['品牌与IP','宠物零售','元气商店宠物集合店品牌设计','集合店要让业态定位、导视与商品陈列共同承担“好逛”的第一印象。','ZNzM5NTk2NDg=','https://img.zcool.cn/community/6a70b7b6861eeue4olnvdx2661.png?k=53f2bc8c5baa001fc20f92860b4df054&t=6a735e00&x-oss-process=image/resize,m_fill,w_520,h_390,limit_1/auto-orient,1/sharpen,100/quality,q_80'],
  ['品牌与IP','品牌视觉','TEEMTONE BRAND VISUAL DESIGN','品牌主视觉需沉淀可复用的色彩、字体与图形规则，以适配不同触点。','ZNzM5NTg2NjA=','https://img.zcool.cn/community/6a700abee957blpf0v1a1s1549.png?k=dcf3e6d542a4cae4842b5f7e2de350b4&t=6a735e00&x-oss-process=image/resize,m_fill,w_520,h_390,limit_1/auto-orient,1/sharpen,100/quality,q_80'],
  ['包装与零售','宠物礼盒','爪豆 PAWDOT｜宠物日常组合礼盒包装设计','礼盒可通过组合结构、色彩和开箱节奏提升商品的送礼与陈列价值。','ZNzM5NTM2Mjg=','https://img.zcool.cn/community/6a70b65a321e77wc0nvv6y185.png?k=fb635108bccdd30ad69d310481719bf4&t=6a735e00&x-oss-process=image/resize,m_fill,w_520,h_390,limit_1/auto-orient,1/sharpen,100/quality,q_80'],
  ['包装与零售','电商零售','腕表｜超级单品视觉全案｜国内×出海','超级单品要用统一视觉连接商品详情、陈列素材与不同市场的转化表达。','ZNzM5NTk5ODg=','https://img.zcool.cn/community/6a7030d901d70xgjcr2qnq4821.png?k=c6e504e72437a14b007627a848660a92&t=6a735e00&x-oss-process=image/resize,m_fill,w_520,h_390,limit_1/auto-orient,1/sharpen,100/quality,q_80'],
  ['包装与零售','白酒包装','包装｜摘要白酒包装设计','产品故事、器型与货架识别需在包装第一眼中建立明确关系。','ZNzM5NTk2MjQ=','https://img.zcool.cn/community/6a7020b809edefzsgm52be4498.png?k=e4a206fe5e151810202fc7b967592a41&t=6a735e00&x-oss-process=image/resize,m_fill,w_520,h_390,limit_1/auto-orient,1/sharpen,100/quality,q_80'],
  ['包装与零售','中秋礼盒','花生万象·中秋雅礼','节庆礼盒用明确主题统领材质、图形与仪式感，适合会员礼与档期陈列。','ZNzM5NDk0NjA=','https://img.zcool.cn/community/6a6c63deea648mj8n66nho762.png?k=a9652a85c8350a1699f7bd0e6ed43142&t=6a735e00&x-oss-process=image/resize,m_fill,w_520,h_390,limit_1/auto-orient,1/sharpen,100/quality,q_80'],
  ['视觉资产','数字界面','2026 AiChat UI 作品集','界面信息层级可用于数字会员页、活动报名页和小程序的效率化表达。','ZNzM5NTI3NDA=','https://img.zcool.cn/community/6a6d9d6a8049694dyzvpla4349.png?k=bc1cf4d971a43ac02dd52b91a3c3970a&t=6a735e00&x-oss-process=image/resize,m_fill,w_520,h_390,limit_1/auto-orient,1/sharpen,100/quality,q_80'],
  ['视觉资产','角色视觉','鲸鱼的365天','角色与系列化画面可沉淀为社群内容、节日物料与互动玩法的基础资产。','ZNzM5NTM2MDA=','https://img.zcool.cn/community/6a709ff265b2byozits0k08335.png?k=fe83ab50b698fb7ed5f1d86733604a2d&t=6a735e00&x-oss-process=image/resize,m_fill,w_520,h_390,limit_1/auto-orient,1/sharpen,100/quality,q_80'],
  ['视觉资产','汉字IP','原创汉字IP｜欧不 ONO','文字角色化可为城市活动、商场栏目或会员沟通建立独特且可延展的符号。','ZNzM5NTE5MTY=','https://img.zcool.cn/community/6a6d618cc07c00hb9ney326916.png?k=ca6ff0ef06e56bb221aaa5b3164a6f69&t=6a735e00&x-oss-process=image/resize,m_fill,w_520,h_390,limit_1/auto-orient,1/sharpen,100/quality,q_80']
];
const latest = works.map(x => [x[0],x[1],x[2],'站酷公开首页推荐',x[3],`https://www.zcool.com.cn/work/${x[4]}.html`,x[5]]);
let html = fs.readFileSync('design.html','utf8');
const match = html.match(/const cases=(\[[\s\S]*?\]);const pastCases=(\[[\s\S]*?\]);let active=/);
if (!match) throw new Error('Cannot locate design data');
const oldCases = Function(`return ${match[1]}`)();
const oldPast = Function(`return ${match[2]}`)();
const past = [...oldCases.map(x => ['往期精选','站酷归档',...x.slice(2)]),...oldPast];
html = html
  .replace(/采集于 2026\.\d\d\.\d\d/,`采集于 ${today}`)
  .replace(/首页推荐采集于 2026\.\d\d\.\d\d/,`首页推荐采集于 ${today}`)
  .replace(/<div class="stat"><b>15<\/b><span>最新案例<\/span><\/div><div class="stat"><b>[^<]+<\/b><span>四类分布<\/span><\/div><div class="stat"><b>\d+<\/b><span>往期精选归档<\/span><\/div>/,`<div class="stat"><b>15</b><span>最新案例</span></div><div class="stat"><b>4 / 4 / 4 / 3</b><span>四类分布</span></div><div class="stat"><b>${past.length}</b><span>往期精选归档</span></div>`)
  .replace(/<summary>2026 年 7 月 · 往期精选 <span>\d+ 个案例<\/span><\/summary>/,`<summary>2026 年 8 月 · 往期精选 <span>${past.length} 个案例</span></summary>`)
  .replace(/const cases=\[[\s\S]*?\];const pastCases=\[[\s\S]*?\];let active=/,`const cases=${JSON.stringify(latest)};const pastCases=${JSON.stringify(past)};let active=`);
fs.writeFileSync('design.html',html);
console.log(`Synced design: ${latest.length} latest, ${past.length} archived`);
