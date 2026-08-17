(root => {
  const sourceCovers = {
  "https://socialbeta.com/campaign/28049": "https://socialbeta.oss-cn-hangzhou.aliyuncs.com/upload/210618-1785227908.jpg",
  "https://socialbeta.com/campaign/28052": "https://socialbeta.oss-cn-hangzhou.aliyuncs.com/upload/198246-1785235505.jpg",
  "https://news.winshang.com/html/074/1364.html": "https://img1.winshang.com/newsimg/wsimg/2026/7/20260729094743869_063f2c02c95044538b8a6a8ce34319b4.jpg",
  "http://www.linkshop.com/news/2026550376.shtml": "http://www.linkshop.com/atlas/sltuthumbnail/20250729153549686865_thumb.jpg",
  "https://news.winshang.com/html/074/1365.html": "https://img1.winshang.com/newsimg/wsimg/2026/7/20260729100032500_ae0f08776ff648eb854443a1c6925681.jpg",
  "https://news.winshang.com/html/074/1372.html": "https://img1.winshang.com/newsimg/wsimg/2026/7/20260729174147281_26dd4bbbd63349b5b7a558d721cf7ccb.png",
  "https://news.winshang.com/html/074/1362.html": "https://img1.winshang.com/newsimg/wsimg/2026/7/20260729093809076_d56944cad37c431bbfaf0f2bc1e8c650.png",
  "http://www.linkshop.com/news/2026550389.shtml": "http://www.linkshop.com/upload/article/collect/2026/sz_PmG9bjYaHlU2vvbRiaJQic9icxRcuhYQeSPN31bLveOcJKHxZ3FIMmdibgBw189cdnnA02PRTlQbSchhEVOECXcxxSDpvjPQI1QJLOGOOjtLqyQ.jpg",
  "https://socialbeta.com/campaign/28047": "https://socialbeta.oss-cn-hangzhou.aliyuncs.com/upload/38450-1785129905.jpg",
  "https://socialbeta.com/campaign/28039": "https://socialbeta.oss-cn-hangzhou.aliyuncs.com/upload/38450-1785296078.jpg",
  "https://news.winshang.com/html/074/1361.html": "https://img1.winshang.com/newsimg/wsimg/2026/7/20260729092210024_42b6be696ead4bb49e55a17be5c93c11.png",
  "http://www.linkshop.com/news/2026550384.shtml": "http://www.linkshop.com/upload/article/2026/20260729181849_1864.jpg",
  "http://www.linkshop.com/news/2026550370.shtml": "http://www.linkshop.com/upload/article/2026/20260729182532_1079.jpg",
  "http://www.linkshop.com/news/2026550369.shtml": "http://www.linkshop.com/upload/article/2026/20260730093649_3350.jpg",
  "https://socialbeta.com/article/111256": "https://socialbeta.oss-cn-hangzhou.aliyuncs.com/upload/45905-1785311728.jpg');",
  "https://socialbeta.com/campaign/28055": "https://socialbeta.oss-cn-hangzhou.aliyuncs.com/upload/38450-1785208882.png",
  "https://news.winshang.com/html/074/1363.html": "https://img1.winshang.com/newsimg/wsimg/2026/7/20260729094403676_6828ffd0bf604f33926e11a2a6d78cf2.png",
  "https://socialbeta.com/campaign/27909": "https://socialbeta.oss-cn-hangzhou.aliyuncs.com/upload/38450-1785135159.jpg",
  "http://www.linkshop.com/news/2026550382.shtml": "http://www.linkshop.com/upload/article/2026/20260729182904_1352.png",
  "http://www.linkshop.com/news/2026550357.shtml": "http://www.linkshop.com/atlas/sltuthumbnail/20260506161305742351_thumb.jpg",
  "http://www.linkshop.com/news/2026550351.shtml": "http://www.linkshop.com/upload/article/2026/20260729095626_2425.jpg",
  "https://socialbeta.com/campaign/28059": "https://socialbeta.oss-cn-hangzhou.aliyuncs.com/upload/198246-1785224958.jpg",
  "http://www.linkshop.com/news/2026550383.shtml": "http://www.linkshop.com/upload/article/2026/20260729181641_6941.png",
  "https://socialbeta.com/article/111254": "https://socialbeta.oss-cn-hangzhou.aliyuncs.com/upload/198728-1785237193.jpg');",
  "https://news.winshang.com/html/074/1345.html": "https://img1.winshang.com/newsimg/wsimg/2026/7/20260728102627744_d8dc100d47a2480ab0ffbec07b6e7611.jpg",
  "https://news.winshang.com/html/074/1359.html": "https://img1.winshang.com/newsimg/wsimg/2026/7/20260728173851679_4a179223435f415582395099ff4ec813.png",
  "https://news.winshang.com/html/074/1349.html": "https://img1.winshang.com/newsimg/wsimg/2026/7/20260728104828208_a8eb977f20464e09baec3bd51ea03bcc.jpg",
  "https://news.winshang.com/html/074/1344.html": "https://img1.winshang.com/newsimg/wsimg/2026/7/20260728093641215_ab603f4b422644a4ab2a0449968acba3.png",
  "https://news.winshang.com/html/074/1356.html": "https://img1.winshang.com/newsimg/wsimg/2026/7/20260728150327109_8e81cdb96382430983747d078bbd2158.png",
  "https://news.winshang.com/html/074/1360.html": "https://img1.winshang.com/newsimg/wsimg/2026/7/20260728174116856_58691a910d1e48338bd96d091dc11257.png",
  "https://news.winshang.com/html/074/1352.html": "https://img1.winshang.com/newsimg/wsimg/2026/7/20260728110554083_405de6e2e698437d9c7a54952a2b5fb5.jpg",
  "https://news.winshang.com/html/074/1348.html": "https://img1.winshang.com/newsimg/wsimg/2026/7/20260728104042578_6de7bb37b23a4d45934a9e2f93575c2f.png",
  "http://www.linkshop.com/news/2026550343.shtml": "http://www.linkshop.com/upload/article/2026/20260728205102_0813.jpg",
  "http://www.linkshop.com/news/2026550337.shtml": "http://www.linkshop.com/upload/article/2026/20260728172413_0418_lssize.jpg",
  "https://news.winshang.com/html/074/1355.html": "https://img1.winshang.com/newsimg/wsimg/2026/7/20260728123508195_2913276d21494372b04cd7760ef39727.png",
  "https://news.winshang.com/html/074/1353.html": "https://img1.winshang.com/newsimg/wsimg/2026/7/20260728111500794_d4549b53fb304abe884a71047792f4d7.png",
  "https://news.winshang.com/html/074/1350.html": "https://img1.winshang.com/newsimg/wsimg/2026/7/20260728110007897_e5ff56f883a8450d98b67a51340dc254.png",
  "https://eu.36kr.com/zh/p/3914699672573061": "https://img.36krcdn.com/hsossms/20260728/v2_4dafcd69377545dba22ba9e9287af3e1@6208419_oswg1039339oswg1053oswg495_img_png?x-oss-process=image/resize,m_mfit,w_600,h_400,limit_0/crop,w_600,h_400,g_center",
  "https://www.eeo.com.cn/2026/0727/976459.shtml": "https://img.eeo.com.cn/2024/images/card.png",
  "https://news.winshang.com/html/074/1333.html": "https://img1.winshang.com/newsimg/wsimg/2026/7/20260727140351598_a14262b11e2c4309a1c32bca977cf8b7.jpg",
  "https://e.460.net.cn/a/562153.html": "https://img.bim99.cn/ssd/ssd4/5506/2026-07-08/5506_17835032986081.webp",
  "https://m.21jingji.com/article/20260723/herald/79984a6573f7847fce8d0a24a588dfde.html": "https://ocmsmedia.sfccn.com/vod-4310da/image/default/877C3F3A41BC4A36A57424692594F551-6-2.png",
  "https://tt.xinmin.cn/2026/06/30/32892069.htm": "https://images.shobserver.com/news/690_390/2026/06/30/l_cb20260630174946778021.jpeg"
};
  if (root) root.articleCovers = sourceCovers;
  const fallback = {
    promo: 'assets/covers/promo.svg',
    retail: 'assets/covers/retail.svg',
    property: 'assets/covers/property.svg',
    data: 'assets/covers/data.svg',
    city: 'assets/covers/city.svg'
  };

  const typeFor = text => {
    if (/推广|企划|活动|会员|营销|快闪|市集|票根|传播/.test(text)) return 'promo';
    if (/零售|餐饮|品牌|门店|消费|咖啡|商超|首店/.test(text)) return 'retail';
    if (/政策|数据|趋势|统计|社零|指数|经济/.test(text)) return 'data';
    if (/淮安|城市|商圈|街区|文旅/.test(text)) return 'city';
    return 'property';
  };

  const isSafeOriginal = url => /^https:\/\//.test(url || '') && !/^https:\/\/(?:www\.)?linkshop\.com\//.test(url || '');
  const pickImage = (url, text) => isSafeOriginal(url) ? url : fallback[typeFor(text || '')];
  const api = { typeFor, isSafeOriginal, pickImage };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (!root || !root.document) return;
  const document = root.document;

  const mount = scope => {
    if (!scope.querySelectorAll) return;
    scope.querySelectorAll('.card').forEach(card => {
      if (/今日启示/.test(card.textContent)) return;
      const text = card.textContent || '';
      const articleLink = [...card.querySelectorAll('a[href^="http"]')].map(link => link.href)[0] || '';
      const rawOriginal = card.dataset.cover || sourceCovers[articleLink] || '';
      const original = isSafeOriginal(rawOriginal) ? rawOriginal : '';
      const src = pickImage(rawOriginal, text);
      const labelText = original ? '原文图片' : '晨报配图';
      const existing = card.querySelector('.card-preview');
      if (existing) {
        const existingImage = existing.querySelector('img');
        const existingLabel = existing.querySelector('span');
        if (existingImage) {
          existingImage.onerror = () => { existingImage.onerror = null; existingImage.src = fallback[typeFor(text)]; if (existingLabel) existingLabel.textContent = '晨报配图'; existing.dataset.fallback = 'true'; };
          existingImage.src = src;
        }
        if (existingLabel) existingLabel.textContent = labelText;
        existing.dataset.fallback = original ? 'false' : 'true';
        return;
      }
      const preview = document.createElement('div');
      preview.className = 'card-preview';
      preview.dataset.fallback = original ? 'false' : 'true';
      const image = document.createElement('img');
      image.loading = 'lazy';
      image.decoding = 'async';
      image.fetchPriority = 'low';
      image.referrerPolicy = 'no-referrer';
      image.alt = original ? '原文图片预览' : '晨报分类配图';
      image.src = src;
      image.onerror = () => {
        image.onerror = null;
        image.src = fallback[typeFor(text)];
        label.textContent = '晨报配图';
      };
      const label = document.createElement('span');
      label.textContent = labelText;
      preview.append(image, label);
      card.prepend(preview);
    });
  };

  const start = () => {
    mount(document);
    root.refreshNewsPreviews = () => mount(document);
    document.addEventListener('click', event => {
      const button = event.target.closest ? event.target.closest('.filters button') : null;
      if (button) root.setTimeout(root.refreshNewsPreviews, 0);
    });
  };
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', start) : start();
})(typeof window !== 'undefined' ? window : null);
