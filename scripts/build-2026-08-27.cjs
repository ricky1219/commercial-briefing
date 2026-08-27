const fs = require('fs');

const D = '2026-08-27';
const Y = '08.26';
const rows = [
  ['推广与会员','SocialBeta','宝马问「牛」究竟来不来？','宝马借暑期档热梗拍摄“车让牛”短片，把车辆平顺制动的技术卖点转译为乘客安稳休息的生活化画面。','借势内容必须有产品功能承接点，才能把热梗转化为清晰记忆。','宝马、借势营销、汽车','https://socialbeta.com/campaign/28353',''],
  ['推广与会员','SocialBeta','豆包工作搭子正式上线！','豆包工作发布独立品牌与 Agent 产品，主打任务拆解、工具调用及飞书协同，把能力表达放到具体工作流里。','复杂产品发布应先选可感知的任务场景，再说明能力边界与使用路径。','豆包、AI、工作流','https://socialbeta.com/campaign/28361',''],
  ['推广与会员','SocialBeta','宝马用「象棋」演绎无感刹停','宝马以街头象棋语言呈现“刹车不宜点头”，继续用地域化生活场景演绎车辆稳定制动体验。','同一卖点可用不同城市语境持续表达，避免一次传播后快速失效。','宝马、区域营销、广告片','https://socialbeta.com/campaign/28335',''],
  ['推广与会员','SocialBeta','认养一头牛发起「十年播种」企划','认养一头牛围绕品牌十周年发起“十年播种”企划，以长期时间线组织品牌周年与产品沟通。','周年传播宜把品牌历史拆成可参与的节点，而不是单次庆典口号。','认养一头牛、品牌周年、广告片','https://socialbeta.com/campaign/28345',''],
  ['推广与会员','SocialBeta','欧舒丹让诗歌住进大山里','欧舒丹围绕教师节与公益主题发起传播，用“用手说爱、触手成诗”连接山区儿童与品牌价值。','公益内容要明确受益场景与参与方式，避免停留在抽象价值宣示。','欧舒丹、公益营销、教师节','https://socialbeta.com/campaign/28351',''],
  ['推广与会员','SocialBeta','小红书 2026 商业合作伙伴大会景德镇举办','小红书以商业合作伙伴大会讨论行业化经营与复利增长，将平台商业叙事放在品牌经营议题中。','行业大会传播可沉淀为商家方法论与案例资产，延长活动信息生命周期。','小红书、商业大会、活动','https://socialbeta.com/campaign/28339',''],
  ['推广与会员','SocialBeta','京东买药又想出新招劝人减重了？','京东买药把“超重”视觉化为被撑住的广告牌，用线下装置放大健康管理的传播话题。','线下装置要把视觉冲击与扫码、咨询或服务入口放在同一动线上。','京东买药、线下装置、健康','https://socialbeta.com/campaign/28349',''],
  ['推广与会员','SocialBeta','AAAD 启动「羊毛回收计划」','an action a day 启动羊毛回收计划，将社群参与、环保议题与衣物循环利用结合为长期行动。','可持续项目应设置明确回收动作与反馈机制，才能持续激发社群参与。','AAAD、社群营销、ESG','https://socialbeta.com/campaign/28340',''],
  ['商业地产','红餐网','抖音生活服务发布暑期消费数据：地方菜领跑味蕾游，夜经济点亮暑期档','抖音生活服务称暑期综合商场团购销售额同比增长131%，并指出室内沉浸式体验与夜间餐饮成为增长场景。','商业体可把避暑、夜食与内容团购结合，按时段设计可核销的消费套餐。','抖音生活服务、商场、夜经济','https://m.canyin88.com/zixun/2026/08/26/113117.html',''],
  ['商业地产','北京经开区商务金融局','开展商业综合体促消费奖励申报','北京经开区发布商业综合体促消费奖励申报通知，明确企业可在规定窗口申请相关政策支持。','项目团队应建立活动、客流与核销资料台账，提升政策申报与复盘效率。','商业综合体、促消费、政策','https://kfqgw.beijing.gov.cn/zwgkkfq/2024zcwj/202608/t20260826_4837964.html',''],
  ['招商与首店','SocialBeta','BROOKS 布鲁克斯西南首店落地成都太古里','BROOKS 将西南首店落地成都太古里，并以跑步社群与线下活动配合“成都，跑起”的首店沟通。','首店开业应提前组织城市圈层活动，让招商落位同步转为首批客群沉淀。','BROOKS、成都太古里、首店','https://socialbeta.com/campaign/28338',''],
  ['招商与首店','SocialBeta','PUMA 携手 A$AP Rocky 再续赛车基因','PUMA 从 2005 年赛车鞋档案出发，与 A$AP Rocky 推出 Straycat 联名鞋款，延续赛车产品线叙事。','联名新品宜从品牌已有资产中提炼主题，减少只靠明星声量的短期依赖。','PUMA、联名鞋、赛车','https://socialbeta.com/campaign/28356',''],
  ['零售与餐饮','SocialBeta','优衣库为旧衣物找到妥善去处','优衣库以旧衣回收为核心沟通 ESG 行动，把消费者衣物处置问题连接到品牌的循环利用主张。','回收类营销要说明投放、回收和去向全流程，才能降低消费者参与门槛。','优衣库、旧衣回收、ESG','https://socialbeta.com/campaign/28350',''],
  ['零售与餐饮','SocialBeta','科颜氏和宠物一起实现「贴贴」自由','科颜氏围绕宠物经济与亚宠展场景推出互动内容，将护肤沟通嵌入人与宠物陪伴的日常话题。','跨圈层活动要先定义目标人群的共同场景，再安排产品体验触点。','科颜氏、宠物经济、亚宠展','https://socialbeta.com/campaign/28274',''],
  ['零售与餐饮','SocialBeta','INTO YOU 推出史上最「田」联名？','INTO YOU 以土豆、番茄为灵感推出联名，用食物意象制造彩妆新品的反差感与社交讨论。','反差联名要让色彩、包装和试用体验形成同一主题，强化到店记忆。','INTO YOU、彩妆、IP联名','https://socialbeta.com/campaign/28334',''],
  ['品牌与设计','SocialBeta','爱马仕用纸箱搭建秋季主题橱窗','爱马仕以纸箱搭建秋季主题橱窗，用漂泊、回望与远行的叙事组织品牌的线下视觉体验。','橱窗设计应留下可被转拍的单一叙事焦点，提升自然社交传播效率。','爱马仕、橱窗、艺术营销','https://socialbeta.com/campaign/28357',''],
  ['品牌与设计','SocialBeta','周杰伦与樊振东对打，RIMOWA 的广告到底要多强？','RIMOWA 以周杰伦与樊振东对打的广告内容强化品牌故事表达，将行李箱置入人物与运动叙事。','人物合作不必直述卖点，可通过有戏剧性的使用情境建立品牌联想。','RIMOWA、明星营销、广告片','https://socialbeta.com/article/111318',''],
  ['品牌与设计','SocialBeta','宋威龙成为 GANT 全球品牌代言人','GANT 官宣宋威龙为全球品牌代言人，以“以传承为始，向新而行”连接品牌历史与当代服饰表达。','代言官宣后应迅速落地门店陈列、试穿活动与会员内容，承接关注度。','GANT、代言人、服饰','https://socialbeta.com/campaign/28358',''],
];

