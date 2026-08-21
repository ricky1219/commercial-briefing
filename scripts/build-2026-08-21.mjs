const fs = require('fs');

const D = '2026-08-21';
const Y = '08.20';
const take = {
  '推广与会员': '城市与项目营销需把在地资源、内容主题和日常客流转化放在同一套运营方案里。',
  '商业地产': '项目扩张与焕新要回到城市结构、商圈供给和长期运营能力来判断。',
  '招商与首店': '首店价值不只在数量，需同步看品牌能级、落位和后续经营质量。',
  '零售与餐饮': '零售增长应同时拆解商品、供应链、价格和门店效率，避免只看规模。',
  '品牌与设计': '品牌信任也是经营资产，组织治理与公开表达会直接影响用户关系。',
  '政策与趋势': '数据观察要回到消费结构和业态效率，避免仅用单月数字下结论。'
};

const rows = [
  ['推广与会员','SocialBeta','潘婷官宣心动代言人 EXO 世勋','潘婷以偶像代言强化年轻客群沟通。代言合作需衔接内容、渠道与产品体验，避免只有官宣热度。',take['推广与会员'],'潘婷、代言、年轻客群','https://socialbeta.com/campaign/28287',''],
  ['推广与会员','SocialBeta','力士携手张员瑛让你闪出「钻光肌」','力士借明星表达产品卖点。美妆节点传播可将视觉记忆、试用权益和到店转化同步组织。',take['推广与会员'],'力士、美妆、代言','https://socialbeta.com/campaign/28283',''],
  ['推广与会员','SocialBeta','名创优品赞颂每一份「女子」手艺','名创优品以手艺主题连接女性叙事与品牌内容。零售营销要让价值主张落在商品、陈列和互动里。',take['推广与会员'],'名创优品、女性、零售内容','https://socialbeta.com/campaign/28278',''],
  ['推广与会员','SocialBeta','喜茶首届全国联考来了！','喜茶以“全国联考”做社交化互动。高频品牌可用测试、挑战等机制放大用户参与与二次传播。',take['推广与会员'],'喜茶、互动、社交传播','https://socialbeta.com/campaign/28297',''],
  ['推广与会员','SocialBeta','喜茶把七夕还给织女了','喜茶围绕织女重构七夕表达。节日创意应有明确的品牌语气，也要能被用户轻松参与。',take['推广与会员'],'喜茶、七夕、节日营销','https://socialbeta.com/campaign/28251',''],
  ['推广与会员','SocialBeta','花呗 ×《剑来》带你一剑「斩万物」！','花呗与国漫 IP 联动，把用户权益置入角色叙事。金融品牌跨界要通过实际场景和权益承接内容流量。',take['推广与会员'],'花呗、国漫、IP联名','https://socialbeta.com/campaign/28284',''],
  ['推广与会员','SocialBeta','雅漾 × MANNER 为你「蓄能」','雅漾与 MANNER 将护肤和咖啡场景联动。跨品类合作应选择客群与使用时刻真实重叠的伙伴。',take['推广与会员'],'雅漾、MANNER、跨界','https://socialbeta.com/campaign/28292',''],
  ['推广与会员','SocialBeta','泰柯茶园推出七夕「鹅语等级考试」','泰柯茶园以趣味考试切入七夕互动。小众餐饮品牌可用低成本机制强化独特语气和社交分享。',take['推广与会员'],'泰柯茶园、七夕、互动','https://socialbeta.com/campaign/28259',''],
  ['推广与会员','SocialBeta','Bottega Veneta 携手艺术家邀你一起编织「爱意」','Bottega Veneta 以艺术合作延展七夕主题。奢侈品牌活动需保留工艺与审美资产，建立长期内容感。',take['推广与会员'],'Bottega Veneta、艺术、七夕','https://socialbeta.com/campaign/28295',''],
  ['商业地产','赢商网','香港社区mall，有点惨','赢商网关注香港社区商业的客流外流与空铺压力。社区项目要重看本地需求、业态密度和日常服务能力。',take['商业地产'],'香港、社区商业、空铺','https://news.winshang.com/html/074/1694.html',''],
  ['商业地产','赢商网','北京华联旗下高端精品超市BHG在京连闭两店','BHG 在北京连续关闭门店，反映高端超市经营压力。项目与品牌要同步评估租约、商品力和客群变化。',take['商业地产'],'BHG、高端超市、闭店','https://news.winshang.com/html/074/1706.html',''],
  ['商业地产','赢商网','从排队王到闭店潮，自助烤肉的低价神话失灵了？','赢商网观察自助烤肉从排队到闭店的变化。餐饮业态不能只靠低价，需要回归产品、选址和门店模型。',take['商业地产'],'自助烤肉、闭店、餐饮','https://news.winshang.com/html/074/1699.html',''],
  ['商业地产','赢商网','上市餐企，打响新一轮“降价潮”？','报道讨论上市餐企的降价动作。价格策略必须和成本、产品结构及复购机制协同判断。',take['商业地产'],'餐企、降价、经营','https://news.winshang.com/html/074/1697.html',''],
  ['商业地产','赢商网','那些在一线活不下去的生意，为何在小城成了王者？','赢商网比较一线与小城的生意逻辑。下沉市场不是复制一线打法，而是要匹配成本、客群与供给。',take['商业地产'],'下沉市场、小城、商业','https://news.winshang.com/html/074/1695.html',''],
  ['商业地产','赢商网','印力如何让一个商业IP持续生长','印力分享商业 IP 的长期运营经验。项目 IP 需通过内容、活动和会员机制持续积累，而非一次性造节。',take['商业地产'],'印力、商业IP、运营','https://news.winshang.com/html/074/1691.html',''],
  ['商业地产','赢商网','苏州汇融双湖广场十周年焕新，盒马鲜生入驻','苏州项目以十周年焕新叠加盒马鲜生入驻。存量商业更新要将主力店、空间和传播节奏放在一套方案中。',take['商业地产'],'苏州、焕新、盒马','https://news.winshang.com/html/074/1690.html',''],
  ['商业地产','赢商网','首店130+家，长沙商业要“换挡提速”？','赢商网梳理长沙首店和客流表现。城市商业升级需要看首店质量、项目承接与持续经营。',take['商业地产'],'长沙、首店、客流','https://news.winshang.com/html/074/1693.html',''],
  ['商业地产','赢商网','39家新Mall年内开业，江苏商业大爆发！','赢商网盘点江苏年内新 Mall 供给。新增项目需提前判断商圈竞合、招商节奏与经营差异。',take['商业地产'],'江苏、新Mall、商业供给','https://news.winshang.com/html/074/1692.html',''],
  ['招商与首店','联商网','华中首家MINISOSPACE落子郑州大卫城','名创优品 MINISOSPACE 落地郑州大卫城。首店价值要看产品体验、商场落位和传播承接。',take['招商与首店'],'MINISOSPACE、郑州、首店','http://www.linkshop.com/news/2026551198.shtml',''],
  ['招商与首店','联商网','华北首个华润万象天地开建，商业体量44万㎡','华北首个华润万象天地启动建设。大型项目需在开业前完成城市定位、品牌储备与客群策略。',take['招商与首店'],'华润万象天地、华北、项目','http://www.linkshop.com/news/2026551195.shtml',''],
  ['零售与餐饮','联商网','奶源大战：伊利筑垒，蒙牛奇袭','联商网关注乳业供应与竞争布局。快消品牌的护城河仍来自供应链、产品差异与渠道效率。',take['零售与餐饮'],'伊利、蒙牛、供应链','http://www.linkshop.com/news/2026551202.shtml',''],
  ['零售与餐饮','联商网','始祖鸟母公司上半年营收增长32%，大中华区最大','联商网报道始祖鸟母公司业绩与大中华区表现。运动户外品牌增长需同时关注产品、渠道和区域需求。',take['零售与餐饮'],'始祖鸟、户外、业绩','http://www.linkshop.com/news/2026551199.shtml',''],
  ['零售与餐饮','联商网','好想来又被曝出“鬼称”事件','联商网报道零食连锁的称重争议。高频零售的信任来自价格透明、服务标准和问题响应。',take['零售与餐饮'],'好想来、零食、消费信任','http://www.linkshop.com/news/2026551196.shtml',''],
  ['零售与餐饮','联商网','降价的遇见小面，距离平价有多远？','联商网讨论遇见小面的价格调整。餐饮降价要同时看客单、产品结构和单店效率。',take['零售与餐饮'],'遇见小面、降价、餐饮','http://www.linkshop.com/news/2026551194.shtml',''],
  ['零售与餐饮','联商网','遇见小面真的贵吗？','联商网从消费者视角讨论餐饮定价。价格沟通需匹配产品感知、场景与服务体验。',take['零售与餐饮'],'餐饮定价、客单、体验','http://www.linkshop.com/news/2026551193.shtml',''],
  ['品牌与设计','SocialBeta','MO&Co. 官宣宋雨琦成为亚太区活力代言人','MO&Co. 以代言人强化亚太区品牌表达。服饰品牌视觉合作要能延展至门店、产品和社媒内容。',take['品牌与设计'],'MO&Co.、代言、服饰','https://socialbeta.com/campaign/28279',''],
  ['品牌与设计','SocialBeta','关于 alo 下一步往哪走的观察','SocialBeta 观察 alo 在亚洲市场的品牌推进。新兴运动品牌进入新市场，需让代言、门店、社群和商品策略联动。',take['品牌与设计'],'alo、运动品牌、亚洲','https://socialbeta.com/article/111307',''],
  ['政策与趋势','联商网','物美携重百、新百、麦德龙助员工子女圆大学梦','物美等零售企业开展员工关怀项目。雇主品牌和一线组织稳定性也是零售长期运营的基础。',take['政策与趋势'],'物美、员工关怀、零售组织','http://www.linkshop.com/news/2026551201.shtml',''],
  ['政策与趋势','联商网','太古增长、恒隆转型，港资商业的两份财报背后逻辑','联商网对比太古与恒隆的业绩和转型方向。商业地产经营需用资产质量、客群与运营能力共同解读财报。',take['政策与趋势'],'太古、恒隆、商业地产','http://www.linkshop.com/news/2026551192.shtml',''],
  ['政策与趋势','SocialBeta','「饭张力」拉满的工作，想去想去！','SocialBeta 关注以餐饮内容建立雇主吸引力的案例。企业传播若能连接真实工作体验，更容易获得年轻人共鸣。',take['政策与趋势'],'雇主品牌、餐饮内容、年轻人','https://socialbeta.com/article/111309','']
];

