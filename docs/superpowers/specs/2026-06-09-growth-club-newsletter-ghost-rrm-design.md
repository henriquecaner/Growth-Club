# Design Spec — Newsletter própria no Ghost + Reader Revenue Manager (Subscribe with Google)

**Data:** 2026-06-09
**Status:** Aprovado (direção) — aguardando revisão do spec antes do plano de implementação
**Autor:** Henrique + Claude (brainstorming)
**Origem:** Henrique mandou o snippet de "sincronizar com CMS" do Reader Revenue Manager (Subscribe with Google basic) e pediu pra configurar no `growthclub.pro`. A sessão reescopou: de "colar snippet" pra "construir newsletter própria similar ao Substack + usar a stack do Google pra converter e monetizar".

---

## 0. Contexto e decisões desta sessão

O pedido inicial ("cola esse snippet em todas as páginas") foi reescopado porque o RRM **não converte nem monetiza nada sozinho** — ele só mostra prompts em cima de conteúdo editorial, e o `growthclub.pro` hoje é site institucional, sem artigos. O trabalho real não é o snippet (5 min); é o **sistema de publicação da newsletter**. O snippet é o último tijolo.

**Decisões travadas nesta sessão (entram como ADR no `STATE.md` — ver §15):**

1. **Plataforma = Ghost, self-hosted.** Dono dos dados, marca aplicável ao tema, assinatura + email nativos, RRM via Code Injection. Roda na infra do Henrique (VM), não no Cloudflare Pages — Ghost é app Node+MySQL e precisa de servidor 24/7.
2. **Substack: paralelo, migração gradual.** Importa os ~2.261 inscritos pro Ghost (importador oficial Substack→Ghost), mantém o Substack vivo no começo, valida deliverability no Ghost, depois desliga. Não queima o ativo principal.
3. **Tier pago via motor do Google (Subscribe with Google), não Stripe.** Decisão de founder consciente: Henrique ouviu o trade-off de custo (5% Google vs ~3,4% Stripe, sem revshare no self-hosted) e respondeu *"não ligo pro revshare e custo, quero aumentar autoridade e montar um case"*. A aposta é de **marca/pioneirismo** (Outlaw + build-in-public), não financeira. **Fundamentada:** a fonte do Google confirma que Subscription Linking *"is available to all publishers with paying readers, not just news… most outside the news vertical don't realize this tool applies to them"* — o "ninguém usa / ninguém conhece" tem base real.
4. **Arquitetura de pagamento desenhada pelo Henrique:** página de assinatura no `growthclub.pro` → pessoa assina via Google → API sincroniza pro Ghost como membro pago/grátis → rebaixa o tier se parar de pagar. **Pagamento e entitlement vivem no Google; o Ghost só recebe informação.**
5. **Foundation/spike split (mitigação de risco):** a newsletter **grátis** sai independente (Fase 1) sem depender do motor de pagamento do Google. O motor Google é um **experimento (spike) com gate go/no-go** montado por cima (Fase 2). A newsletter nunca fica refém de uma integração custom frágil nem de um recurso possivelmente não-elegível na conta.

**Por que o split importa:** o tier pago via Google depende de (a) elegibilidade ainda não confirmada na conta do Henrique e (b) uma integração custom Ghost↔Google sem suporte nativo. Travar o lançamento inteiro nessas duas incógnitas seria temerário. A parte grátis (lista + conteúdo + email + aquisição) não depende de nenhuma das duas e entrega valor sozinha.

---

## 1. Objetivo

Construir a newsletter do Growth Club no próprio domínio (substituindo gradualmente o Substack como casa do conteúdo editorial), com:

- **Aquisição** turbinada pela stack do Google (prompts de signup do RRM + presença no Google Discover/News/Search) — atacando o gargalo real de aquisição (hoje o único motor comprovado é 1 post de LinkedIn que trouxe ~524 cadastros).
- **Monetização** via tier pago processado pelo motor do Google (Subscribe with Google), como case de pioneirismo — montado como experimento gated, sem hipotecar o lançamento.

---

