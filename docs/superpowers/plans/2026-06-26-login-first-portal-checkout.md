# Login-first + Portal de Inscrições (Fase 2+3 do checkout) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: use superpowers:subagent-driven-development ou superpowers:executing-plans. Steps usam checkbox (`- [ ]`).

**Goal:** Ancorar a compra do meetup no login nativo do Ghost (login-first) e dar um portal pós-venda persistente onde a pessoa, logada, vê e gerencia todas as suas compras (por order, suportando múltiplas).

**Architecture:** A compra exige identidade Ghost antes do checkout (magic link passwordless); o estado da compra sobrevive ao round-trip do e-mail via `localStorage` e é retomado no retorno same-origin. No pagamento, a conta Ghost é garantida via Admin API. O portal vive no **apex** (`brgrowthclub.pro`, página do tema — única origem que enxerga a sessão Ghost), lê o membro logado client-side e chama um endpoint nosso que **valida o JWT do membro** (assinatura RS512 conferida na mão via Web Crypto, contornando o bug de chave 1024-bit do JWKS) pra listar os orders Pagos daquele e-mail no Notion. Gestão de convidados reaproveita a `/coletar` existente.

**Tech Stack:** Cloudflare Pages Functions (gc-checkout, ESM/Web Crypto), tema Ghost `gc-site` (Handlebars + JS vanilla), Ghost Members API, Notion REST API 2022-06-28, InfinitePay.

## Global Constraints

- Domínio: `brgrowthclub.pro` (apex = Ghost; `checkout.brgrowthclub.pro` = Pages). Admin API em `brgrowthclub.pro/ghost/api/admin` (sem `/content/`).
- Deploy: gc-checkout via `wrangler pages deploy . --project-name gc-checkout` (env `CLOUDFLARE_ACCOUNT_ID=c0ceab96eb1cb02cf9fb6f8cc6fa2cd6`, apagar `.wrangler/cache/pages.json` antes). Tema via `COPYFILE_DISABLE=1 tar` → R2 `gc-news-images/_gc/theme/gc-site.tar.gz` → `POST brgrowthclub.pro/_gc/restart` (header `x-gc-admin`).
- Verificação: sem framework de teste. Cada task verifica por `node --check` (sintaxe ESM, copiando pra `.mjs`), teste de endpoint via `curl` em produção/preview, e leitura no Notion. Sem `pytest`/`npm test`.
- Copy/UI: sem em dash (—) e sem middot (·); usar vírgula/parênteses. Voz `growth-brazil.webflow.io`.
- JWT do membro: validar assinatura RS512 **manualmente** via `crypto.subtle` (a chave do JWKS tem 1024 bits; libs como `jose` recusam, Web Crypto aceita — confirmado).
- Segurança: e-mail vindo do cliente NUNCA é confiável sem JWT validado. PII (CPF/RG) só é exposta a quem prova ser dono do e-mail via sessão Ghost.
- Não quebrar a venda ao vivo: o login-first degrada pro popup direto atual se a Members API do Ghost falhar.

---

## Fase A — Infra comum (conta Ghost + validação de JWT)

### Task A1: Garantir conta Ghost do comprador no pagamento

**Files:**
- Modify: `gc-checkout/functions/checkout-webhook.js` (no bloco `waitUntil`, após markPaid)
- Modify: `gc-checkout/functions/save-docs.js` (após markPaid, rede de segurança)
- Reuse: `gc-checkout/functions/_shared/ghost.js` (`subscribeMember` já existe; cria membro idempotente)

**Interfaces:**
- Consumes: `subscribeMember(env, { email, name })` de `ghost.js`; `getLeadByNsu` (e-mail+nome do lead).
- Produces: nada novo (efeito colateral: membro Ghost existe com o e-mail da compra).

