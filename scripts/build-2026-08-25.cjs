const fs = require('fs');

const D = '2026-08-25';
const Y = '08.24';
const rows = [
  ['推广与会员','SocialBeta','抖音「馋猫外卖」假装点外卖，实际在存钱？','SocialBeta 将其归为产品功能营销，围绕外卖与储蓄的反差设置传播钩子。案例重心是让产品机制成为用户愿意转述的内容。','先提炼一个能被复述的产品反差，再用真实权益把讨论落回功能使用。','抖音、外卖、产品传播','https://socialbeta.com/campaign/28313','https://socialbeta.oss-cn-hangzhou.aliyuncs.com/upload/24325-1787297214.jpg?x-oss-process=image/resize,m_fill,w_675,h_450,limit_0/auto-orient,1/format,jpg'],
  ['推广与会员','SocialBeta','瑞幸 × MIND.A.DAY 的联名「喵」不可言','SocialBeta 收录瑞幸与 MIND.A.DAY 的跨界联名。咖啡高频消费与 IP 角色结合，目的是为新品制造可识别的话题入口。','联名应让角色、杯身或权益进入购买动作，而非只停留在社媒官宣。','瑞幸、IP联名、咖啡','https://socialbeta.com/campaign/28289','https://socialbeta.oss-cn-hangzhou.aliyuncs.com/upload/24325-1787560599.jpg?x-oss-process=image/resize,m_fill,w_675,h_450,limit_0/auto-orient,1/format,jpg'],
  ['推广与会员','SocialBeta','NIKE ×《海贼王》踏上属于你的伟大航路！','SocialBeta 将该合作标为跨界与 IP 联名营销。运动品牌借成熟故事世界观扩展产品的文化表达。','选择 IP 时要把世界观转译成商品、现场与用户任务，形成完整体验。','NIKE、海贼王、IP联名','https://socialbeta.com/campaign/28252','https://socialbeta.oss-cn-hangzhou.aliyuncs.com/upload/198246-1787488920.jpg?x-oss-process=image/resize,m_fill,w_675,h_450,limit_0/auto-orient,1/format,jpg'],
  ['推广与会员','SocialBeta','Burberry × 中国国家地理推出《与 Burberry 同行》','SocialBeta 收录该纪录片式系列内容，并标注为系列 campaign。品牌将户外原点与中国国家地理的内容语境结合。','内容共创应先找到品牌历史与合作方专业能力的交集，再决定叙事形式。','Burberry、纪录片、内容共创','https://socialbeta.com/campaign/28016','https://socialbeta.oss-cn-hangzhou.aliyuncs.com/upload/224736-1787321843.png?x-oss-process=image/resize,m_fill,w_675,h_450,limit_0/auto-orient,1/format,jpg'],
  ['推广与会员','SocialBeta','adidas 欢迎「妮」来！','SocialBeta 将 adidas 与 JENNIE 的合作列为跨界与 IP 联名营销。明星合作被用于强化新品的时尚与运动表达。','代言发布要同步给出产品焦点和内容延展，避免视觉记忆无法落到购买。','adidas、JENNIE、代言营销','https://socialbeta.com/campaign/28261','https://socialbeta.oss-cn-hangzhou.aliyuncs.com/upload/198246-1787486799.jpg?x-oss-process=image/resize,m_fill,w_675,h_450,limit_0/auto-orient,1/format,jpg'],
  ['推广与会员','SocialBeta','淘宝闪购携手张凌赫上演「特工局」！','SocialBeta 标注该案例为代言人与粉丝经济营销。即时零售平台以角色化内容建立年轻用户沟通入口。','平台传播可以用角色设定放大场景感，但必须衔接配送、优惠或商品能力。','淘宝闪购、即时零售、粉丝经济','https://socialbeta.com/campaign/27936','https://socialbeta.oss-cn-hangzhou.aliyuncs.com/upload/224736-1784196384.png?x-oss-process=image/resize,m_fill,w_675,h_450,limit_0/auto-orient,1/format,jpg'],
  ['推广与会员','SocialBeta','小红书喊你来过「有余地的生活」啦！','SocialBeta 将该案例标注为市集、线下营销与内容共创。平台以线下生活方式场景承接社区内容。','线下市集要把内容创作者、体验动线和可分享画面设计成一套闭环。','小红书、市集、线下营销','https://socialbeta.com/campaign/28318','https://socialbeta.oss-cn-hangzhou.aliyuncs.com/upload/224935-1787304380.jpg?x-oss-process=image/resize,m_fill,w_675,h_450,limit_0/auto-orient,1/format,jpg'],
  ['推广与会员','SocialBeta','小米把汽车展厅改造成巨型「手办盒」！','SocialBeta 记录小米汽车将展厅做成“手办盒”的线下表达。空间本身被用作产品传播的主画面。','展厅设计要有一眼可识别的主视觉，同时保留看车、试驾与服务的效率。','小米汽车、展厅、线下营销','https://socialbeta.com/campaign/28315','https://socialbeta.oss-cn-hangzhou.aliyuncs.com/upload/210618-1787296750.jpg?x-oss-process=image/resize,m_fill,w_675,h_450,limit_0/auto-orient,1/format,jpg'],
  ['品牌与设计','SocialBeta','章子怡成为娇韵诗至臻凝时全球代言人','SocialBeta 收录娇韵诗的全球代言人发布，并标记为美妆与代言营销。高端护肤沟通继续以人物气质承接产品定位。','高端美妆代言需把人物特质翻译成明确的产品功效与服务体验语言。','娇韵诗、美妆、代言人','https://socialbeta.com/campaign/28309','https://socialbeta.oss-cn-hangzhou.aliyuncs.com/upload/198246-1787485294.png?x-oss-process=image/resize,m_fill,w_675,h_450,limit_0/auto-orient,1/format,jpg'],
  ['品牌与设计','SocialBeta','刘宇成为晨光文具品牌至臻代言人','SocialBeta 将晨光此次发布归为文具和代言人营销。品牌以“笔墨筑梦”的主题串联代言人与产品类别。','低频文具可用开学、礼赠和创作场景放大代言内容的实际触点。','晨光、文具、代言人','https://socialbeta.com/campaign/28324','https://socialbeta.oss-cn-hangzhou.aliyuncs.com/upload/38450-1787480150.jpg?x-oss-process=image/resize,m_fill,w_675,h_450,limit_0/auto-orient,1/format,jpg'],
  ['品牌与设计','SocialBeta','kate spade 把纽约变成大型捉迷藏现场','SocialBeta 收录 kate spade 的新品营销内容，主题借“捉迷藏”强化城市想象。广告片以游戏化叙事服务新品记忆。','新品影片需要留下可迁移到橱窗、快闪和社媒挑战的核心游戏规则。','kate spade、新品营销、城市叙事','https://socialbeta.com/campaign/28294','https://socialbeta.oss-cn-hangzhou.aliyuncs.com/upload/38450-1787469048.jpg?x-oss-process=image/resize,m_fill,w_675,h_450,limit_0/auto-orient,1/format,jpg'],
  ['品牌与设计','SocialBeta','范丞丞成为北京现代艾尼氪 V 品牌代言人','SocialBeta 将北京现代的发布标为新能源新品与代言人营销。代言合作对应品牌的高端纯电沟通。','汽车代言不能只讲形象，还要用试驾、门店与产品卖点完成转化承接。','北京现代、新能源、代言人','https://socialbeta.com/campaign/28325','https://socialbeta.oss-cn-hangzhou.aliyuncs.com/upload/38450-1787480601.jpg?x-oss-process=image/resize,m_fill,w_675,h_450,limit_0/auto-orient,1/format,jpg'],
  ['品牌与设计','SocialBeta','RIO 和田曦薇一起允许自己微醺点','SocialBeta 收录 RIO 的代言人营销，指向预调酒品类的情绪化消费表达。内容以轻松、微醺的语气强化品牌氛围。','情绪营销需对应明确饮用时刻和产品选择，才能不止停留在口号。','RIO、预调酒、代言人','https://socialbeta.com/campaign/28310','https://socialbeta.oss-cn-hangzhou.aliyuncs.com/upload/198246-1787486268.jpg?x-oss-process=image/resize,m_fill,w_675,h_450,limit_0/auto-orient,1/format,jpg'],
  ['品牌与设计','SocialBeta','麦当劳 × 小玉 yuy 解锁东南亚「缤纷」之旅','SocialBeta 标注麦当劳的夏日与新品营销合作。视觉合作将“东南亚缤纷”作为季节性产品的统一主题。','季节限定要让视觉、菜单命名和门店物料共享一个清晰的主题资产。','麦当劳、夏日营销、新品','https://socialbeta.com/campaign/28291','https://socialbeta.oss-cn-hangzhou.aliyuncs.com/upload/210618-1787544598.jpg?x-oss-process=image/resize,m_fill,w_675,h_450,limit_0/auto-orient,1/format,jpg'],
  ['商业地产','联商网','广州太古汇，能否守住“广州商业一哥”之位？','联商网围绕广州太古汇的商业竞争力展开观察。报道把项目定位放在城市商业格局与高端客群变化中讨论。','高端项目复盘应同时看品牌组合、客群黏性与周边竞争，不以单一销售指标判断。','广州太古汇、高端商业、商圈','http://www.linkshop.com/news/2026551360.shtml',''],
  ['商业地产','联商网','Nike Live社区店加速收缩，美国至少15家店关闭','联商网关注 Nike Live 社区店的收缩情况。社区店模型的调整提示品牌需要重估门店角色与本地履约能力。','社区店扩张前应明确到店服务、库存协同和周边客群密度的经营阈值。','Nike Live、社区店、关店','http://www.linkshop.com/news/2026551344.shtml',''],
  ['招商与首店','联商网','ALDI奥乐齐再下一城，双店同开','联商网报道 ALDI 奥乐齐的新城市双店布局。硬折扣品牌以同步开店扩大城市覆盖与消费者认知。','新城市开店需先把供应链、选址半径和首批自有品牌体验做成可复制样板。','ALDI、硬折扣、新店','http://www.linkshop.com/news/2026551357.shtml',''],
  ['招商与首店','联商网','沃尔玛推出新服装品牌Scenario，主要面向年轻女性','联商网报道沃尔玛推出面向年轻女性的新服装品牌。零售商通过自有新品类寻找新的客群增长点。','自有品牌孵化要同步验证客群、陈列位置与价格带，避免只完成产品上架。','沃尔玛、自有品牌、年轻女性','http://www.linkshop.com/news/2026551346.shtml',''],
  ['零售与餐饮','联商网','驻马店最大超市欢乐爱家陷入储值卡挤兑风波','联商网报道当地超市出现储值卡相关争议。预付资金问题会直接影响零售商的用户信任与现金流安全。','会员储值要建立资金透明、兑付预案和快速沟通机制，避免风险外溢。','超市、储值卡、消费信任','http://www.linkshop.com/news/2026551375.shtml',''],
  ['零售与餐饮','联商网','鸣鸣很忙上半年经调整净利润同比增长136.6％','联商网发布鸣鸣很忙上半年经调整净利润增长信息。量贩零食的经营表现继续受到门店与供应链效率关注。','看量贩零食不能只看开店数，还要跟踪单店盈利与供应链周转。','鸣鸣很忙、量贩零食、业绩','http://www.linkshop.com/news/2026551371.shtml',''],
  ['零售与餐饮','联商网','Tims中国：成不了星巴克，也学不会瑞幸','联商网讨论 Tims 中国的品牌与经营路径。文章以星巴克和瑞幸为参照，观察咖啡连锁的差异化难题。','餐饮品牌定位不能只借对标对象，应把产品、价格和门店体验做成自己的组合。','Tims、咖啡连锁、品牌定位','http://www.linkshop.com/news/2026551366.shtml',''],
  ['零售与餐饮','联商网','大品牌守不住价，小品牌走不动量，超市散装何以失守？','联商网聚焦超市散装品类的价格与动销压力。散装经营同时面对品牌定价和小品牌规模化的难题。','散装品类要回到周转、损耗和价格认知三项基础指标，而非只压采购价。','超市、散装、品类经营','http://www.linkshop.com/news/2026551365.shtml',''],
  ['零售与餐饮','联商网','盒马vs小象超市：谁能笑到最后？','联商网比较盒马与小象超市的即时零售竞争。竞争焦点包括商品供给、履约效率和用户体验。','即时零售的比较要拆到品类、时效和复购，而不是只看补贴和订单规模。','盒马、小象超市、即时零售','http://www.linkshop.com/news/2026551358.shtml',''],
  ['零售与餐饮','联商网','一天500瓶不够卖，6.9元的“预制奶茶”被年轻人抢疯了','联商网观察低价预制奶茶的销售现象。低客单新品依赖口味、价格和渠道陈列的共同匹配。','爆品测试应同步追踪复购与毛利，避免被短期售罄误导扩张判断。','预制奶茶、低价、年轻消费','http://www.linkshop.com/news/2026551352.shtml',''],
  ['零售与餐饮','联商网','好想你在山姆增长48％，消费者相信的是山姆，还是它？','联商网讨论好想你在山姆渠道的增长。会员店渠道能够放大品牌，但也会考验品牌自身的认知沉淀。','进入强渠道后要持续建设自有认知，避免增长完全依赖渠道背书。','好想你、山姆、渠道','http://www.linkshop.com/news/2026551351.shtml',''],
  ['零售与餐饮','联商网','连续10个季度增长，叮咚买菜换了一种扩张方式','联商网关注叮咚买菜持续增长及扩张策略变化。生鲜电商的增长质量仍取决于供应链和区域经营效率。','扩张节奏应跟随区域供给与履约能力，而不是先追求覆盖范围。','叮咚买菜、生鲜电商、扩张','http://www.linkshop.com/news/2026551348.shtml',''],
  ['零售与餐饮','联商网','没有75折，消费者还会逛丝芙兰吗？','联商网从折扣依赖角度讨论丝芙兰的消费吸引力。美妆零售需要在价格、体验和品牌组合之间寻找平衡。','促销之外要用服务、选品和内容制造到店理由，降低对单一折扣的依赖。','丝芙兰、美妆零售、折扣','http://www.linkshop.com/news/2026551345.shtml',''],
  ['政策与趋势','联商网','联商头条：胖东来回应胖改；京东外卖上线“宝藏小馆”','联商网汇总胖改回应与京东外卖新动作。零售改造和平台餐饮服务都在争取更高的消费效率。','行业快讯应继续回访改造后的门店数据与商户反馈，避免只停留在发布层面。','胖改、京东外卖、零售趋势','http://www.linkshop.com/news/2026551363.shtml',''],
  ['政策与趋势','联商网','于东来：“胖改”目的是帮助困难企业走出困境','联商网记录于东来对“胖改”目的的回应。该讨论将零售调改从单店流量话题带回经营改善。','调改项目要提前设定商品、服务和组织效率的改善指标，形成可复盘结果。','胖东来、胖改、调改','http://www.linkshop.com/news/2026551356.shtml',''],
  ['政策与趋势','联商网','为什么很多企业研究山姆却学不会山姆？','联商网讨论企业研究山姆模式时常见的误区。会员店经营不是单个商品或卖场动作可以复制。','学习会员店要拆解选品、会员价值和供应链协同，拒绝只模仿表面陈列。','山姆、会员店、零售模型','http://www.linkshop.com/news/2026551355.shtml','']
];

