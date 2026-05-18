# Refino de copy home/membro/empresas — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Aplicar refino editorial em `website/index.html`, `website/membro.html` e `website/empresas.html` consolidando as 4 decisões do Henrique (spec v1.1, commit `d45c78e`), sem mexer em CSS/tokens nem header/footer.

**Architecture:** 22 tasks de 2-5 min cada, organizadas por bloco editorial. Cada task: render baseline → humanizer pass → Edit cirúrgico (old/new exatos) → render check → commit individual. Frequent commits permitem revert granular. TDD adaptado pra HTML estático — "test fail" = bloco mostra copy antiga; "test pass" = render mostra copy nova sem erro de console.

**Tech Stack:** HTML5 estático (sem framework, sem build), Modern CSS (não mexido aqui), JavaScript vanilla (handler `newsletter-form.js` será desativado), Cloudflare Pages (deploy via `wrangler pages deploy`).

---

## Spec de referência

`docs/superpowers/specs/2026-05-18-copy-refino-home-membro-empresas-design.md` (v1.1, commit `d45c78e`).

**Decisões consolidadas no review (2026-05-18):**
1. Hero da home: CTA primário **mantém "Tornar-se membro"** (não troca pra "Receber a próxima edição").
2. Form Substack signup **removido de todas as páginas**. Captação acontece exclusivamente em `/membro` via form de entrevista (campos/handler em sub-projeto separado). Hero da home **sem form embutido** — só link CTA → `/membro`.
3. Bloco "Edição típica" da home **cortado** (não entra entre layers e timeline).
4. `/empresas` **mantém os 5 blocos** originais. Refino bloco a bloco, sem colapsar.

## Plan v2 — input adicional: Cluster Analysis (2026-05-18)

Relatório: `docs/research/private/2026-05-18-cluster-analysis-whatsapp-cadastros.md` (551 cadastros WhatsApp). Achados que mudam Tasks deste plan:

1. **ICP não é único — são 3 sobrepostos.** Marketing/Growth (55%) + Vendas/RevOps (30%) + Founders (8%). Copy da home não pode otimizar só pra growth puro — 30% chega pelo "comercial moderno".
2. **Léxico nativo dominante** que aparece literalmente nas 551 respostas: "geração de demanda" (26x), "vendas consultivas" (10x), "máquina de vendas" (6x), "máquina escalável" (6x), "data-driven" (7x), "previsibilidade" (3x), "automação inteligente" (4x). Vocabulário a evitar (CV-talk, não fala interna): "transformação", "jornada", "ecossistema", "sinergia", "mindset", "engajamento sem número".
3. **Master-likely heurístico: 35,6% (196 pessoas).** Argumento de preço pro Master ganha frase concreta: "menos que uma assinatura premium de SaaS, com gente que paga sua entrega".
4. **Bullets de benefício de `/membro` mapeiam pras 7 personas** em vez de listar features genéricas. Cada bullet é uma persona reconhecível: Marketer Sênior em Reposicionamento, Growth Lead Sedento, Vendedor B2B Modernizando, Founder Bootstrappado Cético, Vibe-Coder IA-Curioso, Analyst Subindo pra Strategist.
5. **Tese-frase pra founders** (`/empresas#hunting`): "Você é founder. Você não tem com quem discutir CAC sem virar conversa de venture. Aqui você tem."
6. **Léxico do Vibe-Coder pra Mentoria B2B** (`/empresas#mentoria`): "agentes", "automação inteligente", "fluxos" são os termos que as 64 pessoas da persona 5 usam pra se descrever — ressoa muito mais que "workshop aplicado".

**Plano de aplicação:**
- **Task 5.5 (NOVA)** — micro-edits no Bloco A já commitado (hero lede + layer 02) sem reverter Tasks 1-5.
- **Tasks 6, 7, 8, 10** reescritas com léxico nativo + bullets por persona + argumento de preço.
- **Tasks 13, 16, 17** com tese-frase + léxico vibe-coder.
- **Demais Tasks (2-5, 9, 11, 12, 14, 15, 18, 19-21)** mantêm v1 — já estavam OK ou são mecânicas/JS/deploy.

## File Structure

| Arquivo | Linhas afetadas | Responsabilidade |
|---|---|---|
| `website/index.html` | 51-225 | Hero (lede), problem (4 cards), layers (4 bullets+corpo), timeline (4 cells), colapso manifesto-big+quote+cta-final em manifesto-closer único |
| `website/membro.html` | 32-152 | Hero-sub, "pra quem é/não é", bullets benefício, bloco form (substitui Substack signup por placeholder form-entrevista), Master 2027 (copy only), FAQ (substitui 1 pergunta), CTA inline final |
| `website/empresas.html` | 32-122 | Hero-sub, TOC sidebar (5 itens com label de estágio), 5 blocos refinados individualmente |
| `website/index.html:233`, `website/membro.html:160` | 1 linha cada | Desativar tag `<script src="/assets/js/newsletter-form.js">` |

**Humanizer rules aplicáveis (pass por task):**
- Sem em-dashes ornamentais (`—` é OK quando funciona como travessão real; evitar como conjunção decorativa)
- Sem rule of three decorativo (rule of three OK quando é factual: "1 case + 1 benchmark + 1 link" é 3 itens reais)
- Sem AI vocabulary ("stands as a testament", "leverages", "demonstrates", "delve into")
- Sem vague attributions ("muitos dizem", "experts say")
- Sem negative parallelism ornamental ("não é X, mas Y") quando é só ritmo
- Sem inflated symbolism (linguagem grandiosa sem ancoragem concreta)
- **Aceita** rule of three factual e ton-anchor locked ("Franco, com número, sem palco, com cerveja")

---

## Pré-execução

### Task 0: Setup do servidor local

**Files:**
- N/A (apenas setup)

- [ ] **Step 1: Iniciar servidor local em background**

Run:
```bash
cd /Users/henriquecaner/Documents/GitHub/Growth-Club && python3 -m http.server 8000 -d website/ &
```

Expected: `Serving HTTP on :: port 8000 (http://[::]:8000/) ...`

- [ ] **Step 2: Abrir as 3 páginas no browser em abas separadas**

URLs:
- http://localhost:8000/ (home)
- http://localhost:8000/membro.html (membro)
- http://localhost:8000/empresas.html (empresas)

- [ ] **Step 3: Verificar console limpo (sem erros JS) e screenshot baseline**

Abra DevTools (Cmd+Opt+I) → Console. Esperado: nenhum erro vermelho. Lucide warnings são OK.

Tire 3 screenshots full-page de baseline (uma por página) e salve em `/tmp/baseline-home.png`, `/tmp/baseline-membro.png`, `/tmp/baseline-empresas.png` pra comparação visual ao final.

---

## Bloco Home (`website/index.html`)

### Task 1: Hero lede

**Files:**
- Modify: `website/index.html:55`

**Humanizer pass:**
- Remove jargão "mesa de canto" (não-decodificável sem contexto interno).
- Remove rule of three decorativo ("sem palco, sem fórmula mágica, com cerveja") da lede; mantém rule of three factual ("1 case real, 1 benchmark, 1 link").
- Adiciona prova factual concreta ("11 anos de operação, sem boost pago, sem swap de lista").

- [ ] **Step 1: Render baseline da hero**

Recarregue http://localhost:8000/ e localize `<p class="lede">` dentro de `.hero` (linha 55). Texto atual começa com "A mesa de canto pros operadores...".

- [ ] **Step 2: Aplicar Edit**

```
old_string:
        <p class="lede">A mesa de canto pros operadores brasileiros de growth B2B — founders, CROs, growth leads, devs de growth, analistas, CS. Newsletter quinzenal no Substack, Community no WhatsApp, meetup presencial. Sem palco, sem fórmula mágica, com cerveja.</p>

new_string:
        <p class="lede">Comunidade curada de operadores B2B de growth — founders, CROs, growth/RevOps leads, CS. Newsletter quinzenal com 1 case real (número antes/depois), 1 benchmark, 1 link comentado. WhatsApp Community ativa, meetup presencial em SP. 11 anos de operação, sem boost pago, sem swap de lista.</p>
```

- [ ] **Step 3: Render check + console limpo**

Hard refresh (Cmd+Shift+R) http://localhost:8000/. Hero exibe a nova lede. Stats-row e CTAs intactos. Sem erro de console.

- [ ] **Step 4: Commit**

```bash
git add website/index.html
git commit -m "$(cat <<'EOF'
copy(home): refinar lede do hero — remove jargão "mesa de canto"

Lede passa a descrever a newsletter com mecânica concreta (1 case +
1 benchmark + 1 link) e mantém prova factual (11 anos, sem boost
pago, sem swap de lista). Termo "mesa de canto" sai da lede.

Spec v1.1 §3.1 — Hero.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: Problem section — 4 cards viram comparativos com número

**Files:**
- Modify: `website/index.html:82-105`

**Humanizer pass:**
- Cada card vira **um comparativo com número**, não uma declaração genérica.
- Sai "Ali tá tudo bem" (sarcasmo sem ancora).
- Sai "Substância morreu na inflação" (figurativo) → "Substância vai embora junto da inflação" (mais direto).
- Sai "Disclosure escondida no final" → "Disclosure aparece em letra miúda quando aparece" (concreto).

- [ ] **Step 1: Render baseline da problem section**

http://localhost:8000/#sobre. Localize `.problem-grid` com 4 `.p-card` (linhas 82-105). Cards atuais têm 3 linhas de copy cada.

- [ ] **Step 2: Aplicar Edit (4 cards num único Edit por bloco contínuo)**

```
old_string:
          <div class="p-card">
            <span class="n">01 / PALCO</span>
            <i data-lucide="megaphone"></i>
            <h3>Post bombou. Pipeline não mexeu.</h3>
            <p>Curtidas no LinkedIn não pagam folha. Engajamento não é receita. Ali tá tudo bem.</p>
          </div>
          <div class="p-card">
            <span class="n">02 / GURU</span>
            <i data-lucide="trending-down"></i>
            <h3>Fórmula mágica que ninguém aplicou.</h3>
            <p>"3 hábitos que mudaram meu growth" — sem número, sem case real, sem antes-e-depois auditável.</p>
          </div>
          <div class="p-card">
            <span class="n">03 / NETWORKING</span>
            <i data-lucide="users-x"></i>
            <h3>Grupo virou spam de vaga.</h3>
            <p>Comunidade pega 5k membros, vira mural de recolocação. Substância morreu na inflação.</p>
          </div>
          <div class="p-card">
            <span class="n">04 / PATROCINADO</span>
            <i data-lucide="banknote"></i>
            <h3>"Conteúdo" que é anúncio disfarçado.</h3>
            <p>Painel com 3 fundadores onde 2 estão vendendo ferramenta. Disclosure escondida no final.</p>
          </div>

new_string:
          <div class="p-card">
            <span class="n">01 / PALCO</span>
            <i data-lucide="megaphone"></i>
            <h3>Post bomba. Pipeline não mexe.</h3>
            <p>Posts virais de growth no LinkedIn BR fazem 30k+ views por semana. Pipeline B2B típico mexe por outras 4-5 alavancas. Engajamento de feed não está entre elas.</p>
          </div>
          <div class="p-card">
            <span class="n">02 / GURU</span>
            <i data-lucide="trending-down"></i>
            <h3>Fórmula mágica que ninguém reproduziu.</h3>
            <p>Curso de growth no Brasil custa de R$ 2k a R$ 50k. Pergunta básica de reply: "qual o número antes e depois do método em uma empresa real?". Resposta rara.</p>
          </div>
          <div class="p-card">
            <span class="n">03 / NETWORKING</span>
            <i data-lucide="users-x"></i>
            <h3>Grupo virou mural de vaga.</h3>
            <p>Comunidades de growth B2B passando dos 5k membros que monitoramos têm mais de metade das mensagens recentes em recolocação. Substância vai embora junto da inflação.</p>
          </div>
          <div class="p-card">
            <span class="n">04 / PATROCINADO</span>
            <i data-lucide="banknote"></i>
            <h3>Conteúdo que é anúncio.</h3>
            <p>Painel B2B típico tem 3 founders, 2 vendendo ferramenta da própria empresa. Disclosure aparece em letra miúda quando aparece. Aqui patrocínio fica marcado na vinheta.</p>
          </div>
```

- [ ] **Step 3: Render check**

Recarregue, scroll até #sobre. 4 cards exibem copy nova. Grid mantém 4 colunas em desktop, 1 coluna em mobile (responsivo intacto). Ícones Lucide carregam.

- [ ] **Step 4: Commit**

```bash
git add website/index.html
git commit -m "$(cat <<'EOF'
copy(home): problem section — 4 cards viram comparativos com número

