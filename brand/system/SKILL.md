---
name: growth-club-design
description: Use this skill to generate well-branded interfaces and assets for Growth Club — newsletter covers, social posts (Instagram/LinkedIn), landing pages, meetup posters, slide decks. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for both prototypes and production.
user-invocable: true
---

# Growth Club — Design Skill

Read the `README.md` file within this skill, and explore the other available files.

**Core files to load:**
- `README.md` — brand story, voice, visual foundations, iconography, índice do repositório
- `colors_and_type.css` — todos os tokens (cores, type scale, spacing, radii, motion, semantic classes). Dual-theme via `[data-theme]`.
- `assets/` — logos placeholder em SVG. **Logo final do Growth Club ainda está em construção no Figma (Task 2.3 do brand brief plan)** — usar os placeholders apenas como stand-in até o vetor oficial substituir.
- `preview/*.html` — reference cards de cada fundação (cores, type, componentes, theme-comparison)
- `templates/*.html` — IG/LinkedIn prontos pra produção
- `ui_kits/website/` — landing institucional

**Fonte canônica de voz:** `brand/voice/` (vence em qualquer conflito com este SKILL.md ou com preview/*.html). Especificamente:
- `brand/voice/manifesto.md` — 3 versões (240/62/13 palavras). **Pitch curto canônico** (usar em hero, bio, assinatura): `"Especialista com especialista. Conversa entre pares. Sem teatro."`
- `brand/voice/dos-and-donts.md` — 10 DO + 10 DON'T + 5 exemplos comparativos completos.
- `brand/voice/tom-por-canal.md` — calibração por canal (newsletter, WhatsApp, livecast, site, LinkedIn, email).
- `brand/voice/glossario.md` — 20 termos preferidos + 10 evitados + regras de moeda/%/data.

**Princípios sempre presentes (locked no brand do GC):**

- **Headline canônico (hero/site/deck):** `"A #1 comunidade de Growth multidisciplinar do Brasil."` Pitch curto pra bio/assinatura: `"Especialista com especialista. Conversa entre pares. Sem teatro."`
- **Ton-anchor (régua interna de voz):** `"Somos remotos, criativos, gentis e engajados. Invista energia no seu crescimento ao lado de Founders, VPs, CMOs e especialistas que estão transformando o mercado."` — decisão 05 (AD-014). O ton-anchor antigo "Franco, com número, sem palco, com cerveja." está aposentado.
- **Curadoria sem rótulo:** triagem de candidatura mantém o nível, sem régua nominal pública. A régua "Se não tem número, não é Growth Club." está aposentada (AD-016).
- **Arquétipo:** Hero + Magician (AD-014). Aspiracional (transformar o mercado, elite) + transformação coletiva numa comunidade agnóstica onde a troca é real.
- **Light-first.** Fundo padrão `#F5F1E8` (Pub Cream, puxa pra amarelo quente — "luz de pub"), texto `#0A0A0A` (Growth Black). Dark mode é opt-in via `[data-theme="dark"]` em `<section>` específicas (hero/CTA/depoimento) — nunca página inteira dark.
- **Amber Beer `#D4A24C`** é o acento primário (CTAs, botões, links fortes). Em dark mode escala pra `#E5B45D`.
- **Pirate Teal `#4FB3A5`** é secundário (keywords destacadas, dots, indicadores positivos, success). Continuidade da bandeira pirata (decisão 01-B locked).
- **Brick Red `#B84A3E`** apenas em estados de alerta/danger e destaque contrarian ("desagradável com carinho"). NUNCA em CTAs positivos.
- **Satoshi** self-hosted em `fonts/Satoshi-Variable.ttf` (variable, eixo wght 300–900) + 10 estáticos como fallback. Aplica `font-feature-settings: 'kern' 1, 'liga' 1` global; `tnum` em números tabulares (`.t-num`); `ss01` em display. Tracking inverso ao tamanho: `-0.05em` em 100px+, `0` em body. Italic apenas editorial — nunca em UI.
- **Roboto** como mono pra IDs, dados tabulares, eyebrow labels.
- **Casing do nome:** sempre `Growth Club` (informal) ou `The Growth Club` (formal). Em copy/UI é texto editorial — preservar capitalização. A arte do wordmark (logo) é minúscula `growth club.` quando finalizada no Figma; distinção rígida: arte = minúscula, texto/prosa = `Growth Club`.
- **Sem emoji.** Marca não usa emoji. Preferir glifos textuais (`→ ↗ — · ×`) ou ícones Lucide.
- **Voz (resumo — consultar `brand/voice/glossario.md` antes de usar termo duvidoso):**
  - Preferidos: especialista, conversa entre pares, pipeline real, número, ciclo, fechou, bora, rota, navegar, teatro (uso crítico), "especialista com especialista".
  - Evitados: disruptar, revolucionar, escalar exponencialmente, alavancar, engajamento (isolado), hacks, "vamo que vamo", "estou muito feliz em anunciar", "Prezado", emoji em copy de marca.
- **Português BR coloquial** — "tá", "tô", "rolou", "bora", "fechou", "mano", "galera". Sem gírias de startup americana (~~hustle~~, ~~grind~~).

**Como aplicar tema:**
- `<html>` sem atributo = light (padrão).
- `<html data-theme="dark">` = dark mode (toda a página).
- `<section data-theme="dark">` = só aquela seção em dark (mais comum no GC — hero, CTA final, depoimento).
- Nunca hardcode cores — sempre `var(--...)`. Os tokens resolvem pelos dois temas.

**Aliases legados preservados:**
Tokens `--accent-violet*` apontam pra `--accent-amber*`, e `--accent-mint*` aponta pra `--accent-teal*`. Isso permite que cards do design system antigos do Level continuem renderizando sem refactor. **Não usar nomes legados em código novo** — usar `--accent-amber` e `--accent-teal` diretos.

**Se criando artefatos visuais** (slides, mocks, prototypes), copie assets de `assets/` e use os tokens de `colors_and_type.css` via `@import`. Se trabalhando em código de produção, leia as regras e vire expert em design com essa marca.

**Se o usuário invocar esta skill sem guidance**, pergunte o que quer construir/desenhar (post IG, newsletter cover, landing section, slide, pôster de meetup), faça 3-5 perguntas focadas (fidelidade, variações, tema claro/escuro, público, números reais a destacar), e atue como designer expert gerando HTML ou código de produção.

**Ancoragem nas decisões locked:**
- Paleta: `brand/visual/paleta-primaria.md` (com banner de rebalanceamento AD-008)
- Tipografia: `brand/visual/tipografia.md` (SUPERSEDED parcial por AD-008 — Satoshi substitui Archivo Black como display)
- Arquétipo + voz: `brand/decisions/05-archetype-multidisciplinar.md` (Hero + Magician — AD-014; Decisão 03 Outlaw+Sage arquivada em `brand/legacy/`)
- Voz canônica: `brand/voice/{manifesto,dos-and-donts,tom-por-canal,glossario}.md`
- Logo (em construção): `brand/visual/canva-logo-prompt.md` + `brand/visual/nano-banana-prompt.md`
