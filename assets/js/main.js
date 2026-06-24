(() => {
  const btn = document.querySelector('[data-menu-btn]');
  const nav = document.querySelector('[data-nav]');
  if (btn && nav) {
    const close = () => { nav.classList.remove('open'); btn.setAttribute('aria-expanded','false'); };
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !btn.contains(e.target)) close();
    });
    window.addEventListener('resize', () => { if (window.innerWidth > 780) close(); });
  }

  const fallback = (img) => {
    if (!img) return;
    const f = img.dataset.fallback;
    if (f && !img.dataset.fallbackTried && img.getAttribute('src') !== f) {
      img.dataset.fallbackTried = '1';
      img.src = f;
      return;
    }
    const frame = img.closest('figure, .portrait, .highlight-figure, .gallery-tile, .member-card') || img.parentElement;
    if (!frame) return;
    frame.classList.add('media-fallback');
    if (!frame.querySelector('.media-fallback__label')) {
      const label = document.createElement('div');
      label.className = 'media-fallback__label';
      label.textContent = img.getAttribute('alt') || 'Image unavailable';
      frame.appendChild(label);
    }
  };
  document.querySelectorAll('img').forEach(img => {
    img.setAttribute('decoding','async');
    img.addEventListener('error', () => fallback(img));
    if (img.complete && img.naturalWidth === 0) fallback(img);
  });
})();
