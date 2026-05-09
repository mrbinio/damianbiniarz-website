gsap.registerPlugin(ScrollTrigger);

// === INTRO ANIMATION (like dala.craftedbygc.com) ===
const introWords = document.querySelectorAll('.intro-word');
const introTl = gsap.timeline({
  onComplete: () => {
    document.getElementById('intro').style.display = 'none';
    document.body.style.overflow = '';
  }
});

document.body.style.overflow = 'hidden';

introWords.forEach((word, i) => {
  introTl
    .to(word, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out' }, i * 0.8)
    .to(word, { opacity: 0, y: -30, scale: 1.1, duration: 0.4, ease: 'power2.in' }, i * 0.8 + 0.5);
});

// Final word stays longer then intro fades
introTl
  .to('.intro', { opacity: 0, duration: 0.6, ease: 'power2.inOut' }, '-=0.1');

// === ORB PARALLAX ===
gsap.to('.orb1', { y: -200, x: 100, scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 2 } });
gsap.to('.orb2', { y: 150, x: -80, scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 3 } });

// === SCROLL ANIMATIONS ===
// About
gsap.from('.about-photo', { x: -60, opacity: 0, duration: 1, scrollTrigger: { trigger: '.about-wrap', start: 'top 75%' } });
gsap.from('.about-info', { x: 60, opacity: 0, duration: 1, delay: 0.2, scrollTrigger: { trigger: '.about-wrap', start: 'top 75%' } });

// App cards
gsap.utils.toArray('.app-card').forEach((card, i) => {
  gsap.from(card, {
    y: 60, opacity: 0, scale: 0.95, rotation: -2 + i * 2,
    duration: 0.8, delay: i * 0.15,
    scrollTrigger: { trigger: card, start: 'top 85%' }
  });
});

// Experience items
gsap.utils.toArray('.exp').forEach((el, i) => {
  gsap.from(el, {
    x: -50, opacity: 0, duration: 0.6, delay: i * 0.1,
    scrollTrigger: { trigger: el, start: 'top 88%' }
  });
});

// Contact
gsap.from('.big-text', { scale: 0.7, opacity: 0, duration: 1, scrollTrigger: { trigger: '.big-text', start: 'top 80%' } });
gsap.from('.contact-btns', { y: 30, opacity: 0, duration: 0.6, delay: 0.3, scrollTrigger: { trigger: '.contact-btns', start: 'top 85%' } });

// Section labels
gsap.utils.toArray('.label').forEach(el => {
  gsap.from(el, { x: -30, opacity: 0, duration: 0.6, scrollTrigger: { trigger: el, start: 'top 85%' } });
});

// === COUNTERS ===
document.querySelectorAll('[data-count]').forEach(el => {
  const target = parseInt(el.dataset.count);
  ScrollTrigger.create({
    trigger: el, start: 'top 85%',
    onEnter: () => {
      let obj = { v: 0 };
      gsap.to(obj, { v: target, duration: 1.5, ease: 'power2.out', onUpdate: () => { el.textContent = Math.round(obj.v); } });
    }, once: true
  });
});

// === LANGUAGE ===
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.dataset.lang;
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('[data-en]').forEach(el => {
      el.innerHTML = el.getAttribute('data-' + lang) || el.getAttribute('data-en');
    });
  });
});

// === SMOOTH SCROLL ===
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => { e.preventDefault(); document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' }); });
});
