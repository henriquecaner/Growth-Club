# STATE: Growth Club
**Last Updated:** 2026-04-28

> **AI CONTEXT:** Append-only log of decisions, blockers, risks, and lessons learned. Never overwrite past entries.

---

## Recent Decisions (ADR)

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

## Active Blockers

Nenhum.

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
