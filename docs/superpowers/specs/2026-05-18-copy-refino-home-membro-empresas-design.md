# Refino de copy — Home, Membro, Empresas (v1)

**Data:** 2026-05-18
**Tipo:** Design spec (editorial / copy)
**Status:** v1.1 — 4 decisões do Henrique consolidadas (2026-05-18). Pronta pra `superpowers:writing-plans`.
**Spec pai:** `2026-05-17-growth-club-site-design.md` (AD-006/007/008)
**Páginas afetadas:** `website/index.html`, `website/membro.html`, `website/empresas.html`

**Decisões consolidadas no review (2026-05-18):**
1. Hero da home: **CTA primário mantém "Tornar-se membro"** (não troca pra "Receber a próxima edição").
2. Form Substack signup **removido de todas as páginas**. Captação acontece exclusivamente em `/membro` via **form de entrevista** (campos/handler em sub-projeto separado). Hero da home **sem form embutido** — só link CTA → `/membro`.
3. Bloco "Edição típica" da home **cortado** (não entra entre layers e timeline).
4. `/empresas` **mantém os 5 blocos** originais. Refino bloco a bloco, sem colapsar.

---

## 1. Contexto e diagnóstico

O site v1 foi pro ar em 2026-05-17 (AD-006/007) com Design System AD-008 aplicado. Em revisão pelo Henrique, três páginas centrais falharam no teste de leitura: **home, membro, empresas**. Foram identificados 3 *failure modes* concretos:

1. **Jargão interno indecifrável.** Termos como "régua editorial", "ton-anchor", "mesa de canto", "Era Pré-S1" só fazem sentido pra quem está dentro. Leitor externo não decodifica em benefício concreto.
2. **Outlaw sem Sage / bashing repetitivo.** "Rataria", "palco", "guru", "spam de vagas", "patrocinado disfarçado" aparecem várias vezes na home sem contrapeso demonstrativo. A crítica aos "outros" não vem com número que sustente a crítica.
3. **Value prop fraco.** O CTA primário da home leva a `/membro`, que tem form de Substack disfarçada de "Entra pra mesa de canto". Em 2 cliques, o leitor sai do `growthclub.pro` pro Substack sem nunca ouvir, em 1 frase, *por que dar o email*.

O *failure mode* "densidade / wall of text" **não foi marcado** como problema. Conclusão: a solução não é cortar agressivamente, é trocar declaração por demonstração e colapsar redundância semântica (3 blocos na home repetem o ton-anchor literalmente).

### Persona-alvo

Decisor de growth B2B sênior+, perfil agregado entre: Founder/CEO B2B, CRO/VP Sales/VP Growth, Growth/RevOps Lead empregado. **Dev/IC técnico está fora** do foco primário desta página (continua atendido pela Community/newsletter, mas não é otimização).

Risco da escolha "agregado": copy genérica de novo. Mitigação: o **outcome concreto** que sustenta o value prop precisa ser reconhecível pelos 3 perfis ao mesmo tempo (estamos otimizando por *outcome*, não por linguagem de cargo).

### Ação primária

**Uma única conversão entre home e membro: candidatura via form de entrevista em `/membro` (cadastro free com triagem).**

- Master 2027 = menção de roadmap, não CTA
- Meetup S1E1 = descoberta, não CTA primário
- WhatsApp = benefício pós-aprovação na triagem (convite por email após análise da candidatura)
- Empresas tem conversão B2B paralela (lead pra patrocínio) — não é a "única conversão" da pergunta acima

> **Decisão Henrique 2026-05-18 (review da spec):** Form Substack signup é **removido de todas as páginas**. A captação acontece exclusivamente em `/membro` via form-estilo-entrevista (campos e perguntas a serem definidos em sub-projeto separado). Frame da entrada muda de "cadastro grátis 1-clique" pra "candidatura com triagem leve" — reforça posicionamento Outlaw+Sage ("comunidade curada", não open list). Tier continua free (Growth Hacker) — gratuidade preservada, triagem é qualitativa.

---

## 2. Diretrizes editoriais (3 vetores aplicáveis bloco a bloco)

### Vetor 1 — Jargão → Demonstração

**Princípio:** nunca declarar um princípio sem mostrar a aplicação concreta na mesma sentença.

**Termos a tratar:**

| Termo atual | Tratamento |
|---|---|
| "régua editorial #1, #2, #3" | Mata numeração. Substitui por "3 regras simples:" seguido das regras (sem hashtag) |
| "mesa de canto" | Mantém **uma vez por página** com tradução literal anexa ("conversa entre 4-6 operadores presencial, com cerveja") |
| "ton-anchor" | Removido de copy pública (era jargão de brand book) |
| "Era Pré-S1" | Removido de copy pública (jargão de governança interna) |
| "Outlaw + Sage" | Removido de copy pública (jargão de arquétipo) |
| "rataria com nome pomposo" | Mantido **apenas** em quote isolada (manifesto) — não na home corrida |
| "régua aplicada desde 2019" | Mantém — é prova, não jargão |

