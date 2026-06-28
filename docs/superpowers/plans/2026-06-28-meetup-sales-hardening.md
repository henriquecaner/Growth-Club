# Meetup S1E1 — Sales Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Corrigir os 4 bugs de integridade de venda (convidados duplicados, e-mail duplicado, sem capacidade, webhook sem checagem de status), remover os links InfinitePay legados (o fluxo real é o checkout dinâmico via API), e endurecer o resto da estrutura de venda do Meetup S1E1.

**Architecture:** Cloudflare Pages Functions (ESM) na frente de InfinitePay + Notion (CRM/fonte da verdade do estado) + Ghost (membership/auth). O popup vive no tema Ghost (`post.hbs`); a coleta e o obrigado são páginas estáticas do `gc-checkout`. A correção central é tornar `save-docs` idempotente (upsert de convidado por índice, capado pela quantidade paga) e dar ao Notion um marcador de dedup de e-mail e de capacidade.

**Tech Stack:** Cloudflare Pages Functions, Notion REST API `2022-06-28`, Ghost Admin/Members API, Mailgun, InfinitePay. Testes de lógica pura via `node --test` (Node v25 built-in, zero deps). Integração via `curl` contra preview/prod.

## Baseline verificado (2026-06-28)

Antes de planejar, confirmei que **o código revisado é exatamente o que está no ar e no GitHub** (não é versão antiga):
- `git fetch` nos 2 repos: local = `origin/main` (`ahead 0 / behind 0`), só branch `main`, e nenhum outro repo de checkout entre os 24 do GitHub.
- `gc-checkout` ao vivo: `curl checkout.brgrowthclub.pro/coletar` é **byte-idêntico** ao repo; `POST /create-checkout {}` responde `"Nome e sobrenome são obrigatórios"` (= `create-checkout.js:53`).
- LP ao vivo `brgrowthclub.pro/meetups/sp-s1-e1/` = `post.hbs` do repo: popup, login-first (magic link), grupo/cupom e os 8 hrefs estáticos `leveltech`.

**Fluxo real (confirmado):** clique no lote → popup → gate login-first (`detectMember`; deslogado → `check-member` + magic link do Ghost, com retomada via `localStorage`) → `create-checkout` cria lead Pendente no Notion + **checkout dinâmico via API InfinitePay** (`/invoices/public/checkout/links`) → pagamento → (webhook marca Pago + e-mail) e (redirect `/coletar` → `confirm-paid` + `save-docs`) → `/obrigado` → portal `/minhas-inscricoes`. Os links estáticos `leveltech` **não** são o caminho de venda: são só `href` de fallback dos botões (legado, handle de outra conta). Por isso a Task 1 os **remove**, não regenera.

## Global Constraints

- **Voz:** sem em dash (`—`) e sem middot (`·`) em qualquer copy/UI pública (usar vírgula, "e", parênteses). Ref: memórias `feedback_sem_middot_emdash`, `feedback_humanizer_radical`.
- **Preço é server-side:** o cliente nunca decide preço/quantidade; o servidor recalcula em `catalog.js`. O popup só faz preview.
- **Nunca retornar 502/504 de uma Function** com corpo útil: o Cloudflare engole o corpo e troca pela página de gateway. Erro de app com JSON usa 4xx (L-009 / `reference_cloudflare_pages_502`).
- **PII (CPF/RG) nunca em log, nunca em URL.** Base Notion é privada.
- **Deploy gc-checkout:** `wrangler pages deploy . --project-name gc-checkout --branch main` na **conta Caner** `c0ceab96eb1cb02cf9fb6f8cc6fa2cd6`. Apagar `.wrangler/cache/pages.json` antes se a conta estiver errada (403 = conta errada). Ref: `reference_wrangler_account_gotcha`.
- **Deploy tema:** editar `theme/gc-site/*`, depois `git archive --format=tar.gz HEAD:theme/gc-site` → R2 (`gc-news-images/_gc/theme/gc-site.tar.gz`, conta Caner) → `POST https://brgrowthclub.pro/_gc/restart` header `x-gc-admin`. Usar `COPYFILE_DISABLE=1 tar` se for tar manual (AppleDouble quebra o tema). Conteúdo do post (`bin/meetup-sp-s1-e1.html`) publica via Admin API (`source=html`).
- **Handle InfinitePay (confirmado pelo Henrique 2026-06-28): `level-tech` (com hífen)** — usado pela API do checkout dinâmico (caminho real, correto). Os 8 links estáticos `leveltech` (sem hífen) são legado de outra conta e serão **removidos** (Task 1), não regenerados.
- **Tokens:** `~/.config/growth-club/` (notion-meetup-token, ghost-admin-key, gc-admin-token, cf-dns-token). Secrets do Pages via `wrangler pages secret put`.
- **Data do evento:** 23/07/2026, quinta-feira, 17h30, CRMBonus. (Dia da semana verificado.)
- **Repos:** `gc-checkout` e `growth-club-newsletter` são irmãos de `Growth-Club` em `~/Documents/GitHub/`.

---

## File Structure