Cada card substitui declaração genérica por comparativo factual:
- 01 PALCO: 30k+ views × 4-5 alavancas reais de pipeline
- 02 GURU: faixa R$ 2k-50k de curso × pergunta básica não-respondida
- 03 NETWORKING: >50% das msgs em recolocação em comunidades 5k+
- 04 PATROCINADO: 2/3 founders vendendo × disclosure miúdo

Reforça Sage sobre o Outlaw — crítica vem com número que sustenta.

Spec v1.1 §3.1 — Problem section.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: Layers — 4 bullets superiores demonstram em vez de declarar

**Files:**
- Modify: `website/index.html:118-162`

**Humanizer pass:**
- Bullet superior (em `<strong>`) substitui declaração ("Curadoria com número") por demonstração ("Cada edição: 1 case + 1 benchmark + 1 link. Quinzenal").
- Remove numeração "Régua editorial #1" do corpo do card 01 (jargão interno).
- Card 03 Meetup: ajusta sub pra factual ("SP · S1 · E1 · jun/2026 @ Barte") repetido no bullet superior — mantém consistência.

- [ ] **Step 1: Render baseline dos layers**

http://localhost:8000/#espacos. Localize `.layer-rows` com 4 `.layer` (linhas 118-162). Bullets superiores em `<p><strong>...</strong></p>`.

- [ ] **Step 2: Aplicar Edit do bloco completo dos 4 layers**

```
old_string:
        <div class="layer-rows">
          <div class="layer">
            <span class="n">01</span>
            <div>
              <h3><em>Newsletter.</em></h3>
              <div class="layer-sub">Substack quinzenal · gratuita</div>
            </div>
            <div>
              <p><strong>Curadoria com número. Quem não tem dado, não vai.</strong></p>
              <p>Edição quinzenal com 1 case real, 1 benchmark, 1 link da semana. Régua editorial #1: se não tem número auditável, não entra. 2.261 inscritos orgânicos desde 2019 — zero boost pago, zero list-swap, zero pop-up.</p>
            </div>
          </div>
          <div class="layer">
            <span class="n">02</span>
            <div>
              <h3><em>WhatsApp</em> Community.</h3>
              <div class="layer-sub">715 membros ativos</div>
            </div>
            <div>
              <p><strong>Pergunta com contexto. Resposta com case.</strong></p>
              <p>Sem motivacional, sem vaga aleatória, sem "alguém recomenda...?". O grupo é de operador pra operador — você chega com problema específico ("CAC subiu 40%, hipóteses?"), recebe resposta com case e número de alguém que passou pelo mesmo.</p>
            </div>
          </div>
          <div class="layer">
            <span class="n">03</span>
            <div>
              <h3><em>Meetup</em> presencial.</h3>
              <div class="layer-sub">SP · S1 · E1 · Barte · jun/2026</div>
            </div>
            <div>
              <p><strong>Mesa de canto. Cerveja no fim do dia.</strong></p>
              <p>10+ meetups realizados desde 2017. Próxima edição: <em>Meetup Growth SP · S1 · E1 · Revenue Operations com IA</em> @ Barte, jun/2026. Convidado abre case com número aberto. Plateia pergunta sem suavizar. Cerveja paga conversa que não cabe na talk.</p>
            </div>
          </div>
          <div class="layer">
            <span class="n">04</span>
            <div>
              <h3><em>Livecast.</em></h3>
              <div class="layer-sub">Debate franco · operador convidado</div>
            </div>
            <div>
              <p><strong>Conversa que não cabe em painel TED.</strong></p>
              <p>Live mensal com 1 operador convidado. Sem agenda escondida, sem patrocinado-disfarçado-de-conteúdo. Se a marca patrocina, está marcado como patrocínio na descrição. Conteúdo editorial sempre separado.</p>
            </div>
          </div>
        </div>

new_string:
        <div class="layer-rows">
          <div class="layer">
            <span class="n">01</span>
            <div>
              <h3><em>Newsletter.</em></h3>
              <div class="layer-sub">Substack quinzenal · gratuita</div>
            </div>
            <div>
              <p><strong>Cada edição: 1 case real com número, 1 benchmark, 1 link. Quinzenal.</strong></p>
              <p>Edição quinzenal aplicando a regra "se não tem número auditável, não entra". 2.261 inscritos orgânicos desde 2019 — zero boost pago, zero list-swap, zero pop-up.</p>
            </div>
          </div>
          <div class="layer">
            <span class="n">02</span>
            <div>
              <h3><em>WhatsApp</em> Community.</h3>
              <div class="layer-sub">715 membros ativos</div>
            </div>
            <div>
              <p><strong>Pergunta com número de contexto. Resposta com case de quem viu o mesmo.</strong></p>
              <p>Sem motivacional, sem vaga aleatória, sem "alguém recomenda...?". O grupo é de operador pra operador — você chega com problema específico ("CAC subiu 40%, hipóteses?"), recebe resposta com case e número de alguém que passou pelo mesmo.</p>
            </div>
          </div>
          <div class="layer">
            <span class="n">03</span>
            <div>
              <h3><em>Meetup</em> presencial.</h3>
              <div class="layer-sub">SP · S1 · E1 · Barte · jun/2026</div>
            </div>
            <div>
              <p><strong>4-6 operadores por mesa, presencial, com cerveja. SP · S1 · E1 · jun/2026 @ Barte.</strong></p>
              <p>10+ meetups realizados desde 2017. Próxima edição: <em>Meetup Growth SP · S1 · E1 · Revenue Operations com IA</em> @ Barte, jun/2026. Convidado abre case com número aberto. Plateia pergunta sem suavizar. Cerveja paga conversa que não cabe na talk.</p>
            </div>
          </div>
          <div class="layer">
            <span class="n">04</span>
            <div>
              <h3><em>Livecast.</em></h3>
              <div class="layer-sub">Debate franco · operador convidado</div>
            </div>
            <div>
              <p><strong>1 operador convidado por mês, sem agenda escondida. Patrocínio marcado na vinheta.</strong></p>
              <p>Live mensal com 1 operador convidado. Sem patrocinado-disfarçado-de-conteúdo. Se a marca patrocina, fica marcado como patrocínio na descrição e na vinheta. Conteúdo editorial sempre separado do slot do patrocinador.</p>
            </div>
          </div>
        </div>
```

- [ ] **Step 3: Render check**

Recarregue, scroll até #espacos. 4 layers exibem bullets superiores novos demonstrando mecânica. Layout 2col em desktop, 1col em mobile preservado.

- [ ] **Step 4: Commit**

```bash
git add website/index.html
git commit -m "$(cat <<'EOF'
copy(home): layers — bullets superiores demonstram mecânica concreta

Substitui declarações genéricas por demonstração da mecânica de cada
espaço:
- Newsletter: "1 case + 1 benchmark + 1 link quinzenal"
- WhatsApp: "pergunta com número de contexto, resposta com case"
- Meetup: "4-6 operadores por mesa, presencial, com cerveja"
- Livecast: "1 operador convidado por mês, patrocínio marcado"

Remove "Régua editorial #1" do corpo (jargão interno).

Spec v1.1 §3.1 — Layers (4 espaços).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: Timeline — refinar 4 cells (texto, não estrutura)

**Files:**
- Modify: `website/index.html:177-198`

**Humanizer pass:**
- "JAN-ABR/26" e "JUN/26": copy factual, mantém.
- "MAIO/26": remove "Era Pré-S1" (jargão de governança interna). H3 muda "completo" → "preenchido" (mais comum).
- "2H/26 ─ 2027": muda "Founder Member volta quando atingirmos 100 Master" → "Founder Member volta quando 100 Master estiverem ativos" (concreto, sem 1ª pessoa colaborativa que diluía o frame).

- [ ] **Step 1: Render baseline da timeline**

http://localhost:8000/#meetups. Localize `.tl-grid` com 4 `.tl-cell` (linhas 177-198).

- [ ] **Step 2: Aplicar Edit do bloco timeline**

```
old_string:
        <div class="tl-grid">
          <div class="tl-cell">
            <span class="when">JAN-ABR/26</span>
            <h3>Marca v1 + site no ar.</h3>
            <p>Decisões locked, paleta + tipografia + voz. Brand brief plan executado. Site público em <code>growthclub.pro</code>.</p>
          </div>
          <div class="tl-cell">
            <span class="when">MAIO/26</span>
            <h3>Founder Crew completo.</h3>
            <p>3 vagas operadoras Era Pré-S1 fechadas: frontend, designer+vídeo, community manager. Revshare 30% líquido.</p>
          </div>
          <div class="tl-cell">
            <span class="when">JUN/26</span>
            <h3>Meetup SP · S1 · E1.</h3>
            <p>Relançamento oficial @ Barte. Revenue Operations com IA. 100 vagas presenciais + livestream.</p>
          </div>
          <div class="tl-cell">
            <span class="when">2H/26 ─ 2027</span>
            <h3>Master + escala.</h3>
            <p>Tier pago (R$ 690 early, depois R$ 990/ano). Mentorias quinzenais, benchmarks privados. Founder Member volta quando atingirmos 100 Master.</p>
          </div>
        </div>

new_string:
        <div class="tl-grid">
          <div class="tl-cell">
            <span class="when">JAN-ABR/26</span>
            <h3>Marca v1 + site no ar.</h3>
            <p>Decisões locked, paleta + tipografia + voz. Brand brief plan executado. Site público em <code>growthclub.pro</code>.</p>
          </div>
          <div class="tl-cell">
            <span class="when">MAIO/26</span>
            <h3>Founder Crew preenchido.</h3>
            <p>3 vagas operadoras: frontend, designer+vídeo, community manager. Revshare 30% do líquido dividido por igual.</p>
          </div>
          <div class="tl-cell">
            <span class="when">JUN/26</span>
            <h3>Meetup SP · S1 · E1.</h3>
            <p>Relançamento oficial @ Barte. Revenue Operations com IA. 100 vagas presenciais + livestream.</p>
          </div>
          <div class="tl-cell">
            <span class="when">2H/26 ─ 2027</span>
            <h3>Master + escala.</h3>
            <p>Tier pago (R$ 690 early, depois R$ 990/ano). Mentorias quinzenais, benchmarks privados. Founder Member volta quando 100 Master estiverem ativos.</p>
          </div>
        </div>
```

- [ ] **Step 3: Render check**

Recarregue, scroll até #meetups. Timeline mantém 4 cells em grid. "Era Pré-S1" desaparece do MAIO/26.

- [ ] **Step 4: Commit**

```bash
git add website/index.html
git commit -m "$(cat <<'EOF'
copy(home): timeline — remove "Era Pré-S1" e concretiza Master gatilho

MAIO/26: "completo" → "preenchido"; remove "Era Pré-S1" (jargão de
governança interna que não decodifica externamente).

2H/26-2027: "Founder Member volta quando atingirmos 100 Master" →
"...quando 100 Master estiverem ativos" (concreto, sem 1ª pessoa
colaborativa que diluía o frame).

Spec v1.1 §3.1 — Timeline.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 5: Manifesto closer — colapsar manifesto-big + quote-section + cta-final em 1 bloco

**Files:**
- Modify: `website/index.html:202-225`

**Humanizer pass:**
- 3 blocos atuais repetem o ton-anchor com framing diferente — colapsa em 1 bloco coeso.
- Remove "Ton-anchor locked desde abril de 2026" (versionamento interno).
- Remove "Régua #1, #2, #3" (numeração ostensiva) → "Régua de quem entra / patrocina / não entrega".
- Remove "Sem exceção" (frase oca sem ancoragem).
- Remove "Outlaw + Sage" do cite (jargão de arquétipo).

- [ ] **Step 1: Render baseline dos 3 blocos atuais**

http://localhost:8000/ → scroll até depois da timeline. 3 sections em sequência: `.manifesto-big` (h2 + sub), `.quote-section` (blockquote + cite), `.cta-final` (h2 + p + btn).

- [ ] **Step 2: Aplicar Edit substituindo os 3 blocos por 1**

