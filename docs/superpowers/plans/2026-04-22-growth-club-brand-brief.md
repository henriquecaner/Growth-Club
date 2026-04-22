# Growth Club — Brand Brief Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produzir um brand brief v1 completo do Growth Club (manifesto, posicionamento, paleta, tipografia, logo, voice & tone, templates por formato e brand book consolidado) que materialize o posicionamento "Growth de verdade. Stack de verdade. Sem teatro." e preserve os pilares existentes (bandeira pirata, manifesto do pub, cerveja no final do dia).

**Architecture:** Trabalho de design estruturado em 5 chunks sequenciais — (1) fundações estratégicas e decisões de marca, (2) sistema visual (paleta + tipografia + logo), (3) voice & tone, (4) templates por formato de uso, (5) consolidação em brand book. Fonte única de verdade textual em `brand/brand-book.md`; assets visuais em `brand/assets/`.

**Tooling:** Figma (design + componentes), SVG (logos + ícones), PNG/JPG (raster de apoio), Markdown (voice guidelines + brand book), Git (versionamento). Opcional: Illustrator se designer preferir.

**Source of truth (input):** `docs/superpowers/specs/2026-04-22-growth-club-business-plan-design.md`
- §3.2 — Posicionamento ("Growth de verdade. Stack de verdade. Sem teatro.")
- §3.3 — Não-negociáveis culturais
- §2.3 — Pilares de marca existentes (bandeira pirata, manifesto do pub, cerveja no final do dia)
- §5 — Marca provisória (nome canônico, nomenclatura de formatos)
- §10.2 — Escopo da fase Marca

**Tempo estimado:** **3-5 semanas** com designer freela dedicado · **5-7 semanas** se Henrique executar solo. Checkpoint de metade-do-caminho ao fim do Chunk 2 (visual system travado). Estimativa revisada após review independente do plano (v1.0 subestimava o Chunk 2).

**Handoff output:** brand book v1 commitado em git + arquivos Figma exportados + assets SVG/PNG em `brand/assets/` + posicionamento textual em `brand/brand-book.md`. Pronto pra consumir na próxima fase (Site).

---

## Chunk 1: Fundações estratégicas

Decisões de alto nível que travam o resto do trabalho. **Sem essas decisões, paleta e logo não avançam.**

### Task 1.1: Decidir destino da bandeira pirata

**Files:**
- Create: `brand/decisions/01-bandeira-pirata.md`

- [ ] **Step 1: Auditar uso atual**

Coletar prints dos 5 locais onde a bandeira pirata aparece hoje (WhatsApp Community avatar, grupos, qualquer outro). Colar em `brand/decisions/01-bandeira-pirata.md` como evidência de uso.

- [ ] **Step 2: Listar 3 destinos possíveis com trade-offs**

No mesmo arquivo, documentar:
- **A) Preservar com pequenos ajustes** (verde-água mantido, refinamento do skull) — continuidade máxima
- **B) Evoluir para símbolo derivado** (manter "espírito pirata" mas com marca própria — ex: skull estilizado novo) — continuidade média
- **C) Substituir por marca nova** (wordmark ou símbolo diferente) — descontinuidade total, começar do zero

- [ ] **Step 3: Decisão escrita**

Registrar decisão final no arquivo (A / B / C) com racional em 2-3 parágrafos. Essa decisão é input pra Task 2.4.

- [ ] **Step 4: Validação**

Critério: decisão é explícita, não fica em cima do muro. Racional conecta com o posicionamento "Execução > Teatro" (quem é pirata? os que entregam, não os que desfilam).

- [ ] **Step 5: Commit**

```bash
git add brand/decisions/01-bandeira-pirata.md
git commit -m "brand(marca): decide fate of bandeira pirata (v1)"
```

### Task 1.2: Travar nome canônico e variantes

**Files:**
- Create: `brand/decisions/02-nome-canonico.md`

- [ ] **Step 1: Copiar as variantes em circulação da §5.1 da spec**

"Growth Club" / "The Growth Club" / "BR Growth Club" — documentar histórico rápido.

- [ ] **Step 2: Travar regra de uso**

Redigir, em linguagem operável:
- Forma padrão (quando usar)
- Variante formal (quando usar)
- Variante descontinuada (o que fazer se aparecer)
- Regra da palavra "evento" acompanhada de "comunidade" + marca (§3.3)

- [ ] **Step 3: Validação**

Critério: qualquer pessoa (freelancer, designer, redator) consegue aplicar a regra sem te perguntar.

- [ ] **Step 4: Commit**