- [ ] **Step 1:** No webhook, dentro do `waitUntil`, após o bloco do cupom, ler o lead (`getLeadByNsu`) e chamar `subscribeMember(env, { email: lead.email, name: (lead.nome+' '+lead.sobrenome).trim() })` dentro de try/catch (não bloquear; logar falha). Adicionar label Ghost "Comprou Meetup S1E1" se `subscribeMember` aceitar labels (estender o helper p/ passar `labels`).
- [ ] **Step 2:** No `save-docs`, após o markPaid, mesma chamada `subscribeMember` (rede de segurança; idempotente — `subscribeMember` já checa `isMember`).
- [ ] **Step 3:** Estender `subscribeMember` em `ghost.js` p/ aceitar `labels` (array) no POST do membro (`members:[{ email, name, subscribed:true, labels }]`).
- [ ] **Step 4 (verificar):** `node --check` nos 3 arquivos. Deploy. Simular webhook (secret de `~/.config/growth-club/webhook-secret`) com um e-mail de teste; confirmar no Ghost Admin (`GET /ghost/api/admin/members/?filter=email:'...'`) que o membro foi criado com o label. Arquivar o teste.

### Task A2: Helper de validação do JWT do membro Ghost

**Files:**
- Create: `gc-checkout/functions/_shared/ghost-members-jwt.js`

**Interfaces:**
- Produces: `verifyMemberJWT(env, token)` → `{ email, name, sub } | null`. Busca o JWKS de `${GHOST_API_URL}/members/.well-known/jwks.json`, importa a chave via `crypto.subtle.importKey('jwk', jwk, {name:'RSASSA-PKCS1-v1_5', hash:'SHA-512'}, false, ['verify'])`, valida a assinatura do token (header.payload), checa `exp`, retorna o payload (claims do membro). Cacheia o JWK em memória do isolate por `kid`.

- [ ] **Step 1:** Escrever `ghost-members-jwt.js`: parse do JWT (3 partes base64url), fetch do JWKS (cache por `kid` em `Map` de módulo), `importKey` da `{n,e}` como acima, `crypto.subtle.verify('RSASSA-PKCS1-v1_5', key, sig, data)`. Rejeitar se assinatura inválida, `exp` no passado, ou `email` ausente. Retornar `null` em qualquer falha (nunca lançar pro chamador).
- [ ] **Step 2 (verificar):** `node --check`. Teste local: obter um JWT real de membro logado (passo manual: logar no portal de teste e copiar de `/members/api/session`) OU validar o caminho de rejeição (token adulterado → `null`). Confirmar que um token com assinatura trocada retorna `null` e um válido retorna o e-mail.

---

## Fase B — Portal pós-venda (apex + listagem por order)

### Task B1: Helper Notion — orders Pagos por e-mail

**Files:**
- Modify: `gc-checkout/functions/_shared/notion.js`

**Interfaces:**
- Produces: `findOrdersByEmail(token, databaseId, email)` → `[{ id, orderNsu, tipoIngresso, quantidade, valor, lifecycle, dataInscricao }]`. Filtro: `e-mail equals` + `Tipo != 'Convidado do comprador'` (só compradores) + `Lifecycle = 'Pago'`. Ordena por data desc. `orderNsu` = primeiro nsu da lista (pro link da `/coletar`).

- [ ] **Step 1:** Escrever `findOrdersByEmail` (query Notion com `and` dos filtros acima, `page_size: 50`). Mapear cada page pros campos. `orderNsu` = `order_nsu` split por espaço, primeiro token.
- [ ] **Step 2 (verificar):** `node --check`. Criar 2 leads Pagos de teste com o mesmo e-mail (via create-checkout + confirm-paid) e 1 convidado; chamar a função (via um endpoint temporário ou o B2) e confirmar que retorna 2 orders (sem o convidado). Arquivar testes.

### Task B2: Endpoint `/minhas-compras` (autenticado por JWT do membro)

**Files:**
- Create: `gc-checkout/functions/minhas-compras.js`