## 2. Arquitetura de alto nível

```
                    growthclub.pro  (Cloudflare Pages, estático — INTOCADO)
                    ├── site institucional v1 (AD-006/007)
                    └── /assinar           ← NOVA página de checkout SwG (Fase 2, swg.js manual mode)

                    boletim.growthclub.pro (Ghost, self-hosted na VM, Cloudflare na frente)
                    ├── posts = páginas web indexáveis (NewsArticle real)
                    ├── email nativo (newsletter) + lista de membros
                    ├── Code Injection: snippet RRM (Fase 1, openaccess signup)
                    └── conteúdo pago gated por tier (acesso via comp subscription, Fase 2)

                    Cloudflare Worker (sync backend, on-pattern — Fase 2)
                    └── recebe RTDN/Pub/Sub do Google → chama Ghost Admin API

   Google RRM / Subscribe with Google  →  pagamento + entitlement (Fase 2)
   HubSpot                             →  CRM canônico (pessoa) — sync deferido
   Notion Membros DB                   →  diretório (espelho read-only do HubSpot) — intocado
```

- **`growthclub.pro` continua exatamente como está** — estático, Cloudflare Pages, design system, funil. Ganha só uma rota nova (`/assinar`) na Fase 2.
- **Ghost mora em subdomínio** (`boletim.growthclub.pro`, nome a confirmar), com Cloudflare na frente (DNS/proxy/cache). É onde os posts viram páginas indexáveis, onde o email sai, e onde o snippet RRM entra via Code Injection.
- **Design system (AD-008)** vira um **tema Ghost custom** (Handlebars): tokens CSS, Satoshi+Roboto self-hosted, `<gc-header>`/`<gc-footer>` re-implementados. O visual não é perdido.

---

## 2.1 Flow de assinatura (os dois caminhos convergem num checkout único)

Validado com o Henrique. Os dois pontos de entrada terminam no **mesmo checkout** (`growthclub.pro/assinar`). O **Ghost nunca processa pagamento** — só redireciona.

**Caminho A — entra pelo site:**
`growthclub.pro` → clica em assinar → `/assinar` (Subscribe with Google) → paga via Google.

**Caminho B — entra pela newsletter:**
`boletim.growthclub.pro` (Ghost) → clica "Assinar" → **redirect** pra `growthclub.pro/assinar` → paga via Google.

**Convergência (server-side, após o pagamento):**

```
/assinar (swg.js, manual mode) → Google processa pagamento → RTDN/Pub/Sub: assinatura ativa
        ↓
  Cloudflare Worker (sync backend = hub do flow)
        ├─→ Ghost Admin API : cria/promove membro PRO (comp + expiry)   [acesso + email]
        ├─→ HubSpot         : cria/atualiza contato + status "pago"      [pessoa — CRM canônico]
        └─→ Notion Membros  : registra/atualiza a pessoa (escrita direta) [diretório — §3]
        ↓
  cancelou no Google → RTDN STATE_CANCELLED → Worker rebaixa Ghost p/ grátis + atualiza HubSpot/Notion
```

O Worker é o **único escritor** desse evento — é o ponto onde "pagou no Google" vira "é PRO no Ghost + está registrado". Toda a lógica de promover/rebaixar mora nele.

---

## 3. Modelo de propriedade de dados (governa todo sync)

Princípio herdado do sub-projeto Lead Magnets: **um campo = um dono = uma direção de sync. Nunca two-way no mesmo campo.**

| Sistema | É dono de | Direção |
|---------|-----------|---------|
| **HubSpot** | A **pessoa** — contato, atribuição, transações. System of record de identidade. | — (canônico) |
| **Ghost** | **Estado de assinatura + entrega de email + acesso a conteúdo** (tier free/paid). | — (canônico do seu domínio) |
| **Google (SwG/RRM)** | **Pagamento + entitlement** — *só dentro do spike pago (Fase 2)*. | — (canônico do pagamento) |
| **Notion Membros DB** | **Diretório da comunidade** — espelho read-only do HubSpot. | ← HubSpot (mirror D, já especificado em outro spec) |

