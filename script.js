/* =========================================================
   SANSKAR SINGH — PORTFOLIO SCRIPTS
   Shared across all pages
   ========================================================= */

// ─── MATRIX CANVAS ───────────────────────────────────────
(function () {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, cols, drops;
  const fontSize = 13;
  const chars = '01アイウエオカキクケコ<>{}[]();=+-*&|#abcdefghijklmnop'.split('');

  function init() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    cols = Math.floor(W / fontSize);
    drops = Array(cols).fill(1);
    ctx.font = fontSize + 'px JetBrains Mono, monospace';
  }

  function draw() {
    ctx.fillStyle = 'rgba(7, 12, 15, 0.05)';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#00ff88';
    drops.forEach((y, i) => {
      const c = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(c, i * fontSize, y * fontSize);
      if (y * fontSize > H && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
  }

  init();
  window.addEventListener('resize', init);
  setInterval(draw, 60);
})();

// ─── CUSTOM CURSOR ───────────────────────────────────────
(function () {
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  if (!cursor || !ring) return;
  let cx = 0, cy = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    cx = e.clientX; cy = e.clientY;
    cursor.style.left = cx - 5 + 'px';
    cursor.style.top = cy - 5 + 'px';
  });

  function animateRing() {
    rx += (cx - rx) * 0.12;
    ry += (cy - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.style.transform = 'scale(2.5)');
    el.addEventListener('mouseleave', () => cursor.style.transform = 'scale(1)');
  });
})();

// ─── NAVBAR SCROLL ───────────────────────────────────────
(function () {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
})();

// ─── MOBILE MENU ─────────────────────────────────────────
(function () {
  const btn = document.getElementById('mobileMenuBtn');
  const links = document.getElementById('navLinks');
  if (!btn || !links) return;
  btn.addEventListener('click', () => links.classList.toggle('open'));
  // Close on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
})();

// ─── ACTIVE NAV LINK ─────────────────────────────────────
(function () {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

// ─── TYPING EFFECT (index only) ──────────────────────────
(function () {
  const el = document.getElementById('typedText');
  if (!el) return;
  const phrases = [
    'Full-Stack Developer',
    'AI/ML Engineer',
    'Cloud Enthusiast',
    'Published Researcher',
    'Frontend Craftsman'
  ];
  let pi = 0, ci = 0, deleting = false;

  function type() {
    const phrase = phrases[pi];
    if (!deleting) {
      el.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) { deleting = true; setTimeout(type, 2000); return; }
    } else {
      el.textContent = phrase.slice(0, --ci);
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
    }
    setTimeout(type, deleting ? 50 : 90);
  }
  type();
})();

// ─── FADE-IN ON SCROLL ───────────────────────────────────
(function () {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
})();

// ─── SKILL BAR ANIMATION ─────────────────────────────────
(function () {
  const skillObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
          bar.style.width = bar.dataset.width + '%';
        });
        skillObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.skill-group').forEach(g => skillObs.observe(g));
})();

// ─── SMOOTH ANCHOR SCROLL ────────────────────────────────
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        document.getElementById('navLinks')?.classList.remove('open');
      }
    });
  });
})();

// ─── CONTACT FORM FEEDBACK ───────────────────────────────
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.style.background = '#00e5ff';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
})();