**Interfaces:**
- Consumes: `verifyMemberJWT` (A2), `findOrdersByEmail` (B1).
- Produces: `POST /minhas-compras` body `{ token }` → `{ ok:true, email, orders:[...] }` ou `{ ok:false }`. CORS: `Access-Control-Allow-Origin: https://brgrowthclub.pro` (o portal é no apex).

- [ ] **Step 1:** Escrever o endpoint: `verifyMemberJWT(env, body.token)` → se `null`, 401 `{ok:false}`. Senão `findOrdersByEmail(...)` pro e-mail do claim → `{ ok:true, email, orders }`. CORS pro apex + OPTIONS handler.
- [ ] **Step 2 (verificar):** `node --check`. Deploy. `curl` com token inválido → 401. (Token válido testado na B3 ao vivo.)

### Task B3: Página do portal no tema (`/minhas-inscricoes`)

**Files:**
- Create: `growth-club-newsletter/theme/gc-site/page-minhas-inscricoes.hbs`
- Modify: `growth-club-newsletter/routes.yaml` (rota `/minhas-inscricoes/` → page, OU criar página no Ghost com esse slug)
- Reuse: estilos do tema; paleta GC.

**Interfaces:**
- Consumes: `/members/api/member/` (same-origin, sabe se logado), `/members/api/session` (JWT), `POST checkout.brgrowthclub.pro/minhas-compras`.
- Produces: página HTML que lista os cards de compra.

- [ ] **Step 1:** Criar `page-minhas-inscricoes.hbs`: markup base (header/footer do tema) + container `#compras` + estado "entre pra ver suas inscrições" com botão `data-portal="signin"`.
- [ ] **Step 2:** JS client-side: `fetch('/members/api/member/')` → se 204/401, mostrar o CTA de login (Portal signin com retorno pra esta página). Se logado, `fetch('/members/api/session')` → token → `POST` pro `/minhas-compras` → renderizar 1 card por order (tipo, quantidade, valor, data) com botão "Gerenciar convidados" → `https://checkout.brgrowthclub.pro/coletar?nsu=<orderNsu>&q=<quantidade>`.
- [ ] **Step 3:** Configurar a rota (`routes.yaml` apontando `/minhas-inscricoes/` pro template, ou criar a página vazia no Ghost com slug `minhas-inscricoes`). Documentar qual caminho foi usado.
- [ ] **Step 4 (verificar):** Deploy do tema (R2 + restart). Logar com um e-mail que tem 2 compras de teste; confirmar 2 cards + botão abre a `/coletar` certa. Testar deslogado → mostra CTA de login. Limpar testes.

### Task B4: Expor o link do portal na página de obrigado

**Files:**
- Modify: `gc-checkout/obrigado.html`

- [ ] **Step 1:** Adicionar na `obrigado.html` um link/botão "Acessar minhas inscrições" → `https://brgrowthclub.pro/minhas-inscricoes`.
- [ ] **Step 2 (verificar):** Deploy gc-checkout. Abrir `/obrigado` e confirmar o link.

---

## Fase C — Login-first na compra

### Task C1: Endpoint `/check-member` (existe conta pra este e-mail?)

**Files:**
- Create: `gc-checkout/functions/check-member.js`
- Reuse: `ghost.js` `isMember`.

**Interfaces:**
- Produces: `POST /check-member` body `{ email }` → `{ exists: boolean }`. CORS pro apex. Rate-limit leve (cap por simplicidade; é enumeração de membro, aceitável pro caso, mas não logar e-mails).

- [ ] **Step 1:** Escrever o endpoint: valida e-mail, `isMember(env, email)` → `{ exists }`. Degrada `{ exists:false }` sem `GHOST_ADMIN_KEY`.
- [ ] **Step 2 (verificar):** `node --check`. Deploy. `curl` com e-mail conhecido (membro existente) → `{exists:true}`; e-mail novo → `{exists:false}`.

### Task C2: Popup multi-step login-first no tema

**Files:**
- Modify: `growth-club-newsletter/theme/gc-site/post.hbs` (o popup `gctp-*` + JS)

