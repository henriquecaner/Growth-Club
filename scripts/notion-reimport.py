#!/usr/bin/env python3
"""
notion-reimport.py — Sync Growth Club Membros database from Tally CSV.

Phases:
  1. Snapshot existing pages -> data-users/notion-snapshot-pre-reimport.json
  2. Migrate schema (rename / add / delete properties)
  3. Upsert by e-mail: update existing pages in place, create new ones,
     preserving page_ids and Notion history.

Usage:
  source .envrc
  python3 scripts/notion-reimport.py
"""
import os
import sys
import csv
import json
import re
import time
from urllib import request as urlrequest
from urllib.error import HTTPError
from datetime import datetime, timezone

NOTION_TOKEN = os.environ.get("NOTION_TOKEN")
DATABASE_ID = "36789cac-40bd-80d7-a900-fa0939b4d953"
CSV_PATH = "data-users/The Growth Club Submissions May 18 2026.csv"
SNAPSHOT_PATH = "data-users/notion-snapshot-pre-reimport.json"
API_BASE = "https://api.notion.com/v1"
NOTION_VERSION = "2022-06-28"
RATE_LIMIT_SLEEP = 0.18

if not NOTION_TOKEN:
    sys.exit("ERRO: NOTION_TOKEN nao definida. Rode: source .envrc")

HEADERS = {
    "Authorization": f"Bearer {NOTION_TOKEN}",
    "Notion-Version": NOTION_VERSION,
    "Content-Type": "application/json",
}


def api(method, path, body=None, retries=4):
    url = f"{API_BASE}{path}"
    data = json.dumps(body).encode("utf-8") if body is not None else None
    for attempt in range(retries):
        req = urlrequest.Request(url, data=data, method=method)
        for k, v in HEADERS.items():
            req.add_header(k, v)
        try:
            with urlrequest.urlopen(req) as resp:
                return json.loads(resp.read().decode("utf-8"))
        except HTTPError as e:
            err_body = e.read().decode("utf-8", errors="replace")
            if e.code in (429, 502, 503, 504) and attempt < retries - 1:
                wait = 2 ** attempt
                print(f"  retry em {wait}s (HTTP {e.code})")
                time.sleep(wait)
                continue
            raise RuntimeError(f"{method} {path} -> {e.code}: {err_body}")


def normalize_phone(raw):
    digits = re.sub(r"\D", "", raw or "")
    if not digits:
        return None
    if not digits.startswith("55") and 10 <= len(digits) <= 11:
        digits = "55" + digits
    return digits


def normalize_text(raw):
    if not raw:
        return ""
    return re.sub(r"\s+", " ", raw.strip())


def parse_date(raw):
    if not raw or not raw.strip():
        return None
    raw = raw.strip()
    for fmt in ("%Y-%m-%d %H:%M:%S", "%Y-%m-%d"):
        try:
            dt = datetime.strptime(raw, fmt)
            if fmt == "%Y-%m-%d":
                return dt.strftime("%Y-%m-%d")
            return dt.replace(tzinfo=timezone.utc).isoformat()
        except ValueError:
            continue
    return None


def split_multi(raw):
    if not raw:
        return []
    seen, out = set(), []
    for x in raw.split(","):
        x = x.strip()
        if x and x not in seen:
            seen.add(x)
            out.append(x)
    return out


def csv_col(row, name, default=""):
    for k, v in row.items():
        if k.lstrip("﻿").strip('"') == name:
            return v if v is not None else default
    return default


def phase1_snapshot():
    print("\n=== PHASE 1: SNAPSHOT ===")
    if os.path.exists(SNAPSHOT_PATH):
        print(f"Snapshot ja existe em {SNAPSHOT_PATH}. Reusando.")
        with open(SNAPSHOT_PATH) as f:
            pages = json.load(f)
        print(f"  {len(pages)} pages carregadas do snapshot")
        return pages

    pages = []
    cursor = None
    while True:
        body = {"page_size": 100}
        if cursor:
            body["start_cursor"] = cursor
        resp = api("POST", f"/databases/{DATABASE_ID}/query", body)
        pages.extend(resp.get("results", []))
        print(f"  snapshotted: {len(pages)}")
        if not resp.get("has_more"):
            break
        cursor = resp["next_cursor"]
        time.sleep(RATE_LIMIT_SLEEP)

    with open(SNAPSHOT_PATH, "w", encoding="utf-8") as f:
        json.dump(pages, f, ensure_ascii=False, indent=2)
    print(f"OK snapshot salvo em {SNAPSHOT_PATH} ({len(pages)} pages)")
    return pages


