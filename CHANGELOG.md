# CHANGELOG · Growth Club

> Build-in-public log. Decisões, execuções e lições da operação da comunidade. Espelho público (filtrado) das ADRs registradas em [`STATE.md`](.specs/project/STATE.md).
>
> Régua editorial: tudo aqui vem com data, decisão, e (quando aplicável) o número que sustenta.

---

## 2026-04-28 · Estrutura pública do repositório

Publicar o repositório como ativo de marca.

O que mudou:

- README master com hero, manifesto, números reais (2.261 / 715 / 391 / 10+) e segmentação multidisciplinar.
- Estrutura `.github/` completa: CODE_OF_CONDUCT, CONTRIBUTING, 4 issue templates, PR template, FUNDING, profile, welcome workflow.
- `docs/community/visibility-strategy.md` (Anexo C item 4 do contrato Founder Crew #3).
- Caminhos de leitura por audiência (`docs/community/`, `docs/investors/`, `docs/sponsors/`, `docs/crew/`).

Por que agora: o repo precisa estar pronto antes de candidatos a Founder Crew #3 chegarem via DM da campanha de WhatsApp. Ele serve como filtro de qualidade pré-call.

PR: [#4](https://github.com/henriquecaner/Growth-Club/pull/4).

---

## 2026-04-28 · AD-005 · Transparência financeira radical com Founder Crew

Founder Crew vai receber relatório financeiro mensal (1º ano) e trimestral (depois) com DRE simplificada, cálculo do líquido, Pool Crew e fração individual. Direito a contestar cálculos (right-to-audit-lite).

Por quê: sem visibilidade sobre receitas e despesas, o vínculo de revshare vira "confia em mim", uma assimetria que corrói a relação. O princípio "Se não tem número, não é Growth Club" se aplica internamente também.

Referência: [`STATE.md` AD-005](.specs/project/STATE.md). Vai virar Cláusula 7 e Anexo E do Acordo de Founder Crew.

---

## 2026-04-28 · AD-004 · Hospedagem operacional na Level Tech (CNPJ existente)

A comunidade roda dentro do CNPJ da Level Tech (recém-fundada pelo Henrique) em Fase 1. Spin-off futuro em CNPJ dedicado Growth Club, com Level Tech como holding controladora, gatilhado por: receita anual ≥ R$ 500k OU ≥ 200 GH Master pagantes OU captação externa relevante.

Por quê: o §11 do Business Plan (CNPJ e regime tributário) era pendente. Level Tech existe e pode operar a comunidade sem custo adicional de PJ nova em Fase 1.

Referência: [`STATE.md` AD-004](.specs/project/STATE.md).

---

## 2026-04-28 · AD-003 · Founder Member tier parqueado

O tier `Founder Member` (R$ 2.079, 100 vagas) está suspenso temporariamente. Não vai ser ofertado em Barte S1E1.

Gatilho de retomada:

- (i) Marca v1 publicada (Chunks 1-5 do brand brief fechados).
- (ii) Site `growthclub.pro` no ar com captação ativa.
- (iii) ≥ 100 Growth Hacker Master pagantes confirmando demanda.

Por quê: vender ticket prêmio antes do produto estar minimamente maduro queima a categoria. Receita upfront prevista de R$ 51.975 (25 × R$ 2.079) não materializa em Barte S1E1, o que gera o risco R-11 (cash flow Fase 1).

Mitigação: Henrique absorve o gap pessoalmente. Não vai ter pre-sale GH Master forçado nem ingressos pagos comerciais agressivos pra cobrir gap em curto prazo. Princípio: *"Não tem promessa de dinheiro no curto prazo."*

Referência: [`STATE.md` AD-003](.specs/project/STATE.md).

---

## 2026-04-28 · AD-002 · Founder Crew (categoria Era Pré-S1)

Cria-se 4ª categoria, Founder Crew, paralela aos tiers de membership. Remunera 3 operadores que entregam frentes técnicas críticas via revshare contratual, sem participação societária.

Termos principais:

- 3 vagas fechadas: Frontend, Designer+Vídeo, Community Manager-GitHub.
- 30% do líquido dividido por igual entre Crew ativos.
- Vínculo de 36 meses condicional (entrega upfront 90 dias, manutenção 6h/mês).
- First-pass em vaga paga futura.
- Sem perpetuidade. Founder pode desligar por baixa performance ou problema cultural com 15 dias de cura por escrito.
- Saída implica perder tudo automaticamente (revshare e crédito ativo).
- Mecanismo legal: acordo de prestação de serviços com remuneração variável (Caminho B, sem equity).

Referência: [`STATE.md` AD-002](.specs/project/STATE.md). Contrato draftado em `docs/contracts/acordo-founder-crew.md` (privado).

---

## 2026-04-22 · AD-001 · Business Plan v1.2 aprovado

Design do business plan v1.2 aprovado por revisão independente (2 iterações) e pelo autor humano. Versão congelada no commit `1e374bf`.

Marcos:

- Estrutura em 3 tiers: `Growth Hacker` (free), `Founder Member` (100 cap), `Growth Hacker Master` (R$ 990/ano na Fase 3).
- Relançamento público atrelado ao Meetup Growth SP · S1E1 · Barte (jun/2026).
- Modelo de receita: meetups, workshops high-ticket, patrocínio livecast, Founder Members, GH Master.
- Posicionamento: *"Growth de verdade. Stack de verdade. Sem teatro."*

Referência: [`docs/superpowers/specs/2026-04-22-growth-club-business-plan-design.md`](docs/superpowers/specs/2026-04-22-growth-club-business-plan-design.md) · [`STATE.md` AD-001](.specs/project/STATE.md).

---

## Pré-2026-04 · Era Pré-S1 (informal)

Histórico orgânico da comunidade antes da profissionalização formal:

- 2015. Primeiro Meetup Growth presencial em São Paulo.
- 2015-2025. 10+ meetups realizados em SP, com edições pontuais em outras cidades.
- 2019. Lançamento da newsletter no Substack (`brgrowthclub.substack.com`). 2.261 assinantes acumulados.
- 2020-2025. Crescimento orgânico da Comunidade WhatsApp: 715 membros distribuídos em 7 sub-grupos, 391 no core.
- 2022-2025. Workshops `AI LIKE A PRO by Growth Club`. Formato high-ticket, 2-4× por ano.
- 2024-2025. Estabilização do core de 391 operadores. Base do relançamento S1.

> Histórico informal. Não tem ADR formal porque essas decisões foram tomadas pelo Henrique solo, sem documentação estruturada. Registradas aqui post-facto pra contexto. Detalhes editoriais: [`brand/voice/manifesto.md`](brand/voice/manifesto.md).

---

## Lições registradas

### L-002 · 2026-04-28 · Categoria nova vs. adaptar tier existente

Contexto: ao desenhar remuneração pra Founder Crew, considerou-se incluir essas pessoas dentro do tier Founder Member existente.

Aprendizado: misturar consumidor pagante (paga acesso) com trabalhador trocando labor por upside corrompe a narrativa de ambos. Quando dois grupos têm naturezas jurídicas e comerciais diferentes, separa nomenclatura mesmo que o cap-table fique mais complexo.

### L-001 · 2026-04-22 · Ativos orgânicos preexistentes mudam a natureza do design

Contexto: o brainstorming inicial assumia greenfield. Ativos preexistentes (2.261 + 715 + 10+ meetups) só foram revelados no meio do processo.

Aprendizado: antes de perguntar "como construir X", perguntar "existe algo parecido já rodando?". Incorporar ativos preexistentes como pilares do design.

---

## Riscos catalogados

### R-11 · 2026-04-28 · Cash flow Barte S1E1 sem fonte upfront

Origem: AD-003 (Founder Member parqueado).

Impacto: receita prevista de R$ 51.975 não materializa.

Status: mitigado por absorção consciente. Henrique absorve gap pessoalmente.

### R1-R10 · 2026-04-22 · Riscos do Business Plan

Catalogados em [`docs/superpowers/specs/2026-04-22-growth-club-business-plan-design.md`](docs/superpowers/specs/2026-04-22-growth-club-business-plan-design.md) §9.2, com mitigação registrada.

---

## Próximos esperados

- 2026-05-15. 3 Founder Crew assinados (meta).
- 2026-05-31. Site `growthclub.pro` no ar (executor: Crew #1).
- 2026-06-15. Identidade aplicada em ≥ 3 templates (executor: Crew #2).
- Jun/2026. Meetup Growth SP · S1 · E1 · Barte (relançamento público).
- 2026-Q3/Q4. Avaliar gatilhos de retomada do Founder Member.
- 2027-Q2. Abertura comercial do tier `Growth Hacker Master` (Fase 3).

---

> *Build in public é a única operação coerente com "Sem teatro". Tudo que entra aqui é registrável.*

Última atualização: 2026-04-28. Mantenedor: Henrique Caner.
