# Newsletter Ghost — Fase 1 (Infra + roteamento `/content`) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: use `superpowers:subagent-driven-development` (recomendado) ou `superpowers:executing-plans` pra implementar task-by-task. Passos usam checkbox (`- [ ]`).

**Goal:** Colocar o Ghost de produção rodando em `growthclub.pro/content` (Cloudflare Container + Aiven MySQL + Workers Route), sem quebrar o site institucional.

**Architecture:** Um Worker com Durable Object `Container` (imagem `ghost:6-alpine` puxada do Docker Hub) atrás de um **Workers Route `growthclub.pro/content/*`**; o Ghost roda com `url` de subpath; banco **Aiven MySQL 8** (FK nativo + SSL com CA cert); todo o resto de `growthclub.pro` continua no **Cloudflare Pages** (intocado). Hyperdrive entra como otimização opcional.

**Tech Stack:** Cloudflare Workers + Containers (`@cloudflare/containers`), Ghost 6.x, Aiven MySQL 8, wrangler, conta Cloudflare `Caner account` (`c0ceab96eb1cb02cf9fb6f8cc6fa2cd6`).

**Pré-validado no spike (2026-06-09):** Ghost 6.44 roda em CF Container + Aiven MySQL ponta a ponta (migrations + membros + admin → 200). Falta provar só o **roteamento `/content`** (Tarefa 1) — único risco aberto.

---

## File Structure (repo novo `growth-club-newsletter`)

- `wrangler.jsonc` — Worker do Ghost: container `ghost:6-alpine`, DO binding, **Workers Route `growthclub.pro/content/*`**, migrations.
- `src/index.js` — `GhostContainer` (env MySQL via secret + `url` subpath + SSL CA) + `fetch` que roteia pro container.
- `package.json` — dependência `@cloudflare/containers`.
- `route-test/` — Worker descartável da Tarefa 1 (deletado após o gate).
- `README.md` — setup, secrets, deploy, runbook.

Secrets (via `wrangler secret put`, nunca no repo): `GHOST_DATABASE_URL`, `GHOST_DB_CA` (CA cert do Aiven).

---

## Task 1: Gate de roteamento — provar Worker-`/content` + Pages coexistem

> ⚠️ **Toca a zona de produção `growthclub.pro`.** Operador deve aprovar conscientemente. Rota num path de teste (não usado pelo site); reversível.

**Files:**
- Create: `route-test/wrangler.jsonc`
- Create: `route-test/src/index.js`

- [ ] **Step 1: Criar o Worker de teste**

`route-test/src/index.js`:
```js
export default {
  fetch(request) {
    const url = new URL(request.url);
    return new Response(`ROUTE-TEST OK: ${url.pathname}\n`, {
      headers: { 'content-type': 'text/plain; charset=utf-8' },
    });
  },
};
```

`route-test/wrangler.jsonc`:
```jsonc
{
  "name": "gc-route-test",
  "main": "src/index.js",
  "compatibility_date": "2026-06-01",
  "account_id": "c0ceab96eb1cb02cf9fb6f8cc6fa2cd6",
  "routes": [
    { "pattern": "growthclub.pro/_gc_routetest/*", "zone_name": "growthclub.pro" }
  ]
}
```

- [ ] **Step 2: Deploy do Worker de teste**

Run: `cd route-test && wrangler deploy`
Expected: deploy OK + a route `growthclub.pro/_gc_routetest/*` listada.

- [ ] **Step 3: Verificar a coexistência (3 curls)**

```bash
curl -s -m 25 "https://growthclub.pro/_gc_routetest/x"      # deve dar "ROUTE-TEST OK: /_gc_routetest/x"
curl -s -m 25 "https://growthclub.pro/" | grep -o "<title>[^<]*</title>"   # deve ser o título do SITE
curl -s -m 25 "https://growthclub.pro/sobre" | grep -o "<title>[^<]*</title>" # deve ser o SITE
```
Expected: o subpath retorna "ROUTE-TEST OK"; `/` e `/sobre` continuam o site institucional (Pages intocado).

- [ ] **Step 4: Decisão go/no-go**

- ✅ Worker pegou o subpath E site intacto → **GO**: `/content` é viável. Seguir.
- ❌ Worker não pegou (Pages reivindica `/*`) ou site quebrou → **fallback subdomínio**: usar `boletim.growthclub.pro` (DNS CNAME → Worker via Custom Domain). Reverter este plano pra subdomínio (Ghost `url=https://boletim.growthclub.pro`, sem Workers Route). O resto das tarefas é idêntico, só muda `url` + como o Worker é exposto.

- [ ] **Step 5: Remover o Worker de teste**

Run: `wrangler delete --name gc-route-test` (e remover a route no dashboard se persistir).
Expected: rota some; `curl https://growthclub.pro/_gc_routetest/x` volta a cair no site (404 do Pages).

- [ ] **Step 6: Commit**
```bash
git add route-test/ && git commit -m "chore(spike): gate de roteamento /content validado (worker de teste)"
```