const categories = ['推广与会员', '商业地产', '招商与首店', '零售与餐饮', '品牌与设计', '政策与趋势'];
const groups = categories.map(category => [category, rows.filter(row => row[0] === category).map(row => [Y].concat(row.slice(1)))]);

let html = fs.readFileSync('2026-08-20.html', 'utf8')
  .split('2026.08.20').join('2026.08.21')
  .split('2026-08-20').join(D)
  .split('08.19').join(Y);
html = html
  .replace(/<section class="hero">[\s\S]*?<\/section>/, '<section class="hero"><p>严格昨日版 · 仅收录 08.20 发布、可公开核验的独立报道</p><strong>项目供给、餐饮价格与零售信任共同进入调整期；品牌营销则继续借助代言、IP和节日互动连接用户。实际收录 30 条。</strong></section>')
  .replace(/<section class="observe">[\s\S]*?<\/section>/, '<section class="observe"><h2>今日观察</h2><ol><li><b>商业项目正在重新校准供给。</b>社区 Mall、高端超市与新增项目都需要在客群、业态与运营效率之间重做平衡。</li><li><b>餐饮降价不是单点答案。</b>自助烤肉与面馆案例说明，产品结构、成本和复购才决定价格策略能否成立。</li><li><b>品牌互动仍要回到真实触点。</b>代言、IP与节日内容只有连接门店、商品或用户参与，才会转化为长期资产。</li></ol></section>')
  .replace(/<a class="portal" href="\.\/" target="_top"><b>\d+<\/b><span>昨日发生<\/span><\/a>/, '<a class="portal" href="./" target="_top"><b>30</b><span>昨日发生</span></a>')
  .replace(/本版只发布可公开核验的 \d+ 条独立内容。/, '本版只发布可公开核验的 30 条独立内容。')
  .replace(/const groups=\[[\s\S]*?\];\nconst categoryPreview=/, `const groups=${JSON.stringify(groups)};\nconst categoryPreview=`);