### Vetor 2 — Bashing → Comparativo concreto

**Princípio:** cada crítica aos "outros" vem com um número que sustenta a crítica na mesma frase.

**Antes (problem cards atuais):**
> "Grupo virou spam de vaga. Comunidade pega 5k membros, vira mural de recolocação."

**Depois (proposta):**
> "Comunidades de growth B2B de 5k+ membros que monitoramos têm mais de metade das mensagens recentes em recolocação. Aqui a proporção é outra: vaga vai pra job board curado, conversa de operador fica na Community."

**Antes:**
> "'3 hábitos que mudaram meu growth' — sem número, sem case real, sem antes-e-depois auditável."

**Depois:**
> "Post típico de growth no LinkedIn BR em 2026: 30k+ views, zero número antes/depois. Edição típica daqui: 800 leitores, 3 números reproduzíveis por reply."

### Vetor 3 — Value prop fraco → Outcome concreto

**Princípio:** hero da home e da membro responde em 1 frase a *"Por que me candidatar agora?"*. Resposta tem 3 elementos: (1) o que recebe ao entrar, (2) regularidade do produto, (3) prova de existência (números reais de operação).

**CTA primário:** **mantém "Tornar-se membro"** (decisão Henrique 2026-05-18). Justificativa: com remoção do form Substack direto e adoção de form de entrevista em `/membro`, "Tornar-se membro" volta a fazer sentido literal — o leitor está se candidatando pra entrar numa comunidade curada, não apenas cadastrando email pra receber newsletter. "Receber a próxima edição" sub-prometia entrega imediata; com triagem, a entrega passa por aprovação.

**Antes (hero home):**
> "Se não tem número, não é Growth Club. / A mesa de canto pros operadores brasileiros de growth B2B — founders, CROs, growth leads, devs de growth, analistas, CS. Newsletter quinzenal no Substack, Community no WhatsApp, meetup presencial. Sem palco, sem fórmula mágica, com cerveja."

**Depois (hero home, draft):**
> H1: **Se não tem número, _não é Growth Club._**
> Lede: "Comunidade curada de operadores B2B de growth — founders, CROs, growth leads, RevOps, CS. Newsletter quinzenal com 1 case real (número antes/depois), 1 benchmark, 1 link comentado. WhatsApp Community ativa, meetup presencial em SP. 11 anos de operação, sem boost pago, sem swap de lista."
> CTA1: **Tornar-se membro** (link → `/membro` com form de entrevista)
> CTA2 (ghost): "Ver os 4 espaços"

**Observação:** lede continua entregando os 3 elementos (o que recebe / regularidade / prova) sem precisar trocar o CTA — o concreto está na descrição do produto, não no rótulo do botão.

---

## 3. Mudanças por página

### 3.1 Home (`website/index.html`)

**Estrutura atual:** hero · problem · layers · timeline · manifesto-big · quote-section · cta-final
**Estrutura nova:** hero · problem · layers · timeline · manifesto-closer (colapsado de 3 blocos em 1)

> **Decisão Henrique 2026-05-18:** Bloco "Edição típica" (proposto originalmente entre layers e timeline) **foi cortado**. Justificativa: evita case fabricado/representativo e mantém o foco da home no funil curto (hero → problema → 4 espaços → roadmap → manifesto closer). Demonstração editorial fica no Substack arquivado, não na home.

#### Hero (refundido)

| Elemento | Atual | Proposto |
|---|---|---|
| Eyebrow | "Comunidade B2B de growth · desde 2015" | **Mantém.** É factual, ancora autoridade. |
| H1 | "Se não tem número, _não é Growth Club._" | **Mantém.** Locked (AD-003). |
| Lede | "A mesa de canto pros operadores brasileiros de growth B2B — founders, CROs, growth leads, devs de growth, analistas, CS. Newsletter quinzenal no Substack, Community no WhatsApp, meetup presencial. Sem palco, sem fórmula mágica, com cerveja." | "Comunidade curada de operadores B2B de growth — founders, CROs, growth/RevOps leads, CS. Newsletter quinzenal com 1 case real (número antes/depois), 1 benchmark, 1 link comentado. WhatsApp Community ativa, meetup presencial em SP. 11 anos de operação, sem boost pago, sem swap de lista." |
| CTA1 | "Tornar-se membro →" | **Mantém "Tornar-se membro →"** (decisão Henrique 2026-05-18). Link aponta pra `/membro` onde fica o form de entrevista. |
| CTA2 | "Ver os 4 espaços" | **Mantém.** |
| Stats-row | 2.261 / 715 / 10+ / 391 / 11a | **Mantém.** Já é demonstração pura. |

**Decisão sobre form na hero:** **link CTA → `/membro`** (sem form embutido nem input inline na hero). Form de entrevista mora exclusivamente em `/membro`. Hero da home permanece com 2 CTAs (primário + ghost) — sem campo de input.

#### Problem section — 4 cards

**Princípio:** cada card vira **um comparativo com número**, não uma declaração genérica. "Tudo bem" no card 01 some (é sarcasmo sem ancora).

