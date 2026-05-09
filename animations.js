gsap.registerPlugin(ScrollTrigger);

// Content shifts opposite to particles
var shiftAmount = window.innerWidth < 768 ? 40 : 100;
gsap.utils.toArray('.section .container').forEach(function(el, i) {
  gsap.to(el, {
    x: (i % 2 === 0) ? shiftAmount : -shiftAmount,
    scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 2 }
  });
});

// ORB PARALLAX
gsap.to('.orb1', { y: -200, x: 100, scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 2 } });
gsap.to('.orb2', { y: 150, x: -80, scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 3 } });

// About
gsap.from('.about-photo', { x: -60, opacity: 0, duration: 1, scrollTrigger: { trigger: '.about-wrap', start: 'top 75%' } });
gsap.from('.about-info', { x: 60, opacity: 0, duration: 1, delay: 0.2, scrollTrigger: { trigger: '.about-wrap', start: 'top 75%' } });

// App cards
gsap.utils.toArray('.app-card').forEach(function(card, i) {
  gsap.from(card, { y: 60, opacity: 0, scale: 0.95, rotation: -2 + i * 2, duration: 0.8, delay: i * 0.15, scrollTrigger: { trigger: card, start: 'top 85%' } });
});

// Experience
gsap.utils.toArray('.exp').forEach(function(el, i) {
  gsap.from(el, { x: -50, opacity: 0, duration: 0.6, delay: i * 0.1, scrollTrigger: { trigger: el, start: 'top 88%' } });
});

// Contact
gsap.from('.big-text', { scale: 0.7, opacity: 0, duration: 1, scrollTrigger: { trigger: '.big-text', start: 'top 80%' } });
gsap.from('.contact-btns', { y: 30, opacity: 0, duration: 0.6, delay: 0.3, scrollTrigger: { trigger: '.contact-btns', start: 'top 85%' } });

// Labels
gsap.utils.toArray('.label').forEach(function(el) {
  gsap.from(el, { x: -30, opacity: 0, duration: 0.6, scrollTrigger: { trigger: el, start: 'top 85%' } });
});

// Counters
document.querySelectorAll('[data-count]').forEach(function(el) {
  var target = parseInt(el.dataset.count);
  ScrollTrigger.create({
    trigger: el, start: 'top 85%',
    onEnter: function() {
      var obj = { v: 0 };
      gsap.to(obj, { v: target, duration: 1.5, ease: 'power2.out', onUpdate: function() { el.textContent = Math.round(obj.v); } });
    }, once: true
  });
});
