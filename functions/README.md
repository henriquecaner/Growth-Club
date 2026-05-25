# Cloudflare Pages Functions

Endpoints serverless do site `growthclub.pro`. Cada arquivo `.js` em
`functions/api/` vira uma rota automaticamente (Pages Functions File-Based
Routing).

## Rotas ativas

| Rota             | Arquivo                | Método | Resumo |
|------------------|------------------------|--------|--------|
| `/api/lead`      | `api/lead.js`          | POST   | Captura email do hero da home. Cria entry mínima no Notion (Nome Completo = "(lead — só email)") pra estratégia de abandono de carrinho. Idempotente (não duplica se email já existe). |
| `/api/apply`     | `api/apply.js`         | POST   | Recebe candidatura completa do wizard `/membro`. UPSERT by email: se já existe entry (vinda do `/api/lead` ou submit anterior), atualiza via PATCH; senão cria via POST. |

## Fluxo de "abandono de carrinho"

1. Pessoa digita email no hero da home → click "Fazer parte"
2. JS fire-and-forget `POST /api/lead { email }` (via `sendBeacon` se disponível, senão `fetch keepalive`)
3. Browser redireciona pra `/membro?email=X`
4. Wizard de `/membro` lê query param, prefilla email, pessoa preenche restante
5. Submit final do wizard: `POST /api/apply` faz UPSERT — encontra a entry criada no passo 2 (mesmo email), atualiza com todos os campos. Sem duplicação.

Se pessoa **abandona** após step 1 (não termina wizard):
- Entry no Notion fica com Nome Completo = "(lead — só email)" + email + Data de inscrição
- Permite filtragem fácil pra follow-up por outro canal (email manual, etc)

## Setup obrigatório no Cloudflare Pages

### 1. Variáveis de ambiente (Secrets)

Cloudflare Dashboard → Workers & Pages → **growth-club** → Settings →
Environment variables → Production:

| Variable               | Type   | Value                                  | Required |
|------------------------|--------|----------------------------------------|----------|
| `NOTION_TOKEN`         | Secret | `secret_xxxxxxxxxxxx` (Notion Integration token) | Yes |
| `NOTION_DATABASE_ID`   | Plain  | `36789cac-40bd-80d7-a900-fa0939b4d953` | Optional (default hardcoded) |

**Importante:**
- Marque `NOTION_TOKEN` como **Secret** (encrypted at rest, não aparece em logs).
- Re-deploy após adicionar/atualizar secrets.
- Não commite o token no repo. Use `.envrc` local pra dev e `wrangler secret` ou dashboard pra produção.

### 2. Notion Integration

1. https://www.notion.so/my-integrations → **New integration**
2. Nome: `Growth Club Site Apply`
3. Tipo: **Internal** (não precisa OAuth)
4. Capabilities: `Read content` + `Insert content`
5. Pegue o token (começa com `secret_`)
6. Vá na database "Membros" no Notion → menu `···` → **Connections** → adicionar a integration recém-criada

Sem esse passo de conexão, a API retorna 403 mesmo com token válido.

## Testar localmente

```bash
# Precisa wrangler instalado: npm i -g wrangler
source .envrc   # carrega NOTION_TOKEN local
wrangler pages dev website
```

`wrangler pages dev` simula Cloudflare Pages localmente, incluindo
functions. Variables vêm do shell env (ou `.dev.vars`).

POST de teste:
```bash
curl -X POST http://localhost:8788/api/apply \
  -H "Content-Type: application/json" \
  -H "Origin: https://growthclub.pro" \
  -d '{
    "nome": "Teste",
    "sobrenome": "Apply",
    "email": "teste@exemplo.com",
    "linkedin": "https://linkedin.com/in/teste",
    "prioridades": ["Growth", "Marketing"],
    "procura": ["Networking"],
    "lgpd": true
  }'
```

Resposta esperada: `{"ok":true}` com status 200, e uma nova entry na
database "Membros" do Notion.

## Validação e segurança

- **Origin allowlist** (CSRF): aceita só requests de `growthclub.pro`,
  `www.growthclub.pro` e `growth-club.pages.dev`. Edite `ALLOWED_ORIGINS`
  em `apply.js` se precisar adicionar domínios.
- **Whitelist multi-select**: valores em `prioridades` e `procura` que não
  estão no whitelist são silenciosamente descartados — previne attacker
  criando tags novas via Notion auto-create.
- **Telefone**: normalizado pra `+55XXXXXXXXXXX` (E.164). Aceita formatos
  variados de input (com/sem máscara, com/sem country code).
- **PII**: logs nunca incluem email/telefone raw. Erros mostram só status
  HTTP e primeira parte da resposta (truncada).
- **Rate limiting**: respeita 429 da Notion API e propaga `Retry-After`
  pro cliente.

## Rollback

Se a integração quebrar em produção:

1. `git revert <commit-hash>` do PR de form Notion
2. `wrangler pages deploy website --project-name growth-club --branch main`
3. Form volta pra versão localStorage (commit anterior `734e1fd`)
