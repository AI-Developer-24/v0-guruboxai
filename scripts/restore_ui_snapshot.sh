#!/bin/zsh

set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Usage: $0 <snapshot_name>"
  exit 1
fi

SNAPSHOT_NAME="$1"
ROOT_DIR="/Users/peak/Projects/GuruBoxAI"
SNAPSHOT_DIR="$ROOT_DIR/docs/ui_rollback/$SNAPSHOT_NAME/files"

if [[ ! -d "$SNAPSHOT_DIR" ]]; then
  echo "Snapshot not found: $SNAPSHOT_DIR"
  exit 1
fi

cp "$SNAPSHOT_DIR/components/marketing/marketing-sections.tsx" "$ROOT_DIR/components/marketing/marketing-sections.tsx"
cp "$SNAPSHOT_DIR/components/marketing/marketing-page-templates.tsx" "$ROOT_DIR/components/marketing/marketing-page-templates.tsx"
cp "$SNAPSHOT_DIR/lib/marketing-content.ts" "$ROOT_DIR/lib/marketing-content.ts"
cp "$SNAPSHOT_DIR/lib/marketing-content-core-eu.ts" "$ROOT_DIR/lib/marketing-content-core-eu.ts"
cp "$SNAPSHOT_DIR/lib/marketing-content-example-eu.ts" "$ROOT_DIR/lib/marketing-content-example-eu.ts"
cp "$SNAPSHOT_DIR/lib/marketing-content-template-eu.ts" "$ROOT_DIR/lib/marketing-content-template-eu.ts"
cp "$SNAPSHOT_DIR/components/layout/navbar.tsx" "$ROOT_DIR/components/layout/navbar.tsx"
cp "$SNAPSHOT_DIR/components/layout/footer.tsx" "$ROOT_DIR/components/layout/footer.tsx"
cp "$SNAPSHOT_DIR/app/globals.css" "$ROOT_DIR/app/globals.css"

echo "Restored snapshot: $SNAPSHOT_NAME"
