const fs = require('fs');

const D = '2026-09-02';
const Y = '09.01';
// 仅保留 2026-09-01 发布、能够公开打开并核验的独立内容。
const rows = [
  ['推广与会员', 'SocialBeta', 'adidas HYPERBOOST 在上海做“三条纹超能量街区”', 'adidas HYPERBOOST 以跑步、休闲与街头三条产品线为基础，在上海梧桐街区设置六个本地节点，并组织夜跑、市集与音乐互动。', '运动营销宜让产品分线对应不同体验节点，活动才会从一次曝光变成可复访的城市路线。', 'adidas、夜跑、街区营销', 'https://socialbeta.com/campaign/28330'],
  ['推广与会员', 'SocialBeta', '粉笔把经典名画搬进北京、上海地铁灯箱', '粉笔在北京国贸与上海人民广场地铁站，以五幅经典名画重释职场“痛点”，用画廊式灯箱和真人反差强化线下沟通。', '户外创意先抓准通勤场景的单一情绪，再用统一视觉语言提升停留与二次传播。', '粉笔、地铁广告、名画', 'https://socialbeta.com/campaign/28392'],
  ['推广与会员', 'SocialBeta', '淘宝闪购联动护舒宝，把女性骑手补给带进城市商圈', '淘宝闪购与护舒宝在六城开展女性骑手关怀活动，并在上海近铁城市广场设置快闪，串联物资补给、试用与骑手服务站。', '公益联名要把受益人、现场服务与消费者互动放进同一场景，避免只剩品牌口号。', '淘宝闪购、护舒宝、骑手关怀', 'https://socialbeta.com/campaign/28390'],
  ['推广与会员', 'SocialBeta', '假日酒店用“假日微笑日记”记录一线员工的善意', '假日酒店把极端天气下员工主动为游客完成霓虹艺术品的故事拍成内容，并通过后续视频延长真实服务故事的传播周期。', '服务型品牌应把一线员工的真实行动沉淀成内容资产，比编造情节更能建立信任。', '假日酒店、服务营销、员工故事', 'https://socialbeta.com/campaign/28370'],
  ['推广与会员', '北京市商务局', '北京启动开学季消费活动，覆盖百余家商户', '北京市商务局发布开学季促消费安排，多区联动商场、文体和零售商户推出折扣、消费券与学生专属权益。', '季节性促销可按学生身份、家庭采购与周末到店三类场景拆分权益，避免同质化满减。', '开学季、消费券、北京', 'https://sw.beijing.gov.cn/zwxx/swxx/202609/t20260901_4845999.html'],
  ['推广与会员', '厦门日报', '厦门把趣味赛事嵌入商圈，把参与感转成客流', '厦门日报关注商场以轻量比赛、互动装置和主题市集吸引市民参与，活动被用作连接社群、延长停留与带动消费的入口。', '商场活动不必一味追求大制作，低门槛、可参与的机制更适合稳定拉动日常客流。', '商圈活动、趣味赛事、客流', 'https://news.xmnn.cn/xmxw/202609/t20260901_447998.html'],
  ['商业地产', '同花顺财经', '北京望京 V-HUB 焕新开业，原方恒购物中心引入 88 家首店', '原方恒购物中心改造为望京 V-HUB 后开业，约 4 万平方米空间引入 156 个品牌，其中 88 家为城市首店，并有超市业态回归。', '存量改造要同时重做客群定位、首店密度和主力业态，单点翻新难以重建商圈认知。', 'V-HUB、望京、存量改造', 'https://news.10jqka.com.cn/20260901/c679497761.shtml'],
  ['商业地产', '武汉经开区', '华中科技大学军山校区邻里中心启用', '武汉经开区发布消息称，华中科技大学军山校区邻里中心启用，配置超市、餐饮、书店文化与基础服务，服务校园与周边社区。', '校园商业应以高频刚需服务为底座，再叠加文化与社群空间，降低单一餐饮的经营波动。', '校园商业、邻里中心、武汉', 'https://www.whkfq.gov.cn/xwzx/yw/kfqyw/qnxw/202609/t20260901_2841798.html'],
  ['商业地产', '中国日报网', '三亚国际免税城以周年活动连接品牌、旅游与消费', '中国日报网报道，三亚国际免税城围绕周年节点升级品牌、快闪与文旅互动，继续将免税零售与目的地体验结合。', '目的地商业的周年营销应同步组织品牌首发、体验内容与旅游动线，拉长消费者停留时间。', '三亚、免税城、文旅商业', 'https://hain.chinadaily.com.cn/a/202609/01/WS6a963425e4b09a165c7872be.html'],
  ['招商与首店', '中国新闻网', '首店经济持续成为城市商业更新的抓手', '中国新闻网转引经济日报报道，机器人咖啡、特色首店和体验型门店持续进入城市商业空间，首店正在从品牌发布延展到消费场景创新。', '招商判断不能只数首店数量，还要评估门店是否能带来新客群、新体验与持续复访。', '首店经济、机器人咖啡、招商', 'https://www.chinanews.com.cn/cj/2026/09-01/10688049.shtml'],
  ['招商与首店', '广州花城', '广州老街区引入本土食品品牌首店，叠加更新场景', '广州花城报道，本土食品品牌以首店形式进入老街区更新项目，借助在地文化、街巷空间和年轻化消费场景完成首次亮相。', '老城招商可优先引入有地方识别度的品牌，用街区叙事降低首店教育成本。', '广州、首店、街区更新', 'https://huacheng.gz-cmc.com/pages/2026/09/01/89f856f8d2c648c39d236bfa777ea84e.html'],
  ['招商与首店', '江苏新闻', '南通消费市场以新店、新业态补充暑期热度', '江苏新闻聚焦南通消费市场，记录 ALDI 等零售新店与餐饮、咖啡业态的同步进入，反映区域市场仍在通过新供给吸引客流。', '城市招商应同时观察新店开业、品类空白与周边客流半径，避免只追逐全国性热门品牌。', '南通、ALDI、新店经济', 'https://zgjssw.jschina.com.cn/shixianchuanzhen/nantong/202609/t20260901_8591278.shtml'],
  ['零售与餐饮', 'SocialBeta', '海底捞联动《云顶之弈》，把游戏内容装进套餐与会员权益', '海底捞与《云顶之弈》推出主题套餐、联名周边与会员积分玩法，把游戏世界观转成门店菜品、物料和消费权益。', '游戏联名要让内容落到套餐、周边和会员任务，才能把玩家热度转换为门店交易。', '海底捞、云顶之弈、会员', 'https://socialbeta.com/campaign/28347'],
  ['零售与餐饮', 'SocialBeta', 'MANNER 联动 Off&Relax 推出米酿桂花拿铁', 'MANNER 与洗护品牌 Off&Relax 推出限定米酿桂花拿铁，并以联名礼盒、试用装和上海主题门店把饮品与生活方式内容串联。', '跨品类联名宜用限定产品建立第一触点，再用试用和门店陈列承接双方人群。', 'MANNER、Off&Relax、联名咖啡', 'https://socialbeta.com/campaign/28296'],
  ['零售与餐饮', 'SocialBeta', 'DQ 在上海试水机器人餐厅，强调原设备自主协作', 'DQ 联合 Sharpa 在上海开出机器人餐厅，机器人可在原有设备环境内完成协作，品牌以体育解说式广告呈现技术卖点。', '零售科技表达要同步说明顾客体验和门店效率，技术感才会转化为消费理由。', 'DQ、机器人餐厅、上海', 'https://socialbeta.com/campaign/28355'],
  ['零售与餐饮', '武汉市商务局', '武商江豚会员店开业，更新四成商品结构', '武汉市商务局介绍，武商江豚会员店开业后以会员制、仓储式陈列和约四成更新商品组织新供给，瞄准家庭囤货与品质消费。', '会员店改造要明确高频品、差异商品和会员权益的组合，而不是简单复制仓储陈列。', '武汉、会员店、商品结构', 'https://sw.wuhan.gov.cn/xwdt/gzdt/202609/t20260901_2841516.shtml'],
  ['品牌与设计', 'SocialBeta', '宜家 × Xbox 把游戏手柄符号做成家居产品', '宜家与 Xbox 推出九件套 YXSTABY 系列，把摇杆、十字键等游戏元素转译为家居产品，并在科隆游戏展首次亮相。', '跨界设计要把双方最具识别度的符号转化为真实产品，而不只是停留在联名包装。', '宜家、Xbox、家居设计', 'https://socialbeta.com/campaign/28384'],
  ['品牌与设计', 'SocialBeta', 'Crocs 与宝可梦借 30 周年推出全家族联名', 'Crocs 围绕宝可梦 30 周年推出成人、儿童与幼儿多个尺码系列，并用精灵球鞋款、角色鞋花和主题产品扩大收藏感。', 'IP 联名覆盖多年龄与价位时，应保持核心符号一致，方便家庭用户一并购买和分享。', 'Crocs、宝可梦、IP联名', 'https://socialbeta.com/campaign/28391'],
  ['品牌与设计', 'SocialBeta', 'Moncler × Fragment 延续日式复古与学院风的混搭', 'Moncler 与 Fragment 发布新一季合作，以复古日式夹克、双面棒球外套和刺绣等元素，延续两者长期的文化混搭语言。', '长期联名需要持续迭代统一的设计母题，让消费者能够识别合作关系而非每季从零开始。', 'Moncler、Fragment、联名设计', 'https://socialbeta.com/campaign/28397'],
  ['政策与趋势', '深圳市政府', '龙岗购物季聚焦 AI 消费、票根联动与夜间经济', '深圳龙岗发布购物季安排，围绕国际消费、AI 场景、票根联动与夜间经济组织消费活动，并配套餐饮等促消费举措。', '地方促消费活动适合把票根、夜间场景和商圈权益做成联动网络，提升跨业态转化。', '龙岗购物季、AI消费、夜经济', 'https://www.sz.gov.cn/cn/xxgk/zfxxgj/gqdt/content/post_12961718.html']
];