if (rows.length !== 30 || new Set(rows.map((row) => row[4])).size !== rows.length) {
  throw new Error('昨日内容数量或“可借鉴”唯一性校验失败');
}

const categories = ['推广与会员', '商业地产', '招商与首店', '零售与餐饮', '品牌与设计', '政策与趋势'];
const groups = categories.map((category) => [category, rows.filter((row) => row[0] === category).map((row) => [Y].concat(row.slice(1)))]);

let html = fs.readFileSync('2026-08-21.html', 'utf8')
  .split('2026.08.21').join('2026.08.25')
  .split('2026-08-21').join(D)
  .split('08.20').join(Y);
html = html
  .replace(/<section class="hero">[\s\S]*?<\/section>/, '<section class="hero"><p>严格昨日版 · 仅收录 08.24 发布、可公开核验的独立报道</p><strong>零售效率、即时履约与品牌内容仍是核心变量；14 条营销案例与 16 条零售商业报道共同构成今日候选池。</strong></section>')
  .replace(/<section class="observe">[\s\S]*?<\/section>/, '<section class="observe"><h2>今日观察</h2><ol><li><b>即时零售正回到经营基本盘。</b>平台竞争之外，商品供给、履约和复购决定模型能否持续。</li><li><b>硬折扣与会员店仍在考验复制能力。</b>开店速度只是表面，供应链、选品与区域效率才是关键。</li><li><b>品牌传播在强化实体触点。</b>展厅、市集、联名与季节新品都需要衔接商品、门店或权益。</li></ol></section>')
  .replace(/<a class="portal" href="\.\/" target="_top"><b>\d+<\/b><span>昨日发生<\/span><\/a>/, '<a class="portal" href="./" target="_top"><b>30</b><span>昨日发生</span></a>')
  .replace(/本版只发布可公开核验的 \d+ 条独立内容。/, '本版只发布可公开核验的 30 条独立内容。')
  .replace(/const groups=\[[\s\S]*?\];\nconst categoryPreview=/, `const groups=${JSON.stringify(groups)};\nconst categoryPreview=`);