```bash
git add brand/decisions/02-nome-canonico.md
git commit -m "brand(marca): lock canonical name and usage rules"
```

### Task 1.3: Definir arquétipo(s) de marca e ton-anchor

**Files:**
- Create: `brand/decisions/03-arquetipo-e-tom.md`

- [ ] **Step 1: Revisar os 12 arquétipos clássicos**

(Hero, Outlaw, Magician, Regular Guy, Lover, Jester, Caregiver, Ruler, Creator, Innocent, Sage, Explorer — qualquer referência, ex. Mark & Pearson "The Hero and the Outlaw")

- [ ] **Step 2: Aplicar filtro obrigatório do posicionamento §3.2**

O arquétipo escolhido precisa **reforçar simultaneamente** os três componentes do ângulo (business plan §3.2):
- Execução > Teatro
- Ponte entre silos
- Tech-first (IA/Automação) atrelado a outcome

Qualquer arquétipo que contradiga um dos três fica vetado. Ex.: "Ruler" (controle, autoridade top-down) contradiz "mesa de canto inclusiva — do CEO ao dev, do growth ao quebrado". "Innocent" contradiz "sem teatro" (ingenuidade não é atributo).

- [ ] **Step 3: Pré-selecionar 2-3 que fazem sentido**

Hipóteses fortes baseadas no posicionamento (já filtradas pelo Step 2):
- **Outlaw / Rebel** — contrarian ao teatro, bandeira pirata, "não vai pro feed"
- **Sage** — ponte entre silos, curadoria com número, regra editorial
- **Regular Guy** — "mesa de canto de um pub", inclusivo ("do CEO ao dev, do growth ao quebrado")

- [ ] **Step 4: Escolher primário + secundário**

Escolher 1 primário (60% da identidade) + 1 secundário (30-40%). Documentar racional. **Checar novamente** contra o filtro do Step 2 — a combinação final reforça os 3 componentes do ângulo?

- [ ] **Step 5: Destilar um ton-anchor de 5-7 palavras**

Ex.: "Franco, com número, sem palco, com cerveja." — serve como régua rápida pra qualquer peça.

- [ ] **Step 6: Validação**

Critério: se alguém escrever um post que não case com o ton-anchor, dá pra apontar "não é nosso tom" sem subjetividade.

- [ ] **Step 7: Commit**

```bash
git add brand/decisions/03-arquetipo-e-tom.md
git commit -m "brand(marca): set primary/secondary archetypes and ton-anchor"
```

### Task 1.4: Arquitetura de marcas-filhas (sub-grupos WhatsApp)

**Files:**
- Create: `brand/decisions/04-arquitetura-de-marcas.md`

Contexto: hoje a Community WhatsApp tem 7 sub-grupos (AI LIKE A PRO, Meetups de Growth, PLG BR, Growth Mafia, CLG BR, além do core). A spec §9.1 lista "consolidação dos 7 sub-grupos WhatsApp" como decisão Fase 1 e §9.2 R6 registra como risco (fragmentação dilui narrativa vs. consolidar aliena usuários). Essa decisão afeta **naming**, **voice** e **logo derivadas** — por isso entra como fundação (Chunk 1), antes do visual.

- [ ] **Step 1: Mapear cada sub-grupo em uma tabela**

Para cada um dos 7: nome, # membros, nível de atividade, tema, quem modera, sobrepõe com core?

- [ ] **Step 2: Classificar cada um em uma das 4 ações**

- **Promove a marca-filha oficial** (vira produto nomeado tipo "AI LIKE A PRO" — o workshop é marca-filha, o sub-grupo também pode ser)
- **Consolida no core** (arquiva o sub-grupo, migra membros ativos pro core)
- **Mantém como sub-canal temático** (reduz autonomia, vira extensão do core)
- **Arquiva** (inativo demais pra justificar manutenção)

- [ ] **Step 3: Regra de naming pra marcas-filhas**

Se algo vira marca-filha (ex: "AI LIKE A PRO", "Growth Mafia"), definir a regra de lockup: `Growth Club · [MARCA-FILHA]` ou `[MARCA-FILHA] by Growth Club` ou outra forma. Input crítico para Task 2.3 (logo) — variações precisam acomodar marcas-filhas.

- [ ] **Step 4: Plano de comunicação aos membros**

Se sub-grupo for arquivado/consolidado, como comunicar. Quando. Com qual texto.

- [ ] **Step 5: Validação**

Critério: plano de comunicação pronto pra enviar · naming regra testada em 3 marcas-filhas (AI LIKE A PRO + outras 2) · sem ambiguidade.

- [ ] **Step 6: Commit**

