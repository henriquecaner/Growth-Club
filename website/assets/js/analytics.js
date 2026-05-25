/**
 * Growth Club — analytics dataLayer
 *
 * Boot do window.dataLayer + helper gcTrack() pra publicar eventos
 * padronizados. Não dispara pixels diretamente — só popula o
 * dataLayer pra GTM (ou outras ferramentas) consumirem via tags.
 *
 * ============================================================
 * EVENTOS PUBLICADOS
 * ============================================================
 *
 * gc_lead_capture            — Hero form submit (early intent)
 *   { event, timestamp, source, email_sha256 }
 *   → Meta: Lead (com email matching)
 *   → Google Ads: generate_lead conversion
 *
 * gc_wizard_step             — Cada step do wizard /membro fica ativo
 *   { event, timestamp, step_number (1|2|3), step_name }
 *   → Funnel analytics (GA4 / Mixpanel / etc)
 *
 * gc_signup_attempt          — Submit do wizard (antes da resposta)
 *   { event, timestamp, email_sha256 }
 *   → Intent signal (analytics interno)
 *
 * gc_signup_success          — /api/apply retornou 200
 *   { event, timestamp, email_sha256, mode (created|updated) }
 *   → Meta: CompleteRegistration
 *   → Google Ads: sign_up conversion
 *
 * gc_signup_error            — /api/apply retornou erro
 *   { event, timestamp, error_code }
 *   → Health monitoring (NÃO mandar pra ad platforms — só interno)
 *
 * ============================================================
 * INTEGRAÇÃO FUTURA (não implementada ainda)
 * ============================================================
 *
 * Passos quando for plugar Meta Pixel / Google Ads / GTM:
 *
 * 1. Adicionar GTM container script no <head> de todas as pages.
 * 2. Criar tags no GTM consumindo os events acima:
 *    - "Meta Pixel - Lead"        trigger: gc_lead_capture
 *    - "Meta Pixel - Registration" trigger: gc_signup_success
 *    - "Google Ads - generate_lead" trigger: gc_lead_capture
 *    - "Google Ads - sign_up"       trigger: gc_signup_success
 * 3. Configurar Advanced Matching com {{email_sha256}} variable.
 *
 * Email é SEMPRE enviado como SHA-256 hash (PII protection).
 * Raw email nunca entra no dataLayer.
 */

(function () {
  // Boot dataLayer se ainda não existir (compat com GTM já instalado)
  window.dataLayer = window.dataLayer || [];

  /**
   * Hash SHA-256 de string (formato hex lowercase, compat com Meta/Google).
   * Retorna string vazia se Web Crypto falhar.
   */
  async function sha256Hex(input) {
    const str = (typeof input === 'string' ? input : '').trim().toLowerCase();
    if (!str) return '';
    try {
      const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
      return Array.from(new Uint8Array(buf))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
    } catch {
      return '';
    }
  }

  /**
   * Mapping de custom events Growth Club → standard events Meta + GA4.
   * Permite que pixels já instalados (gtag, fbq) capturem conversões
   * sem GTM intermediário. GTM, se instalado depois, continua funcionando
   * via dataLayer event listener.
   */
  const STANDARD_EVENT_MAP = {
    gc_lead_capture: {
      ga4: 'generate_lead',   // GA4 recommended event
      meta: 'Lead',            // Meta standard event
    },
    gc_signup_attempt: {
      ga4: 'begin_checkout',   // GA4 — funnel intent
      meta: 'InitiateCheckout',
    },
    gc_signup_success: {
      ga4: 'sign_up',
      meta: 'CompleteRegistration',
    },
    // gc_wizard_step e gc_signup_error ficam só no dataLayer (analytics interno)
  };

  /**
   * Publica evento no dataLayer.
   * Se params.email estiver presente, é hasheado pra email_sha256 e
   * o raw é removido antes do push.
   * Também forwarda pra gtag (GA4) e fbq (Meta Pixel) se carregados.
   */
  async function gcTrack(eventName, params = {}) {
    const payload = {
      event: eventName,
      timestamp: new Date().toISOString(),
      ...params,
    };
    if (params.email) {
      payload.email_sha256 = await sha256Hex(params.email);
      delete payload.email;
    }
    window.dataLayer.push(payload);

    // Forward pra plataformas de ads (standard events)
    const mapping = STANDARD_EVENT_MAP[eventName];
    if (mapping) {
      const eventParams = { ...payload };
      delete eventParams.event;
      delete eventParams.timestamp;

      // GA4 via gtag — se carregado
      if (typeof window.gtag === 'function' && mapping.ga4) {
        try { window.gtag('event', mapping.ga4, eventParams); } catch {}
      }

      // Meta Pixel via fbq — se carregado
      if (typeof window.fbq === 'function' && mapping.meta) {
        const fbParams = {};
        if (payload.source) fbParams.content_name = payload.source;
        if (payload.mode) fbParams.content_category = payload.mode;
        try { window.fbq('track', mapping.meta, fbParams); } catch {}
      }
    }

    // Debug em local/preview (não polui console em prod)
    const host = location.hostname;
    if (host === 'localhost' || host === '127.0.0.1' || host.endsWith('.pages.dev')) {
      console.log('[gc-track]', payload, mapping ? `→ ga4:${mapping.ga4} + fb:${mapping.meta}` : '');
    }
  }

  // Expose globalmente
  window.gcTrack = gcTrack;
  window.gcSha256 = sha256Hex;
})();
