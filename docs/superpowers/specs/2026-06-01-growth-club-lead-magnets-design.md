# Design Spec — Growth Club Lead Magnets (sub-projeto A+B)

**Data:** 2026-06-01
**Status:** Aprovado (design) — aguardando revisão do spec antes do plano de implementação
**Autor:** Henrique + Claude (brainstorming)
**Origem:** Master prompt "LinkedIn-Gated Lead Magnet System" (pasted brief), decomposto e recortado nesta sessão.

---

## 0. Contexto e decisões desta sessão

O brief original descreve um sistema completo de captura de lead com 4 subsistemas. Foi decomposto e recortado:

| # | Subsistema | Status |
|---|------------|--------|
| **A** | Landing pages via Notion-CMS + SEO | **NESTE SPEC** |
| **B** | LinkedIn OAuth + form HubSpot + download gated | **NESTE SPEC** |
| C | 3× Conversion APIs (Meta/Google/LinkedIn, pixel+server, dedup) | **Adiado** — spec próprio quando houver dado pra justificar |
| D | Webhook HubSpot → Notion mirror (Membros DB) | **Adiado** — spec próprio; direção já decidida (ver §2) |

**Decisões travadas nesta sessão (entram como ADRs no `STATE.md` no post-execution sync):**

1. **HubSpot = fonte da verdade** (contato, atribuição, ledger de transações). Adotado como CRM pago.
2. **Tally sai da captura.** HubSpot vira escritor único da Membros DB (via mirror D, futuro). `scripts/notion-reimport.py` passa a ser migração one-shot do histórico, não pipeline contínuo.
3. **Camada C (remarketing) adiada.** Sem pixels/CAPI/hashing PII/`event_id`/ad-cookies nesta rodada. Coerência com posicionamento privacy-first; reabre como sub-projeto com dados na mão.
4. **Stack: Cloudflare Pages + Functions vanilla.** Zero build step. Alinhado ao site v1 e ao AI LIKE A PRO (AD-009). NÃO Next.js.
5. **Sessão via cookie httpOnly assinado** (HMAC Web Crypto). Sem KV — state, nonce e sessão lead-in-progress cabem em cookies assinados.
6. **Repo novo e separado:** `growth-club-lead-magnets`.

**Não-violação de escopo:** o `STACK.md` lista "auth/login interno" e "SaaS proprietário" como fora de escopo **do site institucional v1**. Este é um sub-projeto separado (precedente AI LIKE A PRO: repo próprio, stack própria). A decisão fica registrada via ADR, não infringe a v1.

---

## 1. Objetivo

Capturar leads ricos e consent-backed a partir de tráfego que chega majoritariamente pelo in-app browser mobile do LinkedIn. O LinkedIn OAuth é a **primeira ação obrigatória**; em seguida um form HubSpot embedado (pré-preenchido com os dados do LinkedIn) cria/atualiza o contato no HubSpot e libera o material gated.

Meta de qualidade: mobile-first, first-paint rápido, OAuth e embed confiáveis dentro do webview do LinkedIn.

---

## 2. System-of-record (governa o modelo de dados)

- **HubSpot = fonte da verdade** da pessoa (contato), atribuição/origem (tracking code + `hutk`) e transações (futuro). O form nativo + tracking code do HubSpot é o enriquecedor e o motor de atribuição — não reconstruímos isso.
- **Notion Membros DB (`36789cac-40bd-80d7-a900-fa0939b4d953`) = diretório de comunidade / ops.** Espelho read-only do HubSpot. **Não é tocada neste spec** (mirror D é futuro). Não guarda ledger de transações.
- **Notion Content DB (nova, ver §3) = CMS das landing pages.** É a única DB lida neste spec.
- **Regra de ouro:** um campo = um dono = uma direção de sync. Nunca two-way no mesmo campo.

**Nesta rodada o app só escreve no HubSpot.** Notion é read-only (Content DB). Membros DB intocada.

---

## 3. Notion Content DB (CMS — nova, a criar)

DB nova (não existe ainda). Busca por `slug`. Propriedades:

