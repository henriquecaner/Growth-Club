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

**Tempo estimado:** 2-3 semanas de trabalho concentrado (com designer freela ou Henrique solo). Se solo, estender para 3-4 semanas.

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

- [ ] **Step 2: Pré-selecionar 2-3 que fazem sentido**

Hipóteses fortes baseadas no posicionamento:
- **Outlaw / Rebel** — contrarian ao teatro, bandeira pirata, "não vai pro feed"
- **Sage** — ponte entre silos, curadoria com número, regra editorial
- **Regular Guy** — "mesa de canto de um pub", inclusivo ("do CEO ao dev, do growth ao quebrado")

- [ ] **Step 3: Escolher primário + secundário**

Escolher 1 primário (60% da identidade) + 1 secundário (30-40%). Documentar racional.

- [ ] **Step 4: Destilar um ton-anchor de 5-7 palavras**

Ex.: "Franco, com número, sem palco, com cerveja." — serve como régua rápida pra qualquer peça.

- [ ] **Step 5: Validação**

Critério: se alguém escrever um post que não case com o ton-anchor, dá pra apontar "não é nosso tom" sem subjetividade.

- [ ] **Step 6: Commit**

```bash
git add brand/decisions/03-arquetipo-e-tom.md
git commit -m "brand(marca): set primary/secondary archetypes and ton-anchor"
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

- [ ] **Step 5: Validação**

Critério: paleta funciona em digital (site, social, newsletter), impresso (pôster de meetup), e em fundos dark + light. Teste ao lado de marcas competidoras (G4, Cactus, Gaveler, Growth Leaders) — o Growth Club se destaca ou se confunde?

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

- [ ] **Step 1: Desenhar lockup primário**

Baseado na decisão da Task 1.1 (bandeira pirata fate). Combinação símbolo + wordmark.

- [ ] **Step 2: Gerar variações obrigatórias**

- Horizontal (símbolo + wordmark ao lado)
- Vertical (símbolo em cima, wordmark embaixo)
- Icon-only (símbolo isolado — avatar)
- Monochrome preto (fundo claro)
- Monochrome branco (fundo escuro)

- [ ] **Step 3: Definir clear space e minimum size**

Regra de espaço mínimo em volta do logo. Tamanho mínimo em digital (px) + impressão (mm).

- [ ] **Step 4: Do's and Don'ts**

5 exemplos explícitos do que NÃO fazer (esticar, girar, mudar cor, colocar em fundo ruim, etc.).

- [ ] **Step 5: Validação**

Critério: logo funciona em 16x16 (favicon), 40x40 (avatar LinkedIn), 2000x1000 (pôster de meetup), impresso em 1x1cm sem perder legibilidade.

- [ ] **Step 6: Commit**

```bash
git add brand/assets/logo/ brand/visual/logo-guidelines.md
git commit -m "brand(visual): logo system v1 (primary + 5 variations)"
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

### Task 4.3: Kit de componentes Site (handoff pra fase Site)

**Files:**
- Create: `brand/templates/site/component-kit.fig` (Figma file — handoff)
- Create: `brand/templates/site/component-spec.md` (documentação textual)

- [ ] **Step 1: Componentes base**

Buttons (primary, secondary, destructive), Cards (content, pricing, testimonial), Nav (desktop + mobile), Hero block, Form inputs (email + select + checkbox), Footer.

- [ ] **Step 2: Guia de uso em markdown**

Para cada componente: quando usar, quando NÃO usar, variações, regras de hierarquia.

- [ ] **Step 3: Validação**

Critério: ao iniciar a fase Site, o designer/dev consome esse kit e constrói as páginas sem recorrer a estimativas ad-hoc.

- [ ] **Step 4: Commit**

```bash
git add brand/templates/site/
git commit -m "brand(templates): site component kit for handoff to fase Site"
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
4. Arquétipo e ton-anchor (Chunk 1)
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

### Task 5.3: Post-execution sync

**Files:**
- Modify: `.specs/project/STATE.md`
- Modify: `.specs/project/ROADMAP.md`

- [ ] **Step 1: Adicionar ADR-002 em STATE.md**

Registrar: Marca Brief v1 aprovado, commit hash, decisões principais (arquétipo, fate da bandeira pirata).

- [ ] **Step 2: Atualizar ROADMAP.md**

Marcar Fase 1 sub-item "Brand brief entregue" como DONE.

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
- [ ] Pelo menos 5 variações de logo em `brand/assets/logo/`
- [ ] Paleta, tipografia, voice & tone documentados
- [ ] Templates pelo menos pro meetup + newsletter prontos
- [ ] STATE.md + ROADMAP.md atualizados
- [ ] Todos os commits auditáveis no git