**Arestas de sync no evento de assinatura (Fase 2):** o Worker é o único escritor e propaga numa direção pra cada sistema:
- `Worker → Ghost` — estado de assinatura/acesso (comp subscription).
- `Worker → HubSpot` — pessoa + status de pagamento (mantém o CRM canônico ciente do assinante pago).
- `Notion ← HubSpot` — espelho read-only (a forma canônica de "registrar no Notion" sem dar dois donos ao Notion).

**✅ Decisão (Henrique, 2026-06-09) — o Worker escreve nos dois:** no evento de assinatura o Worker grava em paralelo:
- **HubSpot** — contato + status "assinante pago" (mantém o CRM canônico ciente do assinante).
- **Notion Membros DB** — registra/atualiza a pessoa **diretamente** (ponte interina), pra ter o registro no diretório de forma imediata, sem esperar o mirror.

**Consolidação futura:** quando o **mirror-D** (HubSpot→Notion) for construído, ele **substitui** a escrita direta do Worker no Notion — o Notion volta a ter um dono só (HubSpot). Até lá, a escrita direta é uma exceção consciente e **upsert idempotente** (matching por email), nunca two-way no mesmo campo. A escrita no Ghost e no HubSpot continua sendo a do Worker.

---

## 4. Fase 1 — Fundação: newsletter grátis no Ghost (ships independente)

Não depende do motor de pagamento do Google nem de integração com HubSpot. Entrega valor sozinha.

### 4.1 Ghost self-hosted
- Provisionar Ghost (Node + MySQL) na VM do Henrique (`level-themachine` ou VPS dedicado — ver risco R-A em §11), atrás do Cloudflare.
- Subdomínio `boletim.growthclub.pro` (nome a confirmar) com SSL via Cloudflare.
- **Deliverability:** configurar provedor de envio em massa (Mailgun ou Amazon SES) com SPF/DKIM/DMARC no domínio. **Este é o item make-or-break da Fase 1** — newsletter sem deliverability é newsletter morta.

### 4.2 Tema com o Design System (AD-008)
- Tema Ghost custom (Handlebars) aplicando tokens CSS, fontes self-hosted, header/footer da marca.
- Reaproveita a gramática visual do site (`.wrap.is-narrow`, `.section-h2`, tipografia Satoshi+Roboto).

### 4.3 Migração gradual do Substack
- Importar os ~2.261 inscritos via importador oficial Substack→Ghost (membros grátis).
- Substack **continua publicando em paralelo** no começo (cross-post) até a deliverability do Ghost estar validada (taxas de entrega/abertura comparáveis).
- Critério de desligamento do Substack: N edições no Ghost com deliverability saudável (definir N no plano — sugestão: 4 edições).

### 4.4 RRM em openaccess (aquisição)
- Snippet `swg-basic.js` via **Ghost Code Injection → Site Header** (injeta em todas as páginas do Ghost).
- Config `:openaccess` (a que o Henrique já tem) — **só prompts de signup, não monetização**. Nesta fase o RRM serve aquisição: prompt de inscrição com login Google 1-toque + elegibilidade pra superfícies do Google (Discover/News/Search).
- `type: "NewsArticle"` agora é **verdade** (os posts do Ghost são artigos), resolvendo o problema semântico que existiria se colado no site institucional.

**Saída da Fase 1:** newsletter própria no ar, lista migrada, email entregando, aquisição via Google ligada. Tudo isso sem tocar pagamento.

---

## 5. Fase 2 — Spike de monetização via Google (gated)

O case de pioneirismo. Montado por cima da Fase 1, com gates go/no-go. Se um gate falhar, a Fase 1 já está no ar e o tier pago espera.

### 5.1 Gate #1 — Eligibility check (PRÉ-REQUISITO, 5 min, ação do Henrique)
No Publisher Center → Reader Revenue Manager → **Pricing plans / Subscriptions**: tentar criar um plano **pago** (preço em R$) e ver se pede vincular **Payments profile**.
- ✅ Consegue criar plano pago + vincular payments profile → porta aberta, segue.
- ❌ Só aparece contribuição/signup/registration sem assinatura paga → conta provisionada **só openaccess**; spike em espera até a porta abrir (rollout do Google é gradual). Fase 1 segue normal.

