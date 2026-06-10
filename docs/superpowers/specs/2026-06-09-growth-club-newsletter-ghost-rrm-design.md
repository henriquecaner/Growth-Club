# Design Spec — Newsletter própria no Ghost + Reader Revenue Manager (Subscribe with Google)

**Data:** 2026-06-09
**Status:** Aprovado (direção) — aguardando revisão do spec antes do plano de implementação
**Autor:** Henrique + Claude (brainstorming)
**Origem:** Henrique mandou o snippet de "sincronizar com CMS" do Reader Revenue Manager (Subscribe with Google basic) e pediu pra configurar no `growthclub.pro`. A sessão reescopou: de "colar snippet" pra "construir newsletter própria similar ao Substack + usar a stack do Google pra converter e monetizar".

---

## 0. Contexto e decisões desta sessão

O pedido inicial ("cola esse snippet em todas as páginas") foi reescopado porque o RRM **não converte nem monetiza nada sozinho** — ele só mostra prompts em cima de conteúdo editorial, e o `growthclub.pro` hoje é site institucional, sem artigos. O trabalho real não é o snippet (5 min); é o **sistema de publicação da newsletter**. O snippet é o último tijolo.

**Decisões travadas nesta sessão (entram como ADR no `STATE.md` — ver §15):**

1. **Plataforma = Ghost. Hosting = Cloudflare Containers (decisão do founder, 2026-06-09).** Dono dos dados, marca aplicável ao tema, assinatura + email nativos, RRM via Code Injection. O founder optou por rodar o Ghost **inteiro no Cloudflare** (Containers + D1 + R2) como parte do case "tudo no ecossistema" — *ciente do aviso* de que é experimental e não-suportado pelo Ghost. Estruturado como **spike de infra com gate go/no-go + fallback pra VM via Tunnel** (§4.1/§7) pra não apostar a fundação num approach não-provado.
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

> **⚠️ Atualização (2026-06-09): subpath `/content`, não subdomínio.** O Henrique decidiu que o Ghost roda em **`growthclub.pro/content`** (não `boletim.growthclub.pro`), pra consolidar SEO no domínio raiz (melhor pro Google Discover/News). Onde o diagrama abaixo diz `boletim.growthclub.pro`, leia `growthclub.pro/content`. Implica: **Workers Route `growthclub.pro/content/*` → Worker do Ghost; resto → Pages** + Ghost com `url` de subpath (`https://growthclub.pro/content`). O Ghost suporta subdiretório no self-hosted (há receita com Cloudflare Workers). **Risco a validar (gate inicial da Fase 1):** a coexistência Worker-num-subpath + Pages no mesmo domínio teve limitação histórica no Cloudflare — testar com mini-spike antes de montar o resto, mesma disciplina do spike Ghost+MySQL. `/assinar` (Fase 2) também fica no domínio raiz (Pages).

