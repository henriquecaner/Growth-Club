# Template · Subpágina autoral de Founder Crew

> Template usado quando Crew #1 (Frontend) montar `growthclub.pro/crew/[slug]`. Cada Crew member tem subpágina autoral durante a vigência do vínculo.

**Onde vai morar:** `growthclub.pro/crew/[slug]/index.html` (estática, gerada pelo Crew #1) ou `/crew/[slug]` como rota dinâmica.

**Quem mantém:** Crew #1 (Frontend) implementa o template; cada Crew member preenche o conteúdo individual.

---

## Estrutura mínima da página

```markdown
# [NOME DO CREW MEMBER]

**Cadeira:** [1 · Frontend / 2 · Designer + Vídeo / 3 · Community Manager / GitHub]
**Período:** Era Pré-S1 · 2026-2029
**Status:** [Ativo · em manutenção · em transição pra vaga paga]

---

## O que entreguei

[3-5 bullets do escopo upfront, cada um com número quando aplicável]

- [Entrega 1] — [número/resultado]
- [Entrega 2] — [número/resultado]
- [Entrega 3] — [número/resultado]

---

## Como você me encontra

- LinkedIn: [link]
- E-mail profissional: [opcional]
- Site/portfólio pessoal: [opcional]
- Outras pontes (Substack, GitHub, Twitter): [opcional]

---

## O que eu vou fazer pra próxima

[1-2 parágrafos sobre próximos passos, tanto no Growth Club quanto profissionalmente]

---

## Minha mesa de canto

[Bio pessoal autoral, primeira pessoa, 200 palavras max. Tom: livre — não precisa replicar exatamente o ton-anchor do Growth Club, mas não pode contradizê-lo (sem palco motivacional, sem self-promo vazio).]

---

> *Founder Crew · Era Pré-S1 · Growth Club*
```

---

## Regras de conteúdo

### Faça

✅ Use número em pelo menos 2 bullets do "O que entreguei"
✅ Inclua link LinkedIn (obrigatório) — outros são opcionais
✅ Bio em primeira pessoa, com voz própria
✅ Cite ferramentas/stack pelo nome oficial (régua [`CONVENTIONS.md`](../../.specs/project/CONVENTIONS.md))

### Não faça

❌ Self-promo vazio ("estou muito feliz em fazer parte...")
❌ Listas decorativas ("10 lições que aprendi...")
❌ Linguagem de palestrante de LinkedIn iniciante
❌ Promessas externas ao Growth Club que não te cabem entregar (ex: "marca a aula que vou dar próximo ano")

### Régua editorial

A subpágina autoral é **uma extensão do Growth Club**. Vale a régua: *Franco, com número, sem palco, com cerveja*.

Se sua bio começar com "Apaixonado por growth e sempre buscando inovar com soluções disruptivas...", a página vira teatro — vai ser editada pelo mantenedor.

---

## Saída do vínculo (importante)

Conforme [Cláusula 11 do Acordo de Founder Crew](../contracts/acordo-founder-crew.md):

- **Saída por qualquer causa** → subpágina autoral é **arquivada/redirecionada**
- **Artefatos publicados durante a vigência** (ex: PRs, posts, edições de livecast em que você apareceu) **não são redatados** — ficam como histórico
- **Crédito ativo no brand book** é removido das listagens vivas (mas o histórico permanece nos artefatos publicados)
- **Não é possível "manter sua subpágina como portfólio externo"** após saída — a subpágina morre. Para portfólio próprio, replicar conteúdo no seu site/LinkedIn antes da saída

---

## Como o Crew #1 implementa

Este template é a **referência funcional** — Crew #1 decide a stack do site (`growthclub.pro`) e implementa a página seguindo a estrutura.

Sugestão de implementação:

- Rota dinâmica `/crew/[slug]` lendo de markdown ou CMS leve
- Slug = primeiro nome em snake_case (ex: `mariana-silva` → `/crew/mariana-silva`)
- Imagem de header: foto profissional do Crew member (consentimento explícito) + paleta primária Growth Club
- SEO: meta description = primeira frase da bio
- Open Graph: imagem padrão Growth Club + nome do Crew

---

## Histórico

| Data | Mudança |
|---|---|
| 2026-04-28 | Template inicial criado |

---

> *Cada Crew tem direito a contar a própria história — dentro da régua da casa.*

**Mantenedor:** Henrique Caner · **Última atualização:** 2026-04-28