def phase2_schema():
    print("\n=== PHASE 2: SCHEMA MIGRATION ===")
    db = api("GET", f"/databases/{DATABASE_ID}")
    current = set(db.get("properties", {}).keys())
    print(f"  properties atuais: {sorted(current)}")

    step_a = {}
    if "E-mail" in current and "e-mail" not in current:
        step_a["E-mail"] = {"name": "e-mail"}
    if "Submitted at" in current and "Data de inscrição" not in current:
        step_a["Submitted at"] = {"name": "Data de inscrição"}
    if "Usa Slack" in current and "Slack" not in current:
        step_a["Usa Slack"] = {"name": "Slack"}
    if "Bio / Skills" in current and "No que você manda bem" not in current:
        step_a["Bio / Skills"] = {"name": "No que você manda bem"}
    whatsapp_prop = db.get("properties", {}).get("WhatsApp", {})
    if whatsapp_prop.get("type") == "phone_number":
        step_a["WhatsApp"] = None
    if "Telefone" not in current:
        step_a["Telefone"] = {"phone_number": {}}
    nome_prop = db.get("properties", {}).get("Nome", {})
    if nome_prop.get("type") == "title" and "Nome Completo" not in current:
        step_a["Nome"] = {"name": "Nome Completo"}

    if step_a:
        print(f"  step 2a: rename/delete/add ({len(step_a)} ops)")
        api("PATCH", f"/databases/{DATABASE_ID}", {"properties": step_a})
        time.sleep(1.0)
    else:
        print("  step 2a: nada a fazer")

    db = api("GET", f"/databases/{DATABASE_ID}")
    if "Nome" not in db.get("properties", {}):
        print("  step 2a2: criar Nome (rich_text)")
        api(
            "PATCH",
            f"/databases/{DATABASE_ID}",
            {"properties": {"Nome": {"rich_text": {}}}},
        )
        time.sleep(0.5)
    else:
        existing_nome = db["properties"]["Nome"]
        if existing_nome.get("type") == "title":
            print("  step 2a2: Nome ainda é title — rename pendente, abortando pra retry")
        else:
            print("  step 2a2: Nome (rich_text) já existe, pulando")

    db = api("GET", f"/databases/{DATABASE_ID}")
    whatsapp_now = db.get("properties", {}).get("WhatsApp", {})
    if whatsapp_now.get("type") != "formula":
        print("  step 2b: adicionar formula WhatsApp")
        formula_expr = '"https://wa.me/" + format(prop("Telefone"))'
        api(
            "PATCH",
            f"/databases/{DATABASE_ID}",
            {"properties": {"WhatsApp": {"formula": {"expression": formula_expr}}}},
        )
    else:
        print("  step 2b: formula WhatsApp ja existe, pulando")
    print("OK schema migrado")


def extract_email_from_page(page):
    """Pull e-mail from a snapshot page (handle both old 'E-mail' and new 'e-mail')."""
    props = page.get("properties", {})
    for key in ("e-mail", "E-mail"):
        if key in props:
            val = props[key].get("email")
            if val:
                return val.strip().lower()
    return None


