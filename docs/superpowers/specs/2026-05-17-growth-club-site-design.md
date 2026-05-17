# Site Design — Growth Club v1

**Versão:** 1.0 (draft, pendente review do autor)
**Data:** 2026-05-17
**Status:** Draft — aguarda review humano antes de avançar pra writing-plans
**Autor:** Henrique Caner + Claude (sessão de brainstorm com superpowers:brainstorming)
**Localização canônica:** `docs/superpowers/specs/2026-05-17-growth-club-site-design.md`

---

## Sumário Executivo

Spec de design do site oficial do Growth Club em `growthclub.pro`. Site público, vitrine pura, **sem login interno**. Todo o conteúdo "members-only" é redirecionado pra plataformas externas (Substack, Vimeo/Hotmart a definir, WhatsApp), respeitando o princípio do business plan de não construir SaaS proprietário.

**6 itens no top-nav** (Home · Sobre · Recursos · Meetups · Empresas · Tornar-se Membro · Contato) com **19+ rotas/anchors** no inventário.

**Hero estático com CTA único** "Tornar-se Membro" + **ganchos distribuídos abaixo** em 9 seções na home. Sazonalidade do meetup é resolvida por **slot dinâmico** na home (mostra próximo meetup ≤ 60 dias, senão último livecast) — sem hero dinâmico.

**Caminho único pra membro free** (`/membro`): pessoa entra com email, vira Growth Hacker (newsletter Substack + convite Community WhatsApp). Master fica como bloco discreto "em breve em 2027". Founder Member não aparece (parqueado em AD-003).

**Hub comercial `/empresas`** consolidando 4 ofertas B2B em single page com anchors: `#patrocinio` (livecast) · `#vagas` (job board pitch) · `#hunting` · `#mentoria`.

**`/sobre`** também é single page com anchors: história + manifesto integrado + Founder Crew + imprensa.

**Bloqueador crítico de go-live:** **ADR-007 precisa ser formalizada** no `STATE.md` antes do site ir ao ar, registrando os compromissos operacionais de Mentorias quinzenais, Desafios mensais e as 3 frentes B2B (job board, hunting, mentoria B2B). Sem ADR registrada, o site fala de produtos sem dono operacional — fere o ton-anchor "sem teatro".

**Stack** fica em aberto pra escolha do Founder Crew #1 (frontend), com guardrails do `website/README.md` (deploy Vercel/Netlify, hosting ≤ R$ 200/mês).

---

## 1. Contexto e relação com decisões anteriores

### 1.1 Posição no roadmap

Este spec é a **fase 3** da profissionalização do Growth Club, conforme decomposição original (Business Plan → Marca → Site):

| Fase | Status | ADR |
|------|--------|-----|
| Business Plan v1.2 | ✅ Aprovado | AD-001 |
| Marca v1 (parcial) | 🔄 Chunks 1, 3, 5-textual entregues; Chunk 2 logo SVG em produção; Chunk 4 templates não iniciado | ADR-002 |
| **Site v1** | 📋 **Este spec** | TBD |

### 1.2 Decisões locked que este spec respeita

Trespassar essas decisões requer ADR explícita no `STATE.md`:

- **AD-001 §7.2** — Site `growthclub.pro` é entregável da Fase 1; ingresso de meetup gera membership Growth Hacker automático (integração crítica).
- **AD-002 §10** — Founder Crew #1 (frontend) é o executor designado. Crew tem crédito vitalício enquanto vínculo ativo (vai aparecer em `/sobre#crew`).
- **AD-003** — Founder Member tier parqueado. Site **não menciona** esse tier até descongelar.
- **AD-004** — Hospedagem operacional dentro do CNPJ da Level Tech em Fase 1. Site aplica essa estrutura (pagamentos, contratos com fornecedores, recebimento de patrocínio).
- **AD-005** — Transparência financeira radical com Founder Crew. Não impacta diretamente UI do site, mas alinha a narrativa pública (sem promessa de dinheiro no curto prazo).
- **Locked decision #1** (CLAUDE.md) — Canonical name `Growth Club`.
- **Locked decision #2** (CLAUDE.md) — Archetype Outlaw + Sage; ton-anchor `"Franco, com número, sem palco, com cerveja."`.
- **Locked decision #3** (CLAUDE.md) — Meetup naming `Meetup Growth [CIDADE] · S[ANO] · E[EDIÇÃO] · [TEMA]`. Aplicável a rotas `/meetups/[slug]`.
- **Locked decision #4** (CLAUDE.md) — Régua editorial #1: "Se não tem número, não é Growth Club". Aplicável a copy.

### 1.3 Ativos preexistentes que o site se conecta