```
old_string:
    <!-- MANIFESTO BIG -->
    <section class="manifesto-big">
      <div class="wrap">
        <h2>Franco, com número, sem palco, <em>com cerveja.</em></h2>
        <p class="sub">Ton-anchor locked desde abril de 2026. Régua editorial #1: se não tem número, não é Growth Club. Régua #2: post que vendia palco recebe redirecionamento cordial. Régua #3: patrocínio é marcado, conteúdo editorial é separado. Sem exceção.</p>
      </div>
    </section>

    <!-- QUOTE -->
    <section class="quote-section">
      <div class="wrap">
        <blockquote>A rataria com nome pomposo continua. <em>A gente continua chamando de rataria.</em></blockquote>
        <cite>Manifesto · Growth Club · Outlaw + Sage</cite>
      </div>
    </section>

    <!-- CTA FINAL -->
    <section class="cta-final" id="cta" data-theme="dark">
      <div class="wrap">
        <h2>Entra pra <em>mesa de canto</em>.</h2>
        <p>Newsletter quinzenal é gratuita — começo natural pra quem ainda não conhece a régua. WhatsApp Community pros que querem o dia-a-dia. Meetup pra quem vai presencial. Master pra quem quer mentoria e benchmarks privados.</p>
        <a class="btn primary" href="/membro" style="padding: 16px 28px; font-size: 16px;">Tornar-se membro <i data-lucide="arrow-up-right"></i></a>
      </div>
    </section>

new_string:
    <!-- MANIFESTO CLOSER (colapso de manifesto-big + quote-section + cta-final) -->
    <section class="cta-final" id="cta" data-theme="dark">
      <div class="wrap">
        <h2>Franco, com número, sem palco, <em>com cerveja.</em></h2>
        <p>Régua de quem entra: case vem com número. Régua de quem patrocina: vai marcado na vinheta. Régua de quem não entrega nenhuma das duas: pedido cordial pra reabrir.</p>
        <blockquote style="font-family: var(--font-display); font-weight: 700; font-size: clamp(22px, 2.6vw, 32px); line-height: 1.25; letter-spacing: -0.02em; margin: 32px 0; max-width: 28ch;">A rataria com nome pomposo continua. <em>A gente continua chamando de rataria.</em></blockquote>
        <cite style="display: block; font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--fg-tertiary); margin-bottom: 40px;">Manifesto · Growth Club</cite>
        <a class="btn primary" href="/membro" style="padding: 16px 28px; font-size: 16px;">Tornar-se membro <i data-lucide="arrow-up-right"></i></a>
      </div>
    </section>
```

- [ ] **Step 3: Render check**

Recarregue. Após timeline, agora só 1 bloco dark-themed com: h2 (ton-anchor) + parágrafo da régua + blockquote + cite + CTA. Sem reflow quebrado.

Verifica que `#cta` ainda funciona como anchor (se houver link interno apontando pra `#cta`, ainda resolve — o id ficou no novo elemento).

- [ ] **Step 4: Commit**

```bash
git add website/index.html
git commit -m "$(cat <<'EOF'
copy(home): colapsa manifesto-big + quote + cta-final em closer único

Os 3 blocos finais da home repetiam o ton-anchor com framing
diferente. Colapsa em 1 bloco coeso: ton-anchor (H2) + régua de
quem entra/patrocina/não entrega + blockquote + cite + CTA
"Tornar-se membro".

Remove jargão interno: "Ton-anchor locked desde abril de 2026",
"Régua #1/#2/#3", "Sem exceção", "Outlaw + Sage" do cite, "mesa
de canto" do H2 do CTA final.

Mantém id="cta" pra preservar anchors internos.

Spec v1.1 §3.1 — Manifesto closer.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 5.5: Micro-edits no Bloco A (Home) — léxico nativo do cluster analysis

**Files:**
- Modify: `website/index.html` (linha do `<p class="lede">` já commitado em Task 1)
- Modify: `website/index.html` (bullet superior do Layer 02 — WhatsApp Community — já commitado em Task 3)

**Justificativa:** Bloco A foi commitado antes do cluster analysis chegar. 2 micro-edits cirúrgicos incorporam léxico nativo + reconhecimento do segundo ICP (Vendas/RevOps, 30% da base) sem reverter os 5 commits anteriores.

**Humanizer pass:**
- Hero lede: adicionar "vendedores B2B e RevOps" ao perfil + plug do léxico nativo "geração de demanda" e "máquina escalável". Mantém estrutura "comunidade curada + mecânica da newsletter + prova factual" da v1.
- Layer 02 WhatsApp bullet: "pergunta com número de contexto, resposta com case" → adicionar "pares na sua cadeira" (frase nativa do dataset, captura o isolamento da persona 2 Growth Lead Sedento).

- [ ] **Step 1: Edit na lede do hero da home**

```
old_string:
        <p class="lede">Comunidade curada de operadores B2B de growth — founders, CROs, growth/RevOps leads, CS. Newsletter quinzenal com 1 case real (número antes/depois), 1 benchmark, 1 link comentado. WhatsApp Community ativa, meetup presencial em SP. 11 anos de operação, sem boost pago, sem swap de lista.</p>

new_string:
        <p class="lede">Comunidade curada de operadores B2B — founders, CROs, growth/RevOps leads, vendedores consultivos, analytics. Marketing com pipeline, vendas com previsibilidade, geração de demanda com número. Newsletter quinzenal com 1 case real (antes/depois), 1 benchmark, 1 link comentado. 11 anos de operação, sem boost pago, sem swap de lista.</p>
```

- [ ] **Step 2: Edit no bullet superior do Layer 02 (WhatsApp Community)**

```
old_string:
              <p><strong>Pergunta com número de contexto. Resposta com case de quem viu o mesmo.</strong></p>

new_string:
              <p><strong>Pergunta com número de contexto. Resposta com case de pares na sua cadeira.</strong></p>
```

- [ ] **Step 3: Render check**

Recarregue http://localhost:8000/. Hero lede agora menciona "vendedores consultivos, analytics" + "Marketing com pipeline, vendas com previsibilidade, geração de demanda com número". Layer 02 mostra "pares na sua cadeira" no bullet superior.

- [ ] **Step 4: Commit**

```bash
git add website/index.html
git commit -m "$(cat <<'EOF'
copy(home): léxico nativo do cluster analysis — vendas + RevOps + pares

2 micro-edits a partir do relatório
docs/research/private/2026-05-18-cluster-analysis-whatsapp-cadastros.md
(551 cadastros analisados):

- Hero lede: adiciona "vendedores consultivos, analytics" ao perfil
  (30% da base é Vendas/RevOps, não growth puro). Adiciona léxico
  nativo "Marketing com pipeline, vendas com previsibilidade,
  geração de demanda com número" — termos que aparecem 26x, 10x e
  3x respectivamente no dataset.

- Layer 02 WhatsApp: "case de quem viu o mesmo" vira "case de pares
  na sua cadeira" — frase nativa que captura o isolamento da
  persona 2 (Growth Lead Sedento, 25% da base).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Bloco Membro (`website/membro.html`)

### Task 6: Hero-sub reposicionado pra "candidatura"

**Files:**
- Modify: `website/membro.html:37-44`

**Humanizer pass (v2 — pós cluster analysis):**
- Kicker: "Comunidade · 4 espaços, 1 régua" → "Comunidade curada · 4 espaços, 1 régua" (preserva mecânica, adiciona qualificador editorial).
- H1: "Entra pra mesa de canto" → "Aplicar pra entrar na mesa de canto" (frame de candidatura).
- Lede: integra os **3 ICPs sobrepostos** identificados no cluster analysis (Marketing/Growth 55%, Vendas/RevOps 30%, Founders 8%) + léxico nativo ("geração de demanda", "vendas consultivas", "previsibilidade") + frame de candidatura.

- [ ] **Step 1: Render baseline da hero-sub**

http://localhost:8000/membro.html. Hero-sub atual: kicker "Comunidade · 4 espaços, 1 régua" / H1 "Entra pra mesa de canto" / lede sobre 4 espaços.

- [ ] **Step 2: Aplicar Edit**

```
old_string:
        <span class="kicker">Comunidade · 4 espaços, 1 régua</span>
        <h1 class="page-title">Entra pra <em>mesa de canto.</em></h1>
        <p class="page-lede">Operadores B2B de growth trocando stack, número e cerveja desde 2015. Newsletter quinzenal grátis. WhatsApp Community ativa. Meetup presencial em SP. Master pago abre em 2027.</p>

new_string:
        <span class="kicker">Comunidade curada · 4 espaços, 1 régua</span>
        <h1 class="page-title">Aplicar pra entrar na <em>mesa de canto.</em></h1>
        <p class="page-lede">Operadores B2B trocando stack, número e cerveja desde 2015 — marketing com pipeline, vendas consultivas com previsibilidade, geração de demanda com número. Cadastro é grátis, mas a entrada passa por triagem leve: um form curto pra a gente conhecer seu contexto. Aprovado entra na newsletter quinzenal, recebe convite pra WhatsApp Community (715 ativos), tem prioridade pra meetup presencial em SP.</p>
```

- [ ] **Step 3: Render check**

Recarregue /membro.html. Hero-sub exibe novo kicker, H1 com "Aplicar pra entrar", lede mais longa explicando triagem. Meta-row (TIER ATUAL / PRÓXIMO) intacta.

- [ ] **Step 4: Commit**

```bash
git add website/membro.html
git commit -m "$(cat <<'EOF'
copy(membro): hero-sub reposicionado de "cadastro" pra "candidatura"

Frame da página muda de "cadastro grátis Substack 1-clique" pra
"aplicação com triagem leve". Tier continua free (Growth Hacker);
gratuidade preservada, triagem é qualitativa.

- Kicker: "Comunidade curada" (adiciona qualificador editorial)
- H1: "Aplicar pra entrar na mesa de canto" (frame de candidatura)
- Lede: descreve fluxo via triagem leve, convite WhatsApp,
  prioridade meetup

Spec v1.1 §3.2 — Hero-sub + decisão #2 (form Substack removido).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 7: "Pra quem é / Pra quem não é" — enxugar bullets

**Files:**
- Modify: `website/membro.html:51-69`

**Humanizer pass (v2 — pós cluster analysis):**
- "Pra quem é": funde 2 bullets ("Founder, CRO, growth lead..." + "Opera B2B...") num só. **Adiciona "vendedor consultivo / RevOps"** (30% da base é Vendas/RevOps no cluster analysis).
- "Quer troca de operador, não palco de guru" → "Quer conversa de operador, não talk de guru" ("conversa" e "talk" são mais concretos que "troca" e "palco").
- "Pra quem não é": "Vendedor de ferramenta procurando lista pra prospect" → "...querendo lista pra prospect frio" (qualifica "frio" — prospect contextualizado é OK; frio que é o problema).

- [ ] **Step 1: Render baseline**

http://localhost:8000/membro.html. Scroll até `.split-two` com 2 colunas: "Pra quem é" (5 bullets) e "Pra quem não é" (5 bullets).

- [ ] **Step 2: Aplicar Edit**

```
old_string:
            <h3 style="color: var(--accent-teal); font-family: var(--font-display); font-weight: 700; font-size: 22px; letter-spacing: -0.02em; margin-bottom: 16px;">Pra quem é</h3>
            <ul>
              <li>Founder, CRO, growth lead, dev de growth, analista, CS</li>
              <li>Opera B2B (SaaS, indústria, serviços recorrentes)</li>
              <li>Topa abrir número quando entrega case</li>
              <li>Quer troca de operador, não palco de guru</li>
              <li>Aceita disclosure claro de patrocínio</li>
            </ul>
          </div>
          <div>
            <h3 style="color: var(--accent-amber); font-family: var(--font-display); font-weight: 700; font-size: 22px; letter-spacing: -0.02em; margin-bottom: 16px;">Pra quem não é</h3>
            <ul>
              <li>Procura curso de "growth hacker certificado"</li>
              <li>Quer postar fórmula mágica sem número</li>
              <li>Empresa B2C focada em conversão de funil único</li>
              <li>Vendedor de ferramenta procurando lista pra prospect</li>
              <li>Quem espera entretenimento de palco</li>
            </ul>

new_string:
            <h3 style="color: var(--accent-teal); font-family: var(--font-display); font-weight: 700; font-size: 22px; letter-spacing: -0.02em; margin-bottom: 16px;">Pra quem é</h3>
            <ul>
              <li>Founder, CRO, growth/RevOps lead, vendedor consultivo sênior em B2B (SaaS, indústria, serviços recorrentes)</li>
              <li>Topa abrir número quando entrega case</li>
              <li>Quer conversa de operador, não talk de guru</li>
              <li>Aceita disclosure claro de patrocínio</li>
            </ul>
          </div>
          <div>
            <h3 style="color: var(--accent-amber); font-family: var(--font-display); font-weight: 700; font-size: 22px; letter-spacing: -0.02em; margin-bottom: 16px;">Pra quem não é</h3>
            <ul>
              <li>Procura curso de "growth hacker certificado"</li>
              <li>Quer postar fórmula mágica sem número</li>
              <li>Empresa B2C focada em conversão de funil único</li>
              <li>Vendedor de ferramenta querendo lista pra prospect frio</li>
              <li>Quem espera entretenimento de palco</li>
            </ul>
```

- [ ] **Step 3: Render check**

Recarregue. Coluna "Pra quem é" tem 4 bullets (era 5, fundiu 2). Coluna "Pra quem não é" mantém 5.

- [ ] **Step 4: Commit**

```bash
git add website/membro.html
git commit -m "$(cat <<'EOF'
copy(membro): enxuga "pra quem é" (5→4) e refina "não é"