| Arquivo | Responsabilidade | Mudança |
|---|---|---|
| `gc-checkout/functions/_shared/notion.js` | CRM helpers | + `findExactByOrderNsu`, `upsertGuest`, `marcarConfirmacaoEnviada`, `contarAssentosVendidos`; estender `updatePage` (email/phone/nomeCompleto), `getLeadByNsu` (+confirmacaoEnviada, +valorEsperado), `leadProperties` (+valorEsperado) |
| `gc-checkout/functions/_shared/catalog.js` | preço (fonte da verdade) | + `MAX_GRUPO=20`; usar em precoGrupo guard |
| `gc-checkout/functions/_shared/meetup-event.js` | dados do evento + ICS | refatorar pra campos estruturados; + VALARM |
| `gc-checkout/functions/_shared/email.js` | Mailgun | + retry em 5xx/429 |
| `gc-checkout/functions/_shared/email-templates.js` | HTML do e-mail | escapar valores de usuário; subject derivado |
| `gc-checkout/functions/_shared/ghost.js` | Ghost Admin | escapar aspa no filtro NQL |
| `gc-checkout/functions/_shared/ghost-members-jwt.js` | verificação JWT | + checagem `aud` opcional |
| `gc-checkout/functions/create-checkout.js` | cria lead+checkout | + guard de capacidade; + `valorEsperado`; cap 20 |
| `gc-checkout/functions/checkout-webhook.js` | pago → Notion + e-mail | + validação de valor; + dedup flag |
| `gc-checkout/functions/save-docs.js` | coleta + convidados | upsert idempotente + cap; dedup flag; chunked |
| `gc-checkout/coletar.html` | coleta de docs | + checksum CPF |
| `gc-checkout/README.md` | docs | reescrever (grupo/cupom/e-mail/magic-link/portal) |
| `gc-checkout/test/*.test.js` | testes de lógica pura | NOVO (node:test) |
| `growth-club-newsletter/theme/gc-site/post.hbs` | popup | fallback seguro ind/dupla; focus-trap; autoOpen prefill |
| `growth-club-newsletter/bin/meetup-sp-s1-e1.html` | conteúdo dos lotes | remover hrefs estáticos `leveltech` (legado); copy "assento numerado"; grupo nos lotes 2/3 |

**Notion schema (novas properties na base "Meetup Growth" `38889cac-40bd-805f-a07d-f5c98a05f4cd`):**
- `Confirmação enviada` — checkbox (dedup de e-mail).
- `Valor esperado` — number (validação de valor no webhook).

---

## Decisões travadas (defaults — não re-perguntar)

| Tema | Decisão |
|---|---|
| Idempotência de convidado | **Upsert por índice** (`order_nsu = "<nsu>-P<idx>"`): existe → update; senão → create. Não deletar slots não preenchidos. |
| Cap de convidados | Servidor **rejeita** (400) se `participants.length+1 > qtd paga` (qtd paga = `Pedido.q` do snapshot). Não capar em silêncio (esconderia o problema). |
| Dedup de e-mail | Property `Confirmação enviada` (checkbox), checada e setada **após envio bem-sucedido** por webhook E save-docs. Aceita dup raro sob concorrência real; nunca perde confirmação. |
| Capacidade | Guard no `create-checkout`: soma `Quantidade` dos Pago (Tipo≠Convidado) ≥ `MEETUP_CAPACITY` (env, default 70) → 400. **Degrada aberto** se a contagem falhar (não trava venda com Notion fora). |
| "Assento numerado" | **Corrigir a copy** (não há sistema de assento). Atribuição real de assento = feature adiada. |
| Validação de valor (webhook) | Gravar `Valor esperado` no create-checkout; webhook recusa marcar Pago se `paid_amount + 0.01 < Valor esperado`. Gate no status do evento vem **depois** de confirmar o payload real do InfinitePay (Task 4b). |
| Cap de grupo | Unificar em **20** (decisão de produto: "acima de 20, fala com a gente"). |
| Links estáticos InfinitePay | São **legado** (o fluxo real é o checkout dinâmico via API). **Remover** os 8 hrefs `leveltech` e a lógica de fallback-pra-link; os botões viram gatilho puro do popup, com erro amigável se a API falhar (igual ao grupo). |

**Fork que precisa do Henrique (não bloqueia o plano):**
- **Task 4b:** colar 1 payload real de webhook do InfinitePay (ou link do doc) pra identificar o campo de status de sucesso. A validação por valor (Task 4) entra sem isso.
- (Opcional) Se quiser um fallback de pagamento que funcione mesmo sem JS, regenerar os links sob `level-tech` em vez de remover. Default = remover, alinhado a "usar checkout, não links".

---

## FASE 1 — Integridade de venda (fix-now, evento em ~4 semanas)

### Task 0: Harness de teste (node:test) + schema Notion

**Files:**
- Create: `gc-checkout/test/catalog.test.js`
- Modify: `gc-checkout/package.json`
- Manual/API: Notion base `38889cac...` — add properties `Confirmação enviada` (checkbox), `Valor esperado` (number)

**Interfaces:**
- Produces: `npm test` → `node --test`; convenção de teste pra lógica pura.

- [ ] **Step 1: Add test script.** Edit `gc-checkout/package.json` scripts:

```json
"scripts": {
  "dev": "wrangler pages dev .",
  "deploy": "wrangler pages deploy . --project-name gc-checkout --branch main",
  "test": "node --test"
}
```

- [ ] **Step 2: Smoke test** (`gc-checkout/test/catalog.test.js`) provando que o catálogo carrega e o preview espelha o servidor:

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { precoGrupo, precoDoLote, tipoIngressoDeQtd, MAX_GRUPO } from '../functions/_shared/catalog.js';