```bash
git add brand/decisions/04-arquitetura-de-marcas.md
git commit -m "brand(marca): arquitetura de marcas-filhas + consolidação sub-grupos"
```

---

## Chunk 2: Sistema visual

Com as fundações locked, ataque o visual: paleta, tipografia, logo. **Essa é a parte mais cara em tempo de designer** — se for freela, contratar aqui.

### Task 2.1: Paleta primária (3-5 cores)

**Files:**
- Create: `brand/visual/paleta-primaria.md`
- Create: `brand/assets/palette/primary.svg` (swatch visual)

- [ ] **Step 1: Partir do verde-água existente**

Amostrar o verde-água atual da bandeira pirata (extrair HEX exato via eyedropper do asset atual).

- [ ] **Step 2: Construir paleta 3-5 cores**

Baseada no arquétipo decidido em 1.3. Sugestão-starter (revisar com designer):
- Verde-água (continuidade)
- Preto denso (bandeira pirata + peso editorial)
- Off-white / cream (fundo de pub, cerveja)
- 1-2 cores de apoio

- [ ] **Step 3: Testar contraste WCAG AA/AAA**

Toda combinação texto/fundo precisa passar WCAG AA (4.5:1 pra texto normal).

- [ ] **Step 4: Documentar com HEX + RGB + CMYK + uso**

Tabela com: nome da cor, HEX, RGB, CMYK, quando usar, quando evitar.

- [ ] **Step 5: Validação objetiva**

Dois testes obrigatórios:
1. **Aplicabilidade multi-contexto:** paleta funciona em digital (site, social, newsletter), impresso (pôster de meetup A3), e em fundos dark + light. Fazer mockup real de 3 peças antes de aprovar.
2. **Teste de diferenciação (anti-gosto):** mostrar 5 swatches SEM logo/nome (o do Growth Club + 4 competidores — G4, Cactus, Gaveler, Growth Leaders) para **5 membros ativos do grupo core**; pedir pra identificarem qual é o do Growth Club. **Pass:** ≥ 3 acertos em 5. Abaixo disso, redesenhar.

- [ ] **Step 6: Commit**

```bash
git add brand/visual/paleta-primaria.md brand/assets/palette/primary.svg
git commit -m "brand(visual): primary palette v1"
```

### Task 2.2: Tipografia primária + secundária

**Files:**
- Create: `brand/visual/tipografia.md`

- [ ] **Step 1: Selecionar tipografia de heading**

Requisitos:
- Pesada / com personalidade (arquétipo Outlaw puxa pra sans-serif pesada ou serif com atitude)
- Bom em tamanhos grandes (hero de site + pôster de meetup)
- Licenciamento claro (Google Fonts ou paga com licença)

Candidatas-starter (validar com designer): Archivo Black, Space Grotesk, Canela, PPNeueMontreal, Neue Haas Grotesk Display, Fraunces.

- [ ] **Step 2: Selecionar tipografia de body**

Requisitos: alta legibilidade em 14-18px, complementar ao heading, fallback seguro.

Candidatas: Inter, IBM Plex Sans, Söhne, Merriweather (se heading for sans).

- [ ] **Step 3: Definir escala tipográfica**

Tamanhos em h1, h2, h3, body, caption. Baseado em escala modular (1.25 / 1.333 / 1.5).

- [ ] **Step 4: Documentar regras de uso**

Quando usar heading vs body. Pesos permitidos. Kerning especial em logotipo (se aplicável).

- [ ] **Step 5: Validação**

Critério: testar em peça real de newsletter + pôster de meetup + hero do site. Legível em mobile + desktop + impressão A3.

- [ ] **Step 6: Commit**

```bash
git add brand/visual/tipografia.md
git commit -m "brand(visual): typography system v1"
```

### Task 2.3: Logo primário + variações

**Files:**
- Create: `brand/assets/logo/growth-club-primary.svg`
- Create: `brand/assets/logo/growth-club-horizontal.svg`
- Create: `brand/assets/logo/growth-club-vertical.svg`
- Create: `brand/assets/logo/growth-club-icon-only.svg`
- Create: `brand/assets/logo/growth-club-monochrome-black.svg`
- Create: `brand/assets/logo/growth-club-monochrome-white.svg`
- Create: `brand/visual/logo-guidelines.md`

**⚠️ Nota de granularidade:** Esta task envolve trabalho criativo de designer, não se executa em "2-5 min por step". Cada step abaixo representa uma **sessão de design** (1-8 horas) com critério claro de passagem. Tempo estimado total: **1-2 semanas de designer freela dedicado** (ou 2-3 semanas se Henrique solo com aprendizado).