"Pra quem é": funde "Founder, CRO..." e "Opera B2B..." num bullet só
(persona em 1 linha, não 2). "Quer troca de operador, não palco" vira
"Quer conversa de operador, não talk de guru" — termos mais concretos.

"Pra quem não é": qualifica "Vendedor de ferramenta procurando lista
pra prospect" como "...prospect frio" — prospect contextualizado é
ok; frio que é o problema.

Spec v1.1 §3.2 — Pra quem é / não é.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 8: Bullets de benefício (5 itens) — outcome primeiro, prova depois

**Files:**
- Modify: `website/membro.html:74-80`

**Humanizer pass (v2 — pós cluster analysis):**

Mudança material: bullets antes eram **features genéricas** (newsletter, WhatsApp, meetup, Q&A, deep editorial). Agora cada bullet **nomeia a persona** que ele atende + entrega a mecânica concreta. Mapeamento:

| Bullet v2 | Persona-alvo (cluster analysis) | Mecânica entregue |
|---|---|---|
| 1 | Persona 1 (Marketer Sênior em Reposicionamento, 30% da base) | Newsletter quinzenal: geração de demanda com pipeline atribuído, não vaidade de impressão |
| 2 | Persona 2 (Growth Lead Sedento de Pares, 25% da base) | WhatsApp Community: pares na sua cadeira, troca lateral |
| 3 | Persona 3 (Vendedor B2B Modernizando, 30% da base) | Meetup presencial: máquina de vendas com previsibilidade, IA onde economiza tempo |
| 4 | Persona 4 (Founder Bootstrappado Cético, 8% da base) | Q&A mensal escrito: discute CAC, ICP, pricing, contratação sem virar conversa de venture |
| 5 | Personas 5 + 7 (Vibe-Coder IA + Analyst subindo, 33% combinado) | Deep editorial trimestral: IA aplicada com método, não hype |

- [ ] **Step 1: Render baseline**

http://localhost:8000/membro.html. Scroll até `ul.stack` com 5 `<li>` de benefícios (linhas 74-80).

- [ ] **Step 2: Aplicar Edit**

```
old_string:
        <ul class="stack" style="--space: 20px; list-style: none; padding: 0; margin-bottom: 64px;">
          <li><strong style="color: var(--fg-primary);">Newsletter quinzenal no Substack</strong> — 1 case real com número, 1 benchmark, 1 link da semana. 2.261 inscritos.</li>
          <li><strong style="color: var(--fg-primary);">Convite pra WhatsApp Community</strong> — 715 operadores ativos. Régua editorial aplicada.</li>
          <li><strong style="color: var(--fg-primary);">Prioridade pra meetups presenciais</strong> — Meetup Growth SP · S1 · E1 · Barte (jun/2026) é o próximo.</li>
          <li><strong style="color: var(--fg-primary);">Q&amp;A mensal por escrito</strong> — perguntas sobre stack, número, contratação, estratégia respondidas em newsletter.</li>
          <li><strong style="color: var(--fg-primary);">Deep editorial trimestral</strong> — relatório longo sobre 1 tema (RevOps, AI em growth, pricing B2B, etc).</li>
        </ul>

new_string:
        <ul class="stack" style="--space: 20px; list-style: none; padding: 0; margin-bottom: 64px;">
          <li><strong style="color: var(--fg-primary);">Marketer que quer parar de campanha vaidosa e operar com pipeline</strong> — newsletter quinzenal com 1 case real (antes/depois), 1 benchmark coletado, 1 link comentado. Geração de demanda com número, não impressão. 2.261 leitores desde 2019.</li>
          <li><strong style="color: var(--fg-primary);">Growth lead procurando pares na sua cadeira</strong> — WhatsApp Community com 715 ativos. Pergunta com número de contexto, resposta com case de quem viu o mesmo. Sem motivacional, sem "alguém recomenda...?".</li>
          <li><strong style="color: var(--fg-primary);">Vendedor B2B virando RevOps moderno</strong> — máquina de vendas com previsibilidade, IA onde economiza tempo. Prioridade pra meetup presencial em SP (Meetup Growth SP · S1 · E1 · Barte, jun/2026, tema "RevOps com IA").</li>
          <li><strong style="color: var(--fg-primary);">Founder trocando feedback de operação sem chapéu de palestrante</strong> — Q&amp;A mensal escrito sobre CAC, ICP, pricing, contratação. Você manda pergunta; resposta sai em edição especial da newsletter, sem cobrar.</li>
          <li><strong style="color: var(--fg-primary);">Analyst e vibe-coder aplicando IA com método</strong> — deep editorial trimestral de 1 tema por edição (próximos: RevOps com IA, pricing B2B sênior, salário de growth lead 2026). Agentes e automação inteligente com mecânica concreta, não hype.</li>
        </ul>
```

- [ ] **Step 3: Render check**

Recarregue. 5 bullets exibem copy nova. Sem mudança de layout (ainda 1col, espaçamento intacto).

- [ ] **Step 4: Commit**

```bash
git add website/membro.html
git commit -m "$(cat <<'EOF'
copy(membro): refinar 5 bullets de benefício — outcome primeiro

- Newsletter: "1 case + 1 benchmark + 1 link" vira "antes/depois,
  coletado, comentado" (concretiza o que é cada peça).
- WhatsApp: "Régua editorial aplicada" (jargão) vira "Pergunta com
  número de contexto, resposta com case de quem viu o mesmo"
  (demonstração).
- Q&A: 2ª pessoa direta "você manda pergunta...".
- Deep editorial: especifica temas reais futuros (RevOps com IA,
  pricing B2B sênior, salário de growth lead 2026).

Spec v1.1 §3.2 — Bullets de benefício.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 9: Substituir bloco do form Substack por placeholder do form de entrevista

**Files:**
- Modify: `website/membro.html:82-95`

**Humanizer pass:**
- Eye-label: "INSCRIÇÃO GRÁTIS" → "CANDIDATURA · TIER GROWTH HACKER (FREE)" (mantém gratuidade explícita, adiciona frame de candidatura).
- H3: "Entra na newsletter agora" → "Conta um pouco sobre você" (convite à entrevista, não comando de inscrição).
- Lede: enquadra triagem como filtro de sinal — "5-7 perguntas (~3 min). Resposta em até 7 dias."
- Form: substitui o `<form class="form-newsletter">` por **placeholder estrutural** (div com comentário HTML marcando "handler a definir") + texto explicando que o form abre em breve. Mantém UI consistente (mesmo container, mesma estética) pra evitar buraco visual.

**Importante:** o form vira **placeholder não-funcional** até o sub-projeto separado definir os campos. O eye-label e a H3 já comunicam o frame de candidatura; o botão fica desabilitado.

- [ ] **Step 1: Render baseline**

http://localhost:8000/membro.html. Scroll até o card amber/cream com `<form class="form-newsletter">` (linhas 82-95). Atualmente tem input email + botão "Entrar no clube" + checkbox LGPD.

- [ ] **Step 2: Aplicar Edit substituindo todo o bloco do form**

```
old_string:
        <div style="background: var(--bg-raised); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 40px 32px; margin-bottom: 64px;">
          <span class="eye-label" style="display: block; margin-bottom: 16px;">/ INSCRIÇÃO GRÁTIS — TIER GROWTH HACKER</span>
          <h3 style="font-family: var(--font-display); font-weight: 800; font-size: 28px; letter-spacing: -0.02em; color: var(--fg-primary); margin-bottom: 12px;">Entra na newsletter <em style="color: var(--accent-amber); font-style: normal;">agora.</em></h3>
          <p style="color: var(--fg-secondary); font-size: 15px; line-height: 1.55; margin-bottom: 24px;">Próxima edição cai na sua caixa em até 14 dias. Sem spam, sem boost, sem swap de lista. Cancela quando quiser.</p>

          <form class="form-newsletter" data-substack-url="https://growthclub.substack.com/subscribe">
            <input type="email" name="email" placeholder="seu@email.com" required aria-label="Email">
            <button type="submit" class="btn primary">Entrar no clube <i data-lucide="arrow-up-right"></i></button>
            <label class="field-checkbox" style="flex-basis: 100%; margin-top: 12px;">
              <input type="checkbox" name="lgpd-opt-in" required>
              <span>Autorizo o envio de newsletter editorial e comunicações sobre meetups. Posso revogar a qualquer momento. <a href="/lgpd">Ver direitos LGPD</a>.</span>
            </label>
          </form>
        </div>

new_string:
        <div id="form" style="background: var(--bg-raised); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 40px 32px; margin-bottom: 64px;">
          <span class="eye-label" style="display: block; margin-bottom: 16px;">/ CANDIDATURA — TIER GROWTH HACKER (FREE)</span>
          <h3 style="font-family: var(--font-display); font-weight: 800; font-size: 28px; letter-spacing: -0.02em; color: var(--fg-primary); margin-bottom: 12px;">Conta um pouco sobre <em style="color: var(--accent-amber); font-style: normal;">você.</em></h3>
          <p style="color: var(--fg-secondary); font-size: 15px; line-height: 1.55; margin-bottom: 24px;">Form curto, 5-7 perguntas (cerca de 3 minutos). Resposta da triagem em até 7 dias por email. Aprovado entra na newsletter quinzenal + convite pra WhatsApp Community. Sem spam, sem swap de lista.</p>

          <!--
            FORM DE ENTREVISTA — placeholder
            Sub-projeto separado: campos, perguntas, handler de submit e destino dos dados
            (Tally / Google Sheets / backend custom) a serem definidos pelo Henrique.
            Handler antigo `assets/js/newsletter-form.js` desativado.
          -->
          <div style="padding: 24px; border: 1px dashed var(--border-default); border-radius: 8px; text-align: center;">
            <p style="font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--fg-tertiary); margin-bottom: 8px;">FORM ABRE EM BREVE</p>
            <p style="color: var(--fg-secondary); font-size: 14px; line-height: 1.55; margin: 0;">Estamos finalizando o form de entrevista. Avise-nos por email se quiser ser notificado: <a href="mailto:contato@growthclub.pro?subject=Avisar%20quando%20o%20form%20abrir">contato@growthclub.pro</a>.</p>
          </div>
        </div>
```

- [ ] **Step 3: Render check**

Recarregue. Bloco do form atualizou: eye-label novo, H3 "Conta um pouco sobre você", lede sobre triagem, e em vez do form `<form class="form-newsletter">` aparece um placeholder centralizado dashed-border com "FORM ABRE EM BREVE" e link de email pra notificação.

Verifica que:
- O atributo `id="form"` no container externo permite anchor `/membro#form` (usado pela home/CTA).
- Console limpo (sem erro de form não encontrado).
- A âncora HTML está bem-formada (sem `<form>` órfão depois do Edit).

- [ ] **Step 4: Commit**

```bash
git add website/membro.html
git commit -m "$(cat <<'EOF'
copy(membro): substitui form Substack por placeholder form-entrevista

Remove `<form class="form-newsletter">` + input email + checkbox LGPD
(Substack signup direto). Coloca placeholder estrutural mantendo a
estética do card original — eye-label "CANDIDATURA · TIER GROWTH
HACKER (FREE)", H3 "Conta um pouco sobre você", lede sobre triagem,
e dashed-border interno com "FORM ABRE EM BREVE" + link de email
pra notificação.

Adiciona id="form" no container externo pra preservar âncoras
internas (/membro#form vindo da home).

Campos, perguntas, handler de submit e destino dos dados ficam pra
sub-projeto separado. Handler antigo `newsletter-form.js` será
desativado na Task 19.

Spec v1.1 §3.2 — Bloco do form de entrevista + decisão #2.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 10: Bloco Master 2027 — refinar copy (sem mudança visual)

**Files:**
- Modify: `website/membro.html:103, 116`

**Humanizer pass (v2 — pós cluster analysis):**
- H3: "Mentoria + benchmarks privados." → "Master abre quando tiver 100 pagantes na fila." (concretiza o gatilho em vez de prometer benefício antecipado).
- Lede: "Sem pre-sale forçado, sem promessa de dinheiro no curto prazo" (jargão estratégico interno) → "Sem pre-sale, sem promessa de data. Avisamos quando abrir." (concreto, sem jargão).
- **Adiciona argumento de preço Master:** "R$ 990/ano cabe no orçamento de quem já paga R$ 200-500/mês em ferramenta SaaS — com a diferença de ter pares na mesa, não dashboard." Tese vem do cluster analysis: 35,6% da base (196 pessoas) é Master-likely. Argumento ancora o preço em referência reconhecível (Notion premium, Linear, Figma) e troca "feature" por "presença humana".

- [ ] **Step 1: Render baseline**

http://localhost:8000/membro.html. Scroll até o card grande com gradient (Master 2027). H3 atual: "Mentoria + benchmarks privados.".

- [ ] **Step 2: Aplicar Edit (H3 + lede)**

Edit 1 — H3:
```
old_string:
          <h3 style="font-family: var(--font-display); font-weight: 900; font-size: clamp(36px, 4.6vw, 56px); line-height: 1; letter-spacing: -0.04em; color: var(--fg-primary); margin-bottom: 32px; max-width: 16ch; position: relative; z-index: 1;">Mentoria + benchmarks <em style="color: var(--accent-amber); font-style: normal;">privados.</em></h3>