test('precoGrupo lote 0, 3 pessoas, 30% off = 260,40', () => {
  const p = precoGrupo(0, 3);
  assert.equal(p.porPessoa, 86.8);
  assert.equal(p.reais, 260.4);
  assert.equal(p.tipoIngresso, 'Grupo');
});
test('precoDoLote dupla lote 1 = 264', () => {
  assert.equal(precoDoLote(1, 'dupla').reais, 264);
});
test('tipoIngressoDeQtd', () => {
  assert.equal(tipoIngressoDeQtd(1), 'Individual');
  assert.equal(tipoIngressoDeQtd(2), 'Pack com 2');
  assert.equal(tipoIngressoDeQtd(5), 'Grupo');
});
```

- [ ] **Step 3: Run.** `cd gc-checkout && npm test` → Expected: 3 pass (MAX_GRUPO import pode falhar até a Task 5 — remover do import se necessário neste passo, re-adicionar na Task 5).
- [ ] **Step 4: Notion schema.** Na base "Meetup Growth", adicionar a property `Confirmação enviada` (checkbox) e `Valor esperado` (number). Confirmar que a integração `NOTION_TOKEN` enxerga (já tem acesso à base). Verificação: criar 1 linha de teste, marcar o checkbox, conferir via `GET /v1/databases/<id>` que as props aparecem em `properties`.
- [ ] **Step 5: Commit.** `git add package.json test/ && git commit -m "test: harness node:test + smoke do catálogo"`

---

### Task 1: Remover links InfinitePay legados + fallback seguro (W2)

**Files:**
- Modify: `growth-club-newsletter/theme/gc-site/post.hbs` (fireCheckout fallback)
- Modify: `growth-club-newsletter/bin/meetup-sp-s1-e1.html` (hrefs `leveltech` dos botões + bloco comentado)
- Modify: `gc-checkout/README.md`, `gc-checkout/wrangler.toml` (comentário)

**Contexto:** o fluxo real é o checkout dinâmico via API (`create-checkout` → InfinitePay), confirmado ao vivo. Os 8 hrefs `leveltech` nos botões `.gct-buy` são legado de outra conta (handle errado) e só seriam usados se o JS falhasse. O popup já intercepta todo clique. Remover os links e tornar o fallback um erro amigável.

**Interfaces:**
- Consumes: nada.
- Produces: nenhum link de pagamento `leveltech` no site; botões `.gct-buy` são gatilho puro do popup.

- [ ] **Step 1: Fallback seguro no popup.** Em `post.hbs`, `fireCheckout` hoje faz `fallback()` (`location.href = current.fallback`, que é o href `leveltech`) pra ind/dupla quando a API falha. Trocar pra mostrar erro (igual ao grupo). Substituir o corpo de `.then(function(res){...})` e `.catch`:

```js
      .then(function(res){
        if (res.ok && res.j && res.j.checkout_url) { location.href = res.j.checkout_url; return; }
        if ((res.status === 400 || res.status === 502) && res.j && res.j.error) { resetBtn(); if (onErr) onErr(res.j.error); return; }
        resetBtn(); if (onErr) onErr('Não consegui gerar o checkout agora. Tenta de novo em instantes ou fala com a gente em contato@brgrowthclub.pro.');
      })
      .catch(function(){
        resetBtn(); if (onErr) onErr('Falha de conexão. Tenta de novo ou fala com a gente em contato@brgrowthclub.pro.');
      });