| Card | Atual (H3 + texto) | Proposto |
|---|---|---|
| 01 / PALCO | "Post bombou. Pipeline não mexeu. / Curtidas no LinkedIn não pagam folha. Engajamento não é receita. Ali tá tudo bem." | "Post bomba. Pipeline não mexe. / Posts virais de growth no LinkedIn BR fazem 30k+ views por semana. Pipeline B2B típico mexe por outras 4-5 alavancas. Engajamento de feed não está entre elas." |
| 02 / GURU | "Fórmula mágica que ninguém aplicou. / '3 hábitos que mudaram meu growth' — sem número, sem case real, sem antes-e-depois auditável." | "Fórmula mágica que ninguém reproduziu. / Curso de growth no Brasil custa de R$ 2k a R$ 50k. Pergunta básica de reply: 'qual o número antes e depois do método em uma empresa real?'. Resposta rara." |
| 03 / NETWORKING | "Grupo virou spam de vaga. / Comunidade pega 5k membros, vira mural de recolocação. Substância morreu na inflação." | "Grupo virou mural de vaga. / Comunidades de growth B2B passando dos 5k membros que monitoramos têm mais de metade das mensagens recentes em recolocação. Substância vai embora junto da inflação." |
| 04 / PATROCINADO | "'Conteúdo' que é anúncio disfarçado. / Painel com 3 fundadores onde 2 estão vendendo ferramenta. Disclosure escondida no final." | "Conteúdo que é anúncio. / Painel B2B típico tem 3 founders, 2 vendendo ferramenta da própria empresa. Disclosure aparece em letra miúda quando aparece. Aqui patrocínio fica marcado na vinheta." |

#### Layers (4 espaços) — refinar copy do bullet superior

**Princípio:** o bullet superior (em negrito) substitui declaração ("Curadoria com número. Quem não tem dado, não vai.") por **demonstração** ("Cada edição: 1 case com número antes/depois, 1 benchmark, 1 link.").

| Espaço | Bullet atual | Bullet proposto |
|---|---|---|
| 01 Newsletter | "Curadoria com número. Quem não tem dado, não vai." | "Cada edição: 1 case real com número, 1 benchmark, 1 link. Quinzenal." |
| 02 WhatsApp | "Pergunta com contexto. Resposta com case." | "Pergunta com número de contexto. Resposta com case de quem viu o mesmo." |
| 03 Meetup | "Mesa de canto. Cerveja no fim do dia." | "4-6 operadores, presencial, com cerveja. SP · S1 · E1 · jun/2026 @ Barte." |
| 04 Livecast | "Conversa que não cabe em painel TED." | "1 operador convidado por mês, sem agenda escondida. Patrocínio marcado." |

E o corpo dos cards (parágrafo de baixo): refinar pra remover "régua editorial #1" → "regra que aplicamos:" no card 01; manter resto.

#### ~~NOVO bloco — "Como é uma edição típica"~~ — **CORTADO**

**Decisão Henrique 2026-05-18:** bloco cortado. Demonstração editorial fica no arquivo do Substack (link orgânico no rodapé/sobre, não como peça da home). A home preserva o funil curto sem reconstituição editorial fabricada.

#### Timeline (roadmap 2026) — refinar texto

**Princípio:** menos "profissionalizando o que já tá rodando há 11 anos" (frase de marketing), mais "o que muda em cada janela".

| Janela | H3 atual | H3 proposto | Corpo |
|---|---|---|---|
| JAN-ABR/26 | "Marca v1 + site no ar." | **Mantém.** | "Decisões locked, paleta + tipografia + voz. Brand brief plan executado. Site público em `growthclub.pro`." → **Mantém.** Factual. |
| MAIO/26 | "Founder Crew completo." | "Founder Crew preenchido." | "3 vagas operadoras: frontend, designer+vídeo, community manager. Revshare 30% do líquido dividido por igual." (remove "Era Pré-S1") |
| JUN/26 | "Meetup SP · S1 · E1." | **Mantém.** | "Relançamento oficial @ Barte. Revenue Operations com IA. 100 vagas presenciais + livestream." → **Mantém.** Factual. |
| 2H/26 ─ 2027 | "Master + escala." | **Mantém.** | "Tier pago (R$ 690 early, depois R$ 990/ano). Mentorias quinzenais, benchmarks privados. Founder Member volta quando 100 Master estiverem ativos." (substitui "atingirmos" por "estiverem ativos" — concreto) |

#### Manifesto closer (COLAPSADO de 3 blocos em 1)

**Justificativa:** `manifesto-big`, `quote-section`, `cta-final` repetem o mesmo ton-anchor com framing diferente. Colapsa em **1 bloco** que junta manifesto + quote + CTA, posicionado antes do footer.

**Conteúdo proposto:**

