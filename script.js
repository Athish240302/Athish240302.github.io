/* ============================================================
   ATHISH MA — Portfolio Website Scripts
   File: script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ── Custom Cursor ────────────────────────────────────────
  const cursor    = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', function (e) {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  function animateCursor() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    cursorRing.style.left = rx + 'px';
    cursorRing.style.top  = ry + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Scale cursor on interactive elements
  const interactiveEls = document.querySelectorAll('a, button, .skill-card, .project-card, .cert-item');
  interactiveEls.forEach(function (el) {
    el.addEventListener('mouseenter', function () {
      cursor.style.transform = 'translate(-50%,-50%) scale(1.8)';
      cursorRing.style.width  = '56px';
      cursorRing.style.height = '56px';
    });
    el.addEventListener('mouseleave', function () {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      cursorRing.style.width  = '36px';
      cursorRing.style.height = '36px';
    });
  });

  // Hide cursor on mobile
  if ('ontouchstart' in window) {
    cursor.style.display     = 'none';
    cursorRing.style.display = 'none';
    document.body.style.cursor = 'auto';
  }

  // ── Scroll Reveal ────────────────────────────────────────
  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (entry.isIntersecting) {
        setTimeout(function () {
          entry.target.classList.add('visible');
        }, i * 60);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
  });

  // ── Nav: shrink on scroll + active link ─────────────────
  const navbar   = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', function () {
    // Shrink nav
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active nav link
    let current = '';
    sections.forEach(function (section) {
      if (window.scrollY >= section.offsetTop - 140) {
        current = section.id;
      }
    });
    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

  // ── Mobile hamburger menu ────────────────────────────────
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', function () {
    mobileMenu.classList.toggle('open');
    hamburger.innerHTML = mobileMenu.classList.contains('open') ? '&#10005;' : '&#9776;';
  });

  // Close mobile menu when a link is clicked
  document.querySelectorAll('.mobile-link').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileMenu.classList.remove('open');
      hamburger.innerHTML = '&#9776;';
    });
  });

  // ── Smooth scroll for all anchor links ──────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  console.log('✅ Athish MA | Cloud Engineer Portfolio — Loaded');
});
