// === INTRO LOADER (no dependencies) ===
document.body.style.overflow = 'hidden';
var progress = 0;
var bar = document.getElementById('introBar');
var counter = document.getElementById('introCounter');
var intro = document.getElementById('intro');

var progressInterval = setInterval(function() {
  progress += Math.random() * 8 + 2;
  if (progress >= 100) {
    progress = 100;
    clearInterval(progressInterval);
    setTimeout(function() {
      intro.classList.add('done');
      document.body.style.overflow = '';
    }, 400);
  }
  bar.style.width = progress + '%';
  counter.textContent = Math.round(progress) + '%';
}, 80);

// === LANGUAGE ===
document.querySelectorAll('.lang-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var lang = btn.dataset.lang;
    document.querySelectorAll('.lang-btn').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    document.querySelectorAll('[data-en]').forEach(function(el) {
      el.innerHTML = el.getAttribute('data-' + lang) || el.getAttribute('data-en');
    });
  });
});

// === SMOOTH SCROLL ===
document.querySelectorAll('a[href^="#"]').forEach(function(a) {
  a.addEventListener('click', function(e) { e.preventDefault(); document.querySelector(a.getAttribute('href')).scrollIntoView({ behavior: 'smooth' }); });
});
