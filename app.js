// === STARS BACKGROUND ===
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let stars = [];

function initStars() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  stars = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.3,
    a: Math.random(),
    speed: Math.random() * 0.5 + 0.1
  }));
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(s => {
    s.a += s.speed * 0.01;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200, 200, 255, ${0.3 + Math.sin(s.a) * 0.3})`;
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
}

initStars();
drawStars();
window.addEventListener('resize', initStars);

// === GSAP ANIMATIONS ===
gsap.registerPlugin(ScrollTrigger);

// Hero entrance
const tl = gsap.timeline({ delay: 0.3 });
tl.to('.line-inner', {
  y: 0, duration: 1.2, stagger: 0.15,
  ease: 'power4.out'
})
.to('.hero-badge', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.8')
.to('.hero-sub', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
.to('.hero-btns', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
.from('.hero-img-wrap', { scale: 0.8, opacity: 0, duration: 1, ease: 'power3.out' }, '-=1')
.from('.floating-astro', { x: 50, opacity: 0, duration: 0.8, ease: 'back.out(2)' }, '-=0.5');

// Scroll animations for sections
gsap.utils.toArray('.section-header, .about-lead, .about-text p, .stat-card, .app-card, .timeline-item, .contact-card').forEach(el => {
  gsap.from(el, {
    y: 40, opacity: 0, duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 85%' }
  });
});

// Parallax hero image on scroll
gsap.to('.hero-right', {
  y: -80,
  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
});

// Marquee speed up on scroll
gsap.to('.marquee-track', {
  x: '-=200',
  scrollTrigger: { trigger: '.marquee', start: 'top bottom', end: 'bottom top', scrub: 2 }
});

// Counter animation
const counters = document.querySelectorAll('[data-count]');
counters.forEach(el => {
  const target = parseInt(el.dataset.count);
  ScrollTrigger.create({
    trigger: el,
    start: 'top 85%',
    onEnter: () => {
      gsap.to(el, {
        innerText: target,
        duration: 1.5,
        snap: { innerText: 1 },
        ease: 'power2.out',
        onUpdate: function() { el.textContent = Math.round(parseFloat(el.textContent)) + '+'; }
      });
    },
    once: true
  });
});

// Nav hide/show on scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  if (window.scrollY > lastScroll && window.scrollY > 100) {
    nav.style.transform = 'translateY(-100%)';
  } else {
    nav.style.transform = 'translateY(0)';
  }
  lastScroll = window.scrollY;
});
document.getElementById('nav').style.transition = 'transform 0.3s ease';

// === LANGUAGE SWITCH ===
let currentLang = 'en';
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    currentLang = btn.dataset.lang;
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('[data-en]').forEach(el => {
      el.innerHTML = el.getAttribute(`data-${currentLang}`) || el.getAttribute('data-en');
    });
  });
});

// === SMOOTH SCROLL ===
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
  });
});

// === APP CARD GLOW FOLLOW ===
document.querySelectorAll('.app-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.querySelector('.app-card-glow').style.background =
      `radial-gradient(circle at ${x}% ${y}%, rgba(108,99,255,0.12) 0%, transparent 60%)`;
  });
});