| Propriedade | Tipo | Uso |
|-------------|------|-----|
| `Title` | Title | Heading principal |
| `Slug` | Rich Text | Path da URL, ex. `guia-definitivo-linkedin` |
| `Meta Title` | Rich Text | SEO title |
| `Meta Description` | Rich Text | SEO description |
| `Cover Image` | Files & Media | Hero/mockup do lead magnet |
| `Rich Content` | Page blocks | Descrição profunda; renderiza children |
| `HubSpot Form GUID` | Rich Text | **O form embedado desta landing** |
| `Download URL` ou `Download File` | URL / Files | Material gated no thank-you |
| `Status` | Select/Checkbox | Só `Published` é servível; senão 404 |

`lib/notion.js` busca por slug, confirma `Published`, parseia blocks (headings, parágrafos, listas, imagens, callouts, bold/italic/links) em HTML, e retorna objeto tipado incluindo o Form GUID. Cache de borda (Cache API) pra não bater no Notion por request.

---

## 4. Roteamento (Cloudflare Pages Functions, file-based)

| Rota | Arquivo | Propósito |
|------|---------|-----------|
| `GET /[slug]` | `functions/[slug].js` | Render da landing (Notion Content DB) + meta SEO + tracking code HubSpot |
| `GET /api/auth/linkedin` | `functions/api/auth/linkedin.js` | Monta auth URL (state+nonce no cookie assinado) → 302 |
| `GET /api/auth/callback` | `functions/api/auth/callback.js` | Verifica state → troca code → userinfo → cria sessão lead-in-progress → redirect `/[slug]?step=form` |
| `GET /download/[slug]` | `functions/download/[slug].js` | Thank-you/download — guard de sessão server-side; revela material |

---

## 5. LinkedIn OAuth 2.0 (OIDC) — primeira ação obrigatória

1. **Authorize:** redirect pra `https://www.linkedin.com/oauth/v2/authorization` com `response_type=code`, `client_id`, `redirect_uri`, `scope=openid profile email`, `state` (CSRF) + `nonce` (OIDC) aleatórios guardados em cookie assinado. Persistir landing URL original + UTMs no round-trip.
2. **Callback:** verificar `state`, trocar `code` em `https://www.linkedin.com/oauth/v2/accessToken`, chamar userinfo `https://api.linkedin.com/v2/userinfo` → `sub`, `given_name`, `family_name`, `name`, `email`, `email_verified`, `picture`, `locale`.
3. **Stash:** gravar na sessão lead-in-progress (cookie assinado, ver §6). NÃO criar contato ainda — o form HubSpot faz isso no submit. Redirect de volta pro `/[slug]?step=form`.
4. **Erros:** consent negado, `state` inválido/expirado, falha de token, email ausente → UI de retry amigável, nunca stack trace.

> ⚠️ **Verdade dura nº 1:** OIDC retorna SÓ `sub`, name, email, picture, locale. Sem DOB, telefone, endereço. Extras se coletam no form HubSpot. Geo (city/state/country) vem do edge do Cloudflare.

---

## 6. Sessão (cookie assinado, sem KV)

- Cookie httpOnly + Secure + SameSite=Lax, assinado com HMAC-SHA256 (`SESSION_SIGNING_SECRET`) via Web Crypto (`crypto.subtle`). Node `crypto` indisponível no Edge.
- Payload da sessão lead-in-progress: `sub`, `name`, `given_name`, `family_name`, `email`, `picture`, `slug`, `utms`, `geo {city,state,country}`, `ts`. TTL ~30 min.
- `state`/`nonce` do OAuth: cookie assinado curto, separado, consumido no callback.
- Server-side sempre revalida identidade lendo/verificando o cookie. Nunca confiar no cliente.

---

## 7. Form HubSpot — captura, prefill, enriquecimento

> ⚠️ **Verdade dura nº 2:** não existe prefill nativo LinkedIn→HubSpot. Depois do OAuth, os dados do LinkedIn vivem no NOSSO app. Injetamos no form via `onFormReady`.

**Setup da página**
- Tracking code do HubSpot em toda página (`hutk` first-party na nossa origem → atribuição funciona).
- Forms script + `hbspt.forms.create({ portalId: HUBSPOT_PORTAL_ID, formId: <GUID da Content DB>, target: '#hs-form', onFormReady, onFormSubmitted })`. O `HUBSPOT_PORTAL_ID` (público por natureza) é injetado pelo server na página — sem convenção `NEXT_PUBLIC_` (stack vanilla, não Next.js). **JS embed, não iframe** (iframe + cookies de terceiros são instáveis no webview do LinkedIn).

