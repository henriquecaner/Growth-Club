# Plano A — Hardening de infra (DB no-sleep + edge cache)

> Sub-plano de AD-032 e **pré-requisito duro** do cutover do apex (Plano C). Toca o Worker de produção (`growth-club-newsletter/src/index.js` + `wrangler.jsonc`) — **deploy espera o Henrique** (mexe no site vivo, ainda que só em `/content` até o cutover). Spec: `docs/superpowers/specs/2026-06-11-ghost-apex-pma-benchmark-design.md` §4.2.

**Goal:** Ghost aguentar servir a home no apex sem cair quando o Aiven free dorme nem expor cold-start de 1-3min ao visitante.

**Decisão (AD-032):** DB no-sleep = **keep-alive cron grátis** (não migrar pro Aiven pago). Edge cache = rede de segurança.

---

## Parte 1 — Keep-alive cron (mantém Aiven free acordado)

O Aiven free desliga por inatividade (incidente AD-025). Ping TCP **não** conta como atividade — precisa de query real.

**Tarefas:**
1. `wrangler.jsonc`: adicionar `"triggers": { "crons": ["*/5 * * * *"] }` (a cada 5 min).
2. `src/index.js`: implementar `scheduled(event, env, ctx)` que faz `fetch` **direto no GhostContainer** (bypassando o edge cache) numa rota dinâmica leve — ex. `/content/ghost/api/content/settings/?key=...` ou a própria `/content/` com header `x-gc-bypass-cache: 1`. Isso força o Ghost a consultar o MySQL → Aiven registra atividade → não dorme. Bônus: mantém o container quente e o cache morno.
3. Confirmar via `wrangler tail` que o cron dispara e o `dbcheck` segue `tcp OK` após horas ocioso.

**Ressalva (aceita):** se o cron falhar ou o Aiven mudar a política de idle, o DB dorme. A Parte 2 cobre esse caso.

---

## Parte 2 — Edge cache no Worker (equivalente ao Varnish do PMA)

**Tarefas:**
1. `src/index.js`, no `fetch()`, **antes** de mandar pro GhostContainer, gate de cache para requests cacheáveis:
   - Só `GET`/`HEAD`.
   - **Bypass** se: path começa com `/ghost` (admin), `/members`, `/content/r/` (tracking), `/_gc/*`, `/_analytics/*`; OU header `x-gc-bypass-cache`; OU cookie de membro logado (`ghost-members-ssr` / `ghost-members-ssr.sig`) presente.
2. Para requests cacheáveis: `const cache = caches.default; let res = await cache.match(request)`. Hit → retorna. Miss → busca no container, e se `200` com `content-type: text/html`, clona e `ctx.waitUntil(cache.put(request, resClone))` com header `Cache-Control: public, max-age=300, stale-while-revalidate=86400` (5 min fresco, 24h stale enquanto revalida).
3. **Invalidação:** o `restartGhost()` / deploy de conteúdo novo deve purgar — implementar `caches.default.delete` por URL no `/_gc/restart`, ou aceitar o TTL de 5 min (simples; publicação aparece em ≤5 min). Decidir no momento.
4. Garantir que `stale-while-revalidate` cubra o caso do DB dormir: visitante anônimo pega a versão stale instantânea enquanto o container/Aiven reacordam em background.

**Verificação:** `curl -sI https://growthclub.pro/content/` mostra header de cache; segundo request vem com `cf-cache-status`/header próprio de HIT; request com cookie de membro sempre bypassa (conteúdo gated nunca cacheia).

---

## Ordem
Parte 1 e 2 são independentes; fazer as duas antes do Plano C. Testar em `/content` (baixo tráfego) antes do apex. Atualizar README do repo com os runbooks de cron e cache.