```
<section class="manifesto-closer" data-theme="dark">
  <div class="wrap">
    H2: "Franco, com número, sem palco, com cerveja."
    Lead: "Régua de quem entra: case vem com número. Régua de quem patrocina: vai marcado. Régua de quem não entrega nenhuma das duas: pedido cordial pra reabrir."
    Blockquote: "A rataria com nome pomposo continua. A gente continua chamando de rataria."
    Cite: "Manifesto · Growth Club"
    CTA: "Tornar-se membro →"
  </div>
</section>
```

Observações:
- Some "ton-anchor locked desde abril de 2026" (jargão interno de versionamento)
- Some "Régua #1, #2, #3" (numeração ostensiva). Vira "Régua de quem entra / Régua de quem patrocina / Régua de quem não entrega"
- Some "sem exceção" (frase oca quando vem sem contexto)
- Some "Outlaw + Sage" do cite (jargão de arquétipo)

---

### 3.2 Membro (`website/membro.html`)

**Estrutura:** preservada (sem cortes de seção). Refino de copy + **substituição do bloco de form Substack pelo bloco de form de entrevista** (campos a definir em sub-projeto separado).

> **Decisão Henrique 2026-05-18:** Form Substack signup removido. Entrada na comunidade passa por **form de entrevista** (estilo "conta um pouco sobre você") com triagem leve. Tier continua **free** (Growth Hacker) — gratuidade preservada, triagem é qualitativa. Campos, perguntas e handler de submit ficam em sub-projeto separado (`Sub-projeto: form de entrevista`) — esta spec só ajusta o **frame editorial** da página em torno do conceito de candidatura.

#### Hero-sub

| Elemento | Atual | Proposto |
|---|---|---|
| Kicker | "Comunidade · 4 espaços, 1 régua" | "Comunidade curada · 4 espaços, 1 régua" |
| H1 | "Entra pra _mesa de canto._" | "Aplicar pra entrar na _mesa de canto._" |
| Lede | "Operadores B2B de growth trocando stack, número e cerveja desde 2015. Newsletter quinzenal grátis. WhatsApp Community ativa. Meetup presencial em SP. Master pago abre em 2027." | "Operadores B2B de growth trocando stack, número e cerveja desde 2015. Cadastro é grátis, mas a entrada passa por triagem leve — 1 form curto pra a gente conhecer seu contexto. Aprovado entra na newsletter quinzenal, recebe convite pra WhatsApp Community (715 ativos), tem prioridade pra meetup presencial em SP." |
| Meta-row | "TIER ATUAL · GROWTH HACKER (FREE)" / "PRÓXIMO · MASTER 2027" | **Mantém.** Factual. |

#### "Pra quem é" / "Pra quem não é" — enxugar de 5 pra 4 bullets cirúrgicos

**Pra quem é (atual 5 bullets → proposto 4):**
- ~~"Founder, CRO, growth lead, dev de growth, analista, CS"~~ → "Founder, CRO, growth/RevOps lead em B2B (SaaS, indústria, serviços recorrentes)"
- ~~"Opera B2B (SaaS, indústria, serviços recorrentes)"~~ → fundido com o anterior
- "Topa abrir número quando entrega case" → **Mantém.**
- "Quer troca de operador, não palco de guru" → "Quer conversa de operador, não talk de guru"
- "Aceita disclosure claro de patrocínio" → **Mantém.**

**Pra quem não é (atual 5 → proposto 5, mantém todos com refino leve):**
- "Procura curso de 'growth hacker certificado'" → **Mantém.**
- "Quer postar fórmula mágica sem número" → **Mantém.**
- "Empresa B2C focada em conversão de funil único" → **Mantém.** Cumpre função de descarte rápido pra perfil e-commerce/D2C.
- "Vendedor de ferramenta procurando lista pra prospect" → "Vendedor de ferramenta querendo lista pra prospect frio"
- "Quem espera entretenimento de palco" → **Mantém.**

#### Bullets de benefício (5 itens)

**Princípio vetor 1:** cada bullet entrega o **outcome concreto** primeiro, prova depois.

| Atual | Proposto |
|---|---|
| "Newsletter quinzenal no Substack — 1 case real com número, 1 benchmark, 1 link da semana. 2.261 inscritos." | "Newsletter quinzenal no Substack — 1 case real com número antes/depois, 1 benchmark coletado, 1 link comentado. 2.261 leitores desde 2019." |
| "Convite pra WhatsApp Community — 715 operadores ativos. Régua editorial aplicada." | "Convite pra WhatsApp Community — 715 operadores ativos. Pergunta vai com número de contexto, resposta vem com case." |
| "Prioridade pra meetups presenciais — Meetup Growth SP · S1 · E1 · Barte (jun/2026) é o próximo." | **Mantém.** Factual e direto. |
| "Q&A mensal por escrito — perguntas sobre stack, número, contratação, estratégia respondidas em newsletter." | "Q&A mensal por escrito — você manda pergunta sobre stack, contratação, pricing; resposta sai em edição especial da newsletter, sem cobrar." |
| "Deep editorial trimestral — relatório longo sobre 1 tema (RevOps, AI em growth, pricing B2B, etc)." | "Deep editorial trimestral — relatório longo de 1 tema por edição (próximos: RevOps com IA, pricing B2B sênior, salário de growth lead 2026)." |

