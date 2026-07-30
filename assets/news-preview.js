(() => {
  const fallback = {
    promo: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    retail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    property: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=1200&q=80',
    data: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    city: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=80'
  };

  const typeFor = text => {
    if (/推广|企划|活动|会员|营销|快闪|市集|票根|传播/.test(text)) return 'promo';
    if (/零售|餐饮|品牌|门店|消费|咖啡|商超|首店/.test(text)) return 'retail';
    if (/政策|数据|趋势|统计|社零|指数|经济/.test(text)) return 'data';
    if (/淮安|城市|商圈|街区|文旅/.test(text)) return 'city';
    return 'property';
  };

  const mount = scope => {
    scope.querySelectorAll?.('.card').forEach(card => {
      if (card.querySelector('.card-preview') || /今日启示/.test(card.textContent)) return;
      const text = card.textContent || '';
      const original = card.dataset.cover || '';
      const preview = document.createElement('div');
      preview.className = 'card-preview';
      const image = document.createElement('img');
      image.loading = 'lazy';
      image.referrerPolicy = 'no-referrer';
      image.alt = original ? '原文封面预览' : '晨报分类配图';
      image.src = original || fallback[typeFor(text)];
      const label = document.createElement('span');
      label.textContent = original ? '原文封面' : '晨报配图';
      preview.append(image, label);
      card.prepend(preview);
    });
  };

  const start = () => {
    mount(document);
    new MutationObserver(records => records.forEach(record => record.addedNodes.forEach(node => {
      if (node.nodeType === 1) mount(node);
    }))).observe(document.body, {childList:true, subtree:true});
  };
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', start) : start();
})();
