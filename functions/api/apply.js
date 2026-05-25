/**
 * /api/apply — Growth Club membership application endpoint.
 *
 * Recebe POST do form em /membro, valida server-side, cria page na
 * database Notion "Membros" (id 36789cac-40bd-80d7-a900-fa0939b4d953).
 *
 * Env vars (Cloudflare Pages → Settings → Environment variables):
 *   NOTION_TOKEN        — Integration secret (Bearer). Must be set as Secret.
 *   NOTION_DATABASE_ID  — Optional override; defaults to the prod database.
 *
 * Security:
 *   - Origin check (CSRF). Accepts requests only from growthclub.pro
 *     and growth-club.pages.dev (preview deploys).
 *   - Server-side validation (length, format, multi-select whitelist).
 *   - Multi-select values are whitelisted to prevent option creation
 *     by attacker (Notion API auto-creates options if name doesn't exist).
 *   - Never logs raw email or phone (PII).
 *   - Generic error messages to caller; details in console only.
 */

const NOTION_API = "https://api.notion.com/v1";
const NOTION_VERSION = "2022-06-28";
const DEFAULT_DATABASE_ID = "36789cac-40bd-80d7-a900-fa0939b4d953";

const ALLOWED_ORIGINS = new Set([
  "https://growthclub.pro",
  "https://www.growthclub.pro",
  "https://growth-club.pages.dev",
  "https://growth-club-site.pages.dev",
]);

// Multi-select whitelists (must match Notion DB options exactly)
const PRIORIDADES_VALID = new Set([
  "Growth", "Produtos", "Marketing", "Startup", "CS", "Vendas",
]);
const PROCURA_VALID = new Set([
  "Recrutar", "Quero Investir", "Networking", "Aprender",
  "Oferecer Serviços & Produtos", "Mentoria", "Quero Investimento",
  "Procurar um novo trabalho", "Outros", "Conseguir Feedbacks",
]);

// --- Helpers ---------------------------------------------------------------

const json = (data, status = 200, extraHeaders = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...extraHeaders,
    },
  });

const stripText = (v, max = 500) =>
  (typeof v === "string" ? v : "").trim().slice(0, max);

const isEmail = (v) =>
  typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const isLinkedinUrl = (v) =>
  typeof v === "string" && /^https?:\/\/(www\.)?linkedin\.com\/.+/i.test(v);

const isIsoDate = (v) =>
  typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v);

// Normalize Brazilian phone to +55XXXXXXXXXXX (E.164-ish, digits only after +55)
const normalizePhone = (raw) => {
  if (typeof raw !== "string") return null;
  const digits = raw.replace(/\D/g, "");
  if (digits.length < 10) return null;
  // Already includes 55 country code?
  const local = digits.startsWith("55") ? digits.slice(2) : digits;
  if (local.length < 10 || local.length > 11) return null;
  return `+55${local}`;
};

const filterWhitelist = (arr, whitelist) => {
  if (!Array.isArray(arr)) return [];
  return [...new Set(arr.filter((v) => whitelist.has(v)))];
};

// --- Main handler ----------------------------------------------------------