**Interfaces:**
- Consumes: `/members/api/member/`, `/members/api/send-magic-link/`, `POST checkout.brgrowthclub.pro/check-member`, `create-checkout` (existente).
- Produces: fluxo de compra logado; `localStorage['gc_pending_order']` com `{lote,tipo,quantidade,cupom, nome?,sobrenome?,phone?,linkedin?}`.

- [ ] **Step 1:** Ao clicar `.gct-buy`, em vez de abrir o popup de contato direto, abrir o popup login-first: checar `/members/api/member/` — se logado, pular pro checkout (Step 4) com email+nome do Ghost (pedindo só telefone, que o Ghost não tem). Se não, Step 2.
- [ ] **Step 2:** Step de e-mail: input único; ao submeter, `POST /check-member`. `exists:true` → enviar magic link signin (`/members/api/send-magic-link/` com `{email, emailType:'signin'}`) e mostrar "confere teu e-mail". `exists:false` → revelar campos nome/sobrenome/whatsapp/linkedin (Step 3).
- [ ] **Step 3:** Step de cadastro: coletar nome/sobrenome/whatsapp/linkedin; enviar magic link signup (`{email, emailType:'signup', name}`). Guardar tudo em `localStorage['gc_pending_order']` ANTES de enviar o link (sobrevive ao round-trip).
- [ ] **Step 4 (retomada):** No load da LP, se `?success=true` (retorno do magic link) E `localStorage['gc_pending_order']` existe E `/members/api/member/` confirma logado → ler o pedido, limpar o localStorage, e disparar `create-checkout` (com email do Ghost + dados salvos) → redirecionar pro InfinitePay.
- [ ] **Step 5 (degradação):** Se `/members/api/member/` ou `send-magic-link` falharem (rede/Members API fora), cair no popup de contato direto atual (fluxo que já existe e vende) — preservar como fallback.
- [ ] **Step 6 (verificar):** Deploy do tema. Testar os 3 caminhos: (a) já logado → checkout direto; (b) e-mail com conta → magic link → volta → checkout; (c) e-mail novo → cadastro → magic link → volta → checkout. Confirmar que o estado sobrevive ao round-trip. Testar fallback desligando a Members API (simular erro).

### Task C3: Pré-preencher dados conhecidos

**Files:**
- Modify: `growth-club-newsletter/theme/gc-site/post.hbs` (Step 4 da C2)
- Optional: endpoint `gc-checkout/functions/my-profile.js` (telefone/linkedin de compra anterior por e-mail, autenticado por JWT)

- [ ] **Step 1:** Quando logado, pré-preencher email+nome do `/members/api/member/`. Pra telefone/linkedin (não estão no Ghost), opcionalmente buscar da última compra no Notion via endpoint autenticado por JWT (`my-profile`). Se não houver, pedir só o telefone.
- [ ] **Step 2 (verificar):** Logar e abrir o popup; confirmar email+nome pré-preenchidos.

---

## Sequência e rollout

1. **Fase A** (infra) primeiro — não muda UX, habilita o resto.
2. **Fase B** (portal) — entrega o "link persistente por order" que o Henrique pediu; independente da venda. Pode ir ao ar sem risco pra conversão.
3. **Fase C** (login-first) por último — toca o fluxo de venda ativo. Deploy com o fallback (C2 Step 5) garantindo que, se algo falhar, a venda continua pelo popup direto. Validar os 3 caminhos antes de considerar fechado.

## Verificação end-to-end (após tudo)

- Comprar logado / com conta / sem conta → 3 fluxos levam ao InfinitePay com o pedido certo.
- Pagar → conta Ghost garantida + order Pago no Notion.
- Acessar `/minhas-inscricoes` logado → ver os orders (inclusive múltiplas compras) → "gerenciar convidados" abre a `/coletar` certa.
- Deslogado no portal → CTA de login; token inválido no `/minhas-compras` → 401.
- PII: nenhum endpoint devolve dados de outro e-mail sem JWT válido.
