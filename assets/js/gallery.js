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
  mark(0);
})();
