# STATE: Growth Club
**Last Updated:** 2026-06-28

> **AI CONTEXT:** Append-only log of decisions, blockers, risks, and lessons learned. Never overwrite past entries.

---

## Recent Decisions (ADR)

### AD-049: Hardening de integridade da venda do meetup + convenção de acompanhante
**Data:** 2026-06-28. **Repos:** `gc-checkout` (Functions), `growth-club-newsletter` (tema/conteúdo). **Plano:** `docs/superpowers/plans/2026-06-28-meetup-sales-hardening.md`.

Ultra deep review da estrutura de venda (a pedido do Henrique) achou 4 críticos de integridade, todos no caminho vivo. **Baseline verificado ANTES de revisar:** `git fetch` (local == origin/main) + `curl` em produção byte-idêntico ao repo provaram que o código revisado é o que está no ar (evita revisar código morto). Fase 1 executada inline (tasks acopladas via `notion.js`) e **deployada da branch `sales-hardening`**:

- **C1 — convidados idempotentes + cap (commit 6050ce5):** `save-docs` recriava convidados a cada submit (`createGuest` = sempre INSERT) e as 2 superfícies de "gerenciar" (botão do e-mail + portal) reentram no `/coletar` → duplicava em uso normal. Agora `upsertGuest` por índice (`order_nsu <nsu>-P<idx>`: existe → update, senão → create). Cap rejeita (400) se convidados+1 > qtd PAGA (snapshot `Pedido.q`), bloqueando tampering de `?q=`; degrada aberto se o snapshot faltar.
- **C2 — e-mail duplicado (commit 5e90cdc):** o marcador de dedup (`Valor pago`) só era escrito pelo webhook, mas o `save-docs` também enviava sem marcar → webhook atrasado gerava 2 e-mails. Nova property `Confirmação enviada` (checkbox) checada+marcada por ambos (após envio OK); webhook re-checa após o sleep de 5s.
- **C3 — guard de capacidade (commit 9afbde8):** `create-checkout` soma os assentos Pago (`contarAssentosVendidos`: Quantidade dos compradores, exclui convidados) e recusa se > `MEETUP_CAPACITY` (env, 70); degrada aberto se a contagem falhar. Copy "assento numerado" removida (não há sistema de assento).
- **C4 — webhook valida valor, LOG-ONLY (commits 87d4c0f + 413fa0b):** `create-checkout` grava `Valor esperado`; o webhook LOGA divergência mas **NÃO rejeita** (pagamentos reais divergem do total "limpo" por cupom/arredondamento — ex.: Daniel pagou R$247,70 num grupo cujo cálculo limpo seria 260,40; rejeitar sem confirmar o payload do InfinitePay barraria venda legítima). Gate de status (4b) pendente do payload real.
- **W2 — links InfinitePay legados removidos (commit newsletter a259d98):** os 8 hrefs `leveltech` (conta antiga) eram fallback de pagamento pra conta errada; o fluxo real é o checkout dinâmico via API (handle `level-tech`). Botões viram gatilho puro do popup; fallback mostra erro, não navega.
- **W5 — cap de grupo unificado em 20** (server `MAX_GRUPO` = popup). Harness `node --test` (Node v25 nativo, zero deps) cobrindo preço/cap/contagem de forms.

**Convenção de acompanhante (commit 88a7d12) — regra travada pelo Henrique:** acompanhante (convidado) NÃO é pagante. `createGuest` cria com `Tipo='Convidado do comprador'`, **`Lifecycle='Acompanhante'`** (sai da view "Pagos", que passa a mostrar só pagantes reais), **sem `Valor pago`**, **`Tipo Ingresso` herdado** do comprador (Grupo/Pack com 2), `order_nsu=<nsu>-P<idx>`, cruzamento no corpo (nota no convidado aponta o comprador; nota no comprador lista os convidados). Registros antigos corrigidos via API: Diogo Romero → Acompanhante/sem valor, Tiago Marvila → Convidado, e os nsus do grupo Canton (backfill manual pré-feature) normalizados pra `-P2/-P3`.

**⚠️ PREÇO DE TESTE EM PRODUÇÃO (commits 7cb215c + newsletter 61804b9) — REVERTER ANTES DO EVENTO:** Lote 0 = R$1 ind / R$2 dupla / R$1 por pessoa grupo (`DESCONTO_GRUPO_PCT=0`), pra o Henrique testar os 4 tipos sem gastar. `git revert` dos 2 commits restaura R$124/198/30%. Apagar registros de teste do Notion depois.

### AD-048: E-mail de confirmação "bilhete" disparado no pagamento + entrega robusta + deliverability
**Data:** 2026-06-26. **Repos:** `gc-checkout` (Functions), `growth-club-newsletter` (tema), DNS Cloudflare.

Evolução do e-mail transacional de confirmação (base Mailgun `send.brgrowthclub.pro`, commit anterior de398dd) após feedback do Henrique:

- **Visual "bilhete" (commit c0a0681):** `email-templates.js` reescrito com header estilo bilhete da LP — corpo claro + canhoto escuro com picote, `S1 E1` em âmbar, grid Data/Horário/Local/Ingresso, barcode. Tabela bulletproof, mobile-first, `meta color-scheme=light` (anti dark-mode iOS). Botão WhatsApp estava com texto azul (cor de link default do cliente) → corrigido com `color:#FFFFFF` forçado + bgcolor na célula. Sem imagem externa (HTML sempre renderiza). Validado no iCloud real (caiu na CAIXA DE ENTRADA).
- **Botão "Gerenciar minha inscrição" (commit 9f37ca2):** CTA âmbar primário → `/coletar?nsu=X` (tela de cadastro de entrada do pedido; grupo completa dados de quem entra, portaria precisa de CPF/RG). WhatsApp vira secundário. `nsu` (`MEETUP-ts-uuid8`) tem componente aleatório e já vivia na URL de redirect, sem exposição nova. Convidado não recebe esse botão.
- **Disparo no PAGAMENTO APROVADO (commit e2a7994):** fecha o gap "pagou, fechou a aba sem preencher /coletar → nenhum e-mail". `checkout-webhook` passa a mandar o e-mail do comprador no pagamento, com **delay de 5s** (garante), `.ics` anexado, isolado em try/catch DEPOIS do markPaid (não pode quebrar a marcação Pago). **Dedup por `Valor pago`** (setado SÓ pelo webhook; `confirm-paid`/`save-docs` não setam valor) — re-entrega do webhook não reenvia. NÃO usa `Lifecycle` (o `confirm-paid` marca Pago no load do /coletar → daria falso positivo).
- **Rede de segurança (commit 7de9851):** `save-docs` reenvia o e-mail do comprador só se `Valor pago` fresco === 0 (webhook não chegou). Entrega passa a ser estritamente superior: webhook entrega no pagamento, save-docs cobre se falhar, sem double-send (valor é a trava simétrica). Convidados continuam saindo do save-docs (só existem após a coleta), cada um com `.ics`.
- **Verificado ao vivo:** o `setTimeout(5s)` dentro do `waitUntil` no Pages Functions sobrevive (tail mostrou `dt=5000ms | e-mail enviado`) — único primitivo que `node --check` não validava.
- **Popup login-first (tema, commit newsletter 37482b7):** o form vira um alerta forte pós magic-link ("Confirma pelo e-mail") com o e-mail em destaque + botões abrir webmail (Gmail/Outlook/iCloud por domínio; corporativo → Gmail+Outlook) + aviso de spam. Substitui a caixinha verde discreta.
- **Deliverability do magic link (diagnóstico, NÃO é misconfig):** headers do e-mail no spam mostraram **SPF=pass, DKIM=pass (`send.brgrowthclub.pro`), DMARC=pass** via Mailgun. Spam = reputação de domínio novo + conteúdo do template **core do Ghost** (emoji no assunto, URL com token crua). Mitigação: engajamento (marcar não-spam; o popup avisa) + warmup. **DMARC movido `p=none` → `p=quarantine`** (DNS, Workspace DKIM confirmado, seguro) — higiene + destrava BIMI; efeito direto no spam é modesto.

### AD-047: Portal de inscrições + compra login-first via Ghost (Fase 2/3 do checkout)
**Date:** 2026-06-26
**Status:** Fase B (portal) Accepted e no ar; Fase C (login-first) implementada e commitada, deploy/cutover pendente (combinado com o Henrique)

Pedido do Henrique: vincular as compras (order id) ao login do Ghost e entregar um portal persistente de gestão de inscrições, suportando múltiplas compras por pessoa. Plano: `docs/superpowers/plans/2026-06-26-login-first-portal-checkout.md`. Executado via subagent-driven (ledger em `.superpowers/sdd/progress.md`).

**Viabilidade técnica confirmada empiricamente:** o cookie de sessão do Ghost não cruza subdomínio, então o portal vive no **apex** (página do tema). O JWT de membro do Ghost (`/members/api/session`) é validável, mas o JWKS do Ghost 6.47 tem chave **1024-bit** (bug conhecido) que `jose` rejeita — contornado validando a assinatura RS512 **na mão via Web Crypto** (`crypto.subtle`), confirmado funcionar. Cloudflare engole status 502/504 da Function (ver L-008), então erros de app usam 4xx.

**Arquitetura entregue:**
- **Fase A (infra):** conta Ghost garantida no pagamento (`subscribeMember` no webhook + save-docs, label "Comprou Meetup S1E1"); helper `verifyMemberJWT` (`gc-checkout/functions/_shared/ghost-members-jwt.js`).
- **Fase B (portal, NO AR):** `findOrdersByEmail` (notion.js), endpoint `POST /minhas-compras` (valida JWT → orders), página `page-minhas-inscricoes.hbs` no apex (login Ghost + cards por order + link pra `/coletar`), link na `obrigado.html`. Página Ghost slug `minhas-inscricoes` publicada.
- **Fase C (login-first, implementada, deploy pendente):** `/check-member`, popup multi-step (email → check → signin/signup magic link), estado preservado em `localStorage` pro round-trip do e-mail, retomada ao voltar logado, **fallback** pro popup direto se a Members API falhar (protege a venda). O Ghost moderno exige **integrity-token** no send-magic-link (implementado).

**Cutover da Fase C** mexe no fluxo de venda ativo, então é deploy combinado (gc-checkout + tema) + teste e2e do magic link nos 3 caminhos, fora de pico. Pendente também: teste logado do portal (caminho feliz do JWT). Detalhes operacionais em [[project_meetup_checkout_system]].

### AD-046: Robustez do CRM do checkout — campos pós-pagamento, dedup, status Pago garantido
**Date:** 2026-06-26
**Status:** Accepted (implementado, deployado e validado ao vivo no `gc-checkout` + tema `gc-site`)

Refinamentos pedidos pelo Henrique após ver o CRM (base Notion "Meetup Growth") em uso, sobre a base do AD-045:

1. **Campos de venda só aparecem quando Pago.** Lead Pendente grava só contato + cupom; `Valor pago`/`Tipo`/`Quantidade`/`Tipo Ingresso` entram quando o pagamento é confirmado. Pendente = lead que não converteu; Pago = comprador real.
2. **Dedup de retentativa.** `create-checkout` reusa o lead Pendente da mesma pessoa pelo **e-mail** (decisão: só e-mail; telefone é chave instável — ver bug do auto-complete). Não duplica linha; preserva o `order`. `order_nsu` virou **lista** (cada retentativa anexa o nsu) e `findByOrderNsu` casa por `contains`, então pagamento de um link antigo ainda resolve a linha (evita paid-but-untracked).
3. **Preenchimento no Pago, sem depender do formato do webhook.** Webhook preenche só `Valor pago` (de `paid_amount`); NÃO deriva quantidade (o item da dupla é `quantity:1`, indistinguível do individual — derivar causava mislabel). `save-docs` preenche `Quantidade`/`Tipo Ingresso` (sabe pelos convidados coletados) + `Tipo`.
4. **Status Pago garantido em 3 travas:** webhook + `POST /confirm-paid {nsu}` no load da `/coletar` (chegar lá = pago, pois o InfinitePay só redireciona no sucesso) + `save-docs`. Limitação aceita pelo Henrique: pagar sem nunca preencher os docs deixa Quantidade/Tipo Ingresso vazios (ele faz followup por WhatsApp); o status Pago e o Valor ficam corretos.
5. **Máscara WhatsApp** remove o DDI `55` que o auto-complete cola (12+ dígitos), corrigindo o `(55) ...` que virava DDD.
6. **Link de carrinho pré-configurado:** a LP lê `?tipo=&lote=&q=&cupom=` e auto-abre o popup montado, pro Henrique mandar pra pessoas com o lote/tipo/quantidade/cupom já carregados.

Dois bugs pegos em revisão adversarial (dupla mislabel via webhook; pagamento de link antigo órfão) foram corrigidos antes do deploy e validados ao vivo (dedup → 1 linha com nsus acumulados; webhook com nsu antigo → linha resolvida e Paga). Detalhes em [[project_meetup_checkout_system]].

### AD-045: Venda de grupo (3+) com desconto automático + cupom de uso único no checkout do Meetup S1E1
**Date:** 2026-06-26
**Status:** Accepted (Fase 1 implementada, deployada e verificada ao vivo em `brgrowthclub.pro` + `checkout.brgrowthclub.pro`)

**Contexto:** o checkout do meetup só vendia individual (`ind`) e pack de 2 (`dupla`), com preço travado no servidor e sem cupom. Surgiu a necessidade de vender pra grupos de 3+ (caso concreto de um amigo) e de dar cupons de desconto pontuais. A conversa evoluiu pra um escopo maior (login-first via Ghost, dados ricos persistidos, portal de convidados), mas a investigação confirmou duas paredes do Ghost 6.47 — é 100% **passwordless** (autenticar exige magic link por e-mail) e **não tem custom fields** (membro só tem `name`/`email`/`note`/`labels`). Decisões do usuário: login-first com desvio (aceita a fricção do magic link) e dados ricos no Notion. Spec/plano: `~/.claude/plans/zippy-enchanting-cook.md`.

**Decisão — faseamento:**
1. **Fase 1 (esta — DONE):** calculadora de grupo 3+ + cupom de uso único + coleta de N pessoas, no popup atual. Vende grupos end-to-end sem esperar reconstrução de fluxo. Lógica de preço/cupom é server-side, então sobrevive intacta às fases seguintes.
2. **Fase 2 (roadmap):** fluxo de compra **login-first** via magic link nativo do Ghost (sem provedor de e-mail novo). Engenharia central: preservar o estado da compra no `localStorage` através do round-trip do e-mail e retomar via `?success=true` same-origin. Caveat: só o retorno `r=` same-origin é confirmado; não desenhar em torno de deep-link pós-magic-link.
3. **Fase 3 (roadmap):** portal de convidados no apex, protegido pela sessão Ghost (dissolve token próprio + PII em URL).

**Regras travadas (Fase 1):**
- Desconto de grupo = **30% sobre o `ind` do lote vigente, por pessoa**, fixo pra qualquer grupo de 3+ (L0 = R$86,80/pessoa).
- **Cupom** define um desconto **total acima de 30%** (substitui, não soma); rejeita ≤30%. **Uso único:** validado no `create-checkout`, "queima" (vira Usado) só no **pagamento confirmado** (webhook + save-docs, idempotentes).
- Quantidade gravada no registro Notion do comprador no `create-checkout`. Dados ricos no Notion; Ghost = e-mail + nome + label.

**Implementação:** repos `gc-checkout` (`catalog.js precoGrupo`, novo `coupons.js`, `create-checkout`, `checkout-webhook`, `save-docs`, `order-info`, `coletar.html`) e `growth-club-newsletter` (popup em `theme/gc-site/post.hbs`, conteúdo em `bin/meetup-sp-s1-e1.html`). Base Notion nova **"Cupons"** + props `Quantidade`/`Cupom` na base Meetup. Detalhes operacionais e pendência em [[project_meetup_checkout_system]] (memória).

**Pendência (Henrique):** conectar a integração Notion "Growth Club - Meetup" à base Cupons (Connections) pra ativar cupons — grupo sem cupom já funciona 100%.

**Lição associada (L-008):** Cloudflare Pages engole respostas com status 502/504 da Function (corpo JSON perdido, vira "error code: 502"); erro de aplicação que precisa entregar JSON ao front deve usar 4xx.