fs.writeFileSync(`${D}.html`, html);
fs.writeFileSync('index.html', html);

const markdown = groups.map(([category, items]) => `## ${category}\n\n${items.length ? items.map((item, index) => `### ${index + 1}. ${item[2]}\n- **发布时间**：2026-08-20｜**来源**：[${item[1]}](${item[6]})\n- ${item[3]}\n- **可借鉴点**：${item[4]}`).join('\n\n') : '当天无符合本栏目范围、可公开核验的独立报道。'}`).join('\n\n');
fs.writeFileSync(`${D}.md`, `# 陈瑶的商业晨报｜${D}\n\n> 严格昨日版：仅收录 2026 年 8 月 20 日可公开核验的独立报道，共 ${rows.length} 条。\n\n## 今日观察\n\n1. 商业项目、超市和新增供给都在重新校准客群、业态与运营效率。\n2. 餐饮降价背后仍是产品结构、成本和复购的经营问题。\n3. 代言、IP与节日互动需要连接门店、商品或真实参与，才会留下长期价值。\n\n${markdown}\n`);

const state = JSON.parse(fs.readFileSync('kb-scan-state.json', 'utf8'));
state.last_successful_run = '2026-08-21T08:00:00+08:00';
state.last_scan_window = { start: '2026-08-20T00:00:00+08:00', end: '2026-08-21T00:00:00+08:00' };
state.published_yesterday = [];
state.records = state.records || [];
state.notes = '8月21日增量扫描：未发现8月20日新增或修改且可公开发布的行业资料；无知识库条目进入昨日或长期档案。';
fs.writeFileSync('kb-scan-state.json', `${JSON.stringify(state, null, 2)}\n`);

console.log(JSON.stringify({ published: rows.length, groups: groups.map(([category, items]) => [category, items.length]), kbMatches: 0, huaianLatest: 0, designNew: 0 }));
