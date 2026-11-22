// Wander Roll — theme toggle, header state, lightbox
(function () {
  var root = document.documentElement;
  var KEY = 'wander-roll-theme';

  // ----- theme -----
  function store(get, val) {
    try { return get ? localStorage.getItem(KEY) : localStorage.setItem(KEY, val); } catch (e) { return null; }
  }
  function apply(theme) {
    root.setAttribute('data-theme', theme);
    var btn = document.querySelector('.theme-toggle');
    if (btn) {
      var dark = theme === 'darkroom';
      btn.setAttribute('aria-pressed', String(dark));
      btn.setAttribute('aria-label', dark ? '낮 모드로 전환' : '암실 모드로 전환');
      btn.title = dark ? '낮 모드' : '암실 모드';
    }
  }
  var saved = store(true);
  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  apply(saved || (prefersDark ? 'darkroom' : 'daylight'));

  document.addEventListener('DOMContentLoaded', function () {
    apply(root.getAttribute('data-theme'));
    var toggle = document.querySelector('.theme-toggle');
    if (toggle) toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'darkroom' ? 'daylight' : 'darkroom';
      apply(next); store(false, next);
    });

    // ----- header shadow on scroll -----
    var header = document.querySelector('.site-header');
    var onScroll = function () { if (header) header.classList.toggle('is-scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

    // ----- film strip: pad each frame to a multiple of the 22px sprocket pitch
    //       so the holes run evenly from one frame into the next -----
    var PITCH = 22, GAP = 12;
    var frames = Array.prototype.slice.call(document.querySelectorAll('.strip__frame'));
    function alignFrame(f) {
      f.style.paddingRight = GAP + 'px';
      var w = f.getBoundingClientRect().width;
      var extra = (PITCH - (Math.round(w) % PITCH)) % PITCH;
      f.style.paddingRight = (GAP + extra) + 'px';
    }
    function alignAll() { frames.forEach(alignFrame); }
    frames.forEach(function (f) {
      var im = f.querySelector('img');
      if (im && !im.complete) im.addEventListener('load', function () { alignFrame(f); });
    });
    alignAll();
    window.addEventListener('resize', alignAll);

    // ----- lightbox -----
    var triggers = Array.prototype.slice.call(document.querySelectorAll('[data-full]'));
    var box = document.querySelector('.lightbox');
    if (!box || !triggers.length || typeof box.showModal !== 'function') return;
    var img = box.querySelector('img'), cap = box.querySelector('.lightbox__cap');
    var idx = 0, lastFocus = null;

    function show(i) {
      idx = (i + triggers.length) % triggers.length;
      var t = triggers[idx];
      img.src = t.getAttribute('data-full');
      img.alt = t.querySelector('img').alt;
      cap.textContent = t.getAttribute('data-cap') + '  ·  ' + (idx + 1) + ' / ' + triggers.length;
    }
    triggers.forEach(function (t, i) {
      t.addEventListener('click', function () { lastFocus = t; show(i); box.showModal(); });
    });
    box.querySelector('[data-act=prev]').addEventListener('click', function () { show(idx - 1); });
    box.querySelector('[data-act=next]').addEventListener('click', function () { show(idx + 1); });
    box.querySelector('[data-act=close]').addEventListener('click', function () { box.close(); });
    box.addEventListener('click', function (e) { if (e.target === box || e.target.classList.contains('lightbox__inner')) box.close(); });
    box.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
    box.addEventListener('close', function () { if (lastFocus) lastFocus.focus(); });
  });
})();
