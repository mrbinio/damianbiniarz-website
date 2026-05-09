gsap.registerPlugin(ScrollTrigger);

// === SMOOTH SCROLL (Lenis-like via GSAP) ===
// ScrollTrigger already handles smooth scrubbing

// === INTRO ANIMATION ===
const introTl = gsap.timeline();
introTl
  .to('.intro-line', { y: 0, duration: 0.8, stagger: 0.1, ease: 'power4.out', delay: 0.2 })
  .to('.intro-line', { y: '-110%', duration: 0.6, stagger: 0.05, ease: 'power3.in', delay: 0.4 })
  .to('.intro', { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.8, ease: 'power4.inOut' })
  .set('.intro', { display: 'none' })
  .add(() => animateHero());

// === HERO ENTRANCE ===
function animateHero() {
  const heroTl = gsap.timeline();
  heroTl
    .to('.char', { y: 0, duration: 0.7, stagger: 0.025, ease: 'power4.out' })
    .to('.hero-tag', { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3')
    .to('.hero-roles', { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.2')
    .to('.hero-desc', { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.15')
    .to('.hero-cta', { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.1')
    .fromTo('.hero-photo-wrap', { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
      { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 1.2, ease: 'power4.inOut' }, 0.3)
    .from('.float-el', { scale: 0, opacity: 0, duration: 0.4, stagger: 0.06, ease: 'back.out(3)' }, 1);
}
gsap.set('.hero-tag, .hero-roles, .hero-desc, .hero-cta', { y: 30, opacity: 0 });

// === HERO SCROLL-LINKED ANIMATIONS ===
// Title splits apart on scroll
gsap.to('.hero-title .char-wrap:first-child', {
  x: -100, opacity: 0,
  scrollTrigger: { trigger: '.hero', start: '20% top', end: '60% top', scrub: 1 }
});
gsap.to('.hero-title .char-wrap:last-child', {
  x: 100, opacity: 0,
  scrollTrigger: { trigger: '.hero', start: '20% top', end: '60% top', scrub: 1 }
});
gsap.to('.hero-content', {
  y: -100,
  scrollTrigger: { trigger: '.hero', start: '30% top', end: '80% top', scrub: 1 }
});
gsap.to('.hero-visual', {
  y: -150, scale: 0.85, rotation: -3,
  scrollTrigger: { trigger: '.hero', start: '20% top', end: '70% top', scrub: 1 }
});

// === MARQUEE SCROLL SPEED ===
gsap.to('.marquee-track', {
  x: '-=500',
  scrollTrigger: { trigger: '.marquee', start: 'top bottom', end: 'bottom top', scrub: 0.5 }
});

// === ABOUT SECTION — PINNED TEXT REVEAL ===
gsap.from('.about-headline', {
  y: 80, opacity: 0, duration: 1,
  scrollTrigger: { trigger: '.about-headline', start: 'top 80%', end: 'top 50%', scrub: 1 }
});
gsap.from('.about-body', {
  y: 60, opacity: 0,
  scrollTrigger: { trigger: '.about-body', start: 'top 85%', end: 'top 60%', scrub: 1 }
});

// Stats fly in with rotation
gsap.utils.toArray('.stat-box').forEach((el, i) => {
  gsap.from(el, {
    y: 80, opacity: 0, rotation: 5 * (i % 2 === 0 ? 1 : -1), scale: 0.8,
    scrollTrigger: { trigger: el, start: 'top 90%', end: 'top 65%', scrub: 1 }
  });
});

// === APPS — CARDS SCALE UP FROM SMALL ===
gsap.utils.toArray('.app-card').forEach((el, i) => {
  gsap.from(el, {
    y: 100, opacity: 0, scale: 0.7, rotation: -2 + i * 2,
    scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 60%', scrub: 1 }
  });
});

// === EXPERIENCE — SLIDE FROM LEFT WITH STAGGER ===
gsap.utils.toArray('.exp-item').forEach((el, i) => {
  gsap.from(el, {
    x: -100, opacity: 0,
    scrollTrigger: { trigger: el, start: 'top 90%', end: 'top 70%', scrub: 1 }
  });
});

// === CONTACT — BIG TEXT SCALES ===
gsap.from('.contact-big', {
  scale: 0.3, opacity: 0, rotation: -5,
  scrollTrigger: { trigger: '.contact-big', start: 'top 90%', end: 'top 50%', scrub: 1 }
});

// === SECTION HEADERS ===
gsap.utils.toArray('.section-header').forEach(el => {
  gsap.from(el, {
    x: -60, opacity: 0,
    scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 65%', scrub: 1 }
  });
});

// === PARALLAX ORBS ===
gsap.to('.orb-1', { y: -300, rotation: 45, scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 2 } });
gsap.to('.orb-2', { y: 200, x: -100, rotation: -30, scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 3 } });
gsap.to('.orb-3', { y: -150, x: 80, scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 2.5 } });

// === GRID BG PARALLAX ===
gsap.to('.grid-bg', {
  backgroundPosition: '0px -200px',
  scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 1 }
});

// === COUNTER ANIMATION ===
document.querySelectorAll('[data-count]').forEach(el => {
  const target = parseInt(el.dataset.count);
  ScrollTrigger.create({
    trigger: el, start: 'top 85%',
    onEnter: () => {
      let obj = { val: 0 };
      gsap.to(obj, { val: target, duration: 2, ease: 'power2.out', onUpdate: () => { el.textContent = Math.round(obj.val); } });
    }, once: true
  });
});

// === NAV HIDE/SHOW ===
let lastY = 0;
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.style.transform = (window.scrollY > lastY && window.scrollY > 100) ? 'translateY(-100%)' : 'translateY(0)';
  lastY = window.scrollY;
});

// === MOUSE PARALLAX ON HERO ===
document.querySelector('.hero')?.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 40;
  const y = (e.clientY / window.innerHeight - 0.5) * 40;
  gsap.to('.hero-photo-wrap', { x: x * 0.3, y: y * 0.3, rotation: x * 0.03, duration: 1, ease: 'power2.out' });
  gsap.to('.float-el', { x: x * -0.5, y: y * -0.5, duration: 1.2, ease: 'power2.out' });
  gsap.to('.orb-1', { x: x * 1.5, y: y * 1.5, duration: 2 });
});

// === APP CARD GLOW ===
document.querySelectorAll('.app-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const glow = card.querySelector('.app-card-glow');
    if (glow) { glow.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(124,92,252,0.15) 0%, transparent 50%)`; glow.style.opacity = '1'; }
  });
  card.addEventListener('mouseleave', () => { card.querySelector('.app-card-glow').style.opacity = '0'; });
});

// === LANGUAGE ===
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
