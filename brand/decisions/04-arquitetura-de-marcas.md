# Decisão 04 — Arquitetura de marcas-filhas (sub-grupos WhatsApp + verticais)

**Data:** 2026-04-22
**Task:** 1.4 do plano `docs/superpowers/plans/2026-04-22-growth-club-brand-brief.md`
**Ancoragem:** business plan §9.1 (decisão Fase 1) + §9.2 R6 (risco de fragmentação)

> ⚠️ **Status:** SKELETON — preencher status/ação de cada sub-grupo com info atualizada que só o Henrique tem.

---

## Contexto

A Community "THE GROWTH CLUB" no WhatsApp tem 7 grupos organizados. Essa decisão consolida a arquitetura da v1 e define:
- Quais grupos sobrevivem e como se chamam
- Quais viram marcas-filhas com identidade própria (ex: AI LIKE A PRO)
- Quais são arquivados ou consolidados no core
- Regra de naming pra marcas-filhas

Decisão afeta downstream: **logo** (Task 2.3 Step 5 — lockup com marca-filha), **voice** (Task 3.3 — tom por canal), **templates** (cada sub-grupo ativo tem template próprio ou herda do master?).

---

## Inventário dos sub-grupos atuais

**Instrução:** atualize colunas "Membros atuais", "Atividade" e "Tema/Propósito" com info real. Classifique cada um em uma das 4 ações.

| # | Nome atual | Membros | Atividade (ativo/arquivado) | Tema/Propósito | Ação proposta | Nome pós-Fase-1 |
|---|---|---|---|---|---|---|
| 1 | GROWTH CLUB (grupo core) | 391 | Ativo (31 online) | Mesa de canto do pub — core da comunidade | **Core — mantém** | `Growth Club` |
| 2 | AI LIKE A PRO | ? | Ativo (segunda-feira) | Workshop/curso high-ticket (IA pra growth) | **Promove a marca-filha oficial** | `AI LIKE A PRO by Growth Club` |
| 3 | Meetups de Growth | ? | Arquivada | Coordenação dos meetups presenciais | **Consolida no core** ou **reativa como sub-canal** | `Growth Club · Meetups` (se sub-canal) |
| 4 | PLG BR | ? | Arquivada | Product-Led Growth Brasil | **Definir:** sub-canal temático OU arquiva | ? |
| 5 | Growth Mafia | ? | Arquivada (mas tem pedido de entrada pendente) | ? | **Definir** | ? |
| 6 | CLG BR | ? | Arquivada | Community-Led Growth Brasil | **Definir:** sub-canal temático OU arquiva | ? |
| 7 | Avisos | — | Canal | Broadcast da Community | **Mantém** (canal oficial de avisos) | `Growth Club · Avisos` |

---

## As 4 ações possíveis (cada sub-grupo recebe uma)

### A) Core — mantém
Grupo central da comunidade. Recebe o nome canônico "Growth Club". Sem mudanças estruturais.

### B) Promove a marca-filha oficial
Grupo vira produto/marca com identidade própria, sub-brand formal. Ex: AI LIKE A PRO vira um produto/workshop recorrente. Recebe lockup `[MARCA-FILHA] by Growth Club`. Ganha template visual derivado do master (paleta + tipografia, mas com acento próprio).

### C) Consolida no core (arquiva sub-grupo)
Grupo é inativo demais pra justificar manutenção. Arquiva formalmente, migra membros ativos pro grupo core. Comunica aos membros com texto de transição.

### D) Mantém como sub-canal temático
Grupo continua mas perde autonomia: vira extensão temática do core (ex: "Growth Club · CLG BR"), sem branding próprio, mesma paleta/tipografia/voz.

---

## Regra de naming de marcas-filhas (travada)

Quando um grupo/produto vira marca-filha (ação B), o lockup é:

- **Formato longo (uso primário):** `[MARCA-FILHA] by Growth Club`
  - Ex: `AI LIKE A PRO by Growth Club`
- **Formato curto (uso em contexto já estabelecido):** `[MARCA-FILHA]` isolado
  - Ex: `AI LIKE A PRO` (quando já está claro que é Growth Club)

**Regras visuais:**
- Logo da marca-filha **deriva** do lockup do Growth Club (compartilha paleta, tipografia, pode usar símbolo adaptado)
- Marca-filha **não pode** ter personalidade visual que contradiga o arquétipo Outlaw/Sage do master
- Eye-patch/caveira do master pode reaparecer **estilizado** (não idêntico) no lockup da filha pra reforçar pertencimento

---

## Plano de comunicação aos membros

**Para sub-grupos arquivados ou consolidados** (ação C): enviar mensagem no grupo antes de arquivar.

**Template (adaptar por grupo):**

```
E aí, pessoal.

Nos últimos meses o Growth Club está passando por uma profissionalização:
site oficial, identidade unificada, estrutura mais clara.

Parte disso é consolidar nossos grupos. Este grupo específico
([NOME]) vai [ser arquivado / virar sub-canal do core / etc.].

Se você ainda não está no grupo core (Growth Club), [link].
Toda a conversa que rolava aqui continua rolando lá — só que agora
no mesmo lugar que todo mundo.

Qualquer dúvida, fala comigo.

— Henrique
```

---

## Decisão final (preencher)

**Ação por sub-grupo:**
- GROWTH CLUB (core): **A — Mantém** (nome canônico: `Growth Club`)
- AI LIKE A PRO: **B — Marca-filha oficial** (nome: `AI LIKE A PRO by Growth Club`)
- Meetups de Growth: **[A/B/C/D + racional]**
- PLG BR: **[A/B/C/D + racional]**
- Growth Mafia: **[A/B/C/D + racional]**
- CLG BR: **[A/B/C/D + racional]**
- Avisos: **A — Mantém** (canal oficial: `Growth Club · Avisos`)

---

## Impacto downstream

- **Task 2.3 (logo) Step 5:** lockup de marca-filha precisa acomodar AI LIKE A PRO (+ outras marcas-filhas decididas aqui). Se só AI LIKE A PRO for marca-filha na v1, o lockup é mais simples.
- **Task 3.3 (tom por canal):** cada sub-canal temático ou marca-filha precisa entrar no mapa de tom. Arquivados saem do mapa.
- **Task 4.x (templates):** marcas-filhas ganham template próprio (derivado do master). Sub-canais temáticos herdam 100% do master.
- **Task 5.4 (CONVENTIONS.md):** a regra de naming de marcas-filhas migra pra `.specs/project/CONVENTIONS.md` seção "Brand naming — marcas-filhas".
- **Operação:** membros dos grupos arquivados precisam ser convidados pro core antes do arquivamento (ninguém fica órfão).
