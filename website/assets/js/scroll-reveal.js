// scroll-reveal.js — IntersectionObserver-based reveal-on-enter
// Aplica .is-revealed em sections quando entram no viewport.
// CSS pareado: .reveal-init {opacity:0; transform:translateY(28px)} → .is-revealed reset.
// Respeita prefers-reduced-motion.

(function () {
  if (typeof window === 'undefined') return;

  const SELECTOR = [
    '.problem',
    '.layers',
    '.timeline',
    '.manifesto-big',
    '.quote-section',
    '.cta-final',
    '.cta-inline',
    '.article',
    '.section'
  ].join(', ');

  function init() {
    const targets = document.querySelectorAll(SELECTOR);
    if (!targets.length) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      targets.forEach(function (t) { t.classList.add('is-revealed'); });
      return;
    }

    targets.forEach(function (t) { t.classList.add('reveal-init'); });

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    targets.forEach(function (t) { observer.observe(t); });

    // Force-reveal anything already above the fold (avoid flash if user lands mid-page)
    setTimeout(function () {
      targets.forEach(function (t) {
        const rect = t.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92) {
          t.classList.add('is-revealed');
        }
      });
    }, 50);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
