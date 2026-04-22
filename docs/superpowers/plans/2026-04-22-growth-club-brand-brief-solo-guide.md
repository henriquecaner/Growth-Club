# Growth Club — Brand Brief Solo Execution Guide

> Companion ao plano principal em `2026-04-22-growth-club-brand-brief.md`. Consulte o plano pra **o quê/sequência**. Consulte este guia pra **como sobreviver fazendo sozinho**.

**Executor:** Henrique Caner (solo, sem designer freela)
**Timeline alvo:** 5-7 semanas · checkpoint obrigatório ao fim da Semana 3
**Viés central deste guia:** máximo de decisão rápida, máximo de timebox, mínimo de perfeccionismo.

---

## 1. Timeline semanal sugerida (5-7 semanas)

| Semana | Foco | Saída |
|---|---|---|
| **1** | Chunk 1 completo (4 decisões estratégicas: bandeira pirata, nome canônico, arquétipo/ton-anchor, marcas-filhas) | 4 arquivos em `brand/decisions/` · decisões lockadas |
| **2-3** | Chunk 2 (paleta + tipografia + logo) | SVGs de logo em 5+ variações · paleta documentada · teste blind de 5 membros feito |
| **4** | Chunk 3 (manifesto + do's/don'ts + tom por canal + glossário) | 4 arquivos em `brand/voice/` · ton-anchor claro |
| **5** | Chunk 4 (templates meetup + newsletter + site handoff) | Templates Figma + markdown specs |
| **6** | Chunk 5 (brand book MD + PDF + export pack + CONVENTIONS) | brand-book-v1.pdf + tudo empacotado |
| **7** (buffer) | Retrabalho, polimento, post-sync, validação final | Pronto pra fase Site |

**Regra da Semana 3:** se, ao fim dela, o Chunk 2 não estiver travado (logo finalizado + paleta testada), reavalie. Três opções:
1. Contratar freela pontual só pro logo (custo ~R$ 2-5k em designer sênior, economiza semanas)
2. Estender timeline pra 8-9 semanas
3. Cortar escopo da v1 (ex.: logo mais simples; templates de meetup + newsletter apenas, deixar site handoff pra depois)

---

## 2. Ferramentas recomendadas por Chunk

### Chunk 1 — Decisões estratégicas
**Principal:** Markdown + Obsidian ou VS Code (os arquivos em `brand/decisions/` são puro texto).
**Pra arquétipos:** PDF "The Hero and the Outlaw" (Mark & Pearson) resumos gratuitos na internet. Não compre o livro na v1 — bulletpoints do Wikipedia + blog posts bastam.
**Pra pirata:** Google Images + Are.na + Pinterest pra fazer mini-moodboard das direções da Task 1.1.

### Chunk 2 — Sistema visual

| Sub-task | Ferramenta | Custo | Notas |
|---|---|---|---|
| Paleta | **Coolors.co** ou **Realtime Colors** (realtimecolors.com) | Grátis | RealtimeColors testa contraste em UI ao vivo — matador |
| Tipografia | **Fontshare** + **Google Fonts** | Grátis | Fontshare tem tipografias premium-quality grátis |
| Logo | **Figma** | Grátis (plano free serve) | Pra vetorizar rascunhos: desenha primeiro em papel, fotografa, traça no Figma |
| Teste de contraste | **WebAIM Contrast Checker** | Grátis | WCAG AA/AAA automático |
| Benchmark visual | **Land-book.com** + **Brand New (underconsideration.com)** | Grátis | Pra moodboards editoriais |

### Chunk 3 — Voice & Tone
**Frameworks de referência (leitura rápida, não compre livros):**
- Nielsen Norman "4 Dimensions of Tone of Voice" (blog, 5 min)
- Mailchimp Style Guide (open source, ótimo modelo)
- Intercom's tone guide (publicado, procurar "Intercom brand voice")

**Ferramenta:** Markdown. Ponto. Não super-engenheire isso.

