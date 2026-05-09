// === LOADER (dala-style: counter + text reveal + fade out) ===
(function() {
  var loader = document.getElementById('loader');
  var num = document.getElementById('loaderNum');
  var progress = 0;

  document.body.style.overflow = 'hidden';

  var interval = setInterval(function() {
    progress += Math.floor(Math.random() * 12) + 3;
    if (progress > 100) progress = 100;
    num.textContent = progress;

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(function() {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
      }, 600);
    }
  }, 60);
})();

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
  a.addEventListener('click', function(e) {
    e.preventDefault();
    var target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});
