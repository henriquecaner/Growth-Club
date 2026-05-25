// Captura email do form .form-newsletter e redireciona pro Substack com email pré-preenchido.
// Uso: <form class="form-newsletter" data-substack-url="https://brgrowthclub.substack.com/subscribe">

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

document.addEventListener('submit', (e) => {
  const form = e.target.closest('.form-newsletter');
  if (!form) return;
  e.preventDefault();

  if (form.dataset.submitting === 'true') return;

  const emailInput = form.querySelector('input[type="email"]');
  const optIn = form.querySelector('input[type="checkbox"][name="lgpd-opt-in"]');
  const subUrl = form.dataset.substackUrl || 'https://brgrowthclub.substack.com/subscribe';

  const email = (emailInput?.value || '').trim();
  if (!email || !EMAIL_RE.test(email)) {
    emailInput?.focus();
    emailInput?.reportValidity?.();
    return;
  }
  if (optIn && !optIn.checked) {
    alert('Marca o opt-in pra continuar — sem permissão, não te mandamos email.');
    return;
  }

  form.dataset.submitting = 'true';
  const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
  if (submitBtn) submitBtn.disabled = true;

  const url = new URL(subUrl);
  url.searchParams.set('email', email);
  url.searchParams.set('utm_source', 'site');
  url.searchParams.set('utm_medium', 'form');
  window.location.href = url.toString();
});