**⚠️ Dependência:** Step 5 ("Lockup para marcas-filhas") **consome a decisão da Task 1.4**. Não inicie Step 5 antes da Task 1.4 estar fechada no Chunk 1, ou o lockup vai precisar ser refeito.

- [ ] **Step 1a: Moodboard de referências (2-3 direções visuais)**

Coletar 15-30 referências (não só logos — capas de revista, signage, merchandising, álbuns) organizadas em 2-3 direções distintas. Ex:
- Direção A: "Pirata analógico" (punk rock, DIY, xilogravura)
- Direção B: "Editorial sóbrio" (The Economist, NYT, New Yorker)
- Direção C: "Tech moderno" (Notion, Linear, Vercel)

Critério de passagem: moodboard apresentável, capturando energia distinta em cada direção.

- [ ] **Step 1b: Escolher direção final**

Comparar as 3 direções contra o arquétipo escolhido na Task 1.3 e decisão da bandeira pirata (Task 1.1). Escolher 1. Documentar racional de por que as outras 2 foram descartadas.

- [ ] **Step 1c: Primeiro sketch/rascunho (3-5 propostas)**

Dentro da direção escolhida, gerar 3-5 primeiros rascunhos de lockup. Pode ser em papel, Figma sketchy, Procreate. Não polir — só explorar a forma.

Critério de passagem: 3-5 rascunhos com diferenças visíveis de abordagem (não variações cosméticas).

- [ ] **Step 1d: Rounds de refinamento (2-3 iterações)**

Escolher 1-2 dos rascunhos pra refinar. Cada round deve ter feedback explícito (o que mudou, por quê). Critério de fim de rounds: Henrique olha e fala "é esse" sem ressalva significativa.

- [ ] **Step 1e: Finalização em vetor**

Versão final em SVG/Illustrator limpa: curvas otimizadas, traçados corretos, exportável sem perda.

- [ ] **Step 2: Gerar variações obrigatórias**

Cada variação como arquivo SVG separado:
- Horizontal (símbolo + wordmark ao lado)
- Vertical (símbolo em cima, wordmark embaixo)
- Icon-only (símbolo isolado — avatar)
- Monochrome preto (fundo claro)
- Monochrome branco (fundo escuro)

- [ ] **Step 3: Definir clear space e minimum size**

Regra de espaço mínimo em volta do logo. Tamanho mínimo em digital (px) + impressão (mm).

- [ ] **Step 4: Do's and Don'ts**

5 exemplos explícitos do que NÃO fazer (esticar, girar, mudar cor, colocar em fundo ruim, etc.).

- [ ] **Step 5: Lockup para marcas-filhas (consumir Task 1.4)**

Aplicar a regra de naming de marcas-filhas (definida em Task 1.4) ao logo: gerar 1-2 exemplos de lockup com marca-filha. Ex.: `Growth Club · AI LIKE A PRO`.

- [ ] **Step 6: Validação**

Critério: logo funciona em 16x16 (favicon), 40x40 (avatar LinkedIn), 2000x1000 (pôster de meetup), impresso em 1x1cm sem perder legibilidade. Teste real feito antes de commit.

- [ ] **Step 7: Commit**

```bash
git add brand/assets/logo/ brand/visual/logo-guidelines.md
git commit -m "brand(visual): logo system v1 (primary + 5 variations + marca-filha)"
```

---

## Chunk 3: Voice & Tone

Com o visual encaminhado, destrave a voz. Essa é a metade do brand que é textual — e é o que vai diferenciar o Growth Club na régua editorial do grupo, newsletter e livecast.

### Task 3.1: Manifesto oficial

**Files:**
- Create: `brand/voice/manifesto.md`

- [ ] **Step 1: Partir da copy existente**

> "Aqui não tem grupo fake, vitrine de LinkedIn ou palco de pitch. O Growth Club é a mesa especial de canto de um pub. Aqui senta todo mundo: do CEO ao dev, do growth ao quebrado. Se você quer somar, tem um lugar na mesa."

(Texto atual da mensagem de boas-vindas do grupo — §2.3 da spec)

- [ ] **Step 2: Refinar para manifesto publicável**

Polir essa copy para o que vai pro site (hero, página "sobre") e pro brand book. Manter o espírito, ajustar ritmo e cortar se preciso.

- [ ] **Step 3: Produzir 3 tamanhos**

- **Versão longa** (200-300 palavras) — página "Sobre" do site
- **Versão média** (50-80 palavras) — hero do site, bio de LinkedIn
- **Versão curta** (10-15 palavras) — uma frase-chave / one-liner

