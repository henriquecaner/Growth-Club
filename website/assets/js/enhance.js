// Growth Club — progressive enhancements (usability/delight layer).
// 1. Scroll reveal: marca seções/cards com [data-reveal] + stagger e revela
//    via IntersectionObserver. Estado escondido só existe com html.gc-js,
//    então sem JS (ou com prefers-reduced-motion) tudo fica visível.
// 2. Count-up: números de stats sobem de 0 ao valor real quando entram no
//    viewport (formatação pt-BR, sufixos <small> preservados).
// 3. Marquee: duplica a régua de logos da home pra loop infinito com pausa
//    no hover.
(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) return;

  document.documentElement.classList.add('gc-js');

  /* ---- 1 · Scroll reveal ------------------------------------------------ */
  const HEADS = [
    '.home-pillars-head', '.home-features-head', '.home-latest-head',
    '.home-manifesto-inner', '.home-meetup-inner', '.home-testimonials-head',
    '.home-people-head', '.home-roadmap-head', '.home-faq-head',
    '.home-eligibility-head', '.home-cta-inner', '.home-logos-label',
    '.footer-hero', '.footer-manifesto', '.sec-head',
  ];
  const GRIDS = [
    '.home-pillars-grid', '.home-features-grid', '.home-latest-grid',
    '.home-testimonials-grid', '.home-people-grid', '.home-roadmap-grid',
    '.home-eligibility-list', '.home-faq-list', '.footer-stats',
    '.problem-grid', '.cards-grid', '.home-meetup-stats',
  ];

  const tagged = [];
  const tag = (el, delay) => {
    el.setAttribute('data-reveal', '');
    if (delay) el.style.setProperty('--rd', `${delay}ms`);
    tagged.push(el);
  };

  document.querySelectorAll(HEADS.join(',')).forEach((el) => tag(el, 0));
  document.querySelectorAll(GRIDS.join(',')).forEach((grid) => {
    [...grid.children].forEach((child, i) => tag(child, Math.min(i, 7) * 70));
  });

  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -32px 0px' });
  tagged.forEach((el) => io.observe(el));

  /* ---- 2 · Count-up stats ------------------------------------------------ */
  const NUMS = '.home-stat-num, .home-meetup-num, .footer-stat-num, .stat .n';
  const counters = [];
  document.querySelectorAll(NUMS).forEach((el) => {
    const node = el.firstChild;
    if (!node || node.nodeType !== Node.TEXT_NODE) return;
    const raw = node.textContent.trim();
    const target = parseInt(raw.replace(/\./g, ''), 10);
    if (!Number.isFinite(target) || target <= 0) return;
    counters.push({ el, node, target, grouped: raw.includes('.') });
  });

  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  const runCounter = ({ node, target, grouped }) => {
    const dur = 1100;
    const t0 = performance.now();
    const fmt = (n) => (grouped ? n.toLocaleString('pt-BR') : String(n));
    const step = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      node.textContent = fmt(Math.round(easeOut(p) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const ioNum = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const c = counters.find((x) => x.el === entry.target);
      if (c) runCounter(c);
      ioNum.unobserve(entry.target);
    }
  }, { threshold: 0.6 });
  counters.forEach((c) => ioNum.observe(c.el));

  /* ---- 3 · Logos marquee -------------------------------------------------- */
  const row = document.querySelector('.home-logos-row');
  if (row && row.children.length > 4) {
    const marquee = document.createElement('div');
    marquee.className = 'home-logos-marquee';
    row.parentNode.insertBefore(marquee, row);
    marquee.appendChild(row);
    const clone = row.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    marquee.appendChild(clone);
  }
})();
