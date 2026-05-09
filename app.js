gsap.registerPlugin(ScrollTrigger);

// === INTRO ANIMATION ===
const introTl = gsap.timeline();
introTl
  .to('.intro-line', { y: 0, duration: 0.8, stagger: 0.1, ease: 'power4.out', delay: 0.2 })
  .to('.intro-line', { y: -110, duration: 0.6, stagger: 0.05, ease: 'power3.in', delay: 0.4 })
  .to('.intro', { yPercent: -100, duration: 0.8, ease: 'power4.inOut' })
  .set('.intro', { display: 'none' })
  .add(() => animateHero());

// === HERO ENTRANCE ===
function animateHero() {
  const heroTl = gsap.timeline();

  // Chars fly in
  heroTl.to('.char', {
    y: 0, duration: 0.8, stagger: 0.03, ease: 'power4.out'
  })
  .to('.hero-tag', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
  .to('.hero-roles', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
  .to('.hero-desc', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2')
  .to('.hero-cta', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2')
  .from('.hero-photo-wrap', {
    clipPath: 'inset(100% 0% 0% 0%)', duration: 1.2, ease: 'power4.out'
  }, 0.2)
  .from('.float-el', { scale: 0, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'back.out(3)' }, 0.8)
  .from('.photo-border', { scale: 1.3, opacity: 0, duration: 1, ease: 'power3.out' }, 0.6);
}

gsap.set('.hero-tag, .hero-roles, .hero-desc, .hero-cta', { y: 20 });
gsap.set('.hero-photo-wrap', { clipPath: 'inset(100% 0% 0% 0%)' });

// === SCROLL PARALLAX ===
gsap.to('.orb-1', { y: -200, rotation: 20, scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 2 } });
gsap.to('.orb-2', { y: 150, x: -80, scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 3 } });
gsap.to('.orb-3', { y: -100, x: 60, scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 2.5 } });

// Hero fades out on scroll
gsap.to('.hero-content', { y: -80, opacity: 0, scrollTrigger: { trigger: '.hero', start: '50% top', end: 'bottom top', scrub: 1 } });
gsap.to('.hero-visual', { y: -120, scale: 0.9, scrollTrigger: { trigger: '.hero', start: '40% top', end: 'bottom top', scrub: 1 } });

// === SECTION ANIMATIONS ===
gsap.utils.toArray('.section-header').forEach(el => {
  const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 85%' } });
  tl.from(el.querySelector('.section-num'), { x: -20, opacity: 0, duration: 0.5 })
    .from(el.querySelector('.section-line'), { scaleX: 0, duration: 0.4, transformOrigin: 'left' }, '-=0.2')
    .from(el.querySelector('.section-title'), { x: -20, opacity: 0, duration: 0.5 }, '-=0.2');
});

gsap.utils.toArray('.about-headline, .about-body').forEach(el => {
  gsap.from(el, { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
});

gsap.utils.toArray('.stat-box').forEach((el, i) => {
  gsap.from(el, { y: 50, opacity: 0, rotation: 3, duration: 0.7, delay: i * 0.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
});

gsap.utils.toArray('.app-card').forEach((el, i) => {
  gsap.from(el, { y: 60, opacity: 0, scale: 0.95, duration: 0.8, delay: i * 0.12, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
});

gsap.utils.toArray('.exp-item').forEach((el, i) => {
  gsap.from(el, { x: -50, opacity: 0, duration: 0.6, delay: i * 0.08, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
});

// Contact big text scale
gsap.from('.contact-big', {
  scale: 0.5, opacity: 0, duration: 1.2, ease: 'power3.out',
  scrollTrigger: { trigger: '.contact-big', start: 'top 85%' }
});

gsap.utils.toArray('.c-link').forEach((el, i) => {
  gsap.from(el, { y: 30, opacity: 0, duration: 0.5, delay: 0.3 + i * 0.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
});

// Marquee speed on scroll
gsap.to('.marquee-track', { x: '-=300', scrollTrigger: { trigger: '.marquee', start: 'top bottom', end: 'bottom top', scrub: 2 } });

// === COUNTER ANIMATION ===
document.querySelectorAll('[data-count]').forEach(el => {
  const target = parseInt(el.dataset.count);
  ScrollTrigger.create({
    trigger: el, start: 'top 85%',
    onEnter: () => {
      let obj = { val: 0 };
      gsap.to(obj, {
        val: target, duration: 2, ease: 'power2.out',
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
document.querySelector('.hero')?.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;
  gsap.to('.hero-photo-wrap', { x: x * 0.4, y: y * 0.4, rotation: x * 0.05, duration: 1, ease: 'power2.out' });
  gsap.to('.float-el', { x: x * -0.6, y: y * -0.6, duration: 1.2, ease: 'power2.out' });
});

// === APP CARD GLOW ===
document.querySelectorAll('.app-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const glow = card.querySelector('.app-card-glow');
    if (glow) glow.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(124,92,252,0.15) 0%, transparent 50%)`;
    glow.style.opacity = '1';
  });
  card.addEventListener('mouseleave', () => {
    card.querySelector('.app-card-glow').style.opacity = '0';
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
