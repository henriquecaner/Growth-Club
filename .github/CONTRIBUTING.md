# Contribuindo com o Growth Club

> **Mesa de canto de um pub.** Todo mundo pode sentar — desde que traga número.

Este guia explica **como** contribuir com o Growth Club neste repositório. Antes de qualquer ação, leia o [CODE_OF_CONDUCT](CODE_OF_CONDUCT.md) — a régua é rígida e vale dentro e fora do GitHub.

---

## Quem pode contribuir

| Perfil | O que pode fazer |
|---|---|
| **Operador externo** (não-membro) | Compartilhar caso com número via Discussion · Sugerir pauta de meetup · Reportar bug do site · Mandar PR em template/copy |
| **Growth Hacker** (membership free) | Tudo do externo + acesso direto à régua editorial S1 nas Discussions |
| **Founder Crew** (Era Pré-S1, em construção) | Tudo do anterior + commit direto no repo + revisão de PRs externos + manutenção do escopo da cadeira |
| **Mantenedor** ([@henriquecaner](https://linkedin.com/in/henriquecaner)) | Merge final · Decisões de marca · ADRs em `STATE.md` |

---

## Antes de abrir issue/PR

Verifique **2 coisas** que cortam a maioria do ruído:

1. **Tem número?** Caso, claim, sugestão — vem com evidência. *"O fluxo X é confuso"* não é argumento. *"Demorei 4min e 3 cliques pra achar a oferta de meetup, ideal seria 1min/1clique"* é.
2. **Já tem issue/discussion sobre isso?** Busca antes. Duplicata vira fechamento cordial com link pro original.

---

## Tipos de contribuição

### 1. Compartilhar caso (Discussions)

A forma mais "Growth Club" de contribuir é compartilhar caso com número numa Discussion da categoria **Show & Number**.

**Estrutura mínima:**
- **Contexto da operação** (ICP, ticket médio, ciclo, stack atual em 1-2 linhas)
- **Problema real** (com a métrica antes)
- **O que tentou** (com a métrica depois)
- **O que aprendeu** (insight transferível)

Caso bom vira pauta de meetup. Caso muito bom vira edição da newsletter.

### 2. Sugerir pauta de meetup (Issue)

Use o template [`pauta-meetup.yml`](ISSUE_TEMPLATE/pauta-meetup.yml). Pauta boa tem:
- Tema com hipótese clara
- Número que já viu rodar (seu ou de outro)
- Pessoa que poderia compartilhar (com link)
- Cidade aplicável (SP/RJ/BH/POA/online)

### 3. Bug ou melhoria no site / templates / repo (Issue + PR)

Use o template aplicável em [`ISSUE_TEMPLATE/`](ISSUE_TEMPLATE/). Em PR:
- Descrição com **antes/depois** (pode ser screenshot, pode ser número)
- Critério de aceitação mensurável
- Link pro issue relacionado
- Aplica régua editorial (sem `alavancar`, `disruptar`, `engajamento` solto, etc. — vide [glossário](../brand/voice/glossario.md))

### 4. Mexer em copy / brand / voice (PR)

Mudanças em `brand/voice/**`, `brand/decisions/**`, ou copy do README/site **exigem revisão do mantenedor**. Não fazer merge automático.

Antes de abrir PR de copy:
- Lê [`brand/voice/dos-and-donts.md`](../brand/voice/dos-and-donts.md)
- Confere o glossário em [`.specs/project/CONVENTIONS.md`](../.specs/project/CONVENTIONS.md)
- Mantém ton-anchor: *"Franco, com número, sem palco, com cerveja."*

### 5. Adicionar template (PR)

Templates de newsletter, LinkedIn, e-mail, banner de meetup vivem em `brand/templates/`. Pra contribuir:
- Confirma com [@henriquecaner](https://linkedin.com/in/henriquecaner) ou Founder Crew #2 que o template é necessário
- Aplica paleta + tipografia já decididas em `brand/visual/`
- Inclui exemplo de uso no PR

---

## Processo de revisão

### Issues

- **Triagem inicial:** em até 7 dias, mantenedor responde com label e direção
- **Sem resposta em 30 dias:** issue é fechado como `stale` (pode ser reaberto com novo dado)
- **Issue sem número:** label `precisa-numero` — fecha em 14 dias se não complementar

### Pull Requests

- **PR pequeno (< 50 linhas):** review em até 5 dias
- **PR grande:** discussão prévia em issue/discussion antes de codar
- **PR de copy/brand:** revisão obrigatória do mantenedor (sem merge automático)
- **PR de template/site:** revisão pelo Founder Crew responsável (ou mantenedor, na ausência)

### Discussions

Discussions não passam por triagem formal. A comunidade auto-modera com a régua editorial. Mantenedor entra apenas pra:
- Redirecionar discussão sem número (label `precisa-numero`)
- Resolver disputa
- Mover discussion pra outra categoria
- Fechar quando se torna pauta de meetup ou edição de newsletter

---

## Convenções

### Linguagem

- **Conversação no GitHub:** português brasileiro coloquial. Inglês só em código.
- **Mensagens de commit:** [Conventional Commits](https://www.conventionalcommits.org/), conforme histórico já estabelecido (`docs:`, `brand(visual):`, `brand(voice):`, `chore:`, etc.).
- **Para AI-assisted commits:** sempre incluir `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>` (ou modelo equivalente).

### Naming

Verifique [`.specs/project/CONVENTIONS.md`](../.specs/project/CONVENTIONS.md) **antes** de escrever:
- Nome canônico da comunidade: `Growth Club` (informal), `The Growth Club` (formal restrito)
- Tiers de membro: `Growth Hacker`, `Founder Member`, `Growth Hacker Master` — formas exatas
- Meetups: `Meetup Growth [CIDADE] · S[ANO] · E[EDIÇÃO] · [TEMA]`
- Termos preferidos: `Operação`, `Mesa`, `Bandeira`, `Stack`, `Operador`, `Pipeline real`, `Carregar meta`
- Termos vetados: `alavancar`, `disruptar`, `revolucionar`, `engajamento` (isolado), `growth hacker` (genérico, sem maiúscula)

### Issue/PR labels

Os labels canônicos do repositório:

- `precisa-numero` — issue/PR sem evidência mensurável
- `case` — caso real compartilhado pela comunidade
- `pauta-meetup` — sugestão de tema/edição
- `bug-site` — defeito no `growthclub.pro`
- `melhoria-template` — sugestão em template de canal
- `voice-edit` — mudança em copy/brand/voice (revisão obrigatória)
- `crew-only` — escopo de Founder Crew exclusivamente
- `good-first-issue` — boa pra primeira contribuição externa
- `stale` — sem atividade há > 30 dias
- `era-pre-s1` — relativo à Era Pré-S1 (até Barte S1E1)

---

## O que **não** entra no repo

- Conteúdo sem número
- Listas decorativas (*"10 dicas pra..."*, *"5 hacks de..."*)
- Print de Cursor / ChatGPT / n8n sem output de negócio
- Self-promo de produto/curso/serviço externo
- Ataque pessoal nominal (a regra é atacar padrão, não nome)
- Material confidencial de qualquer empresa (NDA, dado financeiro privado, lista de clientes)
- Qualquer coisa que viole a [LGPD](https://www.gov.br/anpd/pt-br) (dados pessoais sem consentimento)

---

## Quero ser Founder Crew

Vagas Era Pré-S1 abertas (3 cadeiras):

1. **Frontend (vibe coder)** — site `growthclub.pro`
2. **Designer + vídeo** — identidade aplicada nos canais
3. **Community manager / GitHub** — este repositório como ativo público

Termos completos em [`STATE.md` · AD-002](../.specs/project/STATE.md). Quem topa, manda DM no LinkedIn ([@henriquecaner](https://linkedin.com/in/henriquecaner)) com:
- Cadeira de interesse (1, 2 ou 3)
- 2 trabalhos passados que provam capacidade (com número quando possível)
- Disponibilidade de 90 dias upfront + 6h/mês depois

---

## Dúvidas

- **Comunicação rápida:** comunidade WhatsApp (acesso via ingresso de meetup)
- **Conteúdo público:** newsletter no [Substack](https://brgrowthclub.substack.com)
- **Direto com mantenedor:** [LinkedIn do Henrique](https://linkedin.com/in/henriquecaner)
- **Bug crítico no repo:** abrir issue marcado `urgent` ou DM no LinkedIn

---

**Mantenedor:** Henrique Caner · **Última revisão:** 2026-04-28