- [ ] **Step 4: Validação**

Critério: alguém lendo só o manifesto curto entende (a) quem é o Growth Club, (b) pra quem é, (c) o que é diferente dos outros clubes de Growth.

- [ ] **Step 5: Commit**

```bash
git add brand/voice/manifesto.md
git commit -m "brand(voice): official manifesto (3 lengths)"
```

### Task 3.2: Do's and Don'ts de voz

**Files:**
- Create: `brand/voice/dos-and-donts.md`

- [ ] **Step 1: Listar 10 DO's**

Padrões de linguagem que SÃO Growth Club. Ex:
- Usar "operação" em vez de "negócio"
- Abrir case com número antes de narrativa
- Ironia com carinho (nunca corrosiva com membros)
- Português brasileiro coloquial ("bora", "beleza", "isso aí")
- Palavras do arquétipo (pirata, pub, mesa, cerveja)

- [ ] **Step 2: Listar 10 DON'T's**

Padrões que NÃO são. Ex:
- Nunca "10 prompts que mudaram minha vida"
- Nunca prints de Cursor / n8n sem número atrás
- Nunca "revolucionar"/"disruptar" sem ironia
- Nunca slogans motivacionais tipo "vamo que vamo"
- Nunca linguagem de palestrante de LinkedIn

- [ ] **Step 3: 5 exemplos comparativos**

Para 5 situações, escrever "❌ fora do tom" vs "✅ dentro do tom". Situações sugeridas:
- Anúncio de novo meetup
- Reação a uma thread no grupo com print de Cursor
- Welcome email pra novo Growth Hacker
- Post no LinkedIn do Henrique promovendo a comunidade
- Página de oferta de Founder Members

- [ ] **Step 4: Validação**

Critério: freelancer de conteúdo recebe os Do's/Don'ts e redige 3 posts sem você ter que reescrever mais que 10% do texto.

- [ ] **Step 5: Commit**

```bash
git add brand/voice/dos-and-donts.md
git commit -m "brand(voice): do's and don'ts with 5 side-by-side examples"
```

### Task 3.3: Tom por canal

**Files:**
- Create: `brand/voice/tom-por-canal.md`

- [ ] **Step 1: Mapear os 6 canais principais**

- Newsletter (Substack)
- Grupo WhatsApp (interno)
- Livecast (vídeo público)
- Site (growthclub.pro)
- LinkedIn (canais do Henrique + marca)
- Email marketing (onboarding, oferta, nurture)

- [ ] **Step 2: Definir intensidade de tom por canal**

Eixo "formal ↔ informal" e eixo "sério ↔ irônico". Marcar cada canal num quadrante. Ex.: Grupo WhatsApp = muito informal + irônico; Página de oferta Founder Members = informal + sério.

- [ ] **Step 3: Exemplo de abertura por canal**

Escrever a **primeira frase** de uma peça em cada canal. Ex.: primeira linha de newsletter vs primeira mensagem em boas-vindas de WhatsApp.

- [ ] **Step 4: Validação**

Critério: ao ler só a primeira frase, é possível identificar o canal (newsletter vs email vs grupo).

- [ ] **Step 5: Commit**

```bash
git add brand/voice/tom-por-canal.md
git commit -m "brand(voice): tone calibration by channel"
```

### Task 3.4: Glossário Growth Club

**Files:**
- Create: `brand/voice/glossario.md`

- [ ] **Step 1: 20 termos preferidos**

Palavras que o Growth Club usa em vez de alternativas comuns. Ex.:
- "operação" (em vez de "negócio" ou "empresa")
- "carregar meta" (em vez de "bater meta")
- "pipeline real" (em vez de "CRM")
- "mesa" (em vez de "comunidade" às vezes)

- [ ] **Step 2: 10 termos evitados**

Palavras que dedetizamos. Ex.:
- "disruptar", "revolucionar", "escalar exponencialmente"
- "alavancar"
- "engajamento" (prefere "conversão", "ativação")
- "growth hacker" aplicado a pessoa externa (só membros são Growth Hackers)

- [ ] **Step 3: Validação**

Critério: redator consegue consultar em 30 segundos e decidir uma palavra.

- [ ] **Step 4: Commit**

```bash
git add brand/voice/glossario.md
git commit -m "brand(voice): glossário de 20 termos preferidos + 10 evitados"
```

---

## Chunk 4: Templates por formato

Aterra o sistema visual + voz em **peças reais** que Henrique vai usar nas primeiras 6 semanas pós-lançamento.