```
                    growthclub.pro  (Cloudflare Pages, estático — INTOCADO)
                    ├── site institucional v1 (AD-006/007)
                    └── /assinar           ← NOVA página de checkout SwG (Fase 2, swg.js manual mode)

                    boletim.growthclub.pro (Ghost em Cloudflare Containers + D1 + R2 — spike, fallback VM)
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
- **Ghost mora em subdomínio** (`boletim.growthclub.pro`, nome a confirmar), **rodando dentro do Cloudflare (Containers — spike) com fallback VM via Tunnel**. É onde os posts viram páginas indexáveis, onde o email sai, e onde o snippet RRM entra via Code Injection.
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

### 4.1 Ghost em Cloudflare Containers (spike de infra com gate)

> **✅❌ RESULTADO DO SPIKE (2026-06-09)** — rodado na conta Caner (`c0ceab96`), Worker descartável `gc-ghost-spike` (imagem `docker.io/library/ghost:6-alpine`):
> - **Nível 1 — GO ✅:** o Ghost **roda no Cloudflare Containers**. Imagem oficial puxada direto do Docker Hub (sem Docker local — feature CF mar/2026); container subiu, Ghost **6.44** bootou, home `/` e admin `/ghost/` → **HTTP 200**. O runtime serverless comporta o Ghost.
> - **Nível 2 — NO-GO ❌:** **o D1 não serve de banco pro Ghost.** O Ghost não suporta SQLite em produção desde a v5.0 (e D1 = SQLite), e não foi desenhado pra serverless — exigiria fork do core. Confirmado pela comunidade Ghost + pela arquitetura. Nem cheguei a montar o adapter knex-HTTP: a barreira é de design, não de implementação.
> - **Implicação:** o *runtime* do Ghost **pode** ficar no Cloudflare, mas o **banco precisa ser MySQL** — que o Cloudflare não oferece gerenciado na própria infra. Caminhos: **(A)** Ghost-Container + **MySQL PlanetScale** via **Hyperdrive**; **(B)** **fallback VM** (Ghost + MySQL juntos, Cloudflare Tunnel na frente).
>
> **✅ Caminho A confirmado (Henrique apontou o Hyperdrive, 2026-06-09):** o **Hyperdrive cria um MySQL PlanetScale do próprio dashboard Cloudflare** (não só conecta), e já vem incluso no Workers Paid. PlanetScale a partir de ~US$5/mês. **Condições pro Ghost:** banco **unsharded** (default pro porte dele) + **foreign keys habilitados** (Ghost depende de FK; viável desde Vitess 18, nov/2023). **Nuance:** o dado vive na infra do PlanetScale (parceiro), gerenciado de dentro do CF — "no ecossistema" no sentido prático, não literal. **Risco residual a validar:** as migrations do Ghost passam limpas (mini-teste antes de migrar a base).
>
> **✅ VEREDITO FINAL (2026-06-09) — GO ponta a ponta.** Testado de verdade: Ghost 6.44 em CF Container + **Aiven MySQL grátis** (1GB, sem cartão; PlanetScale Vitess descartado por custar $39/mês). As migrations do Ghost rodaram no Aiven, e home + admin + **sistema de membros (Portal, magic-link, `/members/api/*`)** responderam HTTP 200, zero erros. **A arquitetura está provada:** runtime do Ghost no Cloudflare Container + MySQL gerenciado grátis (Aiven). **Decisão de banco: Aiven MySQL** (grátis), com Hyperdrive na frente na produção.
>
> **Notas de produção colhidas no spike:** (1) o Aiven free provisionou em **Califórnia** — latência Container↔DB alta; produção pede banco mais perto (SP se disponível) + **Hyperdrive** (pooling/cache) pra mitigar. (2) SSL no teste com `rejectUnauthorized:false`; produção deve usar o **CA cert do Aiven**. (3) Aiven free = 1GB (ok pro início; monitorar). (4) **Rotacionar a senha do Aiven** (foi exposta no chat durante o teste). (5) Containers exigem **Workers Paid (~US$5/mês)** — único custo real; o banco é grátis.

**Decisão do founder (original):** rodar o Ghost inteiro no Cloudflare (não em VM), pelo case "tudo no ecossistema". É experimental — então a Fase 1 **começa por um spike de infra com gate go/no-go**, antes de migrar os 2.261 ou ir a produção:

- **Gate de infra (go/no-go):** provar que o Ghost **boota e roda estável** em Cloudflare Containers com:
  - Banco no **D1** via adapter `cloudflare-d1-http-knex` (o Ghost usa knex). **Ponto de maior risco** — o Ghost suporta oficialmente só MySQL 8; migrations e queries dele podem não passar limpo no D1. Validar boot + migrations + CRUD de post/membro + login de membro.
  - Disco do Container é **efêmero** → mídia no **R2** (adapter `ghost-cloudflare-r2`); estado persistente via R2/FUSE ou Durable Objects storage (snapshots de Container ainda *coming soon*).
  - Container mantendo o Ghost de pé sem reciclar a sessão / perder estado.
- **✅ Gate passa** → segue pra tema + migração + RRM, tudo no Cloudflare.
- **❌ Gate falha** (D1 incompatível, container instável) → **fallback: Ghost em Docker na VM (`level-themachine`/VPS) via Cloudflare Tunnel** — a arquitetura "chata e sólida". Tema, migração, snippet e Worker são **os mesmos**; só muda onde o Ghost roda. **Zero retrabalho de fundação.**
- **Deliverability** (vale pros dois caminhos): provedor de envio em massa (Mailgun/SES) com SPF/DKIM/DMARC no domínio. **Item make-or-break** — newsletter sem deliverability é newsletter morta.

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

### 5.1 Gate #1 — Eligibility check ✅ PASSOU (2026-06-09)

**Resultado:** a monetização paga via Google **está habilitada na conta** do Growth Club. Confirmado por screenshots do Publisher Center:
- ✅ Perfil de comerciante **Aprovado** (conta de pagamentos `7236-3489-4477-1417`).
- ✅ **Preço/oferta criados** — "1 oferta ativa", "Defina preços para seu conteúdo". A incógnita do gate ("dá pra criar plano pago?") está respondida: **sim**.
- ✅ Identidade confirmada pra aceitar pagamentos; logo quadrado enviado; snippet adicionado.

**Bloqueios operacionais restantes (NÃO bloqueiam a Fase 1):**
1. **Dados bancários** pendentes na Central de Pagamentos do Google.
2. **Análise de conformidade de `growthclub.pro`** rodando — pode levar **até 2 semanas**; as CTAs/prompts do RRM só aparecem após aprovação.

> ⚠️ **Atenção — conformidade vs conteúdo.** O Google analisa a conformidade de `growthclub.pro`, que hoje é site institucional **sem conteúdo editorial**, e a política do RRM espera conteúdo de publisher. Isso **reforça a sequência foundation-first**: subir o Ghost (`boletim`) com conteúdo dá ao Google o que analisar. **Confirmar se a propriedade RRM (`growthclub.pro`) cobre o subdomínio `boletim.growthclub.pro`** onde o conteúdo vai morar — senão registrar a propriedade do subdomínio.

> ⚠️ **Dois snippets, não um.** O `:openaccess` (que o Henrique copiou) é pra conteúdo **grátis** — não cobra. Pra conteúdo **pago**, o RRM gera um snippet com **ID de produto pago** distinto ("use o snippet correspondente ao ID do produto para rotular conteúdo como pago"). Implementação: `:openaccess` nos posts grátis, product-id pago nos posts gated.

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
- **Hosting do Ghost = Cloudflare Containers (escolha do founder), com fallback VM.** O founder optou por rodar o Ghost no Cloudflare pelo case "tudo no ecossistema", ciente de que é experimental: **Container** (runtime Node) + **D1** (banco, via adapter community knex) + **R2** (mídia, já que o disco do Container é efêmero). Não-suportado pelo Ghost e sem precedente conhecido em produção → tratado como **spike com gate** (§4.1). **Fallback "chato e sólido":** Ghost em **Docker na VM via Cloudflare Tunnel** se o gate falhar — sem retrabalho de tema/migração/Worker. Em qualquer dos dois, DNS + cache + WAF + Worker de sync ficam no Cloudflare.
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
| **R-B** | **Ghost no Cloudflare Containers é experimental e não-provado.** D1 não é suportado pelo Ghost; disco efêmero; sem precedente de Ghost-em-Containers em produção. Pode não bootar/estabilizar. | **Spike de infra com gate go/no-go (§4.1)** antes de migrar/produção; **fallback Ghost-on-VM via Tunnel** sem retrabalho de fundação; backups (export D1 / dump). |
| **R-C** | **Elegibilidade do paid SwG** (Verdade dura nº 1). | Gate #1 antes de qualquer build da Fase 2. |
| **R-D** | **Ghost sem API de membro pago** (Verdade dura nº 2). | Workaround comp subscription com `expiry_at` gerenciado pelo Worker. |
| **R-E** | **Integração custom frágil** consumindo tempo do único Crew frontend. | Spike com Gate #2 e timebox; Fase 1 nunca depende disso. |
| **R-F** | **Fallback de monetização.** Se Gate #1 ou #2 falharem, o tier pago fica sem motor. | **Stripe nativo do Ghost documentado como plano B** — não é o plano (Henrique escolheu Google), mas existe como saída de emergência sem reescrever a fundação. *(Gate #1 já passou — risco rebaixado, mas o plano B fica registrado.)* |
| **R-G** | **Segurança do Ghost self-hosted.** CVE-2026-26980 (SQLi crítico, sem auth) afetou Ghost ≤ 6.19.0; app exposto é superfície de ataque. | Subir já em **≥ 6.19.1** e manter atualizado; WAF do Cloudflare na frente; Cloudflare Tunnel em vez de IP público; backups automáticos do MySQL. |

---

## 10. Critérios de aceite

**Fase 1 (fundação):**
- [ ] **Gate de infra:** Ghost boota e roda estável em Cloudflare Containers + D1 + R2 — ou fallback VM acionado — **antes** de migrar os 2.261.
- [ ] Ghost no ar em subdomínio, dentro do Cloudflare (ou VM via Tunnel), com tema aplicando o Design System AD-008.
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
- **Ghost:** instância provisionada — **Cloudflare Containers + D1 + R2** (spike) ou **VM + Docker via Tunnel** (fallback); Ghost Admin API key (Integration) pro Worker.
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

1. ✅ **Gate #1 feito (2026-06-09)** — monetização via Google **habilitada** (§5.1). Restam dados bancários + análise de conformidade (até 2 semanas).
2. **Revisar este spec** — ajustar antes do plano de implementação.
3. **`superpowers:writing-plans`** → plano da **Fase 1** (fundação) primeiro, que sai independente e dá ao Google conteúdo pra analisar (ajuda a conformidade a passar).
4. Fase 2 ganha seu próprio plano; o gargalo agora é **operacional** (banco + conformidade), não elegibilidade.