fs.writeFileSync(`${D}.html`, html);
fs.writeFileSync('index.html', html);

const markdown = groups.map(([category, items]) => `## ${category}\n\n${items.map((item, index) => `### ${index + 1}. ${item[2]}\n- **发布时间**：2026-08-24｜**来源**：[${item[1]}](${item[6]})\n- ${item[3]}\n- **可借鉴点**：${item[4]}\n- **关键词**：${item[5]}`).join('\n\n')}`).join('\n\n');
fs.writeFileSync(`${D}.md`, `# 陈瑶的商业晨报｜${D}\n\n> 严格昨日版：仅收录 2026 年 8 月 24 日可公开核验的独立报道，共 ${rows.length} 条。\n\n## 今日观察\n\n1. 即时零售的竞争最终要落到商品供给、履约与复购。\n2. 硬折扣和会员店的复制难点在供应链、选品与区域经营效率。\n3. 线下营销需要把内容、空间与商品或权益接在同一条转化路径上。\n\n${markdown}\n`);

const state = JSON.parse(fs.readFileSync('kb-scan-state.json', 'utf8'));
state.last_successful_run = '2026-08-25T08:00:00+08:00';
state.last_scan_window = { start: '2026-08-21T08:00:00+08:00', end: '2026-08-25T00:00:00+08:00' };
state.published_yesterday = [];
state.notes = '8月25日增量扫描：未发现8月21日后新增或修改且可公开发布的行业资料；无知识库条目进入昨日或长期档案。';
fs.writeFileSync('kb-scan-state.json', `${JSON.stringify(state, null, 2)}\n`);

console.log(JSON.stringify({ published: rows.length, groups: groups.map(([category, items]) => [category, items.length]), candidates: 31, deepRead: 30, kbMatches: 0, huaianLatest: 0, designNew: 0 }));