---

## Task 2: Banco Aiven MySQL de produção

> Ação majoritariamente no painel do Aiven (operador). Não é o banco de teste do spike — banco limpo de produção.

**Files:** nenhum (provisionamento externo + secrets).

- [ ] **Step 1: Criar o serviço MySQL de produção no Aiven**

No painel Aiven: criar serviço **MySQL 8**, plano que comporte produção (Free 1GB pra começar; subir quando crescer). **Região mais perto do Brasil disponível** (preferir SP/AWS sa-east; senão a mais próxima — registrar a escolha). FK é nativo no MySQL (sem config extra).

- [ ] **Step 2: Coletar credenciais**

No serviço: copiar **Service URI** (`mysql://avnadmin:...@host:port/defaultdb?ssl-mode=REQUIRED`) e baixar o **CA certificate** (`Show`/download).

- [ ] **Step 3: Configurar os secrets no Worker** (no diretório do repo de produção, após a Task 3 criar o wrangler.jsonc)

```bash
wrangler secret put GHOST_DATABASE_URL   # colar a Service URI no prompt (nunca no chat/arquivo versionado)
wrangler secret put GHOST_DB_CA          # colar o conteúdo do CA cert (-----BEGIN CERTIFICATE----- ... -----END-----)
```
Expected: "Success! Uploaded secret ..." pra cada um.

- [ ] **Step 4: Confirmar (sem expor segredo)**

Run: `wrangler secret list`
Expected: `GHOST_DATABASE_URL` e `GHOST_DB_CA` listados.

---

## Task 3: Worker do Ghost de produção (`/content`, MySQL, SSL com CA)