### Task 4.1: Template Meetup (S1E1 Barte)

**Files:**
- Create: `brand/templates/meetup/poster.fig` (Figma file ou link no brand-book.md)
- Create: `brand/templates/meetup/ticket.fig`
- Create: `brand/templates/meetup/story-stories.fig`
- Create: `brand/templates/meetup/palco-backdrop.fig`
- Create: `brand/templates/meetup/keynote-template.fig`

- [ ] **Step 1: Pôster (formato quadrado social + vertical stories)**

Incluir: nome do Meetup (formato `Meetup Growth SP · S1E1 · [Tema]`), bandeira pirata ou símbolo, tipografia heading grande, bar/Barte como local, data, call-to-action.

- [ ] **Step 2: Ingresso (formato digital + impresso)**

PDF pra quem imprime, mobile-friendly pra quem usa no celular.

- [ ] **Step 3: Stories/carrossel de divulgação (3-5 slides)**

Template pra Henrique preencher rápido com cada novo meetup.

- [ ] **Step 4: Backdrop de palco (impressão A0 ou parede)**

Arte que fica atrás do palestrante — símbolo grande + nome do Meetup.

- [ ] **Step 5: Template de slide Keynote/PowerPoint/Google Slides**

Palestrantes usam esse template. Primeiro slide (capa), slide de tema, slide de outro, slide de conteúdo.

- [ ] **Step 6: Validação**

Critério: Henrique consegue fazer um meetup novo (trocar cidade + episódio + tema) em < 15 min sem chamar designer.

- [ ] **Step 7: Commit**

```bash
git add brand/templates/meetup/
git commit -m "brand(templates): meetup kit (poster + ticket + stories + backdrop + slides)"
```

### Task 4.2: Template Newsletter (Substack rebatizado)

**Files:**
- Create: `brand/templates/newsletter/header.svg`
- Create: `brand/templates/newsletter/signature.md`
- Create: `brand/templates/newsletter/footer.md`

- [ ] **Step 1: Header visual do Substack**

Banner fixo da newsletter. Usa logo + tipografia de heading + paleta.

- [ ] **Step 2: Assinatura de fim de post**

Bloco curto de "quem é o Growth Club" + CTA (entra no grupo / vem no próximo meetup).

- [ ] **Step 3: Footer (aviso legal + unsubscribe + LGPD)**

Texto do footer padrão de todas as newsletters — Política de Privacidade, unsubscribe, base legal LGPD.

- [ ] **Step 4: Validação**

Critério: o Substack rebatizado (v1) carrega esses 3 elementos aplicados. Visual alinhado com o Chunk 2.

- [ ] **Step 5: Commit**

```bash
git add brand/templates/newsletter/
git commit -m "brand(templates): newsletter header + signature + footer"
```

### Task 4.3: Kit de handoff para fase Site (v1 = base; v2 nasce na fase Site)

**Escopo explícito v1:** design tokens + componentes base + componentes de conteúdo específicos Growth Club + responsive breakpoints. O refinamento avançado (states detalhados, animações, edge cases) sai na fase Site junto do design do produto em si. Essa delimitação evita inflação desta task.

**Files:**
- Create: `brand/templates/site/component-kit.fig` (Figma file — handoff)
- Create: `brand/templates/site/design-tokens.md`
- Create: `brand/templates/site/component-spec.md`

- [ ] **Step 1: Design tokens**

Documentar tokens semânticos consumidos por todos os componentes:
- **Spacing scale** (4, 8, 12, 16, 24, 32, 48, 64, 96 px — ou escala modular equivalente)
- **Border radius** (0, 4, 8, 12, 24, full)
- **Shadow** (xs, sm, md, lg — com valores box-shadow)
- **Motion** (duration: 150ms rápido, 250ms médio, 400ms lento; easing: ease-out default)
- **Breakpoints responsive** (mobile < 640px, tablet 640-1024px, desktop 1024-1440px, wide > 1440px)

Cada token vira variável Figma + documentado em markdown.

- [ ] **Step 2: Componentes base (8 essenciais)**

Com states mínimos (default, hover, disabled, loading):
1. Buttons — primary / secondary / ghost / destructive
2. Inputs — text / email / select / checkbox / radio
3. Cards — container genérico com padding + radius + shadow do token
4. Nav — desktop horizontal + mobile hamburger
5. Hero block — versão com imagem e versão com apenas texto
6. Form groups — label + input + help text + error text
7. Footer — padrão para todas as páginas
8. Toast/alerts — success / warning / error / info

- [ ] **Step 3: Componentes de conteúdo específicos Growth Club**

