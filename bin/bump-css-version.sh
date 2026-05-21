#!/usr/bin/env bash
# bin/bump-css-version.sh — auto-bump cache-busting query string nos <link rel="stylesheet">
#
# Convenção: ?v=YYYYMMDD com sufixo a/b/c… quando há múltiplos deploys no mesmo dia.
# Roda sempre antes de `wrangler pages deploy` quando mexer em qualquer CSS, pra
# forçar refresh do cache em browsers que ainda têm a versão anterior.
#
# Uso:
#   ./bin/bump-css-version.sh             # auto-bump usando data de hoje
#   ./bin/bump-css-version.sh 20260601    # versão explícita (sem sufixo)
#   ./bin/bump-css-version.sh 20260601c   # versão explícita com sufixo
#   ./bin/bump-css-version.sh --check     # mostra a versão atual e sai
#
# AD-013 + L-003: cache mismatch entre HTML novo e CSS cacheado quebra o site
# (regras .icon e .member-form ausentes → SVG explode + form perde grid).

set -euo pipefail

cd "$(dirname "$0")/.."

WEBSITE_DIR="website"
TODAY="$(date +%Y%m%d)"
ANCHOR_FILE="$WEBSITE_DIR/membro.html"

# Versão atual (canonical: lê do anchor file)
current="$(grep -oE '\?v=[0-9]{8}[a-z]?' "$ANCHOR_FILE" | head -1 | sed 's/?v=//')"

if [ -z "${current:-}" ]; then
  echo "✗ Nenhuma versão ?v= encontrada em $ANCHOR_FILE"
  echo "  Adicione cache busting primeiro ou rode com versão explícita."
  exit 1
fi

# Handle --check / --help
case "${1:-}" in
  --check|-c)
    echo "Versão atual: $current"
    exit 0
    ;;
  --help|-h)
    sed -n '2,15p' "$0"
    exit 0
    ;;
esac

# Determina próxima versão
if [ "${1:-}" != "" ]; then
  # Versão explícita: validar formato YYYYMMDD ou YYYYMMDD<letra>
  if ! [[ "$1" =~ ^[0-9]{8}[a-z]?$ ]]; then
    echo "✗ Versão inválida: $1"
    echo "  Formato esperado: YYYYMMDD ou YYYYMMDD<letra> (ex: 20260601 ou 20260601c)"
    exit 1
  fi
  next="$1"
else
  # Auto-bump
  current_date="${current:0:8}"
  current_suffix="${current:8}"

  if [ "$current_date" != "$TODAY" ]; then
    # Data nova → versão limpa
    next="$TODAY"
  elif [ -z "$current_suffix" ]; then
    # Mesmo dia, sem sufixo ainda → adiciona 'a'
    next="${TODAY}a"
  else
    # Mesmo dia, com sufixo → incrementa
    if [ "$current_suffix" = "z" ]; then
      echo "✗ Sufixo já chegou em 'z' hoje. Passe versão explícita pra resolver."
      exit 1
    fi
    next_char="$(printf '%s' "$current_suffix" | tr 'a-y' 'b-z')"
    next="${TODAY}${next_char}"
  fi
fi

if [ "$current" = "$next" ]; then
  echo "✓ Versão atual já é $next — nada a fazer."
  exit 0
fi

echo "Bumping cache version: $current → $next"

# Substitui em todos os HTMLs do website/ (exclui legacy/)
changed=0
while IFS= read -r file; do
  if grep -q "?v=$current" "$file"; then
    sed -i.bak "s/?v=$current/?v=$next/g" "$file" && rm -f "$file.bak"
    changed=$((changed + 1))
    echo "  + ${file#$WEBSITE_DIR/}"
  fi
done < <(find "$WEBSITE_DIR" -name "*.html" -not -path "*/legacy/*" | sort)

echo ""
echo "✓ Bumped $changed files. Próximos passos:"
echo "    git add $WEBSITE_DIR/ && git commit -m \"chore(site): bump CSS cache to v=$next\""
echo "    wrangler pages deploy $WEBSITE_DIR --project-name growth-club --branch main"