### Chunk 4 — Templates
**Figma Community** tem templates gratuitos de:
- Meetup poster (busque "event poster template")
- Newsletter (busque "newsletter header")
- Component kit (busque "design system starter")

Não parta do zero — duplique um template, rebranda. **Economia de ~50% do tempo.**

### Chunk 5 — Brand book
- **Markdown → PDF:** `pandoc` com tema custom. Alternativa mais bonita: montar direto no Figma e exportar PDF.
- **Export pack (favicons etc.):** **realfavicongenerator.net** automatiza tudo (ico, touch-icons, manifest.json). Upload seu SVG, baixa o pack completo.

---

## 3. Uso estratégico de IA (Claude/GPT) — acelerador, não substituto

Você é assistido por LLMs. Use. Mas sem terceirizar gosto.

### Onde IA **acelera** (use)

| Sub-task | Prompt-padrão |
|---|---|
| Destilar ton-anchor (Task 1.3 Step 5) | "Dada esta descrição de arquétipo primário X + secundário Y + posicionamento Z, destile 5 opções de ton-anchor de 5-7 palavras. Critério: memorável, específico, usável como régua." |
| Gerar do's/don'ts primeiros drafts (Task 3.2) | "Gere 10 do's e 10 don'ts de voz pra uma comunidade de Growth com arquétipo Outlaw primário, Sage secundário, posicionamento 'execução > teatro'. Estilo brasileiro coloquial." |
| Refinar manifesto (Task 3.1) | "Refine este manifesto mantendo o espírito 'mesa de canto de um pub' mas cortando 30% do texto sem perder força." |
| Mockup de copy de peça (Task 4) | "Escreva 3 variações da primeira frase de uma newsletter do Growth Club no tom X apresentando o tema Y." |
| Glossário (Task 3.4) | "Sugira 20 termos que soem 'Growth Club' e 10 termos que evitariamos, com justificativa breve por trás de cada." |

### Onde IA **não ajuda** (não use)

- Escolher arquétipo primário (é decisão estratégica do fundador — terceirizar aqui destrói diferenciação)
- Desenhar logo (IA de imagem gera genérico; a identidade precisa ser sua)
- Escolher paleta (contexto cultural + sensibilidade visual brasileira + referência de bandeira pirata são teu, não do modelo)
- Validar "está bom" (IA não tem critério comercial — você tem)

### Pitfall da IA em design solo

Risco: usar IA pra gerar tudo, achar "está bom" sem passar pelo seu filtro. Evita isso com a regra:

> **"IA pra rascunho. Eu pra decisão."**
>
> Todo output de IA vira ponto de partida pra editar, nunca saída final.

---

## 4. Anti-armadilhas de designer solo

Problemas específicos de quem faz sozinho sem sparring:

### A. Paralisia de decisão no Chunk 1

Sintoma: Task 1.1 (bandeira pirata) vira 3 dias de deliberação.

Solução: **timebox de 4 horas por decisão estratégica.** Se em 4 horas não decidiu, **force uma coinflip** e registra: "escolhi A por default, não tinha racional claro pra B ou C." Decisões reversíveis do Chunk 1 podem ser revisitadas se necessário.

### B. Gosto em eco-câmara

Sintoma: você ama sua paleta, mas ela é igual à de 80 concorrentes.

Solução: teste blind de 5 membros (Task 2.1 Step 5.2) **não é opcional quando solo**. Com freela, o freela faz sparring. Sem freela, os 5 membros são teu sparring forçado. **Faz esse teste mesmo que dê vergonha.**

### C. Perfeccionismo no logo

Sintoma: 3 semanas só em iterações de logo.

Solução: **"perfeito" não é o alvo — "consistente" é.** Se o logo aguenta: favicon, avatar LinkedIn, pôster impresso, monochrome em fundo preto, e não parece ridículo em nenhum, está bom. **Commit e avança.** Rebrand v2 sai na Fase 2 se necessário.

### D. Overbuilding de templates

Sintoma: templates de meetup com 15 variações, cada cidade com sua paleta secundária.

