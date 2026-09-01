/**
 * SRT Degree College — Interactive UI
 */

document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initScrollProgress();
  initHeader();
  initMobileMenu();
  initReveal();
  initCounters();
  initMessages();
  initCourses();
  initTimeline();
  initGallery();
  initLightbox();
  initMagnetic();
  initTilt();
  initContactForm();
  initSmoothAnchors();
});

/* ---- Custom Cursor ---- */
function initCursor() {
  if (window.matchMedia('(max-width: 768px)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });

  function animateRing() {
    rx += (mx - rx) * 0.15;
    ry += (my - ry) * 0.15;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  const interactives = 'a, button, .course-card__head, .gallery-item, .timeline__step, .infra-tile';
  document.querySelectorAll(interactives).forEach((el) => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });
}

/* ---- Scroll Progress ---- */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (scrollTop / docHeight) * 100 + '%';
  }, { passive: true });
}

/* ---- Header ---- */
function initHeader() {
  const header = document.getElementById('header');
  const links = document.querySelectorAll('.nav-link[data-section]');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
    updateActiveSection(sections, links);
  }, { passive: true });

  updateActiveSection(sections, links);
}

function updateActiveSection(sections, links) {
  const pos = window.scrollY + 120;
  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.id;
    if (pos >= top && pos < top + height) {
      links.forEach((link) => {
        link.classList.toggle('active', link.dataset.section === id);
      });
    }
  });
}

/* ---- Mobile Menu ---- */
function initMobileMenu() {
  const btn = document.getElementById('menu-btn');
  const overlay = document.getElementById('menu-overlay');
  const links = overlay.querySelectorAll('.menu-link');

  function toggle(open) {
    btn.classList.toggle('active', open);
    overlay.classList.toggle('open', open);
    overlay.setAttribute('aria-hidden', !open);
    btn.setAttribute('aria-expanded', open);
    document.body.classList.toggle('menu-open', open);
  }

  btn.addEventListener('click', () => toggle(!overlay.classList.contains('open')));
  links.forEach((link) => link.addEventListener('click', () => toggle(false)));
}

/* ---- Scroll Reveal ---- */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 60);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
  );
  els.forEach((el) => observer.observe(el));
}

/* ---- Counter Animation ---- */
function initCounters() {
  const counters = document.querySelectorAll('.stat__num[data-count]');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        animateCount(el, target);
        observer.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((c) => observer.observe(c));
}

function animateCount(el, target) {
  const duration = 1500;
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ---- Message Switch ---- */
function initMessages() {
  const btns = document.querySelectorAll('.message-switch__btn');
  btns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.message;
      btns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.message-panel').forEach((p) => p.classList.remove('active'));
      document.getElementById('msg-' + id).classList.add('active');
    });
  });
}

/* ---- Course Accordion ---- */
function initCourses() {
  const cards = document.querySelectorAll('[data-course]');
  cards.forEach((card) => {
    const head = card.querySelector('.course-card__head');
    head.addEventListener('click', () => {
      const isOpen = card.classList.contains('open');
      cards.forEach((c) => {
        c.classList.remove('open');
        c.querySelector('.course-card__head').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        card.classList.add('open');
        head.setAttribute('aria-expanded', 'true');
      }
    });
  });
  if (cards[0]) {
    cards[0].classList.add('open');
    cards[0].querySelector('.course-card__head').setAttribute('aria-expanded', 'true');
  }
}

/* ---- Admission Timeline ---- */
function initTimeline() {
  const steps = document.querySelectorAll('.timeline__step');
  const progress = document.getElementById('timeline-progress');
  let activeIndex = 0;

  steps.forEach((step, i) => {
    step.addEventListener('click', () => setActive(i));
    step.addEventListener('mouseenter', () => setActive(i));
  });

  function setActive(index) {
    activeIndex = index;
    steps.forEach((s, i) => s.classList.toggle('active', i <= index));
    const pct = (index / (steps.length - 1)) * 100;
    progress.style.height = pct + '%';
  }

  setActive(0);

  const section = document.getElementById('admission');
  window.addEventListener('scroll', () => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.6 && rect.bottom > 0) {
      const scrollPct = Math.min(1, Math.max(0, (window.innerHeight * 0.6 - rect.top) / (rect.height * 0.7)));
      const stepIndex = Math.min(steps.length - 1, Math.floor(scrollPct * steps.length));
      if (stepIndex !== activeIndex) setActive(stepIndex);
    }
  }, { passive: true });
}

/* ---- Gallery Filter ---- */
function initGallery() {
  const btns = document.querySelectorAll('.gallery-filter__btn');
  const images = document.getElementById('gallery-images');
  const videos = document.getElementById('gallery-videos');

  btns.forEach((btn) => {
    btn.addEventListener('click', () => {
      btns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const showImages = btn.dataset.filter === 'images';
      images.classList.toggle('hidden', !showImages);
      videos.classList.toggle('hidden', showImages);
    });
  });
}

/* ---- Lightbox ---- */
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const content = lightbox.querySelector('.lightbox__content');
  const close = lightbox.querySelector('.lightbox__close');

  document.querySelectorAll('[data-lightbox]').forEach((item) => {
    item.addEventListener('click', () => {
      const media = item.querySelector('.gallery-item__media');
      const label = item.querySelector('figcaption')?.textContent || '';
      content.innerHTML = `<div style="width:min(80vw,700px);aspect-ratio:4/3;display:flex;align-items:center;justify-content:center;background:${getComputedStyle(media).background};border-radius:16px;font-family:Syne,sans-serif;font-size:1.5rem;font-weight:700;color:#fff">${label}</div>`;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
  }

  close.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}

/* ---- Magnetic Buttons ---- */
function initMagnetic() {
  if (window.matchMedia('(max-width: 768px)').matches) return;

  document.querySelectorAll('.magnetic').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

/* ---- Tilt Cards ---- */
function initTilt() {
  if (window.matchMedia('(max-width: 768px)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll('[data-tilt]').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ---- Contact Form ---- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    showToast(`Thank you, ${data.name}! We'll get back to you soon.`);
    form.reset();
  });

  document.getElementById('prospectus-download').addEventListener('click', (e) => {
    e.preventDefault();
    showToast('Upload your prospectus PDF and update the download link.');
  });
}

function showToast(message) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '2rem',
    left: '50%',
    transform: 'translateX(-50%) translateY(20px)',
    background: '#0c1a2e',
    color: '#fff',
    padding: '1rem 1.75rem',
    borderRadius: '100px',
    fontSize: '0.9rem',
    fontWeight: '600',
    zIndex: '10002',
    opacity: '0',
    transition: 'opacity 0.4s, transform 0.4s cubic-bezier(0.22,1,0.36,1)',
    border: '1px solid rgba(212,168,83,0.3)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
    maxWidth: '90vw',
    textAlign: 'center',
  });
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

/* ---- Smooth Anchors ---- */
function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}