export async function onRequestPost({ request, env }) {
  // 1. Origin check (CSRF)
  const origin = request.headers.get("origin") || "";
  if (!ALLOWED_ORIGINS.has(origin)) {
    return json({ error: "Origin not allowed" }, 403);
  }

  // 2. Parse + validate body
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const nome = stripText(body.nome, 100);
  const sobrenome = stripText(body.sobrenome, 100);
  const email = stripText(body.email, 200).toLowerCase();
  const telefoneRaw = stripText(body.telefone, 30);
  const linkedin = stripText(body.linkedin, 300);
  const nascimento = stripText(body.nascimento, 10);
  const bio = stripText(body.bio, 2000);
  const prioridades = filterWhitelist(body.prioridades, PRIORIDADES_VALID);
  const procura = filterWhitelist(body.procura, PROCURA_VALID);
  const slack = body.slack === true || body.slack === "true";
  const lgpd = body.lgpd === true || body.lgpd === "true";

  // Required fields
  const errors = [];
  if (nome.length < 2) errors.push("nome");
  if (!isEmail(email)) errors.push("email");
  if (!isLinkedinUrl(linkedin)) errors.push("linkedin");
  if (!lgpd) errors.push("lgpd");
  if (errors.length) {
    return json({ error: "validation_failed", fields: errors }, 422);
  }

  const telefone = telefoneRaw ? normalizePhone(telefoneRaw) : null;
  const nascimentoIso = isIsoDate(nascimento) ? nascimento : null;

  // 3. Build Notion page properties
  const nomeCompleto = [nome, sobrenome].filter(Boolean).join(" ") || "(sem nome)";
  const today = new Date().toISOString().slice(0, 10);

  const properties = {
    "Nome Completo": { title: [{ text: { content: nomeCompleto } }] },
    "Nome": { rich_text: [{ text: { content: nome } }] },
    "e-mail": { email },
    "LinkedIn": { url: linkedin },
    "Slack": { checkbox: slack },
    "Data de inscrição": { date: { start: today } },
  };

  if (sobrenome) {
    properties["Sobrenome"] = { rich_text: [{ text: { content: sobrenome } }] };
  }
  if (telefone) {
    properties["Telefone"] = { phone_number: telefone };
  }
  if (nascimentoIso) {
    properties["Nascimento"] = { date: { start: nascimentoIso } };
  }
  if (bio) {
    properties["No que você manda bem"] = {
      rich_text: [{ text: { content: bio } }],
    };
  }
  if (prioridades.length) {
    properties["Prioridades de Assunto"] = {
      multi_select: prioridades.map((name) => ({ name })),
    };
  }
  if (procura.length) {
    properties["O que procura"] = {
      multi_select: procura.map((name) => ({ name })),
    };
  }

  // 4. UPSERT na Notion API (procura por email primeiro; se existir, PATCH; senão POST)
  const token = env.NOTION_TOKEN;
  const databaseId = env.NOTION_DATABASE_ID || DEFAULT_DATABASE_ID;

  if (!token) {
    console.error("[apply] NOTION_TOKEN not configured");
    return json({ error: "service_unavailable" }, 503);
  }

  const notionHeaders = {
    "Authorization": `Bearer ${token}`,
    "Notion-Version": NOTION_VERSION,
    "Content-Type": "application/json",
  };

  try {
    // 4a. Query por entry existente (lead de hero ou candidatura prévia)
    const queryRes = await fetch(`${NOTION_API}/databases/${databaseId}/query`, {
      method: "POST",
      headers: notionHeaders,
      body: JSON.stringify({
        filter: { property: "e-mail", email: { equals: email } },
        page_size: 1,
      }),
    });

    if (queryRes.status === 429) {
      return json({ error: "rate_limited" }, 429, {
        "Retry-After": queryRes.headers.get("retry-after") || "30",
      });
    }

    let existingPageId = null;
    if (queryRes.ok) {
      const data = await queryRes.json().catch(() => null);
      existingPageId = data?.results?.[0]?.id || null;
    }

    // 4b. UPDATE (PATCH) se existe, senão CREATE (POST)
    let r;
    if (existingPageId) {
      r = await fetch(`${NOTION_API}/pages/${existingPageId}`, {
        method: "PATCH",
        headers: notionHeaders,
        body: JSON.stringify({ archived: false, properties }),
      });
    } else {
      r = await fetch(`${NOTION_API}/pages`, {
        method: "POST",
        headers: notionHeaders,
        body: JSON.stringify({ parent: { database_id: databaseId }, properties }),
      });
    }

    if (r.status === 429) {
      console.warn("[apply] Notion rate limited on write");
      return json({ error: "rate_limited" }, 429, {
        "Retry-After": r.headers.get("retry-after") || "30",
      });
    }

    if (!r.ok) {
      const errText = await r.text();
      console.error("[apply] Notion error", r.status, errText.slice(0, 300));
      return json({ error: "upstream_error" }, 502);
    }

    // Note: Substack /api/v1/free retorna 403 (Cloudflare challenge) em
    // requests server-side sem cookies de sessão. Auto-subscribe puro não
    // viável. Em vez disso, a thank-you page tem CTA prominente que abre
    // Substack subscribe com email pré-preenchido via query param.

    return json({ ok: true, mode: existingPageId ? "updated" : "created" });
  } catch (err) {
    console.error("[apply] fetch failed", String(err).slice(0, 200));
    return json({ error: "network_error" }, 502);
  }
}
