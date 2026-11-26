(function () {
  var root = document.querySelector('[data-carousel]');
  if (!root) return;
  var track = root.querySelector('.g-track');
  var slides = track.querySelectorAll('.g-slide');
  var thumbs = document.querySelectorAll('.g-thumb');
  var current = 0;
  function go(i) {
    i = (i + slides.length) % slides.length;
    track.scrollTo({ left: slides[i].offsetLeft, behavior: 'smooth' });
  }
  function mark(i) {
    current = i;
    thumbs.forEach(function (t, k) {
      t.setAttribute('aria-selected', k === i ? 'true' : 'false');
    });
    var t = thumbs[i];
    if (t) {
      var bar = t.parentElement;
      bar.scrollTo({ left: t.offsetLeft - bar.clientWidth / 2 + t.clientWidth / 2, behavior: 'smooth' });
    }
  }
  var ticking = false;
  track.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var i = Math.round(track.scrollLeft / track.clientWidth);
      if (i !== current) mark(i);
      ticking = false;
    });
  });
  root.querySelector('.g-prev').addEventListener('click', function () { go(current - 1); });
  root.querySelector('.g-next').addEventListener('click', function () { go(current + 1); });
  thumbs.forEach(function (t) {
    t.addEventListener('click', function () { go(+t.dataset.i); });
  });
  track.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(current + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(current - 1); }
  });
  window.addEventListener('resize', function () {
    track.style.scrollBehavior = 'auto';
    track.scrollLeft = slides[current].offsetLeft;
    track.style.scrollBehavior = '';
  });

  // Grid: open a photo in the slideshow
  document.querySelectorAll('.g-cell a[data-i]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      root.scrollIntoView({ behavior: 'smooth', block: 'center' });
      go(+a.dataset.i);
      pauseFor(12000);
    });
  });
  // Auto-scroll: advance every 4 s, pause while hovered, focused or touched
  var DELAY = 4000, timer = null, hold = 0, hovering = false;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function tick() {
    if (hovering || Date.now() < hold || document.hidden) return;
    go(current + 1);
  }
  function pauseFor(ms) { hold = Date.now() + ms; }
  if (!reduce) timer = setInterval(tick, DELAY);
  root.addEventListener('mouseenter', function () { hovering = true; });
  root.addEventListener('mouseleave', function () { hovering = false; pauseFor(1500); });
  root.addEventListener('focusin', function () { hovering = true; });
  root.addEventListener('focusout', function () { hovering = false; });
  root.addEventListener('touchstart', function () { pauseFor(10000); }, { passive: true });
  document.querySelector('.g-thumbs').addEventListener('click', function () { pauseFor(10000); });
  mark(0);
})();
