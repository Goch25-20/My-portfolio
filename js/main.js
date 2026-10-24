/* ============================================================
   MAIN.JS — Mobile menu toggle + active nav link highlight
============================================================ */
(function () {
  'use strict';

  /* ---- Mobile menu ---- */
  var btn = document.getElementById('menu-btn');
  var nav = document.getElementById('main-nav');
  if (!btn || !nav) return;

  function closeMenu() {
    nav.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Open navigation menu');
  }

  function openMenu() {
    nav.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    btn.setAttribute('aria-label', 'Close navigation menu');
  }

  btn.addEventListener('click', function () {
    nav.classList.contains('open') ? closeMenu() : openMenu();
  });

  nav.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', function (e) {
    var hdr = document.getElementById('site-header');
    if (hdr && !hdr.contains(e.target)) closeMenu();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeMenu(); btn.focus(); }
  });

  /* ---- Active nav link on scroll ---- */
  var links = document.querySelectorAll('.nav-link');

  function setActive() {
    var scrollY = window.scrollY + 80;
    var current = '';

    ['hero', 'about', 'work', 'journey', 'skills', 'education', 'contact'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.offsetTop <= scrollY) current = id;
    });

    links.forEach(function (link) {
      link.classList.remove('active');
      var href = link.getAttribute('href');
      if (href === '#' + current || (current === 'hero' && href === '#hero')) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', setActive, { passive: true });
  setActive();

}());
