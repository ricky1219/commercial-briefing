import fs from 'node:fs';

const date = '2026-08-04';
const yesterday = '08.03';
const sb = 'https://socialbeta.oss-cn-hangzhou.aliyuncs.com/upload/';
const items = [
  ['推广与会员','SocialBeta','章若楠成为百丽品牌代言人','百丽官宣章若楠成为品牌代言人，以“松弛格调、自在漫步”沟通服饰与日常出行场景。','代言传播应同步落到门店陈列、试穿体验与会员触点，避免只停在官宣。','品牌代言、服饰、门店体验','https://socialbeta.com/campaign/28088',sb+'198246-1785727764.jpg?x-oss-process=image/resize,m_fill,w_675,h_450,limit_0/auto-orient,1/format,jpg'],
  ['推广与会员','SocialBeta','几素 × 星星人官宣夏日「星」朋友','几素与星星人发布夏日联名，以“凉风有星”的轻量主题连接产品体验与 IP 内容。','联名项目应明确单一场景主题，并提前配置打卡、商品和社媒二次传播。','IP联名、夏日营销、跨界','https://socialbeta.com/campaign/28018',sb+'224736-1785737350.jpg?x-oss-process=image/resize,m_fill,w_675,h_450,limit_0/auto-orient,1/format,jpg'],
  ['推广与会员','SocialBeta','Mikimoto 高珠亚洲首展落地北京','Mikimoto 在北京举办高珠亚洲首展，以“光启万象”呈现高珠产品与展览级体验。','高端品牌线下展陈可用稀缺展品、预约机制和仪式感动线提升到店理由。','高珠、首展、线下体验','https://socialbeta.com/campaign/28085',sb+'198246-1785673741.jpg?x-oss-process=image/resize,m_fill,w_675,h_450,limit_0/auto-orient,1/format,jpg'],
  ['推广与会员','SocialBeta','易立竞和美团会员对上话了？','美团会员邀请易立竞参与内容沟通，用“山有山的尺度，人有人的答案”表达会员服务的多样选择。','会员传播应从抽象权益转为不同生活场景下可被理解的具体选择。','会员运营、内容传播、生活场景','https://socialbeta.com/campaign/28087',sb+'198246-1785677209.jpg?x-oss-process=image/resize,m_fill,w_675,h_450,limit_0/auto-orient,1/format,jpg'],
  ['推广与会员','SocialBeta','观夏联手滴滴豪华车推出「移动的避世酒店」','观夏与滴滴豪华车合作，将乘车过程包装为“移动的避世酒店”，把香氛体验延伸至出行空间。','跨界合作优先选择能自然承载产品体验的场景，而不是仅交换曝光。','香氛、出行、场景营销','https://socialbeta.com/campaign/28077',sb+'224935-1785396918.png?x-oss-process=image/resize,m_fill,w_675,h_450,limit_0/auto-orient,1/format,jpg'],
  ['推广与会员','SocialBeta','来北外滩赶赴 SK-II × CRYBABY 的「心动赴约」','SK-II 与 CRYBABY 在上海北外滩发起七夕主题活动，用联名 IP 承接线下见面与情绪表达。','节日 IP 活动要把主题、到店动线、限定内容和后续留资设计为一体。','七夕、IP联名、北外滩','https://socialbeta.com/campaign/28064',sb+'224935-1785295852.jpg?x-oss-process=image/resize,m_fill,w_675,h_450,limit_0/auto-orient,1/format,jpg'],
  ['商业地产','赢商网','恒隆，喜大于优','赢商网复盘恒隆商业的阶段性表现，并指出其后续经营仍面临持续兑现的考验。','看商管经营不能只看阶段性亮点，应持续追踪客流、销售、品牌结构和资产运营的联动。','恒隆、商管、业绩','https://news.winshang.com/html/074/1429.html','https://img1.winshang.com/newsimg/wsimg/2026/8/20260803101059615_9c1370717f4b4be88178e60267e34bba.jpg'],
  ['商业地产','赢商网','赢商周报：第二座德基广场要来了；北京朝阳合生汇上半年销售额45亿','周报汇集徐州德基广场、龙湖昆明时代天街、兴业太古汇等项目的开业与经营动态。','项目追踪应建立“开业节点—品牌结构—经营数据—后续活动”的连续台账。','商业项目、开业、经营数据','https://news.winshang.com/html/074/1433.html','https://img1.winshang.com/newsimg/wsimg/2026/8/20260803104713411_a56cb49f95cf4a6c93ef02e1c610c9ff.jpg'],
  ['商业地产','赢商网','郑志刚“独立创业”新进展：K11 by AC 湾区首站为何是南沙？','K11 by AC 在南沙推进湾区首站，报道关注“文化+商业”基因在新项目中的落地方式。','新项目定位需先明确城市角色与文化内容，再反推招商、空间与运营模型。','K11、南沙、文化商业','https://news.winshang.com/html/074/1434.html','https://img1.winshang.com/newsimg/wsimg/2026/8/20260803114833562_708b83374c2f4baa975ee5b840edb743.jpg'],
  ['商业地产','赢商网','方圆荟·中京广场 8.1 森活启幕','方圆荟·中京广场以城市公园式商业亮相贵阳城北，围绕“森活”提出生活方式商业定位。','社区与区域商业的开业表达应兼顾自然场景、日常服务和可持续运营内容。','方圆荟、开业、公园商业','https://news.winshang.com/html/074/1435.html','https://img1.winshang.com/newsimg/wsimg/2026/8/20260803121327169_d82ade19ddf047b198a55190cb5f221a.jpg'],
  ['商业地产','赢商网','天津和平印象城“集美in巷”女性主题街区开街','天津和平印象城推出女性主题街区，以细分客群切入存量商业的业态升级和空间焕新。','存量更新宜先锁定高价值客群与其使用时段，再组织品牌、空间和活动。','印象城、女性街区、存量更新','https://news.winshang.com/html/074/1436.html','https://img1.winshang.com/newsimg/wsimg/2026/8/20260803175806440_02d677722e1545eebe086a944247f659.jpg'],
  ['商业地产','赢商网','赢商通线下沙龙走进嘉年华·海信广场 VILLAGE','赢商通走访青岛嘉年华·海信广场 VILLAGE，讨论滨海文商旅项目“场景+内容+运营”的一体化。','文商旅项目要把景观资源转成可持续内容与消费动线，而不止一次性打卡。','青岛、文商旅、奥莱','https://news.winshang.com/html/074/1437.html','https://img1.winshang.com/newsimg/wsimg/2026/8/20260803203013386_979d096813264eb9879b0f774721d487.jpg'],
  ['招商与首店','赢商网','上海上半年开了216家品质首店，餐饮竟超一半？','赢商网统计显示，2026 年上半年上海引入约 216 家品质首店，餐饮零售主导，非标店型与新项目集聚特征明显。','招商看首店数量之外，还应拆分餐饮占比、店型创新与项目承接能力。','上海首店、餐饮、招商','https://news.winshang.com/html/074/1432.html','https://img1.winshang.com/newsimg/wsimg/2026/8/20260803104019549_8ebacb67b57f4d40b90f454cc202685f.jpg'],
  ['零售与餐饮','赢商网','曾经排队3小时，如今彻底消失！杭州网红店的保质期越来越短了','报道以杭州网红餐饮为例，讨论消费者对热点品牌的“祛魅”加快及经营持续性挑战。','热点门店要尽早把流量转为产品复购、服务口碑和会员关系，避免只靠排队。','杭州、网红餐饮、复购','https://news.winshang.com/html/074/1431.html','https://img1.winshang.com/newsimg/wsimg/2026/8/20260803102055250_40dc3130c24f4720ad3278066d0ed012.jpg'],
  ['零售与餐饮','联商网','餐饮巨头扎堆“重做”外卖，又一新模式？','联商网关注餐饮企业重做外卖的趋势，讨论外卖业务寻找新增量时的模式变化。','门店外卖经营需与堂食产能、商品结构、履约和评价管理一起优化。','餐饮、外卖、履约','http://www.linkshop.com/news/2026550486.shtml','http://www.linkshop.com/atlas/sltuthumbnail/20240830133452300061_thumb.jpg'],
  ['零售与餐饮','联商网','代购费比面包贵，谁带火了这家“盐面包”专门店？','联商网关注盐面包专门店走红，呈现烘焙细分品类对客流和溢价的带动。','细分品类店应同时验证产品差异、出品稳定和排队体验，避免被单一热点透支。','烘焙、盐面包、品类创新','http://www.linkshop.com/news/2026550487.shtml','http://www.linkshop.com/upload/article/caiji/1eNUDzFA3iaEbia6kJWwELSyRyeq1Akz1s2zDaLlH08U1q7ft2odW9LMucSmxV3ibkHttfNO9mvPiaL9DeyJsU8oUTgOgYic9BuWjerasbMANPqg.png'],
  ['零售与餐饮','联商网','排队3小时、月销百万杯！茶饮市场又出爆款','联商网报道茶饮市场的新爆款现象，聚焦排队与高销量背后的市场热度。','爆品承接要在高峰前同步做好排队、产能、库存与会员留存，不只放大传播。','茶饮、爆款、排队管理','http://www.linkshop.com/news/2026550488.shtml','http://www.linkshop.com/upload/article/caiji/sz_YZl5gJjkn6Z9iclQEMIaoHfpLCtQIcSsRpMunZy5DQhKrlhsKXEBgK9LFxNAdBAZpRI5DXPTAGOEhcPsd3Bt1ic54ziaqtDoSg0q3rNdYz9ibys.jpg'],
  ['零售与餐饮','联商网','京东外卖推出 AI 智能头盔，首批免费配发全职骑手','京东外卖推出 AI 智能头盔并向首批全职骑手免费配发，延伸骑手安全与服务保障链路。','即时零售体验不仅看前端促销，也应关注履约人员、装备与服务稳定性。','京东外卖、即时零售、骑手服务','http://www.linkshop.com/news/2026550490.shtml','http://www.linkshop.com/upload/article/2026/20260803102909_9921.gif'],
  ['零售与餐饮','SocialBeta','顺丰：你永远不知道谁会旺自己！','顺丰围绕“谁会旺自己”的轻量内容，借助粉丝话题沟通服务品牌的年轻化表达。','服务品牌可以用有参与感的内容降低理解门槛，但要回到真实服务体验。','顺丰、服务品牌、粉丝营销','https://socialbeta.com/campaign/28078',sb+'24325-1785479449.jpg?x-oss-process=image/resize,m_fill,w_675,h_450,limit_0/auto-orient,1/format,jpg'],
  ['品牌与设计','SocialBeta','ESG 时代，特仑苏交出一份「答卷」','SocialBeta 以特仑苏白皮书为例，讨论品牌如何将长期主义与 ESG 叙事沉淀为可沟通内容。','企业议题传播要有长期事实和具体行动支撑，避免口号式表达。','特仑苏、ESG、品牌叙事','https://socialbeta.com/article/111268',sb+'198728-1785751211.jpg?x-oss-process=image/resize,m_fill,w_675,h_450,limit_0/auto-orient,1/format,jpg'],
  ['品牌与设计','SocialBeta','李思潼成为雅诗兰黛彩妆挚友','雅诗兰黛彩妆官宣李思潼成为挚友，以“粉，自有万般可能”展开彩妆表达。','彩妆与时尚合作需同步设计线下试用、柜台陈列和社媒内容的转化路径。','雅诗兰黛、彩妆、品牌合作','https://socialbeta.com/campaign/28084',sb+'198246-1785671881.jpg?x-oss-process=image/resize,m_fill,w_675,h_450,limit_0/auto-orient,1/format,jpg'],
  ['品牌与设计','SocialBeta','Kate Spade 官宣 Tyla 为全球品牌代言人','Kate Spade 宣布 Tyla 为全球品牌代言人，以音乐与时尚的结合扩展品牌表达。','全球代言落地本地市场时，要让内容资产、店铺视觉和新品陈列形成同一语境。','Kate Spade、代言人、时尚','https://socialbeta.com/campaign/28100',sb+'38450-1785741940.jpg?x-oss-process=image/resize,m_fill,w_675,h_450,limit_0/auto-orient,1/format,jpg'],
  ['品牌与设计','SocialBeta','高圆圆成为青蛙王子儿童护肤代言人','青蛙王子邀请高圆圆担任儿童护肤代言人，围绕陪伴与成长沟通品牌价值。','亲子品牌可把情感表达转化为门店试用、家庭互动与会员服务的具体体验。','儿童护肤、代言、亲子','https://socialbeta.com/campaign/28093',sb+'38450-1785732335.jpg?x-oss-process=image/resize,m_fill,w_675,h_450,limit_0/auto-orient,1/format,jpg'],
  ['品牌与设计','SocialBeta','潘海利根「兽首家族」首次在上海集结','潘海利根将“兽首家族”首次集结于上海，以角色世界观营造香氛线下体验。','角色化资产适合延展为主题陈列、打卡动线与限定商品，增强店内停留。','潘海利根、香氛、角色IP','https://socialbeta.com/campaign/28089',sb+'38450-1785730061.jpg?x-oss-process=image/resize,m_fill,w_675,h_450,limit_0/auto-orient,1/format,jpg'],
  ['品牌与设计','SocialBeta','可画全力支持拽姐「C 位出道」！','可画以“C位出道”主题支持创作内容，强调工具品牌与用户表达的联结。','工具类品牌的线下沟通可围绕用户作品、共创展示和即时参与建立场景。','可画、创意工具、共创','https://socialbeta.com/campaign/28075',sb+'224935-1785392082.png?x-oss-process=image/resize,m_fill,w_675,h_450,limit_0/auto-orient,1/format,jpg'],
  ['品牌与设计','SocialBeta','投票结果｜SocialBeta 案例一周上期回顾','SocialBeta 汇总 8 月 1 日至 3 日的案例投票结果，记录阶段性受关注的品牌营销内容。','案例库复盘可用用户反馈筛选高共鸣主题，再拆解为适配自身的执行动作。','案例复盘、品牌营销、趋势','https://socialbeta.com/article/111266',sb+'44754-1785731201.jpg?x-oss-process=image/resize,m_fill,w_675,h_450,limit_0/auto-orient,1/format,jpg'],
  ['品牌与设计','SocialBeta','地球上超酷的广告公司，正在用创意让世界更好一点点','SocialBeta 介绍一家广告公司的可持续创意实践，关注创意表达与社会议题之间的连接。','公共议题表达应先有真实行动，再以可被理解的创意语言降低沟通距离。','广告创意、可持续、品牌表达','https://socialbeta.com/article/111264',sb+'20444-1785496974.jpg?x-oss-process=image/resize,m_fill,w_675,h_450,limit_0/auto-orient,1/format,jpg'],
  ['政策与趋势','赢商网','这50个品牌“很上头”：有的三个月开80+店、有的融资近亿元','赢商网发布 2026Q2 热搜品牌 TOP50，呈现消费品牌在扩店、融资与品类分化中的新动向。','品牌招商要同步看开店速度、融资质量、单店模型和区域密度，不能只追热度。','热搜品牌、开店、融资','https://news.winshang.com/html/074/1430.html','https://img1.winshang.com/newsimg/wsimg/2026/8/20260803101543865_5da7d7b220784de29f780d2dd8e29919.jpg'],
  ['政策与趋势','联商网','新茶饮是个筐，啥都往里装？','联商网从新茶饮扩张的品类边界切入，提醒加盟与经营模式变化带来的风险。','引入跨品类茶饮品牌时，应把加盟能力、供应链与门店模型纳入招商核验。','新茶饮、加盟、品类趋势','http://www.linkshop.com/news/2026550483.shtml','http://www.linkshop.com/upload/article/2026/20260703224117_1841.jpg'],
  ['政策与趋势','联商网','买下 Mammut 猛犸象，CPE 源峰寻找下一个“始祖鸟”','CPE 源峰收购 Mammut 猛犸象，报道聚焦消费品牌并购与高价值户外赛道的机会。','户外品牌研判应同时看资本动作、产品定位、渠道扩张与本地客群匹配。','Mammut、户外、并购','http://www.linkshop.com/news/2026550485.shtml','http://www.linkshop.com/upload/article/2026/20260114093012_9974_lssize.jpg']
];