Peças que só fazem sentido neste produto (a fase Site vai precisar no Day 1):
1. **Playbook card** (título + autor + tags + tempo de leitura + CTA "ler")
2. **Benchmark card** (métrica + setor + número + timestamp + fonte)
3. **Member card** (avatar + nome + cargo + empresa + tags de skills + link LinkedIn)
4. **Founder Member badge** (ícone + label — marca pra quem é FM)
5. **Meetup card** (imagem + episódio `S1E1` + cidade + data + botão "tirar ingresso")
6. **Tier comparison card** (Growth Hacker vs Growth Hacker Master — features)

- [ ] **Step 4: Guia de uso em markdown**

Para cada componente (base + específico): quando usar, quando NÃO usar, variações, regras de hierarquia, anatomia visual (quais tokens consome).

- [ ] **Step 5: Validação de handoff**

Critério: designer/dev da fase Site pega o Figma + design-tokens.md + component-spec.md e, **sem chamar o Henrique**, monta o mockup da landing page inteira. Se travar por falta de componente, o kit está incompleto — voltar a este chunk.

- [ ] **Step 6: Commit**

```bash
git add brand/templates/site/
git commit -m "brand(templates): site handoff kit v1 (tokens + base + content-specific)"
```

---

## Chunk 5: Brand book consolidado

Empacota tudo em um artefato único e shareable. Isso é o que Henrique manda pra freela, patrocinador, parceiro, convidado de Livecast — "aqui está a marca, leia e aplica."

### Task 5.1: Brand book textual em Markdown

**Files:**
- Create: `brand/brand-book.md`

- [ ] **Step 1: Estrutura do documento**

Seções:
1. Manifesto (longa + curta)
2. Posicionamento (do business plan §3.2)
3. Não-negociáveis culturais (§3.3)
4. Arquétipo e ton-anchor (Chunk 1, Task 1.3)
4b. Arquitetura de marcas-filhas (Chunk 1, Task 1.4) — decisão fundacional com impacto em logo e naming
5. Sistema visual (Chunk 2)
6. Voice & Tone (Chunk 3)
7. Templates por formato (Chunk 4)
8. FAQ / Como aplicar em X

- [ ] **Step 2: Redigir cada seção ancorando nos arquivos dos chunks 1-4**

Copiar/sintetizar os arquivos `brand/decisions/*.md`, `brand/visual/*.md`, `brand/voice/*.md` em seções fluídas.

- [ ] **Step 3: Incluir assets inline com referências**

Paleta como swatches inline, logo variations como imagens, exemplos de tom side-by-side.

- [ ] **Step 4: Validação**

Critério: leitor externo (sem contexto prévio) consegue, após 20 min de leitura, criar um post no LinkedIn que passaria na régua editorial.

- [ ] **Step 5: Commit**

```bash
git add brand/brand-book.md
git commit -m "brand(book): consolidated brand book v1 (markdown)"
```

### Task 5.2: Export PDF do brand book

**Files:**
- Create: `brand/brand-book-v1.pdf` (gerado a partir do MD via pandoc ou handoff pra designer)

- [ ] **Step 1: Decisão de ferramenta**

Se for markdown puro: usar `pandoc brand/brand-book.md -o brand/brand-book-v1.pdf` com CSS custom.
Se for design: montar no Figma / InDesign.

- [ ] **Step 2: Gerar PDF estilizado**

Aplicar paleta + tipografia decididas. Layout editorial (não relatório seco).

- [ ] **Step 3: Validação**

Critério: o PDF funciona como material impresso (imprimir em A4 ou A3, fica apresentável) e digital (zoom, clique em links).

- [ ] **Step 4: Commit**

```bash
git add brand/brand-book-v1.pdf
git commit -m "brand(book): PDF export of brand book v1"
```

### Task 5.3: Export pack (favicons, OG images, touch-icons)

**Files:**
- Create: `brand/assets/exports/favicon.ico`
- Create: `brand/assets/exports/favicon-16x16.png`
- Create: `brand/assets/exports/favicon-32x32.png`
- Create: `brand/assets/exports/apple-touch-icon.png` (180x180)
- Create: `brand/assets/exports/android-chrome-192x192.png`
- Create: `brand/assets/exports/android-chrome-512x512.png`
- Create: `brand/assets/exports/og-image.png` (1200x630)
- Create: `brand/assets/exports/logo@1x.png` `@2x.png` `@3x.png` (raster para fallback)

- [ ] **Step 1: Exportar favicons a partir do logo icon-only**

Ferramentas: Figma, RealFaviconGenerator, ou manual via export em cada dimensão.