new_string:
          <h3 style="font-family: var(--font-display); font-weight: 900; font-size: clamp(36px, 4.6vw, 56px); line-height: 1; letter-spacing: -0.04em; color: var(--fg-primary); margin-bottom: 32px; max-width: 18ch; position: relative; z-index: 1;">Master abre quando tiver <em style="color: var(--accent-amber); font-style: normal;">100 pagantes na fila.</em></h3>
```

Edit 2 — lede:
```
old_string:
          <p style="color: var(--fg-secondary); font-size: 16px; line-height: 1.7; max-width: 58ch; margin-bottom: 28px; position: relative; z-index: 1;">Mentoria quinzenal com Henrique, benchmarks privados (pricing, conversão por canal, salário senior+), deep editorial mensal. Sem pre-sale forçado, sem promessa de dinheiro no curto prazo.</p>

new_string:
          <p style="color: var(--fg-secondary); font-size: 16px; line-height: 1.7; max-width: 58ch; margin-bottom: 28px; position: relative; z-index: 1;">Mentoria quinzenal com Henrique, benchmarks privados de pricing, conversão por canal e salário senior+, deep editorial mensal. R$ 990/ano cabe no orçamento de quem já paga R$ 200-500/mês em ferramenta SaaS — com a diferença de ter pares na mesa, não dashboard. Sem pre-sale, sem promessa de data. Avisamos quando abrir.</p>
```

- [ ] **Step 3: Render check**

Recarregue. Card Master 2027 exibe nova H3 ("Master abre quando tiver 100 pagantes na fila") + nova lede. Preços, badge "Em breve · 2027", footer com gatilho continuam intactos.

`max-width: 16ch` virou `18ch` na H3 pra acomodar o texto mais longo sem quebra ruim.

- [ ] **Step 4: Commit**

```bash
git add website/membro.html
git commit -m "$(cat <<'EOF'
copy(membro): Master 2027 — concretiza H3 e remove jargão da lede

H3: "Mentoria + benchmarks privados" (promessa de benefício) vira
"Master abre quando tiver 100 pagantes na fila" (gatilho concreto).
max-width passa de 16ch para 18ch pra acomodar.

Lede: "Sem pre-sale forçado, sem promessa de dinheiro no curto
prazo" (jargão estratégico) vira "Sem pre-sale, sem promessa de
data. Avisamos quando abrir."

Spec v1.1 §3.2 — Master 2027.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 11: FAQ — substituir "Newsletter é mesmo grátis?" por "Como funciona a triagem?"

**Files:**
- Modify: `website/membro.html:126-141`

**Humanizer pass:**
- Pergunta nova: "Como funciona a triagem?" — alinha com o frame de candidatura introduzido na hero.
- Resposta nova: 4 elementos concretos (mecânica do form, critério qualitativo, prazo, resposta esperada nos 2 cenários).
- Refinar respostas das outras 3 perguntas pra remover "inscrição" → "triagem"/"candidatura" e adaptar o flow.

- [ ] **Step 1: Render baseline do FAQ**

http://localhost:8000/membro.html. Scroll até H2 "Perguntas frequentes." e 4 sub-cards (linhas 123-142).

- [ ] **Step 2: Aplicar Edit no bloco completo do FAQ**

```
old_string:
        <div class="stack" style="--space: 28px; margin-bottom: 64px;">
          <div>
            <h3 style="font-family: var(--font-display); font-weight: 700; font-size: 18px; color: var(--fg-primary); margin-bottom: 8px;">Newsletter é mesmo grátis?</h3>
            <p style="color: var(--fg-secondary); font-size: 15px; line-height: 1.6;">Sim. Tier Growth Hacker fica grátis em 2026 inteiro. Os primeiros 1.000 inscritos ganham lock de 12 meses sem custo mesmo quando Master abrir.</p>
          </div>
          <div>
            <h3 style="font-family: var(--font-display); font-weight: 700; font-size: 18px; color: var(--fg-primary); margin-bottom: 8px;">Como entro no WhatsApp?</h3>
            <p style="color: var(--fg-secondary); font-size: 15px; line-height: 1.6;">Depois de confirmar a inscrição na newsletter, você recebe convite por email em até 7 dias. Entrada manual com triagem leve pra manter a régua.</p>
          </div>
          <div>
            <h3 style="font-family: var(--font-display); font-weight: 700; font-size: 18px; color: var(--fg-primary); margin-bottom: 8px;">Vão me prospectar?</h3>
            <p style="color: var(--fg-secondary); font-size: 15px; line-height: 1.6;">Não. Lista é fechada pra terceiros. Nunca foi vendida, nunca foi trocada por swap. Política de não-contaminação editorial em <a href="/empresas">/empresas</a>.</p>
          </div>
          <div>
            <h3 style="font-family: var(--font-display); font-weight: 700; font-size: 18px; color: var(--fg-primary); margin-bottom: 8px;">Quando abre o Master?</h3>
            <p style="color: var(--fg-secondary); font-size: 15px; line-height: 1.6;">Em 2027. Sem data exata. Gatilho de abertura é: marca v1 publicada + site no ar com captação ativa + ≥100 Growth Hacker Master pagantes na fila.</p>
          </div>
        </div>

new_string:
        <div class="stack" style="--space: 28px; margin-bottom: 64px;">
          <div>
            <h3 style="font-family: var(--font-display); font-weight: 700; font-size: 18px; color: var(--fg-primary); margin-bottom: 8px;">Como funciona a triagem?</h3>
            <p style="color: var(--fg-secondary); font-size: 15px; line-height: 1.6;">Form curto com 5-7 perguntas pra a gente entender seu contexto — cargo, empresa, problema atual. Sem prova de currículo, sem pedir CV. Critério é qualitativo: dá pra sustentar conversa de operador? Resposta em até 7 dias por email. Aprovado entra na newsletter + recebe convite pra WhatsApp. Não aprovado recebe email educado com motivo.</p>
          </div>
          <div>
            <h3 style="font-family: var(--font-display); font-weight: 700; font-size: 18px; color: var(--fg-primary); margin-bottom: 8px;">Como entro no WhatsApp?</h3>
            <p style="color: var(--fg-secondary); font-size: 15px; line-height: 1.6;">Após a triagem ser aprovada, convite por email em até 7 dias. Entrada manual pra manter o sinal da Community.</p>
          </div>
          <div>
            <h3 style="font-family: var(--font-display); font-weight: 700; font-size: 18px; color: var(--fg-primary); margin-bottom: 8px;">Vão me prospectar?</h3>
            <p style="color: var(--fg-secondary); font-size: 15px; line-height: 1.6;">Não. A lista nunca foi vendida nem trocada por swap em 11 anos. Política de não-contaminação editorial completa em <a href="/empresas">/empresas</a>.</p>
          </div>
          <div>
            <h3 style="font-family: var(--font-display); font-weight: 700; font-size: 18px; color: var(--fg-primary); margin-bottom: 8px;">Quando abre o Master?</h3>
            <p style="color: var(--fg-secondary); font-size: 15px; line-height: 1.6;">Em 2027, sem data. Gatilho: marca v1 publicada + site no ar com captação ativa + ≥100 Growth Hacker Master pagantes na fila. Avisamos por email quando bater.</p>
          </div>
        </div>
```

- [ ] **Step 3: Render check**

Recarregue. FAQ exibe 4 perguntas, sendo a primeira agora "Como funciona a triagem?". As outras 3 mantêm título mas têm respostas refinadas.

- [ ] **Step 4: Commit**

```bash
git add website/membro.html
git commit -m "$(cat <<'EOF'
copy(membro): FAQ — substitui "grátis?" por "triagem?" + refinos

Pergunta nova "Como funciona a triagem?" alinha com o frame de
candidatura. Resposta tem 4 elementos: mecânica do form (5-7
perguntas), critério qualitativo, prazo (até 7 dias), resposta nos
2 cenários (aprovado/não-aprovado).

Pergunta "Newsletter é mesmo grátis?" sai (confirmava o óbvio — a
página inteira já comunica gratuidade).

Demais 3 perguntas: refinar respostas pra adaptar ao flow de
triagem ("Após a triagem ser aprovada..." em vez de "Após confirmar
a inscrição...").

Spec v1.1 §3.2 — FAQ.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 12: CTA inline final de /membro

**Files:**
- Modify: `website/membro.html:147-150`

**Humanizer pass:**
- H2: "Entra no clube hoje" (ornamental, "hoje" sem urgência factual) → "Aplicar pra entrar" (verbo direto, alinhado com o frame).
- Lede: descrição do flow de triagem.
- Botão: "Cadastrar email" → "Enviar candidatura". Link aponta pra `#form` (anchor adicionado na Task 9) em vez do JavaScript que focava o input do form Substack (que não existe mais).

- [ ] **Step 1: Render baseline**

http://localhost:8000/membro.html. Scroll até o fim. `.cta-inline` com H2 "Entra no clube hoje" + p + botão "Cadastrar email" com onclick JS.

- [ ] **Step 2: Aplicar Edit**

```
old_string:
    <section class="cta-inline">
      <div class="wrap">
        <h2>Entra no clube <em>hoje.</em></h2>
        <p>Newsletter quinzenal grátis. WhatsApp Community por convite após inscrição. Próxima edição em até 14 dias.</p>
        <a class="btn primary" href="#" onclick="document.querySelector('.form-newsletter input').focus(); return false;">Cadastrar email <i data-lucide="arrow-up-right"></i></a>
      </div>
    </section>

new_string:
    <section class="cta-inline">
      <div class="wrap">
        <h2>Aplicar pra <em>entrar.</em></h2>
        <p>Cadastro grátis com triagem leve. Form curto, 5-7 perguntas. Resposta em até 7 dias. WhatsApp Community por convite após aprovação.</p>
        <a class="btn primary" href="#form">Enviar candidatura <i data-lucide="arrow-up-right"></i></a>
      </div>
    </section>
```

- [ ] **Step 3: Render check**

Recarregue. CTA inline exibe H2 nova, lede sobre triagem, botão "Enviar candidatura". Click no botão deve scrollar pra `#form` (o card do form de entrevista — adicionado na Task 9). Console limpo (sem erro do onclick removido).

- [ ] **Step 4: Commit**

```bash
git add website/membro.html
git commit -m "$(cat <<'EOF'
copy(membro): CTA inline final — "aplicar pra entrar" + anchor #form

H2: "Entra no clube hoje" vira "Aplicar pra entrar" (verbo direto,
alinhado com frame de candidatura).

Lede: descreve flow de triagem (5-7 perguntas, resposta em até 7
dias, WhatsApp por convite após aprovação).

Botão: "Cadastrar email" vira "Enviar candidatura". onclick que
focava `.form-newsletter input` (form que não existe mais) é
removido — botão usa anchor href="#form" pra rolar até o card do
form de entrevista (Task 9).

Spec v1.1 §3.2 — CTA inline final.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Bloco Empresas (`website/empresas.html`)

### Task 13: Hero-sub + TOC sidebar

**Files:**
- Modify: `website/empresas.html:37-43`
- Modify: `website/empresas.html:52-59`

**Humanizer pass (v2 — pós cluster analysis):**
- H1: "Encontrar, contratar, patrocinar" (rule of three ornamental) → "Patrocinar a comunidade. Falar com 2.261 operadores B2B." (factual, com número).
- Lede: adiciona perfil expandido em léxico nativo — "marketing, vendas consultivas, RevOps, geração de demanda" (mesma listagem que apareceu no cluster analysis como auto-descrição dominante). Mantém setores reais ("SaaS, indústria, serviços recorrentes").
- TOC: labels "Vagas", "Hunting", "Mentoria" ganham qualificador "(em construção)" pra deixar estágio explícito sem usar a pill amarela "em breve".

- [ ] **Step 1: Render baseline da hero-sub + TOC**

http://localhost:8000/empresas.html. Hero-sub atual: H1 "Encontrar, contratar, patrocinar" + lede + meta-row. Sidebar TOC com 5 itens.

- [ ] **Step 2: Aplicar Edit no hero**

```
old_string:
        <span class="kicker">Para empresas · B2B</span>
        <h1 class="page-title">Encontrar, contratar, <em>patrocinar.</em></h1>
        <p class="page-lede">Comunidade ultra-qualificada de operadores B2B de growth. 2.261 leitores na newsletter, 715 ativos na Community, core group de 391 pessoas que apareceram cara-a-cara. Audiência senior+ qualificada.</p>