const categories = ['推广与会员','商业地产','招商与首店','零售与餐饮','品牌与设计','政策与趋势'];
const grouped = categories.map(category => [category, items.filter(x => x[0] === category).map(x => [yesterday, ...x.slice(1)])]);
const groupsJs = `const groups=${JSON.stringify(grouped)};`;
let html = fs.readFileSync('2026-08-02.html', 'utf8')
  .split('2026.08.02').join('2026.08.04')
  .split('2026-08-02').join(date)
  .split('08.01').join(yesterday)
  .replace('严格昨日版 · 全部为 08.03 发布的独立报道或案例 · 知识库昨日命中：0', '严格昨日版 · 全部为 08.03 发布的独立报道或案例 · 知识库昨日命中：0')
  .replace('严格昨日版 · 全部为 08.01 发布的独立报道或案例 · 知识库昨日命中：0', '严格昨日版 · 全部为 08.03 发布的独立报道或案例 · 知识库昨日命中：0')
  .replace(/严格按 08\.0[13] 日期边界筛选后，仅有 7 条可公开核验内容；未以旧闻或软文补足。/, '8 月 3 日消费品牌、首店与线下体验信息集中更新；今天整理 30 条可公开核验内容。')
  .replace('<a class="portal" href="./" target="_top"><b>7</b><span>昨日发生</span></a>', '<a class="portal" href="./" target="_top"><b>30</b><span>昨日发生</span></a>')
  .replace(/<section class="observe">[\s\S]*?<\/section>/, '<section class="observe"><h2>今日观察</h2><ol><li><b>首店与高能级项目仍在强化城市商业的聚集效应。</b>上海首店、南沙 K11 by AC 和多地项目更新显示，项目定位与招商节奏需同步推进。</li><li><b>品牌线下传播正从单次官宣走向“场景化体验”。</b>香氛、珠宝、IP与出行的合作都在寻找可被顾客实际感知的体验容器。</li><li><b>餐饮热点的经营重心应回到稳定履约。</b>排队、爆款和品类热度之后，更要检验产能、服务、复购和会员沉淀。</li></ol></section>')
  .replace(/const groups=\[[\s\S]*?\];\nconst categoryPreview=/, `${groupsJs}\nconst categoryPreview=`)
  .replace(/const previewFor=\(item,category\)=>\{const original=.*?\};let active=/, 'const previewFor=(item,category)=>{const original=item[7]||window.articleCovers&&window.articleCovers[item[6]];const src=original||categoryPreview[category]||categoryPreview["商业地产"];const label=original?"原文图片":"晨报配图";return \'<div class="card-preview" data-fallback="\'+(original?"false":"true")+\'"><img loading="lazy" decoding="async" fetchpriority="low" referrerpolicy="no-referrer" alt="\'+label+\'" src="\'+src+\'"><span>\'+label+\'</span></div>\'};let active=');

fs.writeFileSync(`${date}.html`, html);
fs.writeFileSync('index.html', html);
const sections = grouped.map(([category, rows]) => `## ${category}\n\n${rows.map((x, i) => `### ${i + 1}. ${x[2]}\n- **发布时间**：2026-08-03｜**来源**：[${x[1]}](${x[6]})｜**关键词**：${x[5]}\n- ${x[3]}\n- **可借鉴点**：${x[4]}`).join('\n\n')}`).join('\n\n');
fs.writeFileSync(`${date}.md`, `---\ndate: ${date}\nrange: 2026-08-03\nitem_count: ${items.length}\nsources: 赢商网 9 条；联商网 6 条；SocialBeta 15 条；知识库昨日命中 0 条\n---\n\n# 陈瑶的商业晨报｜${date}\n\n> 严格昨日版：仅收录 8 月 3 日发布、可公开核验的独立报道或案例。\n\n${sections}\n\n## 今日观察\n\n1. 首店与项目更新要以定位、招商和运营的同一张节奏表推进。\n2. 品牌合作正在更多地把产品体验放进真实线下场景。\n3. 餐饮热点能否沉淀为复购，取决于履约与服务是否跟上。\n`);
console.log(`Built ${date}: ${items.length} verified yesterday items`);
