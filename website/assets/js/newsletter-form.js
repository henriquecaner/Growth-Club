// Captura email do form .form-newsletter e redireciona pro Substack com email pré-preenchido.
// Uso: <form class="form-newsletter" data-substack-url="https://growthclub.substack.com/subscribe">

document.addEventListener('submit', (e) => {
  const form = e.target.closest('.form-newsletter');
  if (!form) return;
  e.preventDefault();

  const emailInput = form.querySelector('input[type="email"]');
  const optIn = form.querySelector('input[type="checkbox"][name="lgpd-opt-in"]');
  const subUrl = form.dataset.substackUrl || 'https://growthclub.substack.com/subscribe';

  const email = (emailInput?.value || '').trim();
  if (!email) { emailInput?.focus(); return; }
  if (optIn && !optIn.checked) {
    alert('Marca o opt-in pra continuar — sem permissão, não te mandamos email.');
    return;
  }

  const url = new URL(subUrl);
  url.searchParams.set('email', email);
  url.searchParams.set('utm_source', 'site');
  url.searchParams.set('utm_medium', 'form');
  window.location.href = url.toString();
});