new_string:
        <span class="kicker">Para empresas · B2B</span>
        <h1 class="page-title">Patrocinar a comunidade. Falar com <em>2.261 operadores B2B.</em></h1>
        <p class="page-lede">Audiência B2B mid-career (30-44 anos) em marketing com pipeline, vendas consultivas, RevOps e geração de demanda. 2.261 leitores na newsletter (sub orgânico desde 2019), 715 ativos na WhatsApp Community, core group de 391 que aparecem em meetup. SaaS, indústria e serviços recorrentes.</p>
```

- [ ] **Step 3: Aplicar Edit no TOC**

```
old_string:
          <aside class="toc">
            <h4>Formatos</h4>
            <ul>
              <li><a href="#patrocinio" class="active">01 / Patrocínio</a></li>
              <li><a href="#vagas">02 / Vagas</a></li>
              <li><a href="#hunting">03 / Hunting</a></li>
              <li><a href="#mentoria">04 / Mentoria</a></li>
              <li><a href="#nao-contaminacao">05 / Não-contaminação editorial</a></li>
            </ul>
          </aside>

new_string:
          <aside class="toc">
            <h4>Formatos</h4>
            <ul>
              <li><a href="#patrocinio" class="active">01 / Patrocínio</a></li>
              <li><a href="#vagas">02 / Vagas <span style="color: var(--fg-tertiary); font-weight: 400;">(em construção)</span></a></li>
              <li><a href="#hunting">03 / Hunting <span style="color: var(--fg-tertiary); font-weight: 400;">(em construção)</span></a></li>
              <li><a href="#mentoria">04 / Mentoria B2B <span style="color: var(--fg-tertiary); font-weight: 400;">(em construção)</span></a></li>
              <li><a href="#nao-contaminacao">05 / Não-contaminação editorial</a></li>
            </ul>
          </aside>
```

- [ ] **Step 4: Render check**

Recarregue /empresas.html. Hero-sub novo. TOC sidebar mostra 5 itens, 3 com "(em construção)" em cor `--fg-tertiary` (cinza claro).

Verifica que scrollspy ainda destaca o item ativo enquanto rola pelas sections (o JS `assets/js/scrollspy.js` deve continuar funcionando — adicionamos apenas `<span>` dentro do `<a>`, não removemos atributos).

- [ ] **Step 5: Commit**

```bash
git add website/empresas.html
git commit -m "$(cat <<'EOF'
copy(empresas): hero-sub factual + TOC com label "em construção"

Hero-sub:
- H1 "Encontrar, contratar, patrocinar" (rule of three ornamental)
  vira "Patrocinar a comunidade. Falar com 2.261 operadores B2B."
  (factual, com número).
- Lede ganha contexto "(sub orgânico desde 2019)" e nomeia setores
  reais (SaaS, indústria, serviços recorrentes).

TOC sidebar: labels Vagas / Hunting / Mentoria ganham
"(em construção)" em cinza claro pra marcar estágio sem usar a
pill amarela "em breve" do tile. Decisão Henrique: manter os 5
itens da TOC (não colapsar 5→3).

Spec v1.1 §3.3 — Hero + TOC.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 14: Bloco 01 — Patrocínio

**Files:**
- Modify: `website/empresas.html:63-68`

**Humanizer pass:**
- H2: "Livecast e meetup com marca aberta" → "Patrocínio de livecast e meetup, marca aberta" (verbo no infinitivo vira substantivo — mais direto).
- Parágrafo 1: concretiza com mecânica (1 patrocinador/edição, slot 5-7 min, logo na vinheta).
- Parágrafo 2: muda "em breve no site público" (placeholder vago) por edições disponíveis reais com datas.

- [ ] **Step 1: Render baseline**

http://localhost:8000/empresas.html#patrocinio. Section #patrocinio com H2 + 2 parágrafos.

- [ ] **Step 2: Aplicar Edit**

```
old_string:
            <section id="patrocinio">
              <div class="s-num">01 / PATROCÍNIO</div>
              <h2>Livecast e meetup <em>com marca aberta.</em></h2>
              <p>Você patrocina, a gente marca como patrocínio. Sem disfarce. Sem painel-disfarçado-de-conteúdo. O livecast mensal e o meetup presencial trimestral aceitam um patrocinador por edição, com slot de fala no fim e logo na vinheta.</p>
              <p>Mídia kit completo, breakdown de audiência e formatos disponíveis em <a href="/docs/sponsors">/docs/sponsors</a> (em breve no site público). Solicitação direta: <a href="mailto:parceiros@growthclub.pro">parceiros@growthclub.pro</a>.</p>
            </section>

new_string:
            <section id="patrocinio">
              <div class="s-num">01 / PATROCÍNIO</div>
              <h2>Patrocínio de livecast e meetup, <em>marca aberta.</em></h2>
              <p>1 patrocinador por edição. Logo na vinheta, slot de fala no encerramento (5-7 min), menção curta no replay. Disclosure no início e fim. Sem "painel-com-3-founders-2-vendendo-ferramenta".</p>
              <p>Mídia kit com breakdown de audiência por cargo, canal e setor — solicite por email. Edições disponíveis pros próximos 6 meses: 2 livecasts (jul, ago/2026) + meetup SP · S1 · E1 (jun/2026). Contato: <a href="mailto:parceiros@growthclub.pro">parceiros@growthclub.pro</a>.</p>
            </section>
```

- [ ] **Step 3: Render check**

Recarregue e foca em #patrocinio. H2 nova, parágrafos com mecânica concreta. Link `/docs/sponsors` removido (não existe ainda — substituído por "solicite por email").

- [ ] **Step 4: Commit**

```bash
git add website/empresas.html
git commit -m "$(cat <<'EOF'
copy(empresas): bloco 01 patrocínio — concretiza mecânica

H2: "Livecast e meetup com marca aberta" vira "Patrocínio de
livecast e meetup, marca aberta" (substantivo direto).

§1: concretiza com mecânica real (1 patrocinador/edição, slot 5-7
min, logo na vinheta, disclosure início e fim).

§2: remove link `/docs/sponsors` (vaporware) e link "(em breve no
site público)". Substitui por edições disponíveis reais com datas
(2 livecasts jul/ago + meetup SP S1E1 jun/2026).

Spec v1.1 §3.3 — Bloco 01.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 15: Bloco 02 — Vagas (em construção)

**Files:**
- Modify: `website/empresas.html:70-75`

**Humanizer pass:**
- Pill: "em breve" → "em construção" (alinha com TOC).
- H2: "Job board curado" — mantém porque já é específico.
- Parágrafo 1: concretiza mecânica (card editado com remuneração, stack, timing). Tom mais direto.
- Parágrafo 2: marca quando abre ("2º semestre de 2026, após Crew #3").

- [ ] **Step 1: Render baseline**

http://localhost:8000/empresas.html#vagas. Section #vagas com H2 + pill "em breve" + 2 parágrafos.

- [ ] **Step 2: Aplicar Edit**

```
old_string:
            <section id="vagas">
              <div class="s-num">02 / VAGAS</div>
              <h2>Job board <em>curado.</em> <span class="pill" style="margin-left: 8px;">em breve</span></h2>
              <p>Vamos abrir um job board específico pra vaga de growth B2B (founder, CRO, growth lead, dev de growth, analista, CS). Sem post solto na Community — vaga vira card editado, com expectativa de remuneração, stack e timing publicados.</p>
              <p>Modelo: tarifa fixa por vaga ativa por 30 dias. Disclosure de empresa anunciando. Curadoria de elegibilidade (não toda empresa entra). Solicitar antecipadamente: <a href="mailto:parceiros@growthclub.pro">parceiros@growthclub.pro</a>.</p>
            </section>

new_string:
            <section id="vagas">
              <div class="s-num">02 / VAGAS</div>
              <h2>Job board <em>curado.</em> <span class="pill" style="margin-left: 8px;">em construção</span></h2>
              <p>Vaga de growth B2B vira card editado com remuneração, stack e timing — não post solto na Community. Tarifa fixa por vaga ativa por 30 dias. Sem boost, sem cross-posting.</p>
              <p>Abrindo no 2º semestre de 2026, depois da Founder Crew #3 (community manager) preenchida. Pra ser avisado quando abrir: <a href="mailto:parceiros@growthclub.pro?subject=Vagas">parceiros@growthclub.pro</a> com assunto "vagas".</p>
            </section>
```

- [ ] **Step 3: Render check**

Recarregue #vagas. Pill mostra "em construção". §1 e §2 com texto novo. Link de email tem `?subject=Vagas` pra pré-preencher assunto.

- [ ] **Step 4: Commit**

```bash
git add website/empresas.html
git commit -m "$(cat <<'EOF'
copy(empresas): bloco 02 vagas — em construção + mecânica clara

Pill: "em breve" → "em construção" (alinha TOC sidebar).

§1: enxuga mecânica — "Vaga de growth B2B vira card editado com
remuneração, stack e timing. Tarifa fixa por vaga ativa por 30
dias. Sem boost, sem cross-posting."

§2: marca quando abre — "2º semestre de 2026, depois da Founder
Crew #3 preenchida". Link mailto ganha ?subject=Vagas.

Spec v1.1 §3.3 — Bloco 02.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 16: Bloco 03 — Hunting (em construção)

**Files:**
- Modify: `website/empresas.html:77-82`

**Humanizer pass (v2 — pós cluster analysis):**
- Pill: "em breve" → "em construção".
- H2: "Indicação de operadores" → "Indicação via core group" (especifica o canal — core group de 391 é o ativo real).
- **Adiciona tese-frase pra founders** na abertura do bloco: "Você é founder e precisa de senior+ B2B? O core group tem operadores na sua cadeira." Tese vem do cluster analysis (persona 4 Founder Bootstrappado Cético — 8% da base, alto LTV).
- Parágrafo 1: nomeia o critério (senior+) e o ativo (core de 391 pessoas em meetup).
- Parágrafo 2: explicita gating (a partir de 2H/26, primeiro com patrocinadores).

- [ ] **Step 1: Render baseline**

http://localhost:8000/empresas.html#hunting. Section #hunting com H2 + pill + 2 parágrafos.

- [ ] **Step 2: Aplicar Edit**

```
old_string:
            <section id="hunting">
              <div class="s-num">03 / HUNTING</div>
              <h2>Indicação <em>de operadores.</em> <span class="pill" style="margin-left: 8px;">em breve</span></h2>
              <p>Pra empresa procurando contratar perfil senior+ de growth B2B, fazemos indicação direta a partir do core group. Não é recrutamento agressivo — é troca de operador com operador, com transparência das duas pontas.</p>
              <p>Modelo: fee fixo por indicação convertida em contratação. Sem garantia, sem retainer, sem prospect frio. Conversa primeiro: <a href="mailto:parceiros@growthclub.pro">parceiros@growthclub.pro</a>.</p>
            </section>

new_string:
            <section id="hunting">
              <div class="s-num">03 / HUNTING</div>
              <h2>Indicação <em>via core group.</em> <span class="pill" style="margin-left: 8px;">em construção</span></h2>
              <p>Você é founder e precisa de senior+ B2B? O core group de 391 pessoas que aparecem em meetup tem operadores na sua cadeira. Fee fixo por contratação efetivada. Sem retainer, sem prospect frio.</p>
              <p>Abrindo caso a caso a partir de 2H/26 — primeiro com empresas patrocinadoras do livecast/meetup que precisam de senior+ específico. Pra abrir conversa: <a href="mailto:parceiros@growthclub.pro?subject=Hunting">parceiros@growthclub.pro</a> com assunto "hunting".</p>
            </section>
```

- [ ] **Step 3: Render check**

Recarregue #hunting. H2 nova, parágrafos com critério (senior+ B2B) e ativo (core de 391) explícitos.

- [ ] **Step 4: Commit**