> ⚠️ **Achado (2026-06-09, tentativa de subpath ao vivo):** o roteamento `/content` → Worker **funciona** (provado: request foi pro Worker e o site `/` ficou intacto = Pages). Mas o **Ghost em subpath retornou HTTP 500** — Ghost atrás de proxy num subpath precisa dos headers de proxy corretos repassados pelo Worker (`X-Forwarded-Proto: https`, `Host`/`X-Forwarded-Host` que o Ghost espera) e/ou config de subpath; o `container.fetch(request)` cru **não basta**. Seguir a receita [createtoday.io (Ghost subdirectory via CF Workers)](https://createtoday.io/posts/ghost-subdirectory). **Não resolvido na noite do spike — é trabalho desta tarefa, com calma.** O spike foi restaurado pro estado workers.dev (200) pra não deixar produção quebrada.

**Files:**
- Create: `package.json`
- Create: `wrangler.jsonc`
- Create: `src/index.js`

- [ ] **Step 1: `package.json`**
```json
{
  "name": "growth-club-newsletter",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": { "deploy": "wrangler deploy", "tail": "wrangler tail" },
  "dependencies": { "@cloudflare/containers": "^0.3.7" }
}
```
Run: `npm install`
Expected: `@cloudflare/containers` instalado.

- [ ] **Step 2: `wrangler.jsonc`** (Container + Route `/content/*`)
```jsonc
{
  "name": "growth-club-newsletter",
  "main": "src/index.js",
  "compatibility_date": "2026-06-01",
  "account_id": "c0ceab96eb1cb02cf9fb6f8cc6fa2cd6",
  "routes": [
    { "pattern": "growthclub.pro/content/*", "zone_name": "growthclub.pro" }
  ],
  "containers": [
    {
      "class_name": "GhostContainer",
      "image": "docker.io/library/ghost:6-alpine",
      "max_instances": 1,
      "instance_type": "standard-1"
    }
  ],
  "durable_objects": {
    "bindings": [{ "name": "GHOST", "class_name": "GhostContainer" }]
  },
  "migrations": [{ "tag": "v1", "new_sqlite_classes": ["GhostContainer"] }]
}
```

- [ ] **Step 3: `src/index.js`** (subpath `/content` + MySQL + CA cert real)
```js
import { Container } from '@cloudflare/containers';

const PUBLIC_URL = 'https://growthclub.pro/content';

export class GhostContainer extends Container {
  defaultPort = 2368;
  sleepAfter = '1h';

  constructor(ctx, env, options) {
    super(ctx, env, options);
    const dbUrl = (env.GHOST_DATABASE_URL || '').trim();
    const m = dbUrl.match(/^mysql:\/\/([^:]+):([^@]+)@([^:/]+):(\d+)\/([^?]+)/);
    if (!m) throw new Error('GHOST_DATABASE_URL ausente/ inválida (esperado mysql://...)');
    const [, user, pass, host, port, database] = m;
    this.envVars = {
      NODE_ENV: 'production',
      url: PUBLIC_URL,
      database__client: 'mysql',
      database__connection__host: host,
      database__connection__port: port,
      database__connection__user: decodeURIComponent(user),
      database__connection__password: decodeURIComponent(pass),
      database__connection__database: database,
      // SSL com o CA do Aiven (verificação ligada — produção)
      database__connection__ssl__ca: (env.GHOST_DB_CA || '').trim(),
      database__connection__ssl__rejectUnauthorized: 'true',
    };
  }

  onStart() { console.log('[gc-news] Ghost iniciado:', this.envVars.database__client); }
  onError(err) { console.error('[gc-news] erro:', err); }
}

export default {
  async fetch(request, env) {
    const container = env.GHOST.getByName('gc-news-prod');
    return await container.fetch(request);
  },
};
```

- [ ] **Step 4: Commit**
```bash
git add package.json wrangler.jsonc src/index.js && git commit -m "feat(infra): Worker do Ghost de produção em /content (Container + MySQL + SSL CA)"
```

---

## Task 4: Deploy + validação end-to-end

> ⚠️ Toca a zona de produção (cria a route `/content/*`). Operador aprova.

- [ ] **Step 1: Garantir secrets** (Task 2 Step 3-4 já feitos pra ESTE Worker)

Run: `wrangler secret list`
Expected: `GHOST_DATABASE_URL` + `GHOST_DB_CA`.

- [ ] **Step 2: Deploy**

Run: `wrangler deploy`
Expected: Worker deployado + container `growth-club-newsletter-ghostcontainer` + route `growthclub.pro/content/*` aplicada.

- [ ] **Step 3: Boot + migrations (poll — pode levar 1-3 min nas migrations remotas)**
```bash
for i in $(seq 1 12); do
  code=$(curl -s -m 30 -o /dev/null -w "%{http_code}" "https://growthclub.pro/content/")
  echo "[$i] /content/ -> HTTP $code"; [ "$code" = "200" ] && break; sleep 15
done
```
Expected: chega a **200** (Ghost subiu com MySQL).

- [ ] **Step 4: Verificações funcionais**
```bash
curl -s -m 30 "https://growthclub.pro/content/" | grep -o 'content="Ghost [0-9.]*"'      # generator Ghost
curl -s -m 30 -o /dev/null -w "admin -> %{http_code}\n" "https://growthclub.pro/content/ghost/"  # 200
curl -s -m 30 -o /dev/null -w "membros -> %{http_code}\n" "https://growthclub.pro/content/members/api/member/" # 200/204
curl -s -m 30 "https://growthclub.pro/" | grep -o "<title>[^<]*</title>"   # SITE intacto, NÃO o Ghost
```
Expected: `/content/` = Ghost; `/content/ghost/` = admin 200; site institucional em `/` intacto.

- [ ] **Step 5: Commit**
```bash
git commit --allow-empty -m "chore(infra): Ghost de produção validado em growthclub.pro/content"
```

---

## Task 5: Hyperdrive (otimização de conexão — opcional, pode ficar pra depois)

> Reduz latência/pooling da conexão Container→Aiven. Não bloqueia a Fase 1.

- [ ] **Step 1: Criar config Hyperdrive apontando pro Aiven**

Run (host/user/db do Aiven; senha via prompt seguro):
```bash
wrangler hyperdrive create gc-news-db --connection-string="mysql://avnadmin:<senha>@<host>:<port>/defaultdb"
```
Expected: retorna um `id` de Hyperdrive.

- [ ] **Step 2: Avaliar binding no container**

Hyperdrive é binding de Worker; o container acessa via o Worker. Se a latência direta Container→Aiven estiver aceitável (medir no Step 3 da Task 4), **manter conexão direta** e deixar Hyperdrive pra quando o volume justificar. Registrar a decisão no README.

---

## Notas de produção (da spec §4.1)

- **Rotacionar a senha do Aiven** que vazou no chat durante o spike (banco de teste é separado deste de produção, mas rotacione por higiene).
- **Região do Aiven**: o free do spike subiu na Califórnia. Pra produção, preferir região perto do BR; medir latência.
- **Custo real**: Workers Paid (~US$5/mês) pros Containers. Banco grátis (Aiven 1GB).
- **Email** NÃO é desta fase de infra (entra no Plano 3, Migração). Achado (2026-06-09): o Ghost separa email em duas categorias:
  - **Transactional** (magic-link de login, convites) = SMTP → usar o **Cloudflare Email Sending** (tem SMTP na porta 465; `mail.growthclub.pro` já habilitado; quota 1000/dia cobre). ✅ fica no Cloudflare.
  - **Bulk** (enviar a edição pros membros) = **hardcoded pra Mailgun** no Ghost (SMTP genérico → blacklist). Precisa **Mailgun** OU proxy Mailgun→AWS SES (corta custo ~90%). NÃO dá pra usar Cloudflare aqui.
  - SPF/DKIM/DMARC nos dois domínios de envio.

---

## Próximos planos (Fase 1, em sequência)

2. **Tema Design System** (AD-008 em Handlebars).
3. **Migração do Substack** (importar ~2.261 + deliverability + paralelo).
4. **RRM openaccess** (Code Injection + signup + `NewsArticle`).
