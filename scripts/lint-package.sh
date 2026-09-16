#!/usr/bin/env bash
# Barra o que nao pode entrar num pacote agnostico: sys_id de instancia,
# URL de instancia e nome de cliente. Roda no CI e na mao.
#   ./scripts/lint-package.sh packages/sam-catalog
set -uo pipefail

PKG="${1:?uso: lint-package.sh packages/<id>}"
SRC="$PKG/src"
FAIL=0

# Varredura so no que e nosso: dependencia e artefato de build nao entram.
SKIP=(--exclude-dir=node_modules --exclude-dir=dist --exclude-dir=target --exclude-dir=.now --exclude-dir=@types)

# keys.ts e gerado pelo SDK: os ids de la sao da propria aplicacao.
FILES=$(find "$SRC" -type f \( -name '*.ts' -o -name '*.js' \) ! -path '*/generated/*' ! -path '*/node_modules/*')

echo "== $PKG"

hit() { FAIL=1; echo "FALHA: $1"; }

# 1. sys_id de 32 hex fora dos arquivos gerados
IDS=$(grep -rnE "['\"][0-9a-f]{32}['\"]" $FILES || true)
[ -n "$IDS" ] && { hit "sys_id hardcoded no codigo"; echo "$IDS" | head -20; }

# 2. URL de instancia
URLS=$(grep -rniE 'https?://[a-z0-9._-]+\.(service-now|servicenow)\.com' "$PKG" "${SKIP[@]}" \
         --include='*.ts' --include='*.js' --include='*.json' --include='*.md' --include='*.yml' || true)
[ -n "$URLS" ] && { hit "URL de instancia"; echo "$URLS" | head -20; }

# 3. nome de cliente
CLIENTES='globo|projetos3|\bons\b|stefanini|baker *mckenzie|nordic'
NAMES=$(grep -rniE "$CLIENTES" "$PKG" "${SKIP[@]}" \
          --include='*.ts' --include='*.js' --include='*.json' --include='*.md' --include='*.yml' \
          | grep -v '/generated/' || true)
[ -n "$NAMES" ] && { hit "nome de cliente"; echo "$NAMES" | head -20; }

# 4. package.yml obrigatorio, e ele tem de dizer o que o pacote entrega
[ -f "$PKG/package.yml" ] || hit "package.yml ausente"
[ -f "$PKG/PLAYBOOK.md" ] || hit "PLAYBOOK.md ausente"
grep -q '^delivers:' "$PKG/package.yml" 2>/dev/null || \
  hit "package.yml sem 'delivers:' — quem consome precisa saber o que instala"
grep -q '^requires_environment:' "$PKG/package.yml" 2>/dev/null || \
  hit "package.yml sem 'requires_environment:' — o que nao viaja junto"

# 5. slots de calibragem tem de estar vazios no pacote
REFS="$SRC/fluent/shared/instance-refs.ts"
if [ -f "$REFS" ]; then
  FILLED=$(grep -nE "^export const [A-Z_]+ = '[^']+'" "$REFS" || true)
  [ -n "$FILLED" ] && { hit "valor de instancia preenchido em instance-refs.ts"; echo "$FILLED"; }
fi

[ $FAIL -eq 0 ] && echo "ok: nada de cliente no pacote"
exit $FAIL
