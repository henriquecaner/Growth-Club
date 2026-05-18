// Renderiza a seção 7 da home com base em slot-dinamico.json
// Se há meetup com data ≤60 dias do hoje, mostra meetup. Senão, mostra livecast.

(async () => {
  const slot = document.querySelector('#slot-dinamico');
  if (!slot) return;

  try {
    const res = await fetch('/assets/data/slot-dinamico.json');
    if (!res.ok) throw new Error(`Slot data HTTP ${res.status}`);
    const data = await res.json();

    // Fuso horário explícito para evitar drift UTC vs local na comparação de datas.
    // data_iso em YYYY-MM-DD é parseado como UTC pelo Date, mas "hoje" é local.
    // Normalizamos ambos para meia-noite UTC do dia em questão.
    const hoje = new Date();
    const hojeUtc = Date.UTC(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
    const [y, m, d] = String(data.meetup.data_iso).split('-').map(Number);
    const meetupUtc = Date.UTC(y, (m || 1) - 1, d || 1);
    const diffDias = Math.round((meetupUtc - hojeUtc) / (1000 * 60 * 60 * 24));

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
  }
})();