> ⚠️ **Verdade dura nº 1 — elegibilidade não confirmada.** A config atual (`:openaccess`) não cobra nada. O paywall pago do RRM exige payments profile vinculado + pricing plan pago + declaração For-Profit/Nonprofit, e o recurso ainda é liberado em rollout. **Nada na Fase 2 deve ser construído antes do Gate #1 passar.**

### 5.2 Página de assinatura em `growthclub.pro/assinar`
- Página standalone no site estático → **swg.js em "manual mode"** (sem markup de artigo numa landing standalone, o cliente inicializa em modo manual).
- Roda o subscribe flow do Subscribe with Google: o leitor assina e **paga via conta Google**.
- Estilizada com o Design System (AD-008).

### 5.3 Sincronização server-side (Cloudflare Worker — o hub do flow)
On-pattern com o ecossistema (serverless, vanilla):
- **Subscription Linking + Entitlements API** (`UpdateReaderEntitlements`) ligam a assinatura à conta Google do leitor.
- **RTDN via Pub/Sub** notifica mudança de estado (nova assinatura, cancelamento `STATE_CANCELLED`, refund) — em tempo real, sem polling.
- O **Worker** recebe a notificação e escreve nos três destinos do flow (§2.1): **Ghost** (promove/rebaixa o membro), **HubSpot** (contato + status pago), **Notion** (registro — via mirror ou ponte interina, conforme decisão §3).
- Idempotência: a mesma notificação reprocessada não duplica membro/contato (matching por email + Google subscription id).

