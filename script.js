(function(){
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  var update;
  if (reduce) {
    update = function(){
      reveals.forEach(function(el){ el.classList.add('is-visible'); });
    };
  } else {
    var ticking = false;
    update = function(){
      ticking = false;
      var vh = window.innerHeight || document.documentElement.clientHeight;
      for (var i = reveals.length - 1; i >= 0; i--) {
        var el = reveals[i];
        if (el.offsetParent === null) continue;
        if (el.getBoundingClientRect().top < vh - 40) {
          el.classList.add('is-visible');
          reveals.splice(i, 1);
        }
      }
    };
    var onScroll = function(){
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
  }
  update();

  var start = document.getElementById('start');
  var openBtn = document.getElementById('open');
  var peekBtn = document.getElementById('peek');
  var song = document.getElementById('song');
  var opened = false;

  function fireConfetti(){
    if (reduce || typeof window.confetti !== 'function') return;
    var colors = ['#f4d3dc','#e0708d','#c34a6b','#ffd1dc','#ff9eb5'];
    window.confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 }, colors: colors, disableForReducedMotion: true });
    window.setTimeout(function(){
      window.confetti({ particleCount: 70, angle: 60, spread: 70, origin: { x: 0 }, colors: colors, disableForReducedMotion: true });
      window.confetti({ particleCount: 70, angle: 120, spread: 70, origin: { x: 1 }, colors: colors, disableForReducedMotion: true });
    }, 250);
  }

  openBtn.addEventListener('click', function(){
    if (opened) return;
    opened = true;

    if (song) {
      song.volume = 0.6;
      var playing = song.play();
      if (playing && playing.catch) playing.catch(function(){});
    }

    fireConfetti();
    start.classList.add('is-hidden');
    document.body.classList.remove('locked');
    window.setTimeout(function(){ start.style.display = 'none'; }, reduce ? 0 : 700);
  });

  if (peekBtn) {
    peekBtn.addEventListener('click', function(){
      document.body.classList.add('content-open');
      document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('is-visible'); });
      reveals.length = 0;
      var target = document.querySelector('.invite');
      if (!target) return;
      var top = target.getBoundingClientRect().top + window.pageYOffset;
      if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo({ top: top, behavior: reduce ? 'auto' : 'smooth' });
      } else {
        window.scrollTo(0, top);
      }
    });
  }
})();