```

Remover a função `fallback()` (agora morta).

- [ ] **Step 2: Remover os hrefs `leveltech`.** Em `meetup-sp-s1-e1.html`, nos botões `.gct-buy` ind/dupla (Lote 0 linhas 27-28; Lote 1 linha 36), trocar `href="https://checkout.infinitepay.io/leveltech?lenc=..."` por `href="#ingressos"` (o popup intercepta o clique; o href vira só âncora inofensiva). Apagar o bloco comentado de links L2/L3 (linhas 49-53). Os botões de grupo já usam `mailto:` interceptado pelo popup (manter).
- [ ] **Step 3: README + handle.** Em `gc-checkout/README.md`, trocar `leveltech` por `level-tech` na tabela de env. Conferir que casa com `wrangler.toml` (já `level-tech`).
- [ ] **Step 4: Verificar.** `grep -c "leveltech" growth-club-newsletter/bin/meetup-sp-s1-e1.html` → 0. No DevTools, bloquear `create-checkout` e clicar "Quero individual" → aparece a mensagem de erro, **não** navega pra `infinitepay.io/leveltech`.
- [ ] **Step 5: Deploy + commit.** Tema via git archive→R2→restart; conteúdo via Admin API. `git commit -m "fix(checkout): remove links InfinitePay legados, popup como caminho único (W2)"`

---

### Task 2: Upsert idempotente de convidado + cap pela qtd paga (C1, W1)

**Files:**
- Modify: `gc-checkout/functions/_shared/notion.js` (+ `findExactByOrderNsu`, `upsertGuest`; estender `updatePage`)
- Modify: `gc-checkout/functions/save-docs.js:56-118`
- Create: `gc-checkout/test/notion-guest.test.js`

**Interfaces:**
- Consumes: `getLeadByNsu` (já retorna `quantidade` do snapshot).
- Produces: `findExactByOrderNsu(token, dbId, orderNsu) → page|null`; `upsertGuest(token, dbId, guest) → {id, created}`; `updatePage` aceita `email`, `phone`, `nomeCompleto`.

- [ ] **Step 1: `findExactByOrderNsu`** em `notion.js` (após `findByOrderNsu`):

```js
// Acha um registro EXATO por order_nsu (equals, inclui convidados "<nsu>-P<idx>").
// Diferente de findByOrderNsu (contains + exclui convidados, usado pro comprador).
export async function findExactByOrderNsu(token, databaseId, orderNsu) {
  const res = await fetch(`${NOTION_API}/databases/${databaseId}/query`, {
    method: 'POST', headers: h(token),
    body: JSON.stringify({ filter: { property: 'order_nsu', rich_text: { equals: orderNsu } }, page_size: 1 }),
  });
  if (!res.ok) throw new Error(`Notion findExact ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const { results } = await res.json();
  return results[0] || null;
}
```

- [ ] **Step 2: Estender `updatePage`** pra cobrir campos de convidado (email/phone/nomeCompleto). Substituir o corpo de montagem de props:

```js
export async function updatePage(token, pageId, fields) {
  const props = {};
  if (fields.cpf != null) props.CPF = { rich_text: txt(fields.cpf) };
  if (fields.rg != null) props.RG = { rich_text: txt(fields.rg) };
  if (fields.linkedin) props.LinkedIn = { url: fields.linkedin };
  if (fields.empresa) props.Empresa = { url: fields.empresa };
  if (fields.nome) props.Nome = { rich_text: txt(fields.nome) };
  if (fields.sobrenome) props.Sobrenome = { rich_text: txt(fields.sobrenome) };
  if (fields.nomeCompleto) props['Nome Completo'] = { title: txt(fields.nomeCompleto) };
  if (fields.email) props['e-mail'] = { email: fields.email };
  if (fields.phone) props.Telefone = { phone_number: fields.phone };
  const res = await fetch(`${NOTION_API}/pages/${pageId}`, {
    method: 'PATCH', headers: h(token), body: JSON.stringify({ properties: props }),
  });
  if (!res.ok) throw new Error(`Notion updatePage ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return pageId;
}
```

- [ ] **Step 3: `upsertGuest`** em `notion.js` (após `createGuest`):

```js
// Upsert idempotente de convidado por índice (order_nsu = "<nsu>-P<idx>").
// Re-submits do /coletar (e-mail "Gerenciar inscrição" e portal reentram aqui)
// passam a ATUALIZAR o convidado existente em vez de criar duplicado.
export async function upsertGuest(token, databaseId, guest) {
  const existing = await findExactByOrderNsu(token, databaseId, guest.orderNsu);
  const nomeCompleto = `${guest.nome || ''} ${guest.sobrenome || ''}`.trim() || (guest.email || 'Convidado');
  if (existing) {
    await updatePage(token, existing.id, {
      nome: guest.nome, sobrenome: guest.sobrenome, nomeCompleto,
      email: guest.email, phone: guest.phone,
      cpf: guest.cpf, rg: guest.rg, linkedin: guest.linkedin, empresa: guest.empresa,
    });
    return { id: existing.id, created: false };
  }
  const id = await createGuest(token, databaseId, guest);
  return { id, created: true };
}
```

(`updatePage(token, pageId, fields)` — o 2º arg é `existing.id`. `createGuest` já retorna o page id via `createLead`.)

- [ ] **Step 4: save-docs cap + upsert.** Em `save-docs.js`, após `const page = await findByOrderNsu(...)` e a validação, ler a qtd paga e capar. Substituir o bloco `const participants = ...; const quantidade = participants.length + 1;` e o loop de convidados:

```js
    // qtd paga (autoritativa): vem do snapshot Pedido.q via getLeadByNsu
    const leadPaid = await getLeadByNsu(NOTION_TOKEN, DB, nsu);
    const paidQ = (leadPaid && leadPaid.quantidade > 0) ? leadPaid.quantidade : 1;

    const submitted = Array.isArray(body.participants) ? body.participants : (body.p2 ? [body.p2] : []);
    // CAP: nunca registrar mais gente do que foi paga (bloqueia tampering de ?q=)
    if (submitted.length + 1 > paidQ) {
      return new Response(JSON.stringify({ error: 'A quantidade de convidados excede o seu ingresso. Fala com a gente se precisar adicionar pessoas.' }), { status: 400, headers });
    }
    const participants = submitted;
    const quantidade = paidQ; // registro reflete o pago, não o nº de forms preenchidos
```

E o loop de criação vira upsert por índice (substituir o `for (const pg of participants)`):

```js
      const upsertResults = [];
      let idx = 2;
      for (const pg of participants) {
        const phoneN = digits(pg.phone);
        const gNome = clean(pg.nome), gSobre = clean(pg.sobrenome), gEmail = clean(pg.email).toLowerCase();
        const gNsu = `${nsu}-P${idx}`;
        const r = await upsertGuest(NOTION_TOKEN, DB, {
          nome: gNome, sobrenome: gSobre, email: gEmail,
          phone: phoneN ? (phoneN.startsWith('55') ? phoneN : `55${phoneN}`) : '',
          cpf: digits(pg.cpf), rg: clean(pg.rg), linkedin: clean(pg.linkedin), empresa: clean(pg.empresa),
          valor: 0, orderNsu: gNsu, compradoPor: comprador,
        });
        upsertResults.push(r);
        nomes.push(`${gNome} ${gSobre}`.trim() || gEmail);
        guestList.push({ gNome, gSobre, gEmail, orderNsu: gNsu });
        idx++;
      }
```

Trocar o import: `createGuest` → `upsertGuest` (manter `findByOrderNsu`, `updatePage`, `markPaidByNsu`, `appendNote`, `getLeadByNsu`).

Também trocar a chamada `markPaidByNsu(... { quantidade, ...})` pra usar `paidQ`.

- [ ] **Step 5: Nota recíproca idempotente.** O `appendNote` (`save-docs.js:116`) duplica a nota a cada re-submit. Só anexar quando algum convidado foi **criado** agora (não em re-submit que só atualizou): condicionar o `appendNote` a `const algumCriado = upsertResults.some(r => r.created)`.

- [ ] **Step 6: Teste de cap (lógica pura)** (`test/notion-guest.test.js`) — testar a regra de cap isolada (extrair pra função pura se necessário). Mínimo:

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
// cap: participants.length + 1 <= paidQ
function dentroDoCap(nParticipants, paidQ) { return nParticipants + 1 <= paidQ; }
test('cap bloqueia mais convidados que o pago', () => {
  assert.equal(dentroDoCap(2, 3), true);   // grupo de 3: 2 convidados ok
  assert.equal(dentroDoCap(9, 3), false);  // tampering ?q=10
  assert.equal(dentroDoCap(0, 1), true);   // individual
});
```

- [ ] **Step 7: Verificar idempotência ao vivo** (preview ou prod, com um nsu de teste Pago): `POST /save-docs` com 2 convidados, conferir 2 registros `-P2/-P3`. Repetir o **mesmo** POST → continuar 2 registros (não 4). `POST` com 9 convidados num pedido de q=3 → 400.
- [ ] **Step 8: Commit.** `git add functions/_shared/notion.js functions/save-docs.js test/ && git commit -m "fix(checkout): upsert idempotente de convidado + cap pela qtd paga (C1)"`

---

### Task 3: Dedup de e-mail de confirmação (C2)

**Files:**
- Modify: `gc-checkout/functions/_shared/notion.js` (+ `marcarConfirmacaoEnviada`; `getLeadByNsu` +`confirmacaoEnviada`)
- Modify: `gc-checkout/functions/checkout-webhook.js:89-103`
- Modify: `gc-checkout/functions/save-docs.js:134-152`

**Interfaces:**
- Consumes: property `Confirmação enviada` (Task 0).
- Produces: `marcarConfirmacaoEnviada(token, dbId, pageId)`; `getLeadByNsu().confirmacaoEnviada: boolean`.

- [ ] **Step 1: ler o flag** em `getLeadByNsu` (adicionar ao objeto retornado):

```js
    confirmacaoEnviada: !!(p['Confirmação enviada'] && p['Confirmação enviada'].checkbox),
```

- [ ] **Step 2: `marcarConfirmacaoEnviada`** em `notion.js`:

```js
// Marca que o e-mail de confirmação já foi enviado (dedup entre webhook e save-docs).
export async function marcarConfirmacaoEnviada(token, databaseId, pageId) {
  const res = await fetch(`${NOTION_API}/pages/${pageId}`, {
    method: 'PATCH', headers: h(token),
    body: JSON.stringify({ properties: { 'Confirmação enviada': { checkbox: true } } }),
  });
  if (!res.ok) throw new Error(`Notion marcarConfirmacao ${res.status}: ${(await res.text()).slice(0, 200)}`);
  return pageId;
}
```

- [ ] **Step 3: webhook checa+marca.** Em `checkout-webhook.js`, a condição de envio passa a considerar o flag. Trocar `!jaProcessado` por `!jaProcessado && !lead.confirmacaoEnviada`, e após `sendEmail` bem-sucedido, marcar:

```js
        if (lead && lead.email && !jaProcessado && !lead.confirmacaoEnviada) {
          try {
            await new Promise((r) => setTimeout(r, 5000));
            const quantidade = lead.quantidade || 1;
            const tipoIngresso = tipoIngressoDeQtd(quantidade);
            const cadastroUrl = `${BASE}/coletar?nsu=${encodeURIComponent(orderNsu)}&q=${quantidade}`;
            const tmpl = compradorEmail({ nome: lead.nome, tipoIngresso, quantidade, valor: valorPago, cadastroUrl });
            const ok = await sendEmail(env, { to: lead.email, ...tmpl, icsContent: buildICS(orderNsu), icsName: 'meetup-growth-sp.ics' });
            if (ok && lead.id) { try { await marcarConfirmacaoEnviada(NOTION_TOKEN, NOTION_DATABASE_ID, lead.id); } catch (e) { console.warn(`[${orderNsu}] marcar confirmação:`, e.message); } }
            console.log(`[${orderNsu}] e-mail comprador ${ok ? 'enviado' : 'falhou'}: ${lead.email}`);
          } catch (e) { console.warn(`[${orderNsu}] e-mail comprador erro:`, e.message); }
        }
```

Importar `marcarConfirmacaoEnviada`.

- [ ] **Step 4: save-docs checa+marca.** Em `save-docs.js`, o fallback do comprador re-lê o valor; trocar pra checar o flag e marcar após envio:

```js
      let jaEnviado = false;
      try {
        const fresh = await getLeadByNsu(NOTION_TOKEN, DB, nsu);
        jaEnviado = !!(fresh && (fresh.valor > 0 || fresh.confirmacaoEnviada));
      } catch (e) { console.warn('save-docs re-check confirmação:', e && e.message); }
      if (!jaEnviado) {
        const BASE = new URL(request.url).origin;
        const cadastroUrl = `${BASE}/coletar?nsu=${encodeURIComponent(nsu)}&q=${quantidade}`;
        const buyerValor = (bp0['Valor pago'] && typeof bp0['Valor pago'].number === 'number') ? bp0['Valor pago'].number : 0;
        const tmpl = compradorEmail({ nome: buyerNomeEmail, tipoIngresso: tipoIngressoDeQtd(quantidade), quantidade, valor: buyerValor, cadastroUrl });
        emailTasks.push(
          sendEmail(env, { to: buyerEmailAddr, ...tmpl, icsContent: buildICS(nsu), icsName: 'meetup-growth-sp.ics' })
            .then((ok) => { if (ok) { try { return marcarConfirmacaoEnviada(NOTION_TOKEN, DB, page.id); } catch (e) {} } })
            .then(() => console.log(`[${nsu}] e-mail comprador (fallback) processado:`, buyerEmailAddr)),
        );
      }
```

Importar `marcarConfirmacaoEnviada`.

- [ ] **Step 5: Verificar** com um nsu de teste: marcar o checkbox manualmente no Notion, disparar o webhook (ou /save-docs) → e-mail NÃO reenviado (log "não reenviado"). Desmarcar → reenvia 1x e o checkbox volta a true.
- [ ] **Step 6: Commit.** `git commit -am "fix(checkout): dedup de e-mail via flag Confirmação enviada (C2)"`

---

### Task 4: Webhook valida valor + (4b) gate de status (C4)

**Files:**
- Modify: `gc-checkout/functions/_shared/notion.js` (`leadProperties` +`valorEsperado`; `getLeadByNsu` +`valorEsperado`)
- Modify: `gc-checkout/functions/create-checkout.js:103,128` (gravar valorEsperado)
- Modify: `gc-checkout/functions/checkout-webhook.js:37-39`

**Interfaces:**
- Consumes: property `Valor esperado` (Task 0).
- Produces: lead pendente grava `Valor esperado`; webhook recusa pago abaixo do esperado.

- [ ] **Step 1: gravar valorEsperado.** Em `leadProperties` (`notion.js`), adicionar:

```js
  if (typeof lead.valorEsperado === 'number' && lead.valorEsperado > 0) props['Valor esperado'] = { number: lead.valorEsperado };
```

Em `create-checkout.js`, passar `valorEsperado: preco.reais` no `createLead`/`updatePendingLead` (incluir no objeto e no `updatePendingLead` props se aplicável). Para `createLead`, adicionar `valorEsperado: preco.reais`. (O snapshot `pedido` já guarda lote/tipo/qty/cupom; `Valor esperado` materializa o total esperado pra checagem barata.)

- [ ] **Step 2: ler valorEsperado** em `getLeadByNsu`:

```js
    valorEsperado: (p['Valor esperado'] && typeof p['Valor esperado'].number === 'number') ? p['Valor esperado'].number : 0,
```

- [ ] **Step 3: webhook recusa valor baixo.** Em `checkout-webhook.js`, após calcular `valorPago` e ler `lead`, antes de marcar pago:

```js
        // defesa: refund/parcial/zerado que carregue paid_amount não deve marcar Pago.
        const esperado = (lead && lead.valorEsperado) || 0;
        if (typeof valorPago === 'number' && esperado > 0 && valorPago + 0.01 < esperado) {
          console.warn(`[${orderNsu}] paid_amount ${valorPago} < esperado ${esperado} — NÃO marca Pago`);
          return; // sai do waitUntil sem efeito
        }
```

(Colocar logo após a leitura do `lead` e antes do `markPaidByNsu`.)

- [ ] **Step 4b (Henrique): gate de status.** Colar 1 payload real de webhook do InfinitePay (ou link do doc). Identificar o campo de status de sucesso (ex.: `status`, `event`, `paid`). Adicionar gate explícito no topo do `try`:

```js
    // EXEMPLO — ajustar ao payload real do InfinitePay:
    // if (payload.status && payload.status !== 'paid') { return new Response('OK',{status:200}); }
```

- [ ] **Step 5: Verificar** com um POST simulado de webhook com `paid_amount` menor que `Valor esperado` → não marca Pago (log). Com valor correto → marca.
- [ ] **Step 6: Commit.** `git commit -am "fix(checkout): valida valor pago vs esperado no webhook (C4)"`

---

### Task 5: Guard de capacidade + cap de grupo unificado + copy (C3, W5)

**Files:**
- Modify: `gc-checkout/functions/_shared/catalog.js` (+ `MAX_GRUPO`)
- Modify: `gc-checkout/functions/_shared/notion.js` (+ `contarAssentosVendidos`)
- Modify: `gc-checkout/functions/create-checkout.js:66,86` (cap 20 + guard capacidade)
- Modify: `gc-checkout/wrangler.toml` (+ `MEETUP_CAPACITY`)
- Modify: `growth-club-newsletter/bin/meetup-sp-s1-e1.html:55` (copy "assento numerado")

**Interfaces:**
- Produces: `MAX_GRUPO=20`; `contarAssentosVendidos(token, dbId) → number`.

- [ ] **Step 1: `MAX_GRUPO`** em `catalog.js`:

```js
export const MAX_GRUPO = 20; // teto de grupo (acima disso: atendimento manual)
```

- [ ] **Step 2: cap 20 no servidor.** Em `create-checkout.js:66`, trocar `quantidade > 50` por `quantidade > MAX_GRUPO` (importar `MAX_GRUPO`), e a mensagem pra "acima de 20 pessoas, fala com a gente em contato@brgrowthclub.pro".
- [ ] **Step 3: `contarAssentosVendidos`** em `notion.js` (paginado, soma `Quantidade` dos Pago Tipo≠Convidado):

```js
export async function contarAssentosVendidos(token, databaseId) {
  let total = 0, cursor;
  do {
    const body = { filter: { and: [
      { property: 'Lifecycle', select: { equals: 'Pago' } },
      { property: 'Tipo', select: { does_not_equal: 'Convidado do comprador' } },
    ] }, page_size: 100 };
    if (cursor) body.start_cursor = cursor;
    const res = await fetch(`${NOTION_API}/databases/${databaseId}/query`, { method: 'POST', headers: h(token), body: JSON.stringify(body) });
    if (!res.ok) throw new Error(`Notion contarAssentos ${res.status}: ${(await res.text()).slice(0,200)}`);
    const data = await res.json();
    for (const page of data.results) {
      const p = page.properties || {};
      let q = (p.Quantidade && typeof p.Quantidade.number === 'number' && p.Quantidade.number > 0) ? p.Quantidade.number : 0;
      if (!q) { const t = (p.Pedido && p.Pedido.rich_text && p.Pedido.rich_text[0] && p.Pedido.rich_text[0].plain_text) || ''; if (t) { try { const ped = JSON.parse(t); if (ped && ped.q>0) q = Number(ped.q); } catch(e){} } }
      total += (q || 1);
    }
    cursor = data.has_more ? data.next_cursor : null;
  } while (cursor);
  return total;
}
```

- [ ] **Step 4: guard no create-checkout** (após validar quantidade, antes de criar o lead). Degrada aberto se a contagem falhar:

```js
    const CAP = Number(env.MEETUP_CAPACITY || 70);
    try {
      const vendidos = await contarAssentosVendidos(NOTION_TOKEN, NOTION_DATABASE_ID);
      if (vendidos + quantidade > CAP) {
        return new Response(JSON.stringify({ error: 'Os ingressos esgotaram. Manda um e-mail pra contato@brgrowthclub.pro que a gente te avisa se abrir vaga.' }), { status: 400, headers });
      }
    } catch (e) { console.warn(`[${orderNsu || 'pre'}] capacity check falhou (segue):`, e.message); }
```

(Mover pra depois do cálculo de `quantidade` e antes do bloco Notion. `orderNsu` ainda não existe nesse ponto — usar literal `'pre'` no log.)

- [ ] **Step 5: env.** `wrangler.toml [vars]` + `MEETUP_CAPACITY = "70"`.
- [ ] **Step 6: copy "assento numerado".** Em `meetup-sp-s1-e1.html:55`, trocar `<b>Cada lote tem assento numerado.</b> Não tem fila de espera nem preço de volta: quando lota, lota.` por algo sem promessa de assento numerado, ex.: `<b>Quando um lote lota, o preço sobe e não volta.</b> Sem fila de espera: garantiu, tá dentro.`
- [ ] **Step 7: teste** do guard (lógica pura do limite): `assert(vendidos + q > CAP)` casos. E verificação ao vivo: setar `MEETUP_CAPACITY=1` temporariamente, tentar 2ª compra → 400 "esgotaram".
- [ ] **Step 8: Commit + deploy.** `git commit -am "feat(checkout): guard de capacidade + cap de grupo 20 + copy sem assento numerado (C3/W5)"`

---

## FASE 2 — Hardening

### Task 6: meetup-event.js estruturado + subject derivado + VALARM (W4, feature)

**Files:** Modify `gc-checkout/functions/_shared/meetup-event.js`, `email-templates.js`; Create `test/ics.test.js`

- [ ] **Step 1:** Refatorar `EVENTO` pra campos discretos e derivar `dataLabel`:

```js
export const EVENTO = {
  nome: 'Meetup Growth SP, S1 E1',
  localCurto: 'CRMBonus',
  endereco: 'R. Minas Gerais 316, 3º andar, São Paulo',
  data: '23 de julho de 2026',
  dia: 'quinta',
  hora: '17h30',
  dataCurta: '23 de julho', // pro subject
  inicioISO: '2026-07-23T17:30:00-03:00',
  fimISO: '2026-07-23T22:00:00-03:00',
  suporteWhatsapp: '5511970530947',
};
EVENTO.local = `${EVENTO.localCurto}, ${EVENTO.endereco}`;
EVENTO.dataLabel = `${EVENTO.data}, ${EVENTO.dia}, ${EVENTO.hora}`;
```

- [ ] **Step 2:** `email-templates.js` `eventoDisplay()` lê os campos discretos (sem split). Subjects usam `EVENTO.dataCurta` em vez de `'23 de julho'` hardcoded (linhas 214, 285).
- [ ] **Step 3:** `buildICS` ganha VALARM (lembrete 1 dia antes), antes de `END:VEVENT`:

```js
    'BEGIN:VALARM','TRIGGER:-P1D','ACTION:DISPLAY','DESCRIPTION:Meetup Growth SP é amanhã','END:VALARM',
```

- [ ] **Step 4:** teste `ics.test.js`: `buildICS('x')` contém `BEGIN:VALARM`, `DTSTART;TZID=America/Sao_Paulo:20260723T173000`, e escapa vírgula no LOCATION.
- [ ] **Step 5:** Commit.

### Task 7: email retry (S1) + escape HTML (S6)

**Files:** Modify `gc-checkout/functions/_shared/email.js`, `email-templates.js`

- [ ] **Step 1:** `sendEmail` — 1 retry em 5xx/429 com backoff curto (`await sleep(800)`), dentro do try. Não retry em 4xx (erro de payload).
- [ ] **Step 2:** `email-templates.js` — helper `esc(s)` (`&<>"`), aplicar em `primeiroNome`, `nomeComprador`, `tipoIngresso` interpolados no HTML.
- [ ] **Step 3:** teste: `esc('<b>')` → `&lt;b&gt;`. Verificação manual de um e-mail com nome `A<b>B` → renderiza literal.
- [ ] **Step 4:** Commit.

### Task 8: ghost.js NQL escape (S4) + JWT aud (S5)

**Files:** Modify `gc-checkout/functions/_shared/ghost.js`, `ghost-members-jwt.js`

- [ ] **Step 1:** `ghost.js` `isMember` — escapar aspa simples no e-mail antes do filtro NQL: `const safe = String(email).replace(/'/g, "\\'");` e usar `email:'${safe}'`.
- [ ] **Step 2:** `ghost-members-jwt.js` — após validar exp, checar `aud` se presente (ex.: termina com `/members/` ou casa `env.GHOST_API_URL`). Manter tolerante (só rejeita se `aud` existir e divergir do esperado), pra não quebrar tokens válidos.
- [ ] **Step 3:** Commit.

---

## FASE 3 — Polish / segurança / docs

### Task 9: CPF checksum (S2)

**Files:** Modify `gc-checkout/coletar.html`, `gc-checkout/functions/save-docs.js`; Create `test/cpf.test.js`

- [ ] **Step 1:** função `cpfValido(cpf)` (dígitos verificadores) — pura, testável. Adicionar em `coletar.html` (cliente) e replicar em `save-docs.js` (servidor, rejeita 400 se inválido).
- [ ] **Step 2:** teste com CPF válido conhecido e inválido.
- [ ] **Step 3:** Commit.

### Task 10: README + LGPD/retenção (S7, N3)

**Files:** Modify `gc-checkout/README.md`; Modify `coletar.html` (nota de privacidade); doc de retenção

- [ ] **Step 1:** Reescrever README: fluxo com grupo/cupom/e-mail (Mailgun)/magic-link/portal; tabela de endpoints completa (`create-checkout`, `checkout-webhook`, `save-docs`, `order-info`, `confirm-paid`, `member-status`, `subscribe-newsletter`, `check-member`, `minhas-compras`); secrets incl. `MAILGUN_API_KEY`; remover pendências resolvidas.
- [ ] **Step 2:** Política de retenção de CPF/RG: documentar (e agendar) deleção pós-evento. Nota na `coletar.html` reforçando uso restrito (já tem "dados ficam privados"; adicionar "apagamos os documentos após o evento").
- [ ] **Step 3:** Commit.

### Task 11: popup focus-trap + autoOpen prefill (N1, N4)

**Files:** Modify `growth-club-newsletter/theme/gc-site/post.hbs`

- [ ] **Step 1:** focus-trap no `.gctp-modal` (Tab cicla dentro; Esc já fecha). Pequeno handler de `keydown` Tab que mantém o foco entre o primeiro e último `input`/`button` visível.
- [ ] **Step 2:** após `detectMember().then` no init, se o overlay já estiver aberto (autoOpen via link pré-config) e o membro logado, aplicar `applyMemberToForm(m)`.
- [ ] **Step 3:** Deploy tema + commit.

### Task 12: lotes 2/3 grupo + nota de operação (N5)

**Files:** Modify `growth-club-newsletter/bin/meetup-sp-s1-e1.html`

- [ ] **Step 1:** Quando o Henrique ativar L2/L3, os stubs precisam do CTA `.gct-buy data-tipo="grupo"` e do texto de desconto de grupo no `duo`. Adicionar (comentado/pronto) o markup nos lotes 2 e 3 espelhando o lote 1, pra ativar trocando `data-state`.
- [ ] **Step 2:** Commit + (re)publish do conteúdo via Admin API quando ativar.

---

### Task 13 (opcional): cupom marca no checkout-time (W3)

**Files:** Modify `gc-checkout/functions/create-checkout.js`, `functions/checkout-webhook.js`, `save-docs.js`

Decisão default: **manter como está** (validar no create-checkout, marcar no pago) — é o trade-off documentado no plano original e o volume de cupom é baixo. Esta task só entra se um código vazar e for usado em vários checkouts antes de pagar.

- [ ] **Step 1:** Em `create-checkout.js`, após `validarCupom` retornar válido, marcar `Usado` na hora (mover `marcarCupomUsadoPorCodigo` pra cá). Aceita o custo de queimar o código em carrinho abandonado.
- [ ] **Step 2:** Remover a marcação de cupom do webhook e do save-docs (vira redundante).
- [ ] **Step 3:** Commit.

## Findings deferidos (com motivo)

- **S3 (rate-limit no `/check-member`, oráculo de enumeração):** adiado. Rate-limit real exige KV ou Durable Object (não configurados). Risco baixo (só revela membership, sem PII). Reavaliar se houver abuso. É inerente a qualquer fluxo login-first.
- **N6 (dois destinos "WhatsApp": comunidade no obrigado, suporte no e-mail):** intencional, sem ação. Documentar a distinção no README (Task 10).

## FASE 4 — Features (paralelo / pós-evento)

- **F1: Abandono de carrinho** — cron + e-mail Mailgun pros leads Pendentes com >Xh. (Já previsto no README; Mailgun pronto.) Cron via Cloudflare + endpoint que varre Pendentes e dispara `compradorEmail` adaptado ("seu lugar tá quase lá").
- **F2: Reenvio de bilhete pelo portal** — botão "reenviar e-mail" em `page-minhas-inscricoes.hbs` chamando um endpoint novo `/resend-confirmation` (autenticado por JWT, reusa `compradorEmail` + `.ics`).
- **F3: Preview de preço %-aware com cupom** — validar cupom no popup (debounce) e refletir o desconto extra na calculadora, em vez de só no checkout.
- **F4: Atribuição de assento** — se "assento numerado" virar promessa real, sistema de assento (grande; brainstorm próprio).
- **F5: Capacidade automática** — display de "X de 70 vagas" na LP + auto-flip de lote ao esgotar (estende `contarAssentosVendidos`).

---

## Verificação geral (smoke pós-Fase 1)

1. `cd gc-checkout && npm test` → tudo verde.
2. Compra individual (popup) → checkout `level-tech` → pago → 1 e-mail com bilhete + `.ics`.
3. Compra grupo 3 → /coletar mostra 2 cards → submit → 2 convidados `-P2/-P3` → re-submit NÃO duplica.
4. `?q=10` num pedido q=3 → 400.
5. Webhook re-entregue / save-docs+webhook → **1** e-mail só.
6. `MEETUP_CAPACITY=1` → 2ª compra barra com "esgotaram".
7. paid_amount < esperado → não marca Pago.
8. Backend off no popup (ind/dupla) → erro, **não** navega pra `leveltech`.

## Deploy (ordem)

1. `gc-checkout`: `npm test` → `rm -f .wrangler/cache/pages.json` → `wrangler pages deploy . --project-name gc-checkout --branch main` (conta Caner).
2. Tema: `git archive --format=tar.gz HEAD:theme/gc-site -o /tmp/gc-site.tar.gz` → R2 put → `POST /_gc/restart`.
3. Conteúdo: publish `bin/meetup-sp-s1-e1.html` via Admin API (`source=html`).
4. Notion: properties `Confirmação enviada` + `Valor esperado` criadas ANTES do deploy do gc-checkout.