#### Bloco do form de entrevista (substitui o bloco do form Substack)

**Princípio:** o bloco se reposiciona de "cadastro de email com confirmação" pra "candidatura curta com triagem em até 7 dias". Copy enquadra a triagem como filtro de sinal, não como barreira de elitismo.

| Elemento | Atual (Substack signup) | Proposto (form de entrevista) |
|---|---|---|
| Eye-label | "/ INSCRIÇÃO GRÁTIS — TIER GROWTH HACKER" | "/ CANDIDATURA — TIER GROWTH HACKER (FREE)" |
| H3 | "Entra na newsletter _agora._" | "Conta um pouco sobre _você._" |
| Lede | "Próxima edição cai na sua caixa em até 14 dias. Sem spam, sem boost, sem swap de lista. Cancela quando quiser." | "Form curto, 5-7 perguntas (~3 min). Resposta da triagem em até 7 dias por email. Aprovado entra na newsletter quinzenal + convite pra WhatsApp Community. Sem spam, sem swap de lista." |
| Campos do form | `<input email>` + `<checkbox LGPD>` (Substack) | **TBD em sub-projeto separado** — Henrique vai passar os campos e perguntas. Spec atual descreve só o frame editorial em volta. |
| Botão | "Entrar no clube" | "Enviar candidatura" |
| Checkbox LGPD | Mantém íntegra (compliance) | **Mantém.** Compliance LGPD continua obrigatória, texto adaptado pra "envio de candidatura + comunicação sobre triagem + newsletter editorial caso aprovado". |
| Handler técnico | `assets/js/newsletter-form.js` (POST Substack) | **TBD em sub-projeto separado.** `newsletter-form.js` será desativado/removido quando o handler novo entrar. |

#### Bloco Master 2027 — reduzir drama visual, refinar copy

**Justificativa:** o bloco atual usa H3 muito grande, gradient pesado, badge "Em breve · 2027" — visualmente compete com o form de cadastro principal. Como Master está parqueado até gatilho (≥100 Master pagantes), o bloco aqui é **informativo**, não promocional.

**Decisão de spec:** copy muda; redução visual fica pra plano de execução (eventualmente o card vira layout horizontal mais discreto).

| Elemento | Atual | Proposto |
|---|---|---|
| Eye-label | "/ Tier pago · Growth Hacker Master" | **Mantém.** |
| H3 | "Mentoria + benchmarks _privados._" | "Master abre quando tiver 100 pagantes na fila." |
| Preço early | "R$ 690 /ano" | **Mantém.** |
| Preço regular | "R$ 990 /ano" | **Mantém.** |
| Lede | "Mentoria quinzenal com Henrique, benchmarks privados (pricing, conversão por canal, salário senior+), deep editorial mensal. Sem pre-sale forçado, sem promessa de dinheiro no curto prazo." | "Mentoria quinzenal com Henrique, benchmarks privados de pricing/conversão/salário, deep editorial mensal. Sem pre-sale, sem promessa de data. Avisamos quando abrir." |
| Gatilho | "Gatilho de abertura · marca v1 publicada + site no ar com captação ativa + ≥100 inscritos na fila" | **Mantém.** |

#### FAQ — manter 4 perguntas (1 substituída)

**Substituir:**
- ~~"Newsletter é mesmo grátis?"~~ → **"Como funciona a triagem?"** (pergunta nova alinhada com o frame de candidatura)

**Pergunta nova:**

| Pergunta | Conteúdo proposto |
|---|---|
| "Como funciona a triagem?" | "Form curto com 5-7 perguntas pra gente entender seu contexto (cargo, empresa, problema atual). Sem prova de currículo, sem pedir CV. Critério é qualitativo: dá pra sustentar conversa de operador? Resposta em até 7 dias por email. Aprovado entra na newsletter + convite WhatsApp. Não aprovado recebe email educado com motivo." |

**Demais perguntas (refino leve):**

| Pergunta | Atual | Proposto |
|---|---|---|
| "Como entro no WhatsApp?" | "Depois de confirmar a inscrição na newsletter, você recebe convite por email em até 7 dias. Entrada manual com triagem leve pra manter a régua." | "Após a triagem ser aprovada, convite por email em até 7 dias. Entrada manual pra manter o sinal da Community." |
| "Vão me prospectar?" | "Não. Lista é fechada pra terceiros. Nunca foi vendida, nunca foi trocada por swap. Política de não-contaminação editorial em /empresas." | "Não. A lista nunca foi vendida nem trocada por swap em 11 anos. Política de não-contaminação editorial completa em /empresas." |
| "Quando abre o Master?" | "Em 2027. Sem data exata. Gatilho de abertura é: marca v1 publicada + site no ar com captação ativa + ≥100 Growth Hacker Master pagantes na fila." | "Em 2027, sem data. Gatilho: marca v1 publicada + site no ar com captação ativa + ≥100 Growth Hacker Master pagantes na fila. Avisamos por email quando bater." |

