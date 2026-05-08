// === REVEAL ON SCROLL ===
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach((el, i) => {
  el.style.transitionDelay = (i % 5) * 0.1 + 's';
  observer.observe(el);
});

// === CURSOR GLOW ===
const glow = document.getElementById('cursorGlow');
if (window.matchMedia('(pointer: fine)').matches) {
  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
    glow.style.opacity = '1';
  });
  document.addEventListener('mouseleave', () => glow.style.opacity = '0');
}

// === HERO TEXT ANIMATION ===
document.addEventListener('DOMContentLoaded', () => {
  // Show all hero reveals immediately
  document.querySelectorAll('.hero .reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 300 + i * 150);
  });

  const lines = document.querySelectorAll('.hero-line');
  lines.forEach((line, i) => {
    line.style.opacity = '0';
    line.style.transform = 'translateY(60px) rotateX(-15deg)';
    line.style.transition = `all 1s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + i * 0.15}s`;
    setTimeout(() => {
      line.style.opacity = '1';
      line.style.transform = 'translateY(0) rotateX(0)';
    }, 50);
  });
});

// === PARALLAX ON SCROLL ===
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const hero = document.querySelector('.hero-content');
  if (hero && scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    hero.style.opacity = 1 - scrolled / (window.innerHeight * 0.8);
  }
});

// === MAGNETIC BUTTONS ===
document.querySelectorAll('.btn, .app-card').forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.1;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.1;
    el.style.transform = `translateY(-8px) translate(${x}px, ${y}px)`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = '';
  });
});

// === COUNTER ANIMATION ===
const statNumbers = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const text = el.textContent;
      const num = parseInt(text);
      if (!isNaN(num)) {
        let current = 0;
        const suffix = text.replace(/\d+/, '');
        const step = Math.ceil(num / 30);
        const interval = setInterval(() => {
          current += step;
          if (current >= num) { current = num; clearInterval(interval); }
          el.textContent = current + suffix;
        }, 30);
      }
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
statNumbers.forEach(el => counterObserver.observe(el));

// === TEXT SCRAMBLE FOR BRANDS ===
document.querySelectorAll('.brand').forEach(el => {
  const original = el.textContent;
  el.addEventListener('mouseenter', () => {
    let iterations = 0;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const interval = setInterval(() => {
      el.textContent = original.split('').map((c, i) => {
        if (i < iterations) return original[i];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join('');
      iterations += 1 / 2;
      if (iterations >= original.length) { el.textContent = original; clearInterval(interval); }
    }, 30);
  });
});

// === LANGUAGE SWITCH ===
let currentLang = 'en';
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    currentLang = btn.dataset.lang;
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('[data-en]').forEach(el => {
      const text = el.getAttribute(`data-${currentLang}`) || el.getAttribute('data-en');
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = text;
      else el.innerHTML = text;
    });
  });
});

// === SMOOTH NAV ===
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});
