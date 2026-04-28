# Política de Segurança · Growth Club

> Como reportar vulnerabilidades, dados expostos ou comportamentos abusivos relacionados a este repositório, ao site `growthclub.pro` (em construção), ou aos canais oficiais Growth Club (newsletter, livecast, comunidade WhatsApp).

Última atualização: 2026-04-28.
Mantenedor: Henrique Caner.

---

## O que está em escopo

### Em escopo (queremos saber)

- Vulnerabilidades técnicas no site `growthclub.pro` quando ele subir: XSS, CSRF, SQL injection, exposição de dados.
- Exposição não-intencional de dados privados (lista de membros, dados financeiros, conteúdo confidencial) neste repositório ou em qualquer canal oficial.
- Vazamento de credenciais nos arquivos versionados (chaves de API, tokens, senhas). Nada disso deveria estar aqui, mas se você achou, reporta.
- Phishing ou impersonação que use o nome Growth Club, Henrique Caner ou algum Founder Crew member.
- Quebra de privacidade LGPD envolvendo dados de membros da comunidade.

### Fora de escopo (não responder)

- Conteúdo editorial que viole régua. Usa o [CODE_OF_CONDUCT](.github/CODE_OF_CONDUCT.md), não o SECURITY.
- Bugs no site que não envolvam dado ou segurança. Usa o [issue template `bug-site`](.github/ISSUE_TEMPLATE/bug-site.yml).
- Sugestão de melhoria. Usa template `melhoria-template` ou `sugestao-automacao`.
- Spam ou comportamento anti-comunitário. Usa canais do CODE_OF_CONDUCT (escala 1ª, 2ª, 3ª ocorrência).

---

## Como reportar

Canal preferido (privado): DM no [LinkedIn do Henrique Caner](https://linkedin.com/in/henriquecaner) com:

- Subject: `[SECURITY] [tipo do problema]`.
- Descrição clara do problema.
- Passos pra reproduzir (quando aplicável).
- Impacto estimado.
- Seu canal de contato pra resposta.

Canal alternativo: abrir issue no GitHub marcado `security` somente se o problema não envolver dado sensível sendo divulgado pela própria abertura do issue.

> Nunca abra issue público pra reportar dado sensível exposto. Se um repositório ou canal expõe credencial, lista de membros, ou dado pessoal, abrir issue público amplifica o vazamento. Usa DM privado.

---

## SLA de resposta

| Severidade | Resposta inicial | Resolução-meta |
|---|---|---|
| Crítica (dado pessoal vazando, credencial exposta, exploit ativo) | 24h | 7 dias |
| Alta (vulnerabilidade não-explorada, política violada) | 48h | 30 dias |
| Média (potencial risco futuro, exposição parcial) | 7 dias | 90 dias |
| Baixa (recomendação de hardening, melhoria preventiva) | 14 dias | Próxima revisão |

---

## O que esperamos de quem reporta

- Boa-fé. Você reportou pra ajudar, não pra extorquir.
- Não-divulgação. Você não publica o problema antes de a gente responder e mitigar (ou 30 dias depois do reporte, o que vier antes).
- Não-exploração. Você não testou ativamente além do necessário pra confirmar. Não baixa base inteira de membros pra "provar" o vazamento.

---

## O que prometemos a quem reporta

- Resposta dentro do SLA acima.
- Crédito público em [CHANGELOG.md](CHANGELOG.md) ou em comunicação institucional, se você quiser. Algumas pessoas preferem reporte anônimo.
- Atualização contínua durante a investigação até a resolução.
- Sem retaliação. Reporte de boa-fé não vai ser causa de bloqueio na comunidade nem em canais oficiais.

---

## Bug bounty

Hoje, Growth Club é bootstrapped Fase 1 e não opera programa formal de bug bounty. Reportes são respondidos por gratidão, com crédito público (opcional). Em casos críticos descobertos antes de serem explorados, cortesia simbólica negociada caso a caso.

Quando a comunidade entrar Fase 3 com receita recorrente, programa formal pode ser estruturado.

---

## Histórico

| Data | Mudança |
|---|---|
| 2026-04-28 | Política inicial criada. Fase 1. |

---

> *Segurança séria começa por dizer "reporta com calma, a gente responde rápido". O resto é processo.*

Mantenedor: Henrique Caner. Canal preferido: [LinkedIn DM](https://linkedin.com/in/henriquecaner).