**`onFormReady(form)` — prefill + enriquecimento**
- Campos visíveis da sessão LinkedIn: `firstname`, `lastname`, `email`.
- Hidden fields (devem existir antes como custom contact properties no HubSpot):
  - `linkedin_sub` (o `sub` OIDC, id único estável)
  - `linkedin_picture_url`
  - `geo_city`, `geo_state`, `geo_country` (do `request.cf`, passados do server pra página)
  - `utm_source/medium/campaign/content/term`
  - `lead_magnet_slug`
- Consentimento (LGPD/GDPR) = campo nativo do form HubSpot.
- **Fora desta rodada (camada C):** `event_id`, `fbp`, `fbc`, `gclid`, `li_fat_id`, hashing PII.

**Como o cliente recebe os dados da sessão pro prefill:** o server (`functions/[slug].js`) lê a sessão e injeta os campos não-sensíveis num bloco JSON inline (ou data-attribute) na página; `public/js/landing.js` consome no `onFormReady`. Picture URL e sub são ok pra ir pro cliente (vão pro HubSpot mesmo).

**`onFormSubmitted` — handoff**
- Redirect pra `/download/[slug]`.
- (Disparo de conversões = camada C, adiada.)

**Por que basta:** HubSpot cria/atualiza o contato nativamente, dedup por email do lado dele, captura origem/first-touch via tracking code + `hutk`, e guarda os hidden fields como propriedades. Não construímos integração de escrita de contato.

**Fallback (só se controle visual virar bloqueio):** form custom submetendo pra Forms Submission API (`https://api.hsforms.com/submissions/v3/integration/submit/{portalId}/{formGuid}`), passando `hutk` + `pageUri`/`pageName` no `context`. Mais trabalho; default é o JS embed.

---

## 8. Thank-you / download (`/download/[slug]`)

Function valida a sessão lead-in-progress server-side. Se válida → renderiza sucesso + material (`Download URL`/`Download File` da Content DB). Se inválida → caminho gracioso "sessão expirou, reconecte". Visitante que nunca autenticou+submeteu não vê o material.

---

## 9. Frontend UI/UX & performance (mobile-first)

Otimizado pro in-app browser do LinkedIn.
- **Hero:** `Title` do Notion, subtítulo, header minimalista.
- **Hook / valor:** proposta de valor afiada, prova social.
- **Asset visual:** `Cover Image` com shadow/border moderno, responsivo, lazy-loaded.
- **Descrição rica:** `Rich Content` do Notion renderizado.
- **CTA sticky:** flutuante, alto-contraste, "Baixar Material com o LinkedIn" + ícone oficial; tap target grande; estado de loading durante o redirect do OAuth.
- **Form step:** embed HubSpot estilizado via CSS pra casar com a marca; transição suave CTA → form.
- Tokens do Growth Club Design System (AD-008) reaproveitados. First-paint JS mínimo; HubSpot/scripts deferidos.

---

## 10. SEO

`functions/[slug].js` injeta `<title>`, description e OG/Twitter a partir de `Meta Title`, `Meta Description`, `Cover Image` da Content DB.

---

## 11. Componentes isolados (`lib/`)

Cada um com propósito único, interface clara, testável sozinho:

- `lib/notion.js` — `getPageBySlug(slug)`: fetch + check Published + parser de blocks + retorno tipado com Form GUID; cache.
- `lib/session.js` — `signCookie`/`verifyCookie` (HMAC), `createLeadSession`, `readLeadSession`.
- `lib/geo.js` — `readGeo(request)` lê `request.cf.{city,region,country}`.
- `lib/render.js` — templating HTML leve + injeção de meta SEO.

---

## 12. Erros & confiabilidade

Captura (HubSpot), render (Notion) e guard de download são desacoplados — um falhar não derruba os outros. Notion fora → fallback de cache. Form HubSpot não carrega → mensagem + retry. Log de falhas sem PII/secrets. Nunca perder lead por erro de UI.

---

## 13. Segurança & privacidade

- Verificar OAuth `state`; validar `nonce`; cookie assinado httpOnly + Secure + SameSite.
- Consentimento (campo nativo HubSpot) é capturado no form. (Gating de pixels = camada C, adiada — sem pixels nesta rodada.)
- LGPD-aware: copy de consentimento clara, link de política de privacidade, orientação de retenção no README.
- Rate-limit nos endpoints; validar/sanitizar inputs.
- Sem secrets/PII no bundle do cliente ou em logs. Tudo no Edge runtime do Cloudflare Pages.
- Secrets via env / Cloudflare secrets. `.env.example` completo.

