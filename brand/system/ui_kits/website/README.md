# Growth Club — Marketing Website UI kit

Landing institucional single-page com scroll longo + sub-page de manifesto.

## Estrutura

- `index.html` — landing completa. Seções:
  - **Nav** sticky com blur (Sobre · Os 4 espaços · Meetups · Empresas)
  - **Hero** com headline `"Se não tem número, não é Growth Club."` + gradiente radial Amber/Teal + 5 stats (2.261 subs, 715 ativos, 10+ meetups, 391 core, 11 anos)
  - **Problem** (4 cards: Palco · Guru · Networking · Patrocinado)
  - **Layers** — Os 4 espaços (Newsletter · WhatsApp · Meetup · Livecast)
  - **Timeline** — Roadmap 2026 (4 fases: marca, crew, meetup, master)
  - **Manifesto big** — Ton-anchor "Franco, com número, sem palco, com cerveja."
  - **Quote** — "A rataria com nome pomposo continua. A gente continua chamando de rataria."
  - **CTA final** com radial Amber glow
  - **Footer** com colunas (Comunidade · Sobre · Empresas)
- `sub-page.html` — Manifesto Outlaw + Sage. TOC sticky + 6 seções (Palco · Mesa · Régua · Outlaw+Sage · Cerveja · Crew).

## Padrões usados

- `--gradient-hero` no hero section
- `--gradient-architect` no manifesto-big (Pub Cream em 3 tons)
- Botão primário: Amber com glow on hover
- Inline `<em>` em headlines aplicando `var(--accent-amber)` em 1 palavra
- Eyebrows e accents secundários em `var(--accent-teal)` (Pirate Teal)
- `.amber` span no `growth club.` em footer — signature da marca
- Icons: Lucide via CDN (substituição padrão — flag pra GC fase 2)

## Como customizar

- Editar copy diretamente nos `<section>` — toda copy é em prosa GC, não tem template engine
- Stats no hero (`stats-row`) — trocar números à mão se atualizar
- Roadmap em `.timeline` — atualizar fases trimestre a trimestre
- Footer columns — atualizar links externos (Substack URL, Tally form, etc.) quando definidos

## Pendências (logo final)

`assets/logo-*.svg` ainda são placeholders textuais. Quando vetor final sair do Figma (Task 2.3 brand plan), substituir mantendo nomes — `<img src>` references não precisam mudar.

## Não recriado

- Página de Empresas detalhada (`/empresas` single-page com anchors `#patrocinio`, `#vagas`, `#hunting`, `#mentoria`) — link no footer aponta pra placeholder
- Histórico de meetups com hub + LP individual por edição — link no footer aponta pra placeholder
- Páginas legais (termos, privacidade, LGPD) — esqueleto vai ser criado no site real em `growthclub.pro`
- Formulário real de inscrição newsletter — pingar Tally (`tally.so/r/BzLJO4`) quando integrar