#### CTA inline final

| Elemento | Atual | Proposto |
|---|---|---|
| H2 | "Entra no clube _hoje._" | "Aplicar pra entrar." |
| Lede | "Newsletter quinzenal grátis. WhatsApp Community por convite após inscrição. Próxima edição em até 14 dias." | "Cadastro grátis com triagem leve. Form curto, 5-7 perguntas. Resposta em até 7 dias. WhatsApp Community por convite após aprovação." |
| Botão | "Cadastrar email" | "Enviar candidatura" (rola pra âncora do form no topo da página) |

---

### 3.3 Empresas (`website/empresas.html`)

**Estrutura atual:** hero · 01 patrocínio · 02 vagas (em breve) · 03 hunting (em breve) · 04 mentoria (em breve) · 05 não-contaminação
**Estrutura nova:** **mantém os 5 blocos**, refino de copy bloco a bloco. Os 3 blocos "em breve" passam por refino pra (a) reduzir vaguidade, (b) marcar prazo aproximado ou condição de abertura, (c) substituir promessa por mecânica.

> **Decisão Henrique 2026-05-18:** colapso 5→3 **rejeitado**. Mantém os 5 blocos com refino individual. Sidebar TOC continua com 5 itens. Justificativa: sinaliza ambição/escopo total da oferta B2B mesmo com 3 ainda em construção; o refino de copy reduz o efeito "página rasa" sem cortar oferta.

#### Hero-sub

| Elemento | Atual | Proposto |
|---|---|---|
| Kicker | "Para empresas · B2B" | **Mantém.** |
| H1 | "Encontrar, contratar, _patrocinar._" | "Patrocinar a comunidade. Falar com 2.261 operadores B2B." |
| Lede | "Comunidade ultra-qualificada de operadores B2B de growth. 2.261 leitores na newsletter, 715 ativos na Community, core group de 391 pessoas que apareceram cara-a-cara. Audiência senior+ qualificada." | "Audiência B2B de growth: 2.261 leitores na newsletter (sub orgânico desde 2019), 715 ativos na WhatsApp Community, core group de 391 que aparecem em meetup. Senior+ em SaaS, indústria, serviços recorrentes." |
| Meta-row | "AUDIÊNCIA · 2.261 SUBS + 715 ATIVOS" / "FORMATOS · LIVECAST, MEETUP, NEWSLETTER" | **Mantém.** Factual. |

#### Sidebar TOC (`<aside class="toc">`)

**Mantém os 5 itens originais.** Só refina rotulagem dos itens "em breve" pra deixar o estágio explícito:

```
01 / Patrocínio
02 / Vagas (em construção)
03 / Hunting (em construção)
04 / Mentoria B2B (em construção)
05 / Não-contaminação editorial
```

#### Bloco 01 — Patrocínio (refinar copy)

| Elemento | Atual | Proposto |
|---|---|---|
| H2 | "Livecast e meetup _com marca aberta._" | "Patrocínio de livecast e meetup, marca aberta." |
| Parágrafo 1 | "Você patrocina, a gente marca como patrocínio. Sem disfarce. Sem painel-disfarçado-de-conteúdo. O livecast mensal e o meetup presencial trimestral aceitam um patrocinador por edição, com slot de fala no fim e logo na vinheta." | "1 patrocinador por edição. Logo na vinheta, slot de fala no encerramento (5-7 min), menção curta no replay. Disclosure no início e fim. Sem 'painel-com-3-founders-2-vendendo-ferramenta'." |
| Parágrafo 2 | "Mídia kit completo, breakdown de audiência e formatos disponíveis em /docs/sponsors (em breve no site público). Solicitação direta: parceiros@growthclub.pro." | "Mídia kit com breakdown de audiência por cargo, canal e setor: solicite por email. Edições disponíveis pros próximos 6 meses: 2 livecasts (jul, ago) + meetup SP · S1 · E1 (jun/26). Contato: parceiros@growthclub.pro." |

#### Bloco 02 — Vagas (refino de copy; bloco mantido)

| Elemento | Atual | Proposto |
|---|---|---|
| Numeração / status | "02 / VAGAS · EM BREVE" | "02 / VAGAS · EM CONSTRUÇÃO" |
| H2 | (rascunho atual da página) | "Job board curado de growth B2B." |
| Parágrafo 1 | placeholder | "Vaga de growth B2B vira card editado com remuneração, stack e timing — não post solto na Community. Tarifa fixa por vaga ativa por 30 dias. Sem boost, sem cross-posting." |
| Parágrafo 2 | placeholder | "Abrindo no 2º semestre de 2026, depois da Founder Crew #3 (community manager) preenchida. Pra ser avisado quando abrir: `parceiros@growthclub.pro` com assunto `vagas`." |

#### Bloco 03 — Hunting (refino de copy; bloco mantido)