if (new Set(rows.map((row) => row[4])).size !== rows.length) throw new Error('“可借鉴”唯一性校验失败');
const categories = ['推广与会员', '商业地产', '招商与首店', '零售与餐饮', '品牌与设计', '政策与趋势'];
const groups = categories.map((category) => [category, rows.filter((row) => row[0] === category).map((row) => [Y].concat(row.slice(1)))]);

let html = fs.readFileSync('2026-08-26.html', 'utf8')
  .split('2026.08.26').join('2026.08.27')
  .split('2026-08-26').join(D)
  .split('08.25').join(Y);
html = html
  .replace(/<section class="hero">[\s\S]*?<\/section>/, `<section class="hero"><p>严格昨日版 · 仅收录 08.26 发布、可公开核验的独立报道</p><strong>品牌把产品卖点转为线下体验，正成为消费沟通的共同选择；本日共发布 ${rows.length} 条，不以旧闻凑数。</strong></section>`)
  .replace(/<section class="observe">[\s\S]*?<\/section>/, '<section class="observe"><h2>今日观察</h2><ol><li><b>实体触点仍是品牌沟通的关键接口。</b>首店、橱窗和装置都需要配合可参与动作，而不仅是视觉展示。</li><li><b>场景比泛流量更可转化。</b>夜经济、宠物陪伴和回收行为都以明确的使用情境组织商品与服务。</li><li><b>长期资产正在替代一次性话题。</b>品牌档案、周年叙事和循环计划，能为多轮沟通保留统一母题。</li></ol></section>')
  .replace(/<a class="portal" href="\.\/" target="_top"><b>\d+<\/b><span>昨日发生<\/span><\/a>/, `<a class="portal" href="./" target="_top"><b>${rows.length}</b><span>昨日发生</span></a>`)
  .replace(/本版只发布可公开核验的 \d+ 条独立内容。/, `本版只发布可公开核验的 ${rows.length} 条独立内容。`)
  .replace(/const groups=\[[\s\S]*?\];\nconst categoryPreview=/, `const groups=${JSON.stringify(groups)};\nconst categoryPreview=`);
fs.writeFileSync(`${D}.html`, html);
fs.writeFileSync('index.html', html);

const markdown = groups.map(([category, items]) => `## ${category}\n\n${items.map((item, index) => `### ${index + 1}. ${item[2]}\n- **发布时间**：2026-08-26｜**来源**：[${item[1]}](${item[6]})\n- ${item[3]}\n- **可借鉴点**：${item[4]}\n- **关键词**：${item[5]}`).join('\n\n')}`).join('\n\n');
fs.writeFileSync(`${D}.md`, `# 陈瑶的商业晨报｜${D}\n\n> 严格昨日版：仅收录 2026 年 8 月 26 日可公开核验的独立报道，共 ${rows.length} 条。\n\n## 今日观察\n\n1. 品牌正把内容回接到首店、橱窗与装置等实体触点。\n2. 消费场景要绑定具体动作与服务入口，才能形成转化。\n3. 长期品牌资产比一次性热点更便于持续运营。\n\n${markdown}\n`);

const state = JSON.parse(fs.readFileSync('kb-scan-state.json', 'utf8'));
state.last_successful_run = '2026-08-27T08:00:00+08:00';
state.last_scan_window = { start: '2026-08-26T08:00:00+08:00', end: '2026-08-27T08:00:00+08:00' };
state.published_yesterday = [];
state.notes = '8月27日增量扫描：未发现8月26日新增或修改且可公开发布的行业资料；无知识库条目进入昨日或长期档案。';
fs.writeFileSync('kb-scan-state.json', `${JSON.stringify(state, null, 2)}\n`);
console.log(JSON.stringify({ published: rows.length, groups: groups.map(([category, items]) => [category, items.length]), candidates: 19, deepRead: rows.length, kbMatches: 0, huaianLatest: 0, designNew: 0 }));
