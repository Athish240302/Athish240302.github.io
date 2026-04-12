/* ============================================================
   ATHISH MA — Portfolio Website Scripts (Upgraded)
   File: script.js
   ============================================================ */

/* ── Loader ─────────────────────────────────────────────── */
const loaderTexts = [
  'Initializing cloud environment...',
  'Connecting to AWS regions...',
  'Loading IAM policies...',
  'Provisioning EC2 instances...',
  'Mounting S3 data lake...',
  'Ready.'
];

let loaderProgress = 0;
const loaderFill = document.getElementById('loaderFill');
const loaderText = document.getElementById('loaderText');
const loader = document.getElementById('loader');

function runLoader() {
  let step = 0;
  const interval = setInterval(() => {
    step++;
    loaderProgress = Math.min((step / loaderTexts.length) * 100, 100);
    loaderFill.style.width = loaderProgress + '%';
    if (loaderText && loaderTexts[step - 1]) {
      loaderText.textContent = loaderTexts[step - 1];
    }
    if (step >= loaderTexts.length) {
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
        startPage();
      }, 300);
    }
  }, 200);
}

document.body.style.overflow = 'hidden';
runLoader();

/* ── Particle Canvas ─────────────────────────────────────── */
function initCanvas() {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.r = Math.random() * 1.5 + 0.3;
      this.alpha = Math.random() * 0.4 + 0.05;
      this.color = Math.random() > 0.6 ? '56,189,248' : Math.random() > 0.5 ? '129,140,248' : '52,211,153';
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 80; i++) particles.push(new Particle());

  // Draw connecting lines between nearby particles
  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(56,189,248,${0.06 * (1 - d / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(loop);
  }
  loop();
}

/* ── Typewriter ──────────────────────────────────────────── */
const typeTexts = ['Cloud Engineer', 'AWS Architect', 'AI + Cloud Builder', 'Data Lake Engineer'];
let typeIdx = 0, charIdx = 0, deleting = false;

function typeLoop() {
  const el = document.getElementById('typeTarget');
  if (!el) return;
  const current = typeTexts[typeIdx];
  if (!deleting) {
    el.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
  } else {
    el.textContent = current.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      typeIdx = (typeIdx + 1) % typeTexts.length;
    }
  }
  setTimeout(typeLoop, deleting ? 55 : 90);
}

/* ── Counter animation ───────────────────────────────────── */
function animateCounter(el, target) {
  let start = 0;
  const step = target / 40;
  const interval = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = Math.round(start) + (el.dataset.suffix || '+');
    if (start >= target) clearInterval(interval);
  }, 30);
}

/* ── Main start ──────────────────────────────────────────── */
function startPage() {
  initCanvas();
  typeLoop();

  // Counter stats
  document.querySelectorAll('.stat-num[data-count]').forEach(el => {
    animateCounter(el, parseInt(el.dataset.count));
  });

  // ── Custom Cursor ──────────────────────────────────────
  const cursor    = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', function (e) {
    mx = e.clientX; my = e.clientY;
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

  const interactiveEls = document.querySelectorAll('a, button, .skill-card, .project-card, .cert-item, .arch-node');
  interactiveEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1.8)';
      cursorRing.style.width  = '56px';
      cursorRing.style.height = '56px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      cursorRing.style.width  = '36px';
      cursorRing.style.height = '36px';
    });
  });

  if ('ontouchstart' in window) {
    cursor.style.display     = 'none';
    cursorRing.style.display = 'none';
    document.body.style.cursor = 'auto';
  }

  // ── Architecture tooltip ───────────────────────────────
  const tooltip = document.getElementById('archTooltip');
  document.querySelectorAll('.arch-node').forEach(node => {
    node.addEventListener('mouseenter', (e) => {
      if (tooltip) {
        tooltip.textContent = node.dataset.tip || '';
        tooltip.classList.add('visible');
        // Position relative to node
        const rect = node.getBoundingClientRect();
        const parentRect = node.closest('.arch-canvas').getBoundingClientRect();
        tooltip.style.left = (rect.left - parentRect.left + rect.width / 2) + 'px';
        tooltip.style.bottom = (parentRect.bottom - rect.top + 8) + 'px';
        tooltip.style.top = 'auto';
      }
    });
    node.addEventListener('mouseleave', () => {
      if (tooltip) tooltip.classList.remove('visible');
    });
  });

  // ── Scroll Reveal ─────────────────────────────────────
  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 60);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ── Nav shrink + active link ──────────────────────────
  const navbar   = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 140) current = section.id;
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
  });

  // ── Mobile hamburger ──────────────────────────────────
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', function () {
    mobileMenu.classList.toggle('open');
    hamburger.innerHTML = mobileMenu.classList.contains('open') ? '&#10005;' : '&#9776;';
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', function () {
      mobileMenu.classList.remove('open');
      hamburger.innerHTML = '&#9776;';
    });
  });

  // ── Smooth scroll ─────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Project card tilt ─────────────────────────────────
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 8;
      card.style.transform = `translateY(-6px) rotateX(${-y}deg) rotateY(${x}deg)`;
      card.style.transition = 'none';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = '';
    });
  });

  console.log('✅ Athish MA | Cloud & AI Engineer Portfolio — Loaded');
}
