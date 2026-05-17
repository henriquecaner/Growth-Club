// Scrollspy genérico: destaca anchor item ativo no <nav> interno baseado em scroll position.
// Uso: <nav class="anchor-nav"><a href="#manifesto">Manifesto</a>...</nav>
//      <section id="manifesto">...</section>

(() => {
  const nav = document.querySelector('.anchor-nav');
  if (!nav) return;

  const links = [...nav.querySelectorAll('a[href^="#"]')];
  const sections = links
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  if (!sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach((a) => {
          a.toggleAttribute('aria-current', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-30% 0px -50% 0px', threshold: 0 });

  sections.forEach((s) => observer.observe(s));
})();