```bash
git add website/empresas.html
git commit -m "$(cat <<'EOF'
copy(empresas): bloco 03 hunting — em construção + gating explícito

Pill: "em breve" → "em construção".

H2: "Indicação de operadores" vira "Indicação via core group"
(especifica o canal — core de 391 é o ativo real).

§1: nomeia critério (senior+ B2B) e ativo (core de 391 que aparecem
em meetup). "Fee fixo por contratação efetivada. Sem retainer, sem
prospect frio."

§2: gating explícito — "a partir de 2H/26, primeiro com empresas
patrocinadoras". Link mailto ganha ?subject=Hunting.

Spec v1.1 §3.3 — Bloco 03.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 17: Bloco 04 — Mentoria B2B (em construção)

**Files:**
- Modify: `website/empresas.html:84-89`

**Humanizer pass (v2 — pós cluster analysis):**
- Pill: "em breve" → "em construção".
- Numeração: "04 / MENTORIA" → "04 / MENTORIA B2B" (especifica que é workshop pra time interno, não 1:1 individual — diferencia do Master que aparecerá futuramente como tier).
- H2: "Workshop aplicado" → "Workshop aplicado pra time interno — agentes, automação, fluxos." Adiciona léxico vibe-coder do cluster analysis (persona 5 Vibe-Coder IA-Curioso — 64 pessoas, 11,6% da base). Termos "agentes" e "automação inteligente" aparecem repetidamente nas auto-descrições da persona; ressoam muito mais que "workshop aplicado".
- Parágrafo 1: nomeia AI LIKE A PRO + número real (R$ 397/aluno, 7 alunos em 2 turmas) + plug do léxico "automação inteligente" e "fluxos".
- Parágrafo 2: gating (Founder Crew #2 preenchida) + how-to com `?subject=`.

- [ ] **Step 1: Render baseline**

http://localhost:8000/empresas.html#mentoria. Section #mentoria com H2 + pill + 2 parágrafos.

- [ ] **Step 2: Aplicar Edit**

```
old_string:
            <section id="mentoria">
              <div class="s-num">04 / MENTORIA</div>
              <h2>Workshop <em>aplicado.</em> <span class="pill" style="margin-left: 8px;">em breve</span></h2>
              <p>Workshop intensivo aplicado pra time interno (growth, RevOps, AI). Formato AI LIKE A PRO é o que está rodando hoje em modelo high-ticket. Próximas turmas em <a href="/recursos/workshops">/recursos/workshops</a>.</p>
              <p>Personalização pra time da empresa: <a href="mailto:workshops@growthclub.pro">workshops@growthclub.pro</a>.</p>
            </section>

new_string:
            <section id="mentoria">
              <div class="s-num">04 / MENTORIA B2B</div>
              <h2>Workshop aplicado pra time interno <em>— agentes, automação, fluxos.</em> <span class="pill" style="margin-left: 8px;">em construção</span></h2>
              <p>Formato AI LIKE A PRO já roda como produto independente (R$ 397/aluno, 7 alunos em 2 turmas confirmadas). Pega processo manual, automação inteligente e fluxos de IA aplicada ao comercial — operadores aprendendo IA aplicada, não influencer ensinando ChatGPT.</p>
              <p>Versão custom pra time interno entra na fila quando a Founder Crew #2 (designer + vídeo) estiver preenchida. Sem data confirmada. Quem quiser fila prioritária: <a href="mailto:parceiros@growthclub.pro?subject=Mentoria%20B2B">parceiros@growthclub.pro</a> com assunto "mentoria b2b" + número de pessoas + outcome esperado.</p>
            </section>
```

- [ ] **Step 3: Render check**

Recarregue #mentoria. Numeração "04 / MENTORIA B2B" (com sufixo "B2B"). H2 "Workshop aplicado pra time interno". §1 nomeia AI LIKE A PRO com números reais (R$ 397, 7 alunos). §2 gating + mailto com assunto.

Link `/recursos/workshops` foi removido — verifica se há outro link interno apontando pra esta página (não bloqueia, mas anota pra Task 20).

- [ ] **Step 4: Commit**

```bash
git add website/empresas.html
git commit -m "$(cat <<'EOF'
copy(empresas): bloco 04 mentoria B2B — em construção + números reais

Pill: "em breve" → "em construção".

Numeração: "04 / MENTORIA" → "04 / MENTORIA B2B" (diferencia de
Master 1:1 individual; especifica workshop pra time interno).

H2: "Workshop aplicado" → "Workshop aplicado pra time interno"
(especifica destino).

§1: nomeia AI LIKE A PRO + números reais (R$ 397/aluno, 7 alunos
em 2 turmas confirmadas). Gating: Founder Crew #2 (designer +
vídeo) preenchida.

§2: how-to concreto — assunto "mentoria b2b" + número de pessoas
+ outcome esperado.

Spec v1.1 §3.3 — Bloco 04.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 18: Bloco 05 — Não-contaminação editorial (refinos)

**Files:**
- Modify: `website/empresas.html:100-101`

**Humanizer pass:**
- §1: "Conteúdo de meetup é definido pelo time editorial, não pelo patrocinador" → "Pauta de meetup é definida internamente" (mais direto). "Sem exceção, sem 'estudo de caso especial', sem disclosure escondido no final" → "Sem 'estudo de caso especial', sem disclosure no rodapé em letra miúda" (concretiza onde o disclosure costuma se esconder).
- §2: adiciona prova factual — "a gente já viu acontecer com outros 3 grupos do mesmo nicho desde 2018".

- [ ] **Step 1: Render baseline**

http://localhost:8000/empresas.html#nao-contaminacao. Section #nao-contaminacao com pull-quote + 2 parágrafos + author-strip.

- [ ] **Step 2: Aplicar Edit (apenas os 2 parágrafos — pull-quote, H2 e author-strip mantêm)**

```
old_string:
              <p>A newsletter editorial nunca é vendida pra patrocinador. Conteúdo de meetup é definido pelo time editorial, não pelo patrocinador. Quem patrocina sabe disso antes de assinar. Sem exceção, sem "estudo de caso especial", sem disclosure escondido no final.</p>
              <p>Esse princípio é o que protege a audiência. Sem ele, a comunidade vira sales channel de quem paga mais — e nenhum operador senior+ topa ficar.</p>

new_string:
              <p>A newsletter editorial nunca é vendida pra patrocinador. Pauta de meetup é definida internamente. Quem patrocina assina sabendo. Sem "estudo de caso especial", sem disclosure no rodapé em letra miúda.</p>
              <p>Esse princípio protege a audiência. Sem ele, a comunidade vira sales channel de quem paga mais. Operador senior+ não topa ficar nesse modelo, e a gente já viu acontecer com outros 3 grupos do mesmo nicho desde 2018.</p>
```

- [ ] **Step 3: Render check**

Recarregue #nao-contaminacao. Pull-quote ("Patrocínio paga slot...") intacto. §1 e §2 com texto refinado. Author-strip (GC avatar + parceiros@) intacto.

- [ ] **Step 4: Commit**

```bash
git add website/empresas.html
git commit -m "$(cat <<'EOF'
copy(empresas): bloco 05 não-contaminação — concretiza onde disclosure
se esconde + adiciona prova de risco

§1: "Sem exceção, sem 'estudo de caso especial', sem disclosure
escondido no final" vira "Sem 'estudo de caso especial', sem
disclosure no rodapé em letra miúda" — concretiza onde costuma se
esconder (rodapé) e como (letra miúda). Remove "sem exceção" (frase
oca quando vem sem contexto).

§2: adiciona prova factual de risco — "a gente já viu acontecer
com outros 3 grupos do mesmo nicho desde 2018".

Pull-quote ("Patrocínio paga slot de patrocínio. Não paga linha de
conteúdo editorial.") preservado — locked.

Spec v1.1 §3.3 — Bloco 05.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Bloco JS (handler desativação)

### Task 19: Desativar `<script src="/assets/js/newsletter-form.js">` em home e membro

**Files:**
- Modify: `website/index.html:233`
- Modify: `website/membro.html:160`

**Justificativa:** o handler antigo POSTava `<form class="form-newsletter">` pro endpoint do Substack. Não há mais `.form-newsletter` em nenhuma página (Task 9 substituiu por placeholder). Mantém o script carregado seria carga JS inútil + pode tentar bindar a elementos que não existem (sem erro, mas dead code).

**Decisão:** comentar a tag (não deletar). Permite reverter rápido se o sub-projeto futuro decidir reutilizar parte do handler.

- [ ] **Step 1: Aplicar Edit em `website/index.html:233`**

```
old_string:
  <script src="/assets/js/newsletter-form.js"></script>

new_string:
  <!-- <script src="/assets/js/newsletter-form.js"></script> — desativado em 2026-05-18, form Substack removido (spec v1.1). Reativa quando sub-projeto do form de entrevista decidir reutilizar handler. -->
```

- [ ] **Step 2: Aplicar Edit em `website/membro.html:160`**

```
old_string:
  <script src="/assets/js/newsletter-form.js"></script>

new_string:
  <!-- <script src="/assets/js/newsletter-form.js"></script> — desativado em 2026-05-18, form Substack removido (spec v1.1). Reativa quando sub-projeto do form de entrevista decidir reutilizar handler. -->
```

- [ ] **Step 3: Render check em ambas as páginas**

Recarregue http://localhost:8000/ e http://localhost:8000/membro.html. Console deve continuar limpo (sem erro). Network tab no DevTools: `newsletter-form.js` não deve mais aparecer como requisição em nenhuma das 2 páginas.

- [ ] **Step 4: Commit**

```bash
git add website/index.html website/membro.html
git commit -m "$(cat <<'EOF'
chore(site): desativar newsletter-form.js handler em home e membro

Form `<form class="form-newsletter">` foi removido em todas as
páginas (spec v1.1 §3.2 — substituído por placeholder do form de
entrevista). Handler antigo POSTava no endpoint do Substack — sem
form pra bindar, vira dead code.

Tag <script> comentada (não deletada) pra permitir revert rápido
se o sub-projeto futuro do form de entrevista decidir reutilizar
parte do handler. Arquivo `assets/js/newsletter-form.js` mantido
no disco.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Validação final

### Task 20: Render final + checklist de não-regressão

**Files:**
- N/A (validação visual nas 3 páginas)

**Justificativa:** depois de 19 commits, vale uma passagem completa pelas 3 páginas pra confirmar que (a) layout AD-008 ficou intacto, (b) ícones Lucide carregam, (c) anchors internos funcionam, (d) responsivo não quebrou em mobile.

- [ ] **Step 1: Hard refresh nas 3 páginas + inspeção desktop**

URLs:
- http://localhost:8000/ (home)
- http://localhost:8000/membro.html
- http://localhost:8000/empresas.html

Checklist desktop (viewport ≥1280px):
- [ ] Home: hero exibe lede nova, stats-row com 5 stats, 2 CTAs (Tornar-se membro + Ver os 4 espaços) intactos.
- [ ] Home: problem-grid em 4 colunas, cards exibem comparativos com número.
- [ ] Home: layers em layout 2col (label + corpo), 4 layers visíveis.
- [ ] Home: timeline em 4 colunas, "MAIO/26" mostra "Founder Crew preenchido" (sem "Era Pré-S1").
- [ ] Home: closer único após timeline com H2 + parágrafo + blockquote + cite + CTA "Tornar-se membro".
- [ ] Home: sem reflow quebrado entre seções; transições dark/light intactas.
- [ ] Membro: hero-sub com H1 "Aplicar pra entrar na mesa de canto".
- [ ] Membro: split-two com "Pra quem é" (4 bullets) e "Pra quem não é" (5 bullets).
- [ ] Membro: card cream/raised com `id="form"`, eye-label "CANDIDATURA · TIER GROWTH HACKER (FREE)", H3 "Conta um pouco sobre você", placeholder dashed-border com "FORM ABRE EM BREVE".
- [ ] Membro: card Master 2027 com H3 nova ("Master abre quando tiver 100 pagantes na fila"), preços R$ 690/R$ 990 intactos, badge "Em breve · 2027".
- [ ] Membro: FAQ com 4 perguntas, sendo a 1ª "Como funciona a triagem?".
- [ ] Membro: CTA inline final com botão "Enviar candidatura" — click rola pra `#form` no topo da seção do card amber.
- [ ] Empresas: hero-sub com H1 "Patrocinar a comunidade. Falar com 2.261 operadores B2B.".
- [ ] Empresas: TOC sidebar com 5 itens; 3 com "(em construção)" em cor `--fg-tertiary`.
- [ ] Empresas: 5 sections renderizam — Patrocínio / Vagas / Hunting / Mentoria B2B / Não-contaminação.
- [ ] Empresas: scrollspy destaca item ativo do TOC enquanto rola.

- [ ] **Step 2: Inspeção mobile (DevTools → device mode → iPhone 13)**

Viewport ≤390px:
- [ ] Home: hero colapsa stats-row em grid 2col ou 1col, sem cortar números.
- [ ] Home: problem-grid em 1col, cards empilhados.
- [ ] Home: layers em 1col (sem split 2col), corpo abaixo do label.
- [ ] Home: timeline em 1col.
- [ ] Home: closer dark intacto em mobile.
- [ ] Membro: hero-sub legível, kicker em uma linha.
- [ ] Membro: split-two em 1col empilhada.
- [ ] Membro: card form-entrevista mantém padding confortável, placeholder dashed-border centralizado.
- [ ] Membro: card Master 2027 reflui (preços em coluna).
- [ ] Empresas: TOC sidebar some ou colapsa em sticky-bottom (depende do CSS atual — verificar comportamento atual antes de marcar como regressão).

- [ ] **Step 3: Console + Network limpos**