### AD-044: Restore de emergência growthclub.pro → brgrowthclub.pro (domínio expirou, sem caixa pra renovar)
**Date:** 2026-06-25
**Status:** Accepted (executado e validado ao vivo: site, email transacional, checkout no ar em `brgrowthclub.pro`)
**Context:** O domínio `growthclub.pro` expirou em 23/jun (B-002) e a renovação (~R$300) estava fora do orçamento no momento. Henrique comprou `brgrowthclub.pro` por R$12 e pediu a migração completa (Ghost + Mailgun + email transacional + checkout), aceitando explicitamente: (a) **abandonar** o domínio antigo sem redirect 301 — todo link de `growthclub.pro` no mundo (magic links em inboxes, checkout já compartilhado, SEO) quebra em ~agosto; (b) a **federação ActivityPub recomeça do zero** — a identidade `@handle@brgrowthclub.pro` não carrega seguidores do antigo (sem o domínio velho no ar, nem o `Move` do ActivityPub é possível). `brgrowthclub.pro` reintroduz o "BR" do nome aposentado (locked #1) — aceito como concessão de emergência.
**Decision:**
1. **Código (1 fonte de verdade):** `growth-club-newsletter/src/index.js` passou a derivar tudo de `PUBLIC_URL='https://brgrowthclub.pro'` + `PUBLIC_HOST` (tracker, theme-fetch do boot, analytics, host do keep-alive — eram literais duplicados). Sender Mailgun → `hey@send.brgrowthclub.pro`, auth `ghost@send.brgrowthclub.pro`. `wrangler.jsonc`: rota e zona → `brgrowthclub.pro`. Tema (`page-empresas/sobre/contato.hbs`, `package.json`) e `bin/meetup-sp-s1-e1.html`: mailto/url → novo domínio.
2. **DNS via API:** zona `brgrowthclub.pro` na conta **Caner** (`c0ceab96`). Token de DNS gerado programaticamente a partir de um token `cfut_` (criar-tokens) fornecido pelo Henrique — permission group "DNS Write" escopado na zona. Script `bin/apply-dns.sh` (idempotente) publicou 9 registros: apex `AAAA 100::` proxied + www, Mailgun (SPF `send.`, DKIM TXT `krs._domainkey.send.`, tracking CNAME `email.send.`, MX `send.`), SPF do apex (`include:_spf.google.com`), DMARC `p=none`. Workspace (MX `smtp.google.com` + TXT de verificação) o Henrique adicionou como alias. BIND de referência em `bin/dns-brgrowthclub.bind`.
3. **Mailgun:** free tier = limite de 1 domínio → **deletado** `send.growthclub.pro` (morto) e criado `send.brgrowthclub.pro` (US, DKIM via TXT pois Automatic Sender Security não veio na criação via API). Credencial SMTP `ghost@` criada, secret `MAILGUN_SMTP_PASSWORD` do worker atualizado. Domínio **verificado** (SPF/DKIM/MX `valid`).
4. **Banco (Aiven MySQL):** `bin/db-domain-rename.sql` rodado via Node+mysql2 (sem cliente local) com **backup lógico** prévio das linhas afetadas (`~/.config/growth-club/db-rename-backup-20260626.json`). Trocas ancoradas idempotentes (`https://`, `@send.`, `@`, `send.` pelado, `www.`) em posts/posts_meta/tags/users/settings/newsletters. 11 posts + 2 settings + 1 newsletter. Caso especial: `settings.mailgun_domain` = `send.growthclub.pro` (domínio pelado, usado pelo envio em massa) → `send.brgrowthclub.pro`. **Restart do container 2×** (Ghost cacheia `url` e settings em memória — só valem pós-boot).
5. **Checkout (gc-checkout) migrado de conta:** o projeto Pages estava na conta **growthlabs** (`c950171a`, "nem é minha"). Recriado na conta **Caner** (`gc-checkout-7yv.pages.dev`, pois `gc-checkout.pages.dev` segue preso na growthlabs), env vars versionados em `wrangler.toml [vars]`, 3 secrets reprovisionados (Notion/webhook/Ghost-admin), custom domain `checkout.brgrowthclub.pro` (HTTP 200). URLs de redirect/webhook do InfinitePay são montados de `CHECKOUT_BASE` por transação (sem config no painel). Smoke test ok.
**Consequences:**
- **Limitação real do tooling (lição L-008):** não há MCP do Cloudflare nesta sessão; o OAuth do `wrangler` só oferece `zone:read` (sem `dns_records:write` no menu de escopos) — deploys de Worker/Pages funcionam por OAuth, mas **escrever DNS exige token de API dedicado**. A extensão claude-in-chrome não estava conectada. O caminho que destravou foi o token `cfut_` (bootstrap) mintando tokens escopados via API.
- **Pendências:** (a) **anúncio** pros 2.764 (do domínio novo, escalonado — reputação de envio começa do zero); (b) deletar o projeto `gc-checkout` antigo na growthlabs; (c) atualizar `CLAUDE.md` e docs (dezenas de refs a `growthclub.pro`) — o `website/*.html` legado (descontinuado, AD-038) não foi migrado; (d) cache de borda do Worker pode servir HTML antigo até expirar (validação foi com `x-gc-bypass-cache`).
- **Segurança:** Henrique colou no chat um R2 token + chaves S3 (acesso ao bucket `gc-news-images`) e o token `cfut_` — ambos a revogar. Tokens operacionais salvos em `~/.config/growth-club/cf-dns-token` e `~/.config/mailgun/smtp-password-brgrowthclub` (chmod 600).
- **Resolve B-002** por migração (não por renovação). `growthclub.pro` segue parqueado e será abandonado.

### AD-043: Upgrade do Ghost 6.45 → 6.47 (habilita email sequences) + imagem pinada
**Date:** 2026-06-24
**Status:** Accepted (deployado e validado ao vivo: `content-version: v6.47`, todas as páginas-chave HTTP 200, Tinybird sincronizado)
**Context:** Henrique perguntou se o recurso "Email sequences for new members" (changelog Ghost de 24/jun) já dava pra usar no `gc-site`. Diagnóstico: o recurso é o flag de Labs **"Automations (beta)"**, habilitado no Ghost **v6.47.0** (lançado 24/jun); o `gc-site` rodava **v6.45.0**, então o toggle não existia no Labs. Em paralelo, o admin mostrava banner **"Your theme has errors"** — gscan acusava `config.custom.meetup_cta_url` declarado no `package.json` sem nenhum `{{@custom}}` consumindo (chave órfã desde que a escada de 4 lotes — AD-039/040 — tornou o link único de ingresso obsoleto; o CTA do hero passou a rolar pra `#lotes`).
**Decision:** (1) **Pinar a imagem** do `GhostContainer` no `wrangler.jsonc`: `docker.io/library/ghost:6-alpine` (flutuante) → `docker.io/library/ghost:6.47.0-alpine` (exata). Motivo (advisor): Cloudflare Containers pode cachear a imagem por tag e re-rolar a versão antiga num `wrangler deploy` com a mesma string — pinar força o re-pull E dá versão determinística (sem pulo surpresa pra uma 6.x futura). Bump de versão agora é deliberado. (2) **Remover** a chave órfã `meetup_cta_url` do `package.json` do tema + limpar o comentário em `post.hbs`. (3) Re-deployar os datafiles do **Tinybird** da tag v6.47 (endpoints `api_kpis`/`api_kpis_v2` mudaram — confirmado via `tb deploy --check`).
**Runbook executado (ordem):** tarball do tema corrigido → R2 (AppleDouble-safe, `meetup_cta_url`=0 validado) · pin da imagem + commit · `wrangler deploy --dry-run` (válido) · `wrangler deploy` (conta Caner `c0ceab96`; migrations forward-only no MySQL Aiven) · poll até 6.47 (cold start ~3-4 min, 503 inicial normal: re-pull da imagem + migrations) · `tb --cloud deploy` (deployment #2 promovido) · validação (versão, páginas, analytics).
**Caveats/lições:** Migrations 6.45→6.47 são **forward-only** — sem rollback de banco (o "rollback via Pages" do `wrangler.jsonc` só devolve o apex estático, não reverte o schema). Banner de erro de tema e disponibilidade do toggle "Automations" no Labs precisam de **confirmação no Admin UI** (endpoints `/themes/` e `/custom_theme_settings/` dão 403 com Admin API key — exigem staff session). **Todo bump futuro do Ghost exige re-sync dos datafiles do Tinybird da tag correspondente** (documentado no README do tema).
**Repos tocados:** `growth-club-newsletter` (wrangler.jsonc pin, theme package.json/post.hbs, README) + este (`STATE.md`).

### AD-042: Sistema de checkout + captura de lead do Meetup (gc-checkout) — popup → InfinitePay → Notion → coleta de docs → obrigado
**Date:** 2026-06-23
**Status:** Accepted (deployado e testado ao vivo no que é testável; cadeia webhook+redirect aguarda 1 transação real)
**Context:** A LP do meetup (AD-040/041) levava do botão de lote direto pra um link InfinitePay hardcoded — 3 cliques até o checkout, zero captura de lead, zero base pra abandono de carrinho ou onboarding pós-pagamento. Henrique pediu o fluxo completo: popup capturando Nome/Sobrenome/WhatsApp/E-mail → checkout pré-preenchido em 1 clique → registro no Notion (tabela própria do meetup, não Google Sheets como no ai-like-a-pro) → monitorar pagamento (Pendente→Pago) → coletar CPF/RG/LinkedIn/empresa pós-pagamento (portaria CRMBonus; pack de 2 coleta os dados das 2 pessoas e cria 2 registros) → página de obrigado com WhatsApp da comunidade + assinar newsletter (esconde newsletter se já for membro).
**Decision:** Projeto Cloudflare Pages separado **`gc-checkout`** (repo `github.com/.../gc-checkout`, deploy em `gc-checkout.pages.dev`, conta growthlabs `c950171a339aed18e05567d3cc6b1ce0` — mesma zona de growthclub.pro pra subdomínio futuro `checkout.growthclub.pro`). Pages Functions (edge) orquestram: **InfinitePay** (checkout via API pública `/invoices/public/checkout/links`, item inline, customer + `order_nsu` + `webhook_url` + `redirect_url`), **Notion REST v1** (CRM/estado, base `38889cac-40bd-805f-a07d-f5c98a05f4cd`), **Ghost Admin API** (opcional, só pro check de membro/newsletter). Endpoints: `create-checkout`, `checkout-webhook`, `save-docs`, `order-info`, `member-status`, `subscribe-newsletter`. Páginas: `coletar.html`, `obrigado.html` (paleta GC self-contained). Popup no tema (`post.hbs`, branch featured, classes `gctp-*`) intercepta os botões `.gct-buy` (`data-lote`/`data-tipo`) do miolo publicado via Admin API.
**Decisões-chave de robustez (validadas com advisor):**
1. **Checkout direto via API** (1 clique, item inline) em vez do link de produto (3 cliques) — assume gestão de estoque manual via virada de lote.
2. **Popup degrada pro link hardcoded** (o `href` de cada `.gct-buy` é fallback sem-JS E fallback de erro): se o `create-checkout` falhar, a venda nunca trava. Testado (stub de falha → redireciona pro link direto).
3. **`save-docs` também vira pra Pago** como rede de segurança independente do webhook — a doc do InfinitePay confirma que `redirect_url` só dispara no sucesso, logo chegar em `/coletar` é prova de pagamento. Testado (pack virou Pago sem rodar o webhook).
4. **`coletar` lê o tipo (ind/dupla) do Notion via `/order-info`**, não do `?t=` da URL — remove a dependência de o query param sobreviver ao redirect do InfinitePay (elo mais frágil). `?t=` vira só fallback.
5. **Check de membro/newsletter não-bloqueante**: sem `GHOST_ADMIN_KEY`, `member-status`→`{isMember:false}` e `subscribe`→fallback pro portal. A chave Admin do Ghost (site inteiro) **não** foi auto-conectada ao gc-checkout por decisão de segurança — fica como enhancement opcional.
**Testado ao vivo:** páginas estáticas (200), `create-checkout` (lead Pendente real + URL InfinitePay real + `order_nsu`), webhook simulado com payload exato da doc (`order_nsu`+`paid_amount` centavos → Pago), `save-docs` individual (enriquece CPF/RG/LinkedIn/Empresa) e pack (comprador Pago + 2ª pessoa "Convidado do comprador" criada com nsu `${nsu}-P2`), `order-info` (tipo do Notion), degradação de member-status/subscribe, webhook rejeita secret errado com 200. Popup validado isolado (abre, valida, degrada) + tema ao vivo (gscan ok, `gctp-overlay` renderizando). Registros de teste arquivados.
**Pendências:** (a) **link real da Comunidade WhatsApp** em `obrigado.html` (placeholder); (b) `GHOST_ADMIN_KEY`/`GHOST_API_URL` não setados → newsletter cai no portal em vez de 1 clique; (c) **Fase 2 — abandono de carrinho** (cron + e-mail via Resend + WhatsApp): não construído, falta provedor; (d) **cadeia webhook→redirect só é 100% verificável com 1 pagamento real** (sem sandbox no InfinitePay) — código testado, mas a chamada real do InfinitePay e o comportamento dos query params no redirect precisam da 1ª compra de verdade; (e) subdomínio `checkout.growthclub.pro` opcional (pages.dev funciona).
**Segurança:** tokens (Notion, webhook secret) só como secret do Pages, nunca no git (guardados em `~/.config/growth-club/`, chmod 600). CPF/RG = PII sensível: nunca logados, base Notion privada. Webhook secret-gated (responde 200 sem vazar em rejeição). `.assetsignore` mantém docs/configs fora dos assets públicos; `_test-notion.mjs` deletado antes do deploy.
**Relação:** estende AD-040/041 (LP do meetup) com a camada transacional. Substitui a abordagem de links hardcoded (que permanecem só como fallback).

### AD-041: Direção visual da LP de meetup = "O Bilhete" (painel de design 4-direções + efeitos Uiverse adaptados)
**Date:** 2026-06-23
**Status:** Accepted (deployado e verificado em produção)
**Context:** O hero do AD-040 (escuro #0A0A0A + countdown) era o "AI-design default #2" (near-black + accent) — genérico e destoando do site claro. Henrique pediu refino via skill `frontend-design`.
**Decision:** Rodado um painel de design (4 direções incompatíveis: Bilhete / Editorial de comunidade / Cronograma / Painel ao vivo, cada uma com mockup HTML renderizável — workflow `meetup-lp-redesign-panel`). Mockups apresentados como Artifacts; Henrique escolheu **"O Bilhete"**: a LP é um ingresso físico — corpo de papel claro + canhoto escuro (#16140F) recortado, série S1·E1, programação impressa, código de barras; a escada de 4 lotes vira mini-bilhetes (cada lote = um bilhete com canhoto de preço), 100% CSS (zero asset, CSP-safe). Base CLARA (alinha ao site, foge do default dark). Tipografia: contraste Satoshi Black 900 (display) × Roboto tabular caixa-alta (dados), sem fonte nova. Depois, a pedido do Henrique (referência ticket Uiverse), incorporados **efeitos premium na paleta GC** (não o dark+roxo do Uiverse): brilho holográfico no hover, tilt 3D leve, "ADMITE 01" gigante em âmbar com glow, grid âmbar animado no canhoto — todos com `prefers-reduced-motion` respeitado.
**Implementação:** classes prefixadas `gct-*` (isoladas das globais do tema `.gc-btn`/`.gc-section`/`.gc-proof`/`.gc-stamp` — zero colisão). Hero no `post.hbs` (branch `{{#if featured}}`), CSS no `gc-theme.css`, miolo (lotes/sobre/agenda/local/FAQ/prova) em `bin/meetup-sp-s1-e1.html` mantendo `data-on`. Countdown removido (a pressão agora é assento/preço, não relógio). gscan compatível Ghost 6.x; verificado ao vivo. Substitui o hero descrito no AD-040 (estrutura/redirect do AD-040 permanecem).
**Pendências:** mesmas do AD-040 — links InfinitePay (botões em `/membro`), tom da copy do miolo (passe humanizer separado), mudanças do tema sem commit.

### AD-040: Meetup vira template de LP de evento no tema + `/meetups/` redireciona pro vigente (sem feed)
**Date:** 2026-06-23
**Status:** Accepted (deployado e verificado em produção; pendências content-side não bloqueantes)
**Context:** A "página do meetup" rodava no `post.hbs` genérico (layout de artigo, `gc-narrow`, "Continue lendo" puxando posts aleatórios) envolvendo um HTML autocontido (`bin/meetup-sp-s1-e1.html`, deployado via Admin API por `deploy-meetup-lp.mjs`). E `/meetups/` era um **feed** (collection com filtros) — o nav, mega-menu e ~6 links da home caíam nele. O Henrique sinalizou: a página está "bem ruim" e, como **só existe 1 meetup vigente por vez**, clicar em "meetup" tem que cair direto no que está sendo vendido, nunca num feed.
**Decision:**
1. **`post.hbs` ganha branch `{{#has tag="#meetup"}}`** (tag interna casa por **nome** `#meetup` no helper `{{#has}}`, não pelo slug `hash-meetup` — esse é só pro `filter`/`get`). `featured:true` → LP de evento (hero dark com data/local/preço + countdown + barra de ingresso fixa, corpo estilizado como LP, **sem** "Continue lendo"); `featured:false` → recap de edição passada; senão → artigo normal (inalterado). Convenção `#meetup + featured = meetup vigente` (mesma régua do card da home).
2. **`meetups.hbs` deixa de ser feed:** faz lookup do `featured` e **redireciona** (`location.replace` + `<noscript><meta refresh>` + link visível). Sem meetup vigente → aviso + signup, nunca listagem. **Zero manutenção por edição:** trocar de edição = marcar o novo post como featured.
3. **Dados do evento via custom settings `@custom.meetup_*`** (status, date_label, date_iso p/ countdown, venue, price_label, cta_url, cta_label) — editáveis no Ghost Admin sem deploy. Defaults do S1E1 embutidos no `package.json` do tema.
4. **Reconciliação com a LP content-driven existente (híbrido):** a LP rica (ficha, agenda, escada de 4 lotes com `data-on`, lineup, FAQ `<details>`, CTA) **continua no conteúdo** (`bin/meetup-sp-s1-e1.html`, onde o mecanismo de virada de lote vive). Removida apenas a **ficha de data/local/ingresso** do conteúdo (o hero do template a substitui — sem duplicação). CTA do hero rola pra `#ingressos` (seção de lotes), então o link InfinitePay é content-side e **não bloqueia** o template.
**Files:** repo `growth-club-newsletter` — `theme/gc-site/{post.hbs, meetups.hbs, package.json, assets/css/gc-theme.css, assets/js/source.js}` + `bin/meetup-sp-s1-e1.html`. Deploy: tema via `tar gc-site → R2 → restart` (README §Deploy; o `bin/deploy-theme.sh` está **desatualizado** — aponta pro antigo `gc-news`); conteúdo via `node bin/deploy-meetup-lp.mjs --go`.
**Verified:** gscan compatível Ghost 6.x; ao vivo (`x-gc-bypass-cache`): `/meetups/` redireciona, LP com hero/countdown/facts/sticky/lotes, sem ficha-dup/Continue-lendo/Compartilhar, post normal intacto.
**Pendências (não bloqueantes):** (a) 2 links InfinitePay (`LINK_IND`/`LINK_PACK`) — botões caem em `/membro` (lista de espera) até serem passados; (b) tom da copy do corpo ("abrir caso", "tua cadeira", "sem palco e sem hype") ainda tem resquício do tom aposentado (AD-014/016) — passe de humanizer separado; (c) mudanças do tema ainda **sem commit** no repo (deploy usa o working tree).
**Relação:** estende AD-039 (LP republicada) e AD-038 (institucionais versionados no repo, copy fora do editor) pro motor de meetups.

### AD-039: LP do Meetup S1E1 republicada no molde da Edição 2 — "IA para Growth e Vendas", escada de lotes, data 23 jul
**Date:** 2026-06-22
**Status:** Accepted (LP no ar via lista de espera; abertura de venda pendente dos 2 links InfinitePay)

**Context:** Henrique pediu pra "lançar o meetup" e forneceu como referência canônica de copy/estrutura a página da **Edição 2** (`growthbrazil.notion.site`, exportada em MD). A LP `/meetups/sp-s1-e1/` já existia (post `#meetup`, featured, capa), mas com preço "A definir", CTA passivo de lista de espera, e — descoberto no processo — recaída de voz no registro **Outlaw aposentado** (AD-014/016). Data real consolidou de **9 jul → 23 jul 2026** (AD-019 registrava 9 jul, agora histórico).

**Decision:**
1. **Data 23 jul 2026 · 17:30–22h** (quinta) no auditório CRMBonus (Rua Minas Gerais, 316, 3º andar). Capacidade 70.
2. **Tema da edição "IA para Growth e Vendas"** (substituiu "RevOps com IA", estreito demais pro multidisciplinar). Painel 1 "AI GTM Engineer é o novo Growth Hacker?", Painel 2 "Criando agentes de IA para vendas B2B" (2 painéis de 1h, sem "Se vira nos 30"). Naming **S1·E1 mantido** (locked) sobre o "Edição N" da Ed2.
3. **Ingressos = escada de 4 lotes com FOMO** (preço sobe a cada lote esgotado, e não volta): individual **124 / 165 / 219 / 292**, dupla **198 / 264 / 351 / 467** (pack = 1,6× = 20% off por pessoa). Estoque 70 lugares (lotes de **20 / 30 / 10 / 10**); cada dupla consome 2 lugares. Lote 0 ativo, demais na escada. Virada de lote = manual ("no dedo").
4. **Checkout = InfinitePay** (Barte segue parqueado). Publicada hoje com botões → `/membro` (lista de espera) **temporário**; trocar pelos 2 links InfinitePay do Lote 0 abre a venda real.
5. **Voz realinhada ao reset** (AD-014/016): saiu o registro combativo ("abrindo o capô", "sem moderação de pergunta ensaiada"), entraram as frases canônicas da `/sobre/` ("Conversa entre pares, sem palco e sem hype"; "o que funcionou, o que não funcionou, e o número que prova"; blockquote "Profissional de Growth fala com profissional de Growth"). Passou pela skill `humanizer`.
6. **Estrutura enxuta** (molde Ed2 sem andaimes vazios): ficha → sobre → agenda → ingressos → lineup (1 parágrafo honesto + régua dos 44) → espaço → FAQ → CTA. Galeria/cards de palestrante/chips de parceiro vazios cortados até ter conteúdo real.

**Consequences:**
- **Técnica:** a LP é o post `sp-s1-e1` (banco), não template. Conteúdo enviado via Admin API `?source=html` como **HTML card** (`kg-card`) contendo `<style>` scoped + `<div class="prose">` — herda o sistema `.prose` + tokens do tema (eyebrow teal, Satoshi, `<h2><em>` âmbar). CSS custom só pra ficha/timeline/escada. **Sem deploy de tema** (within-column; full-bleed exigiria template custom → Founder Crew #1).
- **Fonte versionada:** `growth-club-newsletter/bin/meetup-sp-s1-e1.html` + deploy `bin/deploy-meetup-lp.mjs` (dry-run por default; `--go` publica; `LINK_IND`/`LINK_PACK` plugam o checkout). Editar a LP = editar a fonte + rodar o script.
- **Verificado no ar** (bypass-cache): título, 4 lotes/preços, painéis, blockquote canônico, botões → /membro, zero resíduo Outlaw.
- **Lição de processo (L-007):** preview de design tem que rodar na superfície real. Duas iterações erraram ("não combina com o site", "mobile quebrado") porque o artifact renderizava full-bleed com CSS paralelo; a correção foi inline do `screen.css` real + estrutura do `post.hbs` (coluna estreita).

**Pendências (na mão do Henrique):** (a) 2 links InfinitePay do Lote 0 → trocam lista-espera por venda; (b) **announcement bar** da home "9 jul → 23 jul" (manual em Admin → Design; API dá 403 em theme settings); (c) validação mobile; (d) 3 anúncios (e-mail/LinkedIn/WhatsApp) — rascunho após os links.

**Reversibility:** re-rodar o deploy com a fonte anterior, ou editar `bin/meetup-sp-s1-e1.html` + `--go`. Custo: 1 comando.

---

### AD-038: Institucionais viram templates `page-{slug}.hbs` + operacionalização do reset multidisciplinar (AD-014/015) no tema Ghost
**Date:** 2026-06-16
**Status:** Accepted (operacionaliza AD-014 + AD-015 + AD-016; avança B-001)

**Context:** Deep review pedido pelo Henrique ("refatorei a copy do site e depois do Ghost meio que voltou pro que era antes"). Achado: divergência repo↔Ghost. A copy refinada (alinhada ao reset AD-014/015) vivia em `website/*.html` (Cloudflare Pages, descontinuado no cutover AD-034), enquanto a home do tema `gc-site` tinha sido reconstruída espelhando o PMA com pegada **newsletter-first** ("Growth B2B de verdade em 10 minutos por semana"), contradizendo AD-014/015. As páginas institucionais (sobre, empresas, contato) renderizavam `{{content}}` do banco via `page.hbs` — copy fora do versionamento. Causa-raiz do recuo: **`CLAUDE.md` e vários docs nunca foram sincronizados com AD-014/015/016** (ainda listavam Outlaw+Sage e "Franco, com número, sem palco, com cerveja" como locked), o que reintroduziu o posicionamento antigo na reconstrução do tema.

**Decision:**
1. **Institucionais = templates custom `page-{slug}.hbs`** no tema (padrão que `page-planos.hbs` já usava): copy embutida e versionada no repo, ignorando o `{{content}}` do banco. A Página-stub no Ghost só cria a rota. Criados `page-empresas.hbs`, `page-sobre.hbs`, `page-contato.hbs`; `page-planos.hbs` ajustado. **Fonte única da copy institucional = repo do tema** (`growth-club-newsletter/theme/gc-site/`). Encerra a divergência repo↔banco.
2. **Home realinhada a AD-014/015:** hero "A #1 comunidade de Growth multidisciplinar do Brasil" + corpo "Formas de se envolver" (4 cards) + "O que você pode esperar?" (Newsletter / Lives & Q&A / Meetups / AMAs). Newsletter rebaixada a **um** entregável entre vários. Voz de referência `growth-brazil.webflow.io` reconfirmada como canônica (AD-014).
3. **Nuance de membership:** a newsletter é **aberta** a todo membro; a comunidade no WhatsApp é **curada por aprovação**. "Todo membro — aprovado ou não — recebe a newsletter." Logo, a linguagem de triagem em `/recurso-comunidade` e `/membro-obrigado` está **correta** (não é regressão).
4. **`website/*.html` oficialmente superado** pelos templates do tema — candidato a arquivamento (evitar como fonte de verdade futura).
5. **Sincronização de docs (Fase 4 do reset, avança B-001):** `CLAUDE.md`, `brand/README.md`, `README.md` e docs internos (sponsors, community/start-here, founder-letter) atualizados nesta sessão pra refletir AD-014/015/016 (arquétipo Hero+Magician, ton-anchor novo, régua "sem número" aposentada, posicionamento multidisciplinar, termo "especialista").

**Consequences:**
- Deploy live e verificado (bypass-cache): `/`, `/empresas/`, `/sobre/`, `/contato/`, `/planos/`.
- Editar institucional agora = git + deploy do tema (`git archive` → R2 → restart, ~2-3 min), não o editor do Ghost.
- **RESIDUAL (flag aberto):** `home.hbs` ainda renderiza o ton-anchor **APOSENTADO** "Franco, com número, sem palco, com cerveja" (marquee, carimbo SVG, welcome card "O combinado") — conflita com AD-014. Preservado nesta sessão por engano (CLAUDE.md stale dizia "locked"); pendente decisão de remoção (afeta o desenho do bloco `gc-final-cta`).
- 3 commits no repo `growth-club-newsletter` main (`8a8d5ed` empresas, `3c3958f` home hero, `1c0fd9b` lote sobre/contato/planos) — **pendente push**.
- Nav: `/empresas/` e `/sobre/` podem não estar no mega-menu/footer — follow-up.

**Reversibility:** templates versionados em git; reverter = remover os `page-*.hbs` + redeploy. Custo: 1 commit + deploy.

---

### AD-037: Polish do site (navegação + faxina post/página) + descontinuação da integração Google/RRM
**Date:** 2026-06-14
**Status:** Done

**Context:** Sessão de pendências do site pós-cutover (AD-034). Henrique tocou os itens manuais no admin do Ghost (locale, revisão de páginas, navegação) enquanto o agente executou via Admin API + deploy de tema.

**Decisão / o que foi feito:**
1. **Locale pt-BR** setado (Settings → Publication language).
2. **Navegação primária** — 4 itens no admin (`Sobre /sobre/` · `Meetups /meetups/` · `Conteúdo /recursos/` · `Planos /planos/`). **Bug de tema corrigido:** o markup da nav vivia em `partials/gc-nav.hbs` com `{{#foreach navigation}}` cru, incluído via `{{> "gc-nav"}}` — o foreach iterava vazio porque só o helper `{{navigation}}` injeta a lista no contexto. Criado `partials/navigation.hbs` + trocado o foreach por `{{navigation}}`. Commit `8b97e44`.
3. **Faxina de conteúdo** ("post é post, página é página") — 5 seeds `recurso-*` + 1 draft (`excluido-voce-da-comunidade`) convertidos de **post→página** (delete+recreate via Admin API; `type` é imutável nos endpoints REST). 4 lixos deletados (`about`, `coming-soon`, `teste-do-caner`, `f77`). Backups completos (lexical+html) em `growth-club-newsletter/migration-backups/` (commit `0734486`). Posts 31→22, Pages 12→17. Hub `/recursos/` deixou de listar os seeds.
4. **Integração Google/RRM descontinuada (decisão do founder).** Avaliadas 3 rotas pra signup Google→Ghost: GIS custom (Worker valida JWT → cria Ghost member), CTA nativo do RRM, e Subscription Linking. **Todas descartadas.** Razões: (a) Ghost não tem login externo/SSO — Google só *cria* o member, não estabelece sessão (ainda manda magic link), então o ganho de "baixa fricção" é parcialmente ilusório; (b) RRM nativo criaria base de membros **paralela** ao Ghost (dois botões de signup, dois destinos); (c) Subscription Linking é Beta + server-side pesado, feito pra conteúdo pago (tier parqueado). Sem evidência de que fricção de signup seja gargalo (motor de aquisição comprovado = LinkedIn do Henrique). **O `swg-basic` do AD-036 (SEO/Discover) foi removido** do `default.hbs` a pedido do founder — site 100% nativo Ghost (commit `b886ae0`). **Não refazer sem evidência de que a fricção de cadastro está custando conversão.**

**Correção de registro (drift no AD-030):** o AD-030/AD-027 documentam o email **transacional** via Cloudflare Email Sending (`hey@mail.growthclub.pro`). O código real do Worker (`src/index.js:92-109`) **consolidou tudo no Mailgun** (`hey@send.growthclub.pro`, `smtp.mailgun.org:465`) — o CF Email Sending só autoriza `@mail.`, dando `550` no welcome (que sai com sender `@send.` da newsletter). **Estado real: bulk + transacional, ambos via Mailgun `@send.growthclub.pro`.** O AD-030 está desatualizado nesse ponto.

**Consequences:**
- Navegação, conteúdo e tema sincronizados; site limpo de qualquer camada Google/RRM.
- `growth-club-newsletter` (main): 3 commits — `8b97e44` (nav fix), `0734486` (backups), `b886ae0` (remoção RRM).
- Remoção do `swg-basic` = perda da elegibilidade Google Discover/News (aceita pelo founder).
- Reversibilidade: conteúdos em `migration-backups/`; RRM = `git revert b886ae0`.

---

### AD-036: RRM openaccess no ar + faxina do ActivityPub self-hosted
**Date:** 2026-06-12
**Status:** Done

**RRM (fecha o Plano 4):** snippet `swg-basic.js` do Reader Revenue Manager (config `:openaccess`, publicação `CAow69bgCw`) injetado no `<head>` do tema `gc-site` via `default.hbs`, **só em `{{#is "post"}}`** — `type: "NewsArticle"` só é verdade semântica em artigos, não nas páginas institucionais. Nesta fase o RRM serve **aquisição** (prompt de signup com login Google 1-toque + elegibilidade Discover/News/Search), não monetização (Fase 2 usa outro product-id). Validado em produção: 1 ocorrência em post, 0 na home. Optei pelo tema em vez do Code Injection do admin pro snippet ficar versionado no git.

**Faxina ActivityPub (fecha geladeira do AD-035):** removidos do Worker a classe `ActivityPubContainer`, o `AP_BOOT` (preload TLS) e os endpoints temporários (`/_gc/ap-bootlog`, `/_gc/kill-ap-old`, `/_gc/ap-ping`, `/_gc/restart-ap`); binding `ACTIVITYPUB` + entry de container + migration `v4` com `deleted_classes` (destrói os DOs com o estado `healthy` fantasma). Application órfã deletada (2 instâncias live encerradas), imagens `gc-activitypub` removidas do registry CF, secret `ACTIVITYPUB_MYSQL_USER_PASS` e bootlog do R2 apagados. A federação **permanece intacta** no proxy `ap.ghost.org`. **Bug latente corrigido na mesma passada:** o proxy AP usava `redirect:'follow'` que escaparia do Worker (o gateway responde `302` com `Location` absoluto na própria zona, e subrequest same-zone não reexecuta a route → cairia no origin errado) — trocado por follow manual reescrevendo o host de volta pro gateway (máx 3 hops). Achados por painel de revisão (4 lentes + refutação adversarial); user/database `activitypub` no Aiven ficam órfãos (drop manual opcional — não seguram conexão).

---

### AD-035: Substack migrado + Growth Club federado no fediverso (ActivityPub via gateway oficial)
**Date:** 2026-06-12
**Status:** Done

**Substack (fecha o Plano 3):** o importador one-click do admin falhou no serviço hospedado `migrate.ghost.org` (404/400 lado deles). Caminho executado: export ZIP + CSV do Substack (Henrique baixou) → `bin/import-substack.py` (Admin API): **23 posts** com slug/data/visibilidade originais (21 published/public + 2 drafts; tags `newsletter` + `#substack`) e **2.273 membros** (CSV convertido pro formato Ghost, upload `/members/upload/` 202 → job assíncrono, label `substack-import`, sem disparo de email). Gotcha de produção: User-Agent `python-urllib` leva 403/1010 do Bot Fight Mode do Cloudflare.

**ActivityPub (fecha "resolve o network"):** o self-host do serviço em Cloudflare Containers foi construído por inteiro (schema 81 migrations no Aiven em database isolado + user MySQL dedicado; imagem oficial espelhada via skopeo pro registry CF; TLS no MySQL via preload Node injetando ssl no mysql2 — socat não serve: MySQL é STARTTLS) e o serviço ficou **comprovadamente saudável dentro do container** (boot 4s, ping interno OK), mas o caminho DO→container permaneceu black hole (achados no código da lib: estado `healthy` fantasma persistido no DO storage; `portReadyTimeoutMS` é orçamento de tentativas — 120s viram ~35min com probes pendurados; entrega inbound incompatível com qualquer bind testado). **Decisão: pivô pro gateway oficial hospedado `ap.ghost.org`** — default da Ghost pra self-hosters; os 3 paths (`/.well-known/webfinger`, `/.well-known/nodeinfo`, `/.ghost/activitypub/*`) viram proxy com `X-Forwarded-Host`. Toggle Network OFF→ON registrou o site. **Validado: webfinger/nodeinfo/ator 200 — `@index@growthclub.pro` existe no fediverso.** Limites do free (2k followers / 100 interações-dia) folgados pra Fase 1; container/migrations ficam no repo como rota de upgrade documentada.

---

### AD-034: CUTOVER EXECUTADO — growthclub.pro inteiro é o Ghost (site unificado no ar)
**Date:** 2026-06-11
**Status:** Done (autorizado pelo Henrique: "cutover completo")

**Context:** Conclusão do AD-032. Pré-requisitos prontos: Plano A no ar (keep-alive + edge cache), tema gc-site doc-compliant (auditoria 6 lentes), 17 conteúdos migrados como draft, Admin API key disponível.

**Decision/Execution (3 fases, ~5 min de janela):**
- **Fase 1 (Admin API, Ghost ainda em /content):** tema gc-site enviado (zip) e **ativado**; 11 pages + 6 posts **publicados** (S1E1 com `featured:true` → destaque da home); page `about` e post `coming-soon` (defaults) despublicados. Limitações de integração descobertas: `/settings/routes/yaml/` e `/settings/` são **session-only** (403 pra API tokens) → routes.yaml movido pro BOOT_SCRIPT (melhor: disco efêmero perderia upload manual a cada cold start) e **locale pt-br ficou manual**.
- **Fase 2 (Worker):** rota `growthclub.pro/*` (Pages permanece deployado = rollback instantâneo removendo a rota); `PUBLIC_URL` apex; BOOT instala gc-site + escreve routes.yaml; endpoints internos com alias legado; **redirects 301** `/content/*`→`/*` (inclui `/content/ghost`→`/ghost` e tracking de email `/content/r/*`) e `/rss/`→`/recursos/rss/`; cache bypass na raiz; fix `x-gc-cache: HIT`.
- **Fase 3:** restart (boot ~75s) + validação **14/14 verde**: home gc-site, motores /meetups/ e /recursos/, pages, permalink de collection, redirects, feed, sitemap, 404 com marca, admin.

**Consequences:**
- **Site institucional (Pages) fora do ar no apex** — arquivado como rollback ≥30 dias (AD-032). DNS/MX intocados (email Google OK).
- **Admin mudou:** `growthclub.pro/ghost/` (o antigo /content/ghost redireciona).
- Pendências do Henrique: locale pt-br (Settings → General → Publication language); revisar as 17 páginas publicadas (foram ao ar na conversão crua do HTML); quotes/avatares reais; navegação primária no admin (Meetups/Conteúdo/Planos).
- Operação editorial nova: meetup que aconteceu ganha tag interna `#passado`; próximo meetup = `featured`. Announce do hero + stats editáveis em Design → Site-wide → homepage (custom settings).

---

### AD-033: Design v1 do tema gc-site aprovado — mix PMA × Creator Science + exceções deliberadas ao DS
**Date:** 2026-06-11
**Status:** Accepted ("abravamos seguir assim" — Henrique)

**Context:** Iterações de design no tema `gc-site` guiadas por navegação visual ao vivo no PMA (browser automation: hero é vídeo `hero.webm` de gradient mesh; mega-menu de 3 colunas com promo contextual; biblioteca dark com tabs de pílula) e pelo benchmark creatorscience.com trazido pelo Henrique (captura de email no hero, promessa de tempo, carimbo circular, card pontilhado). Henrique deu licença explícita pra **quebrar regras travadas dos documentos** em prol do design ("não precisa obedecer todas as regras... quero ir MUITO além").

**Decision — o que ficou aprovado:**
- **Hero**: mesh de gradiente animado em CSS puro (sem vídeo; blobs amber/teal + grão SVG) + announce pill dark com dot pulsante (S1E1) + headline com promessa de tempo ("Growth B2B de verdade, em 10 minutos por semana" — ⚠️ cadência semanal pendente de validação) + captura de email inline + avatares + ticker de quotes (placeholders).
- **Mega-menu**: painel contido 920px, 3 colunas (trilho › submenu › promo dark contextual), backdrop via `body:has()`.
- **Sem utility strip**: topo reservado pra announcement bar nativa do Ghost; "Entrar" foi pro header. Seção stats+copy removida (redundante com a trust line do hero).
- **Fundo neutro `#FAFAFA`** no lugar do Pub Cream `#F5F1E8` ("muito pastel") — override na camada do tema, escala inteira neutralizada (raised #FFF, void/sunken #EFEFEF/#F1F1F1). **Supersede parcialmente a paleta de fundos do AD-008** se confirmado no site todo.
- **CTA final "o brinde"**: ato escuro full-bleed — marquee outline do ton-anchor, mesh neon, glow seguindo o ponteiro, form glassmorphism, carimbo âmbar com anel girando. **Exceção deliberada à regra do DS "dark nunca vive sozinho"** (a página anoitece no finale: biblioteca → brinde → footer).
- **Acessibilidade (painel de críticos, workflow 3 lentes)**: botão primário = Growth Black sobre amber (8.6:1, antes 2.05:1 reprovado); token novo `--accent-amber-text #A87B30` pra texto amber em fundo claro; números íntegros (sem "+", referentes corretos).

**Consequences:** tema `gc-site` gscan-clean é o design de referência pro site inteiro (Plano C migra as 21 páginas nele). Pendentes de conteúdo: depoimentos reais com nome (placeholders no ticker), fotos de membros nos avatares, validação da promessa de cadência. DS AD-008 ganhará atualização formal (fundos neutros + amber-text + exceção dark-finale) quando o Henrique bater o martelo pós-site no ar.

---

### AD-032: Ghost vai pro apex — site unificado com benchmark PMA (Source + DS AD-008)
**Date:** 2026-06-11
**Status:** Accepted (direção aprovada pelo Henrique; spec em draft pra detalhamento)

**Context:** Henrique trouxe o Product Marketing Alliance (`productmarketingalliance.com` — Ghost 6.45 + Varnish + tema bespoke no domínio raiz) como benchmark e pediu pra "clonar template/páginas/recursos (de-para) e criar um tema Ghost suportado em cima, depois customizar". Decisão de fronteira: **não clonar o tema proprietário do PMA** (copyright + viraríamos clone visual) — mapear a **arquitetura de informação e features** (fatos funcionais, referência legítima) e construir tema próprio sobre o **Source** (tema oficial Ghost, MIT) vestido com o Growth Club Design System (AD-008). Hoje o Ghost vive em `growthclub.pro/content`; o site institucional (21 páginas) está no Cloudflare Pages no apex.

**Decision:**
- **Apex:** `growthclub.pro/` inteiro passa a ser Ghost. As 21 páginas do Pages migram pra dentro do tema (home/sobre custom templates; recursos/legais como Ghost pages; meetups como collection). Pages arquivado (não deletado) ≥30 dias pós-cutover.
- **Escopo v1 de motores:** Meetups (listagem filtrável) + Content Hub (biblioteca filtrável) + Página de planos (Growth Hacker free + avulsos, **sem** tabela de tiers — Master/Founder seguem parqueados e fora do site). Home/Sobre/Contato de base. **Fora do v1:** quiz/trilha, periodic table, job board, salary calc, certificações, sub-alliances.
- **DB no-sleep = keep-alive cron grátis** (Worker Cron → `/_gc/keepalive` com `SELECT 1` real; ping TCP não conta pro idle-detection do Aiven). Ressalva de fragilidade aceita; **edge cache é a rede de segurança** (anon cacheado + stale-while-revalidate).
- **Edge cache no Worker** (Cloudflare Cache API) = equivalente funcional do Varnish do PMA: cacheia HTML GET de visitante anônimo, bypass pra membro logado e `/ghost/*`.
- **Sequência em 3 sub-planos:** A (hardening infra — pré-requisito duro) → B (tema sobre Source + DS + 3 motores, construído em `/content`) → C (cutover apex + migração 21 páginas + redirects 301 `/content/*`→`/*`).

**Consequences:**
- Tema precisa **self-hostar o DS** (tokens/components CSS) — hoje o `gc-news` lê do Pages por same-origin; no apex o Ghost é a origem.
- Risco de cutover (derrubar site vivo) mitigado por: Plano A obrigatório antes, cache quente, rollback = reverter route pro Pages. Email Google Workspace não afetado (é MX/DNS, não HTTP) — auditar `/.well-known` antes.
- Spec: `docs/superpowers/specs/2026-06-11-ghost-apex-pma-benchmark-design.md`. Planos: `docs/superpowers/plans/` (A/B/C). Tema novo: `growth-club-newsletter/theme/gc-site` (base Source).
- Pendências pré-Plano-A: (2) AI LIKE A PRO vira Ghost page ou segue externo; (3) confirmar arquivamento do Pages. Decisão (1) DB resolvida (keep-alive).

---

### AD-031: Web analytics Tinybird no ar — datafiles deployados + 2º container de ingestão (traffic-analytics)
**Date:** 2026-06-11
**Status:** Accepted

**Context:** Ghost 6 tem web analytics nativo via Tinybird (ClickHouse). Workspace `GrowthClub` (org Level Tech, região us_east) criado pelo Henrique, vazio. Nosso Ghost roda em container custom `ghost:6-alpine` — sem os helpers do docker-compose oficial (`tinybird-login/sync/deploy`) nem o microserviço de ingestão. Descoberta-chave lendo o core do Ghost: a arquitetura tem 3 peças — Tinybird (dados), stats-reads (JWT direto do Ghost) e **ingestão via proxy `ghost/traffic-analytics`** (recebe page hits, enriquece UA/geo/hash-IP, encaminha pro `/v0/events`). Ghost NÃO posta direto. Henrique escolheu rodar o proxy como 2º Cloudflare Container.

**Decision:**
- **Datafiles deployados** no workspace via CLI `tb` (instalada por `uv tool install tinybird`; fonte = repo Ghost tag v6.44.1 `ghost/core/core/server/data/tinybird/`; `tb --cloud deploy`): 5 datasources (`analytics_events` + 3 MVs) + ~30 endpoints. Deploy #1 live em gcp/us-east4.
- **2º container** `AnalyticsContainer` (`ghost/traffic-analytics:1.0.244`, porta 3000) no mesmo Worker `growth-club-newsletter`, env `PROXY_TARGET=<api>/v0/events` + secret `TINYBIRD_TRACKER_TOKEN`. Rota pública `/content/_analytics/*` → proxy (strip do prefixo → `/api/v1/page_hit`).
- **Ghost config** (env `tinybird__*`): `adminToken` = **workspace admin token** (assina JWT pros stats-reads), `workspaceId`, `stats__endpoint`, `tracker__endpoint` (URL pública do proxy) + `analytics__enabled/url`. Secrets `TINYBIRD_ADMIN_TOKEN` + `TINYBIRD_TRACKER_TOKEN`.
- **Validado ponta a ponta:** `ghost-stats.min.js` injetado no site apontando pro proxy; page_hit de teste → proxy (202 `successful_rows:1`) → `analytics_events` (count=1).

**Consequences:**
- Custo: o 2º container some pra `sleepAfter` 2h; Workers Paid cobre. Mais uma peça pra manter.
- Contrato do endpoint de ingestão documentado na memória ([[project-newsletter-ghost-rrm]]): `?name=analytics_events` + header `x-site-uuid` + payload com `user-agent`/`locale`/timestamp ISO.
- Mata o warning de console `Tinybird analytics: No valid token received`. Dashboard Analytics do admin passa a popular conforme o tráfego real chega.
- Padrão reforçado: cada "atalho" do container único revela uma peça que o docker-compose dava de graça (R2 adapter, tema, agora o proxy de analytics).

---

### AD-030: Frente de email da newsletter concluída — bulk (Mailgun) + transacional (Cloudflare) ponta a ponta
**Date:** 2026-06-11
**Status:** Accepted (fecha AD-027)

**Context:** Sessão de execução fechou a frente inteira de email após uma cascata de incidentes encadeados (cada fix revelava a próxima camada). Estado final validado com logs reais (Mailgun events + cabeçalho Gmail + relay SMTP `250 OK`).

**Decision — arquitetura de email de dois domínios:**
- **Bulk (edições) = Mailgun**, sender `hey@send.growthclub.pro`. Três fixes que destravaram a entrega: (1) **espblock resolvido** trocando o sender de `caner@growthclub.pro` (apex, DMARC `p=reject; adkim=s; aspf=s` strict) pra `@send.growthclub.pro`, onde o DKIM do Mailgun (`pdk1._domainkey.send.growthclub.pro`) alinha; (2) **links quebrados** (`send.send.growthclub.pro` NXDOMAIN) resolvidos voltando `web_prefix` de `send` pra `email` via API Mailgun; (3) **cert TLS** do domínio de tracking (recurso pago) contornado **desligando o click tracking** — o Ghost já reescreve links pro próprio `/content/r/` (rastreio nativo), então não se perdeu nada. **Open tracking religado** (pixel invisível funciona via GmailImageProxy server-side). Log final: Accepted → Delivered (250 OK gmail-smtp-in, TLS+DKIM) → Opened.
- **Transacional (magic link/welcome/reset) = Cloudflare Email Sending**, sender `hey@mail.growthclub.pro`. Onboarding correto do subdomínio via dashboard (produto "Envio de Email/Email Sending Beta", NÃO "Email Routing" — Routing teria adicionado MX no apex e quebrado o Google Workspace). DNS auto-publicado em `cf-bounce.mail.growthclub.pro` (DKIM seletor `cf-bounce`, SPF, MX de bounce). Secret `GHOST_SMTP_TOKEN` = API token CF com permissão Email Sending: Edit (user literal `api_token`, host `smtp.mx.cloudflare.net:465` TLS implícito). Validado com nodemailer direto (`250 Ok`) antes do Ghost, e o test chegou na inbox (DKIM `mail.growthclub.pro`).
- **Reply-to = `hey@growthclub.pro`** (grupo Google Workspace no apex; MX Google intacto, sem Cloudflare Email Routing).

**Consequences:**
- DMARC strict no apex obriga: bulk SEMPRE de `@send.`, transacional de `@mail.`. Nunca enviar de `@growthclub.pro` apex por terceiro.
- Click tracking fica com o Ghost (nativo); Mailgun só faz open. Analytics de verdade virá do Tinybird (próxima frente).
- Lição operacional: o dashboard CF tem DOIS produtos de email com nomes parecidos — Email **Sending** (outbound, o certo) e Email **Routing** (inbound, perigoso no apex). Não confundir.

---

### AD-028: Credenciais vazadas em chat não serão rotacionadas (decisão do founder) + MCPs Mailgun/Aiven no projeto
**Date:** 2026-06-11
**Status:** Accepted

**Context:** As pendências de higiene de AD-023/AD-024 (rotacionar senha Aiven e token R2 vazados em transcript) seguiam abertas. Ao receber o plano de rotação via clipboard (`pbpaste | wrangler secret put`, sem o valor tocar o chat), o Henrique decidiu explicitamente **não rotacionar nada** — Aiven, R2 e a API key do Mailgun (colada no chat em 2026-06-11) ficam como estão. Risco aceito pelo founder; transcripts são locais na máquina dele.

**Decision:** Rotações canceladas e removidas da fila. Padrão de credenciais consolidado: secrets novos vivem em arquivos `chmod 600` fora dos repos (`~/.config/mailgun/api-key`, `~/.config/aiven/token`, `~/.config/growth-club/gc-admin-token`) e entram em Workers via `wrangler secret put` lendo do arquivo. **MCPs project-scoped** adicionados ao `.mcp.json` (commitado, sem secret inline): `mailgun` (`npx -y @mailgun/mcp-server`) e `aiven` (`npx -y mcp-aiven`), ambos com wrapper `sh -c` que lê a credencial do arquivo local. Token Aiven canônico = o gerado em 2026-06-11 sem expiração (descrição "MCP Claude Code - Growth Club - Ghost"); os dois de 2026-06-10 expiram sozinhos.

**Consequences:**
- `GC_ADMIN_TOKEN` foi rotacionado (era pré-requisito de operação, não higiene): gerado via `openssl rand` direto pra `~/.config/growth-club/gc-admin-token`, valor nunca passou pelo chat.
- Tools MCP carregam em sessão nova (ou `/mcp`); via REST os mesmos tokens já operam (poder ligar/desligar o Aiven daqui foi o que resolveu o incidente AD-025).

---

### AD-027: Identidade de email da newsletter — transacional `hey@mail.growthclub.pro` (Cloudflare) + bulk `send.growthclub.pro` (Mailgun)
**Date:** 2026-06-11
**Status:** Accepted (parcial — aguarda token Email Sending e grupo Workspace)

**Context:** Ghost separa email transacional (magic link, reset, convites — SMTP genérico) de bulk (edições — hardcoded Mailgun). O Henrique configurou o Mailgun em 2026-06-10 com domínio **`send.growthclub.pro`** (SPF/DKIM/MX verificados, conta US). Pro transacional, pediu remetente **`hey@mail.growthclub.pro`** (não `noreply@`) com respostas caindo num **grupo `hey@growthclub.pro`** do Google Workspace (a criar) — postura de marca "responde-se a gente, não a um robô".

**Decision:** Transacional via **SMTP do Cloudflare Email Sending** (`smtp.mx.cloudflare.net:465`, TLS implícito, user literal `api_token`, senha = API token com permissão Email Sending: Edit — secret `GHOST_SMTP_TOKEN`, fallback gracioso se ausente). `from` = `"Growth Club" <hey@mail.growthclub.pro>`. Respostas: **catch-all do Email Routing no subdomínio `mail.growthclub.pro`** (MX já aponta route1-3.mx.cloudflare.net) encaminhando pro grupo `hey@growthclub.pro`. Apex continua Google Workspace (routing CF da zona segue disabled — só o subdomínio roteia pela CF).

**Consequences:**
- **Restrição DMARC importante:** `mail.growthclub.pro` tem `p=reject`; o remetente das **edições** (bulk/Mailgun) precisa ficar em `@send.growthclub.pro` — usar `hey@mail.*` no bulk = rejeição em massa. Reply-to do bulk pode ser `hey@growthclub.pro` direto na config da newsletter no admin.
- Pendências: token Email Sending: Edit (Henrique) → `wrangler secret put GHOST_SMTP_TOKEN` → restart; grupo Workspace criado → registrar destination address (verificação por email) → criar catch-all rule.
- Mailgun do bulk ainda precisa ser plugado no admin do Ghost (Settings → Email newsletter → region US + domain `send.growthclub.pro` + API key).

---

### AD-026: Tema `gc-news` (Design System) construído e PARQUEADO por decisão do founder
**Date:** 2026-06-11
**Status:** Parked

**Context:** Plano 2 da Fase 1 (`docs/superpowers/plans/2026-06-11-newsletter-tema-design-system.md`) foi executado: tema Handlebars `gc-news` completo consumindo o Design System **same-origin** (Ghost em `/content` lê `tokens.css`/`components.css`/`chrome.css`/fontes e os web components `gc-header`/`gc-footer` direto do Pages — zero duplicação), gscan 0 erros, JSON-LD `NewsArticle` + `isAccessibleForFree` no post (adianta o Plano 4/RRM). Distribuição: tar.gz no R2 (`_gc/theme/`) servido pelo Worker em `/content/_gc/theme.tar.gz` e instalado pelo BOOT_SCRIPT a cada cold start (disco efêmero). Em meio ao incidente AD-025, o Henrique decidiu **pular o tema por agora**.

**Decision:** Tema fica **inerte**: código no repo `growth-club-newsletter` (`theme/gc-news/` + `bin/deploy-theme.sh`), tar.gz no R2, bootstrap instala os arquivos mas o Ghost segue no Casper (tema só vale quando ativado no admin). Ativação futura = Settings → Design → gc-news (1 clique) + Publication language `pt-br`.

**Consequences:**
- Custo residual: ~2s no cold start (download+extract de 4KB). Acoplamento documentado: o tema depende dos paths `/assets/*` do site no Pages.
- O requisito `NewsArticle` do Plano 4 volta a precisar de solução fora do tema enquanto o Casper estiver ativo (Code Injection pode cobrir).

---

### AD-025: Incidente 2026-06-11 — `/content` fora do ar; causa dupla (timeout de 20s no cold start + Aiven POWEROFF) e fixes permanentes
**Date:** 2026-06-11
**Status:** Accepted

**Context:** Site da newsletter caiu ("Failed to start container: The container is not listening in the TCP address 10.0.0.1:2368"). Investigação em camadas: (1ª causa) a lib `@cloudflare/containers` espera a porta por **20s default** (`TIMEOUT_TO_GET_PORTS_MS`), mas o cold start real leva 30s–3min (npm install do ghos3 a cada boot) — o container dormiu de madrugada (`sleepAfter: 1h`) e nenhum boot do dia coube no budget; (2ª causa, revelada após o fix) o **Aiven MySQL free estava `POWEROFF`** (política de free tier) — Ghost subia, não alcançava o banco e morria ("Container crashed while checking for ports").

**Decision:** (a) Override de `startAndWaitForPorts` no `GhostContainer` injetando `portReadyTimeoutMS: 240_000`; (b) endpoint de diagnóstico **`POST /content/_gc/dbcheck`** (token-gated) que testa TCP até o MySQL via `cloudflare:sockets` usando o secret existente, sem expor credencial; (c) **power on do Aiven via API REST** (`PUT /v1/project/gc-ghost/service/gc-ghost {"powered": true}`) com o token AD-028 — recovery sem abrir console; (d) timeout de 20s no fetch do tema no BOOT_SCRIPT (falha de tema nunca derruba boot).

**Consequences:**
- Recovery validado: Aiven RUNNING → dbcheck greeting 77 bytes → Ghost HTTP 200 em 1,2s.
- **Risco aberto:** Aiven free pode desligar de novo por inatividade. Sinais: `/content` 500 + dbcheck falhando. Runbook: power on via API (1 comando). Mitigações futuras: plano pago, keep-alive, ou migrar banco (que também resolveria a latência — serviço em `do-sfo`).
- Repo `growth-club-newsletter` agora tem remote: `github.com/henriquecaner/growth-club-newsletter` (privado, criado 2026-06-11).

### AD-024: Uploads do Ghost duráveis no R2 (imagens, PDFs, arquivos) + endpoint de restart
**Date:** 2026-06-10
**Status:** Accepted

**Context:** Primeiro upload real no admin (avatar do Henrique) retornou 404 — o disco do Cloudflare Container é efêmero e zera a cada restart; o Ghost grava uploads no filesystem local por padrão. O problema cobria também PDFs/arquivos de post (requisito explícito do Henrique) e atingiria temas no plano 2. Cloudflare Images foi avaliado e descartado pra uploads do editor (sem storage adapter Ghost mantido; API não é S3); Cloudflare Stream foi aceito pra vídeo, mas via embed de player no post (vídeo não passa pelo storage do Ghost).

**Decision:** Bucket R2 **`gc-news-images`** + adapter **`ghos3@3.1.0`** (S3-compatible, cobre os 3 storages do Ghost: `images`, `media`, `files`) instalado pelo entrypoint do container a cada cold start (~30s extras; sem Docker local não há imagem custom — evoluir pra imagem baked se incomodar). Worker serve `GET /content(/content)?/images/*` direto do binding R2 (cache imutável 1 ano, sem acordar o container). Secrets: `GHOST_R2_ACCESS_KEY_ID`/`GHOST_R2_SECRET_ACCESS_KEY`. Como o container sobrevive ao deploy do Worker (env/entrypoint só aplicam em start novo), foi criado o endpoint de manutenção **`POST /content/_gc/restart`** (token `GC_ADMIN_TOKEN`, fail-closed) que chama `Container.stop()` via RPC do DO.

**Consequences:**
- Imagens, PDFs e arquivos de post sobrevivem a restart do container. Vídeo = Stream embed (decisão de produto).
- Achado operacional: container roda em **gru21 (Guarulhos/SP)** — o TTFB ~1,5s é a viagem ao Aiven na Califórnia; mover o banco pra perto ou Hyperdrive vira a alavanca de latência.
- Credenciais R2 do token (escopo amplo: admin de buckets da conta) vazaram no chat — rotacionar por um token escopado em Object Read & Write no bucket único (pendência, junto com a senha do Aiven).
- Validação de escrita (upload real → R2) pendente do Henrique re-subir o avatar.

---

### AD-023: Ghost de produção no ar em growthclub.pro/content — Fase 1 infra executada
**Date:** 2026-06-10
**Status:** Accepted

**Context:** Spec da newsletter própria (Ghost + RRM, 2026-06-09) tinha a arquitetura provada em spike, mas a tentativa de subpath ao vivo retornou HTTP 500 — `container.fetch(request)` cru não repassa headers de proxy que o Ghost exige. O plano de infra (`docs/superpowers/plans/2026-06-09-newsletter-ghost-fase1-infra.md`) previa banco novo de produção, mas o Aiven free tier só permite um serviço grátis, e o banco do spike já tinha as migrations + dados validados.

**Decision:** Executado o plano com dois desvios conscientes: (a) **reuso do banco Aiven do spike como produção** (free tier único; estado persistente do Ghost vive ali); (b) **fix do 500 = injetar `X-Forwarded-Proto: https`, `X-Forwarded-Host` e `X-Forwarded-For` antes do `container.fetch()`** — equivalente ao `proxy_set_header` do nginx de referência do Ghost; a receita createtoday.io apontada no plano é paywall e nem servia (proxy de subdomínio com reescrita de HTML, sem membership). Worker `growth-club-newsletter` (repo próprio em `~/Documents/GitHub/growth-club-newsletter`) com routes **exata `/content` + wildcard `/content/*`** (wildcard sozinho não casa o path sem barra), `workers_dev: false`, SSL com CA do Aiven verificado (`rejectUnauthorized: true`). Worker e route órfã do spike (`gc-ghost-spike`) deletados.

**Consequences:**
- Ghost 6.44 servindo em `growthclub.pro/content/` (admin 200, members API 204), site institucional intacto no Pages.
- Secrets `GHOST_DATABASE_URL` + `GHOST_DB_CA` recuperados dos transcripts da sessão do spike (sem re-trabalho do operador) e configurados via `wrangler secret put`.
- TTFB ~1,5s (container EUA ↔ Aiven Califórnia). Hyperdrive (Task 5) adiado conscientemente — reavaliar se latência incomodar ou volume crescer.
- Pendências: rotacionar senha do Aiven que vazou no chat do spike (higiene; exige re-put do secret), deletar container app órfão `gc-ghost-spike-ghostcontainer`, configurar admin do Ghost (conta, tema, RRM = planos 2-4 da Fase 1).
- Custo: Workers Paid ~US$5/mês (Containers) + Aiven free 1GB.

---

### AD-022: Termo canonical da audiência é "especialista" — proibido "operador"
**Date:** 2026-05-25
**Status:** Accepted

**Context:** Voz Growth Club desde refino AD-011 usava "operador B2B" pra descrever audiência/membros (newsletter, Community, meetups). Funcional, mas mecânico — não conecta com arquétipo Hero+Magician (AD-014) nem com posicionamento multidisciplinar (AD-015). A home já usava "44 especialistas convidados" no grid de meetups passados, criando inconsistência interna (especialista no grid, operador no resto).

**Decision:** Termo canonical pra qualquer descrição de membro, audiência ou convidado é **"especialista"**. "Operador" só permanece em contextos jurídicos ("operados por Level Tech", "operacional"). Aplicada substituição site-wide via Python regex `\boperador(es)?\b` → "especialista(s)": 28 substituições em 13 arquivos HTML.

**Consequences:**
- Coerência interna: home, sobre, meetups, recursos, código de conduta usam "especialista" uniformemente.
- Falsos positivos preservados: "operadora" (Level Tech), "operacional" (logística), "operação" (processo) — `\b` regex preserva.
- ~120 ocorrências de "operador" em `docs/`, `brand/`, `.specs/` ficam pendentes — B-001 cobre.

---

### AD-021: "Mesa de canto" removido como metáfora editorial
**Date:** 2026-05-25
**Status:** Accepted

**Context:** O termo "mesa de canto" aparecia em 10 lugares no site (H1 membro, H1 historico, kicker meetups, H2 do meetup S1E1, OG descriptions). Foi cunhado como pitch editorial mas tem problema semântico: "ficar de canto" é experiência negativa, oposto de troca ativa. Henrique flagou: "INGUEM GOSTA DE FICAR DE CANTO NUMA MESA DE CANTO."

**Decision:** Remoção integral. Substituído por linguagem do pitch padrão da home:
- "comunidade" / "comunidade Growth Club"
- "especialista com especialista"
- "conversa entre pares"

10 substituições em 7 arquivos. Memory file [[feedback-mesa-de-canto-proibida]] criada com a regra.

**Consequences:** Pitch fica coerente com o resto da home. Sem mais metáfora confusa de "ficar de canto". Próxima reescrita de prosa deve usar exclusivamente o vocabulário canonical.

---

### AD-020: Tier pago Master removido do site público
**Date:** 2026-05-25
**Status:** Accepted

**Context:** Site referenciava em vários lugares o futuro tier Growth Hacker Master (R$ 690 early / R$ 990 regular, gatilho 2027). Em estágio orgânico atual (newsletter grátis, Community grátis, AMAs grátis), expor preço futuro de tier de membership cria fricção na conversão pra newsletter. Henrique: "isso pode assustar as pessoas".

**Decision:** Remoção de todas as menções a tier pago Master da copy pública. Reescrita de FAQ "Quanto custa fazer parte?" pra "Nada. Newsletter/Community/AMAs grátis." Removido tier-card de `/membro`, FAQ "Quando abre o Master?", roadmap card "Master + escala", AMAs reference de preço, OG description, meta-row "TIER ATUAL · MASTER 2027". Renomeada seção de Termos "Quando tier pago abrir" → "Produtos pagos avulsos".

**Consequences:**
- Site só mostra: newsletter grátis + Community grátis + AMAs grátis + workshops pagos avulsos (AI LIKE A PRO) + ingressos pagos de meetup (lotes anunciados antes de cada edição).
- AD-003 (Founder Member parqueado) e dados internos do Master continuam em STATE.md como histórico, mas não viram copy pública.
- Memory file [[feedback-tier-pago-nao-aparece]] criada com a regra.

---

### AD-019: Meetup S1·E1 reset — Barte parqueado, CRMBonus em 9 jul 2026
**Date:** 2026-05-25
**Status:** Accepted

**Context:** Edição original prevista (Meetup Growth SP · S1 · E1 · Revenue Operations com IA @ Barte, jun/2026) foi adiada sine die por mudança de hospedagem. CRMBonus cedeu o espaço pra primeira edição da Era S1 acontecer.

**Decision:** Reset completo da página `/meetups/sp-s1-e1`:
- **Data:** 9 de julho de 2026, 17:30 às 22:00
- **Local:** CRMBonus · Rua Minas Gerais, 316 — 3º Andar, Conj. 12 · São Paulo/SP
- **Formato:** 2 painéis (1h cada) com especialistas convidados + happy hour
- **Tema:** sem tema técnico específico (genérico multidisciplinar, "case com número aberto") — Barte tinha tema "RevOps com IA" que ficou parqueado junto
- **URL:** `/meetups/sp-s1-e1` (canonical, sem sufixo de venue)
- **Redirect 301:** `/meetups/sp-s1e1-barte → /meetups/sp-s1-e1` em `_redirects`
- **Página refatorada no wireframe 7-sessões** (hero · sobre o meetup · sobre a comunidade · convidados · conteúdo · CTA · realização e parceiros · time de realização + FAQ + closer)
- **OG image event-specific:** `og-meetup-s1e1.png` (1200×630)
- **JSON-LD Event schema** publicado

**Consequences:** "Barte" não aparece em copy pública. Quando voltar, vira S1·E2 ou S1·E3 com nova edição. Memory file [[project-meetup-s1e1-crmbonus]] criada.

---

### AD-018: Páginas legais enriquecidas + CNPJ Level Tech canonical
**Date:** 2026-05-25
**Status:** Accepted

**Context:** As 4 páginas legais (Privacidade, Termos, LGPD, Código de Conduta) estavam em "versão preliminar — em revisão jurídica" com conteúdo mínimo (~500 palavras cada). Falta de CNPJ específico (placeholder "CNPJ em registro") gerava ruído em LGPD/Termos. Necessário enriquecer pra cobrir cenários operacionais reais (compra de ingresso, retenção fiscal, cookies, ANPD).

**Decision:**
- **CNPJ canonical:** Level Tecnologia da Informação Ltda · CNPJ 64.685.768/0001-29. Aplicado em footer global, author-strip das 4 páginas legais, página do meetup, seção "Definições" dos Termos.
- **Privacidade:** 7 → 11 sessões. Controlador + DPO; categorias detalhadas; finalidades com bases legais; compartilhamento (Substack, Cloudflare, Notion, GA4, Meta, Tally, WhatsApp, gateway); cookies (`_ga`, `_fbp` com vida útil); retenção tabular; segurança (TLS 1.3, HSTS, SLA incidente 2d/5d); transferência internacional art. 33 LGPD; mudanças versionadas.
- **Termos:** 8 → 12 sessões. Definições (6 termos-chave); aceitação com regime empresa/PJ; oferta (5 produtos); PI com licença não-exclusiva do conteúdo de membro; cancelamento com prazos detalhados + direito de arrependimento CDC art. 49; indenização com 4 hipóteses; resolução amigável.
- **LGPD:** 4 → 7 sessões. Bases legais com art. citado; todos os 9 incisos do art. 18; decisão automatizada (declaramos que não usamos); crianças/adolescentes; ANPD com link gov.br/anpd.
- **Código de Conduta:** 5 → 9 sessões. Eventos presenciais (consentimento foto, gravação, álcool, anti-assédio); inclusão multidisciplinar; convidados/speakers; contestar decisão em 15d.

**Consequences:** Páginas legais saem de "preliminar" pra vigente. Site fica defensável legalmente sem virar lawyerese. Memory file [[reference-cnpj-canonical]] criada.

---

### AD-017: Site polish 2026-05-25 — omnibus de melhorias visuais e estruturais
**Date:** 2026-05-25
**Status:** Accepted

**Context:** Pós-deploy do site v1 + refino técnico (AD-013), bateria de polish em 1 dia de execução autônoma com check-ins pontuais do Henrique.

**Decision (omnibus):**
- **Meetup S1E1 cascade** Barte → CRMBonus (ver AD-019).
- **OG images PNG novas** 1200×630 (default + meetup-specific) substituindo SVG (mau suporte FB/LinkedIn). Geradas via Chrome headless renderizando HTML com fontes Satoshi self-hosted.
- **Meta tags consistentes** em todas 21 páginas: og:image:width/height/alt + twitter:image + canonical em todas indexáveis. 3 thank-you pages que estavam sem meta description ganharam.
- **Substack URL normalizada** `growthclub.substack.com` → `brgrowthclub.substack.com` em index.html JSON-LD + recursos/newsletter + assets/js/newsletter-form.js.
- **A11y — heading hierarchy** corrigida em 8 páginas: TOC sidebar `<aside class="toc"> <h4>` promovido pra `<h2>` (CSS `.toc h4` renomeada pra `.toc h2`, mesmo styling visual). 2 cards do membro promovidos `h3.card-h3` → `h2.card-h3`. ai-like-a-pro h3 → h2 da seção "Lista da próxima turma".
- **A11y — tracking pixels** 21 noscript imgs (Meta Pixel beacon 1×1) ganharam `alt=""` explícito.
- **Testimonials reais** no home: Huxley Dias (Loft) · Kalina Renno (Configr) · Giovanni Lucas (Zup Innovation) com fotos profissionais. Quotes extraídos via yt-dlp + ffmpeg do vídeo recap meetup SESSION 2 EP 2 (lower-thirds identificaram 5 speakers; 3 escolhidos cobrindo 3 ângulos: comunidade/networking/emocional). CSS `.home-testimonial-avatar img` adicionada. `.home-testimonial figcaption { margin-top: auto }` pra ancorar attribution no rodapé do card.
- **CTA final H1 fix** "Junte-se à comunidade…" quebrava em 4 linhas → 2 linhas via `<br>` explícito + font-size redução + max-width 30ch + `text-wrap: balance`.
- **FAQ home expandida** 5 → 12 perguntas.
- **Página meetup S1E1 refatorada** no wireframe 7-sessões (Topo · Hero · Sobre o meetup · Sobre a comunidade · Convidados · Conteúdo · CTA · Realização e parceiros · Time de realização + FAQ + Closer). Estrutura mais comercial — comunidade entra como Sessão 2 antes do CTA.
- **Forms Tally removidos** de `/contato` e `/lgpd` (loading copy desatualizada da Barte; redundante com canais diretos).
- **Footer dark theme aplicado** via `data-theme="dark"` no `<footer>` (era cream por bug de cascade); `color: var(--fg-secondary)` no elemento footer pra resolver `color: inherit` da `.foot-col a`; `.foot-bottom`/`.foot-legal` migrados pra `--fg-tertiary` (legível) em vez de `--fg-muted` (invisível).
- **Navbar** com underline amber animado no hover/active dos links + hover lift no CTA + glassmorphism subtle no scroll (`data-scrolled="true"` adiciona shadow). Tagline e chip de meetup tentados e removidos (info demais).
- **Footer "épico" tentado e revertido** — hero CTA, stats, manifesto pull, social row, build in public adicionados depois removidos a pedido do Henrique. CSS dos elementos ficou inerte em chrome.css.
- **Bugs L-003 latentes não-encontrados:** nenhum (Phase 3 do AD-013 tinha sido limpa).

**Consequences:** Site pública agora cobre os principais gaps de fundo (a11y, meta, performance), com posicionamento atualizado (CRMBonus) e voz limpa (sem mesa de canto, sem operador, sem tier pago). Próximos passos: alinhar docs internas (B-001).

---

### AD-016: Voz padrão sem regionalismo geográfico — mineiro tentado e rejeitado
**Date:** 2026-05-25
**Status:** Accepted

**Context:** Em meio ao polish (AD-017), tentei "tempero mineiro moderado" via Python regex (cê / tá / tão / vamo / pra) em 14 páginas, 41 substituições. Após visualizar o resultado, Henrique pediu reverter "urgente". Reversão via `git checkout 9ecc178 -- <files>` preservando os fixes posteriores (footer dark, CNPJ).

**Decision:** Voz Growth Club é editorial nacional/multidisciplinar — sem marcadores regionais (mineiro/paulista/carioca/nordestino). Mantém contrações coloquiais comuns ("pra", "tá", "tô" em diálogo) mas evita gíria/sotaque que mapeia pra uma região.

**Consequences:** Memory file [[feedback-voz-sem-regionalismo]] criada. Tentativas futuras de "humanizar" copy não usam regionalismo. Voz default já é humanizada (CLAUDE.md global manda usar humanizer skill) — adicionar regionalismo é overshoot.

**Lessons learned:** L-004 abaixo.

---

### AD-013: Refino técnico do site v2 — sprite, fonts prune, native details, scroll-driven, view transitions, Phase 4 criativo
**Date:** 2026-05-20
**Status:** Accepted

**Context:** Site v1 (AD-006/007) entrou no ar 2026-05-17 com refino de copy v2 (AD-011, 2026-05-18). Auditoria técnica pós-deploy expôs gaps que não eram visíveis na revisão de copy: (i) Lucide carregado síncrono via CDN `unpkg.com` em todas as 22 páginas (~190KB JS bloqueante por página, dependência externa terceira), (ii) 28 arquivos de fonte (~3.2MB) servidos no deploy quando o CSS efetivamente usa só 6 pesos (4 Satoshi static + 2 Roboto static — Satoshi não é variable apesar de o tokens.css declarar `font-variation-settings`, que é dead code), (iii) ~210 atributos `style="..."` inline espalhados por 17 páginas — anti-pattern que erode o Design System AD-008 como single source of truth, especialmente concentrado em meetup LP (73), membro (40), workshops/AI LIKE A PRO/contato/newsletter/comunidade (10-16 cada), (iv) FAQs implementadas como `<div><h3><p>` em vez de `<details>` (sem acessibilidade nativa, sem accordion exclusivo), (v) scroll-reveal via JavaScript IntersectionObserver (60 linhas) quando CSS `animation-timeline: view()` já é Newly Available, (vi) `onclick="..."` inline em `recursos/newsletter.html`, (vii) sem skip-link, (viii) sem cross-document view transitions apesar de o site ser multi-page estático, alvo ideal pra `@view-transition { navigation: auto }`. Modern Web Guidance (AD-012) instalado em paralelo virou régua técnica externa pra evitar repetir esses gaps na evolução.

**Decision:** Refino técnico em 4 fases, sprint único Phases 1-3 + check-in antes da Phase 4 (preferência Henrique, 2026-05-20):

**Phase 1 — Render path + native swaps:**
- **Lucide CDN → sprite SVG local.** `website/assets/icons.svg` (9.3KB, 28 `<symbol>`) gerado via curl de `unpkg.com/lucide-static@0.460.0` + parser Python. Consumo via `<svg class="icon" aria-hidden="true"><use href="/assets/icons.svg#NAME"/></svg>`. Removidos 22 `<script src="https://unpkg.com/lucide@0.460.0">` + 20 blocos inline `window.lucide.createIcons()` + `ensureLucide()`/`hydrateAllLucideIcons()` em `header.js`. CSS `.icon` em `components.css` define `width: 1em; height: 1em; stroke: currentColor; fill: none; stroke-width: 2`. Resultado: zero request externo, zero JS hydration, -190KB bloqueante por página.
- **Fonts pruned 28 → 6.** Auditoria via `grep font-weight` mostrou só 4 pesos Satoshi (400/500/700/900) + 2 Roboto (400/500) usados. Italic: `.t-emph` declarado mas nunca referenciado em HTML — dead code. `fonts.css` rewritten. 22 arquivos movidos pra `brand/legacy-fonts/` (fora do deploy). 3.2MB → 503KB (-84%). Preload `<link rel="preload" as="font" type="font/otf" crossorigin>` de `Satoshi-Regular.otf` + `Satoshi-Black.otf` em 21 páginas.
- **Native HTML upgrades.** Skip-link `<a href="#main" class="skip-link">` no `<gc-header>` template + CSS slide-down on focus em `chrome.css`. `id="main"` em `<main>` de todas as 21 páginas. FAQs em membro (4) + meetup LP (6) → `<details name="faq-membro/faq-meetup">` (accordion exclusivo nativo, zero JS). `onclick` inline em `recursos/newsletter.html` → âncora `#inscricao` + `scroll-margin-top`. `.t-emph` removido de `tokens.css`.

**Phase 2 — CSS consolidation:**
- **Utility layer** (~20 classes no fim de `components.css`): `.section-h2[.is-large]`, `.eye-label.is-block`, `.eye-label.is-center`, `.p-lead-lg/.p-lead-md/.p-lead-sm`, `.wrap.is-narrow` (880px), `.wrap.is-prose` (720px), `.bare-list`, `.stack-md/.stack-lg-2`, `.highlight-box`, `.info-card[.is-large]`, `.bg-orb[.is-top-right/.is-large/.is-med/.is-small]` (CSS vars `--orb-color`, `--orb-opacity`), `.z-content`, `.badge-soon`, `.price-row`, `.price-block[.is-muted]`, `.footnote`, `.form-placeholder`, `.em-amber`/`.em-teal`, `.card-h3[.is-teal/.is-amber]`, `.section.is-alt`.
- **`pages.css` cresceu** com componentes page-specific: `.countdown` (meetup LP), `.tl-grid.is-five`, `.sponsor-mark`, `.card.is-price`, `.tier-card` (membro Master teaser), `.embedded-form` (Tally iframe), `.member-form` + `dialog.gc-dialog`, `.memo` (AI LIKE A PRO leaked aesthetic), `.page-404-*`.
- **Refator das 7 páginas pesadas** (ordem por payback): meetup LP 73→12, membro 40→10, workshops 16→12, ai-like-a-pro 13→5, newsletter 13→6, contato 10→4, comunidade 11→5. Site total: ~210 → 101 inline-styles (-52%). Refator via `Write` (reescrita completa), não Edits incrementais — mais rápido e auditável.

**Phase 3 — Modern CSS upgrades:**
- **Cross-document view transitions.** `@view-transition { navigation: auto }` em `tokens.css` + `view-transition-name: site-header/site-footer` em `.nav`/`footer.gc-footer` no `chrome.css`. Chrome/Safari fazem cross-fade nativo entre páginas; Firefox degrada graciosamente para hard navigation. `prefers-reduced-motion` honrado via `@media` wrapper na duração customizada.
- **Scroll-driven animations.** `animation-timeline: view()` aplicado a `.problem, .layers, .timeline, .manifesto-big, .quote-section, .cta-final, .cta-inline, .article, .section` dentro de `@media (prefers-reduced-motion: no-preference) { @supports (animation-timeline: view()) }`. Substitui `scroll-reveal.js` (60 linhas + IntersectionObserver). Arquivo `scroll-reveal.js` **deletado**, auto-load no `header.js` removido. **L-003:** versão inicial usou `from { opacity: 0; transform: ... }` + `animation-fill-mode: both`, que deixou seções abaixo do viewport invisíveis em snapshots/screenshots/print/crawlers (porque `both` aplica o `from` state antes do range entrar). Smoke test via Chrome DevTools MCP pegou o bug imediatamente. **Correção locked:** animar **apenas `transform`**, manter `opacity: 1` sempre — efeito slide-up preservado, conteúdo sempre visível pra contextos não-scrollados.
- **`text-wrap: pretty`** global em `p, .t-body, .t-body-lg`; `text-wrap: balance` já existia em headings. `interpolate-size: allow-keywords` opcional em `<details>` pra animar abertura.

**Phase 4 — Refator criativo (3 páginas com check-in Henrique 2026-05-20):**
- **`404.html` — viewport-locked mini-manifesto.** `<html data-theme="dark">`, `body.page-404` com `min-block-size: 100dvh; display: grid; place-items: center`. Header/footer omitidos (CTAs centralizados + footer mono fallback com `/sobre`, `/newsletter`, `/meetups`). Numeral "404" em Satoshi Black `clamp(140px, 28vw, 320px)` com `text-shadow: 0 0 80px var(--accent-amber-glow)`. Eyebrow teal "Erro 404 · esse número não bate" reforça régua editorial #1 ("Se não tem número, não é Growth Club") como linguagem visual.
- **`membro.html` — `<form>` HTML nativo com validação semântica.** Substituiu o `form-placeholder` por `<form class="member-form" novalidate>` com 3 `<fieldset>` (Você / Operação / Contexto) cobrindo 7 campos: nome, email, LinkedIn (URL com `pattern`), role (`<select>`), empresa, setor (`<select>`), problema (`<textarea minlength=20>`), LGPD checkbox. `:user-valid`/`:user-invalid` pintam border teal/danger **só depois de interação** (não polui o estado inicial). `accent-color: var(--accent-amber)` no checkbox. Submit via JS leve (15 linhas) abre `<dialog id="member-confirm" class="gc-dialog">` com `@starting-style` pra animação de open + `transition-behavior: allow-discrete` em `display`/`overlay`. **Backend stub:** dados persistem em `localStorage['gc-membro-inbox']` + `console.info`. Fallback link `tally.so/r/BzLJO4` no footer do form pra quem prefere o Tally hospedado.
- **`ai-like-a-pro/index.html` — estética "memo leaked".** Mantém `<html data-theme="dark">`. `<article class="memo">` com classification banner vermelho pulsante ("CONFIDENTIAL · INTERNAL · DO NOT FORWARD"), badge "// LEAKED" amarelo rotacionado -2° no canto, FROM/TO/DATE/RE meta em mono teal, título "AI LIKE A PRO." em Satoshi Black `clamp(44px, 7vw, 88px)`, body em Roboto Mono com `<s>` strikethrough vermelho redacted ("Cursor", "Bolt", "Lovable" risados), lista com border-left teal + setas "→", `<details class="memo-agenda">` "// AGENDA COMPLETA [+ expandir]" com timestamps redacted, margin-note em Satoshi com border-left amber + assinatura "H.C., founder · Growth Club", footer "// next batch · pending approval" + 2 CTAs. Voz "franco, com número, sem palco" virou linguagem visual.

**Smoke test visual** via Chrome DevTools MCP (`python3 -m http.server 8765 -d website`): 5 páginas-chave (home, membro, ai-like-a-pro, meetup LP, 404) screenshoteadas em viewport 1280x900, **zero erros no console em todas**. Bug L-003 pego no 1º screenshot.

**Consequences:**
- 53 arquivos modificados, ~700 linhas adicionadas / ~700 removidas (refator líquido balanceado). 22 fontes deletadas do deploy (preservadas em `brand/legacy-fonts/`). `website/assets/` total: **3.9MB → 672KB (-83%)**.
- **Zero dependência runtime externa** no critical path do site (Lucide era a única, agora local).
- **Native-first**: `<details name>` substitui FAQ JS, `animation-timeline: view()` substitui `scroll-reveal.js`, `<dialog>` substitui modal custom, `:user-valid` substitui validação JS no membro form, `view-transition` substitui SPA-like navigation.
- **Design System AD-008 reforçado:** utility layer extraída elimina 100+ duplicações de inline-style. Founder Crew #1 herda gramática consistente — qualquer página nova começa com `.wrap.is-narrow > .section-h2 > .p-lead-lg` em vez de inventar inline.
- **Backend do form de membro continua TBD.** Spec L-001 de AD-011 ainda vale — dados ficam em `localStorage` + console enquanto a integração Tally/Google Sheets/backend custom não for decidida. Trocar pra `fetch(...)` quando o backend landar.
- **Phase 4 abriu vocabulário visual novo** que pode ser reaproveitado: `.page-404-*` no 404, `.member-form` + `dialog.gc-dialog` no membro (`<dialog>` virou primitivo do DS), `.memo` no AI LIKE A PRO (pode virar layout para "vazamento interno" futuro tipo "memo do livecast" se a estética colar).
- Browser support **escolhido como Baseline Newly Available implícito**: View Transitions (Chrome 126+, Safari 18+), `animation-timeline: view()` (Chrome 115+, Safari TP, Firefox 144+), `<details name>` (Chrome 120+, Safari 17.2+, Firefox 109+), `:user-valid` (Chrome 119+, Safari 16.5+, Firefox 88+), `interpolate-size` (Chrome 129+), `@starting-style` (Chrome 117+). Firefox degrada graciosamente em todas. **Sem polyfills** — não compensam o custo de bundle e adicionam complexidade.

**Alternatives considered:**
- **Manter Lucide CDN com `<link rel="preload" as="script">`** — descartado. Mesmo preload, é dependência terceira no critical path + 190KB JS pra usar 28 ícones. Sprite local zera o trade-off.
- **Replicar fontes em WOFF2** (compressão melhor que OTF/TTF) — descartado pra esta sprint. Brand source só forneceu OTF estático; conversão WOFF2 é candidato pra próxima passagem se Founder Crew #2 (designer) quiser otimizar mais.
- **Container queries em `.cards-grid` e `.tl-grid`** — descartado. Componentes sempre usados full-width dentro de `.wrap`, sem casos de uso em sidebar. ROI baixo, complexidade extra sem ganho real.
- **Manter `scroll-reveal.js` como fallback pra Firefox** — descartado. Site já honra `prefers-reduced-motion` desativando entrance — comportamento "sem animar" já estava codificado como aceitável. Reaproveitar o degrade existente é grátis.
- **Form do membro como SPA mini com framework** (Alpine/Stimulus) — descartado. Stack AD-007 proíbe build step e a validação nativa + `<dialog>` cobre 100% do caso sem framework.
- **Replicar dialog stack via biblioteca** (a11y-dialog, microdialog) — descartado. `<dialog>` nativo + `@starting-style` cobre a11y (focus trap, ESC, backdrop click via `closedby="any"` futuramente).
- **Refator pesado em todas as 17 páginas em Phase 2** — descartado em favor de "ordem por payback". As 4 páginas "Grupo C" (legais, obrigados) já estavam com < 5 inline-styles e ROI marginal — deixadas pra polimento orgânico em PRs futuros.

**Lessons learned (registradas separadamente em L-003 abaixo).**

---

### AD-012: Modern Web Guidance (Google Chrome) habilitado como plugin de skills
**Date:** 2026-05-20
**Status:** Accepted

**Context:** Site v1 (AD-006/007) e refinos pós-deploy (AD-011) rodam em HTML5 + Modern CSS + JS vanilla, sem framework, deployado em Cloudflare Pages. Founder Crew #1 (frontend, vibe coder) herdará a evolução do `website/` quando preenchida (AD-002). Esse setup tem dois riscos editoriais que motivam a decisão: (i) o modelo coding agent tem training cutoff de janeiro/2026 e pode tratar como experimental APIs que já entraram em Baseline Widely Available (View Transitions, container queries, `:has()`, anchor positioning, Popover API, content-visibility, Fetch Priority); (ii) sem régua técnica externa, decisões de frontend ficam refém da preferência ad-hoc de cada sessão, sem fonte vetada de plataforma. Em maio/2026 o time DevRel do Chrome publicou o **Modern Web Guidance** — pacote oficial de skills cobrindo 12 silos (accessibility, built-in-ai, css, css-layout, forms, html, passkeys, performance, privacy, security, user-experience, webmcp).

**Decision:** Plugin `modern-web-guidance@googlechrome` v0.0.169 (commit `1dee00c2ae94d2e0c26d4a0c9fecb87c52bd82f9`) instalado em 2026-05-20 via slash commands nativos do Claude Code:
1. `/plugin marketplace add GoogleChrome/modern-web-guidance` — registrou o marketplace `googlechrome` em `~/.claude/plugins/marketplaces/googlechrome` (sem `autoUpdate`).
2. `/plugin install modern-web-guidance@googlechrome` — instalou em `~/.claude/plugins/cache/googlechrome/modern-web-guidance/0.0.169` com scope `local` no `~/.claude/plugins/installed_plugins.json`, vinculado a `projectPath: /Users/henriquecaner/Documents/GitHub/Growth-Club`.
3. `/reload-plugins` — ativou.

Duas skills ficam disponíveis via Skill tool:
- `modern-web-guidance:modern-web-guidance` — search engine de guias vetados. Gatilho automático em qualquer task HTML/CSS/JS-cliente. Executa `npx -y modern-web-guidance@latest search "<query>"` em runtime, requer network na 1ª chamada; depois usa cache do npm.
- `modern-web-guidance:chrome-extensions` — Manifest V3 best practices. Não dispara no Growth Club no curto prazo (não há extensão planejada), mas fica disponível.

**Consequences:**
- Antes de tocar `website/**`, o Claude consulta o catálogo Modern Web Guidance — reduz risco de patterns obsoletos, dependências desnecessárias, soluções ad-hoc.
- Plugin **não** escreveu em `.claude/settings.json` do projeto. O Claude Code novo registra plugins de marketplace externo no `installed_plugins.json` global com `scope: local`. Convive sem conflito com `enabledPlugins` legacy do `.claude/settings.json` (onde estão `frontend-design`, `superpowers`, `chrome-devtools-mcp`).
- Domínio complementar ao `frontend-design` (estética/UX) e `chrome-devtools-mcp` (debug/Lighthouse runtime) — sem sobreposição.
- A skill sugere documentar política de browser support em CLAUDE.md se detectar sinais (alvo Safari, restrição Electron, etc.). Default atual = Baseline Widely Available implícito (web pública moderna). Política explícita pode virar update do CLAUDE.md se Founder Crew #1 levantar requisito.
- Founder Crew #1 (quando preencher vaga frontend) herda a régua sem aprendizado adicional — basta abrir o repo em Claude Code que as skills disparam sozinhas.

**Alternatives considered:**
- **CLI npx isolada** (`npx modern-web-guidance@latest install`) — descartada em favor do plugin Claude Code nativo (`/plugin install`). Plugin é mais coerente com o ecossistema atual e atualiza junto com `frontend-design`+`superpowers`+`chrome-devtools-mcp` via slash commands.
- **Escopo `user` (global a todos os projetos)** — descartado. Outros repos do Henrique (Fast-Alarm Shopify, JEM-TFAS catalog) não são HTML/CSS/JS frontend puro; carregar essas skills lá só polui contexto. Scope `local` com `projectPath` é cirúrgico.
- **Não instalar (manter status quo)** — descartado. O gap entre training cutoff e Baseline real cresce em ritmo trimestral; régua técnica externa vetada compensa o custo de network/latência mínimo da 1ª chamada `npx`.

---

### AD-011: Refino de copy home/membro/empresas v2 — cluster analysis aplicado
**Date:** 2026-05-18
**Status:** Accepted

**Context:** Site v1 foi pro ar em 2026-05-17 (AD-006/007) com Design System AD-008 aplicado. Em revisão pelo Henrique, três páginas centrais — home, membro, empresas — falharam no teste de leitura por 3 failure modes: (a) jargão interno indecifrável (régua editorial #1, ton-anchor, mesa de canto, Era Pré-S1, Outlaw+Sage), (b) Outlaw sem Sage — bashing sem número comparativo que sustente, (c) value prop fraco — CTA da home levava ao Substack sem nunca explicar por que dar o email.

Durante a execução do refino (Bloco B do plan), entrou input adicional via relatório `docs/research/private/2026-05-18-cluster-analysis-whatsapp-cadastros.md` (cluster analysis de 551 cadastros WhatsApp). 8 descobertas mudaram a forma de aplicar os refinos, especialmente: (i) ICP não é único, são 3 sobrepostos (Marketing/Growth 55% + Vendas/RevOps 30% + Founders 8%); (ii) léxico nativo dominante é diferente de jargão growth ("geração de demanda" 26x, "máquina de vendas" 6x, "previsibilidade" 3x, "vendas consultivas" 10x); (iii) 35,6% (196 pessoas) é Master-likely heurístico; (iv) 31,6% (174 pessoas) marcou "Oferecer Serviços" — risco infomercial latente que precisa de Code of Conduct visível.

**Decision:** Refino editorial cirúrgico aplicado nas 3 páginas seguindo:
- Spec `2026-05-18-copy-refino-home-membro-empresas-design.md` v1.1 (commit `d45c78e`) com 4 decisões do Henrique consolidadas no review;
- Plan v2 `2026-05-18-copy-refino-home-membro-empresas.md` (commit `0584a0c`) que incorporou os achados do cluster analysis (Task 5.5 nova + reescrita das Tasks 6, 7, 8, 10, 13, 16, 17).

4 decisões consolidadas no review da spec (decisão Henrique 2026-05-18):
1. Hero da home: CTA primário **mantém "Tornar-se membro"**.
2. Form Substack signup **removido de todas as páginas**. Captação acontece exclusivamente em `/membro` via form de entrevista (campos/handler em sub-projeto separado). Hero da home sem form embutido.
3. Bloco "Edição típica" da home **cortado**.
4. `/empresas` **mantém os 5 blocos** originais; refino bloco a bloco, sem colapsar.

Mudanças materiais sobrepostas pelo cluster analysis:
- Hero da home reconhece **3 ICPs sobrepostos** (marketing + vendas consultivas + RevOps/geração de demanda) em vez de só growth.
- Bullets de benefício de `/membro` **mapeados por persona** (não features genéricas).
- Master 2027 ganha **argumento de preço** comparando com R$ 200-500/mês de ferramenta SaaS.
- Hunting de `/empresas` ganha **tese-frase pra founders** ("Você é founder e precisa de senior+ B2B?").
- Mentoria B2B usa **léxico vibe-coder** ("agentes, automação, fluxos").
- Frame editorial de `/membro` reposicionado de "cadastro grátis 1-clique" pra "candidatura com triagem leve" — tier continua free (Growth Hacker), triagem é qualitativa.

**Consequences:**
- 18 commits de copy/JS/validação aplicados em sequência granular (revert por bloco possível).
- Handler `assets/js/newsletter-form.js` desativado (tag comentada em ambas as páginas). Arquivo mantido no disco pra possível reutilização no sub-projeto futuro.
- Site live em `growthclub.pro` via Cloudflare Pages (`wrangler pages deploy`, preview URL `361d139a.growth-club.pages.dev`).
- **Sub-projeto separado pendente:** form de entrevista em `/membro` — Henrique vai passar campos, perguntas, handler de submit e destino dos dados em sessão futura. Placeholder "FORM ABRE EM BREVE" comunica o estágio.
- **Implicações do cluster analysis pra outras frentes (registradas como follow-up, não escopo desta ADR):**
  - Business Plan v1.2 §3 ICP, §5 sizing, §6 pricing, §10 R-11, §11 Code of Conduct (todas tem novas evidências do dataset);
  - 95% dos cadastros vieram em junho/2025 via LinkedIn do Henrique — canal único de aquisição comprovado, sem cadência sustentada;
  - Métrica de sucesso primária: candidaturas/semana via /membro nas 4 semanas pós-deploy vs baseline pré-refino (alvo ≥20% de subida).

**Alternatives considered:**
- Manter form Substack signup direto em `/membro` (descartado em decisão #2 do review — frame de candidatura é mais coerente com Outlaw+Sage + filtro cultural anti-infomercial).
- Colapsar `/empresas` de 5 pra 3 blocos (descartado em decisão #4 — sinaliza ambição/escopo total).
- Adicionar bloco "Edição típica" na home com case representativo (descartado em decisão #3 — evita risco de case fabricado).
- Trocar CTA primário pra "Receber a próxima edição" (descartado em decisão #1 — com form de triagem, "Tornar-se membro" volta a fazer sentido literal).
- Re-spec formal v1.2 incorporando cluster analysis antes de executar plan (descartado em favor de Caminho 2: input incremental ao plan v1 via Task 5.5 + reescrita de new_strings, sem reverter Bloco A).

---

### AD-010: Pivô do AI LIKE A PRO — página de interesse in-site + LP de checkout em repo separado
**Date:** 2026-05-18
**Status:** Accepted (refina AD-009)

**Context:** AD-009 (2026-05-17) determinou que o AI LIKE A PRO viraria projeto independente, com a pasta `website/ai-like-a-pro/` movida pra fora do site principal e a hospedagem em sub-path resolvida via Workers Routes / multi-deploy no Cloudflare. Ao longo do mesmo dia, ficou claro que essa arquitetura tinha dois custos: (i) configuração operacional no dashboard do Cloudflare ainda pendente, e (ii) ausência completa de uma página de captação dentro do site principal, deixando o footer link `/ai-like-a-pro/` apontando pra um endereço sem fallback até o multi-deploy ficar de pé.

A alternativa surgiu naturalmente: criar uma **página de interesse in-site** no domínio principal usando o Growth Club Design System (AD-008), com form Tally pra lista da próxima turma, e manter a **LP de checkout pago** (com InfinitePay, brand própria, R$ 397) no repo separado, em URL distinta. Os dois ativos passam a coexistir com papéis diferentes.

**Decision:**

1. **`website/ai-like-a-pro/index.html` permanece no site principal** como página de captação de interesse pra próxima turma. Brand alinhada ao AD-008 (gc-header, gc-footer, tokens canônicos). Form: Tally (`tally.so/r/BzLJO4`). Sem checkout — função é encher a lista da próxima turma.

2. **A LP de checkout pago em `~/Documents/GitHub/ai-like-a-pro/`** (repo separado) continua sendo a fonte da venda real (R$ 397, InfinitePay). Deploy continua independente. Quando turma estiver aberta, a página de interesse no site principal aponta pra ela.

3. **Workers Routes / multi-deploy desnecessário em Fase 1.** O footer link `/ai-like-a-pro/` resolve direto pela página in-site. A LP de checkout pode ficar em sub-path do repo separado (ex.: `growthclub.pro/turmas/ai-like-a-pro/` via deploy futuro) ou em URL temporária do próprio Pages do repo separado.

4. **Cross-promo permanece:** interest page in-site → LP de checkout quando turma abre; LP de checkout → WhatsApp Community pós-compra. Dois ativos, um funil.

**Consequences:**
- Footer link do site principal nunca fica quebrado, mesmo sem config extra de Cloudflare.
- AI LIKE A PRO ganha presença permanente dentro do site principal (SEO + descoberta orgânica), independente de turma aberta.
- A pasta `website/ai-like-a-pro/` no repo principal NÃO é nested git repo — é só uma rota a mais, com 1 arquivo HTML, sem subprojeto.
- Pendência operacional do AD-009 ("configurar Workers Routes") deixa de existir nessa forma; vira "decidir URL futura da LP de checkout pública" — tarefa adiada pra quando próxima turma abrir.
- AD-009 §3 (pasta movida pra fora) está parcialmente revisada: a pasta separada continua existindo pra LP de checkout, mas a presença no repo principal foi reintroduzida com propósito diferente.

**Alternatives considered:**
- **Manter AD-009 literalmente e configurar Workers Routes agora** — descartado: trabalho operacional pra resolver um problema (footer link quebrado) que tem solução mais simples in-site, e Workers Routes força acoplamento entre os dois deploys.
- **Embed do form Tally direto em `/recursos/workshops.html`** — descartado: workshops é hub de múltiplos formatos; AI LIKE A PRO merece página dedicada com seu próprio SEO (`growthclub.pro/ai-like-a-pro/`) pra SERP.
- **Subdomínio dedicado `ailikeapro.growthclub.pro`** — descartado em AD-009 e mantém-se descartado: fragmenta SEO sem ganho.

---

### AD-009: AI LIKE A PRO formalizado como produto pago independente
**Date:** 2026-05-17
**Status:** Accepted

**Context:** Henrique já vendeu R$ 3 mil (~7 alunos × R$ 397) em duas turmas do workshop "AI LIKE A PRO" (Antigravity + Claude para não-devs). Existe LP completa em produção em repo separado (`github.com/henriquecaner/ai-like-a-pro`) com stack própria (HTML5 + Vanilla JS + Cloudflare Pages Functions + InfinitePay + Google Sheets + Resend), checkout integrado, success page, LGPD modals e SEO próprio. A LP estava clonada como pasta nested em `website/ai-like-a-pro/` dentro do site principal — fonte de confusão (repo git dentro de repo git) e risco operacional.

**Decision:**

1. **AI LIKE A PRO permanece como projeto independente.** Repo `github.com/henriquecaner/ai-like-a-pro` continua source-of-truth do produto. Stack própria (Vite + Functions + InfinitePay) preservada. Brand independente — **não migrado** pro Growth Club Design System AD-008 na v1, pra preservar conversão validada de R$ 397/aluno.

2. **Hospedagem em sub-path `growthclub.pro/ai-like-a-pro/`.** Configuração Cloudflare via Workers Routes ou multi-deploy (a ser configurada pelo Henrique no dashboard). SEO consolida no domínio principal, brand do AI LIKE A PRO mantém visual próprio.

3. **Pasta movida pra `~/Documents/GitHub/ai-like-a-pro/`** (fora do site principal) pra eliminar nested git repo. Site principal já não tem mais a pasta — versionamento limpo.

4. **Integração no site principal:**
   - `<gc-footer>` ganha link "AI LIKE A PRO" na coluna Recursos apontando pra `/ai-like-a-pro/`.
   - `website/recursos/workshops.html` substitui placeholder `[PITCH_AILIKEAPRO]` por copy real com validação numérica (R$ 397 · Turma 2 · R$ 3 mil vendidos) + CTA pra LP.

5. **Posicionamento no business plan v1.2:** AI LIKE A PRO se encaixa como **Workshop high-ticket** (§6.1 — receita orgânica recorrente). Próximo passo: registrar receita real nos relatórios de transparência financeira (AD-005) quando relatório DRE da Comunidade entrar em ciclo regular.

**Consequences:**
- Site principal e AI LIKE A PRO ficam visualmente desalinhados (brand v1 do workshop ≠ AD-008 do site). Aceito como trade-off pra preservar tração.
- Quando o Henrique tiver banda, migração visual pro AD-008 fica como item futuro (não bloqueia operação).
- Cross-promo direta entre os dois canais: site principal envia tráfego pra LP, LP envia confirmados pra Community WhatsApp (via post-checkout email).
- Repo separado mantém disciplina de deploy independente: AI LIKE A PRO pode ter Turma N+1 sem mexer no site principal.
- Workers Routes ou multi-deploy precisa ser configurado antes do `/ai-like-a-pro/` resolver em produção. Até lá, link do site principal pode quebrar — flag como pendência operacional.

**Alternatives considered:**
- **Migrar tudo pro design system AD-008 agora** — descartado: risco de quebrar conversão validada + custo de refactor sem ganho operacional.
- **Subdomínio `ailikeapro.growthclub.pro`** — descartado pelo user em favor de sub-path (SEO consolidado no domínio principal).
- **Domínio próprio (`ailikeapro.com.br`)** — descartado: custo + fragmentação SEO sem benefício claro em Fase 1.
- **Adicionar como git submodule do Growth-Club** — descartado: overhead de manutenção, complica deploys do site principal.

---

### AD-008: Adoção do Growth Club Design System (adaptado do Level) + migração tipográfica Archivo Black → Satoshi
**Date:** 2026-05-17
**Status:** Accepted

**Context:** Henrique trouxe o **Level Design System** (sistema de design completo da outra empresa dele, Level Tech) em `brand-adapt/Level Design System - new/` solicitando adaptação pra Growth Club. O sistema é robusto: tokens CSS dual-theme (light-first + dark sections opt-in), fontes self-hosted (Satoshi + Roboto), 30+ preview cards, 5 templates IG/LinkedIn prontos, ui_kit de site institucional, e uma skill agent (`level-design`) pra Claude Code. Reutilizar a engenharia evita reinventar a roda e economiza ~2 semanas de trabalho de design system from-scratch.

Conflito identificado: o Level usa **Satoshi** como display+body, mas o Growth Club tinha decidido **Archivo Black + Inter + JetBrains Mono** em `brand/visual/tipografia.md` (decisão 2.2 do brand brief plan). Manter Archivo Black exigiria recalibrar todos os tokens de letter-spacing e line-height (Archivo Black tem métrica condensada muito diferente de Satoshi), refazer todos os 30+ preview cards, e perder a flexibilidade de variable font.

**Decision:**

1. **Adotar o Growth Club Design System** em `brand-adapt/Growth Club Design System/` como fonte canônica de tokens visuais, adaptado do Level Design System mantendo: filosofia light-first + dark section opt-in, scale tipográfica, motion, radii, spacing, semantic type roles, OpenType features (`tnum`, `cv01`, `ss01`).

2. **Substituições aplicadas (Level → Growth Club):**
   - `--accent-violet #5522FA` → `--accent-amber #D4A24C` (Amber Beer, primário/CTA — locked em paleta-primaria.md)
   - `--accent-mint #00B470/#00F59B` → `--accent-teal #4FB3A5` (Pirate Teal, secundário — locked em decisão 01-B bandeira pirata)
   - `--bg-base #F5F5F5` (cinza frio) → `#F5F1E8` (Pub Cream — "luz de pub", locked)
   - `--fg-primary #1A1A1A` → `#0A0A0A` (Growth Black — locked)
   - `--color-danger` mantido em Brick Red `#B84A3E` (locked)
   - Logos: placeholders SVG textuais "growth club." com ponto Amber até logo final do Figma sair (Task 2.3 do brand brief plan pending).

3. **Migração tipográfica:** Satoshi (variable, eixo 300-900) **substitui** Archivo Black como display + body do Growth Club. Roboto continua como mono. Decisão `brand/visual/tipografia.md` (Task 2.2 do brand brief) marcada parcialmente **SUPERSEDED por AD-008** no que tange à fonte display escolhida.

4. **Aliases legados preservados** no CSS (`--accent-violet*` → `--accent-amber*`, `--accent-mint*` → `--accent-teal*`) pra que os 30+ preview cards herdados do Level renderizem sem refactor imediato. Código novo deve usar nomes diretos.

5. **Filosofia "Dark = section, não tema" mantida.** Pub Cream em 95% do conteúdo, Growth Black só em hero/CTA-final/depoimento/capa de slide.

**Consequences:**
- Destrava produção imediata de assets (newsletter covers, IG/LinkedIn posts, pôster de meetup) sem esperar Founder Crew #2 (designer).
- Sistema instalável como skill Claude Code (`growth-club-design`) — qualquer agente futuro pode invocar e gerar peças on-brand.
- `brand/visual/tipografia.md` precisa de update marcando AD-008 como superseder (a fazer manualmente fora do escopo desta ADR).
- Decisão 2.2 do brand brief plan vai ser referenciada como "parcialmente revisada" no próximo update do plan.
- Inter continua válida como fallback em emails (Outlook quebra com Satoshi self-hosted, conforme nota em `tipografia.md`).
- Logo final ainda pendente do Figma — `assets/logo-*.svg` são placeholders e devem ser substituídos zero-touch quando o vetor sair.
- Trade-off aceito: variable font self-hosted (~280KB) é maior que Google Fonts CDN, mas dá controle total e elimina dependência externa.

**Alternatives considered:**
- **Manter Archivo Black + Inter + JetBrains Mono e recalibrar todos os tokens do Level** — descartado: ~1 semana de trabalho de recalibração, perde variable font flexibility, sem ganho prático.
- **Construir design system do zero pra GC** — descartado: ~2 semanas adicionais, sem reutilizar engenharia já testada do Level.
- **Adotar Tailwind ou design system pronto (Vercel Geist, Catalyst)** — descartado: Level já tem identidade alinhada (light-first, no-line, brutalist-tonal, voz operador) que casa filosoficamente com GC, e adaptação foi viável.
- **Esperar Founder Crew #2 (designer) chegar** — descartado: bloqueia produção de assets indefinidamente; Henrique optou por destravar agora.

---

### AD-007: Stack escolhida pro site v1 — HTML5 semântico + Modern CSS, sem framework
**Date:** 2026-05-17
**Status:** Accepted

**Context:** O spec do site (AD-006) deferiu deliberadamente a escolha de stack ao Founder Crew #1 (TBD-04 em §9 do spec). Ao avançar pra etapa de writing-plans, ficou claro que sem stack o plan ficaria sem caminhos de arquivo exatos e sem código exato — violando regras do skill. Henrique optou por destravar a decisão pessoalmente em vez de aguardar o Crew, dado que o Crew #1 ainda não foi preenchido (AD-002 recrutamento aberto desde 2026-04-28).

**Decision:** Stack v1 do site:

1. **HTML5 semântico** — sem framework JS (Next/Astro/SvelteKit/etc.). Arquivos `.html` estáticos por página, sem build step.
2. **Modern CSS** com nesting nativo (suportado em todos os majores browsers desde 2023). Sem PostCSS, sem Sass, sem TailwindCSS na v1. CSS custom em arquivo único `styles.css` (ou modular por página se ficar grande).
3. **JavaScript vanilla** quando necessário (form do newsletter com redirect pré-preenchido pro Substack, scrollspy de anchors em `/sobre` e `/empresas`, etc.). Sem framework JS, sem build.
4. **Hospedagem: Cloudflare Pages.** Substitui Vercel/Netlify mencionados em `website/README.md`. Push pra Git = deploy automático. CDN global, free tier confortável, melhor latência LATAM.
5. **Executor da v1: Henrique.** Crew #1 (frontend, vibe coder) entra depois pra evoluir/manter, não pra fazer a v1 do zero.

**Consequences:**
- Destrava a etapa de writing-plans imediatamente.
- TBD-04 do spec do site marcada como RESOLVIDA.
- `.specs/project/STACK.md` (atualmente placeholder) precisa ser atualizada com decisão real.
- `website/README.md` precisa ser atualizado (Vercel/Netlify → Cloudflare Pages).
- Trade-off aceito: sem template engine = header/footer duplicados em cada arquivo HTML. Pra ~20 páginas é gerenciável; se virar 50+ vale considerar Eleventy ou similar (uma dependência só, opcional).
- CSS nesting nativo pode quebrar em browsers muito velhos (pré-2023) — alinhado com tom-anchor "Franco" (não otimizar pra long tail de IE/Safari velho).
- Quando Crew #1 entrar e quiser migrar pra framework (Astro/Next/SvelteKit), abre nova ADR — não é decisão perpétua.
- Henrique como executor: plan vai ser escrito em segunda pessoa direta ("você cria o arquivo X com este código"), não "Crew #1 deve…".

**Alternatives considered:**
- **Astro** (SSG com MDX nativo) — descartado: Henrique optou por simplicidade radical (sem build step) e quer aprender CSS moderno na prática.
- **Next.js / SvelteKit** — descartado: overkill pra site estático, complexidade desnecessária pra v1.
- **Eleventy** (SSG sem framework, 1 dependência) — descartado pra v1, considerado pra v2 se duplicação de header/footer pesar.
- **Esperar Crew #1 preencher** — descartado: bloqueia a etapa de writing-plans indefinidamente; Henrique pode entregar v1 enquanto recrutamento corre.

---

### AD-006: Spec do site v1 aprovado — `growthclub.pro`
**Date:** 2026-05-17
**Status:** Accepted

**Context:** Após Marca v1 (parcial) entregue em ADR-002 (2026-04-27), próxima fase do roadmap (Site `growthclub.pro`) precisava de design doc antes de qualquer linha de código. Sessão de brainstorming estruturado com skill `superpowers:brainstorming` foi conduzida em 2026-05-17 (Henrique + Claude) cobrindo: escopo (visão final, sem timeline v1), arquitetura de informação, login interno (rejeitado), CTA primário do hero, conteúdo da home, fusão de sub-páginas em single-page com anchors (Sobre e Empresas).

**Decision:** Spec aprovado em `docs/superpowers/specs/2026-05-17-growth-club-site-design.md` (v1.0). Pontos travados:

1. **Site público, vitrine, sem login interno.** Redirects pra plataformas externas (Substack, plataforma de aulas TBD, WhatsApp, YouTube/LinkedIn).
2. **Top-nav (7 itens):** Home · Sobre · Recursos ▾ · Meetups ▾ · Empresas · Tornar-se Membro · Contato.
3. **19+ rotas/anchors** no inventário (Home + Sobre single-page + 5 sub-Recursos + Meetups hub + LP `[slug]` + Histórico + Empresas single-page + Membro + Contato + 4 legais + 404).
4. **`/sobre` fundida em single-page:** história + manifesto + Founder Crew + imprensa com anchors `#manifesto`, `#crew`, `#imprensa`.
5. **`/empresas` fundida em single-page:** 4 ofertas B2B com anchors `#patrocinio`, `#vagas`, `#hunting`, `#mentoria`. Substitui ideia anterior de `/patrocinadores` solo.
6. **Hero estático com CTA único** "Tornar-se Membro" → `/membro` + ganchos distribuídos em 9 seções na home. Slot dinâmico na seção 7 resolve sazonalidade do meetup.
7. **`/membro` é caminho único free** (Growth Hacker). Master "em breve 2027" como bloco discreto. Founder Member parqueado (AD-003) não aparece.
8. **Stack livre escolha do Crew #1** dentro dos guardrails de `website/README.md` (Vercel/Netlify, ≤ R$ 200/mês hosting).
9. **Analytics proposta:** Plausible (privacy-first, cookieless).
10. **6 bloqueadores de go-live** catalogados na §8.1 do spec; **13 decisões TBD** na §9 (suas propostas pra depois).

**Consequences:**
- Destrava handoff pra etapa de plan (próxima invocação: `superpowers:writing-plans`).
- Cria novo bloqueador formal **B-01: ADR-007 pendente** — Mentorias quinzenais, Desafios mensais, Job board, Hunting, Mentoria B2B foram aceitos como compromissos no spec mas precisam de ADR formalizando dono operacional, cadência, mecânica antes do go-live.
- `ROADMAP.md` Fase 1 atualizado refletindo spec como entregável pré-build.
- Site só vai ao ar quando Founder Crew #1 preenchido + ADR-007 registrada + conteúdo concreto §6.4 do spec produzido + logo SVG final entregue + páginas legais juridicamente revistas.

**Alternatives considered:**
- Decompor em múltiplos specs (Home + Membro + Empresas separados) — descartado: site é v1 coeso, não vale fragmentar.
- Definir stack agora — descartado: respeita autoridade do Crew #1 + guardrails em `website/README.md`.
- Manter `/sobre/manifesto`, `/sobre/crew`, `/sobre/imprensa` separadas — descartado pelo Henrique durante a sessão (preferência por single-page consolidada).

---

### AD-005: Transparência financeira radical com Founder Crew
**Date:** 2026-04-28
**Status:** Accepted

**Context:** Founder Crew (AD-002) recebe 30% do lucro líquido da Comunidade dividido por igual. Sem garantia de remuneração mínima e sem promessa de dinheiro no curto prazo — o Crew está apostando que a Comunidade vai gerar líquido relevante. Sem visibilidade total sobre receitas, despesas e cálculo do líquido, o vínculo vira "confia em mim" — assimetria que corrói a relação.

**Decision:** Henrique se compromete a fornecer ao Founder Crew, em cadência regular (proposta: mensal nos primeiros 12 meses, depois trimestral), relatório financeiro completo da operação da Comunidade contendo:

1. **DRE simplificada** — todas as receitas (com origem identificada: ingressos meetup, patrocínio livecast, GH Master, workshops, etc.) e despesas operacionais (venue, produção, marketing, ferramentas, fees, etc.).
2. **Cálculo do líquido** — receitas menos despesas operacionais diretas + indiretas atribuíveis à Comunidade.
3. **Pool Crew** — 30% do líquido = valor a distribuir.
4. **Fração individual** — quanto cada Crew Ativo recebe (Pool dividido pelo nº de Ativos no período).
5. **Repasse efetuado** — comprovante de transferência ao Crew member, com data e valor.

**Princípio:** "Se não tem número, não é Growth Club" se aplica internamente também. Crew member tem direito a contestar cálculos por escrito (right to audit lite) — Henrique responde em até 15 dias com documentação suplementar.

**Consequences:**
- Vai virar **Cláusula 7 e Anexo E** do Acordo de Founder Crew.
- Cria obrigação operacional contínua (preparar relatório mensal/trimestral) — pode demandar sistema simples de gestão financeira (planilha estruturada ou ferramenta SaaS leve).
- Reduz fricção de relação (Crew confia em dado, não em palavra).
- Expõe Henrique a escrutínio interno — vale internalizar que isso é parte da cultura, não defeito.

**Alternatives considered:**
- Transparência só sob demanda (descartado: cria assimetria de quem pergunta vs quem não pergunta).
- Apenas DRE anual (descartado: 12 meses sem visibilidade fragiliza a relação no início, justo quando confiança ainda está sendo construída).

---

### AD-004: Hospedagem operacional da Comunidade dentro da Level Tech (CNPJ existente)
**Date:** 2026-04-28
**Status:** Accepted

**Context:** §11 do Business Plan v1.2 listava como pendente a definição de CNPJ + regime tributário pra operar a Comunidade formalmente. Henrique fundou recentemente a **Level Tech** (CNPJ próprio, formato a confirmar — provavelmente Ltda ou EPP), e a Comunidade pode rodar dentro dessa estrutura existente sem precisar criar PJ nova hoje.

**Decision:** Em **Fase 1**, todas as operações financeiras da Comunidade (receitas e despesas, contratos, emissão de notas, recebimento de patrocínio, pagamentos a fornecedores, repasses de revshare a Founder Crew) **rodam dentro do CNPJ da Level Tech**. O Acordo de Founder Crew (AD-002) é assinado tendo a Level Tech como Contratante.

**Em fase futura (gatilho — validar com Henrique):** quando a Comunidade atingir maturidade financeira/operacional, **spin-off em CNPJ dedicado ao Growth Club**, com Level Tech atuando como **holding controladora** do novo CNPJ. Gatilho proposto:
- (i) Receita anual da Comunidade ≥ R$ 500k OU
- (ii) ≥ 200 Growth Hacker Master pagantes OU
- (iii) Captação externa relevante (anjo, fundo) que exija cap-table dedicada

Quando o spin-off ocorrer, **AD-006 será aberta** desenhando os termos (cap-table inicial, possível conversão de revshare Founder Crew em equity, governança).

**Consequences:**
- Destrava a urgência de §11 (Business Plan) parcialmente — Comunidade pode operar legalmente já como "produto/iniciativa" da Level Tech.
- Acordo de Founder Crew tem cláusula de **reorganização societária** (Cláusula 28) que prevê cessão automática do contrato pra Nova Sociedade quando spin-off ocorrer, **sem conversão automática em equity** (renegociação obrigatória).
- Receitas/despesas da Comunidade precisam ser **segregadas contabilmente** dentro da Level Tech (centro de custo "Growth Club" ou similar) pra viabilizar a transparência financeira da AD-005 e o cálculo correto do Pool Crew.
- Não substitui a necessidade futura de revisar §11 quando spin-off for ativado (regime tributário, contratos comerciais, governança societária).

**Alternatives considered:**
- Criar CNPJ Growth Club agora (descartado: custo + tempo + complexidade desnecessária pra Fase 1, sem revenue confirmada).
- Operar como pessoa física do Henrique (descartado: passivo jurídico de revshare e impossibilidade de emitir NF, conforme §11 do Business Plan).
- Spin-off antes de Barte S1E1 (descartado: sem ganho operacional comparado a usar Level Tech como guarda-chuva).

---

### AD-003: Founder Member tier parqueado
**Date:** 2026-04-28
**Status:** Accepted

**Context:** Founder Member (R$ 2.079, 100 vagas) era a principal fonte de receita upfront prevista no Business Plan v1.2 (AD-001) para Barte S1E1 — 25 vagas × R$ 2.079 = R$ 51.975. Ao avaliar o estado atual da operação (marca em construção, site não publicado, identidade visual em finalização, brand book em redação), o autor concluiu que vender ticket prêmio antes do produto estar minimamente maduro cria expectativa não atendida e arrisca queimar a categoria pra sempre.

**Decision:** Founder Member tier suspenso temporariamente. Não será ofertado em Barte S1E1. Tier será redefinido (formato pode mudar) na retomada — pode voltar como R$ 2.079 × 100 vagas, ou estrutura diferente.

**Gatilho de retomada (default — validar com Henrique):**
- (i) Marca v1 publicada (Chunks 1-5 do brand brief fechados, brand book consolidado);
- (ii) Site `growthclub.pro` no ar com captação ativa funcionando;
- (iii) ≥100 Growth Hacker Master pagantes confirmando demanda pelo modelo premium.

Quando os 3 critérios estiverem verdes, reavaliar formato e relançar (ou descartar definitivamente em nova ADR).

**Consequences:**
- Receita upfront prevista de R$ 51.975 não materializa em Barte S1E1 — gera risco R-11 (cash flow Fase 1).
- Founder Crew (AD-002) preenche o vácuo operacional, mas não o financeiro.
- Locked decision #5 do `CLAUDE.md` editada pra refletir parking.
- ROADMAP.md Fase 1 atualizado: meta de "25 Founder Members (cota parcial)" removida.

**Alternatives considered:**
- Manter venda de Founder Member com produto incompleto: descartado (risco de queima de categoria).
- Cancelar Founder Member definitivamente: descartado (autor quer manter opção pra retomar quando produto maduro).
- Reduzir ticket pra R$ 990 ou similar: descartado (descaracteriza tier prêmio).

---

### AD-002: Founder Crew — categoria de operadores Era Pré-S1
**Date:** 2026-04-28
**Status:** Accepted

**Context:** Profissionalização do Growth Club exige 3 entregas técnicas críticas até Barte S1E1 (jun/2026): (i) site `growthclub.pro` no ar; (ii) identidade visual aplicada em templates de newsletter/LinkedIn/email + corte de livecast; (iii) repositório público no GitHub com README de venda da comunidade. Founder solo não tem banda pra executar as 3 em 8 semanas. Caixa Fase 1 não comporta contratação de fornecedor pago (sem CNPJ ainda, sem revenue confirmada). Founder Member tier (que poderia financiar fornecedores) foi parqueado em AD-003.

**Decision:** Cria-se 4ª categoria — **Founder Crew** — paralela aos tiers de membership (Growth Hacker, Growth Hacker Master, Founder Member). Founder Crew remunera operadores que entregam as 3 cadeiras críticas via revshare, sem custo de caixa upfront e sem participação societária (Caminho B, sem equity).

**Termos do Acordo de Founder Crew:**

1. **Quota:** 3 vagas, fechadas. Sem vagas reservadas.
   - Cadeira 1: Frontend (vibe coder) — site `growthclub.pro`.
   - Cadeira 2: Designer + edição de vídeo — identidade aplicada + corte livecast.
   - Cadeira 3: Community Manager / GitHub — repositório público, README de venda da comunidade.

2. **Revshare:** 30% do lucro líquido da comunidade, dividido **por igual** entre Founder Crew preenchidos. Cap rígido em 30%.
   - 3 vagas preenchidas → 10% por pessoa.
   - Revshare é condicional à manutenção do vínculo. Não há vesting tradicional.

3. **Vínculo operacional:** 3 anos. Inclui:
   - **Entrega upfront em 90 dias** (escopo registrado em anexo do contrato por cadeira).
   - **Manutenção leve de 6 horas/mês** durante os 36 meses (ajustes, refresh, atualizações no escopo original).

4. **Mecanismo legal (Caminho B):** Acordo de Founder Crew como contrato de prestação de serviços com remuneração variável (revshare) + cláusulas de exposição, saída e first-pass. Sem equity, sem mútuo conversível na Fase 1.
   - Sub-cláusula opcional: pode incluir "direito de revisão" se Growth Club constituir CNPJ formal e captar — Crew tem janela de renegociação, sem direito automático de conversão em quotas.

5. **First-pass em vaga paga:** quando Growth Club tiver caixa pra contratar pessoa fixa no escopo do Crew, vaga é oferecida primeiro ao Founder Crew correspondente. **Salário publicado upfront** (faixa de mercado pesquisada e divulgada). Crew tem **30 dias corridos** pra responder sim/não. Se "sim", assume vaga paga + mantém revshare ativo. Se "não" ou silêncio, vaga abre publicamente, Crew mantém revshare condicional enquanto seguir Crew.

6. **Sem perpetuidade — desligamento por baixa performance ou problema cultural:** Founder pode desligar Crew unilateralmente em dois cenários objetivos:

   **(a) Baixa performance:**
   - Não cumprir entregas combinadas no anexo de escopo dentro do prazo de 90 dias upfront + 30 dias de tolerância em boa-fé;
   - Não cumprir o compromisso de 6h/mês de manutenção por 3 meses consecutivos sem justificativa formal aceita pelo Founder.

   **(b) Problema cultural:**
   - Violar pacto editorial registrado em `brand/voice/dos-and-donts.md` ("Se não tem número, não é Growth Club"; sem self-promo vazio; sem teatro);
   - Conduta incompatível com ton-anchor "Franco, com número, sem palco, com cerveja";
   - Quebra de confidencialidade (revelar dados financeiros internos, listas de membros, etc.);
   - Atacar pessoas individuais pelo nome (atacar padrões é OK; atacar pessoas, não).

7. **Procedimento de desligamento:** Founder envia comunicação por escrito ao Crew descrevendo o motivo objetivo e as evidências. Crew tem **15 dias corridos** de cura — pode contestar por escrito ou apresentar plano de remediação. Founder analisa e decide. Decisão final é do Founder, sem arbitragem externa em Fase 1.

8. **Saída = perde tudo automaticamente:** uma vez que o vínculo termina (por desligamento, saída voluntária, ou fim natural dos 36 meses sem renovação):
   - **Revshare cessa imediatamente** — sem vesting residual, sem pro-rata, sem direito futuro a fluxo de caixa.
   - **Crédito ativo removido** das listagens vivas: brand book ativo, `growthclub.pro/sobre`, página `/crew` (se existir), apresentações públicas futuras.
   - **Artefatos históricos publicados não são redatados** — newsletters, posts, edições do livecast que já mencionaram o Crew member permanecem como estão (impraticável retroagir publicações).

9. **Saída amigável voluntária antes dos 36 meses:** Crew pode sair voluntariamente a qualquer momento mediante comunicação por escrito com 30 dias de antecedência. Aplica-se §8 (perde tudo automaticamente). Sem ônus financeiro pra Crew.

10. **Compensação não-monetária (exposição):** lista de alavancas de exposição (brand book, palco no Meetup S1E1, post no LinkedIn do Henrique, edição da newsletter, subpáginas autorais) **fica em aberto e será definida no anexo do contrato individual** com cada Crew member, antes da assinatura. Default mínimo: crédito no brand book ativo da Era Pré-S1 enquanto vínculo ativo.

**Consequences:**
- Destrava capacidade técnica de entregar marca v1 + site + repo público até Barte S1E1 sem custo de caixa.
- Cria narrativa "Era Pré-S1 = Founder Crew" (quando Founder Member tier voltar — AD-003 retomada — narrativa pode evoluir).
- Compromete 30% do lucro líquido por até 36 meses, em troca de entregas que destravam a operação.
- Estende §11 do Business Plan (legal/operacional pendente) — agora há urgência adicional de redigir o Acordo de Founder Crew com revisão jurídica antes da 1ª assinatura.
- Locked decision #5 do `CLAUDE.md` editada pra refletir Founder Crew como categoria nova ativa Era Pré-S1.

**Alternatives considered:**
- Consumir 3 das 25 vagas Founder Member pagas (descartado: corrói receita Barte e mistura modelo de negócio de membership consumidor com trabalhador trocando labor por upside).
- Mútuo conversível com equity (Caminho A — descartado: exige CNPJ + cap table primeiro, atrasa WhatsApp 30-60 dias, custo legal R$ 9-40k).
- Bônus único por milestone sem revshare contínuo (descartado: não cria vínculo de 3 anos, não alinha com narrativa Era Pré-S1).
- Pool unificado de 30% pra Founder Member + Crew (Cenário C da deliberação — descartado em favor de Cenário A: 30% só pro Crew, com Founder Member parqueado em AD-003).

**Métricas de sucesso (validar com Henrique):**
- 3 vagas Founder Crew preenchidas até 2026-05-15.
- Acordo de Founder Crew redigido e revisado juridicamente até 2026-05-10.
- Site `growthclub.pro` no ar até 2026-05-31.
- Identidade aplicada em ≥3 templates de canal até 2026-06-15.
- README do repositório público publicado com ≥10 stars até Barte S1E1 (jun/2026).

---

### AD-001: Business Plan v1.2 aprovado
**Date:** 2026-04-22
**Status:** Accepted
**Context:** Growth Club é uma comunidade brasileira de Growth com 10+ anos de histórico informal (Substack desde 2019 com 2.261 assinantes, meetups desde 2015 com 10+ edições, Community WhatsApp com 715 membros em 7 grupos). Henrique iniciou a profissionalização formal do ativo. Decomposição do pedido original ("plano de negócios + marca + site") em 3 projetos sequenciais: Business Plan → Marca → Site.

**Decision:** Design do business plan em `docs/superpowers/specs/2026-04-22-growth-club-business-plan-design.md` aprovado pela revisão independente (2 iterações) e pelo autor humano. Versão congelada: v1.2 (commit `1e374bf`).

**Consequences:**
- Estrutura em 3 tiers: **Growth Hacker** (free) / **Founder Member** (100 cap) / **Growth Hacker Master** (R$ 990/ano na Fase 3)
- Relançamento público atrelado ao **Meetup Growth SP · S1E1 · Barte** (1ª ou 2ª semana de junho/2026)
- Ingresso do meetup = membership Growth Hacker automático (automação CRÍTICA da Fase 1)
- Modelo de receita: Meetups + Workshops high-ticket (estilo AI LIKE A PRO) + Patrocínio Livecast + Founder Members (upfront) + Master (Fase 3)
- Posicionamento: **"Growth de verdade. Stack de verdade. Sem teatro."** — execução, ponte entre silos, tech-first (IA/automação) atrelado a outcome
- Destrava as próximas fases: **Marca** → **Site**

**Alternatives considered:**
- Tier premium "Inner Circle" pra líderes — arquivado para v2+
- Lançamento do zero vs profissionalização — descartado após mapear ativos existentes
- SaaS proprietário — descartado em favor de ferramentas de mercado (Substack, WhatsApp/Circle/Slack, plataforma de site a definir)

---

### ADR-002: Marca v1 — entrega parcial (Chunks 1, 3, 5-textual)
**Date:** 2026-04-27
**Status:** Accepted
**Context:** Após validação profunda dos arquivos da marca, ficou claro que (a) Voice (Chunk 3) já estava 100% pronto — `manifesto.md`, `dos-and-donts.md`, `tom-por-canal.md`, `glossario.md` completos; (b) Decisão 04 (arquitetura de marcas-filhas) foi aceita pragmaticamente sem decompor todos os sub-grupos — `AI LIKE A PRO` é a única marca-filha v1, demais grupos seguem arquivados de fato; (c) Chunk 2 (visual) tem propostas escritas + paleta, tipografia e direção do logo travadas, mas o logo SVG final ainda precisa ser executado em Figma (Steps 1c-1e, ~2 semanas solo).

Henrique optou por destravar o handoff de marca **agora** sem esperar o logo SVG final, gerando assets v0 (placeholder) a partir da bandeira pirata atual (`brand/decisions/01-bandeira-pirata-evidencia/pirate-flag-3.png`).

**Decision:** Marca v1 entregue parcialmente. Brand book consolidado em md + pdf publicáveis; export pack v0 com 9 PNGs + favicon.ico marcados como placeholder; CONVENTIONS.md criado com Brand naming + Voice glossário operacionais. Logo SVG final permanece em produção; templates do Chunk 4 não iniciados.

**Status real por Chunk da marca:**
- Chunk 1 (decisões): ✅ travado (decisões 01–04, com 04 aceita em skeleton)
- Chunk 2 (visual): 🔄 propostas + decisões locked; logo SVG final em produção (Figma solo)
- Chunk 3 (voice): ✅ completo (4 arquivos)
- Chunk 4 (templates): 📋 não iniciado (meetup, newsletter, site handoff kit)
- Chunk 5 (brand book): ✅ textual + PDF + export pack v0 entregues; assets finais aguardam logo SVG

**Consequences:**
- Destrava handoff de marca pra patrocinadores, parceiros e Fase 1 (Site) sem aguardar o logo SVG final.
- Quando o logo final sair, será sessão de follow-up curta: substituir os 10 arquivos em `brand/assets/exports/` + regenerar PDF + remover marca `v0-placeholder` do README. Será registrado em **ADR-003**.
- Fase 1 do `ROADMAP.md` permanece **aberta** — `Brand brief entregue` não foi marcado como `[x]` porque templates Chunk 4 + logo SVG seguem pendentes.
- `CONVENTIONS.md` agora é fonte de verdade pra naming + glossário em fases futuras (Site, conteúdo, marketing) — não reinventar.

**Artefatos entregues nesta sessão (commits):**
- `brand(book): consolidated brand book v1 (markdown)` — `brand/brand-book.md`
- `docs(specs): propagate brand naming + voice rules to CONVENTIONS.md` — `.specs/project/CONVENTIONS.md`
- `brand(assets): export pack v0 placeholder (favicons + OG + PNG fallbacks)` — `brand/assets/exports/`
- `brand(book): PDF export of brand book v1 (placeholder logo)` — `brand/brand-book-v1.pdf` + `.html` + `.css`

**Alternatives considered:**
- Esperar logo SVG final antes de empacotar brand book — descartado: atrasa handoff pra Fase 1 sem ganho real, já que substituir os 10 PNGs depois é trivial.
- Não gerar PDF até logo final — descartado: o PDF textual com tipografia + paleta aplicadas tem valor independente do logo (aplicação visual do sistema decidido em peça real).
- Decompor marcas-filhas formalmente (Decisão 04 completa) — descartado: única marca-filha de fato é AI LIKE A PRO; trabalho cerimonial nos demais sub-grupos.

---

### AD-014: Reset de archetype — Outlaw+Sage → Hero+Magician aspiracional
**Date:** 2026-05-24
**Status:** Accepted (supersedes AD-003 in part)

**Context:** Sessão de brainstorming em 2026-05-24 redirecionou posicionamento e voz da marca após o founder concluir que a régua "Franco, com número, sem palco, com cerveja." e o archetype Outlaw+Sage não capturavam a comunidade que ele quer construir. Nova referência adotada: `growth-brazil.webflow.io` (estrutura/copy) + `henriques-amazing-site-a39ead.webflow.io` (elementos visuais Awake-style). Decisão completa documentada em `docs/superpowers/specs/2026-05-24-growth-club-reset-pivot-design.md`.

**Decision:** Archetype primário passa a ser **Hero + Magician** (aspiracional, inclusivo, "elite do mercado", "transformando o mercado"). Ton-anchor velho ("Franco, com número, sem palco, com cerveja.") aposentado — substituído pelo bloco sub-headline da nova copy ("Somos remotos, criativos, gentis e engajados. Invista energia em seu crescimento ao lado de Founders, VPs, CMOs e especialistas que estão transformando o mercado."). `brand/decisions/03-arquetipo-e-tom.md` movido pra `brand/legacy/2026-05-24-archetype-outlaw-sage.md` via `git mv`. Novo arquivo `brand/decisions/05-archetype-multidisciplinar.md` captura a nova decisão. `brand/voice/` (manifesto, dos-and-donts, tom-por-canal, glossario) movido pra `brand/legacy/voice-2026-04/`; `brand/voice/manifesto.md` recriado com voz nova.

**Reversibility:** `brand/legacy/` mantém os artefatos antigos intactos. Reverter = `git mv` de volta + append "revert AD-014" entry neste STATE.md. Custo: 1 commit.

---

### AD-015: Reset de posicionamento — B2B curado → Comunidade multidisciplinar
**Date:** 2026-05-24
**Status:** Accepted (supersedes AD-001 §3-§5 in part)

**Context:** AD-001 (Business Plan v1.2) posicionava o Growth Club como "comunidade brasileira de operadores B2B de growth" com cluster analysis (AD-011) reforçando o foco em founders, CROs, growth/RevOps leads, vendedores consultivos B2B. Decisão de reset (2026-05-24) substitui esse posicionamento por "comunidade de Growth multidisciplinar do Brasil" — marketing + vendas + sucesso de clientes + analytics + produtos + founders, sem o filtro B2B-only.

**Decision:** Headline oficial passa a ser "A #1 Comunidade de Growth Multidisciplinar do Brasil". Sub-headline oficial passa a ser "Somos uma comunidade de profissionais de marketing, vendas, sucesso de clientes, analytics, produtos e founders". Audiência alvo se expande pra todo profissional de growth, não só operadores B2B. Sections §3-§5 do business plan (audiência, posicionamento, ângulo) ficam parcialmente desatualizadas — Phase 4 da implementação do reset atualiza CLAUDE.md e memory pra refletir isso, mas o spec do business plan original fica intacto como artefato histórico.

**Reversibility:** Reverter exige editar headline em `website/index.html` + reescrever CLAUDE.md "Project at a glance". Custo: 2 commits.

---

### AD-016: Reset de régua editorial — "Se não tem número, não é Growth Club" → retirada
**Date:** 2026-05-24
**Status:** Accepted (supersedes AD-001 cultural rule #1)

**Context:** A régua editorial "Se não tem número, não é Growth Club." era o filtro #1 da marca (AD-001 §3.3, brand/decisions/01-bandeira-pirata.md, voice manifesto). Funcionava como porta de entrada cultural — case sem número virava redirecionamento cordial. Decisão de reset (2026-05-24) retira a régua porque a copy literal Growth Brazil adotada como nova verdade não comporta o filtro: "#1 comunidade" não tem número, "elite do mercado" não tem número, "os melhores do mundo" não tem número. Manter a régua junto da nova copy seria contradição interna.

**Decision:** Régua "Se não tem número, não é Growth Club." aposentada. Nenhuma régua editorial substitui no curto prazo — comunidade passa a operar sem filtro editorial explícito (a curadoria continua existindo via triagem de candidatura, mas sem rótulo de regra). Posts/newsletter/WhatsApp/livecast continuam editados pelo founder; só não há mais uma régua nominal pública.

**Reversibility:** Reverter exige reintroduzir a régua em CLAUDE.md, brand/decisions/, voice/manifesto. Custo: 3 commits.

---

### AD-017: Reativação de AD-008 paleta — Tonal Warm puro → AD-008 estendido com soft tints
**Date:** 2026-05-24
**Status:** Accepted (supersedes the 2026-05-24 brainstorming-internal Tonal Warm pure approval)

**Context:** Durante a sessão de brainstorming de 2026-05-24, o founder aprovou momentaneamente uma paleta "Tonal Warm sem accent" (Paper #F7F5F0 + Charcoal #1C1B18 + Ash #6B6862 only, sem Amber/Teal/Brick). Essa aprovação foi superada pela escolha posterior do estilo Awake-inspired, que requer cor de accent — sem cor, cards pastel, retratos com círculos coloridos e pricing destacado não funcionam visualmente.

**Decision:** AD-008 (Growth Club Design System) é reativado com extensão. Paleta volta a ter: Paper `#F7F5F0`, Paper deep `#ECE7D6`, Charcoal `#1C1B18`, Ash `#6B6862`, Amber Beer `#D4A24C`, Pirate Teal `#4FB3A5`, Brick Red `#B84A3E`. Adicionados novos tokens de soft tint pra suportar o estilo Awake: `--amber-soft #F2E2C0`, `--teal-soft #CDEDE7`, `--brick-soft #F4D5CF`, `--warm-neutral #E8E2D0`, `--sage-soft #DDE6E2`. Fontes Satoshi + Roboto Mono mantidas (AD-008 → keep). Componentes web (`<gc-header>`, `<gc-footer>`) mantidos com ajustes de markup pro nav pill da Phase 3.

**Reversibility:** Reverter exige editar `tokens.css` e remover os soft tints. Custo: 1 commit.

---

### AD-018: 3 pilares → 4 pilares — adicionar "Ferramentas" ao lado dos 3 existentes
**Date:** 2026-05-24
**Status:** Accepted (supersedes Decisão 05 §3 pilares — locked passa a ser 4 pilares)

**Context:** Visual review da home em localhost durante Phase 3 (2026-05-24) revelou que a página estava com gap de conteúdo comparada à referência `growth-brazil.webflow.io`. A referência usa 4 pilares (Encontre Talentos / Resolva Problemas / Conheça Pessoas / Ferramentas) enquanto Decisão 05 (commit cdeca07) tinha lockado 3 pilares (Encontre Talentos / Conteúdo Denso / Vibe Única). User aprovou expandir pra 4 mantendo os 3 existentes + adicionando "Ferramentas".

**Decision:** A locked decision §3 pilares da Decisão 05 muda de 3 pra 4. Os 4 pilares oficiais passam a ser:

1. **Encontre Talentos** (preservado) — "Alcance pessoas em nosso canal de contratação. Seja para um consultor pontual ou um funcionário full-time, a elite do mercado está aqui."
2. **Conteúdo Denso** (preservado) — "Curadoria diária e compartilhamento de conhecimento replicável. Newsletters, Lives Semanais e AMAs com os melhores do mundo."
3. **Vibe Única** (preservado) — "Novo ou avançado, tímido ou extrovertido. Nossos membros possuem ideias semelhantes e diferentes. Somos uma comunidade agnóstica onde a troca é real."
4. **Ferramentas** (novo) — "Templates, checklists e frameworks compartilhados pela comunidade. Materiais práticos editáveis para acelerar o seu dia a dia em Growth."

Grid da home muda de 3-col pra 4-col em desktop (responsivo: 2-col em tablet, 1-col em mobile). `brand/decisions/05-archetype-multidisciplinar.md` é editado pra adicionar o 4o pilar (em vez de abrir Decisão 06 separada — mantém Decisão 05 como source of truth dos pilares atualizado).

**Reversibility:** Reverter exige editar STATE + Decisão 05 (remover 4o pilar) + index.html (remover card) + CSS (volta 3-col). Custo: 3 commits.

---

### AD-029 (ex-AD-019 da sessão VM): Usability/delight pass no site — chrome épico + camada de animação progressiva
**Date:** 2026-06-10
**Status:** Accepted

> **Nota de merge (2026-06-11):** esta ADR nasceu numa sessão paralela (VM) como "AD-019", colidindo com o AD-019 existente (Meetup S1·E1 reset → CRMBonus, 2026-05-25). Renumerada pra AD-029 ao reconciliar as branches; o commit original (`b91dd8b`/`1fa3626`) e o CHANGELOG referenciam o número antigo.

**Context:** Deep review de usabilidade solicitado pelo Henrique ("site 6/10, quero 9/10 — faltam animações, ícones épicos, hero memorável, nav e footer épicos"). O review revelou que `chrome.css` já continha estilos completos pra um footer rico (footer-hero CTA, footer-stats, orbs, manifesto pull-quote, social, build-in-public) e pro chip de meetup na nav, mas `header.js`/`footer.js` renderizavam só a versão mínima. O sistema de scroll-reveal nativo (components.css §14) cobria apenas classes legadas (`.problem`, `.layers`...) — nenhuma seção `.home-*` animava. O menu mobile usava hack frágil (`top: calc(100% + 280px)`).

**Decision:** Pass de usabilidade em 6 frentes, tudo progressivo (sem JS ou com `prefers-reduced-motion` o conteúdo fica 100% visível e estático — coerente com L-003):

1. **Nav épica** (`header.js` + `chrome.css`): chip do próximo meetup (S1·E1 · 9 JUL · SP, pulse dot, some <1160px), barra de progresso de scroll amber→teal (CSS scroll-driven, degrada invisível), hamburger animado (3 barras → X), painel mobile reconstruído (links + chip + CTA num dropdown animado, fecha com Esc/clique).
2. **Footer épico** (`footer.js`): footer-hero CTA ("Cresça com quem já passou pela curva."), footer-stats (5 números com count-up), orbs decorativos, manifesto pull-quote com o ton-anchor verbatim, social row (Substack/LinkedIn/GitHub), link build-in-public. Opt-outs: `data-cta="off"` (home + páginas de conversão/obrigado), `data-stats="off"` (home, que já tem os números no hero).
3. **Hero memorável** (`pages.css` + `index.html`): badge com pulse dot ("Desde 2015 · Meetup S1·E1 em 9 jul"), orbs flutuantes amber/teal, entrada em stagger, sublinhado animado no *Multidisciplinar*, focus ring no form.
4. **Scroll reveal** (`enhance.js` novo): IntersectionObserver marca heads/grids da home + footer com `[data-reveal]` e stagger; estado escondido gated em `html.gc-js`.
5. **Count-up** (`enhance.js`): stats da home/meetup/footer sobem de 0 com formatação pt-BR ao entrar no viewport.
6. **Micro-interações** (`components.css`): ícones dos pilares viram squircles 56px com gradiente por tinta + hover scale/rotate, feature icons 48px com inversão amber no hover, marquee infinito na régua de logos (pausa no hover, mask fade), aspas decorativas nos testimonials, lifts em cards, sheen sweep nos botões primary, FAQ com expansão suave (`interpolate-size`, Chrome 129+).

`enhance.js` foi adicionado a todas as 20 páginas (defer). Cache CSS bumped pra `v=20260610`. Smoke test Playwright (desktop+mobile) verde.

**Reversibility:** Reverter = git revert do commit; nenhum dado/contrato externo afetado.

---

## Active Blockers

### B-002 (URGENTE — SITE FORA DO AR): Domínio `growthclub.pro` expirado, parqueado no name.com
**Date opened:** 2026-06-24
**Owner:** Henrique (pagamento — só ele tem acesso ao name.com)
**Status:** Open — site, e-mail e checkout do meetup FORA DO AR até a renovação
**Context:** `growthclub.pro` expirou em **2026-06-23** (registro de 1 ano feito em 2025-06-23, sem auto-renew com cartão válido). Em 2026-06-24 ~22:16 UTC o name.com resetou o DNS pro parking do Sedo (NS → name.com, A → `91.195.240.94`), e o apex passou a responder `HTTP 436` + `server: Parking/1.0`. Coincidiu com o upgrade do Ghost 6.47 (AD-043) no mesmo dia, mas é **independente** — o Cloudflare/Worker/container e o Ghost 6.47 estão intactos, só inalcançáveis enquanto o DNS estiver parqueado. RDAP confirma status `auto renew period` e expiração já empurrada pra 2027-06-23 (o registrar fronteou a renovação e cobra **$35.99**).
**Impacto:** site público + e-mail (`hey@mail.growthclub.pro`, depende do DNS) + checkout/venda de ingresso do Meetup S1E1 (23 jul, ~4 semanas) todos fora do ar. Janela operacional bem mais curta que a janela do domínio.
**Janela de recuperação (TLD `.pro` / Identity Digital, confirmar com name.com):** auto-renew grace ~45 dias ($35.99, preço normal, ~até início de agosto) → redemption ~30 dias (taxa de resgate cara, ~$80-200+) → pending delete → leilão. Domínio NÃO está perdido; só precisa pagar dentro da grace antes de virar resgate.
**Resolução:** pagar os $35.99 no Renewal Center do name.com + restaurar o DNS pro Cloudflare (NS do Cloudflare da zona, ou o registro do apex anterior ao parking). Site volta sozinho no estado 6.47 quando o DNS propagar. Ligar auto-renew com cartão válido pra não repetir (quando o caixa permitir). Liga ao princípio R-11 / aperto de caixa.

### B-001 (URGENTE): Revisar TODA documentação oficial pro novo padrão 2026-05-25
**Date opened:** 2026-05-25
**Owner:** Henrique (revisão) + agente Claude (execução)
**Status:** Open — bloqueia consistência editorial cross-channel

**Context:** O site público (`website/`) foi alinhado em 2026-05-25 a um conjunto de regras editoriais novas (AD-016 a AD-022). A documentação interna em `docs/`, `brand/`, `.specs/` continua reflexo do estado anterior (~120 ocorrências de "operador" só nos MDs, várias menções a "Barte" como evento ativo, descrições antigas de tier pago Master como ativo, "mesa de canto" como pitch).

**Scope da revisão:** todos os arquivos `*.md` em:
- `docs/community/`, `docs/crew/`, `docs/investors/`, `docs/sponsors/`, `docs/superpowers/`, `docs/legacy/`
- `brand/decisions/`, `brand/visual/`, `brand/voice/`, `brand/legacy/`
- `.specs/project/` (exceto este STATE.md, que é append-only)
- `README.md`, `CHANGELOG.md`, `SECURITY.md` na raiz

**Regras a aplicar (referência canonical = memory files):**
1. **Termo `operador` → `especialista`** (ver [[feedback-termo-especialista]]). Preservar "operacional", "operadora", "operação".
2. **Remover "mesa de canto"** (ver [[feedback-mesa-de-canto-proibida]]). Substituir por "comunidade", "especialista com especialista", "conversa entre pares".
3. **Meetup S1·E1 = CRMBonus 9 jul 2026** (ver [[project-meetup-s1e1-crmbonus]]). Barte parqueado, sem data. Não usar como evento ativo.
4. **CNPJ canonical: Level Tecnologia da Informação Ltda · 64.685.768/0001-29** (ver [[reference-cnpj-canonical]]). Substituir placeholders "CNPJ em registro", "CNPJ TBD", "Hospedado por Level Tech" sem detalhe.
5. **Tier pago Master parqueado** (ver [[feedback-tier-pago-nao-aparece]]). Em docs internas pode mencionar como histórico/planejado, mas não como produto ativo. Atualizar Business Plan, Brand Brief, Founder Crew docs.
6. **Voz sem regionalismo** (ver [[feedback-voz-sem-regionalismo]]). Editorial neutro, sem mineiro/paulista/carioca.
7. **Páginas legais atualizadas** (ver AD-018). Se brand book ou docs referenciam termos/privacidade antigos, sincronizar.

**Approach sugerido:**
- Fase 1 (quick wins via script): `\boperador(es)?\b → especialista(s)` site-wide em MD. Estimativa 120 substituições.
- Fase 2 (curadoria manual): caçar "mesa de canto", "Barte", "Master tier", "CNPJ em registro" — substituir caso a caso preservando contexto.
- Fase 3 (revisão estrutural): Business Plan v1.2 (`docs/superpowers/specs/2026-04-22-growth-club-business-plan-design.md`), Brand Brief Plan, brand decisions/voice files — verificar coerência ampla.

**Quando atacar:** próxima sessão dedicada (não meter no meio de outras tasks). Estimativa: 2-3 horas focadas. Dependência: nenhuma. Bloqueia: nada técnico, mas bloqueia coerência editorial cross-channel se docs vazarem pra investidor/imprensa/crew sem alinhamento.

---

---

## Active Risks

Catalogados em `docs/superpowers/specs/2026-04-22-growth-club-business-plan-design.md` §9.2 (R1 a R10) com mitigação registrada:
- R1 Sobrecarga operacional · R2 Engajamento free ≠ conversão paga · R3 Contaminação editorial por patrocínio · R4 Passivo jurídico de revshare · R5 Dor de arrependimento no "trancar" · R6 Fragmentação dos sub-grupos · R7 Automação ingresso→membership crítica · R8 Inflação não-engajada · R9 Dependência de plataformas de terceiros (Substack/Meta) · R10 Compliance LGPD

### R-11: Cash flow Barte S1E1 sem fonte de receita upfront identificada
**Origem:** AD-003 (Founder Member tier parqueado) — receita prevista de R$ 51.975 (25 × R$ 2.079) não materializa.
**Probabilidade:** Alta — a decisão de parking é voluntária e aceita pelo founder.
**Impacto:** Médio — founder absorve déficit operacional pessoalmente.
**Decisão de mitigação (2026-04-28):** **Henrique absorve o gap pessoalmente.** Não haverá pre-sale GH Master forçado nem ingressos pagos comerciais agressivos com objetivo de cobrir o gap em curto prazo. Princípio explicitado pelo founder: **"Não tem promessa de dinheiro no curto prazo"** — princípio que se estende tanto à comunicação interna com Founder Crew (AD-005, transparência radical) quanto à narrativa pública do Barte S1E1.
**Mitigações passivas (não-forçadas, podem materializar oportunisticamente):**
- (a) Patrocínio livecast (amigo da agência mencionado em AD-001) — segue como meta orgânica de fechamento.
- (b) Ingressos do Barte S1E1 podem ser pagos por razões estratégicas (filtro de qualidade), não como mitigação de R-11.
- (c) Workshops AI LIKE A PRO em formato pago seguem como receita orgânica recorrente.
**Owner:** Henrique
**Status:** Mitigado por absorção consciente — risco aceito.

---

## Lessons Learned

### L-009: Cloudflare Pages serve `index.html` com HTTP 200 em qualquer rota não-casada — verifique pelo BODY, não pelo status
**Context:** 2026-06-26, ao remover um endpoint temporário (`functions/_test-webhook-email.js`) e re-deployar o `gc-checkout`, o `curl` continuava retornando `HTTP 200` pra `/_test-webhook-email` — inclusive na URL direta do deployment novo. Cheguei a concluir (errado) que o wrangler reusava um bundle de functions em cache e que minhas mudanças no webhook talvez não estivessem no ar.
**Problem:** O Pages tem fallback estático estilo SPA: **toda rota sem Function casada serve o `index.html` com status 200**. Logo, `200` não distingue "Function existe e respondeu 200" de "Function não existe, caiu no `index.html`". Uma rota gibberish (`/rota-que-nao-existe-xyz`) também dava 200 — o tell.
**Solution:** Verificar a EXISTÊNCIA/atualização de uma Function pelo **corpo da resposta**, não pelo status: função real retorna o JSON dela (`{"found":false}`), rota removida retorna `<!doctype html>...`. Confirmado que as Functions deployam corretamente e que o domínio de produção serve o deployment mais novo. Bônus: deployments antigos (`<hash>.gc-checkout-7yv.pages.dev`) seguem servindo o bundle antigo deles — um endpoint removido ainda responde por lá; `wrangler pages deployment delete <id> --force` pra eliminar de vez (não dá pra deletar o que tem alias de produção ativo).
**Aplicável a:** qualquer verificação pós-deploy no `gc-checkout` (e no `website` legado). Relacionado a [[L-008]] (família de gotchas de Pages/edge).

### L-008: Cloudflare Pages engole respostas com status 502/504 da Function
**Context:** 2026-06-26, ao adicionar o caminho de cupom no `create-checkout` (AD-045), o erro de "não consegui validar o cupom" retornava `new Response(json, { status: 502 })`. O navegador recebia `error code: 502` (text/plain, `server: cloudflare`), não o JSON da Function.
**Problem:** o edge do Cloudflare **intercepta respostas com status 502/504 vindas da Pages Function** e substitui o corpo pela própria página de gateway (agravado por orange-to-orange, header `cf-connecting-o2o: 1`). O JSON `{error}` da Function nunca chega ao cliente, então o popup não conseguia mostrar a mensagem amigável. Confirmado via `wrangler pages deployment tail <id>`: log com `outcome: ok`, `exceptions: []`, `response.status: 502` — a Function rodou certo, o 502 foi escolha de código, e mesmo assim o corpo foi trocado.
**Solution:** erro de aplicação que precisa entregar `{error}` ao front → usar **4xx (ex 400)**, que passa intacto. Reservar 502/504 só quando se QUER que o edge sirva o erro genérico (no `gc-checkout`, o 502 do InfinitePay é mantido de propósito pra o popup degradar pro link de fallback do ind/dupla). Memory file [[reference_cloudflare_pages_502]].

### L-007: A classe `.prose` do DS carrega drop-cap + `max-width:64ch` que quebram conteúdo estruturado
**Context:** 2026-06-23, a LP do meetup ("O Bilhete") usava `<div class="prose">` no miolo (exigência do `deploy-meetup-lp.mjs`, que extrai `<style>` + `.prose`). Visualmente: letras gigantes arrancadas no meio do texto ("S"etores, "I"ndividual, "R"$) e cards estreitos com espaço morto à direita.
**Problem:** `built/screen.css` define, pra ARTIGOS, `.prose section:first-of-type p:first-of-type::first-letter` (drop-cap editorial) e `.prose{max-width:64ch}`. Num conteúdo ESTRUTURADO (escada de lotes com vários `<p>` aninhados, cards), o `p:first-of-type` casa o primeiro `<p>` de **cada** bloco da primeira section → drop-cap explode em vários lugares; e o `64ch` estreita tudo sem centralizar dentro do container pai.
**Solution:** ao reusar `.prose` pra layout que não é artigo de leitura, **neutralizar** dentro do escopo da página: zerar `::first-letter` (font/float/padding herdados) e `max-width:none` + `> section{padding:0}`, deixando o container próprio mandar na largura/ritmo. Aplicado escopado em `.gc-meetup--live` (não afeta artigos reais). Vale pra qualquer LP futura publicada via Admin API que use a classe `.prose`.

### L-006: Ghost pede variantes responsivas `/size/wN/` que o R2/ghos3 não gera
**Context:** 2026-06-14, capas (feature images) dos posts apareciam quebradas **no site** mas OK no **admin**. Causa: o tema renderiza a feature image + srcset com as URLs de imagem responsiva do Ghost (`/content/images/size/w1200/...`), mas o storage é R2 via adapter `ghos3`, que **só guarda a original — não gera as variantes de tamanho**. A variante dava miss no R2, caía no redirect genérico `/content/*` → `/*` (do cutover AD-034) e virava `/images/size/...` → **404 text/plain** → `<img>` quebrado. O admin não quebra porque usa a URL original (sem `/size/`).
**Problem:** Sintoma sistêmico e silencioso — afeta TODA feature image e TODO srcset de TODOS os posts no frontend, mas é invisível no admin (onde o editor trabalha). Fácil de não notar até alguém abrir o site logado-out.
**Solution:** Fallback no Worker (`src/index.js`, commit `6ecff1d`): no GET de `/content/images/size/...` que dá miss no R2, fazer strip do prefixo `size/<spec>/(format/<x>/)?` e servir a **imagem original**. Puramente aditivo (só dispara no miss de `/size/`). Validado: 22/22 feature images via `/size/w1200/` → 200. **Detalhe de verificação:** o erro era um **301 (permanente)**, então browsers que já visitaram cacheiam o redirect — confirmar correção exige `Cmd+Shift+R` (hard-refresh), não F5; o `curl` (sem cache) mostra o estado real do servidor.
**Aplicável a:** qualquer imagem nova no Ghost (capa ou corpo) — a correção é genérica e cobre futuras, mas se o serving de imagens do Worker for refatorado, preservar esse fallback. Relacionado a [[L-003]]/[[L-005]] (família de bugs de cache/serving no apex).

---

### L-005: Cache mismatch vale pra JS de web components, não só CSS
**Context:** 2026-06-11, deploy do AD-019 quebrou o mobile em produção ("nav estourando a largura da página"). Causa: `header.js`/`footer.js` eram servidos pelo Cloudflare Pages com `Cache-Control: max-age=14400` (4h) e **sem** `?v=` — celulares que já tinham visitado o site rodaram o `header.js` antigo (markup `.nav-links`/`.nav-cta` direto no `.nav-inner`) com o `chrome.css` novo (que só esconde `.nav-menu` no mobile). Resultado: 6 links + CTA expostos num viewport de 390px, `scrollWidth` 585px vs 390px.
**Problem:** É o L-003 aplicado a JS — web components que geram markup são tão acoplados ao CSS quanto o próprio HTML, mas o cache busting cobria só os stylesheets.
**Solution:** (1) Todo `<script src="/assets/js/...">` carrega o mesmo `?v=` dos stylesheets — `bin/bump-css-version.sh` agora bumpa ambos. (2) Toda mudança de classe/estrutura em markup gerado por JS precisa de regra CSS defensiva pro markup antigo durante a janela de TTL (ex.: `.nav-inner > .nav-links { display: none }` no mobile do `chrome.css`). (3) `_headers` declara cache explícito pra `/assets/js/*` igual ao CSS.
**Aplicável a:** qualquer mudança futura em `header.js`/`footer.js` ou novo asset JS que renderize markup.

### L-004: Regionalismo geográfico em copy editorial multidisciplinar é caro
**Context:** Em 2026-05-25, tentei "tempero mineiro" (cê / tá / vamo / pra) em ~14 páginas a pedido do Henrique. Após visualizar, Henrique pediu reverter urgente.
**Problem:** A voz Growth Club já é coloquial e franca (não institucional/corporativa). Adicionar marcadores regionais cria 2 problemas: (a) limita o alcance percebido — comunidade de 33 cidades e 7 estados não é "mineira", (b) parece artificial em copy que precisa funcionar pra leitor em qualquer região do Brasil. A voz default já é humanizada (CLAUDE.md global manda usar humanizer skill que remove AI-isms) — adicionar regionalismo é overshoot. Tentativa de "humanizar mais" via sotaque foi confundida com "tornar mais natural", mas o resultado prático foi parecer caricatura.
**Solution:** Voz padrão = editorial neutra brasileira, sem marcadores regionais. Quando um usuário pede "mais natural", verificar se a copy atual já passou pelo humanizer skill antes de inventar nova camada de tempero. Regionalismo só entra se houver decisão explícita de targeting regional (que não é o caso do Growth Club — escopo nacional).
**Aplicável a:** futuras tentativas de "humanizar" / "deixar mais natural" prosa do site. Memory file [[feedback-voz-sem-regionalismo]] sintetiza a regra.

### L-003: Scroll-driven CSS com `opacity: 0` no `from` quebra snapshots e bots
**Context:** Phase 3 do refino técnico (AD-013) substituiu `scroll-reveal.js` por CSS `animation-timeline: view()` aplicado às seções `.problem`, `.layers`, `.timeline`, `.section`, etc. Keyframe original animava `opacity: 0 → 1` + `transform: translateY(28px) → 0` com `animation-fill-mode: both`.
**Problem:** `animation-fill-mode: both` aplica o estado `from` da animação **antes** do range entrar. Pra elementos abaixo do viewport (que ainda não entraram no scrollport), isso significava `opacity: 0` permanente até que o scroll trigerasse o range. Comportamento invisível pro usuário scrollando normalmente, mas catastrófico pra: (a) screenshots full-page (Chrome DevTools, Puppeteer, Playwright), (b) print-to-PDF, (c) crawlers de SEO/redes sociais com link preview, (d) screen readers que pulam por estrutura, (e) browsers sem suporte a `animation-timeline: view()` (Firefox até ~2025). Smoke test visual no Chrome DevTools MCP pegou o bug imediatamente — a home renderizava só hero + footer com vazio massivo no meio.
**Solution:** Animar **apenas `transform`**, manter `opacity: 1` sempre. Efeito slide-up preservado, mas conteúdo sempre visível em qualquer contexto não-scrollado. Regra geral: **scroll-driven CSS que altera visibilidade exige fallback estático garantido**. Se o efeito precisar de fade-in real, alternativa é usar `@scroll-timeline` JS-driven com observer que adiciona class explícita — mas o custo de manutenção volta a empatar com `IntersectionObserver` puro. Trade-off resolvido: animar só transforms baratos, dispensar opacity em scroll-driven.
**Aplicável a:** qualquer animação CSS aplicada via `animation-timeline` (view/scroll/custom). Especialmente perigoso em sites multi-page estáticos onde crawlers/snapshots representam % significativa do tráfego.

### L-002: Categoria nova vs. adaptar tier existente
**Context:** Ao desenhar remuneração pra operadores que vão entregar site/identidade/repo, considerou-se incluir essas pessoas dentro do tier Founder Member existente (R$ 2.079 pago) com algum desconto/exceção.
**Problem:** Misturar consumidor pagante (paga acesso + recebe revshare proporcional a referral) com trabalhador trocando labor por upside (ganha revshare por entrega) corrompe a narrativa de ambos. Founder Member que pagou R$ 2.079 olharia o "Founder Member que não pagou" e reclamaria — corrosão da percepção de valor do tier prêmio.
**Solution:** Criar categoria paralela com nome distinto (Founder Crew), regra distinta (revshare por entrega, não por referral), e narrativa distinta (tripulação que faz o barco andar, não passageiro fundador). Aplicável a futuras decisões de tiering — quando dois grupos têm naturezas jurídicas/comerciais diferentes, separe nomenclatura mesmo que o cap-table fique mais complexo.

### L-001: Ativos orgânicos preexistentes mudam a natureza do design
**Context:** No meio do brainstorming, o autor revelou que o Growth Club já tem 2.261 assinantes Substack + 715 Community WhatsApp + 10+ meetups realizados desde 2015.
**Problem:** As 10 primeiras decisões do brainstorming assumiam greenfield; ficaram parcialmente descalibradas quando o contexto real apareceu.
**Solution:** Imediatamente redirecionar o framing de "lançamento do zero" para "profissionalização de ativo vivo". Antes de perguntar "como construir X", perguntar "existe algo parecido já rodando?". Incorporar ativos preexistentes como pilares do design (marca, tom, cadência) em vez de descartá-los.

---

## Deferred Ideas

Decisões conscientemente deferidas com gatilho de retomada estão registradas em `docs/superpowers/specs/2026-04-22-growth-club-business-plan-design.md` §9.1 e §11 (Estrutura Legal e Operacional).