| Elemento | Atual | Proposto |
|---|---|---|
| Numeração / status | "03 / HUNTING · EM BREVE" | "03 / HUNTING · EM CONSTRUÇÃO" |
| H2 | (rascunho atual da página) | "Indicação via core group." |
| Parágrafo 1 | placeholder | "Indicação direta de operadores senior+ B2B a partir do core de 391 pessoas que aparecem em meetup. Fee fixo por contratação efetivada. Sem retainer, sem prospect frio." |
| Parágrafo 2 | placeholder | "Abrindo caso a caso a partir de 2H/26 — primeiro com empresas patrocinadoras do livecast/meetup que precisam de senior+ específico. Pra abrir conversa: `parceiros@growthclub.pro` com assunto `hunting`." |

#### Bloco 04 — Mentoria B2B (refino de copy; bloco mantido)

| Elemento | Atual | Proposto |
|---|---|---|
| Numeração / status | "04 / MENTORIA · EM BREVE" | "04 / MENTORIA B2B · EM CONSTRUÇÃO" |
| H2 | (rascunho atual da página) | "Workshop aplicado pra time interno." |
| Parágrafo 1 | placeholder | "Formato AI LIKE A PRO já roda como produto independente (R$ 397/aluno, 7 alunos em 2 turmas confirmados). Versão custom pra time interno entra na fila quando a Founder Crew #2 (designer + vídeo) estiver preenchida." |
| Parágrafo 2 | placeholder | "Sem data confirmada. Quem quiser fila prioritária: `parceiros@growthclub.pro` com assunto `mentoria b2b` + número de pessoas + outcome esperado." |

#### Bloco 05 — Não-contaminação (refinar copy)

| Elemento | Atual | Proposto |
|---|---|---|
| Numeração | "05 / NÃO-CONTAMINAÇÃO" | **Mantém "05 / NÃO-CONTAMINAÇÃO"** (estrutura de 5 blocos preservada). |
| H2 | "Política de _conteúdo editorial._" | **Mantém.** |
| Pull-quote | "Patrocínio paga slot de patrocínio. _Não paga linha de conteúdo editorial._" | **Mantém.** É a frase-chave. Locked. |
| Parágrafo 1 | "A newsletter editorial nunca é vendida pra patrocinador. Conteúdo de meetup é definido pelo time editorial, não pelo patrocinador. Quem patrocina sabe disso antes de assinar. Sem exceção, sem 'estudo de caso especial', sem disclosure escondido no final." | "A newsletter editorial nunca é vendida pra patrocinador. Pauta de meetup é definida internamente. Quem patrocina assina sabendo. Sem 'estudo de caso especial', sem disclosure no rodapé em letra miúda." |
| Parágrafo 2 | "Esse princípio é o que protege a audiência. Sem ele, a comunidade vira sales channel de quem paga mais — e nenhum operador senior+ topa ficar." | "Esse princípio protege a audiência. Sem ele, a comunidade vira sales channel de quem paga mais. Operador senior+ não topa ficar nesse modelo, e a gente já viu acontecer com outros 3 grupos do mesmo nicho desde 2018." |

#### CTA inline final — mantém

Copy atual está OK. Sem mudança.

---

## 4. Plano de validação

### 4.1 Skill `humanizer` obrigatória (na execução, não nesta spec)

Regra global em `~/.claude/CLAUDE.md`: toda prosa pública passa pela skill `humanizer` antes de salvar. **Esta spec contém drafts**, não copy final — a aplicação formal do humanizer acontece durante a execução do plano (passo 2 do §7), bloco a bloco, antes do diff entrar nos arquivos HTML.

- Os drafts acima foram escritos aplicando os princípios do humanizer por antecipação, mas precisam de pass formal pra cada bloco antes do commit.
- Checagem específica: em-dashes excessivos, rule of three decorativa, AI vocabulary inflado ("stands as a testament", "demonstrates", "leverages"), vague attributions ("muitos dizem que"), negative parallelisms ("não é X, mas Y") usados como ornamento.
- Aceita uso de rule of three quando é **factual** (3 elementos reais: case + benchmark + link; subs + ativos + core) ou quando é **citação locked** (ton-anchor).

### 4.2 Teste de leitor cego

Antes do deploy, idealmente 1-2 operadores externos (não-membros da Community) leem as 3 páginas e respondem **em 1 frase**:

> "O que o Growth Club oferece e por que eu daria meu email?"

Critério de sucesso: 2 leitores dão respostas consistentes (mesmo *outcome*, mesma *regularidade*, mesma *prova*). Se as respostas divergirem em qual é o produto, refina mais.

**Risco:** essa etapa exige recrutamento humano. Se não for prático, fica como pendência pós-deploy (com prazo) em vez de bloquear.

### 4.3 Métrica pós-deploy

- **Primária:** cadastros Substack/semana, janela de 4 semanas pós-deploy vs. baseline 4 semanas pré-refino. Esperado: subida mínima de 20% pra considerar refino bem-sucedido. Subida abaixo disso = revisitar diretrizes.
- **Secundária:** tempo de leitura por página (Cloudflare Web Analytics, se ativo) — esperado: estável ou subindo na home, levemente caindo na membro (sinal de decisão mais rápida).
- **Não medir isoladamente:** CTR do hero (ruído alto), bounce rate (não distingue leitor satisfeito que saiu de leitor que desistiu).

