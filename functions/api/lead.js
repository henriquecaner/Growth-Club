/**
 * /api/lead — Capture-only endpoint para hero form da home.
 *
 * Pessoa digita email no hero e dá submit → fetch POST /api/lead
 * (fire-and-forget) → browser segue redirect pra /membro?email=X.
 *
 * Cria entry parcial no Notion (Nome Completo = "(lead — só email)")
 * pra estratégia de abandono de carrinho. Se a pessoa completar o
 * wizard depois, /api/apply faz upsert by email na mesma entry.
 *
 * Se a pessoa nunca completar, ficamos com email + timestamp pra
 * follow-up por outro canal.
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

const LEAD_PLACEHOLDER = "(lead — só email)";

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });

const isEmail = (v) =>
  typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

// Look up existing page by exact email match. Returns page id or null.
async function findPageByEmail(token, databaseId, email) {
  const r = await fetch(`${NOTION_API}/databases/${databaseId}/query`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      filter: { property: "e-mail", email: { equals: email } },
      page_size: 1,
    }),
  });
  if (!r.ok) return null;
  const data = await r.json().catch(() => null);
  return data?.results?.[0]?.id || null;
}

export async function onRequestPost({ request, env }) {
  // Origin check (CSRF)
  const origin = request.headers.get("origin") || "";
  if (!ALLOWED_ORIGINS.has(origin)) {
    return json({ error: "Origin not allowed" }, 403);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const email = (typeof body.email === "string" ? body.email : "").trim().toLowerCase();
  if (!isEmail(email)) {
    return json({ error: "invalid_email" }, 422);
  }

  const token = env.NOTION_TOKEN;
  const databaseId = env.NOTION_DATABASE_ID || DEFAULT_DATABASE_ID;

  if (!token) {
    console.error("[lead] NOTION_TOKEN not configured");
    // Não bloqueia UX: retorna ok pro cliente seguir pro /membro
    return json({ ok: true, persisted: false });
  }

  try {
    // Se já existe entry com esse email, não cria duplicado (idempotente)
    const existingId = await findPageByEmail(token, databaseId, email);
    if (existingId) {
      return json({ ok: true, persisted: false, existing: true });
    }

    const today = new Date().toISOString().slice(0, 10);
    const payload = {
      parent: { database_id: databaseId },
      properties: {
        "Nome Completo": { title: [{ text: { content: LEAD_PLACEHOLDER } }] },
        "e-mail": { email },
        "Data de inscrição": { date: { start: today } },
      },
    };

    const r = await fetch(`${NOTION_API}/pages`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Notion-Version": NOTION_VERSION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!r.ok) {
      const errText = await r.text();
      console.error("[lead] Notion error", r.status, errText.slice(0, 200));
      // Soft fail: não bloqueia UX. Lead se perde mas redirect prossegue.
      return json({ ok: true, persisted: false });
    }

    return json({ ok: true, persisted: true });
  } catch (err) {
    console.error("[lead] fetch failed", String(err).slice(0, 200));
    return json({ ok: true, persisted: false });
  }
}