---

## 14. Estrutura de arquivos

```
growth-club-lead-magnets/
├── functions/
│   ├── [slug].js                 # landing render (Notion + SEO + HubSpot tracking)
│   ├── download/[slug].js        # thank-you/download guarded
│   └── api/auth/
│       ├── linkedin.js           # build auth URL + state/nonce
│       └── callback.js           # exchange + userinfo + session
├── public/
│   ├── css/                      # tokens do Growth Club Design System
│   └── js/landing.js             # carrega form HubSpot, prefill, onFormSubmitted→redirect
├── lib/  notion.js · session.js · geo.js · render.js
├── wrangler.toml                 # vars (sem KV binding)
├── .env.example
└── README.md
```

---

## 15. Variáveis de ambiente (`.env.example`)

```
# Notion
NOTION_API_KEY=
NOTION_CONTENT_DB_ID=

# LinkedIn OAuth (OIDC)
LINKEDIN_CLIENT_ID=
LINKEDIN_CLIENT_SECRET=
LINKEDIN_REDIRECT_URI=

# App / sessão
APP_BASE_URL=
SESSION_SIGNING_SECRET=

# HubSpot
HUBSPOT_PORTAL_ID=                # público; injetado pelo server na página (sem prefixo NEXT_PUBLIC_ — stack vanilla)
# (form GUID é por-landing e vem do Notion, não do env)
```

> Fora desta rodada (entram quando C/D forem speccados): `HUBSPOT_PRIVATE_APP_TOKEN`, `HUBSPOT_WEBHOOK_SECRET`, `NOTION_MEMBROS_DB_ID`, e todas as credenciais Meta/Google/LinkedIn de tracking.

---

## 16. Dependências de setup externo (não bloqueiam o spec, bloqueiam o deploy)

- **LinkedIn:** app de dev com produto "Sign In with LinkedIn using OpenID Connect" (precisa aprovação da plataforma) + redirect URI registrada.
- **HubSpot:** portal ativo; criar custom contact properties (`linkedin_sub`, `linkedin_picture_url`, `geo_city`, `geo_state`, `geo_country`, `lead_magnet_slug`); montar o(s) form(s) e pegar o GUID; instalar tracking code.
- **Notion:** criar a Content DB com o schema §3; integração com `NOTION_API_KEY` válida (a token do MCP atual está inválida).
- **Cloudflare:** novo projeto Pages + secrets configurados.

---

## 17. Critérios de aceite (A+B)

- [ ] `GET /[slug]` renderiza conteúdo `Published` do Notion + carrega tracking code HubSpot; não-publicado/inexistente → 404.
- [ ] "Conectar com LinkedIn" é a primeira ação obrigatória; OAuth completa no Edge e retorna name/email/picture/sub.
- [ ] Na mesma página, o form HubSpot (GUID da Content DB) carrega via JS embed; name/email pré-preenchidos; hidden fields populados com `linkedin_sub`, geo, UTMs, `lead_magnet_slug`.
- [ ] HubSpot cria/atualiza o contato com atribuição + enriquecimento; consentimento capturado nativamente.
- [ ] `onFormSubmitted` redireciona pra `/download/[slug]` (guarded) e revela o material.
- [ ] Guard server-side: quem nunca autenticou+submeteu não vê o material.
- [ ] Nada escreve no Notion (Content DB read-only; Membros DB intocada).
- [ ] Sem secrets/PII no bundle do cliente ou em logs; tudo roda no Edge runtime do Cloudflare Pages.

---

## 18. Fora de escopo (explícito)

- Camada C (Meta/Google/LinkedIn pixels + CAPI + dedup + hashing PII).
- Mirror D (webhook HubSpot → Notion Membros).
- Two-way sync de qualquer campo.
- Multi-idioma (v1 só PT-BR).
- Plataforma de aulas / gating fora do download simples.

---

## 19. Próximos specs (sequência)

1. **D** — Webhook HubSpot → Notion Membros mirror (tier + summary read-only; matching por `HubSpot Contact ID` ↔ `Notion Page ID`; dedup idempotente).
2. **C** — Conversion tracking (Meta/Google/LinkedIn, pixel+server, dedup via `event_id`, consent-gated) — quando houver volume pra justificar.
3. **Migração** — `notion-reimport.py` como import one-shot do histórico Tally pro estado final.
