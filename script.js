// ════════════════════════════════════
// PRELOADER — ELEVATOR DOOR ANIMATION
// ════════════════════════════════════
window.addEventListener('load', function() {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('doors-open');
    // Show hero content
    setTimeout(() => {
      const heroContent = document.getElementById('heroContent');
      if (heroContent) heroContent.classList.add('visible');
    }, 200);
    // Remove preloader
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 2200);
  }, 800);
});

// ════════════════════════════════════
// PAGE NAVIGATION
// ════════════════════════════════════
function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  // Show target
  const target = document.getElementById('page-' + pageId);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  // Update nav active states
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === pageId);
  });
  // Reinit AOS
  setTimeout(() => { AOS.refresh(); }, 100);
  // Reinit swiper if going to home
  if (pageId === 'home') {
    initSwipers();
    initCounters();
  }
  // Update meta title
  const titles = {
    home: 'Rado Elevators | Elevator Installation, AMC & Repair India',
    about: 'About Rado Elevators | 15+ Years Elevator Excellence',
    products: 'Passenger, Home, Hospital & Freight Elevators | Rado',
    services: 'Elevator Installation, AMC, Repair & Modernization | Rado',
    projects: 'Elevator Projects Gallery | Residential & Commercial | Rado',
    certifications: 'Certifications & Quality Standards | Rado Elevators',
    contact: 'Contact Rado Elevators | Free Quote & Site Survey'
  };
  document.title = titles[pageId] || 'Rado Elevators';
}

// ════════════════════════════════════
// NAVBAR SCROLL BEHAVIOR
// ════════════════════════════════════
window.addEventListener('scroll', function() {
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
    backToTop.classList.add('visible');
  } else {
    navbar.classList.remove('scrolled');
    backToTop.classList.remove('visible');
  }
});

// ════════════════════════════════════
// MOBILE DRAWER
// ════════════════════════════════════
function toggleDrawer() {
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('drawerOverlay');
  const btn = document.getElementById('hamburgerBtn');
  const isOpen = drawer.classList.toggle('open');
  overlay.classList.toggle('show', isOpen);
  btn.setAttribute('aria-expanded', isOpen);
}

// ════════════════════════════════════
// SWIPER INIT
// ════════════════════════════════════
let elevatorsSwiper, testimonialsSwiper;
function initSwipers() {
  if (!elevatorsSwiper) {
    elevatorsSwiper = new Swiper('.swiper-elevator', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: { delay: 3000, pauseOnMouseEnter: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      pagination: { el: '.swiper-pagination', clickable: true },
      breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1280: { slidesPerView: 4 }
      }
    });
  }
  if (!testimonialsSwiper) {
    testimonialsSwiper = new Swiper('.swiper-testimonials', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: { delay: 5000, pauseOnMouseEnter: true },
      pagination: { el: '.swiper-pagination', clickable: true },
      breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 2 } }
    });
  }
}

// ════════════════════════════════════
// COUNTUP ANIMATIONS
// ════════════════════════════════════
let countersStarted = false;
function initCounters() {
  if (countersStarted) return;
  const countEls = document.querySelectorAll('.stat-number[data-count]');
  if (!countEls.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersStarted) {
        countersStarted = true;
        countEls.forEach(el => {
          const target = parseInt(el.dataset.count);
          const suffix = target === 100 ? '%' : '+';
          if (window.CountUp) {
            const cu = new CountUp.CountUp(el, target, { duration: 2.5, suffix: suffix });
            cu.start();
          } else {
            el.textContent = target + suffix;
          }
        });
      }
    });
  }, { threshold: 0.3 });
  countEls.forEach(el => observer.observe(el));
}

// ════════════════════════════════════
// PROJECT FILTERS (Home)
// ════════════════════════════════════
function filterProjects(btn, cat) {
  document.querySelectorAll('.projects-filter .filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const cards = document.querySelectorAll('#homeProjectsGrid .project-card');
  cards.forEach(card => {
    const match = cat === 'all' || card.dataset.category === cat;
    card.style.display = match ? '' : 'none';
  });
}

// Projects page filter
function filterProjectsFull(btn, cat) {
  document.querySelectorAll('#page-projects .filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const cards = document.querySelectorAll('#fullProjectsGrid .project-card');
  cards.forEach(card => {
    const match = cat === 'all' || card.dataset.category === cat;
    card.style.display = match ? '' : 'none';
  });
}

// ════════════════════════════════════
// COMPARISON SLIDER (Modernization)
// ════════════════════════════════════
function initComparisonSlider() {
  const container = document.getElementById('comparisonSlider');
  const after = document.getElementById('comparisonAfter');
  const handle = document.getElementById('comparisonHandle');
  if (!container) return;
  let isDragging = false;
  function setPos(x) {
    const rect = container.getBoundingClientRect();
    let pct = Math.min(Math.max(((x - rect.left) / rect.width) * 100, 5), 95);
    after.style.clipPath = `inset(0 ${100-pct}% 0 0)`;
    handle.style.left = pct + '%';
    handle.setAttribute('aria-valuenow', Math.round(pct));
  }
  handle.addEventListener('mousedown', () => isDragging = true);
  document.addEventListener('mousemove', e => { if (isDragging) setPos(e.clientX); });
  document.addEventListener('mouseup', () => isDragging = false);
  handle.addEventListener('touchstart', e => { isDragging = true; }, { passive: true });
  document.addEventListener('touchmove', e => { if (isDragging && e.touches[0]) setPos(e.touches[0].clientX); }, { passive: true });
  document.addEventListener('touchend', () => isDragging = false);
  // Keyboard
  handle.addEventListener('keydown', e => {
    const rect = container.getBoundingClientRect();
    const curPct = parseFloat(handle.style.left) || 50;
    if (e.key === 'ArrowLeft') setPos(rect.left + (curPct - 5) / 100 * rect.width);
    if (e.key === 'ArrowRight') setPos(rect.left + (curPct + 5) / 100 * rect.width);
  });
}

// ════════════════════════════════════
// CONTACT FORM
// ════════════════════════════════════
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  let valid = true;
  ['fullName','phone','city','service'].forEach(id => {
    const el = document.getElementById(id);
    if (!el.value.trim()) {
      el.classList.add('error-msg');
      valid = false;
    } else {
      el.classList.remove('error-msg');
    }
  });
  if (valid) {
    document.getElementById('successMsg').style.display = 'block';
    this.reset();
    setTimeout(() => { document.getElementById('successMsg').style.display = 'none'; }, 6000);
  }
});

// ════════════════════════════════════
// PARTICLES CANVAS
// ════════════════════════════════════
(function() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);
  for (let i = 0; i < 40; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      speed: Math.random() * 0.4 + 0.2,
      opacity: Math.random() * 0.4 + 0.1
    });
  }
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.y -= p.speed;
      if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201,168,76,${p.opacity})`;
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  animate();
})();

// ════════════════════════════════════
// AOS INIT
// ════════════════════════════════════
AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 60 });

// ════════════════════════════════════
// INIT ON LOAD
// ════════════════════════════════════
document.addEventListener('DOMContentLoaded', function() {
  initSwipers();
  initCounters();
  initComparisonSlider();
});

// Service cards keyboard support
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('keydown', e => { if (e.key === 'Enter') card.click(); });
});

// Google Analytics placeholder
// window.dataLayer = window.dataLayer || [];
// function gtag(){dataLayer.push(arguments);}
// gtag('js', new Date()); gtag('config', 'G-XXXXXXXXXX');