DevTools → Console: nenhum erro vermelho em nenhuma das 3 páginas. Warnings de Lucide são OK.

DevTools → Network: `newsletter-form.js` não aparece como request em nenhuma das 3 páginas. `lucide` (CDN), `tokens.css`, `components.css`, `chrome.css`, `pages.css`, `header.js`, `footer.js`, `scrollspy.js` (só em /empresas) continuam carregando.

- [ ] **Step 4: Screenshot pós-refino (comparação com baseline)**

Tire 3 screenshots full-page (uma por página) e salve em `/tmp/post-refino-home.png`, `/tmp/post-refino-membro.png`, `/tmp/post-refino-empresas.png`. Compare lado a lado com baselines de Task 0:
- Tipografia: Satoshi/Roboto inalterados.
- Paleta: Pub Cream + Amber + Teal mantidas.
- Spacing: sem mudança drástica de altura (a home pode ficar levemente mais curta por causa do colapso do manifesto-closer; aceitável).
- Layout: nenhum grid quebrou; nenhum card transbordou container.

Se passou em tudo: commit final só pro registro de validação (sem mudança de arquivo).

- [ ] **Step 5: Commit "validação completa"**

```bash
git commit --allow-empty -m "$(cat <<'EOF'
chore(site): validação completa do refino home/membro/empresas v1.1

Render check passou nas 3 páginas em desktop + mobile. Console
limpo, network sem regressões, anchors internos funcionando,
scrollspy de /empresas intacto.

Plano executado: 19 commits de copy + 1 commit de desativação JS.

Próximo passo: deploy via wrangler pages deploy.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Deploy + sync de docs

### Task 21: Deploy via wrangler + sync STATE.md / ROADMAP.md

**Files:**
- Modify: `.specs/project/STATE.md` (append AD-011 ou similar — registrar o refino)
- Modify: `.specs/project/ROADMAP.md` (Sprint Log: nova entrada Sprint 4)
- Modify: `CHANGELOG.md` (entry pública filtrada)

**Justificativa:** spec aprovada + plan executado + validação OK → fechar o loop com (a) deploy em produção, (b) ADR de fechamento em STATE.md (append-only), (c) Sprint log no ROADMAP.md, (d) entry pública no CHANGELOG.md.

- [ ] **Step 1: Deploy via wrangler**

Run:
```bash
cd /Users/henriquecaner/Documents/GitHub/Growth-Club && wrangler pages deploy website --project-name growth-club --branch main
```

Expected output: `✨ Deployment complete! Take a peek over at https://<hash>.growth-club.pages.dev`

Aguarde DNS propagation (~1-2 min) e abra https://growthclub.pro/ em browser limpo (incognito) pra confirmar que mudanças estão no ar.

- [ ] **Step 2: Append AD-011 em STATE.md**

Edit `.specs/project/STATE.md` adicionando AD-011 logo após o "## Recent Decisions (ADR)" e antes do AD-010 atual:

```markdown
### AD-011: Refino de copy home/membro/empresas v1.1
**Date:** 2026-05-18
**Status:** Accepted

**Context:** Site v1 foi pro ar em 2026-05-17 (AD-006/007) com Design System AD-008 aplicado. Em revisão pelo Henrique, três páginas centrais — home, membro, empresas — falharam no teste de leitura por 3 failure modes: (a) jargão interno indecifrável (régua editorial #1, ton-anchor, mesa de canto, Era Pré-S1, Outlaw+Sage), (b) Outlaw sem Sage — bashing sem número comparativo que sustente, (c) value prop fraco — CTA da home levava ao Substack sem nunca explicar por que dar o email.

**Decision:** Refino editorial cirúrgico aplicado nas 3 páginas seguindo spec `2026-05-18-copy-refino-home-membro-empresas-design.md` v1.1 (commit `d45c78e`) e plan `2026-05-18-copy-refino-home-membro-empresas.md`. 4 decisões consolidadas no review:

1. Hero da home: CTA primário **mantém "Tornar-se membro"**.
2. Form Substack signup **removido de todas as páginas**. Captação acontece exclusivamente em `/membro` via form de entrevista (campos/handler em sub-projeto separado). Hero da home sem form embutido.
3. Bloco "Edição típica" da home **cortado**.
4. `/empresas` **mantém os 5 blocos** originais; refino bloco a bloco, sem colapsar.

Frame editorial de `/membro` reposicionado de "cadastro grátis 1-clique" pra "candidatura com triagem leve". Tier continua free (Growth Hacker) — gratuidade preservada, triagem é qualitativa.

**Consequences:**
- 19 commits de copy + 1 commit de desativação JS + 1 commit de validação + 1 commit de deploy/sync. Granularidade permite revert por bloco.
- Handler `assets/js/newsletter-form.js` desativado (tag comentada em ambas as páginas). Arquivo mantido no disco pra possível reutilização no sub-projeto futuro.
- Sub-projeto separado **Form de entrevista em `/membro`** fica aberto: Henrique vai passar campos, perguntas, handler de submit e destino dos dados em sessão futura. Até lá, placeholder "FORM ABRE EM BREVE" comunica o estágio.
- Métrica de sucesso primária: candidaturas/semana via /membro nas 4 semanas pós-deploy vs baseline pré-refino. Esperado: ≥20% de subida ou revisitar diretrizes.

**Alternatives considered:**
- Manter form Substack signup direto em `/membro` (descartado em decisão #2 do review — frame de candidatura é mais coerente com Outlaw+Sage).
- Colapsar `/empresas` de 5 pra 3 blocos (descartado em decisão #4 — sinaliza ambição/escopo total).
- Adicionar bloco "Edição típica" na home com case representativo (descartado em decisão #3 — evita risco de case fabricado).
- Trocar CTA primário pra "Receber a próxima edição" (descartado em decisão #1 — com form de triagem, "Tornar-se membro" volta a fazer sentido literal).

---
```

Atualize também a linha 2 (`**Last Updated:** ...`) pra `2026-05-18`.

- [ ] **Step 3: Append Sprint 4 em ROADMAP.md (após Sprint 3)**

Edit `.specs/project/ROADMAP.md`:

```markdown
### Sprint 4 — 2026-05-18
**Focus:** Refino editorial de home/membro/empresas v1.1 (3 páginas centrais)
**Status:** [DONE] — deploy em produção, AD-011 registrada
- [x] Spec do refino escrita (`2026-05-18-copy-refino-...md` v1.0)
- [x] Spec consolidada com 4 decisões do Henrique no review (v1.1, commit `d45c78e`)
- [x] Plan de implementação escrito (`docs/superpowers/plans/2026-05-18-copy-refino-...md`)
- [x] 21 tasks executadas em commits granulares
- [x] Render validado em desktop + mobile, console limpo
- [x] Handler `newsletter-form.js` desativado em home e membro
- [x] Deploy via `wrangler pages deploy website --project-name growth-club --branch main`
- [x] AD-011 registrada em STATE.md
- [ ] **Sub-projeto pendente:** form de entrevista em /membro (campos + handler + destino dos dados) — aguarda Henrique passar os campos
- [ ] **Métrica pós-deploy** (janela 4 semanas): candidaturas/semana via /membro vs baseline pré-refino, alvo ≥20% de subida
```

- [ ] **Step 4: CHANGELOG.md entry pública**

Edit `CHANGELOG.md` adicionando no topo da seção apropriada (formato deve seguir o padrão existente — verifique antes):

```markdown
## 2026-05-18 — Refino editorial v1.1 (AD-011)

Refino de copy nas 3 páginas centrais: home, membro, empresas. Frame de
entrada na comunidade reposicionado de "cadastro grátis 1-clique" pra
"candidatura com triagem leve" — tier free preservado, triagem é
qualitativa. /empresas refinada bloco a bloco, mantendo as 5 ofertas
com label "em construção" onde aplicável.

Decisões consolidadas: hero da home mantém CTA "Tornar-se membro";
form Substack removido de todas as páginas (substituído por placeholder
do form de entrevista em /membro); bloco "Edição típica" da home
cortado; /empresas mantém os 5 blocos.

Próximo: sub-projeto separado pra definir campos, perguntas, handler
de submit e destino dos dados do form de entrevista.
```

- [ ] **Step 5: Commit final**

```bash
git add .specs/project/STATE.md .specs/project/ROADMAP.md CHANGELOG.md
git commit -m "$(cat <<'EOF'
docs: AD-011 + ROADMAP Sprint 4 + CHANGELOG — refino home/membro/empresas v1.1

Fecha o loop do refino editorial:
- AD-011 em STATE.md (append-only, decisão + consequências + alternativas)
- Sprint 4 em ROADMAP.md (DONE, com sub-projeto form-entrevista pendente)
- CHANGELOG.md entry pública (filtrada do STATE.md)

Site no ar em https://growthclub.pro/ com refino aplicado.

Métrica pós-deploy: candidaturas/semana via /membro vs baseline
pré-refino (janela 4 semanas, alvo ≥20% de subida).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Self-Review

### 1. Spec coverage

| Seção da spec v1.1 | Task que implementa |
|---|---|
| §3.1 Hero (lede + CTA1 mantém + CTA2 mantém + stats-row mantém) | Task 1 (lede) — CTA1/CTA2/stats-row são `mantém` no spec, sem ação. |
| §3.1 Problem section (4 cards comparativos) | Task 2 |
| §3.1 Layers (4 bullets superiores + corpo card 01) | Task 3 |
| ~~§3.1 NOVO bloco "Edição típica"~~ — CORTADO (decisão #3) | N/A (cortado) |
| §3.1 Timeline (4 cells, remove "Era Pré-S1" + concretiza Master gatilho) | Task 4 |
| §3.1 Manifesto closer (colapso de 3 blocos em 1) | Task 5 |
| §3.2 Hero-sub (kicker + H1 + lede pra frame de candidatura) | Task 6 |
| §3.2 "Pra quem é / não é" (5→4 bullets em "é") | Task 7 |
| §3.2 5 bullets de benefício | Task 8 |
| §3.2 Bloco do form de entrevista (substitui Substack signup) | Task 9 |
| §3.2 Bloco Master 2027 (copy only) | Task 10 |
| §3.2 FAQ (substitui "grátis?" por "triagem?") | Task 11 |
| §3.2 CTA inline final | Task 12 |
| §3.3 Hero-sub + TOC sidebar 5 itens com "(em construção)" | Task 13 |
| §3.3 Bloco 01 Patrocínio | Task 14 |
| §3.3 Bloco 02 Vagas | Task 15 |
| §3.3 Bloco 03 Hunting | Task 16 |
| §3.3 Bloco 04 Mentoria B2B | Task 17 |
| §3.3 Bloco 05 Não-contaminação | Task 18 |
| §4.4 Não-regressão visual | Task 20 |
| Handler `newsletter-form.js` desativado | Task 19 |
| §7 deploy + sync STATE.md/ROADMAP.md/CHANGELOG | Task 21 |

**Lacunas identificadas:** nenhuma. Todas as subseções da §3 da spec têm task correspondente. Cortes (§3.1 "Edição típica") e revisões (§3.3 estrutura) estão refletidos no plan.

### 2. Placeholder scan

- ✅ Nenhum "TBD" / "TODO" / "implement later" nos passos. Único "TBD" intencional é no card placeholder do form de entrevista (Task 9), que é parte do produto, não do plan.
- ✅ Cada Task tem old_string + new_string exatos.
- ✅ Cada Step tem comando ou Edit completo, não descrição abstrata.
- ✅ Mensagens de commit completas (não "feat: stuff").

### 3. Type consistency

- ✅ `id="form"` adicionado em Task 9 é referenciado por `href="#form"` em Task 12.
- ✅ Numeração de seções em /empresas (01-05) mantida consistente entre TOC (Task 13) e blocos individuais (Tasks 14-18).
- ✅ Eye-labels seguem padrão `/ TEXTO MAIÚSCULO` em todas as páginas.
- ✅ Classes CSS (`.cta-final`, `.cta-inline`, `.layer`, `.tl-cell`, `.p-card`) não foram renomeadas — preservam compat com `pages.css` / `components.css` não tocados.
- ✅ Anchor `id="cta"` preservado na Task 5 (closer único herda do antigo `.cta-final`).

---

## Execution Handoff

Plan completo e salvo em `docs/superpowers/plans/2026-05-18-copy-refino-home-membro-empresas.md`. Duas opções de execução:

**1. Subagent-Driven (recomendado)** — Dispatcho um subagent fresco por task (ou por bloco de 3-4 tasks pra eficiência), review entre tasks, iteração rápida. Usa `superpowers:subagent-driven-development`.

**2. Inline Execution** — Executo as tasks nesta sessão sequencialmente, com checkpoints pra você revisar a cada 5-6 tasks. Usa `superpowers:executing-plans`.

**Qual abordagem prefere?**

---

**Fim do plan.**
