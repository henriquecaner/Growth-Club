# Ghost no apex — site unificado com benchmark PMA · Design Spec

**Date:** 2026-06-11
**Status:** Draft — aguarda aprovação do Henrique
**Autor:** Claude (Opus 4.8) + Henrique
**Relaciona:** AD-006/007 (site v1 Pages), AD-008 (Design System), AD-023..031 (Ghost em /content), [[project-newsletter-ghost-rrm]]

---

## 1. Decisão e intenção

Unificar o site inteiro do Growth Club dentro do **Ghost**, espelhando a **arquitetura de informação e os motores funcionais** do Product Marketing Alliance (`productmarketingalliance.com`) — que roda Ghost 6.45 + Varnish + tema bespoke no domínio raiz. PMA é a **fonte da verdade para estrutura/features**, não para o visual: a pele continua sendo o Growth Club Design System (AD-008 — Pub Cream/Amber/Satoshi/Roboto, voz "franco, com número, sem palco, com cerveja").

**Não é clonar o tema do PMA.** O tema deles é trabalho criativo proprietário (copyright) e copiá-lo nos transformaria num clone visual. Mapeamos a função (IA, tipos de página, features — fatos não-autorais) e construímos um tema **próprio, suportado (gscan), partindo da base oficial `Source` do Ghost**, vestido com o nosso DS.

### Decisões travadas nesta sessão (2026-06-11)
- **Apex:** `growthclub.pro/` inteiro passa a ser Ghost. As 21 páginas hoje no Cloudflare Pages migram pra dentro do tema. (Hoje Ghost vive em `/content`; alvo = raiz.)
- **Escopo v1 de motores:** **Meetups** (listagem filtrável) + **Content Hub** (biblioteca filtrável) + **Página de planos** (Growth Hacker free + avulsos). Home/Sobre/Contato de base. **Fora do v1:** quiz/trilha interativa, periodic table, job board, salary calculator, certificações, as 6 sub-alliances.

---

## 2. De-para funcional: PMA → Growth Club

| PMA (estrutura — fonte da verdade) | Growth Club (nossa versão) | Status v1 |
|---|---|---|
| Home: hero + stats + logos + quiz + frameworks + periodic table + resource library + newsletter | Home: hero + stats reais (2.261 subs / 715 WhatsApp / 10+ meetups) + logos das empresas dos membros + trilha simples + biblioteca + bloco assinar | ✅ v1 (sem quiz/periodic) |
| 6 Alliances (verticais) | — (somos vertical única: growth B2B) | ❌ não mapeia |
| Membership: 4 tiers + tabela comparativa + FAQ | Página de planos: Growth Hacker (free) + produtos avulsos (workshop, meetup). **Sem tabela de 4 tiers** | ✅ v1 (Master/Founder seguem parqueados e fora do site) |
| Events: grid/list, filtros tipo/mês/país/cidade/nível, RSVP, ticket | **Motor de Meetups**: mesma listagem filtrável | ✅ v1 — motor épico #1 |
| Content Hub: biblioteca filtrável (reports/articles/guides/ebooks/podcasts/templates), tags, sort | **Content Hub**: newsletter Ghost + recursos, filtrável por tag/tipo, sort | ✅ v1 — motor épico #2 |
| Certifications / Training / PMM-IQ | Workshops (AI LIKE A PRO) | ⏳ v2 (vira hub de workshops) |
| Job board / Salary calc / Scholar | — | ❌ fora de escopo |
| Periodic table / Journey quiz | trilha do especialista | ⏳ v2+ (gimmick caro) |
| Mega-menu Explore + footer denso | nav + footer multi-coluna | ✅ v1 |

---

## 3. De-para de migração: 21 páginas do Pages → Ghost

O site atual (Cloudflare Pages, HTML estático + web components `<gc-header>`/`<gc-footer>`) tem 21 páginas. Mapeamento pro Ghost:

| Página Pages | Destino no Ghost | Mecanismo |
|---|---|---|
| `index.html` | Home | Template `home.hbs` (custom, `is_home`) |
| `sobre.html` | /sobre | Ghost **page** + template `page.hbs` |
| `empresas.html` | /empresas | Ghost page (pitch B2B/patrocínio) |
| `membro.html` | /planos | Ghost page + template `page-planos.hbs` |
| `contato.html` + `contato/obrigado.html` | /contato | Ghost page + form (Tally embed ou nativo) + página de obrigado |
| `meetups/index.html` | /meetups | **Collection** `meetup` (routes.yaml) + template `index-meetups.hbs` (motor filtrável) |
| `meetups/historico.html` | /meetups (filtro "passados") | mesmo motor, filtro client-side |
| `meetups/sp-s1-e1.html` | /meetups/sp-s1-e1 | Post na collection `meetup` + template `post-meetup.hbs` |
| `recursos/{aulas,comunidade,livecast,newsletter,workshops}.html` | /recursos | **Content Hub** filtrável por tag (`#aula`, `#livecast`, etc.) |
| `ai-like-a-pro/index.html` | /ai-like-a-pro | Ghost page (mantém form Tally) — **decisão pendente** (ver §7) |
| `codigo-de-conduta`, `lgpd`, `privacidade`, `termos` | /legal/* | Ghost pages + template `page.hbs` |
| `404.html` | erro | `error.hbs` |
| `membro/obrigado.html` | /obrigado | Ghost page |

`<gc-header>`/`<gc-footer>` (web components) viram **partials Handlebars** (`partials/header.hbs`, `partials/footer.hbs`) — o tema renderiza server-side em vez de hidratar no cliente, o que é melhor pra SEO e pra cache.

---

## 4. Arquitetura técnica

### 4.1 Estado atual vs alvo

```
ATUAL:
  growthclub.pro/*          → Cloudflare Pages (site estático, 21 páginas)
  growthclub.pro/content/*  → Worker growth-club-newsletter → GhostContainer

ALVO:
  growthclub.pro/*          → Worker growth-club-newsletter → GhostContainer (Ghost = site inteiro)
  (Pages retirado/arquivado; assets estáticos servidos pelo tema ou R2)
```

Mudanças no Worker (`src/index.js`):
- Route passa de `growthclub.pro/content[/*]` pra `growthclub.pro/*` (apex wildcard). **Exceção crítica:** não capturar o que precisa ficar fora do Ghost (ex.: `/.well-known/*` de email/DNS, se houver). Auditar antes do cutover.
- Ghost `url` config muda de `https://growthclub.pro/content` pra `https://growthclub.pro`.
- Os paths internos perdem o prefixo `/content`: `/content/images/*` → `/images/*`, `/content/_analytics/*` → `/_analytics/*`, `/content/_gc/*` → `/_gc/*`, `/content/ghost/` → `/ghost/`. Atualizar consts (`PUBLIC_URL`, `TB_TRACKER_ENDPOINT`) e o roteamento R2/analytics.
- **Redirects 301** de `/content/*` → `/*` (preservar links já publicados da newsletter e o que o Google/RRM já indexou).

### 4.2 Pré-requisito GATING — infra (Plano A, bloqueia o cutover)

Com Ghost servindo a **home** (não só `/content`), dois problemas do setup atual viram bloqueadores:

1. **Aiven MySQL free dorme por inatividade** (incidente AD-025). Aceitável quando só `/content` dependia dele; **inaceitável** quando a home do site depende. Primeiro visitante após o sleep pegaria cold-start de 1-3min ou erro. → **Precisa de DB que não dorme.** Opções (decisão pendente §7): (a) Aiven plano pago; (b) keep-alive cron (Worker Cron pingando o DB a cada N min — mantém free mas é frágil); (c) migrar o DB.
2. **Cold start do container ~30s-3min** (npm install ghos3 + tema + boot). → **Edge cache no Worker** (Cloudflare Cache API): cachear respostas HTML `GET` de visitante anônimo (TTL curto, ex. 5-10min, com `stale-while-revalidate`), **bypass** pra requests com cookie de membro logado e pra `/ghost/*` (admin). É o equivalente funcional do Varnish do PMA. Com cache quente, cold-start e latência do DB (~1,5s SFO) ficam invisíveis pra maioria dos pageviews.

> Sem (1) **e** (2) resolvidos, o cutover do apex é irresponsável — pode derrubar o site público. Plano A é pré-requisito duro dos Planos B/C.

### 4.3 Base do tema

- **Source** (tema oficial do Ghost, mantido pela própria Ghost, pensado pra ser customizado e estendido). É o "template padrão suportado Ghost" — começamos dele em vez do zero e sem copiar ninguém.
- Reaproveitar o CSS de tokens do DS que já existe no tema `gc-news` (AD-008/AD-026) — fontes Satoshi+Roboto self-hosted, paleta, componentes.
- gscan limpo (0 erros) é gate de cada deploy, como no `gc-news`.

### 4.4 Motores (features Ghost que o Casper/Source não têm nativo)

- **Meetups** e **Content Hub** = **collections** declaradas no `routes.yaml` do Ghost (roteamento dinâmico nativo) + templates de listagem que renderizam cards + **camada de filtro client-side** (JS vanilla sobre os cards renderizados, ou consultas à Content API). Tags carregam os metadados (tipo de evento, cidade, formato de recurso).
- Disco efêmero do container: o `routes.yaml` e o tar.gz do tema precisam ser injetados a cada cold start pelo BOOT_SCRIPT (mesmo padrão do adapter ghos3 e do `gc-news`).

---

## 5. Sequência de execução (3 sub-planos)

Cada sub-plano vira um doc próprio em `docs/superpowers/plans/` (via `superpowers:writing-plans`), executável e testável isoladamente.

1. **Plano A — Hardening de infra** (pré-requisito): DB no-sleep (decisão §7) + camada de edge cache no Worker. Testável em `/content` antes de qualquer cutover.
2. **Plano B — Tema sobre Source + DS + 3 motores**: construído e validado rodando ainda em `/content` (Ghost continua no subpath durante o build; o tema é agnóstico ao prefixo). gscan limpo, preview de todas as páginas.
3. **Plano C — Cutover do apex**: re-rotear apex, migrar as 21 páginas como Ghost pages/posts, redirects 301 de `/content/*`, retirar Pages, auditar `/.well-known`. Janela de manutenção curta + rollback documentado.

---

## 6. Riscos

| Risco | Mitigação |
|---|---|
| Cutover derruba o site público vivo | Plano A obrigatório antes; cache quente; rollback = reverter route pro Pages (Pages fica arquivado, não deletado, por ≥30 dias) |
| Email Google Workspace quebrar | **Não afeta** — é MX (DNS), não HTTP. Apex MX Google intacto. Confirmar que o Worker não intercepta `/.well-known` de DKIM/DMARC |
| Links publicados da newsletter (`/content/*`) quebram | Redirects 301 `/content/*` → `/*` no Worker |
| SEO: URLs mudam | Redirects 301 + sitemap do Ghost + manter slugs das páginas institucionais |
| Custo (Aiven pago + container sempre quente) | Decisão §7; cache reduz pressão no container |
| Tema fica órfão (Founder Crew #1 não preenchido) | Spec + plano documentados pra handoff; build pode ser do Claude no interim |

---

## 7. Decisões pendentes (pré-Plano A)

1. **DB no-sleep — RESOLVIDO (2026-06-11): keep-alive cron no Aiven free** (custo zero, ponte explícita). Implementação: Worker Cron Trigger a cada poucos minutos chama um endpoint `/_gc/keepalive` que roda um `SELECT 1` real contra o MySQL (ping TCP não conta como atividade pro idle-detection do Aiven — precisa de query). Ressalva aceita: é frágil (cron falha ou Aiven muda política → dorme). **Edge cache (§4.2) é a rede de segurança:** com páginas anônimas cacheadas + `stale-while-revalidate`, mesmo um sleep do DB não derruba a home pública — serve stale enquanto o container/DB reacordam.
2. **AI LIKE A PRO** — a página in-site vira Ghost page no apex, ou continua apontando pro produto externo (repo separado, InfinitePay)? (Hoje é page in-site com form Tally — AD-009/010.)
3. **Pages — retirar ou manter como fallback?** Recomendação: arquivar (não deletar) por ≥30 dias pós-cutover.

---

## 8. Próximo passo

Aprovada a spec + resolvidas as 3 pendências do §7 → `superpowers:writing-plans` do **Plano A** (hardening de infra), que é o que destrava todo o resto.
