const fs=require('fs');
const {execFileSync}=require('child_process');

const D='2026-08-07', Y='08.06';
const win=[1487,1488,1489,1492,1493,1494,1496,1497,1500,1501,1502,1503,1504,1505];
const link=['2026550628','2026550637','2026550629','2026550625','2026550623','2026550618','2026550617','2026550611','2026550610'];
const social=[28130,28123,28110,28125,28122,28118];
const cats={
  1487:'招商与首店',1488:'商业地产',1489:'商业地产',1492:'零售与餐饮',1493:'品牌与设计',1494:'商业地产',1496:'零售与餐饮',1497:'品牌与设计',1500:'招商与首店',1501:'招商与首店',1502:'商业地产',1503:'政策与趋势',1504:'招商与首店',1505:'品牌与设计',
  2026550628:'零售与餐饮',2026550637:'推广与会员',2026550629:'招商与首店',2026550625:'零售与餐饮',2026550623:'零售与餐饮',2026550618:'政策与趋势',2026550617:'政策与趋势',2026550612:'商业地产',2026550611:'政策与趋势',2026550610:'政策与趋势',
  28130:'推广与会员',28123:'推广与会员',28110:'推广与会员',28125:'推广与会员',28122:'推广与会员',28118:'品牌与设计'
};
const take={推广与会员:'传播主题、内容触点和到店/会员承接要在同一条链路中设计。',商业地产:'项目判断需同时看客群、品牌组合、客流与长期运营节奏。',招商与首店:'招商应以区域客群、店型差异和持续经营能力共同评估。',零售与餐饮:'零售经营应回到商品、履约、服务和复购的完整链路。',品牌与设计:'品牌表达需要进入空间、商品与用户体验，形成可感知触点。',政策与趋势:'行业判断应结合单店模型、渠道效率与消费基本面一起观察。'};
const clean=s=>(s||'').replace(/<[^>]+>/g,'').replace(/&[^;]+;/g,' ').replace(/\s+/g,' ').trim().replace(/_新闻中心_赢商网$/,'').replace(/_联商网$/,'');
const desc=(h,source)=>clean((h.match(source==='赢商网'?/og:description" content="([^"]+)/:/name="description" content="([^"]+)/)||[])[1])||'公开报道聚焦商业、品牌或消费市场的当天动态。';
const image=h=>(h.match(/og:image" content="([^"]+)/)||h.match(/<meta property="og:image" content="([^"]+)/)||[])[1]||'';
const rows=[];
for(const id of win){const h=fs.readFileSync(`/tmp/ws-${id}.html`,'utf8');rows.push([cats[id],'赢商网',clean((h.match(/<title>([^<]+)/)||[])[1]),desc(h,'赢商网'),take[cats[id]],cats[id],`https://news.winshang.com/html/074/${id}.html`,image(h)]);}
for(const id of link){const file=`/tmp/ls-${id}.html`;const h=execFileSync('iconv',['-f','gbk','-t','utf-8',file],{encoding:'utf8'});rows.push([cats[id],'联商网',clean((h.match(/<title>([^<]+)/)||[])[1]),desc(h,'联商网'),take[cats[id]],cats[id],`http://www.linkshop.com/news/${id}.shtml`,image(h)]);}
for(const id of social){const h=fs.readFileSync(`/tmp/sb-${id}.html`,'utf8');rows.push([cats[id],'SocialBeta',clean((h.match(/<title>([^<]+)/)||[])[1]),desc(h,'SocialBeta'),take[cats[id]],cats[id],`https://socialbeta.com/campaign/${id}`,image(h)]);}
rows.push(['商业地产','知识库 · 感性城市SCity','别闹了，商场根本离不开代理商','知识库于 08.06 收录的公开公众号文章，回顾品牌、商场与代理商在渠道变化中的协作关系。','招商团队应把代理商视为本地化选品、运营与资源协同节点，而非单纯中间环节。','代理商、招商、渠道','https://mp.weixin.qq.com/s/h5KOSGPyPXLz989gcrVbZg','']);
const C=['推广与会员','商业地产','招商与首店','零售与餐饮','品牌与设计','政策与趋势'];
const G=C.map(c=>[c,rows.filter(x=>x[0]===c).map(x=>[Y,...x.slice(1)])]);
let h=fs.readFileSync('2026-08-06.html','utf8').split('2026.08.06').join('2026.08.07').split('2026-08-06').join(D).split('08.05').join(Y);
h=h.replace(/<section class="hero">[\s\S]*?<\/section>/,'<section class="hero"><p>严格昨日版 · 全部为 08.06 发布的独立报道或公开收录资料 · 知识库昨日命中：1</p><strong>营销案例、项目招商与零售渠道同步推进；今天共整理 30 条可核验内容。</strong></section>').replace(/const groups=\[[\s\S]*?\];\nconst categoryPreview=/,`const groups=${JSON.stringify(G)};\nconst categoryPreview=`);
fs.writeFileSync(`${D}.html`,h);fs.writeFileSync('index.html',h);
const md=G.map(([c,r])=>`## ${c}\n\n`+r.map((x,n)=>`### ${n+1}. ${x[2]}\n- **发布时间**：2026-08-06｜**来源**：[${x[1]}](${x[6]})\n- ${x[3]}\n- **可借鉴点**：${x[4]}`).join('\n\n')).join('\n\n');
fs.writeFileSync(`${D}.md`,`# 陈瑶的商业晨报｜${D}\n\n> 严格昨日版：仅收录 8 月 6 日可公开核验内容，共 ${rows.length} 条；其中知识库公开资料 1 条。\n\n${md}`);
console.log(JSON.stringify({count:rows.length,groups:G.map(([c,r])=>[c,r.length])}));