- [ ] **Step 2: Gerar OG-image padrão (1200x630)**

Imagem para preview em redes sociais (LinkedIn, Twitter, Facebook). Versão padrão do Growth Club + 1-2 templates editáveis pra posts específicos (Meetup, Founder Members, etc.).

- [ ] **Step 3: Gerar PNGs em 1x/2x/3x do logo**

Para uso em emails (que não rendam SVG direito) e plataformas terceiras.

- [ ] **Step 4: Validação**

Critério: colocar o site em `localhost` de teste simulado; favicon aparece no tab; OG image aparece em teste de preview do LinkedIn (usar LinkedIn Post Inspector ou similar).

- [ ] **Step 5: Commit**

```bash
git add brand/assets/exports/
git commit -m "brand(assets): export pack (favicons + touch-icons + OG + PNG fallbacks)"
```

### Task 5.4: Propagar regras textuais para CONVENTIONS.md

**Files:**
- Modify: `.specs/project/CONVENTIONS.md`

Contexto: o `CLAUDE.md` trata `.specs/project/CONVENTIONS.md` como fonte de verdade pra regras que sobrevivem além de cada fase. Naming, glossário e regras de uso da marca precisam estar lá pra próximas fases (Site, conteúdo, futuros planos) não reinventarem.

- [ ] **Step 1: Adicionar seção "Brand naming"**

Copiar/referenciar de `brand/decisions/02-nome-canonico.md`:
- Nome canônico
- Variantes permitidas
- Regra de uso da palavra "evento" (§3.3)
- Regra de naming de Meetups (`Meetup Growth [CIDADE] · S[ANO] · E[EDIÇÃO]`)
- Regra de naming de marcas-filhas (definida em Task 1.4)

- [ ] **Step 2: Adicionar seção "Voice glossário"**

Copiar/referenciar de `brand/voice/glossario.md` — termos preferidos + evitados.

- [ ] **Step 3: Commit**

```bash
git add .specs/project/CONVENTIONS.md
git commit -m "docs(specs): propagate brand naming + voice rules to CONVENTIONS.md"
```

### Task 5.5: Post-execution sync

**Files:**
- Modify: `.specs/project/STATE.md`
- Modify: `.specs/project/ROADMAP.md`

- [ ] **Step 1: Adicionar ADR-002 em STATE.md**

Registrar: Marca Brief v1 aprovado, commit hash, decisões principais (arquétipo, fate da bandeira pirata, arquitetura de marcas-filhas).

- [ ] **Step 2: Atualizar ROADMAP.md**

Marcar Fase 1 sub-item "Brand brief entregue" como DONE. Atualizar sprint log.

- [ ] **Step 3: Commit**

```bash
git add .specs/project/STATE.md .specs/project/ROADMAP.md
git commit -m "docs(specs): post-execution sync after brand brief v1"
```

---

## Execution notes

- **Subagents available:** Use `superpowers:subagent-driven-development` — fresh subagent per task, two-stage review
- **No subagents:** Use `superpowers:executing-plans` — sequential execution with checkpoints

### Reviewability

Cada chunk produz **um conjunto de commits auditável**. Ao fim de cada chunk, rodar review independente via subagent (ou humano) com critérios:
- Alinhamento com o business plan design (§ referências)
- Aplicabilidade (alguém externo consegue usar sem perguntar?)
- Consistência interna (paleta X aparece igual em todos os templates?)

### Dependências externas

- **Designer freela** (recomendado pra Chunks 2 e 4) — se contratado, briefar com este plano
- **Ferramentas pagas** (opcional): Figma Pro, licenças de fontes premium se escolhidas
- **Henrique precisa bloquear tempo:** Chunks 1 e 3 são decisões dele, não delegáveis

### Critério de "done" pra esta fase

- [ ] `brand/brand-book.md` existe e está completo
- [ ] `brand/brand-book-v1.pdf` existe
- [ ] Pelo menos 5 variações de logo em `brand/assets/logo/` + lockup pra marcas-filhas
- [ ] Export pack completo em `brand/assets/exports/` (favicons, touch-icons, OG)
- [ ] Paleta (com teste objetivo de diferenciação passado), tipografia, voice & tone documentados
- [ ] Templates pelo menos pro meetup + newsletter prontos
- [ ] Site handoff kit (tokens + componentes base + componentes específicos Growth Club)
- [ ] Decisão sobre arquitetura de marcas-filhas tomada e comunicada aos membros
- [ ] STATE.md + ROADMAP.md + CONVENTIONS.md atualizados
- [ ] Todos os commits auditáveis no git