- **Substack** (https://growthclub.substack.com) — 2.261 assinantes ativos desde 2019. Site **redireciona** pra cá; não substitui.
- **Community WhatsApp** — 715 membros distribuídos em 7 grupos. Site abre porta de entrada controlada (form → convite).
- **Tally** (https://tally.so/r/BzLJO4) — captura provisória pra waitlist do Meetup S1E1 Barte. Site pode substituir ou continuar usando.
- **Brand book v1 parcial** (`brand/brand-book.md`, `brand/brand-book-v1.pdf`) — paleta, tipografia, voice. Logo SVG final ainda em produção (Figma solo).
- **YouTube/LinkedIn** do Henrique e do clube — destino dos embeds de livecast.

---

## 2. Visão e Objetivo

### 2.1 O que o site é

- **Vitrine pública** do Growth Club: conta a história, mostra o manifesto, lista o que a comunidade entrega, abre porta pra entrar.
- **Hub de conversão multi-stage**: cold traffic → newsletter Growth Hacker → meetup → futuramente Master pago.
- **Documento comercial** pro lado B2B (patrocínio, contratação, mentoria).
- **Identidade aplicada** — primeira aplicação real do brand book em escala pública.

### 2.2 O que o site NÃO é

- **Não é** SaaS proprietário. Sem login interno, sem `/minha-conta`, sem sessão.
- **Não é** plataforma de conteúdo. Newsletter mora no Substack, aulas moram em plataforma externa, livecast mora no YouTube/LinkedIn.
- **Não é** blog editorial. Substack já é o canal editorial canônico — duplicar criaria fricção de manutenção.
- **Não é** catálogo de membros. Diretório de operadores é entregável futuro (Fase 2, business plan §7.2), gated pra pagantes — não vive no site público.

### 2.3 Métricas de sucesso (medíveis após go-live)

| Métrica | Meta inicial | Como medir |
|---------|-------------|------------|
| Lighthouse Score (mobile) | ≥ 80 em Performance, Accessibility, Best Practices, SEO | PageSpeed Insights |
| Tempo até interativo (TTI) | ≤ 3s em 4G | Lighthouse |
| Conversão home → /membro form | ≥ 8% | Plausible (proposta) |
| Submissão de form em /membro | ≥ 3% do tráfego total | Substack stats + Plausible |
| CTR no slot dinâmico (seção 7 da home) | ≥ 5% quando há meetup ativo | Plausible event |
| Bounce rate em /sobre | ≤ 60% (página long-form, scroll esperado) | Plausible |

Stack-friendly: todas as métricas escolhidas podem ser medidas via Plausible (cookieless, privacy-first) — alinhado com tom-anchor "sem teatro" (sem cookie banner gigante).

---

## 3. Arquitetura de Informação

### 3.1 Top-nav (header)

```
Home · Sobre · Recursos ▾ · Meetups ▾ · Empresas · Tornar-se Membro · Contato
                                                   (link direto, sem dropdown)
```

- **Sobre** — link direto pra `/sobre` (single page com anchors `#manifesto`, `#crew`, `#imprensa`)
- **Recursos** — dropdown com 5 sub-itens
- **Meetups** — dropdown com Próximo + Histórico
- **Empresas** — link direto pra `/empresas` (single page com anchors `#patrocinio`, `#vagas`, `#hunting`, `#mentoria`)
- **Tornar-se Membro** — link direto pra `/membro`
- **Contato** — link direto pra `/contato`

### 3.2 Inventário completo de rotas

```
/                                  Home (9 seções, vertical scroll)

/sobre                             Long-form: história + #manifesto + #crew + #imprensa

/recursos/newsletter               LP → Substack (email pré-preenchido via JS)
/recursos/aulas                    Catálogo → plataforma externa (TBD)
/recursos/livecast                 Histórico embed YouTube/LinkedIn
/recursos/workshops                AI LIKE A PRO + próximas turmas
/recursos/comunidade               Convite controlado WhatsApp

/meetups                           Hub (próximo + lista resumida)
/meetups/[slug]                    LP de cada edição (template parametrizado MDX/JSON)
/meetups/historico                 Lista completa das 10+ edições passadas

/empresas                          Long-form B2B: #patrocinio + #vagas + #hunting + #mentoria

/membro                            Caminho único free (Growth Hacker)
/membro/obrigado                   TY page

/contato                           Form + canais
/contato/obrigado                  TY page

/privacidade                       Footer legal
/termos                            Footer legal
/lgpd                              Footer legal
/codigo-de-conduta                 Footer legal (reusa .github/CODE_OF_CONDUCT.md)

/404                               Página humorada na voz do clube
```

### 3.3 Footer (presente em todas as páginas)

```
[Coluna 1: Sobre]              [Coluna 2: Recursos]         [Coluna 3: Comercial]
Sobre o clube                  Newsletter                   Empresas (hub)
Founder Crew                   Aulas                        Patrocinar
Imprensa                       Livecast                     Vagas
                               Workshops                    Hunting
                               Comunidade WhatsApp          Mentoria

[Coluna 4: Legal]              [Coluna 5: Contato]
Privacidade                    parceiros@growthclub.pro
Termos                         contato@growthclub.pro
LGPD                           LinkedIn Henrique
Código de Conduta              Substack
                               GitHub
```

Footer bottom: `© 2015–2026 Growth Club · CNPJ Level Tech [a inserir] · Manifesto vivo desde 2015`

---

## 4. Páginas — desenho detalhado

### 4.1 Home (`/`)

**9 seções em vertical scroll. Hero estático com CTA único + ganchos distribuídos.**

| # | Seção | Conteúdo | Observação |
|---|-------|----------|------------|
| 1 | HERO | Logo + manifesto curto + `[Tornar-se Membro]` | Linha hero: *"Franco, com número, sem palco, com cerveja."* |
| 2 | PROVA SOCIAL NUMÉRICA | Faixa horizontal: `2.261 leitores · 715 membros · 10+ meetups desde 2015` | Números atualizados manualmente (sem fetch dinâmico v1) |
| 3 | PRA QUEM É / PRA QUEM NÃO É | 2 colunas lado a lado, listas curtas | Filtro pra qualificar lead frio |
| 4 | CONTEÚDOS QUE PRODUZIMOS | Grid agrupado em 3 sub-blocos | Eventos · Programas de membros · Editorial — 9 cards no total |
| 5 | COMO AJUDAMOS PROFISSIONAIS | 3 cards | Reposicionamento · Novo trabalho · Networking + mentoria |
| 6 | COMO AJUDAMOS EMPRESAS | 3 cards | Vagas ⚠️ · Hunting ⚠️ · Mentoria dedicada ⚠️ |
| 7 | SLOT DINÂMICO | Próximo meetup (≤60d) ou último livecast | Resolve sazonalidade sem hero dinâmico |
| 8 | DEPOIMENTOS | 2-3 cards do core | Quote · nome · role · empresa — pré-requisito de go-live |
| 9 | CTA FINAL + FOOTER | "Entra no clube" repete Tornar-se Membro | Footer completo conforme §3.3 |

**Detalhe da seção 4 (Conteúdos que produzimos):**

**Eventos ao vivo:**
- Meetups (10+ edições desde 2015)
- Q&A · AMAs (sync + async com especialistas globais)
- Livecast semanal patrocinado

**Programas de membros:**
- Mentorias quinzenais ⚠️ ADR-007
- Desafios mensais com premiação ⚠️ ADR-007
- Grupos WhatsApp por interesse

**Conteúdo editorial:**
- Newsletter deep (Substack: semanal pública + quinzenal paga)
- ✨ Breakdowns públicos (TBD — sugestão da sessão)
- ✨ Benchmark anual (TBD — sugestão da sessão)

### 4.2 `/sobre`

**Single page long-form com anchors. Substitui as ideias originais de `/sobre/manifesto`, `/sobre/crew`, `/sobre/imprensa` separadas.**

1. **HERO** — "Sobre o Growth Club"
2. **HISTÓRIA** — 2-3 parágrafos: 2015 (origem) → 2019 (Substack) → 2026 (profissionalização)
3. **MANIFESTO** (`#manifesto`) — Long-form integral do `brand/voice/manifesto.md` (versão expandida). Sub-headings em Archivo Black, corpo em Inter.
4. **FOUNDER CREW** (`#crew`) — Era Pré-S1. Por crew member: foto · nome · role · bio curta. Crédito vitalício enquanto vínculo ativo (AD-002 §10).
5. **IMPRENSA** (`#imprensa`) — Bio oficial do Henrique · fact sheet · contato pra imprensa · link de download do press kit (ZIP com logos SVG/PNG + fotos).
6. **ASSINATURA** — "— Henrique Caner · Comunidade desde 2015"
7. **CTA FINAL** — "Se isso fez sentido, entra no clube → /membro"

Crew #1 implementa **scrollspy** (anchor links destacam item ativo no top-nav secundário ou sticky lateral) — facilita navegação numa página com ~3500 palavras.

### 4.3 `/recursos/*` (5 sub-páginas curtas)

**`/recursos/newsletter`**
- Pitch curto (3-4 parágrafos): por que vale a pena assinar
- Form de email
- Click no submit: JS captura email → `window.location.href = 'https://growthclub.substack.com/subscribe?email=' + encodeURIComponent(email)`
- LGPD: opt-in explícito + link pra `/privacidade`

**`/recursos/aulas`**
- Catálogo de aulas gravadas (cards: thumb · título · duração)
- Click no card → redirect pra plataforma externa (TBD — Vimeo Showcase, Hotmart, Heartbeat, ou similar)
- Acesso controlado pela plataforma externa, não pelo site
- Banner: "membros pagantes têm acesso completo" + CTA pra `/membro`

**`/recursos/livecast`**
- Pitch: o que é, cadência, quem participa
- Histórico de episódios (embed YouTube/LinkedIn, paginado se necessário)
- CTA "Patrocinar próximo episódio → /empresas#patrocinio"

**`/recursos/workshops`**
- AI LIKE A PRO em destaque
- Próximas turmas (se houver)
- Pitch: formato, duração, preço indicativo
- CTA "Quero participar → email pra workshops@growthclub.pro"
- Histórico de workshops anteriores

**`/recursos/comunidade`**
- Como funciona a Community WhatsApp (715 membros, 7 grupos por interesse)
- Régua de moderação editorial S1: "se não tem número, não é Growth Club"
- Form de email com motivo: pessoa pede convite, recebe link por email (envio automático ou manual via Henrique na v1)

### 4.4 `/meetups`, `/meetups/[slug]`, `/meetups/historico`

**`/meetups`** (hub)
- Hero: "Onde a comunidade se encontra"
- Pitch: porque meetups são o coração do clube
- Próximo meetup destacado (mesmo card do slot dinâmico da home)
- Lista resumida dos próximos confirmados (se houver)
- Link "Ver histórico →"

**`/meetups/[slug]`** (LP de cada edição)

Template parametrizado. Cada edição é arquivo MDX/JSON, não markup hardcoded.

1. **HERO** — Nome canônico (`Meetup Growth SP · S1 · E1 · Revenue Operations com IA`) + data + local + ilustração/foto
2. **PITCH** — 2-3 parágrafos: porque essa edição específica vale o deslocamento
3. **AGENDA** — Horários · talks · workshops · mesa-redonda
4. **PALESTRANTES** — Cards (foto · nome · role · empresa)
5. **LOCAL + COMO CHEGAR** — Endereço · embed mapa (Google Maps ou OpenStreetMap) · transporte público
6. **PREÇO + INSCRIÇÃO** — Tabela de tiers (early/regular/last-call se aplicável) + CTA principal
7. **PATROCINADORES DO EVENTO** — Logos + 1 linha de cada
8. **FAQ específico** — 5-7 perguntas (acessibilidade, recibo, cancelamento, dress code, etc.)
9. **CTA final + footer**

Cada arquivo MDX/JSON contém:
- `slug` (ex: `sp-s1e1-barte`)
- `nome_canonico`, `cidade`, `serie`, `edicao`, `tema`, `data`, `local`
- `pitch_md` (markdown body)
- `agenda` (array de items)
- `palestrantes` (array com `nome`, `role`, `empresa`, `foto`, `bio`)
- `local` (`endereco`, `como_chegar_md`, `mapa_embed_url`)
- `precos` (array de tiers)
- `patrocinadores` (array)
- `faq` (array com `pergunta`, `resposta_md`)

**`/meetups/historico`**
- Lista das 10+ edições passadas
- Cards: data · cidade · tema · número de participantes · link (se houver registro)
- Filtros: cidade · ano

### 4.5 `/membro`

**Caminho único free. Master "em breve" 2027. Founder Member não aparece.**

1. **HERO** — "Faça parte do Growth Club" + sub: "operadores de growth B2B trocando stack, número e cerveja desde 2015"
2. **FILTROS** — "Pra quem é / Pra quem não é" (mais detalhado que na home)
3. **O QUE VOCÊ GANHA** — Lista pragmática:
   - Newsletter Substack (semanal pública)
   - Convite Community WhatsApp (715 operadores)
   - Acesso aos meetups com membership automático (AD-001 §7.2)
   - Q&A · AMAs · Livecast aberto
   - Conteúdo deep editorial
4. **CAMINHO ÚNICO** — Form de email + CTA "Entrar no clube"
   - Submit: cria assinatura Substack + envia email automático com convite controlado pra WhatsApp
5. **MASTER "EM BREVE"** — Bloco discreto: "Em 2027 abriremos um tier premium pra quem quer mais. Te avisamos por email quando rolar."
6. **FAQ** — 4-6 perguntas:
   - Quanto custa? (free)
   - Posso sair quando quiser?
   - Como vocês moderam a Community?
   - Como funciona o membership de meetup automático?
   - Quando o Master abre?
7. **CTA final + footer**

### 4.6 `/empresas`

**Single page long-form com anchors. Substitui ideias originais de `/empresas/patrocinio`, `/empresas/vagas`, `/empresas/hunting`, `/empresas/mentoria` separadas.**

1. **HERO** — "Comunidade pra empresas que querem encontrar, contratar e patrocinar quem faz growth de verdade"
2. **PROVA SOCIAL B2B** — Logos de empresas que já patrocinaram livecast/meetup + 1 número marcante (ex: "23 empresas patrocinaram nos últimos 24 meses")
3. **PATROCINAR** (`#patrocinio`) — Media kit resumo · formatos (livecast, meetup, newsletter, eventos) · preços indicativos · CTA "Falar com a gente"
4. **VAGAS** (`#vagas`) ⚠️ — Pitch pra empresa anunciar vaga · form/CTA "Anunciar vaga" · ⚠️ pende ADR-007. Na v1, **não é job board com feed dinâmico** — é pitch comercial estático com CTA pra anunciar (vaga única é publicada manualmente pelo Henrique como post-test).
5. **HUNTING** (`#hunting`) ⚠️ — Pitch consultivo (busca dirigida de senior+) · CTA "Agendar diagnóstico" · ⚠️ pende ADR-007
6. **MENTORIA** (`#mentoria`) ⚠️ — Pitch + mentores do core · formatos (sprint de 1 mês, advisory contínuo) · CTA "Conversar com mentor" · ⚠️ pende ADR-007
7. **POLÍTICA DE NÃO-CONTAMINAÇÃO** — Bloco explícito (R3 do business plan)
8. **CTA CONTATO COMERCIAL** — `parceiros@growthclub.pro` ou form

**Quando `#vagas` virar feed dinâmico** (5+ vagas rolando simultaneamente), abre ADR pra split em `/empresas/vagas` separada. Custo de migrar de anchor pra URL é baixo (redirect + link interno).

### 4.7 `/contato` + thank-you pages

**`/contato`**
- Form simples: nome · email · motivo (dropdown: imprensa, parceria, candidato a Founder Crew, dúvida sobre membro, outro) · mensagem
- Canais alternativos: LinkedIn Henrique · email geral · WhatsApp da comunidade
- Submit envia pra `contato@growthclub.pro` (ou serviço SaaS — Formspree, Tally, etc.)

**Thank-you pages** (`/contato/obrigado`, `/membro/obrigado`)
- Mensagem específica ao contexto
- CTA secundário (volta pra home / vê próximo meetup / leia última newsletter)
- Voz do clube ("Recebemos. Te chamamos.")

### 4.8 Páginas legais

**`/privacidade`, `/termos`, `/lgpd`** — escritas em PT-BR coloquial mas tecnicamente cobertas. Footer carrega links pras 4 páginas em todas as views.

**`/codigo-de-conduta`** — reusa `.github/CODE_OF_CONDUCT.md` (publica markdown como HTML).

**LGPD essencial cobrir:**
- Tipos de dado coletados (email, IP, comportamento de navegação se Plausible)
- Finalidade
- Direitos do titular (acesso, correção, exclusão)
- Contato do DPO (Henrique ou Level Tech)
- Política de cookies (mínima — Plausible é cookieless)

### 4.9 `/404`

Página humorada na voz do clube. Estrutura:
- Headline: "Esse link saiu do clube."
- Sub: "Ou nunca esteve aqui."
- CTA: "Volta pra /membro e te ajudamos a achar o caminho."
- Link secundário: voltar pra `/` ou ir pra `/sobre`

---

## 5. Decisões Transversais

### 5.1 Sem login interno

**Decisão:** Site é 100% público. Zero auth, zero sessão, zero `/minha-conta`. Conteúdo "members-only" é redirecionado pra plataforma externa que controla o acesso.

**Por quê:**
- Respeita princípio do business plan de não construir SaaS proprietário
- Zera passivo de LGPD em armazenar credenciais
- Reduz superfície de manutenção pro Crew #1 (que ainda nem entrou)
- Reduz tempo de build em ~30-40%

**Trade-off aceito:** UX de membro pagante (quando Master rolar em 2027) depende da plataforma escolhida. Sem login no site = sem dashboard unificado. Aceitável na v1.

### 5.2 Idioma

**v1: PT-BR único.** Sem multi-idioma. Comunidade é brasileira, audiência primária é Brasil. Adicionar i18n agora é over-engineering.

**Reavaliação futura:** quando houver demanda real de expansão LATAM (não antes de Fase 2/3 do business plan).

### 5.3 Form de captura

**Form de newsletter** (em `/`, `/membro`, `/recursos/newsletter`):
- Captura email no front-end
- JS faz `window.location.href = 'https://growthclub.substack.com/subscribe?email=' + encodeURIComponent(email)`
- Substack assume o resto (welcome email, confirmação dupla, etc.)
- Backup: form Tally como fallback se redirect falhar (TBD pelo Crew #1)

**Form de Community WhatsApp** (em `/recursos/comunidade`, `/membro`):
- Captura email + motivo
- Envia pra Henrique (email ou Tally)
- Convite manual ou automático (TBD — v1 pode ser manual)

**Form de contato** (em `/contato`):
- Tally ou Formspree (TBD — Crew #1 escolhe)
- Envia pra `contato@growthclub.pro`

**Form de patrocínio** (em `/empresas#patrocinio`):
- Envia pra `parceiros@growthclub.pro`

### 5.4 LGPD e opt-in

**Cada form tem opt-in explícito** com checkbox obrigatório:
- "Concordo em receber comunicações do Growth Club (você pode sair quando quiser). [link política de privacidade]"

**Sem dark patterns.** Checkbox padrão DESmarcado. Sem pré-seleção forçada.

**Política de cookies mínima** porque Plausible é cookieless e Substack mora em domínio terceiro (cookies não persistem no `growthclub.pro`).

**Direitos do titular** expostos em `/lgpd` com formulário simples pra exercer.

### 5.5 Stack (livre escolha do Crew #1, com guardrails)

**Guardrails fixos** (do `website/README.md`):
- Deploy em Vercel, Netlify ou similar
- Domínio `growthclub.pro` apontado
- Repositório GitHub sob organização da Comunidade
- Custo recorrente hosting ≤ R$ 200/mês na Fase 1

**Recomendações** (não obrigatórias):
- SSG ou SSR estático (Next.js, Astro, SvelteKit, 11ty) — pra performance e SEO
- MDX/JSON pra conteúdo (meetups, manifesto, posts de patrocinador) — pra Henrique editar sem rebuild
- TailwindCSS ou similar — pra aplicar brand book rapidamente
- TypeScript — pra reduzir bugs de runtime

**Crew #1 decide** e registra a escolha em `.specs/project/STACK.md` antes de começar o build (atualmente placeholder).

### 5.6 Analytics

**Proposta:** **Plausible** (privacy-first, cookieless, sem cookie banner gigante).

**Por quê:**
- Alinhado com tom-anchor "sem teatro" (banner intrusivo é teatro)
- LGPD-friendly (não coleta PII)
- $9-19/mês — cabe no orçamento Fase 1
- Eventos custom (form submit, slot dinâmico CTR) suportados nativamente

**Alternativas consideradas:**
- GA4 (rejeitada — cookies, banner obrigatório, complexidade)
- PostHog (poderia, mas overkill pra site público sem produto)

**Decisão final fica com Crew #1**, mas a recomendação do spec é Plausible.

### 5.7 SEO

**Obrigatório v1:**
- Meta tags por página (`title`, `description`, `og:*`, `twitter:*`)
- Open Graph image por página (gerada via template do brand book — Crew #2 pode produzir)
- Sitemap.xml (gerado automaticamente)
- robots.txt
- Canonical URLs
- Schema.org markup pra meetups (Event) e organização (Organization)

**Recomendações:**
- Lighthouse SEO ≥ 90
- Headings semânticos (h1 único por página)
- Alt text em todas as imagens
- Lazy loading em imagens abaixo do fold

### 5.8 Performance

**Metas (Lighthouse mobile):**
- Performance ≥ 80
- Accessibility ≥ 90
- Best Practices ≥ 90
- SEO ≥ 90

**Princípios:**
- Static-first (SSG quando possível)
- Imagens em WebP/AVIF com fallback
- Fontes self-hosted (Archivo Black + Inter) com `font-display: swap`
- JS mínimo (sem framework pesado se possível)
- Sem analytics que carregue >5KB no `<head>`

---

## 6. Conteúdo e Voice

### 6.1 Referência ao brand book

Site aplica integralmente:
- **`brand/visual/paleta-primaria.md`** — paleta de cores travada
- **`brand/visual/tipografia.md`** — Archivo Black (sub-headings) + Inter (corpo)
- **`brand/visual/logo-moodboard.md`** — Direção 3 recomendada. Logo SVG final em produção (Figma solo).
- **`brand/voice/manifesto.md`** — versão expandida vai em `/sobre#manifesto`. Versão curta no hero.
- **`brand/voice/tom-por-canal.md` §4** — calibragem do site: médio-formal, médio-sério, ironia 4/10.
- **`brand/voice/dos-and-donts.md`** — toda copy do site passa pelo filtro dos Don'ts.
- **`brand/voice/glossario.md`** — naming padronizado.

### 6.2 Tom-anchor aplicado no site

**Hero copy típica:**
> Mesa de canto de um pub.
> Growth de verdade. Stack de verdade. Sem teatro.
> [Tornar-se Membro]

**CTAs:**
- Sempre direto, sem "Descubra agora" ou "Clique aqui"
- "Entra no clube" · "Tornar-se Membro" · "Quero patrocinar" · "Falar com a gente"

**Headings:**
- Diretos, com número quando possível
- Sem "Estamos felizes em…", sem "Junte-se à revolução…"

### 6.3 Régua editorial pra copy

Toda copy do site passa por:
1. **Tem número?** Headlines/subheadings devem ter pelo menos uma evidência numérica quando aplicável.
2. **Tem teatro?** Frases pomposas ("a comunidade definitiva", "revolução do growth") saem.
3. **É franco?** Falar o que é, não o que parece.
4. **Quem é o leitor?** Hero copy assume tráfego frio (não conhece o clube). Sub-páginas podem assumir warm traffic.

### 6.4 Conteúdo concreto necessário antes do go-live

| Item | Status | Responsável |
|------|--------|-------------|
| Hero copy (versão curta do manifesto) | ❌ Falta escrever | Henrique |
| Manifesto long-form (versão expandida) | 🔄 3 versões em `brand/voice/manifesto.md` — escolher 1 | Henrique |
| Bio + foto + fact sheet pra `/sobre#imprensa` | ❌ Falta criar | Henrique |
| Press kit ZIP (logos SVG/PNG + fotos) | ❌ Falta criar | Henrique + Crew #2 |
| Bios + fotos do Founder Crew (3 pessoas) | ❌ Depende preenchimento das vagas | Crew preenchidos |
| 2-3 depoimentos do core | ❌ Falta coletar | Henrique |
| Conteúdo de `/sobre` (história 2015→2026) | ❌ Falta escrever | Henrique |
| Conteúdo de `/membro` (FAQ + filtros) | ❌ Falta escrever | Henrique |
| Conteúdo de `/empresas` (4 anchors + política não-contaminação) | ❌ Falta escrever | Henrique |
| MDX do `/meetups/sp-s1e1-barte` | ❌ Falta escrever | Henrique |
| Histórico das 10+ edições anteriores (`/meetups/historico`) | 🔄 Pode estar em Substack/Notion, exportar | Henrique |
| Número de participantes por edição passada (pra `/meetups/historico`) | ❌ Pode não existir registro fechado — usar estimativa | Henrique |
| Logos + 1 número marcante de patrocinadores anteriores (pra `/empresas`) | ❌ Falta coletar/autorizar uso | Henrique |
| FAQ específico por edição de meetup (5-7 perguntas) | ❌ Template base pode ser reutilizado | Henrique |
| Histórico de episódios do livecast (export YouTube/LinkedIn) | 🔄 Provavelmente já existe — só listar | Henrique |
| Páginas legais (`/privacidade`, `/termos`, `/lgpd`) | ❌ Precisa redação juridicamente revista | Henrique + revisão legal |
| Logo SVG final | 🔄 Em produção Figma | Henrique |

---

## 7. Integrações Externas

| Integração | Status v1 | Observação |
|------------|-----------|------------|
| Substack | Ativa (newsletter Growth Hacker) | Redirect via JS com email pré-preenchido |
| WhatsApp Community | Ativa (convite manual via Henrique) | Form `/recursos/comunidade` envia pedido por email |
| YouTube/LinkedIn (livecast) | Embed nativo | `/recursos/livecast` lista episódios via iframe |
| Plataforma de aulas | TBD | Vimeo Showcase, Hotmart, Heartbeat? Crew #1 valida quando 1ª aula gravada existir |
| Tally (forms) | Provisória | Substituível por Formspree, próprio backend, ou outro SaaS |
| Plausible (analytics) | Proposta | Crew #1 confirma |
| Mapas (`/meetups/[slug]`) | Google Maps embed | Considerar alternativa privacy-friendly se necessário |
| Plataforma de checkout (futuro Master) | TBD | Stripe, Asaas, Hotmart, Lastlink — decide quando Master abrir em 2027 |

---

## 8. Riscos e Bloqueadores

### 8.1 Bloqueadores de go-live (não negociáveis)

| ID | Bloqueador | Resolução | Owner |
|----|-----------|-----------|-------|
| B-01 | **ADR-007 não registrada** em `STATE.md` formalizando Mentorias quinzenais, Desafios mensais, Job board, Hunting, Mentoria B2B | Sessão de design específica + ADR escrita | Henrique |
| B-02 | Logo SVG final não entregue (Chunk 2 da marca) | Steps 1c-1e em Figma | Henrique |
| B-03 | Founder Crew #1 (frontend) não preenchido | AD-002 — recrutamento WhatsApp aberto | Henrique |
| B-04 | Acordo de Founder Crew não revisado/assinado | `docs/contracts/acordo-founder-crew.md` → revisão pelo "Claude Revisa" → assinatura via Google Docs | Henrique |
| B-05 | Conteúdo concreto necessário (vide §6.4) | Escrever cada item | Henrique + Crew #2 |
| B-06 | Páginas legais sem redação juridicamente revista | Contratar revisão jurídica | Henrique |

### 8.2 Riscos identificados

| ID | Risco | Mitigação proposta |
|----|-------|---------------------|
| R-S1 | Stack não escolhida — Crew #1 pode escolher tecnologia que ninguém mantém depois | Crew #1 documenta escolha em `.specs/project/STACK.md` com justificativa antes do build |
| R-S2 | Plataforma de aulas indefinida — quando 1ª aula gravar, decisão urgente | Não bloqueia v1 (página `/recursos/aulas` pode ir ao ar como "em breve") |
| R-S3 | LGPD/legal pendente — exposição jurídica se capturar email sem opt-in adequado | Páginas legais ⚠️ bloqueador (B-06) |
| R-S4 | Job board (`/empresas#vagas`) fundido com outras ofertas — se virar volume real, página fica longa demais | Split em URL separada quando justificar (≥5 vagas simultâneas). Custo baixo de migrar. |
| R-S5 | Depoimentos não coletados — seção 8 da home fica vazia ou com placeholders ruins | Coleta ⚠️ bloqueador (B-05) |
| R-S6 | Substack/Meta dependência (R9 do business plan) — se Substack fechar conta, redirect quebra | Manter export periódico dos subs + backup form Tally |
| R-S7 | Tráfego inicial baixo pós-launch — métricas de sucesso (§2.3) ficam abaixo da meta | Aceitar pacientemente; site é vitrine de longo prazo, não growth hack |

---

## 9. Decisões Pendentes (TBD — não bloqueiam spec, ficam catalogadas)

Lista de propostas e questões que apareceram na sessão de brainstorming e ficaram **explicitamente em aberto** pra decisão futura. Não bloqueiam o spec ser aprovado; bloqueiam decisões específicas durante o build/operação.

| ID | Decisão | Proposta atual | Quem decide |
|----|---------|----------------|-------------|
| TBD-01 | Adicionar "Breakdowns públicos" como card em Conteúdos que produzimos | Sugestão minha (Claude), ainda não validada | Henrique |
| TBD-02 | Adicionar "Benchmark anual" como card em Conteúdos que produzimos | Sugestão minha (Claude), ainda não validada. Já consta como entregável em business plan §7.2. | Henrique |
| TBD-03 | Adicionar "Playbooks" e "Diretório de operadores" como conteúdos | Sugestão minha (Claude), ainda não validada. Constam como entregáveis em business plan §7.2. | Henrique |
| TBD-04 | Stack tecnológica final | Crew #1 escolhe dentro dos guardrails (§5.5) | Crew #1 |
| TBD-05 | Plataforma de aulas externa | Vimeo Showcase, Hotmart, Heartbeat, etc. — decisão urgente quando 1ª aula for gravar | Crew #1 + Henrique |
| TBD-06 | Form backend pós-Tally | Manter Tally, mudar pra Formspree, ou próprio | Crew #1 |
| TBD-07 | Analytics platform | Proposta: Plausible. Crew #1 pode contestar. | Crew #1 |
| TBD-08 | Plataforma de checkout pro Master (Fase 3) | Stripe, Asaas, Hotmart, Lastlink — decisão postergada até abertura do Master em 2027 | Henrique (futuro) |
| TBD-09 | Job board: anchor permanente ou split futuro pra URL própria | Anchor v1, split quando ≥5 vagas simultâneas (gatilho proposto) | Henrique |
| TBD-10 | Plataforma de mapas em `/meetups/[slug]` | Google Maps embed v1, considerar privacy-friendly (Mapbox, OpenStreetMap) | Crew #1 |
| TBD-11 | Press kit format — ZIP de download ou imagens inline | Proposta: ZIP de download pra reduzir bytes da `/sobre` | Henrique |
| TBD-12 | Convite WhatsApp manual ou automatizado | Manual v1, automatizado quando volume justificar | Henrique |
| TBD-13 | Auto-numeração de "2.261 leitores · 715 membros" — manual ou fetch dinâmico | Manual v1 (Henrique atualiza periodicamente) | Henrique |

---

## 10. Próximos Passos

### 10.1 Saída desta fase (Spec aprovado)

1. Henrique revisa este spec — pode pedir ajustes (gera v1.1 do spec)
2. Quando aprovado, Henrique sinaliza pra avançar pra etapa de **writing-plans**
3. ADR registrada em `.specs/project/STATE.md` como **AD-006 — aprovação deste spec**. Compromissos operacionais novos (Mentorias / Desafios / B2B) ficam pra **AD-007** quando forem formalizados.
4. `STATE.md` atualizado com novo blocker B-01 (ADR-007 pendente)
5. `ROADMAP.md` Fase 1 atualizado com referência a este spec

### 10.2 Pré-requisitos pré-plan (que o plan vai precisar)

Antes de invocar **superpowers:writing-plans**, recomenda-se:
- Founder Crew #1 preenchido (`AD-002` recrutamento)
- ADR-007 registrada formalizando compromissos operacionais novos
- Stack escolhida e documentada em `.specs/project/STACK.md`
- Logo SVG final entregue (Chunk 2 da marca)
- Conteúdo concreto §6.4 pelo menos 60% escrito

Sem esses, o plan vai ter muito "TBD pelo Crew" e perde valor operacional.

### 10.3 Próxima fase: superpowers:writing-plans

Quando spec aprovado + pré-requisitos cumpridos:
- Invocar skill `superpowers:writing-plans` com este spec como entrada
- Plan vai decompor em chunks executáveis (provavelmente 5-8 chunks de implementação)
- Plan será revisado independentemente e iterativamente, como foi o business plan
- Plan vira `docs/superpowers/plans/YYYY-MM-DD-growth-club-site-plan.md`

### 10.4 Handoff pro Founder Crew #1

Quando plan aprovado:
- Crew #1 lê: este spec + plan + brand book + business plan (entender contexto)
- Crew #1 documenta escolha de stack em `.specs/project/STACK.md` + `.specs/project/ARCHITECTURE.md`
- Crew #1 cria PRs pequenos por chunk (não PR gigante)
- Henrique revisa cada PR antes do merge
- Go-live só com **todos os 6 bloqueadores §8.1 resolvidos**

---

## Apêndice A — Histórico de decisões da sessão

Trail das decisões tomadas durante a sessão de brainstorming em **2026-05-17** (Henrique + Claude via superpowers:brainstorming):

1. **Escopo:** Visão final, sem timeline de v1 — usuário escolheu "Não quero pensar no Barte ainda, primeiro a estrutura"
2. **Login interno:** Sem login. Tudo redirect pra plataforma externa.
3. **IA inicial:** Top-nav de 7 items aprovado + sub-páginas + Founder Member parqueado some
4. **Hero estratégia:** Estático com 1 CTA + ganchos distribuídos abaixo (formato growth landing clássico)
5. **CTA primário:** "Tornar-se Membro" → `/membro`
6. **`/membro` formato:** Caminho único free (não tabela de tiers)
7. **Densidade home:** Híbrida (7 seções) inicial, expandida pra 9 seções após adições do usuário
8. **Conteúdos que produzimos:** Lista do usuário (7 itens) + adições minhas como TBD (3 itens)
9. **Como ajudamos profissionais e empresas:** Aceito como compromisso, abre ADR-007
10. **Patrocinadores → Empresas:** `/patrocinadores` consolidado dentro de `/empresas`
11. **`/sobre` fusão:** Manifesto + Crew + Imprensa tudo em `/sobre` single page com anchors
12. **`/empresas` fusão:** 4 ofertas em single page com anchors `#patrocinio` `#vagas` `#hunting` `#mentoria`
13. **Decisões TBD:** Catalogadas em §9 pra não esquecer

---

## Apêndice B — Changelog

### v1.0 — 2026-05-17 (inicial, pós-brainstorming)
- Documento criado a partir da sessão de brainstorming com superpowers:brainstorming
- Aguarda review humano antes de avançar pra writing-plans
- ⚠️ 6 bloqueadores de go-live catalogados em §8.1 (incluindo ADR-007 pendente)
- 13 decisões TBD catalogadas em §9