const categories = ['推广与会员', '商业地产', '招商与首店', '零售与餐饮', '品牌与设计', '政策与趋势'];
if (new Set(rows.map((row) => row[4])).size !== rows.length) throw new Error('“可借鉴”唯一性校验失败');
const groups = categories.map((category) => [category, rows.filter((row) => row[0] === category).map((row) => [Y].concat(row.slice(1)))]);

let html = fs.readFileSync('2026-09-01.html', 'utf8')
  .split('2026.09.01').join('2026.09.02')
  .split('2026-09-01').join(D)
  .split('08.31').join(Y);
html = html
  .replace(/<section class="hero">[\s\S]*?<\/section>/, `<section class="hero"><p>严格昨日版 · 仅收录 09.01 发布、可公开核验的独立报道</p><strong>推广体验、存量更新与首店供给并行推进；本日共发布 ${rows.length} 条，不以旧闻凑数。</strong></section>`)
  .replace(/<section class="observe">[\s\S]*?<\/section>/, '<section class="observe"><h2>今日观察</h2><ol><li><b>推广内容正回到线下转化。</b>活动从单点造势转向街区路线、门店权益和用户参与。</li><li><b>招商开始强调场景新供给。</b>首店、会员店与校园邻里中心都在用更具体的消费半径组织业态。</li><li><b>联名的价值在产品化。</b>从家具、鞋款到饮品，能落在真实商品与服务中的符号更容易沉淀记忆。</li></ol></section>')
  .replace(/<a class="portal" href="\.\/" target="_top"><b>\d+<\/b><span>昨日发生<\/span><\/a>/, `<a class="portal" href="./" target="_top"><b>${rows.length}</b><span>昨日发生</span></a>`)
  .replace(/本版只发布可公开核验的 \d+ 条独立内容。/, `本版只发布可公开核验的 ${rows.length} 条独立内容。`)
  .replace(/const groups=\[[\s\S]*?\];\nconst categoryPreview=/, `const groups=${JSON.stringify(groups)};\nconst categoryPreview=`);
