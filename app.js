gsap.registerPlugin(ScrollTrigger);

// === HERO ENTRANCE ===
const chars = document.querySelectorAll('.char');
const tl = gsap.timeline({ delay: 0.5 });

// Characters fly in one by one
chars.forEach((char, i) => {
  tl.to(char, { y: 0, duration: 0.6, ease: 'power4.out' }, i * 0.04);
});

// Then other elements
tl.to('.hero-tag', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
  .to('.hero-roles', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
  .to('.hero-desc', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2')
  .to('.hero-cta', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2')
  .from('.hero-photo-wrap', { scale: 0.9, opacity: 0, duration: 1, ease: 'power3.out' }, 0.3)
  .from('.float-el', { scale: 0, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'back.out(3)' }, 0.8);

// Set initial states for animated elements
gsap.set('.hero-tag, .hero-roles, .hero-desc, .hero-cta', { y: 20 });

// === SCROLL ANIMATIONS ===
// Parallax orbs
gsap.to('.orb-1', { y: -150, scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 2 } });
gsap.to('.orb-2', { y: 100, x: -50, scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 3 } });

// Hero parallax
gsap.to('.hero-visual', { y: -100, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } });
gsap.to('.hero-content', { y: -50, opacity: 0, scrollTrigger: { trigger: '.hero', start: '60% top', end: 'bottom top', scrub: 1 } });

// Section reveals
gsap.utils.toArray('.section-header').forEach(el => {
  gsap.from(el, { x: -30, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
});

gsap.utils.toArray('.about-headline, .about-body, .stat-box').forEach((el, i) => {
  gsap.from(el, { y: 30, opacity: 0, duration: 0.7, delay: i * 0.05, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
});

gsap.utils.toArray('.app-row').forEach((el, i) => {
  gsap.from(el, { x: -40, opacity: 0, duration: 0.6, delay: i * 0.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
});

gsap.utils.toArray('.exp-item').forEach((el, i) => {
  gsap.from(el, { y: 20, opacity: 0, duration: 0.5, delay: i * 0.08, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
});

// Contact big text
gsap.from('.contact-big', {
  scale: 0.8, opacity: 0, duration: 1, ease: 'power3.out',
  scrollTrigger: { trigger: '.contact-big', start: 'top 80%' }
});

// === COUNTER ANIMATION ===
document.querySelectorAll('[data-count]').forEach(el => {
  const target = parseInt(el.dataset.count);
  ScrollTrigger.create({
    trigger: el, start: 'top 85%',
    onEnter: () => {
      let obj = { val: 0 };
      gsap.to(obj, {
        val: target, duration: 1.5, ease: 'power2.out',
        onUpdate: () => { el.textContent = Math.round(obj.val); }
      });
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
document.querySelector('.hero').addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  gsap.to('.hero-photo-wrap', { x: x * 0.5, y: y * 0.5, duration: 0.8, ease: 'power2.out' });
  gsap.to('.float-el', { x: x * -0.8, y: y * -0.8, duration: 1, ease: 'power2.out' });
  gsap.to('.orb-1', { x: x * 2, y: y * 2, duration: 2 });
});

// === APP ROW HOVER EFFECT ===
document.querySelectorAll('.app-row').forEach(row => {
  row.addEventListener('mouseenter', () => {
    gsap.to(row, { x: 8, duration: 0.3, ease: 'power2.out' });
  });
  row.addEventListener('mouseleave', () => {
    gsap.to(row, { x: 0, duration: 0.3, ease: 'power2.out' });
  });
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