def phase3_upsert(snapshot):
    print("\n=== PHASE 3: UPSERT BY E-MAIL ===")

    print("step 3a: building email -> page_id mapping from snapshot")
    email_to_pageid = {}
    for page in snapshot:
        email = extract_email_from_page(page)
        if email:
            email_to_pageid[email] = page["id"]
    print(f"  {len(email_to_pageid)} unique emails mapeados ({len(snapshot)} pages no snapshot)")

    print(f"step 3b: lendo CSV {CSV_PATH}")
    with open(CSV_PATH, encoding="utf-8") as f:
        rows = list(csv.DictReader(f))
    print(f"  {len(rows)} rows do CSV")

    print(f"step 3c: upsert ({len(rows)} rows)")
    updated = 0
    created = 0
    errors = []
    for i, row in enumerate(rows, 1):
        email = csv_col(row, "E-mail").strip().lower()
        try:
            body = build_page(row)
            existing_id = email_to_pageid.get(email)
            if existing_id:
                # Update: PATCH properties on existing page (also unarchive if needed)
                api(
                    "PATCH",
                    f"/pages/{existing_id}",
                    {"archived": False, "properties": body["properties"]},
                )
                updated += 1
            else:
                api("POST", "/pages", body)
                created += 1
        except Exception as e:
            errors.append((email or "?", str(e)[:200]))
        if i % 25 == 0:
            print(
                f"  progresso: {i}/{len(rows)}  "
                f"(update={updated} create={created} erro={len(errors)})"
            )
        time.sleep(RATE_LIMIT_SLEEP)

    print(f"\nOK upsert: updated={updated}, created={created}, errors={len(errors)}")
    if errors:
        print(f"!! {len(errors)} erros:")
        for email, err in errors[:15]:
            print(f"  - {email}: {err[:120]}")
        log_path = "data-users/notion-reimport-errors.log"
        with open(log_path, "w", encoding="utf-8") as f:
            for email, err in errors:
                f.write(f"{email}\t{err}\n")
        print(f"  log completo em {log_path}")

    csv_emails = {csv_col(r, "E-mail").strip().lower() for r in rows}
    orphans = [e for e in email_to_pageid if e not in csv_emails]
    if orphans:
        print(
            f"\n  Aviso: {len(orphans)} pages no snapshot SEM linha correspondente no CSV "
            f"(deixadas como estao):"
        )
        for e in orphans[:10]:
            print(f"    - {e}")


def build_page(row):
    nome = normalize_text(csv_col(row, "Nome"))
    sobrenome = normalize_text(csv_col(row, "Sobrenome"))
    email = csv_col(row, "E-mail").strip().lower()
    telefone = normalize_phone(csv_col(row, "WhatsApp"))
    linkedin = csv_col(row, "LinkedIn").strip()
    nascimento = parse_date(csv_col(row, "Nascimento"))
    bio = normalize_text(csv_col(row, "No que você manda bem? O que você faz?"))
    prioridades = split_multi(csv_col(row, "Quais são suas prioridades de assuntos?"))
    procura = split_multi(csv_col(row, "O que você procura no The Growth Club?"))
    submitted = parse_date(csv_col(row, "Submitted at"))
    slack = csv_col(row, "Você usa Slack?").strip().lower() == "sim"

    nome_completo = " ".join(p for p in (nome, sobrenome) if p) or "(sem nome)"
    props = {
        "Nome Completo": {"title": [{"text": {"content": nome_completo}}]},
        "Nome": (
            {"rich_text": [{"text": {"content": nome}}]}
            if nome
            else {"rich_text": []}
        ),
        "Sobrenome": (
            {"rich_text": [{"text": {"content": sobrenome}}]}
            if sobrenome
            else {"rich_text": []}
        ),
        "e-mail": {"email": email or None},
        "LinkedIn": {"url": linkedin or None},
        "Slack": {"checkbox": slack},
        "No que você manda bem": (
            {"rich_text": [{"text": {"content": bio[:2000]}}]}
            if bio
            else {"rich_text": []}
        ),
    }
    if telefone:
        props["Telefone"] = {"phone_number": telefone}
    if nascimento:
        props["Nascimento"] = {"date": {"start": nascimento}}
    if submitted:
        props["Data de inscrição"] = {"date": {"start": submitted}}
    if prioridades:
        props["Prioridades de Assunto"] = {
            "multi_select": [{"name": p} for p in prioridades]
        }
    if procura:
        props["O que procura"] = {"multi_select": [{"name": p} for p in procura]}

    return {"parent": {"database_id": DATABASE_ID}, "properties": props}


if __name__ == "__main__":
    print(f"DATABASE_ID: {DATABASE_ID}")
    print(f"CSV: {CSV_PATH}")
    snapshot = phase1_snapshot()
    phase2_schema()
    phase3_upsert(snapshot)
    print("\n=== DONE ===")