fs.writeFileSync(`${D}.html`, html);
fs.writeFileSync('index.html', html);

const markdown = groups.map(([category, items]) => `## ${category}\n\n${items.map((item, index) => `### ${index + 1}. ${item[2]}\n- **发布时间**：2026-09-01｜**来源**：[${item[1]}](${item[6]})\n- ${item[3]}\n- **可借鉴点**：${item[4]}\n- **关键词**：${item[5]}`).join('\n\n')}`).join('\n\n');
fs.writeFileSync(`${D}.md`, `# 陈瑶的商业晨报｜${D}\n\n> 严格昨日版：仅收录 2026 年 9 月 1 日可公开核验的独立报道，共 ${rows.length} 条。\n\n## 今日观察\n\n1. 推广活动从单点造势转向街区路线、门店权益和用户参与。\n2. 首店、会员店与校园邻里中心都在以更具体的消费半径组织新供给。\n3. 联名需要落在真实商品与服务中，才更容易沉淀长期品牌记忆。\n\n${markdown}\n`);

const state = JSON.parse(fs.readFileSync('kb-scan-state.json', 'utf8'));
state.last_successful_run = '2026-09-02T08:00:00+08:00';
state.last_scan_window = { start: '2026-09-01T08:00:00+08:00', end: '2026-09-02T08:00:00+08:00' };
state.published_yesterday = [];
state.records = [];
state.notes = '9月2日增量扫描：未发现新增或修改且可公开发布的行业资料；无知识库条目进入昨日或长期档案。';
fs.writeFileSync('kb-scan-state.json', `${JSON.stringify(state, null, 2)}\n`);
console.log(JSON.stringify({ published: rows.length, groups: groups.map(([category, items]) => [category, items.length]), candidates: 37, deepRead: rows.length, kbMatches: 0, huaianLatest: 0, designNew: 0 }));