### 5.4 Mapeamento de tier no Ghost (comp subscription)
> ⚠️ **Verdade dura nº 2 — a pegadinha está no Ghost, não no Google.** O Ghost Admin API **não tem suporte oficial pra criar membro *pago*** (issue TryGhost/Ghost#19823 aberta). O caminho viável é **comp subscription** (cortesia) com `expiry_at`: o Worker cria/atualiza o membro como comp a um tier pago e gerencia o ciclo de vida (renovar `expiry_at` enquanto o Google reporta ativo; rebaixar pra grátis quando reportar `STATE_CANCELLED`). Funciona pra **controle de acesso** (o membro com o tier lê o conteúdo gated). O **billing vive 100% no Google** — que é exatamente o que o Henrique quer ("Ghost só recebe informação").

- Conteúdo pago = posts gated por tier no Ghost (paywall server-side nativo do Ghost — conteúdo não vai no HTML sem o membro ter o tier).
- O Worker é a fonte que move o membro entre grátis ↔ pago conforme o estado no Google.

### 5.5 Gates go/no-go da Fase 2
1. **Gate #1:** elegibilidade (§5.1).
2. **Gate #2 (spike técnico):** PoC do loop completo num ambiente de teste — assinar via Google → RTDN chega no Worker → Ghost promove o membro → conteúdo gated libera. Cancelar → membro rebaixa. Se o loop não fechar de forma confiável em X dias de spike, reavalia (inclui o fallback Stripe documentado em §11).

---

## 6. RRM / Subscribe with Google — os dois papéis (não confundir)

| Papel | Fase | Mecanismo | Config |
|-------|------|-----------|--------|
| **Aquisição/distribuição** | 1 | `swg-basic.js` auto-prompt (signup) + superfícies Google (Discover/News) | `:openaccess` |
| **Pagamento + entitlement** | 2 | `swg.js` subscribe flow + Subscription Linking + RTDN | pricing plan pago |

O valor do Google **na monetização** é o case de marca, não o custo (o custo é pior que Stripe). O valor **na aquisição** é concreto e ataca o gargalo real.

---

## 7. Stack & infra

- **Ghost-on-VM é exceção consciente** ao padrão Cloudflare-serverless do repo (site v1, AI LIKE A PRO, Lead Magnets). Justificada: Ghost exige servidor Node+MySQL persistente; não há equivalente serverless que entregue email+membership+tema nativos.
- **O sync backend (Fase 2) é Cloudflare Worker** — fica on-pattern (serverless, vanilla, secrets via Cloudflare), consistente com Lead Magnets.
- **Repo:** novo e separado (precedente AI LIKE A PRO + Lead Magnets), sugestão `growth-club-newsletter` (tema Ghost + Worker de sync + página `/assinar`).

---

## 8. Segurança & privacidade (LGPD)

- Subscribe with Google e `swg-basic.js` são scripts de terceiro do Google — entram na política de cookies/privacidade já existente (AD-018). Atualizar a página de Privacidade com o novo processador (Google) e o novo subdomínio.
- RTDN/Pub/Sub e Ghost Admin API: secrets via Cloudflare secrets, nunca no cliente. Validar assinatura das notificações Pub/Sub.
- Dados de pagamento ficam no Google (PCI no escopo do Google, não nosso) — vantagem de privacidade do modelo.
- Consentimento de signup capturado no fluxo; copy LGPD clara no `/assinar` e no Ghost Portal.

---

## 9. Riscos & verdades duras

| # | Risco | Mitigação |
|---|-------|-----------|
| **R-A** | **Deliverability self-hosted.** É o calcanhar de Aquiles do Ghost self-hosted. Lista de 2.261 sem aquecimento pode cair em spam. | Mailgun/SES com SPF/DKIM/DMARC; migração gradual com Substack em paralelo; aquecimento de IP. |
| **R-B** | **Uptime/backup da VM.** Newsletter de produção numa VM pessoal tem risco de queda/perda. | Backups automáticos do MySQL + content; considerar VPS dedicado vs `level-themachine`; monitoramento. |
| **R-C** | **Elegibilidade do paid SwG** (Verdade dura nº 1). | Gate #1 antes de qualquer build da Fase 2. |
| **R-D** | **Ghost sem API de membro pago** (Verdade dura nº 2). | Workaround comp subscription com `expiry_at` gerenciado pelo Worker. |
| **R-E** | **Integração custom frágil** consumindo tempo do único Crew frontend. | Spike com Gate #2 e timebox; Fase 1 nunca depende disso. |
| **R-F** | **Fallback de monetização.** Se Gate #1 ou #2 falharem, o tier pago fica sem motor. | **Stripe nativo do Ghost documentado como plano B** — não é o plano (Henrique escolheu Google), mas existe como saída de emergência sem reescrever a fundação. |

---

## 10. Critérios de aceite

**Fase 1 (fundação):**
- [ ] Ghost no ar em subdomínio, atrás do Cloudflare, com tema aplicando o Design System AD-008.
- [ ] Email em massa entregando com SPF/DKIM/DMARC verdes; taxa de entrega comparável ao Substack.
- [ ] ~2.261 inscritos importados como membros grátis; Substack em paralelo até critério de desligamento.
- [ ] Snippet RRM `:openaccess` injetado via Code Injection; prompt de signup funcionando; posts indexáveis como `NewsArticle`.
- [ ] `growthclub.pro` institucional intocado.

**Fase 2 (spike gated):**
- [ ] Gate #1 (elegibilidade) registrado com resultado (✅/❌) antes de qualquer build.
- [ ] Os dois caminhos de entrada (site direto / Ghost-redirect) convergem em `/assinar`; o Ghost não processa pagamento.
- [ ] `/assinar` com swg.js manual mode roda o subscribe flow e cobra via Google.
- [ ] Worker recebe RTDN, promove/rebaixa membro no Ghost via comp subscription; conteúdo gated respeita o tier.
- [ ] No evento de assinatura, o Worker registra a pessoa no HubSpot (status pago) e no Notion (conforme decisão §3), idempotente.
- [ ] Cancelamento no Google rebaixa o membro pra grátis automaticamente.
- [ ] Nenhum secret/PII no cliente; notificações Pub/Sub validadas.

---

## 11. Dependências de setup externo (não bloqueiam o spec, bloqueiam o deploy)

- **Google Publisher Center:** publicação registrada (já existe — ID `CAow69bgCw`); payments profile vinculado + pricing plan pago (Gate #1) pra Fase 2; declaração For-Profit (Level Tech CNPJ).
- **Subscribe with Google:** acesso ao Subscription Linking + RTDN/Pub/Sub (projeto Google Cloud + tópico Pub/Sub) pra Fase 2.
- **Ghost:** instância self-hosted provisionada; Ghost Admin API key (Integration) pro Worker.
- **Email:** conta Mailgun/SES + DNS (SPF/DKIM/DMARC).
- **Cloudflare:** DNS do subdomínio; projeto Worker + secrets (Fase 2).
- **Substack:** export da lista pra importação.

---

## 12. Fora de escopo (explícito)

- **Mirror-D completo (HubSpot → Notion rico/read-only).** O Worker escreve o status de assinante no HubSpot e no Notion no evento de pagamento (Fase 2, §2.1/§3), mas o espelhamento rico e contínuo HubSpot→Notion (tier + summary, matching idempotente `HubSpot Contact ID` ↔ `Notion Page ID`) continua como spec própria. A Fase 1 (grátis) usa membership Ghost-nativo, sem tocar HubSpot/Notion.
- **Camada de remarketing/conversion APIs** (já adiada no Lead Magnets).
- **Two-way sync de qualquer campo.**
- **Multi-idioma** (v1 só PT-BR).
- **Migração de conteúdo histórico do Substack** além da lista de inscritos (posts antigos podem ficar no Substack ou importar depois — decidir no plano).

---

## 13. ADR a registrar (post-execution sync)

**AD-023 — Newsletter própria no Ghost + monetização via Subscribe with Google (foundation/spike).**

> ⚠️ **Flag de numeração:** o `STATE.md` tem colisão (AD-014–018 aparecem em duas séries por causa do reset-pivot de 2026-05-24). **AD-023** é o próximo número seguro (acima de tudo). Não renumerar o histórico.

Pontos do ADR:
- Newsletter própria no Ghost self-hosted, subdomínio, migrando do Substack gradualmente.
- Tier pago via motor do Google (Subscribe with Google) — decisão de marca/pioneirismo, custo explicitamente aceito pelo founder.
- Foundation (grátis) ships independente; SwG-payment é spike gated.
- Modelo de propriedade de dados (HubSpot=pessoa, Ghost=assinatura/email/acesso, Google=pagamento, Notion=espelho).
- Ghost-on-VM como exceção ao padrão Cloudflare-serverless; sync backend = Worker on-pattern.
- **Relação com decisões locked:** tier pago da newsletter é **produto avulso** (precedente AI LIKE A PRO, AD-009), **não** o tier de membership Master/Founder Member parqueado (AD-003/AD-020). Não viola "tier pago não aparece no site" (que é sobre membership da comunidade) nem "sem promessa de dinheiro no curto prazo" (que é sobre Crew/investidores). Registrar a relação, não tratar como trespass.

---

## 14. Flag pro Henrique (fora do escopo desta spec, mas importante)

**Drift entre CLAUDE.md e STATE.md.** A CLAUDE.md ainda descreve "Outlaw + Sage" e a régua "Se não tem número, não é Growth Club" como **locked**, mas o STATE.md tem AD-014 (reset de archetype → Hero+Magician) e AD-016 (régua editorial retirada). Os dois documentos estão fora de sincronia. Não afeta esta spec técnica, mas vale reconciliar a CLAUDE.md numa próxima passagem pra não confundir sessões futuras.

---

## 15. Próximos passos (sequência)

1. **Henrique faz o Gate #1** (eligibility check, 5 min) — destrava se a Fase 2 é viável já ou fica em espera.
2. **Revisar este spec** — ajustar antes do plano de implementação.
3. **`superpowers:writing-plans`** → plano da **Fase 1** (fundação) primeiro, que sai independente.
4. Fase 2 ganha seu próprio plano quando o Gate #1 passar.
