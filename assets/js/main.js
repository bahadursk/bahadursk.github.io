(() => {
  const btn = document.querySelector('[data-menu-btn]');
  const nav = document.querySelector('[data-nav]');

  if (btn && nav) {
    const closeMenu = () => {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    };

    btn.addEventListener('click', (event) => {
      event.stopPropagation();
      const isOpen = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (event) => {
      if (!nav.contains(event.target) && !btn.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 780) {
        closeMenu();
      }
    });
  }

  const applyFallback = (img) => {
    if (!img) return;

    const fallback = img.dataset.fallback;
    if (fallback && !img.dataset.fallbackTried && img.getAttribute('src') !== fallback) {
      img.dataset.fallbackTried = '1';
      img.src = fallback;
      return;
    }

    const frame = img.closest('figure, .portrait, .portrait-wrapper, .highlight-figure, .gallery-tile, .member-card, .page-hero-figure') || img.parentElement;
    if (!frame) return;

    frame.classList.add('media-fallback');
    if (!frame.querySelector('.media-fallback__label')) {
      const label = document.createElement('div');
      label.className = 'media-fallback__label';
      label.textContent = img.getAttribute('alt') || 'Image unavailable';
      frame.appendChild(label);
    }
  };

  document.querySelectorAll('img').forEach((img) => {
    img.setAttribute('decoding', 'async');
    if (!img.hasAttribute('loading') && !img.classList.contains('brand-logo')) {
      img.setAttribute('loading', 'lazy');
    }
    img.addEventListener('error', () => applyFallback(img));
    if (img.complete && img.naturalWidth === 0) {
      applyFallback(img);
    }
  });
})();
