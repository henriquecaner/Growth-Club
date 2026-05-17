// Renderiza a seção 7 da home com base em slot-dinamico.json
// Se há meetup com data ≤60 dias do hoje, mostra meetup. Senão, mostra livecast.

(async () => {
  const slot = document.querySelector('#slot-dinamico');
  if (!slot) return;

  try {
    const res = await fetch('/assets/data/slot-dinamico.json');
    const data = await res.json();

    const hoje = new Date();
    const meetupData = new Date(data.meetup.data_iso);
    const diffDias = Math.ceil((meetupData - hoje) / (1000 * 60 * 60 * 24));

    if (data.mode === 'meetup' && diffDias >= 0 && diffDias <= 60) {
      slot.innerHTML = `
        <div class="container">
          <p class="subgroup-label">Próximo meetup</p>
          <h2>${data.meetup.nome_canonico}</h2>
          <p><strong>${data.meetup.data_display}</strong> · ${data.meetup.local}</p>
          <a href="${data.meetup.cta_url}" class="btn btn-primary btn-lg">${data.meetup.cta_label}</a>
        </div>
      `;
    } else {
      slot.innerHTML = `
        <div class="container">
          <p class="subgroup-label">Último livecast</p>
          <h2>${data.livecast_fallback.titulo}</h2>
          <p>${data.livecast_fallback.duracao}</p>
          <a href="${data.livecast_fallback.url}" class="btn btn-secondary" target="_blank" rel="noopener">Assistir</a>
        </div>
      `;
    }
  } catch (err) {
    slot.style.display = 'none';
    console.warn('Slot dinâmico falhou:', err);
  }
})();