Solução: **Task 4.1 v1 = 1 template reaproveitável que troca 3 campos (cidade, episódio, tema). Só.** Variação regional sai depois se a comunidade crescer.

### E. Brand book que ninguém lê

Sintoma: brand book de 80 páginas bonito, mas designer externo/você mesmo nunca consulta.

Solução: **brand book v1 = máximo 25 páginas**, priorizando:
- Manifesto curto (1 página)
- Paleta + tipografia (2-3 páginas)
- Logo do's/don'ts (2 páginas)
- Voice glossário (2-3 páginas)
- Template showcase (3-5 páginas)
- FAQ "como aplicar em X" (5 páginas)

---

## 5. Sinais de "tá bom o suficiente, next"

Quando parar de iterar cada deliverable:

| Artefato | Sinal de "próximo" |
|---|---|
| Decisões de Chunk 1 | Você consegue explicar a decisão pra um amigo fora da área em 30s |
| Paleta | Passou o teste blind de 3/5 + passa WCAG AA em todas combinações texto/fundo |
| Logo | Funciona em favicon + avatar LinkedIn + pôster A3 sem parecer ridículo |
| Manifesto | Se alguém lê só o manifesto curto, entende quem, pra quem, diferencial |
| Do's/Don'ts | Você consegue classificar 5 posts de competidor como "on-brand Growth Club" ou "off-brand" sem dúvida |
| Templates | Você faz uma peça nova trocando 3 campos em < 15 min |
| Brand book | Sua mãe (ou alguém totalmente fora da área) lê e entende o que é o Growth Club |

Se algum desses sinais não acendeu, itere. Se acendeu, **commit e next.**

---

## 6. Orçamento sugerido (se quiser apoiar o solo com pequenas injeções)

All-solo puro = R$ 0. Se quiser acelerar pontualmente:

| Item | Custo aproximado | ROI |
|---|---|---|
| Designer freela só pro logo (entrega em 1 semana) | R$ 2.000-5.000 | Alto — economiza 2 semanas suas |
| Ilustrador pra refinar bandeira pirata (se Task 1.1 decidir "Evoluir") | R$ 500-2.000 | Médio |
| Licença premium de fonte (se não couber no free) | R$ 200-800 | Baixo — Fontshare cobre 95% dos casos |
| Figma Pro (se precisar de Variables avançadas) | R$ 0-600 | Baixo — plano free cobre v1 |
| Revisão de copy do manifesto por um redator de marca | R$ 500-1.500 | Alto se você duvidar do próprio polimento |

**Total máximo** pra freelas pontuais: R$ 3-9k. Compare com o custo de oportunidade de 2-3 semanas solo.

---

## 7. Checkpoint de meio-de-caminho (obrigatório, fim da Semana 3)

Ao fim do Chunk 2, pare. Antes de avançar pra Chunk 3, responda:

- [ ] Consegui travar logo + paleta + tipografia sem grudar?
- [ ] Passei no teste blind de 5 membros (≥ 3 acertos)?
- [ ] Acumulei retrabalho significativo? (se sim — estender timeline agora)
- [ ] Quero continuar solo ou contratar freela pontual pros restantes?

Commita as respostas em `brand/solo-checkpoints.md` pra posteridade.

---

## 8. Próximo movimento desta sessão

Se quiser, podemos:

- **Destravar a Task 1.1 (bandeira pirata) agora** — me dá 2 frases sobre seu gut feeling; eu devolvo análise das 3 direções com recomendação
- **Esboçar o arquétipo primário (Task 1.3)** — te faço 3 perguntas e você converge
- **Ajudar com o manifesto (Task 3.1)** — parto da copy atual e te devolvo 3 variações de 50-80 palavras e 3 de 10-15 palavras
- **Consolidar o moodboard de referências (Task 2.1a)** — me dá 5 links de marcas que te inspiram e eu estruturo os padrões visuais em comum

Ou simplesmente: você assume daqui, executa na tua semana, e volta quando precisar de sparring.