### 4.4 Não-regressão visual

Lista de checks antes de commit:

- [ ] Render local OK (`python -m http.server 8000 -d website/` ou equivalente)
- [ ] `index.html`, `membro.html`, `empresas.html` carregam sem erro de console
- [ ] Layout AD-008 intacto: hero, cards, layers, timeline, manifesto-closer
- [ ] Form Substack em `/membro` ainda envia (handler `assets/js/newsletter-form.js` intacto)
- [ ] Scrollspy em `/empresas` continua linkando os 3 itens novos do TOC
- [ ] Mobile: hero não quebra, stats-row colapsa, problem grid 1col, layers 1col
- [ ] Desktop: layout 2col em layers, problem 4col, timeline 4col
- [ ] Footer e header inalterados em ambas

---

## 5. O que NÃO está no escopo

Confirmação explícita pra evitar scope creep no plano de execução posterior:

- **Header e footer** (`<gc-header>`, `<gc-footer>`) — sem mudança
- **Tokens CSS, components.css, pages.css, chrome.css** — sem mudança
- **Fontes Satoshi/Roboto** — sem mudança
- **Scrollspy** (anchors em `/sobre`, `/empresas`) — sem mudança
- **Form de entrevista (campos, perguntas, handler de submit, destino dos dados)** — sub-projeto separado. Esta spec só ajusta o **frame editorial** em torno da candidatura. O handler `assets/js/newsletter-form.js` será desativado/removido quando o handler novo entrar — não preservado intacto. Bloco do form em `/membro` vai pro plano de execução como **placeholder de copy + comentário HTML marcando "handler a definir"**, sem campos funcionais até o sub-projeto rodar.
- **Outras páginas:** sobre, contato, meetups hub, LP S1E1, recursos/*, legais/*, 404, ai-like-a-pro — fora desta spec
- **Decisões locked** (ton-anchor, régua #1, Outlaw+Sage, nomenclatura meetup, pricing tiers, AD-002/003/004/005) — não trespassam. Só muda **como aparecem**.
- **Form direto na hero da home** — descartado. Hero da home tem 2 CTAs (primário + ghost), sem campo de input.

---

## 6. Riscos e contra-medidas

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Comparativos com número viram dado fabricado / impreciso | Média | Alto (quebra a própria régua) | Cada número usado na copy nova precisa ter fonte (sample, observação, monitoramento). Onde não houver fonte concreta, recuar pra qualitativo concreto sem inventar número. Henrique valida bloco a bloco. |
| Bloco "Edição típica" parece promocional/fabricado | Média | Médio | Default: usar **edição real** do Substack (Henrique escolhe qual) em vez de exemplo construído. Plano B: deixa claro na própria amostra que é reconstituição editorial. |
| Após refino, o tom fica "tímido demais" / perde personalidade | Baixa-média | Médio | A skill `humanizer` não remove Outlaw — remove vagueness. O tom franco fica preservado em: H1 home, manifesto closer, bloco 03 empresas, quote, problem cards. Outlaw ancorado em pontos específicos, Sage em todos os outros. |
| Empresas com só 2 ofertas reais + 1 roadmap parece pouco | Baixa | Baixo | Honestidade > volume aparente. A página fica mais credível com 2 ofertas reais que 5 (3 vazias). |
| Métrica pós-deploy fica abaixo de 20% de subida | Média | Médio | Janela de 4 semanas pode ser curta. Plano: estender pra 8 semanas se primeiras 4 forem ambíguas antes de considerar revisão da spec. |

---

## 7. Próximos passos

1. ✅ **Henrique revisou** a spec e consolidou 4 decisões (2026-05-18). Veja banner no topo do doc + boxes "Decisão Henrique 2026-05-18" inline em cada subseção afetada.
2. ⏳ **Commit da spec v1.1** (esta versão) seguindo padrão Conventional Commits: `docs(specs): copy refino home/membro/empresas — drafts editoriais v1.1 (4 decisões consolidadas)`.
3. ⏳ Invocar skill `superpowers:writing-plans` pra produzir plano de implementação detalhado: file-by-file, com humanizer pass por bloco, ordem de aplicação dos blocos, checklist de não-regressão visual.
4. ⏳ Plano aprovado → execução em sessão separada (ou continuação). Diff aplicado, render local validado, deploy via `wrangler pages deploy website --project-name growth-club --branch main`.
5. ⏳ Janela de 4 semanas de medição pós-deploy (Cloudflare Web Analytics + cadastros em `/membro`). Sync com `STATE.md` em novo ADR registrando o refino + métricas.
6. ⏳ **Sub-projeto separado:** form de entrevista em `/membro` — Henrique vai passar os campos/perguntas em sessão futura. Spec atual só ajusta o frame editorial; handler técnico e estrutura do form ficam pra essa sessão.

---

**Fim da spec.**
